const {StatusCodes} = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class AuthenticationError extends CustomAPIError {
    constructor(message){
        super(message)
        this.statusCodes = StatusCodes.UNAUTHORIZED
    }
}

module.exports = AuthenticationError;