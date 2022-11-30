import React from 'react'
import './Error.css'

const NotAuthorized = (props) => {
  return (<>
    <div className="ercard">
      <div className="ercontainer">
        <h4><b>{props.msg}</b></h4>
      </div>
    </div>
  </>
  )
}

export default NotAuthorized