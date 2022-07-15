const verifyJWT = require('../utils/verifyJWT');
const jwt = require("jsonwebtoken");
const Error = require('../errors')
const authenticatedUser = async (req,res,next) => {
    const token = req.headers["authorization"]?.split(' ')[1];
    if(!token){
        throw new Error.AuthenticationError("Unauthorized User");
    }
    if(!verifyJWT(token)){
        throw new Error.AuthenticationError("Unauthorized User");
    }
    const decoded = jwt.decode(token);
    req.user = {
        id: decoded.id,
        name: decoded.name
    }
    next();
}

module.exports = authenticatedUser;