const express = require('express');
const { signup, login, logout, sendotp, verifyotp, resetpassword, googleauth } = require('../controllers/Auth.controllers');
const authRouter = express.Router();
authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.post("/logout",logout)
authRouter.post("/send-otp",sendotp)
authRouter.post("/verify-otp",verifyotp)
authRouter.post("/reset-password",resetpassword)
authRouter.post("/google-auth",googleauth)

module.exports = authRouter;
