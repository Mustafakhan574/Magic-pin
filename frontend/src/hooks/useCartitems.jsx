import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setcartitems } from '../../redux/userSlice';
import { serverurl } from '../App';
import { useEffect } from 'react';

const useGetcartitems = () => {
  const dispatch = useDispatch();
  const fetchCartItems = async () => {
    try {
      const result = await axios.get(`${serverurl}/api/cart/getcartitems`, {
        withCredentials: true,
      });
      console.log("cart items data", result.data);
      dispatch(setcartitems(result.data));
    } catch (err) {
      console.log("Error fetching cart items", err);
    }
  };
useEffect(()=>{
  fetchCartItems()
},[])
  return fetchCartItems; 
  
};


export default useGetcartitems;
