export default function ModelParameters() {

    const header = 'text-sm font-medium'
    const dataKey = 'text-sm font-medium text-[#808080]'
    const dataValue = 'text-sm' 

    return (
        <div className='flex space-x-12'>

            <div className="flex flex-col space-y-4">
                <p className={header}>PMLWidthFactor</p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-3">
                        <p className={dataKey}>X:</p>
                        <p className={dataValue}>0</p>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <p className={dataKey}>Z:</p>
                        <p className={dataValue}>0</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <p className={header}>SourceParameter</p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-3">
                        <p className={dataKey}>R:</p>
                        <p className={dataValue}>4</p>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <p className={dataKey}>Beta:</p>
                        <p className={dataValue}>6.31</p>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <p className={dataKey}>boundaryConditionType:</p>
                        <p className={dataValue}>SecondOrderABC</p>
                    </div>
                </div>
            </div>
        </div>
    )
}