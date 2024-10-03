import React, { useState, useContext, useEffect } from 'react';

import { SessionContext } from '../../../../store/session-context';

import ssim from '../../../../assets/metrics/ssim.svg'
import cossim from '../../../../assets/metrics/cossim.svg'
import wallTime from '../../../../assets/metrics/wall-time.svg'
import totalSeconds from '../../../../assets/metrics/total-seconds.svg'
import psnr from '../../../../assets/metrics/psnr.svg'
import rmse from '../../../../assets/metrics/rmse.svg'
import mse from '../../../../assets/metrics/mse.svg'
import avgRelativeError from '../../../../assets/metrics/avg-relative-error.svg'

import BorderBottom from "../../../custom/borders/BorderBottom.jsx"

export default function QualityMetricsHOR({ selectedRuns }) {
    const { historyOfRuns } = useContext(SessionContext);
    const [unfinishedRuns, setUnfinishedRuns] = useState([]);
    const [metrics, setMetrics] = useState({});

    const metricBase = "w-[180px] h-[140px] pt-3 pl-3 rounded-2xl border border-[#D7DFFF] size-10  flex flex-col space-y-3";
    const iconContainerBase = "size-10 rounded-xl flex items-center justify-center"

    // Currently historyOfRuns is only updated when user opens History of Runs section and so if a run has finished processing while the user has the HOR section open,
    // he has to re-open it to see the new run. If that changes and the app somehow always has access
    // to the latest history, we could change this .foreach to a useEffect. The useEffect will listen to changes in historyOfRuns and update the section.
    // This way the user will always have the latest history, even when the section is open. 

    useEffect(() => {
        const newUnfinishedRuns = [];
        const newMetrics = {};

        selectedRuns.forEach((caseId) => {
            const result = historyOfRuns[caseId]?.result;
    
            if (result === undefined) {
                newUnfinishedRuns.push(caseId);
            } else {
                newMetrics[caseId] = {
                    'SSIM': {bgColor: '#feeef3', logo: ssim, value: historyOfRuns[caseId].metrics['SSIM'].toFixed(4), extra: '(Min)', extraValue: '0.40', absolute: '-bottom-[120px] -right-16'},
                    'CosSim': {bgColor: '#feeef3', logo: cossim, value: historyOfRuns[caseId].metrics['CosSim'].toFixed(4), extra: '(Min)', extraValue: '0.80', absolute: '-bottom-[120px] -right-16'},
                    'Wall time': {bgColor: '#eef9fc', logo: wallTime, value: historyOfRuns[caseId].metrics['wall_time'].toFixed(4), extra: '(Max)', extraValue: '65.00', absolute: '-bottom-[120px] -right-16'},
                    'Total seconds': {bgColor: '#eef9fc', logo: totalSeconds, value: historyOfRuns[caseId].metrics['total_seconds'].toFixed(4), extra: '(Max)', extraValue: '60.00', absolute: '-bottom-[120px] -right-16'},
                    'PSNR': {bgColor: '#eefaf4', logo: psnr, value: historyOfRuns[caseId].metrics['PSNR'].toFixed(4), extra: '(Average)', extraValue: '15.00', absolute: '-top-[120px] -right-16'},
                    'RMSE': {bgColor: '#f9eefe', logo: rmse, value: historyOfRuns[caseId].metrics['RMSE'].toFixed(4), extra: '(Max)', extraValue: '0.040', absolute: '-top-[120px] -right-16'},
                    'MSE': {bgColor: '#f9eefe', logo: mse, value: historyOfRuns[caseId].metrics['MSE'].toFixed(4), extra: '(Max)', extraValue: '0.0020', absolute: '-top-[120px] -right-16'},
                    'Avg relative error': {bgColor: '#fff6ec', logo: avgRelativeError, value: historyOfRuns[caseId].metrics['avg_relative_error'].toFixed(4), extra: '(Average)', extraValue: '45.00', absolute: '-top-[120px] -right-16'}
                }
            }
        });

        setUnfinishedRuns(newUnfinishedRuns);
        setMetrics(newMetrics);
    }, []);
    // const newUnfinishedRuns = [];

    // selectedRuns.forEach((caseId) => {
    //     const result = historyOfRuns[caseId]?.result;
        
    //     // check if run has finished post-processing (if not, then it isn't in historyOfRuns)
    //     if (result === undefined) {
    //         newUnfinishedRuns.push(caseId);
    //     } else {
    //         metrics[caseId] = {
    //             'SSIM': {bgColor: '#feeef3', logo: ssim, value: historyOfRuns[caseId].metrics['SSIM'].toFixed(4), extra: '(Min)', extraValue: '0.40', absolute: '-bottom-[120px] -right-16'},
    //             'CosSim': {bgColor: '#feeef3', logo: cossim, value: historyOfRuns[caseId].metrics['CosSim'].toFixed(4), extra: '(Min)', extraValue: '0.80', absolute: '-bottom-[120px] -right-16'},
    //             'Wall time': {bgColor: '#eef9fc', logo: wallTime, value: historyOfRuns[caseId].metrics['wall_time'].toFixed(4), extra: '(Max)', extraValue: '65.00', absolute: '-bottom-[120px] -right-16'},
    //             'Total seconds': {bgColor: '#eef9fc', logo: totalSeconds, value: historyOfRuns[caseId].metrics['total_seconds'].toFixed(4), extra: '(Max)', extraValue: '60.00', absolute: '-bottom-[120px] -right-16'},
    //             'PSNR': {bgColor: '#eefaf4', logo: psnr, value: historyOfRuns[caseId].metrics['PSNR'].toFixed(4), extra: '(Average)', extraValue: '15.00', absolute: '-top-[120px] -right-16'},
    //             'RMSE': {bgColor: '#f9eefe', logo: rmse, value: historyOfRuns[caseId].metrics['RMSE'].toFixed(4), extra: '(Max)', extraValue: '0.040', absolute: '-top-[120px] -right-16'},
    //             'MSE': {bgColor: '#f9eefe', logo: mse, value: historyOfRuns[caseId].metrics['MSE'].toFixed(4), extra: '(Max)', extraValue: '0.0020', absolute: '-top-[120px] -right-16'},
    //             'Avg relative error': {bgColor: '#fff6ec', logo: avgRelativeError, value: historyOfRuns[caseId].metrics['avg_relative_error'].toFixed(4), extra: '(Average)', extraValue: '45.00', absolute: '-top-[120px] -right-16'}
    //         }
    //     }
    // })

    // setUnfinishedRuns(newUnfinishedRuns);

    return (
        // [823px]
        <div className="max-h-full overflow-y-auto scrollbar-webkit scrollbar-thin">
            <div className="grid grid-cols-2 gap-6 max-h-full">
                {selectedRuns.map((caseId) => 
                    <div key={caseId} className="h-[400px] max-w-[838px] bg-white rounded-2xl">
                        <p className="py-[18px] px-6 font-medium">{caseId}</p>
                        <BorderBottom />

                            {unfinishedRuns.includes(caseId) ? (
                                <div className='h-[340px] flex flex-col space-y-1 items-center justify-center text-[#7f7f7f]'>
                                    <p>Run still processing...</p>
                                    <p>Re-open history of runs after '{caseId}' has finished processing.</p>
                                </div>
                            ) : (
                                metrics[caseId] ? ( // Check if metrics exist for caseId
                                    <div className="h-[340px] py-3 px-4 grid grid-cols-4 gap-3">
                                    {Object.keys(metrics[caseId]).map((metric) => (
                                        <div key={metric} className={`${metricBase} relative group`}>
                                            <div className={`${iconContainerBase}`} style={{ backgroundColor: metrics[caseId][metric].bgColor }}>
                                                <img src={metrics[caseId][metric].logo} alt=".svg" />
                                            </div>
                                            <div className='flex flex-col space-y-1'>
                                                <p className='text-m font-medium text-[#7f7f7f]'>{metric}</p>
                                                <p className='text-xl font-medium'>{metrics[caseId][metric].value}</p>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                ) : (
                                    <div className='h-[340px] flex flex-col space-y-1 items-center text-[#7f7f7f]'>
                                        <p>No metrics available for this run.</p>
                                    </div>
                                )
                            )}
                            

                        {/* either use the flex beneath or make a div with padding */}
                        {/* <div className='h-[340px] flex items-center justify-center'>
                            <img src={historyOfRuns[caseId].chiDifference} alt="residual.img"
                                className='h-[340px] w-[700px]'
                            />
                        </div> */}
                        {/* <EmptyGraph version='compare' padding='' /> */}
                    </div>
                )}          
            </div>
        </div>
    )
}


// <>
                            //     {Object.keys(metrics[caseId]).map((metric) => (
                            //         <div className={`${metricBase} relative group`}>
                            //             <div className={`${iconContainerBase}`} style={{ backgroundColor: metrics[caseId][metric].bgColor }}>
                            //                 <img src={metrics[caseId][metric].logo} alt=".svg" />
                            //             </div>
                            //             <div className='flex flex-col space-y-1'>
                            //                 <p className='text-m font-medium text-[#7f7f7f]'>{metric}</p>
                            //                 <p className='text-xl font-medium'>{metrics[caseId][metric].value}</p>
                            //             </div>
                            //         </div>
                            //     ))}
                            // </>

                            // I RLY DONT KNOW WHY THIS DOESNT WORK