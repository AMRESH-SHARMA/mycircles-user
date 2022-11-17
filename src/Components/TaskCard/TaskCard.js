import { React, useState } from 'react'
import "./TaskCard.css"
import TaskCommentBody from './TaskCommentBody';
import axios from 'axios';
import Spinner from '../../aspinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { letterGenerate, randomColor } from "../../aHelper/Helper";

export const TaskCard = (props) => {

  const { id, description, end_datetime, created_by, status, content } = props.obj
  // console.log(props.obj)
  const bgColor = { backgroundColor: randomColor(created_by.display_name) };

  const navigate = useNavigate()
  const [TaskStatus, setTaskStatus] = useState(status);
  const [commentButton, setCommentButton] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [rendercomp, setrendercomp] = useState(false);

  //Dropdown
  const displaynone = { display: "none" }
  const [ithreedots, setithreedots] = useState(false);


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
      if (TaskStatus === 1) setTaskStatus(5)
      var input = { title: TaskStatus }
      // console.log("as",id,values, TaskStatus)
      await axios.patch(`tasks/task/${id}/processed`, input, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
    } catch (err) {
      console.warn(err.response.status)
      if (err.response.status === 403) alert("Forbidden access")
    }
  }

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

  return (
    <>

      <div className="gtaskpostcard">

        <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 8px 10px" }}>

          <div style={{ margin: "5px 5px 5px 5px" }}>
            <i style={{ fontSize: "25px", border: "2.5px solid black", color: "black", }} className='bi bi-list-check' />
          </div>

          <div>
            <strong>Run Marketing Programs to Promote This Circle </strong>
            <p style={{ fontSize: "90%" }}>Prominds</p>
            <button id='taskheadermarkcomp' onClick={handleTaskStatus}>{TaskStatus === 1 ? "Mark Complete" : "Mark Pending"}</button>
          </div>

          <div style={{ marginTop: "45px", minWidth: "100px" }}>
            <div className="row">
              <div className="col-auto"><i className='btn bi bi-hand-thumbs-up-fill taskheaderbtn' /></div>
              <div className="col-auto"><i className='btn bi bi-paperclip taskheaderbtn' /></div>
              <div className="col-auto"><i className='btn bi bi-chat-right-dots-fill taskheaderbtn' /></div>
              <div className="col-auto">
                <i className='btn bi bi-three-dots taskheaderbtn' onClick={() => setithreedots(!ithreedots)} />
                <div id="task-dots-dropdown-content" style={!ithreedots ? displaynone : null}>
                  <button className='tdbtn'>Edit</button>
                  <button className='tdbtn'>Make&nbsp;public&#47;Make&nbsp;Private</button>
                  <button className='tdbtn'>Add tags</button>
                  <button className='tdbtn'>Move content</button>
                  <button className='tdbtndel' onClick={handleDelTask}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div style={{ padding: "10px" }}>
          <div className='subtitle'><span style={{marginRight:"10px"}}>Assignee:</span>
            <div className='subtitle-description d-flex'>
              <div className='Tasktxttoimgdiv' style={bgColor}>
                <div className='Tasktxttoimg'>{letterGenerate(created_by.display_name)}</div>
              </div>

              <label style={{paddingTop:"2px"}}>&nbsp;{created_by.display_name}</label>
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


        <div className='taskfileimg'>
          <img src="/img.jpg" alt='' width="60" height="45" className="taskfile-img" />
          <div className="task-file">
            <img src="/adobe.png" alt='' width="40" height="30" className="taskfile-img" style={{ margin: "5px" }} />
            <div className='task-file-text' style={{ marginTop: "5px" }}>
              <p className='task-file-text'>Dummy File Name:{content.files.length}</p>
              <a className='task-file-text' href='/' style={{ color: "#21A1B3", textDecoration: "none" }}>Download</a>
            </div>
          </div>
        </div>

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
              <form onSubmit={addComment}>
                <input
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder='Add comment..'
                  style={{ margin: "8px 0px 0px" }}
                />
                <button style={{ margin: "4px 0px" }} className='globalbtn' onClick={addComment}>
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
