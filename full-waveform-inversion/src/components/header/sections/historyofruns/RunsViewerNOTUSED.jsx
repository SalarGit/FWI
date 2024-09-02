import { tableHeaders, tableData } from '../../../../data';

export default function RunsViewer({}) {

    return (
        <div className='w-[1746px] h-[897px] bg-[#F4F6FB] border border-[#D7DFFF] rounded-b-3xl p-6'>           
            {/* This 10px padding is removed from the inner div using minus margin & table (by simple taking 6px from the padding)
                to keep the visuals the same. */}
            <div className='p-[10px] pb-3 bg-white border border-[#D7DFFF] rounded-2xl'>
                <div className='max-h-[823px] overflow-y-auto scrollbar-webkit ml-[-10px]'>
                    {/* pr-[6px] */}
                    <table className="table-auto w-full border-separate border-spacing-0 "> 
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}