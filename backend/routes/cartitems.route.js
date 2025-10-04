const express = require('express');
const upload = require('../middlewares/Multer');
const { Createcartitems, getCartitems, Deletecartitems } = require('../controllers/Cartitems.controllers');
const isauth = require('../middlewares/isauth');
const CartRouter = express.Router();

CartRouter.post("/cartitems",isauth,Createcartitems)
CartRouter.get("/getcartitems", isauth,getCartitems);
CartRouter.get("/deletecartitems/:cartid",isauth,Deletecartitems)
module.exports = CartRouter;