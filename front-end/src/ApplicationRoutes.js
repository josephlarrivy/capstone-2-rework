import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';

import Home from "./components/Home";
import NavBar from './NavBar'
import RegisterForm from "./forms/RegisterForm";
import LoginForm from "./forms/LoginForm";
// import AllParks from "./parksComponents/AllParks";
// import Park from "./Park";

import './css/NavBar.css'

const ApplicationRoutes = ({token, setToken}) => {

  

  return (
    <>
      <NavBar
        token={token}
        setToken={setToken}
      />
      <Routes>
        <Route
          exact path="/"
          element={
            <Home
            />
          }/>
        <Route exact path="/register"
          element={
          <RegisterForm
          setToken={setToken}/>}
        />
        <Route exact path="/login"
          element={<LoginForm 
          setToken={setToken} />}
        />

        {/* <Route 
          exact path="/park/:code"
          element={<Park 
            showingParks={showingParks}
            setShowingParks={setShowingParks}
            changeZoom={changeZoom}
          />}
        /> */}

      {/* <Route exact path="/map" element={<Map /> } /> */}

      </Routes>

    </>
  )
}

export default ApplicationRoutes;