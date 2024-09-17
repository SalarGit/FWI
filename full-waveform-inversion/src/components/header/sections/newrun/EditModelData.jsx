// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';

// import EditButton from '../../../custom/buttons/EditButton';

// export default function EditModelData({ model, jsonData, inputValues, setInputValues, initialTypes }) {
//     const [isOpen, setIsOpen] = useState(false);

//     // newval is either val or parsefloated value
//     function updateInputValues(key, newValue) {
//         const keys = key.split('.');

//         setInputValues((prevState) => {
//             let newState = { ...prevState };
//             let nestedState = newState;

//             if (keys.length === 1) {
//                 // For top-level keys, directly update the value
//                 newState[keys[0]] = newValue;
//             } else {
//                 // Traverse for nested objects
//                 keys.forEach((k, index) => {
//                     if (index === keys.length - 1) {
//                         // If it's the last key, set the value
//                         nestedState[k] = newValue;
//                     } else {
//                         // Traverse deeper if it's not the last key
//                         nestedState = nestedState[k];
//                     }
//                 });
//             }

//             return newState;  // Return the updated state to trigger re-render
//         });
//     }

//     // Function to handle input changes and update the nested state
//     const handleInputChange = (key, value, option) => {
//         const regex = /^-?\d*\.?\d*$/

//         if (option === 'NUMBER' && regex.test(value)) { // '-', '.', '' go through regex, but parseFloat to NaN
//             updateInputValues(key, value)
//         } else if (option === 'TEXT') {
//             updateInputValues(key, value)
//         } else if (option === 'BOOLEAN') {

//         }
//     };

//     function handleBlur(key) {
//         console.log("Calling handleBlur")
//         const keys = key.split('.');
    
//         setInputValues((prevState) => {
//             let newState = { ...prevState };
//             let nestedState = newState;
    
//             // Traverse the object based on the keys
//             keys.forEach((k, index) => {
//                 if (index === keys.length - 1) {
//                     // If it's the last key, parse the current value to a float and update
//                     const currentValue = parseFloat(nestedState[k]);
//                     if (!isNaN(currentValue)) {
//                         nestedState[k] = currentValue; // Set the parsed float value
//                     } else {
//                         // Handle the case where the value is not a valid number
//                         nestedState[k] = 0;
//                     }
//                 } else {
//                     // Traverse deeper if it's not the last key
//                     nestedState = nestedState[k];
//                 }
//             });
    
//             return newState;  // Return the updated state to trigger re-render
//         });       
//     }

//     const getTypeFromKey = (key) => {
//         const keys = key.split('.'); // Split the key into parts (for nested keys)
    
//         let currentValue = initialTypes;
    
//         for (let i = 0; i < keys.length; i++) {
//             if (currentValue.hasOwnProperty(keys[i])) {
//                 currentValue = currentValue[keys[i]]; // Move deeper into the object
//             } else {
//                 return 'Key not found'; // If the key doesn't exist
//             }
//         }
    
//         return currentValue; // Return the found type (string)
//     };

//     // Recursive function to render inputs for both flat and nested JSON objects
//     const renderInputs = (data, parentKey = '') => {
//         return (
//             <div className="grid grid-cols-2 gap-4">
//                 {Object.keys(data).map((key) => {
//                     const value = data[key];
//                     const inputKey = parentKey ? `${parentKey}.${key}` : key;

//                     if (typeof value === 'object' && value !== null) {
//                         // Recursive call for nested objects
//                         return (
//                             <div key={inputKey} className="col-span-2">
//                                 {/* TODO: div of label idk */}
//                                 <div className="font-bold text-lg mb-2">{key}</div>
//                                 <div>{renderInputs(value, inputKey)}</div>
//                             </div>
//                         );
//                     } else {
//                         const initialType = getTypeFromKey(inputKey);
//                         return (
//                             <>
//                                 {initialType === 'number' &&
//                                     <div key={inputKey} className="mb-4">
//                                         <label className="block">{key}:</label>
//                                         <input
//                                             type='text'
//                                             value={value}
//                                             onChange={(e) => handleInputChange(inputKey, e.target.value, 'NUMBER')}
//                                             onBlur={() => handleBlur(inputKey)}
//                                             // className="border px-2 py-1"
//                                             className="border border-gray-300 rounded p-2 w-full"
//                                         />
//                                     </div>
//                                 }
//                                 {initialType === 'string' &&
//                                     <div key={inputKey} className="mb-4">
//                                         <label className="block">{key}:</label>
//                                         <input
//                                             type='text'
//                                             value={value}
//                                             onChange={(e) => handleInputChange(inputKey, e.target.value, 'TEXT')}
//                                             // className="border px-2 py-1"
//                                             className="border border-gray-300 rounded p-2 w-full"
//                                         />
//                                     </div>
//                                 }
//                                 {initialType === 'boolean' &&
//                                     console.log('boolean')
//                                 }
//                             </>
//                         );
//                     }
//                 })}
//             </div>
//         );
//     };

//     return (
//         <div>
//             <EditButton title="Edit" absoluteStyling="right-10 top-2" handleClick={() => setIsOpen((prev) => prev ? false : true)}
//                 conditionalStyling={isOpen ? 'border border-[#3561FE] py-[5px] px-[11px]' : 'py-[6px] px-3'}
//             />
//             {isOpen &&
//                 <div className={`absolute top-[60px] ${model === 'minimisation' ? 'right-0' : ''} ${!isOpen ? 'hidden' : ''}
//                     border border-[#D7DFFF] bg-white rounded-xl
//                     w-fit h-fit p-[6px]`} /* This 6px padding is removed from the inner div padding to keep the visual box the same padding. */
//                 >
//                     <div className="flex flex-col space-y-6 w-max max-h-[400px] p-[10px] overflow-auto scrollbar-webkit"
//                         // 568px bottom of page, 480px to bottom Calculated Output, 470px a bit above Calc Output
//                     >
//                         {/* Input elements */}
//                         {renderInputs(inputValues)}  {/* Render inputs from state */}

//                         {/* min-w-max */}
//                         {/* {children} aka input values in grid*/}
//                         <button className="py-4 bg-[#3561FE] rounded-xl">
//                             <p className="text-white font-semibold">Save</p>
//                         </button>
//                     </div>
//                 </div>
//             }
//             {/* <EditDataMenu model={model} isOpen={isOpen}> */}
//                 {/* {editMenu} */}
//             {/* </EditDataMenu> */}
//         </div>
//     )
// }

import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';

import EditButton from '../../../custom/buttons/EditButton';

export default function EditModelData({ modelType, inputValues, setInputValues, initialTypes }) {
    const [isOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState(inputValues);  // Local form state

    useEffect(() => {
        if (isOpen) {
            setFormValues(inputValues);  // Reset form values when dropdown is opened
        }
    }, [isOpen, inputValues]);

    // newval is either val or parsefloated value
    function updateFormValues(key, newValue) {
        const keys = key.split('.');

        setFormValues((prevState) => {
            let newState = { ...prevState };
            let nestedState = newState;

            if (keys.length === 1) {
                // For top-level keys, directly update the value
                newState[keys[0]] = newValue;
            } else {
                // Traverse for nested objects
                keys.forEach((k, index) => {
                    if (index === keys.length - 1) {
                        // If it's the last key, set the value
                        nestedState[k] = newValue;
                    } else {
                        // Traverse deeper if it's not the last key
                        nestedState = nestedState[k];
                    }
                });
            }

            return newState;  // Return the updated state to trigger re-render
        });
    }

    // Function to handle input changes and update the form values
    const handleInputChange = (key, value, option) => {
        const regex = /^-?\d*\.?\d*$/;

        if (option === 'NUMBER' && regex.test(value)) { // '-', '.', '' go through regex, but parseFloat to NaN
            updateFormValues(key, value);
        } else if (option === 'TEXT') {
            updateFormValues(key, value);
        } else if (option === 'BOOLEAN') {
            // Handle boolean (not implemented in your original code)
        }
    };

    function handleBlur(key) {
        const keys = key.split('.');

        setFormValues((prevState) => {
            let newState = { ...prevState };
            let nestedState = newState;

            // Traverse the object based on the keys
            keys.forEach((k, index) => {
                if (index === keys.length - 1) {
                    // If it's the last key, parse the current value to a float and update
                    const currentValue = parseFloat(nestedState[k]);
                    if (!isNaN(currentValue)) {
                        nestedState[k] = currentValue; // Set the parsed float value
                    } else {
                        nestedState[k] = 0;  // Handle invalid number case
                    }
                } else {
                    // Traverse deeper if it's not the last key
                    nestedState = nestedState[k];
                }
            });

            return newState;  // Return the updated state to trigger re-render
        });
    }

    const getTypeFromKey = (key) => {
        const keys = key.split('.'); // Split the key into parts (for nested keys)
    
        let currentValue = initialTypes;
    
        for (let i = 0; i < keys.length; i++) {
            if (currentValue.hasOwnProperty(keys[i])) {
                currentValue = currentValue[keys[i]]; // Move deeper into the object
            } else {
                return 'Key not found'; // If the key doesn't exist
            }
        }
    
        return currentValue; // Return the found type (string)
    };

    // Recursive function to render inputs for both flat and nested JSON objects
    const renderInputs = (data, parentKey = '') => {
        return (
            <div className="grid grid-cols-2 gap-4">
                {Object.keys(data).map((key) => {
                    const value = data[key];
                    const inputKey = parentKey ? `${parentKey}.${key}` : key;

                    if (typeof value === 'object' && value !== null) {
                        // Recursive call for nested objects
                        return (
                            <div key={inputKey} className="col-span-2">
                                <div className="text-sm font-medium col-span-2">{key}</div>
                                <div>{renderInputs(value, inputKey)}</div>
                            </div>
                        );
                    } else {
                        const initialType = getTypeFromKey(inputKey);
                        return (
                            <>
                                {initialType === 'number' &&
                                    <div key={inputKey} className="mb-4">
                                        <label className="block">{key}:</label>
                                        <input
                                            type='text'
                                            value={value}
                                            onChange={(e) => handleInputChange(inputKey, e.target.value, 'NUMBER')}
                                            onBlur={() => handleBlur(inputKey)}
                                            className="h-[48px] py-3 px-4
                                            rounded-xl border border-[#D7DFFF] 
                                            text-sm font-normal"
                                        />
                                    </div>
                                }
                                {initialType === 'string' &&
                                    <div key={inputKey} className="mb-4">
                                        <label className="block">{key}:</label>
                                        <input
                                            type='text'
                                            value={value}
                                            onChange={(e) => handleInputChange(inputKey, e.target.value, 'TEXT')}
                                            className="h-[48px] py-3 px-4
                                            rounded-xl border border-[#D7DFFF] 
                                            text-sm font-normal"
                                        />
                                    </div>
                                }
                                {initialType === 'boolean' &&
                                    console.log('boolean')
                                }
                            </>
                        );
                    }
                })}
            </div>
        );
    };

    const handleSave = () => {
        setInputValues(formValues);  // Save changes to the main state
        setIsOpen(false);  // Close the dropdown
    };

    const handleCancel = () => {
        setIsOpen(false);  // Close the dropdown and discard changes
    };

    return (
        <div>
            <EditButton title="Edit" absoluteStyling="right-10 top-2" handleClick={() => setIsOpen((prev) => !prev)}
                conditionalStyling={isOpen ? 'border border-[#3561FE] py-[5px] px-[11px]' : 'py-[6px] px-3'}
            />
            {isOpen &&
                <div className={`absolute top-[60px] ${modelType === 'forward' ? 'left-0' : 'right-0'}
                    border border-[#D7DFFF] bg-white rounded-xl
                    w-fit h-fit p-[6px]`}
                >
                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <div className="flex flex-col space-y-6 w-max max-h-[400px] p-[10px] pb-0 overflow-auto scrollbar-webkit">
                        {renderInputs(formValues)}  {/* Render inputs from the form state */}
                        
                        {/* This is part of the scrollable content */}
                        <div className="sticky bottom-0 bg-white rounded-t-xl pb-[10px]">
                            <button type="submit" className="py-4 bg-[#3561FE] rounded-xl w-full ">
                                <p className="text-white font-semibold">Save</p>
                            </button>
                        </div>
                    </div>
                    </form>
                </div>
            }
        </div>
    );
}

                        // <div className="flex flex-col space-y-6 w-max max-h-[400px] p-[10px] overflow-auto scrollbar-webkit">
                        //     {renderInputs(formValues)}  {/* Render inputs from the form state */}
                        //     <button type="submit" className="py-4 bg-[#3561FE] rounded-xl">
                        //         <p className="text-white font-semibold">Save</p>
                        //     </button>
                        // </div>