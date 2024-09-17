import { useState, useEffect } from "react";


import Menu from "./Menu.jsx";
import SelectBox from "./SelectBox.jsx";
import EditModels from "../../../header/EditModels.jsx";
import EditModelData from "../../../header/sections/newrun/EditModelData.jsx";

export default function DropdownMenu({ items, edit=false, jsonData, inputValues, setInputValues, initialTypes, model='', width='' }) {
    console.log("model:", model)
    const [isOpen, setIsOpen] = useState(false);
    // console.log("items is: ", items)
    // console.log("item[0] is", items[0], "with type", typeof items[0])
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
    if (items?.length > 0) {
        console.log("Running useEffect")
        setSelectedItem(items[0]);
    }
    }, [items]);

    // console.log("items before state:", items);
    // const [selectedItem, setSelectedItem] = useState(() => {
    //     console.log("items[0] before state:", items[0]);
    //     return items[0];
    // });

    // const [selectedItem, setSelectedItem] = useState(items[0]);
    
    function handleSetIsOpen() {
        setIsOpen((prevState) => prevState ? false : true);
    }

    function handleSelectItem(item) {
        if (item !== "Select a case folder.") {
            setSelectedItem(item);
            handleSetIsOpen();
        }
    }

    function filterJsonName(name) {
        return name.replace('input/', '').
        replace('FMInput.json', '').
        replace('MinimizationInput.json', '')
    }

    // function filterJsonNames(names) {
    //     const tmp = names.map(name =>
    //         name.replace('input/', '')
    //             .replace('FMInput.json', '')
    //             .replace('MinimizationInput.json', '')
    //     );
    //     return tmp;
    // }

    return (
        <div className={`relative ${width}`}>

            {/* {selectedItem ? ( */}
            <SelectBox isOpen={isOpen} onOpenClose={handleSetIsOpen} selectedItem={selectedItem ? filterJsonName(selectedItem) : ''} />
            {/* ) : ( */}
            {/* <p>Loading models...</p> */}
            {/* )} */}
            {isOpen && <Menu items={selectedItem ? items : ["Select a case folder."]} onSelect={handleSelectItem} filter={filterJsonName}/>}


            {/* <SelectBox isOpen={isOpen} onOpenClose={handleSetIsOpen} selectedItem={selectedItem}/> */}

            {/* Menu should only be displayed on {isOpen &&} and not with 'hidden' attribute, since nothing needs to be saved.
                This way there will be less elements in the DOM. Hidden is used when there is data in the element that needs to
                be saved for the next time that it is opened. Using && will reset it everytime. */}
            {/* <Menu items={items} onSelect={handleSelectItem} isOpen={isOpen}/> */}
            {/* {isOpen && <Menu items={items} onSelect={handleSelectItem} />} */}
            {/* {edit && <EditModels model={model} modelType={selectedItem} />} */}
            
            {edit && <EditModelData modelType={model} inputValues={inputValues} setInputValues={setInputValues} initialTypes={initialTypes}/>}
            {/* {children} */}
        </div>
    )
}