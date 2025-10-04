const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
           fullname:{
                    type:String,
                    required:true
           },
           email:{
               type:String,
           required:true,
           unique:true     
           },
           password:{
                    type:String,
           },
           mobile:{
                 type:String,
                    required:true   
           },
           role:{
                    type:String,
                    enum:["user","owner","delivery boy"]
           },
           resetotp:{
            type:String,
           },
           isotpverify:{
            type:Boolean,
            default:false
           },
           otpexpire:{
            type:Date
           },
           
},{timestamps:true})
UserSchema.index({location:'2dsphere'})
const User = mongoose.model("User",UserSchema);
module.exports = User;