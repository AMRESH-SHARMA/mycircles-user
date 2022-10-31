import { React, useState } from 'react'
const btnStyle = {
  border: "none",
  color: "#24A0ED"
};
const btnDefault = { border: "none" };

const Likebtn = (props) => {
  const [likedbtn, setLikedbtn] = useState(false);

  //LIKE BUTTON HANDLER
  const likeHandler = () => {
    return setLikedbtn(!likedbtn)
  };

  return (
    <button
      style={likedbtn === true ? btnStyle : btnDefault}
      className='btn bi bi-hand-thumbs-up-fill my-0 py-0'
      onClick={likeHandler}
    >
      ({props.likes.total})
    </button>
  )
}

export default Likebtn