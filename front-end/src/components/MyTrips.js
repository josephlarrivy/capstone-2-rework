import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";
import useLocalStorage from "../hooks/useLocalStorage";
import TripNameForm from "../forms/TripNameForm";
import BackendApiRequest from "../apis/backendApi";

const MyTrips = ({token, setToken}) => {

  const [localStoreToken, localRemoveToken, localRetrieveToken, localDecodeToken] = useLocalStorage()
  const [username, setUsername] = useState(null)

  useEffect(() => {
    const getUsername = async () => {
      const token = await localDecodeToken()
      setUsername(token.username)
    }
    getUsername()
  }, [])

  useEffect(() => {
    const getTrips = async () => {
      const trips = await BackendApiRequest.getUserTrips(username)
      console.log(trips)
    }
    getTrips()
  }, [username])

  return (
    <div id="my-trips-main-container">
      <NavBar 
        token={token}
        setToken={setToken}
      />
      <h1>My Trips</h1>
      {/* <TripNameForm /> */}
    </div>
  )
}

export default MyTrips;