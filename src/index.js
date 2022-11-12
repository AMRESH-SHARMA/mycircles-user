// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios'
import "./index.css";

const setupAxios = () => {
  // axios.defaults.baseURL = 'http://206.189.133.189/api/spaces/v1';
  axios.defaults.baseURL = 'https://circlenowdev.xyz/api/v1';
  axios.defaults.headers = {
    'Cache-Control': 'no-cache,no-store',
    'Pragma': 'no-cache',
    'Expires': '0',
  };
};

setupAxios();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

