const uploadcloudinary = require("../config/cloudinary");
const Shop = require("../models/Shop.model");

exports.createEditShop=async(req,res)=>{
          try{
     const {name,city,state,address} = req.body;
     let image;
     if(req.file){
        image = await uploadcloudinary(req.file.path)
     }
     let shop = await Shop.findOne({owner:req.userid})
     if(!shop){
     const shop = await Shop.create({
name,city,state,address,image,owner:req.userid
     })
     }else{
          shop = await Shop.findByIdAndUpdate(shop._id,{
             name,city,state,address,image,owner:req.userid       
          },{new:true})
     }
     await shop.populate("owner items")
     return res.status(201).json(shop)
          }catch(err){
                    console.log("create shop",err)
                    return res.status(500).json({message:"create shop error"})
          }
}
exports.getmyshop=async(req,res)=>{
   try{
     const shop = await Shop.findOne({owner:req.userid}).populate("owner items");
     if(!shop){
          return res.status(500).json({message:"shop not found"})
     }
     return res.status(200).json(shop);
   }catch(err){
    return res.status(300).json({message:"get my shop err"})
   }
}
exports.getshopbycity=async(req,res)=>{
     try{
const {city} = req.params
const shops =await Shop.find({
     city:{$regex:new RegExp(`^${city}$`,"i")}
}).populate("items")
if(!shops){
     return res.status(300).json({message:"shop not found"})
}
return res.status(200).json(shops)
     }catch(err){
          return res.status(500).json({message:"get shop by city",err})
     }
}
