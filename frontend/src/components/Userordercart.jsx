import React from 'react'

const Userordercart = ({data}) => {
  const formatdate=(datestring)=>{
    const date = new Date(datestring)
    return date.toLocaleString("en-GB",{
      day:"2-digit",
      month:"short",
      year:"numeric"
    })
  }
  
  return (
    <div className='rounded-lg shadow p-4 space-y-4'>
     <div className='flex justify-between border-b pb-2'>
     <div >
  <p className='font-semibold'>order #{data._id.slice(-6)}</p>
  <p className='text-sm'>Date:{formatdate(data.createdAt)}</p>
     </div>
     <div className='text-right'>
<p>{data.paymentmethod?.toUpperCase()}</p>
   <p className='text-red-500'>{data.shoporders?.[0].status}</p>
     </div>
     </div>
{data.shoporders.map((shoporder,index)=>(
  <div className='border rounded-lg p-3 space-y-3' key={index}>
      <p>{shoporder.shop.name}</p>
      <div className='flex space-x-4 overflow-x-auto pb-2'>
        {shoporder.shoporderitems.map((item,index)=>(
          <div key={index} className='flex-shrink-0 w-40 border rounded-lg p-2 '>
            <img src={item?.item?.image} alt="" className='w-full object-cover'/>
            <p className='text-sm font-semibold mt-1'>{item.name}</p>
            <p>Qty : {item.quantity} x {item.price } Rs  </p>
          </div>
        ))}
      </div>
              <div className='flex justify-between items-center border-t pt-2'>
       <p>Subtotal : {shoporder.subtotal}</p>
       <p className='text-[red]'>{shoporder.status}</p>
        </div>
  </div>
))}
    </div>
  )
}

export default Userordercart