import React, { useContext} from 'react';

import { SessionContext } from '../../../../store/session-context';

import BorderBottom from "../../../custom/borders/BorderBottom.jsx"

export default function ResidualGraphHOR({ selectedRuns }) {
    const { historyOfRuns } = useContext(SessionContext);

    return (
        <div className="max-h-full overflow-y-auto scrollbar-webkit scrollbar-thin">
            <div className="grid grid-cols-2 gap-6 max-h-full">
                {selectedRuns.map((caseId) => {
                    const imgSrc = historyOfRuns[caseId]?.residual; // if residual is undefined, so will imgSrc

                    return (
                        <div key={caseId} className="h-[400px] max-w-[838px] bg-white rounded-2xl">
                            <p className="py-[18px] px-6 font-medium">{caseId}</p>
                            <BorderBottom />
                            <div className='h-[340px] flex items-center justify-center'>
                                {imgSrc === undefined ? (
                                    <div className='flex flex-col space-y-1 items-center text-[#7f7f7f] font-switzerRegular'>
                                        <p>Run still processing...</p>
                                        <p>Re-open history of runs after '{caseId}' has finished processing.</p>
                                    </div>
                                ) : (
                                    
                                    <img src={historyOfRuns[caseId].residual} alt="residual.img"
                                        className='h-[340px] w-[776px]'
                                    />  
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}