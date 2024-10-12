import { useContext } from 'react';
import { SessionContext } from '../../store/session-context.jsx';

import info from '../../assets/info.png';

import H2 from '../custom/headings/H2.jsx';
import ToolTip from './ToolTip.jsx';

export default function Model({ model, modelType }) {
    const { currentRun } = useContext(SessionContext);

    const heading = model + ' model:';

    return (
        <div className="flex flex-col space-y-[34px]">
            <div className="flex space-x-3">
                <H2 heading={heading} styling='uppercase'/>
                <div className="relative group flex flex-col items-center justify-center">
                    <img src={info} alt="info.png"/>
                    {currentRun && <ToolTip model={model} />}
                </div>
            </div>
            <p className="text-lg font-switzerMedium">{modelType}</p>
        </div>
    )
}