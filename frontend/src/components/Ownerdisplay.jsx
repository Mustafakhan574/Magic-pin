import React from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import OwnerCarts from './OwnerCarts';
const Ownerdisplay = () => {
  const {shopData} = useSelector((state)=>state.Owner)
  console.log(shopData)
  const navigate  = useNavigate();
  
  return (
    <div className='w-full h-full'>
      <Nav/>
      {!shopData && 
      <div className='flex justify-center items-center p-4 bg-white w-full mt-50'>
        <div className='w-[50%]  shadow-2xl rounded-2xl p-6 border border-[black] hover:shadow-1xl transition-shadow duration-300'>
         <div className='flex flex-col items-center text-center'>
<FaUtensils size={25}/>
<h2 className='text-[35px] text-[#1c1cc4]'>Add Restaurant</h2>
<button className='text-[35px] text-[green] p-[3] 'onClick={()=>navigate("/create-edit-shop")}>Get Started</button>
         </div>
        </div>
      </div>
        }
     {shopData && 
      <div className='w-full flex flex-col items-center gap-6 px-4 sm:px-6 mt-30'>
         <h1 className='text-[25px] flex justify-center items-center'><FaUtensils size={25} className='text-[red]'/> Welcome to {shopData.name}</h1>
         <div className='rounded-xl overflow-hidden border border-black hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative'>
          <div className='absolute right-2 text-[red] font-bold text-[25px]'onClick={()=>navigate("/create-edit-shop")}>
          <FaPen />
          </div>

        <img src={shopData.image} alt="" className='w-full h-48 sm:h-64 object-cover'/>
        <div className='p-4 sm:p-6'>
          <h1 className='text-xl sm:text-2xl font-bold mb-2'>{shopData.name}</h1>
          <p className='mb-2'>{shopData.city}</p>
          <p className='mb-2'>{shopData.address}</p>
        </div>
         </div>
      </div>
     } 
     {shopData?.items?.length == 0 && <div className='flex justify-center items-center p-4 bg-white w-full mt-10'>
        <div className='w-[50%]  shadow-2xl rounded-2xl p-6 border border-[black] hover:shadow-1xl transition-shadow duration-300'>
         <div className='flex flex-col items-center text-center'>
<FaUtensils size={25}/>
<button className='text-[35px] text-[green] p-[3] 'onClick={()=>navigate("/add-item")}>Add Food Item</button>
         </div>
        </div>
      </div>}  
      {shopData?.items?.length > 0 && <div className='flex flex-col items-center gap-4 w-full'>
        {shopData.items.map((item,index)=>(
          <OwnerCarts item={item} key={index}/>
        ))}
      </div> }
    </div>
  )
}

export default Ownerdisplay