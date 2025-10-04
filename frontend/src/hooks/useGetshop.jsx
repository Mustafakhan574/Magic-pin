import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setshopData } from '../../redux/OwnerSlice'
import { serverurl } from '../App'
const useShop = () => {
        const dispatch = useDispatch()
   useEffect(()=>{
  const fetchshop = async()=>{
          try{
const result = await axios.get(`${serverurl}/api/shop/get-shop`,{withCredentials:true})
    dispatch(setshopData(result.data))
    console.log(result.data)
          }catch(err){
                    console.log('get shop',err)
          }
    
  }
  fetchshop();
   },[])
}

export default useShop