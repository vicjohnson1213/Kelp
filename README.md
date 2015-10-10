# Kelp

[![Build Status](https://travis-ci.org/vicjohnson1213/Kelp.svg?branch=master)](https://travis-ci.org/vicjohnson1213/Kelp) [![Dependency Status](https://david-dm.org/vicjohnson1213/Kelp.svg)](https://david-dm.org/vicjohnson1213/Kelp)

> A minimal functional programming language running on node.js

## Installation

If you have node.js and npm installed, simply run the following command

```bash
npm i -g clone git+https://github.com/vicjohnson1213/Kelp.git
```

If you don't have node.js and npm, you can install node.js, npm, and Kelp using cURL:

```bash
source /dev/stdin <<< "$(curl -o- https://raw.githubusercontent.com/vicjohnson1213/Kelp/master/install.sh)"
```

or Wget:

```bash
source /dev/stdin <<< "$(wget -qO- https://raw.githubusercontent.com/vicjohnson1213/Kelp/master/install.sh)"
```

## Usage

Once Kelp is installed, it can be used by the `kelp` command.  Please run `kelp -h` for usage information.

## Syntax

All functions are enclosed in parenthesis, with the first Expression being the function to call and all following expressions are the arguments.

*Example:*
```
(+ 1 2) // Returns 3
```

*Note:* All values can be replaces with function calls that evaluate to the expected type.

*Example:*
```
(+ 1 2 (* 2 3)) // Returns 9
```

The only exception to to that pattern is declaring a lambda function.  Lmbda functions use `[]` to enclose the parameters.

*Example:*
```
(lambda [x y] (+ x y)) // Returns a function that will add x and y together
```

# API

- Builtin Functions
    - [Comparison functions](#comparison-functions)
    - [Control Flow Functions](#control-flow-functions)
    - [Environment Functions](#environment-functions)
    - [List Functions](#list-functions)
    - [Math Functions](#math-functions)
    - [String Functions](#string-functions)
    - [Test Functions](#test-functions)


## Comparison Functions

#### Equality: `(= param param)`

**Returns:** `true` if the two values are equal and `false` otherwise.

*Example:*
```
(= 1 1) // Returns true
(= 1 2) // Returns false
```

#### Less Than: `(< param param)`

**Returns:** `true` if the left value is less than the right and `false` otherwise.

*Example:*
```
(< 0 1) // Returns true
(< 1 1) // Returns false
(< 1 0) // Returns false
```

#### Less Than or Equal To: `(<= param param)`

**Returns:** `true` if the left value is less than or equal to the right and `false` otherwise.

*Example:*
```
(< 0 1) // Returns true
(< 1 1) // Returns true
(< 1 0) // Returns false
```

#### Greater Than: `(> param param)`

**Returns:** `true` if the left value is greater than the right and `false` otherwise.

*Example:*
```
(> 0 1) // Returns false
(> 1 1) // Returns true
```

#### Greater Than or Equal To: `(>= param param)`

**Returns:** `true` if the left value is less than or equal to the right and `false` otherwise.

*Example:*
```
(> 0 1) // Returns false
(> 1 1) // Returns true
(> 1 0) // Returns true
```

## Control Flow Functions

#### If: `(if condition expression expression)`

**Returns:** The result of the first expression if condition evaluates to `true` and the result of the second expression if condition evaluates to `false`.

*Example:*
```
(if true 1 2) // Returns 1
(if false 1 2) // Returns 2
```

## Environment Functions

#### Let: `(let symbol expression expression)`

Sets `symbol` to the result of the evaluation of the first expression, then evaluates the last expression with with the specified variable binding.

*Note:* Inner variable assignments will take precedence over outer ones, though the outer variable bindings will still remain in the scope of that function.

**Returns:** The result of the evaluation of the final expression.

*Example:*
```
(let x 5 (+ x x)) // returns 10
(let x 5
    (let x 10 (+ x x))) // returns 20.
```

#### Define: `(define definition expression)`

Binds the expression to the definition and stores the function in the environment so it can be called later.

*Example:*
```
(define (add x y) (+ x y)) // Binds a function (sum) that takes arguments x and y to the environment.
(add 1 2) // Returns 3
```

## List Functions

#### List: `(list expression ...)`

**Returns:** A new list containing the expressions.

*Example:* 
```
(list) // Returns an empty list
(list 1 2 3 4) // Returns a list containing 1, 2, 3, and 4
```

#### Empty: `(empty list)`

**Returns:** `true` if `list` is empty` and `false` otherwise.

*Example:*
```
(empty (list)) // Returns true
(empty (list 1)) // Returns false
```

#### First: `(first list)`

**Returns:** The first element in the list.

*Example:*
```
(first (list 1 2 3)) // Returns 1
```

#### Second: `(second list)`

**Returns:** The second element in the list.

*Example:*
```
(second (list 1 2 3)) // Returns 2
```

#### Get Element: `(getElement number list)`

**Returns:** The element of `list` at index `number` (0 indexed).

*Example:*
```
(second (list 1 2 3)) // Returns 2
```

#### Concat: `(concat list ...)`

**Returns:** A new list containing all elements of each list passed in as arguments.

*Example:*
```
(concat (list 1 2) (list 3 4)) // returns (list 1 2 3 4)
```

#### Join: `(join list separator)`

**Returns:** A string with each element of `list` separated by `separator`.

*Note:* If `separator` is omitted, an empty string will be used.

*Example:*
```
(join (list 1 2 3)) // Returns "123"
(join (list 1 2 3) ", ") // Returns "1, 2, 3"
```

#### Map: `(map list lambda)`

**Returns:** A new array with `lambda` applied to each element of `list`.

The arguments passed to `lambda` are:
1. `element`: The element to run `lambda` on.
2. `index`: The index of the element currently being executed.

*Example:*
```
(map (list 1 2 3) (lambda [el] (* el el))) // Returns (list 1 4 9)
(map (list 1 2 3) (lambda [el idx] (+ el idx))) // Returns (list 1 3 5)
```

#### Reduce: `(reduce list lambda)`

**Returns:** The aggregation of all element from left to right, executing `lambda` on the current aggregation and the current element.

The arguments passed to `lambda` are:
1. `prev`: The current aggregation of the previous elements.
2. `element`: The element to run `lambda` on.

*Example:*
```
(reduce (list 1 2 3) (lambda [prev el] (+ prev el))) // Returns 6
```

#### Reduce Right: `(reduceRight list lambda)`

**Returns:** The aggregation of all element from right to left, executing `lambda` on the current aggregation and the current element.

The arguments passed to `lambda` are:
1. `prev`: The current aggregation of the previous elements.
2. `element`: The element to run `lambda` on.

*Example:*
```
(reduceRight (list 1 2 3) (lambda [prev el] (+ prev el))) // Returns 6
```

## Math Functions

#### Addition: `(+ number ...)`

**Returns:** The sum of all numbers passed as arguments.

*Example:*
```
(+ 1 2 3) // Returns 6
```

#### Subtraction: `(- number ...)`

**Returns:** The difference of all numbers passed as arguments, subtracted from left to right.

*Example:*
```
(+ 1 2 3) // Returns -4
```

#### Multiplication: `(* number ...)`

**Returns:** The product of all numbers passed as arguments.

*Example:*
```
(+ 1 2 3 4) // Returns 24
```

#### Division: `(/ number ...)`

**Returns:** The quotient of all numbers passed as arguments, divided from left to right.

*Example:*
```
(/ 16 4 2) // Returns 2
```

#### Modulo: `(% number number)`

**Returns:** The remoainder of the division of the left number by the right number.

*Example:*
```
(% 5 2) // Returns 1
```

## Misc

#### Lambda: `(lambda [arguments] expression)`

**Returns:** A function that takes `arguments` and executed `expression` with them.

*Example:*
```
(lambda [x] (* x x)) // Returns a function to square x
```