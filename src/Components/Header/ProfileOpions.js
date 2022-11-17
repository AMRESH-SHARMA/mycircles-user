import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./ProfileOptions.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function ProfileOpions() {
    const [key, setKey] = useState('General');
    const [innerkey,setinnerkey] = useState('General')
    
  return (
    
     <Form className='form'>
      <h3 >Your Profile</h3>
      <hr style={{marginBottom:"20px"}}/>
      <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3">
          <Tab eventKey="General" title="General">
             <p style={{ marginTop:"20px",marginBottom:"20px"}}>Here you can edit your general profile data, which is visible in the about page of your profile.</p>
              <Tabs
               id="controlled-tab-example"
               activeKey={innerkey}
               onSelect={(k) => setinnerkey(k)}
               className="mb-3">
               <Tab eventKey="General" title="General">

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name *</Form.Label>
                        <Form.Control type="name" placeholder="Enter First Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Last Name *</Form.Label>
                        <Form.Control type="name" placeholder="Enter Last Name" />
                    </Form.Group>
      
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Gender *</Form.Label>
                        <Form.Select >
                            <option>Please Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Custom</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="name"  />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="name"  />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="name"  />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="name"  />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date"  />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" label="Hide year In my Profile " />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>About</Form.Label>
                        <Form.Control type="name"  />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Profile
                    </Button>
                </Tab>
                <Tab eventKey="Commmunication" title="Communication">

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Phone Private </Form.Label>
                        <Form.Control type="name"  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Phone Work </Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mobile </Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Fax </Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Skype Name</Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Xampp Jabber Address </Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>
                     <Button variant="primary" type="submit">
                        Save Profile
                    </Button>
      
       
                </Tab>
                   <Tab eventKey="Social_bookmarks" title="Social Bookmarks">

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>URL </Form.Label>
                        <Form.Control type="name"  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Facebook URL</Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Linkedin URL </Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Xing URL </Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Youtube URL</Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Vimeo URL </Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Flickr URL </Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>MySpace URL </Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Twitter URL </Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>
                     <Button variant="primary" type="submit">
                        Save Profile
                    </Button>
      
       
                </Tab>
                </Tabs>
                
          
            </Tab>
            <Tab eventKey="ChangeUsername" title = "Change Username">
            
             <p style={{ marginTop:"20px",marginBottom:"20px"}}>Your current username is ...... You can change your current username here.</p>

                 <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Current Password *</Form.Label>
                        <Form.Control type="name"  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Change Username *</Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save 
                    </Button>

            </Tab>
            <Tab eventKey="ChangeEmail" title = "Change Email">
                
             <p style={{ marginTop:"20px",marginBottom:"20px"}}>Your current E-mail address is ..... You can change your current E-mail address here</p>

                 <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Current Password *</Form.Label>
                        <Form.Control type="name"  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Change Email *</Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save 
                    </Button>

            </Tab>
            <Tab eventKey="ChangePassword" title = "Change Password">
                
             <p style={{ marginTop:"20px",marginBottom:"20px"}}>Your current E-mail address is ..... You can change your current E-mail address here</p>

                 <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Current Password *</Form.Label>
                        <Form.Control type="name"  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>New Password *</Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm new Password *</Form.Label>
                        <Form.Control type="name"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save 
                    </Button>

            </Tab>
            <Tab eventKey="DeleteAccount" title = "Delete Account"></Tab>
           
        </Tabs>
      
      
     
     
    </Form>

        
    
 


        
      
    
  )
}
