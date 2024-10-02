import React, { useState, useContext } from 'react';

import { SessionContext } from '../../store/session-context.jsx';
import ssim from '../../assets/metrics/ssim.svg'
import cossim from '../../assets/metrics/cossim.svg'
import wallTime from '../../assets/metrics/wall-time.svg'
import totalSeconds from '../../assets/metrics/total-seconds.svg'
import psnr from '../../assets/metrics/psnr.svg'
import rmse from '../../assets/metrics/rmse.svg'
import mse from '../../assets/metrics/mse.svg'
import avgRelativeError from '../../assets/metrics/avg-relative-error.svg'

import EmptyGraph from "./EmptyGraph.jsx";
import UpperPart from "../custom/UpperPart.jsx";
import DropdownMenu from "../custom/dropdownmenus/regular/DropdownMenu.jsx";

export default function Output() {
    const { currentRun, sessionRuns, outputType, handleOutputType } = useContext(SessionContext);
    
    const calculatedOutputTypes = [
        'Output values',
        'Residual field',
        'Residual graph',
        'Quality metrics'
    ]

    // original reservoir is: h-[353px]
    let output = null;
    // is this supposed to be done when processed? not just sessionRuns[currentRun]?.result ??
    if (sessionRuns[currentRun]?.processed) {
        if (outputType === 'Output values') {
            output = sessionRuns[currentRun]?.result;
        } else if (outputType === 'Residual field') {
            output = sessionRuns[currentRun]?.chiDifference;
        } else if (outputType === 'Residual graph') {
            output = sessionRuns[currentRun]?.residual;
        } else if (outputType === 'Quality metrics') {
            output = 'Quality metrics'
        }
    }

    if (output !== null) {
        if (output === 'Quality metrics') {
            const metricBase = "w-[191px] h-[188px] pt-6 pl-6 rounded-2xl border border-[#D7DFFF] size-10  flex flex-col space-y-[18px]";
            const iconContainerBase = "size-12 rounded-xl flex items-center justify-center"
            const metrics = {
                'SSIM': {bgColor: '#feeef3', logo: ssim, value: sessionRuns[currentRun].metrics['SSIM'].toFixed(4), extra: '(Min)', extraValue: '0.40', absolute: '-bottom-[120px] -right-16'},
                'CosSim': {bgColor: '#feeef3', logo: cossim, value: sessionRuns[currentRun].metrics['CosSim'].toFixed(4), extra: '(Min)', extraValue: '0.80', absolute: '-bottom-[120px] -right-16'},
                'Wall time': {bgColor: '#eef9fc', logo: wallTime, value: sessionRuns[currentRun].metrics['wall_time'].toFixed(4), extra: '(Max)', extraValue: '65.00', absolute: '-bottom-[120px] -right-16'},
                'Total seconds': {bgColor: '#eef9fc', logo: totalSeconds, value: sessionRuns[currentRun].metrics['total_seconds'].toFixed(4), extra: '(Max)', extraValue: '60.00', absolute: '-bottom-[120px] -right-16'},
                'PSNR': {bgColor: '#eefaf4', logo: psnr, value: sessionRuns[currentRun].metrics['PSNR'].toFixed(4), extra: '(Average)', extraValue: '15.00', absolute: '-top-[120px] -right-16'},
                'RMSE': {bgColor: '#f9eefe', logo: rmse, value: sessionRuns[currentRun].metrics['RMSE'].toFixed(4), extra: '(Max)', extraValue: '0.040', absolute: '-top-[120px] -right-16'},
                'MSE': {bgColor: '#f9eefe', logo: mse, value: sessionRuns[currentRun].metrics['MSE'].toFixed(4), extra: '(Max)', extraValue: '0.0020', absolute: '-top-[120px] -right-16'},
                'Avg relative error': {bgColor: '#fff6ec', logo: avgRelativeError, value: sessionRuns[currentRun].metrics['avg_relative_error'].toFixed(4), extra: '(Average)', extraValue: '45.00', absolute: '-top-[120px] -right-16'}
            }

            output = (
                <div className="size-full py-6 px-8 grid grid-cols-4 gap-6">
                    {Object.keys(metrics).map((metric) => (
                        <div key={metric} className={`${metricBase} relative group`}>
                            <div className={`${iconContainerBase}`} style={{ backgroundColor: metrics[metric].bgColor }}>
                                <img src={metrics[metric].logo} alt=".svg" />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <p className='text-lg font-medium text-[#7f7f7f]'>{metric}</p>
                                <p className='text-2xl font-medium'>{metrics[metric].value}</p>
                            </div>

                            {/* extra data onHover */}
                            <div className={`z-[50] w-[210px] h-[150px] p-4 absolute ${metrics[metric].absolute}
                                border border-[#d7dfff] rounded-2xl bg-white
                                opacity-0 group-hover:opacity-100
                                pointer-events-none group-hover:pointer-events-auto
                                flex flex-col space-y-4`}
                            >
                                <div className='flex flex-col space-y-3'>
                                    <p className='text-sm font-medium text-[#7f7f7f]'>{metric}</p>
                                    <p className='text-sm text-normal'>{metrics[metric].value}</p>
                                </div>
                                <div className='flex flex-col space-y-3'>
                                    <p className='text-sm font-medium text-[#7f7f7f]'>{metric} {metrics[metric].extra}</p>
                                    <p className='text-sm text-normal'>{metrics[metric].extraValue}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        } else {
            output = (
                <div className='size-full flex items-center justify-center'>
                    <img src={output} alt={`${output}.png`}
                        // change size depending on outputType
                        className='w-[776px] h-[407px]'
                    // original reservoir is: h-[353px]
                    />
                </div>
            )
        }
    }

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
                <EmptyGraph />
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