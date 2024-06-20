import Header from ".././custom/Header.jsx";
import EmptyGraphs from "./EmptyGraphs.jsx";

export default function Input() {
    return (
        <div class="flex flex-col bg-white border border-violet-200 rounded-3xl w-1/2">
            {/* Upper Part */}
            <Header header="Original input"/>

            {/* Border */}
            <div class="border-t border-violet-200" />

            {/* Lower Part */}
            {/* Graphs */}
            <EmptyGraphs />

        </div>
    )
}