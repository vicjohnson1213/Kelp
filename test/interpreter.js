var expect = require('expect.js'),
    _ = require('lodash'),
    interpret = require('../lib/interpreter.js');

describe('interpreter:', function() {
    describe('numbers', function() {
        it('should parse an integer', function() {
            var result = interpret([{
                type: 'number',
                value: '5'
            }]);

            expect(result[0]).to.equal(5);
        });

        it('should parse a decimal', function() {
            var result = interpret([{
                type: 'number',
                value: '5.5'
            }]);

            expect(result[0]).to.equal(5.5);
        });

        it('should parse a number in scientific notation', function() {
            var result = interpret([{
                type: 'number',
                value: '5e2'
            }]);

            expect(result[0]).to.equal(500);
        });

        describe('NaN', function() {
            it('scientific notation', function() {
                var result = interpret([{
                    type: 'number',
                    value: '5e'
                }]);

                expect(_.isNaN(result[0])).to.be.true;
            });

            it('letters', function() {
                var result = interpret([{
                    type: 'number',
                    value: 'abc'
                }]);

                expect(_.isNaN(result[0])).to.be.true;
            });
        });
    });

    describe('symbols', function() {
        it('should get symbol from the environment', function() {
            var result = interpret([{
                type: 'symbol',
                value: 'x'
            }], {
                x: 5
            });

            expect(result[0]).to.equal(5);
        });

        it('should return error if the symbol is undefined', function() {
            var result = interpret([{
                type: 'symbol',
                value: 'x'
            }]);

            expect(result[0]).to.equal('unknown variable: x');
        });
    });

    describe('booleans', function() {
        it('should interpret true', function() {
            var result = interpret([{
                type: 'boolean',
                value: 'true'
            }]);

            expect(result[0]).to.be.true;
        });

        it('should interpret false', function() {
            var result = interpret([{
                type: 'boolean',
                value: 'false'
            }]);

            expect(result[0]).to.be.false;
        });
    });

    describe('strings', function() {
        it('should interpret string', function() {
            var result = interpret([{
                type: 'string',
                value: 'some string'
            }]);

            expect(result[0]).to.equal('some string');
        });
    });

    describe('function', function() {
        it('should evaluate the function', function() {
            var result = interpret([{
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

            expect(result[0]).to.equal(3);
        });

        it('should evaluate a funciton in the environment', function() {
            var result = interpret([{
                type: 'function',
                name: 'sum',
                args: [{
                    type: 'number',
                    value: '1'
                }, {
                    type: 'number',
                    value: '2'
                }]
            }], {
                sum: {
                    def: {
                        type: 'function',
                        name: 'sum',
                        args: [{
                            type: 'symbol',
                            value: 'x'
                        }, {
                            type: 'symbol',
                            value: 'y'
                        }]
                    },
                    body: {
                        type: 'function',
                        name: '+',
                        args: [{
                            type: 'symbol',
                            value: 'x'
                        }, {
                            type: 'symbol',
                            value: 'y'
                        }]
                    }
                }
            });

            expect(result[0]).to.equal(3);
        });

        it('should throw error with invalid parity', function() {
            var result = interpret([{
                type: 'function',
                name: 'sum',
                args: [{
                    type: 'number',
                    value: '1'
                }]
            }], {
                sum: {
                    def: {
                        type: 'function',
                        name: 'sum',
                        args: [{
                            type: 'symbol',
                            value: 'x'
                        }, {
                            type: 'symbol',
                            value: 'y'
                        }]
                    },
                    body: {
                        type: 'function',
                        name: '+',
                        args: [{
                            type: 'symbol',
                            value: 'x'
                        }, {
                            type: 'symbol',
                            value: 'y'
                        }]
                    }
                }
            });

            expect(result[0]).to.equal('Wrong parity when calling function: sum');
        });
    });

    describe('invalid expression', function() {
        it('should break on an invalid expression', function() {
            var result = interpret([5]);

            expect(result[0]).to.equal('invalid expression: 5');
        });
    });
});