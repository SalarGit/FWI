// //Original

// import { useState, useEffect } from "react";


// import Menu from "./Menu.jsx";
// import SelectBox from "./SelectBox.jsx";
// import EditModels from "../../../header/EditModels.jsx";
// import EditModelData from "../../../header/sections/newrun/EditModelData.jsx";

// // For some reason some of these props are not immidietaly available when DropdownMenu is rendered. So when I use some of them, they are still undefined.
// // This forces me to use useEffect in order to fill those props as soon as they're available.
// export default function DropdownMenu({ initialSelectedItem, items, edit=false, jsonData, inputValues, setInputValues, initialTypes, model='', width='' }) {
//     console.log("model:", model)
//     const [isOpen, setIsOpen] = useState(false);
//     // console.log("items is: ", items)
//     // console.log("item[0] is", items[0], "with type", typeof items[0])
//     // const [selectedItem, setSelectedItem] = useState(null);
//     const [selectedItem, setSelectedItem] = useState(null);
//     // console.log("Items is:", items, ". Initial selected item is:", initialSelectedItem)

//     useEffect(() => {
//     if (items?.length > 0) {
//         console.log("Running useEffect")
//         setSelectedItem(items[0]);
//     }
//     }, [items]);

//     // console.log("items before state:", items);
//     // const [selectedItem, setSelectedItem] = useState(() => {
//     //     console.log("items[0] before state:", items[0]);
//     //     return items[0];
//     // });

//     // const [selectedItem, setSelectedItem] = useState(items[0]);
    
//     function handleSetIsOpen() {
//         setIsOpen((prevState) => prevState ? false : true);
//     }

//     function handleSelectItem(item) {
//         if (item !== "Select a case folder.") {
//             setSelectedItem(item);
//             handleSetIsOpen();
//         }
//     }

//     function filterJsonName(name) {
//         return name.replace('input/', '').
//         replace('FMInput.json', '').
//         replace('MinimizationInput.json', '')
//     }

//     // function filterJsonNames(names) {
//     //     const tmp = names.map(name =>
//     //         name.replace('input/', '')
//     //             .replace('FMInput.json', '')
//     //             .replace('MinimizationInput.json', '')
//     //     );
//     //     return tmp;
//     // }

//     return (
//         <div className={`relative ${width}`}>

//             {/* {selectedItem ? ( */}
//             <SelectBox isOpen={isOpen} onOpenClose={handleSetIsOpen} selectedItem={selectedItem ? (filterJsonName(selectedItem)) : 'selectedItem ? false'} />
//             {/* <SelectBox isOpen={isOpen} onOpenClose={handleSetIsOpen} selectedItem={filterJsonName(selectedItem)} /> */}
//             {/* ) : ( */}
//             {/* <p>Loading models...</p> */}
//             {/* )} */}
//             {isOpen && <Menu items={items} onSelect={handleSelectItem} filter={filterJsonName}/>}


//             {/* <SelectBox isOpen={isOpen} onOpenClose={handleSetIsOpen} selectedItem={selectedItem}/> */}

//             {/* Menu should only be displayed on {isOpen &&} and not with 'hidden' attribute, since nothing needs to be saved.
//                 This way there will be less elements in the DOM. Hidden is used when there is data in the element that needs to
//                 be saved for the next time that it is opened. Using && will reset it everytime. */}
//             {/* <Menu items={items} onSelect={handleSelectItem} isOpen={isOpen}/> */}
//             {/* {isOpen && <Menu items={items} onSelect={handleSelectItem} />} */}
//             {/* {edit && <EditModels model={model} modelType={selectedItem} />} */}
            
//             {edit && <EditModelData modelType={model} inputValues={inputValues} setInputValues={setInputValues} initialTypes={initialTypes}/>}
//             {/* {children} */}
//         </div>
//     )
// }



// Original, but stuff iwth initialSelect
// import { useState, useEffect } from "react";

// import Menu from "./Menu.jsx";
// import SelectBox from "./SelectBox.jsx";
// import EditModels from "../../../header/EditModels.jsx";
// import EditModelData from "../../../header/sections/newrun/EditModelData.jsx";

// export default function DropdownMenu({  selectedItem, handleSelectedFiles, items, edit=false, jsonData, inputValues, setInputValues, initialTypes, model='', width='' }) {
//     const [isOpen, setIsOpen] = useState(false);
//     // console.log(model !== "" ? console.log("selectedItem is", selectedItem) : null)
//     // console.log("selectedItem is:", selectedItem)
//     // const [tmpSelectedItem, setTmpSelectedItem] = useState(selectedItem);
    
//     // Only run this useEffect when a new set of items comes in (such as when a new zip is uploaded)
//     // useEffect(() => {
//     //     // Only update selectedItem if it's not already set
//     //     if (!selectedItem && items?.length > 0) {
//     //         setTmpSelectedItem(selectedItem.name); // Set the first item as the default
//     //     }
//     // }, [selectedItem]);  // Only re-run when the items array changes

//     function handleSetIsOpen() {
//         setIsOpen(prevState => !prevState);
//     }

//     function handleSelectItem(item) {
//         if (item !== "Select a case folder.") {
//             // setSelectedItem(item); // Item here is just the name.
//             handleSelectedFiles(model, item) // modelType, modelName
//             handleSetIsOpen();
//         }
//     }

//     function filterJsonName(name) {
//         return name.replace('input/', '')
//                    .replace('FMInput.json', '')
//                    .replace('MinimizationInput.json', '');
//     }

//     return (
//         <div className={`relative ${width}`}>
//             {model === "" ? null : console.log("SelectedItem in teh return :", selectedItem)}
//             <SelectBox isOpen={isOpen} onOpenClose={handleSetIsOpen} selectedItem={selectedItem === undefined ? 'Loading...' : (filterJsonName(selectedItem.name))} />
//             {isOpen && <Menu items={items} onSelect={handleSelectItem} filter={filterJsonName} />}
//             {/* {edit && <EditModelData modelType={model} inputValues={inputValues} setInputValues={setInputValues} initialTypes={initialTypes}/>} */}
//             {edit && <EditModelData modelType={model} selectedItem={selectedItem} handleSelectedFiles={handleSelectedFiles} />}
//         </div>
//     );
// }
