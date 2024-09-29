import { useContext } from "react"; // allows us to access the context value

import { SessionContext } from "../../../store/session-context";

export default function ProgressBar({ caseId }) {
    const { progressingRuns } = useContext(SessionContext);

    let progress;
    if (caseId) {
        progress = `${progressingRuns[caseId].progress}%`;
    } else {
        const progresses = Object.values(progressingRuns).map(run => run.progress);
        
        // Calculate the sum of the progress values
        const totalProgress = progresses.reduce((acc, curr) => acc + curr, 0);
        
        // Calculate the average progress
        progress = `${Math.floor(totalProgress / progresses.length)}%`;
    }

    return (
        <>
            {!caseId ?
                <>
                    <div className="flex space-x-6">
                        <p className="font-medium">Calculating...</p>
                        <p className="text-sm font-medium text-[#3561fe]">{progress}</p>
                    </div>
                    <div className="h-3 border-2 border-[#3561fe] rounded-full">
                        <div className={`bg-[#3561fe] h-full`} style={{ width: `${progress}` }} />
                    </div>
                </>
            :
            
                <div className='flex flex-col space-y-3 h-[78px] w-[444px] bg-[#f4f6fb] px-3 py-4 rounded-lg'>
                    {/* header */}
                    <div className='flex justify-between'>
                        <p className="font-medium">{caseId}</p>
                        <p className="text-[#3561fe] text-sm font-medium">{progress}</p>
                    </div>

                    {/* bar */}
                    <div className="h-3 border-2 border-[#3561fe] rounded-full">
                        {/* <div className={`bg-[#3561fe] h-full w-[50%]`}></div> */}
                        <div className={`bg-[#3561fe] h-full`} style={{ width: `${progress}` }} />
                    </div>
                </div>
            }
        </>
    )
}