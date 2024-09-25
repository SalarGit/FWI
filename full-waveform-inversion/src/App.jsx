import { useState } from 'react';
import './index.css'

import SessionContextProvider from './store/session-context.jsx'

import Header from './components/header/Header.jsx';
import Settings from './components/settings/Settings.jsx';
import Input from './components/IO/Input.jsx';
import Output from './components/IO/Output.jsx';
import NewRun from './components/header/sections/newrun/NewRun.jsx';
import HistoryOfRuns from './components/header/sections/historyofruns/HistoryOfRuns.jsx';
import RunTab from './components/runtab/RunTab.jsx';
// import ProgressionBar from './components/custom/progressionbar/ProgressionBar.jsx';

function App() {
    const [addingNewRun, setAddingNewRun] = useState(false);
    const [historyOfRuns, setHistoryOfRuns] = useState(false);
    const [progress, setProgress] = useState([false, {'Pre-processing': 0, 'Processing': 0, 'Post-processing': 0}])

    function handleSetAddingNewRun() {
        setAddingNewRun((prevState) => prevState ? false : true);
    }
    function handleSetHistoryOfRuns() {
        setHistoryOfRuns((prevState) => prevState ? false : true);
    }

    function decodeSpaces(encodedString) {
        return encodedString.replace(/__SPACE__/g, ' ');
    }

    function encodeSpaces(caseId) {
        return caseId.replace(/ /g, '__SPACE__');
    }

    return (
        <SessionContextProvider>
            <div className='relative flex flex-col min-h-screen 
                px-14 py-8 h-[1080px] scrollbar-webkit'
            >
                <Header handleSetAddingNewRun={handleSetAddingNewRun} handleSetHistoryOfRuns={handleSetHistoryOfRuns} />
                {addingNewRun &&
                    <NewRun onClose={handleSetAddingNewRun} encodeSpaces={encodeSpaces} progress={progress} setProgress={setProgress} />
                }
                {historyOfRuns &&
                    <HistoryOfRuns onClose={handleSetHistoryOfRuns} />
                }

                <RunTab progress={progress} setProgress={setProgress}/>

                {/* <ProgressionBar className='absolute right-8 bottom-8' /> */}

                <div className='flex flex-col space-y-6'>
                    <Settings />
                    <div className="flex space-x-6">
                        <Input />
                        <Output />
                    </div>
                </div>
            </div>
        </SessionContextProvider>
    )
}

export default App
