export default function FileInputWithCustomButton({ handleZipChange }) {
    return (
        <label htmlFor="caseFolder" >
            <div className={`absolute right-2 top-2 cursor-pointer rounded bg-[#F1F4FF] font-generalSansMedium
                text-sm font-medium text-[#3561FE] py-[6px] px-3`}
            >
                <p>Select folder</p>
            </div>
            <input
                type="file"
                accept=".zip"
                id="caseFolder"
                name="caseFolder"
                className="peer hidden"
                onChange={handleZipChange}
            />
        </label>
    );
}