import { React, useEffect, useState } from 'react'
import Likebtn from '../Likebtn/Likebtn';
import WallCommentBody from './WallCommentBody';
import axios from 'axios';
import emoji from 'emoji-dictionary'
import './WallCard.css';
import Spinner from '../../aspinner/Spinner';
import { noofdays } from '../../aHelper/Helper';

const Card = (props) => {

  console.log(props)
  const { id, message, content } = props.posts

  const [commentButton, setCommentButton] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [rendercomp, setrendercomp] = useState(false);

  //
  useEffect(() => {

    async function getImgeurl() {
      if (props.posts.content.files.length > 0) {
        if (!props.posts.content.files[0].mime_type.includes('video')) {
          console.log(props.posts.content.files[0].mime_type)
          var blob = await axios.get("http://206.189.133.189/api/spaces/file/file/download?guid=" + props.posts.content.files[0].guid, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("authToken")}`
            },
            responseType: 'blob'
          })
          var fr = new FileReader();
          fr.readAsDataURL(blob.data)
          fr.onloadend = () => {
            var base64Url = fr.result
            console.log(base64Url);
            // getUrls(base64Url, props.posts.content.id)
            // imageUrl = imageUrl + "OUT" + base64Url
            // ids = ids + "OUT" + props.posts.content.id

          }
        }
      }
    }
    getImgeurl();
  })


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
          console.log("payload", input)
          const resapi = await axios.post("/comment", input, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          setrendercomp(!rendercomp)
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

  // async function getPosts(token) {
  //   async function innerFunction() {
  //     console.log('token..' + token)
  //     const resultOut = await axios.get(postEndpoint, {
  //       headers: {
  //         'Content-type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //     })

  //     if (resultOut.status != 200) {
  //       alert('User not exists, please register..!')
  //     } else {

  //       resultsArray = await resultOut.data
  //       await Promise.all(resultOut.data.results.map(async (result, i) => {
  //         if (result.content.files.length > 0) {
  //           if (!result.content.files[0].mime_type.includes('video')) {
  //             console.log(result.content.files[0].mime_type)
  //             var blob = await axios.get("https://circlenowdev.xyz/file/file/download?guid=" + result.content.files[0].guid, {
  //               headers: {
  //                 'Authorization': `Bearer ${token}`
  //               },
  //               responseType: 'blob'
  //             })
  //             var fr = new FileReader();
  //             fr.readAsDataURL(blob.data)
  //             fr.onloadend = () => {
  //               var base64Url = fr.result
  //               getUrls(base64Url, result.content.id)
  //               imageUrl = imageUrl + "OUT" + base64Url
  //               ids = ids + "OUT" + result.content.id
  //             }
  //           }
  //         }
  //         else {
  //         }
  //       }))
  //     }
  //     return { posts: resultsArray, imageUrls: imageUrl, ids_imageUrls: ids }
  //   }
  //   return await innerFunction()
  // }

  return (<>
    <div id="cardcard" className="card mt-3 mx-5">
      <div className="card-header d-flex" style={{ background: "white" }}>
        <div className="flex-grow-1" >

          <div id='ct1' className='card-title'>
            <strong>postid{id}{content.metadata.created_by.display_name}</strong>
            <div id='d1'>{noofdays(content.metadata.created_at)}</div>
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
          <div id='wallcmtbody'>
            <WallCommentBody contentId={content.id} st={rendercomp} />
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