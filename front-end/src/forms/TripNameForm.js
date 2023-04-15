import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import BackendApiRequest from "../apis/backendApi";
import NavBar from "../NavBar";
import { AxiosError } from "axios";

const TripNameForm = ({ token, setToken }) => {

  const [error, setError] = useState(null)
  const navigate = useNavigate();


  const INITIAL_STATE = {
    'tripName': '',
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
    const request = await BackendApiRequest.addTripName(formData)
    console.log(request)
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
              id={formData.tripName}
              type="text"
              name="tripName"
              // placeholder="password"
              value={formData.tripName}
              onChange={handleChange}
              className="col-md-6"
            />
            <label htmlFor="tripName" className="label">tripName</label>
            <br></br><br></br>

            <button id="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TripNameForm;