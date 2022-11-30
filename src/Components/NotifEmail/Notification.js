import  React from "react"
import {  useState, useEffect } from "react"
import parse from 'html-react-parser';
import axios from "axios";

const Notification = (props) => {
  // const id = props.currentUserID
  const [data, setData] = useState([])
  useEffect(() => {
    const currentUserNotifications = async () => {
      try {
        const result = await axios.get("/notification", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        console.log('ro',result)
        setData(result.data)
      } catch (err) {
        console.warn(err)
      }
    }
    currentUserNotifications()
  }, [])


  return (
    <div>
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize:"10px", padding:"3px"}}>
        99+
      </span>
      <a href="/" className="d-block link-dark text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="bi bi-bell-fill px-2" style={{ color: "white" }}></i>
      </a>
      <ul className="dropdown-menu text-small">
      {data && data.length ?
      (data.map((i)=>(
        {i}
      ))):
      null}
      <div style={{ maxHeight: "350px" }} >
        {data && data.length ?
          data.map((i,index) => (
            <>
              <div key={index} >
                <div style={{ display: "flex" }} >

                  <img
                    width="32" height="32" style={{ margin: "12px 10px 0px 0px", }}
                    src={`https://circlenowdev.xyz/uploads/profile_image/${i.originator.guid}.jpg?m=1666002574`} alt=""
                    onError={(e) =>
                      (
                        (e.target.src =
                          "https://circlenowdev.xyz/static/img/default_user.jpg")
                      )
                    }
                  />

                  <div>
                    <div style={{ fontSize: "14px", marginTop: "6px", display: "block" }}>{parse(i.content.output)}</div>
                    <div style={{ fontSize: "12px", marginBottom: "12px" }}>{i.createdAt}</div>
                  </div>
                </div>
                <hr />
              </div>
            </>
          )) : "No Activities Yet"}
      </div>
        {/* <li><a className="dropdown-item" href="/">Notification1</a></li>
        <li><a className="dropdown-item" href="/">Notification2</a></li>
        <li><a className="dropdown-item" href="/">Notification3</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><a className="dropdown-item" href="/">Empty Notification</a></li> */}
      </ul>
    </div>
  )
}

export default Notification