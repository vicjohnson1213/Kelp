var expect = require('expect.js'),
    comparison = require('../../lib/functions/comparison.js');

describe('comparison functions:', function() {
    describe('=', function() {
        it('should return true', function() {
            expect(comparison['=']([1, 1])).to.be.ok();
        });

        it('should return false', function() {
            expect(comparison['=']([1, 2])).to.not.be.ok();
        });

        it('should return error on too few args', function() {
            expect(comparison['=']([1]).message).to.equal('Invalid number of arguments to (=)');
        });

        it('should compare other data types', function() {
            expect(comparison['='](['str', 'str'])).to.be.ok();
        });
    });

    describe('<', function() {
        it('should return false for greater than', function() {
            expect(comparison['<']([1, 0])).to.not.be.ok();
        });

        it('should return false for equal', function() {
            expect(comparison['<']([1, 1])).to.not.be.ok();
        });

        it('should return true for less than', function() {
            expect(comparison['<']([1, 2])).to.be.ok();
        });

        it('should return error on too few args', function() {
            expect(comparison['<']([1]).message).to.equal('Invalid number of arguments to (<)');
        });
    });

    describe('<=', function() {
        it('should return false for greater than', function() {
            expect(comparison['<=']([1, 0])).to.not.be.ok();
        });

        it('should return true for equal', function() {
            expect(comparison['<=']([1, 1])).to.be.ok();
        });

        it('should return true for less than', function() {
            expect(comparison['<=']([1, 2])).to.be.ok();
        });

        it('should return error on too few args', function() {
            expect(comparison['<=']([1]).message).to.equal('Invalid number of arguments to (<=)');
        });
    });

    describe('>', function() {
        it('should return true for greater than', function() {
            expect(comparison['>']([1, 0])).to.be.ok();
        });

        it('should return false for equal', function() {
            expect(comparison['>']([1, 1])).to.not.be.ok();
        });

        it('should return false for less than', function() {
            expect(comparison['>']([1, 2])).to.not.be.ok();
        });

        it('should return error on too few args', function() {
            expect(comparison['>']([1]).message).to.equal('Invalid number of arguments to (>)');
        });
    });

    describe('>=', function() {
        it('should return true for greater than', function() {
            expect(comparison['>=']([1, 0])).to.be.ok();
        });

        it('should return false for equal', function() {
            expect(comparison['>=']([1, 1])).to.be.ok();
        });

        it('should return false for less than', function() {
            expect(comparison['>=']([1, 2])).to.not.be.ok();
        });

        it('should return error on too few args', function() {
            expect(comparison['>=']([1]).message).to.equal('Invalid number of arguments to (>=)');
        });
    });
});