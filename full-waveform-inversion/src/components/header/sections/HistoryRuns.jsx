import { useState } from 'react';

import closeBig from '../../../assets/close-big.png';


export default function HistoryRuns({ onClose }) {

    return (
        <>
            {/* Blur background */}
            {/* <div className='fixed right-0 top-0 w-screen h-screen z-20 bg-black bg-opacity-[0.36] backdrop-blur-[2.5px]' /> */}

            {/* Main container */}
            {/* 1746px width because border is outside */}
            {/* flex items-center justify-center */}
            <div className='absolute z-30 w-screen h-screen '> {/* Disabled: #B6B7BE */}
                <div className='w-[1746px] h-[952px] relative
                bg-white border border-[#D7DFFF] rounded-2xl'>
                    <p className='w-fit h-[800px]'>bruh</p>

                    <button onClick={onClose}
                        className='hover:bg-[#F1F4FF] duration-200 rounded-md absolute right-0 top-0'
                    >
                        <img src={closeBig} alt="close-big.png" />
                    </button>
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