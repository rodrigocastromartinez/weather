import { FormEvent, useState } from 'react'
import getForecast from '../logic/getForecast'
import getCityCoordinates from '../logic/getCityCoordinates'
import HourForecast from './HourForecast'
import DayForecast from './DayForecast'
import HourlyList from './HourlyList'
    // Initialization for ES Users
import {
    Ripple,
    initTE,
} from "tw-elements"

interface Hourly {
    relativehumidity_2m: number[],
    temperature_2m: number[],
    time: number[]
    weathercode: number[]
}

interface Daily {
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    time: number[]
    weathercode: number[]
}

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState<string>('')
    const [forecast, setForecast] = useState()
    const [hourly, setHourly] = useState<Hourly>({
        relativehumidity_2m: [],
        temperature_2m: [],
        time: [],
        weathercode: [],
    })
    const [daily, setDaily] = useState<Daily>({
        temperature_2m_max: [],
        temperature_2m_min: [],
        time: [],
        weathercode: []
    })
    const [prediction, setPrediction] = useState('day')
  
    initTE({ Ripple })

    const searchCity = (event: FormEvent) => {
        event.preventDefault()
        try {
            if (searchValue === '') return

            console.log(searchValue)
    
            getCityCoordinates(searchValue).then(coordinates => {
                if(!coordinates) throw new Error('Coordinates not found')

                getForecast(coordinates.lat, coordinates.lon).then(res => {
                    const hourly = {
                        relativehumidity_2m: res.data.daily.relativehumidity_2m,
                        temperature_2m: res.data.daily.temperature_2m,
                        time: res.data.daily.time,
                        weathercode: res.data.daily.weathercode,
                    }
                    setHourly(hourly)
                    setForecast(res.data)
                    const daily = {
                        temperature_2m_max: res.data.daily.temperature_2m_max,
                        temperature_2m_min: res.data.daily.temperature_2m_min,
                        time: res.data.daily.time,
                        weathercode: res.data.daily.weathercode,
                    }
                    setDaily(daily)
                }).catch(error => {
                    console.log(error.message)
                    alert('City not found')
                })
            })
        } catch(error: any) {
            console.log(error.message)
            alert('Error getting weather')
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    console.log(forecast)
    console.log(prediction)

    return <>
    <div className="flex flex-col justify-center items-center gap-6 w-full">
        <form className="flex rounded-md bg-slate-700/50 backdrop-blur-md h-fit" onSubmit={(event) => searchCity(event)}>
            <input 
            type="search" 
            className="text-lg text-slate-100 placeholder:text-slate-300 bg-transparent m-0 font-normal py-2 px-4 w-full focus:outline-input"
            placeholder="Search city"
            value={searchValue}
            onChange={handleInputChange}
            />
            <button className="flex items-center p-2" type="submit" ><span className="material-symbols-outlined text-slate-100 text-3xl" >search</span></button>
        </form>
        {forecast && <div className="flex">
            <div
            className="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            role="group">
                <button
                    type="button"
                    className={`inline-block rounded-l ${prediction === 'day' ? 'bg-primary-700' : 'bg-primary-600'} px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-500`}
                    onClick={() => setPrediction('day')}
                >
                    DAY
                </button>
                <button
                    type="button"
                    className={`inline-block rounded-r ${prediction === 'week' ? 'bg-primary-700' : 'bg-primary-600'} px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-500`}
                    onClick={() => setPrediction('week')}
                >
                WEEK
                </button>
            </div>
        </div>}
        {forecast && prediction === 'day' && <HourForecast forecast={forecast} ></HourForecast>}
        {forecast && prediction === 'day' && <HourlyList forecast={forecast.hourly} ></HourlyList>}
        {forecast && prediction === 'week' && <DayForecast daily={daily} ></DayForecast>}
    </div>
    </>
}