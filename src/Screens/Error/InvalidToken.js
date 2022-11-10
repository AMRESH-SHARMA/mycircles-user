import React from 'react'
import './Error.css'
import { useNavigate } from "react-router-dom";

const InvalidToken = () => {
  const navigate = useNavigate()
  return (<>
    <div className="ercard" style={{ marginTop: "5rem", marginLeft: "auto", marginRight: "auto" }}>
      <div className="ercontainer">
        <h4><b>Token is Invalid or Expired</b></h4>
        <p>Please Register Again</p>
        <button className='globalbtn' onClick={()=>navigate('/user/login')} >Register</button>
      </div>
    </div>
  </>
  )
}

export default InvalidToken;