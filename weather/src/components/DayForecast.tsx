import { ICON_MAP } from '../logic/addMapping'

interface DayForecastProps {
    daily: {
        temperature_2m_max: number[]
        temperature_2m_min: number[]
        time: number[]
        weathercode: number[]
    }
}

export default function DayForecast({ daily }: DayForecastProps) {

    return <div className='w-5/6 h-80 rounded-md bg-slate-700/50 backdrop-blur-md overflow-auto p-6 flex flex-col gap-6'>
        {daily.time.map((day, index) => {
            const date = new Date(day * 1000)
            const dateFormated = date.toString().split(' ')

            const icon = ICON_MAP.get(daily.weathercode[index])

            return <div key={index} className='flex justify-center items-center h-24 gap-4'>
                <div className='flex items-center justify-between w-full'>
                    <p>{index === 0 ? 'Today' : dateFormated[0]}</p>
                    <img src={`../../public/${icon[0]}.svg`} alt="" className='h-8 w-8 text-slate-100'/>
                    <p className='text-slate-200'>T: {daily.temperature_2m_min[index]}ºC - {daily.temperature_2m_max[index]}ºC</p>
                </div>
            </div>
        })}
    </div>
}