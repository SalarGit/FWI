import { outputTypes } from "../../data.js";

import EmptyGraphs from "./EmptyGraphs.jsx";
import UpperPart from "../custom/UpperPart.jsx";
import DropdownMenu from "../custom/dropdownmenus/regular/DropdownMenu.jsx";

export default function Output() {
    // relative
    return (
        <div className="flex flex-col bg-white border border-[#D7DFFF] pl- rounded-3xl w-1/2 h-[530px] backdrop-blur">
            <UpperPart heading="Calculated output" styling="pl-8 pr-6 py-4">
                {/* <div className="w-[277px]"> */}
                    <DropdownMenu initialValue="Output values" items={outputTypes} width="w-[277px]" />
                {/* </div> */}
            </UpperPart>

            <EmptyGraphs/>
        </div>
    )
}