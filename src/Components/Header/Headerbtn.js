import { React, useEffect, useState } from 'react';
import axios from "axios";
import { signout } from '../../auth/Auth';
import Notification from '../Notification/Notification';

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


  return (<>
    <div className="dropdown text-end mx-3" style={{ background: "#54768a" }}>
      <Notification currentUserID={currentUser.id} />
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
        <li><a href="/">My Profile</a></li>
        <li><a href="/">Account Settings</a></li>
        <li><a href="/">Administration</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><a href="/" onClick={handleLogOut}>Log out</a></li>
      </ul>
    </div>

  </>
  )
}

export default Headerbtn