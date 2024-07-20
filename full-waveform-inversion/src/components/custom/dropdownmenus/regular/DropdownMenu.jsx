import { useState } from "react";

import Menu from "./Menu.jsx";
import SelectBox from "./SelectBox.jsx";

export default function DropdownMenu({ children, initialValue, items, width='' }) {

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
                This will save elements in the DOM. */}
            {/* <Menu items={items} onSelect={handleSelectItem} isOpen={isOpen}/> */}
            {isOpen && <Menu items={items} onSelect={handleSelectItem} />}
            {children}
        </div>
    )
}