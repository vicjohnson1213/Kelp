var _ = require('lodash'),
    returnError = require('../utils.js').returnError;

var environment = {
    let: function(name, value, env) {
        if (!name || value === undefined || !env) {
            return returnError('Invalid number of argunments in (let name value env)');
        }

        var newEnv = {};
        newEnv[name] = value;
        return _.assign({}, env, newEnv);
    },
    define: function(def, body, env, local) {
        if (!def || !body || !env) {
            return returnError('Invalid number of argunments in (define def body env local)');
        }

        var func = {
            def: def,
            body: body
        };

        if (local) {
            var newEnv = {};
            newEnv[def.name] = func;
            return _.assign({}, env, newEnv);
        }
        
        env[def.name] = func;
    }
};

module.exports = environment;