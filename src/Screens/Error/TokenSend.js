import React from 'react'
import './Error.css'
import { useNavigate } from "react-router-dom";

const TokenSend = () => {

  const navigate = useNavigate()

  return (<>
    <div className="ercard" style={{ marginTop: "5rem", marginLeft: "auto", marginRight: "auto" }}>
      <div className="ercontainer">
        <h4><b>Registration Token Successfully Send to Your Email</b></h4>
        <p>Please Check Your Email.</p>
        <button className='globalbtn' onClick={()=>navigate('/')} >Click here to go to homepage</button>
      </div>
    </div>
  </>
  )
}

export default TokenSend;