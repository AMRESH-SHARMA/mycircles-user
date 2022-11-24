import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



const EditModal = (props) => {

  const [Title, setTitle] = useState();
  const [StartDate, setStartDate] = useState();
  const [StartTime, setStartTime] = useState();
  const [EndDate, setEndDate] = useState();
  const [EndTime, setEndTime] = useState();
  const [Description, setDescription] = useState();
  const [key, setKey] = useState('General');
  const [files, setfiles] = useState();
  const [createdTaskId, setCreatedTaskId] = useState('');

  const [initialData, setinitialData] = useState({});

  useEffect(() => {
    async function getTaskById() {
      try {
        const resapi = await axios.get("/tasks/task/" + props.task_id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },

        });
        setinitialData(resapi.data)
        console.log(resapi.data)
      } catch (err) {
        console.log(err);
      }
    }
    getTaskById();
  }, [props.task_id])



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
      const result = await axios.post(`/tasks/container/${localStorage.getItem("container_iid")}`, payLoad, {
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
            {true ? <><div style={{ color: "green" }}>&nbsp;You can update further details</div></> : null}
            <Modal.Body>

              <Formik
                initialValues={initialData}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting }) => {
                  const payLoad = {
                    Task: {
                      title: values.title,
                      description: values.description,
                    },
                    TaskForm: {
                      is_public: values.is_public,
                      end_date: values.end_date,
                      end_time: values.end_time
                    }
                  }
                  setTimeout(async () => {
                    try {
                      console.log("resapi", payLoad)
                      let resapi = await axios.post(`/tasks/task/${props.task_id}`, payLoad, {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                      })
                      console.log("resapi", resapi)
                      if (resapi.data.id) {
                        setCreatedTaskId(resapi.data.id)
                      }
                    } catch (err) {
                      console.warn(err)
                      alert(err)
                    }

                    setSubmitting(false);
                  }, 500);
                }}
              >

                {props => {
                  const {
                    values, isSubmitting, handleChange, handleBlur, handleSubmit
                  } = props;

                  if (isSubmitting) {
                    var disableStyle = { cursor: "not-allowed", }
                  }

                  return (

                    <Form onSubmit={handleSubmit} style={{ margin: "0px" }}>

                      <label className='gformlabel' htmlFor="title">Title<span style={{ color: "#21A1B3", fontSize: "18px" }}>*</span></label>
                      <input
                        name="title"
                        type="text"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />

                      <label className='gformlabel' htmlFor="description">Description</label>
                      <textarea
                        name="description"
                        type="text"
                        rows="3"
                        cols="50"
                        value={values.description}
                        onChange={handleChange}
                        className="gtextarea"
                      />

                      {/* <div style={{ display: "flex", margin: "10px 0px 0px 0px" }}>
                        <input
                          name="is_public"
                          type="checkbox"
                          value={values.is_public ? parseInt(1) : parseInt(0)}
                          onChange={handleChange}
                          style={{ margin: "2px 5px 0px 0px", fontSize: "5px", height: "20px", width: "20px" }}
                        />
                        <label htmlFor="is_public">Public (Also visible to non-members of this space)</label>
                      </div> */}

                      <label className='gformlabel' htmlFor="end_date">End Date<span style={{ color: "#21A1B3", fontSize: "18px" }}>*</span></label>
                      <input
                        name="end_date"
                        type="Date"
                        value={values.end_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <label className='gformlabel' htmlFor="end_time">End Time<span style={{ color: "#21A1B3", fontSize: "18px" }}>*</span></label>
                      <input
                        name="end_time"
                        type="Time"
                        value={values.end_time}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <div className="d-flex justify-content-between">
                        <button className="globalbtn" style={disableStyle} type="submit" disabled={isSubmitting}>{isSubmitting ? "Wait" : "Update Task"}</button>
                      </div>

                    </Form>
                  );
                }}
              </Formik>

            </Modal.Body>

            {/* <Modal.Footer>
              <button className="globalbtn" onClick={handleSubmit}>
                Done
              </button>
              <button className="globalbtn" onClick={props.handleClose}>
                Close
              </button>
            </Modal.Footer> */}
          </Tab>
          <Tab eventKey="Attachment" title="Attachment">
            {createdTaskId ? <><div style={{ color: "green" }}>&nbsp;You can update further details</div></> : null}
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
