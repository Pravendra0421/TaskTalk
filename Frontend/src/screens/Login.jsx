import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from "../config/axios.js";
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../context/user.context.jsx'
const Login = () => {

  const [email,setEmail]= useState('');
  const [password,setPassword]=useState('');
  const {setUser}=useContext(UserContext);
  const navigate = useNavigate();
  const submitHandler=(e)=>{
    e.preventDefault();
    axios.post('/users/login',{
      email,password
    }).then((res)=>{
      console.log(res.data)
      localStorage.setItem('token',res.data.token);
      setUser(res.data.user);
      navigate('/');
    }).catch((err) => {
  const msg = err.response?.data?.errors || "Login failed";
  console.log("Login error:", msg);
  alert(msg); // Show error to user
});

  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-b from-blue-300 to-blue-400 p-10 rounded-[40px_0_40px_40px] w-96 shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">Sign In</h2>
        <form onSubmit={submitHandler}>
          
        <input
          type="email"
          placeholder="Username"
          id='email'
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <input
          type="password"
          placeholder="Password"
          id='password'
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <div className="flex justify-between items-center text-sm text-white mb-6">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="hover:underline">Forgot Password</a>
        </div>

        <button type='submit' className="w-full bg-black text-white py-2 rounded-full text-lg font-semibold hover:opacity-90">
          LOGIN
        </button>

        </form>
        <p className="mt-6 text-center text-white text-sm">
          Don’t have an account? <Link to="/register" className='underline'>register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
