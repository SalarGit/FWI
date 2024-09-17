import { useState } from "react";


import Menu from "./Menu.jsx";
import SelectBox from "./SelectBox.jsx";
import EditModels from "../../../header/EditModels.jsx";
import EditModelData from "../../../header/sections/newrun/EditModelData.jsx";

export default function DropdownMenu({ items, width='' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(items[0]);

    function handleSetIsOpen() {
        setIsOpen((prevState) => prevState ? false : true);
    }

    function handleSelectItem(item) {
        setSelectedItem(item);
        handleSetIsOpen();
    }

    return (
        <div className={`relative ${width}`}>
            <SelectBox isOpen={isOpen} onOpenClose={handleSetIsOpen} selectedItem={selectedItem}/>
            {isOpen && <Menu items={items} onSelect={handleSelectItem}/>}
            {/* {model && <EditModels selectedModel={selectedModel} modelType={model} />} */}


            {/* Menu should only be displayed on {isOpen &&} and not with 'hidden' attribute, since nothing needs to be saved.
                This way there will be less elements in the DOM. Hidden is used when there is data in the element that needs to
                be saved for the next time that it is opened. Using && will reset it everytime. */}
            {/* <Menu items={items} onSelect={handleSelectItem} isOpen={isOpen}/> */}
            {/* {isOpen && <Menu items={items} onSelect={handleSelectItem} />} */}
            {/* {edit && <EditModels model={model} modelType={selectedItem} />} */}
            
            {/* {edit && <EditModelData modelType={model} inputValues={inputValues} setInputValues={setInputValues} initialTypes={initialTypes}/>} */}
            {/* {children} */}
        </div>
    )
}