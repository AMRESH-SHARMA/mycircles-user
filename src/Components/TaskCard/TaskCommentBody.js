import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { noofdays } from '../../aHelper/Helper';

const TaskCommentBody = (props) => {
  // console.log(props)
  const { contentId, st } = props
  const [commentData, setCommentData] = useState('')
  const [overflow, setoverflow] = useState(false)
  const [replytocommentbtn, setreplytocommentbtn] = useState(false)

  useEffect(() => {
    const getCardComments = async () => {
      try {
        const resapi = await axios.get(`/comment/content/${contentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        setCommentData(resapi.data.results.reverse());
        console.log("allcmts", resapi.data.results);
      } catch (err) {
        console.warn(err)
      }
    }
    getCardComments()
  }, [contentId, st])

  //handler replytocommentbtn BUTTON HANDLER
  const handlereplytocommentbtn = (e) => {
    e.preventDefault();
    return setreplytocommentbtn(!replytocommentbtn)
  };
  const handlecmtstyle=(e)=>{
    e.preventDefault()
    console.log(overflow);
    setoverflow(!overflow)
  }

  const overflowstyle = { overflowY:"scroll" };
  const overflowstylehide = { overflowY:"hidden" };

  return (<>

    <div id='cmtf1' style={overflow === true ? overflowstyle : overflowstylehide} >
      {commentData && commentData.length > 0 && <a className='showallcmt' href='/' onClick={(e) => handlecmtstyle(e)} >Show all {commentData.length} comments</a>}
      {commentData && commentData.length > 0 &&
        commentData.map((item, index) => (
          <div key={index}>
            <div className="d-flex-row justify-content-start" id='showtaskcomments' >
              <div id='cmttitle' >
                <strong >{item.createdBy.display_name}</strong> &nbsp; {noofdays(item.createdAt)}
              </div>
              <div id='cmtbody' >
                {item.message}
              </div>
            </div>
            <div className="d-flex justify-content-start">
              <a className="likereply" href='...'>Like ({item.likes.total})</a>
              <a className="likereply" href='/' onClick={(e) => handlereplytocommentbtn(e)}>Reply</a>
              {replytocommentbtn ? "inputbox" : null}
            </div>
          </div>
        ))}
    </div>
  </>
  )
}

export default TaskCommentBody