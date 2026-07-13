import { SELF_EQUILIBRATED_V5 } from "./spindle-support-ratio-targeted-search.mjs";

const TAU = 2 * Math.PI;
const g = SELF_EQUILIBRATED_V5.geo;

function ring(id, radius, omega, tilt, z, phase, sense = 1, polarity = 1) {
  return { id, radius, omega, tilt, z, phase, sense, polarity, chargeCount: 2 };
}

export const FULL_DOF_STACKED_TILTED_FIXTURE = Object.freeze({
  schema: "full_dof_stacked_tilted_braid_fixture.v0",
  fieldSpeed: 1,
  soft: 0.02,
  delayWindow: 8,
  scanSubdivisions: 160,
  retainedSegmentCount: 80,
  cycleSamples: 3,
  derivativeCycleSamples: 2,
  rateCycleSamples: 2,
  tiltStep: 0.02,
  tiltRateStep: 0.02,
  minimumSelfDelay: 1e-5,
  gates: Object.freeze({ bindResidual: 0.03, pump: 0.02, leadingGrowth: 1e-6 }),
  objectiveWeights: Object.freeze({ pump: 1, flutter: 1, lock: 1 }),
  generalizedPencilKnownAnswers: Object.freeze({
    spindle: Object.freeze({ leadingRe: 0.6692818598559378, flutterLeadingRe: 0.16020715030586702, unstableCount: 8 }),
    flat: Object.freeze({ leadingRe: 1.9851829825890848, flutterLeadingRe: 0.5847274223758064, unstableCount: 5 }),
  }),
  flatControl: Object.freeze({
    id: "section_96_flat_stack_control",
    drift: 0.48046875,
    rings: Object.freeze([
      ring("M", 1.25, 0.8, 0, 1.17864990234375, 0, 1, 1),
      ring("I", 0.9951171875, 0.8, 0, 0.09994125366210938, 1.345498903589793, 1, 1),
      ring("O", 1.8740234375, 0.8, 0, -1.2785911560058594, 2.191779057179586, 1, 1),
    ]),
    payload: Object.freeze({ type: "none" }),
    sea: Object.freeze({ enabled: false }),
    includeSelfHits: false,
    controlFamily: "section_96",
  }),
  spindleControl: Object.freeze({
    id: "tilted_spindle_control",
    drift: 0,
    rings: Object.freeze([
      ring("I", g.qI, 1 / Math.cos(g.alphaM), g.alphaI, 0, g.thetaI, 1, 1),
      ring("M", 1, 1 / Math.cos(g.alphaM), g.alphaM, 0, TAU / 3, 1, 1),
      ring("O", g.qO, 1 / Math.cos(g.alphaM), g.alphaO, 0, g.thetaO, 1, 1),
    ]),
    payload: Object.freeze({ type: "none" }),
    sea: Object.freeze({ enabled: false }),
    includeSelfHits: false,
    delayWindow: 2.5,
    couplingFit: "full_representative",
    controlFamily: "tilted_spindle",
  }),
  search: Object.freeze({
    frequencyMultipliers: Object.freeze([0.75, 1, 1.25]),
    phaseOffsets: Object.freeze([-Math.PI / 3, -Math.PI / 6, 0, Math.PI / 6, Math.PI / 3]),
    tiltFractions: Object.freeze([0, 0.25, 0.5, 0.75, 1]),
    supraSpeedRatios: Object.freeze([1.05, 1.2]),
    localPasses: 2,
    randomRestarts: 12,
    shortlistSize: 3,
  }),
  section98: Object.freeze({
    optimizerSeed: 0x98c0de,
    optimizerBranches: 24,
    nelderMeadIterations: 8,
    convergenceSamples: Object.freeze([3, 6, 12, 24]),
    radiusRange: Object.freeze([0.35, 2.2]),
    axialRange: Object.freeze([-2.5, 2.5]),
    omegaRange: Object.freeze([0.35, 2.5]),
    phaseRange: Object.freeze([-Math.PI, Math.PI]),
    tiltRange: Object.freeze([-1.4, 1.4]),
    randomSeed: 0x98f00d,
    randomPoints: 100,
    noTiltRandomSeed: 0x9801000,
    noTiltRandomPoints: 1000,
    noTiltRandomKnownAnswers: Object.freeze({
      distribution: Object.freeze({ bind: 0, flutterFree: 0, pumpFree: 85, jointlyBindPumpFlutter: 0, finiteSpectrumScores: 990, failClosedNonfiniteSpectrumScores: 10 }),
      bestBinding: Object.freeze({ index: 962, coupling: -0.4465255982419074, residual: 0.016379421543064848 }),
      bestFlutter: Object.freeze({ index: 852, leadingRe: 0.00021938104484858938 }),
      bestPump: Object.freeze({ index: 150, absoluteTorque: 0.00001601508771040592 }),
      bestJoint: Object.freeze({ index: 285, objective: 0.4521642955225011 }),
    }),
    randomRanges: Object.freeze({
      radius: Object.freeze([0.35, 2.2]), omega: Object.freeze([0.3, 2.8]), tilt: Object.freeze([-1.4, 1.4]),
      z: Object.freeze([-2.5, 2.5]), phase: Object.freeze([-Math.PI, Math.PI]), eccentricity: Object.freeze([0, 0.35]),
      breathingAmplitude: Object.freeze([0, 0.25]), axisMisalignment: Object.freeze([-0.6, 0.6]),
      axialModeAmplitude: Object.freeze([0, 0.4]), drift: Object.freeze([0, 0.9]),
      seaDensity: Object.freeze([0.05, 1]), seaCadence: Object.freeze([0.2, 2]), seaSpacing: Object.freeze([0.5, 3]),
      seaOrientationLag: Object.freeze([-Math.PI, Math.PI]),
    }),
  }),
});
