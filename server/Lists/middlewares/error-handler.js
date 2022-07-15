const {StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err,req,res,next) => {
    let error = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong. Try again later"
    }

    if(err.code && err.code === 11000) {
        error.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field please choose another value`,
        error.statusCode = 400;
    }
    return res.status(error.statusCode).json({msg: error.msg})
}
module.exports = errorHandlerMiddleware