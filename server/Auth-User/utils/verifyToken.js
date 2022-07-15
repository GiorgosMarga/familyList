const jwt = require('jsonwebtoken')
const verifyJWT = (token) => {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    return isValid;

}

module.exports = verifyJWT;