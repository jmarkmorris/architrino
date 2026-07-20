import { PHOTON_LAYER_ORDER, getPhotonLayer } from "./PhotonStateRuntime.js";

export function formatPhotonFixed(value, digits = 3) {
  if (!Number.isFinite(value)) {
    return "0";
  }
  return value.toFixed(digits);
}

function computeBraidActionProxy(state, braidId) {
  return PHOTON_LAYER_ORDER.reduce((sum, layerId) => {
    const layer = getPhotonLayer(state, braidId, layerId);
    return sum + Math.abs(layer.radius * layer.frequencyHz);
  }, 0);
}

function computePhaseLockSpread(state, braidId) {
  const phases = PHOTON_LAYER_ORDER.map((layerId) => getPhotonLayer(state, braidId, layerId).phaseDeg);
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

function computeHitPhaseSpread(contributions = [], transmitterRole) {
  const phases = (Array.isArray(contributions) ? contributions : [])
    .filter((contribution) => contribution.phaseAtHit?.transmitterRole === transmitterRole)
    .map((contribution) => contribution.phaseAtHit?.transmitterPhaseDegrees);
  return {
    count: phases.length,
    spreadDeg: computeCircularSpreadDegrees(phases),
  };
}

function computeSelfHitPhaseSpread(rows = []) {
  const phases = (Array.isArray(rows) ? rows : [])
    .filter((row) => row.rootFound === true)
    .map((row) => row.phaseAtHit?.transmitterPhaseDegrees ?? row.transmitterPhaseDegrees);
  return {
    count: phases.length,
    spreadDeg: computeCircularSpreadDegrees(phases),
  };
}

function computeMinPositive(values = []) {
  return values.reduce((minimum, value) => {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? Math.min(minimum, number) : minimum;
  }, Number.POSITIVE_INFINITY);
}

function getDelaySolveStatus(diagnostics) {
  if (diagnostics.transmitterCount === 0) {
    return "none";
  }
  if (
    diagnostics.delaySolveGapMax > 0.05 ||
    diagnostics.jacobianAbsMin <= 1e-4 ||
    diagnostics.nearMissTransmitterCount > 0 ||
    diagnostics.rootLimitReachedCount > 0
  ) {
    return "unstable";
  }
  if (diagnostics.unresolvedTransmitterCount > 0) {
    const explainedMisses = diagnostics.noCatchUpTransmitterCount + diagnostics.staleHistoryTransmitterCount;
    return explainedMisses >= diagnostics.unresolvedTransmitterCount
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

function getTransmitterSpeedQuality() {
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

function getMissedTransmitterQuality(diagnostics) {
  if (diagnostics.unresolvedTransmitterCount === 0) {
    return "great";
  }
  const explainedMisses = diagnostics.noCatchUpTransmitterCount + diagnostics.staleHistoryTransmitterCount;
  return explainedMisses >= diagnostics.unresolvedTransmitterCount ? "info" : "bad";
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

function getPhaseFamilyQuality(stableCount, familyCount) {
  if (!Number.isFinite(stableCount) || !Number.isFinite(familyCount) || familyCount <= 0) {
    return "info";
  }
  if (stableCount >= 3) {
    return "great";
  }
  if (stableCount >= 2) {
    return "good";
  }
  if (stableCount >= 1) {
    return "ok";
  }
  return "poor";
}

function formatPhaseFamilyValue(family) {
  if (!family || typeof family !== "object") {
    return "n/a";
  }
  const spread = Number.isFinite(Number(family.transmitterPhaseSpreadDeg))
    ? Number(family.transmitterPhaseSpreadDeg)
    : 0;
  const roots = Number.isFinite(Number(family.rootCount)) ? Number(family.rootCount) : 0;
  const phaseLabel = family.phaseLockLabel ? `${family.phaseLockLabel}: ` : "";
  const speedLabel = family.speedFamilyLabel ? `${family.speedFamilyLabel} ` : "";
  return `${phaseLabel}${speedLabel}${family.label ?? "family"} ${formatPhotonFixed(spread, 1)} deg (${roots})`;
}

function formatSelfHitSpeedRegimeSummary(summary = {}) {
  return [
    `sub ${Number(summary.subFieldRoots ?? 0)} / ${Number(summary.subFieldRecords ?? 0)}`,
    `edge ${Number(summary.fieldSpeedRoots ?? 0)} / ${Number(summary.fieldSpeedRecords ?? 0)}`,
    `self ${Number(summary.selfHitRoots ?? 0)} / ${Number(summary.selfHitCandidateRecords ?? 0)}`,
  ].join(", ");
}

function formatPhaseLockClassSummary(diagnostics = {}) {
  return [
    `stable ${Number(diagnostics.helicalStablePhaseLockFamilyCount ?? 0)}`,
    `candidate ${Number(diagnostics.helicalCandidatePhaseLockFamilyCount ?? 0)}`,
    `singular ${Number(diagnostics.helicalSingularCandidateFamilyCount ?? 0)}`,
    `self ${Number(diagnostics.helicalSelfHitFamilyCount ?? 0)}`,
  ].join(", ");
}

function requirePhotonFormulaSummary(formulaSummary) {
  if (!formulaSummary || typeof formulaSummary !== "object") {
    throw new Error("Photon diagnostics require a prescribed-path-analysis formula summary.");
  }
  return formulaSummary;
}

export function computePhotonDiagnostics(state, timeSeconds, formulaSummary = null) {
  const formula = requirePhotonFormulaSummary(formulaSummary);
  const leftAction = computeBraidActionProxy(state, "left");
  const rightAction = computeBraidActionProxy(state, "right");
  const exposureBalance = Math.abs(leftAction - rightAction) / (leftAction + rightAction + 1e-9);
  const helicityEstimate = state?.pair?.left?.direction === "ccw" && state?.pair?.right?.direction === "cw"
    ? 1
    : 0;
  const trailingHitPhaseSpread = computeHitPhaseSpread(formula.field.contributions, "trailing");
  const leadingHitPhaseSpread = computeHitPhaseSpread(formula.field.contributions, "leading");
  const helicalSelfHitRecords = formula.selfHitDiagnostics?.helicalRecords ?? [];
  const helicalSelfHitPhaseSpread = computeSelfHitPhaseSpread(helicalSelfHitRecords);
  const helicalSelfHitJacobianAbsMin = computeMinPositive(
    helicalSelfHitRecords.map((record) => record.jacobianAbs)
  );
  return {
    exposureBalance,
    transverseAmplitude: formula.field.electric.magnitude,
    longitudinalLeakage: Math.abs(formula.field.receiverAcceleration?.x ?? 0),
    helicityEstimate,
    analyzerProjection: formula.field.analyzer.projection,
    analyzerFraction: formula.field.analyzer.fraction,
    averageAnalyzerFraction: formula.averageAnalyzerFraction,
    fitResidual: formula.fitResidual,
    transmitterHistoryProviderId: formula.field.transmitterHistoryProviderId ?? "",
    analysisFieldSchema: formula.field.analysisFieldSchema ?? "",
    fieldReconstructionOwner: formula.field.fieldReconstructionOwner ?? "",
    rootPlaybackOwner: formula.field.rootPlaybackOwner ?? "",
    averageDelay: formula.field.averageDelay,
    delaySolveGapMax: formula.field.delaySolveGapMax,
    maxTransmitterSpeedRatio: formula.field.maxTransmitterSpeedRatio,
    jacobianAbsMin: formula.field.jacobianAbsMin,
    unresolvedTransmitterCount: formula.field.unresolvedTransmitterCount,
    noCatchUpTransmitterCount: formula.field.noCatchUpTransmitterCount ?? 0,
    staleHistoryTransmitterCount: formula.field.staleHistoryTransmitterCount ?? 0,
    nearMissTransmitterCount: formula.field.nearMissTransmitterCount ?? 0,
    rootLimitReachedCount: formula.field.rootLimitReachedCount ?? 0,
    closestMissResidual: formula.field.closestMissResidual ?? 0,
    unstableTransmitterCount: formula.field.unstableTransmitterCount,
    nearestTransmitterDistance: formula.field.nearestTransmitterDistance,
    transmitterCount: formula.field.transmitterCount,
    rootCount: formula.field.rootCount,
    selfHitRecordCount: formula.selfHitDiagnostics?.recordCount ?? 0,
    selfHitCandidateCount: formula.selfHitDiagnostics?.candidateCount ?? 0,
    selfHitRootFoundCount: formula.selfHitDiagnostics?.rootFoundCount ?? 0,
    selfHitMaxFieldSpeedRatio: formula.selfHitDiagnostics?.maxFieldSpeedRatio ?? 0,
    selfHitSpeedRegimeSummary: formula.selfHitDiagnostics?.speedRegimeSummary ?? null,
    selfHitStatus: formula.selfHitDiagnostics?.status ?? "unavailable",
    helicalSelfHitRecordCount: formula.selfHitDiagnostics?.helicalRecordCount ?? 0,
    helicalSelfHitCandidateCount: formula.selfHitDiagnostics?.helicalCandidateCount ?? 0,
    helicalSelfHitRootFoundCount: formula.selfHitDiagnostics?.helicalRootFoundCount ?? 0,
    helicalSelfHitMaxFieldSpeedRatio: formula.selfHitDiagnostics?.helicalMaxFieldSpeedRatio ?? 0,
    helicalSpeedRegimeSummary: formula.selfHitDiagnostics?.helicalSpeedRegimeSummary ?? null,
    helicalPhaseFamilyCount: formula.selfHitDiagnostics?.helicalPhaseFamilyCount ?? 0,
    helicalStablePhaseFamilyCount: formula.selfHitDiagnostics?.helicalStablePhaseFamilyCount ?? 0,
    helicalStablePhaseLockFamilyCount: formula.selfHitDiagnostics?.helicalStablePhaseLockFamilyCount ?? 0,
    helicalCandidatePhaseLockFamilyCount: formula.selfHitDiagnostics?.helicalCandidatePhaseLockFamilyCount ?? 0,
    helicalSingularCandidateFamilyCount: formula.selfHitDiagnostics?.helicalSingularCandidateFamilyCount ?? 0,
    helicalDiffusePhaseFamilyCount: formula.selfHitDiagnostics?.helicalDiffusePhaseFamilyCount ?? 0,
    helicalPhaseDriftFamilyCount: formula.selfHitDiagnostics?.helicalPhaseDriftFamilyCount ?? 0,
    helicalSingleHitFamilyCount: formula.selfHitDiagnostics?.helicalSingleHitFamilyCount ?? 0,
    helicalSelfHitFamilyCount: formula.selfHitDiagnostics?.helicalSelfHitFamilyCount ?? 0,
    helicalSubFieldFamilyCount: formula.selfHitDiagnostics?.helicalSubFieldFamilyCount ?? 0,
    helicalFieldSpeedBoundaryFamilyCount: formula.selfHitDiagnostics?.helicalFieldSpeedBoundaryFamilyCount ?? 0,
    helicalBestPhaseFamily: formula.selfHitDiagnostics?.helicalBestPhaseFamily ?? null,
    helicalSelfHitJacobianAbsMin: Number.isFinite(helicalSelfHitJacobianAbsMin)
      ? helicalSelfHitJacobianAbsMin
      : 0,
    helicalSelfHitPhaseSpread,
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
    ["Transmitter count", String(diagnostics.transmitterCount), "info"],
    ["Root count", String(diagnostics.rootCount), "info"],
    [
      "Motion history",
      diagnostics.transmitterHistoryProviderId ? "Photon constrained" : "unavailable",
      diagnostics.transmitterHistoryProviderId ? "info" : "poor",
    ],
    [
      "Field reconstruction",
      diagnostics.fieldReconstructionOwner === "prescribed_path_analysis"
        ? "prescribed-path analysis"
        : "local",
      diagnostics.fieldReconstructionOwner === "prescribed_path_analysis" ? "info" : "poor",
    ],
    [
      "Max transmitter v/c_f",
      formatPhotonFixed(diagnostics.maxTransmitterSpeedRatio, 2),
      getTransmitterSpeedQuality(diagnostics),
      { labelMath: "\\mathrm{Max\\ transmitter}\\ v/c_f" },
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
      "Span self-hit roots",
      `${diagnostics.selfHitRootFoundCount} / ${diagnostics.selfHitRecordCount}`,
      diagnostics.selfHitStatus === "ok" ? "info" : "poor",
    ],
    [
      "Span self-hit max v/c_sig",
      formatPhotonFixed(diagnostics.selfHitMaxFieldSpeedRatio, 2),
      "info",
      { labelMath: "\\mathrm{Span\\ self\\! -\\! hit\\ max}\\ v/c_{\\mathrm{sig}}" },
    ],
    [
      "Helical self-hit roots",
      `${diagnostics.helicalSelfHitRootFoundCount} / ${diagnostics.helicalSelfHitRecordCount}`,
      diagnostics.helicalSelfHitRootFoundCount > 0 ? "info" : "poor",
    ],
    [
      "Helical self-hit max v/c_sig",
      formatPhotonFixed(diagnostics.helicalSelfHitMaxFieldSpeedRatio, 2),
      "info",
      { labelMath: "\\mathrm{Helical\\ self\\! -\\! hit\\ max}\\ v/c_{\\mathrm{sig}}" },
    ],
    [
      "Helical speed regimes",
      formatSelfHitSpeedRegimeSummary(diagnostics.helicalSpeedRegimeSummary),
      diagnostics.helicalSelfHitFamilyCount > 0 ? "info" : "poor",
    ],
    [
      "Helical self-hit min |J|",
      formatPhotonFixed(diagnostics.helicalSelfHitJacobianAbsMin, 4),
      getHigherIsBetterQuality(diagnostics.helicalSelfHitJacobianAbsMin, {
        great: 0.5,
        good: 0.2,
        ok: 0.05,
        poor: 0.01,
      }),
      { labelMath: "\\mathrm{Helical\\ self\\! -\\! hit\\ min}\\ |J|" },
    ],
    [
      "Helical self-hit phase spread",
      `${formatPhotonFixed(diagnostics.helicalSelfHitPhaseSpread.spreadDeg, 1)} deg`,
      getHitPhaseSpreadQuality(diagnostics.helicalSelfHitPhaseSpread),
    ],
    [
      "Helical phase families",
      `${diagnostics.helicalStablePhaseFamilyCount} / ${diagnostics.helicalPhaseFamilyCount}`,
      getPhaseFamilyQuality(diagnostics.helicalStablePhaseFamilyCount, diagnostics.helicalPhaseFamilyCount),
    ],
    [
      "Helical phase-lock classes",
      formatPhaseLockClassSummary(diagnostics),
      diagnostics.helicalStablePhaseLockFamilyCount > 0
        ? "good"
        : diagnostics.helicalSingularCandidateFamilyCount > 0 ? "poor" : "info",
    ],
    [
      "Best helical family",
      formatPhaseFamilyValue(diagnostics.helicalBestPhaseFamily),
      diagnostics.helicalBestPhaseFamily ? "info" : "poor",
    ],
    ["Missed transmitters", String(diagnostics.unresolvedTransmitterCount), getMissedTransmitterQuality(diagnostics)],
    [
      "No catch-up transmitters",
      String(diagnostics.noCatchUpTransmitterCount),
      diagnostics.noCatchUpTransmitterCount === 0 ? "great" : "info",
    ],
    [
      "Stale windows",
      String(diagnostics.staleHistoryTransmitterCount),
      diagnostics.staleHistoryTransmitterCount === 0 ? "great" : "info",
    ],
    [
      "Near misses",
      String(diagnostics.nearMissTransmitterCount),
      diagnostics.nearMissTransmitterCount === 0 ? "great" : "poor",
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
  if (formula?.analysisId) {
    rows.unshift(["Analysis library", formula.analysisId, "info"]);
  }
  return rows;
}
