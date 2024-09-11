// Validation and state update works, but nested key-pair numbers arent loading.
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
                    const jsonResponse = await response.json();
                    console.log('Server response:', jsonResponse);
                } else {
                    console.error('Upload failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error uploading zip file:', error);
            }
        }
    };

    // const handleInputChange = (key, value) => {
    //     setInputValues((prevState) => {
    //         const updatedState = { ...prevState };
    //         const keys = key.split('.');
    //         let obj = updatedState;

    //         for (let i = 0; i < keys.length - 1; i++) {
    //             obj = obj[keys[i]];
    //         }
    //         obj[keys[keys.length - 1]] = value;

    //         return updatedState;
    //     });
    // };

    function handleInputChange(key, value, option) {
        // console.log(`Entered handleInputChange with: 
        //     key: ${key}
        //     value: ${value}, ${typeof key}
        //     option: ${option}`)
        // validate input
        if (option === 'NUMBER') {
            // console.log("Entered IF")
            const regex = /^-?\d*\.?\d*$/
            if (regex.test(value) || value === '') {
                // console.log("Entered IF IF")
                updateValue(key, value)
            }
        } else if (option === 'TEXT') {
            // console.log("Entered ELSE IF")
            updateValue(key, value)
        }
    }

    function updateValue(key, value) {
        // console.log(`Entered updateValue with: 
        //     key: ${key} ${typeof key}
        //     value: ${value}`)

        // setInputValues is called twice??
        setInputValues((prevState) => {
            const updatedState = { ...prevState };
            const keys = key.split('.');
            let obj = updatedState;

            for (let i = 0; i < keys.length - 1; i++) {
                obj = obj[keys[i]];
            }

            console.log('Entered handleInputChange')
            console.log(`Found, ${obj[keys[keys.length - 1]]} of type ${typeof obj[keys[keys.length - 1]]}`)
            console.log(`Changing it to ${value} of type ${typeof value}`)
            console.log(' ')
            obj[keys[keys.length - 1]] = value;

            return updatedState;
        });
    }
     
    function handleBlur(key) {
        // When input loses focus -> convert value to:
        // - float if valid
        // - 0 if invalid
        setInputValues((prevState) => {
            // check if value is empty string -> change to number 0
            const updatedState = { ...prevState };
            const keys = key.split('.');
            let obj = updatedState;

            for (let i = 0; i < keys.length - 1; i++) {
                obj = obj[keys[i]];
            }

            console.log('Entered handleBlur')
            console.log(`Found ${obj[keys[keys.length - 1]]} of type ${typeof obj[keys[keys.length - 1]]}`)
            
            if (obj[keys[keys.length - 1]] === ''){
                obj[keys[keys.length - 1]] = 0
                console.log(`Changed it to ${typeof 0}`)
            } else {
                // parse string to float
                const numberValue = parseFloat(obj[keys[keys.length - 1]]);
                // if it becomes NaN, change to 0, otherwise just update number
                obj[keys[keys.length - 1]] = isNaN(numberValue) ? 0 : numberValue
                console.log(`Changed it to ${isNaN(numberValue) ? typeof 0 : typeof numberValue}`)
            }

            return updatedState;
        });
    }


    const renderInputFields = (data, parentKey = '') => {
        return (
            <>
                {Object.keys(data).map((key) => {
                    const value = data[key];
                    const fullKey = parentKey ? `${parentKey}.${key}` : key;

                    const keys = key.split('.');
                    let obj = inputValues;

                    for (let i = 0; i < keys.length - 1; i++) {
                        obj = obj[keys[i]];
                    }

                    const stateValue = obj[keys[keys.length - 1]]

                    if (typeof value === 'object' && !Array.isArray(value)) {
                        return (
                            <React.Fragment key={fullKey}>
                                <div className="col-span-2">
                                    <h3 className="text-md font-bold">{key}</h3>
                                </div>
                                {renderInputFields(value, fullKey)}
                            </React.Fragment>
                        );
                    } else {
                        const inputType = typeof value
                        return (
                            <div key={fullKey} className="flex flex-col space-y-3">
                                <label className="text-sm font-medium text-gray-700">
                                    {key + ' ' + typeof value}
                                </label>
                                {inputType === 'number' &&
                                    <input
                                        className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        type='text'
                                        value={stateValue} // object key blablabla loop
                                        onChange={(e) => handleInputChange(fullKey, e.target.value, 'NUMBER')}
                                        onBlur={() => handleBlur(fullKey)}
                                    />
                                }
                                {inputType === 'string' &&
                                    <input
                                        className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        type='text'
                                        value={value}
                                        onChange={(e) => handleInputChange(fullKey, e.target.value, 'TEXT')}
                                    />
                                }
                                {/* <input
                                    className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    type={inputType}
                                    value={value}
                                    onChange={(e) => handleInputChange(fullKey, e.target.value)}
                                /> */}
                            </div>
                        );
                    }
                })}
            </>
        );
    };

    return (
        <div className='absolute w-[604px] mt-[72px] right-[56px]
            bg-white border border-[#D7DFFF] rounded-2xl
            z-30'
        >
            <div className="p-4">
                <input type="file" accept=".zip" onChange={handleFileChange} />
                {jsonData && (
                    <div className="mt-4">
                        <form className="grid grid-cols-2 gap-4">
                            {renderInputFields(jsonData)}
                        </form>
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
                        <pre className="mt-4 p-4 bg-gray-100 rounded-md">
                            {JSON.stringify(inputValues, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
