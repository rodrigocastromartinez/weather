export default function SuscriptionModal() {
    return <>
        <div className="w-screen h-screen absolute bg-slate-700/75 z-50 flex justify-center items-center">
            <div className="w-4/5 h-60 bg-slate-200 rounded-md max-w-md flex flex-col justify-center items-center gap-4">
                <p className="text-lg">You have run out of credits</p>
                <p className="text-lg">To get a new forecast, suscribe:</p>
                <button className="text-xl bg-primary-600 rounded-md text-slate-100 p-4">Suscribe</button>
            </div>
        </div>
    </>   
}