import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
const Orderplaced = () => {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen flex flex-col justify-center items-center px-4 text-center relative overflow-hidden'>
   <FaCircleCheck  className='text-green-400 text-6xl mb-4'/>
   <h1 className='text-3xl font-bold mb-2'>Order Placed!</h1>
   <p className='max-w-md mb-6'>Thank you for Purchase. Your Order is Being Prepared.You can Track Your Order Status in "My Orders" Section</p>
   <button className='bg-[#6ffd6f] hover:bg-[aqua] px-6 py-3 rounded-lg text-lg font-medium transition' onClick={()=>navigate("/myorders")}>Back To my orders</button>
    </div>
  )
}

export default Orderplaced