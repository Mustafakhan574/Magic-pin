const express = require('express');
const isauth = require('../middlewares/isauth');
const { createEditShop, getmyshop, getshopbycity } = require('../controllers/shop.controllers');
const upload = require('../middlewares/Multer');
const shopRouter = express.Router();
shopRouter.post("/create-edit",isauth,upload.single("image"),createEditShop)
shopRouter.get("/get-shop",isauth,getmyshop)
shopRouter.get("/get-city/:city",isauth,getshopbycity)
module.exports = shopRouter;