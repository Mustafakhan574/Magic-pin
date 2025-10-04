import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { serverurl } from '../App';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/Firebase';
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux';
import { setuserData } from '../../redux/userSlice';
const Login = () => {
          const [showpassword,setshowpassword] = useState(false)
          const [email,setemail] = useState("")
          const [password,setpassword] = useState("")
          const [err,seterr] = useState("");
          const [loading,setloading] = useState(false)
          const navigate = useNavigate();
          const dispatch = useDispatch()
     const Login=async(e)=>{
      e.preventDefault();
      setloading(true)
          try{
        const user = await axios.post(`${serverurl}/api/auth/login`,{
          email,
          password,
        },{withCredentials:true})
        
        dispatch(setuserData(user.data))
        setloading(false)
          }catch(err){
                    console.log("signup error",err)
                    seterr(err?.response?.data?.message)
          }
     }
     const handleGoogleauth=async()=>{
               const provider= new GoogleAuthProvider()
               let result = await signInWithPopup(auth,provider) 
               try{
            const {data} = await axios.post(`${serverurl}/api/auth/google-auth`,{
               email:result.user.email,
            },{withCredentials:true})
            
            dispatch(setuserData(data))
            seterr("")
               }catch(err){
          console.log("google auth",err)
          setloading(false)
               }
          }
  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 bg-[#ffffff95]'>
          <div className='bg-[white] rounded-2xl shadow-lg w-[60%]  p-8 border-[2px] border-[#0000005d]'>
            <form onSubmit={Login}>
  <h1 className=' text-center text-3xl font-bold mb-2 text-[#0000ffa2]'>Magic-Pin</h1>
  {err?  <h1 className='text-red-500 text-3xl'>{err}</h1>:""}
  <div className='mb-4'>
       <label htmlFor="Email" className='block text-grey-700 font-medium mb-1'>Email</label>
       <input type="Email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Email'onChange={(e)=>setemail(e.target.value)} value={email} required/>
  </div>
  
    <div className='mb-4'>
       <label htmlFor="Password" className='block text-grey-700 font-medium mb-1'>Password</label>
       <div className='relative'>
       <input type={showpassword? "text":"password"} className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Password' onChange={(e)=>setpassword(e.target.value)} value={password} required/>
       <button type='button' className='absolute right-3 top-3' onClick={()=>setshowpassword((pre)=>!pre)}>{!showpassword?<FaEye />:<LuEyeClosed />}</button>
       </div>
  </div>
  <p className='text-[#ff0000d5] text-right font-medium'onClick={()=>navigate("/forget-password")}>Forget Password</p>
  <button  type='submit' className='w-full mt-4 flex items-center justify-center gap-2  border-[black] border-[1px] rounded-lg px-4 py-2 transition duration-200 bg-[#27d327] focus:bg-[white]'disabled={loading}>
    {loading? <ClipLoader size={20}/>:"Login"}
          </button>
          <button className='w-full mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-2 bg-[white] border-[black] border-[1px] hover:bg-[#27d327] transition-colors duration-800' onClick={handleGoogleauth}>
            <FcGoogle size={20}/>
            <span>Login with Google</span>
          </button>
          </form>
          </div> 
          </div>  
  )
}

export default Login