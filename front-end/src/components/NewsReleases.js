import React, {useState, useEffect} from "react";
import NParksServiceRequest from "../apis/nationalParksApi";

import '../css/NewsReleases.css'

const NewsReleases = () => {

  const [releases, setReleases] = useState(null)
  const [numReleases, setNumReleases] = useState(6)

  useEffect(() => {
    const getData = async () => {
      const response = await NParksServiceRequest.getNewsReleases(numReleases)
      setReleases(response)
    }
    getData()
  }, [numReleases])

  function formatDate(dateString) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    return (`${month} ${day}, ${year} at ${formattedHour}:${formattedMinute} ${period}`);
  }

  function getMoreReleases() {
    setNumReleases(numReleases + 6)
    console.log('get more releases')
  }

  return (
    <div id="news-releases-inner-container">
      <h1>News Releases</h1>
      {releases && releases.map(item => {
        let forMattedDate = formatDate(item.releaseDate)
        return (
          <div key={item.id} className="news-release-item-container">
            {item.image.url
              ? <div className="news-release-image-container">
                  <img src={item.image.url}></img>
                </div>
              : <div className="news-release-image-container">
                <img src={require('../images/black.png')}></img>
                {/* <p>no image</p> */}
                </div>
            }
            <div className="news-release-info-container">
              <a href={item.url} target="_blank">
                <p className="news-release-title">{item.title}</p>
              </a>
              <p className="news-release-date">{forMattedDate}</p>
              <p className="news-release-abstract">{item.abstract}</p>
            </div>
          </div>
        )
      })
      }
      <button id="load-more-home-button-news-releases" onClick={getMoreReleases}>See More News Releases</button>
    </div>
  )
}

export default NewsReleases;