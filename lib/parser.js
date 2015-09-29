module.exports = parse;

function parse(code) {
    var chars = fixupInput(code);
    var funcs = [];

    while (chars.length > 0) {
        var res = parseFunc(chars);
        funcs.push(res.func);
        chars = arrayTrim(res.rest);
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
    func.name = chars.splice(0, chars.indexOf(' ') !== -1 ? chars.indexOf(' ') : chars.indexOf(')')).join('');
    func.args = [];

    arrayTrim(chars);

    var token = {};

    while(chars && chars.length > 0) {
        var c = chars.shift();

        if ((!token.type || token.type === 'number') && c.match(/[\d\-\+e\.]/i)) {
            token.type = 'number';
            token.value ? token.value += c : token.value = c;
        } else if ((!token.type || token.type === 'symbol') && c.match(/[A-Za-z\d_]/)) {
            token.type = 'symbol';
            token.value ? token.value += c : token.value = c;
        } else if (c.match(/\s/)) {
            storeToken(token);
            token = {};
        } else if (c.match(/\(/)) {
            var res = parseFunc(chars);
            func.args.push(res.func);
            chars = res.rest;
        } else if (c.match(/\)/)) {

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
}

function fixupInput(code) {
    return code.replace(/\s+/g, ' ').trim().split('');
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