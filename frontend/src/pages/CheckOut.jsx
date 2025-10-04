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
          <h2 className='text-lg font-semibold mb-2 flex items-center gap-2 '><CiLocationOn size={28} className='text-red-500 font-bold'/>Delivery Location</h2>
          <div className='flex gap-2 mb-3'>
                    <input type="text" className='flex-1 border rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[aqua]' placeholder='Enter your address' value={addressinput} onChange={(e)=>setaddressinput(e.target.value)}/>
                    <button className='hover:border p-2 rounded-3xl'onClick={latlonbyaddress}><IoIosSearch size={25}/></button>
                    <button className='hover:border p-2 rounded-3xl'onClick={getcurlocation}><TbCurrentLocation size={20}/></button>
          </div>
          <div className='rounded-xl border overflow-hidden'>
          <div className='h-64 w-full items-center justify-center'>
          <MapContainer className='w-full h-full' center={[location?.lat,location?.lon]} zoom={13}>
             <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />  
  <RecenterMap location={location}/>
  <Marker position={[location?.lat,location?.lon]} draggable eventHandlers={{dragend:onDragend}}></Marker>
          </MapContainer>
          </div>
          </div>
      </section>
        <section>
          <h2 className='text-lg font-medium'>Payment Method</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentmethod === "cod" ? "border-[red] bg-amber-300 shadow":"border-grey-200 hover:border-grey-300"}`} onClick={()=>setpaymentmethod("cod")}>
             <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-400'><MdDeliveryDining className='text-xl'/></span>
             <div>
             <p className='font-medium'>Cash on Delivery</p>
             <p className='text-xs'>Pay when your item arrive</p>
             </div>
            </div>
            <div className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentmethod === "online" ? "border-[red] bg-amber-300 shadow":"border-grey-200 hover:border-grey-300"}`}onClick={()=>setpaymentmethod("online")}>
            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full border bg-[aqua]'><CiMobile4 className='text-xl font-bold'/></span>
            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full border bg-[aqua]'><BsCreditCard2Back className='text-xl'/></span>
            <div>
              <p className='font-medium'>UPI/CREDIT/DEBIT CARD</p>
              <p className='text-xs'>pay securly online</p>
            </div>
            </div>
          </div>
        </section>
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