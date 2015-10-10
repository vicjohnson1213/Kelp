var expect = require('expect.js'),
    test = require('../../lib/functions/test.js');

describe('test functions:', function() {
    describe('assert', function() {
        it('should return an error description of not equal', function() {
            expect(test.assert([1, 2])).to.equal('Expected: "2", but got "1"');
        });

        it('should return undefined if equal', function() {
            expect(test.assert([1, 1])).to.be.undefined;
        });
    });
});