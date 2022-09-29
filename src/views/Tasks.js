import React, { useState } from 'react'

const Tasks = () => {

  const [msg, setMsg] = useState('');

  const handleChange = e => {
    setMsg(e.target.value);
    console.log(msg)
  }



  return (<>

    <div className="container mt-4">
      <div className="card">
        <div className="card-header" style={{ background: "white" }}><i className="bi bi-list-task px-2" /><strong>Tasks </strong>Overview</div>
        <div className="card-body" style={{ background: "#EDEDED" }}>
          <div className="row">
            <div className="col-md-12">
              <input type="text" className="filterInput form-control" style={{ width: "100%" }} placeholder="Filter tasks by title" /></div>
          </div>

          <div className="row">
            <div className="col-2 pt-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={msg} onChange={handleChange} id="defaultCheck1" />
                Overdue
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={msg} onChange={handleChange} id="defaultCheck2" />
                I'm assigned
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={msg} onChange={handleChange} id="defaultCheck3" />
                I'm responsible
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={msg} onChange={handleChange} id="defaultCheck4" />
                Created by me
              </div>
            </div>

            <div className="col-2 pt-3">
              <input className="filterInput form-control" type="date" value={msg} onChange={handleChange} placeholder="Start Date" />
              <input className="filterInput form-control mt-4" type="date" value={msg} onChange={handleChange} placeholder="End Date" />
            </div>

            <div className="col-2 pt-3">
              <select className="form-select">
                <option defaultValue={""}></option>
                <option value="1">Pending</option>
                <option value="2">In Progress</option>
                <option value="3">In Review</option>
                <option value="3">Completed</option>
              </select>

              <select className="form-select mt-4">
                <option defaultValue={""}></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>


          <div className="d-flex flex-wrap">
            <div className=" me-lg-auto">
            </div>
            <button type="button" className="btn btn-sm btn-info" style={{ background: "#21A1B3", color: "white" }}>
              <i className="bi bi-download"></i> Export</button>
          </div>
        </div>
        <div className="card-header pb-3 pt-3" style={{ background: "white" }}>
          No results found for the given filter.
        </div>
      </div>
    </div>
  </>
  )
}

export default Tasks