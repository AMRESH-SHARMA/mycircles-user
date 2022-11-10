import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import TaskComments from './TaskComments';

const TaskCommentBody = (props) => {
  // console.log(props)
  const { contentId, st } = props
  const [commentData, setCommentData] = useState('')
  const [overflow, setoverflow] = useState(false)


  useEffect(() => {
    const getCardComments = async () => {
      try {
        const resapi = await axios.get(`/comment/content/${contentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        if (resapi.data.results) {
          setCommentData(resapi.data.results.reverse());
        }
        console.log("allcmts", resapi.data.results);
      } catch (err) {
        console.warn(err)
      }
    }
    getCardComments()
  }, [contentId, st])

  const handlecmtstyle = (e) => {
    e.preventDefault()
    console.log(overflow);
    setoverflow(!overflow)
  }

  const overflowstyle = { overflowY: "scroll" };
  const overflowstylehide = { overflowY: "hidden" };

  return (<>

    <div id='cmtf1' style={overflow === true ? overflowstyle : overflowstylehide} >
      {commentData && commentData.length > 2 && <a className='showallcmt' href='/' onClick={(e) => handlecmtstyle(e)} >Show all {commentData.length} comments</a>}
      {commentData && commentData.length > 0 &&
        commentData.map((item, index) => (
          <TaskComments obj={item} key={index} />
        ))}
    </div>
  </>
  )
}

export default TaskCommentBody