import { React, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import Dropdown from '../Dropdown/Dropdown';
import axios from "axios";
import { NavItem } from "react-bootstrap"
import InviteModal from "./InviteModal";
import Spinner from '../../aspinner/Spinner';
import { letterGenerate, randomColor } from "../../aHelper/Helper";
import './Navbar.css';

export default function SCNavbar() {
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
  const [circleIId, setcircleIId] = useState('');
  const [search, setSearch] = useState('');
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const bgColor = { backgroundColor: randomColor() };


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
        const resapi = await axios.get('/space', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        if (resapi.data.results) {
          setCircles(resapi.data.results)
        }
      } catch (err) {
        console.warn(err)
      }
      setLoading(false)
    }
    const getSpaceById = async () => {
      setcircleIId(localStorage.getItem("container_iid"))
      if (localStorage.getItem("container_iid")) {
        try {
          const resapi = await axios.get(`/space/${localStorage.getItem("container_iid")}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          console.log('getSpacesById', resapi)
        } catch (err) {
          console.log(err);
        }
      }
    }
    getSpaceById()
    getSpaces()
  }, [circleIId])

  const Filteredcircles =
    circles?.filter(item =>
      item.owner.id === parseInt(localStorage.getItem("current_user_id")) && item.name.toLowerCase().includes(search.toLowerCase())
    )

  return (<>
    <div className="border-bottom navbarr" style={{ background: "white" }}>
      <div className="container">
        <div className="nav">
          <div className="dropdown text-end mx-3">

            <NavLink to="/" className="btn noborder"
              data-bs-toggle="dropdown" aria-expanded="false">
              {false ?
                <>
                  <img
                    src="/img.jpg"
                    alt="img"
                    width="30"
                    height="30"
                    className="navprofile"
                  />
                  {localStorage.getItem("containerName")}<i className="bi bi-caret-down-fill" /></>
                :
                <><div style={{ margin: "3px 3px 0px 0px" }}>
                  <div className='Ntxttoimgdiv' style={bgColor}>
                    <div className='Ntxttoimg'>{letterGenerate(localStorage.getItem("containerName"))}</div>
                  </div>
                  {localStorage.getItem("containerName")}<i className="bi bi-caret-down-fill" />
                </div>
                </>
              }

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
            <div className='navinvitebtn'>
              <button className='globalbtn' style={{ marginTop: "2px" }} onClick={handleShow}><i className="bi bi-cursor-fill">Invite</i></button>
              {show && <InviteModal show={show} id={circleIId} handleClose={handleClose} />}
            </div>
          </NavItem>
        </div>
      </div>
    </div>
  </>
  )
}
