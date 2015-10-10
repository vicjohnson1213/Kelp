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

#### If : `(if condition expression expression)`

**Returns:** The result of the first expression if condition evaluates to `true` and the result of the second expression if condition evaluates to `false`.

*Example:*
```
(if true 1 2) // Returns 1
(if false 1 2) // Returns 2
```