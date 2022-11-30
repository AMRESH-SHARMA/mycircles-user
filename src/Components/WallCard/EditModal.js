import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
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
    async function getPostById() {
      try {
        const resapi = await axios.get(`https://circlenowdev.xyz/api/v1/post/${props.post_id}`, {
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
    getPostById();
  }, [props.post_id])

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
          <Modal.Title>Update Post</Modal.Title>
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
                    data: {
                      message: values.message,
                    }
                  }
                  setTimeout(async () => {
                    try {
                      console.log("resapi", payLoad)
                      let resapi = await axios.put(`/post/${props.post_id}`, payLoad, {
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

                validationSchema={Yup.object().shape({
                  message: Yup.string()
                    .required("Required"),
                })}
              >

                {props => {
                  const {
                    values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit
                  } = props;

                  if (isSubmitting) {
                    var disableStyle = { cursor: "not-allowed", }
                  }

                  return (

                    <Form onSubmit={handleSubmit} style={{ margin: "0px" }}>

                      <label className='gformlabel' htmlFor="message">Message<span style={{ color: "#21A1B3", fontSize: "18px" }}>*</span></label>

                      <textarea
                        name="message"
                        type="text"
                        rows="3"
                        cols="50"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email && "error"}
                      />
                      {errors.message && touched.message && (
                        <div className="input-feedback" style={{marginTop:"1px"}}>{errors.message}</div>
                      )}

                      <div className="d-flex justify-content-between">
                        <button className="globalbtn" style={disableStyle} type="submit" disabled={isSubmitting}>{isSubmitting ? "Wait" : "Update Post"}</button>
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
