import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import Header from "../components/header/Header";


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