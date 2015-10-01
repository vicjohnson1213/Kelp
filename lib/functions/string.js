var _ = require('lodash');

var string = {
    substring: function(args) {
        if (!_.isString(args[0]) || !_.isNumber(args[1])) {
            return 'Invalid arguments to (substring string number number)';
        }

        return args[0].substr(args[1], args[2]);
    },
    append: function(args) {
        if (!_.every(args, _.isString)) {
            return 'Invalid arguments to (append string ...)';
        }

        return _.reduce(args, function(prev, el) {
            return prev + el;
        });
    }
};

module.exports = string;