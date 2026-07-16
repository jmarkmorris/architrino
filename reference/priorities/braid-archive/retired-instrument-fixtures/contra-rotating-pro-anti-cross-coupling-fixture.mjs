// Section 93 seed fixture.  The geometry grid and derivative steps are
// declared inputs, not fitted locking forces or release parameters.

export const CONTRA_ROTATING_CROSS_COUPLING_FIXTURE = Object.freeze({
  schema: "contra_rotating_pro_anti_cross_coupling_fixture.v0",
  separationGrid: Object.freeze([0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3]),
  phaseGrid: Object.freeze(Array.from({ length: 12 }, (_, i) => (2 * Math.PI * i) / 12)),
  cycleSamples: 4,
  derivativeCycleSamples: 3,
  rateCycleSamples: 2,
  delayWindow: 7,
  scanSubdivisions: 384,
  soft: 0.02,
  staticTiltStep: 0.025,
  tiltRateStep: 0.02,
  retainedSegmentCount: 96,
  pumpTolerance: 0.02,
  forceTolerance: 0.02,
  marginalGrowthTolerance: 1e-6,
  collisionFloor: 0.05,
});
