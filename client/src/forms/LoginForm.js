import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import BackendApiRequest from "../apis/backendApi";
import useLocalStorage from "../hooks/useLocalStorage";
import NavBar from "../NavBar";

import { AxiosError } from "axios";

import '../css/LoginForm.css'

const LoginForm = ({ token, setToken }) => {

  const [localStoreToken, localRemoveToken, localRetrieveToken, localDecodeTokenn] = useLocalStorage()
  const [error, setError] = useState(null)


  const navigate = useNavigate();


  const INITIAL_STATE = {
    'username': '',
    'password': '',
  }
  const [formData, setFormData] = useState(INITIAL_STATE)

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const request = await BackendApiRequest.login(formData)
    console.log(request)
    if (request instanceof AxiosError) {
      setError('Invalid username or password')
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
    <div id="login-form-main-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div id="form-inner-container">
        <div id="form-container">
          <h4>Log In</h4>
          {error
            ? <div className="error-container">
              <p>Login error:</p>
              <p>{error}</p>
            </div>
            : <></>
          }
          <form onSubmit={handleSubmit}>

            <label htmlFor="username" className="label">Username</label>
            <input
              required
              id={formData.username}
              type="text"
              name="username"
              // placeholder="username"
              value={formData.username}
              onChange={handleChange}
              className="col-md-6"
            />
            
            <br></br><br></br>

            <label htmlFor="password" className="label">Password</label>
            <input
              required
              id={formData.password}
              type="password"
              name="password"
              // placeholder="password"
              value={formData.password}
              onChange={handleChange}
              className="col-md-6"
            />
            <br></br><br></br>

            <button id="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;