var _ = require('lodash');

var test = {
    assert: function(actual, expected) {
        if (actual !== expected) {
            return 'expected: "' + expected + '", but got "' + actual + '"';
        }
    }
};

module.exports = test;