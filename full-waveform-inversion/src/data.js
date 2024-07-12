// Forward Models

export const forwardModels = {
    finiteDifference: { },
    integral: {
        upper: {X: 0, Z: 0},
        lower: {R: 4, Beta: 6.31, CostFunction: "leastSquares", boundaryConditionType: "SecondOrderABC"}
    },
    evolution: {nChildrenPerGeneration: 100, nGeneration: 77, toleranceOver: "5e-05"}, // toleranceOver would be a number // forw or min?
}

// export const forwardModels = ['FiniteDifference', 'Integral']

// export const finiteDifference = {
// }
// export const integral = {
//     upper: {X: 0, Z: 0},
//     lower: {R: 4, Beta: 6.31, CostFunction: "leastSquares", boundaryConditionType: "SecondOrderABC"}
// }

// Minimisation Models
export const minimisationModels = {
    gradientDescent: { },
    conjugateGradient: {
        upper: {n: 10, Tolerance: "1e-06"}, // Tolerance would be a number
        lower: {Start: 100, Slope: 100, N_max: 50, Do_reg: "on"} // Do-reg input is a bool
    },
    // evolution: {nChildrenPerGeneration: 100, nGeneration: 77, toleranceOver: "5e-05"}, // toleranceOver would be a number
    random: {},
    particleSwarm: {},
    proportional: {}
}

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
