import React, { useState, useContext, useEffect } from 'react';

import { SessionContext } from '../../store/session-context.jsx';


import '../../index.css';
import logo from '../../assets/fwi-logo.png';
import NewRun from './sections/newrun/NewRun.jsx';
import HistoryOfRuns from './sections/historyofruns/HistoryOfRuns.jsx';
import * as api from '../../api/apiService.js';

export default function Header({ handleSetAddingNewRun, handleSetHistoryOfRuns }) {
    // const [addingNewRun, setAddingNewRun] = useState(false);
    // const [historyOfRuns, setHistoryOfRuns] = useState(false);
    
    // function handleSetAddingNewRun() {
        //     setAddingNewRun((prevState) => prevState ? false : true);
        // }
        // function handleSetHistoryOfRuns() {
            //     setHistoryOfRuns((prevState) => prevState ? false : true);
            // }
            // const styling = addingNewRun ? 'backdrop-blur' : '';
            
    const { historyLength, updateHistoryOfRuns } = useContext(SessionContext);

    return (
        // Header Container
        // fix 120px
        <>
        {/* {historyOfRuns &&
            <HistoryOfRuns onClose={handleSetHistoryOfRuns} />
        } */}

        <div className={`flex items-center justify-between min-w-screen pb-8`}>
            {/* Logo & Heading Container */}
            <div className='flex items-center'>
                {/* Logo */}
                <img src={logo} alt="fwi_logo.png" className="w-11 h-11" />

                {/* Heading */}
                {/* Fix text-5xl to 48px->44px. Fix 'general sans variable' font. */}
                <p className='ml-6 text-[44px] font-semibold leading-[56px]'>Full Waveform Inversion</p>
            </div>

            {/* Buttons Container*/}
            <div className='flex space-x-4'>
                {/* <div className='relative'>
                    <button className={`w-[200px] h-[56px] border-2 disabled:border-[#B6B7BE] disabled:text-[#B6B7BE] disabled:cursor-not-allowed rounded-xl enabled:border-[#3561FE] enabled:text-[#3561FE]`}
                        onClick={handleSetRecursiveZipFileHandler}
                        disabled={tableData.length === 0}
                    >
                        Recursive zipfile handler
                    </button>
                </div>
                <div className='relative'>
                    <button className={`w-[200px] h-[56px] border-2 disabled:border-[#B6B7BE] disabled:text-[#B6B7BE] disabled:cursor-not-allowed rounded-xl enabled:border-[#3561FE] enabled:text-[#3561FE]`}
                        onClick={handleSetRecursiveForm}
                        disabled={tableData.length === 0}
                    >
                        Recursive form
                    </button>
                </div>
                <div className='relative'>
                    <button className={`w-[200px] h-[56px] border-2 disabled:border-[#B6B7BE] disabled:text-[#B6B7BE] disabled:cursor-not-allowed rounded-xl enabled:border-[#3561FE] enabled:text-[#3561FE]`}
                        onClick={handleSetZipFileHandler}
                        disabled={tableData.length === 0}
                    >
                        zipfile handler
                    </button>
                </div> */}
                {/* Border inside, force height */}
                <div className='relative'>
                    <button className={`w-[200px] h-[56px] border-2 disabled:border-[#B6B7BE] disabled:text-[#B6B7BE] disabled:cursor-not-allowed rounded-xl enabled:border-[#3561FE] enabled:text-[#3561FE]`}
                        onClick={handleSetHistoryOfRuns}
                        disabled={historyLength === 0}
                    >
                        History of runs
                    </button>
                </div>
                <div className='relative'>
                    <button onClick={handleSetAddingNewRun} 
                        className='w-[200px] h-[56px] rounded-xl bg-[#3561FE] text-white'
                    >
                        Add new run
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}