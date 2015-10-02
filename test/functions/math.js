var expect = require('expect.js'),
    math = require('../../lib/functions/math.js');

describe('math functions:', function() {
    describe('addition', function() {
        it('should sum all numbers', function() {
            expect(math['+']([1, 2, 3])).to.equal(6);
        });

        it('should throw an error for NaN', function() {
            expect(math['+']([1, 2, 'thing']).message).to.equal('Not a number in (+ number ...)');
        });
    });

    describe('subrtaction', function() {
        it('should sum all numbers', function() {
            expect(math['-']([1, 2, 3])).to.equal(-4);
        });

        it('should throw an error for NaN', function() {
            expect(math['-']([1, 2, 'thing']).message).to.equal('Not a number in (- number ...)');
        });
    });

    describe('multiplication', function() {
        it('should sum all numbers', function() {
            expect(math['*']([1, 2, 3])).to.equal(6);
        });

        it('should throw an error for NaN', function() {
            expect(math['*']([1, 2, 'thing']).message).to.equal('Not a number in (* number ...)');
        });
    });

    describe('division', function() {
        it('should sum all numbers', function() {
            expect(math['/']([12, 3, 2])).to.equal(2);
        });

        it('should throw an error for NaN', function() {
            expect(math['/']([1, 2, 'thing']).message).to.equal('Not a number in (/ number ...)');
        });
    });

    describe('modulus', function() {
        it('should sum all numbers', function() {
            expect(math['%']([5, 3])).to.equal(2);
        });

        it('should throw an error for NaN', function() {
            expect(math['%']([1, 'thing']).message).to.equal('Not a number in (% number ...)');
        });
    });
});