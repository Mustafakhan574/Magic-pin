import React from 'react'
import {useSelector} from 'react-redux'
import Userdisplay from '../components/Userdisplay'
import Ownerdisplay from '../components/Ownerdisplay'
const Home = () => {
      const {userData} = useSelector((state)=>state.user)
  return (
    <div className='w-[100vw] min-h-[100vh]  flex flex-col items-center'>
  {userData.role=="user" && <Userdisplay/>}
  {userData.role=="owner" && <Ownerdisplay/>}

    </div>
  )
}

export default Home