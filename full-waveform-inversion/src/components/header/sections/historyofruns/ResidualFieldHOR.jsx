import BorderBottom from "../../../custom/borders/BorderBottom.jsx"
import EmptyGraph from "../../../IO/EmptyGraph.jsx"

export default function ResidualFieldHOR() {
    return (
        // [823px]
        <div className="max-h-full overflow-y-auto scrollbar-webkit scrollbar-thin">
            <div className="grid grid-cols-2 gap-6 max-h-full">
                <div className="h-[400px] max-w-[838px] bg-white rounded-2xl">
                    {/* Upper */}
                    <p className="py-[18px] px-6 font-medium">Data Quality Assessment - 05-03-2023</p>
                    <BorderBottom />

                    {/* Lower */}
                    <EmptyGraph version='compare' padding='' />  {/* Version should be difference */}
                </div>
                {/* min-w-[702px] */}
                <div className="h-[400px] max-w-[838px] bg-white rounded-2xl">
                    {/* Upper */}
                    <p className="py-[18px] px-6 font-medium">Data Analysis Run - 01-03-2023</p>
                    <BorderBottom />

                    {/* Lower */}
                    <EmptyGraph version='compare' padding='' />  {/* Version should be difference */}
                </div>
                <div className="h-[400px] max-w-[838px] bg-white rounded-2xl">
                    {/* Upper */}
                    <p className="py-[18px] px-6 font-medium">Data Quality Assessment - 05-03-2023</p>
                    <BorderBottom />

                    {/* Lower */}
                    <EmptyGraph version='compare' padding='' />  {/* Version should be difference */}
                </div>
                <div className="h-[400px] max-w-[838px] bg-white rounded-2xl">
                    {/* Upper */}
                    <p className="py-[18px] px-6 font-medium">Data Analysis Run - 01-03-2023</p>
                    <BorderBottom />

                    {/* Lower */}
                    <EmptyGraph version='compare' padding='' />  {/* Version should be difference */}
                </div>
                <div className="h-[400px] max-w-[838px] bg-white rounded-2xl">
                    {/* Upper */}
                    <p className="py-[18px] px-6 font-medium">Data Quality Assessment - 05-03-2023</p>
                    <BorderBottom />

                    {/* Lower */}
                    <EmptyGraph version='compare' padding='' />  {/* Version should be difference */}
                </div>
                <div className="h-[400px] max-w-[838px] bg-white rounded-2xl">
                    {/* Upper */}
                    <p className="py-[18px] px-6 font-medium">Data Analysis Run - 01-03-2023</p>
                    <BorderBottom />

                    {/* Lower */}
                    <EmptyGraph version='compare' padding='' />  {/* Version should be difference */}
                </div>
            </div>
        </div>
    )
}