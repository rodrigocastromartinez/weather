import './App.css'
import Home from './pages/Home'
import SubscriptionModal from './components/SubscriptionModal'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import { useState } from 'react'
import AppContext from './AppContext'
import Loader from './components/Loader'

const { Provider } = AppContext

function App() {
  const [subscriptionModal, setSubscriptionModal] = useState(false)
  const [loader, setLoader] = useState<boolean>()

  const freeze = () => setLoader(true)

  const unfreeze = () => setLoader(false)

  if (!localStorage.mode)
  localStorage.mode = 'light'

  if (localStorage.mode === 'dark') {
    if (!document.querySelector('html')!.classList.contains('dark'))
        document.querySelector('html')!.classList.add('dark')
  } else {
    if (document.querySelector('html')!.classList.contains('dark'))
        document.querySelector('html')!.classList.remove('dark')
  }

  return (
    <Provider value={{ freeze, unfreeze }}>
      {subscriptionModal && <SubscriptionModal setSubscriptionModal={setSubscriptionModal} />}
      <Routes>
        <Route path='/' element={<Home setSubscriptionModal={setSubscriptionModal} />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      {loader && <Loader />}
    </Provider>
  )
}

export default App