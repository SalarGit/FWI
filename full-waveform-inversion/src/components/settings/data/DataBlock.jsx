import Data from "./Data.jsx";

export default function DataBlock({heading, dataObject}) {
    const outerStyle = heading ? "grid grid-cols-2 gap-4" : "grid grid-cols-1 gap-4";
    // [auto_auto]

    return (
        // Datablock container
        // <div className={outerStyle}>
        // max-w-max
        <div className={outerStyle}>
            {heading && <p className="text-sm font-medium col-span-2">{heading}</p>}
                {
                    Object.entries(dataObject).map(([key, value]) => (
                        <Data title={key} value={value}/>
                    ))
                }
        </div>
    )
}