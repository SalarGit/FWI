import { useState } from 'react';

import '../index.css';
import logo from '../assets/fwi-logo.png';
import close from '../assets/close.png';
import closeBig from '../assets/close-big.png';

import H2 from './custom/H2.jsx';
import UpperPart from './custom/UpperPart.jsx';
import Border from './custom/Border.jsx';
import InputBox from './custom/InputBox.jsx';
import EditButton from './custom/buttons/EditButton.jsx';
import DropdownMenu from './dropdownmenus/DropdownMenu.jsx';

import { forwardModels, minimisationModels } from '../data.js';

export default function Header() {
    const [addingNewRun, setAddingNewRun] = useState(false);
    const [folder, setFolder] = useState("");

    function handleSetAddingNewRun() {
        setAddingNewRun((prevState) => prevState ? false : true);
    }

    const forwardModelItems = ['FiniteDifference', 'Integral'];
    const minimisationModelItems = ['GradientDescent', 'ConjugateGradient', 'Evolution', 'Random', 'ParticleSwarm', 'Proportional'];

    return (
        // Header Container
        // fix 120px
        <div className='flex items-center justify-between min-w-screen'>
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

                    {/* New Run Container */}
                    {addingNewRun && (
                        <div className='absolute w-[604px] mt-4 right-0
                            bg-white border border-[#D7DFFF] rounded-2xl
                            z-20'
                        >
                            <UpperPart heading='New run' styling='p-6'>
                                <button onClick={handleSetAddingNewRun}
                                    className='hover:bg-[#F1F4FF] duration-200 rounded-md'
                                >
                                    <img src={closeBig} alt="close-big.png" />
                                </button>
                            </UpperPart>

                            {/* Lower Part Container*/}
                            <div className='flex flex-col space-y-6 m-6'>

                                {/* Upper Part Container*/}
                                <div className='flex flex-col space-y-3 p-6
                                    bg-[#F1F4FF] rounded-3xl'
                                >
                                    <H2 heading="Case folder" />

                                    {/* Input field */}
                                    <div className='relative'>
                                        {/* className="break-all line-clamp-1" */}
                                        <input type='string' maxLength={15} required value={folder} onChange={(e) => setFolder(e.target.value)}
                                            className="flex items-center justify-between
                                            w-full h-[48px] pl-4 pr-2
                                            border border-[#D7DFFF] rounded-xl"
                                        />
                                        <EditButton title="Select folder" absoluteStyling="right-2 top-2"/>
                                    </div>

                                    {/* <InputBox>
                                        <p className="break-all line-clamp-1">
                                            /home/user/default
                                        </p>
                                        <EditButton title="Select folder"/>
                                    </InputBox> */}
                                    {/* </div> */}

                                    {/* Data */}
                                    <div className='flex justify-between pt-1'>
                                        <div className='flex space-x-3'>
                                            <p className="text-[#7F7F7F] text-sm font-normal">Grid size:</p>
                                            <p className="text-sm font-normal">64 x 32</p>
                                        </div>
                                        <div className='flex space-x-3'>
                                            <p className="text-[#7F7F7F] text-sm font-normal">Subsurface model:</p>
                                            <p className="text-sm font-normal">temple_64_32</p>
                                        </div>
                                    </div>
                                </div>

                                <BorderTop />
                                
                                {/* Middle Part Container*/}
                                <div className='flex space-x-4'>
                                    <div className='flex flex-col space-y-3 w-1/2'>
                                        <H2 heading="Forward model"/>
                                        <DropdownMenu initialValue="Integral" items={forwardModelItems}>
                                            <EditButton title="Edit" absoluteStyling="right-10 top-2"/>
                                        </DropdownMenu>
                                    </div>
                                    <div className='flex flex-col space-y-3 w-1/2'>
                                        <H2 heading="Minimisation model"/>
                                        <DropdownMenu initialValue="GradientDescent" items={minimisationModelItems}>
                                            <EditButton title="Edit" absoluteStyling="right-10 top-2"/>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                {/* Lower Part Container */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}