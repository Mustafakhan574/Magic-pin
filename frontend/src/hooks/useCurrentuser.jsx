import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { serverurl } from '../App'
import { useDispatch } from 'react-redux'
import { setuserData } from '../../redux/userSlice'

const useCurrentuser = () => {
        const dispatch = useDispatch()
   useEffect(()=>{
  const fetchuser = async()=>{
          try{
const result = await axios.get(`${serverurl}/api/user/getcuruser`,{withCredentials:true})
    dispatch(setuserData(result.data))
          }catch(err){
                    console.log('cur user ',err)
          }
    
  }
  fetchuser();
   },[])
}

export default useCurrentuser