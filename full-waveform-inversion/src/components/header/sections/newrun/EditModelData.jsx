// ORIGINAL AFTER DEEPCLONING and it work
import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';

import EditButton from '../../../custom/buttons/EditButton';
import H3 from '../../../custom/headings/H3';

// Utility to deep clone the data to avoid direct mutation of selectedModel.jsonData
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export default function EditModelData({ isEditOpen, handleAreOpen, handleModel, selectedModel, modelType }) {
    const [isOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState(deepClone(selectedModel.jsonData));  // Local form state
    const [hasSaved, setHasSaved] = useState(false);          // Track if save button was clicked
    const [wasOpen, setWasOpen] = useState(false);            // Track if it was open before closing

    // Effect to handle resetting formValues when dropdown is closed without saving
    useEffect(() => {
        if (!isEditOpen && wasOpen && !hasSaved) {
            // If dropdown is now closed, was previously open, and hasSaved is false, reset formValues
            setFormValues(deepClone(selectedModel.jsonData));
        }

        // Update wasOpen to match the latest isOpen value for the next cycle
        setWasOpen(isEditOpen);
    }, [isEditOpen, wasOpen, hasSaved, selectedModel.jsonData]);

    // Reset hasSaved when opening the form
    useEffect(() => {
        if (isEditOpen) {
            setHasSaved(false);  // Reset hasSaved to false when opening the form
            setFormValues(deepClone(selectedModel.jsonData));  // Reset formValues when opening
        }
    }, [isEditOpen, selectedModel.jsonData]);

    // useEffect(() => {
    //     if (isOpen) {
    //         console.log("useEffect triggered on OPEN")
    //         // Reset formValues when opening the form
    //         setFormValues(selectedModel.jsonData);
    //     } else {
    //         console.log("useEffect triggered on CLOSE")
    //         // Optionally discard unsaved changes when closing the form
    //         setFormValues(selectedModel.jsonData); 
    //     }
    // }, [isOpen, selectedModel.jsonData]);
    // useEffect(() => {
    //     if (!isOpen) {
    //         console.log("useEffect triggered on CLOSE")
    //         // Optionally discard unsaved changes when closing the form
    //         setFormValues(selectedModel.jsonData); 
    //     }
    // }, [isOpen, selectedModel.jsonData]);

    // newval is either val or parsefloated value
    function updateFormValues(key, newValue) {
        const keys = key.split('.');

        setFormValues((prevState) => {
            let newState = deepClone(prevState);
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
            updateFormValues(key, value);
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
    
        // let currentValue = initialTypes;
        let currentValue = selectedModel.initialTypes;
    
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
                                <div className="text-sm font-medium col-span-2 mb-4">{key}</div>
                                <div>{renderInputs(value, inputKey)}</div>
                            </div>
                        );
                    } else {
                        const initialType = getTypeFromKey(inputKey);
                        return (
                            <div key={inputKey} className='flex flex-col space-y-3'>
                                <label className="text-[#7f7f7f] font-medium">{key}:</label>
                                {initialType === 'number' &&
                                    <input
                                        type='text'
                                        value={value}
                                        onChange={(e) => handleInputChange(inputKey, e.target.value, 'NUMBER')}
                                        onBlur={() => handleBlur(inputKey)}
                                        className="h-[48px] py-3 px-4
                                        rounded-xl border border-[#D7DFFF] 
                                        text-sm font-normal"
                                    />
                                }
                                {initialType === 'string' &&
                                    <input
                                        type='text'
                                        value={value}
                                        onChange={(e) => handleInputChange(inputKey, e.target.value, 'TEXT')}
                                        className="h-[48px] py-3 px-4
                                        rounded-xl border border-[#D7DFFF] 
                                        text-sm font-normal"
                                    />
                                }
                                {initialType === 'boolean' &&
                                    <div className='h-full flex items-center'>
                                        <label htmlFor='check' className="relative w-[52px] h-8 cursor-pointer bg-[#d7dfff] rounded-full has-[:checked]:bg-[#3561FE] transition-all duration-500">
                                            <input
                                                type='checkbox'
                                                id='check'
                                                checked={value}
                                                className='sr-only peer'
                                                onChange={() => handleInputChange(inputKey, !value, 'BOOLEAN')}
                                            />
                                            <span className='absolute left-1 top-1 w-6 h-6 bg-white rounded-full peer-checked:left-6 transition-all duration-500' />
                                        </label>
                                    </div>
                                }
                            </div>
                        );
                    }
                })}
            </div>
        );
    };


    function handleKeyDown(e) {
        const isInputElement = e.target.tagName === 'INPUT';
        const isButtonElement = e.target.tagName === 'BUTTON';

        // Prevent default behavior if in an input field
        if (isInputElement && e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission on Enter key press inside input fields
        }

        // Allow default behavior if in a button
        if (isButtonElement && e.key === 'Enter') {
            handleSave() // No preventDefault here; let the button's default behavior happen
        }
    }

    // Save the form values and close the dropdown
    const handleSave = () => {
        // console.log(`handleSave triggered with:
        //     modelType: ${modelType}
        //     selectedModel.name: ${selectedModel.name}
        //     formValues: ${formValues.PMLWidthFactor.x}`)
        handleModel(modelType, selectedModel.name, "EDIT", formValues);  // Save changes to the main state
        setHasSaved(true);  // Mark the form as saved
        // setIsOpen(false);  // Close the dropdown
        handleAreOpen(modelType, "EDIT")
    };

    const handleCancel = () => {
        // setIsOpen(false);  // Close the dropdown and discard changes
        handleAreOpen(modelType, "EDIT");  // Close the dropdown and discard changes
    };

    return (
        <div>
            <EditButton title="Edit" absoluteStyling="right-10 top-2" handleClick={() => handleAreOpen(modelType, "EDIT")}
                conditionalStyling={isEditOpen ? 'border border-[#3561FE] py-[5px] px-[11px]' : 'py-[6px] px-3'}
            />
            {isEditOpen &&
                <div className={`absolute top-[60px] ${modelType === 'forward' ? 'left-0' : 'right-0'}
                    border border-[#D7DFFF] bg-white rounded-xl
                    w-fit h-fit p-[6px]`}
                > 
                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} onKeyDown={handleKeyDown}>
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

// ORIGINAL BEFORE DEEPCLONING
// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';

// import EditButton from '../../../custom/buttons/EditButton';

// export default function EditModelData({ handleModel, selectedModel, modelType }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [formValues, setFormValues] = useState(selectedModel.jsonData);  // Local form state
//     const [hasSaved, setHasSaved] = useState(false);          // Track if save button was clicked
//     const [wasOpen, setWasOpen] = useState(false);            // Track if it was open before closing

//     console.log("formValues: ", formValues)
//     console.log("selectedModel.jsonData: ", selectedModel.jsonData)

//     // Effect to handle resetting formValues when dropdown is closed without saving
//     useEffect(() => {
//         if (!isOpen && wasOpen && !hasSaved) {
//             console.log("useEffect if is TRUE. Resetting formValues to selectedModel.jsonData.")
//             // If dropdown is now closed, was previously open, and hasSaved is false, reset formValues
//             setFormValues(selectedModel.jsonData);
//         }

//         // Update wasOpen to match the latest isOpen value for the next cycle
//         setWasOpen(isOpen);
//     }, [isOpen, wasOpen, hasSaved, selectedModel.jsonData]);

//     // useEffect(() => {
//     //     if (isOpen) {
//     //         console.log("useEffect triggered on OPEN")
//     //         // Reset formValues when opening the form
//     //         setFormValues(selectedModel.jsonData);
//     //     } else {
//     //         console.log("useEffect triggered on CLOSE")
//     //         // Optionally discard unsaved changes when closing the form
//     //         setFormValues(selectedModel.jsonData); 
//     //     }
//     // }, [isOpen, selectedModel.jsonData]);
//     // useEffect(() => {
//     //     if (!isOpen) {
//     //         console.log("useEffect triggered on CLOSE")
//     //         // Optionally discard unsaved changes when closing the form
//     //         setFormValues(selectedModel.jsonData); 
//     //     }
//     // }, [isOpen, selectedModel.jsonData]);

//     // newval is either val or parsefloated value
//     function updateFormValues(key, newValue) {
//         const keys = key.split('.');

//         setFormValues((prevState) => {
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

//     // Function to handle input changes and update the form values
//     const handleInputChange = (key, value, option) => {
//         const regex = /^-?\d*\.?\d*$/;

//         if (option === 'NUMBER' && regex.test(value)) { // '-', '.', '' go through regex, but parseFloat to NaN
//             updateFormValues(key, value);
//         } else if (option === 'TEXT') {
//             updateFormValues(key, value);
//         } else if (option === 'BOOLEAN') {
//             // Handle boolean (not implemented in your original code)
//         }
//     };

//     function handleBlur(key) {
//         const keys = key.split('.');

//         setFormValues((prevState) => {
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
//                         nestedState[k] = 0;  // Handle invalid number case
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
    
//         // let currentValue = initialTypes;
//         let currentValue = selectedModel.initialTypes;
    
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
//                                 <div className="text-sm font-medium col-span-2">{key}</div>
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
//                                             className="h-[48px] py-3 px-4
//                                             rounded-xl border border-[#D7DFFF] 
//                                             text-sm font-normal"
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
//                                             className="h-[48px] py-3 px-4
//                                             rounded-xl border border-[#D7DFFF] 
//                                             text-sm font-normal"
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

//     // Save the form values and close the dropdown
//     const handleSave = () => {
//         console.log(`handleSave triggered with:
//             modelType: ${modelType}
//             selectedModel.name: ${selectedModel.name}
//             formValues: ${formValues.PMLWidthFactor.x}`)
//         handleModel(modelType, selectedModel.name, "EDIT", formValues);  // Save changes to the main state
//         setHasSaved(true);  // Mark the form as saved
//         setIsOpen(false);  // Close the dropdown
//     };

//     const handleCancel = () => {
//         setIsOpen(false);  // Close the dropdown and discard changes
//     };

//     return (
//         <div>
//             <EditButton title="Edit" absoluteStyling="right-10 top-2" handleClick={() => setIsOpen((prev) => !prev)}
//                 conditionalStyling={isOpen ? 'border border-[#3561FE] py-[5px] px-[11px]' : 'py-[6px] px-3'}
//             />
//             {isOpen &&
//                 <div className={`absolute top-[60px] ${modelType === 'forward' ? 'left-0' : 'right-0'}
//                     border border-[#D7DFFF] bg-white rounded-xl
//                     w-fit h-fit p-[6px]`}
//                 >
//                     <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
//                     <div className="flex flex-col space-y-6 w-max max-h-[400px] p-[10px] pb-0 overflow-auto scrollbar-webkit">
//                         {renderInputs(formValues)}  {/* Render inputs from the form state */}
                        
//                         {/* This is part of the scrollable content */}
//                         <div className="sticky bottom-0 bg-white rounded-t-xl pb-[10px]">
//                             <button type="submit" className="py-4 bg-[#3561FE] rounded-xl w-full ">
//                                 <p className="text-white font-semibold">Save</p>
//                             </button>
//                         </div>
//                     </div>
//                     </form>
//                 </div>
//             }
//         </div>
//     );
// }

                        // <div className="flex flex-col space-y-6 w-max max-h-[400px] p-[10px] overflow-auto scrollbar-webkit">
                        //     {renderInputs(formValues)}  {/* Render inputs from the form state */}
                        //     <button type="submit" className="py-4 bg-[#3561FE] rounded-xl">
                        //         <p className="text-white font-semibold">Save</p>
                        //     </button>
                        // </div>




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
//                 <div className={`absolute top-[60px] ${model === 'minimization' ? 'right-0' : ''} ${!isOpen ? 'hidden' : ''}
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
