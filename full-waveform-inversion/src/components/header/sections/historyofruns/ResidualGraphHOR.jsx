import React, { useState, useContext, useEffect } from 'react';

import { SessionContext } from '../../../../store/session-context';

import BorderBottom from "../../../custom/borders/BorderBottom.jsx"

export default function ResidualGraphHOR({ selectedRuns }) {
    const { historyOfRuns } = useContext(SessionContext);

    return (
        // [823px]
        <div className="max-h-full overflow-y-auto scrollbar-webkit scrollbar-thin">
            <div className="grid grid-cols-2 gap-6 max-h-full">
                {selectedRuns.map((caseId) => 
                    <div className="h-[400px] max-w-[838px] bg-white rounded-2xl">
                        <p className="py-[18px] px-6 font-medium">{caseId}</p>
                        <BorderBottom />
                        <div className='h-[340px] flex items-center justify-center'>
                            <img src={historyOfRuns[caseId].residual} alt="residual.img"
                                className='h-[340px] w-[776px]'
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}