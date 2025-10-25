import React, { useState } from 'react'
import { GiLindenLeaf } from "react-icons/gi";
import { GiChickenOven } from "react-icons/gi";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, setcartitems } from '../../redux/userSlice';
import axios from 'axios';
import { serverurl } from '../App';
import useGetcartitems from '../hooks/useCartitems';
import { useEffect } from 'react';
const Foodcart = ({item}) => {
  const fetchCartItems = useGetcartitems();
  
  const [cartUpdated, setCartUpdated] = useState(false)
          const [quantity,setquantity] = useState(1)
          const dispatch = useDispatch()
          const {cartitems} = useSelector((state)=>state.user)
          const [ratcon,setratcon] = useState(false)
          const [rating,setrating] = useState(0);
          const renderStars=(rating)=>{
    const stars = [];
    for(let i=1;i<=5;i++){
      stars.push(
        (i<=rating)?(<FaStar className='text-[yellow] text-lg'/>):(<FaRegStar className='text-[yellow] text-lg' />)
      )
    }
    return stars
  }
  const handlerating=async(itemid)=>{
    try{
  const result = await axios.post(`${serverurl}/api/item/rating/${itemid}`,{
    rating
  },{
    withCredentials:true
  })
  console.log(result.data)
  setrating(result.data);
  setratcon(false);
    }catch(err){
      console.log("handle rating err",err)
    }
}
  const handleincrease=()=>{
       const newqty = quantity+1;
       setquantity(newqty);
   }
    const handledecrease=()=>{
      if(quantity>0){
        const newqty = quantity-1;
       setquantity(newqty);
      }  
   }
   const handlecartitems=async()=>{
    try{
        const result = await axios.post(`${serverurl}/api/cart/cartitems`,{
          name:item.name,
          id:item._id,
          shop:item.shop,
                              price:item.price,
                              image:item.image,
                              quantity,
                              foodtype:item.foodtype
        },{withCredentials:true})
        console.log("cart items data",result.data)
        dispatch(setcartitems(result.data))
        setCartUpdated(true); 
    }catch(err){
    console.log("create cart error",err)
    }
   }
   useEffect(() => {
  if (cartUpdated) {
    fetchCartItems();
    setCartUpdated(false);
  }
}, [cartUpdated]);


  return (
<div className='flex gap-4   h-full mt-5  mb-3'>
          <div className='relative flex flex-col w-90 h-90 border hover:border-[red] rounded overflow-hidden shadow'>
        <img src={item.image} alt="" className='object-cover w-full h-[70%] '/>
        <h2 className='absolute bottom-0  text-white bg-[#000000ba] bg-opacity-20 font-bold w-full py-1 rounded text-center'>{item.name}</h2>
        <div className='absolute right-3 '>
                  {item.foodtype == "veg" ? <GiLindenLeaf size={25} className='text-[green]'/>:<GiChickenOven size={25} className='text-[red]'/>}
        </div>

<div className='flex items-center gap-1 mt-1 absolute top-0 bg-[#00000078] px-3' onClick={()=>setratcon(true)}>
  {ratcon? <div>
    <input type="number"  min="1"
                max="5" placeholder='enter rating' onChange={(e)=>setrating(Number(e.target.value))} value={rating} className='text-white'/> 
    <button onClick={() => handlerating(item?._id)}
                className='text-white text-sm bg-blue-500 px-2 py-1 rounded hover:bg-blue-600 transition'
              >submit</button></div>: renderStars(item.averageRating || 0)}
         <span className='text-white text-lg'>/{item.rating.count || 5}</span>
      </div>
      <div className='flex items-center justify-between   '>
       <span className='text-[25px]'>Rs{item.price}</span>
       <div className='flex items-center border rounded-full overflow-hidden w-fit shadow-sm '>
        
       <button className='px-2 py-1 hover:bg-grey-100 transition'onClick={handledecrease}>
<FaMinus />
        </button>
        <span>{quantity}</span>
        <button className='px-2 py-1 hover:bg-grey-100 transition'onClick={handleincrease}>
<FaPlus />
        </button>
      </div>
      
      </div>
      <div className='w-full bg-[aqua] text-center'>
        <button className='p-2 font-bold' onClick={handlecartitems}>ADD Cart</button>
      </div>
        </div>
      </div>
  )
}

export default Foodcart
