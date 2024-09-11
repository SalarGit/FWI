import { useState } from 'react';
import './index.css'
import { runs, tableData } from './data.js';

import Header from './components/header/Header.jsx';
import Settings from './components/settings/Settings.jsx';
import Input from './components/IO/Input.jsx';
import Output from './components/IO/Output.jsx';
import NewRun from './components/header/sections/newrun/NewRun.jsx';
import HistoryOfRuns from './components/header/sections/historyofruns/HistoryOfRuns.jsx';
import ZipFileHandler from './components/header/sections/newrun/ZipeFileHandler.jsx';
import RecursiveForm from './components/header/sections/newrun/RecursiveForm.jsx';
import RecursiveZipFileHandler from './components/header/sections/newrun/RecursiveZipFileHandler.jsx';

function App() {
    // const globalCond = true;

    const [addingNewRun, setAddingNewRun] = useState(false);
    const [historyOfRuns, setHistoryOfRuns] = useState(false);
    const [zipFileHandler, setZipFileHandler] = useState(false);
    const [recursiveForm, setRecursiveForm] = useState(false);
    const [recursiveZipFileHandler, setRecursiveZipFileHandler] = useState(false);

    function handleSetAddingNewRun() {
        setAddingNewRun((prevState) => prevState ? false : true);
    }
    function handleSetHistoryOfRuns() {
        setHistoryOfRuns((prevState) => prevState ? false : true);
    }
    function handleSetZipFileHandler() {
        setZipFileHandler((prevState) => prevState ? false : true);
    }
    function handleSetRecursiveForm() {
        setRecursiveForm((prevState) => prevState ? false : true);
    }
    function handleSetRecursiveZipFileHandler() {
        setRecursiveZipFileHandler((prevState) => prevState ? false : true);
    }

    return (
        // <div className={`relative flex flex-col min-h-screen bg-[#F4F6FB]
        //     px-14 py-8 space-y-6 h-[1080px]`}
        // bg-[#F4F6FB]
        <div className='relative flex flex-col min-h-screen 
            px-14 py-8 h-[1080px] scrollbar-webkit'
        >
            {/* scrollbar-thin scrollbar-webkit*/}
            {/* Header */}
            <Header handleSetAddingNewRun={handleSetAddingNewRun} handleSetHistoryOfRuns={handleSetHistoryOfRuns} handleSetZipFileHandler={handleSetZipFileHandler} handleSetRecursiveForm={handleSetRecursiveForm} handleSetRecursiveZipFileHandler={handleSetRecursiveZipFileHandler} />
            {addingNewRun &&
                <NewRun onClose={handleSetAddingNewRun} />
            }
            {historyOfRuns &&
                <HistoryOfRuns onClose={handleSetHistoryOfRuns} />
            }
            {zipFileHandler &&
                // <ZipFileHandler onClose={handleSetTest} />
                <ZipFileHandler onClose={handleSetZipFileHandler}/>
            }
            {recursiveForm &&
                // <ZipFileHandler onClose={handleSetTest} />
                <RecursiveForm onClose={handleSetRecursiveForm}/>
            }
            {recursiveZipFileHandler &&
                // <ZipFileHandler onClose={handleSetTest} />
                <RecursiveZipFileHandler onClose={handleSetRecursiveZipFileHandler} />
            }

            {/* runs.length */}
            {/* {tableData.length > 0 && */}
            {Object.keys(runs).length > 0 &&
                <div className='ml-6 mb-8 flex items-center'>

                    {Object.entries(runs).map((run) =>
                        <div className={`h-12 py-3 px-9 ${run[1] && 'border-b-2 border-[#3561fe] text-[#3561fe]'}
                            text-base font-semibold`}
                            >
                                {run[0]}
                        </div>
                    )}
                </div>
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
