// NOT TESTED YET

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
                    setInputValues(parsedData); // Initialize state with the parsed JSON data
                } else {
                    console.error('No JSON file found in the ZIP.');
                }
            } catch (error) {
                console.error('Error reading zip file:', error);
            }
        }
    };

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
                        'accept': 'application/json',
                    },
                });

                if (response.ok) {
                    console.log('Upload successful!');
                } else {
                    console.error('Upload failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error uploading zip file:', error);
            }
        }
    };

    // Helper function to render input fields for both top-level and nested objects
    const renderInputFields = (data, parentKey = '') => {
        return (
            <>
                {Object.keys(data).map((key) => {
                    const value = data[key];
                    const valueType = typeof value;
                    const fullKey = parentKey ? `${parentKey}.${key}` : key;

                    if (valueType === 'object' && !Array.isArray(value)) {
                        return (
                            <React.Fragment key={fullKey}>
                                <h3 className="text-md font-bold">{key}</h3>
                                {renderInputFields(value, fullKey)}
                            </React.Fragment>
                        );
                    } else {
                        // Access the current state value for the input field
                        const currentStateValue = fullKey.split('.').reduce((acc, cur) => acc?.[cur], inputValues);

                        return (
                            <div key={fullKey} className="flex flex-col space-y-3">
                                <label className="text-sm font-medium text-gray-700">{key}</label>
                                <input
                                    className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    type="text"
                                    value={currentStateValue || ''} // Dynamically access the state value
                                    onChange={(e) => handleInputChange(fullKey, e.target.value)}
                                />
                            </div>
                        );
                    }
                })}
            </>
        );
    };

    // Function to handle input changes and update the nested state
    const handleInputChange = (key, value) => {
        setInputValues((prevState) => {
            const updatedState = { ...prevState };
            const keys = key.split('.');
            let obj = updatedState;

            for (let i = 0; i < keys.length - 1; i++) {
                if (!obj[keys[i]]) obj[keys[i]] = {}; // Ensure nested structure exists
                obj = obj[keys[i]];
            }

            obj[keys[keys.length - 1]] = value;
            return updatedState;
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Dynamic JSON Editor</h2>
            <input type="file" accept=".zip" onChange={handleFileChange} />

            {jsonData && (
                <form className="mt-4 grid grid-cols-2 gap-4">
                    {renderInputFields(jsonData)}
                </form>
            )}

            {jsonData && (
                <>
                    <label className="block text-sm font-medium text-gray-700 mt-4">Case ID</label>
                    <input
                        type='text'
                        value={caseId}
                        onChange={(e) => setCaseId(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                    <button
                        onClick={handleSaveAndUpload}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Save and Upload
                    </button>
                </>
            )}

            <pre className="mt-4 p-4 bg-gray-100 rounded-md">
                {JSON.stringify(inputValues, null, 2)}
            </pre>
        </div>
    );
}


// import React, { useState } from 'react';
// import JSZip from 'jszip';

// export default function ZipFileHandler() {
//     const [jsonData, setJsonData] = useState({
//         tolerance: 0.000001,
//         maxIterations: 50,
//         wavefieldCalculationPeriod: 1,
//         stepAmplification: {
//             method: "DeltaAmplification",
//             fixedAmplification: 50,
//             deltaAmplificationStart: 100,
//             deltaAmplificationSlope: 1,
//             PMLWidthFactor: {
//                 x: 0,
//                 z: 0
//             },
//         }
//     });

//     const [inputValues, setInputValues] = useState(jsonData);

//     const handleBlur = (key, value) => {
//         const numberValue = parseFloat(value);
//         handleInputChange(key, isNaN(numberValue) ? '' : numberValue);
//     };

//     const renderInputFields = (data, parentKey = '') => {
//         return (
//             <>
//                 {Object.keys(data).map((key) => {
//                     const value = data[key];
//                     const valueType = typeof value;
//                     const fullKey = parentKey ? `${parentKey}.${key}` : key;

//                     if (typeof value === 'object' && !Array.isArray(value)) {
//                         // Group name as a header
//                         return (
//                             <React.Fragment key={fullKey}>
//                                 <div className="col-span-2 mt-4">
//                                     <h3 className="text-md font-bold">{key}</h3>
//                                     <div className="pl-4">
//                                         {renderInputFields(value, fullKey)} {/* Recursive call for nested fields */}
//                                     </div>
//                                 </div>
//                             </React.Fragment>
//                         );
//                     } else {
//                         return (
//                             <div key={fullKey} className="flex flex-col space-y-2 col-span-1">
//                                 <label className="text-sm font-medium text-gray-700">
//                                     {key}
//                                 </label>
//                                 <input
//                                     className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                     type="text"
//                                     value={inputValues[fullKey.split('.').reduce((acc, part) => acc[part], inputValues)] || ''}
//                                     onChange={(event) => preHandleInputChange(fullKey, event.target.value)}
//                                     onBlur={() => handleBlur(fullKey, value)}
//                                 />
//                             </div>
//                         );
//                     }
//                 })}
//             </>
//         );
//     };

//     const preHandleInputChange = (key, value) => {
//         if (/^-?\d*\.?\d*([eE]-?\d*)?$/.test(value) || value === '') {
//             handleInputChange(key, value); // Update input value as a string
//         }
//     };

//     const handleInputChange = (key, value) => {
//         setInputValues((prevState) => {
//             const updatedState = { ...prevState };
//             const keys = key.split('.');
//             let obj = updatedState;

//             for (let i = 0; i < keys.length - 1; i++) {
//                 obj = obj[keys[i]];
//             }
//             obj[keys[keys.length - 1]] = value;

//             return updatedState;
//         });
//     };

//     return (
//         <div className="p-4">
//             <h2 className="text-xl font-bold">Dynamic Form</h2>
//             <form className="mt-4 grid grid-cols-2 gap-4">
//                 {renderInputFields(inputValues)}
//             </form>
//             <pre className="mt-4 p-4 bg-gray-100 rounded-md">
//                 {JSON.stringify(inputValues, null, 2)}
//             </pre>
//         </div>
//     );
// }
