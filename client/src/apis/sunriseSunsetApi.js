import axios from "axios";


class SunriseSunset {


  static formatDate(isoString) {
    const date = new Date(isoString);
    const hours24 = date.getHours();
    const hours12 = (hours24 % 12) || 12;
    const minutes = date.getMinutes();
    const amPm = hours24 >= 12 ? 'PM' : 'AM';

    const formattedHours = String(hours12).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  }

  static async getSunriseSunset (latitude, longitude) {
    try {
      const url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`;
      const response = await axios.get(url);

      const formattedData = 
        {
          "sunrise": this.formatDate(response.data.results.sunrise),
          "sunset": this.formatDate(response.data.results.sunset)
        }

      return formattedData
    } catch (error) {
      console.error(`Error fetching sunrise-sunset data: ${error.message}`);
      return null;
    }
  }
}

export default SunriseSunset;