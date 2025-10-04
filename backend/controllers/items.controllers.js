const uploadcloudinary = require("../config/cloudinary");
const Item = require("../models/Item.model");
const Shop = require("../models/Shop.model");
const { options } = require("../routes/item.route");

exports.addItem=async(req,res)=>{
          try{
     const {name,category,foodtype,price} = req.body;
     let image;
     if (req.file) {
      try {
        image = await uploadcloudinary(req.file.path); // ❗️Can fail if Cloudinary isn't working
      } catch (uploadErr) {
        console.error("Image upload failed:", uploadErr);
        return res.status(500).json({ message: "Image upload failed", err: uploadErr.message });
      }
    }
     const shop = await Shop.findOne({owner:req.userid}).populate({
          path:"items",
          options:{sort:{updatedAt:-1}}
     });
     if(!shop){
          return res.status(400).json({message:"shop not found"})
     }
     const item = await Item.create({
          name,category,foodtype,price,image,shop:shop._id
     })
     shop.items.push(item._id)
     await shop.save()
     await shop.populate([
          {path:"owner"},
          {
          path:"items",
          options:{sort:{updatedAt:-1}}
     }])
     return res.status(201).json(shop);
          }catch (err) {
    console.error("Add item error:", err);
    return res.status(500).json({ message: "add item", err: err.message || err });
  }
}
exports.editItem=async(req,res)=>{
          try{
       const itemid = req.params.itemId;
      const {name,category,foodtype,price} = req.body;
      let image;
      if(req.file){
          image=await uploadcloudinary(req.file.path);
      }
      const item = await Item.findByIdAndUpdate(itemid,{
          name,category,foodtype,price,image
      },{new:true})

      if(!item){
return res.status(500).json({message:"item not found"});
      }
      const shop = await Shop.findOne({owner:req.userid}).populate({
          path:"items",
          options:{sort:{updatedAt:-1}}
     })
      return res.status(200).json(shop);
          }catch(err){
        return res.status(500).json({message:"item edit err",err});
          }
}
exports.getitemid=async(req,res)=>{
     try{
  const itemid = req.params.itemid;
  const item = await Item.findById(itemid)
  if(!item){
     return res.status(500).json({message:"item not found",err});
  }
  return res.status(200).json(item)
     }catch(err){
res.status(500).json({message:"edit get item err",err})
     }
}
exports.deleteitem=async(req,res)=>{
     try{
 const itemid = req.params.itemid;
 const item = await Item.findByIdAndDelete(itemid)
 if(!item){
     return res.status(300).json({message:"item not found"})
 }
 const shop = await Shop.findOne({owner:req.userid})
 shop.items = shop.items.filter(i=>i._id !== item._id)
 await shop.save()
 await shop.populate("items")
 return res.status(200).json(shop)
     }catch(err){
          console.log("delete item",err)
     }
}
exports.getitembycity=async(req,res)=>{
     try{
  const {city} = req.params;
  if(!city){
     return res.status(400).json({message:"city not found"})
  }
  const shops =await Shop.find({
     city:{$regex:new RegExp(`^${city}$`,"i")}
}).populate("items")
if(!shops){
     return res.status(300).json({message:"shop not found"})
}
const shopids = shops.map((shop)=>shop._id)
 const items = await Item.find({shop:{$in:shopids}})
 return res.status(200).json(items)
     }catch(err){
   return res.status(400).json({message:"get item by city err",err})
     }
}
exports.rating=async(req,res)=>{
     try{
    const {rating} = req.body;      
  const itemid = req.params.itemid;
  let item = await Item.findById(itemid);
  if(!item){
     return res.status(400).json({message:"rating item not found"})
  }        
      item.rating.push(rating)
     let total = item.rating.reduce((num,cal)=>num+cal,0);
     let totallength = item.rating.length;
     const final = Math.round(total / totallength); 
     item.averageRating = final; 
      await item.save()
      return res.status(200).json(item.averageRating);
     }catch(err){
         return res.status(500).json({message:"rating error",err})
     }
}