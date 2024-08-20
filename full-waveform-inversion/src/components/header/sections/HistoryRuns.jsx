import { useState } from 'react';

import UpperPart from '../../custom/UpperPart';

import closeBig from '../../../assets/close-big.png';
import search from '../../../assets/search.png';
import BorderTop from '../../custom/borders/BorderTop';
import H1 from '../../custom/headings/H1';

export default function HistoryRuns({ onClose }) {

    return (
        <>
            {/* Blur background */}
            <div className='fixed right-0 top-0 w-screen h-screen z-20 bg-black bg-opacity-[0.36] backdrop-blur-[2.5px]' />

            {/* Main container */}
            {/* 1746px width because border is outside */}
            {/* flex items-center justify-center */}
            <div className='absolute top-0 left-0 z-30 size-full flex justify-center items-center'> {/* Disabled: #B6B7BE*/}
                <div className='relative w-[1746px] h-[952px]
                    bg-white border border-[#D7DFFF] rounded-2xl'
                >
                    <div className='flex items-center justify-between px-6 py-[26px]'>
                        <H1 heading='Mode:'/>
                        <button className='hover:bg-[#F1F4FF] duration-200 rounded-md'
                            onClick={onClose}
                        >
                            <img src={closeBig} alt="close-big.png" />
                        </button>
                    </div>
                    <BorderTop />

                    {/* <UpperPart heading='Mode:' styling='px-6 py-4'>
                        <div className='flex'>
                            <div>bruh</div>
                            <div className='flex space-x-6'>

                                <div className="w-[270px] h-12 pl-4 pr-2 py-2 bg-white rounded-xl border border-[#d7dfff] justify-between items-center inline-flex">
                                    <div className="text-black text-base font-normal font-['Switzer Variable'] leading-normal">Select runs</div>
                                    <div className="justify-end items-center gap-2 flex">
                                        <img src={search} alt="search.png" />
                                    </div>
                                </div>

                                <button onClick={onClose}
                                    className='hover:bg-[#F1F4FF] duration-200 rounded-md'
                                >
                                    <img src={closeBig} alt="close-big.png" />
                                </button>
                            </div>
                        </div>
                    </UpperPart> */}
                </div>
                
            </div>
        </>
    )
}

// Class
// Properties
// static	position: static;
// fixed	position: fixed;
// absolute	position: absolute;
// relative	position: relative;
// sticky