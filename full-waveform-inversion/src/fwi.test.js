// import React from 'react'; // Keep this import for JSX support
// import { render, screen, fireEvent } from '@testing-library/react';
// import App from './App'; // Ensure App is properly exported


// test('renders Full Waveform Inversion title', () => {
//     render(<App />);
//     const linkElement = screen.getByText(/full waveform inversion/i);
//     expect(linkElement).toBeInTheDocument();
// });

// describe('App Component', () => {
//     test('should toggle the new run modal when clicking the run button', () => {
//         render(<App />);
        
//         // Verify the new run modal is not displayed initially
//         expect(screen.queryByText(/new run/i)).toBeNull();
        
//         // Click the button to open the new run modal
//         const runButton = screen.getByText(/run/i);
//         fireEvent.click(runButton);
        
//         // Now the new run modal should be displayed
//         expect(screen.getByText(/new run/i)).toBeInTheDocument();
//     });

//     test('should toggle the history of runs when clicking the history button', () => {
//         render(<App />);
        
//         // Verify the history of runs is not displayed initially
//         expect(screen.queryByText(/history of runs/i)).toBeNull();
        
//         // Click the button to open the history of runs
//         const historyButton = screen.getByText(/history/i);
//         fireEvent.click(historyButton);
        
//         // Now the history of runs should be displayed
//         expect(screen.getByText(/history of runs/i)).toBeInTheDocument();
//     });

//     test('should allow the user to select an input image', () => {
//         render(<App />);
        
//         // Mock an input file selection process
//         const inputFile = screen.getByLabelText(/input image/i);
//         fireEvent.change(inputFile, { target: { files: [new File(['dummy content'], 'test-image.png', { type: 'image/png' })] } });
        
//         // Check that the selected image file is correctly reflected
//         expect(inputFile.files[0].name).toBe('test-image.png');
//     });
// });

import React, { act } from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import App from './App.jsx';
import Header from './components/header/Header.jsx';
import * as apiService from './api/apiService.js';

jest.mock('./api/apiService.js');

// Mock the required props for the tests
const mockHistoryLengthZero = 0;
const mockHistoryLengthTwo = 2;


describe('load App', () => {
    beforeEach(() => {
        // Mock the fetchHistoryLength function
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
        render(<Header historyLength={mockHistoryLengthZero} />);
        
        // Check if the 'History of Runs' button is disabled
        const historyButton = screen.getByText(/history of runs/i);
        expect(historyButton).toBeDisabled();
    });
    test('should disable the History of Runs button when historyLength is 0', () => {
        render(<Header historyLength={mockHistoryLengthTwo} />);
        
        // Check if the 'History of Runs' button is disabled
        const historyButton = screen.getByText(/history of runs/i);
        expect(historyButton).toHaveAttribute('disabled', '');
    });

    test('should display HistoryOfRuns component when the History of Runs button is clicked', async () => {
        // Mock the API call for this test only
        apiService.fetchHistoryLength.mockResolvedValue({ success: true, historyLength: 5 });
        apiService.fetchHistoryOfRuns.mockResolvedValue({ successHistory: true, history: {} });

        await act(async () => {
            render(<App />);
        });
        
        await waitFor(() => {
            const historyButton = screen.getByText(/history of runs/i);
            expect(historyButton).toBeInTheDocument();
        });

        const historyButton = screen.getByText(/history of runs/i);
        fireEvent.click(historyButton);
        
        await waitFor(() => {
            expect(screen.getByText(/download/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    });
})

describe('Header Component', () => {

    


    // test('should display NewRun component when the Add New Run button is clicked', () => {
    //     render(<App />);
        
    //     // Click the 'Add New Run' button
    //     const newRunButton = screen.getByText(/add new run/i);
    //     fireEvent.click(newRunButton);
        
    //     // Verify that the input field for entering the run name appears
    //     expect(screen.getByPlaceholderText(/enter run name.../i)).toBeInTheDocument();
    // });

    // test('should enable the Confirm button when text is entered into the input field', () => {
    //     render(<App />);
        
    //     // Click the 'Add New Run' button to show the input field
    //     const newRunButton = screen.getByText(/add new run/i);
    //     fireEvent.click(newRunButton);
        
    //     // Check that the confirm button is initially disabled
    //     const confirmButton = screen.getByText(/confirm/i);
    //     expect(confirmButton).toBeDisabled();
        
    //     // Enter text in the input field
    //     const inputField = screen.getByPlaceholderText(/enter run name.../i);
    //     fireEvent.change(inputField, { target: { value: 'New Run' } });
        
    //     // Now the confirm button should be enabled
    //     expect(confirmButton).toBeEnabled();
    // });
});