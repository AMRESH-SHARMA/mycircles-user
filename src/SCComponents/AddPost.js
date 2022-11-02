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

  return (
    <>
      <div id="cardcard" className="card mt-3 mx-5">
        <div className="">
          <form className="scform" onSubmit={handleSubmit}>
            <input
            id="addpostinput"
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Whats On Your Mind ?" />

            <button className="globalbtn" onClick={(e) => handleSubmit(e)}>
              {isPostingMessage ?
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> :
                'Submit'}
            </button>
          </form>


        </div>
      </div>

      <div id="cardcard" className="card mt-3 mx-5">
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
