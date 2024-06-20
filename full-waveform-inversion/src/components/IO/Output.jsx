import Header from "../custom/Header.jsx";
import EmptyGraphs from "./EmptyGraphs.jsx";
import closedIcon from "../../assets/drop-icon.png";

import { useState } from "react";

export default function Output() {
    const [isOpen, setIsOpen] = useState(false);

    function handleDropDown() {
        setIsOpen((prevStatus) => prevStatus ? false : true);
    }

    return (
        <div class="flex flex-col bg-white border border-violet-200 rounded-3xl w-1/2 h-[530px]">
            {/* Upper Part */}
            {/* Container */}
            <div className="flex justify-between">
                <Header header="Calculated output"/>

                <button onClick={handleDropDown}
                    className="flex items-center justify-between pl-4 pr-2 my-4 mr-6
                    border border-violet-200 rounded-xl w-[277px]"
                >
                    <p>Output values</p>
                    {!isOpen ? (
                        <img src={closedIcon} alt="drop-icon.png" />
                        ) : (
                        <img src={closedIcon} alt="drop-icon.png" className="rotate-180" />
                    )}
                </button>
            </div>
                {!isOpen ? (
                    <div>closed</div>
                    ) : (
                    <div>open</div>
                )}

            {/* Border */}
            <div class="border-t border-violet-200" />

            {/* Lower Part */}
            <EmptyGraphs/>
        </div>
    )
}