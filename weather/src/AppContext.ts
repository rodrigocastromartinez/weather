import { createContext } from 'react'

interface AppContextType {
    freeze: () => void;
    unfreeze: () => void;
  }
  
  const AppContext = createContext<AppContextType | undefined>(undefined);
  
  export default AppContext;