import React from 'react';
import "./Dropdown.css";


const Dropdown = (props) => {

  const { name, contentcontainer_id, id, guid } = props.obj;
  //  console.log(props.obj) 
  return (<>
    <div>
      <li>
        <a className="dropdown-item" href={`/c/${name}/${contentcontainer_id}`} style={{ color: "black" }}>
          <img src={guid ? `https://circlenowdev.xyz/uploads/profile_image/${guid}.jpg?m=1666002574`: '/img.jpg'}
            alt=""
            width="25"
            height="25"
            className="profile"
          />{id}{name}{contentcontainer_id}
        </a>
      </li>
    </div>
  </>
  )
}

export default Dropdown