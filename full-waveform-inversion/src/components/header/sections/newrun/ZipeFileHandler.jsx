import React, { useState } from 'react';
import JSZip from 'jszip';

export default function ZipFileHandler() {
    const [jsonData, setJsonData] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [zipContent, setZipContent] = useState(null);
    const [caseId, setCaseId] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.zip')) {
            const zip = new JSZip();
            try {
                const loadedZip = await zip.loadAsync(file);
                setZipContent(loadedZip);

                // Find the specific JSON file inside the 'input' folder
                const jsonFile = loadedZip.file('input/GradientDescentMinimizationInput.json');
                if (jsonFile) {
                    const jsonText = await jsonFile.async('text');
                    const parsedData = JSON.parse(jsonText);
                    setJsonData(parsedData);
                    setInputValue(parsedData.tolerance || ''); // Initialize the input field with the current tolerance value. If no value, set to empty string. TODO
                } else {
                    console.error('GradientDescentMinimizationInput.json not found in the input folder of the zip.');
                }
            } catch (error) {
                console.error('Error reading zip file:', error);
            }
        }
    };

    const handleSaveAndUpload = async () => {
        if (jsonData && zipContent) {
            const updatedData = { ...jsonData, tolerance: inputValue };
            zipContent.file('input/GradientDescentMinimizationInput.json', JSON.stringify(updatedData, null, 2));

            try {
                // Generate the updated zip file as a Blob
                const updatedZipBlob = await zipContent.generateAsync({ type: 'blob' });

                // Create a FormData object and append the updated zip file
                const formData = new FormData();
                formData.append('case', updatedZipBlob, 'updated.zip'); // The field name 'case' should match your backend expectations

                // Send the updated zip file to the API
                const response = await fetch(`/cases/${caseId}`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'accept': 'application/json', // Expect a JSON response from the server
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

    // console.log(jsonData, typeof jsonData)
    // const toleranceType = typeof jsonData


    function handleInputChange(value, option) {
        const regex = /^-?\d*\.?\d*$/

        if (option === 'NUMBER') {
            if (regex.test(value) || value === '') {
                setInputValue(value); // Update input value as a string
                console.log("Value is now", value)
            }
        }
        else if (option === 'TEXT') {
            setInputValue(value)
        }
    }
    
    function handleBlur() {
        // When input loses focus, convert it to a number if valid
        if (inputValue === ''){
            setInputValue(0);
        } else {
            const numberValue = parseFloat(inputValue);
    
            // Update state with number value if valid, otherwise keep it as is
            setInputValue(isNaN(numberValue) ? 0 : numberValue);
        }    
    }

    return (
        <div className='absolute w-[604px] mt-[72px] right-[56px]
            bg-white border border-[#D7DFFF] rounded-2xl
            z-30' // Disabled: #B6B7BE
        >
            <div className="p-4">
                <input type="file" accept=".zip" onChange={handleFileChange} />
                {jsonData && (
                    <div className="mt-4">
                        {typeof jsonData.tolerance === 'number' && 
                            <div className="flex flex-col space-y-3">
                                {/* <H3>{title}, {typeof inputValue}:</H3> */}
                                <label className="block text-sm font-medium text-gray-700">Tolerance: {typeof inputValue}</label>
                                <input className="h-[48px] py-3 px-4
                                    rounded-xl border border-[#D7DFFF] 
                                    text-sm font-normal"
                                    type="text" value={inputValue} onChange={(e) => handleInputChange(e.target.value, 'NUMBER')} onBlur={handleBlur}
                                />
                                {typeof value}
                            </div>
                        }
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
                    </div>
                )}
            </div>
        </div>
    );
}


