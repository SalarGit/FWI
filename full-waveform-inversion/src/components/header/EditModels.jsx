import { useState } from "react";

import { forwardModels, minimisationModels } from "../../data.js";

import EditDataMenu from "../custom/dropdownmenus/editdata/EditDataMenu.jsx";
import EditButton from "../custom/buttons/EditButton.jsx";
import InputModelDataBlock from "../custom/data/inputmodeldata/InputModelDataBlock.jsx";
import Border from "../custom/Border.jsx";


export default function EditModels({ model, modelType }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen((prev) => prev ? false : true);
    }

    let editMenu = null;

    if (model === 'forward') {
        if (modelType === 'FiniteDifference') {
            <div>
                bruh
            </div>
        }
        else if (modelType === 'Integral') {
            editMenu =
            <EditDataMenu isOpen={isOpen}>
                <InputModelDataBlock heading="PMLWidthFactor" dataObject={forwardModels.integral.upper}/>
                <Border/>
                <InputModelDataBlock heading="SourceParameter" dataObject={forwardModels.integral.lower}/>
            </EditDataMenu>
        }
    }

    if (model === "minimisation") {
        if (modelType === "ConjugateGradient") {
            // const conjugateGradientFirst = {n: 10, Tolerance: "1e-06"}; // Tolerance would be a number
            // const conjugateGradientSecond = {Start: 100, Slope: 100, N_max: 50, Do_reg: "on"};
            
            editMenu = (
                <div>

                </div>
            )
        }
        else if (modelType === "Evolution") {}
        else if (modelType === "GradientDescent") {}
        else if (modelType === "ParticleSwarm") {}
        else if (modelType === "Random") {}
        // else if (modelType === "Proportional") {}
    }
    // ;
    const obj1 = {x: 0, z: 0};
    const obj2 = {r: 4, beta: 6.31, boundaryConditionType: "SecondOrderABC"};
    const bruh = <EditDataMenu isOpen={isOpen}>
        <InputModelDataBlock heading="PMLWidthFactor" dataObject={obj1}/>
        <Border/>
        <InputModelDataBlock heading="SourceParameter" dataObject={obj2}/>
    </EditDataMenu>

    return (
        <div>
            <EditButton title="Edit" absoluteStyling="right-10 top-2" handleClick={handleClick}
                conditionalStyling={isOpen ? 'border border-[#3561FE] py-[5px] px-[11px]' : 'py-[6px] px-3'}
            />
            {/* <EditDataMenu isOpen={isOpen}> */}
                {bruh}
            {/* </EditDataMenu> */}
        </div>
    )
}