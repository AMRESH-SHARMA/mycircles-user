import React from 'react';
import "./Dropdown.css";
import { letterGenerate, randomColor } from "../../aHelper/Helper";


const Dropdown = (props) => {

  // console.log(props.obj);
  const { name, contentcontainer_id, guid } = props.obj;
  const bgColor = {backgroundColor:randomColor()};
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
          <div style={{ margin: "0px 5px" }}>{name}</div>
        </a>
      </li>
    </div>
  </>
  )
}

export default Dropdown