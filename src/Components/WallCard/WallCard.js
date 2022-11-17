import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Likebtn from '../Likebtn/Likebtn';
import WallCommentBody from './WallCommentBody';
import axios from 'axios';
import emoji from 'emoji-dictionary'
import './WallCard.css';
import Spinner from '../../aspinner/Spinner';
import { noofdays } from '../../aHelper/Helper';
import {backendBaseUrl} from '../../API';


const Card = (props) => {

  // console.log(props)
  const { id, message, content } = props.posts

  const navigate = useNavigate();
  const [commentButton, setCommentButton] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [rendercomp, setrendercomp] = useState(false);

   const [imgUrl, setimgUrl] = useState();
   const [image, setimage] = useState();
   const [filename,setfilename] = useState();
   const [hover,sethover] = useState(false);


  //Dropdown
  const displaynone = { display: "none" }
  const [ithreedots, setithreedots] = useState(false);

  useEffect(() => {

    async function getImgeurl() {
      try {
        if (props.posts.content.files.length > 0) {
          if (!props.posts.content.files[0].mime_type.includes('video')) {
            // console.log(props.posts.content.files[0].mime_type)
            var blob = await axios.get(`${backendBaseUrl}/file/file/download?guid=${props.posts.content.files[0].guid}`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`
              },
              responseType: 'blob'
            })
            var fr = new FileReader();
            fr.readAsDataURL(blob.data)
            fr.onloadend = () => {
              var base64Url = fr.result
              console.log('b64',base64Url);
              if(base64Url) setimgUrl(base64Url)
              // getUrls(base64Url, props.posts.content.id)
              // imageUrl = imageUrl + "OUT" + base64Url
              // ids = ids + "OUT" + props.posts.content.id
            }
          }
        }
      } catch (err) {
        console.log(err)
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
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setfilename(event.target.files[0].name);
      setimage(URL.createObjectURL(event.target.files[0]));
    }
  }
  const handlehovertrue = () =>{
    sethover(true);
  }
  const handlehoverfalse = () =>{
    sethover(false);
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
      // console.log(commentValue.trim())
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
  const handledelete = ()=>{
    setimage(null);
    sethover(false);
  }

  const handleDelPost = async () => {
    try {
      console.log('del', id)
      const resapi = await axios.delete(`/post/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      console.log("resapi", resapi)
      if (resapi.data.code === 200) {
        setrendercomp(!rendercomp)
        navigate(0);
      }
    } catch (err) {
      alert(err.response.data.message)
      console.log(err)
    }
  }

  let marTop = { marginBottom: "65px" }

  return (<>
    <div className="gtaskpostcard">

      <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 8px 10px" }}>
        <div>
          <strong>{content.metadata.created_by.display_name}</strong>
          <div
            style={{ margin: "-4px 0px - 5px 0px", fontSize: "12px" }}>
            {noofdays(content.metadata.created_at)}
          </div>
        </div>

        <div>
          <i className='btn bi bi-three-dots taskheaderbtn' onClick={() => setithreedots(!ithreedots)} />
          <div id="task-dots-dropdown-content" style={!ithreedots ? displaynone : null}>
            <button className='tdbtn'>Edit</button>
            <button className='tdbtndel' onClick={handleDelPost}>Delete</button>
          </div>
        </div>
      </div>

      <hr />

      <div style={{ maxHeight: "59px" }}>
        <p style={{ padding: "5px" }}>{textToEmoji(message).split(':').join('')}</p>
      </div>

      <div style={message && message.length ? null : marTop}>
        <img src="/img.jpg" className="card-img-top" alt="" />
        {/* <img src={imgUrl} className="card-img-top" alt="" /> */}
      </div>

      <hr />

      <div className="d-flex justify-content-between" style={{ padding: "5px" }}>
        <Likebtn likes={content.likes} />
        <i style={{ border: "none" }}
          className='btn bi bi-chat-right-dots-fill my-0 py-0'
          onClick={() => handleCommentButton()}></i>
        <i className='btn bi bi-send-fill my-0 py-0' style={{ border: "none" }}></i>
      </div>

      {commentButton && (
        <>
          <hr />
          <div className='gcmtbodyheight'>
            <WallCommentBody contentId={content.id} st={rendercomp} />
          </div>
          <hr />
          <div>
            <form onSubmit={addComment}>
              <input
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder='Add comment..'
                style={{ margin: "8px 0px 0px" }}
              />
              <button style={{ margin: "4px 20px" }} className='globalbtn' onClick={addComment}>
                {isPostingComment ?
                  <div className="globalbtnspin">
                    <Spinner />
                  </div> :
                  'Comment'}
              </button>
              <button className="globalbtn" ><label style={{ cursor: 'pointer' }} htmlFor="showimage"><i className="bi bi-upload" /></label></button>
              <input onChange={onImageChange} type="file" accept="image/*" id="showimage" style={{ display: "none", visibility: "none" }}>
            </input>
            
            <div className='d-flex'>
            
            {image?<p onMouseEnter={handlehovertrue} onMouseLeave= {handlehoverfalse}>{filename}<i onClick={handledelete}  class="bi bi-trash"></i></p>:null}
            
            {hover?<img src = {image} className= "hoveredimg" style = {{width:"100px",height:"100px",marginLeft:"210px",marginTop:"-100px"}}></img>:null}
            </div>
            
            </form>
          </div>
        </>
      )}

    </div>
  </>
  )
}

export default Card