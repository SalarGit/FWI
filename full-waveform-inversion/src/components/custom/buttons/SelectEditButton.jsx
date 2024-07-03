import { useState } from 'react';

export default function SelectEditButton({ handle, title }) {
    const [bruh, setBruh] = useState('inner no');

    function onClick() {
        setBruh((prev) => prev === 'inner no' ? 'inner yes' : 'inner no');
    }

    return (
        
        <button onClick={onClick}
            className="py-[6px] px-3 rounded bg-[#F1F4FF]
            text-sm font-medium text-[#3561FE]"
        >
            {/* {title} */}
            {bruh}
        </button>
    )
}