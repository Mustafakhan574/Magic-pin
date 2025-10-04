import axios from 'axios';
import React from 'react'
import { FaMobileAlt } from "react-icons/fa";
import { serverurl } from '../App';
import { useDispatch } from 'react-redux';
import { updateorderstatus } from '../../redux/userSlice';
const Ownerordercart = ({data}) => {
 const dispatch = useDispatch()
  const handleupdatestatus=async(orderid,shopid,status)=>{
          try{
          const result = await axios.post(`${serverurl}/api/order/updatestatus/${orderid}/${shopid}`,{
            status
          },{
            withCredentials:true
          })
          console.log(result.data)
          dispatch(updateorderstatus({orderid,shopid,status}))
          }catch(err){
          console.log("update status",err)
          }
  }
  return (
    <div className='rounded-lg shadow p-4 space-y-4'>
      <h2 className='text-lg font-medium '>{data.user.fullname}</h2>
      <p className='text-sm'>{data.user.email}</p>
      <p className='flex items-center gap-2'><FaMobileAlt /><span>{data.user.mobile}</span></p>
      <div className='flex flex-col items-start gap-2 text-sm'>
         <p>{data?.deliveryaddress?.text}</p>
         <p>lat:{data?.deliveryaddress.latitude}</p>
         <p>lon:{data?.deliveryaddress.longitude}</p>
      </div>
       <div className='flex space-x-4 overflow-x-auto pb-2'>
        {data?.shoporders?.shoporderitems?.map((item,index)=>(
          <div key={index} className='flex-shrink-0 w-40 border rounded-lg p-2 '>
            <img src={item.item.image} alt="" className='w-full object-cover'/>
            <p className='text-sm font-semibold mt-1'>{item.name}</p>
            <p>Qty : {item.quantity} x {item.price } Rs  </p>
          </div>
        ))}
      </div>
      <div className='flex justify-between items-center mt-auto pt-3 border-t '>
      <span className='text-sm'>status:<span className='font-semibold capitalize text-[red]'> {data.shoporders.status}</span>
      </span>
      <select className='rounded-md border px-3 py-1 text-sm focus:outline-none'onChange={(e)=>handleupdatestatus(data._id,data.shoporders.shop._id,e.target.value)}>
         <option value="pending">Pending</option>
         <option value="preparing">Preparing</option>
         <option value="out of delivery">Out of delivery</option>
      </select>
      </div>
        <div className='text-right font-bold mt-2'>
          Total:{data.shoporders.subtotal}Rs
        </div>
    </div>
  )
}

export default Ownerordercart