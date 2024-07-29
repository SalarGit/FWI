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
            editMenu = 
            <>
                <InputModelDataBlock heading="PMLWidthFactor" dataObject={forwardModels.finiteDifference.upper} />
                <Border/>
                <InputModelDataBlock heading="SourceParameter" dataObject={forwardModels.finiteDifference.lower} />
            </>
        }
        else if (modelType === 'Integral') {
            editMenu = <InputModelDataBlock dataObject={forwardModels.integral}/>
        }
    }

    if (model === "minimisation") {
        if (modelType === "ConjugateGradient") {
            // const conjugateGradientFirst = {n: 10, Tolerance: "1e-06"}; // Tolerance would be a number
            // const conjugateGradientSecond = {Start: 100, Slope: 100, N_max: 50, Do_reg: "on"};
            
            editMenu = (
                <>
                    <InputModelDataBlock dataObject={minimisationModels.conjugateGradient.upper} />
                    <Border/>
                    <InputModelDataBlock heading={"stepAmplification"} dataObject={minimisationModels.conjugateGradient.lower} />
                </>
            )
        }
        else if (modelType === "Evolution") {
            editMenu = <InputModelDataBlock dataObject={minimisationModels.evolution}/>
        }
        else if (modelType === "GradientDescent") {
            editMenu = <InputModelDataBlock dataObject={minimisationModels.gradientDescent}/>
        }
        else if (modelType === "ParticleSwarm") {
            editMenu = <InputModelDataBlock dataObject={minimisationModels.particleSwarm}/>
        }
        else if (modelType === "Random") {
            editMenu = <InputModelDataBlock dataObject={minimisationModels.random}/>
        }
        // else if (modelType === "Proportional") {}
    }

    return (
        <div>
            <EditButton title="Edit" absoluteStyling="right-10 top-2" handleClick={handleClick}
                conditionalStyling={isOpen ? 'border border-[#3561FE] py-[5px] px-[11px]' : 'py-[6px] px-3'}
            />
            <EditDataMenu model={model} isOpen={isOpen}>
                {editMenu}
            </EditDataMenu>
        </div>
    )
}