import { PHOTON_LAYER_ORDER, getPhotonLayer } from "./PhotonStateRuntime.js";

export function formatPhotonFixed(value, digits = 3) {
  if (!Number.isFinite(value)) {
    return "0";
  }
  return value.toFixed(digits);
}

function computeSwarmActionProxy(state, swarmId) {
  return PHOTON_LAYER_ORDER.reduce((sum, layerId) => {
    const layer = getPhotonLayer(state, swarmId, layerId);
    return sum + Math.abs(layer.radius * layer.frequencyHz);
  }, 0);
}

function computePhaseLockSpread(state, swarmId) {
  const phases = PHOTON_LAYER_ORDER.map((layerId) => getPhotonLayer(state, swarmId, layerId).phaseDeg);
  const sorted = phases.slice().sort((a, b) => a - b);
  const gaps = sorted.map((phase, index) => {
    const next = sorted[(index + 1) % sorted.length] + (index === sorted.length - 1 ? 360 : 0);
    return next - phase;
  });
  const targetGap = 120;
  const error = gaps.reduce((sum, gap) => sum + Math.abs(gap - targetGap), 0) / gaps.length;
  return error;
}

function computeCircularSpreadDegrees(phases) {
  const finitePhases = phases
    .map((phase) => Number(phase))
    .filter((phase) => Number.isFinite(phase));
  if (finitePhases.length <= 1) {
    return 0;
  }
  const sum = finitePhases.reduce((accumulator, phase) => {
    const radians = phase * Math.PI / 180;
    accumulator.cos += Math.cos(radians);
    accumulator.sin += Math.sin(radians);
    return accumulator;
  }, { cos: 0, sin: 0 });
  const resultant = Math.hypot(sum.cos, sum.sin) / finitePhases.length;
  return (1 - Math.min(1, Math.max(0, resultant))) * 180;
}

function computeHitPhaseSpread(contributions = [], sourceRole) {
  const phases = (Array.isArray(contributions) ? contributions : [])
    .filter((contribution) => contribution.phaseAtHit?.sourceRole === sourceRole)
    .map((contribution) => contribution.phaseAtHit?.sourcePhaseDegrees);
  return {
    count: phases.length,
    spreadDeg: computeCircularSpreadDegrees(phases),
  };
}

function getDelaySolveStatus(diagnostics) {
  if (diagnostics.sourceCount === 0) {
    return "none";
  }
  if (
    diagnostics.delaySolveGapMax > 0.05 ||
    diagnostics.jacobianAbsMin <= 1e-4 ||
    diagnostics.nearMissSourceCount > 0 ||
    diagnostics.rootLimitReachedCount > 0
  ) {
    return "unstable";
  }
  if (diagnostics.unresolvedSourceCount > 0) {
    const explainedMisses = diagnostics.noCatchUpSourceCount + diagnostics.staleHistorySourceCount;
    return explainedMisses >= diagnostics.unresolvedSourceCount
      ? "catch-up limited"
      : "unstable";
  }
  return "stable";
}

function getLowerIsBetterQuality(value, thresholds) {
  if (!Number.isFinite(value)) {
    return "info";
  }
  if (value <= thresholds.great) {
    return "great";
  }
  if (value <= thresholds.good) {
    return "good";
  }
  if (value <= thresholds.ok) {
    return "ok";
  }
  if (value <= thresholds.poor) {
    return "poor";
  }
  return "bad";
}

function getHigherIsBetterQuality(value, thresholds) {
  if (!Number.isFinite(value)) {
    return "info";
  }
  if (value >= thresholds.great) {
    return "great";
  }
  if (value >= thresholds.good) {
    return "good";
  }
  if (value >= thresholds.ok) {
    return "ok";
  }
  if (value >= thresholds.poor) {
    return "poor";
  }
  return "bad";
}

function getLongitudinalLeakQuality(diagnostics) {
  if (diagnostics.transverseAmplitude <= 1e-9) {
    return "info";
  }
  return getLowerIsBetterQuality(
    diagnostics.longitudinalLeakage / diagnostics.transverseAmplitude,
    { great: 0.01, good: 0.05, ok: 0.15, poor: 0.35 }
  );
}

function getSourceSpeedQuality() {
  return "info";
}

function getDelayStatusQuality(status) {
  if (status === "stable") {
    return "good";
  }
  if (status === "catch-up limited") {
    return "info";
  }
  if (status === "unstable") {
    return "bad";
  }
  return "info";
}

function getMissedSourceQuality(diagnostics) {
  if (diagnostics.unresolvedSourceCount === 0) {
    return "great";
  }
  const explainedMisses = diagnostics.noCatchUpSourceCount + diagnostics.staleHistorySourceCount;
  return explainedMisses >= diagnostics.unresolvedSourceCount ? "info" : "bad";
}

function getHitPhaseSpreadQuality(spread) {
  if (!spread || spread.count < 2) {
    return "info";
  }
  return getLowerIsBetterQuality(
    spread.spreadDeg,
    { great: 5, good: 15, ok: 45, poor: 90 }
  );
}

function requirePhotonFormulaSummary(formulaSummary) {
  if (!formulaSummary || typeof formulaSummary !== "object") {
    throw new Error("Photon diagnostics require a solver-backed formula summary.");
  }
  return formulaSummary;
}

export function computePhotonDiagnostics(state, timeSeconds, formulaSummary = null) {
  const formula = requirePhotonFormulaSummary(formulaSummary);
  const leftAction = computeSwarmActionProxy(state, "left");
  const rightAction = computeSwarmActionProxy(state, "right");
  const exposureBalance = Math.abs(leftAction - rightAction) / (leftAction + rightAction + 1e-9);
  const helicityEstimate = state?.pair?.left?.direction === "ccw" && state?.pair?.right?.direction === "cw"
    ? 1
    : 0;
  const trailingHitPhaseSpread = computeHitPhaseSpread(formula.field.contributions, "trailing");
  const leadingHitPhaseSpread = computeHitPhaseSpread(formula.field.contributions, "leading");
  return {
    exposureBalance,
    transverseAmplitude: formula.field.electric.magnitude,
    longitudinalLeakage: Math.abs(formula.field.receiverAcceleration?.x ?? 0),
    helicityEstimate,
    analyzerProjection: formula.field.analyzer.projection,
    analyzerFraction: formula.field.analyzer.fraction,
    averageAnalyzerFraction: formula.averageAnalyzerFraction,
    fitResidual: formula.fitResidual,
    averageDelay: formula.field.averageDelay,
    delaySolveGapMax: formula.field.delaySolveGapMax,
    maxSourceSpeedRatio: formula.field.maxSourceSpeedRatio,
    jacobianAbsMin: formula.field.jacobianAbsMin,
    unresolvedSourceCount: formula.field.unresolvedSourceCount,
    noCatchUpSourceCount: formula.field.noCatchUpSourceCount ?? 0,
    staleHistorySourceCount: formula.field.staleHistorySourceCount ?? 0,
    nearMissSourceCount: formula.field.nearMissSourceCount ?? 0,
    rootLimitReachedCount: formula.field.rootLimitReachedCount ?? 0,
    closestMissResidual: formula.field.closestMissResidual ?? 0,
    unstableSourceCount: formula.field.unstableSourceCount,
    nearestSourceDistance: formula.field.nearestSourceDistance,
    sourceCount: formula.field.sourceCount,
    rootCount: formula.field.rootCount,
    selfHitRowCount: formula.selfHitDiagnostics?.rowCount ?? 0,
    selfHitCandidateCount: formula.selfHitDiagnostics?.candidateCount ?? 0,
    selfHitRootFoundCount: formula.selfHitDiagnostics?.rootFoundCount ?? 0,
    selfHitMaxFieldSpeedRatio: formula.selfHitDiagnostics?.maxFieldSpeedRatio ?? 0,
    selfHitStatus: formula.selfHitDiagnostics?.status ?? "unavailable",
    leftPhaseSpread: computePhaseLockSpread(state, "left"),
    rightPhaseSpread: computePhaseLockSpread(state, "right"),
    trailingHitPhaseSpread,
    leadingHitPhaseSpread,
    snapshotId: `photon-v${state.version}-t${formatPhotonFixed(formula.wrappedTime, 2)}`,
  };
}

export function getPhotonDiagnosticRows(state, timeSeconds, formulaSummary = null) {
  const formula = requirePhotonFormulaSummary(formulaSummary);
  const diagnostics = computePhotonDiagnostics(state, timeSeconds, formula);
  const delayStatus = getDelaySolveStatus(diagnostics);
  const rows = [
    ["Transverse amp", formatPhotonFixed(diagnostics.transverseAmplitude, 3), "info"],
    ["Longitudinal leak", formatPhotonFixed(diagnostics.longitudinalLeakage, 3), getLongitudinalLeakQuality(diagnostics)],
    ["Helicity estimate", diagnostics.helicityEstimate > 0 ? "+1" : "open", diagnostics.helicityEstimate > 0 ? "good" : "info"],
    ["Fit residual", formatPhotonFixed(diagnostics.fitResidual, 4), getLowerIsBetterQuality(diagnostics.fitResidual, { great: 0.005, good: 0.02, ok: 0.08, poor: 0.2 })],
    ["Mean delay", formatPhotonFixed(diagnostics.averageDelay, 3), "info"],
    ["Source count", String(diagnostics.sourceCount), "info"],
    ["Root count", String(diagnostics.rootCount), "info"],
    [
      "Max source v/c_f",
      formatPhotonFixed(diagnostics.maxSourceSpeedRatio, 2),
      getSourceSpeedQuality(diagnostics),
      { labelMath: "\\mathrm{Max\\ source}\\ v/c_f" },
    ],
    [
      "Min |J|",
      formatPhotonFixed(diagnostics.jacobianAbsMin, 4),
      getHigherIsBetterQuality(diagnostics.jacobianAbsMin, {
        great: 0.5,
        good: 0.2,
        ok: 0.05,
        poor: 0.01,
      }),
      { labelMath: "\\mathrm{Min}\\ |J|" },
    ],
    [
      "Self-hit roots",
      `${diagnostics.selfHitRootFoundCount} / ${diagnostics.selfHitRowCount}`,
      diagnostics.selfHitStatus === "ok" ? "info" : "poor",
    ],
    [
      "Self-hit max v/c_sig",
      formatPhotonFixed(diagnostics.selfHitMaxFieldSpeedRatio, 2),
      "info",
      { labelMath: "\\mathrm{Self\\! -\\! hit\\ max}\\ v/c_{\\mathrm{sig}}" },
    ],
    ["Missed sources", String(diagnostics.unresolvedSourceCount), getMissedSourceQuality(diagnostics)],
    [
      "No catch-up sources",
      String(diagnostics.noCatchUpSourceCount),
      diagnostics.noCatchUpSourceCount === 0 ? "great" : "info",
    ],
    [
      "Stale windows",
      String(diagnostics.staleHistorySourceCount),
      diagnostics.staleHistorySourceCount === 0 ? "great" : "info",
    ],
    [
      "Near misses",
      String(diagnostics.nearMissSourceCount),
      diagnostics.nearMissSourceCount === 0 ? "great" : "poor",
    ],
    [
      "Root cap hits",
      String(diagnostics.rootLimitReachedCount),
      diagnostics.rootLimitReachedCount === 0 ? "great" : "poor",
    ],
    ["Delay solve gap", formatPhotonFixed(diagnostics.delaySolveGapMax, 3), getLowerIsBetterQuality(diagnostics.delaySolveGapMax, { great: 0.001, good: 0.005, ok: 0.02, poor: 0.05 })],
    ["Delay status", delayStatus, getDelayStatusQuality(delayStatus)],
    ["Left phase spread", `${formatPhotonFixed(diagnostics.leftPhaseSpread, 1)} deg`, "info"],
    ["Right phase spread", `${formatPhotonFixed(diagnostics.rightPhaseSpread, 1)} deg`, "info"],
    [
      "Trailing hit phase spread",
      `${formatPhotonFixed(diagnostics.trailingHitPhaseSpread.spreadDeg, 1)} deg`,
      getHitPhaseSpreadQuality(diagnostics.trailingHitPhaseSpread),
    ],
    [
      "Leading hit phase spread",
      `${formatPhotonFixed(diagnostics.leadingHitPhaseSpread.spreadDeg, 1)} deg`,
      getHitPhaseSpreadQuality(diagnostics.leadingHitPhaseSpread),
    ],
  ];
  if (formula?.solverEngineId) {
    rows.unshift(["Solver engine", formula.solverEngineId, "info"]);
  }
  return rows;
}
