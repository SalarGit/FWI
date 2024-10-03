export default function EditDataMenu({ children, model, isOpen }) {
    return (
        <div className={`absolute top-[60px] ${model === 'minimisation' ? 'right-0' : ''} ${!isOpen ? 'hidden' : ''}
            border border-[#D7DFFF] bg-white rounded-xl
            w-fit h-fit p-[6px]`}
        >
            <div className="flex flex-col space-y-6 w-max max-h-[400px] p-[10px] overflow-auto scrollbar-webkit">
                {children}
                <button className="py-4 bg-[#3561FE] rounded-xl">
                    <p className="text-white font-semibold">Save</p>
                </button>
            </div>
        </div>
    )
}