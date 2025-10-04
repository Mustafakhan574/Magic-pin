import React from 'react'
import { useSelector } from 'react-redux'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Userordercart from '../components/Userordercart';
import Ownerordercart from '../components/Ownerordercart';
const Myorders = () => {
          const {userData,myorders} = useSelector(state=>state.user)
          const navigate = useNavigate()
  return (
    <div className='w-full min-h-screen flex justify-center px-4'>
    <div className='w-full max-w-[800px] p-4'>
          <div className='flex items-center gap-[20px] mb-6'>
          <div className='z-[10]' onClick={()=>navigate("/")}>
          <IoMdArrowBack size={35} />
          </div>
 <h1 className='text-3xl font-bold text-[red] text-start'>My orders</h1>
 </div>
 <div className='space-y-6'>
     {myorders?.map((order,index)=>(
          userData?.role == "user"?(
                    <Userordercart data={order} key={index}/>
          ):userData.role=="owner"?(
         <Ownerordercart data={order} key={index}/>
          ):null
     ))}
 </div>
    </div>
    </div>
  )
}

export default Myorders