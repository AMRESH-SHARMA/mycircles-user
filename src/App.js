import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Wall from "./Screens/Wall/Wall";
import Members from "./Screens/Members/Members";
import Tasks from "./Screens/Tasks/Tasks";
import Login from './Screens/Login/Login';
import SingleCircle from './Screens/Pages/SingleCircle/SingleCircle';
import Register from './Screens/Register/Register';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const Page404 = React.lazy(() => import('./Screens/Pages/Page404/Page404'))

function App() {
  return (
    <Router>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/" element={<Navigate to="/wall" />} />
          <Route exact path="/wall" element={<Wall />} />
          <Route exact path="/members" name="members" element={<Members />} />
          <Route exact path="/tasks" name="tasks" element={<Tasks />} />
          <Route exact path="/c/:circle/:id" element={<SingleCircle />} />
          <Route exact path="/user/login" name="Login Page" element={<Login />} />
          <Route exact path="/user/register" name="Register Page" element={<Register />} />
          <Route exact path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
