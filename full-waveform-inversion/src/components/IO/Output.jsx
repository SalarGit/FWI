import { calculatedOutputTypes } from "../../data.js";

import EmptyGraph from "./EmptyGraph.jsx";
import UpperPart from "../custom/UpperPart.jsx";
import DropdownMenu from "../custom/dropdownmenus/regular/DropdownMenu.jsx";

export default function Output() {
    // relative
    return (
        <div className="flex flex-col bg-white border border-[#D7DFFF] pl- rounded-3xl w-1/2 h-[530px] backdrop-blur">
            <UpperPart heading="Calculated output" styling="pl-8 pr-6 py-4">
                {/* <div className="w-[277px]"> */}
                    <DropdownMenu initialValue="Output values" items={calculatedOutputTypes} width="w-[277px]" />
                {/* </div> */}
            </UpperPart>

            <EmptyGraph version='reconstructed' />
        </div>
    )
}