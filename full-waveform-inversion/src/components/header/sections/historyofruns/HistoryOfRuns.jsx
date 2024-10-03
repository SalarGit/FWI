import React, { useState, useContext, useEffect } from 'react';

import { SessionContext } from '../../../../store/session-context';

import { tableData } from '../../../../data';

import checkWhite from '../../../../assets/check-white.png';
import closeBig from '../../../../assets/close-big.png';

import H1 from '../../../custom/headings/H1';

import ModelParametersHOR from './ModelParametersHOR';
import ResidualFieldHOR from './ResidualFieldHOR';
import ResidualGraphHOR from './ResidualGraphHOR';
import QualityMetricsHOR from './QualityMetricsHOR';
import * as api from '../../../../api/apiService.js';

export default function HistoryOfRuns({ onClose }) {
    const { historyOfRuns, updateHistoryOfRuns } = useContext(SessionContext);

    const [selectedRuns, setSelectedRuns] = useState([]);
    const [selectedOutputType, setSelectedOutputType] = useState('Overview'); // Default could also be put in useEffect with historyOutputTypes[0]
    const [checkboxStatus, setCheckboxStatus] = useState({selectAll: true, clear: false})
    const [expandedRun, setExpandedRun] = useState(null);
    const [loading, setLoading] = useState(true);

    const tableHeaders = [
        // "Select",
        "Run name" ,
        "Grid size",
        "Forward model",
        "Minimization model",
        "Threads",
        "Case folder"
    ];
    const historyOutputTypes = [
        'Overview',
        'Residual field',
        'Residual graph',
        'Quality metrics'
    ];

    const isDisabled = selectedRuns.length === 0;

    useEffect(() => {
        async function getHistory() {
            const { successHistory, history } = await api.fetchHistoryOfRuns();
            updateHistoryOfRuns(history);
        }
        
        getHistory();
        setLoading(false);
    }, []);

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


    function handleAll() {
        if (selectedRuns.length === Object.keys(historyOfRuns).length) { // if all are selected
            // deselect all
            setSelectedRuns([]);
            return;
        } // else select all
        setSelectedRuns(Object.keys(historyOfRuns))
    }

    function handleSelectOutputType(outputType) {
        // Check if chosen output type is alrdy selected, so that site doesn't refresh unnecessarily.
        setSelectedOutputType((prev) => {
            if (prev !== outputType) {
                return outputType;
            }
        });
    }

    async function handleDownload() {
        await api.downloadCaseFolders(selectedRuns);
    }

    const th = 'text-start text-sm font-medium text-[#808080] px-6 py-[12px] border-b border-[#808080]'
    const td = 'px-6 py-3 border-b border-[#D7DFFF]'

    return (
        <>
            {/* Blur background */}
            <div className='fixed right-0 top-0 w-screen h-screen z-20 bg-black bg-opacity-[0.36] backdrop-blur-[2.5px]' />

            {/* Main container */}
            <div className='absolute top-0 left-0 z-30 size-full flex justify-center items-center'> {/* Disabled: #B6B7BE*/}
                <div className='flex flex-col'>
                    {/* Upper part */}
                    <div className='flex items-center justify-between px-6 py-[26px]
                        w-[1746px] h-[81px] bg-white  rounded-t-3xl
                        relative'
                    >
                        <H1 heading='History of runs'/> 
                        <div className='absolute left-1/2 transform -translate-x-1/2'>
                            <div className='relative flex items-center space-x-1
                                p-[6px] rounded-xl bg-[#F4F6FB]'
                            >
                                {historyOutputTypes.map((outputType) =>
                                // uncomment div & custom tooltip & remove title prop in button for custom tooltip (needs styling)
                                // <div className='relative group'>
                                    <> 
                                        <button title={isDisabled ? 'You need to select at least 1 run.' : undefined} className={`px-3 py-[6px] font-medium text-sm ${outputType === selectedOutputType ? 'bg-white rounded-s' : 'text-[#808080]'}
                                            ${isDisabled ? 'cursor-not-allowed' : ''}`}
                                            onClick={() => setSelectedOutputType(outputType)}
                                            disabled={isDisabled}
                                        >
                                            {outputType}
                                        </button>

                                        {/* <span className={`absolute z-50 bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-200 opacity-0 pointer-events-none 
                                            ${isDisabled ? 'group-hover:opacity-100' : ''}`}
                                        >
                                            You need to select at least 1 run.
                                        </span>

                                        <div className={`group ${isDisabled ? 'pointer-events-none' : ''}`} /> */}
                                    </>
                                // </div>
                                )}
                            </div>
                        </div>
                        <div className='flex space-x-6 items-center'>
                            <button className={`px-4 py-[10px] border rounded-xl 
                                ${selectedRuns.length === 0 ? 'border-[#B6B7BE] text-[#B6B7BE] cursor-not-allowed' : 'border-[#3561fe] text-[#3561fe]'}`}
                                onClick={handleDownload}
                                disabled={selectedRuns.length === 0}
                                title={isDisabled ? 'You need to select at least 1 run.' : undefined}
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
                        {selectedOutputType === 'Overview' &&
                        <div className='p-[10px] pb-3 bg-white border border-[#D7DFFF] rounded-2xl'>
                            <div className='max-h-[823px] overflow-y-auto scrollbar-webkit scrollbar-thin ml-[-10px]'>
                                
                                <table className="table-auto w-full border-separate border-spacing-0 " // pr-[6px]
                                >
                                    <thead className='sticky z-30 top-0 bg-white'>
                                        <tr>
                                            <th className={th}>
                                                <div className='flex items-center justify-center'>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className={`appearance-none size-[20px] border-2 rounded
                                                            peer cursor-pointer hover:border-[#3561FE] checked:bg-[#3561FE] checked:border-[#3561FE]`}
                                                            checked={selectedRuns.length === Object.keys(historyOfRuns).length && Object.keys(historyOfRuns).length > 0}
                                                            onChange={handleAll}
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none
                                                        opacity-0 peer-checked:opacity-100">
                                                            <img src={checkWhite} alt="check-white.png" />
                                                        </div>
                                                    </label>
                                                </div>
                                            </th>

                                            {/* headers */}
                                            {tableHeaders.map((header, headerIndex) =>
                                                <th key={headerIndex} className={th}>{header}</th>
                                            )}

                                            {/* empty th for extend button  */}
                                            <th className='px-2 border-b border-[#808080]'></th>
                                        </tr>
                                    </thead>
                                <tbody>
                                    {Object.keys(historyOfRuns).map((caseId) =>
                                        <React.Fragment key={caseId}>
                                            <tr>
                                                {/* checkbox */}
                                                <td className={`${td} ${selectedRuns.includes(caseId) ? 'bg-[#F1F4FF]' : ''}`}>
                                                    <div className='flex items-center justify-center'>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className={`appearance-none size-[20px] border-2 rounded
                                                                peer cursor-pointer hover:border-[#3561FE] checked:bg-[#3561FE] checked:border-[#3561FE]`}
                                                                checked={selectedRuns.includes(caseId)}
                                                                onChange={() => handleSelectRun(caseId)}
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none
                                                                opacity-0 peer-checked:opacity-100"
                                                            >
                                                                <img src={checkWhite} alt="check-white.png" />
                                                            </div>
                                                        </label>
                                                    </div>
                                                </td>

                                                {/* data */}
                                                <td className={`${td} ${selectedRuns.includes(caseId) ? 'bg-[#F1F4FF]' : ''} ${expandedRun === caseId ? 'text-[#3561FE]' : ''}`}>{caseId}</td>
                                                <td className={`${td} ${selectedRuns.includes(caseId) ? 'bg-[#F1F4FF]' : ''} ${expandedRun === caseId ? 'text-[#3561FE]' : ''}`}>{historyOfRuns[caseId].ngrid.x} x {historyOfRuns[caseId].ngrid.z}</td>
                                                <td className={`${td} ${selectedRuns.includes(caseId) ? 'bg-[#F1F4FF]' : ''} ${expandedRun === caseId ? 'text-[#3561FE]' : ''}`}>{historyOfRuns[caseId].forward}</td>
                                                <td className={`${td} ${selectedRuns.includes(caseId) ? 'bg-[#F1F4FF]' : ''} ${expandedRun === caseId ? 'text-[#3561FE]' : ''}`}>{historyOfRuns[caseId].minimization}</td>
                                                <td className={`${td} ${selectedRuns.includes(caseId) ? 'bg-[#F1F4FF]' : ''} ${expandedRun === caseId ? 'text-[#3561FE]' : ''}`}>{historyOfRuns[caseId].threads}</td>
                                                <td className={`${td} ${selectedRuns.includes(caseId) ? 'bg-[#F1F4FF]' : ''} ${expandedRun === caseId ? 'text-[#3561FE]' : ''}`}>{historyOfRuns[caseId].caseFolder}</td>

                                                {/* extend (model parameters) */}
                                                {/* Dropdown container */}
                                                <td className={`px-2 border-b border-[#D7DFFF] ${selectedRuns.includes(caseId) ? 'bg-[#F1F4FF]' : ''}`}>
                                                    <div className={`relative size-fit ${selectedRuns.includes(caseId) ? 'hover:bg-[#D7DFFF]': 'hover:bg-[#F1F4FF]'} rounded`}>
                                                        <button className={`absolute z-30 size-full peer `}
                                                            onClick={() => setExpandedRun(expandedRun === caseId ? null : caseId)}
                                                        >
                                                        </button>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`${expandedRun === caseId ? 'rotate-180 fill-[#3561FE]' : ''} duration-500`}>
                                                            <path d="M12.0008 15.2766C11.8674 15.2766 11.7424 15.2557 11.6258 15.2141C11.5091 15.1724 11.4008 15.1016 11.3008 15.0016L6.70078 10.4016C6.51745 10.2182 6.42578 9.9849 6.42578 9.70156C6.42578 9.41823 6.51745 9.1849 6.70078 9.00156C6.88411 8.81823 7.11745 8.72656 7.40078 8.72656C7.68411 8.72656 7.91745 8.81823 8.10078 9.00156L12.0008 12.9016L15.9008 9.00156C16.0841 8.81823 16.3174 8.72656 16.6008 8.72656C16.8841 8.72656 17.1174 8.81823 17.3008 9.00156C17.4841 9.1849 17.5758 9.41823 17.5758 9.70156C17.5758 9.9849 17.4841 10.2182 17.3008 10.4016L12.7008 15.0016C12.6008 15.1016 12.4924 15.1724 12.3758 15.2141C12.2591 15.2557 12.1341 15.2766 12.0008 15.2766Z"/>
                                                        </svg>
                                                    </div>
                                                </td>
                                            </tr>

                                            {/* expand (model parameters) */}
                                            {expandedRun === caseId && (
                                                <tr>
                                                    <td colSpan={tableHeaders.length + 2} className='bg-[#F4F6FB] border-b border-[#D7DFFF]'>
                                                        <div className='flex space-x-6 p-6 size-full'>
                                                            <div className='flex space-x-6  w-1/2 p-6 
                                                                bg-white border border-[#3561FE] rounded-3xl'
                                                            >
                                                                <div className='size-12 rounded-xl bg-[#EEF9FC] flex items-center justify-center'>
                                                                    <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.74996 14.6645L7.33575 12.2502H2.74996C2.45349 12.2502 2.1723 12.1187 1.9823 11.8911C1.7923 11.6635 1.71309 11.3634 1.76604 11.0716L1.76643 11.0695L1.76702 11.0663L1.76885 11.0565L1.77505 11.0242C1.78033 10.9972 1.78793 10.9593 1.79795 10.9118C1.81795 10.8169 1.8477 10.6832 1.88797 10.5209C1.96812 10.1978 2.09179 9.75368 2.26614 9.27301C2.5906 8.37852 3.17903 7.09802 4.19394 6.41908L4.19526 6.4182C4.79025 6.02154 5.48804 5.85785 6.1221 5.79891C6.76479 5.73918 7.41791 5.78033 7.98528 5.85345C8.51088 5.92119 8.98599 6.01947 9.34491 6.10535C10.5558 4.39646 12.1399 2.98077 13.981 1.96812C16.0559 0.826949 18.3882 0.23558 20.7562 0.250267C21.306 0.253678 21.75 0.700384 21.75 1.25025C21.75 4.06054 20.9616 8.95793 15.8976 12.6669C15.9828 13.0244 16.0797 13.495 16.1468 14.0149C16.2199 14.5823 16.261 15.2354 16.2013 15.8781C16.1424 16.5122 15.9787 17.21 15.582 17.8049L15.5811 17.8063C14.9022 18.8212 13.6217 19.4096 12.7272 19.7341C12.2465 19.9084 11.8024 20.0321 11.4793 20.1122C11.317 20.1525 11.1833 20.1823 11.0884 20.2023C11.0409 20.2123 11.003 20.2199 10.976 20.2252L10.9437 20.2314L10.9339 20.2332L10.9307 20.2338L10.9295 20.234L10.75 19.2502C10.9286 20.2342 10.9295 20.234 10.9295 20.234C10.6378 20.287 10.3367 20.2079 10.1091 20.0179C9.88151 19.8279 9.74996 19.5467 9.74996 19.2502V14.6645ZM14.9449 3.72056C16.4175 2.9106 18.0417 2.42424 19.7091 2.28893C19.505 4.8618 18.4303 8.57061 14.21 11.4083L14.1979 11.4162C13.1778 12.0599 12.1052 12.6157 10.9919 13.078L8.92465 11.0107C9.38897 9.90842 9.94681 8.84747 10.5922 7.83948L10.5978 7.83051C11.6725 6.11214 13.169 4.6973 14.9449 3.72056ZM14.0913 13.8012C13.3325 14.2202 12.5509 14.5966 11.75 14.9288V17.9556C11.8461 17.9242 11.9449 17.8903 12.0452 17.8539C12.9078 17.5411 13.627 17.1298 13.9183 16.6949C14.0615 16.4799 14.1676 16.1479 14.2099 15.693C14.2514 15.2463 14.225 14.7507 14.1632 14.2706C14.1422 14.1083 14.1177 13.9508 14.0913 13.8012ZM7.72964 7.83705C7.89856 7.85882 8.06224 7.88454 8.21729 7.91216C7.79273 8.66918 7.41127 9.44979 7.0748 10.2502H4.04463C4.07602 10.1542 4.10988 10.0553 4.14628 9.95499C4.45916 9.09241 4.87048 8.3732 5.30533 8.08185C5.52036 7.93874 5.85235 7.83261 6.30719 7.79033C6.75389 7.74881 7.24951 7.77517 7.72964 7.83705Z" fill="#53C0E2"/>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.7531 14.2388C3.96994 14.2145 3.20542 14.4803 2.60615 14.9851C2.07938 15.4278 1.69259 16.0377 1.40611 16.6242C1.11392 17.2224 0.891879 17.8679 0.72602 18.4477C0.559248 19.0308 0.443342 19.5685 0.369076 19.9596C0.331811 20.1559 0.304704 20.317 0.286708 20.4305C0.277703 20.4873 0.27096 20.5323 0.266352 20.564L0.261018 20.6014L0.259518 20.6123L0.259054 20.6157L0.25883 20.6174C0.217541 20.9262 0.322524 21.237 0.542854 21.4574C0.763184 21.6777 1.07448 21.7826 1.38332 21.7413L1.38452 21.7412L1.38793 21.7407L1.39879 21.7392L1.43618 21.7339C1.46787 21.7292 1.51289 21.7225 1.56969 21.7135C1.68322 21.6955 1.8443 21.6684 2.04056 21.6311C2.4317 21.5569 2.96944 21.441 3.55247 21.2742C4.13232 21.1083 4.77785 20.8863 5.37604 20.5941C5.96235 20.3077 6.57202 19.9211 7.01469 19.3946C8.03572 18.1854 8.05096 16.302 6.86255 15.1287L6.8504 15.1169C6.28341 14.5757 5.53653 14.263 4.7531 14.2388ZM1.38332 21.7413L1.24996 20.7502C1.38247 21.7414 1.38332 21.7413 1.38332 21.7413ZM1.24996 20.7502L0.25883 20.6174C0.25883 20.6174 0.258779 20.6177 1.24996 20.7502ZM3.00245 19.3513C2.83719 19.3986 2.67545 19.4413 2.52041 19.4798C2.55887 19.3248 2.60163 19.163 2.6489 18.9978C2.79554 18.4851 2.97975 17.9594 3.20319 17.502C3.43222 17.0331 3.67024 16.7032 3.89315 16.516L3.89438 16.5149C4.11678 16.3275 4.40057 16.2288 4.69127 16.2378C4.97909 16.2467 5.25362 16.3605 5.46323 16.5577C5.84892 16.9451 5.88222 17.6362 5.48623 18.1047L5.48426 18.1071C5.29701 18.33 4.96715 18.568 4.49825 18.797C4.04082 19.0205 3.51511 19.2047 3.00245 19.3513Z" fill="#53C0E2"/>
                                                                    </svg>
                                                                </div>
                                                                <div className='flex flex-col space-y-6'>
                                                                    <p className='text-base font-semibold'>Minimization model parameters</p>
                                                                    <ModelParametersHOR caseId={caseId} model='forward' />
                                                                </div>
                                                            </div>
                                                            {/* h-[250px] */}
                                                            <div className='flex space-x-6  w-1/2 p-6 
                                                                bg-white border border-[#3561FE] rounded-3xl'
                                                            >
                                                                <div className='size-12 rounded-xl bg-[#FEEEF3] flex items-center justify-center'>
                                                                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M14.4142 7L19.7071 1.70711C20.0976 1.31658 20.0976 0.683418 19.7071 0.292893C19.3166 -0.0976311 18.6834 -0.0976311 18.2929 0.292893L13 5.58579V2C13 1.44772 12.5523 1 12 1C11.4477 1 11 1.44772 11 2V8C11 8.13559 11.027 8.26488 11.0759 8.38278C11.1236 8.49805 11.1937 8.6062 11.2864 8.70055L11.2995 8.7136C11.4792 8.8901 11.7254 8.9992 11.997 9L12 9H18C18.5523 9 19 8.55229 19 8C19 7.44772 18.5523 7 18 7H14.4142Z" fill="#F25A8C"/>
                                                                        <path d="M1 12C1 11.4477 1.44772 11 2 11H8C8.27282 11 8.52013 11.1093 8.70055 11.2864L8.7136 11.2995C8.80626 11.3938 8.87643 11.502 8.92412 11.6172C8.97265 11.7343 8.9996 11.8625 9 11.997L9 12V18C9 18.5523 8.55229 19 8 19C7.44772 19 7 18.5523 7 18V14.4142L1.70711 19.7071C1.31658 20.0976 0.683418 20.0976 0.292893 19.7071C-0.0976311 19.3166 -0.0976311 18.6834 0.292893 18.2929L5.58579 13H2C1.44772 13 1 12.5523 1 12Z" fill="#F25A8C"/>
                                                                    </svg>
                                                                </div>
                                                                <div className='flex flex-col space-y-6'>
                                                                    <p className='text-base font-semibold'>Minimization model parameters</p>
                                                                    <ModelParametersHOR caseId={caseId} model='minimization' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    )}
                            </tbody>
                            </table>
                            </div>
                        </div>
                        }
                        {
                            selectedOutputType === 'Residual field' &&
                            <ResidualFieldHOR selectedRuns={selectedRuns} />
                        }
                        {
                            selectedOutputType === 'Residual graph' &&
                            <ResidualGraphHOR selectedRuns={selectedRuns} />
                        }
                        {
                            selectedOutputType === 'Quality metrics' &&
                            <QualityMetricsHOR selectedRuns={selectedRuns} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}