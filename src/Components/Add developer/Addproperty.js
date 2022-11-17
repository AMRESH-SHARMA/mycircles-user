import React from 'react'
import Form from 'react-bootstrap/Form';
import Header from '../Header/Header';
import SCNavbar from '../Header/SCNavbar';
import "./Addproperty.css";

export default function Addproperty() {
  return (
    <>
    <Header/>
    <SCNavbar/>
    <div style= {{marginTop:"60px",marginBottom:"60px"}} >  <Form className='form' >
    
      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Property Name *</Form.Label>
                        <Form.Control className='forminputbox' type="name"  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Address *</Form.Label>
                        <Form.Control className='forminputbox' type="name" />
                    </Form.Group>
      
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>State</Form.Label>
                        <Form.Control className='forminputbox' type="name" />
                        
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>City</Form.Label>
                        <Form.Control className='forminputbox' type="name" />
                        
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>PIN CODE</Form.Label>
                        <Form.Control className='forminputbox' type="name" />
                        
                    </Form.Group>
                    </Form>

    </div>
    </>
  )
}
