import { useContext } from "react"; // allows us to access the context value

import { SessionContext } from "../../store/session-context.jsx";

export default function RunTab({ decodeSpaces }) {
    const { sessionRuns, currentRun, setCurrentRun } = useContext(SessionContext);

    return (
        // flex-wrap makes sure that if there are too many runs, a new row will be displayed below.
        <>
        {sessionRuns.length > 0 &&
            <div className='ml-6 mb-8 flex items-center flex-wrap'>

                {sessionRuns.map((run) =>
                    <button onClick={() => setCurrentRun(run)}
                        className={`h-12 py-3 px-9 ${decodeSpaces(run) === currentRun && 'border-b-2 border-[#3561fe] text-[#3561fe]'}
                        text-base font-semibold`}
                    >
                        {run}
                    </button>
                )}
            </div>
        }
        </>
    )
}