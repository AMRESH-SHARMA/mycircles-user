import React from 'react';
import "./Dropdown.css";


const Dropdown = (props) => {

  const { name, contentcontainer_id, guid } = props.obj;
  //  console.log(props.obj) 
  return (<>
    <div className="allcirdd-items" >
      <li>
        <a className="d-flex" href={`/c/${name}/${contentcontainer_id}`} style={{ color: "black" }}>
          <img src={guid ? `https://circlenowdev.xyz/uploads/profile_image/${guid}.jpg?m=1666002574`: '/img.jpg'}
            alt=""
            width="25"
            height="25"
            className="profile"
          />
          <div>{name}</div>
        </a>
      </li>
    </div>
  </>
  )
}

export default Dropdown