export default function EditDataMenu({ children, model, isOpen }) {
    return (
        <div className={`absolute top-[60px] ${model === 'minimisation' ? 'right-0' : ''} ${!isOpen ? 'hidden' : ''}
            flex flex-col space-y-6 p-4 w-max
            border border-[#D7DFFF] rounded-xl bg-white max-h-[400px] overflow-auto`}
            // 568px bottom of page, 480px to bottom Calculated Output, 470px a bit above Calc Output
        >
            {/* min-w-max */}
            {children}
            <button className="py-4 bg-[#3561FE] rounded-xl">
                <p className="text-white font-semibold">Save</p>
            </button>
        </div>
    )
}