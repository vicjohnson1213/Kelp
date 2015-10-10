var _ = require('lodash');

var test = {
    assert: function(args) {
        var actual = args[0],
            expected = args[1];
            
        if (actual !== expected) {
            return 'Expected: "' + expected + '", but got "' + actual + '"';
        }
    }
};

module.exports = test;