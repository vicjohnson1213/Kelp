var expect = require('expect.js'),
    parse = require('../lib/parser.js');

describe('parser:', function() {
    it('should parse function with no arguments.', function() {
        expect(parse('(someFunc)')).to.eql([{
            type: 'function',
            name: 'someFunc',
            args: []
        }]);
    });

    it('should parse function with value arguments.', function() {
        expect(parse('(+ 1 22)')).to.eql([{
            type: 'function',
            name: '+',
            args: [{
                type: 'number',
                value: '1'
            }, {
                type: 'number',
                value: '22'
            }]
        }]);
    });

    it ('should parse funciton with nested function.', function() {
        expect(parse('(+ 1 (- 2 3))')).to.eql([{
            type: 'function',
            name: '+',
            args: [{
                type: 'number',
                value: '1',
            }, {
                type: 'function',
                name: '-',
                args: [{
                    type: 'number',
                    value: '2',
                }, {
                    type: 'number',
                    value: '3',
                }]
            }]
        }]);
    });

    it('should parse function with adjacent funcitons as arguments', function() {
        expect(parse('(+ (* 4 5) (- 2 3))')).to.eql([{
            type: 'function',
            name: '+',
            args: [{
                type: 'function',
                name: '*',
                args: [{
                    type: 'number',
                    value: '4',
                }, {
                    type: 'number',
                    value: '5',
                }]
            }, {
                type: 'function',
                name: '-',
                args: [{
                    type: 'number',
                    value: '2',
                }, {
                    type: 'number',
                    value: '3',
                }]
            }]
        }]);
    })

    it('should parse multiple functions.', function() {
        expect(parse('(func 1) (func2 2)')).to.eql([{
            type: 'function',
            name: 'func',
            args: [{
                type: 'number',
                value: '1'
            }]
        }, {
            type: 'function',
            name: 'func2',
            args: [{
                type: 'number',
                value: '2'
            }]
        }]);
    });

    // This test case is because e can also match numbers in scientific
    // notation
    it('should parse symbol starting with "e"', function() {
        expect(parse('(+ el)')).to.eql([{
            type: 'function',
            name: '+',
            args: [{
                type: 'symbol',
                value: 'el'
            }]
        }]);
    });

    it('should handle whitespace', function() {
        expect(parse('    (+   el)   ')).to.eql([{
            type: 'function',
            name: '+',
            args: [{
                type: 'symbol',
                value: 'el'
            }]
        }]);
    });

    describe('comments', function() {
        it('should ignore inline comments', function() {
            expect(parse('(+ el) // this is a comment')).to.eql([{
                type: 'function',
                name: '+',
                args: [{
                    type: 'symbol',
                    value: 'el'
                }]
            }]);
        });

        it('should ignore multi-line comments', function() {
            expect(parse('(+ el /* some \n multi-line \ncomment */7) // this is a comment')).to.eql([{
                type: 'function',
                name: '+',
                args: [{
                    type: 'symbol',
                    value: 'el'
                }, {
                    type: 'number',
                    value: '7'
                }]
            }]);
        })
    });

    describe('booleans and symbols', function() {
        it ('should parse a symbol', function() {
            expect(parse('(test thing)')).to.eql([{
                type: 'function',
                name: 'test',
                args: [{
                    type: 'symbol',
                    value: 'thing',
                }]
            }]);
        });

        it ('should parse a boolean', function() {
            expect(parse('(test true)')).to.eql([{
                type: 'function',
                name: 'test',
                args: [{
                    type: 'boolean',
                    value: 'true',
                }]
            }]);
        });
    });

    describe('lambdas', function() {
        it('should parse a lambda', function() {
            expect(parse('(lambda [x y] (+ x y))')).to.eql([{
                type: 'function',
                name: 'lambda',
                argNames: [{
                    type: 'symbol',
                    value: 'x'
                }, {
                    type: 'symbol',
                    value: 'y'
                }],
                args: [{
                    type: 'function',
                    name: '+',
                    args: [{
                        type: 'symbol',
                        value: 'x'
                    }, {
                        type: 'symbol',
                        value: 'y'
                    }]
                }]
            }]);
        });
    });

    describe('strings', function() {
        it('should parse a string', function() {
            expect(parse('(func "thing")')).to.eql([{
                type: 'function',
                name: 'func',
                args: [{
                    type: 'string',
                    value: 'thing'
                }]
            }]);
        });

        it('should parse escaped quotes', function() {
            expect(parse('(func "thing\\"")')).to.eql([{
                type: 'function',
                name: 'func',
                args: [{
                    type: 'string',
                    value: 'thing\\"'
                }]
            }]);
        });
    });
});