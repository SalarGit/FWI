
export default function Scrollbar({ className }) {

    return (
        <div className={`absolute top-[60px] ${model === 'minimisation' ? 'right-0' : ''} ${!isOpen ? 'hidden' : ''}
            border border-[#D7DFFF] bg-white rounded-xl
            w-fit h-fit p-[6px]`}
        >
        </div>
    )
}