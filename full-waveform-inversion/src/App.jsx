import { useState } from 'react';

import './index.css'

import Header from './components/header/Header.jsx';
import Settings from './components/settings/Settings.jsx';
import Input from './components/IO/Input.jsx';
import Output from './components/IO/Output.jsx';
import NewRun from './components/header/sections/NewRun.jsx';
import HistoryRuns from './components/header/sections/HistoryRuns.jsx';

function App() {
    // const globalCond = true;

    const [addingNewRun, setAddingNewRun] = useState(false);
    const [historyRuns, setHistoryRuns] = useState(false);

    function handleSetAddingNewRun() {
        setAddingNewRun((prevState) => prevState ? false : true);
    }
    function handleSetHistoryRuns() {
        setHistoryRuns((prevState) => prevState ? false : true);
    }


    return (
        // <div className={`relative flex flex-col min-h-screen bg-[#F4F6FB]
        //     px-14 py-8 space-y-6 h-[1080px]`}
        <div className={`relative flex flex-col min-h-screen bg-[#F4F6FB]
            px-14 py-8 h-[1080px]`}
        >
            {/* Header */}
            <Header handleSetAddingNewRun={handleSetAddingNewRun} handleSetHistoryRuns={handleSetHistoryRuns} />
            {addingNewRun &&
                <NewRun onClose={handleSetAddingNewRun} />
            }
            {historyRuns &&
                <HistoryRuns onClose={handleSetHistoryRuns} />
            }

            {/* Settings & I/O container*/}
            <div className='flex flex-col space-y-6'>
                {/* Settings */}
                <Settings />
                {/* IO Container */}
                {/* <div className={`flex space-x-6 ${globalCond ? 'blur-[2.5px]' : ''}`}> */}
                <div className="flex space-x-6">
                    <Input />
                    <Output />
                </div>
            </div>
            {/* <InputOutput /> */}
            {/* Input */}
            {/* Ouput */}

        </div>
    )
}

export default App
