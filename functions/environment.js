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
    define: function(def, body, env) {
        if (!def || !body) {
            throw "invalid number of arguments";
        }

        env[def.def.name] = {
            def: def,
            body: body
        };
    }
};

module.exports = environment;