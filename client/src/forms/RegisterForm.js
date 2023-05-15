import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import BackendApiRequest from "../apis/backendApi";
import useLocalStorage from "../hooks/useLocalStorage";
import NavBar from "../NavBar";

import { AxiosError } from "axios";

import '../css/RegisterForm.css'

const RegisterForm = ({token, setToken}) => {

  const [localStoreToken, localRemoveToken, localRetrieveToken, localDecodeToken] = useLocalStorage()
  const [error, setError] = useState(null)

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
    if (request instanceof AxiosError) {
      setError(request.response.data.message)
      return 'error'
    } else {
      const token = request.data.token
      setToken(token)
      localStoreToken(token)
      setFormData(INITIAL_STATE)
      navigate('/')
    }
  }


  return (
    <div id="register-form-main-container">
      <NavBar token={token} setToken={setToken} />
      <div id="form-inner-container">
        <div id="form-container">
          <h4>Register</h4>
          {error && (
            <div className="error-container">
              <p>Registration error:</p>
              <p>{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="name-form-container">
              <div className="name-subcontainer">
                <label htmlFor="firstName" className="register-label">
                  First Name
                </label>
                <input
                  required
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="register-input"
                />
              </div>
              <div className="name-subcontainer">
                <label htmlFor="lastName" className="register-label">
                  Last Name
                </label>
                <input
                  required
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="register-input"
                />
              </div>
            </div>
            <br />
            <label htmlFor="username" className="register-label">
              Username:
            </label>
            <input
              required
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="register-input"
            />
            <br />
            <label htmlFor="password" className="register-label">
              Password:
            </label>
            <input
              required
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="register-input"
            />
            <br />
            <label htmlFor="email" className="register-label">
              Email:
            </label>
            <input
              required
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="register-input"
            />
            <br />
            <br />
            <button id="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default RegisterForm;