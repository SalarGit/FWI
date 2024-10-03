import React, { useState, useContext, useEffect } from 'react';

import { SessionContext } from '../../../../store/session-context';


import BorderBottom from "../../../custom/borders/BorderBottom.jsx"
import EmptyGraph from "../../../IO/EmptyGraph.jsx"

export default function ResidualFieldHOR({ selectedRuns }) {
    const { historyOfRuns } = useContext(SessionContext);

    return (
        // [823px]
        <div className="max-h-full overflow-y-auto scrollbar-webkit scrollbar-thin">
            <div className="grid grid-cols-2 gap-6 max-h-full">
                {selectedRuns.map((caseId) => {
                const imgSrc = historyOfRuns[caseId]?.chiDifference; // if chiDiff is undefined, so will imgSrc

                return (
                    <div className="h-[400px] max-w-[838px] bg-white rounded-2xl">
                        <p className="py-[18px] px-6 font-medium">{caseId}</p>
                        <BorderBottom />
                        <div className='h-[340px] flex items-center justify-center'>
                            {imgSrc === undefined ? (
                                <div className='flex flex-col space-y-1 items-center text-[#7f7f7f]'>
                                    <p>Run still processing...</p>
                                    <p>Re-open history of runs after '{caseId}' has finished processing.</p>
                                </div>
                            ) : (
                                <img 
                                    src={historyOfRuns[caseId].chiDifference} 
                                    alt="residual.img" // will probably never result to alt
                                    className='h-[340px] w-[700px]'
                                />
                            )}
                        </div>
                    </div>
                )})}          
            </div>
        </div>
    )
}