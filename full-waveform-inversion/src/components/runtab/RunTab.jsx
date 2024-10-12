import React, { useContext } from "react"; // allows us to access the context value

import { SessionContext } from "../../store/session-context.jsx";

import loadingUnselected from '../../assets/loading-unselected.png'
import loadingSelected from '../../assets/loading-selected.png'

export default function RunTab() {
    const { sessionRuns, currentRun, progressingRuns, handleCurrentRun } = useContext(SessionContext);

    const sessionRunsLength = sessionRuns ? Object.keys(sessionRuns).length : 0;

    return (
        // If the runs flow out of the row, flex-wrap wraps the overflow to a new row.
        <>
            {/* {Object.keys(sessionRuns).length > 0 &&  */}
            {Object.keys(sessionRuns).length > 0 && 
                <div className='ml-6 mb-[30px] flex items-center flex-wrap'>
                    {Object.keys(sessionRuns).map((caseId) =>
                        <button key={caseId} onClick={() => handleCurrentRun(caseId)}
                            className={`flex items-center justify-center space-x-2 py-3 px-9 ${caseId === currentRun && 'border-b-2 border-[#3561fe] text-[#3561fe] mt-[2px]'}
                            text-base font-semibold`}
                        >
                            <p className="font-generalSansSemibold">{caseId}</p>
                            {/* {progressingRuns && progressingRuns[caseId] && currentRun === caseId && */}
                            {progressingRuns.hasOwnProperty(caseId) && currentRun === caseId &&
                                <img className="animate-spin-counterclockwise" src={loadingSelected} alt="loadingSelected.png" />
                            }
                            {/* {progressingRuns && progressingRuns[caseId] && currentRun !== caseId && */}
                            {progressingRuns.hasOwnProperty(caseId) && currentRun !== caseId &&
                                <img className="animate-spin-counterclockwise" src={loadingUnselected} alt="loadingUnselected.png" />
                            }
                        </button>
                    )}
                </div>
            }
        </>
    )
}