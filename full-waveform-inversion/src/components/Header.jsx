import { useState } from 'react';

import '../index.css'
import logo from '../assets/fwi-logo.png'

import H1 from './custom/H1.jsx';
import UpperPart from './custom/UpperPart.jsx';
import Child from './custom/Child.jsx';

export default function Header() {
    const [addingNewRun, setAddingNewRun] = useState(false);

    function handleSetAddingNewRun() {
        setAddingNewRun((prevState) => prevState ? false : true);
    }

    return (
        // Header Container
        // fix 120px
        <div className='flex items-center justify-between min-w-screen'
        >
            {/* Logo & Heading Container */}
            <div className='flex items-center'>
            {/* Logo */}
            <img src={logo} alt="fwi_logo.png"
                className="w-11 h-11" 
            />

            {/* Heading */}
            {/* Fix text-5xl to 48px->44px. Fix 'general sans variable' font. */}
            <p className='ml-6 text-[44px] font-semibold'>Full Waveform Inversion</p>
            </div>

            {/* Buttons Container*/}
            <div className='flex space-x-4'>
                <button className='w-[200px] h-[56px]
                    border-2 rounded-xl border-gray-400 text-gray-400'
                >
                    Compare runs
                </button>
                <div className='relative'>
                    <button className='w-[200px] h-[56px]
                        rounded-xl bg-blue-600 text-white'
                        onClick={handleSetAddingNewRun}
                    >
                        Add new run
                    </button>
                    {addingNewRun && (
                        // New Run Container
                        <div className='absolute w-[604px] mt-4 right-0
                            bg-white border border-violet-200 rounded-xl'
                        >
                            <UpperPart heading='New run' styling='p-6' side={'t'}>
                                <p>Ay yo shut yo mous</p>
                            </UpperPart>

                            {/* Lower Part */}
                            <div className='p-6'>
                                
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}