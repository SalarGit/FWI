import { useState } from 'react';

export default function InputBox({ children, onClickInputBox }) {    
    const [bruh, setBruh] = useState('outer no');

    function onClick() {
        setBruh((prev) => prev === 'outer no' ? 'outer yes' : 'outer no');
    }

    return (
        <div onClick={onClick} role='button'
            className='flex items-center justify-between py-2 pr-2 pl-4
            bg-white border border-[#D7DFFF] rounded-xl'
        >
            {children}
        </div>
    )
}