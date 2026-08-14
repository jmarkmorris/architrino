import {
  NORMALIZED_FIELD_SPEED,
  evaluateCausalRoots,
  evaluateScalarRootSet,
} from "./CausalDelayFeedbackCausalHistory.js";

let cachedSelfHitScenarios = null;

export function createRootsView(state) {
  const roots = state.roots;
  const activeRoots = roots.filter((root) => root.accepted);
  const selectedRoot = roots.find((root) => root.id === state.selectedRootId) ?? null;
  const available = state.causalEvaluationAvailable !== false;
  return {
    title: "Roots",
    notation: "$g(T_r;T_t)$",
    receiverTime: state.receiverTime,
    samples: state.delayMap ?? [],
    roots,
    activeRoots,
    selectedRoot,
    activeRootCount: activeRoots.length,
    available,
    unavailableReason: available ? null : state.causalEvaluationReason,
    fold: createOrdinaryFoldLesson(),
  };
}

export function createOrdinaryFoldLesson(receiverOffset = -0.01) {
  const foldTime = 0.5;
  const center = 0.4;
  const residualAt = (emissionTime) => (emissionTime - center) ** 2 + receiverOffset;
  const roots = evaluateScalarRootSet({
    residualAt,
    start: 0,
    end: 0.8,
    scanSteps: 800,
    tangentTolerance: 1e-7,
  }).roots;
  const distanceToFold = Math.max(1e-6, -receiverOffset);
  const pointwiseAcceleration = 1 / Math.sqrt(distanceToFold);
  const accumulatedVelocityChange = 4 * Math.sqrt(distanceToFold);
  return {
    receiverTime: foldTime + receiverOffset,
    receiverOffset,
    roots,
    activeRootCount: roots.filter((root) => !root.tangent).length,
    deltaN: receiverOffset < 0 ? 2 : receiverOffset > 0 ? -2 : 0,
    pointwiseAcceleration,
    accumulatedVelocityChange,
    verdict: receiverOffset === 0 ? "ordinary_fold_tangent" : "ordinary_fold",
  };
}

function makePath(pointAt, count = 501) {
  return Array.from({ length: count }, (_unused, index) => {
    const t = index / (count - 1);
    return { t, ...pointAt(t) };
  });
}

export function createSelfHitScenarios() {
  if (cachedSelfHitScenarios) {
    return cachedSelfHitScenarios;
  }
  const receiverTime = 1;
  const scenarios = [
    {
      id: "sub_cf",
      label: "Below field speed",
      path: makePath((t) => ({ x: 0.5 * t, y: 0 })),
      expectedState: "absent",
    },
    {
      id: "threshold",
      label: "threshold",
      path: makePath((t) => ({ x: t, y: 0 })),
      expectedState: "unresolved",
    },
    {
      id: "tangent",
      label: "tangent",
      path: makePath((t) => ({
        x: t - 0.2 * (1 - t) * (t - 0.5) ** 2,
        y: 0,
      })),
      expectedState: "tangent",
    },
    {
      id: "super_cf_curved",
      label: "Curved path above field speed",
      path: makePath((t) => ({ x: 0.25 * Math.cos(6 * t), y: 0.25 * Math.sin(6 * t) })),
      expectedState: "active",
    },
    {
      id: "failed_floor",
      label: "transversality floor",
      path: makePath((t) => ({ x: 0.25 * Math.cos(6 * t), y: 0.25 * Math.sin(6 * t) })),
      expectedState: "failed-floor",
      transversalityFloor: 1e6,
    },
  ];
  cachedSelfHitScenarios = scenarios.map((scenario) => {
    const evaluation = evaluateCausalRoots({
      sourceId: "self",
      receiverId: "self",
      sourcePath: scenario.path,
      receiverPath: scenario.path,
      receiverTime,
      signalSpeed: NORMALIZED_FIELD_SPEED,
      distanceScale: 1,
      selfHit: true,
      transversalityFloor: scenario.transversalityFloor ??
        (scenario.id === "threshold" ? 0.01 : 1e-5),
      scanSteps: 1200,
    });
    const accepted = evaluation.acceptedRoots;
    const rejected = evaluation.rejectedRoots;
    const state = scenario.id === "threshold"
      ? "unresolved"
      : scenario.id === "tangent" && evaluation.roots.some((root) => root.tangent)
        ? "tangent"
        : accepted.length > 0
          ? "active"
          : rejected.some((root) => root.reason === "transversality_floor_failed")
            ? "failed-floor"
            : "absent";
    return {
      id: scenario.id,
      label: scenario.label,
      state,
      expectedState: scenario.expectedState,
      path: scenario.path,
      receiverTime,
      roots: evaluation.roots,
      transversality: evaluation.roots.at(0)?.transversality ?? null,
      transversalityField: "transversality",
      explanation: scenario.id === "sub_cf"
        ? "A path that stays strictly below field speed has no separated self-hit root."
        : scenario.id === "threshold"
          ? "The coincident or tangent threshold is unresolved and is not assigned the ordinary-fold verdict."
          : scenario.id === "tangent"
            ? "A noncoincident tangent root is shown as tangent and is not promoted to a simple acceleration row."
            : scenario.id === "failed_floor"
              ? "A root whose transmitter-side derivative misses the declared floor is shown but is not admitted as an acceleration row."
              : "A curved path above field speed can produce a separated self-hit root; total speed alone does not decide the result.",
    };
  });
  return cachedSelfHitScenarios;
}
