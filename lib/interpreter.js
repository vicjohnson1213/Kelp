var _ = require('lodash'),
    utils = require('./utils.js'),
    functions = require('./functions/_functions.js'),
    returnError = utils.returnError,
    callStack = [];

module.exports = interpret;

function interpret(expressions, env) {
    var results = [],
        env = env || {};

    _.forEach(expressions, function(expr) {
        results.push(interpretExp(expr, env));
    });

    return results;
}

function interpretExp(expr, env) {
    switch(expr.type) {
        case 'number':
            var result = Number(expr.value);

            if (_.isNaN(result)) {
                return returnError('Not a number: ' + expr.value);
            }

            return result;
        case 'symbol':
            if (env[expr.value] === undefined) {
                return returnError('Unknown variable: ' + expr.value);
            }

            return env[expr.value];
        case 'boolean':
            return expr.value === 'true';
        case 'string':
            return expr.value;
        case 'closure':
            var newEnv = _.merge({}, env);

            _.forEach(expr.argNames, function(el, idx) {
                newEnv = functions['let'](expr.argNames[idx].value, expr.argVals[idx], newEnv);
            });

            return interpretExp(expr.body, newEnv);
        case 'function':
            return interpretFunc(expr, env);
        default:
            return returnError('Invalid expression: ' + expr);
    }
}

function interpretFunc(func, env) {
    var interpretResult;
    callStack.push(func.name);

    if (env[func.name]) {
        var def = env[func.name].def;
        if (def.args.length !== func.args.length) {
            interpretResult = returnError('Wrong parity when calling function: ' + func.name);
        } else {
            var newEnv = env;

            for (var arg = 0; arg < def.args.length; arg++) {
                newEnv = functions['let'](def.args[arg].value, interpretExp(func.args[arg], env), newEnv);
            }

            interpretResult = interpretExp(env[func.name].body, newEnv);
        }

        if (interpretResult && interpretResult.type !== 'error') {
            callStack.pop();
        } else {
            interpretResult = utils.addCallStack(interpretResult, callStack);
        }

        return interpretResult;
    }

    switch(func.name) {
        case 'if':
            var cond = interpretExp(func.args[0], env);

            if (typeof cond !== 'boolean') {
                return returnError('Invalid argument to (if boolean expression expression): ' + cond);
            } else {
                interpretResult = cond ?
                    interpretExp(func.args[1], env) :
                    interpretExp(func.args[2], env);
            }
            break;


        case 'let':
            var newEnv = functions['let'](func.args[0].value, interpretExp(func.args[1], env), env);
            interpretResult = interpretExp(func.args[2], newEnv);
            break;

        case 'define':
            functions['define'](func.args[0], func.args[1], env);
            break;



        case 'list':
            interpretResult = _.map(func.args, function(arg) {
                return interpretExp(arg, env);
            });
            break;
        case 'getElement':
            interpretResult = functions['getElement'](interpretExp(func.args[0], env), interpretExp(func.args[1], env));
            break;
        case 'map':
            var list = interpretExp(func.args[0], env),
                closure = interpretExp(func.args[1], env),
                newList = [];

            if (!_.isArray(list) || closure.type !== 'closure') {
                interpretResult = returnError('Invalid arguments to (map (list) (lambda))');
            } else {
                // Execute the closure for each element and add that to the
                // resulting array.
                _.forEach(list, function(el, idx) {
                    closure.argVals[0] = el;

                    // Only bind the idx arg if they asked for it.
                    if (closure.argNames[1]) {
                        closure.argVals[1] = idx;
                    }

                    newList.push(interpretExp(closure, env));
                });

                interpretResult = newList;

            }
            break;
        case 'reduce':
        case 'reduceRight':
            var list = interpretExp(func.args[0], env),
                closure = interpretExp(func.args[1], env);

            if (!_.isArray(list) || closure.type !== 'closure') {
                interpretResult = returnError('Invalid arguments to (reduce (list) (lambda))');
            } else {
                // If we are reducing left, start with the leftmost element and 
                // use a regular forEach, otherwise, start with the rightmost elment
                // and the lodash forEachRight.
                var result = func.name === 'reduce' ? list.shift() : list.pop();
                var direction = func.name === 'reduce' ? 'forEach' : 'forEachRight';
                _[direction](list, function(el) {
                    closure.argVals[0] = result;
                    closure.argVals[1] = el;

                    result = interpretExp(closure, env);
                });

                interpretResult = result;
            }
            
            break;
            case 'some':
                var list = interpretExp(func.args[0], env),
                    closure = interpretExp(func.args[1], env);

                if (!_.isArray(list) || closure.type !== 'closure') {
                    interpretResult = returnError('Invalid arguments to (some (list) (lambda))');
                } else {
                    _.forEach(list, function(el) {
                        closure.argVals[0] = el;

                        interpretResult = interpretResult || interpretExp(closure, env);
                    });
                }
                break;
            case 'every':
                var list = interpretExp(func.args[0], env),
                    closure = interpretExp(func.args[1], env);

                if (!_.isArray(list) || closure.type !== 'closure') {
                    interpretResult = returnError('Invalid arguments to (some (list) (lambda))');
                } else {
                    interpretResult = true;
                    _.forEach(list, function(el) {
                        closure.argVals[0] = el;

                        if (interpretResult) {
                            interpretResult = interpretExp(closure, env);
                        }
                    });
                }
                break;


        case 'lambda':
            interpretResult = {
                type: 'closure',
                argNames: func.argNames,
                argVals: [],
                body: func.args[0],
                env: _.merge({}, env)
            };
            break;

        default:
            if (!functions[func.name]) {
                interpretResult = returnError(func.name + ' is not a function');
            } else {
                interpretResult = functions[func.name](_.map(func.args, function(arg) {
                    return interpretExp(arg, env);
                }));
            }
    }

    if (interpretResult && interpretResult.type !== 'error') {
        callStack.pop();
    } else if (interpretResult) {
        interpretResult = utils.addCallStack(interpretResult, callStack);
    }

    return interpretResult;
}