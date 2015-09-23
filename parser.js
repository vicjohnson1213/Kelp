module.exports = parse;

function parse(code) {
    var funcs = [];
    while (code.length > 0) {
        if (code[0] === ' ') {
            code.shift();
        }

        var res = parseFunc(code);
        funcs.push(res.func);
        code = res.rest;
    }

    return funcs;
}

function parseFunc(chars) {
    var func = {};
    var chars;

    if (!chars) {
        return;
    }

    if (typeof chars === 'string') {
        chars = chars.split('');
    }

    if (chars[0] === '(') {
        chars.shift();
    }

    func.type = 'function';
    func.name = chars.splice(0, chars.indexOf(' ')).join('');
    func.args = [];

    if (chars[0] === ' ') {
        chars.shift();
    }

    var token = {};

    while (chars.length > 0) {
        var c = chars.shift();

        if ((!token.type || token.type === 'number') && /[\d\-]/.test(c)) {

            token.type = 'number';
            token.value ? token.value += c : token.value = c;

        } else if ((!token.type || token.type === 'symbol') && /[A-Za-z0-9_]/.test(c)) {

            token.type = 'symbol';
            token.name ? token.name += c : token.name = c;

        } else if (c === '(') {

            var res = parseFunc(chars);
            chars = res.rest;
            func.args.push(res.func);

        } else if (/\s/.test(c)) {
            addToken(token, func);
            token = {};

        } else if (c === ')') {
            addToken(token, func);
            return {
                func: func,
                rest: chars
            };
        } else if (c == '"') {
            var res = parseString(chars);
            func.args.push({
                type: 'string',
                value: res.string
            });

            chars = res.rest;
        }
    }

    function addToken(token, func) {
        if (token.type) {
            switch(token.name) {
                case 'true':
                case 'false':
                    token.type = 'boolean';
                    token.value = token.name;
                    delete token.name;
                    break;
            }

            func.args.push(token);
        }
    }

    function parseString(chars) {
        var string = '';
        var c = chars.shift();

        while (c !== '"') {
            string += c;
            c = chars.shift();
        }

        return {
            string: string,
            rest: chars
        };
    }
}