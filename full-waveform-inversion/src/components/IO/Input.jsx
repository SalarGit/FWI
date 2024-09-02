import H1 from "../custom/headings/H1.jsx";
import Border from "../custom/Border.jsx";
import BorderTop from "../custom/Border.jsx";
import UpperPart from "../custom/UpperPart.jsx";
import EmptyGraph from "./EmptyGraph.jsx";

export default function Input() {
    return (
        <div className="flex flex-col bg-white border border-[#D7DFFF] rounded-3xl w-1/2">
            <UpperPart heading={"Original input"}/>

            <EmptyGraph version='original' />
        </div>
    )
}