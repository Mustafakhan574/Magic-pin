import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setcurrentAddress, setcurrentCity, setcurrentState, setshopsinmycity, setuserData,} from '../../redux/userSlice'
import { serverurl } from '../App'
const useGetshopbycity = () => {
          const {currentCity} = useSelector((state)=>state.user)
        const dispatch = useDispatch()
        useEffect(()=>{
          const fetchShopsbycity=async()=>{
                    try{
           const result = await axios.get(`${serverurl}/api/shop/get-city/${currentCity}`,{
                    withCredentials:true
           })
           dispatch(setshopsinmycity(result.data))
           console.log(result.data)
                    }catch(err){
                              console.log(err)
                    }
          }
          fetchShopsbycity()
        },[currentCity])
}

export default useGetshopbycity