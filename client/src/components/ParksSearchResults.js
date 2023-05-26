import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NParksServiceRequest from "../apis/nationalParksApi";
import NavBar from "../NavBar";
import '../css/ParkSearchResults.css'

const ParksSearchResults = ({ token, setToken }) => {

  const { searchTerm } = useParams()
  const [numResults, setNumResults] = useState(10)
  const [results, setResults] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const doSearch = async () => {
      const response = await NParksServiceRequest.searchInParks(searchTerm, numResults)
      console.log(response)
      setResults(response)
    }
    doSearch()
  }, [numResults])

  const increaseNumberOfSearchResults = () => {
    setNumResults(numResults + 10)
  }

  console.log(results)

  if (results == null) {
    return (
      <div id="park-search-results-main-container">
        <NavBar
          token={token}
          setToken={setToken}
        />
        <h1>Search Results</h1>
        <br></br>
        <div id="park-search-results-items-container">
          <h3>No results for your search</h3>
        </div>
      </div>
    )
  }

  return (
    <div id="park-search-results-main-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <h1>Search Results</h1>
      <br></br>
      <div id="park-search-results-items-container">
        {results && results.map(item => {
          return (
            <div key={item.id} className="park-search-results-item-container">
              {item.images && item.images[0] && <img
                className='park-search-result-image'
                src={item.images[0].url}
              ></img>}
              <div className="park-search-results-info">
                {item.fullName && <h4>{item.fullName}</h4>}
                {item.parkCode && <button onClick={() => (navigate(`/park/${item.parkCode}`))} className="go-to-park-button">See More Details</button>}
                {item.addresses && item.addresses[0] &&
                  <p>
                    {item.addresses[0].line1 && item.addresses[0].line1} -
                    {item.addresses[0].city && item.addresses[0].city},
                    {item.addresses[0].stateCode && item.addresses[0].stateCode}
                  </p>
                }
                {item.description && <p>{item.description}</p>}
              </div>
            </div>
          )
        })}
        <button className="park-load-more-search-results" onClick={increaseNumberOfSearchResults}>Get More Results</button>
      </div>
    </div>
  )
}

export default ParksSearchResults;
