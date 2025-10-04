import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cartitems from './Cartitems';
import { BsCart } from "react-icons/bs";
const Cartpage = () => {
          const {cartitems} = useSelector(state=>state.user)
          console.log(cartitems)
          let Total = cartitems?.reduce((acc,item)=>
             acc+item.price*item.quantity
         ,0)
          const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-white flex justify-center p-6'> 
        <div className='w-full max-w-[800px]'>
     <div className='flex items-center gap-[20px] mt-6 '>
          <div className=' z-[10] 'onClick={()=>navigate("/")}>
          <IoMdArrowBack size={35}/>
                </div>
                <h1 className='text-[35px] text-center'> Your Cart</h1>
     </div>
     {cartitems?.length==0 ? (
          <p className='text-2xl text-center'>Cart Empty</p>
     ):(
          <div className='space-y-4'>
       {cartitems?.map((item,index)=>(
          <Cartitems item={item} key={item._id}/>
       ))}
       <div className='flex  flex-col items-center justify-between p-4 rounded-xl shadow border'>
         <div className='flex '>
     <h1 className='text-center text-[30px]'>Cart Bill</h1>
     <span><BsCart size={30} className='ml-3 mt-1 text-[red]'/></span>
     </div>
       <h1 className='text-center text-[35px]'>Total Items : {cartitems.length}</h1>
       <h1 className='text-center text-[35px]'>Total Price : {Total}</h1>
   <button className='w-full p-3 bg-[#59f659] rounded-3xl text-[25px] font-bold'onClick={()=>navigate("/checkout")}>CheckOut</button>
    </div>
          </div>
     )}
        </div>
    </div>
  )
}

export default Cartpage