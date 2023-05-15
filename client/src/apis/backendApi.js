import axios from "axios";
import jwtDecode from "jwt-decode";


// const BASE_URL = "http://localhost:3001";
const BASE_URL = 'https://parkexplorerpro-server.herokuapp.com'

class BackendApiRequest {

  static async makeRequest(method, endpoint, token = null, data = {}, body = {}, params = {}) {
    try {
      const headers = { authorization: `Bearer ${token}` }
      return (
        await axios({ method, url: `${BASE_URL}${endpoint}`, data, body, headers, params })
      );
    } catch (err) {
      console.log('catching error in API')
      console.error(err);
      return err
    }
  }



  static async test(data) {
    const resp = await this.makeRequest('get', '/auth/test', null, data)
    console.log(resp)
    return resp
  }

  static async registerNewUser(formData) {
    const data = formData;
    console.log('register')
    return (
      await this.makeRequest('post', '/auth/register', null, data)
    )
  }

  static async login(formData) {
    const data = formData;
    console.log('login')
    return (
      await this.makeRequest('post', '/auth/login', null, data)
    )
  }

  static decodeToken(token) {
    try {
      return jwtDecode(token)
    } catch {
      return 'invalid'
    }
  }

  static async addTripName(formData) {
    const data = formData;
    console.log('backendApi:', data)
    return (
      await this.makeRequest('post', '/trip/addTripName', null, data)
    )
  }

  static async getUserTrips(username) {
    const params = { 'username': username };
    try {
      const response = await this.makeRequest('get', '/trip/getTrips', null, null, null, params);
      return response.data.data;
    } catch (err) {
      return err;
    }
  }

  static async deleteTrip(tripname) {
    const params = { 'tripname': tripname };
    try {
      const response = await this.makeRequest('post', '/trip/deleteTrip', null, null, null, params);
      return response
    } catch (err) {
      return err;
    }
  }

  static async addTripItem(type, route, name, description, parkcode, latitude, longitude, id) {
    if (!description) {
      description = 'no description';
    }
    const data = { type, route, name, description, parkcode, latitude, longitude, id }
    return (
      await this.makeRequest('post', '/trip/addTripItem', null, data)
    )
  }

  static async getItemsByTripId(id) {
    const params = { 'id': id };
    try {
      const response = await this.makeRequest('get', '/trip/getTripItems', null, null, null, params);
      return response.data.data;
    } catch (err) {
      return err;
    }
  }

  static async deleteItem(itemid) {
    const params = { 'itemid': itemid };
    try {
      const response = await this.makeRequest('post', '/trip/deleteItem', null, null, null, params);
      return response
    } catch (err) {
      return err;
    }
  }

}

export default BackendApiRequest;