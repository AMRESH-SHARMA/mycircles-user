import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



const EditModal = (props) => {
  const [taskdata, settaskdata] = useState([]);
  useEffect(() => {
    async function getTask() {
      // console.log("task_id", props.task_id);
      try {
        const res = await axios.get("/tasks/task/" + props.task_id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },

        });
        settaskdata(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getTask();
  }, [props.task_id])

  const url = window.location.href;
  const id = url.split("/");
  const [Title, setTitle] = useState();
  const [StartDate, setStartDate] = useState();
  const [StartTime, setStartTime] = useState();
  const [EndDate, setEndDate] = useState();
  const [EndTime, setEndTime] = useState();
  const [Description, setDescription] = useState();
  const [key, setKey] = useState('General');
  const [files, setfiles] = useState();
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
  const onFileUpload = (event) => {
    if (event.target.files[0]) {
      setfiles(event.target.files[0]);
      console.log("Here is your file", event.target.files[0]);
    }
  }
  const handledelete = () => {
    setfiles(null);
  }
  const handlesave = () => {
    if (files) {
      setKey("General");
    }
  }
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3">
          <Tab eventKey="General" title="General">
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleinputInput1">
                  <Form.Label>Title</Form.Label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="email"
                    value={taskdata.title}
                    placeholder="name@example.com"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleinputInput1">
                  <Form.Label>Start Date</Form.Label>
                  <input
                    onChange={(e) => setStartDate(e.target.value)}
                    type="Date"
                    placeholder="name@example.com"
                    autoFocus
                  />
                  <Form.Label>Start time</Form.Label>
                  <input
                    onChange={(e) => setStartTime(e.target.value)}
                    type="Time"
                    placeholder="name@example.com"
                    autoFocus
                  />
                  <Form.Label>End Date</Form.Label>
                  <input
                    onChange={(e) => setEndDate(e.target.value)}
                    type="Date"
                    placeholder="name@example.com"
                    autoFocus
                  />
                  <Form.Label>End time</Form.Label>
                  <input
                    onChange={(e) => setEndTime(e.target.value)}
                    type="Time"
                    placeholder="name@example.com"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleinputTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <input
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
          </Tab>
          <Tab eventKey="Attachment" title="Attachment">
            <div className="d-flex">
              <button className="uploadbtn" >
                <label style={{ cursor: 'pointer' }} htmlFor="showfile"><i class="bi bi-upload" style={{ marginRight: "5px" }}></i>Upload</label>
                <input onChange={onFileUpload} type="file" id="showfile" style={{ display: "none", visibility: "none" }}></input>
              </button>
              {files ? <p style={{ marginTop: "20px" }}>{files.name}<i onClick={handledelete} class="bi bi-trash"></i></p> : null}
            </div>
            <button className="globalbtn" onClick={handlesave} style={{ margin: "10px" }}>
              Save
            </button>

          </Tab>
        </Tabs>
      </Modal>
    </>
  );
};
export default EditModal;
