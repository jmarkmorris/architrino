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
  return diagnostics.maxSourceSpeedRatio > 1 || diagnostics.delaySolveGapMax > 0.05
    ? "unstable"
    : "stable";
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
    longitudinalLeakage: 0,
    helicityEstimate,
    analyzerProjection: formula.field.analyzer.projection,
    analyzerPass: formula.field.analyzer.passMeasure,
    averageAnalyzerPass: formula.averagePass,
    malusResidual: formula.malusResidual,
    averageDelay: formula.field.averageDelay,
    delaySolveGapMax: formula.field.delaySolveGapMax,
    maxSourceSpeedRatio: formula.field.maxSourceSpeedRatio,
    unstableSourceCount: formula.field.unstableSourceCount,
    nearestSourceDistance: formula.field.nearestSourceDistance,
    sourceCount: formula.field.sourceCount,
    leftPhaseSpread: computePhaseLockSpread(state, "left"),
    rightPhaseSpread: computePhaseLockSpread(state, "right"),
    snapshotId: `photon-v${state.version}-t${formatPhotonFixed(formula.wrappedTime, 2)}`,
  };
}

export function getPhotonDiagnosticRows(state, timeSeconds, formulaSummary = null) {
  const diagnostics = computePhotonDiagnostics(state, timeSeconds, formulaSummary);
  return [
    ["Static balance", formatPhotonFixed(diagnostics.exposureBalance, 4)],
    ["Transverse amp", formatPhotonFixed(diagnostics.transverseAmplitude, 3)],
    ["Longitudinal leak", formatPhotonFixed(diagnostics.longitudinalLeakage, 3)],
    ["Helicity estimate", diagnostics.helicityEstimate > 0 ? "+1" : "open"],
    ["Analyzer pass", formatPhotonFixed(diagnostics.analyzerPass, 3)],
    ["Malus residual", formatPhotonFixed(diagnostics.malusResidual, 4)],
    ["Mean delay", formatPhotonFixed(diagnostics.averageDelay, 3)],
    ["Nearest source", formatPhotonFixed(diagnostics.nearestSourceDistance, 3)],
    ["Source count", String(diagnostics.sourceCount)],
    ["Max source v/c_f", formatPhotonFixed(diagnostics.maxSourceSpeedRatio, 2)],
    ["Delay solve gap", formatPhotonFixed(diagnostics.delaySolveGapMax, 3)],
    ["Delay status", getDelaySolveStatus(diagnostics)],
    ["Left phase spread", `${formatPhotonFixed(diagnostics.leftPhaseSpread, 1)} deg`],
    ["Right phase spread", `${formatPhotonFixed(diagnostics.rightPhaseSpread, 1)} deg`],
    ["Snapshot", diagnostics.snapshotId],
  ];
}
