import React, {  useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUtensils } from "react-icons/fa";
import axios from 'axios';
import { serverurl } from '../App';
import { setshopData } from '../../redux/OwnerSlice';
const Createditshop = () => {
          const navigate = useNavigate()
          const dispatch = useDispatch()
          const {shopData} = useSelector((state)=>state.Owner)
          const {currentCity,currentAddress,currentState} = useSelector((state)=>state.user)
          const [name,setname] = useState(shopData?.name || "");
          const [address,setaddress] = useState(shopData?.address || currentAddress);
          const [City,setCity] = useState(shopData?.city || currentCity);
          const [state,setstate] = useState(shopData?.city || currentState);
            const [frontendimage,setfrontendimage] = useState(shopData?.image || null)
            const [backendimage,setbackendimage] = useState(shopData?.image || null)
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
           formData.append("city",City)
           formData.append("state",state)
           formData.append("address",address)
           if(backendimage){
                    formData.append("image",backendimage)
           }
           const result = await axios.post(`${serverurl}/api/shop/create-edit`,formData,{withCredentials:true})
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
          {shopData?"Edid Shop":"Add Shop"}
       </div>
       </div>
       <form onSubmit={handlesubmit}>
          <div>
            <label className='text-[20px]'>Name</label>
            <input type="text" placeholder='enter Shop name...' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100'onChange={(e)=>setname(e.target.value)} value={name}/>
          </div>
          <div>
            <label className='text-[20px]'>Image</label>
            <input type="file" accept='image/*' placeholder='enter Shop name...' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100' onChange={handleimage}/>
            {frontendimage &&             <div className='mt-4'>
                    <img src={frontendimage} alt="" className='w-full h-48 object-cover rounded-lg border'/>
            </div>}

          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div >
<label className='text-[20px]'>City</label>
            <input type="text" placeholder='enter City' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100'onChange={(e)=>setCity(e.target.value)} value={City}/>
                    </div>
                    <div>
                              <label className='text-[20px]'>State</label>
            <input type="text" placeholder='enter Shop State' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100'onChange={(e)=>setstate(e.target.value)} value={state}/>
                    </div>
          </div>
          <div>
            <label className='text-[20px]'>Address</label>
            <input type="text" placeholder='enter Shop Address...' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100'onChange={(e)=>setaddress(e.target.value)} value={address}/>
          </div>
          <button className='w-full bg-[aqua] px-6 py-3 rounded-3xl focus:bg-white mt-4'>Save</button>
       </form>
      </div>
    </div>
  )
}

export default Createditshop