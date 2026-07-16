// Section 96 seed fixture. The search grid is declared in advance; no gate
// threshold or response row is fitted after seeing the result.

export const MOVING_PHASE_MATCHED_STACKED_RINGS_FIXTURE = Object.freeze({
  schema: "moving_phase_matched_stacked_rings_fixture.v0",
  fieldSpeed: 1,
  omega: 0.8,
  innerRadiusRatios: Object.freeze([0.7, 0.85]),
  outerRadiusRatios: Object.freeze([1.15, 1.3]),
  velocityGrid: Object.freeze([0.2, 0.5, 0.8]),
  spacingBranches: Object.freeze(["difference", "sum"]),
  cycleSamples: 3,
  derivativeCycleSamples: 2,
  rateCycleSamples: 2,
  delayWindow: 8,
  scanSubdivisions: 192,
  retainedSegmentCount: 96,
  soft: 0.02,
  tiltStep: 0.02,
  tiltRateStep: 0.02,
  bindingRelativeTolerance: 0.03,
  pumpTolerance: 0.02,
  phaseMatchAxialTolerance: 1e-7,
  marginalGrowthTolerance: 1e-6,
  flutterImaginaryTolerance: 1e-5,
});
