import React, { useState } from 'react';
import {
      MDBBtn,
      MDBContainer,
      MDBRow,
      MDBCol,
      MDBCard,
      MDBCardBody,
      MDBCardImage,
    //   MDBInput,
    //   MDBIcon,
    //   MDBCheckbox
    }
from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useFormik} from 'formik'
import axios from 'axios';
import userContext from '../context';
import {useContext} from "react"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

 function App(){
    const [name,setName]=useState('')
    const [btn,setbtn]=useState(true)
    const [todo,setTodo]=useState([])
    const [todoid,setTodoid]=useState()
    var head=useContext(userContext)
    const navigate=useNavigate()
   
    async function getme(){
        axios.get(' https://todo--12345.herokuapp.com/api/user/getme',{headers:{
            'Content-Type':'application/json',
            'x-auth-token':head.auth
          }}).then(res=>{
            console.log(res.data);
           setName(res.data.name)
           setTodo(res.data.todo)
            
          })
    }
    
    useEffect(()=>{
        getme()
    },[])
   const logout=()=>{
    head.auth=null;
    navigate('/')
   }
   const addtodo=()=>{
    navigate('/add')
   }
   const click=(id)=>{
    setbtn(false)
    setTodoid(id)
    console.log(todoid);
   }
   const end=(item)=>{
    // e.preventDefault()
    // console.log(item.ID);
   }
        return(
            <>
            <MDBContainer fluid>

<MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
  <MDBCardBody>
    <MDBRow>
            <h1>Welcome {name}</h1>
               
            <table>
    <tr>
        <th>Activity</th>
        <th>Status</th>
        <th>Timer</th>
        <th>Action</th>
    </tr>
    {todo.map((item,i)=>(
        <tr key={i}>
        <td>{item.activity}</td>
        <td>{item.status}</td>
        <td>{item.time}</td>
        <td><button onClick={()=>{
            setbtn(false)
            axios.put(' https://todo--12345.herokuapp.com/api/user/updatestatus',{ID:item.ID})
    .then(res=>{
        console.log(res.data)
    })}}>Start</button><button onClick={()=>{
        axios.post(' https://todo--12345.herokuapp.com/api/user/updatetodo',{ID:item.ID,time:'00:30:00'})
        .then(res=>{
            console.log(res.data)
        })
    }} disabled={btn}>End</button></td>
    </tr>

    ))}
    </table>

                <div style={{display:'inline'}}>
               <MDBBtn onClick={logout}>Log Out</MDBBtn> &nbsp;
               <MDBBtn onClick={addtodo}>Add Activity</MDBBtn>
               </div>
                


</MDBRow>
</MDBCardBody>
</MDBCard>

</MDBContainer>
            </>
            )
    
    
}
export default App