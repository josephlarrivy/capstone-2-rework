import React, { useState, useEffect } from "react";
import '../css/SearchBanner.css'
import { useNavigate } from 'react-router-dom';
import NParksServiceRequest from "../apis/nationalParksApi";


const SearchBanner = () => {

  const [searchTerm, setSearchTerm] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    
  }, [])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = async () => {
    const response = await NParksServiceRequest.searchNationalParks(searchTerm)
    console.log(response)
    // navigate(`/park/${selectedPark}`)
  }

  return (
    <div id='search-banner-container'>
      <h1>Search United States National Parks</h1>
      {/* <label for="searchBox">Search National Parks</label> */}
      <input type="text" id="searchBox" name="username" onChange={handleChange}></input>


      {searchTerm === null
        ? <p></p>
        : <div
          id="search-button"
          onClick={(e) => handleSubmit(e)}
        ><p>Search</p>
        </div>
      }



    </div>
  )
}

export default SearchBanner;