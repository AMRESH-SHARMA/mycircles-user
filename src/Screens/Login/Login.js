import { React, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import LoginPanel from '../../Components/LoginPagePanel/LoginPanel';
import RegisterPanel from '../../Components/LoginPagePanel/RegisterPanel';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
      if (localStorage.getItem("authToken")) {
        navigate("/")
      }
  }, [navigate])

  return (
    <>
      <div className='Loginpagecontainer'>
        <h1 id='app-title'>MyCircles</h1>
        <LoginPanel />
        <RegisterPanel />
      </div>

    </>
  )
}

export default Login