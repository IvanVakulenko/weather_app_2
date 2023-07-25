
<script setup>

import { defineProps, computed } from 'vue'
import { getTime } from '../utils/index.js'
import ChartCard from './ChartCard.vue'

import { Line } from 'vue-chartjs'

const PRESSURE_UNITS = 0.75006375541921;

const props = defineProps({
    weatherInfo: {
        type: [Object, null],
        required: true,
    },
  
})


const formatTime = (dt) => {
  const date = new Date(dt * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

const getDay = (dt) => {
        const date = new Date(dt * 1000);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }

const today = new Date().toLocaleString('en-EN', {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })

const timeZone = computed(() => props.weatherInfo?.timezone);

const sunriseTime = computed(() => {
    return getTime(props.weatherInfo?.sys.sunrise + timeZone.value);
});

const sunsetTime = computed(() => {
    return getTime(props.weatherInfo?.sys.sunset + timeZone.value);
});

const getWindDirection = (deg) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(deg / 45) % 8;
        return directions[index];
}

const getPressureMm = (hpa) => {
    return Math.round(hpa * PRESSURE_UNITS)
}

const getHourlyForecast = (dt) => {
  const date = new Date(dt * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

const getHourlyForecastTemp = (temp) => {
  return `${Math.round(temp)}°C`;
}

const getHourlyForecastIcon = (icon) => {
  return `./src/components/img/weather-main/${icon}.png`;
}

const getHourlyForecastDescription = (description) => {
  return `${description}`;
}

</script>

<template>
    
    <h2>Hourly weather forecast</h2>
    <div class="hour-forecast" >
      
      <div class="hour-forecast-item">
        <div class="hour-forecast-item-time">
            {{ getHourlyForecast(weatherInfo?.dt) }}
        </div>
        <div class="hour-forecast-item-temp">
            {{ getHourlyForecastTemp(weatherInfo?.main?.temp) }}
        </div>
        <div :style="`background-image: url('./src/components/img/weather-main/${weatherInfo.weather[0].description}.png');`"
             class="hour-forecast-item-icon">
        </div>
        <div class="hour-forecast-item-description">
            {{ getHourlyForecastDescription(weatherInfo?.weather[0]?.description) }}
        </div>
      </div>
    
      <div class="hour-forecast-item">
        <div class="hour-forecast-item-time">
            {{ getHourlyForecast(weatherInfo?.dt + 3600) }}
        </div>
        <div class="hour-forecast-item-temp">
            {{ getHourlyForecastTemp(weatherInfo?.main?.temp) }}
        </div>
        <div :style="`background-image: url('./src/components/img/weather-main/${weatherInfo.weather[0].description}.png');`"
        class="hour-forecast-item-icon">
          <!-- <img :src="#" /> -->
        </div>
        <div class="hour-forecast-item-description">
            {{ getHourlyForecastDescription(weatherInfo?.weather[0]?.description) }}
        </div>
      </div>

      <div class="hour-forecast-item">
        <div class="hour-forecast-item-time">
            {{ getHourlyForecast(weatherInfo?.dt + 7200) }}
        </div>
        <div class="hour-forecast-item-temp">
            {{ getHourlyForecastTemp(weatherInfo?.main?.temp + 2) }}
        </div>
        <div :style="`background-image: url('./src/components/img/weather-main/${weatherInfo.weather[0].description}.png');`"
        class="hour-forecast-item-icon">
          <!-- <img :src="#" /> -->
        </div>
        <div class="hour-forecast-item-description">
            {{ getHourlyForecastDescription(weatherInfo?.weather[0]?.description) }}
        </div>
      </div>
 
      <div class="hour-forecast-item">
        <div class="hour-forecast-item-time">Sun, 06:00</div>
        <div class="hour-forecast-item-temp">20°C</div>
        <div class="hour-forecast-item-icon">
          <!-- <img :src="#" /> -->
        </div>
        <div class="hour-forecast-item-description">Cloudy</div>
      </div>
  
      <div class="hour-forecast-item">
        <div class="hour-forecast-item-time">Sun, 08:00</div>
        <div class="hour-forecast-item-temp">20°C</div>
        <div class="hour-forecast-item-icon">
          <!-- <img :src="#" /> -->
        </div>
        <div class="hour-forecast-item-description">Cloudy</div>
      </div>
    
      <div class="hour-forecast-item">
        <div class="hour-forecast-item-time">Sun, 10:00</div>
        <div class="hour-forecast-item-temp">20°C</div>
        <div class="hour-forecast-item-icon">
          <!-- <img :src="#" /> -->
        </div>
        <div class="hour-forecast-item-description">Cloudy</div>
      </div>
    
      <div class="hour-forecast-item">
        <div class="hour-forecast-item-time">Sun, 12:00</div>
        <div class="hour-forecast-item-temp">20°C</div>
        <div class="hour-forecast-item-icon">
          <!-- <img :src="#" /> -->
        </div>
        <div class="hour-forecast-item-description">Cloudy</div>
      </div>
    </div>
</template>


<style lang="css" scoped>
/* Add style for chart.js */
#chartLine {
  width: 100%;
  height: 100%;
}
.hour-forecast {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.hour-forecast h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}


.hour-forecast-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.hour-forecast-item-time {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.hour-forecast-item-temp {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.hour-forecast-item-icon {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
  margin-bottom: 10px;
}

.hour-forecast-item-description {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}


</style>
```

