interface ModeButtonProps {
    setMode: (mode: string) => void
    switchMode: () => void
}

/**
 * Switch button to change between dark and light mode
 */

export default function ModeButton({switchMode}: ModeButtonProps) {

    return <>
        <button className='bg-[var(--slate-100-50)] w-8 h-8 rounded-full flex justify-center items-center' onClick={switchMode}><span className="material-symbols-outlined text-[var(--yellow)]">{(localStorage.mode === 'dark') ? 'light_mode' : 'nightlight'}</span></button>
    </>
}