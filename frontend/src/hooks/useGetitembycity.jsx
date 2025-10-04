import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setcurrentAddress, setcurrentCity, setcurrentState, setitemsinmycity, setshopsinmycity, setuserData,} from '../../redux/userSlice'
import { serverurl } from '../App'
const useGetitembycity = () => {
          const {currentCity} = useSelector((state)=>state.user)
        const dispatch = useDispatch()
        useEffect(()=>{
          const fetchitems=async()=>{
                    try{
           const result = await axios.get(`${serverurl}/api/item/getitembycity/${currentCity}`,{
                    withCredentials:true
           })
           dispatch(setitemsinmycity(result.data))
           console.log(result.data)
                    }catch(err){
                              console.log(err)
                    }
          }
          fetchitems()
        },[currentCity])
}

export default useGetitembycity