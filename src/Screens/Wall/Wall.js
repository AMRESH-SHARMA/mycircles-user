import { React, useEffect, useState } from 'react';
import axios from "axios";
import { isAuthenticatedToken, isAutheticated } from '../../auth/Auth'
import WallCard from "../../Components/WallCard/WallCard";
import Navbar from "../../Components/Header/Navbar";
import Header from "../../Components/Header/Header";
import "./Wall.css";

const Wall = () => {

  const [posts, setPosts] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getPosts = async () => {
      if (isAutheticated()) {
        try {
          const result = await axios.get('/post', {
            headers: {
              Authorization: `Bearer ${isAuthenticatedToken()}`,
            },
          })
          setPosts(result.data.results)
          setLoading(false)
          // console.log("result:", result)
        } catch (err) {
          setLoading(false)
          setError(true)
          console.warn(err)
        }
      }
    }
    getPosts()
  }, [])
  return (<>
    <Header />
    <Navbar />
    <div className="container mt-4">
      <div className="d-flex justify-content-around">

        <div id='wallcardone' className="pt-2 flex-grow-1 bd-highlight">
          {!loading && (
            <>
              {error ?
                "<ServerError />" :
                <>
                  {posts.length ? (
                    posts.map((posts, index) => (
                      <WallCard posts={posts} key={index} />
                    ))
                  ) : (
                    "<NoResults />"
                  )}
                </>}
            </>
          )}
        </div>

        <div id='wallcardtwo' className="pt-2 flex bd-highlight">
          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title d-flex">
                <div className="flex-grow-1">
                  <strong>Getting </strong>Started
                </div>
                {/* <Dropdown /> */}
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
      </div>
    </div>
  </>
  )
}

export default Wall