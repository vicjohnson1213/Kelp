var expect = require('expect.js'),
    parse = require('../../lib/parser.js'),
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
            expect(list.first([1]).message).to.equal('Invalid argument to (first list)');
        });
    });

    describe('second', function() {
        it('should return the second element', function() {
            expect(list.second([[1, 2, 3]])).to.equal(2);
        });

        it('should return error if arg is not an array', function() {
            expect(list.second([1]).message).to.equal('Invalid argument to (second list)');
        });
    });

    describe('rest', function() {
        it('should return the second element', function() {
            expect(list.rest([[1, 2, 3]])).to.eql([2, 3]);
        });

        it('should return error if arg is not an array', function() {
            expect(list.rest([1]).message).to.equal('Invalid argument to (rest list)');
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
            expect(list.getElement(5, 5).message).to.eql('Invalid argument to (getElement number list)');
        });

        it('should not an out of bounds index', function() {
            expect(list.getElement(5, [1, 2, 3]).message).to.eql('Index out of bounds: 5');
        });
    });

    describe('concat', function() {
        it('should concat lists', function() {
            expect(list.concat([[1, 2, 3], [4, 5, 6]])).to.eql([1, 2, 3, 4, 5, 6]);
        });

        it('should return error if any arg is not an array', function() {
            expect(list.concat([[1, 2, 3], 5]).message).to.eql('Invalid argument to (concat list ...)');
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

    describe('map', function() {
        it('should execute function for each element in list', function() {
            var func = '(map (list 1 2 3) (lambda [x] (* x x)))';
            expect(interpret(parse(func))).to.eql([[1, 4, 9]]);
        });

        it('should give the index as the second argument', function() {
            var func = '(map (list 1 2 3) (lambda [x idx] idx))';
            expect(interpret(parse(func))).to.eql([[0, 1, 2]]);
        });

        it('should return error if first arg isn\'t list', function() {
            var func = '(map 5 (lambda [x idx] idx))';
            expect(interpret(parse(func))[0].message).to.eql('Invalid arguments to (map (list) (lambda))');
        });

        it('should return error if second arg isn\'t lambda', function() {
            var func = '(map (list 1 2) 5)';
            expect(interpret(parse(func))[0].message).to.eql('Invalid arguments to (map (list) (lambda))');
        });
    });

    describe('reduce', function() {
        it('should execute function for each element in list', function() {
            var func = '(reduce (list 1 2 3) (lambda [prev x] (+ prev x)))';
            expect(interpret(parse(func))).to.eql([6]);
        });

        it('should return error if first arg isn\'t list', function() {
            var func = '(reduce 5 (lambda [prev el] idx))';
            expect(interpret(parse(func))[0].message).to.eql('Invalid arguments to (reduce (list) (lambda))');
        });

        it('should return error if second arg isn\'t lambda', function() {
            var func = '(reduce (list 1 2) 5)';
            expect(interpret(parse(func))[0].message).to.eql('Invalid arguments to (reduce (list) (lambda))');
        });
    });

    describe('reduceRight', function() {
        it('should execute function for each element in list', function() {
            var func = '(reduceRight (list 1 2 3 4) (lambda [prev x] (- prev x)))';
            expect(interpret(parse(func))).to.eql([-2]);
        });
    });

    describe('join', function() {
        it('should join an array', function() {
            expect(list.join([['a', 'b']])).to.equal('ab');
            expect(list.join([[1, 2, 3]])).to.equal('123');
        });

        it('should join by a string', function() {
            expect(list.join([['a', 'b'], ','])).to.equal('a,b');
        });

        it('should error on bad args', function() {
            expect(list.join(['str']).message).to.equal('Invalid argument to (join list string)');
            expect(list.join([['a', 'b'], 5]).message).to.equal('Invalid argument to (join list string)');
        });
    });

    describe('some', function() {
        it('should return true if one element returns true', function() {
            var func = '(some (list 1 2 3) (lambda [x] (= x 2)))';
            expect(interpret(parse(func))[0]).to.be.ok();
        });

        it('should return false if no element returns true', function() {
            var func = '(some (list 1 2 3) (lambda [x] (= x 4)))';
            expect(interpret(parse(func))[0]).to.not.be.ok();
        });

        it('should return error for invalid arguments', function() {
            var func = '(some 1 (lambda [x] (= x 4)))';
            var func2 = '(some (list 1 2 3) 5)';
            expect(interpret(parse(func))[0].type).to.equal('error');
            expect(interpret(parse(func2))[0].type).to.equal('error');
        });
    });

    describe('every', function() {
        it('should return true if every element returns true', function() {
            var func = '(every (list 1 1 1) (lambda [x] (= x 1)))';
            expect(interpret(parse(func))[0]).to.be.ok();
        });

        it('should return false if no element returns true', function() {
            var func = '(every (list 1 3 1) (lambda [x] (= x 1)))';
            expect(interpret(parse(func))[0]).to.not.be.ok();
        });

        it('should return error for invalid arguments', function() {
            var func = '(every 1 (lambda [x] (= x 4)))';
            var func2 = '(every (list 1 2 3) 5)';
            expect(interpret(parse(func))[0].type).to.equal('error');
            expect(interpret(parse(func2))[0].type).to.equal('error');
        });
    })
});