import React, { useState, useEffect } from 'react'
import Header from '../../Components/Header/Header'
import SCNavbar from '../../Components/Header/SCNavbar'
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
// import * as Yup from "yup";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from "axios";
import "./CircleSetting.css"

const CircleSetting = () => {

  const [key, setKey] = useState('Basic');
  const [zcurrentUser, setZCurrentUser] = useState('')

  // Input fields
  const [basicValues, setbasicValues] = useState({});

  useEffect(() => {
    const getCurrentSpace = async () => {
      try {
        const resapi = await axios.get(`/space/${localStorage.getItem("container_iid")}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        // setZCurrentUser(resapi.data)
        setbasicValues(resapi.data.profile)
        console.log("resapi", resapi)

      } catch (err) {
        console.warn(err)
      }
    }
    getCurrentSpace()
  }, [])

  return (<>
    <Header />
    <SCNavbar />
    <div className='gcontainer' style={{ marginLeft: "2.5rem", marginRight: "2.5rem", marginBottom: "2.5rem" }}>
      <div className='gcard'>
        <p style={{ fontSize: "20px" }}><strong>Circle</strong>&nbsp;&nbsp;Settings</p>

        <div style={{ maxWidth: "60rem", padding: "15px" }}>

          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3">

            <Tab eventKey="Basic" title="Basic">

              <Formik
                initialValues={basicValues}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(async () => {
                    try {
                      // let resapi = await axios.post(`https://circlenowdev.xyz/api/v1/user/${localStorage.getItem("current_user_id")}`, values, {
                      //   headers: {
                      //     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                      //   },
                      // })
                      // console.log("resapi2", resapi)
                      console.log("basicValues", basicValues)
                      console.log("Values", values)
                    } catch (err) {
                      console.warn(err)
                    }
                    console.log("Logging in", values);

                    setSubmitting(false);
                  }, 500);
                }}
              >

                {props => {
                  const {
                    values, isSubmitting, handleChange, handleSubmit
                  } = props;

                  if (isSubmitting) {
                    var disableStyle = { cursor: "not-allowed", }
                  }

                  return (

                    <Form onSubmit={handleSubmit} style={{ margin: "0px" }}>

                      <label className='gformlabel' htmlFor="name">Name *</label>
                      <input
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="description">Description</label>
                      <input
                        name="description"
                        type="text"
                        value={values.description}
                        onChange={handleChange}
                        style={{ marginBottom: "0px" }}
                      />
                      <span style={{ fontSize: "12px" }}>Max. 100 characters.</span>

                      <label className='gformlabel' htmlFor="about">About</label>
                      <input
                        name="about"
                        type="text"
                        value={values.about}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="color">Color</label>
                      <div style={{ display: "flex" }}>
                        <input
                          name="color"
                          type="color"
                          value={values.color}
                          onChange={handleChange}
                          style={{ height: "50px", width: "50px" }}
                        />
                        {<p style={{ display: "inline-flex", marginTop: "25px", paddingLeft: "10px" }}>{values.color}</p>}
                      </div>


                      <div className="d-flex justify-content-between">
                        <button className="globalbtn" style={disableStyle} type="submit" disabled={isSubmitting}>Save</button>
                      </div>

                    </Form>
                  );
                }}
              </Formik>

            </Tab>

          </Tabs>

        </div >

      </div>


    </div>
  </>
  )
}

export default CircleSetting