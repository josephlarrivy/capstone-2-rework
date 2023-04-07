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
    return resp.data.data[0]
  }

  static async getRandomImages(limit = '700') {
    const resp = await this.makeRequest(`/parks?limit=${limit}`)
    const list = resp.data.data

    const idxArr = []
    while (idxArr.length < 12) {
      const num = Math.floor(Math.random()*468)
      if (!idxArr.includes(num)) {
        idxArr.push(num)
      }
    }

    const parksArray = []
    for (let park of list) {
      parksArray.push(park)
    }
    // console.log(parksArray)

    const imagesArray = []
    for (let idx of idxArr) {
      const parkName = parksArray[idx].name
      const imageUrl = parksArray[idx].images[0].url
      const state = parksArray[idx].states
      const parkCode = parksArray[idx].parkCode
      imagesArray.push({parkName, imageUrl, state, parkCode})
    }
    
    return imagesArray
  }

  static async getSupplementalData(type, USstate) {
    const resp = await this.makeRequest(`/${type}?stateCode=${USstate}`)
    return resp.data.data
  }

  static async getNewsReleases(limit = '5') {
    const resp = await this.makeRequest(`/newsreleases?limit=${limit}`)
    return resp.data.data
  }

  static async getAlerts(limit = '9') {
    const resp = await this.makeRequest(`/alerts?stateCode=&limit=${limit}`)
    return resp.data.data
  }

  static async getParkName(code) {
    const resp = await this.makeRequest(`/parks?parkCode=${code}`)
    return resp.data.data[0].fullName
  }

  static async getVisitorCentersByState(state) {
    const resp = await this.makeRequest(`/visitorcenters?stateCode=${state}`)
    return resp.data.data
  }

}

export default NParksServiceRequest;