import { useState } from 'react';

import '../../index.css';


import H2 from '../custom/H2.jsx';
import UpperPart from '../custom/UpperPart.jsx';
import Border from '../custom/Border.jsx';
import SelectEditButton from '../custom/buttons/SelectEditButton.jsx';
import Chip from '../custom/Chip.jsx';
import AddSubstract from './AddSubstract.jsx';
import DropdownMenu from '../dropdownMenu/DropdownMenu.jsx';

import closeBig from '../../assets/close-big.png';

export default function NewRun({ onClose }) {
    const [folder, setFolder] = useState("");
    const [threads, setThreads] = useState(1);

    function handleThreads(actionType) {
        if (actionType === 'ADD') {
            setThreads((threads) => threads + 1);
        } else if (actionType === 'SUBSTRACT') {
            setThreads((threads) => threads - 1);
        }
        
    }

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
                    {/* <div className='flex items-center justify-between h-12 py-2 pr-2 pl-4
                        bg-white border border-violet-200 rounded-xl'> */}
                    
                    
                    {/* OLD1 */}
                    {/* <InputBox>
                        <p className="break-all line-clamp-1">
                            /home/user/default
                        </p>
                        <SelectEditButton title="Select folder"/>
                    </InputBox> */}
                    {/* OLD1 */}
                    {/* NEW1 */}
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
                    {/* NEW1 */}


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

                <Border />
                
               
                {/* Middle Part Container*/}
                
                <div className='flex flex-col space-y-8'>
                    {/* Middle Part Container*/}
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
                    {/* TODO: (1) Make buttons unclickable on 1 & 8 */}
                    <div className='flex flex-col space-y-3'>
                        <H2 heading="Threads / Cores (parallel only)" />

                        <div className='flex space-x-3'>
                            {/* <button onClick={() => handleThreads('SUBSTRACT')}
                                className='p-3 rounded-xl bg-[#F1F4FF]'
                            >
                                <img src={minus} alt="minus.svg" />
                            </button>
                            <div className='flex items-center justify-center w-12 h-12
                            bg-white border border-[#D7DFFF] rounded-xl'>
                                {threads}
                            </div>
                            <button onClick={() => handleThreads('ADD')}
                                className='p-3 rounded-xl bg-[#F1F4FF]'
                            >
                                <img src={plus24px} alt="plus24px.svg" />
                                </button> */}
                                
                            <AddSubstract type='substract' onClick={() => handleThreads('SUBSTRACT')}/>
                            <div className='flex items-center justify-center w-12 h-12
                            bg-white border border-[#D7DFFF] rounded-xl'>
                                {threads}
                            </div>
                            <AddSubstract type='add' onClick={() => handleThreads('ADD')} />
                        </div>
                    </div>

                </div>
                {/* Lower Part Container */}

            </div>
        </div>
    )
}