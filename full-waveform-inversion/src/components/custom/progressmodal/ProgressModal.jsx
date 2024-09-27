import { useState, useContext, useEffect } from "react"; // allows us to access the context value

import { SessionContext } from "../../../store/session-context";

import hourglass from '../../../assets/hourglass.svg';
import pin from '../../../assets/pin.svg';
import seperator from '../../../assets/seperator.svg';

export default function ProgressModal() {
    const { sessionRuns, progressingRuns } = useContext(SessionContext);
    const [minimized, setMinimized] = useState(false);
    const [remaining, setRemaining] = useState([0, 0]); // remaining out of total

    const progressingRunsLength = Object.keys(progressingRuns).length;

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

    // Track changes in progressingRuns and update remaining out of total accordingly
    useEffect(() => {
        // This effect will run whenever progressingRuns and minimized changes. ANd checks whetehr mminimized is true
        // to update state.
        if (minimized) {
            // if (progressingRunsLength === 0) {
            //     handleMinimize();
            // } 
            // else {
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
                })
            // }
        }
    }, [progressingRunsLength]);

    return (
        <>
            {/* progressingRuns */}
            {/* {Object.keys(sessionRuns).length > 0 && */}
            {progressingRunsLength > 0 &&
                <>
                    {!minimized ? 
                        <>
                    
                            
                                <div className='absolute z-[49] bottom-7 right-8 w-[470px] h-[266px] p-3 pt-6
                                    bg-white rounded-2xl border border-[#D7DFFF]
                                    flex flex-col'
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
                                <div className='mb-9 flex justify-between'>
                                    {minimized ? 'true': 'false'}
                                </div>

                                {/* progression bars */}
                                <div className='flex flex-col space-y-3'>

                                </div>
                                </div>
                            
                        </>
                    :
                        <div className='absolute z-[49] bottom-7 right-8 w-[203px] h-[158px] p-3
                            bg-white rounded-2xl border border-[#D7DFFF]
                            flex flex-col'
                        >
                            {/* header */}
                            <p className="mb-1 text-center text-sm font-medium text-[#7f7f7f]">Remaining</p>

                            {/* data */}
                            <div className="mb-[14px] flex items-center justify-center space-x-4">
                                <p className="font-semibold">{remaining[0]} of {remaining[1]}</p>
                                {/* <p className="text-[#d7dfff]">/</p> */}
                                <img src={seperator} alt="seperator.svg" />
                                <p className="font-semibold">0m 47s</p>
                            </div>

                            {/* average progress */}
                        </div>
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