import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wall from "./views/Wall";
import Members from "./views/Members";
import Tasks from "./views/Tasks";


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const ProtectedLayout = React.lazy(() => import('./layout/ProtectedLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  return (
    <Router>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/user/login" name="Login Page" element={<Login />} />
          <Route exact path="/user/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />

          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Wall />} />
            <Route path="/members" element={<Members />} />
            <Route path="/tasks" element={<Tasks />} />
          </Route> 
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
