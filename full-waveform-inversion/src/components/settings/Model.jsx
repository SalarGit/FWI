import infoSvg from '../../assets/info.svg';
import info from '../../assets/info.png';
import infoBlue from '../../assets/info-blue.png';
import infoBlueSvg from '../../assets/info-blue.svg';

import H2 from '../custom/headings/H2.jsx';
import ToolTip from './ToolTip.jsx';

export default function Model({ model, modelType }) {
    const heading = model + ' model:';

    // const infoIcon = 

    return (
        <div className="flex flex-col space-y-[34px]">
            <div className="flex space-x-3">
                <H2 heading={heading} styling='uppercase'/>
                {/* Group doesn't do anything? */}
                <div className="relative group flex flex-col items-center justify-center">
                    <img src={info} alt="info.png"/>
                    {/* <img src={infoBlueSvg} alt="info-blue.svg" 
                        className="absolute bg-blue-50 border border-[#D7DFFF] rounded-xl w-[34px] p-1"
                    /> */}
                    <ToolTip model={model} modelType ={modelType}/>
                </div>
            </div>
            <p className="text-lg font-medium">{modelType}</p>
        </div>
    )
}