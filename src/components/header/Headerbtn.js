import { React, useEffect, useState } from 'react';
import axios from "axios";
import { signout } from '../../auth/Auth';

const Headerbtn = () => {

  const [currentUser, setCurrentUser] = useState('')
  useEffect(() => {
    const currentUserData = async () => {
      try {
        const result = await axios.get('/auth/current', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        // console.log(result)
        setCurrentUser(result.data)
      } catch (err) {
        console.warn(err)
      }
    }
    currentUserData()
  }, [])

  const handleLogOut = () => {
    return signout()
  };


  return (
    <>
      <div className="dropdown text-end mx-3" style={{ background: "#54768a" }}>
        <a href="/" className="d-block link-dark text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-bell-fill px-2" style={{ color: "white" }}></i>
        </a>
        <ul className="dropdown-menu text-small">
          <li><a className="dropdown-item" href="/">Notification1</a></li>
          <li><a className="dropdown-item" href="/">Notification2</a></li>
          <li><a className="dropdown-item" href="/">Notification3</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="/">Empty Notification</a></li>
        </ul>
      </div>

      <div className="dropdown text-end mx-3" style={{ background: "#54768a" }}>
        <a href="/" className="d-block link-dark text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-envelope-fill px-2" style={{ color: "white" }}></i>
        </a>
        <ul className="dropdown-menu text-small">
          <li><a className="dropdown-item" href="/">Email1</a></li>
          <li><a className="dropdown-item" href="/">Email2</a></li>
          <li><a className="dropdown-item" href="/">Email3</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="/">Empty Email</a></li>
        </ul>
      </div>

      <div className="dropdown text-end mx-3" >
        <a href="/" className="d-block link-light text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="img.jpg" alt="mdo" width="32" height="32" className="rounded-circle" />{currentUser.display_name
          }
        </a>
        <ul className="dropdown-menu text-small" style={{ background: "#4D6D7F" }}>
          <li><a className="dropdown-item" href="/" style={{ color: "white" }}>My Profile</a></li>
          <li><a className="dropdown-item" href="/" style={{ color: "white" }}>Account Settings</a></li>
          <li><a className="dropdown-item" href="/" style={{ color: "white" }}>Administration</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li className="dropdown-item" style={{ color: "white" }} onClick={handleLogOut}>Log out</li>
        </ul>
      </div>
    </>
  )
}

export default Headerbtn