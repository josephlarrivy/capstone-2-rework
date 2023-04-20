import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NParksServiceRequest from "../apis/nationalParksApi";
import NavBar from "../NavBar";
import '../css/ArticlesSearchResults.css'

const ArticlesSearchResults = ({ token, setToken }) => {

  const { searchTerm } = useParams()
  const [numResults, setNumResults] = useState(10)
  const [results, setResults] = useState(null)
  const navigate = useNavigate();


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

  const separateArray = (arr) => {
    return arr.join(", ");
  }

  const createParkLink = (arr) => {
    const buttons = []
    for (let item of arr) {
      buttons.push(<button onClick={() => navigate(`/park/${item.parkCode}`)}>{item.name}</button>)
    }
    return buttons
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
                  {item.tags 
                    ? <p><b>Interests:</b> {separateArray(item.tags)}</p>
                    : <></>
                  }
                  <p>{item.listingDescription}</p>
                  {item.relatedParks.length>0
                    ? <div className="related-parks-buttons">
                        <b>Related Parks: </b>{createParkLink(item.relatedParks)}
                      </div>
                    : <></>
                  }
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