const express = require('express');
const { addItem, editItem, getitemid, deleteitem, getitembycity, rating } = require('../controllers/items.controllers');
const isauth = require('../middlewares/isauth');

const upload = require('../middlewares/Multer');

const itemRouter = express.Router();
itemRouter.post("/add-item",isauth,upload.single("image"),addItem)
itemRouter.get("/get-item/:itemid",isauth,getitemid)
itemRouter.get("/delete-item/:itemid",isauth,deleteitem)
itemRouter.post("/edit-item/:itemId",isauth,upload.single("image"),editItem)
itemRouter.post("/rating/:itemid",isauth,rating)
itemRouter.get("/getitembycity/:city",isauth,getitembycity)
module.exports = itemRouter;