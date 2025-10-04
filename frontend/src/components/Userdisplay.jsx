import React, { useState } from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import { GiLindenLeaf } from "react-icons/gi";
import { GiChickenOven } from "react-icons/gi";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Foodcart from './Foodcart';
const Userdisplay = () => {
  const {currentCity} = useSelector((state)=>state.user)
  const {shopsinmycity,itemsinmycity} = useSelector((state)=>state.user) 
  return (
    <div className='w-[100vw] h-full flex flex-col overflow-hidden'>
      <div>
              <Nav/>
      </div>
    <div className='w-full h-full flex justify-center items-center mt-35'>
        <h1 className='text-[35px]'>Best shop In {currentCity}</h1>
      </div>
      <div className='flex flex-wrap gap-4'>
       {shopsinmycity?.map((item,index)=>(
         <div className='flex w-[200px] border ml-3 hover:border-2 relative overflow-x-auto gap-4'>
        <img src={item.image} alt="" className='object-cover w-full h-full '/>
        <h2 className='absolute  bottom-0 left-2 text-white font-bold bg-black p-1 rounded-lg'>{item.name}</h2>
        </div>
       ))
       }
      </div>
      <div className='w-full flex flex-col gap-5 items-start p-[10px]'>
<h1 className='mt-3 text-center text-[35px]'>OUR FOOD ITEMS</h1>
<div className='w-full h-auto flex flex-wrap gap-[20px] justify-center'>
{itemsinmycity?.map((item,index)=>(
  <Foodcart key={index} item={item}/>
))}
</div>
      </div>
    </div>

    
  )
}

export default Userdisplay