import React, { useState, useContext } from 'react';

import { SessionContext } from '../../store/session-context.jsx';

import EmptyGraph from "./EmptyGraph.jsx";
import UpperPart from "../custom/UpperPart.jsx";
import DropdownMenu from "../custom/dropdownmenus/regular/DropdownMenu.jsx";

export default function Output() {
    const { currentRun, sessionRuns, outputType, handleOutputType } = useContext(SessionContext);
    // original reservoir is: h-[353px]
    let output = null;
    let size = 'w-[776px] h-[407px]';
    if (sessionRuns[currentRun]?.processed) {
        if (outputType === 'Output values') {
            output = sessionRuns[currentRun]?.result;
        } else if (outputType === 'Residual field') {
            output = sessionRuns[currentRun]?.chiDifference;
        } else if (outputType === 'Residual graph') {
            output = sessionRuns[currentRun]?.residual;
            // size = 'w-[776px] h-[407px]'
        } else if (outputType === 'Quality metrics') {
            output = 'Quality metrics'
        }
    }

    if (output !== null) {
        if (output === 'Quality metrics') {
            // create Quality metrics
            output = (<p>Quality Metrics</p>)
        } else {
            output = (
                <div className='size-full flex items-center justify-center'>
                    <img src={output} alt={`${output}.png`}
                    // change size depending on outputType
                        className={size}
                        // original reservoir is: h-[353px]
                    />
                </div>
            )
        }
    }

    const calculatedOutputTypes = [
        'Output values',
        'Residual field',
        'Residual graph',
        'Quality metrics'
    ]

    // relative
    return (
        <div className="flex flex-col bg-white border border-[#D7DFFF] pl- rounded-3xl w-1/2 h-[530px] backdrop-blur">
            <UpperPart heading="Calculated output" styling="pl-8 pr-6 py-4">
                {/* <div className="w-[277px]"> */}
                    {/* updateItem & selectedItem are drilled instead of taking from context, because the drilled function is different per dropdown menu */}
                    <DropdownMenu items={calculatedOutputTypes} selectedItem={outputType} updateItem={handleOutputType} width="w-[277px]" />
                {/* </div> */}
            </UpperPart>

            {/* check if sessionRuns[currentRun]?.result !== undefined works as well */}
            {output === null ?
                <EmptyGraph version='reconstructed' />
            :
                output
                // <div className='size-full flex items-center justify-center'>
                //     <img src={img} alt='result.png' 
                //         className={size}

                //     />
                // </div>
            }

            {/* <img id='result' alt='result.png' 
                className={`${sessionRuns[currentRun].result === undefined ? 'hidden' : ''}`}
            /> */}
            {/* <EmptyGraph version='reconstructed' /> */}
            
        </div>
    )
}