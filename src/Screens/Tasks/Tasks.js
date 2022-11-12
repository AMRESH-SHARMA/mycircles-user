import React, { useState, useEffect } from 'react'
import axios from "axios";
import { TaskCard } from '../../Components/TaskCard/TaskCard';
import "./Task.css"
import Navbar from "../../Components/Header/Navbar";
import Header from "../../Components/Header/Header";
import Spinner from "../../aspinner/Spinner";
import Welcome from '../Error/Welcome';
import SCNavbar from '../../Components/Header/SCNavbar';
import { scpage } from '../../aHelper/Helper';

const Tasks = () => {

  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true)
  // const container_iid = localStorage.getItem("container_iid");

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("container_iid")) {
        try {
          const res = await axios.get('/tasks', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          setTask(res.data.results)
          setLoading(false)
          console.log("result:", res)
        } catch (err) {
          setLoading(false)
          console.warn(err)
        }
      }
      else if (localStorage.getItem("container_iid")) {
        try {
          const res = await axios.get('/tasks/container/' + localStorage.getItem("container_iid"), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          setTask(res.data.results)
          setLoading(false)
          console.log("result:", res.data.results)
        } catch (err) {
          setLoading(false)
          console.warn(err)
        }
      }
    })()
  }, [])


  return (<>
    <Header />

    {scpage() ? <SCNavbar /> : <Navbar />}

    {localStorage.getItem("authToken") ?
      <>
        {loading ?
          <div className='gspin' style={{ marginTop: "2.5rem" }}><Spinner /></div> :

          <div className="gcontainer">
            <div className="gtwo-column-layout">

              <div>
                {task && task.length ? (
                  task.map((item, index) => (
                    <TaskCard obj={item} key={index} />
                  ))
                ) : "NO TASK EXIST"}
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

                    <div className="gcard mt-3">
                      <div className="card-body">
                        <div className="card-title d-flex">
                          <div className="flex-grow-1">
                            <strong>Latest </strong>Activities
                          </div>
                        </div>
                      </div>
                    </div>
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
export default Tasks