import React from 'react';
import Navbar from "../../Components/Header/Navbar";
import Header from "../../Components/Header/Header";
// import SCNavbar from '../../Components/Header/SCNavbar';
import ProfileOpions from './ProfileOpions';
// import axios from "axios";
const AccountSetting = () => {
  // const url = window.location.href;
  // const id = url.split("/");
  // useEffect(() => {
  //   async function getpost(){
  //     try{
  //       const postData = await axios.get(`/post/container/${id[5]}`,{
  //         headers:{
  //           Authorization :`Bearer ${localStorage.getItem("authToken")}`
  //         },

  //       })
  //       setpostData(postData.data);
  //     }catch(ex){
  //       console.log(ex);
  //     }
  //   }
  //   getpost();
  //   async function getTask() {
  //     try {
  //       const TaskData = await axios.get(`/tasks/container/${id[5]}`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //         },
  //       });
  //       setpostData(postData.data);
  //     } catch (ex) {
  //       console.log(ex);
  //     }
  //   }

  // }, [])

  return (
    <>
      <Header />
      <Navbar />

      <div className="gcontainer">
        <div className="gtwo-column-layout">

          <div className="gcard" style={{ minWidth: "20rem", height: "300px" }}>

            <div style={{ marginBottom: "10px" }}>
              <strong>User </strong>Profile
            </div>

            <div className="list-group"  >
              <a href="/" className="list-group-item list-group-item-action">
                Profile
              </a>
              <a href="/" className="list-group-item list-group-item-action">
                E-mail Summaries
              </a>
              <a href="/" className="list-group-item list-group-item-action">
                Notification
              </a>
              <a href="/" className="list-group-item list-group-item-action">
                Account Settings
              </a>
              <a href="/" className="list-group-item list-group-item-action">
                Modules
              </a>
              <a href="/" className="list-group-item list-group-item-action">
                Friends
              </a>
            </div>
          </div>

          <div className="gcard" style={{ margin: "0px 10px" }}>
            <ProfileOpions />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default AccountSetting;