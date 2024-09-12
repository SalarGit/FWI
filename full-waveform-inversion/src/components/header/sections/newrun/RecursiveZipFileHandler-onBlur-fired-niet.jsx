// JSON recursion works but not styled correctly

import React, { useState } from 'react';
import JSZip from 'jszip';

export default function ZipFileHandler() {
    const [jsonData, setJsonData] = useState(null);
    const [inputValues, setInputValues] = useState({});
    const [zipContent, setZipContent] = useState(null);
    const [caseId, setCaseId] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.zip')) {
            const zip = new JSZip();
            try {
                const loadedZip = await zip.loadAsync(file);
                setZipContent(loadedZip);

                // Find the JSON file inside the ZIP
                const jsonFile = loadedZip.file(/.*\.json$/)?.[0];
                if (jsonFile) {
                    const jsonText = await jsonFile.async('text');
                    const parsedData = JSON.parse(jsonText);
                    setJsonData(parsedData);
                    setInputValues(parsedData);
                } else {
                    console.error('No JSON file found in the ZIP.');
                }
            } catch (error) {
                console.error('Error reading zip file:', error);
            }
        }
    };

    // Recursive function to render inputs for both flat and nested JSON objects
    const renderInputs = (data, parentKey = '') => {
        return Object.keys(data).map((key) => {
            const value = data[key];
            const inputKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof value === 'object' && value !== null) {
                // Recursive call for nested objects
                return (
                    <div key={inputKey} className="ml-4">
                        <label className="font-bold">{key}:</label>
                        <div>{renderInputs(value, inputKey)}</div>
                    </div>
                );
            } else {
                // console.log(key, value)
                // if (typeof value === 'number') {
                //     console.log('number')
                // } else if (typeof value === 'string') {
                //     console.log('text')
                // } else if (typeof value === 'boolean') {
                //     console.log('bool')
                // }
                if (typeof value === 'number') {
                    // console.log(value, "is rendered as a number")
                    return (
                        <div key={inputKey} className="mb-2">
                            <label className="">{key + " " + typeof value}:</label>
                            <input
                                type={'text'}
                                value={value}
                                onChange={(e) => handleInputChange(inputKey, e.target.value, 'NUMBER')}
                                // onBlur={(e) => handleBlur(inputKey, e.target.value)}
                                className="border px-2 py-1"
                            />
                        </div>
                    )
                } else if (typeof value === 'string') {
                    // console.log(value, "is rendered as a string")
                    return (
                        <div key={inputKey} className="mb-2">
                            <label className="">{key + " " + typeof value}:</label>
                            <input
                                type={'text'}
                                value={value}
                                onChange={(e) => handleInputChange(inputKey, e.target.value, 'STRING')}
                                className="border px-2 py-1"
                            />
                        </div>
                    )
                } else if (typeof value === 'boolean') {
                    return(
                        console.log('boolean')
                    )
                }
            }
        });
    };

    // Function that finds a value in the state using its key
    
    // Function that updates state with new value in the location of key
    function updateInput(key, value) {
        const keys = key.split('.');
        // console.log("Updating", key, value, "with type", (typeof value))
        setInputValues((prevState) => {
            let newState = { ...prevState };
            let nestedState = newState;

            if (keys.length === 1) {
                // For top-level keys, directly update the value
                newState[keys[0]] = value;
            } else {
                // Traverse for nested objects
                keys.forEach((k, index) => {
                    if (index === keys.length - 1) {
                        // If it's the last key, set the value
                        nestedState[k] = value;
                    } else {
                        // Traverse deeper if it's not the last key
                        nestedState = nestedState[k];
                    }
                });
            }

            return newState;  // Return the updated state to trigger re-render
        });
    }

    // Function to handle input changes and update the nested state
    const handleInputChange = (key, value, option) => {
        // const newValue = isNaN(value) ? value : parseFloat(value);  // Keep number validation
        console.log("Entered handleInputChange with", key, value, option)
        // Validate input
        
        // if (option === 'NUMBER' && !isNaN(value)) {
        //     updateInput(key, value); // valid input
        //         console.log("Invalid input")
        // }
        
        const regex = /^-?\d*\.?\d*$/
        if (regex.test(value)) {
            console.log("Parsing", value, "to a float.")
            updateInput(key, parseFloat(value)); // valid input
        }    // else it's invalid input, so don't do anything 

         

            // ----------------
            // const regex = /^-?\d*\.?\d*$/
            // if (regex.test(value) || value === '') {
            //     updateInput(key, value); // Update input value as a string
            // ------------------
            // } // else it's invalid input, so don't do anything
        // }
        else if (option === 'STRING') {
            updateInput(key, value)
        }

        // updateInput(key, value)
    };

    

    function handleBlur(key, value) {
        console.log("ENTERED HANDLEBLUR with", key, value, typeof value)
        
        
        // console.log("ENTERED HANDLEBLUR with", key, value, typeof value)
        // console.log("It's happening bc I'm using event instead of state value. Event gives a string.")
        
        // // When input loses focus, convert it to a number if valid
        // if (value === ''){
        //     console.log("It's an empty string. Updating to 0.")
        //     updateInput(key, 0)
        // } else {
        //     const numberValue = parseFloat(value);
        //     // console.log("It's not an empty string, parsing to", parseFloat(value), ".")
        //     // isNaN(numberValue) ? console.log("Parsed to NaN, updating to 0.") : console.log("Updating to", numberValue)
        //     // Update state with number value if valid, otherwise keep it as is
        //     if (isNaN(numberValue)) {
        //         updateInput(key, 0)
        //     } else {
        //         updateInput(key, numberValue)
        //     }
        // }    

    }

    const handleSaveAndUpload = async () => {
        if (jsonData && zipContent) {
            zipContent.file('updated.json', JSON.stringify(inputValues, null, 2));

            try {
                const updatedZipBlob = await zipContent.generateAsync({ type: 'blob' });
                const formData = new FormData();
                formData.append('case', updatedZipBlob, 'updated.zip');

                const response = await fetch(`/cases/${caseId}`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        accept: 'application/json',
                    },
                });

                if (response.ok) {
                    console.log('File uploaded successfully!');
                } else {
                    console.error('Failed to upload file.');
                }
            } catch (error) {
                console.error('Error saving or uploading the updated file:', error);
            }
        }
    };

    return (
        <div className="p-4 bg-gray-50 rounded">
            <input type="file" accept=".zip" onChange={handleFileChange} className="mb-2" />
            {jsonData && (
                <div className="p-4 bg-white border rounded">
                    <h2 className="text-xl font-bold mb-4">Edit JSON Data</h2>
                    {renderInputs(inputValues)}  {/* Render inputs from state */}
                    <button
                        onClick={handleSaveAndUpload}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Save and Upload
                    </button>
                    <pre className="mt-4 p-4 bg-gray-100 rounded-md">
                        {JSON.stringify(inputValues, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}