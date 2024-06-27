import H1 from "../custom/H1.jsx";
import EmptyGraphs from "./EmptyGraphs.jsx";
import closedIcon from "../../assets/drop-icon.png";

import { useState } from "react";
import UpperPart from "../custom/UpperPart.jsx";

export default function Output() {
    const [isOpen, setIsOpen] = useState(false);
    const [outputType, setOutputType] = useState("Output values");

    function handleSetIsOpen() {
        setIsOpen((prevState) => prevState ? false : true);
    }

    function handleSetOutputType(type) {
        setOutputType(type);
        handleSetIsOpen();
    }

    // Create comp that outputs array of outputTypes
    const dropDown = !isOpen ? null :
    // Position from Output container: right-6 top-[90px]
        <div className="absolute bg-white w-[277px]
            flex flex-col space-y-5 py-5 px-3 left-[0px] right-[0px] top-[90px]
            border border-violet-200 rounded-xl"
        >
            {/* <button className="text-left px-1 rounded-md
                hover:bg-gradient-to-r from-violet-200 to-white hover:-translate-y-0.5"
            >Output values</button> */}
            <div className="group">
                <button className="text-left px-1 rounded-md" // w-full
                    onClick={() => handleSetOutputType("Output values")}
                >Output values</button>
            </div>
            <div className="group">
                <button className="text-left px-1 rounded-md w-full"
                    onClick={() => handleSetOutputType("Residual graph")}
                >Residual graph</button>
            </div>
            <div className="group">
                <button className="text-left px-1 rounded-md w-full"
                    onClick={() => handleSetOutputType("Residual field")}
                >Residual field</button>
            </div>
            <div className="group">
                <button className="text-left px-1 rounded-md w-full"
                    onClick={() => handleSetOutputType("Quality metrics")}
                >Quality metrics</button>
            </div>
        </div>
    
    const dropDownIcon = !isOpen ? <img src={closedIcon} alt="drop-icon.png" /> : <img src={closedIcon} alt="drop-icon.png" className="rotate-180" />

    // relative
    return (
        <div class="flex flex-col bg-white border border-violet-200 pl- rounded-3xl w-1/2 h-[530px]">
            <UpperPart heading="Calculated output" styling="pl-8 pr-6 py-3">
                <div className="relative">
                    <button onClick={handleSetIsOpen}
                        // my-4 mr-6
                        // pl-1 pt-2 pr-3 pb-4
                        // border inside, force height
                        className="flex items-center justify-between 
                        w-[277px] h-[48px] pl-4 pr-2
                        border border-violet-200 rounded-xl"
                    >
                        <p>{outputType}</p>
                        {dropDownIcon}
                    </button>

                    {/* Output types drop-down menu */}
                    {dropDown}
                </div>
            </UpperPart>
  
            <EmptyGraphs/>
        </div>
    )
}