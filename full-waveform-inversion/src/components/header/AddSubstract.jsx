import { useState, useEffect } from "react"

export default function AddSubstract({ type, handleThreads, isDisabled }) {
    // const [isDisabled, setIsDisabled] = useState(false);
    // useEffect(() => {
    //    handleDisable(); 
    // }, [threads]);

    // function handleDisable() {
    //     if (type === 'add') {
    //         if (threads === 8) {
    //             setIsDisabled(true);
    //         } else {
    //             isDisabled && setIsDisabled(false);
    //         }
    //     }
    //     else if (type === 'substract') {
    //         if (threads === 1) {
    //             setIsDisabled(true);
    //         } else {
    //             isDisabled && setIsDisabled(false);
    //         }
    //     }
    // }

    return (
        <button disabled={isDisabled} onClick={handleThreads}
            className={`p-3 rounded-xl bg-[#F1F4FF] ${isDisabled && 'opacity-60 cursor-not-allowed'}`}
        >
            <img src={`src/assets/${type}.svg`} alt={`${type}.svg`} />
        </button>
    )
}