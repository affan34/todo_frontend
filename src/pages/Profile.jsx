import React, { useContext, useEffect, useState,  } from 'react'
import { Context } from '../main';
import "../styles/profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';

import { Navigate } from 'react-router-dom';

const Profile = ({setprogress}) => {
  

  const {isAuthanticated,user,}= useContext(Context);


  if(!isAuthanticated) return <Navigate to="/login" />;

  useEffect(()=>{
    setprogress(40);
    setTimeout(()=>{
      setprogress(100);
    },500);
  
  },[])
 
  return (

    <div className="profile_main">
   <div className="profile_maininfo">
<FontAwesomeIcon icon={faUser} size="2xl" style={{color: "#fb3302",}}  />
<h1>Hi, {user?.name}</h1>
<h3>Email id : {user?.email}</h3>

   </div>
  
 </div>
  )
}

export default Profile
