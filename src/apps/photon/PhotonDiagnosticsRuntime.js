import { PHOTON_LAYER_ORDER, getPhotonLayer } from "./PhotonStateRuntime.js";
import { computePhotonFormulaSummary } from "./PhotonFormulaRuntime.js";

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

function getDelaySolveStatus(diagnostics) {
  if (diagnostics.sourceCount === 0) {
    return "none";
  }
  return diagnostics.delaySolveGapMax > 0.05 ||
    diagnostics.jacobianAbsMin <= 1e-4 ||
    diagnostics.unresolvedSourceCount > 0
    ? "unstable"
    : "stable";
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
  if (status === "unstable") {
    return "bad";
  }
  return "info";
}

export function computePhotonDiagnostics(state, timeSeconds, formulaSummary = null) {
  const formula = formulaSummary ?? computePhotonFormulaSummary(state, timeSeconds);
  const leftAction = computeSwarmActionProxy(state, "left");
  const rightAction = computeSwarmActionProxy(state, "right");
  const exposureBalance = Math.abs(leftAction - rightAction) / (leftAction + rightAction + 1e-9);
  const helicityEstimate = state?.pair?.left?.direction === "ccw" && state?.pair?.right?.direction === "cw"
    ? 1
    : 0;
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
    unstableSourceCount: formula.field.unstableSourceCount,
    nearestSourceDistance: formula.field.nearestSourceDistance,
    sourceCount: formula.field.sourceCount,
    rootCount: formula.field.rootCount,
    leftPhaseSpread: computePhaseLockSpread(state, "left"),
    rightPhaseSpread: computePhaseLockSpread(state, "right"),
    snapshotId: `photon-v${state.version}-t${formatPhotonFixed(formula.wrappedTime, 2)}`,
  };
}

export function getPhotonDiagnosticRows(state, timeSeconds, formulaSummary = null) {
  const diagnostics = computePhotonDiagnostics(state, timeSeconds, formulaSummary);
  const delayStatus = getDelaySolveStatus(diagnostics);
  return [
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
    ["Missed sources", String(diagnostics.unresolvedSourceCount), diagnostics.unresolvedSourceCount === 0 ? "great" : "bad"],
    ["Delay solve gap", formatPhotonFixed(diagnostics.delaySolveGapMax, 3), getLowerIsBetterQuality(diagnostics.delaySolveGapMax, { great: 0.001, good: 0.005, ok: 0.02, poor: 0.05 })],
    ["Delay status", delayStatus, getDelayStatusQuality(delayStatus)],
    ["Left phase spread", `${formatPhotonFixed(diagnostics.leftPhaseSpread, 1)} deg`, "info"],
    ["Right phase spread", `${formatPhotonFixed(diagnostics.rightPhaseSpread, 1)} deg`, "info"],
  ];
}
