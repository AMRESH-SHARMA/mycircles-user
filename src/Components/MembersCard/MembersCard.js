import React from 'react'
// import axios from 'axios';
import "./MembersCard.css";

export default function MembersCard(props) {
  // console.log('t', props)
  const { guid, display_name, profile } = props.obj

  // const handleFollowUser = async () => {
  //   try {
  //     const resapi = await axios.post(`https://circlenowdev.xyz/u/adminauditya/user/profile/follow`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //     })
  //     console.log(resapi)
  //     // if (result.data) {
  //     //   setCircles(result.data.reverse())
  //     // }
  //   } catch (err) {
  //     console.warn(err)
  //   }
  // }


  return (<>
    <div key={props.unique} className="col gcard" style={{ minWidth: "24rem", maxWidth:"24rem", margin: "10px" }}>
      <div className="card-cover-photo2 ">

        <img
          alt="" className="card-profile2"
          src={`https://circlenowdev.xyz/uploads/profile_image/${guid}.jpg?m=1666002574`}
          onError={(e) =>
          ((e.target.src =
            "https://circlenowdev.xyz/static/img/default_user.jpg")
          )
          }
        />

      </div>
      <h5 style={{ marginTop: "50px" }} >{display_name}</h5>

      <div style={{ minHeight: "100px" }}>
        <p style={{ marginTop: "10px" }}>{profile.title}</p>

        <div className="card-tags">
          {props.tags?.map(item => (
            <a href='/' className="label label-default" style={{ marginRight: "5px" }}>{item}</a>
          ))}
        </div>

      </div>
      
      <div style={{ display: "flex", justifyContent: "space-between" }}>

        {/* <button className="globalbtn" onClick={handleFollowUser}>Follow</button>

        <button style={{ backgroundColor: "#21A1B3", color: "white", borderRadius: "4px" }}>
          <i className='fa fa-plus' style={{ padding: "5px" }}></i>Friends
        </button> */}

      </div>
    </div>

  </>
  )
}