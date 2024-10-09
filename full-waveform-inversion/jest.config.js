export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // or setupTests.ts if using TypeScript
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest", // Transpile both TS/JS and JSX/TSX files
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',  // Add this line for images
    },
  };

