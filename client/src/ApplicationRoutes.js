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
import ParksSearchResults from "./components/ParksSearchResults";
import ArticlesSearchResults from "./components/ArticlesSearchResults";
import ToursSearchResults from "./components/ToursSearchResults";
import TourDetails from "./components/TourDetails";
import PlanEventsTrip from "./components/PlanEventsTrip";
import Book from "./components/Book";
import TripNameForm from './forms/TripNameForm'
import MyTrips from "./components/MyTrips";
import TripDetails from "./components/TripDetails";
import Campground from "./components/Campground";


const ApplicationRoutes = ({token, setToken}) => {

  

  return (
    <>
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
            token={token}
            setToken={setToken}/>}
        />
        <Route exact path="/login"
          element={<LoginForm
            token={token}
            setToken={setToken} />}
        />
        <Route 
          exact path="/park/:code"
          element={<Park 
            token={token}
            setToken={setToken}
          />}
        />
        {/* <Route
          exact path="/gallery"
          element={<PhotoGallery
            token={token}
            setToken={setToken}
          />}
        /> */}
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
        <Route
          exact path="/searchParks/:searchTerm"
          element={<ParksSearchResults
            token={token}
            setToken={setToken}
          />}
        />
        <Route
          exact path="/searchArticles/:searchTerm"
          element={<ArticlesSearchResults
            token={token}
            setToken={setToken}
          />}
        />
        <Route
          exact path="/searchTours/:searchTerm"
          element={<ToursSearchResults
            token={token}
            setToken={setToken}
          />}
        />
        <Route
          exact path="/tourDetails/:id"
          element={<TourDetails
            token={token}
            setToken={setToken}
          />}
        />
        {/* <Route
          exact path="/planTrip/events"
          element={<PlanEventsTrip
            token={token}
            setToken={setToken}
          />}
        /> */}
        <Route
          exact path="/book"
          element={<Book
            token={token}
            setToken={setToken}
          />}
        />
        <Route
          exact path="/tripNameForm"
          element={<TripNameForm
            token={token}
            setToken={setToken}
          />}
        />
        <Route
          exact path="/myTrips"
          element={<MyTrips
            token={token}
            setToken={setToken}
          />}
        />
        <Route
          exact path="/tripDetails/:id/:tripname"
          element={<TripDetails
            token={token}
            setToken={setToken}
          />}
        />
        <Route
          exact path="/campground/:id"
          element={<Campground
            token={token}
            setToken={setToken}
          />}
        />
      </Routes>
    </>
  )
}

export default ApplicationRoutes;