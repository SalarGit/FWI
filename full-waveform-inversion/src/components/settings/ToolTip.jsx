export default function ToolTip() {
    const model = "minimisation model";

    let toolTip = null;
    if (model === "minimisation model") {
        toolTip = 
        (
            <p>Iteration 1</p>
        )
    }
    // hidden group-hover:block
    return (
        // <div className="absolute flex flex-col
        //         h-[200px] w-[200px] top-[33px] p-4
        //         bg-white rounded-2xl border border-violet-200 shadow">
        //         <p>Iteration 1</p>
        // </div>
        <div className="absolute flex flex-col
            h-[200px] w-[200px] top-[33px] p-4
            bg-white rounded-2xl border border-violet-200 shadow"
        >
            {toolTip}
        </div>
    )
}