import InputModelData from "./InputModelData.jsx";

export default function InputModelDataBlock({ heading, dataObject }) {
    // This is not needed because it's never the case that all data are under each other anymore.
    // const outerStyle = heading ? "grid grid-cols-2 gap-4" : "grid grid-cols-1 gap-4";
    // [auto_auto]
    
    return (
        <div className="grid grid-cols-2 gap-4">
            {heading && <p className="text-sm font-medium col-span-2">{heading}</p>}
            {Object.entries(dataObject).map(([key, value]) => (
                <InputModelData title={key} defaultValue={value}/>
            ))}
        </div>
    )
}