import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PopupModal from "./PopupModal";
import "./TaskandPost.css";
import Spinner from "../aspinner/Spinner";

const TaskandPostLayout = (props) => {

  const navigate = useNavigate();
  let { id } = useParams();
  const [Message, setMessage] = useState('');
  const [isPostingMessage, setIsPostingMessage] = useState(false);
  const [image, setimage] = useState();
  const [taskIDExist, setTaskIDExist] = useState('');
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    if(taskIDExist){
       navigate(0)
    }
  }

  // MESSAGE SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Message) {
      setIsPostingMessage(true);
      console.log(Message.trim())
      try {
        let payload = { data: { message: Message.trim() } };
        let resapi = await axios.post(`/post/container/${localStorage.getItem("container_iid", id)}`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        console.log("Post", resapi);
        // let resapis = await axios.post(`/post/${resapi.data.id}/upload-files`, image, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        //   },
        // });

        // console.log("Post2", resapis);
        if (resapi.data.id) {
          alert("done");
          props.setrendercomp(true)
        }
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
      console.log(image)
    }
  }

  // console.log("Image", image);

  return (
    <>
      <div className="gcard">
        <form onSubmit={handleSubmit} style={{ margin: "0px 0px", maxWidth: "50rem" }}>
          <input
            value={Message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Whats On Your Mind ?" />
          {image ? <img style={{ marginLeft: "40px" }} alt='ico' src={image} width="200" height="200" /> : null}

          <div className="addpostbtngroup">
            <button className="globalbtn" onClick={(e) => handleSubmit(e)}>
              {isPostingMessage ?
                <div className="globalbtnspin">
                  <Spinner />
                </div> :
                'Submit'}
            </button>

            <button className="globalbtn"><label style={{ cursor: 'pointer' }} htmlFor="showimage"><i className="bi bi-upload" /></label></button>
            <input onChange={onImageChange} type="file" accept="image/*" id="showimage" style={{ display: "none", visibility: "none" }}>
            </input>
          </div>
        </form>
      </div>

      <div className="gcard" style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}>
        <div className="card-header d-flex" style={{ background: "white" }}>
          <h1><strong>Task</strong></h1>
        </div>
        <div className="card-body">
          <p className="card-text">Create and assign tasks - organize and schedule individual and
            collaborative projects.</p>
          <button className="globalbtn" style={{ marginTop: "10px" }} onClick={handleShow}>
            ADD
          </button>
          <PopupModal show={show} handleClose={handleClose} setTaskIDExist={setTaskIDExist}></PopupModal>
        </div>

      </div>
    </>
  );
};
export default TaskandPostLayout;
