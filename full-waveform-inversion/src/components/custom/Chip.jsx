import check from "../../assets/check.svg";
import plus from "../../assets/plus.svg";

export default function Chip({ selected, handleProcess, title, disabled=false }) {
    const styling = !selected ? 
        "flex items-center justify-center h-12 space-x-2 py-[11px] px-[15px] bg-[white] border border-[#D7DFFF] rounded-full text-[#3561FE] font-switzerRegular" 
    : 
        "flex items-center space-x-2 py-3 px-4 bg-[#F1F4FF] rounded-full text-[#3561FE] text-base font-switzerRegular";
    const icon = !selected ? plus : check;

    return (
        <>
            {disabled ?
                <div className="flex items-center space-x-2 py-3 px-4 bg-[#F1F4FF] rounded-full text-[#3561FE] text-base font-switzerRegular">
                    <img src={check} alt="check.png" />
                    <p>{title}</p>
                </div>
            :
                <button onClick={(e) => handleProcess(title)} className={styling}>
                    <img src={icon} alt="plus.png" />
                    <p>{title}</p>
                </button>
            }
        </>
    )
}