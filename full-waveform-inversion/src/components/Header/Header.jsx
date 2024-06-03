import logo from '../../assets/FWI_Logo.png';
import './Header.css';

import Button from '../Button/Button.jsx';

export default function Header() {
    return (
        <div className='header'>
            <img className='logo' src={logo} alt='FWI_Logo.png'/>
            <p className='text'>Full Waveform Inversion</p>
            {/* <Button style='margin-right: 16px'/> */}
            {/* <Button /> */}
            <Button />
        </div>
    )
}