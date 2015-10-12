var expect = require('expect.js'),
    string = require('../../lib/functions/string.js');

describe('string functions:', function() {
    describe('substring', function() {
        it('should return substring', function() {
            expect(string.substring(['some string', 2, 5])).to.equal('me ');
        });

        it('should return substring to the end', function() {
            expect(string.substring(['some string', 2, undefined])).to.equal('me string');
        });

        it('should return error for bad args', function() {
            expect(string.substring(['some string', 'f', undefined]).message).to.equal('Invalid arguments to (substring string number number)');
            expect(string.substring([3, 2, undefined]).message).to.equal('Invalid arguments to (substring string number number)');
        });
    });

    describe('substr', function() {
        it('should return substring', function() {
            expect(string.substr(['some string', 2, 6])).to.equal('me str');
        });

        it('should return substring to the end', function() {
            expect(string.substr(['some string', 2])).to.equal('me string');
        });

        it('should return error for bad args', function() {
            expect(string.substr(['some string', 'f', undefined]).message).to.equal('Invalid arguments to (substr string number number)');
            expect(string.substr([3, 2, undefined]).message).to.equal('Invalid arguments to (substr string number number)');
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
            expect(string.append(['some string', 5]).message).to.equal('Invalid arguments to (append string ...)');
        });
    });

    describe('trim', function() {
        it('should trim a string', function() {
            expect(string.trim(['   some string   '])).to.equal('some string');
        });

        it('should return error for bad args', function() {
            expect(string.trim([5]).message).to.equal('Invalid arguments to (trim string)');
        });
    });

    describe('indexOf', function() {
        it('should find index of a string in a string', function() {
            expect(string.indexOf(['some string', 'string'])).to.equal(5);
        });

        it('should return error for bad args', function() {
            expect(string.indexOf([5, 'asdf']).message).to.equal('Invalid arguments to (indexOf string string)');
            expect(string.indexOf(['asdf', 5]).message).to.equal('Invalid arguments to (indexOf string string)');
        });
    });

    describe('split', function() {
        it('should split a string', function() {
            expect(string.split(['some'])).to.eql(['s', 'o', 'm', 'e']);
        });

        it('should split a string by another string', function() {
            expect(string.split(['some', 'o'])).to.eql(['s', 'me']);
        });

        it('should return error for bad args', function() {
            expect(string.split([5, 'asdf']).message).to.equal('Invalid arguments to (split string string)');
            expect(string.split(['asdf', 5]).message).to.equal('Invalid arguments to (split string string)');
        });
    });

    describe('cases', function() {
        describe('toUpperCase', function() {
            it('should capitalize all letters', function() {
                expect(string.toUpperCase(['some String'])).to.equal('SOME STRING');
            });

            it('should error if not a string', function() {
                expect(string.toUpperCase([5]).type).to.equal('error');
            });
        });

        describe('toLowerCase', function() {
            it('should set all letters lower case', function() {
                expect(string.toLowerCase(['some STRING'])).to.equal('some string');
            });

            it('should error if not a string', function() {
                expect(string.toLowerCase([5]).type).to.equal('error');
            });
        });
    });
});