import { forwardModels, minimisationModels } from "../../data.js"; // This is not correct, because these are the default data. They can be changed in tooltip using Context.

import ModelDataBlock from "../custom/data/modeldata/ModelDataBlock.jsx";
import Border from "../custom/Border.jsx";

export default function ToolTip({ model, modelType }) {
    let toolTip = null;

    if (model === "minimisation") {
        if (modelType === "ConjugateGradient") {
            toolTip = (
                <div className="flex flex-col space-y-4">
                    <ModelDataBlock dataObject={minimisationModels.conjugateGradient.upper} />
                    <Border/>
                    <ModelDataBlock heading={"stepAmplification"} dataObject={minimisationModels.conjugateGradient.lower} />
                </div>
            )
        }
        else if (modelType === "Evolution") {
            toolTip = <ModelDataBlock heading={"stepAmplification"} dataObject={minimisationModels.evolution} />
        }
        else if (modelType === "GradientDescent") {
            toolTip = <ModelDataBlock heading={"stepAmplification"} dataObject={minimisationModels.gradientDescent} />
        }
        else if (modelType === "ParticleSwarm") {
            toolTip = <ModelDataBlock heading={"stepAmplification"} dataObject={minimisationModels.particleSwarm} />
        }
        else if (modelType === "Random") {
            toolTip = <ModelDataBlock heading={"stepAmplification"} dataObject={minimisationModels.random} />
        }
    }

    else if (model === "forward") {
        if (modelType === "FiniteDifference") {
            toolTip = (
                <div className="flex flex-col space-y-4">
                    <ModelDataBlock heading="PMLWidthFactor" dataObject={forwardModels.finiteDifference.upper} />
                    <Border/>
                    <ModelDataBlock heading="SourceParameter" dataObject={forwardModels.finiteDifference.lower} />
                </div>
            );
        }
        else if (modelType === "Integral") {
            toolTip = (
                <ModelDataBlock dataObject={forwardModels.integral}/> 
            );
        }
    }
    // 
    return (
        // Tooltip container
        // w-max
        // z-10
        <div className="absolute w-max top-[33px] p-4 z-10
            bg-white rounded-2xl border border-violet-200 shadow
            hidden group-hover:block"
        >
            {toolTip}
        </div>
    )
}