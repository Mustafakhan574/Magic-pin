import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route ,Navigate} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Forgetpassword from './pages/forgetpassword'
import useCurrentuser from './hooks/useCurrentuser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import useGetcity from './hooks/useGetcity'
import useShop from './hooks/useGetshop'
import Createditshop from './pages/createditshop'
import Additem from './pages/Additem'
import Edititem from './components/Edititem'
import useGetshopbycity from './hooks/useGetshopbycity'
import useGetitembycity from './hooks/useGetitembycity'
import Cartpage from './components/Cartpage'
import CheckOut from './pages/CheckOut'
import Orderplaced from './pages/Orderplaced'
import Myorders from './pages/Myorders'
import usegetmyorders from './hooks/usegetmyorders'
import useGetcartitems from './hooks/useCartitems'
export const serverurl = "http://localhost:3000"
function App() {
  useCurrentuser()
  useGetcity()
  useShop()
  useGetshopbycity()
  useGetitembycity()
  usegetmyorders()
  useGetcartitems();
  const {userData} = useSelector((state)=>state.user)
  console.log(userData)
  return (
    <>
     <Routes>
      <Route path='/signup' element={!userData?<Signup/>:<Navigate to={"/"}/>}/>
      <Route path='/login' element={!userData?<Login/>:<Navigate to={"/"}/>}/>
      <Route path='/forget-password' element={!userData?<Forgetpassword/>:<Navigate to={"/"}/>}/>
      <Route path='/' element={userData?<Home/>:<Navigate to={"/signup"}/>}/>
      <Route path='/create-edit-shop' element={userData?<Createditshop/>:<Navigate to={"/signup"}/>}/>
      <Route path='/add-item' element={userData?<Additem/>:<Navigate to={"/signup"}/>}/>
      <Route path='/edit-item/:itemid' element={userData?<Edititem/>:<Navigate to={"/signup"}/>}/>
      <Route path='/cart' element={userData?<Cartpage/>:<Navigate to={"/signup"}/>}/>
      <Route path='/checkout' element={userData?<CheckOut/>:<Navigate to={"/signup"}/>}/>
      <Route path='/orderplaced' element={userData?<Orderplaced/>:<Navigate to={"/signup"}/>}/>
      <Route path='/myorders' element={userData?<Myorders/>:<Navigate to={"/signup"}/>}/>
     </Routes>
    </>
  )
}

export default App
