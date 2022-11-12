import React from 'react';
import Navbar from "../../Components/Header/Navbar";
import Header from "../../Components/Header/Header";
import AddPost from "../../SCComponents/AddPost";
// import axios from "axios";
const SingleCircle = () => {
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
        <div className="d-flex justify-content-around">
          <div id="wallcardone">
            <AddPost />
          </div>

          <div id="wallcardtwo">
            <div className="gcard">
              <div className="card-body">
                <div className="card-title d-flex">
                  <div className="flex-grow-1">
                    <strong>Getting </strong>Started
                  </div>
                </div>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div className="list-group">
                  <a
                    href="/"
                    className="list-group-item list-group-item-action"
                  >
                    <i className="bi bi-play-circle px-2"></i>Guide: Spaces
                  </a>
                  <a
                    href="/"
                    className="list-group-item list-group-item-action"
                  >
                    <i className="bi bi-play-circle px-2"></i>Guide: Spaces
                  </a>
                  <a
                    href="/"
                    className="list-group-item list-group-item-action"
                  >
                    <i className="bi bi-play-circle px-2"></i>Guide: Spaces
                  </a>
                </div>
              </div>
            </div>

            <div className="gcard" style={{marginTop:"2.5rem"}}>
              <div className="card-body">
                <div className="card-title d-flex">
                  <div className="flex-grow-1">
                    <strong>Latest </strong>Activities
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCircle;
