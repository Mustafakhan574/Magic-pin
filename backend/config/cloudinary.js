const cloudinary = require('cloudinary').v2;
const env = require('dotenv');
const fs = require('fs');
env.config();
cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET})

const uploadcloudinary=async(filepath)=>{
          try{
          const result =   await cloudinary.uploader.upload(filepath)  
          console.log(result) 
          fs.unlinkSync(filepath)
   return result.secure_url;
          }catch(err){
  console.log('clodinary error',err)
          }
}
module.exports = uploadcloudinary;


