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
import axios from 'axios'
// import { Button } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import userContext from '../context';
import {useContext} from "react"

function App() {
    var head=useContext(userContext)
    
    const navigate=useNavigate()
    async function postreg(){
        axios.post(' https://todo--12345.herokuapp.com/api/user/addtodo',{activity:formik.values.activity},{headers:{
        'Content-Type':'application/json',
        'x-auth-token':head.auth
      }}).then(res=>{
        console.log(res.data)
        navigate('/profile')
      })
    } 
    const formik=useFormik({
        initialValues:{
          activity:"" 
        },
        onSubmit:(values)=>{
          console.log(values);
          postreg()
        },
        validate:(values)=>{
          let errors = {};
            if (!values.activity) {
            errors.activity = 'Required';
            } 
            
        }
      })
  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <form onSubmit={formik.handleSubmit}>

        
        
        <input id="activity" name="activity" type="text" placeholder='enter Activity' onChange={formik.handleChange}
        value={formik.values.activity} />
        {formik.errors.activity ? <div style={{ color: "red" }} >{formik.errors.activity}</div> : 
        null}
        
        <button type="submit">Submit</button>
        </form>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='data:image/jpeg;base64,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' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default App;