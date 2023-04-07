import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import NParksServiceRequest from "../apis/nationalParksApi";
import NavBar from "../NavBar";
import useStateNameConverter from "../hooks/useStateNameConverter";
import Events from "./Events";
import Articles from "./Articles";
import ThingsToDo from "./ThingsToDo";

import '../css/Banner.css'
import Loading from "./Loading";

const Supplemental = ({token, setToken}) => {

  const [data, setData] = useState(null)
  const { type, USstate } = useParams()
  const [stateName, convertStateName] = useStateNameConverter();

  useEffect(() => {
    const getData = async () => {
      const response = await NParksServiceRequest.getSupplementalData(type, USstate)
      setData(response)
    }
    getData()
    convertStateName(USstate)
  }, [])

  return (
    <div id="supplemental-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      {data===null
      ? <Loading />
      : <div className="supplemental-main">
        {type==='events'&& 
          <Events stateName={stateName} data={data}/>
        }
        {type === 'articles' &&
          <Articles stateName={stateName} data={data}/>
        }
        {type === 'thingstodo' &&
          <ThingsToDo stateName={stateName} data={data} />
        }
        </div>
      }
    </div>
  )
}

export default Supplemental;