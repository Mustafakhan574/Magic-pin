import { createSlice } from "@reduxjs/toolkit";

const OwnerSlice = createSlice({
          name:"Owner",
          initialState:{
                    shopData:null,
                    shopItems:null,
          },
          reducers:{
           setshopData:(state,action)=>{
            state.shopData = action.payload;
           },
          }
})
export const {setshopData} = OwnerSlice.actions
export default OwnerSlice.reducer