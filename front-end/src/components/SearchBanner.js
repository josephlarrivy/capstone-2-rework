import React, { useState, useEffect } from "react";
import '../css/SearchBanner.css'
import { useNavigate } from 'react-router-dom';


const SearchBanner = () => {

  const [searchTerm, setSearchTerm] = useState(null)
  const [searchType, setSearchType] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    
  }, [])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const selectSearchType = (e) => {
    console.log(e.target.value)
    setSearchType(e.target.value)
  }

  const handleSubmit = async () => {
    function convertQuery(term) {
      return term.replace(/ /g, '%20');
    }
    const convertedSearchTerm = convertQuery(searchTerm)
    navigate(`${searchType}/${convertedSearchTerm}`)
    console.log(`${searchType}/${convertedSearchTerm}`)
  }

  const handleFocus = (e) => {
    e.target.placeholder = ''
  }

  return (
    <div id='search-banner-container'>
      <h1>Search United States National Parks</h1>
      {/* <label for="searchBox">Search National Parks</label> */}
      <input type="text" id="searchBox" name="username" onChange={handleChange} onFocus={(e) => handleFocus(e)} placeholder='search'></input>

      {searchTerm === null
        ? <p></p>
        : 
      <form>
        <fieldset>
          <div>
            <input type="radio" id="search-parks" name="searchType" value="searchParks" onClick={(e) => { selectSearchType(e) }} />
            <label className="radio-label" htmlFor="search-parks">Parks</label>

            <input type="radio" id="search-articles" name="searchType" value="searchArticles" onClick={(e) => {selectSearchType(e)}}/>
            <label className="radio-label" htmlFor="search-articles">Articles</label>

            <input type="radio" id="search-tours" name="searchType" value="searchTours" onClick={(e) => {selectSearchType(e)}}/>
            <label className="radio-label" htmlFor="search-tours">Tours</label>
          </div>
        </fieldset>
      </form>
      }


      {searchType === null
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