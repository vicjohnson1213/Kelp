var _ = require('lodash');

var math = {
    '+': function(values) {
        if (!_.every(values, _.isNumber)) {
            return 'not a number';
        }

        return values.reduce(function(prev, el) {
            return prev + el;
        });
    },
    '-': function(values) {
        if (!_.every(values, _.isNumber)) {
            return 'not a number';
        }

        return values.reduce(function(prev, el) {
            return prev - el;
        });
    },
    '*': function(values) {
        if (!_.every(values, _.isNumber)) {
            return 'not a number';
        }

        return values.reduce(function(prev, el) {
            return prev * el;
        });
    },
    '/': function(values) {
        if (!_.every(values, _.isNumber)) {
            return 'not a number';
        }

        return values.reduce(function(prev, el) {
            return prev / el;
        });
    }
};

module.exports = math;