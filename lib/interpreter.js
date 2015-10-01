var _ = require('lodash'),
    functions = require('./functions/_functions.js');

module.exports = interpret;

function interpret(expressions, env) {
    var results = [],
        env = _.assign({}, env);

    _.forEach(expressions, function(expr) {
        results.push(interpretExp(expr, env));
    });

    return results;
}

function interpretExp(expr, env) {
    switch(expr.type) {
        case 'number':
            return Number(expr.value);
        case 'symbol':
            if (env[expr.value] === undefined) {
                return 'unknown variable: ' + expr.value;
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
            return 'invalid expression: ' + expr;
    }
}

function interpretFunc(func, env) {

    if (env[func.name]) {
        var def = env[func.name].def;
        if (def.args.length !== func.args.length) {
            return 'Wrong parity when calling function: ' + func.name;
        }

        var newEnv = env;

        for (var arg = 0; arg < def.args.length; arg++) {
            newEnv = functions['let'](def.args[arg].value, interpretExp(func.args[arg], env), newEnv);
        }

        return interpretExp(env[func.name].body, newEnv);
    }

    switch(func.name) {
        case 'if':
            var cond = interpretExp(func.args[0], env);

            if (typeof cond !== 'boolean') {
                return 'If condition must evaluate a boolean value';
            }

            return cond ?
                interpretExp(func.args[1], env) :
                interpretExp(func.args[2], env);

        case 'begin':
            for (var arg = 0; arg < func.args.length - 1; arg++) {
                interpretExp(func.args[arg], env);
            }

            return interpretExp(func.args[func.args.length - 1], env);



        case 'let':
            var newEnv = functions['let'](func.args[0].value, interpretExp(func.args[1], env), env);
            return interpretExp(func.args[2], newEnv);

        case 'define':
            functions['define'](func.args[0], func.args[1], env);
            break;



        case 'list':
            return _.map(func.args, function(arg) {
                return interpretExp(arg, env);
            });
        case 'getElement':
            return functions['getElement'](interpretExp(func.args[0], env), interpretExp(func.args[1], env));
        case 'map':
            var list = interpretExp(func.args[0], env),
                closure = interpretExp(func.args[1], env),
                newList = [];

            if (!_.isArray(list) || closure.type !== 'closure') {
                return 'Invalid arguments to (map (list) (lambda))';
            }

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

            return newList;

        case 'reduce':
        case 'reduceRight':
            var list = interpretExp(func.args[0], env),
                closure = interpretExp(func.args[1], env);

            if (!_.isArray(list) || closure.type !== 'closure') {
                return 'Invalid arguments to (reduce (list) (lambda))';
            }
            
            // If we are reducing left, start with the leftmost element and 
            // use a regular forEach, otherwise, start with the rightmost elment
            // and the lodash forEachRight.
            var result = func.name === 'reduce' ? list.shift() : list.pop();
            var direction = func.name === 'reduce' ? 'forEach' : 'forEachRight';
            _[direction](list, function(el, idx) {
                closure.argVals[0] = result;
                closure.argVals[1] = el;

                result = interpretExp(closure, env);
            });

            return result;



        case 'lambda':
            return {
                type: 'closure',
                argNames: func.argNames,
                argVals: [],
                body: func.args[0],
                env: _.merge({}, env)
            };

        default:
            return functions[func.name](_.map(func.args, function(arg) {
                return interpretExp(arg, env);
            }));
    }
}