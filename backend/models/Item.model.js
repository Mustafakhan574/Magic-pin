const mongoose = require('mongoose');
const itemSchema  = new mongoose.Schema({
          name:{
                    type:String,
                    required:true
          },
          image:{
                    type:String,
                    required:true
          },
          shop:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Shop"
          },
          category:{
                 type:String,
                 required:true,
          enum:[
                    "Snacks",
                    "Main course",
                    "Desserts",
                    "Pizza",
                    "Burgers",
                    "Sandwiches",
                    "South indian",
                    "North indian",
                    "Chinese",
                    "Fast Food",
                    "Others"
          ]   
          },
          price:{
                    type:Number,
                    min:0,
                    required:true
          },
          foodtype:{
                    type:String,
                    enum:["veg","non veg"],
                    required:true
          },
  rating: {
    type: [Number],
    default:[],
  },
  averageRating: {
    type: Number,
    default: 0
  }        
},{timestamps:true})

const Item = mongoose.model("Item",itemSchema)
module.exports = Item;