import ModelData from "./ModelData.jsx";

export default function ModelDataBlock({heading, dataObject}) {
    // This is not needed because it's never the case that all data are under each other anymore.
    // const outerStyle = heading ? "grid grid-cols-2 gap-4" : "grid grid-cols-1 gap-4";
    // [auto_auto]

    return (
        // Datablock container
        // <div className={outerStyle}>
        // max-w-max
        <div className="grid grid-cols-2 gap-4">
            {heading && <p className="text-sm font-medium col-span-2">{heading}</p>}
            {
                Object.entries(dataObject).map(([key, value]) => (
                    <ModelData title={key} value={value}/>
                ))
            }
        </div>
    )
}