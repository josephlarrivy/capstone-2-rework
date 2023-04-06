import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';

import Map from "./components/Map";
import RegisterForm from "./forms/RegisterForm";
import LoginForm from "./forms/LoginForm";
import Park from "./components/Park";
import Home from "./components/Home";
import Supplemental from "./components/Supplemental";
import VisitorCenters from "./components/VisitorCenters";

import './css/NavBar.css'
import PhotoGallery from "./components/PhotoGallery";


const ApplicationRoutes = ({token, setToken}) => {

  

  return (
    <>
      {/* <NavBar
        token={token}
        setToken={setToken}
      /> */}
      <Routes>
        <Route exact path="/"
          element={
            <Home
              token={token}
              setToken={setToken}
            />}
        />
        <Route exact path="/map"
          element={
            <Map
              token={token}
              setToken={setToken}
            />}
        />
        <Route exact path="/register"
          element={
          <RegisterForm
          setToken={setToken}/>}
        />
        <Route exact path="/login"
          element={<LoginForm 
          setToken={setToken} />}
        />
        <Route 
          exact path="/park/:code"
          element={<Park 
            token={token}
            setToken={setToken}
          />}
        />
        <Route
          exact path="/gallery"
          element={<PhotoGallery
            token={token}
            setToken={setToken}
          />}
        />
        <Route
          exact path="supplemental/:type/:USstate"
          element={<Supplemental
            token={token}
            setToken={setToken}
          />}
        />
        <Route
          exact path="visitorcenters/:USstate"
          element={<VisitorCenters
            token={token}
            setToken={setToken}
          />}
        />
      </Routes>

    </>
  )
}

export default ApplicationRoutes;