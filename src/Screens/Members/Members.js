import React from 'react'
import Navbar from "../../Components/Header/Navbar";
import Header from "../../Components/Header/Header";
// import Spinner from "../../aspinner/Spinner";
import Welcome from '../Error/Welcome';

const Members = () => {
  return (<>
    <Header />
    <Navbar />
    <div className="container" style={{paddingTop:"2rem"}}>
      <Welcome />
    </div>

  </>


  )
}

export default Members