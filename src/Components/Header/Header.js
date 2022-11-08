import { React, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';
import axios from "axios";
import { signout } from '../../aHelper/Helper';
import Notification from '../Notification/Notification';

export default function Header() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('/auth/current', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        console.log(result.data)
        if(result.data.status===401){
          localStorage.removeItem("authToken");
        }
        setCurrentUser(result.data)
      } catch (err) {
        console.warn(err)
      }
    }) ()
  }, [])

  const handleLogOut = () => {
    return signout()
  };

  return (<>

    <header className="p-2 border-bottom" style={{ background: "#4D6D7F" }}>
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-start">
          
          <h5 style={{ color: "white" }} onClick={() => {
            navigate("/", { replace: true });
          }}>My Circles</h5>

          <div className=" me-lg-auto">
          </div>
          
          {localStorage.getItem("authToken") ?
            <>
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
                  <img src="img.jpg" alt="" width="32" height="32" className="rounded-circle" />{currentUser.display_name
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
            :
            <>
              <Link to="/user/login"><button id='b1'>Sign in / up</button></Link>
            </>}
        </div>
      </div>
    </header>
  </>
  )
}
