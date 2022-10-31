import React from 'react';
import "./Dropdown.css";


const Dropdown = (props) => {

  const { name, contentcontainer_id, id } = props.obj;
  //  console.log(props.obj) 
  return (<>
    <div>
      <li>
        <a className="dropdown-item" href={`/c/${name}/${contentcontainer_id}`} style={{ color: "black" }}>
          <img src="/img.jpg"
            alt="img"
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