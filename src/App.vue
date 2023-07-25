<script setup>
import { API_KEY, BASE_URL } from './constants';
import { MAP_API_KEY } from './constants';
import { ref, onMounted, computed } from 'vue';

import WeatherSummary from './components/WeatherSummary.vue';
import Highlights from './components/Highlights.vue';
import TopCity from './components/TopCity.vue';
import ChartCard from './components/ChartCard.vue';

import axios from 'axios';


const searchQuery = ref('Kyiv');
const queryTimeout = ref(null);
const citySearchResult = ref(null);
const searchError = ref(null);
const showSearchResults = ref(false);

function hideSearchResults() {
  showSearchResults.value = true; 
}

const getSearchResult = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${MAP_API_KEY}&types=place&limit=5&autocomplete=true`
        );
        citySearchResult.value = result.data.features;
      } catch {
        searchError.value = true;
      }

      // console.log(citySearchResult.value);
      return;
    }
    citySearchResult.value = null;
  }, 300);
};

const changeCity = (city) => {
  searchQuery.value = city;
  getWeather();

};

const weatherInfo = ref(null);
const isError = computed(() => weatherInfo.value?.cod !== 200);

async function getWeather() {
  try {
    const response = await fetch(`${BASE_URL}?q=${searchQuery.value}&units=metric&appid=${API_KEY}`);
    const data = await response.json();
    weatherInfo.value = data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfo.value = null;
  }
}

onMounted(getWeather);

</script>

<template>
  <div class="app">
    <div class="container">
      <main class="main">
        <div class="top-cities">
          <TopCity :weatherInfo="weatherInfo" :changeCity="changeCity" />
        </div>
        <div class="search">
          <div class="search-wrapper">
            <div class="search-input">
              <input
                type="text"
                v-model="searchQuery"
                @input="getSearchResult"
                @focus="showSearchResults = true"
                @blur="hideSearchResults"
                @keyup.enter="getWeather"
                placeholder="Search for places..."
              />
              <ul v-if="showSearchResults && citySearchResult" class="search-results">
                      <li
                        v-for="searchResult in citySearchResult"
                        :key="searchResult.id"
                        class="search-result"
                        @click="changeCity(searchResult.place_name); showSearchResults = false; "
                        
                      >
                        {{ searchResult.place_name }}
                      </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="weather-info" v-if="weatherInfo">
          <div class="weather-summary-highlights">
            <WeatherSummary :weatherInfo="weatherInfo" />
            <Highlights :weatherInfo="weatherInfo" />
          </div>
        </div>
        <div class="chart-card" >
            <ChartCard />
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


.app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.page {
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
}

.main {
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
}

.weather-info {
  margin-top: 10px;

}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.top-cities {
  margin-bottom: 20px;
}

.chart-card{
  display: block;
  justify-content: center;
  align-items: center;


}

.search {
  margin-bottom: 5px;
}

.search-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}



.search-input {
  position: relative;
  width: 100%;
}


.search-input input {
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  background-color: #ffafcc;
  color: #fff;
}



.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px 0;
  z-index: 1;
}

.search-result {
  padding: 10px 20px;
  cursor: pointer;
}
.search-result:hover {
  background-color: #a2d2ff;
}
</style>
