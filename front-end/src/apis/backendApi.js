import axios from "axios";
import jwtDecode from "jwt-decode";


const BASE_URL = "http://localhost:3001";

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
    // console.log('formData:', formData)
    const data = formData;
    console.log('backendApi:', data)
    return (
      await this.makeRequest('post', '/trip/addTripName', null, data)
    )
  }

  static async getUserTrips(username) {
    console.log('getUserTrips (username)', username)
    console.log('checkpoint 1')
    if (username) {
      console.log('checkpoint 2')
      const params = { 'username': username };
      try {
        console.log('checkpoint 3')
        let returnData = await this.makeRequest('get', '/trip/getTrips', null, null, null, params)
        console.log('getUserTrips returnData:', returnData)
        console.log('checkpoint 4')
        return returnData
      } catch (err) {
        console.log('checkpoint 5')
        console.error(err);
        return err;
      }
    } else {
      console.log('checkpoint 6')
      return 'waiting'
    }
  }


}

export default BackendApiRequest;