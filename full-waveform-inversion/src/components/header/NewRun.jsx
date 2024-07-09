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
import AddSubstract from './AddSubstract.jsx';

export default function NewRun({ onClose }) {
    const [threads, setThreads] = useState(1);

    function handleThreads(actionType) {
        if (actionType === 'ADD') {
            setThreads((threads) => threads + 1);
        } else if (actionType === 'SUBSTRACT') {
            setThreads((threads) => threads - 1);
        }
        
    }

    return (
        // New Run Container
        <div className='absolute w-[604px] mt-4 right-0
            bg-white border border-violet-200 rounded-2xl
            z-20'
        >
            <UpperPart heading='New run' styling='p-6'>
                <button onClick={onClose}
                    className='hover:bg-violet-200 duration-200 rounded-md'
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
                    <InputBox>
                        <p className="break-all line-clamp-1">
                            /home/user/default
                        </p>
                        <SelectEditButton title="Select folder"/>
                    </InputBox>
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
                    <div className='flex space-x-4'>
                        {/* Models */}
                        <div className='flex flex-col space-y-3 w-1/2'>
                            <H2 heading="Forward model"/>
                            {/* <InputBox>
                                <p>Integral</p>
                                <SelectEditButton title="Edit"/>
                            </InputBox> */}
                            <Test></Test>
                        </div>
                        <div className='flex flex-col space-y-3  w-1/2'>
                            <H2 heading="Minimisation model"/>
                            <InputBox>
                                <p>ConjugateGradient</p>
                                <SelectEditButton title="Edit"/>
                            </InputBox>
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
                            <AddSubstract type='substract' onClick={() => handleThreads('ADD')}/>
                            <div className='flex items-center justify-center w-12 h-12
                            bg-white border border-[#D7DFFF] rounded-xl'>
                                {threads}
                            </div>
                            <AddSubstract type='add' onClick={() => handleThreads('SUBSTRACT')} />
                        </div>
                    </div>

                </div>
                {/* Lower Part Container */}

            </div>
        </div>
    )
}