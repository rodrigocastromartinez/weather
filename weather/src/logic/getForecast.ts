import axios from 'axios'

/**
 * Gets forecast for a given location
 * @param {number} lat location latitude
 * @param {number} lon location longitude
 * @returns {Promise} forecast for the given location
 */

export default function getForecast(lat: number, lon: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&current_weather=true&timeformat=unixtime&timezone=Europe%2FBerlin`

    return axios.get(url)
}