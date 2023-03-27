import axios from "axios";

import { parks_api_key } from "./keys";

const PARKS_BASE_URL = "https://developer.nps.gov/api/v1";

class NParksServiceRequest {

  static async makeRequest(endpoint) {
    try {
      const headers = { "X-Api-Key": parks_api_key };
      const method = 'get'
      const url = `${PARKS_BASE_URL}${endpoint}`
      const resp = await axios({ method, url, headers })
      // console.log(url)
      return (resp)
    } catch (err) {
      console.error(err);
    }
  }

  static async getAllParks(limit='700') {
    const resp = await this.makeRequest(`/parks?limit=${limit}`)
    const list = resp.data.data

    const parksArray = []
    for (let park of list) {
      parksArray.push(park)
    }
    // console.log(parksArray)
    return parksArray
  }

  static async getSingleParkData(code) {
    const resp = await this.makeRequest(`/parks?parkCode=${code}`)
    const singleParkData = (resp.data.data[0])
    return singleParkData
  }


}

export default NParksServiceRequest;