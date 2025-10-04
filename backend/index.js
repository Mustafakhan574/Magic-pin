const express = require('express');
const cors = require('cors');
const env = require('dotenv');
env.config();
const dbconect = require('./config/db');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/Auth.route');
const userRouter = require('./routes/user.routes');
const shopRouter = require('./routes/shop.route');
const itemRouter = require('./routes/item.route');
const orderRouter = require('./routes/order.route');
const CartRouter = require('./routes/cartitems.route');

const app = express();
const port = process.env.PORT || 3001
app.use(cors({
          origin:"https://magic-pin.onrender.com",
          credentials:true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/shop",shopRouter)
app.use("/api/item",itemRouter)
app.use("/api/order",orderRouter)
app.use("/api/cart",CartRouter)
app.listen(port,()=>{
          dbconect();
  console.log(`http://localhost:${port}`)
})

