module.exports = parse;

function parse(code) {
    var chars = fixupInput(code);
    var funcs = [];

    while (chars.length > 0) {
        chars = arrayTrim(chars);
        var res = parseFunc(chars);
        funcs.push(res.func);
    }

    return funcs;
}

function parseFunc(chars) {
    var func = {};

    // remove the opening parenthesis if there is one.
    if (chars[0] === '(') {
        chars.shift();
    }

    func.type = 'function';
    func.name = chars.splice(0, chars.indexOf(' ') !== -1 ?
        chars.indexOf(' ') :
        chars.indexOf(')')).join('');
    
    func.args = [];

    arrayTrim(chars);

    var token = {};

    while (chars && chars.length > 0) {
        var c = chars.shift();

        if ((!token.type && c.match(/[\d\-\+\.]/i)) || (token.type === 'number' && c.match(/[\d\-\+e\.]/i))) {
            token.type = 'number';
            token.value ? token.value += c : token.value = c;
        } else if ((!token.type || token.type === 'symbol') && c.match(/[A-Za-z\d_]/)) {
            token.type = 'symbol';
            token.value ? token.value += c : token.value = c;
        } else if (c.match(/\[/)) {
            var res = parseArgList(chars);
            func.argNames = res.args;
            chars = res.rest;
        } else if (c.match(/\s/)) {
            storeToken(token);
            token = {};
        } else if (c.match(/\(/)) {
            var res = parseFunc(chars);
            func.args.push(res.func);
            chars = res.rest;
        } else if (c.match(/"/)) {
            var res = parseString(chars);
            func.args.push(res.str);
            chars = res.rest;
        } else {
            storeToken(token);
            token = {};

            return {
                func: func,
                rest: chars
            };

        }
    }

    function storeToken(newToken) {
        if (newToken.type) {
            if (token.value === 'true' || token.value === 'false') {
                token.type = 'boolean';
            }

            func.args.push(newToken);
        }
    }

    function parseArgList(argList) {
        var args = [],
            arg = '';

        while (argList && argList.length > 0) {
            var c = argList.shift();

            if (/\s/.test(c)) {
                args.push({
                    type: 'symbol',
                    value: arg
                });

                arg = '';
            } else if (/\]/.test(c)) {
                args.push({
                    type: 'symbol',
                    value: arg
                });
                
                return {
                    args: args,
                    rest: argList
                };
            } else {
                arg += c;
            }
        }
    }

    function parseString(parts) {
        var str = '',
            c = parts.shift();

        while ((c !== '"' || str[str.length - 1] === '\\')) {
            str += c;
            c = parts.shift();
        }

        return {
            str: {
                type: 'string',
                value: str
            },
            rest: parts
        };
    }
}

function fixupInput(code) {
    return arrayTrim(code.replace(/\s+/g, ' ').split(''));
}

function arrayTrim(arr) {
    while (arr[0] && arr[0].match(/\s/)) {
        arr.shift();
    }

    while (arr[arr.length - 1] && arr[arr.length - 1].match(/\s/)) {
        arr.pop();
    }

    return arr;
}