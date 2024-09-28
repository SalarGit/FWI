import { useContext } from "react"; // allows us to access the context value

import { SessionContext } from "../../store/session-context.jsx";

export default function RunTab() {
    const { sessionRuns, currentRun, progressingRuns, handleCurrentRun } = useContext(SessionContext);

    return (
        // flex-wrap makes sure that if there are too many runs, a new row will be displayed below.
        <>
            {Object.keys(sessionRuns).length > 0 && 
                <div className='ml-6 mb-8 flex items-center flex-wrap'>
                    {Object.keys(sessionRuns).map((caseId) =>
                        <button onClick={() => handleCurrentRun(caseId)}
                            className={`h-12 py-3 px-9 ${caseId === currentRun && 'border-b-2 border-[#3561fe] text-[#3561fe]'}
                            text-base font-semibold`}
                        >
                            {caseId}
                            {/* {progressingRuns.hasOwnProperty(caseId) ?
                                console.log('bruh')
                                <div>`Pre-processing: ${progressingRuns.caseId['Pre-processing']}`</div>
                                // `Processing: ${progressingRuns.caseId['Processing']}`
                                // `Post-processing: ${progressingRuns.caseId['Post-processing']}`
                            
                            : 
                                ''
                            } */}

                            {progressingRuns.hasOwnProperty(caseId) ? (
                                <div>
                                    {/* {console.log('caseId:', caseId)}
                                    {console.log('progressingRuns:', progressingRuns)}
                                    {console.log('progressingRuns.caseId:', progressingRuns[caseId])} */}
                                    {/* {console.log('% straight from context:', progressingRuns[caseId]['Pre-processing'][1])} */}
                                    <p>Progress: {progressingRuns[caseId].progress}%</p>
                                </div>
                            ) : (
                                ''
                            )}
                        </button>
                    )}
                </div>
            }
        </>
    )
}