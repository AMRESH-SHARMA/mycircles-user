import { React } from "react"
// import axios from "axios";

const Notification = (props) => {
  // const id = props.currentUserID
  // useEffect(() => {
  //   const currentUserNotifications = async () => {
  //     try {
  //       const result = await axios.get("/notification/5", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //         },
  //       })
  //       console.log(result)
  //       // setCurrentUser(result.data)
  //     } catch (err) {
  //       console.warn(err)
  //     }
  //   }
  //   currentUserNotifications()
  // }, [])


  return (
    <div>
      <a href="/" className="d-block link-dark text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="bi bi-bell-fill px-2" style={{ color: "white" }}></i>
      </a>
      <ul className="dropdown-menu text-small">
        <li><a className="dropdown-item" href="/">Notification1</a></li>
        <li><a className="dropdown-item" href="/">Notification2</a></li>
        <li><a className="dropdown-item" href="/">Notification3</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><a className="dropdown-item" href="/">Empty Notification</a></li>
      </ul>
    </div>
  )
}

export default Notification