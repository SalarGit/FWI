import InputModelData from "./InputModelData.jsx";

export default function InputModelDataBlock({ heading, dataObject }) {
    const outerStyle = heading ? "grid grid-cols-2 gap-4" : "grid grid-cols-1 gap-4";
    // [auto_auto]
    
    return (
        <div className={outerStyle}>
            {heading && <p className="text-sm font-medium col-span-2">{heading}</p>}
            {Object.entries(dataObject).map(([key, value]) => (
                <InputModelData title={key} defaultValue={value}/>
            ))}
        </div>
    )
}

// export default function ModelDataBlock({heading, dataObject}) {
//     const outerStyle = heading ? "grid grid-cols-2 gap-4" : "grid grid-cols-1 gap-4";
//     // [auto_auto]

//     return (
//         // Datablock container
//         // <div className={outerStyle}>
//         // max-w-max
//         <div className={outerStyle}>
//             {heading && <p className="text-sm font-medium col-span-2">{heading}</p>}
//             {
//                 Object.entries(dataObject).map(([key, value]) => (
//                     <ModelData title={key} value={value}/>
//                 ))
//             }
//         </div>
//     )
// }