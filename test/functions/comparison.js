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
    });
});