export default function EditDataMenu({ children, isOpen }) {
    return (
        <div className={`absolute top-[60px] ${!isOpen ? 'hidden' : ''}
            flex flex-col space-y-6 p-4 w-max
            border border-violet-200 rounded-xl bg-white`}
        >
            {/* min-w-max */}
            {children}
            <button className="py-4 bg-[#3561FE] rounded-xl">
                <p className="text-white font-semibold">Save</p>
            </button>
        </div>
    )
}