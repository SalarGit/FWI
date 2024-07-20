import { useState } from "react";

// use Context
export default function InputModelData({title, defaultValue}) {
    const [value, setValue] = useState(defaultValue);
    
    return (
        // <div className="w-max w-fill w-full w-auto w-fit w-px max-w-min max-w-max">
        <div className="flex flex-col space-y-3">
            <p className="text-sm font-medium text-zinc-500">{title}:</p>
            <input className="h-[48px] py-3 px-4
                rounded-xl border border-[#D7DFFF] 
                text-sm font-normal"
                type="number" value={value} onChange={(e) => setValue(e.target.value)}
            >
            </input>
            {/* <p className="text-sm font-normal">{value}</p> */}
        </div>
        // </div>
    )
}