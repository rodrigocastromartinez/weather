import axios from 'axios'

const key = '7afed3f6606a5dc540c51522d0860c88'

export default function getHourlyForecast(city: string) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`

    return axios.get(url)
}

// https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&current_weather=true&timeformat=unixtime&timezone=Europe%2FBerlin