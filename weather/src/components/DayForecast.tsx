import { ICON_MAP } from '../logic/addMapping'

interface DayForecastProps {
    daily: {
        temperature_2m_max: number[]
        temperature_2m_min: number[]
        time: number[]
        weathercode: number[]
    }
    mode: string
}

/**
 * Panel showing the forecast of the week, day by day
 */

export default function DayForecast({ daily, mode }: DayForecastProps) {

    return <div className='w-5/6 h-1/2 sm:h-3/5 lg:desktop-panel max-w-md rounded-md bg-[var(--slate-100-50)] backdrop-blur-md overflow-auto p-6 flex flex-col gap-6'>
        {daily.time.map((day, index) => {
            const date = new Date(day * 1000)
            const dateFormated = date.toString().split(' ')

            const icon = ICON_MAP.get(daily.weathercode[index])

            return <div key={index} className='flex justify-center items-center h-24 gap-4'>
                <div className='flex items-center justify-between w-full'>
                    <div className='w-1/4 sm:w-4/12'><p className='flex'>{index === 0 ? 'Today' : dateFormated[0]}</p></div>
                    <div className='w-1/4 sm:mx-auto'><img src={`../../public/${icon[0]}.svg`} alt="" className={`h-8 w-8 flex ${mode}-filter`}/></div>
                    <div className='w-1/2 sm:w-4/12'><p className=' flex'>T: {daily.temperature_2m_min[index]}ºC - {daily.temperature_2m_max[index]}ºC</p></div>
                </div>
            </div>
        })}
    </div>
}