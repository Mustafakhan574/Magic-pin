const jwt = require('jsonwebtoken');
const isauth=(req,res,next)=>{
          try{    
          const token = req.cookies.token;
          if(!token){
               return   res.status(400).json({message:"token not found"})   
          }  
const decoded = jwt.verify(token,process.env.JWT_SECRET);
console.log(decoded.userid )
          req.userid = decoded.userid    
          next()   
          }catch(err){
                    return   res.status(400).json({message:"token not found"})
          }
}
module.exports = isauth;