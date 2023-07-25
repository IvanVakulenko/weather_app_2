import WeatherService from './WeatherService.js';

export default class City {
  constructor(name) {
    this.name = name;
    this.weatherData = null;
    this.weatherService = new WeatherService('1fd483147332f485b277c0e2647b9c3f');
  }

  async fetchWeatherData() {
    try {
      // Use the WeatherService to fetch weather data from the API for the given city
      this.weatherData = await this.weatherService.fetchWeatherData(this.name);
    } catch (error) {
      // Handle error if the API request fails
      console.error('Error fetching weather data:', error);
    }
  }
}