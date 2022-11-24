import React from 'react'
import axios from 'axios';
import '../WallCard/WallCard.css';
import { useNavigate } from 'react-router-dom';

const DelComment = (props) => {

  const { id } = props
  const navigate = useNavigate();

  const handleDelComment = async () => {
    try {
      console.log('delcmt', id)
      const resapi = await axios.delete(`/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      console.log("resapi", resapi)
      if (resapi.data.code === 200) {
        navigate(0);
      }
    } catch (err) {
      alert(err)
      console.log(err)
    }
  }

  return (
    <>
      <div style={{marginLeft:"5px"}} >
        <div className="dropdown dropend">
          <i className='btn bi bi-three-dots taskheaderbtn' data-bs-toggle="dropdown" aria-expanded="false" />
          <ul className="dropdown-menu" style={{marginTop:"-100px"}}>
            <button className='tdbtndel' style={{fontSize:"12px", padding:"0px 2px", margin:"0px"}} onClick={handleDelComment}>Delete</button>
          </ul>
        </div>
      </div>
    </>
  )
}

export default DelComment