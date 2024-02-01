import React, { useContext, useEffect } from 'react'
import {NavLink, Navigate} from "react-router-dom";
import "../styles/login.css"
import {useState} from "react";
import axios from "axios";
import { Context, server } from '../main';
import toast from "react-hot-toast";




const Register = ({setprogress}) => {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const {isAuthanticated,setIsAuthanticated,loading ,setLoading}= useContext(Context);

const submitHandler = async (e)=>{

  setLoading(true);
  e.preventDefault();
console.log(name,email,password);
try {
  const {data} = await axios.post(`${server}/users/new`,{
    name,
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
  toast.error("User already exists, please login!");
  setIsAuthanticated(false);
  setLoading(false);
}
};



useEffect(()=>{
  setprogress(40);
  setTimeout(()=>{
    setprogress(100);
  },500);
 
},[])


if(isAuthanticated) return <Navigate to="/"/>
  return (
   
    <div className="login">
      
  <form className="loginform" onSubmit={submitHandler}>
  <input className="input"  
   value={name} onChange={(e)=>setName(e.target.value)} 
   type="name" required
    placeholder="Enter your Name" />





    <input className="input" type="email" placeholder="Please enter your email" 
    value={email} onChange={(e)=> setEmail(e.target.value)} required/>





    <input className="input" type="password" placeholder="Enter password"
    value={password} onChange={(e)=>setPassword(e.target.value)} required/>



    <button disabled={loading} className="button" type="submit">Sign Up</button>
    <h4>or</h4>
    <NavLink className="register" to="/login">Login</NavLink>
  </form>



   </div>
  )
}

export default Register
