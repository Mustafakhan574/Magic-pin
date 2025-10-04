import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setcurrentAddress, setcurrentCity, setcurrentState,} from '../../redux/userSlice'
import {  setaddress, setlocation } from '../../redux/MapSlice'
const useGetcity = () => {
        const dispatch = useDispatch()
        const {userData,city} = useSelector((state)=>state.user)
        
        const apikey  = import.meta.env.VITE_GEOAPI_KEY
           useEffect(()=>{
navigator.geolocation.getCurrentPosition(async(position)=>{
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          dispatch(setlocation({lat:latitude,lon:longitude}))
          const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`) 
          dispatch(setcurrentCity(result?.data?.results[0].city))
          dispatch(setcurrentState(result?.data?.results[0].state))
          dispatch(setcurrentAddress(result?.data?.results[0].address_line2 || result?.data?.results[0].address_line1))
          dispatch(setaddress(result?.data?.results[0].address_line2))
})
           },[userData])
}

export default useGetcity