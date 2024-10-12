# Full Waveform Inversion

This is a React-based front-end that connects to a C++ back-end using a Node.js API. Below are the steps to set up and run the project locally.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Using a Proxy for Local Development](#using-a-proxy-for-local-development)
- [Unit Testing](#unit-testing)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes bundled with Node.js)

## Setup

1. **Install the dependencies**:
Run the following command to install all the necessary packages:
    `npm install`

2. **Start the Development Server**:
Start the development server with:
    `npm run dev`

## Using a Proxy for Local Development

To avoid CORS[1] restrictions during local development, this project uses a proxy configuration. The proxy redirects API requests to the back-end server, allowing you to bypass CORS issues. The proxy is defined in the `vite.config.js` file, which redirects requests starting with `/cases` to the back-end server running on `http://localhost:3000`. While the default port for the back-end is set to 3000, you can easily adjust the target link in the config file should you need to switch to a different port.

### Footnotes:
1. CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers to prevent malicious websites from making unauthorized requests to a different domain than the one that served the web page.

## Unit Testing
Unit tests are located in the `./src/fwi.test.js` file. You can run all tests by executing the following command in the root directory:
    `npm test`

To add more tests, simply extend the `fwi.test.js` file.