import Data from "./data/Data.jsx";
import DataBlock from "./data/DataBlock.jsx";

export default function ToolTip({ model, modelType }) {
    let toolTip = null;

    if (model === "minimisation") {
        if (modelType === "ConjugateGradient") {
            const conjugateGradientFirst = {n: 10, Tolerance: "1e-06"}; // Tolerance would be a number
            const conjugateGradientSecond = {Start: 100, Slope: 100, N_max: 50, Do_reg: "on"};
            
            toolTip = (
                <div className="flex flex-col space-y-4">
                    <DataBlock heading={"Iteration 1"} dataObject={conjugateGradientFirst} />
                    <div className="border-t border-violet-200" />
                    <DataBlock heading={"DeltaAmplification"} dataObject={conjugateGradientSecond} />
                </div>
            )
        }
        else if (modelType === "GradientDescent") {}
        else if (modelType === "Evolution") {}
        else if (modelType === "Random") {}
        else if (modelType === "ParticleSwarm") {}
        else if (modelType === "Proportional") {}
    }

    else if (model === "forward") {
        if (modelType === "Evolution") {
            const evolution = {nChildrenPerGeneration: 100, nGeneration: 77, toleranceOver: "5e-05"}; // toleranceOver would be a number

            toolTip = (
                <DataBlock heading="" dataObject={evolution}/> 
            );
        }
        else if (modelType === "Integral") {
            const integralFirst = {X: 0, Z: 0};
            const integralSecond = {R: 4, Beta: 6.31, CostFunction: "leastSquares", boundaryConditionType: "SecondOrderABC"};

            toolTip = (
                <div className="flex flex-col space-y-4">
                    <DataBlock heading="PMLWidthFactor" dataObject={integralFirst} />
                    <div className="border-t border-violet-200" />
                    <DataBlock heading="SourceParameter" dataObject={integralSecond} />
                </div>
            );
        }
        else if (modelType === "finiteDifference") {}
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