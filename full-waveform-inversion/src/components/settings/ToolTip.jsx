import { useContext, useState, useEffect} from 'react';
import { SessionContext } from '../../store/session-context.jsx';

// import { forwardModels, minimisationModels } from "../../data.js"; // This is not correct, because these are the default data. They can be changed in tooltip using Context.

import ModelDataBlock from "../custom/data/modeldata/ModelDataBlock.jsx";
import Border from "../custom/Border.jsx";
import BorderTop from "../custom/borders/BorderTop.jsx";

export default function ToolTip({ model }) {
    const { currentRun, sessionRuns } = useContext(SessionContext);
    const [groups, setGroups] = useState({ungrouped: [], grouped: []});
    const [data, setData] = useState({});

    useEffect(() => {
        // if currentRun hasn't been updated to historyOfRuns yet, exit the effect (re-run when historyOfRuns is updated)
        if (!currentRun || !sessionRuns[currentRun]) {
            return;
        }

        // get data from sessionRuns
        const { forwardData, minimizationData } = sessionRuns[currentRun] || {};
        const currentData = model === 'forward' ? forwardData : minimizationData;

        const ungrouped = Object.keys(currentData).filter(key => typeof currentData[key] !== 'object');
        const grouped = Object.keys(currentData).filter(key => typeof currentData[key] === 'object');

        setGroups({ungrouped, grouped});
        setData(currentData);

    }, [sessionRuns]);
    
    const header = 'text-sm font-medium col-span-2';
    const dataKey = 'text-[#7f7f7f] text-sm font-medium';
    const dataValue = 'text-sm font-normal';

    return (
        // Tooltip container
        // w-max
        // z-10
        
        <div className="absolute w-max top-[33px] p-4 z-10
            bg-white rounded-2xl border border-[#D7DFFF] shadow
            hidden group-hover:block"
        >
            {Object.keys(data).length > 0 &&
                <div className='flex flex-col space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        {groups.ungrouped.map((key) => (
                            <div key={key} className='flex flex-col space-y-3'>
                                <p className={dataKey}>{key}:</p>
                                <p className={dataValue}>{data[key]}</p>
                            </div>
                        ))}
                    </div>

                    {groups.grouped.length > 0 && <Border />}
                    
                    {groups.grouped.map((groupKey, index) => (
                        <>
                            <div key={groupKey} className='grid grid-cols-2 gap-4'>
                                {/* <div className='flex flex-col space-y-4'> */}
                                <p className={header}>{groupKey}</p>
                                    {Object.keys(data[groupKey]).map((key) => (
                                            <div key={key} className='flex flex-col space-y-3'>
                                                <p className={dataKey}>{key}:</p>
                                                <p className={dataValue}>{data[groupKey][key]}</p>
                                            </div>
                                    ))}
                                {/* </div> */}
                            </div>
                            {index < groups.grouped.length - 1 && <Border />}
                        </>
                    ))}
                </div>
            }
        </div>
    )
}





// {Object.keys(data).map((key) => (
//     typeof data[key] === 'object' ? (
//         <div key={key} >object {key}</div>
//     ) : (
//         <div key={key} >non-object {key}</div>
//     )
// ))}









    // if (model === "minimisation") {
    //     if (modelType === "ConjugateGradient") {
    //         toolTip = (
    //             <div className="flex flex-col space-y-4">
    //                 <ModelDataBlock dataObject={minimisationModels.conjugateGradient.upper} />
    //                 <BorderTop />
    //                 <ModelDataBlock heading={"stepAmplification"} dataObject={minimisationModels.conjugateGradient.lower} />
    //             </div>
    //         )
    //     }
        // else if (modelType === "Evolution") {
        //     toolTip = <ModelDataBlock heading={"stepAmplification"} dataObject={minimisationModels.evolution} />
        // }
        // else if (modelType === "GradientDescent") {
        //     toolTip = <ModelDataBlock heading={"stepAmplification"} dataObject={minimisationModels.gradientDescent} />
        // }
        // else if (modelType === "ParticleSwarm") {
        //     toolTip = <ModelDataBlock heading={"stepAmplification"} dataObject={minimisationModels.particleSwarm} />
        // }
        // else if (modelType === "Random") {
        //     toolTip = <ModelDataBlock heading={"stepAmplification"} dataObject={minimisationModels.random} />
        // }
    // }

    // else if (model === "forward") {
    //     if (modelType === "FiniteDifference") {
    //         toolTip = (
    //             <div className="flex flex-col space-y-4">
    //                 <ModelDataBlock heading="PMLWidthFactor" dataObject={forwardModels.finiteDifference.upper} />
    //                 <BorderTop />
    //                 <ModelDataBlock heading="SourceParameter" dataObject={forwardModels.finiteDifference.lower} />
    //             </div>
    //         );
    //     }
    //     else if (modelType === "Integral") {
    //         toolTip = (
    //             <ModelDataBlock dataObject={forwardModels.integral}/> 
    //         );
    //     }
    // }