import Header from "./custom/Header.jsx";

export default function Input() {
    return (
        <div class="flex flex-col bg-white border border-violet-200 rounded-3xl w-1/2">
            {/* Upper Part */}
            <Header header="Original input"/>

            {/* Border */}
            <div class="border-t border-violet-200" />

            {/* Lower Part */}

            {/* Graph Container */}
            <div className="flex justify-around pt-[54px] space-x-10">

                {/* Chi Values Graph */}
                <div className="flex-col space-y-[27px]">
                    {/* Header */}
                    <p className="font-medium text-center">Chi values in original reservoir</p>
                    
                    {/* Graph */}
                    <div>graphhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</div>
                    <div></div>
                </div>

                {/* Velocity Graph */}
                <div className="flex-col space-y-[27px]">
                    {/* Header */}
                    <p className="font-medium  text-center">Velocity</p>

                    {/* Graph */}
                    <div>dsdfs</div>
                </div>
            </div>

        </div>
    )
}