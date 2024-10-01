import React, { useState, useContext } from 'react';

import { SessionContext } from '../../store/session-context.jsx';

import H1 from "../custom/headings/H1.jsx";
import Border from "../custom/Border.jsx";
import BorderTop from "../custom/Border.jsx";
import UpperPart from "../custom/UpperPart.jsx";
import EmptyGraph from "./EmptyGraph.jsx";

export default function Input() {
    const { currentRun, sessionRuns } = useContext(SessionContext);

    let imgSource;
    if (sessionRuns[currentRun]?.processed) {
        imgSource = sessionRuns[currentRun].input;
        // console.log('imgS', imgSource)
    }
    return (
        <div className="flex flex-col bg-white border border-[#D7DFFF] rounded-3xl w-1/2">
            <UpperPart heading={"Original input"}/>

            {imgSource === undefined ?
                <EmptyGraph version='original' />
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
