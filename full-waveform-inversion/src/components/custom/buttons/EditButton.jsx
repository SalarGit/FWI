import { useState } from 'react';

export default function EditButton({ children, title, absoluteStyling }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen((prev) => prev ? false : true);
    }

    return (
        <button onClick={handleClick}
            className={`absolute ${absoluteStyling} rounded bg-[#F1F4FF]
            text-sm font-medium text-[#3561FE] ${isOpen ? 'border border-[#3561FE] py-[5px] px-[11px]' : 'py-[6px] px-3'}`}
        >
            {title}
            {isOpen && children}
        </button>
    )
}