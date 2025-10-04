const  mongoose = require("mongoose");

const CartitemsSchema = new mongoose.Schema({
         name:{
                             type:String,
                             required:true
                   },
                   image:{
                             type:String,
                             
                   },
                   shop:{
                     type:mongoose.Schema.Types.ObjectId,
                                        ref:"Shop"
                   },
                   user:{
                             type:mongoose.Schema.Types.ObjectId,
                             ref:"User"
                   },
                   price:{
                             type:Number,
                             min:0,
                             required:true
                   },
                   quantity:{
                    type:Number,
                    required:true
                   },
                   id:{
                    type:String,
                    required:true,
                   },
                   foodtype:{
                             type:String,
                             enum:["veg","non veg"],
                             required:true
                   },
})
exports.Cartitems = mongoose.model("Cartitems",CartitemsSchema);