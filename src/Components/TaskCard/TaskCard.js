import { React, useState } from 'react'
import "./TaskCard.css"
import TaskCommentBody from './TaskCommentBody';
import axios from 'axios';
import Spinner from '../../aspinner/Spinner';
import pdf from "./test.pdf"
import PdfViewer from './PdfViewer'

export const TaskCard = (props) => {
  var { id, description, end_datetime, created_by, status, content } = props.obj
  // console.log(props.obj)
  const imgtext = created_by.display_name
  // console.log(imgtext)
  const [privatetask, setPrivatetask] = useState(true);
  const [TaskStatus, setTaskStatus] = useState(status);
  const [commentButton, setCommentButton] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [rendercomp, setrendercomp] = useState(false);

  const texttoimg = async (name) => {
    let str = name.split(" ")
    let url = `https://ui-avatars.com/api/?name=${str[0]}+${str[1]}`
    // console.log("imgtext", url)
    return url
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

  const handleVisibility = async () => {
    setPrivatetask(!privatetask)
  }


  return (
    <>
      <div id='taskcard' className="card">
        <div className="card-header">
          <div className="d-flex" >
            <i className='bi bi-list-check' style={{ margin: "10px" }} />
            <div className='card-title pt-2'>
              <strong>Run Marketing Programs to Promote This Circle </strong>
              <div>Prominds</div>
            </div>
          </div>

          <div id='taskheaderbtnpanel' className="row">
            <div className="col-auto me-auto"><button id='taskheadermarkcomp' onClick={handleTaskStatus}>{TaskStatus === 1 ? "Mark Complete" : "Mark Pending"}</button></div>
            <div className="col-auto"><i className='btn bi bi-hand-thumbs-up-fill taskheaderbtn' /></div>
            <div className="col-auto"><i className='btn bi bi-paperclip taskheaderbtn' /></div>
            <div className="col-auto"><i className='btn bi bi-chat-right-dots-fill taskheaderbtn' /></div>
            <div className="col-auto"><i className='btn bi bi-three-dots taskheaderbtn' /></div>
          </div>
        </div>
        <div className="taskprivatepublic row">
          <i className='btn bi bi-lock-fill col-auto me-1' />
          {privatetask ?
            <p className="card-text taskprivatepublictext col-auto me-auto">This task is private to you</p> :
            <p className="card-text taskprivatepublictext col-auto me-auto">This task is visible to everyone in Prominds</p>}
          <a id="privatepublicbtn" href='/' className="col-auto btn" onClick={handleVisibility}>{privatetask ? "Make Public" : "Make private"}</a>
        </div>

        <div className="card-footer" style={{ background: "white" }}>
          <div className='subtitle'>Assignee: <p className='subtitle-description'>
            <img href='/' alt='' src={texttoimg(imgtext)} width={"25px"} height={"25px"} style={{ borderRadius: '50%' }} />&nbsp;{created_by.display_name}</p>
          </div>
          <div className='subtitle'>Due Date:<p className='subtitle-description'>&nbsp;{end_datetime && end_datetime.slice(0, 10)}</p></div>
          <div className='subtitle'>Description:</div><p className='subtitle-description'>{description}</p>
          <div className="taskimg-file">

          <img src="/img.jpg" alt='' width="40" height="50"></img>
          </div>
          <div className="task-file">

            <img src="/adobe.png" alt='' width="40" height="40" style={{ margin: "5px" }}></img>
            <PdfViewer pdf={pdf}
              onCancel={() => setShowPdf(false)}
              visible={showPdf}
            />
            <p className="FileName" onClick={() => setShowPdf(!showPdf)}>Dummy File : click to open</p>
          </div>

        </div>

        <div className="card-footer d-flex justify-content-between" style={{ background: "white" }}>
          <i style={{ border: "none" }}
            className='btn bi bi-chat-right-dots-fill my-0 py-0'
            onClick={() => handleCommentButton()}></i>
          <i className='btn bi bi-send-fill my-0 py-0' style={{ border: "none" }}></i>
        </div>

        {commentButton && (
          <>
            <hr id='taskhr1' />
            <div id='taskcmtbody'>
              <TaskCommentBody contentId={content.id} st={rendercomp} />
            </div>
            <div id='cf1' className="card-footer">
              <form onSubmit={addComment} className="d-flex justify-content-between" id="cmtinputform">
                <input
                  id='commentshow'
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder='Add comment..'
                />
                <button id='commentbtn' onClick={addComment}>
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
