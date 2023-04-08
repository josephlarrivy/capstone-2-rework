import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NParksServiceRequest from "../apis/nationalParksApi";
import NavBar from "../NavBar";
import '../css/ArticlesSearchResults.css'

const ArticlesSearchResults = ({ token, setToken }) => {

  const { searchTerm } = useParams()
  const [numResults, setNumResults] = useState(10)
  const [results, setResults] = useState(null)

  useEffect(() => {
    const doSearch = async () => {
      const response = await NParksServiceRequest.searchInArticles(searchTerm, numResults)
      console.log(response)
      setResults(response)
    }
    doSearch()
  }, [numResults])

  const increaseNumberOfSearchResults = () => {
    setNumResults(numResults + 10)
  }

  function addCommaSpace(string) {
    return string.split(',').map(item => item.trim()).join(', ');
  }

  return (
    <div id="articles-search-results-main-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      
      <div id="articles-main-container">
        <h1>Article Search Results</h1>
        {results && results.map(item => {
          return (
            <>
              <div className="articles-item-container">
                {item.listingImage.url
                  ? <div className="articles-item-image-container">
                    <img src={item.listingImage.url}></img>
                  </div>
                  : <div className="articles-item-image-container">
                    <img src={require('../images/black.png')}></img>
                  </div>
                }
                <div className="articles-item-container-info">
                  <a href={item.url} target="_blank"><h4>{item.title}</h4></a>
                  {item.relatedParks>0
                    ?
                    <p>Related to: {item.relatedParks[0].fullName} in {addCommaSpace(item.relatedParks[0].states)}</p>
                    :
                    <></>
                  }
                  
                  <p>{item.listingDescription}</p>
                </div>
              </div>
            </>

          )
        })}
      </div>
      <button className="articles-load-more-search-results-button" onClick={increaseNumberOfSearchResults}>More Articles about '{searchTerm}'</button>
    </div>
  )
}

export default ArticlesSearchResults;