var _ = require('lodash'),
    returnError = require('../utils.js').returnError;

var comparison = {
    '=': function(values) {
        if (values[0] === undefined || values[1] === undefined) {
            return returnError('Invalid number of arguments to (=)');
        }

        return values[0] === values[1];
    },
    '<': function(values) {
        if (values[0] === undefined || values[1] === undefined) {
            return returnError('Invalid number of arguments to (<)');
        }
        
        return values[0] < values[1];
    },
    '<=': function(values) {
        if (values[0] === undefined || values[1] === undefined) {
            return returnError('Invalid number of arguments to (<=)');
        }
        
        return values[0] <= values[1];
    },
    '>': function(values) {
        if (values[0] === undefined || values[1] === undefined) {
            return returnError('Invalid number of arguments to (>)');
        }
        
        return values[0] > values[1];
    },
    '>=': function(values) {
        if (values[0] === undefined || values[1] === undefined) {
            return returnError('Invalid number of arguments to (>=)');
        }
        
        return values[0] >= values[1];
    }
};

module.exports = comparison;