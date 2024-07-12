import H1 from '../custom/headings/H1.jsx';
import H2 from '../custom/headings/H2.jsx';

import Model from './Model.jsx';
import UpperPart from '../custom/UpperPart.jsx';
import Chip from '../custom/Chip.jsx';

export default function Settings() {
    return (
        // Settings Container
        <div className="flex flex-col bg-white border border-violet-200 rounded-3xl">
            
            {/* Upper Part */}
            <UpperPart heading={"Settings"}/>

            {/* Lower Part */}
            <div className="flex space-x-6 py-8 px-6">
                {/* CASE FOLDER */}
                <div className="flex flex-col space-y-[34px]
                    border border-violet-200 rounded-2xl
                    px-8 pt-8 h-[166px] w-[332px]"
                >
                    <H2 heading="case folder" styling='uppercase'/>
                    {/* Used to be a div element. IDK why */}
                    <p className="text-lg font-medium break-all line-clamp-2">
                        /Users/Username/Documents/Work/Projects/2023/July/FWI/Projects/2023/July/FWI/Projects/2023/July/FWI/Projects/2023/July/FWI/
                    </p>
                </div>
            
                {/* PROCESSING STEPS container */}
                <div className="flex flex-col space-y-[30px]
                    border border-violet-200 rounded-2xl
                    px-8 pt-8 h-[166px] w-[594px]"
                >
                    <H2 heading="processing steps" styling='uppercase'/>

                    {/* Processes container */}
                    <div className="flex space-x-3">
                        <Chip title="Pre-Processing"/>
                        <Chip title="Processing"/>
                        <Chip title="Post-Processing"/>
                    </div>
                </div>

                {/* THREADS/CORES */}
                <div className="flex flex-col space-y-[34px]
                    border border-violet-200 rounded-2xl
                    px-8 pt-8 pb-[46px] h-[166px] w-[208px]"
                >
                    <H2 heading="threads/cores:" styling='uppercase'/>
                    <p className="text-lg font-medium">1</p>
                </div>

                {/* Models container */}
                <div className="flex justify-between border border-violet-200 rounded-2xl
                    px-8 pt-8 pb-[46px] h-[166px] w-[538px]"
                >
                    <Model model="forward" modelType="Evolution" />
                    <div className="border-l border-violet-200" />
                    <Model model="minimisation" modelType="ConjugateGradient" />
                </div>
            </div>
        </div>
    )
}

