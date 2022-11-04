import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Headerbtn from './Headerbtn';
import './Headerbtn.css';

export default function Header() {

  const navigate = useNavigate();
  return (<>
    <header className="p-2 border-bottom" style={{ background: "#4D6D7F" }}>
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <h5 style={{ color: "white" }} onClick={() => {
            navigate("/", { replace: true });
          }}>My Circles</h5>

          <div className=" me-lg-auto">
          </div>
          {localStorage.getItem("authToken") ?
            <Headerbtn /> :
            <>
              <Link to="/user/login"><button id='b1'>Sign in / up</button></Link>
            </>}
        </div>
      </div>
    </header>
  </>
  )
}
