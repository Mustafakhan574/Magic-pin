import { createSlice } from "@reduxjs/toolkit";

const MapSlice = createSlice({
          name:"Map",
          initialState:{
             location:{
                    lat:null,
                    lon:null
             },
             address:null,       
          },
          reducers:{
           setlocation:(state,action)=>{
            const{lat,lon} = action.payload;
            state.location.lat = lat
            state.location.lon = lon
           },
           setaddress:(state,action)=>{
                    state.address = action.payload
           }
          }
})
export const {setlocation,setaddress} = MapSlice.actions
export default MapSlice.reducer