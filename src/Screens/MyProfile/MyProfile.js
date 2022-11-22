import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Header/Navbar'
import axios from "axios";
import "./MyProfile.css";
import Spinner from '../../aspinner/Spinner';

const MyProfile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`/user/${localStorage.getItem("current_user_id")}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        console.log(result.data)
        setCurrentUser(result.data)
      } catch (err) {
        console.warn(err)
      }
      setLoading(false)
    })()
  }, [])


  return (<>
    <Header />
    <Navbar />
    {loading ?
      <div className='gspin' style={{ marginTop: "2.5rem" }}><Spinner /></div> :
      <div className='gcontainer'>

        <div className="gtaskpostcard" style={{ maxWidth: "80rem", padding: "6px" }}>

          <div className="gbanner-bg">

            <img
              alt="" className="gbanner-photo"
              src={currentUser ? `https://circlenowdev.xyz/uploads/profile_image/${currentUser.guid}.jpg?m=1666002574` : 'https://circlenowdev.xyz/static/img/default_user.jpg'}
              onError={(e) =>
              ((e.target.src =
                "https://circlenowdev.xyz/static/img/default_user.jpg")
              )
              }
            />

            <div style={{ color: "white", fontWeight: "400", marginLeft: "150px", paddingTop: "50px" }}>
              <p style={{ fontSize: "25px" }}>{currentUser.display_name}</p>
              <p style={{ fontSize: "20px" }}>{currentUser.profile.title}</p>
            </div>

          </div>

          <div style={{ marginTop: "50px", display: "flex", justifyContent: "space-between" }}>

            <div className='row'>
              <div className='col'>
                <span style={{ margin: "0px", padding: "0px" }} className="text">1026</span>
                <span style={{ margin: "-2px 0px 0px 0px", padding: "0px", fontSize: "12px" }}>Friends</span>
              </div>
              <div className='col'>
                <label style={{ margin: "0px", padding: "0px" }} className="text">1026</label>
                <label style={{ margin: "-2px 0px 0px 0px", padding: "0px", fontSize: "12px" }}>Followers</label>
              </div>
              <div className='col'>
                <label style={{ margin: "0px", padding: "0px" }} className="text">1026</label>
                <label style={{ margin: "-2px 0px 0px 0px", padding: "0px", fontSize: "12px" }}>Following</label>
              </div>
              <div className='col'>
                <label style={{ margin: "0px", padding: "0px" }} className="text">1026</label>
                <label style={{ margin: "-2px 0px 0px 0px", padding: "0px", fontSize: "12px" }}>Circles</label>
              </div>
            </div>

            <div>
              <button style={{ marginRight: "10px", backgroundColor: "#21A1B3", color: "white" }}><i className='fa fa-cloud'></i></button>
              <button style={{ marginRight: "10px", backgroundColor: "#FC314F", color: "white" }}><i className='fa fa-pencil'></i></button>
              <button className='globalbtn' onClick={() => navigate('/user/account/edit')}>Edit account</button>
            </div>



          </div>

        </div>

        <div className="row" style={{ marginTop: "2rem" }}>

          <div className='col gcard' style={{ margin: "0px 0px 10px 10px", padding: "10px" }}>
            <p style={{ fontSize: "20px" }}><strong>Your&nbsp;Members&nbsp;of&nbsp;these&nbsp;Circles</strong></p>
            <div style={{ display: 'flex', flexDirection: "column", marginTop: "20px" }}>
              <img
                alt="" height={30} width={30}
                src={`https://circlenowdev.xyz/uploads/profile_image.jpg?m=1666002574`}
                onError={(e) =>
                ((e.target.src =
                  "https://circlenowdev.xyz/static/img/default_user.jpg")
                )
                }
              />
            </div>
          </div>

          <div className='col gcard' style={{ margin: "0px 0px 10px 10px" }}>
            <p style={{ fontSize: "20px" }}><strong>Friends</strong></p>
            <div style={{ display: 'flex', flexDirection: "column", marginTop: "20px" }}>
              <img
                alt="" height={30} width={30}
                src={`https://circlenowdev.xyz/uploads/profile_image.jpg?m=1666002574`}
                onError={(e) =>
                ((e.target.src =
                  "https://circlenowdev.xyz/static/img/default_user.jpg")
                )
                }
              />
            </div>
          </div>

          <div className='col gcard' style={{ margin: "0px 0px 10px 10px" }}>
            <p style={{ fontSize: "20px" }}><strong>Followers</strong></p>
            <div style={{ display: 'flex', flexDirection: "column", marginTop: "20px" }}>
              <img
                alt="" height={30} width={30}
                src={`https://circlenowdev.xyz/uploads/profile_image.jpg?m=1666002574`}
                onError={(e) =>
                ((e.target.src =
                  "https://circlenowdev.xyz/static/img/default_user.jpg")
                )
                }
              />
            </div>
          </div>

          <div className='col gcard' style={{ margin: "0px 0px 10px 10px" }}>
            <p style={{ fontSize: "20px" }}><strong>Following</strong></p>
            <div style={{ display: 'flex', flexDirection: "column", marginTop: "20px" }}>
              <img
                alt="" height={30} width={30}
                src={`https://circlenowdev.xyz/uploads/profile_image.jpg?m=1666002574`}
                onError={(e) =>
                ((e.target.src =
                  "https://circlenowdev.xyz/static/img/default_user.jpg")
                )
                }
              />
            </div>
          </div>
        </div>
      </div>
    }

  </>
  )
}

export default MyProfile