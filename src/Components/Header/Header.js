import { React, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';
import axios from "axios";
import { signout } from '../../aHelper/Helper';
import Notification from '../NotifEmail/Notification';

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
        // console.log(result.data)
        setCurrentUser(result.data)
        localStorage.setItem("current_user_id", result.data.id);
      } catch (err) {
        console.warn(err)
        localStorage.removeItem("authToken");
      }
    })()
  }, [])

  const handleLogOut = () => {
    return signout()
  };

  return (<>
    <header className="p-2 border-bottom" style={{ background: "#4D6D7F" }}>
      <div className="d-flex  justify-content-between ">

        <h5 style={{ color: "white" }} onClick={() => {
          localStorage.removeItem("container_iid")
          localStorage.removeItem("containerName")
          navigate("/", { replace: true });
        }}>MyCircles</h5>

        {localStorage.getItem("authToken") ?
          <>
            <div id='headerrightbtns'>
              <div className="dropdown text-end" style={{ background: "#54768a", margin: "2px 20px" }}>
                <Notification currentUserID={currentUser.id} />
              </div>

              <div className="dropdown text-end" style={{ background: "#54768a", margin: "2px 20px" }}>
                <a href="/" className="d-block link-dark text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-envelope-fill px-2" style={{ color: "white" }}></i>
                </a>
                <ul className="dropdown-menu text-small" >
                  <li><a className="dropdown-item" href="/">Email1</a></li>
                  <li><a className="dropdown-item" href="/">Email2</a></li>
                  <li><a className="dropdown-item" href="/">Email3</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="/">Empty Email</a></li>
                </ul>
              </div>

              <div className="dropdown" id='headerdropsec'>
                <a href="/" className="d-block text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{fontWeight:"600", color:"white"}}>

                  <img
                    alt="" width="32" height="32"
                    src={currentUser ? `https://circlenowdev.xyz/uploads/profile_image/${currentUser.guid}.jpg?m=1666002574` : 'https://circlenowdev.xyz/static/img/default_user.jpg'}
                    onError={(e) =>
                    ((e.target.src =
                      "https://circlenowdev.xyz/static/img/default_user.jpg")
                    )
                    }
                  />

                  {/* <img src={currentUser ? `https://circlenowdev.xyz/uploads/profile_image/${currentUser.guid}.jpg?m=1666002574` : '/img.jpg'} alt="" width="32" height="32" className="rounded-circle" /> */}

                  <span style={{marginLeft:"5px"}}>{currentUser.display_name}</span>
                </a>
                <ul className="dropdown-menu text-small" id='header-profile-dd' style={{ background: "#4D6D7F"}}>
                  <li><a href="/">My Profile</a></li>
                  <li><a href="/user/account/edit">Account Settings</a></li>
                  <li><a href="/">Administration</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a href="/" onClick={handleLogOut}>Log out</a></li>
                </ul>
              </div>

            </div>
          </>
          :
          <>
            <Link to="/user/login"><button id='b1'>Sign in / up</button></Link>
          </>}
      </div>
    </header>
  </>
  )
}
