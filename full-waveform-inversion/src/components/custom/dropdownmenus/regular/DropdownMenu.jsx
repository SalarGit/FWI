import { useState } from "react";


import Menu from "./Menu.jsx";
import SelectBox from "./SelectBox.jsx";
import EditModels from "../../../header/EditModels.jsx";

export default function DropdownMenu({ initialValue, items, edit=false, model='', width='' }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(initialValue);

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
            {/* Menu should only be displayed on {isOpen &&} and not with 'hidden' attribute, since nothing needs to be saved.
                This way there will be less elements in the DOM. Hidden is used when there is data in the element that needs to
                be saved for the next time that it is opened. Using && will reset it everytime. */}
            {/* <Menu items={items} onSelect={handleSelectItem} isOpen={isOpen}/> */}
            {isOpen && <Menu items={items} onSelect={handleSelectItem} />}
            {edit && <EditModels model={model} modelType={selectedItem} />}
            {/* {children} */}
        </div>
    )
}