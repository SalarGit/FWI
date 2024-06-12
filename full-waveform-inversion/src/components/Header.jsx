// import '../App.css'
import '../index.css'
import logo from '../assets/fwi-logo.png'

export default function Header() {
    return (
        // Header Container
        // fix 120px
        <div className='flex items-center justify-between min-w-screen min-h-[120px]'
        >
            {/* Logo & Title Container */}
            <div className='flex items-center'>
            {/* Logo */}
            <img src={logo} alt="fwi_logo.png"
                className="w-11 h-11" 
            />

            {/* Title */}
            {/* Fix text-5xl to 48px->44px. Fix 'general sans variable' font. */}
            <p className='ml-6 text-[44px] font-semibold'>Full Waveform Inversion</p>
            </div>

            {/* Buttons Container*/}
            <div className='flex space-x-4'>
                <button className='w-[200px] h-[56px]
                    border-2 rounded-xl border-gray-400 text-gray-400'
                >
                    Compare runs
                </button>
                <button className='w-[200px] h-[56px]
                    rounded-xl bg-blue-600 text-white'
                >
                    Add new run
                </button>
            </div>
        </div>
    )
}