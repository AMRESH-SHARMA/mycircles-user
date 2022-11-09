import { React } from 'react';
import LoginPanel from '../../Components/LoginPagePanel/LoginPanel';
import RegisterPanel from '../../Components/LoginPagePanel/RegisterPanel';
import Alreadyloggedin from '../Error/Alreadyloggedin';
import './Login.css';

const Login = () => {

  return (
    <>
      {localStorage.getItem("authToken") ?
        <Alreadyloggedin /> :
        <div className='Loginpagecontainer'>
          <h1 id='app-title'>MyCircles</h1>
          <LoginPanel />
          <RegisterPanel />
        </div>
      }
    </>
  )
}

export default Login