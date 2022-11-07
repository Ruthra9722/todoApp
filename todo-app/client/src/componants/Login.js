import React from 'react';
import {
    //   MDBBtn,
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


function App() {
  const navigate=useNavigate()
 var head=useContext(userContext)
  async function postlogin(){
    axios.post(' https://todo--12345.herokuapp.com/api/user/login',{
        userName:formik.values.uname,
        pwd:formik.values.password
    }).then(res=>{
        // token=Object.entries(res.data)
        console.log(res.data);
        // console.log(res.headers.Autherization);
        if(res.data==='No user on that name') return(alert('No user on that name'))
        if(res.data==='Please enter correct id and password') return(alert('Please enter correct id and password'))
        head.auth=res.data   
        
        navigate('/profile')
        // if(head.auth)getme()
      })
}    

   
  const formik=useFormik({
    initialValues:{
      uname:"",
      password:"",
      
    },
    onSubmit:(values)=>{
      console.log(values);
      postlogin();
      
    },
    validate:(values)=>{
      let errors = {};
        if (!values.uname) {
        errors.uname = 'Required';
        } 
        if(!values.password) errors.password="Required";
        return errors;
    }
  })
  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
        <form onSubmit={formik.handleSubmit}>
        
        <input id="uname" name="uname" placeholder='enter User Name' type="text" onChange={formik.handleChange}
        value={formik.values.uname} />
        {formik.errors.uname ? <div style={{ color: "red" }} >{formik.errors.uname}</div> : 
        null}
        
        
        <br></br><br></br><input id="password" placeholder='enter password' name="password" type="password"
        onChange={formik.handleChange} value={formik.values.password} /><br></br>
        {formik.errors.password ? <div style={{ color: "red" }} 
        >{formik.errors.password}</div> : null}
       <br></br><br></br> <button type="submit">Submit</button>
      

      <div className="text-center">
        <p>Not a member? <a href="#/register">Register</a></p>
        
      </div>
      </form>

      </MDBCol>

<MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
  <MDBCardImage src='https://thumbs.dreamstime.com/b/login-illustration-letter-cubes-forming-word-36025252.jpg' fluid/>
</MDBCol>

</MDBRow>
</MDBCardBody>
</MDBCard>

</MDBContainer>
  );
}

export default App;