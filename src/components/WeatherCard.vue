<template>
    <div class="weather-card">
      <!-- Put Weather card content here -->
      <div class="weather-card__main">
        <div class="weather-card__main__left">
          <h2 class="weather-card__main__left__city">{{ city.name }}</h2>
          <p class="weather-card__main__left__description">{{ city.weatherData.weather[0].description }}</p>
        </div>
        <div class="weather-card__main__right">
          <p class="weather-card__main__right__temp">{{ city.weatherData.main.temp }}°C</p>
          <p class="weather-card__main__right__feels-like">Feels like {{ city.weatherData.main.feels_like }}°C</p>
        </div>
        <div class="weather-card__main__bottom">
          <p class="weather-card__main__bottom__humidity">Humidity: {{ city.weatherData.main.humidity }}%</p>
          <p class="weather-card__main__bottom__wind">Wind: {{ city.weatherData.wind.speed }} m/s</p>
          <button class="weather-card__main__bottom__favorite-button" @click="toggleFavorite">
            <i class="fas fa-star" :class="{ 'fas fa-star': city.isFavorite, 'far fa-star': !city.isFavorite }"></i>
            <span v-if="city.isFavorite">Remove from favorites</span>
            <span v-else>Add to favorites</span>
          </button>
        </div>
      </div> 
    </div>
  </template>
  
  <script>
  export default {
    name: 'WeatherCard',
    props: {
      city: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        weatherData: null,
      };
    },
    mounted() {
      this.fetchWeatherData();
    },
    methods: {
    async fetchWeatherData() {
      try {
        // Use the City class to fetch weather data for the given city
        await this.city.fetchWeatherData();
        this.weatherData = this.city.weatherData;
      } catch (error) {
        // Handle error if weather data fetching fails
        console.error('Error fetching weather data:', error);
      }
    },
  },
};
</script>
  
  <style>
  /* Put WeatherCard CSS styles here */
  .weather-card {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: #fff;
  }
  .weather-card__main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .weather-card__main__left {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .weather-card__main__left__city {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
  .weather-card__main__left__description {
    font-size: 1.2rem;
    margin: 0;
  }
  .weather-card__main__right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .weather-card__main__right__temp {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
  }
  .weather-card__main__right__feels-like {
    font-size: 1.2rem;
    margin: 0;
  }
  .weather-card__main__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .weather-card__main__bottom__humidity {
    font-size: 1.2rem;
    margin: 0;
  }
  .weather-card__main__bottom__wind {
    font-size: 1.2rem;
    margin: 0;
  }
  .weather-card__main__bottom__favorite-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #f87979;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  .weather-card__main__bottom__favorite-button:hover {
    background-color: #f55f5f;
  }
  .weather-card__main__bottom__favorite-button i {
    margin-right: 0.5rem;
  }
  .weather-card__main__bottom__favorite-button i.fas {
    color: #f55f5f;
  }
  .weather-card__main__bottom__favorite-button span {
    display: none;
  }
  .weather-card__main__bottom__favorite-button:hover span {
    display: inline;
  }
  @media screen and (min-width: 768px) {
    .weather-card {
      max-width: 600px;
    }
  }
  @media screen and (min-width: 1024px) {
    .weather-card {
      max-width: 800px;
    }
  }
  @media screen and (min-width: 1280px) {
    .weather-card {
      max-width: 1000px;
    }
  }
  @media screen and (min-width: 1536px) {
    .weather-card {
      max-width: 1200px;
    }
  }
  @media screen and (min-width: 1792px) {
    .weather-card {
      max-width: 1400px;
    }
  }
  @media screen and (min-width: 2048px) {
    .weather-card {
      max-width: 1600px;
    }
  }
  @media screen and (min-width: 2304px) {
    .weather-card {
      max-width: 1800px;
    }
  }
  @media screen and (min-width: 2560px) {
    .weather-card {
      max-width: 2000px;
    }
  }
  @media screen and (min-width: 2816px) {
    .weather-card {
      max-width: 2200px;
    }
  }
  @media screen and (min-width: 3072px) {
    .weather-card {
      max-width: 2400px;
    }
  }
  @media screen and (min-width: 3328px) {
    .weather-card {
      max-width: 2600px;
    }
  }
  @media screen and (min-width: 3584px) {
    .weather-card {
      max-width: 2800px;
    }
  }
  @media screen and (min-width: 3840px) {
    .weather-card {
      max-width: 3000px;
    }
  }
  @media screen and (min-width: 4096px) {
    .weather-card {
      max-width: 3200px;
    }
  }
  @media screen and (min-width: 4352px) {
    .weather-card {
      max-width: 3400px;
    }
  }
  @media screen and (min-width: 4608px) {
    .weather-card {
      max-width: 3600px;
    }
  }
  @media screen and (min-width: 4864px) {
    .weather-card {
      max-width: 3800px;
    }
  }
  @media screen and (min-width: 5120px) {
    .weather-card {
      max-width: 4000px;
    }
  }
  @media screen and (min-width: 5376px) {
    .weather-card {
      max-width: 4200px;
    }
  }
  @media screen and (min-width: 5632px) {
    .weather-card {
      max-width: 4400px;
    }
  }
  @media screen and (min-width: 5888px) {
    .weather-card {
      max-width: 4600px;
    }
  }
  </style>