import React, { useState, useContext, useEffect } from "react"; // allows us to access the context value

import { SessionContext } from "../../../store/session-context";

import hourglass from '../../../assets/hourglass.svg';
import pin from '../../../assets/pin.svg';
import pinFilled from '../../../assets/pinFilled.svg';
import seperator from '../../../assets/seperator.svg';

import ProgressBar from './ProgressBar.jsx';

export default function ProgressModal() {
    const { progressingRuns, cpuUsage } = useContext(SessionContext);
    
    const [minimized, setMinimized] = useState(false);
    const [remaining, setRemaining] = useState([0, 0]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [hasDragged, setHasDragged] = useState(false);
    const [destination, setDestination] = useState('');

    const progressingRunsLength = Object.keys(progressingRuns).length;

    const destinations = [
        { id: 'destination1', styles: 'top-9 left-[30px]' },
        { id: 'destination2', styles: 'top-9 right-8' },
        { id: 'destination3', styles: 'right-8 bottom-7' },
        { id: 'destination4', styles: 'left-[30px] bottom-7' }
    ];

    function handleMinimize() {
        setMinimized((prev) => {
            if (!prev) {
                setRemaining([progressingRunsLength, progressingRunsLength])
            } else {
                setRemaining([0, 0]);
            }
            
            return !prev
        });
    }

    useEffect(() => {
        if (progressingRunsLength === 0 && minimized) {
            setMinimized(false);
            setRemaining([0, 0]);
        } else if (minimized) {
            setRemaining((prev) => {
                const prevRemaining = prev[0];
                const prevTotal = prev[1];
    
                if (progressingRunsLength > prevRemaining) {
                    // A new run started
                    return [prevRemaining + 1, prevTotal + 1];
                } else if (progressingRunsLength < prevRemaining) {
                    // A Run finished
                    return [prevRemaining - 1, prevTotal];
                }
                return prev;
            });
        }
    }, [progressingRunsLength, minimized]);

    useEffect(() => {
        let interval = null;

        if (progressingRunsLength > 0) {
            interval = setInterval(() => {
                setTimeElapsed((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
            setTimeElapsed(0);
        }

        return () => clearInterval(interval);
    }, [progressingRunsLength]);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}s`;
    }

    function handleDragStart(event) {
        event.dataTransfer.setData("text", event.target.id);

        setIsDragging(true);
    }

    function handleDrop(event) {
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));
        console.log(event.target.id)

        setHasDragged(true);
        setDestination(event.target.id);
        setIsDragging(false);
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    return (
        <>
            {progressingRunsLength > 0 &&
                <>
                    {!minimized ? (
                        <>
                            <div id='draggableElement'
                                draggable
                                onDragStart={(event) => handleDragStart(event)}
                                onDragEnd={() => setIsDragging(false)}
                                className={`absolute z-[47] ${!hasDragged && 'bottom-7 right-8'} w-[470px] p-3 pt-6
                                bg-white rounded-2xl border border-[#D7DFFF]
                                flex flex-col`}
                            >
                                {/* header */}
                                <div className="mb-[22px] relative flex items-center justify-center space-x-1">
                                    <img src={hourglass} alt={hourglass} />
                                    <p className="font-medium uppercase">CALCULATING...</p>
                                    <button onClick={handleMinimize}
                                        className="absolute right-0 flex items-center justify-center
                                        size-12 rounded-xl hover:bg-[#f1f4ff]"
                                    >
                                        <img src={pin} alt="pin.svg" />
                                    </button>
                                </div>

                                {/* data */}
                                <div className='mb-9 flex h-[68px]'>
                                    <div className='flex flex-col items-center justify-center w-1/3 space-y-2'>
                                        <p className='text-[#7f7f7f] text-sm font-medium'>Time Elapsed</p>
                                        <p className='font-semibold'>{formatTime(timeElapsed)}</p>
                                    </div>
                                    <div className='border-r border-[#d7dfff]'></div>
                                    <div className='flex flex-col items-center justify-center w-1/3 space-y-2'>
                                        <p className='text-[#7f7f7f] text-sm font-medium'>Remaining Runs</p>
                                        <p className='font-semibold'>{progressingRunsLength}</p> {/* -1 because cpu_usage is a key */}
                                    </div>
                                    <div className='border-r border-[#d7dfff]'></div>
                                    <div className='flex flex-col items-center justify-center w-1/3 space-y-2'>
                                        <p className='text-[#7f7f7f] text-sm font-medium'>CPU Usage</p>
                                        <p className='font-semibold'>{cpuUsage}%</p>
                                    </div>
                                </div>

                                {/* progression bars */}
                                <div className='flex flex-col space-y-3'>
                                    {Object.keys(progressingRuns).map((progressingRunCaseId) => (
                                        <ProgressBar key={progressingRunCaseId} caseId={progressingRunCaseId}/>
                                    ))}
                                </div>
                            </div>

                            {destinations.map((destinationObj) => (
                                <div id={destinationObj.id}
                                    key={destinationObj.id}
                                    onDragOver={(event) => allowDrop(event)}
                                    onDrop={(event) => handleDrop(event)}
                                    className={`absolute z-[46] ${destinationObj.styles} rounded-2xl border border-[#D7DFFF]
                                        ${minimized ? 'w-[203px] h-[158px]' : 'w-[470px] h-[240px]'}
                                        ${!isDragging && destinationObj.id !== destination ? 'hidden pointer-events-none' : ''}
                                        ${destinationObj.id === destination ? 'border-0' : ''}
                                    `}
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            <div id='draggableElement' 
                                draggable
                                onDragStart={(event) => handleDragStart(event)}
                                className={`absolute z-[47] ${!hasDragged && 'bottom-7 right-8'} w-[203px] h-[158px] p-3
                                bg-white rounded-2xl border border-[#D7DFFF]
                                flex flex-col`}
                            >
                                {/* header */}
                                <div className="relative mb-1">
                                    <p className="text-center text-sm font-medium text-[#7f7f7f]">Remaining</p>
                                    <button onClick={handleMinimize}
                                        className="absolute -right-[6px] -top-[6px] flex items-center justify-center
                                        size-8 rounded-xl hover:bg-[#f1f4ff]"
                                    >
                                        <img src={pinFilled} alt="pinFilled.svg" />
                                    </button>
                                </div>

                                {/* data */}
                                <div className="mb-[14px] flex items-center justify-center space-x-4">
                                    <p className="font-semibold">{remaining[0]} of {remaining[1]}</p>
                                    <img src={seperator} alt="seperator.svg" />
                                    <p className="font-semibold">{formatTime(timeElapsed)}</p>
                                </div>

                                {/* average progress */}
                                <div className="flex flex-col space-y-3 bg-[#f4f6fb] p-3">
                                    <ProgressBar />
                                </div>
                            </div>

                            {destinations.map((destinationObj) => (
                                <div id={destinationObj.id}
                                    key={destinationObj.id}
                                    onDragOver={(event) => allowDrop(event)}
                                    onDrop={(event) => handleDrop(event)}
                                    className={`absolute z-[46] ${destinationObj.styles} rounded-2xl border border-[#D7DFFF] w-[203px] h-[158px]
                                        ${!isDragging && destinationObj.id !== destination ? 'hidden pointer-events-none' : ''}
                                        ${destinationObj.id === destination ? 'border-0' : ''}
                                    `}
                                />
                            ))}
                        </>
                    )}
                    
                </>
            }
        </>
    )
}