var _ = require('lodash'),
    returnError = require('../utils.js').returnError;

var string = {
    substring: function(args) {
        if (!_.isString(args[0]) || !_.isNumber(args[1])) {
            return returnError('Invalid arguments to (substring string number number)');
        }

        return args[0].substring(args[1], args[2]);
    },
    substr: function(args) {
        if (!_.isString(args[0]) || !_.isNumber(args[1])) {
            return returnError('Invalid arguments to (substr string number number)');
        }

        return args[0].substr(args[1], args[2]);
    },
    append: function(args) {
        if (!_.every(args, _.isString)) {
            return returnError('Invalid arguments to (append string ...)');
        }

        return _.reduce(args, function(prev, el) {
            return prev + el;
        });
    },
    trim: function(args) {
        if (!_.isString(args[0])) {
            return returnError('Invalid arguments to (trim string)');
        }

        return args[0].trim();
    },
    indexOf: function(args) {
        if (!_.isString(args[0]) || !_.isString(args[1])) {
            return returnError('Invalid arguments to (indexOf string string)');
        }

        return args[0].indexOf(args[1]);
    },
    split: function(args) {
        if (!_.isString(args[0]) || (args[1] && !_.isString(args[1]))) {
            return returnError('Invalid arguments to (split string string)');
        }

        return args[0].split(args[1] || '');
    },
    toUpperCase: function(args) {
        if (!_.isString(args[0])) {
            return returnError('Invalid arguments to (toUpperCase string)');
        }

        return args[0].toUpperCase();
    },
    toLowerCase: function(args) {
        if (!_.isString(args[0])) {
            return returnError('Invalid arguments to (toLowerCase string)');
        }

        return args[0].toLowerCase();
    }
};

module.exports = string;