import Header from "../custom/Header.jsx";
import EmptyGraphs from "./EmptyGraphs.jsx";
import closedIcon from "../../assets/drop-icon.png";

import { useState } from "react";

export default function Output() {
    const [isOpen, setIsOpen] = useState(false);
    const [outputType, setOutputType] = useState("Output values");

    function handleSetIsOpen() {
        setIsOpen((prevStatus) => prevStatus ? false : true);
    }

    function handleSetOutputType(type) {
        setOutputType(type);
        handleSetIsOpen();
    }

    // Create comp that outputs array of outputTypes
    // right-6 top-[90px]
    const dropDown = !isOpen ? null :
        <div className="absolute bg-white w-[277px]
            flex flex-col space-y-5 py-5 px-3
            border border-violet-200 rounded-xl"
            >
            {/* <button className="text-left px-1 rounded-md
                hover:bg-gradient-to-r from-violet-200 to-white hover:-translate-y-0.5"
            >Output values</button> */}
            <div className="group">
                <button className="text-left px-1 rounded-md group-hover:-translate-y-0.5"
                    onClick={() => handleSetOutputType("Output values")}
                >Output values</button>
            </div>
            <div className="group">
                <button className="text-left px-1 rounded-md group-hover:-translate-y-0.5"
                    onClick={() => handleSetOutputType("Residual graph")}
                >Residual graph</button>
            </div>
            <div className="group">
                <button className="text-left px-1 rounded-md group-hover:-translate-y-0.5"
                    onClick={() => handleSetOutputType("Residual field")}
                >Residual field</button>
            </div>
            <div className="group">
                <button className="text-left px-1 rounded-md group-hover:-translate-y-0.5"
                    onClick={() => handleSetOutputType("Quality metrics")}
                >Quality metrics</button>
            </div>
        </div>
    
    const dropDownIcon = !isOpen ? <img src={closedIcon} alt="drop-icon.png" /> : <img src={closedIcon} alt="drop-icon.png" className="rotate-180" />

                // relative
    return (
        <div class="flex flex-col bg-white border border-violet-200 rounded-3xl w-1/2 h-[530px]">
            {/* Upper Part */}
            {/* Container */}
            <div className="flex justify-between">
                <Header header="Calculated output"/>

                <button onClick={handleSetIsOpen}
                    className="flex items-center justify-between pl-4 pr-2 my-4 mr-6
                    border border-violet-200 rounded-xl w-[277px]"
                >
                    <p>{outputType}</p>

                    {dropDownIcon}
                </button>

                {/* Output types drop-down menu */}
                {dropDown}
                
            </div>

            {/* Border */}
            <div class="border-t border-violet-200" />

            {/* Lower Part */}
            <EmptyGraphs/>
        </div>
    )
}