import { useState } from "react";

import check from "../../assets/check.svg";
import plus from "../../assets/plus.svg";

export default function Chip({ title, disabled=false }) {

    const [clicked, setClicked] = useState(true);

    function handleClick() {
        setClicked((prev) => prev ? false : true);
    }

    const styling = !clicked ? 
        "flex items-center justify-center h-12 space-x-2 py-[11px] px-[15px] bg-[white] border border-[#D7DFFF] rounded-full text-[#3561FE]" 
    : 
        "flex items-center space-x-2 py-3 px-4 bg-[#F1F4FF] rounded-full text-[#3561FE]";
    const icon = !clicked ? plus : check;

    return (
        <>
            {disabled ?
                <div className="flex items-center space-x-2 py-3 px-4 bg-[#F1F4FF] rounded-full text-[#3561FE]">
                    <img src={check} alt="check.png" />
                    <p>{title}</p>
                </div>
            :
                <button onClick={handleClick} className={styling}>
                    <img src={icon} alt="plus.png" />
                    <p>{title}</p>
                </button>
            }
        </>
    )
}