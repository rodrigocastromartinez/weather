import { useEffect } from "react"

interface ChoiceButtonsProps {
    setPrediction: (prediction: string) => void
    prediction: string
}

export default function ChoiceButtons({prediction, setPrediction}: ChoiceButtonsProps) {
    useEffect(() => {}, [prediction])
    
    return <>
    <div className="flex">
            <div
            className="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            role="group">
                <button
                    type="button"
                    className={`inline-block rounded-l ${prediction === 'day' ? 'bg-primary-700' : 'bg-primary-600'} px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-white transition duration-150 ease-in-out sm:hover:bg-primary-500`}
                    onClick={() => setPrediction('day')}
                >
                DAY
                </button>
                <button
                    type="button"
                    className={`inline-block rounded-r ${prediction === 'week' ? 'bg-primary-700' : 'bg-primary-600'} px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-white transition duration-150 ease-in-out sm:hover:bg-primary-500`}
                    onClick={() => setPrediction('week')}
                >
                WEEK
                </button>
            </div>
        </div>
    </>
}