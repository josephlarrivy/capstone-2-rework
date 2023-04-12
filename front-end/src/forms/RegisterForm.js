import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import BackendApiRequest from "../apis/backendApi";
import useLocalStorage from "../hooks/useLocalStorage";
import NavBar from "../NavBar";

import '../css/RegisterForm.css'

const RegisterForm = ({token, setToken}) => {

  const [localStoreToken, localRemoveToken, localRetrieveToken, localDecodeToken] = useLocalStorage()

  const INITIAL_STATE = {
    'username': '',
    'password': '',
    'firstName': '',
    'lastName': '',
    'email': '',
  }

  const [formData, setFormData] = useState(INITIAL_STATE)
  const navigate = useNavigate();

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const request = await BackendApiRequest.registerNewUser(formData)
    console.log(request)
    const token = request.data.token
    setToken(token)
    localStoreToken(token)
    setFormData(INITIAL_STATE)
    navigate('/')
  }


  return (
    <div id="register-form-main-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div id="form-inner-container">
        <div id="form-container">
          <h4>Register</h4>
          <form onSubmit={handleSubmit}>

            <div className="name-form-conatiner">
              <div className="name-subcontainer">
                <input
                  required
                  id={formData.firstName}
                  type="text"
                  name="firstName"
                  placeholder="first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className='firstName'
                  onFocus={(e) => e.target.placeholder = ''}
                />
                <label htmlFor="firstName" className="name-label">First Name: </label>
              </div>
              <div className="name-subcontainer">
                <input
                  required
                  id={formData.lastName}
                  type="text"
                  name="lastName"
                  placeholder="last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className='lastName'
                  onFocus={(e) => e.target.placeholder = ''}
                />
                <label htmlFor="lastName" className="name-label">Last Name: </label>
              </div>
              
            </div>
            <br></br><br></br>

            <label htmlFor="username" className="col-md-6">Username: </label>
            <input
              required
              id={formData.username}
              type="text"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              className='username'
              onFocus={(e) => e.target.placeholder = ''}
            /><br></br><br></br>

            <label htmlFor="password" className="col-md-6">Password: </label>
            <input
              required
              id={formData.password}
              type="text"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              className='password'
              onFocus={(e) => e.target.placeholder = ''}
            /><br></br><br></br>

            <label htmlFor="email" className="col-md-6">Email: </label>
            <input
              required
              id={formData.email}
              type="text"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              className='email'
              onFocus={(e) => e.target.placeholder = ''}
            /><br></br><br></br>

            <button id="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm;