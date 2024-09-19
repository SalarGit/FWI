import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';

import '../../../../index.css';

import H1 from '../../../custom/headings/H1.jsx';
import H2 from '../../../custom/headings/H2.jsx';
import UpperPart from '../../../custom/UpperPart.jsx';
import BorderTop from '../../../custom/borders/BorderTop.jsx';
import Chip from '../../../custom/Chip.jsx';
import AddSubstract from '../../AddSubstract.jsx';
import FileInputWithCustomButton from '../../FileInputWithCustomButton.jsx';
import EditDropdownMenu from '../../../custom/dropdownmenus/editdata/EditDropdownMenu.jsx';
import * as api from '../../../../api/apiService.js'

import closeBig from '../../../../assets/close-big.png';

// import { forwardModels, minimizationModels } from '../../../../data.js';

export default function NewRun({ onClose }) {
    // const [threads, setThreads] = useState(1);
    
    // NOTES: Added all states.
    // Fix caseId and filename
    // const [inputValues, setInputValues] = useState({});
    const [zipContent, setZipContent] = useState(null);
    const [zipFileName, setZipFileName] = useState('')
    const [caseId, setCaseId] = useState([false, '']);
    const [minimizationModels, setMinimizationModels] = useState([]);
    const [forwardModels, setForwardModels] = useState([]);
    const [selectedModels, setSelectedModels] = useState({
        forward:
        {
            name: "",
            jsonData: null,
            initialTypes: null
        },
        minimization:
        {
            name: "",
            jsonData: null,
            initialTypes: null
        }
    })
    const [genericInput, setGenericInput] = useState({});
    const [isZipProcessed, setIsZipProcessed] = useState(false);
    const [areOpen, setAreOpen] = useState({forwardModelSelector: false, forwardEdit: false, minimizationModelSelector: false, minimizationEdit: false, });
    const [runs, setRuns] = useState(["Bruh"]);
    const [processes, setProcesses] = useState({'Pre-processing': true, 'Processing': true, 'Post-processing': true})
    const [isCalculating, setIsCalculating] = useState(false);

    function filter(name) {
        return name.replace('input/', '').
        replace('FMInput.json', '').
        replace('MinimizationInput.json', '')
    }

    // NOTE: Added handleZipChange
    const handleZipChange = async (event) => {
        const file = event.target.files[0];
        
        if (file && file.name.endsWith('.zip')) {
            setZipFileName(file.name);
            setIsZipProcessed(false);

            const zip = new JSZip();
            try {
                const loadedZip = await zip.loadAsync(file);
                setZipContent(loadedZip); // Save the ZIP content


                const genericInputJson = loadedZip.file("input/GenericInput.json")
                const genericInputText = await genericInputJson.async('text')
                const parsedGenericInputData = JSON.parse(genericInputText)

                setGenericInput(parsedGenericInputData)
                // setThreads(parsedGenericInputData.threads)

                const jsonFileNames = loadedZip.file(/.*\.json$/).map(file => file.name);

                // Categorize files based on their name endings
                const newMinimizationModels = [];
                const newForwardModels = [];
            
                jsonFileNames.forEach(fileName => {
                    if (fileName.endsWith('MinimizationInput.json')) {
                        newMinimizationModels.push(fileName);
                    } else if (fileName.endsWith('FMInput.json')) {
                        newForwardModels.push(fileName);
                    }
                });
            
                // Update the state with the new arrays
                setMinimizationModels(newMinimizationModels);
                setForwardModels(newForwardModels);

                // Find the JSON file inside the ZIP
                // const jsonFile = loadedZip.file(/.*\.json$/)?.[0];
                // console.log("jsonFile:", jsonFile)
                // const jsonFiles = [loadedZip.file(newForwardModels[0], newMinimizationModels[0])]

                // const forwardJson = loadedZip.file(newForwardModels[0])
                // const minimizationJson = loadedZip.file(newMinimizationModels[0])

                const initialForwardModel = `input/${parsedGenericInputData.forward}FMInput.json`
                const initialMinimizationModel = `input/${parsedGenericInputData.minimization}MinimizationInput.json`

                const forwardJson = loadedZip.file(initialForwardModel)
                const minimizationJson = loadedZip.file(initialMinimizationModel)

                if (forwardJson && minimizationJson) {
                    const forwardText = await forwardJson.async('text')
                    const minimizationText = await minimizationJson.async('text')
                    
                    // const jsonTexts = [await jsonFiles[0].async('text'), await jsonFiles[1].async('text')];
                    // const parsedDatas = [JSON.parse(jsonTexts[0]), JSON.parse(jsonTexts[1])];
                    const parsedDatas = [JSON.parse(forwardText), JSON.parse(minimizationText)];
                    
                    // setJsonData(parsedDatas[0]);  // Update jsonData with new parsed data
                    // setInputValues(parsedDatas);  // Set new input values for the form
    
                    // Reset initialTypes so that it updates based on the new input values
                    const newInitialTypes = [replaceValuesWithTypes(parsedDatas[0]), replaceValuesWithTypes(parsedDatas[1])];
                    // setInitialTypes(newInitialTypes);  // Set types based on the new file

                    setSelectedModels((prev) => ({
                        forward:
                        {
                            // name: newForwardModels[0],
                            name: initialForwardModel,
                            jsonData: parsedDatas[0],
                            initialTypes: newInitialTypes[0]
                        },
                        minimization:
                        {
                            // name: newMinimizationModels[0],
                            name: initialMinimizationModel,
                            jsonData: parsedDatas[1],
                            initialTypes: newInitialTypes[1]
                        }
                    }));

                    setIsZipProcessed(true);  // Indicate that ZIP processing is complete
    
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

    // Initialize initialTypes when inputValues is populated
    // useEffect(() => {
    //     // Only set initialTypes if it's empty, to avoid overwriting it
    //     if (Object.keys(initialTypes).length === 0 && Object.keys(inputValues).length > 0) {
    //         setInitialTypes(replaceValuesWithTypes(inputValues));
    //     }
    // }, [inputValues, initialTypes]);

    async function handleModel(modelType, modelName, option, inputValues=undefined) {
        // console.log("calling bruh with:", modelType, modelName)
        // Find the JSON file inside the ZIP
        // const jsonFile = loadedZip.file(/.*\.json$/)?.[0];
        if (option === "SELECT") {
            const jsonFile = zipContent.file(modelName)
            // console.log("jsonFile:", jsonFile)
    
            if (jsonFile) {
                try {
                    const jsonText = await jsonFile.async('text');
                    const parsedData = JSON.parse(jsonText);

                    // Reset initialTypes so that it updates based on the new input values
                    const newInitialType = replaceValuesWithTypes(parsedData);
    
                    setSelectedModels((prev) => ({
                        ...prev,
                        [modelType]: { // Use square brackets to dynamically set the property name
                            name: modelName, // Adjust these values based on modelType
                            jsonData: parsedData,
                            initialTypes: newInitialType
                        },
                    }));
                    // console.log("after calling setSelectedModels:", selectedModels)
                    // setInitialTypes(newInitialTypes);  // Set types based on the new file
                } catch (error) {
                    console.error('Error reading JSON file:', error);
                }
    
            } else {
                console.error('No JSON file found in the ZIP.');
            }
        } else if (option === "EDIT") {
            setSelectedModels((prev) => ({
                ...prev,
                [modelType]: { // Use square brackets to dynamically set the property name
                    ...prev[modelType],
                    jsonData: inputValues
                },
            }));
        }
    }

    function handleAreOpen(modelType, option) {
        let newState = {
            forwardModelSelector: false,
            forwardEdit: false,
            minimizationModelSelector: false,
            minimizationEdit: false,
        }
        
        const key = option === "SELECT" 
            ? `${modelType}ModelSelector`
            : `${modelType}Edit`;
    
        setAreOpen((prev) => {
            return {
                ...newState,
                [key]: !prev[key]
            }
        });
    }
    
    function handleChangeCaseId(id) {
        setCaseId((prev) => {
            const tmp = [...prev];
            tmp[1] = id;
            return tmp;
        })
    }

    async function caseIdExists() {
        const { success, caseIds, error } = await api.fetchAllCaseIds();

        if (success) {
            return caseIds.includes(caseId[1]);
        } // else
        return null; // Indicate that an error occurred
    }
    
    async function handleConfirmCaseId() {
        if (caseId === '') {
            // no caseId entered
        }

        const caseIdStatus = await caseIdExists();

        if (caseIdStatus === null) {
            // If there was an error fetching the case IDs, do nothing
            console.error('Failed to check if case ID exits.');
            return;
        } else if (caseIdStatus) {
            alert(`There is already a case with ID '${caseId[1]}'. Please enter an new case ID.`);
        } else {
            setCaseId((prev) => {
                const tmp = [...prev];
                tmp[0] = true;
                return tmp;
            });
        
            setRuns((prev) => {
                const tmp = [...prev];
                tmp.push(caseId[1]);
                return tmp;
            });
        }
    }

    function handleProcess(process) {
        setProcesses((prev) => ({
            ...prev,
            [process]: !prev[process]
        }))
    }

    function handleThreads(option) {
        if (option === 'MINUS') {
            setGenericInput((prev) => ({
                ...prev,
                threads: prev.threads - 1
            }))
        } else if (option === 'PLUS') {
            setGenericInput((prev) => ({
                ...prev,
                threads: prev.threads + 1
            }))
        }
    }

    async function handleCalculate() {
        // STEP 1: Stop user from interacting with UI
        setIsCalculating(true);


        // Simulate a calculation or asynchronous operation
        // setTimeout(() => {
        //     setIsCalculating(false);
        //     // Perform further actions here after the calculation is done
        // }, 2000); // Replace with actual calculation duration

        // STEP 2: Update zip with new data
        // update generic input with new models & upload to zip
        genericInput.forward = filter(selectedModels.forward.name);
        genericInput.minimization = filter(selectedModels.minimization.name);

        zipContent.file('input/GenericInput.json', JSON.stringify(genericInput, null, 2));
        
        // upload forward model data
        zipContent.file(selectedModels.forward.name, JSON.stringify(selectedModels.forward.jsonData, null, 2));
        
        // upload minimization model data
        zipContent.file(selectedModels.minimization.name, JSON.stringify(selectedModels.minimization.jsonData, null, 2));

        // STEP 3: POST zip (case) to back-end
        // Generate the updated zip file as a Blob
        const updatedZipBlob = await zipContent.generateAsync({ type: 'blob' });

        // const sanitizedCaseId = caseId.replace(/ /g, '-'); // Replace spaces with hyphens

        const sanitizedCaseId = encodeURIComponent(caseId[1])

        const formData = new FormData();
        formData.append('case', updatedZipBlob, `updated.zip`); // back-end changes file name to caseId

    
        const { success } = await api.uploadCase(sanitizedCaseId, formData);

        if (success) {
            // Handle success response
            onClose();
        } else {
            // Handle fail response
            onClose();
        }

        // STEP 4: Pre-process
        if (processes['Pre-processing']) {
            console.log("Entering pre-process")
            await api.process('generate_dummy_data', sanitizedCaseId);
        }
        
        // STEP 5: Process
        if (processes['Processing']) {
            console.log("Entering process")
            await api.process('train_minimization_model', sanitizedCaseId);
        }
        
        // STEP 6: Post-Process
        if (processes['Post-processing']) {
            console.log("Entering post-process")
            await api.process('post_process', sanitizedCaseId);
        }
        
        // STEP 7: Update global state with:
        // - 

    }

    return (
        // New Run Container
        <>
            {/* Blur background */}
            <div className='fixed right-0 top-0 w-screen h-screen z-20 bg-black bg-opacity-[0.36] backdrop-blur-[2.5px] transition-all duration-500' />
            
            {/* Main container */}
            <div className='absolute w-[604px] mt-[72px] right-[56px]
                bg-white border border-[#D7DFFF] rounded-2xl
                z-30' // Disabled: #B6B7BE
            >
                <div className={`flex items-center justify-between ${caseId[0] ? 'p-[26px]' : 'p-[18px]'}`}>
                    
                    {/* {caseId 
                        ? <H1 heading={caseId} />
                        : 
                        <div className='relative'>
                            <input className='p-2
                                border border-[#D7DFFF] rounded-xl bg-white'
                                type='text' placeholder="Enter run name...">
                            </input>
                            <button className="absolute top-1 right-4
                            bg-[#3561FE] rounded-xl p-1 text-center text-white font-semibold"
                            >
                                Ok
                            </button>
                        </div>
                    } */}

                    {caseId[0] &&
                        <H1 heading={caseId[1]} />
                    }
                    {!caseId[0] &&
                        <div className='flex space-x-1'>
                        <input className='p-2 border border-[#D7DFFF] rounded-xl bg-white'
                            type='text' 
                            placeholder="Enter run name..."
                            onChange={(e) => handleChangeCaseId(e.target.value)}
                        >
                        </input>
                        <button onClick={handleConfirmCaseId}
                            className={`p-2 font-semibold rounded-xl border
                            ${caseId[1] === '' ? 'text-[#b6b7be] border-[#b6b7be] cursor-not-allowed' : 'text-[#3561FE] border-[#3561FE]'}`}
                            disabled={caseId[1] === ''}
                        >
                            Ok
                        </button>
                    </div>
                    }
                    {/* {caseId[0]
                        ? <H1 heading={caseId[1]} />
                        : 
                        <div className='flex space-x-1'>
                            <input className='p-2 border border-[#D7DFFF] rounded-xl bg-white'
                                type='text' 
                                placeholder="Enter run name..."
                                onChange={(e) => handleChangeCaseId(e.target.value)}
                            >
                            </input>
                            <button onClick={handleCaseId}
                                className="p-2 font-semibold text-white bg-[#3561FE] rounded-xl" >
                                Ok
                            </button>
                        </div>
                    } */}
                    {/* <div className="text-black text-lg font-bold font-['General Sans Variable'] leading-loose">Original input</div> */}
                    <button onClick={onClose}
                        className='hover:bg-[#F1F4FF] duration-200 rounded-md'
                    >
                        <img src={closeBig} alt="close-big.png" />
                    </button>
                </div>
                

                {/* <UpperPart heading='New run' styling='p-[26px]'>
                    <button onClick={onClose}
                        className='hover:bg-[#F1F4FF] duration-200 rounded-md'
                    >
                        <img src={closeBig} alt="close-big.png" />
                    </button>
                </UpperPart> */}

                {caseId[0] && 
                    <>
                        <BorderTop />
                        {/* Lower Part Container */}
                        
                        <div className='flex flex-col space-y-6 m-6'>

                            {/* Upper Part Container*/}
                            <div className='flex flex-col space-y-3 p-6
                                bg-[#F1F4FF] rounded-3xl'
                            >
                                <H2 heading="Case folder" />

                                {/* Input field */}
                                <div className='relative'>
                                    {/* className="break-all line-clamp-1" */}
                                    <input 
                                        type='string'
                                        placeholder='Select a folder...'
                                        value={zipFileName}
                                        className={`flex items-center justify-between
                                        w-full h-[48px] pl-4 pr-2
                                        border border-[#D7DFFF] rounded-xl
                                        ${!zipFileName ? 'text-[#b6b7be]' : 'text-black'}`}
                                        readOnly
                                    />
                                    {/* isOpen ? 'border border-[#3561FE] py-[5px] px-[11px]' */}
                                    {/* <button
                                        className="absolute right-2 top-2 py-[6px] px-3 
                                        text-sm font-medium text-[#3561FE] rounded bg-[#F1F4FF]"
                                    >
                                        <p>Select folder</p>
                                    </button> */}
                                    {/* <input className='absolute right-2 top-2 py-[6px] px-3 
                                        text-sm font-medium text-[#3561FE] rounded bg-[#F1F4FF]' 
                                        directory="" webkitdirectory="" type="file" 
                                    /> */}
                                    {/* <input className="[appearance:textfield]" type="file" webkitdirectory mozdirectory directory /> */}
                                    <FileInputWithCustomButton handleZipChange={handleZipChange}/>

                                    {/* <label for="caseFolder">
                                        <div className={`absolute right-2 top-2 cursor-pointer rounded bg-[#F1F4FF]
                                            text-sm font-medium text-[#3561FE] py-[6px] px-3 
                                            peer-open:bg-black`
                                        }
                                            // py-[5px] px-[11px] border border-[#3561FE]
                                        >
                                            <p>Select folder</p>
                                        </div>
                                        <input type="file" id="caseFolder" name="caseFolder" className='peer hidden' />
                                    </label> */}
                                </div>
                                
                                {/* Data */}
                                <div className='flex justify-between pt-1'>
                                    <div className='flex space-x-3'>
                                        <p className="text-[#7F7F7F] text-sm font-normal">Grid size:</p>
                                        {Object.keys(genericInput).length === 0 
                                            ? <p className="text-sm font-normal text-[#7F7F7F]">...</p>
                                            : <p className='text-sm font-normal'>{`${genericInput.ngrid.x} x ${genericInput.ngrid.z}`}</p>
                                        }
                                    </div>
                                    <div className='flex space-x-3'>
                                        <p className="text-[#7F7F7F] text-sm font-normal">Subsurface model:</p>
                                        {Object.keys(genericInput).length === 0 
                                            ? <p className="text-sm font-normal text-[#7F7F7F]">...</p>
                                            : <p className='text-sm font-normal'>{genericInput.fileName}</p>
                                        }
                                        {/* <p className="text-sm font-normal">temple_64_32</p> */}
                                    </div>
                                </div>
                            </div>

                        
                            {/* Middle Part Container*/}
                            {isZipProcessed &&
                                <>
                                    <BorderTop />
                                    <div className='flex flex-col space-y-8'>

                                        {/* Models */}
                                        <div className='flex space-x-4 z-[1]'>
                                            <div className='flex flex-col space-y-3 w-1/2'>
                                                <H2 heading="Forward model"/>
                                                <EditDropdownMenu
                                                    modelType="forward"
                                                    filter={filter}
                                                    isModelSelectorOpen={areOpen.forwardModelSelector}
                                                    isEditOpen={areOpen.forwardEdit}
                                                    handleAreOpen={handleAreOpen}
                                                    handleModel={handleModel}
                                                    selectedModel={selectedModels.forward}
                                                    items={forwardModels}
                                                >
                                                    
                                                    {/* <EditModelData model={selectedItem} jsonData={jsonData} inputValues={inputValues} setInputValues={setInputValues} initialTypes={initialTypes}/> */}
                                                    {/* <EditModels model="forward" modelType="Integral" /> */}
                                                </EditDropdownMenu>
                                            </div>
                                            <div className='flex flex-col space-y-3 w-1/2'>
                                                <H2 heading="Minimization model"/>
                                                {/* handleSelectModel, selectedModel, items, model=undefined, width='' */}
                                                <EditDropdownMenu
                                                    modelType="minimization"
                                                    filter={filter}
                                                    isModelSelectorOpen={areOpen.minimizationModelSelector}
                                                    isEditOpen={areOpen.minimizationEdit}
                                                    handleAreOpen={handleAreOpen}
                                                    handleModel={handleModel}
                                                    selectedModel={selectedModels.minimization}
                                                    items={minimizationModels}
                                                >
                                                {/* <DropdownMenu initialValue="GradientDescent" items={Object.entries(minimizationModelItems)}> */}
                                                {/* {Object.entries(dataObject).map(([key, value]) => (
                                                    <InputModelData title={key} defaultValue={value}/>
                                                ))} */}
                                                    {/* <EditModelData model={selectedItem} jsonData={jsonData} inputValues={inputValues} setInputValues={setInputValues} initialTypes={initialTypes}/> */}
                                                    {/* <EditModels model="minimization" modelType="GradientDescent" /> */}
                                                    {/* {edit && <EditModelData model={selectedItem} jsonData={jsonData} inputValues={inputValues} setInputValues={setInputValues} initialTypes={initialTypes}/>} */}
                                                </EditDropdownMenu>
                                            </div>
                                        </div>

                                        {/* Processing Steps */}
                                        <div className='flex flex-col space-y-3'>
                                            <H2 heading="Processing steps"/>
                                            {/* <ClickableChip title="Pre-processing"/> */}
                                            <div className="flex space-x-3">
                                                <Chip selected={processes["Pre-processing"]} handleProcess={handleProcess} title="Pre-processing" />
                                                <Chip selected={processes["Processing"]} handleProcess={handleProcess} title="Processing" />
                                                <Chip selected={processes["Post-processing"]} handleProcess={handleProcess} title="Post-processing" />
                                                {/* <Chip title="Pre-Processing" clickable={true} />
                                                <Chip title="Processing" clickable={true} />
                                                <Chip title="Post-Processing" clickable={true} /> */}
                                            </div>
                                        </div>

                                        {/* Threads/Cores */}
                                        <div className='flex flex-col space-y-3'>
                                            <H2 heading="Threads / Cores (parallel only)" />

                                            <div className='flex space-x-3'>
                                                <AddSubstract type='substract' handleThreads={() => handleThreads("MINUS")} isDisabled={genericInput.threads === 1} />
                                                <div className='flex items-center justify-center w-12 h-12
                                                    bg-white border border-[#D7DFFF] rounded-xl'
                                                >
                                                    {genericInput.threads}
                                                </div>
                                                <AddSubstract type='add' handleThreads={() => handleThreads("PLUS")} isDisabled={genericInput.threads === 8} />
                                            </div>
                                        </div>
                                    </div>

                                    <BorderTop />

                                    {/* Lower Part */}
                                    <button onClick={handleCalculate}
                                        disabled={isCalculating}
                                        className="py-4 bg-[#3561FE] rounded-xl"
                                    >
                                        <p className="text-center text-white font-semibold">
                                            {isCalculating ? 'Calculating...' : 'Calculate'}
                                        </p>
                                    </button>
                                </>
                            }
                        </div>
                    </>
                }
            </div>
        </>
    )
}