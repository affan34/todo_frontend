import React, { useContext, useEffect, useState } from 'react'
import "../styles/login.css";
import axios from "axios";
import {Context, server} from "../main";
import toast from 'react-hot-toast';
import Todoitem from '../components/todoitem';
import { Navigate } from 'react-router-dom';

const Home = ({setprogress}) => {
  const {isAuthanticated}= useContext(Context);
    const[tittle,setTittle]=useState("");
    const[discription,setDiscription]=useState("");
    const[loading,setLoading]=useState(false);
    const[tasks,setTasks]=useState([]);
    const [refresh,setRefresh] = useState(false);   


   



  const updateHandler=async(id)=>{
         
          try {

             const {data}=   await axios.put(`${server}/task/${id}`,{},{
                  withCredentials:true,
                })

                toast.success(data.message);
                setRefresh(prev=>!prev);


            
          } catch (error) {
            toast.error(error.response.data.message);
            setRefresh(true);
          }



  }
  const deleteHandler=async(id)=>{

       
         try {

          const {data}=   await axios.delete(`${server}/task/${id}`,{
               withCredentials:true,
             })

             toast.success(data.message);
             setRefresh(prev=>!prev);


         
       } catch (error) {
         toast.error(error.response.data.message);
         
       }

    
  }






const submitHandler=async (e)=>{
  setLoading(true);
  e.preventDefault();
  try {

    const {data}= await axios.post(`${server}/task/new`,{
      tittle,
      discription,
    },{
      withCredentials:true,
      headers:{
        "Content-Type":"application/json",
      }
    });
    
      toast.success(data.message);
      setLoading(false);
      setTittle("");
      setDiscription("");
      setRefresh(prev=>!prev);



    
  } catch (error) {
    toast.error(error.response.data.message);
    setLoading(false);
    
  }

};





    useEffect(()=>{

        axios.get(`${server}/task/my`,{
          withCredentials:true,
        }).then((res)=>{
          // console.log(res.data.tasks)
          setTasks(res.data.tasks);
        }).catch((e)=>{
          toast.error(e .response.data.message);
        })


    },[refresh]);

    useEffect(()=>{
      setprogress(40);
      setTimeout(()=>{
        setprogress(100);
      },500);
     
    },[])



    if(!isAuthanticated) return <Navigate to="/login" />;

  return (
    <div className="login login2">
  <form className="loginform " onSubmit={submitHandler}>
    <p className="h3">Add your Tasks here!</p>
  <input className="input" type="text" placeholder="Add Tittle" 
    value={tittle} onChange={(e)=> setTittle(e.target.value)} required/>


<input className="input" type="text" placeholder="Add Description" 
    value={discription} onChange={(e)=> setDiscription(e.target.value)} required/>



    <button disabled={loading} className="button" type="submit">Add Task</button>
  

  
  </form>

  <div >
  {tasks.map((i)=>(
<Todoitem  tittle={i.tittle} discription={i.discription} isCompleted={i.isCompleted}
    updateHandler={updateHandler} deleteHandler={deleteHandler}
    id={i._id} 
    createdAt={
      i.createdAt}     key={i._id}/>
  )
)
  }
</div>
   



   </div>









  )
}

export default Home
