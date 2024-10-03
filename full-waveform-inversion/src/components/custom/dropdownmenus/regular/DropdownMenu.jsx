import React, { useState } from 'react';

import Menu from "./Menu.jsx";
import SelectBox from "./SelectBox.jsx";

export default function DropdownMenu({ items, selectedItem, updateItem, width='' }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleSetIsOpen() {
        setIsOpen((prevState) => prevState ? false : true);
    }

    function handleSelectItem(item) {
        updateItem(item);
        handleSetIsOpen();
    }

    return (
        <div className={`relative ${width} z-50`}>
            <SelectBox isOpen={isOpen} onOpenClose={handleSetIsOpen} selectedItem={selectedItem}/>
            {isOpen && <Menu items={items} onSelect={handleSelectItem}/>}
        </div>
    )
}