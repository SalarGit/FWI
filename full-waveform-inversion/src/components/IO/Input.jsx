import H1 from ".././custom/H1.jsx";
import Border from "../custom/Border.jsx";
import UpperPart from "../custom/UpperPart.jsx";
import EmptyGraphs from "./EmptyGraphs.jsx";

export default function Input() {
    return (
        <div className="flex flex-col bg-white border border-violet-200 rounded-3xl w-1/2">
            <UpperPart heading={"Original input"}/>

            <EmptyGraphs />
        </div>
    )
}