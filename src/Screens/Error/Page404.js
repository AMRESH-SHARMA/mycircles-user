import React from 'react'
import './Error.css'
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="ercard"  style={{ marginTop: "5rem", marginLeft: "auto", marginRight: "auto" }}>
        <div className="ercontainer">
          <h4><b>This Page does not Exist.</b></h4>
          <p>Sorry for Inconvience.</p>
          <button className='globalbtn' onClick={() => navigate('/')} >Click here to go to homepage</button>
        </div>
      </div>
    </>
  )
}

export default Page404
