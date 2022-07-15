const verifyJWT = require('../utils/verifyToken')
const Error = require('../errors')
const jwt = require("jsonwebtoken");
const authenticatedUser = async (req,res,next) => {
    
    const token = req.headers["authorization"]?.split(' ')[1];
    if(!token){
        throw new Error.UnauthenticatedError("Unauthorized User");
    }
    if(!verifyJWT(token)){
        throw new Error.UnauthenticatedError("Unauthorized User");
    }
    const decoded = jwt.decode(token);
    req.user = {
        id: decoded.id,
        name: decoded.name
    }
    next();
}

module.exports = authenticatedUser;