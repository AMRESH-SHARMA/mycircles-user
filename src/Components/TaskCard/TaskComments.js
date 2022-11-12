import { React, useState } from 'react'
import { noofdays } from '../../aHelper/Helper';
import Spinner from '../../aspinner/Spinner';

const TaskComments = (props) => {
  const { message, createdAt, createdBy, likes } = props.obj
  const [replytocommentbtn, setreplytocommentbtn] = useState(false)
  console.log('p', props.obj)

  //handler replytocommentbtn BUTTON HANDLER
  const handlereplytocommentbtn = (e) => {
    e.preventDefault();
    return setreplytocommentbtn(!replytocommentbtn)
  };

  return (<>
    <div key={props.index}>
      <div className="d-flex-row justify-content-start" id='gshowallcommentsbody' >
        <div id='cmttitle' >
          <strong >{createdBy.display_name}</strong> &nbsp; {noofdays(createdAt)}
        </div>

        <div id='cmtbody' >
          {message}
        </div>
      </div>
      <div className="d-flex justify-content-start">
        <a className="likereply" href='/'>Like ({likes.total})</a>
        <a className="likereply" href='/' onClick={(e) => handlereplytocommentbtn(e)}>Reply</a>
        {replytocommentbtn ?
          <div id='taskcmtreplybox'>
            <form id="taskcmtreplybox-form">
              <input
                id='taskcmtreplybox-input'
                // value={commentValue}
                // onChange={(e) => setCommentValue(e.target.value)}
                placeholder='Add comment..'
              />
              <button className='globalbtn'>
                {false ?
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

export default TaskComments