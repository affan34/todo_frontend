import React, { useContext, useEffect, useState } from 'react'
import {NavLink, Navigate} from "react-router-dom";
import "../styles/login.css";
import { Context, server } from '../main';
import toast from "react-hot-toast";
import axios from "axios";


const Login = ({setprogress}) => {
  const {isAuthanticated,setIsAuthanticated,loading,setLoading}= useContext(Context);
  
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const submitHandler = async (e)=>{
    setLoading(true);
    e.preventDefault();
  console.log(email,password);
  try {
    const {data} = await axios.post(`${server}/users/login`,{
 
      email,
      password,
    },
    {
      headers:{
       "Content-Type":"application/json"
      },
      withCredentials:true,
    }
    );
    toast.success(data.message);
    setIsAuthanticated(true);
    setLoading(false);
   
  } catch (error) {
    toast.error("invalid email or password");
    setIsAuthanticated(false);
    setLoading(false);

  }
  };
  useEffect(()=>{
    setprogress(40);
    setTimeout(()=>{
      setprogress(100);
    },500);
   
  },[]);
  
  if(isAuthanticated) return <Navigate to="/" />;


  return (
   <div className="login">
  <form className="loginform" onSubmit={submitHandler}>
    <p className="h3">Please Login first</p>
  <input className="input" type="email" placeholder="Please enter your email" 
    value={email} onChange={(e)=> setEmail(e.target.value)} required/>





    <input className="input" type="password" placeholder="Enter password"
    value={password} onChange={(e)=>setPassword(e.target.value)} required/>



    <button disabled={loading} className="button" type="submit">Login</button>
    <h4>or</h4>
    <NavLink className="register" to="/register">Click Here to Sign Up!</NavLink>
  </form>



   </div>
  )
}

export default Login
