import { useState } from 'react';

import EditButton from '../../buttons/EditButton';
import EditDataMenu from './EditDataMenu';

export default function EditDataDropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen((prev) => prev ? false : true);
    }
    
    return (
        <>
        </>
    )
}