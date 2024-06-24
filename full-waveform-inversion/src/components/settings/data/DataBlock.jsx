import Data from "./Data.jsx";

export default function DataBlock({header, dataObject}) {
    const outerStyle = header ? "grid grid-cols-2 gap-4" : "grid grid-cols-1 gap-4";
    // [auto_auto]

    return (
        // Datablock container
        // <div className={outerStyle}>
        // max-w-max
        <div className={outerStyle}>
            {header && <p className="text-sm font-medium col-span-2">{header}</p>}
                {
                    Object.entries(dataObject).map(([key, value]) => (
                        <Data title={key} value={value}/>
                    ))
                }
        </div>
    )
}