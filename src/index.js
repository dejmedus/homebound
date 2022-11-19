import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import UpdateUser, { action as updateUserAction } from './modules/UpdateUser'
import Userfront from "@userfront/react";
import Error from './components/Error'

Userfront.init(process.env.REACT_APP_USERFRONT);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="*" element={<App />}>

//   )
// );
const router = createBrowserRouter([
  // {
  //   path="*"
  //   element={<App />}
  //   errorElement={<Error/>}
  // },
  <Route element={<App />} errorElement={<Error/>}>
  <Routes>
          {!Userfront.accessToken()
            ? <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </>
            : <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/trip-calculator" element={<TripCalc />} />
              <Route path="/update-user" element={<UpdateUser />} action={updateUserAction} />
            </>}
          <Route path="/reset" element={<PasswordReset />} />
      </Routes>
    </Route >
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
