const  {Cartitems}  = require("../models/cartitems.model");
const User = require("../models/User.model");

exports.Createcartitems=async(req,res)=>{
          try{
   const {name,image,price,id,quantity,foodtype,shop}=req.body;
   
   const newuser = await User.findById(req.userid)
   if(!newuser){
          return res.status(400).json({message:"user not found"})
   }
   const userexistCartitems = await Cartitems.findOne({name,user:newuser._id});
   if (userexistCartitems) {
      return res.status(400).json({ message: "Item already in cart" });
    }
    const result =  await Cartitems.create({
          name,image,quantity,id,price,foodtype,shop,user:newuser._id,
     })
     return res.status(201).json(result)
          }catch(err){
                    console.log(err)
                    return res.status(500).json({message:"create cart items error",err})
                    
          }
}
exports.getCartitems = async (req, res) => {
  try {

    const items = await Cartitems.find({ user: req.userid });
    
    if (items.length === 0) {
      return res.status(404).json({ message: "No cart items found" });
    }

    return res.status(200).json(items);
  } catch (err) {
    
    return res.status(500).json({ message: "get cart items error", err });
  }
};

exports.Deletecartitems=async(req,res)=>{
       try{
   const cartid = req.params.cartid;
   if(!cartid){
       return res.status(300).json({message:"cart id not found"})
   }
   const result = await Cartitems.findByIdAndDelete(cartid)
   const final = await Cartitems.find({user:req.userid});
   return res.status(200).json(final)
       }catch(err){
              return res.status(500).json({message:"delete cart items error",err})
       }
}