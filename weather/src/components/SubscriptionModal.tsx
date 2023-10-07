import { useNavigate } from "react-router-dom"

interface SubscriptionModalProps {
    setSubscriptionModal: (subscriptionModal: boolean) => void
}

export default function SubscriptionModal({ setSubscriptionModal }: SubscriptionModalProps ) {
    const navigate = useNavigate()

    const handleSuscribe = () => {
        setSubscriptionModal(false)
        
        navigate('/register')
    }

    return <>
        <div className="w-screen h-screen absolute bg-[var(--slate-700-75)] z-50 flex justify-center items-center">
            <div className="w-4/5 h-60 bg-[var(--slate-100)] rounded-md max-w-md flex flex-col justify-center items-center gap-4">
                <p className="text-lg text-[var(--slate-700)]">You have run out of credits</p>
                <p className="text-lg text-[var(--slate-700)]">To get a new forecast, suscribe:</p>
                <button onClick={handleSuscribe} className="text-xl bg-primary-600 rounded-md text-slate-100 p-4">Suscribe</button>
            </div>
        </div>
    </>   
}