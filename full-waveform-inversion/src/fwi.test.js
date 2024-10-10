import React, { act } from 'react';
import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import App from './App.jsx';
import Header from './components/header/Header.jsx';
import * as apiService from './api/apiService.js';
import NewRun from './components/header/sections/newrun/NewRun.jsx';
import { SessionContext } from './store/session-context.jsx';
import JSZip from 'jszip';
import Output from './components/IO/Output.jsx';
import Settings from './components/settings/Settings.jsx';
import HistoryOfRuns from './components/header/sections/historyofruns/HistoryOfRuns.jsx';
import ProgressModal from './components/custom/progressmodal/ProgressModal.jsx';
import RunTab from './components/runtab/RunTab.jsx';

// Automatically clear mocks before each test
jest.mock('./api/apiService.js');
jest.mock('jszip', () => {
    return jest.fn().mockImplementation(() => ({
        loadAsync: jest.fn().mockResolvedValue({
            file: jest.fn(() => ({
                async: jest.fn().mockResolvedValue(JSON.stringify({
                    ngrid: { x: 10, z: 10 },
                    forward: 'ForwardModel',
                    minimization: 'MinimizationModel'
                }))
            })),
        })
    }));
});

// Global setup for all tests
afterEach(() => {
    jest.clearAllMocks();
    cleanup();  // Clean up the DOM after each test
});

describe('Header buttons visibility', () => {
    test('should render "History of Runs" and "Add New Run" buttons', () => {
        render(<Header historyLength={2} />);
        expect(screen.getByText(/history of runs/i)).toBeInTheDocument();
        expect(screen.getByText(/add new run/i)).toBeInTheDocument();
    });

    test('should disable "History of Runs" button when historyLength is 0', () => {
        render(<Header historyLength={0} />);
        expect(screen.getByText(/history of runs/i)).toBeDisabled();
    });
});

describe('load App', () => {
    beforeEach(() => {
        apiService.fetchHistoryLength.mockResolvedValue({ success: true, historyLength: 5 });
    });

    test.each([
      /full waveform inversion/i,
      /settings/i,
      /original input/i,
      /calculated output/i
    ])('should display "%s" in the document', async (text) => {
        await act(async () => {
            render(<App />);
        });

        await waitFor(() => {
            expect(screen.getByText(text)).toBeInTheDocument();
        }, { timeout: 3000 });
    });
});

describe('history of runs', () => {
    test('should disable the "History of runs" button when historyLength is 0', () => {
        render(<Header historyLength={0} />);
        expect(screen.getByText(/history of runs/i)).toBeDisabled();
    });

    test('should display HistoryOfRuns component when the History of Runs button is clicked', async () => {
        apiService.fetchHistoryLength.mockResolvedValue({ success: true, historyLength: 5 });
        apiService.fetchHistoryOfRuns.mockResolvedValue({ successHistory: true, history: {} });

        await act(async () => {
            render(<App />);
        });

        const historyButton = screen.getByText(/history of runs/i);
        fireEvent.click(historyButton);

        await waitFor(() => {
            expect(screen.getByText(/download/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    test('should enable output buttons when a run is selected', async () => {
        const mockContextValue = {
            historyOfRuns: {
                'Run 1': {
                    ngrid: { x: 100, z: 100 },
                    forward: 'ForwardModel1',
                    minimization: 'MinimizationModel1',
                    threads: 4,
                    caseFolder: 'Folder1'
                }
            },
            updateHistoryOfRuns: jest.fn()
        };

        render(
            <SessionContext.Provider value={mockContextValue}>
                <HistoryOfRuns onClose={jest.fn()} />
            </SessionContext.Provider>
        );

        const checkboxes = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxes[0]);

        const residualFieldButton = screen.getByText(/Residual field/i);
        expect(residualFieldButton).not.toBeDisabled();
    });
});

describe('add new run', () => {
    beforeEach(() => {
        apiService.fetchHistoryLength.mockResolvedValue({ success: true, historyLength: 5 });
    });

    test('should display NewRun component when the Add New Run button is clicked', async () => {
        await act(async () => {
            render(<App />);
        });

        const newRunButton = screen.getByText(/add new run/i);
        fireEvent.click(newRunButton);

        expect(screen.getByPlaceholderText(/enter run name.../i)).toBeInTheDocument();
    });

    test('should enable the Confirm button when text is entered into the input field', () => {
        render(<NewRun />);
        const inputField = screen.getByPlaceholderText(/enter run name.../i);
        fireEvent.change(inputField, { target: { value: 'New Run' } });

        const confirmButton = screen.getByText(/confirm/i);
        expect(confirmButton).not.toBeDisabled();
    });

    beforeEach(() => {
        // Mock the fetchAllCaseIds API call
        apiService.fetchAllCaseIds.mockResolvedValue({
            success: true,
            caseIds: ['ExistingRun1', 'ExistingRun2'] // Add mock case IDs
        });
    });

    test('should show a select zip file input after user enters a run name and click confirm', async () => {
        render(<NewRun />);

        // Simulate user typing in the input field
        const inputField = screen.getByPlaceholderText(/enter run name.../i);
        fireEvent.change(inputField, { target: { value: 'New Run' } });

        // Check that the Confirm button is enabled after typing the run name
        const confirmButton = screen.getByText(/confirm/i);
        expect(confirmButton).not.toBeDisabled();

        // Simulate clicking the Confirm button
        fireEvent.click(confirmButton);

        // Wait for the API call to resolve
        await waitFor(() => {
            expect(apiService.fetchAllCaseIds).toHaveBeenCalled();
        });

        // Now the Select folder button should be visible
        // let fileInput;
        // let file;
        await waitFor(() => {
            expect(screen.getByText(/select folder/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    });
});

describe('calculated output', () => {
    test('should switch output type when new output type has been selected', async () => {
        await act(async () => {
            render(<App />);
        });

        const outputValuesButton = screen.getByText(/output values/i);
        fireEvent.click(outputValuesButton);

        const residualFieldOption = screen.getByText(/residual field/i);
        fireEvent.click(residualFieldOption);

        expect(screen.getByText(/residual field/i)).toBeInTheDocument();
    });
});
