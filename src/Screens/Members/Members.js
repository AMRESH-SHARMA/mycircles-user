import React, { useEffect,useState } from 'react'
import Navbar from "../../Components/Header/Navbar";
import Header from "../../Components/Header/Header";
import Spinner from "../../aspinner/Spinner";
import MembersCard from '../../Components/Members/MembersCard';
import axios from 'axios';



const Members = () => {
  const [users, setusers] = useState([]);
  const [search,setSearch] = useState('');
  useEffect(()=>{
    async function getAllusers(){
      try{
        const users = await axios.get("/user",{
          headers:{
            Authorization :`Bearer ${localStorage.getItem("authToken")}`
         },

        });
        console.log(users.data.results);
        setusers(users.data.results);
      }catch(err){
        console.log(err);
      }
    }
    getAllusers();
  },[])
  function handleChange(e){
    setSearch(e.target.value);

  }
   const Users = 
        users.filter(data =>
            data.display_name.toLowerCase().includes(search.toLowerCase()) 
        )
    


  return (<>
    <Header />
    <Navbar />
    <div  className="card mt-3 mx-40" style={{width:"90%",marginLeft:"80px"}}>
    <h5 style ={{textAlign:"left",marginLeft:"5px"}}>People</h5>
    <div className='row'>
        <div className='col-md-6 ' >
            <div className='form-search-field-info' style={{textAlign:"left" ,fontSize:"13px"}}>Find people by their profile data or user tags</div>
            <input
              className="form-control"
              name = "people"
              type="text"
              onChange={handleChange}
              placeholder="Search people?" />
          </div>
        <div className='col-md-2'>
            <div className='form-search-field-info' style={{textAlign:"left" ,fontSize:"13px"}}>Sorting</div>
            <input
              className="form-control"
              name = "people"
              type="text"
               />
          </div>
          <div className='col-md-2'>
            <div className='form-search-field-info' style={{textAlign:"left" ,fontSize:"13px"}}>Status</div>
            <input
              className="form-control"
              name = "people"
              type="text"
               />
          </div>
      </div>
    </div>
    <div className="container mt-3 mx-5  row">
     {Users?.map(data=>(
      
      <MembersCard name = {data.display_name} tags = {data.account.tags}/>

     ))
     }
      
     
    </div>
 
  </>


  )
}

export default Members