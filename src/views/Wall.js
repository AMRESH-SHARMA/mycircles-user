import { React, useEffect, useState } from 'react';
import axios from "axios";
import { isAuthenticatedToken, isAutheticated } from '../auth/Auth'
// import Dropdown from "../components/dropdown/Dropdown";
// import Collapse from "../components/dropdown/Collapse";
import Card from "../components/card/Card";


const Wall = () => {

  const [posts, setPosts] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getPosts = async () => {
      if(isAutheticated()){
        try {
          const result = await axios.get('/post', {
            headers: {
              Authorization: `Bearer ${isAuthenticatedToken()}`,
            },
          })
          setPosts(result.data.results)
          setLoading(false)
          console.log("result:", result)
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
    <div className="container mt-4">
      <div className="d-flex justify-content-around">
        <div className="pt-2 flex-grow-1 bd-highlight">
          {!loading && (
            <>
              {error ?
                "<ServerError />" :
                <>
                  {posts.length ? (
                    posts.map((i) => (
                      <Card  msg={i.message} con={i.content} id={i.id} key={i.id} />
                    ))
                  ) : (
                    "<NoResults />"
                  )}
                </>}
            </>
          )}
        </div>
      </div>
    </div>
  </>
  )
}

export default Wall