import { React, useEffect, useState } from 'react'
import Navbar from "../../Components/Header/Navbar";
import Header from "../../Components/Header/Header";
import MembersCard from '../../Components/MembersCard/MembersCard';
import axios from 'axios';
import Spinner from '../../aspinner/Spinner';

const Members = () => {

  const [users, setusers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function getAllusers() {
      try {
        setloading(true)
        const users = await axios.get("/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          },
        });
        console.log(users.data.results);
        setusers(users.data.results);
      } catch (err) {
        console.log(err);
      }
      setloading(false);
    }
    getAllusers();
  }, [])
  function handleChange(e) {
    setSearch(e.target.value);

  }
  const Users =
    users?.filter(data =>
      data.display_name.toLowerCase().includes(search.toLowerCase())
    )

  return (<>
    <Header />
    <Navbar />

    <div className="cardcard mt-5" style={{ textAlign: "left", margin: "50px" }}>
      <h5 style={{ textAlign: "left", marginLeft: "5px" }}>People</h5>
      <div className='row'>
        <div className='col-md-6 ' >
          <div className='form-search-field-info' style={{ textAlign: "left", fontSize: "13px" }}>Find people by their profile data or user tags</div>
          <input
            name="people"
            type="text"
            onChange={handleChange}
            placeholder="Search people?" />
        </div>
        <div className='col-md-2'>
          <div className='form-search-field-info' style={{ textAlign: "left", fontSize: "13px" }}>Sorting</div>
          <input
            name="people"
            type="text"
          />
        </div>
        <div className='col-md-2'>
          <div className='form-search-field-info' style={{ textAlign: "left", fontSize: "13px" }}>Status</div>
          <input
            name="people"
            type="text"
          />
        </div>
      </div>
    </div>
    <div className="container mt-3  row">
      {loading ?
        <div className='globalbtnspin'>
          <Spinner />
        </div> :
        <>
          {Users?.map(data => (
            <MembersCard name={data.display_name} tags={data.account.tags} />
          ))}
        </>
      }
    </div>
  </>

  )
}

export default Members