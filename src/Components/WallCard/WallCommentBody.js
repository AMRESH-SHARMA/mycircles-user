import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import WallComments from './WallComments';

const CommentsBody = (props) => {
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
        setCommentData(resapi.data.results.reverse());
        // console.log("allcmts", resapi.data.results);
      } catch (err) {
        console.warn(err)
      }
    }
    getCardComments()
  }, [contentId, st])

  const handlecmtstyle = (e) => {
    e.preventDefault()
    setoverflow(!overflow)
  }
   
  const overflowstyle = { overflowY:"scroll" };
  const overflowstylehide = { overflowY:"hidden" };

  return (<>
    <div className='gtaskpost-commentcontent' style={overflow === true ? overflowstyle : overflowstylehide} >
      {commentData && commentData.length > 2 && <a style={overflow === true ? { color: "red" } : { color: "black" }} className='gshowallcmt-btn' href='/' onClick={(e) => handlecmtstyle(e)} >Show all {commentData.length} comments</a>}

      {commentData && commentData.length > 0 &&
        commentData.map((item, index) => (

          <WallComments obj={item} key={index} />

        ))}
    </div>
  </>

  )
}

export default CommentsBody