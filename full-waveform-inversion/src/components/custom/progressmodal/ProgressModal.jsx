import { useState, useContext, useEffect } from "react"; // allows us to access the context value

import { SessionContext } from "../../../store/session-context";

import hourglass from '../../../assets/hourglass.svg';
import pin from '../../../assets/pin.svg';
import pinFilled from '../../../assets/pinFilled.svg';
import seperator from '../../../assets/seperator.svg';

import ProgressBar from './ProgressBar.jsx';

export default function ProgressModal() {
    const { progressingRuns, cpuUsage } = useContext(SessionContext);
    
    const [minimized, setMinimized] = useState(false);
    const [remaining, setRemaining] = useState([0, 0]); // remaining out of total
    const [timeElapsed, setTimeElapsed] = useState(0); // elapsed time in seconds
    // const [divHeight, setDivHeight] = useState(0);
    
    // drag state
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


            // Minimize progress modal -> initialize remaining runs
            if (!prev) {
                // remaining out of total
                setRemaining([progressingRunsLength, progressingRunsLength])
            } else {
                setRemaining([0, 0]);
            }
            
            return !prev
        });
    }

    useEffect(() => {
        if (progressingRunsLength === 0 && minimized) {
            // Set minimized to false when progressingRunsLength becomes 0
            setMinimized(false);
            setRemaining([0, 0]); // Reset remaining runs if needed
        } else if (minimized) {
            setRemaining((prev) => {
                const prevRemaining = prev[0];
                const prevTotal = prev[1];
    
                if (progressingRunsLength > prevRemaining) {
                    // new run started
                    return [prevRemaining + 1, prevTotal + 1];
                } else if (progressingRunsLength < prevRemaining) {
                    // run finished
                    return [prevRemaining - 1, prevTotal];
                }
                return prev; // Return previous state if no change
            });
        }
    }, [progressingRunsLength, minimized]);

    // Start the timer when the modal is rendered
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTimeElapsed((prev) => prev + 1); // Increment elapsed time by 1 second every second
    //     }, 1000);

    //     // Clean up the interval when the modal is removed
    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        let interval = null; // Initialize the interval variable

        if (progressingRunsLength > 0) {
            // Start the timer when progressingRunsLength > 0
            interval = setInterval(() => {
                setTimeElapsed((prev) => prev + 1); // Increment elapsed time by 1 second every second
            }, 1000);
        } else {
            // Stop the timer when progressingRunsLength <= 0
            clearInterval(interval);
            setTimeElapsed(0); // Optional: Reset timeElapsed when the timer stops
        }

        // Clean up the interval when the component unmounts or when progressingRunsLength changes
        return () => clearInterval(interval);
    }, [progressingRunsLength]); // Dependency on progressingRunsLength

    // Helper function to format time in seconds into minutes and seconds
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}s`;
    }

    
    // const handleMouseDown = (e) => {
        //     setIsDragging(true);
        //     // Calculate the offset between mouse position and the top-left corner of the component
        //     setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
        // };
        
        // const handleMouseMove = (e) => {
    //     if (isDragging) {
        //         // Set the new position based on mouse movement
        //         setPosition({
            //             x: e.clientX - offset.x,
            //             y: e.clientY - offset.y,
            //         });
            //     }
            // };
            
            // const handleMouseUp = () => {
                //     setIsDragging(false);
                // };
                    
    // Drag functions
    function handleDragStart(event) {
        event.dataTransfer.setData("text", event.target.id);

        setIsDragging(true);
    }

    function drop(event) {
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

    // useEffect(() => {
    //     // Function to get the height of the div
    //     const updateDivHeight = () => {
    //       const divElement = document.querySelector('.listen');
    //       if (divElement) {
    //         const height = divElement.getBoundingClientRect().height;
    //         setDivHeight(height);  // Save height in state
    //         console.log(height)
    //       }
    //     };
    
    //     // Call the function initially and when child elements change
    //     updateDivHeight();
    
    //     // You can also add event listeners to update when needed, if necessary
    //     window.addEventListener('resize', updateDivHeight);
    
    //     // Clean up event listener on component unmount, if added
    //     return () => window.removeEventListener('resize', updateDivHeight);
    // }, []);

    return (
        <>
            {/* progressingRuns */}
            {/* {Object.keys(sessionRuns).length > 0 && */}
            {/* {true && */}
            {/* {progressingRunsLength > 0 && */}
            {true &&
                <>
                    {!minimized ? 
                        <>
                            <div id='draggableElement'
                                draggable
                                onDragStart={(event) => handleDragStart(event)}
                                onDragEnd={() => setIsDragging(false)}
                                // left-[1360px]
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
                                    {/* <div className='flex flex-col items-center justify-center w-1/3 space-y-2'>
                                        <p className='text-[#7f7f7f] text-sm font-medium'>Time Remaining</p>
                                        <p className='font-semibold'>0m 47s</p>
                                    </div> */}
                                    <div className='border-r border-[#d7dfff]'></div>
                                    <div className='flex flex-col items-center justify-center w-1/3 space-y-2'>
                                        <p className='text-[#7f7f7f] text-sm font-medium'>CPU Usage</p>
                                        <p className='font-semibold'>{cpuUsage}%</p>
                                    </div>
                                </div>

                                {/* progression bars */}
                                <div className='flex flex-col space-y-3'>
                                    {Object.keys(progressingRuns).map((progressingRunCaseId) => (
                                        <ProgressBar caseId={progressingRunCaseId}/>
                                    ))}
                                </div>
                            </div>
                            
                            <div id='destination1' 
                                onDragOver={(event) => allowDrop(event)}
                                onDrop={(event) => drop(event)}
                                className={`absolute z-[46] top-9 left-[30px] rounded-2xl border border-[#D7DFFF]
                                    ${minimized ? 'w-[203px] h-[158px]' : 'w-[470px] h-[240px]'}
                                    ${!isDragging && 'destination1' !== destination ? 'hidden pointer-events-none' : ''}
                                    ${'destination1' === destination ? 'border-0' : ''}   
                                `}
                            />
                            <div id='destination2'
                                onDragOver={(event) => allowDrop(event)}
                                onDrop={(event) => drop(event)}
                                className={`absolute z-[46] top-9 right-8 rounded-2xl border border-[#D7DFFF]
                                    ${minimized ? 'w-[203px] h-[158px]' : 'w-[470px] h-[240px]'}
                                    ${!isDragging && 'destination2' !== destination ? 'hidden pointer-events-none' : ''}
                                    ${'destination2' === destination ? 'border-0' : ''}
                                `}
                            />
                            <div id='destination3' 
                                onDragOver={(event) => allowDrop(event)}
                                onDrop={(event) => drop(event)}
                                className={`absolute z-[46] right-8 bottom-7  rounded-2xl border border-[#D7DFFF]
                                    ${minimized ? 'w-[203px] h-[158px]' : 'w-[470px] h-[240px]'}
                                    ${!isDragging && 'destination3' !== destination ? 'hidden pointer-events-none' : ''}
                                    ${'destination3' === destination ? 'border-0' : ''}
                                `}
                            />
                            <div id='destination4' 
                                onDragOver={(event) => allowDrop(event)}
                                onDrop={(event) => drop(event)}
                                className={`absolute z-[46] left-[30px] bottom-7 rounded-2xl border border-[#D7DFFF]
                                    ${minimized ? 'w-[203px] h-[158px]' : 'w-[470px] h-[240px]'}
                                    ${!isDragging && 'destination4' !== destination ? 'hidden pointer-events-none' : ''}
                                    ${'destination4' === destination ? 'border-0' : ''}
                                `}
                            />


                            {/* {isDragging && */}
                                {/* <div className={`z-[45] absolute bottom-7 left-[30px] w-[1800px] h-[1016px] border border-[#D7DFFF]
                                    grid grid-cols-2`}
                                    // ${!isDragging && ' pointer-events-none'}
                                > */}
                                    
                                    {/* <div className={`z-50 absolute right-0 top-0 rounded-2xl border border-[#D7DFFF] w-[470px] h-[240px] `} />
                                    <div className={`z-50 absolute right-0 bottom-0 rounded-2xl border border-[#D7DFFF] w-[470px] h-[240px] `} />
                                    <div className={`z-50 absolute left-0 bottom-0 rounded-2xl border border-[#D7DFFF] w-[470px] h-[240px] `} /> */}
                                {/* </div> */}
                                {/* 240, 158 */}
                                
                            {/* } */}
                        </>
                    :
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
                                {/* <p className="text-[#d7dfff]">/</p> */}
                                <img src={seperator} alt="seperator.svg" />
                                <p className="font-semibold">{formatTime(timeElapsed)}</p>
                            </div>

                            {/* average progress */}
                            <div className="flex flex-col space-y-3 bg-[#f4f6fb] p-3">
                                
                                
                                {/* bar */}
                                <ProgressBar />
                            </div>
                        </div>
                            <div id='destination1' 
                                onDragOver={(event) => allowDrop(event)}
                                onDrop={(event) => drop(event)}
                                className={`absolute z-[46] top-9 left-[30px] rounded-2xl border border-[#D7DFFF] w-[203px] h-[158px]
                                    ${!isDragging && 'destination1' !== destination ? 'hidden pointer-events-none' : ''}
                                    ${'destination1' === destination ? 'border-0' : ''}
                                `}
                            />
                            <div id='destination2'
                                onDragOver={(event) => allowDrop(event)}
                                onDrop={(event) => drop(event)}
                                className={`absolute z-[46] top-9 right-8 rounded-2xl border border-[#D7DFFF] w-[203px] h-[158px]
                                ${!isDragging && 'destination2' !== destination ? 'hidden pointer-events-none' : ''}
                                ${'destination2' === destination ? 'border-0' : ''}
                                `}
                            />
                            <div id='destination3' 
                                onDragOver={(event) => allowDrop(event)}
                                onDrop={(event) => drop(event)}
                                className={`absolute z-[46] right-8 bottom-7 rounded-2xl border border-[#D7DFFF] w-[203px] h-[158px]
                                ${!isDragging && 'destination3' !== destination ? 'hidden pointer-events-none' : ''}
                                ${'destination3' === destination ? 'border-0' : ''}
                                `}
                            />
                            <div id='destination4' 
                                onDragOver={(event) => allowDrop(event)}
                                onDrop={(event) => drop(event)}
                                className={`absolute z-[46] left-[30px] bottom-7 rounded-2xl border border-[#D7DFFF] w-[203px] h-[158px]
                                ${!isDragging && 'destination4' !== destination ? 'hidden pointer-events-none' : ''}
                                ${'destination4' === destination ? 'border-0' : ''}
                                `}
                            />
                            </>

                    }
                    
                </>
            }
        </>
    )
}

            // if-statement, if prev === false, that means its now becoming true aka its now minimized
            // this means im gonna need the total amount of progressingRuns. Then I need a useEffect that does this:
            // everytime progressingruns changes, I need to check whether it went up or down. if it went up, I need to
            // add it to the total remaining. if it went down i need to remove it from the remaining. This is kinda
            // frisky, since there are some edge cases to this. Example:
            // if a progressingrun is added. no actually no edge case. Initially when minimize becomes true, I do
            // totalremaining = progressingRuns.length
            // but when progressingruns changes and it goes +1 from the prev progressingRuns, then I do
            // totalremaining + 1. Ez fix. So totalremainign can be 8 even though progressingruns is 2, it dont matter.
            // remaining will always be the same as progressingRuns tho. it will always follow it.