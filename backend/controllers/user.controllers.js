const User = require("../models/User.model");

exports.getcuruser=async(req,res)=>{
          try{
      const userid = req.userid;
      console.log("userid",userid);
      if(!userid){
          return res.status(400).json({message:"token not find"})
      }
      let user = await User.findById(userid);
      if(!user){
                   return res.status(400).json({message:"not found user"})
      }
      return res.status(200).json(user);

          }catch(err){
                    console.log(err)
return res.status(400).json({message:"get cur user"})
                    
          }
}
