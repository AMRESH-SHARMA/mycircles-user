import React, { useState } from "react";
import axios from "axios";
import PopupModal from "./PopupModal";
import "./TaskandPost.css";

const TaskandPostLayout = () => {
  const url = window.location.href;
  const id = url.split("/");

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [Message, setMessage] = useState();
  const [isPostingMessage, setIsPostingMessage] = useState(false);
  const [image, setimage] = useState();
  // MESSAGE SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Message) {
      setIsPostingMessage(true);
      console.log(Message.trim())
      try {
        let postData = {
          data: {
            message: Message.trim(),
          },
        };
        let resapi = await axios.post(`/post/container/${id[5]}`, postData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        console.log("Post", resapi);
      } catch (ex) {
        alert(ex);
        console.log(ex);
      }
      setIsPostingMessage(false)
      setMessage('');
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setimage(URL.createObjectURL(event.target.files[0]));
    }
  }
  // console.log("Image", image);

  return (
    <>
      <div className="cardcard mt-3 mx-5">
          <form onSubmit={handleSubmit}>
            <input
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Whats On Your Mind ?" />
            {image ? <img style={{ marginLeft: "40px" }} alt='ico' src={image} width="200" height="200" /> : null}

            <div className="addpostbtngroup">
              <button className="globalbtn" onClick={(e) => handleSubmit(e)}>
                {isPostingMessage ?
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div> :
                  'Submit'}
              </button>

              <button className="globalbtn"><label style={{cursor: 'pointer'}} htmlFor="showimage"><i className="bi bi-upload" /></label></button>
              <input onChange={onImageChange} type="file" accept="image/*" id="showimage" style={{ display: "none", visibility: "none" }}>
              </input>
            </div>


          </form>
      </div>

      <div className="cardcard mt-3 mx-5">
        <div className="card-header d-flex" style={{ background: "white" }}>
          <h1><strong>Task</strong></h1>

        </div>
        <div className="d-flex justify-content-between card-body">
          <p className="card-text">Create and assign tasks - organize and schedule individual and
            collaborative projects.</p>
          <button className="globalbtn" onClick={handleShow}>
            ADD
          </button>
          <PopupModal show={show} handleClose={handleClose}></PopupModal>
        </div>

      </div>
    </>
  );
};
export default TaskandPostLayout;
