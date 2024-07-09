import add from '../../assets/plus24px.svg';
import substract from '../../assets/minus.svg';

export default function AddSubstract({ type, onClick }) {

    let icon;

    if (type === 'ADD') {
        icon = <img src={add} alt='plus24px.svg' />
    } else if (type === 'SUBSTRACT') {
        icon = <img src={substract} alt='minus.svg' />
    }

    return (
        <button onClick={onClick}
            className='p-3 rounded-xl bg-[#F1F4FF]'
        >
            {icon}
        </button>
    )
}