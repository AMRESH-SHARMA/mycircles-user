import { React, useEffect, useState } from 'react';
import axios from "axios";
import WallCard from "../../Components/WallCard/WallCard";
import Navbar from "../../Components/Header/Navbar";
import Header from "../../Components/Header/Header";
import "./Wall.css";
import Spinner from "../../aspinner/Spinner";
import Welcome from '../Error/Welcome';

const Wall = () => {

  const [posts, setPosts] = useState('')
  const [loading, setLoading] = useState(true);
  // const container_iid = localStorage.getItem("container_iid");

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("container_iid")) {
        try {
          const result = await axios.get('/post', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          setPosts(result.data.results)
          setLoading(false)
          // console.log("result:", result)
        } catch (err) {
          setLoading(false)
          console.warn(err)
        }
      }
      else if (localStorage.getItem("container_iid")) {
        try {
          const result = await axios.get(`/post/container/${localStorage.getItem("container_iid")}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          console.log(result.data);
          setPosts(result.data.results)
          setLoading(false)
          // console.log("result:", result)
        } catch (error) {
          setLoading(false)
          console.warn(error)
        }
      }
    })()
  }, [])
  return (<>
    <Header />
    <Navbar />


    {localStorage.getItem("authToken") ?
      <div className="container" style={{ paddingTop: "2rem" }}>
        <div className="d-flex justify-content-around">
          <div id='wallcardone' className="pt-2 flex-grow-1 bd-highlight">
            {loading ?
              <div id='wallscrspinner'><Spinner /></div> :
              (
                <>
                  {posts && posts.length ? (
                    posts.map((posts, index) => (
                      <WallCard posts={posts} key={index} />
                    ))
                  ) : null}
                </>
              )}
          </div>

          {posts && posts.length && <>
            <div id='wallcardtwo' className="pt-2 flex bd-highlight">
              <div className="card mt-3">
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

              <div className="card mt-3">
                <div className="card-body">
                  <div className="card-title d-flex">
                    <div className="flex-grow-1">
                      <strong>Latest </strong>Activities
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>}

        </div>
      </div>
      :
      <div style={{ margin: "50px" }}>
        <Welcome />
      </div>
    }


  </>
  )
}

export default Wall