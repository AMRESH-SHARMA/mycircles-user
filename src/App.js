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
import AccountSetting from './Screens/AccountSetting/AccountSetting';
import CircleSetting from './Screens/CircleSetting/CircleSetting';
import MyProfile from './Screens/MyProfile/MyProfile';
import About from './Screens/About/About';


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

        <Route exact path="/c/:circle/circle/manage" name="manage circle" element={<CircleSetting />} />
        <Route exact path="/c/:circle/about" name="about" element={<About />} />

        <Route exact path="/user/account/edit" name="propfile options " element={<AccountSetting />} />
        <Route exact path="/user/profile" name="myProfile " element={<MyProfile />} />

        <Route exact path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
