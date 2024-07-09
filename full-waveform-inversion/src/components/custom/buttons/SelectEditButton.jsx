import { useState } from 'react';

export default function SelectEditButton({ title, absoluteStyling }) {
    return (
        <button
            className={`absolute ${absoluteStyling} py-[6px] px-3 rounded bg-[#F1F4FF]
            text-sm font-medium text-[#3561FE]`}
        >
            {title}
        </button>
    )
}