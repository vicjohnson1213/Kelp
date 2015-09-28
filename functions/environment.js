var _ = require('lodash');

var environment = {
    let: function(name, value, env) {
        if (!name || value === undefined) {
            throw "invalid number of argunments";
        }

        var newEnv = {};
        newEnv[name] = value;
        return _.assign({}, env, newEnv);
    },
    define: function(def, body, env, local) {
        if (!def || !body) {
            throw "invalid number of arguments";
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