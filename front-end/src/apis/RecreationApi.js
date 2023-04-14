import { recreation_api_key } from "../keys";
import axios from 'axios';

class RecreationAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://ridb.recreation.gov/api/v1';
  }

  async makeRequest(endpoint, params) {
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

  async searchFacilities(query) {
    const endpoint = 'facilities';
    const params = {
      query: query,
      activity: '', // Filter by activity (optional)
      state: '', // Filter by state (optional)
      limit: 10, // Number of results to return (optional)
      offset: 0 // Index of first result to return (optional)
    };
    const data = await this.makeRequest(endpoint, params);
    return data;
  }

  async getFacility(facilityID) {
    const endpoint = `facilities/${facilityID}`;
    const params = {
      // No additional parameters needed
    };
    const data = await this.makeRequest(endpoint, params);
    return data;
  }

  async searchRecAreas(query) {
    const endpoint = 'recareas';
    const params = {
      query: query,
      state: '', // Filter by state (optional)
      limit: 10, // Number of results to return (optional)
      offset: 0 // Index of first result to return (optional)
    };
    const data = await this.makeRequest(endpoint, params);
    return data;
  }

  async getRecArea(recAreaID) {
    const endpoint = `recareas/${recAreaID}`;
    const params = {
      // No additional parameters needed
    };
    const data = await this.makeRequest(endpoint, params);
    return data;
  }
}

export default RecreationAPI;
 