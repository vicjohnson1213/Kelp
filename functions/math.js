var _ = require('lodash');

var math = {
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
};

module.exports = math;