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

// Post caseId
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


// Fetch settings for a specific case ID and settings name
export const fetchCaseSettings = async (caseId, name) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}/settings/${name}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error);
        }

        return { success: true, settings, forward: result.forward, minimization: result.minimization, threads: result.threads };
    } catch (error) {
        console.error(`Failed to fetch settings for case '${caseId}' with name '${name}':`, error.message);
        return { success: false };
    }
};
