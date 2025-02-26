import React, { useContext } from 'react';

import { SessionContext } from '../../store/session-context.jsx';

import UpperPart from "../custom/UpperPart.jsx";
import EmptyGraph from "./EmptyGraph.jsx";

export default function Input() {
    const { currentRun, sessionRuns } = useContext(SessionContext);

    let imgSource;
    if (sessionRuns[currentRun]?.processed) {
        imgSource = sessionRuns[currentRun].input;
    }
    return (
        <div className="flex flex-col bg-white border border-[#D7DFFF] rounded-3xl w-1/2">
            <UpperPart heading={"Original input"}/>

            {imgSource === undefined ?
                <EmptyGraph />
            :
                <div className='size-full flex items-center justify-center'>
                    <img src={imgSource} alt="input.png"
                        className='w-[776px] h-[407px]'
                    />
                </div>
            }
        </div>
    )
}
