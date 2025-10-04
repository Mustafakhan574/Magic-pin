import React, { useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { jsx } from 'react/jsx-runtime';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { search, setitemsinmycity } from '../../redux/userSlice';
const Nav = () => {
  const navigate = useNavigate()
           const {userData,currentCity,cartitems,itemsinmycity,myorders} = useSelector((state)=>state.user)
           const dispatch = useDispatch()
           const {shopData} = useSelector((state)=>state.Owner)
           console.log("userData",userData)
           let [input,setinput] = useState("");
           console.log(input)
            const handlesearch=(e)=>{
              setinput(e)
               dispatch(search(e))
            }
            console.log("cart items in nav",cartitems)
  return (
<div className='w-full h-[90px] flex  bg-white'>
<div className='w-full h-[200px] bg-white flex flex-wrap items-center justify-evenly  shadow-2xl gap-[20px]  sm:flex-nowrap sm:h-[90px] ml-2'>
<h1 className='text-3xl font-bold mb-2 text-[#1c1cc4] text-center'>Magin-Pin</h1>
{userData?.role == "owner" && shopData && <div className='flex flex-col'>
  <button onClick={()=>navigate("/add-item")}><FaPlus size={25} className='text-[#1ba31b]'/></button>
  <span className='font-bold  text-[#1c1cc4] '>add</span>
</div>}

{userData.role == "user" && <div className='flex'>
     <input type="text" placeholder='Enter Foods Name...' className='border-black border-1 p-2 w-[85vw] border-r-0 rounded-3xl rounded-r-none  focus:outline-0 sm:w-[38vw]' value={input} onChange={(e)=>handlesearch(e.target.value)}/>
     <FcSearch size={42} className=' border-black border-1 border-l-0 rounded-3xl rounded-l-none'/>
</div>}

<div className=''>
    <IoLocationSharp size={30} className='text-[#8253f7] font-bold '/>
    <div>{currentCity}</div>
</div>
{userData.role == "user" && <div className='relative'onClick={()=>navigate("/cart")}>
<FiShoppingCart size={35} />
<span className='absolute top-[-19px] right-2 text-[20px]'>{cartitems.length || 0}</span>
</div>}
{userData?.role == "user" && <div className='relative'>
   <button className='text-[#1f1faf] font-bold text-[20px] border-1 rounded-2xl p-2 border-transparent hover:border-black focus:border-orange-400' onClick={()=>navigate("/myorders")}>My Orders</button>
   <span className='absolute top-7 right-13 text-[20px]'>{myorders.length}</span>
</div>}
{userData?.role == "owner" && <div className='relative'>
   <button className='text-[#1f1faf] font-bold text-[20px] border-1 rounded-2xl p-2 border-transparent hover:border-black focus:border-orange-400' onClick={()=>navigate("/myorders")}>My Orders</button>
   <span className='absolute top-7 right-13 text-[20px]'>{myorders.length}</span>
</div>}
{!userData? <div className='sm:hidden'>
     <CgProfile size={35}/>
</div>: <div className='w-35px h-35px text-[#1616b4] border-2 border-[black] rounded-[100%] p-2 font-bold hidden  lg:block'>
  {userData.fullname.charAt(0).toUpperCase()}
</div> }
</div>
    </div>
  )
}

export default Nav