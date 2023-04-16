import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";
import useLocalStorage from "../hooks/useLocalStorage";

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

  return (
    <div id="my-trips-main-container">
      <NavBar 
        token={token}
        setToken={setToken}
      />
      <h1>My Trips</h1>
    </div>
  )
}

export default MyTrips;