import { recreation_api_key } from "../keys";
import axios from 'axios';

class RecreationAPI {
  constructor() {
    this.apiKey = recreation_api_key;
    this.baseUrl = 'https://ridb.recreation.gov/api/v1';
  }

  static async makeRequest(endpoint, params) {
    const config = {
      headers: {
        'apikey': this.apiKey
      },
      params: params
    };
    const url = `${this.baseUrl}/${endpoint}`;
    const response = await axios.get(url, config);
    return response.data.RECDATA;
  }

}

export default RecreationAPI;
 