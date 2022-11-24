import { React, useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Dropdown from '../Dropdown/Dropdown';
import axios from "axios";
import Spinner from '../../aspinner/Spinner';
import './Navbar.css';


export default function Navbar() {
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

  const navigate = useNavigate();
  const [NerrorMessage, setNErrorMessage] = useState("");
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState(0);
  const [joinPolicy, setJoinPolicy] = useState(0);
  const [search, setSearch] = useState('');

  if (submitting) {
    var disableStyle = { cursor: "not-allowed", }
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleError() {
    if (!name) {
      setNErrorMessage("Name field is empty")
      return true;
    }
    return false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleError()) {
      setSubmitting(true);
      const payload = {
        name: name,
        description: description,
        visibility: visibility,
        join_policy: joinPolicy
      }
      console.log(payload)
      setTimeout(async () => {
        try {
          const res = await axios.post("/space", payload, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          console.log(res)
          if (res.data.contentcontainer_id) {
            navigate(0);
          }
        }
        catch (err) {
          console.warn(err)
          if (err.response.status === 401) {
            alert(err.response.data.message)
          }
        }
        setSubmitting(false);
      }, 5000);
    }
  }

  useEffect(() => {

    const getSpaces = async () => {
      try {
        const result = await axios.get(`http://206.189.133.189/api/spaces`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        // console.log(result)
        if (result.data) {
          setCircles(result.data.reverse())
        }
      } catch (err) {
        console.warn(err)
      }
      setLoading(false)
    }
    getSpaces()
  }, [])

  const Filteredcircles =
    circles?.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )

  return (<>
    <div className="border-bottom navbarr" style={{ background: "white" }}>
      <div className="container">
        <div className="nav">
          <div className="dropdown text-end mx-3">
            <NavLink to="/" className="btn bi bi-record-circle noborder" style={{ paddingBottom: "0px" }}
              data-bs-toggle="dropdown" aria-expanded="false">
              <p className="homeNavTabsTitle">All CIRCLES<i className="bi bi-caret-down-fill" /></p>
            </NavLink>


            <ul className="dropdown-menu text-small" style={{ minHeight: "50px" }}>
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
                        <input type="text" name="name" className="forminput" value={name}
                          onChange={(e) => setName(e.target.value)} placeholder="Circle name" required />
                        {NerrorMessage && <div className="error" style={{float:"left"}}> {NerrorMessage} </div>}
                      </div>
                      <div className="mb-3">
                        <label className="d-flex justify-content-start">Description</label>
                        <input type="text" name="description" className="forminput" value={description}
                          onChange={(e) => setDescription(e.target.value)} required />
                        <div id="" className="form-text">Max. 100 characters.</div>
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
            <NavLink to="/wall" className='btn bi bi-speedometer'
              style={({ isActive }) => isActive ? activeStyle : unActiveStyle}>
              <p className="homeNavTabsTitle">WALL</p>
            </NavLink>
          </li>


          <li className=' homeNavTabs'>
            <NavLink to="/members"
              className='btn bi bi-people-fill'
              style={({ isActive }) => isActive ? activeStyle : unActiveStyle}>
              <p className="homeNavTabsTitle">MEMBERS</p>
            </NavLink>
          </li>


          <li className='homeNavTabs'>
            <NavLink to="/tasks"
              className='btn bi bi-list-task'
              style={({ isActive }) => isActive ? activeStyle : unActiveStyle}>
              <p className="homeNavTabsTitle">TASKS</p>
            </NavLink>
          </li>

        </div>
      </div>
    </div>
  </>
  )
}
