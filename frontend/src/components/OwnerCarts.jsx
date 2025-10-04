import React from 'react'
import { FaPen } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { serverurl } from '../App';
import { linkWithCredential } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setshopData } from '../../redux/OwnerSlice';
import axios from 'axios'
const OwnerCarts = ({item}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handledelete=async()=>{
    try{
  const result = await axios.get(`${serverurl}/api/item/delete-item/${item._id}`,{
    withCredentials:true
  })
  dispatch(setshopData(result.data))
    }catch(err){
  console.log("handle delete",err)
    }
  }
  return (
    <div className='flex bg-white rounded-lg shadow-2xl overflow-x-hidden border w-[90%] mt-1 sm:w-[70%]'>
          <div className='w-32 h-[full] flex-shrink-0 bg-grey-50'>
            <img src={item.image} alt="" className='w-full h-full object-cover'/>
          </div>
          <div className='flex flex-col justify-between p-3 flex-1'>
          <div>
            <h1 className='text-base font-semibold text-red-500 '>{item.name}</h1>
            <p className='font-medium text-grey-70 '>category: {item.category}</p>
            <p className='font-medium text-grey-70 '>Food Type: {item.foodtype}</p>
          </div>
          </div>
          <div className='flex items-center justify-center pr-7'>
            <div className='text-red-500 font-bold'>
              <span>Price:</span>{item.price}
            </div>
            <div className='p-2 rounded-full hover:bg-amber-300 flex items-centergap-2 text-red-500'onClick={()=>navigate(`/edit-item/${item._id}`)}>
 <FaPen size={16}/>
 </div>
 <div className='p-2 rounded-full hover:bg-amber-300 flex items-center gap-2 text-red-500'onClick={handledelete}>
<FaRegTrashAlt size={16}/>
 </div>
          </div>
    </div>
  )
}

export default OwnerCarts