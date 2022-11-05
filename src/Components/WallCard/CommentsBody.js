import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const CommentsBody = (props) => {
  const { contentId } = props
  const [commentData, setCommentData] = useState('')

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

  return (<>
    {commentData && commentData.length > 0 && <a className='showallcmt' href='/' >Show all {commentData.length} comments</a>}
    {commentData && commentData.length > 0 &&
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
            <a className="likereply" href='...'>Reply</a>
          </div>
        </div>
      ))}
  </>

  )
}

export default CommentsBody