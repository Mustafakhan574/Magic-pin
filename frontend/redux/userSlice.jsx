import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
          name:"user",
          initialState:{
                    userData:null,
                    currentCity:null,
                    currentState:null,
                    currentAddress:null,
                    shopsinmycity:null,
                    itemsinmycity:null,
                    allitemsinmycity: null,
                    cartitems:[],
                    myorders :[],

          },
          reducers:{
           setuserData:(state,action)=>{
            state.userData = action.payload;
           },
           setcurrentCity:(state,action)=>{
            state.currentCity = action.payload;
           },
           setcurrentState:(state,action)=>{
            state.currentState = action.payload;
           },
           setcurrentAddress:(state,action)=>{
            state.currentAddress = action.payload;
           },
           setshopsinmycity:(state,action)=>{
            state.shopsinmycity = action.payload;
           },
           setitemsinmycity:(state,action)=>{
            state.itemsinmycity = action.payload;
            state.allitemsinmycity = action.payload;
           },
           setcartitems:(state,action)=>{
            state.cartitems = action.payload
           },
           updatequantity:(state,action)=>{
const {id,quantity} = action.payload;
const item = state.cartitems.find(i=>i.id==id);
if(item){
          item.quantity = quantity
}
           },
           deleteitem:(state,action)=>{
const id = action.payload;
const item = state.cartitems.filter(i=>i.id !== id);
state.cartitems = item;
},
setmyorders:(state,action)=>{
     state.myorders = action.payload
},
     addmyorder:(state,action)=>{
          state.myorders = [action.payload,...state.myorders]
     },
     updateorderstatus:(state,action)=>{
     const {orderid,shopid,status} = action.payload
     const order = state.myorders.find(o=>o._id == orderid)
      if(order){
          if(order.shoporders && order.shoporders.shop._id == shopid){
               order.shoporders.status = status
          }
      }
     },
     search:(state,action)=>{
          const input = action.payload.toLowerCase().trim();
          if (!input) {
    // If search is empty, show all items
    state.itemsinmycity = state.allitemsinmycity;
    return;
  }
          state.itemsinmycity  = state.itemsinmycity.filter(i=>i.name.toLowerCase().includes(input))
     }
          }
})
export const {setuserData,setcurrentCity,setcurrentState,setcurrentAddress,setshopsinmycity,setitemsinmycity,addtocart,updatequantity,deleteitem,setmyorders,addmyorder,updateorderstatus,search,setcartitems} = userSlice.actions
export default userSlice.reducer