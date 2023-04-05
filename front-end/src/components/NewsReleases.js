import React, {useState, useEffect} from "react";
import NParksServiceRequest from "../apis/nationalParksApi";

import '../css/NewsReleases.css'

const NewsReleases = () => {

  const [releases, setReleases] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await NParksServiceRequest.getNewsReleases(5)
      console.log(response)
      setReleases(response)
    }
    getData()
  }, [])

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


  return (
    <div id="news-releases-inner-container">
      <h1>NewsReleases</h1>
      {releases && releases.map(item => {
        let forMattedDate = formatDate(item.releaseDate)
        return (
          <div key={item.id} className="news-release-item-container">
            {item.image.url
              ? <div className="news-release-image-container">
                  <img src={item.image.url}></img>
                </div>
              : <div className="news-release-missing-image-container">
                  <p>no image</p>
                </div>
            }
            <div className="news-release-info-container">
              <a href={item.url} target="_blank">
                <h4 className="news-release-title">{item.title}</h4>
              </a>
              <p className="news-release-abstract">{item.abstract}</p>
              <p className="news-release-date">{forMattedDate}</p>
              
            </div>
          </div>
        )
      })
      }
    </div>
  )
}

export default NewsReleases;