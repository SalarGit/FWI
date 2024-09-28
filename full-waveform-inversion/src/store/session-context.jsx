import { createContext, useState, useReducer } from 'react';

export const SessionContext = createContext({
    // These default values won't be used. They are just meant for better auto-completion.
    sessionRuns: {},
    currentRun: {},
    progressingRuns: {},
    addRunToSession: () => {},
    handleCurrentRun: () => {},
    addProgressingRun: () => {},
    updateProgressingRun: () => {},
    removeProgressingRun: () => {},
});

// function sessionRunsReducer(state, action) {
//     return state;
// }

// function progressingRunsReducer(state, action) {
//     return state;
// }

// function currentRunReducer(state, action) {
//     return state;
// }

export default function SessionContextProvider({ children }) {
    // const [sessionRunsState, sessionRunsDispatch] = useReducer(sessionRunsReducer, {});
    // const [progressingRunsState, progressingRunsDispatch] = useReducer(progressingRunsReducer, {});
    // const [currentRunState, currentRunDispatch] = useReducer(currentRunReducer, '');

    const [sessionRuns, setSessionRuns] = useState({});
    const [progressingRuns, setProgressingRuns] = useState({});

    const [currentRun, setCurrentRun] = useState('')
    // const [currentRun, setCurrentRun] = useState(
    //     {
    //         caseId: '',
    //         forwardModel: '', minimizationModel: '',
    //         processes: {'Pre-processing': true, 'Processing': true, 'Post-processing': true},
    //         threads: 4
    //     }
    // );
    // const [progress, setProgress] = useState({'Pre-processing': 0, 'Processing': 0, 'Post-processing': 0});

    const ctxValue = {
        sessionRuns,
        currentRun,
        progressingRuns,
        // progress,
        // addRunToSession: (caseId) => Runs((prev) => [...prev, caseId]),
        addRunToSession: (run) => setSessionRuns((prev) => ({
            ...prev,
            ...run
        })),
        // handleCurrentRun needs to call API and get all data needed and put it in currentRun
        handleCurrentRun: (caseId) => setCurrentRun(caseId),
        // handleProgress: (process, percentage) => setProgress((prev) => ({
        //     ...prev,
        //     [process]: percentage
        // })),
        addProgressingRun: (run) => setProgressingRuns((prev) => {
            console.log(`addProgressingRun: ${run}`);
        
            return ({
            
            ...prev, // Spread existing runs
            ...run
        })}),
        updateProgressingRun: (caseId, process, currentCount, totalCount) => {
            // First, check if currentCount or totalCount are undefined
            if ((currentCount === undefined || totalCount === undefined) && process !== 'Post-processing') {
                // Do nothing and simply return, avoiding the state update
                console.log(`updateProgressingRun, UNDEFINED UNDEFINED in ${process}`)
                return;
            }
        
            // Now we can safely call setProgressingRuns
            setProgressingRuns((prev) => {
                if (process === 'Pre-processing') {
                    // console.log(`updateProgressingRun ${caseId}, ${process}, ${currentCount}, ${totalCount}`);
                    const updatedProgress = Math.floor((currentCount / totalCount) * 13);
                    console.log(`updatedProgress: ${updatedProgress}`)
        
                    return {
                        ...prev,
                        [caseId]: {
                            ...prev[caseId],
                            progress: updatedProgress
                        }
                    };
                }  else if (process === 'Processing') {
                    // console.log(`updateProgressingRun ${caseId}, ${process}, ${currentCount}, ${totalCount}`)
                    const updatedProgress = Math.floor(((currentCount / totalCount) * 85) + 13);
                    console.log(`updatedProgress: ${updatedProgress}`)
                    return {
                        ...prev,
                        [caseId]: {
                            ...prev[caseId],
                            progress: updatedProgress
                        }
                    }
                } else if (process === 'Post-processing') {
                    console.log(`updateProgressingRun ${caseId}, ${process}. From ${prev[caseId].progress} to ${prev[caseId].progress + 1}`)
                    const updatedProgress = prev[caseId].progress + 1;
                    console.log(`updatedProgress: ${updatedProgress}`)
                    return {
                        ...prev,
                        [caseId]: {
                            ...prev[caseId],
                            progress: updatedProgress
                        }
                    }
                } 
            });
        },
        updateProgressingRunOld: (caseId, process, currentCount, totalCount) => setProgressingRuns((prev) => {
            if (process === 'Pre-processing') {
                console.log(`updateProgressingRun ${caseId}, ${process}, ${currentCount}, ${totalCount}`)
                const updatedProgress = (currentCount / totalCount) * 13;
                return {
                    ...prev,
                    [caseId]: {
                        ...prev[caseId],
                        progress: updatedProgress
                    }
                }
            } else if (process === 'Processing') {
                console.log(`updateProgressingRun ${caseId}, ${process}, ${currentCount}, ${totalCount}`)
                const updatedProgress = ((currentCount / totalCount) * 85) + 13;
                return {
                    ...prev,
                    [caseId]: {
                        ...prev[caseId],
                        progress: updatedProgress
                    }
                }
            } else if (process === 'Post-processing') {
                console.log(`updateProgressingRun ${caseId}, ${process}`)
                const updatedProgress = prev[caseId].progress + 1;
                console.log(`updatedProgress: ${updatedProgress}`)
                return {
                    ...prev,
                    [caseId]: {
                        ...prev[caseId],
                        progress: updatedProgress
                    }
                }
            }
        }),
        // updateProgressingRun: (caseId, process, percentage) => setProgressingRuns((prev) => (
        //     if (process === 'Pre-processing') {
        //         return {
        //         ...prev,
        //         [caseId]: {
        //             ...prev[caseId],
        //             [process]: [prev[caseId][process][0], percentage], // Update only the number
        //         },
        //     }
        // }
        // )),
        // updateProgressingRun: (caseId, process, percentage) => setProgressingRuns((prev) => ({
        //     ...prev, // Spread the previous state
        //     [caseId]: {
        //         ...prev[caseId], // Keep the existing properties of the specified run
        //         [process]: percentage, // Update the specified process with the new percentage
        //     },
        // })),
        removeProgressingRun: (caseId) => setProgressingRuns((prev) => {
            const { [caseId]: _, ...stillProgressingRuns } = prev; // Destructure to omit the caseId
            return stillProgressingRuns; // Return the new object without the removed run
        })
    }

    return <SessionContext.Provider value={ctxValue}>
        {children}
    </SessionContext.Provider>
}

