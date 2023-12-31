import { FormEvent, useState, useRef } from 'react'
import getForecast from '../logic/getForecast'
import getCityCoordinates from '../logic/getCityCoordinates'
import HourForecast from '../components/HourForecast'
import DayForecast from '../components/DayForecast'
import TopBar from '../components/TopBar'
import ChoiceButtons from '../components/ChoiceButtons'
import SearchForm from '../components/SearchForm'
import useAppContext from '../hooks/useAppContext'
import decreaseCredit from '../logic/decreaseCredit'
import retrieveCredits from '../logic/retrieveCredits'

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

    const { freeze, unfreeze } = useAppContext()!

    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleSearchCity = (event: FormEvent) => {
        freeze()

        event.preventDefault()

        try {
            inputRef.current?.blur()

            const letters = /^[a-zA-Z\s]+$/
            if (searchValue === '' || !letters.test(searchValue)) {
                unfreeze()

                setError('⚠️City name not valid⚠️')

                return
            }

            const credits = retrieveCredits()

            if(credits <= 0) {
                unfreeze()

                setSubscriptionModal(true)
                
                return
            } 
    
            getCityCoordinates(searchValue)?.then(city => {
                if(!city){
                    unfreeze()

                    setError('⚠️City not found⚠️')

                    throw new Error('city not found')
                }

                setCity({name: city.name, country: city.country})

                getForecast(city.lat, city.lon)?.then(res => {
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
                    const credits = decreaseCredit()
                    setCredits(credits)
                    unfreeze()
                }).catch(error => {
                    unfreeze()
                    console.log(error.message)
                })
            }).catch(error => {
                unfreeze()
                console.log(error.message)
            })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(error: any) {
            unfreeze()
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
        <SearchForm handleSearchCity={handleSearchCity} searchValue={searchValue} handleInputChange={handleInputChange} inputRef={inputRef} />
        {error && <p className='text-xl italic rounded-md font-semibold bg-[var(--slate-100-50)] backdrop-blur-md h-fit p-4'>{error}</p>}
        {!error && city && <p className='text-xl italic font-semibold rounded-md bg-[var(--slate-100-50)] backdrop-blur-md h-fit p-4'>{city.name}, {city.country}</p>}
        {!error && forecast && <ChoiceButtons prediction={prediction} setPrediction={setPrediction} />}
        {!error && daily && prediction === 'day' && <HourForecast hourly={hourly!} mode={mode} ></HourForecast>}
        {!error && hourly && prediction === 'week' && <DayForecast daily={daily!} mode={mode} ></DayForecast>}
    </div>
    </div>
    </div> 
}