import { createContext, useState } from 'react';

export const SessionContext = createContext({
    // These default values won't be used. They are just meant for better auto-completion.
    sessionRuns: [],
    currentRun: '',
    addRunToSession: () => {},
    setCurrentRun: () => {}
});

export default function SessionContextProvider({ children }) {
    const [sessionRuns, setSessionsRuns] = useState([]);
    const [curRun, setCurRun] = useState();

    const ctxValue = {
        sessionRuns: sessionRuns,
        currentRun: curRun,
        addRunToSession: (caseId) => setSessionsRuns((prev) => [...prev, caseId]),
        setCurrentRun: (caseId) => setCurRun(caseId)
    }

    return <SessionContext.Provider value={ctxValue}>
        {children}
    </SessionContext.Provider>
}