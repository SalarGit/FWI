// Everything works, except grid

import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';

export default function ZipFileHandler() {
    const [jsonData, setJsonData] = useState(null);
    const [inputValues, setInputValues] = useState({});
    const [initialTypes, setInitialTypes] = useState({});
    const [zipContent, setZipContent] = useState(null);
    const [caseId, setCaseId] = useState('');
    const [filePath, setFilePath] = useState('');  // New state to store file path

    // New zip is not rflected in front-end
    // const handleFileChange = async (event) => {
    //     const file = event.target.files[0];
    //     if (file && file.name.endsWith('.zip')) {
    //         const zip = new JSZip();
    //         try {
    //             const loadedZip = await zip.loadAsync(file);
    //             setZipContent(loadedZip);

    //             // Find the JSON file inside the ZIP
    //             const jsonFile = loadedZip.file(/.*\.json$/)?.[2];
    //             if (jsonFile) {
    //                 const jsonText = await jsonFile.async('text');
    //                 const parsedData = JSON.parse(jsonText);
    //                 setJsonData(parsedData);
    //                 setInputValues(parsedData);
    //             } else {
    //                 console.error('No JSON file found in the ZIP.');
    //             }
    //         } catch (error) {
    //             console.error('Error reading zip file:', error);
    //         }
    //     }
    // };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.zip')) {
            setFilePath(file.name);  // Save the file path

            // Double redundant
            // setJsonData(null);  // Reset jsonData
            // setInputValues({});  // Clear input values
            // setInitialTypes({});  // Clear initial types

            const zip = new JSZip();
            try {
                const loadedZip = await zip.loadAsync(file);
                setZipContent(loadedZip); // Save the ZIP content
    
                // Find the JSON file inside the ZIP
                const jsonFile = loadedZip.file(/.*\.json$/)?.[0];
                if (jsonFile) {
                    const jsonText = await jsonFile.async('text');
                    const parsedData = JSON.parse(jsonText);
    
                    setJsonData(parsedData);  // Update jsonData with new parsed data
                    setInputValues(parsedData);  // Set new input values for the form
    
                    // Reset initialTypes so that it updates based on the new input values
                    const newInitialTypes = replaceValuesWithTypes(parsedData);
                    setInitialTypes(newInitialTypes);  // Set types based on the new file
    
                } else {
                    console.error('No JSON file found in the ZIP.');
                }

                // Reset file input value to allow re-uploading the same file
                event.target.value = '';  // This ensures the onChange event triggers even for the same file

            } catch (error) {
                console.error('Error reading zip file:', error);
            }
        }
    };
    

    // Function to replace values with their types
    const replaceValuesWithTypes = (obj) => {
        if (typeof obj === 'object' && obj !== null) {
            const result = Array.isArray(obj) ? [] : {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const value = obj[key];
                    if (typeof value === 'object' && value !== null) {
                        result[key] = replaceValuesWithTypes(value);
                    } else {
                        result[key] = typeof value;
                    }
                }
            }
            return result;
        } else {
            return typeof obj;
        }
    };

    // // Initialize initialTypes on component mount
    // useEffect(() => {
    //     setInitialTypes(replaceValuesWithTypes(inputValues));
    // }, []); // Empty dependency array ensures this runs only once on mount

    // Initialize initialTypes when inputValues is populated
    useEffect(() => {
        // Only set initialTypes if it's empty, to avoid overwriting it
        if (Object.keys(initialTypes).length === 0 && Object.keys(inputValues).length > 0) {
            setInitialTypes(replaceValuesWithTypes(inputValues));
        }
    }, [inputValues, initialTypes]);

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
                                {/* TODO: div of label idk */}
                                <div className="font-bold text-lg mb-2">{key}</div>
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
                                            // className="border px-2 py-1"
                                            className="border border-gray-300 rounded p-2 w-full"
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
                                            // className="border px-2 py-1"
                                            className="border border-gray-300 rounded p-2 w-full"
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

    // newval is either val or parsefloated value
    function updateInputValues(key, newValue) {
        const keys = key.split('.');

        setInputValues((prevState) => {
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

    // Function to handle input changes and update the nested state
    const handleInputChange = (key, value, option) => {
        const regex = /^-?\d*\.?\d*$/

        if (option === 'NUMBER' && regex.test(value)) { // '-', '.', '' go through regex, but parseFloat to NaN
            updateInputValues(key, value)
        } else if (option === 'TEXT') {
            updateInputValues(key, value)
        } else if (option === 'BOOLEAN') {

        }
    };

    function handleBlur(key) {
        console.log("Calling handleBlur")
        const keys = key.split('.');
    
        setInputValues((prevState) => {
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
                        // Handle the case where the value is not a valid number
                        nestedState[k] = 0;
                    }
                } else {
                    // Traverse deeper if it's not the last key
                    nestedState = nestedState[k];
                }
            });
    
            return newState;  // Return the updated state to trigger re-render
        });       
    }


    // function handleBlur(key) {
    //     // When input loses focus, convert it to a number if valid
    //     if (value === ''){
    //         setValue(0);
    //     } else {
    //         const numberValue = parseFloat(value);
    
    //         // Update state with number value if valid, otherwise keep it as is
    //         setValue(isNaN(numberValue) ? 0 : numberValue);
    //     }    
    // };

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
            <input type="file" accept=".zip" onChange={handleFileChange} className="block mb-4" />
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
                    {/* <pre className="mt-4 p-4 bg-gray-100 rounded-md">
                        {JSON.stringify(inputValues, null, 2)}
                    </pre> */}
                    <div className='flex mt-4 p-4 bg-gray-100 rounded-md'>
                    <div>
                        <h1>Initial Types</h1>
                        <pre>{JSON.stringify(initialTypes, null, 2)}</pre>
                    </div>
                    <div>
                        <h1>Current Input Object</h1>
                        <pre>{JSON.stringify(inputValues, null, 2)}</pre>
                    </div>
                    </div>
                    <p>{filePath}</p>
                </div>
            )}
        </div>
    );
}


// ALMOST GOOD GRID
// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';

// export default function ZipFileHandler() {
//     const [jsonData, setJsonData] = useState(null);
//     const [inputValues, setInputValues] = useState({});
//     const [initialTypes, setInitialTypes] = useState({});
//     const [zipContent, setZipContent] = useState(null);
//     const [caseId, setCaseId] = useState('');
//     const [filePath, setFilePath] = useState('');

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (file && file.name.endsWith('.zip')) {
//             setFilePath(file.name);

//             const zip = new JSZip();
//             try {
//                 const loadedZip = await zip.loadAsync(file);
//                 setZipContent(loadedZip);

//                 const jsonFile = loadedZip.file(/.*\.json$/)?.[0];
//                 if (jsonFile) {
//                     const jsonText = await jsonFile.async('text');
//                     const parsedData = JSON.parse(jsonText);

//                     setJsonData(parsedData);
//                     setInputValues(parsedData);

//                     const newInitialTypes = replaceValuesWithTypes(parsedData);
//                     setInitialTypes(newInitialTypes);

//                 } else {
//                     console.error('No JSON file found in the ZIP.');
//                 }

//                 event.target.value = '';

//             } catch (error) {
//                 console.error('Error reading zip file:', error);
//             }
//         }
//     };

//     const replaceValuesWithTypes = (obj) => {
//         if (typeof obj === 'object' && obj !== null) {
//             const result = Array.isArray(obj) ? [] : {};
//             for (const key in obj) {
//                 if (obj.hasOwnProperty(key)) {
//                     const value = obj[key];
//                     if (typeof value === 'object' && value !== null) {
//                         result[key] = replaceValuesWithTypes(value);
//                     } else {
//                         result[key] = typeof value;
//                     }
//                 }
//             }
//             return result;
//         } else {
//             return typeof obj;
//         }
//     };

//     useEffect(() => {
//         if (Object.keys(initialTypes).length === 0 && Object.keys(inputValues).length > 0) {
//             setInitialTypes(replaceValuesWithTypes(inputValues));
//         }
//     }, [inputValues, initialTypes]);

//     const getTypeFromKey = (key) => {
//         const keys = key.split('.');

//         let currentValue = initialTypes;

//         for (let i = 0; i < keys.length; i++) {
//             if (currentValue.hasOwnProperty(keys[i])) {
//                 currentValue = currentValue[keys[i]];
//             } else {
//                 return 'Key not found';
//             }
//         }

//         return currentValue;
//     };

//     const renderInputs = (data, parentKey = '') => {
//         return Object.keys(data).map((key) => {
//             const value = data[key];
//             const inputKey = parentKey ? `${parentKey}.${key}` : key;

//             if (typeof value === 'object' && value !== null) {
//                 return (
//                     <div key={inputKey} className="my-4">
//                         <div className="font-bold text-lg mb-2">{key}</div>
//                         <div className="grid grid-cols-2 gap-4 pl-4">
//                             {renderInputs(value, inputKey)}
//                         </div>
//                     </div>
//                 );
//             } else {
//                 const initialType = getTypeFromKey(inputKey);
//                 return (
//                     <div key={inputKey} className="mb-4">
//                         <label className="block font-bold">{key}:</label>
//                         <input
//                             type={initialType === 'number' ? 'number' : 'text'}
//                             value={value}
//                             onChange={(e) => handleInputChange(inputKey, e.target.value, initialType.toUpperCase())}
//                             onBlur={() => handleBlur(inputKey)}
//                             className="border border-gray-300 rounded p-2 w-full"
//                         />
//                     </div>
//                 );
//             }
//         });
//     };

//     function updateInputValues(key, newValue) {
//         const keys = key.split('.');

//         setInputValues((prevState) => {
//             let newState = { ...prevState };
//             let nestedState = newState;

//             if (keys.length === 1) {
//                 newState[keys[0]] = newValue;
//             } else {
//                 keys.forEach((k, index) => {
//                     if (index === keys.length - 1) {
//                         nestedState[k] = newValue;
//                     } else {
//                         nestedState = nestedState[k];
//                     }
//                 });
//             }

//             return newState;
//         });
//     }

//     const handleInputChange = (key, value, option) => {
//         if (option === 'NUMBER' && !isNaN(value)) {
//             updateInputValues(key, value);
//         } else if (option === 'TEXT') {
//             updateInputValues(key, value);
//         }
//     };

//     function handleBlur(key) {
//         const keys = key.split('.');

//         setInputValues((prevState) => {
//             let newState = { ...prevState };
//             let nestedState = newState;

//             keys.forEach((k, index) => {
//                 if (index === keys.length - 1) {
//                     const currentValue = parseFloat(nestedState[k]);
//                     nestedState[k] = isNaN(currentValue) ? 0 : currentValue;
//                 } else {
//                     nestedState = nestedState[k];
//                 }
//             });

//             return newState;
//         });
//     }

//     const handleSaveAndUpload = async () => {
//         if (jsonData && zipContent) {
//             zipContent.file('updated.json', JSON.stringify(inputValues, null, 2));

//             try {
//                 const updatedZipBlob = await zipContent.generateAsync({ type: 'blob' });
//                 const formData = new FormData();
//                 formData.append('case', updatedZipBlob, 'updated.zip');

//                 const response = await fetch(`/cases/${caseId}`, {
//                     method: 'POST',
//                     body: formData,
//                     headers: {
//                         accept: 'application/json',
//                     },
//                 });

//                 if (response.ok) {
//                     console.log('File uploaded successfully!');
//                 } else {
//                     console.error('Failed to upload file.');
//                 }
//             } catch (error) {
//                 console.error('Error saving or uploading the updated file:', error);
//             }
//         }
//     };

//     return (
//         <div className="p-4 bg-gray-50 rounded-lg shadow-md">
//             <input
//                 type="file"
//                 accept=".zip"
//                 onChange={handleFileChange}
//                 className="block mb-4 border border-gray-300 rounded p-2"
//             />
//             {jsonData && (
//                 <div className="p-4 bg-white border rounded-lg shadow-sm">
//                     <h2 className="text-xl font-bold mb-4">Edit JSON Data</h2>
//                     {renderInputs(inputValues)}
//                     <button
//                         onClick={handleSaveAndUpload}
//                         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                     >
//                         Save and Upload
//                     </button>
//                     <div className='flex mt-4 space-x-4'>
//                         <div>
//                             <h1 className="font-bold mb-2">Initial Types</h1>
//                             <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(initialTypes, null, 2)}</pre>
//                         </div>
//                         <div>
//                             <h1 className="font-bold mb-2">Current Input Object</h1>
//                             <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(inputValues, null, 2)}</pre>
//                         </div>
//                     </div>
//                     <p className="mt-4 text-gray-600">{filePath}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// bruh
// good grid, but messed up validation again...
// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';

// export default function ZipFileHandler() {
//     const [jsonData, setJsonData] = useState(null);
//     const [inputValues, setInputValues] = useState({});
//     const [initialTypes, setInitialTypes] = useState({});
//     const [zipContent, setZipContent] = useState(null);
//     const [caseId, setCaseId] = useState('');
//     const [filePath, setFilePath] = useState('');

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (file && file.name.endsWith('.zip')) {
//             setFilePath(file.name);

//             const zip = new JSZip();
//             try {
//                 const loadedZip = await zip.loadAsync(file);
//                 setZipContent(loadedZip);

//                 const jsonFile = loadedZip.file(/.*\.json$/)?.[0];
//                 if (jsonFile) {
//                     const jsonText = await jsonFile.async('text');
//                     const parsedData = JSON.parse(jsonText);

//                     setJsonData(parsedData);
//                     setInputValues(parsedData);

//                     const newInitialTypes = replaceValuesWithTypes(parsedData);
//                     setInitialTypes(newInitialTypes);

//                 } else {
//                     console.error('No JSON file found in the ZIP.');
//                 }

//                 event.target.value = '';

//             } catch (error) {
//                 console.error('Error reading zip file:', error);
//             }
//         }
//     };

//     const replaceValuesWithTypes = (obj) => {
//         if (typeof obj === 'object' && obj !== null) {
//             const result = Array.isArray(obj) ? [] : {};
//             for (const key in obj) {
//                 if (obj.hasOwnProperty(key)) {
//                     const value = obj[key];
//                     if (typeof value === 'object' && value !== null) {
//                         result[key] = replaceValuesWithTypes(value);
//                     } else {
//                         result[key] = typeof value;
//                     }
//                 }
//             }
//             return result;
//         } else {
//             return typeof obj;
//         }
//     };

//     useEffect(() => {
//         if (Object.keys(initialTypes).length === 0 && Object.keys(inputValues).length > 0) {
//             setInitialTypes(replaceValuesWithTypes(inputValues));
//         }
//     }, [inputValues, initialTypes]);

//     const getTypeFromKey = (key) => {
//         const keys = key.split('.');

//         let currentValue = initialTypes;

//         for (let i = 0; i < keys.length; i++) {
//             if (currentValue.hasOwnProperty(keys[i])) {
//                 currentValue = currentValue[keys[i]];
//             } else {
//                 return 'Key not found';
//             }
//         }

//         return currentValue;
//     };

//     const renderInputs = (data, parentKey = '') => {
//         return (
//             <div className="grid grid-cols-2 gap-4">
//                 {Object.keys(data).map((key) => {
//                     const value = data[key];
//                     const inputKey = parentKey ? `${parentKey}.${key}` : key;

//                     if (typeof value === 'object' && value !== null) {
//                         return (
//                             <div key={inputKey} className="col-span-2">
//                                 <div className="font-bold text-lg mb-2">{key}</div>
//                                 <div className="">
//                                     {renderInputs(value, inputKey)}
//                                 </div>
//                             </div>
//                         );
//                     } else {
//                         const initialType = getTypeFromKey(inputKey);
//                         return (
//                             <div key={inputKey} className="mb-4">
//                                 <label className="block font-bold">{key}:</label>
//                                 <input
//                                     type={initialType === 'number' ? 'number' : 'text'}
//                                     value={value}
//                                     onChange={(e) => handleInputChange(inputKey, e.target.value, initialType.toUpperCase())}
//                                     onBlur={() => handleBlur(inputKey)}
//                                     className="border border-gray-300 rounded p-2 w-full"
//                                 />
//                             </div>
//                         );
//                     }
//                 })}
//             </div>
//         );
//     };

//     function updateInputValues(key, newValue) {
//         const keys = key.split('.');

//         setInputValues((prevState) => {
//             let newState = { ...prevState };
//             let nestedState = newState;

//             if (keys.length === 1) {
//                 newState[keys[0]] = newValue;
//             } else {
//                 keys.forEach((k, index) => {
//                     if (index === keys.length - 1) {
//                         nestedState[k] = newValue;
//                     } else {
//                         nestedState = nestedState[k];
//                     }
//                 });
//             }

//             return newState;
//         });
//     }

//     const handleInputChange = (key, value, option) => {
//         if (option === 'NUMBER' && !isNaN(value)) {
//             updateInputValues(key, value);
//         } else if (option === 'TEXT') {
//             updateInputValues(key, value);
//         }
//     };

//     function handleBlur(key) {
//         const keys = key.split('.');

//         setInputValues((prevState) => {
//             let newState = { ...prevState };
//             let nestedState = newState;

//             keys.forEach((k, index) => {
//                 if (index === keys.length - 1) {
//                     const currentValue = parseFloat(nestedState[k]);
//                     nestedState[k] = isNaN(currentValue) ? 0 : currentValue;
//                 } else {
//                     nestedState = nestedState[k];
//                 }
//             });

//             return newState;
//         });
//     }

//     const handleSaveAndUpload = async () => {
//         if (jsonData && zipContent) {
//             zipContent.file('updated.json', JSON.stringify(inputValues, null, 2));

//             try {
//                 const updatedZipBlob = await zipContent.generateAsync({ type: 'blob' });
//                 const formData = new FormData();
//                 formData.append('case', updatedZipBlob, 'updated.zip');

//                 const response = await fetch(`/cases/${caseId}`, {
//                     method: 'POST',
//                     body: formData,
//                     headers: {
//                         accept: 'application/json',
//                     },
//                 });

//                 if (response.ok) {
//                     console.log('File uploaded successfully!');
//                 } else {
//                     console.error('Failed to upload file.');
//                 }
//             } catch (error) {
//                 console.error('Error saving or uploading the updated file:', error);
//             }
//         }
//     };

//     return (
//         <div className="p-4 bg-gray-50 rounded-lg shadow-md">
//             <input
//                 type="file"
//                 accept=".zip"
//                 onChange={handleFileChange}
//                 className="block mb-4 border border-gray-300 rounded p-2"
//             />
//             {jsonData && (
//                 <div className="p-4 bg-white border rounded-lg shadow-sm">
//                     <h2 className="text-xl font-bold mb-4">Edit JSON Data</h2>
//                     {renderInputs(inputValues)}
//                     <button
//                         onClick={handleSaveAndUpload}
//                         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                     >
//                         Save and Upload
//                     </button>
//                     <div className='flex mt-4 space-x-4'>
//                         <div>
//                             <h1 className="font-bold mb-2">Initial Types</h1>
//                             <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(initialTypes, null, 2)}</pre>
//                         </div>
//                         <div>
//                             <h1 className="font-bold mb-2">Current Input Object</h1>
//                             <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(inputValues, null, 2)}</pre>
//                         </div>
//                     </div>
//                     <p className="mt-4 text-gray-600">{filePath}</p>
//                 </div>
//             )}
//         </div>
//     );
// }
