const jwt = require("jsonwebtoken");
const gentoken=(userid)=>{
          try{
           const token = jwt.sign({userid},process.env.JWT_SECRET,{expiresIn:"7d"})
            return token;
          }catch(err){
                    console.error("Error generating token:", err);
    return null;
          }
}
module.exports = gentoken