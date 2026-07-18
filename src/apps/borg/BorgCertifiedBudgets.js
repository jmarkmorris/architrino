export const BORG_CERTIFIED_BUDGET_SCHEMA = "borg_certified_budget/v1";

export const BORG_INTERACTIVE_CERTIFIED_BUDGET_ID =
  "interactive-certified-v1";
export const BORG_RESEARCH_CERTIFIED_BUDGET_ID =
  "research-certified-v1";
export const BORG_DEFAULT_CERTIFIED_BUDGET_ID =
  BORG_RESEARCH_CERTIFIED_BUDGET_ID;

const COMMON_EVENT = Object.freeze({
  independentOverlap: "0",
  causalWidth: "0.2",
  coreScale: "0.2",
  receiverAllocationRule: "equal-routed-pair-weight/v1",
  regulatorRefinementRatio: "0.5",
  regulatorLevels: 3,
  rowFractions: Object.freeze({
    quadrature: "0.35",
    causalWidthRegulator: "0.15",
    coreRegulator: "0.15",
    finiteWidthStateNumerical: "0.15",
    amendment1RegulatorMatching: "0.20",
  }),
  finiteWidthStateNumericalFractions: Object.freeze({
    retainedHistory: "0.04",
    interpolation: "0.04",
    rounding: "0.02",
    endpointLinearShortcut: "0.05",
  }),
});

const COMMON_PRECISION = Object.freeze({
  bulk: "binary64-outward",
  difficultRowInitialBits: 128,
  difficultRowMaximumBits: 512,
  forceEventPrecisionEscalation: false,
  roundingMode: "outward",
  deterministicReduction: "fixed-pairwise",
});

const COMMON_RESOURCES = Object.freeze({
  rootMaximumDepth: 256,
  rootMaximumCells: 500000,
  quadratureMaximumDepth: 32,
  quadratureMaximumCells: 200000,
  eventMaximumDepth: 24,
  eventMaximumCells: 200000,
  correctionIterations: 12,
  maximumStepAttempts: 1000,
  maximumRejectedSteps: 100,
  workerThreads: 4,
  requestMemoryBytes: 67108864,
});

const COMMON_CONTROLLER = Object.freeze({
  initialStep: "0.05",
  minimumStep: "0.0001",
  maximumStep: "0.05",
  adaptiveGrowth: true,
});

const COMMON_ORDINARY = Object.freeze({
  rootTimeEnclosure: "1e-3",
  farFieldEnclosureFraction: "0.25",
  correctionAccelerationResidual: "1e-1",
  acceptedStepPosition: "1e-2",
  acceptedStepVelocity: "1e-2",
  sourceNormalFloor: "1e-30",
  chartPolicy: "sharp_with_finite_width_fallback",
});

const INTERACTIVE_ALLOCATIONS = deepFreeze({
  schema: BORG_CERTIFIED_BUDGET_SCHEMA,
  presetId: BORG_INTERACTIVE_CERTIFIED_BUDGET_ID,
  topLevel: {
    positionIncrement: "2e-2",
    velocityIncrement: "4e-2",
  },
  controller: COMMON_CONTROLLER,
  ordinary: {
    ...COMMON_ORDINARY,
    accelerationEnclosure: "3e-1",
    quadratureTolerance: "3e-1",
  },
  finiteWidth: {
    ...COMMON_EVENT,
    receiverImpulseTotal: "1e-6",
    receiverPositionMomentTotal: "1e-6",
    quadratureImpulseLimit: "3.5e-7",
    quadraturePositionMomentLimit: "3.5e-7",
    regulatorConvergenceLimit: "1.5e-7",
    stateNumericalImpulseLimit: "1.5e-7",
    stateNumericalPositionMomentLimit: "1.5e-7",
    matchingImpulseLimit: "2e-7",
    matchingPositionMomentLimit: "2e-7",
  },
  precision: COMMON_PRECISION,
  resources: COMMON_RESOURCES,
});

const RESEARCH_ALLOCATIONS = deepFreeze({
  schema: BORG_CERTIFIED_BUDGET_SCHEMA,
  presetId: BORG_RESEARCH_CERTIFIED_BUDGET_ID,
  topLevel: {
    positionIncrement: "2e-2",
    velocityIncrement: "3e-2",
  },
  controller: COMMON_CONTROLLER,
  ordinary: {
    ...COMMON_ORDINARY,
    accelerationEnclosure: "1e-1",
    quadratureTolerance: "1e-1",
  },
  finiteWidth: {
    ...COMMON_EVENT,
    receiverImpulseTotal: "1e-7",
    receiverPositionMomentTotal: "1e-7",
    quadratureImpulseLimit: "3.5e-8",
    quadraturePositionMomentLimit: "3.5e-8",
    regulatorConvergenceLimit: "1.5e-8",
    stateNumericalImpulseLimit: "1.5e-8",
    stateNumericalPositionMomentLimit: "1.5e-8",
    matchingImpulseLimit: "2e-8",
    matchingPositionMomentLimit: "2e-8",
  },
  precision: COMMON_PRECISION,
  resources: COMMON_RESOURCES,
});

const PRESETS = deepFreeze({
  [BORG_INTERACTIVE_CERTIFIED_BUDGET_ID]: {
    id: BORG_INTERACTIVE_CERTIFIED_BUDGET_ID,
    label: "Interactive certified budget",
    description:
      "Ratified watching candidate with wider declared acceleration and event enclosures.",
    allocations: INTERACTIVE_ALLOCATIONS,
    allocationCanonicalJson: canonicalStringify(INTERACTIVE_ALLOCATIONS),
    allocationHash: "11f005592d4636dec0cec8a062ce95ac7ab84bf51da36961fefcffa74705d33f",
  },
  [BORG_RESEARCH_CERTIFIED_BUDGET_ID]: {
    id: BORG_RESEARCH_CERTIFIED_BUDGET_ID,
    label: "Research certified budget",
    description:
      "Ratified tighter allocation retained as the default until parity acceptance passes.",
    allocations: RESEARCH_ALLOCATIONS,
    allocationCanonicalJson: canonicalStringify(RESEARCH_ALLOCATIONS),
    allocationHash: "9fb413d991d7bc31457af7c062f32a3cacef94b6830a1cc8beb59227c9911b36",
  },
});

export const BORG_CERTIFIED_BUDGET_PRESETS = Object.freeze(
  Object.values(PRESETS),
);

export function getBorgCertifiedBudgetPreset(
  presetId = BORG_DEFAULT_CERTIFIED_BUDGET_ID,
) {
  const preset = PRESETS[String(presetId)];
  if (!preset) {
    throw new RangeError(`Unknown Borg certified budget: ${presetId}.`);
  }
  validateBorgCertifiedBudgetPreset(preset);
  return preset;
}

export function validateBorgCertifiedBudgetPreset(preset) {
  const allocations = preset?.allocations;
  if (
    !allocations ||
    allocations.schema !== BORG_CERTIFIED_BUDGET_SCHEMA ||
    allocations.presetId !== preset.id ||
    preset.allocationCanonicalJson !== canonicalStringify(allocations) ||
    !/^[0-9a-f]{64}$/u.test(preset.allocationHash)
  ) {
    throw new TypeError("Borg certified budget provenance is incomplete.");
  }
  const event = allocations.finiteWidth;
  const fractionSum = Object.values(event.rowFractions)
    .reduce((sum, value) => sum + Number(value), 0);
  const stateFractionSum = Object.values(event.finiteWidthStateNumericalFractions)
    .reduce((sum, value) => sum + Number(value), 0);
  if (
    Math.abs(fractionSum - 1) > 1e-15 ||
    Math.abs(stateFractionSum - Number(event.rowFractions.finiteWidthStateNumerical)) > 1e-15 ||
    Number(event.independentOverlap) !== 0
  ) {
    throw new RangeError("Borg certified event allocation does not close.");
  }
  const h = Number(allocations.controller.maximumStep);
  const acceleration = Number(allocations.ordinary.accelerationEnclosure);
  const correction = Number(allocations.ordinary.correctionAccelerationResidual);
  const positionFloor = Number(allocations.ordinary.acceptedStepPosition) +
    0.5 * h ** 2 * (acceleration + correction) +
    Number(event.receiverPositionMomentTotal);
  const velocityFloor = Number(allocations.ordinary.acceptedStepVelocity) +
    h * (acceleration + correction) + Number(event.receiverImpulseTotal);
  if (
    !(positionFloor < Number(allocations.topLevel.positionIncrement)) ||
    !(velocityFloor < Number(allocations.topLevel.velocityIncrement))
  ) {
    throw new RangeError("Borg certified budget exceeds its top-level state bound.");
  }
  return preset;
}

export function canonicalStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(canonicalStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) =>
      `${JSON.stringify(key)}:${canonicalStringify(value[key])}`
    ).join(",")}}`;
  }
  return JSON.stringify(value);
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
}
