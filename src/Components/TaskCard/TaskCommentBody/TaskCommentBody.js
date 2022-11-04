import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const TaskCommentBody = (props) => {
  // console.log(props)
  const { contentId } = props
  const [commentData, setCommentData] = useState('')
  const [replytocommentbtn, setreplytocommentbtn] = useState(false)

  useEffect(() => {
    const getCardComments = async () => {
      try {
        const resapi = await axios.get(`/comment/content/${contentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        setCommentData(resapi.data.results);
        console.log("allcmts", resapi.data.results);
      } catch (err) {
        console.warn(err)
      }
    }
    getCardComments()
  }, [contentId])

  //handler replytocommentbtn BUTTON HANDLER
  const handlereplytocommentbtn = (e) =>{
    e.preventDefault();
    return setreplytocommentbtn(!replytocommentbtn)
  };
  
  return (<>
    {commentData.length > 1 && <a className='showallcmt' href='/' >Show all {commentData.length} comments</a>}
    {commentData.length > 0 &&
      commentData.map((item, index) => (
        <div key={index}>
          <div className="d-flex-row justify-content-start" id='showcomments' >
            <div id='cmttitle' >
              <strong >{item.createdBy.display_name}</strong> &nbsp; {item.createdAt}
            </div>
            <div id='cmtbody' >
              {item.message}
            </div>
          </div>
          <div className="d-flex justify-content-start">
            <a className="likereply" href='...'>Like ({item.likes.total})</a>
            <a className="likereply" href='/' onClick={(e) => handlereplytocommentbtn(e)}>Reply</a>
            {replytocommentbtn?"inputbox":null}
          </div>
        </div>
      ))}
  </>
  )
}

export default TaskCommentBody