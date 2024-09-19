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

        return { success: true, caseIds: result };
    } catch (error) {
        console.error('Failed to fetch case IDs:', error.message);
        return { success: false };
    }
};

// Post caseId
export const uploadCase = async (caseId, formData) => {
    try {
        // Send the updated zip file to the API
        const response = await fetch(`/cases/${caseId}`, {
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

// Pre-process necessary functions
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
			console.log(JSON.parse(chunk));
		}

		return readChunk();
	}

	return readChunk();
}

function onChunkedResponseError(err) {
	console.error(err);
}

// Pre-process caseId
export const process = async (phase, caseId) => {
    const response = await fetch(`/cases/${caseId}/process/${phase}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    }).then(processChunkedResponse)
    .catch(onChunkedResponseError);
}