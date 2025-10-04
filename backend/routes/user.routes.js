const express = require('express');
const { getcuruser } = require('../controllers/user.controllers');
const isauth = require('../middlewares/isauth');
const userRouter = express.Router();
userRouter.get("/getcuruser",isauth,getcuruser)
module.exports = userRouter;
