import React,{useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./InviteModal.css";

const InviteModal = (props) =>{
   const [key, setKey] = useState('PickUsers');
    return (
        <>
    
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Invite</strong> Members</Modal.Title>
        </Modal.Header>
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3">
      <Tab eventKey="PickUsers" title="Pick User">
          <Modal.Body>
          <p>To invite users to this space, please type their names below to find and pick them.</p>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Invites</Form.Label>
              <Form.Control
                
                
                placeholder="Select User.."
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        
      </Tab>
      <Tab eventKey="InviteByEmail" title="Invite By Email">
          <Modal.Body>
          <p>You can also invite external users, which are not registered now. Just add their e-mail addresses separated by comma.</p>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label><strong>New user by e-mail (comma separated)</strong></Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Email Address"  
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        
      </Tab>
      </Tabs>
    
        <Modal.Footer>
          <Button variant="secondary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
        
        </>
        
    )
    
}
export default InviteModal;