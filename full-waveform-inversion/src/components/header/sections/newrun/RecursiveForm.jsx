// 1. groups recursive but no grid
// import React, { useState } from 'react';

// export default function RecursiveForm() {
//   const [jsonData, setJsonData] = useState({
//     tolerance: 0.000001,
//     maxIterations: 50,
//     wavefieldCalculationPeriod: 1,
//     stepAmplification: {
//       method: "DeltaAmplification",
//       fixedAmplification: 50,
//       deltaAmplificationStart: 100,
//       deltaAmplificationSlope: 1,
//       PMLWidthFactor: {
//         x: 0,
//         z: 0
//     },
//     }
//   });

//   const [inputValues, setInputValues] = useState(jsonData);

//   // Recursive function to render inputs for both simple key-value pairs and nested objects
//   const renderInputFields = (data, parentKey = '') => {
//     return Object.keys(data).map((key) => {
//       const value = data[key];
//       const fullKey = parentKey ? `${parentKey}.${key}` : key;  // To keep track of nested keys

//       if (typeof value === 'object' && !Array.isArray(value)) {
//         // If the value is an object, display a header and recurse into it
//         return (
//           <div key={fullKey} className="mt-4 p-4 border border-gray-200 rounded-md">
//             <h3 className="text-md font-bold mb-2">{key}</h3>
//             <div className="pl-4">{renderInputFields(value, fullKey)}</div>
//           </div>
//         );
//       } else {
//         // Render input for primitive values
//         return (
//           <div key={fullKey} className="mt-2">
//             <label className="block text-sm font-medium text-gray-700">
//               {/* {key} */}
//               {key}
//             </label>
//             <input
//               type={typeof value === 'number' ? 'number' : 'text'}
//               value={inputValues[fullKey] ?? value}
//               onChange={(e) => handleInputChange(fullKey, e.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//         );
//       }
//     });
//   };

//   // Helper function to update state for nested keys
//   const handleInputChange = (key, value) => {
//     setInputValues((prevState) => {
//       const updatedState = { ...prevState };
//       const keys = key.split('.');
//       let obj = updatedState;

//       // Traverse the object and update the nested value
//       for (let i = 0; i < keys.length - 1; i++) {
//         obj = obj[keys[i]];
//       }
//       obj[keys[keys.length - 1]] = value;

//       return updatedState;
//     });
//   };

//   // Utility function to format camelCase to readable text
// //   const formatCamelCase = (str) => {
// //     const result = str.replace(/([A-Z])/g, ' $1').toLowerCase();
// //     return result.charAt(0).toUpperCase() + result.slice(1);
// //   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Dynamic Form</h2>
//       <form className="mt-4">
//         {renderInputFields(jsonData)}
//       </form>
//       <pre className="mt-4 p-4 bg-gray-100 rounded-md">
//         {JSON.stringify(inputValues, null, 2)}
//       </pre>
//     </div>
//   );
// }


// 2. grids but a group is a small col with cols
// import React, { useState } from 'react';

// export default function RecursiveForm() {
//   const [jsonData, setJsonData] = useState({
//     tolerance: 0.000001,
//     maxIterations: 50,
//     wavefieldCalculationPeriod: 1,
//     stepAmplification: {
//       method: "DeltaAmplification",
//       fixedAmplification: 50,
//       deltaAmplificationStart: 100,
//       deltaAmplificationSlope: 1
//     }
//   });

//   const [inputValues, setInputValues] = useState(jsonData);

//   // Recursive function to render inputs for both simple key-value pairs and nested objects
//   const renderInputFields = (data, parentKey = '') => {
//     return (
//       <div className="grid grid-cols-2 gap-4"> {/* Grid layout with 2 columns */}
//         {Object.keys(data).map((key) => {
//           const value = data[key];
//           const fullKey = parentKey ? `${parentKey}.${key}` : key;

//           if (typeof value === 'object' && !Array.isArray(value)) {
//             // If the value is an object, display a header and recurse into it
//             return (
//               <div key={fullKey} className="col-span-2"> {/* Group Header takes full width */}
//                 <h3 className="text-md font-bold mb-2">{key}</h3>
//                 <div className="grid grid-cols-2 gap-4">{renderInputFields(value, fullKey)}</div> {/* Nested grid for grouped inputs */}
//               </div>
//             );
//           } else {
//             // Render input for primitive values
//             return (
//               <div key={fullKey} className="mt-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   {key}
//                 </label>
//                 <input
//                   type={typeof value === 'number' ? 'number' : 'text'}
//                   value={inputValues[fullKey] ?? value}
//                   onChange={(e) => handleInputChange(fullKey, e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             );
//           }
//         })}
//       </div>
//     );
//   };

//   // Helper function to update state for nested keys
//   const handleInputChange = (key, value) => {
//     setInputValues((prevState) => {
//       const updatedState = { ...prevState };
//       const keys = key.split('.');
//       let obj = updatedState;

//       // Traverse the object and update the nested value
//       for (let i = 0; i < keys.length - 1; i++) {
//         obj = obj[keys[i]];
//       }
//       obj[keys[keys.length - 1]] = value;

//       return updatedState;
//     });
//   };

//   // Utility function to format camelCase to readable text
//   const formatCamelCase = (str) => {
//     const result = str.replace(/([A-Z])/g, ' $1').toLowerCase();
//     return result.charAt(0).toUpperCase() + result.slice(1);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Dynamic Form</h2>
//       <form className="mt-4">
//         {renderInputFields(jsonData)}
//       </form>
//       <pre className="mt-4 p-4 bg-gray-100 rounded-md">
//         {JSON.stringify(inputValues, null, 2)}
//       </pre>
//     </div>
//   );
// }



// 3 grid but wrong spaces
// import React, { useState } from 'react';

// export default function RecursiveForm() {
//   const [jsonData, setJsonData] = useState({
//     tolerance: 0.000001,
//     maxIterations: 50,
//     wavefieldCalculationPeriod: 1,
//     stepAmplification: {
//       method: "DeltaAmplification",
//       fixedAmplification: 50,
//       deltaAmplificationStart: 100,
//       deltaAmplificationSlope: 1
//     }
//   });

//   const [inputValues, setInputValues] = useState(jsonData);

//   // Recursive function to render inputs for both simple key-value pairs and nested objects
//   const renderInputFields = (data, parentKey = '') => {
//     return (
//       <>
//         {Object.keys(data).map((key) => {
//           const value = data[key];
//           const fullKey = parentKey ? `${parentKey}.${key}` : key;

//           if (typeof value === 'object' && !Array.isArray(value)) {
//             // If the value is an object, display a header for the group and recurse into it
//             return (
//               <React.Fragment key={fullKey}>
//                 <div className="col-span-2"> {/* Header for the group */}
//                   <h3 className="text-md font-bold mb-2">{key}</h3>
//                 </div>
//                 {renderInputFields(value, fullKey)} {/* Render the group items */}
//               </React.Fragment>
//             );
//           } else {
//             // Render input for primitive values
//             return (
//               <div key={fullKey} className="mt-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   {key}
//                 </label>
//                 <input
//                   type={typeof value === 'number' ? 'number' : 'text'}
//                   value={inputValues[fullKey] ?? value}
//                   onChange={(e) => handleInputChange(fullKey, e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             );
//           }
//         })}
//       </>
//     );
//   };

//   // Helper function to update state for nested keys
//   const handleInputChange = (key, value) => {
//     setInputValues((prevState) => {
//       const updatedState = { ...prevState };
//       const keys = key.split('.');
//       let obj = updatedState;

//       // Traverse the object and update the nested value
//       for (let i = 0; i < keys.length - 1; i++) {
//         obj = obj[keys[i]];
//       }
//       obj[keys[keys.length - 1]] = value;

//       return updatedState;
//     });
//   };

//   // Utility function to format camelCase to readable text
//   const formatCamelCase = (str) => {
//     const result = str.replace(/([A-Z])/g, ' $1').toLowerCase();
//     return result.charAt(0).toUpperCase() + result.slice(1);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Dynamic Form</h2>
//       <form className="mt-4 grid grid-cols-2 gap-4"> {/* Main grid for inputs */}
//         {renderInputFields(jsonData)}
//       </form>
//       <pre className="mt-4 p-4 bg-gray-100 rounded-md">
//         {JSON.stringify(inputValues, null, 2)}
//       </pre>
//     </div>
//   );
// }


// 4 still bad margins
// import React, { useState } from 'react';

// export default function RecursiveForm() {
//   const [jsonData, setJsonData] = useState({
//     tolerance: 0.000001,
//     maxIterations: 50,
//     wavefieldCalculationPeriod: 1,
//     stepAmplification: {
//       method: "DeltaAmplification",
//       fixedAmplification: 50,
//       deltaAmplificationStart: 100,
//       deltaAmplificationSlope: 1
//     }
//   });

//   const [inputValues, setInputValues] = useState(jsonData);

//   // Recursive function to render inputs for both simple key-value pairs and nested objects
//   const renderInputFields = (data, parentKey = '') => {
//     return (
//       <>
//         {Object.keys(data).map((key) => {
//           const value = data[key];
//           const fullKey = parentKey ? `${parentKey}.${key}` : key;

//           if (typeof value === 'object' && !Array.isArray(value)) {
//             // If the value is an object, display a header for the group and recurse into it
//             return (
//               <React.Fragment key={fullKey}>
//                 <div className="col-span-2 mt-4"> {/* Header for the group */}
//                   <h3 className="text-md font-bold mb-4">{key}</h3>
//                 </div>
//                 {renderInputFields(value, fullKey)} {/* Render the group items */}
//               </React.Fragment>
//             );
//           } else {
//             // Render input for primitive values
//             return (
//               <div key={fullKey} className="mt-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   {key}
//                 </label>
//                 <input
//                   type={typeof value === 'number' ? 'number' : 'text'}
//                   value={inputValues[fullKey] ?? value}
//                   onChange={(e) => handleInputChange(fullKey, e.target.value)}
//                   className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             );
//           }
//         })}
//       </>
//     );
//   };

//   // Helper function to update state for nested keys
//   const handleInputChange = (key, value) => {
//     setInputValues((prevState) => {
//       const updatedState = { ...prevState };
//       const keys = key.split('.');
//       let obj = updatedState;

//       // Traverse the object and update the nested value
//       for (let i = 0; i < keys.length - 1; i++) {
//         obj = obj[keys[i]];
//       }
//       obj[keys[keys.length - 1]] = value;

//       return updatedState;
//     });
//   };

//   // Utility function to format camelCase to readable text
//   const formatCamelCase = (str) => {
//     const result = str.replace(/([A-Z])/g, ' $1').toLowerCase();
//     return result.charAt(0).toUpperCase() + result.slice(1);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Dynamic Form</h2>
//       <form className="mt-4 grid grid-cols-2 gap-4"> {/* Main grid for inputs */}
//         {renderInputFields(jsonData)}
//       </form>
//       <pre className="mt-4 p-4 bg-gray-100 rounded-md">
//         {JSON.stringify(inputValues, null, 2)}
//       </pre>
//     </div>
//   );
// }


// 5 fixed margins, but number/string doesnt work
// import React, { useState } from 'react';

// export default function RecursiveForm() {
//   const [jsonData, setJsonData] = useState({
//     tolerance: 0.000001,
//     maxIterations: 50,
//     wavefieldCalculationPeriod: 1,
//     stepAmplification: {
//       method: "DeltaAmplification",
//       fixedAmplification: 50,
//       deltaAmplificationStart: 100,
//       deltaAmplificationSlope: 1,
//       PMLWidthFactor: {
//         x: 0,
//         z: 0
//     },
//     }
//   });

//   const [inputValues, setInputValues] = useState(jsonData);

//   // Recursive function to render inputs for both simple key-value pairs and nested objects
//   const renderInputFields = (data, parentKey = '') => {
//     return (
//       <>
//         {Object.keys(data).map((key) => {
//           const value = data[key];
//           const fullKey = parentKey ? `${parentKey}.${key}` : key;

//           if (typeof value === 'object' && !Array.isArray(value)) {
//             // If the value is an object, display a header for the group and recurse into it
//             return (
//               <React.Fragment key={fullKey}>
//                 <div className="col-span-2">
//                   <h3 className="text-md font-bold">{key}</h3>
//                 </div>
//                 {renderInputFields(value, fullKey)} {/* Render the group items */}
//               </React.Fragment>
//             );
//           } else {
//             // Render input for primitive values
//             return (
//               <div key={fullKey} className="flex flex-col space-y-3">
//                 <label className="text-sm font-medium text-gray-700">
//                   {key}
//                 </label>
//                 <input
//                   type={typeof value === 'number' ? 'number' : 'text'}
//                   value={inputValues[fullKey] ?? value}
//                   onChange={(e) => handleInputChange(fullKey, e.target.value)}
//                   className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             );
//           }
//         })}
//       </>
//     );
//   };

//   // Helper function to update state for nested keys
//   const handleInputChange = (key, value) => {
//     setInputValues((prevState) => {
//       const updatedState = { ...prevState };
//       const keys = key.split('.');
//       let obj = updatedState;

//       // Traverse the object and update the nested value
//       for (let i = 0; i < keys.length - 1; i++) {
//         obj = obj[keys[i]];
//       }
//       obj[keys[keys.length - 1]] = value;

//       return updatedState;
//     });
//   };

//   // Utility function to format camelCase to readable text
//   const formatCamelCase = (str) => {
//     const result = str.replace(/([A-Z])/g, ' $1').toLowerCase();
//     return result.charAt(0).toUpperCase() + result.slice(1);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Dynamic Form</h2>
//       <form className="mt-4 grid grid-cols-2 gap-4"> {/* Main grid for inputs */}
//         {renderInputFields(jsonData)}
//       </form>
//       <pre className="mt-4 p-4 bg-gray-100 rounded-md">
//         {JSON.stringify(inputValues, null, 2)}
//       </pre>
//     </div>
//   );
// }


// 6 when numb is immidietale changed, then no problem. But when emptying input, then becomes string. Also can still enter letters.
// import React, { useState } from 'react';

// export default function RecursiveForm() {
//     const [jsonData, setJsonData] = useState({
//         tolerance: 0.000001,
//         maxIterations: 50,
//         wavefieldCalculationPeriod: 1,
//         stepAmplification: {
//         method: "DeltaAmplification",
//         fixedAmplification: 50,
//         deltaAmplificationStart: 100,
//         deltaAmplificationSlope: 1,
//         PMLWidthFactor: {
//             x: 0,
//             z: 0
//         },
//         }
//     });

//   const [inputValues, setInputValues] = useState(jsonData);

//   // Recursive function to render inputs for both simple key-value pairs and nested objects
//   const renderInputFields = (data, parentKey = '') => {
//     return (
//       <>
//         {Object.keys(data).map((key) => {
//           const value = data[key];
//           const fullKey = parentKey ? `${parentKey}.${key}` : key;

//           if (typeof value === 'object' && !Array.isArray(value)) {
//             // If the value is an object, display a header for the group and recurse into it
//             return (
//               <React.Fragment key={fullKey}>
//                 <div className="col-span-2">
//                   <h3 className="text-md font-bold">{key}</h3>
//                 </div>
//                 {renderInputFields(value, fullKey)} {/* Render the group items */}
//               </React.Fragment>
//             );
//           } else {
//             // Render input for primitive values
//             return (
//               <div key={fullKey} className="flex flex-col space-y-3">
//                 <label className="text-sm font-medium text-gray-700">
//                   {key}
//                 </label>
//                 <input
//                   type={typeof value === 'number' ? 'number' : 'text'}
//                   value={inputValues[fullKey] ?? value}
//                   onChange={(e) => handleInputChange(fullKey, e.target.value, typeof value)}
//                   className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             );
//           }
//         })}
//       </>
//     );
//   };

//   // Helper function to update state for nested keys and validate input
//   const handleInputChange = (key, value, type) => {
//     let parsedValue = value;
//     if (type === 'number') {
//       parsedValue = parseFloat(value);
//       if (isNaN(parsedValue)) {
//         parsedValue = '';
//       }
//     }
//     setInputValues((prevState) => {
//       const updatedState = { ...prevState };
//       const keys = key.split('.');
//       let obj = updatedState;

//       // Traverse the object and update the nested value
//       for (let i = 0; i < keys.length - 1; i++) {
//         obj = obj[keys[i]];
//       }
//       obj[keys[keys.length - 1]] = parsedValue;

//       return updatedState;
//     });
//   };

//   // Utility function to format camelCase to readable text
//   const formatCamelCase = (str) => {
//     const result = str.replace(/([A-Z])/g, ' $1').toLowerCase();
//     return result.charAt(0).toUpperCase() + result.slice(1);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Dynamic Form</h2>
//       <form className="mt-4 grid grid-cols-2 gap-4"> {/* Main grid for inputs */}
//         {renderInputFields(jsonData)}
//       </form>
//       <pre className="mt-4 p-4 bg-gray-100 rounded-md">
//         {JSON.stringify(inputValues, null, 2)}
//       </pre>
//     </div>
//   );
// }


// 7 still same issue
// import React, { useState } from 'react';

// export default function RecursiveForm() {
//   const [jsonData, setJsonData] = useState({
//     tolerance: 0.000001,
//     maxIterations: 50,
//     wavefieldCalculationPeriod: 1,
//     stepAmplification: {
//       method: "DeltaAmplification",
//       fixedAmplification: 50,
//       deltaAmplificationStart: 100,
//       deltaAmplificationSlope: 1,
//       PMLWidthFactor: {
//         x: 0,
//         z: 0
//     },
//     }
//   });

//   const [inputValues, setInputValues] = useState(jsonData);

//   // Recursive function to render inputs for both simple key-value pairs and nested objects
//   const renderInputFields = (data, parentKey = '') => {
//     return (
//       <>
//         {Object.keys(data).map((key) => {
//           const value = data[key];
//           const fullKey = parentKey ? `${parentKey}.${key}` : key;

//           if (typeof value === 'object' && !Array.isArray(value)) {
//             // If the value is an object, display a header for the group and recurse into it
//             return (
//               <React.Fragment key={fullKey}>
//                 <div className="col-span-2">
//                   <h3 className="text-md font-bold">{key}</h3>
//                 </div>
//                 {renderInputFields(value, fullKey)} {/* Render the group items */}
//               </React.Fragment>
//             );
//           } else {
//             // Render input for primitive values
//             return (
//               <div key={fullKey} className="flex flex-col space-y-3">
//                 <label className="text-sm font-medium text-gray-700">
//                   {key}
//                 </label>
//                 <input
//                   type={typeof value === 'number' ? 'number' : 'text'}
//                   value={inputValues[fullKey] ?? value}
//                   onChange={(e) => handleInputChange(fullKey, e.target.value, typeof value)}
//                   className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             );
//           }
//         })}
//       </>
//     );
//   };

//   // Helper function to update state for nested keys and validate input
//   const handleInputChange = (key, value, type) => {
//     let parsedValue = value;

//     if (type === 'number') {
//       // Validate number input
//       parsedValue = value === '' ? '' : parseFloat(value);
//       if (isNaN(parsedValue)) {
//         parsedValue = '';
//       }
//     }

//     setInputValues((prevState) => {
//       const updatedState = { ...prevState };
//       const keys = key.split('.');
//       let obj = updatedState;

//       // Traverse the object and update the nested value
//       for (let i = 0; i < keys.length - 1; i++) {
//         obj = obj[keys[i]];
//       }
//       obj[keys[keys.length - 1]] = parsedValue;

//       return updatedState;
//     });
//   };

//   // Utility function to format camelCase to readable text
//   const formatCamelCase = (str) => {
//     const result = str.replace(/([A-Z])/g, ' $1').toLowerCase();
//     return result.charAt(0).toUpperCase() + result.slice(1);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Dynamic Form</h2>
//       <form className="mt-4 grid grid-cols-2 gap-4"> {/* Main grid for inputs */}
//         {renderInputFields(jsonData)}
//       </form>
//       <pre className="mt-4 p-4 bg-gray-100 rounded-md">
//         {JSON.stringify(inputValues, null, 2)}
//       </pre>
//     </div>
//   );
// }


// 8 still problem
// import React, { useState } from 'react';

// export default function RecursiveForm() {
//   const [jsonData, setJsonData] = useState({
//     tolerance: 0.000001,
//     maxIterations: 50,
//     wavefieldCalculationPeriod: 1,
//     stepAmplification: {
//       method: "DeltaAmplification",
//       fixedAmplification: 50,
//       deltaAmplificationStart: 100,
//       deltaAmplificationSlope: 1,
//       PMLWidthFactor: {
//         x: 0,
//         z: 0
//     },
//     }
//   });

//   const [inputValues, setInputValues] = useState(jsonData);

//   const renderInputFields = (data, parentKey = '') => {
//     return (
//       <>
//         {Object.keys(data).map((key) => {
//           const value = data[key];
//           const fullKey = parentKey ? `${parentKey}.${key}` : key;

//           if (typeof value === 'object' && !Array.isArray(value)) {
//             return (
//               <React.Fragment key={fullKey}>
//                 <div className="col-span-2">
//                   <h3 className="text-md font-bold">{key}</h3>
//                 </div>
//                 {renderInputFields(value, fullKey)} 
//               </React.Fragment>
//             );
//           } else {
//             return (
//               <div key={fullKey} className="flex flex-col space-y-3">
//                 <label className="text-sm font-medium text-gray-700">
//                   {key}
//                 </label>
//                 {/* {typeof value === 'number' ?
//                     <input className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         // type={inputType} value={value} onChange={(e) => setValue(e.target.value)}
//                         type='number' value={value} onChange={(e) => handleInputChange(fullKey, e.target.value)}
//                     />
//                     :
//                     <input className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         type='string' value={value} onChange={(e) => handleInputChange(fullKey, e.target.value)}
//                     />
//                 } */}
//                 <input
//                   type={typeof value === 'number' ? 'number' : 'text'}
//                   value={inputValues[fullKey] ?? value}
//                 //   onChange={(e) => handleInputChange(fullKey, e.target.value, typeof value)}
//                   onChange={(e) => handleInputChange(fullKey, e.target.value)}
//                   className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             );
//           }
//         })}
//       </>
//     );
//   };

// //   const handleInputChange = (key, value, type) => {
// //     let parsedValue = value;

// //     if (type === 'number') {
// //       // Ensure the value is a valid number and prevent non-numeric inputs
// //       parsedValue = parseFloat(value);
// //       if (isNaN(parsedValue)) {
// //         parsedValue = '';
// //       }
// //     }

// //     setInputValues((prevState) => {
// //       const updatedState = { ...prevState };
// //       const keys = key.split('.');
// //       let obj = updatedState;

// //       for (let i = 0; i < keys.length - 1; i++) {
// //         obj = obj[keys[i]];
// //       }
// //       obj[keys[keys.length - 1]] = parsedValue;

// //       return updatedState;
// //     });
// //   };

//   // Helper function to update state for nested keys
//   const handleInputChange = (key, value) => {
//     setInputValues((prevState) => {
//       const updatedState = { ...prevState };
//       const keys = key.split('.');
//       let obj = updatedState;

//       // Traverse the object and update the nested value
//       for (let i = 0; i < keys.length - 1; i++) {
//         obj = obj[keys[i]];
//       }
//       obj[keys[keys.length - 1]] = value;

//       return updatedState;
//     });
//   };


//   const formatCamelCase = (str) => {
//     const result = str.replace(/([A-Z])/g, ' $1').toLowerCase();
//     return result.charAt(0).toUpperCase() + result.slice(1);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Dynamic Form</h2>
//       <form className="mt-4 grid grid-cols-2 gap-4">
//         {renderInputFields(jsonData)}
//       </form>
//       <pre className="mt-4 p-4 bg-gray-100 rounded-md">
//         {JSON.stringify(inputValues, null, 2)}
//       </pre>
//     </div>
//   );
// }


// 9 youtube video
import React, { useState } from 'react';

export default function RecursiveForm() {
    const [jsonData, setJsonData] = useState({
    tolerance: 0.000001,
    maxIterations: 50,
    wavefieldCalculationPeriod: 1,
    stepAmplification: {
        method: "DeltaAmplification",
        fixedAmplification: 50,
        deltaAmplificationStart: 100,
        deltaAmplificationSlope: 1,
        PMLWidthFactor: {
        x: 0,
        z: 0
    },
    }
    });


    const [temp, setTemp] = useState(null);
    const [inputValues, setInputValues] = useState(jsonData);
  
// LAST NOTE: if switching between fields without changing, handleBlur works. But when writing something (and changing it to string) it doesn't work. It seems 
// that onBlur only fires when it's a number or unchanged.
// https://www.youtube.com/shorts/9YokM9rp0c4
    const handleBlur = (key, value) => {
        // console.log(`Entered handleBlur: ${value}`)
        // When input loses focus, convert it to a number if valid
        const numberValue = parseFloat(value);
    
        // Update state with number value if valid, otherwise keep it as is
        handleInputChange(key, isNaN(numberValue) ? '' : numberValue);
    };

    const renderInputFields = (data, parentKey = '') => {
        return (
        <>
            {Object.keys(data).map((key) => {
                const value = data[key];
                const valueType = typeof value; 
                const fullKey = parentKey ? `${parentKey}.${key}` : key;

                if (typeof value === 'object' && !Array.isArray(value)) {
                    return (
                    <React.Fragment key={fullKey}>
                        <div className="col-span-2">
                        <h3 className="text-md font-bold">{key}</h3>
                        </div>
                        {renderInputFields(value, fullKey)} 
                    </React.Fragment>
                    );
                } else {
                    // {console.log(`${key} has type ${typeof value}`)}
                    if (valueType === 'number') {
                        // {console.log(`Number. Type of ${key}: ${typeof value}`)}
                        return (
                            <div key={fullKey} className="flex flex-col space-y-3">
                                {/* <label className="text-sm font-medium text-gray-700">
                                    {`${key} ${typeof value}`}
                                </label> */}
                                <p className='text-sm font-medium text-gray-700'>{`${key} ${typeof value}`}</p>
                                <input className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    type="text" pattern="[0-9]+" value={value} onChange={(event) => preHandleInputChange(fullKey, event.target.value)} onBlur={() => handleBlur(fullKey, value)}
                                />
                            </div>
                        )
                    } else if (valueType === 'string') { // typeof = 'string' | <input type='text' />
                        // {console.log(`Text. Type of ${key}: ${typeof value}`)}
                        return (
                            <div key={fullKey} className="flex flex-col space-y-3">
                                <label className="text-sm font-medium text-gray-700">
                                    {`${key} ${typeof value}`}
                                </label>
                                <input className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    type="text" value={value} onChange={(event) => handleInputChange(fullKey, event.target.value)}
                                />
                            </div>
                        )
                    }
                    // else if (typeof value === 'bool') {
                    // }
                
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                // return (
                // <div key={fullKey} className="flex flex-col space-y-3">
                //     <label className="text-sm font-medium text-gray-700">
                //     {key}
                //     </label>
                //     <input
                //     type={typeof value === 'number' ? 'number' : 'text'}
                //     value={inputValues[fullKey] ?? value}
                //     onChange={(e) => handleInputChange(fullKey, e.target.value)}
                //     className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                //     />
                //     {/* <input className="h-[48px] py-3 px-4
                //         rounded-xl border border-[#D7DFFF] 
                //         text-sm font-normal"
                //         // type={inputType} value={value} onChange={(e) => setValue(e.target.value)}
                //         type="text" pattern="[0-9]+" value={value} onChange={handleInputChange} onBlur={handleBlur}
                //         // type="text" pattern="[0-9]+" value={value} onChange={(event) => handleChangeValue(event, 'number')}
                //     />
                //     {typeof value} */}
                //     <input
                //         type={typeof value === 'number' ? 'number' : 'text'}
                //         // pattern="[0-9]+"
                //         value={inputValues[fullKey] ?? value}
                //         onChange={(e, type = typeof value) => {
                //             console.log("Entered inline onChange");
                //             // console.log(e)
                //             // const type = typeof e.target.value;
                //             const lastInput = e.target.value[e.target.value[length] -1];
                //             const blackList = ['+', '.', 'e', '-'];
                //             let newValue = null;
                            
                //             if (type === 'number') {
                //                 if (blackList.some((char) => lastInput === char)) { // do nothing with blocked chars
                //                     return;
                //                 } else { // if valid input, treat as number
                //                     newValue = e.target.valueAsNumber
                //                 }
                //             } else { // it's a string, treat as string
                //                 newValue = e.target.value;
                //             }

                //             // const newValue = e.target.value;
                //             setInputValues(prevState => {
                //             const updatedState = { ...prevState };
                //             const keys = fullKey.split('.');
                //             let obj = updatedState;
                        
                //             // Traverse the object and update the nested value
                //             for (let i = 0; i < keys.length - 1; i++) {
                //                 obj = obj[keys[i]];
                //             }
                //             obj[keys[keys.length - 1]] = newValue;
                        
                //             return updatedState;
                //             });
                //         }}
                //     //   onChange={typeof value === 'number' ? (e) => handleInputChange(fullKey, e) : (e) => handleInputChange(fullKey, e.target.value)}
                //     className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                //     />
                // </div>
                // );
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            }
            })}
        </>
        );
    };

    const preHandleInputChange = (key, value) => {
        console.log(`Entered preHandleInputChange: ${key} | ${value}`)
        // const { value } = event.target;
        
        // Allow empty string, numbers, ".", "-", and "e"
        if (/^-?\d*\.?\d*([eE]-?\d*)?$/.test(value) || value === '') {
            handleInputChange(key, value); // Update input value as a string
        }
    };
    


    // Helper function to update state for nested keys
    const handleInputChange = (key, value) => {
        // const lastInput = e.target.value[e.target.value[length] -1];
        // const blackList = ['+', '.', 'e', '-'];
        // let value = null;

        // if (type === 'number') {
        //     if (blackList.some((char) => lastInput === char)) { // do nothing with blocked chars
        //         return;
        //     } else { // if valid input, treat as number
        //         value = e.target.valueAsNumber
        //     }
        // } else { // it's a string, treat as string
        //     value = e.target.value;
        // }

        setInputValues((prevState) => {
            const updatedState = { ...prevState };
            const keys = key.split('.');
            let obj = updatedState;

            // Traverse the object and update the nested value
            for (let i = 0; i < keys.length - 1; i++) {
            obj = obj[keys[i]];
            }
            obj[keys[keys.length - 1]] = value;

            return updatedState;
    });
            

        // const lastInput = e.target.value[e.target.value[length] -1];
        // const whiteList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ','];

        // if (type === 'number' && whiteList.some((char) => lastInput === char)) {

        // }
        // const value = e.target.value;
        
        // setInputValues((prevState) => {
        //     const updatedState = { ...prevState };
        //     const keys = key.split('.');
        //     let obj = updatedState;

        //     // Traverse the object and update the nested value
        //     for (let i = 0; i < keys.length - 1; i++) {
        //     obj = obj[keys[i]];
        //     }
        //     obj[keys[keys.length - 1]] = value;

        //     return updatedState;
        // });

    };


    const formatCamelCase = (str) => {
        const result = str.replace(/([A-Z])/g, ' $1').toLowerCase();
        return result.charAt(0).toUpperCase() + result.slice(1);
    };

    return (
        <div className="p-4">
        <h2 className="text-xl font-bold">Dynamic Form</h2>
        <form className="mt-4 grid grid-cols-2 gap-4">
            {renderInputFields(jsonData)}
        </form>
        <pre className="mt-4 p-4 bg-gray-100 rounded-md">
            {JSON.stringify(inputValues, null, 2)}
        </pre>
        </div>
    );
}
