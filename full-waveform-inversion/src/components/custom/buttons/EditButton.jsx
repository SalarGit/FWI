// import { useState } from 'react';

export default function EditButton({ title, absoluteStyling, conditionalStyling, handleClick }) {
    // const [isOpen, setIsOpen] = useState(false);

    // function handleClick() {
    //     setIsOpen((prev) => prev ? false : true);
    // }

    return (
        <button onClick={handleClick}
            className={`absolute ${absoluteStyling} rounded bg-[#F1F4FF]
            text-sm font-medium text-[#3561FE] ${conditionalStyling}`}
        >
            {title}
            {/* {isOpen && children} */}
        </button>
    )
}