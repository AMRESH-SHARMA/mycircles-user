import React from 'react'
import { signout } from '../../aHelper/Helper'
import { useNavigate } from "react-router-dom";
import './Error.css'

const Alreadyloggedin = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="ercard" style={{marginTop:"5rem", marginLeft:"auto", marginRight:"auto"}}>
        <div className="ercontainer">
          <h4><b>You are already Signed in</b></h4>
          <p>Please Sign out first</p>
          <div className='d-flex justify-content-between'>
          <button className='globalbtn' onClick={signout} >Sign out</button>
          <button className='globalbtn' onClick={()=>navigate('/')} >Go To Home</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Alreadyloggedin