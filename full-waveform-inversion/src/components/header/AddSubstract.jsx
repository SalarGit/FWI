export default function AddSubstract({ type, handleThreads, isDisabled }) {
    return (
        <button disabled={isDisabled} onClick={handleThreads}
            className={`p-3 rounded-xl bg-[#F1F4FF] ${isDisabled && 'opacity-60 cursor-not-allowed'}`}
        >
            <img src={`src/assets/${type}.svg`} alt={`${type}.svg`} />
        </button>
    )
}