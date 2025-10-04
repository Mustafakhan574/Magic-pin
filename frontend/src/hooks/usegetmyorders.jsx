import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { serverurl } from '../App'
import { setmyorders } from '../../redux/userSlice'
const usegetmyorders = () => {
        const dispatch = useDispatch()
        const {userData} = useSelector((state)=>state.user)
        useEffect(()=>{
  const fetchorders = async()=>{
          try{
const result = await axios.get(`${serverurl}/api/order/myorders`,{withCredentials:true})
    dispatch(setmyorders(result.data))
    console.log("my orders",result.data)
          }catch(err){
                    console.log('my orders error',err)
          }
    
  }
  fetchorders();
   },[userData])
}

export default usegetmyorders