import ModeButton from "./ModeButton"
import { useEffect } from "react"

interface TopBarProps {
    credits: number | undefined
    mode: string
    setMode: (mode: string) => void
}

export default function TopBar({ credits, mode, setMode }: TopBarProps) {
    useEffect(() => {
        
    }, [mode, credits])

    const handleSwitchMode = () => {
        document.querySelector(':root')!.classList.toggle('dark')

        localStorage.mode = document.querySelector(':root')!.classList.contains('dark') ? 'dark' : 'light'

        setMode(localStorage.mode)
    }

    if(!localStorage.credits) localStorage.credits = 5

    return <div className='flex justify-between w-full p-4 fixed top-0'>
        <span className='p-2 bg-[var(--slate-100-50)] text-[var(--slate-700)] rounded-md'>Credits: {localStorage.credits}</span>
        <ModeButton setMode={setMode} switchMode={handleSwitchMode} />
    </div>
}