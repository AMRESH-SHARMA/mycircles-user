import React from 'react'
import Navbar from "../../Components/Header/Navbar";
import Header from "../../Components/Header/Header";
import Spinner from "../../aspinner/Spinner";

const Members = () => {
  return (<>
    <Header />
    <Navbar />
    <div className="container mt-4">
      Members
      <Spinner />
    </div>

  </>


  )
}

export default Members