var expect = require('expect.js'),
    interpret = require('../../lib/interpreter.js'),
    list = require('../../lib/functions/list.js');

describe('list functions:', function() {
    describe('constructor', function() {
        it('should create a list', function() {
            expect(interpret([{
                type: 'function',
                name: 'list',
                args: [{
                    type: 'number',
                    value: '1'
                }, {
                    type: 'number',
                    value: '2'
                }, {
                    type: 'number',
                    value: '3'
                }]
            }])).to.eql([[1, 2, 3]]);
        });
    });

    describe('first', function() {
        it('should return the first element', function() {
            expect(list.first([[1, 2, 3]])).to.equal(1);
        });

        it('should return error if arg is not an array', function() {
            expect(list.first([1])).to.equal('Invalid argument to (first)');
        });
    });

    describe('second', function() {
        it('should return the second element', function() {
            expect(list.second([[1, 2, 3]])).to.equal(2);
        });

        it('should return error if arg is not an array', function() {
            expect(list.second([1])).to.equal('Invalid argument to (second)');
        });
    });

    describe('rest', function() {
        it('should return the second element', function() {
            expect(list.rest([[1, 2, 3]])).to.eql([2, 3]);
        });

        it('should return error if arg is not an array', function() {
            expect(list.rest([1])).to.equal('Invalid argument to (rest)');
        });
    });

    describe('getElement', function() {
        it('should get element', function() {
            expect(interpret([{
                type: 'function',
                name: 'getElement',
                args: [{
                    type: 'number',
                    value: '1'
                }, {
                    type: 'function',
                    name: 'list',
                    args: [{
                        type: 'number',
                        value: '1'
                    }, {
                        type: 'number',
                        value: '2'
                    }, {
                        type: 'number',
                        value: '3'
                    }]
                }]
            }])).to.eql([2]);
        });

        it('should not accept anything other than an array', function() {
            expect(list.getElement(5, 5)).to.eql('Invalid argument to (getElement)');
        });

        it('should not an out of bounds index', function() {
            expect(list.getElement(5, [1, 2, 3])).to.eql('Index out of bounds: 5');
        });
    });

    describe('concat', function() {
        it('should concat lists', function() {
            expect(list.concat([[1, 2, 3], [4, 5, 6]])).to.eql([1, 2, 3, 4, 5, 6]);
        });

        it('should return error if any arg is not an array', function() {
            expect(list.concat([[1, 2, 3], 5])).to.eql('Invalid argument to (concat)');
        })
    });

    describe('empty', function() {
        it('should return false if list has elements', function() {
            expect(list.empty([[1, 2]])).to.not.be.ok();
        });

        it('should return true if list has no elements', function() {
            expect(list.empty([[]])).to.be.ok();
        });

        it('should return true if list doesn\'t exist', function() {
            expect(list.empty([])).to.be.ok();
        });
    });
});