


class weatherAPI {
  constructor(weatherApiKey) {
    this.apiKey = "0486eaf725aeecc834735c80086222e9";
    this.baseURL = "https://api.openweathermap.org/data/2.5/forecast";
  }

  convertCELtoFAH = (num) => {
    const converted = Math.floor(num*1.8+32)
    return converted
  }

  async getWeather(latitude, longitude) {
    const url = `${this.baseURL}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Unable to get weather data: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data)
    return this.formatData(data);
  }

  formatData(data) {
    const formattedData = [];
    for (let i = 0; i < 5; i+=2) {
      const convertedTemp = this.convertCELtoFAH(data.list[i].main.temp)
      const weather = {
        date: new Date(data.list[i].dt * 1000),
        temperature: convertedTemp,
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