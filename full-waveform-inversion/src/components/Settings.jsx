export default function Settings() {
    return (
        // Settings Container
        <div class="flex flex-col bg-white border border-violet-200 rounded-3xl
            "
        >
            {/* Header */}
            <p className="py-8 pl-6 text-lg font-semibold">Settings</p>

            {/* Border */}
            <div class="border-t border-violet-200" />

            {/* Settings */}
            <div className="flex space-x-6 py-8 px-6
                "
            >
                {/* <div class="w-72 bg-gray-200 p-2">
                    This is a long piece of text that will automatically wrap to the next line when it reaches the width of the parent container.
                </div> */}
                {/* CASE FOLDER */}
                <div className="flex flex-col space-y-[34px]
                    border border-violet-200 rounded-2xl
                    px-8 pt-8 h-[166px] w-[332px]"
                >
                    <p className="text-zinc-500 font-medium uppercase">case folder</p>
                    <div className="text-lg font-medium break-all line-clamp-2">
                        /Users/Username/Documents/Work/Projects/2023/July/FWI/Projects/2023/July/FWI/Projects/2023/July/FWI/Projects/2023/July/FWI/
                    </div>
                </div>
            
                {/* PROCESSING STEPS container */}
                <div className="flex flex-col space-y-[30px]
                    border border-violet-200 rounded-2xl
                    px-8 pt-8 h-[166px] w-[594px]"
                >
                    <p className="text-zinc-500 font-medium uppercase">processing steps</p>

                    {/* Processes container */}
                    <div className="flex space-x-3">
                        {/* Pre-Processing */}
                        <div className="flex space-x-2 py-3 px-4
                            bg-blue-50 rounded-full text-blue-600"
                        >
                            <p>0</p>
                            <p>Pre-Processing</p>
                        </div>
                        {/* Processing */}
                        {/* Post-Processing */}
                    </div>
                </div>

                {/* THREADS/CORES */}
                <div className="flex flex-col space-y-[34px]
                    border border-violet-200 rounded-2xl
                    px-8 pt-8 h-[166px] w-[208px]"
                >
                    <p className="text-zinc-500 font-medium uppercase">threads/cores:</p>
                    <p className="text-lg font-medium"></p>
                </div>

                {/* Models container */}
                <div className="flex border space-x-8 border-violet-200 rounded-2xl
                    px-8 pt-8 h-[166px] w-[538px]"
                >
                    {/* FORWARD MODEL */}
                    <div className="flex flex-col space-y-[34px]
                        "
                    >
                        <p className="text-zinc-500 font-medium uppercase">forward model:</p>
                        <p className="text-lg font-medium"></p>
                    </div>

                    {/* Border */}
                    <div class="border-t border-violet-200" />

                    {/* MINIMALISATION MODEL */}
                    <div className="flex flex-col space-y-[34px]
                        "
                    >
                        <p className="text-zinc-500 font-medium uppercase">minimisation model:</p>
                        <p className="text-lg font-medium">/path/to/case-folder/...</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

