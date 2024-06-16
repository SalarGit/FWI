import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './index.css'

import Header from './components/Header.jsx';
import Settings from './components/settings/Settings.jsx';
import InputOutput from './components/InputOutput.jsx';

function App() {
        // const [count, setCount] = useState(0)
        // bg-[#F4F6FB]
  return (
        <div className='flex flex-col min-h-screen bg-[#F4F6FB]
            px-14 py-8 space-y-6'
        >
            <Header />
            {/* Settings */}
            <Settings />
            {/* I/O */}
            <InputOutput />
            {/* Input */}
            {/* Ouput */}

        </div>
  )
}

export default App
