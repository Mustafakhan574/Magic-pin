const User = require("../models/User.model");
const bcrypt = require('bcryptjs');
const gentoken = require("../config/token");
const Sendotpmail = require("../utils/mail.js")
exports.signup=async(req,res)=>{
     try{
    const {fullname,email,password,mobile,role} = req.body;
       let user = await User.findOne({email});
       if(user){
          return res.status(400).json({message:"user already exists"})
       }
       if(password.length < 6){
          return res.status(400).json({message:"enter at least 6 character"})
       }
       if(mobile.length < 10){
          return res.status(400).json({message:"enter  valid mobile number"})
       }
       if(!email.includes("@")){
          return res.status(400).json({message:"enter valid email"})
       }
       const hashedpassword = await bcrypt.hash(password,10)
        let result = await User.create({
          fullname,
          email,
          password:hashedpassword,
          role,
          mobile
         })  
         const token = gentoken(result._id );
              res.cookie("token",token,{
                    secure:true,
                    sameSite:"None",
                    maxAge:7*24*60*60*1000,
                    httpOnly:true
              })
         return res.status(201).json(result)     
     }catch(err){
     console.error("Sign up error:", err);
    
    // Return a 500 error with a generic message
    return res.status(500).json({ message: "Sign up error", error: err.message });
     }
}
exports.login=async(req,res)=>{
     try{
    const {email,password} = req.body;
       let user = await User.findOne({email});
       if(!user){
          return res.status(400).json({message:"user not find"})
       }
       const ismatched = await bcrypt.compare(password,user.password)
       if(!ismatched){
          return res.status.json({message:"wrong password"})
       }
const token = await gentoken(user._id);
              res.cookie("token",token,{
                    secure:true,
                    sameSite:"None",
                    maxAge:7*24*60*60*1000,
                    httpOnly:true
              })
         return res.status(201).json(user)     
     }catch(err){
     return res.status(500).json({message:"sign in error"})
     }
}
exports.logout=async(req,res)=>{
          try{
         res.clearCookie("token")
         return res.status(200).json({message:"log out successfully"})
          }catch(err){
                    console.log("log out error",err)
                    return res.status(500).json({message:"log out error"})
          }
}
exports.sendotp=async(req,res)=>{
   try{
const {email} = req.body;
const user = await User.findOne({email})
if(!user){
   return res.status(400).json({message:"user not found"})
}
const otp = Math.floor(1000 + Math.random() * 9000).toString()
user.resetotp = otp
user.otpexpire = Date.now()+5*60*1000
user.isotpverify = false
await user.save()
await Sendotpmail(email,otp)
return res.status(200).json({message:"OTP send succesfully"})
   }catch(err){
      console.log('send otp',err)
   }
}
exports.verifyotp=async(req,res)=>{
   try{
  const {email,otp} = req.body;
  const user = await User.findOne({email}) 
  if(!user || user.resetotp !== otp || user.otpexpire < Date.now()){
   return res.status(400).json({message:"invalid otp"})
  }
  user.isotpverify = true
  user.resetotp = undefined
  user.otpexpire = undefined
  await user.save()
  return res.status(200).json({message:"otp verified successfully"})
   }catch(err){
      console.log("verify otp",err)
   }
}
exports.resetpassword=async(req,res)=>{
   try{
const {email,newpassword} = req.body;
const user = await User.findOne({email})
if(!user || !user.isotpverify){
   return res.status(400).json({message:"otp verification required"})
}
const hashedpassword = await bcrypt.hash(newpassword,10);
user.password = hashedpassword;
user.isotpverify = false
await user.save()
return res.status(200).json({message:"password reset succesfully"})
   }catch(err){
      console.log("reset err",err)
   }
}
exports.googleauth=async(req,res)=>{
   try{
  const {fullname,email,mobile,role} = req.body;
  let user = await User.findOne({email});
  if(!user){
    user = await User.create({
      fullname,email,mobile,role
    })
  }
  const token = await gentoken(user._id);
              res.cookie("token",token,{
                    secure:false,
                    sameSite:"strict",
                    maxAge:7*24*60*60*1000,
                    httpOnly:true
              })
 return res.status(200).json(user)
   }catch(err){
  console.log("google auth",err)
   }
}
