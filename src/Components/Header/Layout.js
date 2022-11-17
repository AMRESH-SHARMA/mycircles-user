import React from 'react';
// import Navbar from "../../Components/Header/Navbar";
import Header from "../../Components/Header/Header";
import SCNavbar from '../../Components/Header/SCNavbar';
import ProfileOpions from './ProfileOpions';
// import axios from "axios";
const Layout = () => {
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
      <Header/>
      <SCNavbar/>

      <div className="gcontainer">
        <div className="d-flex justify-content-around">
          <div id="wallcardone" style={{minWidth:"20rem"}}>
          <div className="gcard">
              <div className="card-body">
                <div className="card-title d-flex">
                  <div className="flex-grow-1" style ={{marginBottom:"20px"}}>
                    <strong>User </strong>Profile
                  </div>
                </div>
                <hr/>
                <div className="list-group"  >
                  <a
                    href="/"
                    className="list-group-item list-group-item-action"
                    

                    
                  >
                    Profile
                  </a>
                  <a
                    href="/"
                    className="list-group-item list-group-item-action"
                     
                  >
                    E-mail Summaries
                  </a>
                  <a
                    href="/"
                    className="list-group-item list-group-item-action"
                     
                  >
                    Notification
                  </a>
                   <a
                    href="/"
                    className="list-group-item list-group-item-action"
                     
                  >
                    Account Settings
                  </a>
                   <a
                    href="/"
                    className="list-group-item list-group-item-action"
                     
                  >
                    Modules
                  </a>
                  <a
                    href="/"
                    className="list-group-item list-group-item-action"
                     
                  >
                    Friends
                  </a>
                </div>
              </div>
            </div>

            
            
          
            
          </div>

          <div id="wallcardtwo" style={{minWidth:"50rem",marginRight:"200px"}}>
           <ProfileOpions/>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
