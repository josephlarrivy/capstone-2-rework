
import axios from 'axios';

class RecreationAPI {
  constructor() {
    this.apiKey = 'c11dbfdf-cc78-48d8-b7a4-77062b39b3bb';
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
 