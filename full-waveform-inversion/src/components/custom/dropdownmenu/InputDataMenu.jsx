export default function InputDataMenu({ children }) {
    return (
        <div className="absolute left-[0px] right-[0px] top-[60px]
            flex flex-col space-y-[6px] p-2
            border border-violet-200 rounded-xl bg-white"
        >
            {children}
        </div>
    )
}