import { React, useState } from 'react'
import Dropdown from "../dropdown/Dropdown";
import Likebtn from '../likebtn/Likebtn';
import CommentsBody from './CommentsBody';
// import Comments from '../../components/Comments';
import './Card.css';
// const { userProfile }= useAuthStore();

const Card = (props) => {

  const [commentButton, setCommentButton] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [post, setPost] = useState();
  const [isPostingComment, setIsPostingComment] = useState(false);


  //COMMENT BUTTON HANDLER
  const handleCommentButton = () => {
    return setCommentButton(!commentButton)
  };
  // COMMENT HANDLER
  const addComment = async (e) => {
    e.preventDefault();

    if (commentValue) {
      setIsPostingComment(true);
      setTimeout(() => { setIsPostingComment(false) }, 2000);
      // const { data } = await axios.post(`${BASE_URL}/api/post/${post._id}`, {
      //   userId: userProfile._id,
      //   userId: 1,
      //   commentValue,
      // });

      setPost({ ...post, comments: commentValue.trim() });
      console.log(post)
      console.log(commentValue.trim())
      setCommentValue('');
      // setIsPostingComment(false);
    }
  };

  return (<>
    <div className="card mt-3 mx-5" style={{ width: "24rem" }}>
      <div className="card-header d-flex" style={{ background: "white" }}>
        <div className="flex-grow-1" >

          <div id='ct1' className='card-title'>
            <strong>Amresh Sharma </strong>
            <div id='d1'>11days ago{props.con.metadata.created_at}</div>
          </div>
        </div>
        <Dropdown />
      </div>
      <div id='cb1' className="card-body">
        <p className="card-text">{props.msg}</p>
      </div>
      <img src="/img.jpg" className="card-img-top" alt="..." />

      <div className="card-footer d-flex justify-content-between" style={{ background: "white" }}>
        <Likebtn likes={props.con.likes} />
        <i style={{ border: "none" }}
          className='btn bi bi-chat-right-dots-fill my-0 py-0'
          onClick={() => handleCommentButton()}></i>
        <i className='btn bi bi-send-fill my-0 py-0' style={{ border: "none" }}></i>
      </div>



      {commentButton && (
        <><hr id='hr1' />
          <div id='cmtf1'>
            <a id='showallcmt' href='...' >Show all 11 comment</a>
            <CommentsBody comments={props.con.comments.latest} />
          </div>
          <div id='cf1' className="card-footer">
            <form onSubmit={addComment} className="d-flex justify-content-between">
              <input
                id='commentshow'
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder='Add comment..'
              />
              <button id='commentbtn' onClick={addComment}>
                {isPostingComment ? 'Commenting...' : 'Comment'}
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