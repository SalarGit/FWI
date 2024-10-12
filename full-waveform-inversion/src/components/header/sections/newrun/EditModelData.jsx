import React, { useState, useEffect } from 'react';

import EditButton from '../../../custom/buttons/EditButton';

// Utility to deep clone the data to avoid direct mutation of selectedModel.jsonData
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export default function EditModelData({ isEditOpen, handleAreOpen, handleModel, selectedModel, modelType }) {
    const [formValues, setFormValues] = useState(deepClone(selectedModel.jsonData));
    const [hasSaved, setHasSaved] = useState(false);
    const [wasOpen, setWasOpen] = useState(false);

    useEffect(() => {
        if (!isEditOpen && wasOpen && !hasSaved) {
            setFormValues(deepClone(selectedModel.jsonData));
        }

        setWasOpen(isEditOpen);
    }, [isEditOpen, wasOpen, hasSaved, selectedModel.jsonData]);

    useEffect(() => {
        if (isEditOpen) {
            setHasSaved(false);
            setFormValues(deepClone(selectedModel.jsonData));
        }
    }, [isEditOpen, selectedModel.jsonData]);

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

            return newState;
        });
    }

    const handleInputChange = (key, value, option) => {
        const regex = /^-?\d*\.?\d*$/;

        if (option === 'NUMBER' && regex.test(value)) { // The chars '-', '.', '' pass the regex, but are parseFloated to NaN
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

            return newState;
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
                return 'Key not found';
            }
        }
    
        return currentValue;
    };

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
                                <div className="text-sm col-span-2 mb-4 font-generalSansMedium">{key}</div>
                                <div>{renderInputs(value, inputKey)}</div>
                            </div>
                        );
                    } else {
                        const initialType = getTypeFromKey(inputKey);
                        return (
                            <div key={inputKey} className='flex flex-col space-y-3'>
                                <label className="text-[#7f7f7f] font-generalSansMedium">{key}:</label>
                                {initialType === 'number' &&
                                    <input
                                        type='text'
                                        value={value}
                                        onChange={(e) => handleInputChange(inputKey, e.target.value, 'NUMBER')}
                                        onBlur={() => handleBlur(inputKey)}
                                        className="h-[48px] py-3 px-4
                                        rounded-xl border border-[#D7DFFF] 
                                        text-sm font-switzerRegular"
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

        if (isInputElement && e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission on Enter key press whilst focused on an input field
        }

        if (isButtonElement && e.key === 'Enter') {
            handleSave(); // Allow using enter whilst focused on buttons ('Calculate' is the only button)
        }
    }

    const handleSave = () => {
        handleModel(modelType, selectedModel.name, "EDIT", formValues);
        setHasSaved(true);
        handleAreOpen(modelType, "EDIT")
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
                            {renderInputs(formValues)}
                            
                            <div className="sticky bottom-0 bg-white rounded-t-xl pb-[10px]">
                                <button type="submit" className="py-4 bg-[#3561FE] rounded-xl w-full ">
                                    <p className="text-white font-switzerRegular">Save</p>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
}