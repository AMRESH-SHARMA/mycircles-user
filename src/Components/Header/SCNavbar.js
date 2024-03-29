import { React, useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from '../Dropdown/Dropdown';
import axios from "axios";
import { NavItem } from "react-bootstrap"
import InviteModal from "./InviteModal";
import Spinner from '../../aspinner/Spinner';
import { letterGenerate } from "../../aHelper/Helper";
import './Navbar.css';

export default function SCNavbar() {
  const navigate = useNavigate();
  let activeStyle = {
    border: "none",
    borderRadius: "0px",
    borderBottomWidth: "3px",
    borderBottomStyle: "solid",
    borderBottomColor: "#21A1B3",
    marginBottom: "0px",
    paddingBottom: "0px",
  };
  let unActiveStyle = {
    marginBottom: "0px",
    paddingBottom: "0px",
  };

  const [circles, setCircles] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [inputs, setInputs] = useState({});
  const [visibility, setVisibility] = useState(0);
  const [joinPolicy, setJoinPolicy] = useState(0);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [ImgError, setImgError] = useState(false);
  const ImgStyle = { display: "block", height: "auto" }

  const handleImgError = () => {
    setImgError(true)
  }


  if (submitting) {
    var disableStyle = { cursor: "not-allowed", }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const radioBoxValues = {
      visibility: visibility,
      join_policy: joinPolicy
    }
    setInputs(values => ({ ...values, [name]: value, ...radioBoxValues }))
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(async () => {
      try {
        let resapi = await axios.post("/space", inputs, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        // console.log("resapi", res)
      }
      catch (err) {
        console.warn(err)
      }
      setSubmitting(false);
    }, 5000);
  }

  useEffect(() => {
    const getSpaces = async () => {
      try {
        const result = await axios.get(`http://206.189.133.189/api/spaces`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        console.log(result)
        if (result.data) {
          setCircles(result.data.reverse())
        }
      } catch (err) {
        console.warn(err)
      }
      setLoading(false)
    }

    // const getSpaceById = async () => {
    //   setcircleIId(localStorage.getItem("container_iid"))
    //   if (localStorage.getItem("container_iid")) {
    //     try {
    //       const resapi = await axios.get(`/space/${localStorage.getItem("container_iid")}`, {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //         },
    //       })
    //       console.log('getSpacesById', resapi)
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    // }
    // getSpaceById()

    getSpaces()
  }, [])

  const Filteredcircles =
    circles?.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )

  const currentCircleGuid = () => {
    for (let i = 0; i < circles.length; i++) {
      if (circles[i].contentcontainer_id == localStorage.getItem("container_iid")) {
        return (circles[i].guid)
      }
    }
  }
  const currentCircleColor = () => {
    for (let i = 0; i < circles.length; i++) {
      if (circles[i].contentcontainer_id == localStorage.getItem("container_iid")) {
        return (circles[i].color)
      }
    }
  }


  return (<>
    <div className="border-bottom navbarr" style={{ background: "white" }}>
      <div className="container">
        <div className="nav">
          <div className="dropdown text-end mx-3">

            <NavLink to="/" className="btn noborder"
              data-bs-toggle="dropdown" aria-expanded="false">
              <div style={{ display: "flex" }}>
                <div style={{ border: "1px", width: "30px" }}>
                  <img
                    src={`https://circlenowdev.xyz/uploads/profile_image/${currentCircleGuid()}.jpg?m=1668274419`}
                    alt=""
                    width="30"
                    height="30"
                    className="navprofile"
                    onError={() => handleImgError()}
                    style={ImgError ? { display: "none" } : ImgStyle}
                  />


                  {ImgError &&
                    <>
                      <div style={{ margin: "3px 3px 0px 0px" }}>
                        <div className='Ntxttoimgdiv' style={{ backgroundColor: currentCircleColor() }}>
                          <div className='Ntxttoimg'>{letterGenerate(localStorage.getItem("containerName"))}</div>
                        </div>
                      </div>
                    </>}
                </div>
                <div style={{ margin: "5px 0px 0px 5px" }}>
                  {localStorage.getItem("containerName")}<i className="bi bi-caret-down-fill" style={{ marginTop: "5px" }} />
                </div>
              </div>
            </NavLink>

            <ul className="dropdown-menu text-small">
              <div id="createcirclesearchboxdiv">
                <input
                  onChange={handleSearch}
                  id="createcirclesearchbox"
                  type="search"
                  placeholder="Search"
                  autoComplete="off" />
              </div>
              <div id='createcircledropdown'>
                <a href='/' style={{ textDecoration: "none", color: "black", margin: "15px 0px 5px 5px", display: "flex" }}>

                  <div className='txttoimgdiv' style={{ backgroundColor: 'grey' }}>
                    <div className='txttoimg'  >
                      {letterGenerate('A C')}
                    </div>

                  </div>
                  <span style={{ marginLeft: "5px", marginBottom: "5px", fontWeight:"500" }} >Circles</span>
                </a>
                <hr />
                {loading ?
                  <div id="navdropspinner"><Spinner /></div> :
                  <>
                    {circles && circles.length ? (
                      Filteredcircles?.map((item) => (
                        <Dropdown obj={item} key={item.id} />
                      ))
                    ) : null}
                  </>
                }

              </div>
              <hr style={{ margin: "4px 0px 8px 0px" }} />
              <a id="createnewcirclebtn" data-bs-toggle="modal" data-bs-target="#newCircleModal" href="/" >Create New Circle</a>
            </ul>

            <div className="modal fade" id="newCircleModal" tabIndex="-1" aria-labelledby="newCircleModal" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="newCircleModal">Create Circle</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label className="d-flex justify-content-start">Name*</label>
                        <input type="text" name="name" className="forminput" value={inputs.name || ""}
                          onChange={handleChange} placeholder="Circle name" required />
                      </div>
                      <div className="mb-3">
                        <label className="d-flex justify-content-start">Description</label>
                        <input type="text" name="description" className="forminput" value={inputs.description || ""}
                          onChange={handleChange} />
                        <div id="emailHelp" className="d-flex justify-content-start form-text">Max. 100 characters.</div>
                      </div>

                      <p>
                        <a id="advsettingModalid" data-bs-toggle="collapse" href="#advsettingModal" role="button" aria-expanded="false" aria-controls="advsettingModal">
                          Advance access settings
                        </a>
                      </p>
                      <div className="collapse" id="advsettingModal">
                        <div id="advsettingModalBody" className="card card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <h6 className="createcirclehtag">Visibility</h6>
                              <label className="createcirclecont">
                                <input type="radio" onChange={() => { setVisibility(1) }} checked={visibility === 1} /> <span className="createcircleradiolabel">Public (Members Guests)</span>
                              </label>
                              <label className="createcirclecont">
                                <input type="radio" onChange={() => { setVisibility(2) }} checked={visibility === 2} /> <span className="createcircleradiolabel">Public (Members only)</span>
                              </label>
                              <label className="createcirclecont">
                                <input type="radio" onChange={() => { setVisibility(3) }} checked={visibility === 3} /> <span className="createcircleradiolabel">Private (Invisible)</span>
                              </label>
                            </div>
                            <div className="col-md-6">
                              <h6 className="createcirclehtag">Join Policy</h6>
                              <label className="createcirclecont">
                                <input type="radio" onChange={() => { setJoinPolicy(1) }} checked={joinPolicy === 1} /> <span className="createcircleradiolabel">Only by invite</span>
                              </label>
                              <label className="createcirclecont">
                                <input type="radio" onChange={() => { setJoinPolicy(2) }} checked={joinPolicy === 2} /> <span className="createcircleradiolabel">Invite and request</span>
                              </label>
                              <label className="createcirclecont">
                                <input type="radio" onChange={() => { setJoinPolicy(3) }} checked={joinPolicy === 3} /> <span className="createcircleradiolabel">Everyone can enter</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="submit" onClick={handleSubmit} className="newCircleModalbtn" disabled={submitting}
                          style={disableStyle}>{submitting ? "Wait" : "Next"}</button>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <li className=' homeNavTabs'>
            <NavLink to={`/c/${localStorage.getItem("containerName")}/${localStorage.getItem("container_iid")}/SCwall`} className='btn bi bi-speedometer'
              style={({ isActive }) => isActive ? activeStyle : unActiveStyle}>
              <p className="homeNavTabsTitle">WALL</p>
            </NavLink>
          </li>


          <li className=' homeNavTabs'>
            <NavLink to={`/c/${localStorage.getItem("containerName")}/${localStorage.getItem("container_iid")}/SCmembers`}
              className='btn bi bi-people-fill'
              style={({ isActive }) => isActive ? activeStyle : unActiveStyle}>
              <p className="homeNavTabsTitle">MEMBERS</p>
            </NavLink>
          </li>


          <li className='homeNavTabs'>
            <NavLink to={`/c/${localStorage.getItem("containerName")}/${localStorage.getItem("container_iid")}/SCtasks`}
              className='btn bi bi-list-task'
              style={({ isActive }) => isActive ? activeStyle : unActiveStyle}>
              <p className="homeNavTabsTitle">TASKS</p>
            </NavLink>
          </li>

          <div className='col'></div>
          <NavItem className="navitems" >
            <label style={{ margin: "0px", padding: "0px" }} className="text">1026</label>
            <label style={{ margin: "-2px 0px 0px 0px", padding: "0px" }}>Posts</label>
          </NavItem>
          <NavItem className="navitems" >
            <label style={{ margin: "0px", padding: "0px" }} className="text">1026</label>
            <label style={{ margin: "-2px 0px 0px 0px", padding: "0px" }}>Members</label>
          </NavItem>
          <NavItem className="navitems" >
            <label style={{ margin: "0px", padding: "0px" }} className="text">1026</label>
            <label style={{ margin: "-2px 0px 0px 0px", padding: "0px" }}>Followers</label>
          </NavItem>
          <NavItem className='navitems' >
            <div className='navinvitebtn' style={{ display: 'flex' }}>

              <button className='globalbtn' onClick={handleShow}><i className="bi bi-cursor-fill">Invite</i></button>

              <div className="dropdown">

                <button className='globalbtn' style={{ margin: "0px 5px", border: "none", backgroundColor: "#D4D4D4", color: "#7A7A7A" }} data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-gear-fill">&nbsp;&nbsp;
                    <i className="bi bi-caret-down-fill"></i>
                  </i>
                </button>


                <ul className="dropdown-menu" style={{ minWidth: "230px" }}>
                  <button className='tdbtn' onClick={() => navigate(`/c/${localStorage.getItem("containerName")}/circle/manage`)}><i class="fa fa-cogs" aria-hidden="true"></i>&nbsp;&nbsp;Settings</button>
                  <button className='tdbtn'><i className="fa fa-bell" aria-hidden="true"></i>&nbsp;&nbsp;Receive&nbsp;Notification</button>
                  <button className='tdbtn'><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;Hide&nbsp;posts&nbsp;on&nbsp;dashboard</button>
                  <button className='tdbtn' onClick={() => navigate(`/c/${localStorage.getItem('containerName')}/about`)}><i className="fa fa-info-circle" aria-hidden="true"></i>&nbsp;&nbsp;About</button>
                </ul>
              </div>

              {show && <InviteModal show={show} id={localStorage.getItem("container_iid")} handleClose={handleClose} />}
            </div>
          </NavItem>
        </div>
      </div>
    </div>
  </>
  )
}
