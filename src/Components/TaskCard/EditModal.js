import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from "react-router-dom";



const EditModal = (props) => {

  const navigate = useNavigate();
  const [key, setKey] = useState('General');
  const [files, setfiles] = useState();
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

  const onFileUpload = (event) => {
    // if (event.target.files[0]) {
    //   setfiles(event.target.files[0]);
    //   console.log("Here is your file", event.target.files[0]);
    // }

    const formData = new FormData();
    // formData.append('avatar', event.target.files[0]);
    formData.append('avatar', event.target.files[0]);

    fetch(`https://circlenowdev.xyz/api/v1/tasks/task/${props.task_id}/upload-files`, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

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
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3">
          <Tab eventKey="General" title="General">
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
                      let resapi = await axios.put(`/tasks/task/${props.task_id}`, payLoad, {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                      })
                      console.log("resapi", resapi)
                      if (resapi.data.id) {
                        navigate(0)
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
