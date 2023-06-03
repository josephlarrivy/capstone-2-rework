import NParksServiceRequest from './NParksServiceRequest';

describe('NParksServiceRequest', () => {
  test('makeRequest should return response from the API', async () => {
    const endpoint = '/parks';

    // Mock the axios function to return a mock response
    const mockResponse = {
      data: {
        exampleData: 'test data',
      },
    };
    jest.spyOn(axios, 'request').mockResolvedValue(mockResponse);

    // Call the method and assert the response
    const response = await NParksServiceRequest.makeRequest(endpoint);

    expect(axios.request).toHaveBeenCalledWith({
      method: 'get',
      url: `https://developer.nps.gov/api/v1${endpoint}`,
      headers: {
        'X-Api-Key': 'aQURbVL0l6KSazH3ySz8QZw6ZfblDs0gAWsGhKAm',
      },
    });
    expect(response).toEqual(mockResponse);
  });
});
