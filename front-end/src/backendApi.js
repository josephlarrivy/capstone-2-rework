import axios from "axios";
// import { control } from "leaflet";
// const jwt_decode = require("jwt-decode");
import jwtDecode from "jwt-decode";

const BASE_URL = "http://localhost:3001";

class BackendApiRequest {

  static async makeRequest(method, endpoint, token=null, data={}) {
    try {
      const headers = { authorization : `Bearer ${token}` }
      return (
        await axios({method, url: `${BASE_URL}${endpoint}`, data, headers})
      );
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }


  static async test(data) {
    const resp = await this.makeRequest('get', '/auth/test', null, data)
    console.log(resp)
  }

  static async registerNewUser(formData) {
    const data = formData;
    return (
      await this.makeRequest('post', '/auth/register', null, data)
    )
  }

  static async login(formData) {
    const data = formData;
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

}

export default BackendApiRequest;