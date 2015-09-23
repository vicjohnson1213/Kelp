var _ = require('lodash');

var interpreter = {
    'if': 'see interpreter',
    assert: 'see interpreter'
}
var locals = {
    let: function(name, value, env) {
        if (!name || value === undefined) {
            throw "invalid number of argunments";
        }

        var newEnv = {};
        newEnv[name] = value;
        return _.assign({}, env, newEnv);
    },
    define: function(funcDef, body, env) {
        if (!funcDef || !body) {
            throw "invalid number of arguments";
        }

        env[funcDef.name] = {
            def: funcDef,
            body: body
        };
    }
}
var comparison = {
    '=': function(values) {
        if (values[0] === undefined || values[1] === undefined) {
            throw "invalid number of arguments";
        }

        return values[0] === values[1];
    },
    '<': function(values) {
        if (values[0] === undefined || values[1] === undefined) {
            throw "invalid number of arguments";
        }
        
        return values[0] < values[1];
    },
    '<=': function(values) {
        if (values[0] === undefined || values[1] === undefined) {
            throw "invalid number of arguments";
        }
        
        return values[0] <= values[1];
    },
    '>': function(values) {
        if (values[0] === undefined || values[1] === undefined) {
            throw "invalid number of arguments";
        }
        
        return values[0] > values[1];
    },
    '>=': function(values) {
        if (values[0] === undefined || values[1] === undefined) {
            throw "invalid number of arguments";
        }
        
        return values[0] >= values[1];
    }
}
var arithmetic = {
    '+': function(values) {
        return values.reduce(function(prev, el) {
            if (typeof el !== 'number') {
                throw "not a number";
            }

            return prev + el;
        });
    },
    '-': function(values) {
        return values.reduce(function(prev, el) {
            if (typeof el !== 'number') {
                throw "not a number";
            }
            
            return prev - el;
        });
    },
    '*': function(values) {
        return values.reduce(function(prev, el) {
            if (typeof el !== 'number') {
                throw "not a number";
            }
            
            return prev * el;
        });
    },
    '/': function(values) {
        return values.reduce(function(prev, el) {
            if (typeof el !== 'number') {
                throw "not a number";
            }
            
            return prev / el;
        });
    }
}
var array = {
    list: 'list constructor',
    first: 'get first element',
    second: 'get second element',
    getElement: function(idx, arr) {
        if (!_.isArray(arr)) {
            return 'Invalid argument to (getElement)';
        }

        if (idx >= arr.length) {
            return "Index out of bounds";
        }

        return arr[idx];
    },
    concat: function(arrs) {
        if (_.every(arrs, _.isArray)) {
            return arrs.reduce(function(prev, el) {
                return prev.concat(el);
            });
        } else {
            return 'Invalid argument to (getElement)';
        }
    },
    rest: function(arr) {
        arr[0].shift();
        return arr[0];
    },
    empty: function(arr) {
        return !arr || arr.length === 0;
    }
}

module.exports = _.merge({}, interpreter, locals, comparison, arithmetic, array);