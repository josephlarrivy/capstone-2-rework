import './css/NavBar.css'

import React, { useEffect } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import useLocalStorage from './hooks/useLocalStorage';


const NavBar = ({token, setToken}) => {

  const [localStoreToken, localRemoveToken, localRetrieveToken, localDecodeToken] = useLocalStorage()
  const navigate = useNavigate();

  const logOut = () => {
    localRemoveToken()
    setToken(null)
    // window.location.reload(true);
  }
  
  useEffect(() => {
    // console.log(token)
  },[])
  
  const goBack = () => {
    navigate(-1)
  }
  

  if (token === undefined || token === null) {
    return (
      <div className='NavBar'>
        <Navbar>
          <Nav >
            <button onClick={goBack}>Back</button>
            <NavItem >
              <NavLink to="/">Home</NavLink>
            </NavItem>
            {/* <NavItem >
              <NavLink to="/map">Map</NavLink>
            </NavItem> */}
            {/* <NavItem >
              <NavLink to="/gallery">Photo Gallery</NavLink>
            </NavItem> */}
            <NavItem >
              <NavLink to="/register">Register</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/login">Log In</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    )
  } else {
    return (
      <div className='NavBar'>
        <Navbar>
          <Nav>
            <button onClick={goBack}>Back</button>
            <NavItem>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            {/* <NavItem >
              <NavLink to="/map">Map</NavLink>
            </NavItem> */}
            {/* <NavItem >
              <NavLink to="/myTrips">My Trips</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink onClick={logOut} id="nav-logout">Log Out</NavLink>
            </NavItem>
            {/* <NavItem >
              <NavLink to="/gallery">Photo Gallery</NavLink>
            </NavItem> */}
            {/* <NavItem >
              <NavLink to="/activities">Activities</NavLink>
            </NavItem> */}
            {/* <NavItem>
            <NavLink to="/map">Map</NavLink>
          </NavItem> */}

          </Nav>
        </Navbar>
      </div>
    )
  }
  
}

export default NavBar;