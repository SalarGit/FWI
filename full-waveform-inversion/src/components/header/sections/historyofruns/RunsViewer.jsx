export default function RunsViewer({}) {

    return (
        <div className='w-[1746px] h-[897px] bg-[#F4F6FB] border border-[#D7DFFF] rounded-b-3xl p-6'>           
            {/* This 10px padding is removed from the inner div using minus margin & table (by simple taking 6px from the padding)
                to keep the visuals the same. */}
            <div className='p-[10px] pb-3 bg-white border border-[#D7DFFF] rounded-2xl'>
                <div className='max-h-[823px] overflow-y-auto scrollbar-webkit ml-[-10px]'>
                    <table className="table-auto w-full border-separate border-spacing-0 " // pr-[6px]
                    >
                        <thead className='sticky top-0 bg-white'>
                            <tr>
                                {tableHeaders.map((header, index) =>
                                    <th key={index} className={th}>{header}</th>
                                )}
                            </tr>
                        </thead>
                    <tbody>
                        {tableData.map((row) =>
                            <tr>
                                
                                <td className={`${td} pl-10`}>
                                    <input type='checkbox' />
                                </td>
                                    
                                {row.map((data, index) =>
                                    <td key={index} className={td}>{data}</td>
                                )}
                            </tr>
                        )}
                            {/* <td className={td}>Data Analysis Run - 01-03-2023</td> */}
                        

                    {/* <tr >
                        <div className={td}>
                            <input type="checkbox" />
                        </div>
                        <td className={td}>Seismic Data Analysis - 19-09-2023</td>
                        <td className={td}>62 x 32</td>
                        <td className={td}>Integral</td>
                        <td className={td}>ParticleSwarm</td>
                        <td className={td}>1</td>
                        <td className={td}>/home/tony_stark/default/fwi</td>
                    </tr> */}
                </tbody>
                </table>
                </div>
            </div>
            {/* <table className='table-auto'>
                <thead>
                    <tr>
                        <th>Run name</th>
                        <th>Grid size</th>
                        <th>Forward model</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Data Analysis Run - 01-03-2023</td>
                        <td>62 x 32</td>
                        <td>Integral</td>
                    </tr>
                        <td>Data Analysis Run - 05-07-2023</td>
                        <td>62 x 32</td>
                        <td>FiniteDifferenceMPI</td>
                </tbody>
            </table> */}
        </div>
    )
}