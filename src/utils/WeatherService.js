import axios from 'axios';

export default class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.openweathermap.org/data/2.5';
  }

  async fetchWeatherData(cityName) {
    const endpoint = '/weather';
    const params = {
      q: cityName,
      appid: this.apiKey,
      units: 'metric', // You can use 'imperial' for Fahrenheit units
    }

    try {
      const response = await axios.get(this.baseURL + endpoint, { params });
      return response.data;
    } catch (error) {
      // Handle error if the API request fails
      throw new Error('Failed to fetch weather data.');
    }
  }

  fetchCitySuggestions(searchText) {
    const endpoint = '/find';
    const params = {
      q: searchText,
      type: 'like',
      appid: this.apiKey,
    };

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(this.baseURL + endpoint, { params });
        const suggestions = response.data.list.map((item) => item.name);
        resolve(suggestions);
      } catch (error) {
        // Handle error if the API request fails
        reject(new Error('Failed to fetch city suggestions.'));
      }
    });
  }
}