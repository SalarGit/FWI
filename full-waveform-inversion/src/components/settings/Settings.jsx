import H1 from '../custom/headings/H1.jsx';
import H2 from '../custom/headings/H2.jsx';

import Model from './Model.jsx';
import UpperPart from '../custom/UpperPart.jsx';
import Chip from '../custom/Chip.jsx';
import Border from '../custom/Border.jsx';
import BorderTop from '../custom/borders/BorderTop.jsx';
import BorderLeft from '../custom/borders/BorderLeft.jsx';

export default function Settings() {
    const globalCond = true;

    return (
        // Settings Container
        // <div className={`flex flex-col bg-white border border-[#D7DFFF] rounded-3xl ${globalCond ? 'blur-[2.5px]' : ''}`}>
        <div className="flex flex-col bg-white border border-[#D7DFFF] rounded-3xl"> {/* w-[1808px] to get 1920 */}
            
            {/* Upper Part */}
            <UpperPart heading={"Settings"}/>

            {/* Lower Part */}
            <div className="flex space-x-6 py-6 px-8">
                {/* CASE FOLDER */}
                <div className="flex flex-col space-y-[34px]
                    border border-[#D7DFFF] rounded-2xl
                    px-8 pt-8 h-[166px] w-[334px]" // Design says [332px] but I did +2 because entire settings section was 2px less than header and I/O section.
                >
                    <H2 heading="case folder" styling='uppercase'/>
                    {/* Used to be a div element. IDK why. Prob bc I didn't know semantics. */}
                    <p className="text-lg font-medium break-all line-clamp-2">
                        /Users/Username/Documents/Work/Projects/2023/July/FWI/Projects/2023/July/FWI/Projects/2023/July/FWI/Projects/2023/July/FWI/
                    </p>
                </div>
            
                {/* Models container */}
                <div className="flex justify-between border border-[#D7DFFF] rounded-2xl
                    px-8 pt-8 pb-[46px] h-[166px] w-[538px]"
                >
                    <Model model="forward" modelType="Integral" />
                    <BorderLeft />
                    {/* <div className="border-l border-[#D7DFFF]" /> */}
                    <Model model="minimisation" modelType="ConjugateGradient" />
                </div>
                
                {/* PROCESSING STEPS container */}
                <div className="flex flex-col space-y-[30px]
                    border border-[#D7DFFF] rounded-2xl
                    px-8 pt-8 h-[166px] w-[594px]"
                >
                    <H2 heading="processing steps" styling='uppercase'/>

                    {/* Processes container */}
                    <div className="flex space-x-3">
                        <Chip title="Pre-Processing" disabled={true}/>
                        <Chip title="Processing" disabled={true}/>
                        <Chip title="Post-Processing" disabled={true}/>
                    </div>
                </div>

                {/* THREADS/CORES */}
                <div className="flex flex-col space-y-[34px]
                    border border-[#D7DFFF] rounded-2xl
                    px-8 pt-8 pb-[46px] h-[166px] w-[208px]"
                >
                    <H2 heading="threads/cores:" styling='uppercase'/>
                    <p className="text-lg font-medium">1</p>
                </div>

            </div>
        </div>
    )
}

