import './Loader.css'

export default function Loader() {
    return <div className='flex flex-col justify-center items-center h-screen w-screen fixed top-0 z-50'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
}