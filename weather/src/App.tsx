import './App.css'
import Home from './pages/Home'
import SubscriptionModal from './components/SubscriptionModal'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import { useState } from 'react'

function App() {
  const [subscriptionModal, setSubscriptionModal] = useState(false)

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
    <>
    {subscriptionModal && <SubscriptionModal setSubscriptionModal={setSubscriptionModal} />}
    <Routes>
      <Route path='/' element={<Home setSubscriptionModal={setSubscriptionModal} />} />
      <Route path='/register' element={<Register />} />
    </Routes>
    </>
  )
}

export default App