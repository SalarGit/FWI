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

function sessionRunsReducer(state, action) {
    return state;
}

function progressingRunsReducer(state, action) {
    return state;
}

function currentRunReducer(state, action) {
    return state;
}

export default function SessionContextProvider({ children }) {
    const [sessionRunsState, sessionRunsDispatch] = useReducer(sessionRunsReducer, {});
    const [progressingRunsState, progressingRunsDispatch] = useReducer(progressingRunsReducer, {});
    const [currentRunState, currentRunDispatch] = useReducer(currentRunReducer, '');

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
        addProgressingRun: (run) => setProgressingRuns((prev) => ({
            ...prev, // Spread existing runs
            ...run
        })),
        updateProgressingRun: (caseId, process, percentage) => setProgressingRuns((prev) => ({
            ...prev,
            [caseId]: {
                ...prev[caseId],
                [process]: [prev[caseId][process][0], percentage], // Update only the number
            },
        })),
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

