import { useState } from 'react';

import '../../index.css';
import logo from '../../assets/fwi-logo.png';
import close from '../../assets/close.png';
import closeBig from '../../assets/close-big.png';
import plus24px from '../../assets/plus24px.svg';
import minus from '../../assets/minus.svg';

import H2 from '../custom/H2.jsx';
import UpperPart from '../custom/UpperPart.jsx';
import Border from '../custom/Border.jsx';
import InputBox from '../custom/InputBox.jsx';
import SelectEditButton from '../custom/buttons/SelectEditButton.jsx';
import Chip from '../custom/Chip.jsx';
import Test from '../Test.jsx';
import NewRun from './NewRun.jsx';

export default function Header() {
    const [addingNewRun, setAddingNewRun] = useState(false);

    function handleSetAddingNewRun() {
        setAddingNewRun((prevState) => prevState ? false : true);
    }

    return (
        // Header Container
        // fix 120px
        <div className='flex items-center justify-between min-w-screen'>
            {/* Logo & Heading Container */}
            <div className='flex items-center'>
                {/* Logo */}
                <img src={logo} alt="fwi_logo.png" className="w-11 h-11" />

                {/* Heading */}
                {/* Fix text-5xl to 48px->44px. Fix 'general sans variable' font. */}
                <p className='ml-6 text-[44px] font-semibold'>Full Waveform Inversion</p>
            </div>

            {/* Buttons Container*/}
            <div className='flex space-x-4'>
                {/* Border inside, force height */}
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
                    {addingNewRun &&
                        <NewRun onClose={handleSetAddingNewRun} />
                    }
                </div>
            </div>
        </div>
    )
}