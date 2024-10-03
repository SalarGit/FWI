import { useContext } from 'react';

import { SessionContext } from '../../store/session-context.jsx';

import H2 from '../custom/headings/H2.jsx';

import Model from './Model.jsx';
import UpperPart from '../custom/UpperPart.jsx';
import Chip from '../custom/Chip.jsx';
import BorderLeft from '../custom/borders/BorderLeft.jsx';

export default function Settings({ encodeSpaces }) {
    const { currentRun, sessionRuns } = useContext(SessionContext);

    return (
        <div className="flex flex-col bg-white border border-[#D7DFFF] rounded-3xl"> {/* w-[1808px] to get 1920 */}
            <UpperPart heading={"Settings"}/>

            {/* Lower Part */}
            <div className="flex space-x-6 py-6 px-8">
                {/* Case folder */}
                <div className="flex flex-col space-y-[34px]
                    border border-[#D7DFFF] rounded-2xl
                    px-8 pt-8 h-[166px] w-[334px]"
                >
                    <H2 heading="case folder" styling='uppercase'/>
                    <p className="text-lg font-medium break-all line-clamp-2">
                        {currentRun ? `/${encodeSpaces(currentRun)}` : '-'}
                    </p>
                </div>
            
                {/* Models container */}
                <div className="flex justify-between border border-[#D7DFFF] rounded-2xl
                    px-8 pt-8 pb-[46px] h-[166px] w-[538px]"
                >
                    <Model model="forward" modelType={currentRun ? sessionRuns[currentRun].forwardModel : '-'} />
                    <BorderLeft />
                    <Model model="minimization" modelType={currentRun ? sessionRuns[currentRun].minimizationModel : '-'} />
                </div>
                
                {/* Processing steps */}
                <div className="flex flex-col space-y-[30px]
                    border border-[#D7DFFF] rounded-2xl
                    px-8 pt-8 h-[166px] w-[594px]"
                >
                    <H2 heading="processing steps" styling='uppercase'/>

                    <div className="flex space-x-3">
                        {currentRun ? 
                            sessionRuns[currentRun].processingSteps.map((step) => (
                                <Chip title={step} disabled={true}/>
                            ))
                        :
                            <p className='text-lg font-medium'>-</p>
                        }
                    </div>
                </div>

                {/* Threads/Cores */}
                <div className="flex flex-col space-y-[34px]
                    border border-[#D7DFFF] rounded-2xl
                    px-8 pt-8 pb-[46px] h-[166px] w-[208px]"
                >
                    <H2 heading="threads/cores:" styling='uppercase'/>
                    <p className="text-lg font-medium">{currentRun ? sessionRuns[currentRun].threads : '-'}</p>
                </div>

            </div>
        </div>
    )
}

