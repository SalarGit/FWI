import EmptyGraphs from "./EmptyGraphs.jsx";
import UpperPart from "../custom/UpperPart.jsx";
import DropDownMenu from "../dropdownmenu/DropDownMenu.jsx";

export default function Output() {
    const items = ['Output values', 'Residual graph', 'Residual field', 'Quality metric'];

    // relative
    return (
        <div className="flex flex-col bg-white border border-violet-200 pl- rounded-3xl w-1/2 h-[530px]">
            <UpperPart heading="Calculated output" styling="pl-8 pr-6 py-4">
                <DropDownMenu initialValue="Output values" items={items} />
            </UpperPart>

            <EmptyGraphs/>
        </div>
    )
}