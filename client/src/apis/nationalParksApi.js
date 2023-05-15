import axios from "axios";
// require('dotenv').config()

const PARKS_BASE_URL = "https://developer.nps.gov/api/v1";

class NParksServiceRequest {

  static async makeRequest(endpoint) {
    try {
      const headers = { "X-Api-Key": 'aQURbVL0l6KSazH3ySz8QZw6ZfblDs0gAWsGhKAm' };
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

  static async getNewsReleases(limit='5') {
    const resp = await this.makeRequest(`/newsreleases?limit=${limit}`)
    return resp.data.data
  }

  static async getAlerts(limit='9') {
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

  static async getParksByState(state) {
    const resp = await this.makeRequest(`/parks?stateCode=${state}`)
    return resp.data.data
  }

  static async searchInParks(searchTerm, limit='10') {
    const resp = await this.makeRequest(`/parks?stateCode=&q=${searchTerm}&limit=${limit}`)
    return resp.data.data
  }

  static async searchInArticles(searchTerm, limit='10') {
    const resp = await this.makeRequest(`/articles?stateCode=&q=${searchTerm}&limit=${limit}`)
    return resp.data.data
  }

  static async searchInTours(searchTerm, limit = '9') {
    const resp = await this.makeRequest(`/tours?stateCode=&q=${searchTerm}&limit=${limit}`)
    return resp.data.data
  }

  static async getTourDetails(id) {
    const resp = await this.makeRequest(`/tours?id=${id}`)
    return resp.data.data[0]
  }

  static async getToursByParkCode(code) {
    const toursArray = [];
    const resp = await this.makeRequest(`/tours?id=&parkCode=${code}`)
    for (let tour of resp.data.data) {
      toursArray.push({'id' : tour.id, 'title' : tour.title})
    }
    if (toursArray.length > 0) {
      return toursArray
    } else {
      return null
    }
  }

  static async getParkLatLong(code) {
    const resp = await this.makeRequest(`/parks?parkCode=${code}`)
    const latitude = resp.data.data[0].latitude
    const longitude = resp.data.data[0].longitude
    return {latitude, longitude}
  }

  static async getSingleParkImages(code) {
    const resp = await this.makeRequest(`/parks?parkCode=${code}`)
    const imagesArr = []
    for (let image of resp.data.data[0].images) {
      imagesArr.push(
        { 'url': image.url,
        'credit': image.credit }
      )
    }
    return imagesArr
  }

  static async getAlertsByParkCode(code) {
    const resp = await this.makeRequest(`/alerts?parkCode=${code}`)
    if (resp.data.data.length > 0) {
      return resp.data.data
    } else {
      return null
    }
  }

  static async getEventsByDates(startDate, endDate, pageSize, pageNumber) {
    const resp = await this.makeRequest(`/events?dateStart=${startDate}&dateEnd=${endDate}&pageSize=${pageSize}&pageNumber=${pageNumber}`)
    return resp.data.data
  }

  static async getCampgroundsByPark(code) {
    const resp = await this.makeRequest(`/campgrounds?parkCode=${code}`)
    return resp.data.data
  }

  static async getCampgroundDetails(id) {
    const resp = await this.makeRequest(`/campgrounds?q=${id}`)
    return resp.data.data[0]
  }

}

export default NParksServiceRequest;