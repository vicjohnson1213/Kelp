function returnError(message) {
    return {
        type: 'error',
        message: message,
    }
}

function addCallStack(err, callStack) {
    err.callStack = callStack
    return err;
}

module.exports = {
    returnError: returnError,
    addCallStack: addCallStack
};
