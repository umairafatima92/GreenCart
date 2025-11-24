import React, { useEffect, useState } from 'react';
import { useAppContext } from "../../context/AppContext";
import toast from 'react-hot-toast';
import axios from 'axios';

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/seller/login',
        { email, password },
        { withCredentials: true } 
      );

      if (data.success) {
        setIsSeller(true);
        toast.success("Login successful");
        navigate('/seller');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          '/api/seller/is-auth',
          { withCredentials: true } 
        );

        if (data.success) {
          setIsSeller(true);
          navigate('/seller');
        } else {
          setIsSeller(false);
        }
      } catch (error) {
        setIsSeller(false);
        console.log("Seller not authenticated");
      }
    };

    checkAuth();
  }, [navigate, setIsSeller]);

  return !isSeller && (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
      <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
        <p className='text-2xl font-medium m-auto'>
          <span className='text-[#24a47c]'>Seller </span>
          Login
        </p>
        <div className='w-full'>
          <p>Email</p>
          <input 
            type='email'  
            placeholder='Enter your email' 
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-[#24a47c]'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />

          <p className='mt-4'>Password</p>
          <input 
            type='password'  
            placeholder='Enter your password'
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-[#24a47c]'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button 
          type='submit'
          className='bg-[#24a47c] text-white w-full py-2 rounded-md cursor-pointer hover:bg-[#1e8a66] transition-colors'
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default SellerLogin;
