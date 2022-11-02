import { React, useState } from 'react'
import Likebtn from '../Likebtn/Likebtn';
import CommentsBody from './CommentsBody';
import axios from 'axios';
import emoji from 'emoji-dictionary'
import './WallCard.css';
import Spinner from '../../aspinner/Spinner';

const Card = (props) => {

  console.log(props.posts)
  const { id, message, content } = props.posts

  const [commentButton, setCommentButton] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);

  //TEXT TO EMOJI 
  const textToEmoji = (comment) => {
    const findValue = (a, i) => {
      if (i !== 0 && a)
        comment = comment.replace(a, emoji.getUnicode(a))
    }
    comment.split(':').forEach(findValue)
    return comment
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
            "objectModel": "humhub\\modules\\post\\models\\Post",
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

  function noofdays(param) {
    let a = new Date().toISOString().slice(0, 10).replace('-', '').replace('-', '');
    let currentDate = parseInt(a);
    let b = param.slice(0, 10).replace('-', '').replace('-', '');
    let postDate = parseInt(b);
    // console.log(currentDate-postDate)
    return (currentDate - postDate)
  }

  return (<>
    <div id="cardcard" className="card mt-3 mx-5">
      <div className="card-header d-flex" style={{ background: "white" }}>
        <div className="flex-grow-1" >

          <div id='ct1' className='card-title'>
            <strong>postid{id}{content.metadata.created_by.display_name}</strong>
            <div id='d1'>{noofdays(content.metadata.created_at)} days</div>
          </div>
        </div>
        <i className="bi bi-three-dots"></i>
      </div>
      <div id='cb1' className="card-body">
        <p className="card-text">  {textToEmoji(message).split(':').join('')}</p>
      </div>

      <img src="/img.jpg" className="card-img-top" alt="..." />

      <div className="card-footer d-flex justify-content-between" style={{ background: "white" }}>
        <Likebtn likes={content.likes} />
        <i style={{ border: "none" }}
          className='btn bi bi-chat-right-dots-fill my-0 py-0'
          onClick={() => handleCommentButton()}></i>
        <i className='btn bi bi-send-fill my-0 py-0' style={{ border: "none" }}></i>
      </div>

      {commentButton && (
        <><hr id='hr1' />
          <div id='cmtf1'>
            <CommentsBody contentId={content.id} />
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

export default Card