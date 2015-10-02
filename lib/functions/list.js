var _ = require('lodash'),
    returnError = require('../utils.js').returnError;

var list = {
    list: 'Building the array is done directly in the interpreter.',
    map: 'Mapping is done in the interpreter.',
    reduce: 'Reducing is done in the interpreter.',
    reduceRight: 'Reducing right is done in the interpreter.',
    first: function(arr) {
        if (!_.isArray(arr[0])) {
            return returnError('Invalid argument to (first list)');
        }

        return arr[0][0]
    },
    second: function(arr) {
        if (!_.isArray(arr[0])) {
            return returnError('Invalid argument to (second list)');
        }
        
        return arr[0][1]
    },
    rest: function(arr) {
        if (!_.isArray(arr[0])) {
            return returnError('Invalid argument to (rest list)');
        }
        
        arr[0].shift();
        return arr[0];
    },
    getElement: function(idx, arr) {
        if (!_.isArray(arr)) {
            return returnError('Invalid argument to (getElement number list)');
        }

        if (idx >= arr.length) {
            return returnError('Index out of bounds: ' + idx);
        }

        return arr[idx];
    },
    concat: function(arrs) {
        if (_.every(arrs, _.isArray)) {
            return arrs.reduce(function(prev, el) {
                return prev.concat(el);
            });
        } else {
            return returnError('Invalid argument to (concat list ...)');
        }
    },
    empty: function(arrs) {
        return !arrs[0] || arrs[0].length === 0;
    },
    join: function(args) {
        if (!_.isArray(args[0]) || (args[1] && !_.isString(args[1]))) {
            return returnError('Invalid argument to (join list string)');
        }

        return args[0].join(args[1] || '');
    }
};

module.exports = list;