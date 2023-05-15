import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import BackendApiRequest from "../apis/backendApi";
import NavBar from "../NavBar";
import { AxiosError } from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

import '../css/TripNameForm.css'

const TripNameForm = ({ token, setToken, getTrips }) => {

  const [error, setError] = useState(null)
  const [username, setUsername] = useState(null)
  const navigate = useNavigate();
  const [localStoreToken, localRemoveToken, localRetrieveToken, localDecodeToken] = useLocalStorage()

  useEffect(() => {
    const getUsername = async () => {
      const token = await localDecodeToken()
      // console.log(token.username)
      setUsername(token.username)
    }
    getUsername()
  }, [])

  const INITIAL_STATE = {
    'tripname': '',
  }
  const [formData, setFormData] = useState(INITIAL_STATE)

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value,
      'username': username
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const request = await BackendApiRequest.addTripName(formData)
    if (request instanceof AxiosError) {
      setError('AxiosError')
      return 'error'
    } else {
      console.log('good request')
    }
    setFormData(INITIAL_STATE)
    getTrips()
  }

  if (!username) {
    return (
      <div id="trip-name-form-container">
        <h4>Please create an account or log in first</h4>
      </div>
    )
  }

  return (
    <div id="trip-name-form-container">
      <h4>Name your next adventure</h4>
      {error
        ? <div className="error-container">
          <p>Error:</p>
          <p>{error}</p>
        </div>
        : <></>
      }
      <form onSubmit={handleSubmit}>

        <input
          required
          id={formData.tripname}
          type="text"
          name="tripname"
          // placeholder="password"
          value={formData.tripname}
          onChange={handleChange}
        />
        <label htmlFor="tripname" className="label">Trip Name</label>
        <br></br><br></br>

        <button id="submit-button">Submit</button>
      </form>
    </div>
  )
}

export default TripNameForm;