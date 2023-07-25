<script setup>
import { capitalizeFirstLetter } from '../utils/index.js'

const props = defineProps({
    weatherInfo: {
        type: [Object, null],
        required: true,
    },
  
})

const today = new Date().toLocaleString('en-EN', {weekday: 'long', month: 'long', day: 'numeric' })
</script>

<template>
  
    <div class="summary">
      
        
        <div class="weather">
            <div class="weather-desc text-block" >
              <div class="temp" >
                {{ Math.round(weatherInfo?.main?.temp) }} °C
              </div>
              {{ capitalizeFirstLetter(weatherInfo?.weather[0]?.description) }}
            </div>
        </div>
        <div class="city text-block">
            {{ weatherInfo?.name }},
            {{ weatherInfo?.sys?.country }}
        </div>
        <div class="date text-block">
            {{ today }}
        </div>
    </div>
</template>
<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
}

body {
  display: flex;
}

.pic-main {
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: center;

}

.weather {
  margin-bottom: 20px;
  color: #fff;
}

.temp {
  font-size: 100px;
  margin-bottom: 0;
  color: #fff;
}

.humidity {
  font-size: 30px;
  margin-bottom: 0;
  text-align: center;
  color: #fff;
  
}

.city {
  font-size: 60px;
  margin-bottom: 0;
  color: #fff;
}

.date {
  font-size: 30px;
  color: #fff;
 
}

.text-block {
  text-align: center;
}

.weather-desc {
  text-transform: capitalize;
}


@media (min-width: 768px) {
  .summary {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px 40px;
  }

  .pic-main {
    width: 100px;
    height: 100px;
    margin: 0;
  }

  .weather {
    margin: 0;
  }

  .temp {
    font-size: 60px;
    margin-bottom: 0;
  }

  .humidity {
    font-size: 20px;
    margin-bottom: 0;
  }

  .city {
    font-size: 40px;
    margin-bottom: 0;
  }

  .date {
    font-size: 20px;
  }
}
</style>