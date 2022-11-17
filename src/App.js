import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Wall from "./Screens/Wall/Wall";
import Members from "./Screens/Members/Members";
import Tasks from "./Screens/Tasks/Tasks";
import Login from './Screens/Login/Login';
import SingleCircle from './Screens/SingleCircle/SingleCircle';
import Register from './Screens/Register/Register';
import Page404 from './Screens/Error/Page404';
import TokenSend from './Screens/Error/TokenSend';
import ProfileOpions from './Components/Header/ProfileOpions';
import Layout from './Components/Header/Layout';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/wall" />} />
        <Route exact path="/wall" name="wall" element={<Wall />} />
        <Route exact path="/members" name="members" element={<Members />} />
        <Route exact path="/tasks" name="tasks" element={<Tasks />} />
        <Route exact path="/c/:circle/:id" element={<SingleCircle />} />
        <Route exact path="/c/:circle/:id/SCwall" name="SCwall" element={<Wall />} />
        <Route exact path="/c/:circle/:id/SCmembers" name="SCmembers" element={<Members />} />
        <Route exact path="/c/:circle/:id/SCtasks" name="SCtasks" element={<Tasks />} />
        <Route exact path="/user/login" name="Login Page" element={<Login />} />
        <Route exact path="/user/registration" name="Register Page" element={<Register />} />
        <Route exact path="/user/tokenstatus" name="TokenSend Page" element={<TokenSend />} />
        <Route exact path = "/accountsettings" name = "propfile options " element= {<Layout/>}/>
        <Route exact path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
