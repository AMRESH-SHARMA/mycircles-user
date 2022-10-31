import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Header from "../components/Header/Header";


const ProtectedLayout = () => {
  const user = true;

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
    <Header />
    <Navbar />
      <>
        <Outlet />
      </>
  </>
  );
}

export default ProtectedLayout