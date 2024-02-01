import React, { useEffect, useState } from 'react'
import "../styles/login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const Todoitem = ({tittle,
    discription,
    isCompleted,
updateHandler,
deleteHandler,
id,createdAt,
key}) => {

  const [date,setDate]=useState("");

  
  useEffect(()=>{
    var date = new Date(createdAt)

setDate(date.toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'}));
  },[]);




  return (
    <div className="tasks_section">
      <h3><FontAwesomeIcon icon={faCircle} size="2xs" style={{color: "#fb3302",}} />{tittle}</h3>
      <h5>{discription}</h5>
      <h6>{date}</h6>
      <input onChange={()=>updateHandler(id)}type="checkbox" className="checkbox" value={isCompleted} />
      <button onClick={()=>deleteHandler(id)} className="button">Delete Task</button>
    </div>
  )
}

export default Todoitem
