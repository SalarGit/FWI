// import React, { useState } from 'react';

// function FileInputWithCustomButton() {
//   // State to manage conditional styling
//   const [isSelectingFile, setIsSelectingFile] = useState(false);

//   // Handle label click event (when label is clicked)
//   const handleLabelClick = () => {
//     setIsSelectingFile(true);

//     // Remove conditional styling after a delay (assuming file dialog closes within 2 seconds)
//     setTimeout(() => {
//       setIsSelectingFile(false);
//     }, 10000);
//   };

//   return (
//     <label htmlFor="caseFolder" onClick={handleLabelClick}>
//       <div
//         className={`absolute right-2 top-2 cursor-pointer rounded bg-[#F1F4FF]
//           text-sm font-medium text-[#3561FE] py-[6px] px-3
//           ${isSelectingFile ? 'bg-[#D1E3FF]' : ''}`} // Conditional styling
//       >
//         <p>Select folder</p>
//       </div>
//       <input
//         type="file"
//         id="caseFolder"
//         name="caseFolder"
//         className="peer hidden"
//       />
//     </label>
//   );
// }

// export default FileInputWithCustomButton;






// This works when an actual file is selected. Can put timer for when dialog is cancelled

import React, { useState } from 'react';

function FileInputWithCustomButton() {
  // State to manage conditional styling
  const [isSelectingFile, setIsSelectingFile] = useState(false);
  const [file, setFile] = useState();

  // Handle label click event (when label is clicked)
  const handleLabelClick = () => {
    setIsSelectingFile(true);
  };


    // const elem = document.createElement("input");
    // elem.type = "file";
    // elem.addEventListener("cancel", () => {
    // console.log("Cancelled.");
    // });
    // elem.addEventListener("change", () => {
    // if (elem.files.length == 1) {
    //     console.log("File selected: ", elem.files[0]);
    // }
    // });
    // elem.click();

    // <label for="avatar">Choose a profile picture:</label>
    // <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />


  // Handle file input change event (when a file is selected)
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setIsSelectingFile(false); // Remove conditional styling when a file is selected
    } else {
      setIsSelectingFile(false); // Remove conditional styling if no file is selected
    }
  };

  // Handle blur event (when file dialog is closed)
  const handleFileBlur = () => {
    console.log("handleFileBlur triggered");
    setIsSelectingFile(false); // Remove conditional styling when file dialog is closed
  };

  function handleFileFocus() {
    console.log("handleFileFocus triggered");
  }

  return (
    <label htmlFor="caseFolder" onClick={handleLabelClick}>
      <div
        className={`absolute right-2 top-2 cursor-pointer rounded bg-[#F1F4FF]
          text-sm font-medium text-[#3561FE] py-[6px] px-3
          ${isSelectingFile ? 'border border-[#3561FE]' : ''}`} // Conditional styling
      >
        <p>Select folder</p>
      </div>
      <input
        type="file"
        id="caseFolder"
        name="caseFolder"
        className="peer hidden"
        onChange={handleFileChange}
      />
    </label>
  );
}

export default FileInputWithCustomButton;

// import React, { useState } from 'react';

// function FileInputWithCustomButton() {
//   // State to manage conditional styling
//   const [isSelectingFile, setIsSelectingFile] = useState(false);
//   const [file, setFile] = useState();

//   // Handle label click event (when label is clicked)
//   const handleLabelClick = () => {
//     setIsSelectingFile(true);
//   };

//   // Handle file input change event (when a file is selected or dialog is closed)
//   const handleFileChange = (event) => {
//     setIsSelectingFile(false); // Remove conditional styling when dialog closes
//   };

//   return (
//     <label htmlFor="caseFolder" onClick={handleLabelClick}>
//       <div
//         className={`absolute right-2 top-2 cursor-pointer rounded bg-[#F1F4FF]
//           text-sm font-medium text-[#3561FE] py-[6px] px-3
//           ${isSelectingFile ? 'bg-[#D1E3FF]' : ''}`} // Conditional styling
//       >
//         <p>Select folder</p>
//       </div>
//       <input
//         type="file"
//         id="caseFolder"
//         name="caseFolder"
//         className="peer hidden"
//         onChange={handleFileChange}
//       />
//     </label>
//   );
// }

// export default FileInputWithCustomButton;