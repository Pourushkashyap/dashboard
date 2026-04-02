import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import './App.css'
import Dashboard from './pages/Dashboard'

function App() {


  return (
   <>
     <AppProvider>
      
         <Dashboard />
       
     </AppProvider>
   </>
  )
}

export default App
