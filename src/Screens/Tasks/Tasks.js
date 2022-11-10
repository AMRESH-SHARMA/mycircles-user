import React, { useState, useEffect } from 'react'
import axios from "axios";
import { TaskCard } from '../../Components/TaskCard/TaskCard';
import "./Task.css"
import Navbar from "../../Components/Header/Navbar";
import Header from "../../Components/Header/Header";
import Spinner from "../../aspinner/Spinner";
import { isAuthenticatedToken, isAutheticated } from '../../auth/Auth'

const Tasks = () => {

  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true)
  const container_id = localStorage.getItem("container_id");
  useEffect(() => {
    const getTasks = async () => {
      // if(localStorage.getItem("authToken")){
      if (isAutheticated() && !container_id) {
        try {
        const res = await axios.get('/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        setTask(res.data.results)
        setLoading(false)
        // console.log("result:", res.data.results)
      } catch (err) {
        setLoading(false)
        // setError(true)
        console.warn(err)
      }

      }
      else if(isAutheticated() && container_id){
        try {
        const res = await axios.get('/tasks/container/'+container_id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        setTask(res.data.results)
        setLoading(false)
        // console.log("result:", res.data.results)
      } catch (err) {
        setLoading(false)
        // setError(true)
        console.warn(err)
      }

      }

      
      // }
    }
    getTasks()
  }, [])


  return (<>
    <Header />
    <Navbar />
    <div id='taskcontainer' className="container">
      <div className="d-flex-col justify-content-around">
        {!loading ? <>
          {task.length ? (
            task.map((item, index) => (
              <TaskCard obj={item} key={index} />
            ))
          ) : (
            <div>No result</div>
          )}
        </> :
          <div id='taskscrspinner'><Spinner /></div>}
      </div>
    </div>
  </>
  )
}
export default Tasks