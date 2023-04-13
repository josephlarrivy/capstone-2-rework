import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";

import '../css/PlanATripMain.css'
import useTripPlanningLocalStorage from "../hooks/useTripPlanningLocalStorage";
import NParksServiceRequest from "../apis/nationalParksApi";
import DateSelector from "./DateSelector";

const PlanEventsTrip = (token, setToken) => {

  const [saveTripType, saveStartDate, saveEndDate, updateTripData, clearTripDates, getTripData] = useTripPlanningLocalStorage()
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pageSize, setPageSize] = useState(40)
  const [startSelectedDate, setStartSelectedDate] = useState(startDate);
  const [endSelectedDate, setEndSelectedDate] = useState(endDate);
  const [data, setData] = useState(null)


  useEffect(() => {
    const tripData = getTripData()
    console.log(tripData)
    setStartDate(reformatDate(tripData.startDate))
    setEndDate(reformatDate(tripData.endDate))
  }, [])

  useEffect(() => {
    const getEvents = async () => {
      const response = await NParksServiceRequest.getEventsByDates(startDate, endDate, pageSize, 1)
      console.log(response)
      setData(response)
    }
    getEvents()
    console.log(pageSize)
  }, [startDate, endDate, pageSize])

  function reformatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function convertDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split(' ');
    return { month: month, day: parseInt(day), year: parseInt(year) };
  }

  const getMoreEvents = () => {
    setPageSize(pageSize + 20)
  }

  let formattedStartSearchDate = convertDate((startDate))
  let formattedEndSearchDate = convertDate((endDate))


  return (
    <div id="plan-a-trip-full-container">
      <NavBar
        token={token}
        setToken={setToken} />
      <div id="plan-a-trip-page-container">
        <div id="events-trip-header">
          <h1>Plan and event-related trip</h1>
          <div id="change-params-controls">
            <h1>test</h1>
          </div>
          <div id="dates-header-container">
            <div className="search-events-start-end">
              <p className="search-event-month">{formattedStartSearchDate.month}</p>
              <p className="search-event-day">{formattedStartSearchDate.day}</p>
              <p className="search-event-year">{formattedStartSearchDate.year}</p>
            </div>
            <div className="search-events-start-end">
              <p className="search-event-month">{formattedEndSearchDate.month}</p>
              <p className="search-event-day">{formattedEndSearchDate.day}</p>
              <p className="search-event-year">{formattedEndSearchDate.year}</p>
            </div>
          </div>
        </div>




        <div id="events-main-container">
          {/* <h1>Events in {stateName}</h1> */}
          {data && data.map(item => {

            let formattedDate = convertDate(item.date)

            return (
                <div key={item.id} className="events-item-container">
                  <div className="events-item-date">
                    <p className="event-month">{formattedDate.month}</p>
                    <p className="event-day">{formattedDate.day}</p>
                    <p className="event-year">{formattedDate.year}</p>
                    <hr></hr>
                    <p className="event-times">{item.times[0].timestart}</p>
                  </div>
                  <div className="events-item-container-main">
                    {item.images.length > 0
                      ? <div className="events-item-image-container">
                        <img src={`https://www.nps.gov${item.images[0].url}`}></img>
                      </div>
                      : <div
                        className="events-item-image-container">
                        <img src={require('../images/black.png')}></img>
                        <p>no image</p>
                      </div>
                    }
                    <h4>{item.title}</h4>
                    <p>{item.parkfullname}</p>
                    {item.location
                      ? <p><b>Location:</b> {item.location}</p>
                      : <p><b>Location:</b> See details</p>
                    }
                    <p className="event-times"><b>Time:</b> {item.times[0].timestart} - {item.times[0].timeend}</p>
                    {item.timeinfo
                      ? <>
                        <hr></hr>
                        <p>Time details: {item.timeinfo}</p>
                      </>
                      : <p></p>
                    }
                  </div>
                  <div className="events-item-container-other">

                    {item.isfree
                      ? <p><b>Cost:</b> Free</p>
                      : <p><b>Cost:</b> Not Free</p>
                    }
                    <p><b>Category:</b> {item.category}</p>
                    <p>
                      <b>Types:</b>{" "}
                      {item.types && (
                        <span>{item.types.join(", ")}</span>
                      )}
                    </p>
                  </div>
                </div>
            )
          })}
        </div>

        <button id='load-more-home-button-alerts' onClick={getMoreEvents}>See More Events</button>


        {/* <div id="date-pickers">
          <div id="date-start">
            <h2>Select a start date:</h2>
            <DateSelector selectedDate={startSelectedDate} setSelectedDate={setStartSelectedDate} />
          </div>
          <div id="date-end">
            <h2>Select an end date:</h2>
            <DateSelector selectedDate={endSelectedDate} setSelectedDate={setEndSelectedDate} />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default PlanEventsTrip;