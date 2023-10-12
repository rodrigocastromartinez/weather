import axios from 'axios'

const key = import.meta.env.VITE_OPEN_WEATHER_API_KEY

/**
 * Gets coordinates for a given city
 * @param {string} city city's name
 * @returns {object} object with lat property (latitude) and lon property (longitude)
 */

export default function getCityCoordinates(city: string) {
    try {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`
    
        return axios.get(url).then(res => {
            return res.data[0]
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        console.log(error.message)
    }
}