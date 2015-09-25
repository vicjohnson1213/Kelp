var _ = require('lodash'),
    comparison = require('./comparison'),
    control = require('./control'),
    environment = require('./environment'),
    list = require('./list'),
    math = require('./math'),
    test = require('./test');

module.exports = _.merge({}, comparison, control, environment, list, math, test);