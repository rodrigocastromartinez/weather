import { FormEvent, useState } from 'react'
import getForecast from '../logic/getForecast'
import getCityCoordinates from '../logic/getCityCoordinates'
import HourForecast from '../components/HourForecast'
import DayForecast from '../components/DayForecast'
import TopBar from '../components/TopBar'
import ChoiceButtons from '../components/ChoiceButtons'
import SearchForm from '../components/SearchForm'
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

interface HomeProps {
    setSubscriptionModal: (modal: boolean) => void
}

export default function Home({setSubscriptionModal}: HomeProps) {
    const[credits, setCredits] = useState<number>()
    const [searchValue, setSearchValue] = useState<string>('')
    const [forecast, setForecast] = useState()
    const [hourly, setHourly] = useState<Hourly>()
    const [daily, setDaily] = useState<Daily>()
    const [prediction, setPrediction] = useState('day')
    const [mode, setMode] = useState<string>(localStorage.mode)
    const [city, setCity] = useState<{name: string, country: string}>()
    const [error, setError] = useState<string>()
  
    initTE({ Ripple })

    const handleSearchCity = (event: FormEvent) => {
        event.preventDefault()
        try {
            const letters = /^[a-zA-Z]+$/
            if (searchValue === '' || !letters.test(searchValue)) {
                setError('⚠️City name not valid⚠️')

                return
            }

            if(localStorage.credits <= 0) {
                setSubscriptionModal(true)
                
                return
            } 
    
            getCityCoordinates(searchValue).then(city => {
                if(!city){
                    setError('⚠️City not found⚠️')

                    throw new Error('city not found')
                }
                setCity({name: city.name, country: city.country})

                getForecast(city.lat, city.lon).then(res => {
                    setError(undefined)
                    const hourly = {
                        relativehumidity_2m: res.data.hourly.relativehumidity_2m,
                        temperature_2m: res.data.hourly.temperature_2m,
                        time: res.data.hourly.time,
                        weathercode: res.data.hourly.weathercode,
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
                    localStorage.credits = localStorage.credits - 1
                    setCredits(localStorage.credits)
                }).catch(error => {
                    console.log(error.message)
                })
            }).catch(error => {
                console.log(error.message)
            })
        } catch(error: any) {
            console.log(error.message)
            setError('⚠️Error getting weather⚠️')
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }
    
    return <div className='h-full w-full'>
    <TopBar credits={credits} mode={mode} setMode={setMode} />
    <div className='h-5/6 w-full flex flex-col justify-center items-center gap-4 text-[var(--slate-700)]'>
    <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 w-full h-full">
        <SearchForm handleSearchCity={handleSearchCity} searchValue={searchValue} handleInputChange={handleInputChange} />
        {error && <p className='text-xl italic font-semibold'>{error}</p>}
        {!error && city && <p className='text-xl italic font-semibold rounded-md bg-[var(--slate-100-50)] backdrop-blur-md h-fit p-4'>{city.name}, {city.country}</p>}
        {!error && forecast && <ChoiceButtons prediction={prediction} setPrediction={setPrediction} />}
        {!error && daily && prediction === 'day' && <HourForecast hourly={hourly!} mode={mode} ></HourForecast>}
        {!error && hourly && prediction === 'week' && <DayForecast daily={daily!} mode={mode} ></DayForecast>}
    </div>
    </div>
    </div> 
}