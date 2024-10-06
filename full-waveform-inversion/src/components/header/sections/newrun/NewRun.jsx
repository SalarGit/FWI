import React, { useState, useContext } from 'react';
import JSZip from 'jszip';

import '../../../../index.css';

import { SessionContext } from '../../../../store/session-context.jsx';

import H1 from '../../../custom/headings/H1.jsx';
import H2 from '../../../custom/headings/H2.jsx';
import BorderTop from '../../../custom/borders/BorderTop.jsx';
import Chip from '../../../custom/Chip.jsx';
import AddSubstract from '../../AddSubstract.jsx';
import FileInputWithCustomButton from '../../FileInputWithCustomButton.jsx';
import EditDropdownMenu from '../../../custom/dropdownmenus/editdata/EditDropdownMenu.jsx';
import * as api from '../../../../api/apiService.js'

import closeBig from '../../../../assets/close-big.png';

export default function NewRun({ onClose, encodeSpaces }) {
    const { addRunToSession, updateSessionRun, handleCurrentRun, addProgressingRun, updateProgressingRun, removeProgressingRun } = useContext(SessionContext);

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
    const [processes, setProcesses] = useState({'Pre-processing': true, 'Processing': true, 'Post-processing': true})    

    function filter(name) {
        return name.replace('input/', '').
        replace('FMInput.json', '').
        replace('MinimizationInput.json', '')
    }

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

                const jsonFileNames = loadedZip.file(/.*\.json$/).map(file => file.name);

                const newMinimizationModels = [];
                const newForwardModels = [];
            
                jsonFileNames.forEach(fileName => {
                    if (fileName.endsWith('MinimizationInput.json')) {
                        newMinimizationModels.push(fileName);
                    } else if (fileName.endsWith('FMInput.json')) {
                        newForwardModels.push(fileName);
                    }
                });
            
                setMinimizationModels(newMinimizationModels);
                setForwardModels(newForwardModels);

                const initialForwardModel = `input/${parsedGenericInputData.forward}FMInput.json`
                const initialMinimizationModel = `input/${parsedGenericInputData.minimization}MinimizationInput.json`

                const forwardJson = loadedZip.file(initialForwardModel)
                const minimizationJson = loadedZip.file(initialMinimizationModel)

                if (forwardJson && minimizationJson) {
                    const forwardText = await forwardJson.async('text')
                    const minimizationText = await minimizationJson.async('text')

                    const parsedDatas = [JSON.parse(forwardText), JSON.parse(minimizationText)];
                    
                    const newInitialTypes = [replaceValuesWithTypes(parsedDatas[0]), replaceValuesWithTypes(parsedDatas[1])];

                    setSelectedModels((prev) => ({
                        forward:
                        {
                            name: initialForwardModel,
                            jsonData: parsedDatas[0],
                            initialTypes: newInitialTypes[0]
                        },
                        minimization:
                        {
                            name: initialMinimizationModel,
                            jsonData: parsedDatas[1],
                            initialTypes: newInitialTypes[1]
                        }
                    }));

                    setIsZipProcessed(true);
    
                } else {
                    console.error('No JSON file found in the ZIP.');
                }

                // Reset file input value to allow re-uploading the same file
                event.target.value = '';  // This ensures the onChange event triggers even for the same file (which it doesn't without this reset)

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


    async function handleModel(modelType, modelName, option, inputValues=undefined) {
        if (option === "SELECT") {
            const jsonFile = zipContent.file(modelName)
    
            if (jsonFile) {
                try {
                    const jsonText = await jsonFile.async('text');
                    const parsedData = JSON.parse(jsonText);

                    const newInitialType = replaceValuesWithTypes(parsedData);
    
                    setSelectedModels((prev) => ({
                        ...prev,
                        [modelType]: {
                            name: modelName,
                            jsonData: parsedData,
                            initialTypes: newInitialType
                        },
                    }));
                } catch (error) {
                    console.error('Error reading JSON file:', error);
                }
    
            } else {
                console.error('No JSON file found in the ZIP.');
            }
        } else if (option === "EDIT") {
            setSelectedModels((prev) => ({
                ...prev,
                [modelType]: {
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
    
    function handleChangeCaseId(caseId) {
        const isValid = caseId === '' || /^[A-Za-z0-9 ]+$/.test(caseId);

        if (isValid) {
            setCaseId((prev) => {
                const tmp = [...prev];
                tmp[1] = caseId;
                return tmp;
            })
        }
    }

    async function caseIdExists() {
        const { success, caseIds, error } = await api.fetchAllCaseIds();

        if (success) {
            return caseIds.includes(caseId[1]);
        }
        return null;
    }
    
    async function handleConfirmCaseId() {
        const caseIdStatus = await caseIdExists();

        if (caseIdStatus === null) {
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
        genericInput.forward = filter(selectedModels.forward.name);
        genericInput.minimization = filter(selectedModels.minimization.name);

        zipContent.file('input/GenericInput.json', JSON.stringify(genericInput, null, 2));
        zipContent.file(selectedModels.forward.name, JSON.stringify(selectedModels.forward.jsonData, null, 2));        
        zipContent.file(selectedModels.minimization.name, JSON.stringify(selectedModels.minimization.jsonData, null, 2));

        const updatedZipBlob = await zipContent.generateAsync({ type: 'blob' });

        const formData = new FormData();
        formData.append('case', updatedZipBlob, `updated.zip`); // back-end changes file name to caseId
    
        const { success } = await api.uploadCase(caseId[1], formData);

        onClose();

        async function processChunkedResponse(response, process) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            
            function readChunk() {
                return reader.read().then(appendChunks);
            }
            
            function appendChunks(result) {
                const chunk = decoder
                    .decode(result.value || new Uint8Array(), { stream: !result.done })
                    .trim();
                
                if (result.done) {
                    return;
                }
        
                if (chunk.length > 0) {
                    handleChunk(chunk, process);
                }
        
                return readChunk();
            }
        
            return readChunk();
        }
        
        function handleChunk(chunk, process) {
            if (process === 'Post-processing') {
                updateProgressingRun(caseId[1], process)
            }
            
            const jsonObjects = chunk.match(/(\{.*?\})(?=\{|\s*$)/g);
          
            if (jsonObjects) {
                jsonObjects.forEach((jsonStr) => {
                    try {
                        const parsedChunk = JSON.parse(jsonStr);

                        if (parsedChunk.progress) {
                            const progressInfo = parsedChunk.progress;

                            if (process === 'Pre-processing') {
                                updateProgressingRun(caseId[1], process, parsedChunk.cpu_usage, progressInfo.current_count, progressInfo.total_count)
                            } else if (process === 'Processing') {
                                updateProgressingRun(caseId[1], process, parsedChunk.cpu_usage, progressInfo.current_count, progressInfo.total_count)
                            } 
                        } else if (process === 'Post-processing') {
                            updateProgressingRun(caseId[1], process, parsedChunk.cpu_usage)
                        }
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                    }
                });
            } else {
              console.log("No valid JSON objects found.");
            }
        }
        
        function onChunkedResponseError(err, process) {
            return { error: `Failed to run ${process}: ${err}` };
        }
        
        const process = async (endpoint, caseId, process) => {
            const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

            try {
                const response = await fetch(`/cases/${sanitizedCaseId}/process/${endpoint}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                await processChunkedResponse(response, process);
                return { error: null };
            } catch (err) {
                return onChunkedResponseError(err, process);
            }
        };

        const sessionRun = {
            [caseId[1]]: {
                forwardModel: genericInput.forward,
                minimizationModel: genericInput.minimization,
                forwardData: selectedModels.forward.jsonData,
                minimizationData: selectedModels.minimization.jsonData,
                processingSteps: [
                    processes['Pre-processing'] && 'Pre-processing',
                    processes['Processing'] && 'Processing',
                    processes['Post-processing'] && 'Post-processing',
                ].filter(Boolean),
                threads: genericInput.threads,
                processed: false,
            }
        }

        const progressingRun = {
            [caseId[1]]: {
                progress: 0
            }  
        }

        addRunToSession(sessionRun);
        handleCurrentRun(caseId[1]);
        addProgressingRun(progressingRun)

        if (processes['Pre-processing']) {
            const { error } = await process('generate_dummy_data', caseId[1], 'Pre-processing');
            if (error !== null ) {console.log(`Pre-processing error : ${error}`)};
        }
        if (processes['Processing']) {
            console.log("Entering process")
            const { error } = await process('train_minimization_model', caseId[1], 'Processing');
            if (error !== null ) {console.log(`Processing error : ${error}`)};
        }
        if (processes['Post-processing']) {
            console.log("Entering post-process")
            const { error } =  await process('post_process', caseId[1], 'Post-processing');
            if (error !== null ) {console.log(`Post-processing error : ${error}`)};
        }

        const { successInputChi, input } = await api.fetchInputChiImage(caseId[1]);
        const { successChiEstimate, result } = await api.fetchChiEstimateImage(caseId[1]);
        const { successChiDifference, chiDifference } = await api.fetchChiDifferenceImage(caseId[1]);
        const { successResidual, residual } = await api.fetchResidualImage(caseId[1]);
        const { successMetrics, metrics } = await api.fetchPerformanceMetrics(caseId[1]);
        
        console.log('bruh2')
        if (successInputChi && successChiEstimate && successChiDifference && successResidual && successMetrics) {
            updateSessionRun(caseId[1], input, result, chiDifference, residual, metrics);
        } 
        removeProgressingRun(caseId[1]);
        console.log('bruh3')
    }

    return (
        <>
            <div className='fixed right-0 top-0 w-screen h-screen z-[49] bg-black bg-opacity-[0.36] backdrop-blur-[2.5px] transition-all duration-500' />
            
            <div className='absolute w-[604px] mt-[72px] right-[56px]
                bg-white border border-[#D7DFFF] rounded-2xl
                z-50'
            >
                <div className={`flex items-center justify-between ${caseId[0] ? 'p-[26px]' : 'p-[18px]'}`}>                    
                    {caseId[0] &&
                        <H1 heading={caseId[1]} />
                    }
                    {!caseId[0] &&
                        <div className='flex space-x-1'>
                        <input className='p-2 border border-[#D7DFFF] rounded-xl bg-white'
                            type='text' 
                            placeholder="Enter run name..."
                            value={caseId[1]}
                            onChange={(e) => handleChangeCaseId(e.target.value)}
                        >
                        </input>
                        <button onClick={handleConfirmCaseId}
                            className={`p-2 font-semibold rounded-xl border
                            ${caseId[1] === '' ? 'text-[#b6b7be] border-[#b6b7be] cursor-not-allowed' : 'text-[#3561FE] border-[#3561FE]'}`}
                            disabled={caseId[1] === ''}
                        >
                            Confirm
                        </button>
                    </div>
                    }
                    <button onClick={onClose}
                        className='hover:bg-[#F1F4FF] duration-200 rounded-md'
                    >
                        <img src={closeBig} alt="close-big.png" />
                    </button>
                </div>
                {caseId[0] && 
                    <>
                        <BorderTop />
                        
                        <div className='flex flex-col space-y-6 m-6'>

                            <div className='flex flex-col space-y-3 p-6
                                bg-[#F1F4FF] rounded-3xl'
                            >
                                <H2 heading="Case folder" />

                                <div className='relative'>
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

                                    <FileInputWithCustomButton handleZipChange={handleZipChange}/>
                                </div>
                                
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
                                    </div>
                                </div>
                            </div>

                            {isZipProcessed &&
                                <>
                                    <BorderTop />
                                    <div className='flex flex-col space-y-8'>

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
                                                </EditDropdownMenu>
                                            </div>
                                            <div className='flex flex-col space-y-3 w-1/2'>
                                                <H2 heading="Minimization model"/>
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
                                                </EditDropdownMenu>
                                            </div>
                                        </div>

                                        <div className='flex flex-col space-y-3'>
                                            <H2 heading="Processing steps"/>
                                            <div className="flex space-x-3">
                                                <Chip selected={processes["Pre-processing"]} handleProcess={handleProcess} title="Pre-processing" />
                                                <Chip selected={processes["Processing"]} handleProcess={handleProcess} title="Processing" />
                                                <Chip selected={processes["Post-processing"]} handleProcess={handleProcess} title="Post-processing" />
                                            </div>
                                        </div>

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

                                    <button onClick={handleCalculate}
                                        className="py-4 bg-[#3561FE] rounded-xl"
                                    >
                                        <p className="text-center text-white font-semibold">
                                            Calculate
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