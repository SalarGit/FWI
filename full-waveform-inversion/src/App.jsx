import './index.css'

import Header from './components/header/Header.jsx';
import Settings from './components/settings/Settings.jsx';
import Input from './components/IO/Input.jsx';
import Output from './components/IO/Output.jsx';

function App() {
    const globalCond = true;

    return (
        <div className={`relative flex flex-col min-h-screen bg-[#F4F6FB]
            px-14 py-8 space-y-6`}
        >
            <Header />
            {/* Settings */}
            <Settings />
            {/* IO Container */}
            {/* <div className={`flex space-x-6 ${globalCond ? 'blur-[2.5px]' : ''}`}> */}
            <div className="flex space-x-6">
                <Input />
                <Output />
            </div>
            {/* <InputOutput /> */}
            {/* Input */}
            {/* Ouput */}

        </div>
    )
}

export default App
