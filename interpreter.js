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
            break;
        case 'symbol':
            if (!env[expr.value]) {
                return 'unknown variable: ' + expr.value;
            }

            return env[expr.value];
            break;
        case 'boolean':
            return expr.value === 'true';
            break;
        case 'string':
            return expr.value;
            break;
        case 'function':
            return interpretFunc(expr, env);
            break;
        default:
            return 'invalid expression: ' + expr;
            break;
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



        default:
            return functions[func.name](_.map(func.args, function(arg) {
                return interpretExp(arg, env);
            }));
    }
}