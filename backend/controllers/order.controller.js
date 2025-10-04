const { Order } = require("../models/order.model");
const Shop = require("../models/Shop.model");
const User = require("../models/User.model");

exports.placeorder=async(req,res)=>{
          try{
      const {cartitems,paymentmethod,address,total} = req.body;
      console.log("total",total)
      if(cartitems.length == 0 || !cartitems){
          return res.status(400).json({message:"cart is empty"})
      }
      if(!address.text || !address.latitude || !address.longitude){
return res.status(400).json({message:"send complete delivery address is empty"})
      }
      const groupitemsbyshop = {}
      cartitems.forEach(item => {
           const shopid = item.shop
           if(!groupitemsbyshop[shopid]){
              groupitemsbyshop[shopid] = []
           }
           groupitemsbyshop[shopid].push(item)
      });
      const shoporders =await Promise.all(Object.keys(groupitemsbyshop).map(async(shopid)=>{
            const shop = await Shop.findById(shopid).populate("owner")
            if(!shop){
                return res.status(300).json({message:"shop not found"})
            }
            const items = groupitemsbyshop[shopid]
            const subtotal = items.reduce((sum,item)=>sum+Number(item.price)*Number(item.quantity),0)
            return {
                shop:shop._id,
                owner:shop.owner.id,
                subtotal,
                shoporderitems : items.map((i)=>({
                    item:i.id,
                    price:i.price,
                    quantity:i.quantity,
                    name:i.name
                }))
            }    
      }))
const neworder = await Order.create({
    user:req.userid,
    paymentmethod,
    deliveryaddress:address,
    total,
    shoporders,
})
await neworder.populate("shoporders.shoporderitems.item","name image price")
await neworder.populate("shoporders.shop","name")
return res.status(201).json(neworder);
          }catch(err){
   return res.status(500).json({message:"place order error",err})
          }
}
exports.getmyorders=async(req,res)=>{
    try{
        const user = await User.findById(req.userid);
        if(user.role == "user"){
const orders = await Order.find({user:req.userid}).sort({createdAt:-1})
.populate("shoporders.shop","name")
.populate("shoporders.owner","name email mobile")
.populate("shoporders.shoporderitems.item","name image price")
       
    return res.status(200).json(orders)
        }else if(user.role == "owner"){
      const orders = await Order.find({"shoporders.owner":req.userid}).sort({createdAt:-1})
      .populate("shoporders.shop","name")
      .populate("user")
      .populate("shoporders.shoporderitems.item","name image price")
       const filterorders = orders.map((order=>({
        _id : order._id,
        paymentmethod:order.paymentmethod,
        user:order.user,
        shoporders:order.shoporders.find(o=>o.owner._id==req.userid),
        createdAt:order.createdAt,
        deliveryaddress:order.deliveryaddress,

          
        })))
    return res.status(200).json(filterorders)
        }
    }catch(err){
   console.error("Get My Orders Error:", err); // Log the full error to the backend console
    return res.status(500).json({ message: "my order error" });
    }
}
exports.updateorderstatus=async(req,res)=>{
    try{
  const {orderid,shopid} = req.params
  const {status}  = req.body
  const order = await Order.findById(orderid)
  const shoporder = order.shoporders.find(o=>o.shop == shopid)
  if(!shoporder){
    return res.status(400).json({message:"shop order not found"})
  }
  shoporder.status = status;
  await shoporder.save()
  await order.save()
  return res.status(200).json(shoporder.status)

    }catch(err){
        return res.status(300).json({message:"update status of orders err",err})
    }
}