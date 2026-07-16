// Section 92 fixture: declared geometry and gate tolerances for the
// contra-rotating pro/anti pair instrument.  These are seed inputs, not a
// retained-history release or an accepted branch certificate.

export const CONTRA_ROTATING_PAIR_FIXTURE = Object.freeze({
  schema: "contra_rotating_pro_anti_pair_fixture.v0",
  singlePumpTarget: 0.42403002923413363,
  singleFlutterGrowthTarget: 0.19885688497216406,
  singleFlutterFrequencyTarget: 2.41245971901678,
  pumpTolerance: 1e-12,
  marginalGrowthTolerance: 1e-8,
  lockResidualTolerance: 1e-6,
  primaryAnsatz: Object.freeze({
    geometryClass: "axially_stacked_coaxial",
    sharedAxis: Object.freeze([0, 0, 1]),
    axialSeparationInMiddleRadiusUnits: 1,
    relativePhaseRad: Math.PI,
    proRotationSense: 1,
    antiRotationSense: -1,
    polarityRelation: "sitewise_polarity_conjugate",
  }),
  comparisonAnsatz: Object.freeze({
    geometryClass: "coincident_coaxial",
    sharedAxis: Object.freeze([0, 0, 1]),
    axialSeparationInMiddleRadiusUnits: 0,
    relativePhaseRad: Math.PI,
    proRotationSense: 1,
    antiRotationSense: -1,
    polarityRelation: "sitewise_polarity_conjugate",
  }),
  lockingScan: Object.freeze([
    Object.freeze({ stiffness: 0, damping: 0 }),
    Object.freeze({ stiffness: 0.01, damping: 0.001 }),
    Object.freeze({ stiffness: 0.1, damping: 0.001 }),
    Object.freeze({ stiffness: 1, damping: 0.001 }),
    Object.freeze({ stiffness: 10, damping: 0.001 }),
    Object.freeze({ stiffness: 100, damping: 0.001 }),
  ]),
});
