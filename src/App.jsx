import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "./main";
import LoadingBar from 'react-top-loading-bar';
import PreLoader from "./components/preloader";

function App() {
  const {setUser,setIsAuthanticated,setLoading}=useContext(Context);
  const [progress, setProgress] = useState(0)

   useEffect(()=>{
    setLoading(true);
    axios.get(`${server}/users/me`,{
      withCredentials:true,
    }).then(res=>{
      setUser(res.data.user1);
      setIsAuthanticated(true);
      setLoading(false);
    }).catch((e)=>{
      setUser({});
      setIsAuthanticated(false);
      setLoading(false);
    })

  },[]);


  useEffect(()=>{
    axios.interceptors.request.use(
      config => {
        setProgress(40);
        setTimeout(()=>{
          setProgress(100);
        },500);
        return config
      },
      error => {
        Promise.reject(error)
      }
    )
    axios.interceptors.response.use(
      config => {
        setProgress(0);
        return config
      },
      error => {
        Promise.reject(error)
      }
    )
  },[]);







 
  return(
<Router>
  <Header/>
  <PreLoader/>
  <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
  <Routes>

<Route path="/" element = {<Home setprogress={setProgress}/> } />
<Route path="/login" element = {<Login setprogress={setProgress}/>} />
<Route path="/register" element = {<Register setprogress={setProgress}/>} />
<Route path="/profile" element = {<Profile setprogress={setProgress}/>} />


  </Routes>

<Toaster/>
<Footer/>

</Router>



  )




}

export default App
