import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import '../WallCard/WallCard.css';
import { useNavigate } from 'react-router-dom';

const DelComment = (props) => {

  const { id } = props
  const navigate = useNavigate();
  //Dropdown
  const displaynone = { display: "none" }
  const [ithreedots, setithreedots] = useState(false);

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
      console.log(err)
    }
  }

  const handlethreedots = () => {
    setithreedots(!ithreedots);
  }

  return (
    <>
      <div onMouseLeave={handlethreedots}>
        <i className='btn bi bi-three-dots taskheaderbtn' onClick={handlethreedots} />
        <div className="wallcmt-dots-dropdown-content" style={!ithreedots ? displaynone : null}>
          {/* <button className='tdbtn'>Edit</button> */}
          <button className='tdbtndel' onClick={handleDelComment}>Delete</button>
        </div>
      </div>
    </>
  )
}

export default DelComment