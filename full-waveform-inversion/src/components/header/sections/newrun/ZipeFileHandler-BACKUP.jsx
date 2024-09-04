import React, { useState } from 'react';
import JSZip from 'jszip';
// import { saveAs } from 'file-saver';

export default function ZipFileHandler() {
    const [jsonData, setJsonData] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [zipContent, setZipContent] = useState(null);
    const [caseId, setCaseId] = useState('')
  
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
            setInputValue(parsedData.tolerance || ''); // Initialize the input field with the current tolerance value
          } else {
            console.error('GradientDescentMinimizationInput.json not found in the input folder of the zip.');
          }
        } catch (error) {
          console.error('Error reading zip file:', error);
        }
      }
    };
  
    const handleInputChange = (e) => {
      const newValue = e.target.value;
      if (jsonData && typeof jsonData.tolerance === 'number') {
        const numValue = parseFloat(newValue);
        if (!isNaN(numValue)) {
          setInputValue(numValue);
        }
      } else {
        setInputValue(newValue);
      }
    };

    const handleSaveAndUpload = async () => {
      if (jsonData && zipContent) {
        const updatedData = { ...jsonData, tolerance: inputValue };
        zipContent.file('input/GradientDescentMinimizationInput.json', JSON.stringify(updatedData, null, 2));
  
        try {
          // Generate the updated zip file as a Blob
          const updatedZipBlob = await zipContent.generateAsync({ type: 'blob' });
  
          // Upload the updated zip file to your API
          const formData = new FormData();
          formData.append('file', updatedZipBlob, 'updated.zip');
  
          
        // const fullUrl = `http://localhost:3000/cases/${caseId}`
        // const response = await fetch('https://your-api-endpoint/upload', {
          const response = await fetch(`/cases/${caseId}`, {
            method: 'POST',
            body: formData,
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

  return (
    <div className='absolute w-[604px] mt-[72px] right-[56px]
        bg-white border border-[#D7DFFF] rounded-2xl
        z-30' // Disabled: #B6B7BE
    >
        <div className="p-4">
        <input type="file" accept=".zip" onChange={handleFileChange} />
        {jsonData && (
            <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Tolerance</label>
            <input
                type={typeof jsonData.tolerance === 'number' ? 'number' : 'text'}
                value={inputValue}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
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