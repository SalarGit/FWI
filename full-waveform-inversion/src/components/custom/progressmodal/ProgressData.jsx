export default function ProgressData({ title, data }) {
    return (
        <div className='flex flex-col items-center justify-center w-1/3 space-y-2'>
            <p className='text-[#7f7f7f] text-sm font-generalSansMedium'>{title}</p>
            <p className='font-generalSansSemibold'>{data}</p>
        </div>
    )
}