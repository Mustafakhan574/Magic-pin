import React from 'react'
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { deleteitem, setcartitems, updatequantity } from '../../redux/userSlice';
import axios from 'axios';
import { serverurl } from '../App';

const Cartitems = ({item}) => {
          const dispatch = useDispatch()
          const {cartitems} = useSelector((state)=>state.user)
          console.log("cartitems for now",cartitems)
          const handleincrease=(id,curqty)=>{
                  
                dispatch(updatequantity({id,quantity:curqty+1}))
          }
          const handledecrease=(id,curqty)=>{
                    if(curqty>1){
                    dispatch(updatequantity({id,quantity:curqty-1}))
                  }  
                    
          }
         const deletecartitems=async(cartid)=>{
          try{
            // Debug this
console.log("Cart ID to delete:", cartid);
   if(cartid){
       const result = await axios.get(`${serverurl}/api/cart/deletecartitems/${cartid}`,{
          withCredentials:true
         })
         console.log(result.data)
         dispatch(setcartitems(result.data))
   }  
          }catch(err){
            console.log("delete cart items",err)
          }
         } 
  return (
    <>
    <div className='flex items-center justify-between p-4 rounded-xl shadow border'>
         <div className='flex items-center gap-4'>
          <img src={item.image} alt="" className='w-20 object-cover rounded-lg'/>
          <div>
                    <h1 className='font-medium'>{item.name}</h1>
                    <p className='text-sm'>Rs{item.price} x {item.quantity}</p>
                    <p className='font-bold'>Rs{item.price*item.quantity}</p>
          </div>
         </div>
         <div className='flex items-center gap-3'>
           <button className='px-2 py-1 rounded-xl hover:bg-[grey] transition'onClick={()=>handledecrease(item.id,item.quantity)}>
           <FaMinus />
                   </button>
                   <span>{item.quantity}</span>
                   <button className='px-2 py-1 rounded-xl hover:bg-[grey] transition'onClick={()=>handleincrease(item.id,item.quantity)}>
           <FaPlus />
                   </button>
                   <button className='p-3 bg-red-100 text-red-500 rounded-full hover:bg-red-200'onClick={()=>deletecartitems(item._id)}>
                    <FaRegTrashAlt size={22}/>
                   </button>
         </div>  
    </div>
    </>
  )
}

export default Cartitems