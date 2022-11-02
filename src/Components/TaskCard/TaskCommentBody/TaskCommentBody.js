import React from 'react'

const TaskCommentBody = () => {
  return (<>
    <div>
      <div className="d-flex-row justify-content-start" id='showtaskcomments' >
        <div id='cmttitle' >
          <strong >Amresh Sharma</strong> &nbsp; (11 days)
        </div>
        <div id='cmtbody' >
          This is dummy comment
        </div>
      </div>
      <div className="d-flex justify-content-start">
        <a className="likereply" href='...'>Like</a>
        <a className="likereply" href='...'>Reply</a>
      </div>
    </div>
  </>

  )
}

export default TaskCommentBody