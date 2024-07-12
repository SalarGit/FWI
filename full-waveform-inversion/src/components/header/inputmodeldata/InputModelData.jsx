import { useState } from "react";

// use Context
export default function InputModelData({title, value}) {
    const [value, setValue] = useState();

    return (
        // <div className="w-max w-fill w-full w-auto w-fit w-px max-w-min max-w-max">
        <div className="flex flex-col space-y-3">
            <p className="text-sm font-medium text-zinc-500">{title}:</p>
            <input className="h-[48px] border border-[#D7DFFF] text-left" 
                value={value}
            >
            </input>
            {/* <p className="text-sm font-normal">{value}</p> */}
        </div>
        // </div>
    )
}