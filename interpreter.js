var _ = require('lodash'),
    validFuncs = require('./functions/_functions.js');

module.exports = interpret;

function interpret(expressions) {
    var results = [],
        env = {};

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
            if (!env[expr.value]) {
                return "unknown variable: " + expr.value;
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
            if (env[expr.def.name]) {
                var funcDef = env[expr.def.name].def;

                if (funcDef.def.args.length !== expr.def.args.length) {
                    return "Wrong arity.";
                }

                var newEnv = {};

                for (var arg = 0; arg < funcDef.def.args.length; arg++) {
                    newEnv = validFuncs['let'](funcDef.def.args[arg].value, interpretExp(expr.def.args[arg], env), newEnv);
                }

                newEnv = _.merge({}, env, newEnv);

                return interpretExp(env[expr.def.name].body, newEnv);
            }

            // for any special cases, handle those.  Otherwise, default to just calling
            // the function with interpreted arguments.
            switch (expr.def.name) {

                case 'let':
                    return interpretExp(expr.def.args[2], validFuncs['let'](expr.def.args[0].value, interpretExp(expr.def.args[1], env), env));
                case 'define':
                    validFuncs['define'](expr.def.args[0], expr.def.args[1], env);
                    break;


                case 'if':
                    return interpretExp(expr.def.args[0], env) ? interpretExp(expr.def.args[1], env) : interpretExp(expr.def.args[2], env);
                case 'begin':
                    for (var arg = 0; arg < expr.def.args - 1; arg++) {
                        interpretExp(expr.def.args[arg], env);
                    }

                    return interpretExp(expr.def.args[expr.def.args.length - 1], env);


                case 'list':
                    return expr.def.args.map(function(arg) {
                        return interpretExp(arg, env);
                    });


                case 'assert':
                    return validFuncs[expr.def.name](interpretExp(expr.def.args[0], env), interpretExp(expr.def.args[1], env));


                default:
                    return validFuncs[expr.def.name](expr.def.args.map(function(arg) {
                        return interpretExp(arg, env);
                    }), env);
            }

            break;

        default:
            throw "invalid expression: " + expr;
            break;
    }
}