import React from 'react'
import ReactDOM from 'react-dom/client'
import {useState} from "react";
import App from './App.jsx'
import './styles/app.css';
import {createContext} from "react";
export const server="https://nodejs-todoapp-uf1s.onrender.com/api/v1";



export const Context = createContext({isAuthanticated:false})

const AppWrapper=()=>{


const[isAuthanticated,setIsAuthanticated]=useState(false);
const[loading,setLoading]=useState(false);
const[user,setUser]=useState({});


  return <Context.Provider value={{
    isAuthanticated,
    setIsAuthanticated,
    loading,
    setLoading,
    user,
    setUser,
   
  }}>
  <App />
  </Context.Provider>
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AppWrapper/>
  </React.StrictMode>,
)
