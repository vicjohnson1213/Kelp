var _ = require('lodash'),
    returnError = require('../utils.js').returnError;

var math = {
    '+': function(values) {
        if (!_.every(values, _.isNumber)) {
            return returnError('Not a number in (+ number ...)');
        }

        return values.reduce(function(prev, el) {
            return prev + el;
        });
    },
    '-': function(values) {
        if (!_.every(values, _.isNumber)) {
            return returnError('Not a number in (- number ...)');
        }

        return values.reduce(function(prev, el) {
            return prev - el;
        });
    },
    '*': function(values) {
        if (!_.every(values, _.isNumber)) {
            return returnError('Not a number in (* number ...)');
        }

        return values.reduce(function(prev, el) {
            return prev * el;
        });
    },
    '/': function(values) {
        if (!_.every(values, _.isNumber)) {
            return returnError('Not a number in (/ number ...)');
        }

        return values.reduce(function(prev, el) {
            return prev / el;
        });
    },
    '%': function(values) {
        if (!_.every(values, _.isNumber)) {
            return returnError('Not a number in (% number ...)');
        }
        
        return values[0] % values[1];
    }
};

module.exports = math;