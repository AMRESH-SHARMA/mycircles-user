import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Wall from "./Screens/Wall/Wall";
import Members from "./Screens/Members/Members";
import Tasks from "./Screens/Tasks/Tasks";
import Login from './Screens/Login/Login';
import SingleCircle from './Screens/SingleCircle/SingleCircle';
import Register from './Screens/Register/Register';
import Page404 from './Screens/Register/Register';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/wall" />} />
        <Route exact path="/wall" element={<Wall />} />
        <Route exact path="/members" name="members" element={<Members />} />
        <Route exact path="/tasks" name="tasks" element={<Tasks />} />
        <Route exact path="/c/:circle/:id" element={<SingleCircle />} />
        <Route exact path="/user/login" name="Login Page" element={<Login />} />
        <Route exact path="/user/registeration" name="Register Page" element={<Register />} />
        <Route exact path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
