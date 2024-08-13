import { useState } from 'react';

import '../../index.css';

import H2 from '../custom/headings/H2.jsx';
import UpperPart from '../custom/UpperPart.jsx';
import Border from '../custom/Border.jsx';
import BorderTop from '../custom/borders/BorderTop.jsx';
import EditButton from '../custom/buttons/EditButton.jsx';
import Chip from '../custom/Chip.jsx';
import AddSubstract from './AddSubstract.jsx';
import DropdownMenu from '../custom/dropdownmenus/regular/DropdownMenu.jsx';
import EditDataMenu from '../custom/dropdownmenus/editdata/EditDataMenu.jsx';
import EditDataDropdownMenu from '../custom/dropdownmenus/editdata/EditDataDropdownMenu.jsx';
import EditModels from './EditModels.jsx';
import FileInputWithCustomButton from './FileInputWithCustomButton.jsx';

import closeBig from '../../assets/close-big.png';

import { forwardModels, minimisationModels } from '../../data.js';

export default function NewRun({ onClose }) {
    const [folder, setFolder] = useState("");
    const [threads, setThreads] = useState(1);
    const [selecting, setSelecting] = useState(false);

    const forwardModelItems = Object.keys(forwardModels);
    const minimisationModelItems = Object.keys(minimisationModels);

    function handleSelecting() {
        setSelecting((prev) => prev ? false : true);
    }

    return (
        // New Run Container
        <>
            {/* // Grey & Blurry bg */}
            <div className='fixed right-0 top-0 w-screen h-screen z-20 bg-black bg-opacity-[0.36] backdrop-blur-[2.5px] transition-all duration-500'></div>
            <div className='absolute w-[604px] mt-4 right-0
                bg-white border border-[#D7DFFF] rounded-2xl
                z-30 backdrop-blur' // Disabled: #B6B7BE
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
                                border border-[#D7DFFF] rounded-xl"
                                />
                            {/* isOpen ? 'border border-[#3561FE] py-[5px] px-[11px]' */}
                            {/* <button
                                className="absolute right-2 top-2 py-[6px] px-3 
                                text-sm font-medium text-[#3561FE] rounded bg-[#F1F4FF]"
                            >
                                <p>Select folder</p>
                            </button> */}
                            {/* <input className='absolute right-2 top-2 py-[6px] px-3 
                                text-sm font-medium text-[#3561FE] rounded bg-[#F1F4FF]' 
                                directory="" webkitdirectory="" type="file" 
                            /> */}
                            {/* <input className="[appearance:textfield]" type="file" webkitdirectory mozdirectory directory /> */}
                            <FileInputWithCustomButton />

                            {/* <label for="caseFolder">
                                <div className={`absolute right-2 top-2 cursor-pointer rounded bg-[#F1F4FF]
                                    text-sm font-medium text-[#3561FE] py-[6px] px-3 
                                    peer-open:bg-black`
                                }
                                    // py-[5px] px-[11px] border border-[#3561FE]
                                >
                                    <p>Select folder</p>
                                </div>
                                <input type="file" id="caseFolder" name="caseFolder" className='peer hidden' />
                            </label> */}
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

                    <BorderTop />
                
                    {/* Middle Part Container*/}
                    <div className='flex flex-col space-y-8'>

                        {/* Models */}
                        <div className='flex space-x-4 z-[1]'>
                            <div className='flex flex-col space-y-3 w-1/2'>
                                <H2 heading="Forward model"/>
                                <DropdownMenu items={forwardModelItems} edit={true} model="forward">
                                    {/* <EditModels model="forward" modelType="Integral" /> */}
                                </DropdownMenu>
                            </div>
                            <div className='flex flex-col space-y-3 w-1/2'>
                                <H2 heading="Minimisation model"/>
                                <DropdownMenu items={minimisationModelItems} edit={true} model="minimisation">
                                {/* <DropdownMenu initialValue="GradientDescent" items={Object.entries(minimisationModelItems)}> */}
                                {/* {Object.entries(dataObject).map(([key, value]) => (
                                    <InputModelData title={key} defaultValue={value}/>
                                ))} */}
                                    {/* <EditModels model="minimisation" modelType="GradientDescent" /> */}
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

                    <BorderTop />

                    {/* Lower Part */}
                    <button className="py-4 bg-[#3561FE] rounded-xl">
                        <p className="text-center text-white font-semibold">Calculate</p>
                    </button>
                </div>
            </div>
        </>
    )
}