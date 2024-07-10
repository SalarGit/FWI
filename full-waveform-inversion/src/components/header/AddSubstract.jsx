import add from '../../assets/add.svg';
import substract from '../../assets/substract.svg';
import bruh from '../../assets/dropdown.png';

export default function AddSubstract({ type, onClick }) {
    // const source = `../../assets/add.svg`;

    let icon;

    if (type === 'add') {
        icon = <img src={add} alt='add.svg' />
    } else if (type === 'substract') {
        icon = <img src={substract} alt='substract.svg' />
    }

    return (
        <button onClick={onClick}
            className='p-3 rounded-xl bg-[#F1F4FF]'
        >
            {/* {icon} */}
            <img src="src/assets/add.svg" alt={`${type}.svg`} />
            {/* <img src={bruh} alt={`${type}.svg`} /> */}
            {/* {source} */}
        </button>
    )
}


    