import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios'

const setupAxios = () => {
  axios.defaults.baseURL = 'http://circlenowdev.xyz/api/v1/';
  // axios.defaults.auth= {
  //   username: 'ramki',
  //   password: 'Infy@1234'
  // };
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

