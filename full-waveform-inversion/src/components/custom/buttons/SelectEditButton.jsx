import { useState } from 'react';

export default function SelectEditButton({ title, absoluteStyling }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <button
            className={`absolute ${absoluteStyling} rounded bg-[#F1F4FF]
            text-sm font-medium text-[#3561FE] ${isOpen ? 'border border-[#3561FE] py-[5px] px-[11px]' : 'py-[6px] px-3'}`}
        >
            {title}
        </button>
    )
}