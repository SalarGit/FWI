// good grid, but messed up validation again...
import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';

export default function ZipFileHandler() {
    const [jsonData, setJsonData] = useState(null);
    const [inputValues, setInputValues] = useState({});
    const [initialTypes, setInitialTypes] = useState({});
    const [zipContent, setZipContent] = useState(null);
    const [caseId, setCaseId] = useState('');
    const [filePath, setFilePath] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.zip')) {
            setFilePath(file.name);

            const zip = new JSZip();
            try {
                const loadedZip = await zip.loadAsync(file);
                setZipContent(loadedZip);

                const jsonFile = loadedZip.file(/.*\.json$/)?.[0];
                if (jsonFile) {
                    const jsonText = await jsonFile.async('text');
                    const parsedData = JSON.parse(jsonText);

                    setJsonData(parsedData);
                    setInputValues(parsedData);

                    const newInitialTypes = replaceValuesWithTypes(parsedData);
                    setInitialTypes(newInitialTypes);

                } else {
                    console.error('No JSON file found in the ZIP.');
                }

                event.target.value = '';

            } catch (error) {
                console.error('Error reading zip file:', error);
            }
        }
    };

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

    useEffect(() => {
        if (Object.keys(initialTypes).length === 0 && Object.keys(inputValues).length > 0) {
            setInitialTypes(replaceValuesWithTypes(inputValues));
        }
    }, [inputValues, initialTypes]);

    const getTypeFromKey = (key) => {
        const keys = key.split('.');

        let currentValue = initialTypes;

        for (let i = 0; i < keys.length; i++) {
            if (currentValue.hasOwnProperty(keys[i])) {
                currentValue = currentValue[keys[i]];
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
                        return (
                            <div key={inputKey} className="col-span-2">
                                <div className="font-bold text-lg mb-2">{key}</div>
                                <div className="">
                                    {renderInputs(value, inputKey)}
                                </div>
                            </div>
                        );
                    } else {
                        const initialType = getTypeFromKey(inputKey);
                        return (
                            <div key={inputKey} className="mb-4">
                                <label className="block font-bold">{key}:</label>
                                <input
                                    type={initialType === 'number' ? 'number' : 'text'}
                                    value={value}
                                    onChange={(e) => handleInputChange(inputKey, e.target.value, initialType.toUpperCase())}
                                    onBlur={() => handleBlur(inputKey)}
                                    className="border border-gray-300 rounded p-2 w-full"
                                />
                            </div>
                        );
                    }
                })}
            </div>
        );
    };

    function updateInputValues(key, newValue) {
        const keys = key.split('.');

        setInputValues((prevState) => {
            let newState = { ...prevState };
            let nestedState = newState;

            if (keys.length === 1) {
                newState[keys[0]] = newValue;
            } else {
                keys.forEach((k, index) => {
                    if (index === keys.length - 1) {
                        nestedState[k] = newValue;
                    } else {
                        nestedState = nestedState[k];
                    }
                });
            }

            return newState;
        });
    }

    const handleInputChange = (key, value, option) => {
        if (option === 'NUMBER' && !isNaN(value)) {
            updateInputValues(key, value);
        } else if (option === 'TEXT') {
            updateInputValues(key, value);
        }
    };

    function handleBlur(key) {
        const keys = key.split('.');

        setInputValues((prevState) => {
            let newState = { ...prevState };
            let nestedState = newState;

            keys.forEach((k, index) => {
                if (index === keys.length - 1) {
                    const currentValue = parseFloat(nestedState[k]);
                    nestedState[k] = isNaN(currentValue) ? 0 : currentValue;
                } else {
                    nestedState = nestedState[k];
                }
            });

            return newState;
        });
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
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <input
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                className="block mb-4 border border-gray-300 rounded p-2"
            />
            {jsonData && (
                <div className="p-4 bg-white border rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Edit JSON Data</h2>
                    {renderInputs(inputValues)}
                    <button
                        onClick={handleSaveAndUpload}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Save and Upload
                    </button>
                    <div className='flex mt-4 space-x-4'>
                        <div>
                            <h1 className="font-bold mb-2">Initial Types</h1>
                            <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(initialTypes, null, 2)}</pre>
                        </div>
                        <div>
                            <h1 className="font-bold mb-2">Current Input Object</h1>
                            <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(inputValues, null, 2)}</pre>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-600">{filePath}</p>
                </div>
            )}
        </div>
    );
}
