
class weatherAPI {
  constructor(weatherApiKey) {
    this.apiKey = weatherApiKey;
    this.baseURL = "https://api.openweathermap.org/data/2.5/forecast";
  }

  async getWeather(latitude, longitude) {
    const url = `${this.baseURL}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Unable to get weather data: ${response.status}`);
    }
    const data = await response.json();
    return this.formatData(data);
  }

  formatData(data) {
    const formattedData = [];
    for (let i = 0; i < 5; i++) {
      const weather = {
        date: new Date(data.list[i].dt * 1000),
        temperature: data.list[i].main.temp,
        description: data.list[i].weather[0].description,
        icon: data.list[i].weather[0].icon,
        iconUrl: `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
      };
      formattedData.push(weather);
    }
    return formattedData;
  }
}

export default weatherAPI;