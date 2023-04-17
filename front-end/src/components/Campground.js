import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NParksServiceRequest from "../apis/nationalParksApi";
import NavBar from "../NavBar";


const Campground = ({token, setToken}) => {

  const { id } = useParams()

  

  useEffect(() => {
    const getDetails = async () => {
      const data = await NParksServiceRequest.getCampgroundDetails(id)
      console.log(data)
    }
    getDetails()
  }, [])


  return (
    <div id="campground-main-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div id="campground-page-container">
        <h1>Campground</h1>

      </div>
    </div>
  )
}

export default Campground;