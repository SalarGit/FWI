import infoSvg from '../../assets/info.svg';
import info from '../../assets/info.png';
import infoBlue from '../../assets/info-blue.png';
import infoBlueSvg from '../../assets/info-blue.svg';

import Title from '../custom/Title.jsx';
import ToolTip from './ToolTip.jsx';

export default function Model({ model, modelType }) {
    const title = model + ' model:';

    // const infoIcon = 

    return (
        <div className="flex flex-col space-y-[34px]">
            <div className="flex space-x-3">
                <Title title={title}/>
                <div className="relative group flex flex-col items-center justify-center">
                    <img src={info} alt="info.png" 
                    />
                    {/* <img src={infoBlueSvg} alt="info-blue.svg" 
                        className="absolute bg-blue-50 border border-violet-200 rounded-xl w-[34px] p-1"
                    /> */}
                    <ToolTip />
                </div>
            </div>
            <p className="text-lg font-medium">{modelType}</p>
        </div>
    )
}