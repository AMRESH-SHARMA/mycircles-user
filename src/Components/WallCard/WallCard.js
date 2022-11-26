import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Likebtn from '../Likebtn/Likebtn';
import WallCommentBody from './WallCommentBody';
import axios from 'axios';
import emoji from 'emoji-dictionary'
import './WallCard.css';
import Spinner from '../../aspinner/Spinner';
import { dateInMonths } from '../../aHelper/Helper';
import EditModal from './EditModal';


const Card = (props) => {

  // console.log(props)
  const { id, message, content } = props.posts

  const navigate = useNavigate();
  const [commentButton, setCommentButton] = useState(false);
  const [visibility, setVisibility] = useState(content.metadata.visibility);
  const [commentValue, setCommentValue] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [rendercomp, setrendercomp] = useState(false);

  const [image, setimage] = useState();
  const [filename, setfilename] = useState();
  const [hover, sethover] = useState(false);
  // const [imgUrl, setimgUrl] = useState('');
  const [displayImg, setDisplayImg] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // useEffect(() => {

  // async function getImgeurl() {
  //   try {
  //     if (props.posts.content.files.length !== 0) {
  //       if (!props.posts.content.files[0].mime_type.includes('video')) {
  //         // console.log(props.posts.content.files[0].mime_type)
  //         var blob = await axios.get(`${backendBaseUrl}/file/file/download?guid=${props.posts.content.files[0].guid}`, {
  //           headers: {
  //             'Authorization': `Bearer ${localStorage.getItem("authToken")}`
  //           },
  //           responseType: 'blob'
  //         })
  //         var fr = new FileReader();
  //         fr.readAsDataURL(blob.data)
  //         fr.onloadend = () => {
  //           var base64Url = fr.result
  //           console.log('b64', base64Url);
  //           if (base64Url) setimgUrl(base64Url)
  //           // getUrls(base64Url, props.posts.content.id)
  //           // imageUrl = imageUrl + "OUT" + base64Url
  //           // ids = ids + "OUT" + props.posts.content.id
  //         }
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // getImgeurl();
  // })


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
  const handlehovertrue = () => {
    sethover(true);
  }
  const handlehoverfalse = () => {
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
  const handledelete = () => {
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

  const handleVisibility = async () => {

    try {
      if (visibility) {
        const payLoad = {
          data: {
            content: { metadata: { visibility: 0 } }
          }
        };
        const result = await axios.put(`/post/${id}`, payLoad, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setVisibility(0)
      } else {
        const payLoad = {
          data: {
            content: { metadata: { visibility: 0 } }
          }
        };
        const result = await axios.put(`/post/${id}`, payLoad, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setVisibility(1)
      }
    } catch (err) {
      console.warn(err)
      alert(err)
    }
  }

  let marTop = { marginBottom: "65px" }

  return (<>
    <div className="gtaskpostcard" style={{ minWidth: "350px" }}>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 8px 10px" }}>

        <div style={{ display: "flex" }}>
          <img
            alt="" width="40" height="40"
            src={`https://circlenowdev.xyz/uploads/profile_image/${content.metadata.created_by.guid}.jpg?m=1666002574`}
            onError={(e) =>
            ((e.target.src =
              "https://circlenowdev.xyz/static/img/default_user.jpg")
            )
            }
          />
          <div style={{ marginLeft: "10px" }}>
            <strong>{content.metadata.created_by.display_name}</strong>
            <div style={{ margin: "-4px 0px - 5px 0px", fontSize: "12px", fontWeight: "400", display: "flex" }}>
              {dateInMonths(content.metadata.created_at)}

              <i style={{ margin: "5px 0px 0px 5px" }} className={visibility ? 'fa fa-globe'  : 'fa fa-users'} data-bs-toggle="tooltip" title={visibility ? 'Public'  : 'Private'} />
            </div>
          </div>

        </div>


        <div className="dropdown">
          <i className='btn bi bi-three-dots taskheaderbtn' data-bs-toggle="dropdown" aria-expanded="false" />
          <ul className="dropdown-menu" style={{minWidth:"210px"}}>
            <button className='tdbtn' onClick={handleShow}>Edit</button>
            {show ? <EditModal post_id={id} show={show} handleClose={handleClose}></EditModal> : null}
            <button className='tdbtn' onClick={handleVisibility}>Make&nbsp;public&#47;Make&nbsp;Private</button>
            <button className='tdbtndel' onClick={handleDelPost}>Delete</button>
          </ul>
        </div>

      </div>

      <hr />

      <div style={{ maxHeight: "59px" }}>
        <p style={{ padding: "20px 0px 0px 60px", fontSize: "20px", fontWeight: "500px" }}>{textToEmoji(message).split(':').join('')}</p>
      </div>

      <div style={message && message.length ? null : marTop}>
        <div style={{ padding: "0px 0px 0px 50px" }}>

          {/* <img src={imgUrl} alt='' height={300} width={300} className="card-img-top" /> */}
        </div>

        <img
          alt=""
          src={`https://circlenowdev.xyz/file/file/download?variant=preview-image&guid=550fdfdb-7800-4098-845f-f9a20f70fa58&hash_sha1=f971967c`}
          onError={(e) => setDisplayImg(true)}
          style={displayImg ? { visibility: "none" } : { visibility: "block" }}
        />
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
            <form onSubmit={addComment} style={{ display: "flex", justifyContent: "space-evenly" }}>
              <input
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder='Add comment..'
                style={{ margin: "4px 0px 0px 0px" }}
              />
              <button style={{ margin: "4px 2px" }} className='globalbtn' onClick={addComment}>
                {isPostingComment ?
                  <div className="globalbtnspin">
                    <Spinner />
                  </div> :
                  'Comment'}
              </button>
              <button style={{ margin: "4px 2px" }} className="globalbtn" ><label style={{ cursor: 'pointer' }} htmlFor="showimage"><i className="bi bi-upload" /></label></button>
              <input onChange={onImageChange} type="file" accept="image/*" id="showimage" style={{ display: "none", visibility: "none" }}>
              </input>

              <div className=''>

                {image ?
                  <> <div style={{ display: 'flex', width: "70px", flexDirection: "column" }}>
                    <p onMouseEnter={handlehovertrue} onMouseLeave={handlehoverfalse}>{filename}</p>
                    <i onClick={handledelete} class="bi bi-trash"></i>
                  </div></> : null}

                {/* {hover ? <img src={image} alt='' height={50} width={50} className="hoveredimg" style={{ marginLeft:"40px" }}></img> : null} */}
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