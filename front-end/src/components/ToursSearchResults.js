import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NParksServiceRequest from "../apis/nationalParksApi";
import NavBar from "../NavBar";
import '../css/ToursSearchResults.css'

const ToursSearchResults = ({ token, setToken }) => {

  const { searchTerm } = useParams()
  const [numResults, setNumResults] = useState(10)
  const [results, setResults] = useState(null)

  useEffect(() => {
    const doSearch = async () => {
      const response = await NParksServiceRequest.searchInTours(searchTerm, numResults)
      console.log(searchTerm)
      console.log(response)
      setResults(response)
    }
    doSearch()
  }, [numResults])

  const increaseNumberOfSearchResults = () => {
    setNumResults(numResults + 10)
  }

  return (
    <div id="tours-search-results-main-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <h1>Search Results</h1>
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
                <p>{item.title}</p>
                <p>{item.description}</p>
              </div>
            </div>
          )
        })}
        <button className="tours-load-more-search-results" onClick={increaseNumberOfSearchResults}>Get More Results</button>
      </div>
    </div>
  )
}

export default ToursSearchResults;