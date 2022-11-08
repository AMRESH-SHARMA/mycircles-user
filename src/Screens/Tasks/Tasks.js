import React, { useState, useEffect } from 'react'
import axios from "axios";
import { TaskCard } from '../../Components/TaskCard/TaskCard';
import "./Task.css"
import Navbar from "../../Components/Header/Navbar";
import Header from "../../Components/Header/Header";
import Spinner from "../../aspinner/Spinner";
import Welcome from '../Error/Welcome';

const Tasks = () => {

  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    (async () => {
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
    })()
  }, [])


  return (<>
    <Header />
    <Navbar />
    <div className='container' style={{ paddingTop: "2rem" }}>
      {localStorage.getItem("authToken") ?
        <>
          {loading ?
            <div id='taskscrspinner'>< Spinner /></div> :
            <>
              {task && task.length ?
                <div id='taskcontainer'>
                  <div className="d-flex-col justify-content-around">
                    {task.map((item, index) => (
                      <TaskCard obj={item} key={index} />
                    ))
                    }
                  </div>
                </div>
                : null}
            </>}
        </> :
        <Welcome />}
    </div>
  </>
  )
}
export default Tasks