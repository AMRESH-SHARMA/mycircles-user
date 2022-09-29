import { Link } from "react-router-dom";
import Dropdown from '../dropdown/Dropdown';
import { React, useEffect, useState } from 'react';
import axios from "axios";
import { isAuthenticatedToken, isAutheticated } from '../../auth/Auth'


export default function Navbar() {

  const [modal, setModal] = useState(false)
  const [circles, setCircles] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getUser = async () => {
      if (isAutheticated()) {
        try {
          const result = await axios.get('/space', {
            headers: {
              Authorization: `Bearer ${isAuthenticatedToken()}`,
            },
          })
          setCircles(result.data.results)
          setLoading(false)
          // console.log("result:", result.data.results)
        } catch (err) {
          setLoading(false)
          setError(true)
          console.warn(err)
        }
      }
    }
    getUser()
  }, [])
  return (<>
    <header className="border-bottom" style={{ background: "white" }}>
      <div className="container">
        <div className="nav col-12 col-lg-auto me-lg-auto pt-2">
          <div className="dropdown text-end mx-3"  >
            <a href="/" className="btn bi bi-record-circle p-0" data-bs-toggle="dropdown" aria-expanded="false" style={{ border: "none", color: "black" }}><p style={{ fontSize: "10px" }}>All CIRCLES</p>
            </a>

            <ul className="dropdown-menu text-small">
              <form className="d-flex">
                <input className="form-control me-2 mx-2" type="search" placeholder="Search" aria-label="Search" />
                <button type="submit" className="btn bi bi-search" style={{ border: "none" }}></button>
              </form>
              {!loading && (
                <>
                  {error ?
                    "<ServerError />" :
                    <>
                      {circles.length ? (
                        circles.map((item) => (
                          <Dropdown url={item.url} name={item.name} id={item.id} key={item.id} />
                        ))
                      ) : (
                        "<NoResults />"
                      )}
                    </>}
                </>
              )}

              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item px-5" href="/" style={{ background: "#4D6D7F", color: "white" }}>Create New Circle</a></li>
            </ul>

          </div>
          <Link to="/" className='btn bi bi-speedometer p-0 mx-2' style={{ border: "none" }}>
            <p style={{ fontSize: "10px" }}>WALL</p>
          </Link>

          <Link to="/members" className='btn bi bi-people-fill p-0 mx-2' style={{ border: "none" }}>
            <p style={{ fontSize: "10px" }}>MEMBERS</p>
          </Link>

          <Link to="/tasks" className='btn bi bi-list-task p-0 mx-2' style={{ border: "none" }}>
            <p style={{ fontSize: "10px" }}>TASKS</p>
          </Link>

          <div className=" me-lg-auto">
          </div>

          <a className="btn bi bi-search p-0 mx-2" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style={{ border: "none" }}>
          </a>

          <div className="collapse" id="collapseExample">
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>

        </div>
      </div>
    </header>
  </>
  )
}
