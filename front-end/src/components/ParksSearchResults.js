import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import NParksServiceRequest from "../apis/nationalParksApi";
import NavBar from "../NavBar";
import '../css/SearchResults.css'

const ParksSearchResults = ({token, setToken}) => {

  const { searchTerm } = useParams()
  const [numResults, setNumResults] = useState(10)
  const [results, setResults] = useState(null)

  useEffect(() => {
    const doSearch = async () => {
      const response = await NParksServiceRequest.searchInParks(searchTerm, numResults)
      console.log(searchTerm)
      console.log(response)
      setResults(response)
    }
    doSearch()
  }, [numResults])

  const increaseNumberOfSearchResults = () => {
    setNumResults(numResults+10)
  }

  return (
    <div id="search-results-main-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <h1>Search Results</h1>
      <div id="search-results-items-container">
        {results && results.map(item => {
          return (
            <div key={item.id} className="search-results-item-container">
              <img
                className='search-result-image'
                src={item.images[0].url}
              ></img>
              <div className="search-results-info">
                <p>{item.fullName}</p>
                <p>{item.parkCode}</p>
              </div>
            </div>
          )
        })}
      <button className="load-more-search-results" onClick={increaseNumberOfSearchResults}>Get More Results</button>
      </div>
    </div>
  )
}

export default ParksSearchResults;