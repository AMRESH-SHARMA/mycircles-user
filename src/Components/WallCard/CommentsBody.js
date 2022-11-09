import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { noofdays } from '../../aHelper/Helper';

const CommentsBody = (props) => {
  const { contentId } = props
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
        setCommentData(resapi.data.results);
        console.log("allcmts", resapi);
      } catch (err) {
        console.warn(err)
      }
    }
    getCardComments()
  }, [contentId])

  const handlecmtstyle=(e)=>{
    e.preventDefault()
    console.log(overflow);
    setoverflow(!overflow)
  }
  const overflowstyle = { overflowY:"scroll" };
  const overflowstylehide = { overflowY:"hidden" };

  return (<>
    <div id='cmtf1' style={overflow === true ? overflowstyle : overflowstylehide} >
      {commentData && commentData.length > 0 && <a className='showallcmt' href='/' onClick={(e)=>handlecmtstyle(e)} >Show all {commentData.length} comments</a>}
      {commentData && commentData.length > 0 &&
        commentData.map((item, index) => (
          <div key={index}>
            <div className="d-flex-row justify-content-start" id='showcomments' >
              <div id='cmttitle' >
                <strong >{item.createdBy.display_name}</strong> &nbsp; {noofdays(item.createdAt)}
              </div>
              <div id='cmtbody' >
                {item.message}
              </div>
            </div>
            <div className="d-flex justify-content-start">
              <a className="likereply" href='...'>Like ({item.likes.total})</a>
              <a className="likereply" href='...'>Reply</a>
            </div>
          </div>
        ))}
    </div>
  </>

  )
}

export default CommentsBody