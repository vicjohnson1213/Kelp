var _ = require('lodash');

var list = {
    list: 'Building the array is done directly in the interpreter.',
    map: 'Mapping is done in the interpreter.',
    reduce: 'Reducing is done in the interpreter.',
    reduceRight: 'Reducing right is done in the interpreter.',
    first: function(arr) {
        if (!_.isArray(arr[0])) {
            return 'Invalid argument to (first)';
        }

        return arr[0][0]
    },
    second: function(arr) {
        if (!_.isArray(arr[0])) {
            return 'Invalid argument to (second)';
        }
        
        return arr[0][1]
    },
    rest: function(arr) {
        if (!_.isArray(arr[0])) {
            return 'Invalid argument to (rest)';
        }
        
        arr[0].shift();
        return arr[0];
    },
    getElement: function(idx, arr) {
        if (!_.isArray(arr)) {
            return 'Invalid argument to (getElement)';
        }

        if (idx >= arr.length) {
            return 'Index out of bounds: ' + idx;
        }

        return arr[idx];
    },
    concat: function(arrs) {
        if (_.every(arrs, _.isArray)) {
            return arrs.reduce(function(prev, el) {
                return prev.concat(el);
            });
        } else {
            return 'Invalid argument to (concat)';
        }
    },
    empty: function(arrs) {
        return !arrs[0] || arrs[0].length === 0;
    },
    join: function(args) {
        if (!_.isArray(args[0]) || (args[1] && !_.isString(args[1]))) {
            return 'Invalid argument to (join list string)';
        }

        return args[0].join(args[1] || '');
    }
};

module.exports = list;