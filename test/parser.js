var expect = require('expect.js'),
    parse = require('../parser.js');

describe('parser:', function() {
    it('should parse function with no arguments.', function() {
        expect(parse('(someFunc)')).to.eql([{
            type: 'function',
            name: 'someFunc',
            args: []
        }]);
    });

    it('should parse function with value arguments.', function() {
        expect(parse('(+ 1 2)')).to.eql([{
            type: 'function',
            name: '+',
            args: [{
                type: 'number',
                value: '1'
            }, {
                type: 'number',
                value: '2'
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
});