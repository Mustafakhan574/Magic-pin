import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverurl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/Firebase';
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux';
import { setuserData } from '../../redux/userSlice';
const Signup = () => {
          const [showpassword,setshowpassword] = useState(false)
          const [role,setrole] = useState("user")
          const navigate = useNavigate();
          const [fullname,setfullname] = useState("")
          const [email,setemail] = useState("")
          const [password,setpassword] = useState("")
          const [mobile,setmobile] = useState("")
          const [err,seterr] = useState("");
          const [loading,setloading] = useState(false)
          const dispatch = useDispatch()
     const signup=async(e)=>{
          e.preventDefault();
          setloading(true)
          try{
        const user = await axios.post(`${serverurl}/api/auth/signup`,{
          fullname,
          email,
          password,
          mobile,
          role
        },{withCredentials:true})
        
        dispatch(setuserData(user.data))
        setloading(false)
        seterr("")
          }catch(err){
                    console.log("signup error",err)
                    seterr(err?.response?.data?.message)
          }
     }
     const handleGoogleauth=async()=>{
          if(!mobile){
              return alert("mobile required")
          }
          const provider= new GoogleAuthProvider()
          let result = await signInWithPopup(auth,provider) 
          try{
       const {data} = await axios.post(`${serverurl}/api/auth/google-auth`,{fullname:result.user.displayName,
          email:result.user.email,
          role,
          mobile,
       },{withCredentials:true})
       
       dispatch(setuserData(data))
          }catch(err){
     console.log("google auth",err)
     setloading(false)
          }
     }
  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 bg-[#ffffff95]'>
          <div className='bg-[white] rounded-2xl shadow-lg w-[98%] sm:w-[60%]  p-8 border-[2px] border-[#0000005d]'>
     <form onSubmit={signup}>
  <h1 className=' text-center text-3xl font-bold mb-2 text-[#0000ffa2]'>Magic-Pin</h1>
  {err?  <h1 className='text-red-500 text-3xl'>{err}</h1>:""}
  <div className='mb-4'>
       <label htmlFor="FullName" className='block text-grey-700 font-medium mb-1'>Full Name</label>
       <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Full Name' onChange={(e)=>setfullname(e.target.value)} value={fullname} required/>
  </div>
  <div className='mb-4'>
       <label htmlFor="Email" className='block text-grey-700 font-medium mb-1'>Email</label>
       <input type="Email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Email'onChange={(e)=>setemail(e.target.value)} value={email} required/>
  </div>
  <div className='mb-4'>
       <label htmlFor="Mobile" className='block text-grey-700 font-medium mb-1'>Mobile</label>
       <input type="Number" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Mobile Number' onChange={(e)=>setmobile(e.target.value)} value={mobile} required/>
  </div>
    <div className='mb-4'>
       <label htmlFor="Password" className='block text-grey-700 font-medium mb-1'>Password</label>
       <div className='relative'>
       <input type={showpassword? "text":"password"} className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Password' onChange={(e)=>setpassword(e.target.value)} value={password} required/>
       <button className='absolute right-3 top-3' onClick={()=>setshowpassword(pre=>!pre)}>{!showpassword?<FaEye />:<LuEyeClosed />}</button>
       </div>
  </div>

      <div className='mb-4'>
       <label htmlFor="role" className='block text-grey-700 font-medium mb-1'>Role</label>
       <div className='flex gap-2'>
       {["user","owner"].map((user)=>(
          <button className={`flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors focus:bg-orange-500 ${role == user ? "bg-orange-500":""}`} onClick={()=>setrole(user)} key={user}>{user}</button>
       ))}
       </div>
  </div>
  <button type='submit' className='w-full mt-4 flex items-center justify-center gap-2  border-[black] border-[1px] rounded-lg px-4 py-2 transition duration-200 bg-[#27d327] focus:bg-[white]'disabled={loading}>
     {loading? <ClipLoader size={20}/>:"Sign up"}
          </button>
<button className='w-full mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-2 bg-[white] border-[black] border-[1px] hover:bg-[#27d327] transition-colors duration-800'onClick={handleGoogleauth} >
            <FcGoogle size={20}/>
            <span>Sign up with Google</span>
          </button>
<p className='text-center mt-2'>Already have an account ? <span className='text-[blue] font-bold' onClick={()=>navigate("/login")}>Login</span></p>
</form>
          </div>
          
    </div>
  )
}

export default Signup
