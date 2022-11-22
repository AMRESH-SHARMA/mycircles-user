import React from 'react';
import { useState } from 'react';
import "./Dropdown.css";
import { letterGenerate } from "../../aHelper/Helper";


const Dropdown = (props) => {

  // console.log(props.obj);
  const [ImgError, setImgError] = useState(false);
  const { color, name, contentcontainer_id, guid, description } = props.obj;
  const bgColor = { backgroundColor: color };
  const ImgStyle = { display: "block", height: "auto" }
  const handleImgError = () => {
    setImgError(true)
  }

  return (<>
    <div className="allcirdd-items" >
      <li>
        <a className="d-flex" href={`/c/${name}/${contentcontainer_id}`} style={{ color: "black" }}>
          {true
            &&
            <img
              src={`https://circlenowdev.xyz/uploads/profile_image/${guid}.jpg?m=1666002574`}
              alt=""
              width="25"
              height="25"
              onError={() => handleImgError()}
              style={ImgError ? { display: "none" } : ImgStyle}
            />
          }

          {ImgError &&
            <>
              <div className='txttoimgdiv' style={bgColor}>
                <div className='txttoimg'>{letterGenerate(name)}</div>
              </div>
            </>}
            
          <div style={{ margin: "0px 5px" }}>
            {name}
            <p style={{ margin: "0px 0px", fontSize: "10px" }}>{description}</p>
          </div>
        </a>
        <hr />
      </li>
    </div>
  </>
  )
}

export default Dropdown