import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import registerUrl from "../../API";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Select from 'react-select';
import "./InviteModal.css";
import Spinner from "../../aspinner/Spinner";

const InviteModal = (props) => {

  const [key, setKey] = useState('PickUsers');
  const [data, setdata] = useState('')
  const [selectvalue, setselectvalue] = useState('')
  const [isSubmittingMulti, setisSubmittingMulti] = useState(false)

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
      return filteredData.push({ value: item.id, label: item.display_name });
    })
  }

  const handleInput = (newValue) => {
    setselectvalue(newValue)
  }

  const handleSubmitmuti = (e) => {

    (async () => {
      e.preventDefault()
      console.log(selectvalue)
      selectvalue.map(async (i) => {
        console.log(i.value)
        try {
          // https://circlenowdev.xyz/api/v1/space/5/membership/25
          let resapi = await axios.post(`/space/${props.id}/membership/${i.value}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          console.log(resapi)
        } catch (err) {
          console.warn(err)
        }
      })
      setisSubmittingMulti(false);

    })()
  }

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Add</strong> Members</Modal.Title>
        </Modal.Header>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3">
          <Tab eventKey="PickUsers" title="Pick User">
            <Modal.Body>
              <p>To Add users to this space, please type their names below to find and pick them.</p>
              <Form onSubmit={handleSubmitmuti}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Invites</Form.Label>
                  <Select
                    isMulti
                    name="useradd"
                    options={filteredData}
                    onChange={handleInput}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </Form.Group>
                <div className="invitemodalbtn">
                  <button className="globalbtn" type="submit">{isSubmittingMulti ? "Wait" : "Add"}</button>
                </div>
              </Form>
            </Modal.Body>
          </Tab>


          <Tab eventKey="InviteByEmail" title="Invite By Email">
            <Modal.Body>
              <p>You can also invite external users, which are not registered now. Just add their e-mail addresses separated by comma.</p>
              <Formik
                initialValues={{ email: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(async () => {
                    try {
                      console.log(values)
                      let resapi = await axios.post(`${registerUrl}/gettoken`, values)
                      console.log(resapi)
                    }
                    catch (err) {
                      console.log(err);
                      alert("Invalid credentials");
                    }
                    setSubmitting(false);
                  }, 1000);
                }}

                validationSchema={Yup.object().shape({
                  email: Yup.string()
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
                    <div>
                      <form onSubmit={handleSubmit}>
                        <input
                          id="email"
                          name="email"
                          type="text"
                          placeholder="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={errors.email && touched.email && "error"}
                        />
                        {errors.email && touched.email && (
                          <div className="input-feedback">{errors.email}</div>
                        )}
                        <div className="invitemodalbtn">
                          <button className="globalbtn" style={disableStyle} type="submit" disabled={isSubmitting}>{isSubmitting ?<div className="globalbtnspin"><Spinner/></div>  : "Submit"}</button>
                        </div>
                      </form>
                    </div>
                  );
                }}
              </Formik>
            </Modal.Body>

          </Tab>
        </Tabs>
      </Modal>

    </>

  )

}
export default InviteModal;