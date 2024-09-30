import { useState } from "react";

import H3 from "../../headings/H3";

// use Context
export default function InputModelData({title, defaultValue}) {
    const [value, setValue] = useState(defaultValue[1]);
    
    function handleBool() {
        setValue((prevValue) => prevValue ? false : true);
    }
    
    const inputType = defaultValue[0];

    // function handleChangeValue(event, type) {
    //     if (type === 'number') {
    //         setValue(event.target.value);
    //     } else if (type === 'text') {        
    //         setValue(event.target.value);
    //     }
    // }

    // const handleInputChange = (event) => {
    function handleInputChange(value, option) {
        // console.log("Entered handleInputChange with", typeof value, value)
        const regex = /^-?\d*\.?\d*$/
        // This regex allows:
        // Numbers with or without decimal points
        // Negative numbers
        // Just '-' (parseFloats to NaN, handled as a 0 by handleBlur)
        // Empty string (parseFloats to NaN, handled as a 0 by handleBlur)
        // Technical explanation:
        // ^-?: Optionally matches a negative sign at the beginning.
        // \d*: Matches zero or more digits.
        // \.?: Optionally matches a decimal point.
        // \d*: Matches zero or more digits after the decimal point.

        // /^-?\d*\.?\d*([eE]-?\d*)?$/ ORIGINAL
        // const regex = /^-?\d+(\.\d+)?$/; CLOSE, DOESNT ALLOW '-'

        if (option === 'NUMBER') {
            if (regex.test(value) || value === '') {
                setValue(value); // Update input value as a string
                // console.log("Value is now", value)
            }
        }
        else if (option === 'TEXT') {
            setValue(value)
        }
    }
    
    function handleBlur() {
        // console.log("Entered handleBlur with", typeof value, value)
        // When input loses focus, convert it to a number if valid
        if (value === ''){
            setValue(0);
        } else {
            const numberValue = parseFloat(value);
    
            // Update state with number value if valid, otherwise keep it as is
            setValue(isNaN(numberValue) ? 0 : numberValue);
        }    
    }
    
    // const handleBlur = () => {
    // };


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


    return (
        <>
            {inputType === 'number' && 
                <div className="flex flex-col space-y-3">
                    <H3>{title}:</H3>
                    <input className="h-[48px] py-3 px-4
                        rounded-xl border border-[#D7DFFF] 
                        text-sm font-normal"
                        // type={inputType} value={value} onChange={(e) => setValue(e.target.value)}
                        type="text" value={value} onChange={(e) => handleInputChange(e.target.value, 'NUMBER')} onBlur={handleBlur}
                        // type="text" pattern="[0-9]+" value={value} onChange={(event) => handleChangeValue(event, 'number')}
                    />
                    {/* <input className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        type="text" pattern="[0-9]+" value={value} onChange={(event) => preHandleInputChange(fullKey, event.target.value)} onBlur={() => handleBlur(fullKey, value)}
                    /> */}
                    {typeof value}
                </div>
            }
            {inputType === 'text' && 
                <div className="flex flex-col space-y-3">
                    <H3>{title}:</H3>
                    <input className="h-[48px] py-3 px-4
                        rounded-xl border border-[#D7DFFF] 
                        text-sm font-normal"
                        // type={inputType} value={value} onChange={(e) => setValue(e.target.value)}
                        type='text' value={value} onChange={(e) => handleInputChange(e.target.value, 'TEXT')}
                        // type='text' value={value} onChange={(e) => handleChangeValue(e.target.value, 'TEXT')}
                    />
                    {typeof value}
                </div>
            }
            {inputType === 'bool' && 
                <div className="flex flex-col space-y-3">
                    <H3>{title}:</H3>
                    <label htmlFor='check' className="relative w-[52px] h-8 cursor-pointer bg-[#d7dfff] rounded-full has-[:checked]:bg-[#3561FE] transition-all duration-500">
                        <input type='checkbox' id='check' checked={value} className='sr-only peer' onChange={handleBool}/>
                        <span className='absolute left-1 top-1 w-6 h-6 bg-white rounded-full peer-checked:left-6 transition-all duration-500' />
                    </label>
                    {/* <p>{value ? 'true' : 'false'}</p> */}
                </div>
            }
        </>
    );
}

// Integral & Random
// Hier maak ik conditionally een InputField. Dit lost het probleem op van tussendoor een swipebutton hebben.