import React from 'react';

const Dropdown = (props) => {

  return (
    <li>
      <a className="dropdown-item" href={props.url} style={{ color: "black" }}>
        <img src="img.jpg" alt="img" width="25" height="25" />{props.id}{props.name}
      </a>
    </li>
  )
}

export default Dropdown