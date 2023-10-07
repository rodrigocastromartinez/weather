import { ICON_MAP } from '../logic/addMapping'

interface HourForecastProps {
    hourly: {
        relativehumidity_2m: number[],
        temperature_2m: number[],
        time: number[]
        weathercode: number[]
    }
    mode: string
}

export default function HourForecast({ hourly, mode }: HourForecastProps) {
    const initialHour = new Date()
    const finalHour = new Date(initialHour)
    finalHour.setTime(initialHour.getTime() + 24 * 60 * 60 * 1000)

    return <div className='w-5/6 h-3/5 max-w-md rounded-md bg-[var(--slate-100-50)] backdrop-blur-md overflow-auto'>
    {   
        hourly.time.map((hour: number, index: number) => {
            const date = new Date(hour * 1000)

            if (date <= initialHour || date >= finalHour) return

            const hourFormated = date.toString().split(' ')
            const icon = ICON_MAP.get(hourly.weathercode[index])

            return <div key={index} className='flex justify-between items-center p-4'>
                        <p>{hourFormated[0] + ' ' + hourFormated[2]} - {hourFormated[4][0] + hourFormated[4][1]}hs</p>
                        <img src={`../../public/${icon[0]}.svg`} alt="" className={`h-8 w-8 ${mode}-filter`}/>                
                        <p>T:{hourly.temperature_2m[index]}ºC</p>
                        <p>H:{hourly.relativehumidity_2m[index]}%</p>
            </div>
        })
    }
    </div>
}   