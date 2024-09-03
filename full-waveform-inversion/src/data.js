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


export const forwardModelsNIKITA = {
    finiteDifference: {
        PMLWidthFactor: {
            x: ['number', 0], 
            z: ['number', 0]
        },
        SourceParameter: {
            r: ['number', 4], 
            beta: ['number', 6.31], 
        },
        boundaryConditionType: ['text', "SecondOrderABC"]
    },
    integral: {
        Iter2: {
            n: ['number', 100],
            tolerance: ['number', '1e-08'], 
            calcAlpha: ['bool', true],
        }
    },
}

export const minimisationModelsNIKITA = {
    gradientDescent: {
        gamma0: ['number', 0.1],
        x0: ['number', 0.001],
        iterations: ['number', 100],
        tolerance: ['number', 0.000001], 
        stepSize: ['text', 'BarzilaiBorwein'] // or 'Proportional'
    },
    conjugateGradient: {
        upper: {
            tolerance: ['number', 0.000001], 
            maxIterations: ['number', 50],
            
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


export const tableHeaders = [
    // "Select",
    "Run name" ,
    "Grid size",
    "Forward model",
    "Minimisation model",
    "Threads",
    "Case folder"
]


export const tableDataWithModelParameters = [
    ["Data Analysis Run - 01-03-2023", "62 x 32", "Evolution", "Integral", "1", "/default", {}, {}],
    ["Data Quality Assessment - 05-03-2023", "62 x 32", "FiniteDifferenceMPI", "Proportional", "1", "/default", {}, {}],
    ["Velocity Model Assessment - 10-04-2023", "62 x 32", "Random", "FiniteDifferenceMPI", "1", "/default", {}, {}],
    ["Seismic Metrics Calculation - 15-04-2023", "62 x 32", "ConjugateGradient", "FiniteDifference", "1", "/default", {}, {}],
]

export const tableData = [
    ["Data Analysis Run - 01-03-2023", "62 x 32", "Evolution", "Integral", "1", "/default"],
    ["Data Quality Assessment - 05-03-2023", "62 x 32", "FiniteDifferenceMPI", "Proportional", "1", "/default"],
    ["Velocity Model Assessment - 10-04-2023", "62 x 32", "Random", "FiniteDifferenceMPI", "1", "/default"],
    ["Seismic Metrics Calculation - 15-04-2023", "62 x 32", "ConjugateGradient", "FiniteDifference", "1", "/default"],
    ["Quality Assessment Analysis - 17-04-2023", "62 x 32", "Evolution", "Integral", "1", "/default"],
    ["Parameter Optimization - 25-07-2023", "62 x 32", "GradientDescent", "FiniteDifferenceOpenMP", "1", "/default"],
    ["Tomographic Model Generation - 18-08-2023", "62 x 32", "Evolution", "Integral", "1", "/default"],
    ["Seismic Data Analysis - 19-09-2023", "62 x 32", "ParticleSwarm", "Integral", "1", "/default"],
    ["Geophysical Survey - 12-02-2023", "58 x 40", "Wavelet", "FourierTransform", "2", "/project/survey"],
    ["Subsurface Mapping - 28-05-2023", "45 x 37", "ConjugateGradient", "SpectralElement", "3", "/project/mapping"],
    ["Seismic Reflection Analysis - 09-06-2023", "64 x 29", "RandomForest", "FiniteElement", "1", "/project/seismic"],
    ["Reservoir Simulation - 14-07-2023", "50 x 50", "MonteCarlo", "FiniteVolume", "4", "/project/reservoir"],
    ["Earthquake Prediction Model - 22-08-2023", "72 x 34", "NeuralNetwork", "SpectralMethod", "1", "/project/earthquake"],
    ["Well Log Interpretation - 05-09-2023", "60 x 42", "GradientBoosting", "FiniteDifference", "2", "/project/well_log"],
    ["Fracture Analysis - 17-10-2023", "68 x 36", "SupportVectorMachine", "BoundaryElement", "3", "/project/fracture"],
    ["Geomechanical Study - 25-11-2023", "55 x 33", "BayesianInference", "LatticeBoltzmann", "1", "/project/geomechanics"],
    ["Geophysical Survey - 12-02-2023", "58 x 40", "Wavelet", "FourierTransform", "2", "/project/survey"],
    ["Subsurface Mapping - 28-05-2023", "45 x 37", "ConjugateGradient", "SpectralElement", "3", "/project/mapping"],
    ["Seismic Reflection Analysis - 09-06-2023", "64 x 29", "RandomForest", "FiniteElement", "1", "/project/seismic"],
    ["Reservoir Simulation - 14-07-2023", "50 x 50", "MonteCarlo", "FiniteVolume", "4", "/project/reservoir"],
    ["Earthquake Prediction Model - 22-08-2023", "72 x 34", "NeuralNetwork", "SpectralMethod", "1", "/project/earthquake"],
    ["Well Log Interpretation - 05-09-2023", "60 x 42", "GradientBoosting", "FiniteDifference", "2", "/project/well_log"],
    ["Fracture Analysis - 17-10-2023", "68 x 36", "SupportVectorMachine", "BoundaryElement", "3", "/project/fracture"],
    ["Geomechanical Study - 25-11-2023", "55 x 33", "BayesianInference", "LatticeBoltzmann", "1", "/project/geomechanics"],
    ["Petrophysical Modeling - 03-03-2023", "62 x 35", "Kriging", "FiniteElement", "2", "/project/petrophysics"],
    ["Hydrocarbon Detection - 18-04-2023", "57 x 30", "LogisticRegression", "BoundaryElement", "3", "/project/hydrocarbon"],
    ["Sediment Transport Analysis - 27-07-2023", "49 x 39", "DecisionTree", "SpectralElement", "1", "/project/sediment"],
    ["Fluid Flow Simulation - 19-08-2023", "66 x 28", "GeneticAlgorithm", "LatticeBoltzmann", "4", "/project/fluid_flow"],
    ["Crustal Deformation Monitoring - 04-09-2023", "52 x 44", "PrincipalComponentAnalysis", "FiniteDifference", "2", "/project/crustal"],
    ["Subduction Zone Analysis - 23-10-2023", "69 x 31", "GaussianProcess", "SpectralMethod", "1", "/project/subduction"],
    ["Basin Modeling - 02-11-2023", "61 x 38", "GradientDescent", "FiniteVolume", "3", "/project/basin"],
    ["Lithology Prediction - 14-12-2023", "53 x 41", "AdaBoost", "BoundaryElement", "1", "/project/lithology"],
]

export const runs = {
    'Run 1': true,
    'Run 2': false,
    'Run 3': false,
    'Run 4': false,
}

export const calculatedOutputTypes = [
    'Output values',
    'Residual graph',
    'Residual field',
    'Quality metrics'
]

export const historyOutputTypes = [
    'Overview',
    'Residual graph',
    'Residual field',
    'Quality metrics'
]