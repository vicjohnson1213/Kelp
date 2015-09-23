var _ = require('lodash'),
    validFuncs = require('./functions.js');

module.exports = interpret;

function interpret(expressions, env) {
    var results = []
    _.forEach(expressions, function(expr) {
        results.push({
            expr: expr,
            result: interpretExp(expr, env)
        });
    });

    return results;
}

function interpretExp(expr, env) {
    switch(expr.type) {
        case 'number':
            return Number(expr.value);
            break;
        case 'symbol':
            if (!env[expr.name]) {
                throw "unknown variable: " + expr.name;
            }

            return env[expr.name];
            break;
        case 'boolean':
            return expr.value === 'true';
            break;
        case 'string':
            return expr.value;
            break;
        case 'function':
            if (!validFuncs[expr.name] && !env[expr.name]) {
                throw ("invalid function: " + expr.name);
            }

            switch(expr.name) {

                /* START ARITHMETIC OPERATIONS */
                case '+':
                case '-':
                case '*':
                case '/':
                case '=':
                case '<':
                case '<=':
                case '>':
                case '>=':
                    return validFuncs[expr.name](expr.args.map(function(arg) {
                        return interpretExp(arg, env);
                    }));
                    break;
                /* END ARITHMETIC OPERATIONS */

                /* START LOCALS */
                case 'let':
                    return interpretExp(expr.args[2], validFuncs['let'](expr.args[0].name, interpretExp(expr.args[1], env), env));
                    break;
                case 'define':
                    validFuncs['define'](expr.args[0], expr.args[1], env);
                    break;

                /* END LOCALS */

                /* START CONDITIONALS */
                case 'if':
                    return interpretExp(expr.args[0], env) ? interpretExp(expr.args[1], env) : interpretExp(expr.args[2], env);
                    break;

                /* END CONDITIONALS */

                case 'assert':
                    var first = interpretExp(expr.args[0], env),
                        second = interpretExp(expr.args[1], env);
                    if (first !== second) {
                        return 'expected: "' + second + '", but got "' + first;
                    }
                    break;

                /* START ARRAYS */
                case 'list':
                    return expr.args.map(function(arg) {
                        return interpretExp(arg, env);
                    });
                    break;

                case 'getElement':
                    return validFuncs['getElement'](interpretExp(expr.args[0], env), interpretExp(expr.args[1], env));
                    break;

                case 'first':
                    return validFuncs['getElement'](0, interpretExp(expr.args[0], env));
                    break;
                case 'second':
                    return validFuncs['getElement'](1, interpretExp(expr.args[0], env))

                case 'concat':
                case 'rest':
                    return validFuncs[expr.name](expr.args.map(function(arg) {
                        return interpretExp(arg, env);
                    }));
                    break;
                case 'empty':
                    return validFuncs[expr.name](interpretExp(expr.args[0], env));
                    break;

                /* END ARRAYS */

                default:
                    // This default case is for any functions that aren't built into the language.
                    // The function bodies can be found in the environment from a define.

                    if (expr.args.length !== env[expr.name].def.args.length) {
                        throw "wrong arity";
                    }

                    var newEnv = env;
                    for (var i = 0; i < expr.args.length; i++) {
                        // Use the 'let' function to add any agruments to the environment before calling
                        // the function.

                        newEnv = validFuncs['let'](env[expr.name].def.args[i].name, interpretExp(expr.args[i], env), newEnv);
                    }

                    return interpretExp(env[expr.name].body, newEnv);
                    break;
            }

            break;
        default:
            throw "invalid expression: " + expr;
            break;
    }
}