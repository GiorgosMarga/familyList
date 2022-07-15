const {register,login, verifyEmail, forgotPassword, resetPassword} = require("../controllers/auth")
const express = require('express')
const authenticatedUser = require('../middlewares/authenticated')
const router = express.Router()

router.post('/register', register).post("/login",login).post("/verify-email",verifyEmail).post('/forgot-password',forgotPassword).post('/reset-password',resetPassword);

module.exports = router