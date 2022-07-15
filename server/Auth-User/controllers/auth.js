const User = require('../Models/User')
const {StatusCodes} = require('http-status-codes');
const Error = require("../errors/");
const crypto = require("crypto")
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const sendResetPasswordEmail = require("../utils/sendResetPassword");
const hashString = require('../utils/createHash');
const register = async (req,res) => {
    const {password, email, username} = req.body;
    const emailVerificationToken = crypto.randomBytes(40).toString('hex');
    const user = await User.create({password,email,username,emailVerificationToken});
    const token = user.createJWT();
    const origin = 'http://localhost:5050';
    await sendVerificationEmail({
        username,
        email,
        origin,
        emailVerificationToken
    })
    //REMOVE VERIFICATION TOKEN WHEN PUBLISHED
    res.status(StatusCodes.CREATED).json({msg:"User Created ", token,emailVerificationToken});
} 
const login = async (req,res) => {
    const {password, email} = req.body;
    if(!password || !email){
        throw new Error.BadRequestError("Please provide password or email");
    }
    const user = await User.findOne({email});
    if(!user){
        throw new Error.NotFoundError("Email or password incorrect. Please try again")
    }
    const isPasswordCorrect = await user.comparePasswords(password);
    if(!isPasswordCorrect){
        throw new Error.NotFoundError("Email or password incorrect. Please try again")
    }

    const token = user.createJWT();
    res.status(200).json(token);
}

const verifyEmail = async (req,res) => {
    const {emailVerificationToken, email} = req.body;
    if(!email || !emailVerificationToken){
        throw new Error.BadRequestError("Please provide the verification token and the email");
    }
    const user = await User.findOne({email});
    if(!user){
        throw new Error.UnauthenticatedError("Invalid Credentials");
    }
    if(emailVerificationToken !== user.emailVerificationToken){
        console.log(user.emailVerificationToken)
        throw new Error.UnauthenticatedError("Invalid Credentials");
    }
    user.verified = true;
    user.emailVerificationToken = '';
    await user.save();
    res.status(200).json({msg: "Success"});
}

const forgotPassword = async (req,res) => {
    const {email} = req.body;
    if(!email){
        throw new Error.BadRequestError("Please provide email");
    }
    const user = await User.findOne({email});
    if(user){
        const passwordVerificationToken = crypto.randomBytes(40).toString('hex');
        const tenMinutes = 1000 * 60 * 10;
        const origin = 'http://localhost:5050';
        const expireDate = new Date(Date.now() + tenMinutes);
        user.passwordResetToken = hashString(passwordVerificationToken);
        user.expireDatePasswordToken = expireDate;
        await user.save();
        await sendResetPasswordEmail({
            username:user.username,
            email,
            origin,
            passwordResetToken: hashString(passwordVerificationToken)
        })
    }
    
    res.status(StatusCodes.OK).json({msg: "Success", token: user.passwordResetToken});
}

const resetPassword = async (req,res) => {
    const {email,newPassword,token} = req.body;
    if(!email || !newPassword || !token){
        throw new Error.BadRequestError("Please provide all requirements");
    }
    const user = await User.findOne({email});
    if(user && user.passwordResetToken === token && user.expireDatePasswordToken > Date.now()){
        user.password = newPassword;
        user.passwordResetToken = null;
        user.expireDatePasswordToken = null;
        await user.save()
    }
    res.status(StatusCodes.OK).json({msg: "Success"});
}
module.exports = {register,login,verifyEmail,forgotPassword,resetPassword}