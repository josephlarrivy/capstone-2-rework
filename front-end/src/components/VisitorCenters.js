import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";
import { useParams, useNavigate } from 'react-router-dom';
import useStateNameConverter from "../hooks/useStateNameConverter";
import NParksServiceRequest from "../apis/nationalParksApi";

import '../css/VisitorsCenters.css'
import AddToTripDropdown from "./AddToTripDropdown";

const VisitorCenters = ({token, setToken}) => {


  const { USstate } = useParams()
  const [stateName, convertStateName] = useStateNameConverter();
  const [data, setData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const response = await NParksServiceRequest.getVisitorCentersByState(USstate)
      console.log(response)
      setData(response)
    }
    getData()
    convertStateName(USstate)
  }, [])

  return (
    <div id="visitor-centers-main-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div id="visitor-centers-container">
        <h1>Visitor Centers in {stateName}</h1>
        <div id='visitor-centers-items'>
          {data && data.map(item => {
            return (
              <div key={item.id} className="visitor-centers-item">
                <div className="visitor-centers-item-image">
                  {item.images.length > 0
                    ? <div className="visitor-centers-item-image-container">
                        <img src={item.images[0].url}></img>
                      </div>
                    : <div className="visitor-centers-item-image-container">
                        <img src={require('../images/black.png')}></img>
                        {/* <p>no image</p> */}
                    </div>
                  }
                </div>
                <div className="visitor-centers-item-header">
                  <p className="visitor-center-name">{item.name}</p>


                  <div id="buttons-sub-container">

                    <button 
                      onClick={() => navigate(`/park/${item.parkCode}`)}>
                      Go To Park Details
                    </button>
                  
                  
                    <AddToTripDropdown
                      type='visitorCenter'
                      route={`/visitorcenters/${USstate}`}
                      name={item.name}
                      description={item.description}
                      parkcode={item.parkCode}
                      latitude={item.latitude}
                      longitude={item.longitude}
                    />
                  </div>



                  {item.addresses.length > 0
                    ? <p>{item.addresses[0].line1} {item.addresses[0].city}, {item.addresses[0].stateCode} {item.addresses[0].postalCode}</p>
                    : <p></p>
                  }
                  <p className="visitor-center-description">{item.description}</p>
                </div>
                <div className="visitor-centers-item-info">  
                  {item.contacts.emailAddresses.length > 0
                    ? <p>email: {item.contacts.emailAddresses[0].emailAddress}</p>
                    : <p></p>
                  }
                  {item.contacts.phoneNumbers.length > 0
                    ? <p>phone: {item.contacts.phoneNumbers[0].phoneNumber}</p>
                    : <p></p>
                  }
                </div>
                {/* <div className="operating-hours">
                  {item.operatingHours.length > 0
                    ? <p>operating hours</p>
                    : <p>hours not given</p>
                  }
                </div> */}
              </div>
            )
          })}
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  )
}

export default VisitorCenters;