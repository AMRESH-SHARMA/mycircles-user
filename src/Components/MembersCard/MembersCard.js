import React from 'react'
import "./MembersCard.css";

export default function MembersCard(props) {
  return (<>

      <div className="gcard" style={{ width: "300px", height: "350px", marginBottom: "2.5rem" }}>
        <div className="card-cover-photo2">
          <img src="https://i.imgur.com/KykRUCV.jpeg5" alt='' className="card-profile2" />
        </div>
        <h3 className="card-profile-name2">{props.name}</h3>
        <div className="card-tags ">
          {props.tags?.map(item => (
            <a href='/' className="label label-default">{item}</a>
          ))}
        </div>

        <div className='d-flex'>

          <button className="card-btn2">Following</button>
          <button className="card-btn2">Message</button>
        </div>


      </div>

  </>
  )
}