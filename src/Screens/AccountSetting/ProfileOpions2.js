import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
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
  // Delete
  const [zcircles, setZCircles] = useState([]);
  const [zcurrentUser, setZCurrentUser] = useState('')



  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await axios.get('/auth/current', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        setZCurrentUser(result.data)
        console.log("currentUser",zcurrentUser)
      } catch (err) {
        console.warn(err)
      }
    }
    getCurrentUser()
  }, [zcurrentUser])

  // Input fields
  const [zdisplay_name, setZdisplay_name] = useState(zcurrentUser.display_name);
  // 


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
    console.log(zdisplay_name)
  }
  //  



  return (<>
    <div style={{ maxWidth: "60rem", padding: "15px" }}>
      <h3 >Your Profile</h3>
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

              <Form onSubmit={handleSubmitGeneral}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>First Name *</Form.Label>
                  <input type="name" value={zdisplay_name} onChange={(e) => setZdisplay_name(e.target.value)} placeholder="Enter First Name" />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Last Name *</Form.Label>
                  <input type="name" placeholder="Enter Last Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Gender *</Form.Label>
                  <select className="gselect" >
                    <option>Please Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Custom</option>
                  </select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Street</Form.Label>
                  <input type="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Zip</Form.Label>
                  <input type="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>City</Form.Label>
                  <input type="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>State</Form.Label>
                  <input type="name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Birthday</Form.Label>
                  <input type="date" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Hide year In my Profile " />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>About</Form.Label>
                  <input type="name" />
                </Form.Group> */}

                <button className='globalbtn' onClick={handleSubmitGeneral}>
                  Save Profile
                </button>
              </Form>
            </Tab>

            <Tab eventKey="Commmunication" title="Communication">

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone Private </Form.Label>
                <input type="name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Phone Work </Form.Label>
                <input type="name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mobile </Form.Label>
                <input type="name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Fax </Form.Label>
                <input type="name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Skype Name</Form.Label>
                <input type="name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Xampp Jabber Address </Form.Label>
                <input type="name" />
              </Form.Group>
              <button className='globalbtn' variant="primary" type="submit">
                Save Profile
              </button>


            </Tab>

            <Tab eventKey="Social_bookmarks" title="Social Bookmarks">
              {/* 
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
                          <button className="globalbtn" style={disableStyle} type="submit" disabled={isSubmitting}>{isSubmitting ? <div className="globalbtnspin"><Spinner /></div> : "Submit"}</button>
                        </div>
                      </form>
                    </div>
                  );
                }}
              </Formik> */}

              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>URL </Form.Label>
                <input type="name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Facebook URL</Form.Label>
                <input type="name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Linkedin URL </Form.Label>
                <input type="name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Xing URL </Form.Label>
                <input type="name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Youtube URL</Form.Label>
                <input type="name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Vimeo URL </Form.Label>
                <input type="name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Flickr URL </Form.Label>
                <input type="name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>MySpace URL </Form.Label>
                <input type="name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Twitter URL </Form.Label>
                <input type="name" />
              </Form.Group> */}

              <button className='globalbtn' variant="primary" type="submit">
                Save Profile
              </button>


            </Tab>

          </Tabs>

        </Tab>

        <Tab eventKey="ChangeUsername" title="Change Username">

          <p style={{ marginTop: "20px", marginBottom: "20px" }}>Your current username is ...... You can change your current username here.</p>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Current Password *</Form.Label>
            <input type="name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Change Username *</Form.Label>
            <input type="name" />
          </Form.Group>
          <button className='globalbtn' variant="primary" type="submit">
            Save
          </button>

        </Tab>

        <Tab eventKey="ChangeEmail" title="Change Email">

          <p style={{ marginTop: "20px", marginBottom: "20px" }}>Your current E-mail address is ..... You can change your current E-mail address here</p>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Current Password *</Form.Label>
            <input type="name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Change Email *</Form.Label>
            <input type="name" />
          </Form.Group>
          <button className='globalbtn' variant="primary" type="submit">
            Save
          </button>

        </Tab>

        <Tab eventKey="ChangePassword" title="Change Password">

          <p style={{ marginTop: "20px", marginBottom: "20px" }}>Your current E-mail address is ..... You can change your current E-mail address here</p>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Current Password *</Form.Label>
            <input type="name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password *</Form.Label>
            <input type="name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm new Password *</Form.Label>
            <input type="name" />
          </Form.Group>
          <button className='globalbtn' variant="primary" type="submit">
            Save
          </button>

        </Tab>

        <Tab eventKey="DeleteAccount" title="Delete Account">

          <p style={{ margin: "20px 0px", fontWeight: "600" }}>
            Your account cannot be deleted!
          </p>



          <p className="gtextgrey" style={{ margin: "20px 0px" }}>
            You are currently the owner of following spaces:
          </p>

          <div>
            {zcircles && zcircles.length ? (
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
            ) : null}
          </div>

          <p style={{ margin: "20px 0px", fontWeight: "600" }}>
            You must transfer ownership or delete these spaces before you can delete your account.
          </p>


        </Tab>


      </Tabs>

    </div>
  </>
  )
}
