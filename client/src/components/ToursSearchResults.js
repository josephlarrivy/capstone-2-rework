import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NParksServiceRequest from "../apis/nationalParksApi";
import NavBar from "../NavBar";
import '../css/ToursSearchResults.css'

const ToursSearchResults = ({ token, setToken }) => {

  const { searchTerm } = useParams()
  const [numResults, setNumResults] = useState(9)
  const [results, setResults] = useState(null)
  const navigate = useNavigate();


  useEffect(() => {
    const doSearch = async () => {
      const response = await NParksServiceRequest.searchInTours(searchTerm, numResults)
      console.log(response)
      setResults(response)
    }
    doSearch()
  }, [numResults])

  const increaseNumberOfSearchResults = () => {
    setNumResults(numResults + 10)
  }

  const viewTourDetails = (id) => {
    // console.log(`/tourDetails/${id}`)
    navigate(`/tourDetails/${id}`)
  }

  const createParkLink = (park) => {
    // console.log(park)
    return (
      <button onClick={() => navigate(`/park/${park.parkCode}`)}>{park.fullName}</button>
    )
  }

  return (
    <div id="tours-search-results-main-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <h1>Tours Search Results</h1>
      <div id="tours-search-results-items-container">
        {results && results.map(item => {
          return (
            <div key={item.id} className="tours-search-results-item-container">
              <div className='tours-search-result-image'>
                <img
                  src={item.images[0].url}
                ></img>
              </div>
              <div className="tours-search-results-info">
                <h4>{item.title}</h4>
                <p><b>State: </b>{item.park.states}</p>
                <div className="related-parks-buttons">
                  <p><b>Park: </b>{createParkLink(item.park)}</p>
                </div>

                <p>{item.description}</p>
                <button onClick={(e) => viewTourDetails(item.id)}>See Full Tour Details</button>

              </div>
            </div>
          )
        })}
      </div>
      <button id="tours-load-more-search-results" onClick={increaseNumberOfSearchResults}>Get More Results</button>
    </div>
  )
}

export default ToursSearchResults;