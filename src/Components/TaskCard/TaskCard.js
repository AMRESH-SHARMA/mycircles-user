import { React, useState } from 'react'
import "./TaskCard.css"
import TaskCommentBody from './TaskCommentBody';
import axios from 'axios';
import Spinner from '../../aspinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { letterGenerate, randomColor } from "../../aHelper/Helper";
import EditModal from './EditModal';

export const TaskCard = (props) => {

  const { id, description, end_datetime, created_by, status, content, title } = props.obj
  // console.log(props.obj)
  const bgColor = { backgroundColor: randomColor(created_by.display_name) };

  const navigate = useNavigate()
  const [TaskStatus, setTaskStatus] = useState(status);
  const [visibility, setVisibility] = useState(content.metadata.visibility);
  const [commentButton, setCommentButton] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [rendercomp, setrendercomp] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //COMMENT BUTTON HANDLER
  const handleCommentButton = () => {
    return setCommentButton(!commentButton)
  };

  // COMMENT HANDLER
  const addComment = async (e) => {
    e.preventDefault();

    if (commentValue) {
      setIsPostingComment(true);
      console.log(commentValue.trim())
      setTimeout(async () => {
        try {
          let input = {
            "objectModel": "humhub\\modules\\tasks\\models\\Task",
            "objectId": `${content.metadata.object_id}`,
            "Comment": {
              "message": `${commentValue.trim()}`
            }
          }
          const resapi = await axios.post("/comment", input, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          setrendercomp(!rendercomp)
          console.log("resapi", resapi)
          // console.log(input)
        }
        catch (err) {
          console.warn(err)
          alert(`Error in posting comment`)
        }
        setIsPostingComment(false)
        setCommentValue('');
      }, 2000);
    }
  };

  const handleFileDownload = async (param) => {
    console.log(param)
    try {
      const resapi = await axios.get(`/file/download/${param}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      console.log(resapi);
    } catch (err) {
      alert(err)
      console.warn(err)
    }
  }

  const getSpaceNamebyID = (param) => {
    for (let i = 0; i < props.allcircles.length; i++) {
      if (props.allcircles[i].contentcontainer_id == param) {
        return ('i', props.allcircles[i].name)
      }
    }
  }

  const handleDelTask = async () => {
    try {
      console.log('del', id)
      const resapi = await axios.delete(`/tasks/task/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      console.log("resapi", resapi)
      if (resapi.data.code === 200) {
        setrendercomp(!rendercomp)
        navigate(0);
      }
    } catch (err) {
      alert(err.response.data.message)
      console.log(err)
    }
  }

  const handleTaskStatus = async () => {
    try {
      if (TaskStatus === 1) {
        var payload = { title: 5 }
        await axios.patch(`tasks/task/${id}/processed`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        setTaskStatus(5)
      }
    } catch (err) {
      console.warn(err)
      alert(err)
    }
  }

  const handleVisibility = async () => {

    try {
      if (visibility) {
        const payLoad = {
          Task: {
            content: { metadata: { visibility: 0 } }
          }
        };
        const result = await axios.put(`/tasks/task/${id}`, payLoad, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setVisibility(0)
      } else {
        const payLoad = {
          Task: {
            content: { metadata: { visibility: 1 } }
          }
        };
        const result = await axios.put(`/tasks/task/${id}`, payLoad, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setVisibility(1)
      }
    } catch (err) {
      console.warn(err)
      alert(err)
    }
  }

  return (
    <>

      <div className="gtaskpostcard">

        <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 8px 10px 5px" }}>

          <div style={{ margin: "0px 5px 5px 5px", display: "flex" }}>
            <i style={{ fontSize: "35px", color: "#21A1B3", margin: "5px 0px 25px 0px" }} className='fa fa-tasks' />

            <div style={{ margin: "0px 0px 0px 10px" }}>
              <strong>{title}</strong>
              <p style={{ fontSize: "90%" }}>
                {props.allcircles && getSpaceNamebyID(content.metadata.contentcontainer_id)}<i style={{ margin: "0px 5px", fontSize: "12px" }} className={visibility ? 'fa fa-globe' : 'fa fa-users'} data-bs-toggle="tooltip" title={visibility ? 'Public'  : 'Private'} />
              </p>

              <button id='taskheadermarkcomp' onClick={handleTaskStatus}>{TaskStatus === 1 ? "Mark Complete":"Completed"}</button>
            </div>
          </div>



          <div style={{ marginTop: "45px", minWidth: "100px" }}>
            <div className="row">
              <div className="col-auto"><i className='btn bi bi-hand-thumbs-up-fill taskheaderbtn' /></div>
              <div className="col-auto"><i className='btn bi bi-paperclip taskheaderbtn' /></div>
              <div className="col-auto"><i className='btn bi bi-chat-right-dots-fill taskheaderbtn' /></div>
              <div className="col-auto">

                <div className="dropdown">
                  <i className='btn bi bi-three-dots taskheaderbtn' data-bs-toggle="dropdown" aria-expanded="false" />
                  <ul className="dropdown-menu" style={{minWidth:"210px"}}>
                    <button className='tdbtn' onClick={handleShow}>Edit</button>
                    {show ? <EditModal task_id={id} show={show} handleClose={handleClose}></EditModal> : null}
                    <button className='tdbtn' onClick={handleVisibility}>Make&nbsp;public&#47;Make&nbsp;Private</button>
                    {/* <button className='tdbtn'>Add tags</button> */}
                    <button className='tdbtn'>Move content</button>
                    <button className='tdbtndel' onClick={handleDelTask}>Delete</button>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>

        <hr />

        <div style={{ padding: "10px" }}>
          <div className='subtitle'><span style={{ marginRight: "10px" }}>Assignee:</span>
            <div className='subtitle-description d-flex'>
              <div className='Tasktxttoimgdiv' style={bgColor}>
                <div className='Tasktxttoimg'>{letterGenerate(created_by.display_name)}</div>
              </div>

              <label style={{ paddingTop: "2px" }}>&nbsp;{created_by.display_name}</label>
            </div>
          </div>

          <div className='subtitle'>
            Due Date:<p className='subtitle-description'>&nbsp;{end_datetime && end_datetime.slice(0, 10)}</p>
          </div>
          <div className='subtitle'>
            Description:
          </div>
          <p className='subtitle-description'>{description}</p>
        </div>

        {content.files.length
          ? <>
            <div className='taskfileimg'>
              <img src="/img.jpg" alt='' width="60" height="45" className="taskfile-img" />
              <div className="task-file">
                <img src={content.files[0].url} alt='' width="40" height="30" className="taskfile-img" style={{ margin: "5px" }} />
                <div className='task-file-text' style={{ marginTop: "5px" }}>
                  <p className='task-file-text'>{content.files[0].file_name}</p>
                  <button className='task-file-text' style={{ color: "#21A1B3", backgroundColor: "white", textDecoration: "none" }} onClick={() => handleFileDownload(content.files[0].id)}>Download</button>
                </div>
              </div>
            </div>
          </> : null}


        <hr />

        <div className="d-flex justify-content-between" style={{ padding: "5px" }}>
          <i style={{ border: "none" }}
            className='btn bi bi-chat-right-dots-fill my-0 py-0'
            onClick={() => handleCommentButton()}></i>
          <i className='btn bi bi-send-fill my-0 py-0' style={{ border: "none" }}></i>
        </div>


        {commentButton && (
          <>
            <hr />
            <div className='gcmtbodyheight'>
              <TaskCommentBody contentId={content.id} st={rendercomp} />
            </div>

            <hr />

            <div>
              <form onSubmit={addComment} style={{ display: "flex" }}>
                <input
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder='Add comment..'
                  style={{ margin: "4px 4px" }}
                />
                <button style={{ margin: "4px 4px" }} className='globalbtn' onClick={addComment}>
                  {isPostingComment ?
                    <div className="globalbtnspin">
                      <Spinner />
                    </div> :
                    'Comment'}
                </button>
              </form>
            </div>
          </>
        )}

      </div>

    </>
  )
}
