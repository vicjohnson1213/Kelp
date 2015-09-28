var _ = require('lodash');

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
};

module.exports = comparison;