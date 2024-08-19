import { useState } from 'react';

import '../../index.css';
import logo from '../../assets/fwi-logo.png';
import NewRun from './sections/NewRun.jsx';
import HistoryRuns from './sections/HistoryRuns.jsx';

export default function Header() {
    const [addingNewRun, setAddingNewRun] = useState(false);
    const [historyRuns, setHistoryRuns] = useState(false);

    function handleSetAddingNewRun() {
        setAddingNewRun((prevState) => prevState ? false : true);
    }
    function handleSetHistoryRuns() {
        setHistoryRuns((prevState) => prevState ? false : true);
    }
    const styling = addingNewRun ? 'backdrop-blur' : '';

    return (
        // Header Container
        // fix 120px
        <>
        {historyRuns &&
            <HistoryRuns onClose={handleSetHistoryRuns} />
        }

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
                {/* Border inside, force height */}
                <div className='relative'>
                    <button onClick={handleSetHistoryRuns}
                        className={`w-[200px] h-[56px] border-2 rounded-xl 
                        ${historyRuns ? 'border-[#3561FE] text-[#3561FE]' : 'border-gray-400 text-gray-400'}`}
                    >
                        History of runs
                    </button>

                    {/* {historyRuns &&
                        <HistoryRuns onClose={handleSetHistoryRuns} />
                    } */}
                </div>
                <div className='relative'>
                    <button onClick={handleSetAddingNewRun} 
                        className='w-[200px] h-[56px] rounded-xl bg-[#3561FE] text-white'
                    >
                        Add new run
                    </button>
                    
                    {addingNewRun &&
                        <NewRun onClose={handleSetAddingNewRun} />
                    }
                </div>
            </div>
        </div>
        </>
    )
}