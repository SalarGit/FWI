import { useState } from 'react';

import { tableHeaders, tableData } from '../../../data';

import UpperPart from '../../custom/UpperPart';
import closeBig from '../../../assets/close-big.png';
import search from '../../../assets/search.png';
import BorderTop from '../../custom/borders/BorderTop';
import BorderBottom from '../../custom/borders/BorderBottom';
import H1 from '../../custom/headings/H1';

export default function HistoryRuns({ onClose }) {

    const th = 'text-start text-sm font-medium text-[#808080] px-6 py-[12px] border-b border-[#808080]'
    const td = 'px-6 py-3 border-b border-[#D7DFFF]'
    const check = 'flex items-center justify-center'

    return (
        <>
            {/* Blur background */}
            <div className='fixed right-0 top-0 w-screen h-screen z-20 bg-black bg-opacity-[0.36] backdrop-blur-[2.5px]' />

            {/* Main container */}
            {/* 1746px width because border is outside */}
            {/* flex items-center justify-center */}
            <div className='absolute top-0 left-0 z-30 size-full flex justify-center items-center'> {/* Disabled: #B6B7BE*/}
                {/* Container to put upper & lower beneath each other */}
                <div className='flex flex-col'>
                    {/* Upper part */}
                    <div className='flex items-center justify-between px-6 py-[26px]
                        w-[1746px] h-[81px] bg-white  rounded-t-3xl'
                        >
                        <H1 heading='Mode:'/>
                        <button className='hover:bg-[#F1F4FF] duration-200 rounded-md'
                            onClick={onClose}
                        >
                            <img src={closeBig} alt="close-big.png" />
                        </button>
                    </div>

                    {/* Lower part */}
                    <div className='w-[1746px] h-[897px] bg-[#F4F6FB] border border-[#D7DFFF] rounded-b-3xl p-6'>
                        
                        {/* This 10px padding is removed from the inner div using minus margin & table (by simple taking 6px from the padding)
                            to keep the visuals the same. */}
                        <div className='p-[10px] pb-3 bg-white border border-[#D7DFFF] rounded-2xl'>
                            <div className='max-h-[823px] overflow-y-auto scrollbar-webkit ml-[-10px]'>
                                <table className="table-auto w-full border-separate border-spacing-0 " // pr-[6px]
                                >
                                    <thead className='sticky top-0 bg-white'>
                                        <tr>
                                            {tableHeaders.map((header) =>
                                                <th className={th}>{header}</th>
                                            )}
                                        </tr>
                                    </thead>
                                <tbody>
                                    {tableData.map((row) =>
                                        <tr>
                                            {row.map((data) =>
                                                <td className={td}>{data}</td>
                                            )}
                                        </tr>
                                    )}
                                        {/* <td className={td}>Data Analysis Run - 01-03-2023</td> */}
                                    

                                {/* <tr >
                                    <div className={td}>
                                        <input type="checkbox" />
                                    </div>
                                    <td className={td}>Seismic Data Analysis - 19-09-2023</td>
                                    <td className={td}>62 x 32</td>
                                    <td className={td}>Integral</td>
                                    <td className={td}>ParticleSwarm</td>
                                    <td className={td}>1</td>
                                    <td className={td}>/home/tony_stark/default/fwi</td>
                                </tr> */}
                            </tbody>
                            </table>
                            </div>
                        </div>
                        {/* <table className='table-auto'>
                            <thead>
                                <tr>
                                    <th>Run name</th>
                                    <th>Grid size</th>
                                    <th>Forward model</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Data Analysis Run - 01-03-2023</td>
                                    <td>62 x 32</td>
                                    <td>Integral</td>
                                </tr>
                                    <td>Data Analysis Run - 05-07-2023</td>
                                    <td>62 x 32</td>
                                    <td>FiniteDifferenceMPI</td>
                            </tbody>
                        </table> */}
                    </div>
                    {/* 873px */}

                    {/* <div className='relative w-[1746px] h-[952px]
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

                        
                    </div> */}
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