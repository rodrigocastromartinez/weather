import { useContext } from 'react'
import AppContext from '../AppContext'

interface AppContextType {
    freeze: () => void;
    unfreeze: () => void;
  }

export default (): AppContextType | undefined => useContext(AppContext)