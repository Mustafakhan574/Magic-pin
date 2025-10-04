import React from 'react'
import { useState } from 'react'
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { serverurl } from '../App';
import axios from 'axios'
import { ClipLoader } from 'react-spinners';
const Forgetpassword = () => {
          const [step,setstep] = useState(1)
          const [email,setemail] = useState("");
          const [newpassword,setnewpassword] = useState("");
          const [confirmpassword,setconfirmpassword] = useState("");
          const [otp,setotp] = useState("");
          const [err,seterr] = useState("");
          const [loading,setloading] = useState(false)
          const navigate = useNavigate()
          const handlesendotp=async()=>{
            setloading(true)
                    try{
          const result = await axios.post(`${serverurl}/api/auth/send-otp`,{email},{withCredentials:true})
          console.log(result);
          setloading(false)
          seterr("")
          setstep(2)
                    }catch(err){
              console.log("send otp",err)
              seterr(err.response.data.message)
              setloading(false)
                    }
          }
          const handleverifyotp=async()=>{
            setloading(true)
                    try{
          const result = await axios.post(`${serverurl}/api/auth/verify-otp`,{email,otp},{withCredentials:true})
          console.log(result);
          setloading(false)
          seterr("")
          setstep(3)
                    }catch(err){
          console.log("verify otp",err)
          seterr(err.response.data.message)
          setloading(false)
                    }
          }
          const handleresetpassword=async()=>{
            setloading(true)
                    if(newpassword != confirmpassword){
                    return null;
                    }
                    try{
          const result = await axios.post(`${serverurl}/api/auth/reset-password`,{email,newpassword},{withCredentials:true})
          console.log(result)
          setloading(false)
          seterr("")
          navigate("/login")
                    }catch(err){
              console.log("reset password error",err)
              seterr(err.response.data.message)
              setloading(false)
                    }
          }
  return (
    <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#ffffff8c]'>
     <div className='bg-white rounded-3xl shadow-2xl w-full lg:w-[70%] p-8'>
      {err?<h1 className='text-red-500 text-3xl'>{err}</h1>:""}
          <div className='flex items-center gap-4 mb-4'>
<MdKeyboardBackspace size={30} className='text-[red]' onClick={()=>navigate("/login")}/>
       <h1 className='text-[20px]'>Forget Password</h1>
       </div>
       {step == 1 && <div>
       <div className='mb-4'>
          <label htmlFor="Email" className='block text-grey-700 font-medium mb-1'>Email</label>
       <input type="Email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Email'onChange={(e)=>setemail(e.target.value)} value={email}/>
          </div>
          <button className='w-full mt-4 flex items-center justify-center gap-2  border-[black] border-[1px] rounded-lg px-4 py-2 transition duration-200 bg-[#27d327] focus:bg-[white]' onClick={handlesendotp} disabled={loading}>
                   {loading? <ClipLoader size={20}/>:"Send OTP"}
          </button>
          </div>} 
          {step == 2 && 
          <div>
       <div className='mb-4'>
          <label htmlFor="Email" className='block text-grey-700 font-medium mb-1'> OTP</label>
       <input type="Email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Otp'onChange={(e)=>setotp(e.target.value)} value={otp}/>
          </div>
          <button className='w-full mt-4 flex items-center justify-center gap-2  border-[black] border-[1px] rounded-lg px-4 py-2 transition duration-200 bg-[#27d327] focus:bg-[white]' onClick={handleverifyotp} disabled={loading}>
                    {loading? <ClipLoader size={20}/>:"Verify"}
          </button>
          </div>}
          {step == 3 && 
          <div>
       <div className='mb-4'>
          <label htmlFor="New password" className='block text-grey-700 font-medium mb-1'>New Password</label>
       <input type="Email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter New password'onChange={(e)=>setnewpassword(e.target.value)} value={newpassword}/>
          </div>
          <div className='mb-4'>
          <label htmlFor="Confirm password" className='block text-grey-700 font-medium mb-1'>Confirm Password</label>
       <input type="Email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Confirm password'onChange={(e)=>setconfirmpassword(e.target.value)} value={confirmpassword}/>
          </div>
          <button className='w-full mt-4 flex items-center justify-center gap-2  border-[black] border-[1px] rounded-lg px-4 py-2 transition duration-200 bg-[#27d327] focus:bg-[white]' onClick={handleresetpassword} disabled={loading}>
                    {loading? <ClipLoader size={20}/>:"Reset Password"}
          </button>
          </div>}
     </div>
    </div>
  )
}

export default Forgetpassword