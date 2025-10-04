const express = require('express');
const isauth = require('../middlewares/isauth');
const { placeorder,  getmyorders, updateorderstatus } = require('../controllers/order.controller');
const orderRouter = express.Router();
orderRouter.post("/placeorder",isauth,placeorder)
orderRouter.post("/updatestatus/:orderid/:shopid",isauth,updateorderstatus)
orderRouter.get("/myorders",isauth,getmyorders)


module.exports = orderRouter;