import { React, useEffect, useState } from 'react';
import axios from "axios";
import WallCard from "../../Components/WallCard/WallCard";
import Navbar from "../../Components/Header/Navbar";
import Header from "../../Components/Header/Header";
import "./Wall.css";
import Spinner from "../../aspinner/Spinner";
import Welcome from '../Error/Welcome';
import SCNavbar from '../../Components/Header/SCNavbar';
import { scpage } from '../../aHelper/Helper';
import ActivityCard from '../../Components/ActivityCard/ActivityCard';

const Wall = () => {


  const [posts, setPosts] = useState('')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("container_iid") && scpage()) {
        try {
          const result = await axios.get(`/post/container/${localStorage.getItem("container_iid")}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          // console.log(result.data);
          setPosts(result.data.results)
          setLoading(false)
          // console.log("result:", result)
        } catch (error) {
          setLoading(false)
          console.warn(error)
        }
      }
      else {
        try {
          let resapi = await axios.get('/post', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          // console.log("result:", resapi)
          if (resapi.data.results) {
            setPosts(resapi.data.results)
          }
        } catch (err) {
          console.warn(err)
        }
        setLoading(false)
      }
    })()
  }, [])


  return (
    <>
      <Header />

      {scpage() ? <SCNavbar /> : <Navbar />}

      {localStorage.getItem("authToken") ?
        <>
          {loading ?
            <div className='gspin' style={{ marginTop: "2.5rem" }}><Spinner /></div> :

            <div className="gcontainer">
              <div className="gtwo-column-layout">

                <div>
                  {posts && posts.length ? (
                    posts.map((posts, index) => (
                      <WallCard posts={posts} key={index} />
                    ))
                  ) : "NO POST EXIST"}
                </div>

                <div>

                  <>
                    <div id='wallcardtwo' className="flex bd-highlight" style={{ margin: "0px 20px" }}>
                      <div className="gcard">
                        <div className="card-body">
                          <div className="card-title d-flex">
                            <div className="flex-grow-1">
                              <strong>Getting </strong>Started
                            </div>

                          </div>
                          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <div className="list-group">
                            <a href="/" className="list-group-item list-group-item-action"><i className="bi bi-play-circle px-2"></i>Guide: Spaces</a>
                            <a href="/" className="list-group-item list-group-item-action"><i className="bi bi-play-circle px-2"></i>Guide: Spaces</a>
                            <a href="/" className="list-group-item list-group-item-action"><i className="bi bi-play-circle px-2"></i>Guide: Spaces</a>
                          </div>
                        </div>
                      </div>

                      <ActivityCard/>

                    </div>
                  </>
                </div>
              </div>
            </div>
          }
        </>
        :
        <div style={{ margin: "2.5rem" }}>
          <Welcome />
        </div>
      }
    </>
  )
}

export default Wall