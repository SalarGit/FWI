import { useContext, useState, useEffect} from 'react';
import { SessionContext } from '../../../../store/session-context';

export default function ModelParametersHOR({ caseId, model }) {
    const { historyOfRuns } = useContext(SessionContext); // Access historyOfRuns from context
    const [groups, setGroups] = useState({ungrouped: [], grouped: []});

    const header = 'text-sm font-medium col-span-2'
    const dataKey = 'text-sm font-medium text-[#808080]'
    const dataValue = 'text-sm' 

    const { forwardData, minimizationData } = historyOfRuns[caseId] || {};
    const data = model === 'forward' ? forwardData : minimizationData;
    
    useEffect(() => {
        const ungrouped = Object.keys(data).filter(key => typeof data[key] !== 'object');
        const grouped = Object.keys(data).filter(key => typeof data[key] === 'object');

        setGroups({ungrouped, grouped});
    }, []);

    return (
        <div className="flex flex-col space-y-4">
            {groups.ungrouped.length > 0 && (
                <div className={`grid grid-cols-2 gap-4`}>
                    {groups.ungrouped.map((key) => (
                        <div className='flex flex-col space-y-3'>
                            <p className={dataKey}>{key}:</p>
                            <p className={dataValue}>{data[key]}</p>
                        </div>
                    ))}

                </div>
            )}

            {groups.grouped.length > 0 && (
                <div className={`grid grid-cols-2 gap-4`}>
                    {groups.grouped.map((item) => (
                        <div className='flex flex-col space-y-4'>
                            <p className={header}>{item}</p>
                            <div className={`grid grid-cols-2 gap-3`}>
                                {Object.keys(data[item]).map((key) => (
                                    <div className='flex flex-col space-y-3'>
                                        <p className={`${dataKey} truncate`}>{key}:</p>
                                        <p className={dataValue}>{data[item][key]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>      
    )
}