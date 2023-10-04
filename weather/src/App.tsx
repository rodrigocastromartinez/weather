import './App.css'
import SearchBar from './components/SearchBar'
import SuscriptionModal from './components/SuscriptionModal'

function App() {

  return (
    <>
    {localStorage.credits < 1 && <SuscriptionModal />}
    <div className='h-screen flex flex-col justify-center items-center gap-4 text-slate-700'>
      <SearchBar />
      {/* <div className='flex rounded-md bg-slate-700/50 backdrop-blur-md h-96 w-4/5'></div> */}
    </div>
    </>
  )
}

export default App