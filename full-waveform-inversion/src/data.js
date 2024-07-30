export const forwardModels = {
    finiteDifference: {
        upper: {
            x: ['number', 0], 
            z: ['number', 0]
        },
        lower: {
            r: ['number', 4], 
            beta: ['number', 6.31], 
            boundaryConditionType: ['text', "SecondOrderABC"]
        }
    },
    integral: {
        n: ['number', 100], 
        tolerance: ['number', '1e-08'], 
        calcAlpha: ['bool', true],
        fftCalculatorMethod: ['text', 'Radix2'], 
        CostFunction: ['text', 'leastSquares']
    },
}

export const minimisationModels = {
    conjugateGradient: {
        upper: {
            tolerance: ['number', "1e-06"], 
            maxIterations: ['number', 50]
        },
        lower: {
            method: ['text', "DeltaAmplification"], 
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
        crossoverMethod: ['text', "FirstParentBias"],
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
        stepSizeMethod: ['text', "Proportional"]
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
        enableSA: ['bool', false], 
        coolingFunction: ['text', "geometric"]
    }
};
