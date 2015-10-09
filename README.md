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
curl -o- https://raw.githubusercontent.com/vicjohnson1213/Kelp/master/install.sh | bash
```

or Wget:

```bash
wget -qO- https://raw.githubusercontent.com/vicjohnson1213/Kelp/master/install.sh | bash
```

## Usage

Once Kelp is installed, it can be used by the `kelp` command.  Please run `kelp -h` for usage information.

## Basic Syntax

All functions are enclosed in parenthesis, with the first word being the function name and all following expressions act as the arguments.

*Example:*
```
(functionName arg1 arg2 (function2 function2Arg1))
```
