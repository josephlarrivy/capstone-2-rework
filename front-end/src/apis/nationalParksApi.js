import axios from "axios";

import { parks_api_key } from "../keys";

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
    return parksArray
  }

  static async getSingleParkData(code) {
    const resp = await this.makeRequest(`/parks?parkCode=${code}`)
    const singleParkData = (resp.data.data[0])
    return singleParkData
  }

  static async getRandomImages(limit = '700') {
    const resp = await this.makeRequest(`/parks?limit=${limit}`)
    const list = resp.data.data

    const idxArr = []
    while (idxArr.length < 10) {
      const num = Math.floor(Math.random()*468)
      if (!idxArr.includes(num)) {
        idxArr.push(num)
      }
    }

    const parksArray = []
    for (let park of list) {
      parksArray.push(park)
    }
    console.log(parksArray)

    const imagesArray = []
    for (let idx of idxArr) {
      const parkName = parksArray[idx].name
      const imageUrl = parksArray[idx].images[0].url
      imagesArray.push({parkName, imageUrl})
    }
    
    return imagesArray
  }

}

export default NParksServiceRequest;