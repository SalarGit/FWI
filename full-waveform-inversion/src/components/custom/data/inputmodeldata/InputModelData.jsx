import { useState } from "react";

import H3 from "../../headings/H3";

// use Context
export default function InputModelData({title, defaultValue}) {
    const [value, setValue] = useState(defaultValue[1]);
    
    function handleBool() {
        setValue((prevValue) => prevValue ? false : true);
    }

    const inputType = defaultValue[0];

    // let input = <div>bruh</div>

    // if (inputType === 'number' || inputType === 'text') {
    //     input =
    //     <div className="flex flex-col space-y-3">
    //         <p className="text-sm font-medium text-zinc-500">{title}:</p>
    //         <input className="h-[48px] py-3 px-4
    //             rounded-xl border border-[#D7DFFF] 
    //             text-sm font-normal"
    //             type={inputType} value={value} onChange={(e) => setValue(e.target.value)}
    //         />
    //     </div>
    // } else if (inputType === 'bool') {
    //     input = 
    //     <label for='check' className="bg-[#d7dfff] has-[:checked]:bg-[#3561FE] transition-all duration-500 cursor-pointer relative w-20 h-10 rounded-full">
    //         <input type='checkbox' id='check' className='sr-only peer' onChange={handleBool}/>
    //         <span className='w-2/5 h-4/5 bg-white absolute rounded-full left-1 top-1 peer-checked:left-11 transition-all duration-500' />
    //     </label>
    // }
    const input = inputType === 'number' || inputType === 'text' ?
        <div className="flex flex-col space-y-3">
            <H3>{title}:</H3>
            <input className="h-[48px] py-3 px-4
                rounded-xl border border-[#D7DFFF] 
                text-sm font-normal"
                type={inputType} value={value} onChange={(e) => setValue(e.target.value)}
            />
        </div>
    : // if (inputType === 'bool')
        <div className="flex flex-col space-y-5">
            <H3>{title}:</H3>
            <label htmlFor='check' className="relative w-[52px] h-8 cursor-pointer bg-[#d7dfff] rounded-full has-[:checked]:bg-[#3561FE] transition-all duration-500">
                <input type='checkbox' id='check' checked={value} className='sr-only peer' onChange={handleBool}/>
                <span className='absolute left-1 top-1 w-6 h-6 bg-white rounded-full peer-checked:left-6 transition-all duration-500' />
            </label>
            {/* <p>{value ? 'true' : 'false'}</p> */}
        </div>

    return (
        <>
            {input}
        </>
    );
}

// Integral & Random
// Hier maak ik conditionally een InputField. Dit lost het probleem op van tussendoor een swipebutton hebben.