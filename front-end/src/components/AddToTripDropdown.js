import React, { useEffect, useState } from 'react';
import useLocalStorage from "../hooks/useLocalStorage";
import BackendApiRequest from "../apis/backendApi";

import '../css/AddToTripDropdown.css'
import { useNavigate } from 'react-router-dom';

const AddToTripDropdown = ({ type, route, name, description, parkcode, latitude, longitude }) => {

  const [localStoreToken, localRemoveToken, localRetrieveToken, localDecodeToken] = useLocalStorage()
  const [selectedOption, setSelectedOption] = useState([]);
  const [username, setUsername] = useState(null)
  const [trips, setTrips] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const getUsername = async () => {
      const token = await localDecodeToken()
      setUsername(token.username)
    }
    getUsername()
    console.log('AddToTripDropdown loaded')
  }, [])

  useEffect(() => {
    const getTrips = async () => {
      const data = await BackendApiRequest.getUserTrips(username)
      console.log(data)
      setTrips(data)

      const optionsArray = []
      for (let item of data) {
        optionsArray.push(
          {'id': item.id,
           'tripname' : item.tripname }
        )
      }
      setSelectedOption(optionsArray)
    }
    getTrips()
  }, [username])

  const handleSelect = async (e) => {
    // console.log(type, route, name, description, parkcode, latitude, longitude, tripname)
    const id = e.target.value

    const response = await BackendApiRequest.addTripItem(type, route, name, description, parkcode, latitude, longitude, id)
    // console.log(response)



    // setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" type="button" onClick={toggleDropdown}>
        {'Add to a trip itinerary'}
      </button>
      {isOpen && trips.length > 0 &&
        <div className="dropdown-menu">
          {selectedOption.map((option) => (
            <button className="dropdown-item" key={option} value={option.id} onClick={(e) => handleSelect(e)}>
              {option.tripname}
            </button>
          ))}
        </div>
        }
      {isOpen && trips.length === 0 &&
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={() => navigate('/myTrips')}>
            Create a trip
          </button>
        </div>
      }
    </div>
  );
};

export default AddToTripDropdown;
