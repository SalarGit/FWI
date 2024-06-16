import check from '../../assets/check.svg';

export default function Process({ processType }) {
    return (
        <div className="flex items-center space-x-2 py-3 px-4
            bg-blue-50 rounded-full text-blue-600"
        >
            <img src={check} alt="check.svg" />
            <p>{processType}</p>
        </div>
    )
}