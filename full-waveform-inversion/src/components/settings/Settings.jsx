import H1 from '../custom/H1.jsx';
import H2 from '../custom/H2.jsx';

import Model from './Model.jsx';
import Process from './Process.jsx';

export default function Settings() {
    return (
        // Settings Container
        <div class="flex flex-col bg-white border border-violet-200 rounded-3xl">
            
            {/* Upper Part */}
            <H1 heading="Settings"/>
            <div class="border-t border-violet-200" />

            {/* Lower Part */}
            <div className="flex space-x-6 py-8 px-6">
                {/* CASE FOLDER */}
                <div className="flex flex-col space-y-[34px]
                    border border-violet-200 rounded-2xl
                    px-8 pt-8 h-[166px] w-[332px]"
                >
                    <H2 heading="case folder"/>
                    <div className="text-lg font-medium break-all line-clamp-2">
                        /Users/Username/Documents/Work/Projects/2023/July/FWI/Projects/2023/July/FWI/Projects/2023/July/FWI/Projects/2023/July/FWI/
                    </div>
                </div>
            
                {/* PROCESSING STEPS container */}
                <div className="flex flex-col space-y-[30px]
                    border border-violet-200 rounded-2xl
                    px-8 pt-8 h-[166px] w-[594px]"
                >
                    <H2 heading="processing steps"/>

                    {/* Processes container */}
                    <div className="flex space-x-3">
                        <Process processType="Pre-Processing"/>
                        <Process processType="Processing"/>
                        <Process processType="Post-Processing"/>
                    </div>
                </div>

                {/* THREADS/CORES */}
                <div className="flex flex-col space-y-[34px]
                    border border-violet-200 rounded-2xl
                    px-8 pt-8 pb-[46px] h-[166px] w-[208px]"
                >
                    <H2 heading="threads/cores:"/>
                    <p className="text-lg font-medium">1</p>
                </div>

                {/* Models container */}
                <div className="flex justify-between border border-violet-200 rounded-2xl
                    px-8 pt-8 pb-[46px] h-[166px] w-[538px]"
                >
                    <Model model="forward" modelType="Evolution" />
                    <div class="border-l border-violet-200" />
                    <Model model="minimisation" modelType="ConjugateGradient" />
                </div>
            </div>
        </div>
    )
}

