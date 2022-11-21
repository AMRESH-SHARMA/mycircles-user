import React from 'react';
import "./Dropdown.css";
import { letterGenerate } from "../../aHelper/Helper";


const Dropdown = (props) => {

  // console.log(props.obj);
  const { color, name, contentcontainer_id, guid, description } = props.obj;
  const bgColor = { backgroundColor: color };
  return (<>
    <div className="allcirdd-items" >
      <li>
        <a className="d-flex" href={`/c/${name}/${contentcontainer_id}`} style={{ color: "black" }}>
          {false ?
            <img src={guid ? `https://circlenowdev.xyz/uploads/profile_image/${guid}.jpg?m=1666002574` : '/img.jpg'}
              alt=""
              width="25"
              height="25"
              style={{ display: "block", width: "100 %", height: "auto" }}
            />
            :
            <div className='txttoimgdiv' style={bgColor}>
              <div className='txttoimg'>{letterGenerate(name)}</div>
            </div>}
          <div style={{ margin: "0px 5px" }}>
          {name}
          <p style={{ margin: "0px 0px", fontSize:"10px" }}>{description}</p>
          </div>
          
        </a>
        <hr/>
      </li>
    </div>
  </>
  )
}

export default Dropdown