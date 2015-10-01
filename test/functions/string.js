var expect = require('expect.js'),
    string = require('../../lib/functions/string.js');

describe('string functions:', function() {
    describe('substring', function() {
        it('should return substring', function() {
            expect(string.substring(['some string', 2, 5])).to.equal('me st');
        });

        it('should return substring to the end', function() {
            expect(string.substring(['some string', 2, undefined])).to.equal('me string');
        });

        it('should return error for bad args', function() {
            expect(string.substring(['some string', 'f', undefined])).to.equal('Invalid arguments to (substring string number number)');
            expect(string.substring([3, 2, undefined])).to.equal('Invalid arguments to (substring string number number)');
        });
    });

    describe('append', function() {
        it('should append two strings', function() {
            expect(string.append(['some string', ' another'])).to.equal('some string another');
        });

        it('should append multiple strings', function() {
            expect(string.append(['s', 'o', 'm', 'e'])).to.equal('some');
        });

        it('should return error for bad args', function() {
            expect(string.append(['some string', 5])).to.equal('Invalid arguments to (append string ...)');
        });
    });
});