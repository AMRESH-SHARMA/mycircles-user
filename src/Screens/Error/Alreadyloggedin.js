import React from 'react'
import { signout } from '../../aHelper/Helper'
import './Error.css'

const Alreadyloggedin = () => {
  return (
    <>
      <div className="ercard" style={{marginTop:"5rem", marginLeft:"auto", marginRight:"auto"}}>
        <div className="ercontainer">
          <h4><b>You are already Signed in</b></h4>
          <p>Please Sign out first</p>
          <button className='globalbtn' onClick={signout} >Sign out</button>
        </div>
      </div>
    </>
  )
}

export default Alreadyloggedin