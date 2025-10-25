import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import { MdDeliveryDining } from "react-icons/md";
import { CiMobile4 } from "react-icons/ci";
import { BsCreditCard2Back } from "react-icons/bs";
import {MapContainer, Marker, TileLayer, useMap} from "react-leaflet"
import { useDispatch, useSelector } from 'react-redux';
import "leaflet/dist/leaflet.css"
import { setaddress, setlocation } from '../../redux/MapSlice';
import axios from "axios"
import { serverurl } from '../App';
import { addmyorder } from '../../redux/userSlice';
function RecenterMap({location}){
  if(location.lat && location.lon){
    const map = useMap()
    map.setView([location.lat,location.lon],16,{animate:true})
  }
    return null   
}
const CheckOut = () => {
          const navigate = useNavigate()
          const dispatch = useDispatch()
          const [addressinput,setaddressinput] = useState("")
          const [paymentmethod,setpaymentmethod] = useState("cod")
          const {location,address} = useSelector((state)=>state.map)
          const {cartitems} = useSelector((state)=>state.user)
          const apikey  = import.meta.env.VITE_GEOAPI_KEY
          let Deliveryfee = 0;
          let subTotal = cartitems?.reduce((acc,item)=>
             acc+item.price*item.quantity
         ,0)
         
          Deliveryfee = subTotal > 500?0:40
          let total = subTotal + Deliveryfee
         console.log(total)
          const onDragend=(e)=>{
            const {lat,lng} = e.target._latlng
            dispatch(setlocation({lat,lon:lng}))
            getaddressbylatlon(lat,lng)
            
          }
          const getaddressbylatlon=async(lat,lng)=>{
            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apikey}`) 
          dispatch(setaddress(result?.data?.results[0].address_line2))
          }
          const getcurlocation=()=>{
            navigator.geolocation.getCurrentPosition(async(position)=>{
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          dispatch(setlocation({lat:latitude,lon:longitude}))
          getaddressbylatlon(latitude,longitude)
          })}
          const latlonbyaddress=async()=>{
            try{
              const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressinput)}&apiKey=${apikey}`)
              const {lat,lon}=result.data.features[0].properties
              dispatch(setlocation({lat,lon}))
            }catch(err){
              console.log("lat lon by address",err)
            }
          }
          useEffect(()=>{
         setaddressinput(address)
          },[address])
        const handleplaceorder=async()=>{
          try{
        const result = await axios.post(`${serverurl}/api/order/placeorder`,{
          paymentmethod,
          address:{
            text:addressinput,
            latitude:location.lat,
            longitude:location.lon,
          },
          total,
          cartitems,
        },{withCredentials:true})
        dispatch(addmyorder(result.data))
        navigate("/orderplaced")
          }catch(err){
        console.log("place order err",err)
          }
        }  
  return (
    <div className='min-h-screen flex items-center justify-center p-6'>
    <div className='absolute top-[20px] left-[20px] z-[10]'onClick={()=>navigate("/cart")}>
       <FaArrowLeftLong size={35} className='text-[red]'/>
    </div>
    <div className='w-full max-w-[900px] rounded-2xl shadow-2xl p-6 space-y-6'>
      <h1 className='text-3xl font-bold'>CheckOut</h1>
        <section>
          <h2 className='text-xl font-medium'>Order Summary</h2>
          <div className='rounded-xl border p-4 space-y-2'>
        {cartitems?.map((item,index)=>(
          <div key={index} className='flex justify-between text-sm '>
           <span>{item.name} x {item.quantity}</span>
           <span>{item.price * item.quantity} Rs</span>
          </div>
          
        ))}
        <hr/>
       <div className='flex justify-between'>
        <span>Subtotal</span>
        <span>{subTotal}</span>
       </div>
       <div className='flex justify-between'>
        <span>Deliveryfee</span>
        <span>{Deliveryfee == 0?"Free": Deliveryfee}</span>
       </div>
       <div className='flex justify-between'>
        <span className='text-2xl text-[red] font-medium'>Total</span>
        <span className='text-2xl text-[red] font-medium'>{total} Rs</span>
       </div>
          </div>
        </section>
        <button className='w-full bg-[aqua] py-3 rounded-xl font-semibold hover:bg-[#08f408] 'onClick={handleplaceorder}>{paymentmethod=="cod"?"place order":"Pay and Place order "}</button>
    </div>
    </div>
  )
}

export default CheckOut
