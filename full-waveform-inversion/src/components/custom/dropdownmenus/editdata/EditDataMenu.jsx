export default function EditDataMenu({ children }) {
    return (
        <div className="absolute left-[0px] right-[0px] top-[60px]
            flex flex-col space-y-[6px]
            border border-violet-200 rounded-xl bg-white"
        >
            {children}
        </div>
    )
}