// function encodeSpaces(caseId) {
//     return caseId.replace(/ /g, '__SPACE__');
// }

// function decodeSpaces(encodedString) {
//     return encodedString.replace(/__SPACE__/g, ' ');
// }

function encodeSpaces(caseId) {
    return caseId.replace(/ /g, '-');
}
function decodeSpaces(caseId) {
    return caseId.replace(/-/g, ' ');
}


// Fetch all case IDs
export const fetchAllCaseIds = async () => {
    try {
        const response = await fetch('/cases', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error);
        }
        
        // Decode all case IDs before returning
        const caseIds = result.map(caseId => decodeSpaces(caseId));

        return { success: true, caseIds };
    } catch (error) {
        console.error('Failed to fetch case IDs:', error.message);
        return { success: false };
    }
};

export const fetchHistoryLength = async () => {
    try {
        const response = await fetch('/cases', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error);
        }
        
        // Decode all case IDs before returning
        const historyLength = result.length;

        return { success: true, historyLength };
    } catch (error) {
        console.error('Failed to fetch history length:', error.message);
        return { success: false };
    }
};

// Upload a case folder
export const uploadCase = async (caseId, formData) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        // Send the updated zip file to the API
        const response = await fetch(`/cases/${sanitizedCaseId}`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json', // Expect a JSON response from the server
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error);
        }

        console.log(`Uploaded case '${result.caseId}' successfully.`)

        return { success: true };
    } catch (error) {
        console.error(`Failed to upload case '${caseId}': ${error.message}`)
        
        return { success: false };
    }
};

// Download a case folder as a ZIP file
export const downloadCaseFolder = async (caseId) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/zip', // Expecting a ZIP file response
            },
        });

        if (!response.ok) {
            const result = await response.json(); // Attempt to parse error response
            throw new Error(result.error || `Failed to download case folder for case ID: ${caseId}`);
        }

        // Convert response into a Blob (binary large object) for the ZIP file
        const zipBlob = await response.blob();

        // Create an object URL for the ZIP blob
        const downloadUrl = URL.createObjectURL(zipBlob);

        // This code triggers a download, might come in handy for <HistoryOfRuns>
        // const link = document.createElement('a');
        // link.href = downloadUrl;
        // link.download = `${caseId}.zip`; // Set default file name
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);

        return { successDownload: true, downloadUrl };
    } catch (error) {
        console.error(`Failed to download case folder for case ID '${caseId}':`, error.message);
        return { successDownload: false };
    }
};

// Fetch the input chi image for a given caseId
export const fetchInputChiImage = async (caseId) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}/input/.png`, {
            method: 'GET',
            headers: {
                'Accept': 'image/png', // Expecting a PNG image
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Failed to fetch the input chi image');
        }

        // Convert response into a Blob (binary large object)
        const imageBlob = await response.blob();

        // Create an object URL for the image blob
        const input = URL.createObjectURL(imageBlob);

        return { successInputChi: true, input };
    } catch (error) {
        console.error(`Failed to fetch input chi image for case '${caseId}':`, error.message);
        return { successInputChi: false };
    }
};



// function handleChunk(chunk) {
// // This will match each JSON object in the string
// const jsonObjects = chunk.match(/(\{.*?\})(?=\{|\s*$)/g);

// if (jsonObjects) {
//     if (jsonObjects.length > 1) {
//     console.log(`Found ${jsonObjects.length} chunks.`);
//     }

//     jsonObjects.forEach((jsonStr, index) => {
//     try {
//         // Parse each JSON object and log it
//         const parsedChunk = JSON.parse(jsonStr);
//         console.log(`Chunk ${index + 1}:`, parsedChunk);
//     } catch (error) {
//         console.error("Error parsing JSON:", error);
//     }
//     });
// } else {
//     console.log("No valid JSON objects found.");
// }
// }


// Process necessary functions


function processChunkedResponse(response) {
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
            console.log(handleChunk(chunk));
			// console.log("JSOn.parse(chunk):", JSON.parse(chunk));
		}

		return readChunk();
	}

	return readChunk();
}

function handleChunk(chunk) {
    // This will match each JSON object in the string
    const jsonObjects = chunk.match(/(\{.*?\})(?=\{|\s*$)/g);
  
    if (jsonObjects) {
      jsonObjects.forEach((jsonStr) => {
        try {
          // Parse each JSON object and log it
          const parsedChunk = JSON.parse(jsonStr);
          return(parsedChunk);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });
    } else {
      console.log("No valid JSON objects found.");
    }
}

function onChunkedResponseError(err) {
	console.error(err);
}

export const process = async (endpoint, caseId) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    const response = await fetch(`/cases/${sanitizedCaseId}/process/${endpoint}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    }).then(processChunkedResponse)
    .catch(onChunkedResponseError);
}


// Fetch file for a specific case ID and file name
export const fetchCaseSettings = async (caseId, name) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}/settings/${name}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        const settings = await response.json();

        if (!response.ok) {
            throw new Error(settings.error);
        }

        return { successCaseSettings: true, settings };
    } catch (error) {
        console.error(`Failed to fetch settings for case '${caseId}' with name '${name}':`, error.message);
        return { successCaseSettings: false };
    }
};


// Output API

// Fetch chi_estimate.png for a specific case ID (says chi_estimate.png but gets Result.png)
export const fetchChiEstimateImage = async (caseId) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}/output/chi_estimate.png`, {
            method: 'GET',
            headers: {
                'Accept': 'image/png', // Expecting an image response
            },
        });

        if (!response.ok) {
            // Attempt to parse the error response if not 200 OK
            const result = await response.json();
            throw new Error(result.error || `Failed to fetch result (chi estimate) image for case ${caseId}`);
        }

        // Convert response into a Blob (binary large object, typically for images)
        const imageBlob = await response.blob();

        // Create an object URL for the image to be used in the browser
        const result = URL.createObjectURL(imageBlob);

        return { successChiEstimate: true, result }; // Return the image URL to be used for display
    } catch (error) {
        console.error(`Failed to fetch Result.png (chi estimate) for case '${caseId}': ${error.message}`);
        return { successChiEstimate: false };
    }
};



// Fetch chi_difference.png for a specific case ID
export const fetchChiDifferenceImage = async (caseId) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}/output/chi_difference.png`, {
            method: 'GET',
            headers: {
                'Accept': 'image/png', // Expecting an image response
            },
        });

        if (!response.ok) {
            // Attempt to parse the error response if not 200 OK
            const result = await response.json();
            throw new Error(result.error || `Failed to fetch chi_difference image for case ${caseId}`);
        }

        // Convert response into a Blob (binary large object, typically for images)
        const imageBlob = await response.blob();

        // Create an object URL for the image to be used in the browser
        const chiDifference = URL.createObjectURL(imageBlob);

        return { successChiDifference: true, chiDifference }; // Return the image URL to be used for display
    } catch (error) {
        console.error(`Failed to fetch chi_difference.png for case '${caseId}': ${error.message}`);
        return { successChiDifference: false };
    }
};

// Fetch residual.png for a specific case ID
export const fetchResidualImage = async (caseId) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}/output/residual.png`, {
            method: 'GET',
            headers: {
                'Accept': 'image/png', // Expecting an image response
            },
        });

        if (!response.ok) {
            // Attempt to parse the error response if not 200 OK
            const result = await response.json();
            throw new Error(result.error || `Failed to fetch residual image for case ${caseId}`);
        }

        // Convert response into a Blob (binary large object, typically for images)
        const imageBlob = await response.blob();

        // Create an object URL for the image to be used in the browser
        const residual = URL.createObjectURL(imageBlob);

        return { successResidual: true, residual }; // Return the image URL to be used for display
    } catch (error) {
        console.error(`Failed to fetch residual.png for case '${caseId}': ${error.message}`);
        return { successResidual: false };
    }
};

// Fetch performance metrics for a specific case ID
export const fetchPerformanceMetrics = async (caseId) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}/output/performance`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json', // Expecting a JSON response
            },
        });

        // Parse the JSON response
        const metrics = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `Failed to fetch performance metrics for case ${caseId}`);
        }

        return { successMetrics: true, metrics }; // Return the performance data
    } catch (error) {
        console.error(`Failed to fetch performance metrics for case '${caseId}': ${error.message}`);
        return { successMetrics: false };
    }
};



// Fetch history of runs
export const fetchHistoryOfRuns = async () => {
    // No need to sanitize caseId, this will be done in api calls called below.

    try {
        // fetch all caseIds
        const { success, caseIds } = await fetchAllCaseIds();

        if (!success) {
            // Explicitly throw an error if fetching caseIds fails
            throw new Error("Failed to fetch case IDs");
        }

        const caseDataPromises = caseIds.map(async (caseId) => {
            const { input } = await fetchInputChiImage(caseId);
            const { result } = await fetchChiEstimateImage(caseId);
            const { chiDifference } = await fetchChiDifferenceImage(caseId);
            const { residual } = await fetchResidualImage(caseId);
            const { metrics } = await fetchPerformanceMetrics(caseId);
            const { downloadUrl } = await downloadCaseFolder(caseId);

            // fetch GenericData settingsfile
            const { settings } =  await fetchCaseSettings(caseId, 'GenericInput');
            
            // const { ngrid, forward, minimization, threads } = settings;
            // const { x, z } = ngrid;
            const { ngrid, forward, minimization, threads } = settings ?? {}; // falls back to empty object if settings is undefined or null (a.k.a. when fetchCaseSettings fails)

            // fetch {forward model} settingsfile
            const { settings: forwardData  } = await fetchCaseSettings(caseId, `${forward}FMInput`)
            const { settings: minimizationData  } = await fetchCaseSettings(caseId, `${minimization}MinimizationInput`)

            // forward parameters
            // fetch {minimization model} settingsfile
            // minimization parameters
            

            return { 
                caseId, 
                data: { forward, minimization, forwardData, minimizationData, threads, ngrid, input, result, chiDifference, residual, metrics, downloadUrl, caseFolder: '/' + encodeSpaces(caseId) } // result is not used in current design. Can use if I have enough time.
            };
        });
        
        const caseDataArray = await Promise.all(caseDataPromises);
        
        // Convert array of case data into the history object
        let history = {};
        caseDataArray.forEach(({ caseId, data }) => {
            history[caseId] = data;
        });

        // let caseDataPromises;

        // caseDataPromises = caseIds.map(async (caseId) => {
        //     const { input } = await fetchInputChiImage(caseId);
        //     const { result } = await fetchChiEstimateImage(caseId);
        //     const { chiDifference } = await fetchChiDifferenceImage(caseId);
        //     const { residual } = await fetchResidualImage(caseId);
        //     const { metrics } = await fetchPerformanceMetrics(caseId);
        //     const { downloadUrl } = await downloadCaseFolder(caseId)

        //     history = {
        //         ...history,
        //         [caseId]: {input, result, chiDifference, residual, metrics, downloadUrl}
        //     };
        // });
        
        // Wait for all promises to resolve
        // await Promise.all(caseDataPromises);

        console.log("All data fetched successfully:", history);
        return {successHistory: true, history};

    } catch (error) {
        console.error(`Failed to fetch history of runs:`, error.message);
        return { successHistory: false};
    }
};