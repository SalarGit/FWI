import Header from "./custom/Header.jsx";

export default function Output() {
    return (
        <div class="flex flex-col bg-white border border-violet-200 rounded-3xl w-1/2 h-[530px]">
            {/* Upper Part */}
            <Header header="Calculated output"/>
            <div class="border-t border-violet-200" />
        </div>
    )
}