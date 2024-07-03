import { useState } from "react";

import Menu from "./Menu.jsx";
import SelectBox from "./SelectBox.jsx";

export default function DropDownMenu({ initialValue, items }) {

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
        <div className="relative">
            <SelectBox isOpen={isOpen} onOpenClose={handleSetIsOpen} selectedItem={selectedItem}/>
            {isOpen && <Menu items={items} onSelect={handleSelectItem}/>}
        </div>
    )
}