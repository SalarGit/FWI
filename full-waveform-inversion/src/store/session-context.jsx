import { createContext, useState, useEffect } from 'react';

import * as api from '../api/apiService.js'

export const SessionContext = createContext({
    // These default values won't be used. They are just meant for better auto-completion.
    sessionRuns: {},
    currentRun: '',
    outputType: '',
    progressingRuns: {},
    cpuUsage: 0,
    historyLength: 0,
    historyOfRuns: {},
    addRunToSession: () => {},
    updateSessionRun: () => {},
    handleCurrentRun: () => {},
    handleOutputType: () => {},
    addProgressingRun: () => {},
    updateProgressingRun: () => {},
    removeProgressingRun: () => {},
    updateHistoryOfRuns: () => {},
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
    const [outputType, setOutputType] = useState('Output values')
    const [cpuUsage, setCpuUsage] = useState(0);
    const [historyOfRuns, setHistoryOfRuns] = useState({});
    const [historyLength, setHistoryLength] = useState(0);

    // Function to fetch history length
    async function fetchHistoryLength() {
        const { success, historyLength } = await api.fetchHistoryLength();
        return success ? historyLength : 0; // Return fetched history length or 0
    }

    // Effect to fetch and set history length
    useEffect(() => {
        const getHistoryLength = async () => {
            const length = await fetchHistoryLength(); // Await the fetchHistoryLength function
            setHistoryLength(length); // Set the fetched history length in state
        };

        getHistoryLength(); // Call the async function
    }, []); // Empty dependency array to run only on mount

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
        outputType,
        progressingRuns,
        cpuUsage,
        historyOfRuns,
        historyLength,
        // addRunToSession: (run) => setSessionRuns((prev) => ({
        //     ...prev,
        //     ...run
        // })),
        addRunToSession: async (run) => {
            // Update session runs
            setSessionRuns((prev) => ({
                ...prev,
                ...run
            }));

            // Fetch & set history length
            const length = await fetchHistoryLength(); 
            setHistoryLength(length); 
        },
        // updateSessionRun(caseId, resultImgUrl, chiDifferenceImageUrl, residualImageUrl, performanceMetricJson);
        updateSessionRun: (caseId, input, result, chiDifference, residual, metrics) => setSessionRuns((prev) => ({
            ...prev,
            [caseId]: {
                ...prev[caseId],
                input,
                result,
                chiDifference,
                residual,
                metrics,
                processed: true
            }
        })),
        // handleCurrentRun needs to call API and get all data needed and put it in currentRun
        // handleCurrentRun: (caseId) => setCurrentRun(caseId),
        handleCurrentRun: (caseId) => setCurrentRun((prev) => {
            // console.log(`handleCurrentRun in session-context: ${caseId}`);
        
            return (caseId)
        }),
        handleOutputType: (selectedOutputType) => setOutputType(selectedOutputType),
        addProgressingRun: (run) => setProgressingRuns((prev) => {
            // console.log(`addProgressingRun: ${run}`);
        
            return ({
            
            ...prev, // Spread existing runs
            ...run
        })}),
        updateProgressingRun: (caseId, process, cpuUsage, currentCount, totalCount) => {
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
                    // console.log(`updatedProgress: ${updatedProgress}`)
        
                    return {
                        ...prev,
                        [caseId]: {
                            ...prev[caseId],
                            progress: updatedProgress,
                        }
                        // cpuUsage
                    };
                }  else if (process === 'Processing') {
                    // console.log(`updateProgressingRun ${caseId}, ${process}, ${currentCount}, ${totalCount}`)
                    const updatedProgress = Math.floor(((currentCount / totalCount) * 85) + 13);
                    // console.log(`updatedProgress: ${updatedProgress}`)
                    return {
                        ...prev,
                        [caseId]: {
                            ...prev[caseId],
                            progress: updatedProgress,
                        }
                        // cpuUsage
                    }
                } else if (process === 'Post-processing') {
                    const updatedProgress = prev[caseId].progress + 1;
                    // console.log(`updatedProgress: ${updatedProgress}`)
                    return {
                        ...prev,
                        [caseId]: {
                            ...prev[caseId],
                            progress: updatedProgress,
                        }
                        // cpuUsage
                    }
                } 
            });

            setCpuUsage(Math.floor(cpuUsage));
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
                // console.log(`updatedProgress: ${updatedProgress}`)
                return {
                    ...prev,
                    [caseId]: {
                        ...prev[caseId],
                        progress: updatedProgress
                    }
                }
            }
        }),
        removeProgressingRun: (caseId) => setProgressingRuns((prev) => {
            const { [caseId]: _, ...stillProgressingRuns } = prev; // Destructure to omit the caseId
            return stillProgressingRuns; // Return the new object without the removed run
        }),
        updateHistoryOfRuns: (history) => setHistoryOfRuns(history)
    }

    return <SessionContext.Provider value={ctxValue}>
        {children}
    </SessionContext.Provider>
}

