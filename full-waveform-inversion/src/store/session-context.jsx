import { createContext, useState, useEffect } from 'react';

import * as api from '../api/apiService.js'

export const SessionContext = createContext({
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

export default function SessionContextProvider({ children }) {
    const [sessionRuns, setSessionRuns] = useState({});
    const [progressingRuns, setProgressingRuns] = useState({});

    const [currentRun, setCurrentRun] = useState('')
    const [outputType, setOutputType] = useState('Output values')
    const [cpuUsage, setCpuUsage] = useState(0);
    const [historyOfRuns, setHistoryOfRuns] = useState({});
    const [historyLength, setHistoryLength] = useState(0);

    async function fetchHistoryLength() {
        const { success, historyLength } = await api.fetchHistoryLength();
        return success ? historyLength : 0;
    }

    useEffect(() => {
        const getHistoryLength = async () => {
            const length = await fetchHistoryLength();
            setHistoryLength(length);
        };

        getHistoryLength();
    }, []);

    const ctxValue = {
        sessionRuns,
        currentRun,
        outputType,
        progressingRuns,
        cpuUsage,
        historyOfRuns,
        historyLength,
        addRunToSession: async (run) => {
            setSessionRuns((prev) => ({
                ...prev,
                ...run
            }));

            const length = await fetchHistoryLength(); 
            setHistoryLength(length); 
        },
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
        handleCurrentRun: (caseId) => setCurrentRun(caseId),
        handleOutputType: (selectedOutputType) => setOutputType(selectedOutputType),
        addProgressingRun: (run) => setProgressingRuns((prev) => {
            return ({
            ...prev,
            ...run
        })}),
        updateProgressingRun: (caseId, process, cpuUsage, currentCount, totalCount) => {
            if ((currentCount === undefined || totalCount === undefined) && process !== 'Post-processing') {
                return;
            }

            setProgressingRuns((prev) => {
                if (process === 'Pre-processing') {
                    const updatedProgress = Math.floor((currentCount / totalCount) * 13);
        
                    return {
                        ...prev,
                        [caseId]: {
                            ...prev[caseId],
                            progress: updatedProgress,
                        }
                    };
                }  else if (process === 'Processing') {
                    const updatedProgress = Math.floor(((currentCount / totalCount) * 85) + 13);

                    return {
                        ...prev,
                        [caseId]: {
                            ...prev[caseId],
                            progress: updatedProgress,
                        }
                    }
                } else if (process === 'Post-processing') {
                    const updatedProgress = prev[caseId].progress + 1;

                    return {
                        ...prev,
                        [caseId]: {
                            ...prev[caseId],
                            progress: updatedProgress,
                        }
                    }
                } 
            });

            setCpuUsage(Math.floor(cpuUsage));
        },
        removeProgressingRun: (caseId) => setProgressingRuns((prev) => {
            const { [caseId]: _, ...stillProgressingRuns } = prev;
            return stillProgressingRuns;
        }),
        updateHistoryOfRuns: (history) => setHistoryOfRuns(history)
    }

    return <SessionContext.Provider value={ctxValue}>
        {children}
    </SessionContext.Provider>
}

