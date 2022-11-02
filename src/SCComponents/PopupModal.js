import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

const PopupModal = (props) => {
  const url = window.location.href;
  const id = url.split("/");
  const [Title, setTitle] = useState();
  const [StartDate, setStartDate] = useState();
  const [StartTime, setStartTime] = useState();
  const [EndDate, setEndDate] = useState();
  const [EndTime, setEndTime] = useState();
  const [Description, setDescription] = useState();
  async function handleSubmit() {
    try {
      let payLoad = {
        Task: {
          title: Title,
          description: Description,
        },
        TaskForm: {
          start_date: StartDate,
          start_time: StartTime,
          end_date: EndDate,
          end_time: EndTime,
        },
      };
      const result = await axios.post(`/tasks/container/${id[5]}`, payLoad, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      alert("done");
      console.log(result);
    } catch (ex) {
      alert("Error", ex);
      console.log(ex);
    }
  }
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                onChange={(e) => setStartDate(e.target.value)}
                type="Date"
                placeholder="name@example.com"
                autoFocus
              />
              <Form.Label>Start time</Form.Label>
              <Form.Control
                onChange={(e) => setStartTime(e.target.value)}
                type="Time"
                placeholder="name@example.com"
                autoFocus
              />
              <Form.Label>End Date</Form.Label>
              <Form.Control
                onChange={(e) => setEndDate(e.target.value)}
                type="Date"
                placeholder="name@example.com"
                autoFocus
              />
              <Form.Label>End time</Form.Label>
              <Form.Control
                onChange={(e) => setEndTime(e.target.value)}
                type="Time"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="globalbtn" onClick={handleSubmit}>
            Done
          </button>
          <button className="globalbtn" onClick={props.handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PopupModal;
