import React from 'react';
import { useState } from 'react';

import { tableHeaders, tableData, historyOutputTypes } from '../../../../data';

import checkWhite from '../../../../assets/check-white.png'
import checkBlue from '../../../../assets/check.png'
import dropdown from '../../../../assets/dropdown.png'

import UpperPart from '../../../custom/UpperPart';
import closeBig from '../../../../assets/close-big.png';
import search from '../../../../assets/search.png';
import BorderTop from '../../../custom/borders/BorderTop';
import BorderBottom from '../../../custom/borders/BorderBottom';
import H1 from '../../../custom/headings/H1';

export default function HistoryOfRuns({ onClose }) {
    const [selectedRuns, setSelectedRuns] = useState([]);
    const [selectedOutputType, setSelectedOutputType] = useState(historyOutputTypes[0]);
    const [checkboxStatus, setCheckboxStatus] = useState({selectAll: true, clear: false})
    const [expandedRun, setExpandedRun] = useState(null);

    function handleSelectRun(run) {
        setSelectedRuns((prevSelectedRuns) => {
            if (prevSelectedRuns.includes(run)) {
                // If run already selected; update select options (if required) & remove run
                if (prevSelectedRuns.length === tableData.length && checkboxStatus.selectAll !== true) {
                    setCheckboxStatus((prevStatus) => ({
                        ...prevStatus, 
                        selectAll: true
                    }))
                }
                if (prevSelectedRuns.length === 1 && checkboxStatus.clear !== false) {
                    setCheckboxStatus((prevStatus) => ({
                        ...prevStatus, 
                        clear: false
                    }))
                }

                return prevSelectedRuns.filter((i) => i !== run)
            } else {
                // If run not checked, update select options (if required) & add it
                if (prevSelectedRuns.length === 0 && checkboxStatus.clear !== true) {
                    setCheckboxStatus((prevStatus) => ({
                        ...prevStatus, 
                        clear: true
                    }))
                }
                if (prevSelectedRuns.length + 1 === tableData.length && checkboxStatus.selectAll !== false) {
                    setCheckboxStatus((prevStatus) => ({
                        ...prevStatus, 
                        selectAll: false
                    }))
                }

                return [...prevSelectedRuns, run]
            }
        })      
    }

    function handleSelectOptions(option) {
        if (option === 'SELECT ALL') {
            setSelectedRuns(tableData)
            setCheckboxStatus({
                selectAll: false,
                clear: true
            })
        }
        else if (option === 'CLEAR') {
            setSelectedRuns([])
            setCheckboxStatus({
                selectAll: true,
                clear: false
            })
        }
    }

    function handleSelectOutputType(outputType) {
        // Check if chosen output type is alrdy selected, so that site doesn't refresh unnecessarily.
        setSelectedOutputType((prev) => {
            if (prev !== outputType) {
                return outputType;
            }
        });
    }

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
                        w-[1746px] h-[81px] bg-white  rounded-t-3xl
                        relative'
                    >
                        <H1 heading='History of runs'/> 
                        {/* px-6 py-[26px]  */}
                        {/* <div className='absolute  -full flex items-center justify-center'> This way 'X' button becomes unclickable */}
                        <div className='absolute left-1/2 transform -translate-x-1/2'>
                            <div className='flex items-center space-x-1
                                p-[6px] rounded-xl bg-[#F4F6FB]'
                            >
                                {historyOutputTypes.map((outputType) =>
                                    <button className={`px-3 py-[6px] font-medium text-sm ${outputType === selectedOutputType ? 'bg-white rounded-s' : 'text-[#808080]'}`}
                                        onClick={() => setSelectedOutputType(outputType)}
                                    >
                                        {outputType}
                                    </button> 
                                )}
                            </div>
                            {selectedRuns.map((run) => 
                                <div>{run[0]}</div>
                            )}
                            
                            {/* <div className='pl-[500px] relative'>
                                <input type='checkbox' className='peer
                                    appearance-none size-4 border-2 border-black rounded cursor-pointer
                                    hover:border-[#3561FE] checked:bg-[#3561FE] checked:border-[#3561FE]'
                                />
                                <img src={checkWhite} alt="check-white.png" 
                                    className='absolute top-0 left-0 hidden peer-checked:block'
                                />
                            </div> */}
                        </div>
                        <div className='flex space-x-6 items-center'>
                            <button className={`px-4 py-[10px] border rounded-xl 
                                ${selectedRuns.length === 0 ? 'border-[#B6B7BE] text-[#B6B7BE] cursor-not-allowed' : 'border-[#3561fe] text-[#3561fe]'}`}
                                disabled={selectedRuns.length === 0}
                                title='Download all selected runs'
                            >
                                Download
                            </button>
                            <button className='hover:bg-[#F1F4FF] duration-200 rounded-md size-6'
                                onClick={onClose}
                            >
                                <img src={closeBig} alt="close-big.png" />
                            </button>
                        </div>
                    </div>

                    {/* Lower part */}
                    <div className='w-[1746px] h-[897px] bg-[#F4F6FB] border border-[#D7DFFF] rounded-b-3xl p-6'>
                        
                        {/* This 10px padding is removed from the inner div using minus margin & table (by simple taking 6px from the padding)
                            to keep the visuals the same. */}
                        <div className='p-[10px] pb-3 bg-white border border-[#D7DFFF] rounded-2xl'>
                            <div className='max-h-[823px] overflow-y-auto scrollbar-webkit ml-[-10px]'>
                                <table className="table-auto w-full border-separate border-spacing-0 " // pr-[6px]
                                >
                                    <thead className='sticky z-30 top-0 bg-white'>
                                        <tr>
                                            {/* select options */}
                                            <th className={`py-[12px] px-2 bg-white 
                                                text-start text-sm font-medium text-[#808080]
                                                border-b border-[#808080]
                                                flex justify-center -mt-1`}
                                            >
                                                <div>
                                                    <button className={`p-1 ${checkboxStatus.selectAll ? 'text-[#3561FE]' : 'cursor-not-allowed text-[#808080]'}`}
                                                        onClick={() => handleSelectOptions('SELECT ALL')}
                                                        disabled={selectedRuns.length === tableData.length}
                                                        title='Select all runs in the overview'
                                                    >
                                                        Select all
                                                    </button>
                                                    <span className='border-r border-[#808080]'></span>
                                                    <button className={`p-1 ${checkboxStatus.clear ? 'text-[#3561FE]' : 'cursor-not-allowed text-[#808080]'}`}
                                                        // onClick={() => setSelectedRuns([])}
                                                        onClick={() => handleSelectOptions('CLEAR')}
                                                        disabled={selectedRuns.length === 0}
                                                        title='Deselect all runs in the overview'
                                                    >
                                                        Clear
                                                    </button>
                                                </div>
                                            </th>

                                            {/* headers */}
                                            {tableHeaders.map((header, index) =>
                                                <th key={index} className={th}>{header}</th>
                                            )}

                                            {/* extend (model parameters) */}
                                            <th className='px-2 border-b border-[#808080]'></th>
                                        </tr>
                                    </thead>
                                <tbody>
                                    {tableData.map((row, index) =>
                                        <React.Fragment key={index}>
                                            <tr>
                                                {/* checkbox */}
                                                <td className={`${td} ${selectedRuns.includes(row) ? 'bg-[#F1F4FF]' : ''}`}>
                                                    <div className='flex items-center justify-center'>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            {/* If the user manually checks a checkbox, it will check. If the user clicks 'Select all', I have to
                                                            explicitly check the checkbox using 'Checked={}'. This is because 'Select all' just adds all the runs
                                                            to 'selectedRuns'. It doesn't actually check all the runs in the table.*/}
                                                            <input type="checkbox" className={`appearance-none size-[20px] border-2 rounded
                                                                peer cursor-pointer hover:border-[#3561FE] checked:bg-[#3561FE] checked:border-[#3561FE]`}
                                                                checked={selectedRuns.includes(row)}
                                                                onChange={() => handleSelectRun(row)}
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none
                                                            opacity-0 peer-checked:opacity-100">
                                                                <img src={checkWhite} alt="check-white.png" />
                                                            </div>
                                                        </label>
                                                    </div>
                                                </td>

                                                {/* data */}
                                                {row.map((data, index) =>
                                                    // <span>
                                                        <td key={index} className={`${td} ${selectedRuns.includes(row) ? 'bg-[#F1F4FF]' : ''}`}>{data}</td>
                                                    // </span>
                                                )}

                                                {/* extend (model parameters) */}
                                                {/* px-6 py-3 */}
                                                <td className={`px-2 bg- border-b border-[#D7DFFF] ${selectedRuns.includes(row) ? 'bg-[#F1F4FF]' : ''}`}>
                                                    <div className='relative size-fit'>
                                                        <button className="absolute size-full peer"
                                                            onClick={() => setExpandedRun(expandedRun === index ? null : index)}
                                                        >
                                                        </button>
                                                        <img src={dropdown} alt="dropdown.png"
                                                            className={`${selectedRuns.includes(row) ? 'peer-hover:bg-[#D7DFFF]': 'peer-hover:bg-[#F1F4FF]'} rounded`}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>

                                            {/* expand (model parameters) */}
                                            {expandedRun === index && (
                                                <tr>
                                                    <td colSpan={tableHeaders.length + 2} className='bg-[#F4F6FB] border-b border-[#D7DFFF]'>
                                                        {/* This is where you put your extra details */}
                                                        <div className="p-6">
                                                            <p>Extra details for row {index}</p>
                                                            {/* You can use data from the row here */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
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