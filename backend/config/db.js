const mongoose = require('mongoose');
const dbconect=async ()=>{
   await   mongoose.connect("mongodb+srv://mk3855315_db_user:M9vgOPVU7zOYNFsm@magic.bxudopw.mongodb.net/")
   console.log('db connect')
}
module.exports = dbconect;