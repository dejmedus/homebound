import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Userfront from "@userfront/react";

import Home from './modules/Home';
import Login from './modules/Login';
import Dashboard, { action as tripPlannerAction } from './modules/Dashboard';
import About from './modules/About';
import PasswordReset from './modules/PasswordReset';
import Trips from './modules/Trips';
import Error from './components/Error'
import UpdateUser, { action as updateUserAction } from './modules/UpdateUser'

Userfront.init(process.env.REACT_APP_USERFRONT);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      {!Userfront.accessToken()
        ? <>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<PasswordReset />} />
        </>
        : <>
          <Route path="/" element={<Dashboard />} action={tripPlannerAction} />
          <Route path="/about" element={<About />} />
          <Route path="/your-trips" element={<Trips />} />
          <Route path="/update-user" element={<UpdateUser />} action={updateUserAction} />
        </>}
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
