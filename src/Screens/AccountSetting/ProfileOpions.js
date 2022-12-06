import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import "./ProfileOptions.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from "axios";
import { letterGenerate } from "../../aHelper/Helper";

export default function ProfileOpions() {
  const navigate = useNavigate();
  const [key, setKey] = useState('General');
  const [innerkey, setinnerkey] = useState('General')
  const [zcircles, setZCircles] = useState([]);
  const [zcurrentUser, setZCurrentUser] = useState('')
  const [pass, setPass] = useState('');
  const [correct, setcorrect] = useState(false);
  const [click, setclick] = useState(false);

  // Input fields
  const [generalValues, setgeneralValues] = useState({});
  // 

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await axios.get('/auth/current', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        setZCurrentUser(result.data)
        setgeneralValues(result.data.profile)
        console.log("currentUser", zcurrentUser)

      } catch (err) {
        console.warn(err)
      }
    }
    getCurrentUser()
  }, [])




  useEffect(() => {
    const getSpaces = async () => {
      try {
        const result = await axios.get(`http://206.189.133.189/api/spaces`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        // console.log(result)
        if (result.data) {
          setZCircles(result.data)
        }
      } catch (err) {
        console.warn(err)
      }
    }
    getSpaces()
  }, [])

  //handleSubmitGeneral
  const handleSubmitGeneral = (e) => {
    e.preventDefault()
  }
  //  

  // handleDelCircle
  const handleDelCircle = async () => {
    try {
      const resapi = await axios.delete(`user/${localStorage.getItem("current_user_id")}`)
      console.log(resapi)
      // if (res.data) {
      // console.log(res.data.auth_token);    
      // navigate('0');
      // }
      console.log("circle deleted")
    }
    catch (err) {
      console.log(err);
    }
  }

  return (<>
    <div style={{ maxWidth: "60rem", padding: "15px" }}>
      <h3 >Your Profile{zcurrentUser.display_name}</h3>
      <hr style={{ marginBottom: "20px" }} />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3">

        <Tab eventKey="General" title="General">
          <p className="gtextgrey" style={{ marginTop: "20px", marginBottom: "20px" }}>Here you can edit your general profile data, which is visible in the about page of your profile.</p>
          <Tabs
            id="controlled-tab-example"
            activeKey={innerkey}
            onSelect={(k) => setinnerkey(k)}
            className="mb-3">
            <Tab eventKey="General" title="General">

              <Formik
                initialValues={generalValues}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting }) => {
                  const payLoad = {
                    profile: {
                      firstname: values.firstname,
                      lastname: values.lastname,
                      title: values.title,
                      gender: values.gender,
                      street: values.street,
                      zip: values.zip,
                      city: values.city,
                      country: values.country,
                      state: values.state,
                      birthday_hide_year: values.birthday_hide_year,
                      birthday: values.birthday,
                      about: values.about,
                    }

                  }
                  setTimeout(async () => {
                    try {
                      let resapi = await axios.put(`https://circlenowdev.xyz/api/v1/user/${localStorage.getItem("current_user_id")}`, payLoad, {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                      })
                      console.log("resapi2", resapi)
                      console.log("generalValues", generalValues)
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
                    values, isSubmitting, handleChange, handleBlur, handleSubmit
                  } = props;

                  if (isSubmitting) {
                    var disableStyle = { cursor: "not-allowed", }
                  }

                  return (

                    <Form onSubmit={handleSubmit} style={{ margin: "0px" }}>

                      <label className='gformlabel' htmlFor="firstname">First name <span style={{ color: "#21A1B3", fontSize: "18px" }}>*</span></label>
                      <input
                        name="firstname"
                        type="text"
                        placeholder="Enter your firstname"
                        value={values.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />

                      <label className='gformlabel' htmlFor="lastname">Last name <span style={{ color: "#21A1B3", fontSize: "18px" }}>*</span></label>
                      <input
                        name="lastname"
                        type="text"
                        placeholder="Enter your lastname"
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />

                      <label className='gformlabel' htmlFor="title">Title</label>
                      <input
                        name="title"
                        type="text"
                        value={values.title}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="title">Gender</label>
                      <select
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        style={{ display: "block" }}
                        className="gselect"
                      >
                        <option value="" label="Select a color">
                          Select a gender
                        </option>
                        <option value="male" label="Male">
                          Male
                        </option>
                        <option value="female" label="Female">
                          Female
                        </option>

                        <option value="other" label="Other">
                          Other
                        </option>
                      </select>

                      <label className='gformlabel' htmlFor="street">Street</label>
                      <input
                        name="street"
                        type="text"
                        value={values.street}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="zip">Zip</label>
                      <input
                        name="zip"
                        type="number"
                        value={values.zip}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="city">City</label>
                      <input
                        name="city"
                        type="text"
                        value={values.city}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="country">Country</label>
                      <select
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        style={{ display: "block" }}
                        className="gselect"
                      >
                        <option value="" label="Select a country">
                          Select a Country
                        </option>
                        <option value="india" label="India">
                          India
                        </option>
                        <option value="japan" label="Japan">
                          Japan
                        </option>
                      </select>

                      <label className='gformlabel' htmlFor="state">State</label>
                      <input
                        name="state"
                        type="text"
                        value={values.state}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="birthday">Birthday</label>
                      <input
                        name="birthday"
                        type="date"
                        value={values.birthday}
                        onChange={handleChange}
                      />

                      <div style={{ display: "flex" }}>
                        <input
                          name="birthday_hide_year"
                          type="checkbox"
                          value={values.birthday_hide_year}
                          onChange={handleChange}
                          style={{ margin: "2px 5px 0px 0px", fontSize: "5px", height: "20px", width: "20px" }}
                        />
                        <label htmlFor="birthday_hide_year">Hide year in profile</label>
                      </div>

                      <label className='gformlabel' htmlFor="about">About</label>
                      <textarea
                        name="about"
                        type="text"
                        rows="3"
                        cols="50"
                        value={values.about}
                        onChange={handleChange}
                        className="gtextarea"
                      />

                      <div className="d-flex justify-content-between">
                        <button className="globalbtn" style={disableStyle} type="submit" disabled={isSubmitting}>Save Profile</button>
                      </div>

                    </Form>
                  );
                }}
              </Formik>

            </Tab>

            <Tab eventKey="Commmunication" title="Communication">

              <Formik
                initialValues={generalValues}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(async () => {
                    const payLoad = {
                      profile: {
                        firstname: values.firstname,
                        lastname: values.lastname,
                        title: values.title,
                        gender: values.gender,
                        street: values.street,
                        zip: values.zip,
                        city: values.city,
                        country: values.country,
                        state: values.state,
                        birthday_hide_year: values.birthday_hide_year,
                        birthday: values.birthday,
                        about: values.about,
                        phone_private: values.phone_private,
                        phone_work: values.phone_work,
                        mobile: values.mobile,
                        fax: values.fax,
                        im_skype: values.im_skype,
                        im_xmpp: values.im_xmpp,
                      }
                    }
                    try {
                      let resapi = await axios.post(`https://circlenowdev.xyz/api/v1/user/${localStorage.getItem("current_user_id")}`, payLoad, {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                      })
                      console.log("resapi2", resapi)
                      console.log("generalValues", generalValues)
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

                      <label className='gformlabel' htmlFor="phone_private">Phone Private</label>
                      <input
                        name="phone_private"
                        type="text"
                        value={values.phone_private}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="phone_work">Phone Work</label>
                      <input
                        name="phone_work"
                        type="text"
                        value={values.phone_work}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="mobile">Mobile</label>
                      <input
                        name="mobile"
                        type="text"
                        value={values.mobile}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="fax">Fax</label>
                      <input
                        name="fax"
                        type="text"
                        value={values.fax}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="im_skype">Skype Nickname</label>
                      <input
                        name="im_skype"
                        type="text"
                        value={values.im_skype}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="im_xmpp">XMPP Jabber Address</label>
                      <input
                        name="im_xmpp"
                        type="text"
                        value={values.im_xmpp}
                        onChange={handleChange}
                      />

                      <div className="d-flex justify-content-between">
                        <button className="globalbtn" style={disableStyle} type="submit" disabled={isSubmitting}>Save Profile</button>
                      </div>

                    </Form>
                  );
                }}
              </Formik>

            </Tab>

            <Tab eventKey="Social_bookmarks" title="Social Bookmarks">

              <Formik
                initialValues={generalValues}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(async () => {
                    const payLoad = {
                      firstname: values.firstname,
                      lastname: values.lastname,
                      title: values.title,
                      gender: values.gender,
                      street: values.street,
                      zip: values.zip,
                      city: values.city,
                      country: values.country,
                      state: values.state,
                      birthday_hide_year: values.birthday_hide_year,
                      birthday: values.birthday,
                      about: values.about,
                      phone_private: values.phone_private,
                      phone_work: values.phone_work,
                      mobile: values.mobile,
                      fax: values.fax,
                      im_skype: values.im_skype,
                      im_xmpp: values.im_xmpp,
                      url: values.url,
                      url_facebook: values.url_facebook,
                      url_linkedin: values.url_linkedin,
                      url_xing: values.url_xing,
                      url_youtube: values.youtube,
                      url_vimeo: values.url_vimeo,
                      url_flickr: values.url_flickr,
                      url_myspace: values.url_myspace,
                      url_twitter: values.url_twitter,
                    }
                    try {
                      let resapi = await axios.post(`https://circlenowdev.xyz/api/v1/user/${localStorage.getItem("current_user_id")}`, payLoad, {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                      })
                      console.log("resapi2", resapi)
                      console.log("generalValues", generalValues)
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

                      <label className='gformlabel' htmlFor="url">Url</label>
                      <input
                        name="url"
                        type="text"
                        value={values.url}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="url_facebook">Facebook URL</label>
                      <input
                        name="url_facebook"
                        type="text"
                        value={values.url_facebook}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="url_linkedin">LinkedIn URL</label>
                      <input
                        name="url_linkedin"
                        type="text"
                        value={values.url_linkedin}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="url_xing">Xing URL</label>
                      <input
                        name="url_xing"
                        type="text"
                        value={values.url_xing}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="url_youtube">Youtube URL</label>
                      <input
                        name="url_youtube"
                        type="text"
                        value={values.url_youtube}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="url_vimeo">Vimeo URL</label>
                      <input
                        name="url_vimeo"
                        type="text"
                        value={values.url_vimeo}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="url_flickr">Flickr URL</label>
                      <input
                        name="url_flickr"
                        type="text"
                        value={values.url_flickr}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="url_myspace">MySpace URL</label>
                      <input
                        name="url_myspace"
                        type="text"
                        value={values.url_myspace}
                        onChange={handleChange}
                      />

                      <label className='gformlabel' htmlFor="url_twitter">Twitter  URL</label>
                      <input
                        name="url_twitter"
                        type="text"
                        value={values.url_twitter}
                        onChange={handleChange}
                      />

                      <div className="d-flex justify-content-between">
                        <button className="globalbtn" style={disableStyle} type="submit" disabled={isSubmitting}>Save Profile</button>
                      </div>

                    </Form>
                  );
                }}
              </Formik>

            </Tab>

          </Tabs>

        </Tab>

        <Tab eventKey="ChangeUsername" title="Change Username">

          <p className="gtextgrey" style={{ marginTop: "20px", marginBottom: "20px" }}>
            Your current username is <strong>{zcurrentUser ? (zcurrentUser.account.username) : ""}</strong>. You can change your current username here.</p>

          <Formik
            initialValues={generalValues}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                try {
                  const res = await axios.post("/auth/login", {
                    username: zcurrentUser.account.username,
                    password: values.password,
                  })
                  if (res.data.auth_token) {
                    console.log(values.username)
                    const payLoad = {
                      account: {
                        username: values.username
                      }
                    }
                    try {

                      let resapi = await axios.put(`https://circlenowdev.xyz/api/v1/user/${localStorage.getItem("current_user_id")}`, payLoad, {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                      })
                      console.log("resapi2", resapi)
                      console.log("generalValues", generalValues)
                      console.log("Values", values)
                      if (resapi) {
                        alert("Username Changed Successfully")
                        window.location.reload();
                      }
                    } catch (err) {
                      console.warn(err)
                    }

                  } else {
                    alert("Incorrect Password")
                  }

                } catch (err) {
                  alert("Incorrect Password")
                }
                console.log("Logging in", values);
                setSubmitting(false);
              }, 500);
            }}

            validationSchema={Yup.object().shape({
              username: Yup.string()
                // .required("Required")
                .min(4, "User Name is too short - should be 4 chars minimum.")
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

                  <label className='gformlabel' htmlFor="password">Current password *</label>
                  <input
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                  />

                  <label className='gformlabel' htmlFor="username">New User name *</label>
                  <input
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.username && touched.username && "error"}
                  />
                  {errors.username && touched.username && (
                    <div className="input-feedback">{errors.username}</div>
                  )}


                  <div className="d-flex justify-content-between">
                    <button className="globalbtn" style={disableStyle} type="submit" disabled={isSubmitting}>Save</button>
                  </div>

                </Form>
              );
            }}
          </Formik>

        </Tab>

        <Tab eventKey="ChangeEmail" title="Change Email">

          <p className="gtextgrey" style={{ marginTop: "20px", marginBottom: "20px" }}>
            Your current E-mail address is <strong>{zcurrentUser ? (zcurrentUser.account.email) : ""}</strong>. You can change your current E-mail address here.
          </p>

          <Formik
            initialValues={generalValues}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                try {
                  const res = await axios.post("/auth/login", {
                    username: zcurrentUser.account.username,
                    password: values.url,
                  })
                  if (res.data.auth_token) {
                    console.log(values.username)
                    const payLoad = {
                      account: {
                        email: values.email
                      }
                    }
                    try {

                      let resapi = await axios.put(`https://circlenowdev.xyz/api/v1/user/${localStorage.getItem("current_user_id")}`, payLoad, {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                      })
                      console.log("resapi2", resapi)
                      console.log("generalValues", generalValues)
                      console.log("Values", values)
                      if (resapi) {
                        alert("Email Changed Successfully")
                        window.location.reload();
                      }
                    } catch (err) {
                      console.warn(err)
                    }

                  } else {
                    alert("Incorrect Password")
                  }

                } catch (err) {
                  alert("Incorrect Password")
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

                  <label className='gformlabel' htmlFor="url">Current password *</label>
                  <input
                    name="url"
                    type="text"
                    value={values.url}
                    onChange={handleChange}
                  />

                  <label className='gformlabel' htmlFor="email">New E-Mail address *</label>
                  <input
                    name="email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                  />


                  <div className="d-flex justify-content-between">
                    <button className="globalbtn" style={disableStyle} type="submit" disabled={isSubmitting}>Save</button>
                  </div>

                </Form>
              );
            }}
          </Formik>


        </Tab>

        <Tab eventKey="ChangePassword" title="Change Password">

          <p className="gtextgrey" style={{ marginTop: "20px", marginBottom: "20px" }}>
            Your current password can be changed here.
          </p>
          <Formik
            initialValues={generalValues}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                try {
                  const res = await axios.post("/auth/login", {
                    username: zcurrentUser.account.username,
                    password: values.password,
                  })
                  if (res.data.auth_token) {



                    if (values.new_password == values.confirm_new_password) {
                      const payLoad = {
                        password: {
                          newPassword: values.new_password

                        }
                      }
                      try {

                        let resapi = await axios.put(`https://circlenowdev.xyz/api/v1/user/${localStorage.getItem("current_user_id")}`, payLoad, {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                          },
                        })
                        console.log("resapi2", resapi)
                        console.log("generalValues", generalValues)
                        console.log("Values", values)
                        if (resapi) {
                          alert("Password Changed Successfully")
                          window.location.reload();
                        }
                      } catch (err) {
                        console.warn(err)
                      }


                    } else {
                      alert("Password Mismatch!")
                    }


                  } else {
                    alert("Incorrect Password")
                  }

                } catch (err) {
                  alert("Incorrect Password")
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

                  <label className='gformlabel' htmlFor="url">Current password *</label>
                  <input
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                  />

                  <label className='gformlabel' htmlFor="email">New Password *</label>
                  <input
                    name="new_password"
                    type="password"
                    value={values.new_password}
                    onChange={handleChange}
                  />
                  <label className='gformlabel' htmlFor="email">Confirm New Password *</label>
                  <input
                    name="confirm_new_password"
                    type="password"
                    value={values.confirm_new_password}
                    onChange={handleChange}
                  />


                  <div className="d-flex justify-content-between">
                    <button className="globalbtn" style={disableStyle} type="submit" disabled={isSubmitting}>Save</button>
                  </div>

                </Form>
              );
            }}
          </Formik>
        </Tab>

        <Tab eventKey="DeleteAccount" title="Delete Account">

          {zcircles && zcircles.length ?
            <>
              <div>
                <p style={{ margin: "20px 0px", fontWeight: "600" }}>
                  Your account cannot be deleted!
                </p>

                <p className="gtextgrey" style={{ margin: "20px 0px" }}>
                  You are currently the owner of following spaces:
                </p>
                {(
                  zcircles.map((item) => (
                    <>
                      <div className="allcirdd-items" >
                        <>
                          <button className="d-flex btn" onClick={(e) => navigate(`/c/${item.name}/${item.contentcontainer_id}`)} style={{ color: "black", border: "none" }}>
                            {false ?
                              <img src={item.guid ? `https://circlenowdev.xyz/uploads/profile_image/${item.guid}.jpg?m=1666002574` : '/img.jpg'}
                                alt=""
                                width="25"
                                height="25"
                                style={{ display: "block", width: "100 %", height: "auto" }}
                              />
                              :
                              <div className='txttoimgdiv' style={{ backgroundColor: item.color, margin: "5px" }}>
                                <div className='txttoimg'>{letterGenerate(item.name)}</div>
                              </div>}
                            <div style={{ margin: "0px 5px" }}>{item.name}</div>
                          </button>
                        </>
                      </div>
                    </>
                  ))
                )}

                <p style={{ margin: "20px 0px", fontWeight: "600" }}>
                  You must transfer ownership or delete these spaces before you can delete your account.
                </p>
              </div>
            </> :
            <>
              <div style={{ marginTop: "30px" }}>
                <button className='globalbtn' onClick={handleDelCircle}>Delete Circle</button>
              </div>
            </>}

        </Tab>


      </Tabs>

    </div >
  </>
  )
}
