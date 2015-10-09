var expect = require('expect.js'),
    parse = require('../../lib/parser.js'),
    interpret = require('../../lib/interpreter.js'),
    control = require('../../lib/functions/control.js');

describe('control functions:', function() {
    describe('if', function() {
        it('should return the first if true', function() {
            expect(interpret(parse('(if true 1 2)'))[0]).to.be.equal(1);
        });

        it('should return the second if false', function() {
            expect(interpret(parse('(if false 1 2)'))[0]).to.be.equal(2);
        });

        it('should return error if condition is not boolean', function() {
            expect(interpret(parse('(if 1 1 2)'))[0].message).to.be.equal('Invalid argument to (if boolean expression expression): 1');
        });
    });
});