import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import BackendApiRequest from "../apis/backendApi";
import useLocalStorage from "../hooks/useLocalStorage";

 

const RegisterForm = ({setToken}) => {

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
    const token = request.data.token
    setToken(token)
    localStoreToken(token)
    setFormData(INITIAL_STATE)
    navigate('/')
  }


  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="username" className="col-md-6">username: </label>
      <input
        required
        id={formData.username}
        type="text"
        name="username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
        className="col-md-6"
      /><br></br><br></br>

      <label htmlFor="password" className="col-md-6">password: </label>
      <input
        required
        id={formData.password}
        type="text"
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
        className="col-md-6"
      /><br></br><br></br>

      <label htmlFor="firstName" className="col-md-6">First Name: </label>
      <input
        required
        id={formData.firstName}
        type="text"
        name="firstName"
        placeholder="firstName"
        value={formData.firstName}
        onChange={handleChange}
        className="col-md-6"
      /><br></br><br></br>

      <label htmlFor="lastName" className="col-md-6">Last Name: </label>
      <input
        required
        id={formData.lastName}
        type="text"
        name="lastName"
        placeholder="lastName"
        value={formData.lastName}
        onChange={handleChange}
        className="col-md-6"
      /><br></br><br></br>

      <label htmlFor="email" className="col-md-6">email: </label>
      <input
        required
        id={formData.email}
        type="text"
        name="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
        className="col-md-6"
      /><br></br><br></br>

      <button>Submit</button>
    </form>
  )
}

export default RegisterForm;