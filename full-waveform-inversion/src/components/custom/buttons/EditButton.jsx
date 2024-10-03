export default function EditButton({ title, absoluteStyling, conditionalStyling, handleClick }) {

    return (
        <button onClick={handleClick}
            className={`absolute ${absoluteStyling} rounded bg-[#F1F4FF]
            text-sm font-medium text-[#3561FE] ${conditionalStyling}`}
        >
            {title}
        </button>
    )
}