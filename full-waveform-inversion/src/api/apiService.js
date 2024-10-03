import JSZip from 'jszip';

function encodeSpaces(caseId) {
    return caseId.replace(/ /g, '-');
}
function decodeSpaces(caseId) {
    return caseId.replace(/-/g, ' ');
}

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
        
        const historyLength = result.length;

        return { success: true, historyLength };
    } catch (error) {
        console.error('Failed to fetch history length:', error.message);
        return { success: false };
    }
};

export const uploadCase = async (caseId, formData) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
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

export const downloadCaseFolder = async (caseId) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/zip',
            },
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || `Failed to download case folder for case ID: ${caseId}`);
        }

        const zipBlob = await response.blob();

        return { successDownload: true, zipBlob };
    } catch (error) {
        console.error(`Failed to download case folder for case ID '${caseId}':`, error.message);
        return { successDownload: false };
    }
};

export const downloadCaseFolders = async (caseIds) => {
    try {
        if (caseIds.length === 1) {
            const { successDownload, zipBlob } = await downloadCaseFolder(caseIds[0]);
            if (successDownload) {
                const downloadUrl = URL.createObjectURL(zipBlob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `${encodeSpaces(caseIds[0])}.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(downloadUrl);
            }
            return;
        }
        
        const zip = new JSZip();
        const zipPromises = caseIds.map(async (caseId) => {
            const { successDownload, zipBlob } = await downloadCaseFolder(caseId);
            if (successDownload) {
                const zipFileName = `${encodeSpaces(caseId)}.zip`;
                zip.file(zipFileName, zipBlob);
            }
        });

        await Promise.all(zipPromises);

        const parentZipBlob = await zip.generateAsync({ type: 'blob' });

        const downloadUrl = URL.createObjectURL(parentZipBlob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'case_folders.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        // Maybe display browser alert?
        console.error(`Failed to download case folders: ${error.message}`);
    }
};

export const fetchInputChiImage = async (caseId) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}/input/.png`, {
            method: 'GET',
            headers: {
                'Accept': 'image/png',
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Failed to fetch the input chi image');
        }

        const imageBlob = await response.blob();

        const input = URL.createObjectURL(imageBlob);

        return { successInputChi: true, input };
    } catch (error) {
        console.error(`Failed to fetch input chi image for case '${caseId}':`, error.message);
        return { successInputChi: false };
    }
};

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

// Says chi_estimate.png but gets Result.png
export const fetchChiEstimateImage = async (caseId) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}/output/chi_estimate.png`, {
            method: 'GET',
            headers: {
                'Accept': 'image/png',
            },
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || `Failed to fetch result (chi estimate) image for case ${caseId}`);
        }

        const imageBlob = await response.blob();

        const result = URL.createObjectURL(imageBlob);

        return { successChiEstimate: true, result };
    } catch (error) {
        console.error(`Failed to fetch Result.png (chi estimate) for case '${caseId}': ${error.message}`);
        return { successChiEstimate: false };
    }
};

export const fetchChiDifferenceImage = async (caseId) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}/output/chi_difference.png`, {
            method: 'GET',
            headers: {
                'Accept': 'image/png',
            },
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || `Failed to fetch chi_difference image for case ${caseId}`);
        }

        const imageBlob = await response.blob();

        const chiDifference = URL.createObjectURL(imageBlob);

        return { successChiDifference: true, chiDifference };
    } catch (error) {
        console.error(`Failed to fetch chi_difference.png for case '${caseId}': ${error.message}`);
        return { successChiDifference: false };
    }
};

export const fetchResidualImage = async (caseId) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}/output/residual.png`, {
            method: 'GET',
            headers: {
                'Accept': 'image/png',
            },
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || `Failed to fetch residual image for case ${caseId}`);
        }

        const imageBlob = await response.blob();

        const residual = URL.createObjectURL(imageBlob);

        return { successResidual: true, residual };
    } catch (error) {
        console.error(`Failed to fetch residual.png for case '${caseId}': ${error.message}`);
        return { successResidual: false };
    }
};

export const fetchPerformanceMetrics = async (caseId) => {
    const sanitizedCaseId = encodeURIComponent(encodeSpaces(caseId));

    try {
        const response = await fetch(`/cases/${sanitizedCaseId}/output/performance`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json', // Expecting a JSON response
            },
        });

        const metrics = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `Failed to fetch performance metrics for case ${caseId}`);
        }

        return { successMetrics: true, metrics };
    } catch (error) {
        console.error(`Failed to fetch performance metrics for case '${caseId}': ${error.message}`);
        return { successMetrics: false };
    }
};

export const fetchHistoryOfRuns = async () => {
    try {
        const { success, caseIds } = await fetchAllCaseIds();

        if (!success) {
            throw new Error("Failed to fetch case IDs");
        }

        const caseDataPromises = caseIds.map(async (caseId) => {
            const { input } = await fetchInputChiImage(caseId);
            const { result } = await fetchChiEstimateImage(caseId);
            const { chiDifference } = await fetchChiDifferenceImage(caseId); // residual field
            const { residual } = await fetchResidualImage(caseId);
            const { metrics } = await fetchPerformanceMetrics(caseId);
            const { settings } =  await fetchCaseSettings(caseId, 'GenericInput');
            
            const { ngrid, forward, minimization, threads } = settings ?? {};

            const { settings: forwardData  } = await fetchCaseSettings(caseId, `${forward}FMInput`)
            const { settings: minimizationData  } = await fetchCaseSettings(caseId, `${minimization}MinimizationInput`)

            return { 
                caseId, 
                data: { forward, minimization, forwardData, minimizationData, threads, ngrid, input, result, chiDifference, residual, metrics, caseFolder: '/' + encodeSpaces(caseId) } // result is not used
            };
        });
        
        const caseDataArray = await Promise.all(caseDataPromises);
        
        let history = {};
        caseDataArray.forEach(({ caseId, data }) => {
            history[caseId] = data;
        });

        console.log("All data fetched successfully:", history);
        return {successHistory: true, history};

    } catch (error) {
        console.error(`Failed to fetch history of runs:`, error.message);
        return { successHistory: false};
    }
};