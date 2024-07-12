export default function ModelData({title, value}) {
    return (
        // <div className="w-max w-fill w-full w-auto w-fit w-px max-w-min max-w-max">
        <div className="flex flex-col space-y-3 text-sm">
            <p className="font-medium text-zinc-500">{title}:</p>
            <p className="font-normal">{value}</p>
        </div>
        // </div>
    )
}