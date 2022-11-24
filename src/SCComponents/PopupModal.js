import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Formik } from "formik";
import Select from 'react-select';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const PopupModal = (props) => {
  const [key, setKey] = useState('CreateTask');
  const [data, setdata] = useState('')
  const [selectvalue, setselectvalue] = useState('')
  const [isSubmittingMulti, setisSubmittingMulti] = useState(false)
  const [fileAsset, setFileAsset] = useState();
  const [createdTaskId, setCreatedTaskId] = useState('');

  useEffect(() => {
    const getuserlist = async () => {
      try {
        const resapi = await axios.get(`/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        setdata(resapi.data.results);
        console.log(resapi);
      } catch (err) {
        console.warn(err)
      }
    }
    getuserlist()
  }, [])

  if (data && data.length > 0) {
    var filteredData = []
    data.map((item) => {
      return filteredData.push({ value: item.guid, label: item.display_name });
    })
  }

  const handleInput = (newValue) => {
    setselectvalue(newValue)
  }

  const handleSubmitmuti = (e) => {

    (async () => {
      e.preventDefault()
      setisSubmittingMulti(true);
      var assignedUsers = [];
      selectvalue.map(async (i) => {
        assignedUsers.push(i.value)
      })
      const payload = { Task: { assignedUsers: assignedUsers } }
      console.log(payload)
      try {
        let resapi = await axios.put(`/tasks/task/${createdTaskId}`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        console.log(resapi)
      } catch (err) {
        alert(err)
        console.warn(err)
      }
      setisSubmittingMulti(false);

    })()
  }

  const onFileChange = async (e) => {
    setFileAsset(e.target.files[0]);
    console.log(e.target.files[0])
    const formData = new FormData();
    formData.append('fileUpload', fileAsset);
    try {
      let resapi = await axios.post(`/tasks/task/${createdTaskId}/upload-files`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      console.log('u', resapi)
    } catch (err) {
      console.warn(err)
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

          <Tab eventKey="CreateTask" title="Create Task">
            {createdTaskId ? <><div style={{ color: "green" }}>&nbsp;Task created you can upload further details</div></> : null}
            <Modal.Body>
              <Formik
                initialValues={{}}
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
                      let resapi = await axios.post(`/tasks/container/${localStorage.getItem("container_iid")}`, payLoad, {
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
                        required
                      />

                      <label className='gformlabel' htmlFor="end_time">End Time<span style={{ color: "#21A1B3", fontSize: "18px" }}>*</span></label>
                      <input
                        name="end_time"
                        type="Time"
                        value={values.end_time}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />

                      <div className="d-flex justify-content-between">
                        <button className="globalbtn" style={disableStyle} type="submit" disabled={isSubmitting}>Create Task</button>
                      </div>

                    </Form>
                  );
                }}
              </Formik>

            </Modal.Body>
          </Tab>


          <Tab eventKey="AssignUser" title="Assign User">
            <Modal.Body>
              {!createdTaskId ? <><div style={{ color: "red" }}>&nbsp;Please create task first</div></> : null}

              <p>To Assign user to this task, please type their names below to find and pick them.</p>
              <Form onSubmit={handleSubmitmuti}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Select
                    isMulti
                    name="useradd"
                    options={filteredData}
                    onChange={handleInput}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                  <div className="d-flex justify-content-start form-text">If empty any user can complete the task.</div>
                </Form.Group>
                <div className="invitemodalbtn">
                  <button className="globalbtn" type="submit">{isSubmittingMulti ? "Wait" : "Save"}</button>
                </div>
              </Form>
            </Modal.Body>
          </Tab>

          <Tab eventKey="Attachments" title="Attachments">
            {!createdTaskId ? <><div style={{ color: "red" }}>&nbsp;Please create task first</div></> : null}
            <input
              type='file'
              name='uploadFile'
              onChange={(e) => onFileChange(e)}
              style={{ border: "none", padding: "5px" }}
            />
            {fileAsset && <img src={URL.createObjectURL(fileAsset)} style={{ padding: "10px" }} height={100} width={100} alt="nofile" />}
          </Tab>
        </Tabs>

      </Modal>
    </>
  );
};
export default PopupModal;
