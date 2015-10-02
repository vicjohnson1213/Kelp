function returnError(message) {
    return {
        type: 'error',
        message: message,
    }
}

module.exports.returnError = returnError;
