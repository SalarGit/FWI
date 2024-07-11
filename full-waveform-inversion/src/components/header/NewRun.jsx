import { useState } from 'react';

import '../../index.css';


import H2 from '../custom/headings/H2.jsx';
import UpperPart from '../custom/UpperPart.jsx';
import Border from '../custom/Border.jsx';
import SelectEditButton from '../custom/buttons/SelectEditButton.jsx';
import Chip from '../custom/Chip.jsx';
import AddSubstract from './AddSubstract.jsx';
import DropdownMenu from '../custom/dropdownmenu/DropdownMenu.jsx';

import closeBig from '../../assets/close-big.png';

export default function NewRun({ onClose }) {
    const [folder, setFolder] = useState("");
    const [threads, setThreads] = useState(1);

    const forwardModelItems = ['FiniteDifference', 'Integral'];
    const minimisationModelItems = ['GradientDescent', 'ConjugateGradient', 'Evolution', 'Random', 'ParticleSwarm', 'Proportional'];

    
    return (
        // New Run Container
        <div className='absolute w-[604px] mt-4 right-0
            bg-white border border-violet-200 rounded-2xl
            z-20'
        >
            <UpperPart heading='New run' styling='p-6'>
                <button onClick={onClose}
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
                            border border-violet-200 rounded-xl"
                            />
                        <SelectEditButton title="Select folder" absoluteStyling="right-2 top-2"/>
                    </div>

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

                <Border />
               
                {/* Middle Part Container*/}
                <div className='flex flex-col space-y-8'>

                    {/* Models */}
                    <div className='flex space-x-4'>
                        <div className='flex flex-col space-y-3 w-1/2'>
                            <H2 heading="Forward model"/>
                            <DropdownMenu initialValue="Integral" items={forwardModelItems}>
                                <SelectEditButton title="Edit" absoluteStyling="right-10 top-2"/>
                            </DropdownMenu>
                        </div>
                        <div className='flex flex-col space-y-3 w-1/2'>
                            <H2 heading="Minimisation model"/>
                            <DropdownMenu initialValue="GradientDescent" items={minimisationModelItems}>
                                <SelectEditButton title="Edit" absoluteStyling="right-10 top-2"/>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Processing Steps */}
                    <div className='flex flex-col space-y-3'>
                        <H2 heading="Processing steps"/>
                        {/* <ClickableChip title="Pre-processing"/> */}
                        <div className="flex space-x-3">
                            <Chip title="Pre-Processing" clickable={true} />
                            <Chip title="Processing" clickable={true} />
                            <Chip title="Post-Processing" clickable={true} />
                        </div>
                    </div>

                    {/* Threads/Cores */}
                    <div className='flex flex-col space-y-3'>
                        <H2 heading="Threads / Cores (parallel only)" />

                        <div className='flex space-x-3'>
                            <AddSubstract type='substract' handleThreads={() => setThreads((threads) => threads - 1)} isDisabled={threads === 1} />
                            <div className='flex items-center justify-center w-12 h-12
                                bg-white border border-[#D7DFFF] rounded-xl'
                            >
                                {threads}
                            </div>
                            <AddSubstract type='add' handleThreads={() => setThreads((threads) => threads + 1)} isDisabled={threads === 8} />
                        </div>
                    </div>
                </div>

                <Border />

                {/* Lower Part */}
                <button className="py-4 bg-[#3561FE] rounded-xl">
                    <p className="text-center text-white font-semibold">Calculate</p>
                </button>

            </div>
        </div>
    )
}