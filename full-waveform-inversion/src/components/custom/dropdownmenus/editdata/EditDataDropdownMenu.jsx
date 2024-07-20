import { useState } from 'react';

import EditButton from '../../buttons/EditButton';
import InputModelDataBlock from '../../data/inputmodeldata/InputModelDataBlock';
import EditDataMenu from './EditDataMenu';

export default function EditDataDropdownMenu({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen((prev) => prev ? false : true);
    }
    
    const dataObject = {One: "one", Two: "two", Three: "three", Four: "four"};

    return (
        <div className={``}>
            <EditButton title="Edit" absoluteStyling="right-10 top-2" handleClick={handleClick}
                conditionalStyling={isOpen ? 'border border-[#3561FE] py-[5px] px-[11px]' : 'py-[6px] px-3'}
            />
            <EditDataMenu isOpen={isOpen}>
                {children}
            </EditDataMenu>
            
            {/* {isOpen && 
                <EditDataMenu>
                    <InputModelDataBlock heading="Numbers" dataObject={dataObject} />                
                </EditDataMenu>
            } */}
        </div>
    )
}