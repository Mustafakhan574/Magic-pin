import React, {  useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUtensils } from "react-icons/fa";
import axios from 'axios';
import { serverurl } from '../App';
import { setshopData } from '../../redux/OwnerSlice';
const Additem = () => {
          const navigate = useNavigate()
          const dispatch = useDispatch()
          const {shopData} = useSelector((state)=>state.Owner)
          const [name,setname] = useState("");
          const [price,setprice] = useState("");
          const [cate,setcate] = useState("");
          const [foodtype,setfoodtype] = useState("veg");
          const categories = [  "Snacks",
                    "Main course",
                    "Desserts",
                    "Pizza",
                    "Burgers",
                    "Sandwiches",
                    "South indian",
                    "North indian",
                    "Chinese",
                    "Fast Food",
                    "Others"]
            const [frontendimage,setfrontendimage] = useState( null)
            const [backendimage,setbackendimage] = useState( null)
            const handleimage=(e)=>{
              const file = e.target.files[0]
              setbackendimage(file)
              setfrontendimage(URL.createObjectURL(file))
            }
            const handlesubmit=async(e)=>{
                    e.preventDefault();
                    try{
           const formData = new FormData();
           formData.append("name",name)
           formData.append("category",cate)
           formData.append("foodtype",foodtype)
           formData.append("price",price)

           if(backendimage){
                    formData.append("image",backendimage)
           }
           const result = await axios.post(`${serverurl}/api/item/add-item`,formData,{withCredentials:true})
           dispatch(setshopData(result.data))
           console.log(result.data)
                    }catch(err){
             console.log(err)
                    }
            }

  return (
    <div className='flex justify-center items-center flex-col p-6 relative h-[100vh]'>
      <div className='absolute top-[20px] left-[20px] z-[10] mb-[10px]'onClick={()=>navigate("/")}>
<IoMdArrowBack size={35}/>
      </div>
      <div className='max-w-lg w-full bg-white shadow-2xl rounded-3xl p-8 border border-[black]'>
           <div className='flex flex-col items-center mb-6'>
       <div className='bg-orange-100 p-4 rounded-full mb-4'>
         <FaUtensils className='text-[red] w-16 h-16'/>
       </div>
       <div className='text-3xl'>
          Add Food Item
       </div>
       </div>
       <form onSubmit={handlesubmit}>
          <div>
            <label className='text-[20px]'>Name</label>
            <input type="text" placeholder='enter Food name...' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100'onChange={(e)=>setname(e.target.value)} value={name}/>
          </div>
          <div>
            <label className='text-[20px]'>Price</label>
            <input type="number" placeholder='0' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100'onChange={(e)=>setprice(e.target.value)} value={price}/>
          </div>
          <div>
            <label className='text-[20px]'>Select Category</label>
            <select className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100'onChange={(e)=>setcate(e.target.value)} value={cate}>
              <option value="">select Category</option>
              {categories.map((category,index)=>(
                <option value={category} key={index}>{category} </option>
              ))}
            </select>
          </div>
          <div>
            <label className='text-[20px]'>Select Food Type</label>
            <select className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100'onChange={(e)=>setfoodtype(e.target.value)} value={foodtype}>
              
              
                <option value="veg">veg</option>
                <option value="non veg">non veg</option>
              
            </select>
          </div>
          <div>
            <label className='text-[20px]'>Image</label>
            <input type="file" accept='image/*' placeholder='enter Shop name...' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100' onChange={handleimage}/>
            {frontendimage &&             <div className='mt-4'>
                    <img src={frontendimage} alt="" className='w-full h-48 object-cover rounded-lg border'/>
            </div>}

          </div>
          
          <button className='w-full bg-[aqua] px-6 py-3 rounded-3xl focus:bg-white mt-4'>Save</button>
       </form>
      </div>
    </div>
  )
}

export default Additem