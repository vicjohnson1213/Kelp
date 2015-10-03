var expect = require('expect.js'),
    utils = require('../lib/utils.js'),
    parse = require('../lib/parser.js'),
    interpret = require('../lib/interpreter.js');

describe('util functions:', function() {
    describe('returnError', function() {
        it('should return an error object', function() {
            expect(utils.returnError('error message')).to.eql({
                type: 'error',
                message: 'error message'
            });
        });

        it('should return callStack', function() {
            expect(interpret(parse('(+ 1 "asdf")'))[0].callStack).to.not.be.undefined;
        });
    });

    describe('addCallStack', function() {
        it('should add call stack', function() {
            expect(utils.addCallStack({}, ['+'])).to.eql({
                callStack: ['+']
            });
        });
    });
});