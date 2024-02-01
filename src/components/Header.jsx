import React, { useContext } from 'react'
import "../styles/header.css";
import { NavLink } from 'react-router-dom';
import { Context, server } from '../main';
import axios from "axios";
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';


const Header = () => {
 const {isAuthanticated,setIsAuthanticated,loading,setLoading}= useContext(Context);



 const logoutHandler = async (e)=>{
  setLoading(true);
try {
 await axios.get(`${server}/users/logout`,
  {
  
    withCredentials:true,
  }
  );
  toast.success("logout Successfully!");
  setIsAuthanticated(false);
  setLoading(false);
} catch (error) {
  toast.error(error.response.data.message);
  setIsAuthanticated(true);
  setLoading(false);
}
};




  return (
   <nav className="header">
    <div className='name'>
    <spam className="span1">to</spam><spam className="span1 span2">do.</spam>
    </div>
    <div className="links">
        <NavLink className="linked" to="/" >Home</NavLink>
        <NavLink className="linked" to="/profile" >Profile</NavLink>
        {isAuthanticated?
        (<button disabled={loading} className="linked2" onClick={logoutHandler}>logout<FontAwesomeIcon icon={faRightFromBracket} style={{color: "#001c40",}} /></button>):
        (<NavLink className="linked" to="/login" >Login</NavLink>) }
 
      
    </div>

    </nav>
  )
}

export default Header
