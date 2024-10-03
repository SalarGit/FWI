import React, { useContext } from 'react';

import { SessionContext } from '../../store/session-context.jsx';

import '../../index.css';
import logo from '../../assets/fwi-logo.png';

export default function Header({ handleSetAddingNewRun, handleSetHistoryOfRuns }) {         
    const { historyLength } = useContext(SessionContext);

    return (
        <div className={`flex items-center justify-between min-w-screen pb-8`}>
            <div className='flex items-center'>
                <img src={logo} alt="fwi_logo.png" className="w-11 h-11" />

                <p className='ml-6 text-[44px] font-semibold leading-[56px]'>Full Waveform Inversion</p>
            </div>

            <div className='flex space-x-4'>
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
    )
}