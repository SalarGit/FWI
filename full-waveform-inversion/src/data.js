// Forward Models

export const forwardModels = {
    finiteDifference: {
        upper: {
            x: ['number', 0], 
            z: ['number', 0]
        },
        lower: {
            r: ['number', 4], 
            beta: ['number', 6.31], 
            boundaryConditionType: ['string', "SecondOrderABC"]
        }
    },
    integral: {
        n: ['number', 100], 
        tolerance: ['number', '1e-08'], 
        calcAlpha: ['bool', 'true'],
        fftCalculatorMethod: ['string', 'Radix2'], 
        CostFunction: ['string', 'leastSquares']
    },
}

// export const forwardModels = ['FiniteDifference', 'Integral']

// export const finiteDifference = {
// }
// export const integral = {
//     upper: {X: 0, Z: 0},
//     lower: {R: 4, Beta: 6.31, CostFunction: "leastSquares", boundaryConditionType: "SecondOrderABC"}
// }

// Minimisation Models
// export const minimisationModels = {
//     conjugateGradient: {
//         upper: {tolerance: "1e-06", maxIterations: 50}, // no heading
//         lower: {method: "DeltaAmplification", fixedAmplification: 50, deltaAmplificationStart: 100, deltaAmplificationSlope: 1} // stepAmplification
//         // upper: {n: 10, Tolerance: "1e-06"}, // Tolerance would be a number
//         // lower: {Start: 100, Slope: 100, N_max: 50, Do_reg: "on"} // Do-reg input is a bool
//     },
//     evolution: {wavefieldCalculationPeriod: 1, nChildrenPerGeneration: 100, maxIterations: 385, tolerance: 0.0001, lowerBoundChi: -0.25, upperBoundChi: 0.25, minimumMutationRate: 0.01, maxMutationRate: 0.5, maxStagnation: 5, crossoverMethod: "FirstParentBias", mutationRateMultiplier: 1.2, mutationRateDivider: 1.1, nGeneration: 77}, // no heading
//     gradientDescent: {wavefieldCalculationPeriod: 1, gamma0: 0.1, x0: 0.001, maxIterations: 100, tolerance: "1e-06", stepSizeMethod: "Proportional"},
//     particleSwarm: {wavefieldCalculationPeriod: 1, tolerance: 0.0001, maxIterations: 1000, nParticles: 50, c1: 2, c2: 3, alpha: 1, dt: 1, xMin: 0, xMax: 0.2, startWeight: 1.8, eindWeight: 0.4, beta: 0.999, k: 0.5, crazyFactor: 0.2},
//     random: {wavefieldCalculationPeriod: 1, maxIterations: 10000, tolerance: "5e-05", stepSize: 0.1, gain: 0.4, alpha: 0.9, initTemperature: 0.01, enableSA: false, coolingFunction: "geometric"},
//     // proportional: {}
// }

export const minimisationModels = {
    conjugateGradient: {
        upper: {
            tolerance: ['number', "1e-06"], 
            maxIterations: ['number', 50]
        },
        lower: {
            method: ['string', "DeltaAmplification"], 
            fixedAmplification: ['number', 50], 
            deltaAmplificationStart: ['number', 100], 
            deltaAmplificationSlope: ['number', 1]
        }
    },
    evolution: {
        wavefieldCalculationPeriod: ['number', 1], 
        nChildrenPerGeneration: ['number', 100], 
        maxIterations: ['number', 385], 
        tolerance: ['number', 0.0001], 
        lowerBoundChi: ['number', -0.25], 
        upperBoundChi: ['number', 0.25], 
        minimumMutationRate: ['number', 0.01], 
        maxMutationRate: ['number', 0.5], 
        maxStagnation: ['number', 5], 
        crossoverMethod: ['string', "FirstParentBias"],
        mutationRateMultiplier: ['number', 1.2],
        mutationRateDivider: ['number', 1.1],
        nGeneration: ['number', 77]
    },
    gradientDescent: {
        wavefieldCalculationPeriod: ['number', 1], 
        gamma0: ['number', 0.1], 
        x0: ['number', 0.001], 
        maxIterations: ['number', 100], 
        tolerance: ['number', "1e-06"], 
        stepSizeMethod: ['string', "Proportional"]
    },
    particleSwarm: {
        wavefieldCalculationPeriod: ['number', 1], 
        tolerance: ['number', 0.0001], 
        maxIterations: ['number', 1000], 
        nParticles: ['number', 50], 
        c1: ['number', 2], 
        c2: ['number', 3], 
        alpha: ['number', 1], 
        dt: ['number', 1], 
        xMin: ['number', 0], 
        xMax: ['number', 0.2], 
        startWeight: ['number', 1.8], 
        eindWeight: ['number', 0.4], 
        beta: ['number', 0.999], 
        k: ['number', 0.5], 
        crazyFactor: ['number', 0.2]
    },
    random: {
        wavefieldCalculationPeriod: ['number', 1], 
        maxIterations: ['number', 10000], 
        tolerance: ['number', "5e-05"], 
        stepSize: ['number', 0.1], 
        gain: ['number', 0.4], 
        alpha: ['number', 0.9], 
        initTemperature: ['number', 0.01], 
        enableSA: ['bool', 'false'], 
        coolingFunction: ['string', "geometric"]
    }
};

// export const minimisationModels = ['gradientDescent', 'conjugateGradient', 'evolution', 'Integral', 'random', 'particleSwarm', 'proportional']

// export const gradientDescent = {
    
// }
// export const conjugateGradient = {
//     upper: {n: 10, Tolerance: "1e-06"}, // Tolerance would be a number
//     lower: {Start: 100, Slope: 100, N_max: 50, Do_reg: "on"} // Do-reg input is a bool
// }
// export const evolution = {nChildrenPerGeneration: 100, nGeneration: 77, toleranceOver: "5e-05"} // toleranceOver would be a number
// export const random = {
    
// }
// export const particleSwarm = {
    
// }
// export const proportional = {
    
// }
