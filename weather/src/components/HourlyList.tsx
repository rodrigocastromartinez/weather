import HourForecast from "./HourForecast"

interface HourlyListProps {
    hourly: {
        apparent_temperature: number[]
        precipitation_probability: number[]
        relativehumidity_2m: number[]
        temperature_2m: number[]
        time: number[]
        weathercode: number[]
        windspeed_10m: number[]
    }
}

export default function HourlyList({ hourly }: HourlyListProps) {
    console.log(hourly)

    return <>

    </>
}