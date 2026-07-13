// Section 95 seed fixture. These are declared numerical-resolution and gate
// inputs, not fitted forces or release parameters.

export const DRESSED_CONTRA_ROTATING_ELECTRON_FIXTURE = Object.freeze({
  schema: "dressed_contra_rotating_electron_fixture.v0",
  cycleSamples: 3,
  derivativeCycleSamples: 1,
  rateCycleSamples: 1,
  delayWindow: 7,
  scanSubdivisions: 256,
  retainedSegmentCount: 72,
  soft: 0.02,
  payloadRelaxIterations: 5,
  payloadParameterStep: 0.025,
  lockPhaseStep: 0.02,
  lockSeparationStep: 0.02,
  staticTiltStep: 0.025,
  tiltRateStep: 0.02,
  payloadForceTolerance: 0.05,
  payloadHessianTolerance: 1e-5,
  pumpTolerance: 0.02,
  forceTolerance: 0.02,
  marginalGrowthTolerance: 1e-6,
  spectrumRootResidualTolerance: 1e-3,
  collisionFloor: 0.04,
  columnSeed: Object.freeze([0.08, 0.2, 0.36]),
  ringSeed: Object.freeze({ radius: 0.28, halfSplit: 0.16, phaseOffset: Math.PI / 3 }),
});
