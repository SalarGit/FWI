export default function EditDataMenu({ children, model, isOpen }) {
    return (
        <div className={`absolute top-[60px] ${model === 'minimisation' ? 'right-0' : ''} ${!isOpen ? 'hidden' : ''}
            border border-[#D7DFFF] bg-white rounded-xl
            w-fit h-fit p-[6px]`} /* This 6px padding is removed from the inner div padding to keep the visual box the same padding. */
        >
            <div className="flex flex-col space-y-6 w-max max-h-[400px] p-[10px] overflow-auto scrollbar-webkit"
                // 568px bottom of page, 480px to bottom Calculated Output, 470px a bit above Calc Output
            >
                {/* min-w-max */}
                {children}
                <button className="py-4 bg-[#3561FE] rounded-xl">
                    <p className="text-white font-semibold">Save</p>
                </button>
            </div>
        </div>
    )
}



// <div className={`absolute top-[60px] ${model === 'minimisation' ? 'right-0' : ''} ${!isOpen ? 'hidden' : ''}
// flex flex-col space-y-6 p-4 w-max
// border border-[#D7DFFF] rounded-xl bg-white max-h-[400px] overflow-auto`}
// // 568px bottom of page, 480px to bottom Calculated Output, 470px a bit above Calc Output
// >
// {/* min-w-max */}
// {children}
// <button className="py-4 bg-[#3561FE] rounded-xl">
//     <p className="text-white font-semibold">Save</p>
// </button>
// </div>