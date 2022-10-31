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

  async function handleSubmit(e) {
    try {
      let postData = {
        data: {
          message: Message,
        },
      };
      const result = await axios.post(`/post/container/${id[5]}`, postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      console.log("Post", result.data);
    } catch (ex) {
      alert(ex);
      console.log(ex);
    }
  }

  return (
    <>
      <div className="card mt-3 mx-5">
        <form>
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Whats On Your Mind" />
          <hr />
          <button className="btnaddpost" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </form>
      </div>


      <div id="cardcard" className="card mt-3 mx-5">
        <div className="card-header d-flex" style={{ background: "white" }}>
          <h1><strong>Task</strong></h1>

        </div>
        <div className="d-flex justify-content-between card-body">
          <p className="card-text">Create and assign tasks - organize and schedule individual and
            collaborative projects.</p>
          <button className="btnaddpost" onClick={handleShow}>ADD</button>
          <PopupModal show={show} handleClose={handleClose}></PopupModal>
        </div>

      </div>
    </>
  );
};
export default TaskandPostLayout;
