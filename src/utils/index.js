const PRESSURE_UNITS = 0.750062


export const capitalizeFirstLetter = (str) => {
    if (!str) return ''

    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getPressureMm = (hpa) => {
    return Math.round(hpa * PRESSURE_UNITS)
}

export const getTime = (seconds) => {
    return new Date(seconds * 1000).toLocaleTimeString('un-EN', {timeZone: 'Atlantic/Reykjavik'})
}


//write formatHours function here
export const formatHour = (hours) => {
    const date = new Date(hours * 1000)
    const hoursString = date.getHours()
    return hoursString < 10 ? `0${hoursString}:00` : `${hoursString}:00`
}

//write getWeatherIcon function here
export const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/w/${icon}.png`
}


const getHumidity = (humidity) => {
    return humidity.toFixed(1);
}

const getVisibility = (visibility) => {
    return (visibility / 1000).toFixed(1);
}

const getFeelsLike = (feelsLike) => {
    return feelsLike.toFixed(1);
}

const getSunrise = (sunrise) => {
    const date = new Date(sunrise * 1000);
    return `${date.getHours()}:${date.getMinutes()}`;
}

const getSunset = (sunset) => {
    const date = new Date(sunset * 1000);
    return `${date.getHours()}:${date.getMinutes()}`;
}

const getDay = (dt) => {
    const date = new Date(dt * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}