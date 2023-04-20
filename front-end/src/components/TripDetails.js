import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackendApiRequest from "../apis/backendApi";
import NavBar from "../NavBar";

import '../css/TripDetails.css'

const TripDetails = ({ token, setToken }) => {

  const { id, tripname } = useParams()
  const navigate = useNavigate()
  const [usersItems, setUsersItems] = useState(null)
  const [resetItems, setResetItems] = useState(false)

  useEffect(() => {
    setResetItems(!resetItems)
  }, [])


  useEffect(() => {
    const getItems = async () => {
      const items = await BackendApiRequest.getItemsByTripId(id)
      setUsersItems(items)
    }
    getItems()
  }, [resetItems])


  const deleteItem = async (id) => {
    const deletedItem = await BackendApiRequest.deleteItem(id)
    setResetItems(!resetItems)
  }

  return (
    <div id="trip-details-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div id="trip-details-inner-container">
        <h1>Trip Details: {tripname}</h1>
        {/* <h1>Itinerary</h1> */}
        {usersItems && usersItems.map(item => {

          const itemTypeUppercase = item.type.toUpperCase();

          return (
            <div key={item.itemid} className="single-item">
              <div className="item-left-container">
                <div className={`item-category-${item.type}`}>
                  {/* <p>{item.type}</p> */}
                </div>
                <button onClick={() => navigate(`${item.route}`)} >Details</button>
                <button onClick={() => { deleteItem(item.itemid) }}>Delete</button>
              </div>
              <div className="item-middle-container">
                <h4>{itemTypeUppercase} - {item.name}</h4>
                <p>{item.description}</p>
              </div>
            </div>

          )
        })}
      </div>
    </div>
  )
}

export default TripDetails;
