var expect = require('expect.js'),
    interpret = require('../../interpreter.js'),
    parse = require('../../parser.js'),
    environment = require('../../functions/environment.js');

describe('environment functions:', function() {
    describe('let', function() {
        it('should set a variable', function() {
            var oldEnv = {};
            var newEnv = environment.let('x', 5, oldEnv);
            expect(newEnv['x']).to.equal(5);
        });

        it('should not change the old environment', function() {
            var oldEnv = {};
            var newEnv = environment.let('x', 5, oldEnv);
            expect(oldEnv).to.be.empty();
        });

        it('should interpret correctly', function() {
            expect(interpret([{
                type: 'function',
                name: 'let',
                args: [{
                    type: 'symbol',
                    value: 'x'
                }, {
                    type: 'number',
                    value: '5'
                }, {
                    type: 'symbol',
                    value: 'x'
                }]
            }])).to.eql([5]);
        });
    });

    describe('define', function() {
        it('should add a function to the environment', function() {
            var oldEnv = {};
            environment.define({
                name: 'name'
            }, 'body', oldEnv);

            expect(oldEnv['name']).to.eql({
                def: {
                    name: 'name'
                },
                body: 'body'
            });
        });

        it('should not change env if local is set', function() {
            var oldEnv = {};
            var newEnv = environment.define({
                name: 'name'
            }, 'body', oldEnv, true);

            expect(oldEnv).to.be.empty();
            expect(newEnv['name']).to.eql({
                def: {
                    name: 'name'
                },
                body: 'body'
            });
        });

        it('should interpret correctly', function() {
            expect(interpret([{
                type: 'function',
                name: 'define',
                args: [{
                    type: 'function',
                    name: 'double',
                    args: [{
                        type: 'symbol',
                        value: 'x'
                    }]
                }, {
                    type: 'function',
                    name: '+',
                    args: [{
                        type: 'symbol',
                        value: 'x'
                    }, {
                        type: 'symbol',
                        value: 'x'
                    }]
                }]
            }, {
                type: 'function',
                name: 'double',
                args: [{
                    type: 'number',
                    value: '5'
                }]
            }])).to.contain(10);
        });
    });
});