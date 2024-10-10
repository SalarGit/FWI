export default function Menu({ items, onSelect, filter=undefined}) {
    return (
        <div className={`absolute left-[0px] right-[0px] top-[60px]
            flex flex-col space-y-[6px] p-2
            border border-[#D7DFFF] rounded-xl bg-white`}
        >
            {
                items.map((item) => (
                    <button key={item} onClick={() => onSelect(item)}
                        className="py-2 px-[10px] text-left rounded-md
                        hover:bg-[#F1F4FF] hover:text-[#3561FE] duration-75" // w-full
                    >
                        {filter === undefined ? item : filter(item)}
                    </button>
                ))
            }
        </div>
    )
}