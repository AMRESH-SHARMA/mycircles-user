import { React, useEffect, useState } from 'react'
import Navbar from "../../Components/Header/Navbar";
import Header from "../../Components/Header/Header";
import MembersCard from '../../Components/MembersCard/MembersCard';
import axios from 'axios';
import Spinner from '../../aspinner/Spinner';
import Welcome from '../Error/Welcome';
import './Members.css';

const Members = () => {

  const [users, setusers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function getAllusers() {
      try {
        setloading(true)
        const resapi = await axios.get("/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          },
        });
        console.log(resapi.data.results);
        setusers(resapi.data.results);
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
  const Filteredusers =
    users?.filter(data =>
      data.display_name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <>
      <Header />
      <Navbar />

      {localStorage.getItem("authToken") ?
        <>
          {loading ?
            <div style={{ marginTop: "2.5rem" }} className='globalbtnspin'>
              <Spinner />
            </div> :
            <>

              {users && users.length ?
                <div className="gcontainer" style={{ margin: "2.5rem 4rem" }} >

                  <div className="gcard" style={{ textAlign: "left" }}>
                    <h5>People</h5>
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

                  <div className="row" style={{ marginTop: "2rem" }}>
                    {users && Filteredusers?.map((data,index) => (
                      <>
                        <MembersCard name={data.display_name} tags={data.account.tags} key={index}/>
                      </>
                    ))}
                  </div>

                </div> :
                null}
            </>
          }
        </>
        :
        <div style={{ margin: "2.5rem" }}>
          <Welcome />
        </div>}
    </>

  )
}

export default Members