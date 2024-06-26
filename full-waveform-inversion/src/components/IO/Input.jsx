import H1 from ".././custom/H1.jsx";
import EmptyGraphs from "./EmptyGraphs.jsx";

export default function Input() {
    return (
        <div class="flex flex-col bg-white border border-violet-200 rounded-3xl w-1/2">
            {/* Upper Part */}
            <H1 heading="Original input"/>

            {/* Border */}
            <div class="border-t border-violet-200" />

            {/* Lower Part */}
            {/* Graphs */}
            <EmptyGraphs />

        </div>
    )
}