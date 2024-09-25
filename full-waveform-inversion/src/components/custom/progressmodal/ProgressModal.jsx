import { useContext } from "react"; // allows us to access the context value

import { SessionContext } from "../../../store/session-context";

import hourglass from '../../../assets/hourglass.svg';

export default function ProgressModal() {
    const { sessionRuns, progressingRuns } = useContext(SessionContext);

    return (
        <>
            {/* progressingRuns */}
            {Object.keys(sessionRuns).length > 0 && 
                <div className='absolute z-50 bottom-8 right-8 w-[470px] h-[266px] p-3 pt-6
                    bg-white rounded-2xl border border-[#D7DFFF]
                    flex flex-col space-y-'
                >
                {/* header */}
                <div className="flex items-center justify-center space-x-1">
                    <img src={hourglass} alt={hourglass} />
                    <p className="font-medium uppercase">CALCULATING...</p>
                </div>

                {/* data */}
                <div className='mt-9 flex justify-between'>
                </div>

                {/* progression bars */}
                <div className='flex flex-col space-y-3'>

                </div>
                </div>
            }
        </>
    )
}