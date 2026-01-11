import { useState } from 'react'




//components
import Topbar from './components/Topbar'
import Calendar from './components/Calendar'

function App() {

  

  return (
    <div className='flex flex-col w-screen h-screen bg-slate-900 overflow-hidden'>
        <Topbar/>
        <Calendar/>
    </div>
  
  )
}

export default App
