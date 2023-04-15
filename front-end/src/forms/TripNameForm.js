import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import BackendApiRequest from "../apis/backendApi";
import NavBar from "../NavBar";
import { AxiosError } from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

const TripNameForm = ({ token, setToken }) => {

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
    console.log('TripNameForm')
    console.log(request)
    console.log('TripNameForm')
    if (request instanceof AxiosError) {
      setError('AxiosError')
      return 'error'
    } else {
      // const token = request.data.token
      // setToken(token)
      // localStoreToken(token)
      // setFormData(INITIAL_STATE)
      // navigate('/')
      console.log('good request')
    }
  }



  return (
    <div id="trip-form-main-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div id="form-inner-container">
        <div id="form-container">
          <h4>Log In</h4>
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
            <label htmlFor="tripname" className="label">tripname</label>
            <br></br><br></br>

            <button id="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TripNameForm;