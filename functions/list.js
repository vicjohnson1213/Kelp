var _ = require('lodash');

var list = {
    list: function(args) {
        // Building the array is done directly in the interpreter.
    },
    first: function(arr) {
        return arr[0][0]
    },
    second: function(arr) {
        return arr[0][1]
    },
    rest: function(arr) {
        arr[0].shift();
        return arr[0];
    },
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
    empty: function(arrs) {
        return !arrs[0] || arrs[0].length === 0;
    }
};

module.exports = list;