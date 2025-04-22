import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "../config/axios.js"
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/user.context.jsx';
const Register = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const submitHandler = (e)=>{
    e.preventDefault();
    axios.post('/users/register',
      {email,password}
    ).then((res)=>{
      console.log(res.data);
      localStorage.setItem('token',res.data.token);
      setUser(res.data.user);
      navigate('/');
    }).catch((err)=>{
      console.log(err.response.data);
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-b from-blue-300 to-blue-400 p-10 rounded-[40px_0_40px_40px] w-96 shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">Sign Up</h2>

        <form onSubmit={submitHandler}>
          
        <input
          type="email"
          placeholder="Email"
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

        <button type='submit' className="w-full bg-black text-white py-2 rounded-full text-lg font-semibold hover:opacity-90">
          SIGN UP
        </button>
        </form>

        <p className="mt-6 text-center text-white text-sm">
          Already have an account? <Link to='/login' className='underline'>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
