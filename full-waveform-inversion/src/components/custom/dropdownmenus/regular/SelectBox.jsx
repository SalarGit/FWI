import dropdown from "../../../../assets/dropdown.png";

export default function SelectBox({ isOpen, onOpenClose, selectedItem }) {
    const dropDownIcon = !isOpen ? <img src={dropdown} alt="dropdown.png" className=" duration-500" /> : <img src={dropdown} alt="dropdown.png" className="rotate-180 duration-500" />
    return (
        <button onClick={onOpenClose}
            className="flex items-center justify-between
            w-full h-[48px] pl-4 pr-2
            border border-[#D7DFFF] rounded-xl
            font-switzerRegular"
        >
            <p>{selectedItem}</p>
            {dropDownIcon}
        </button>
    )
}