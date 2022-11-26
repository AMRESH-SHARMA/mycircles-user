import { React, useState } from 'react'
import { noofdays } from '../../aHelper/Helper';
import Spinner from '../../aspinner/Spinner';
import DelComment from '../Delcmtbtn/DelComment';
import axios from 'axios';

const WallComments = (props) => {
  const { id, message, createdAt, createdBy, likes, objectId } = props.obj
  const [replytocommentbtn, setreplytocommentbtn] = useState(false)
  const [CommentValue, setCommentValue] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  // console.log('p', props.obj)

  //handler replytocommentbtn BUTTON HANDLER
  const handlereplytocommentbtn = (e) => {
    e.preventDefault();
    return setreplytocommentbtn(!replytocommentbtn)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (CommentValue) {
      setIsPostingComment(true);
      console.log(CommentValue.trim())
      setTimeout(async () => {
        try {
          let payload = {
            "objectModel": "humhub\\modules\\comment\\models\\Comment",
            "objectId": `${objectId}`,
            "Comment": {
              "message": `${CommentValue.trim()}`
            }
          }
          console.log("payload", payload)
          const resapi = await axios.post("/comment", payload, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          console.log("resapi", resapi)
        }
        catch (err) {
          console.warn(err)
          alert(`Error in posting comment`)
        }
        setIsPostingComment(false)
        setCommentValue('');
      }, 2000);
    }
  }

  return (<>
    <div key={props.index}>
      <div className="d-flex-row justify-content-start" id='gshowallcommentsbody'  >

        <div id='cmttitle' className='d-flex' >
          <strong >{createdBy.display_name}</strong> &nbsp; {noofdays(createdAt)}
          <DelComment id={id} />
        </div>

        <div id='cmtbody' >
          {message}
        </div>

      </div>


      <div className="d-flex justify-content-start">
        <a className="likereply" href='/'>Like ({likes.total})</a>
        <a className="likereply" href='/' onClick={(e) => handlereplytocommentbtn(e)}>Reply</a>
        {replytocommentbtn ?
          <div id='taskcmtreplybox' >
            <form id="taskcmtreplybox-form" style={{display:"flex"}}>
              <input
                id='taskcmtreplybox-input'
                value={CommentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder='Add comment..'
              />
              <button className='globalbtn' onClick={(e) => handleSubmit(e)}>
                {isPostingComment ?
                  <div className="globalbtnspin">
                    <Spinner />
                  </div> :
                  'Comment '}
              </button>
            </form>
          </div>
          : null}
      </div>
    </div>
  </>
  )
}

export default WallComments