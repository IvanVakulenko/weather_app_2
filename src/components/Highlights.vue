<script setup>
import {  getTime } from '../utils/index.js'
import { computed } from 'vue'
import { capitalizeFirstLetter } from '../utils/index.js'


const props = defineProps({
    weatherInfo: {
        type: [Object, null],
        required: true,
    }
})

const PRESSURE_UNITS = 0.75006375541921;

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
</script>

<template>

<div class="section highlights">
        <div class="highlights-wrapper">
        <div class="highlight">
            <div class="card">
            <div class="card-title">
            </div>
            <div class="card-info">
                <div class="card-justify">
                <div class="info-main">
                    <div class="card-title">
                        Feels like
                    </div>
                    <div class="info-main-num">
                        {{ Math.round(weatherInfo?.main.feels_like) }}°C
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div class="card">
            <div class="card-info">
                <div class="card-justify">
                <div class="info-main">
                    <div class="card-title">
                        Low: 
                    </div>
                    <div class="info-main-num">
                        {{ Math.round(weatherInfo?.main?.temp_min) }} °C
                    </div>
                    <div class="card-title">
                        High: 
                    </div>
                    <div class="info-main-num">
                        {{ Math.round(weatherInfo?.main?.temp_max) }} °C
                    </div>   
                </div> 
                </div>
            </div>
            </div>
            <div class="card">
            <div class="card-title">
                Wind
            </div>
            <div class="card-info">
                <div class="card-justify">
                <div class="info-main">
                    <div class="info-main-num">
                        {{ Math.round(weatherInfo?.wind.speed) }}  m/s
                    </div>
                </div> 
                <div class="info-main">
                    <div class="info-main-num">
                        {{ getWindDirection(weatherInfo?.wind.deg) }} 
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="card">
            <div class="card-title">
                Pressure
            </div>
            <div class="card-info">
            <div class="card-justify">
                <div class="info-main">
                <div class="info-main-num">
                    {{ getPressureMm(weatherInfo?.main.pressure) }} mm
                </div>
                </div>
                <div class="card-title">
                Cloudiness
                </div>
                <div class="info-main">
                <div class="info-main-num">
                    {{ weatherInfo?.clouds.all }} %
                </div>
                </div>
                </div>
            </div>
            </div>
            <div class="card">
            <div class="card-info">
            <div class="card-justify">
                <div class="info-main">
                <div class="info-main-text">
                    Sunrise
                </div>
                <div class="info-main-num">
                    {{ sunriseTime }}
                </div>
                
                </div>
                <div class="info-main">
                <div class="info-main-text">
                    Sunset
                </div>
                <div class="info-main-num">
                    {{ sunsetTime }}
                </div>
                
                </div>
                </div>
            </div>
            </div>
            <div class="card">
            <div class="card-title">
            </div>
            <div class="card-info">
                <div class="card-justify">
                <div class="info-main">
                    <div class="card-title">
                        Humidity:  
                    </div>
                    <div class="info-main-num">
                        {{ weatherInfo?.main?.humidity }} %
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
    </div>

       


</template>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');


.section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.title {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
}


.highlights {
    margin-top: 20px;
    margin-bottom: 20px;
}

.highlights-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.highlight {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.card {
    width: 120px; 
    height: 250px; 
    background-color: #ffafcc;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.card-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #fff;
}

.card-pic {
    width: 100px;
    height: 100px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin-bottom: 20px;
}

.card-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
}

.info-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.info-main-num {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 10px;
}

.info-main-text {
    font-size: 16px;
    font-weight: 500;
}

.card-small-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
}

.card-small-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
}

.card-small-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.card-small-hint {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>