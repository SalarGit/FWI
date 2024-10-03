import { useContext, useState, useEffect} from 'react';
import { SessionContext } from '../../store/session-context.jsx';

import Border from "../custom/Border.jsx";

export default function ToolTip({ model }) {
    const { currentRun, sessionRuns } = useContext(SessionContext);
    const [groups, setGroups] = useState({ungrouped: [], grouped: []});
    const [data, setData] = useState({});

    useEffect(() => {
        if (!currentRun || !sessionRuns[currentRun]) {
            return;
        }

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
                                <p className={header}>{groupKey}</p>
                                {Object.keys(data[groupKey]).map((key) => (
                                        <div key={key} className='flex flex-col space-y-3'>
                                            <p className={dataKey}>{key}:</p>
                                            <p className={dataValue}>{data[groupKey][key]}</p>
                                        </div>
                                ))}
                            </div>
                            {index < groups.grouped.length - 1 && <Border />}
                        </>
                    ))}
                </div>
            }
        </div>
    )
}