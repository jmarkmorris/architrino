export const COMPACT_SWEEP_DASHBOARD_SCHEMA =
  "prescribed-path-analysis/compact-sweep-dashboard-data.v1";

export const ACTIVE_CANDIDATE_DISPOSITION = "active-candidate";
export const DEPRECATED_CONTROL_DISPOSITION =
  "deprecated-axial-limit-null-control";

const SHA256_PATTERN = /^[0-9a-f]{64}$/u;

export const COMPACT_SWEEP_METRICS = Object.freeze([
  Object.freeze({
    id: "externalExposure",
    label: "External exposure",
    symbol: "L_ext",
    direction: "Lower is better for this compact diagnostic",
    definition:
      "The largest external exposure recorded in either virtual-probe polarity check.",
  }),
  Object.freeze({
    id: "externalExposureFraction",
    label: "External exposure fraction",
    symbol: "eta_ext",
    direction: "Lower is better for this compact diagnostic",
    definition:
      "The largest share of exposure that reaches the external virtual probe in either polarity check.",
  }),
  Object.freeze({
    id: "peakSurfaceAcceleration",
    label: "Peak surface acceleration",
    symbol: "A_surface,peak",
    direction: "Lower is better for this compact diagnostic",
    definition:
      "The largest surface acceleration recorded in either probe-polarity check.",
  }),
  Object.freeze({
    id: "wakeFluxFraction",
    label: "Wake-flux fraction",
    symbol: "eta_W_flux",
    direction: "Lower is better for this compact diagnostic",
    definition:
      "The signed wake flux left after one complete cycle, divided by the raw wake flux.",
  }),
  Object.freeze({
    id: "signedCycleResidual",
    label: "Signed-cycle residual",
    symbol: "|I_signed|",
    direction: "Lower is better for this compact diagnostic",
    definition:
      "The absolute net signed wake-flux integral after one complete cycle. A small value shows cancellation in this signed sum, not low total emission.",
  }),
  Object.freeze({
    id: "rawEmissionResidual",
    label: "Raw-emission residual",
    symbol: "epsilon_raw",
    direction: "Lower is better for this compact diagnostic",
    definition:
      "The difference from the raw complete-cycle emission reference, scaled to that reference.",
  }),
  Object.freeze({
    id: "signedEmissionResidual",
    label: "Signed-emission residual",
    symbol: "epsilon_signed",
    direction: "Lower is better for this compact diagnostic",
    definition:
      "The scaled difference from the expected signed complete-cycle reference. This is a cancellation and reference check, not an emission rate or total emitted amount.",
  }),
]);

export const HIGH_LEVEL_GATE_DEFINITIONS = Object.freeze([
  Object.freeze({
    id: "branchContinuity",
    label: "Branch continuity",
    definition:
      "All retained spatial-gradient and temporal-variation root branches report continuous accepted status.",
  }),
  Object.freeze({
    id: "fixedInternalPrimary",
    label: "Fixed internal · primary",
    definition:
      "Primary-resolution fixed internal receiver validity completed without a fail-closed defect.",
  }),
  Object.freeze({
    id: "fixedInternalRefined",
    label: "Fixed internal · refined",
    definition:
      "Refined-resolution fixed internal receiver validity completed without a fail-closed defect.",
  }),
  Object.freeze({
    id: "movingReceiverPrimary",
    label: "Moving receiver · primary",
    definition:
      "Primary-resolution moving internal receiver validity completed without a fail-closed defect.",
  }),
  Object.freeze({
    id: "movingReceiverRefined",
    label: "Moving receiver · refined",
    definition:
      "Refined-resolution moving internal receiver validity completed without a fail-closed defect.",
  }),
  Object.freeze({
    id: "surfaceQuadrature",
    label: "Surface quadrature",
    definition:
      "Every primary-versus-refined surface-quadrature subgate passed.",
  }),
  Object.freeze({
    id: "transmitterSensitivity",
    label: "Transmitter sensitivity",
    definition:
      "Source-coordinate sensitivity was intentionally not evaluated in the compact coverage lane, so this high-level gate has no compact denominator.",
  }),
]);

export const SURFACE_GATE_DEFINITIONS = Object.freeze([
  Object.freeze({
    id: "anisotropy",
    label: "Anisotropy",
    definition:
      "Largest absolute primary-versus-refined change in retained anisotropy rows.",
  }),
  Object.freeze({
    id: "causalWakeFlux",
    label: "Causal-wake flux",
    definition:
      "Largest relative-or-absolute primary-versus-refined change in complete-cycle causal-wake flux.",
  }),
  Object.freeze({
    id: "exposure",
    label: "Exposure",
    definition:
      "Largest relative primary-versus-refined change in exposure rows.",
  }),
  Object.freeze({
    id: "frequencyResolvedWakeFlux",
    label: "Frequency wake flux",
    definition:
      "Largest relative-or-absolute change in frequency-resolved wake-flux coefficients; coefficient identity must also match.",
  }),
  Object.freeze({
    id: "frequencyResolvedWakeFluxBandCoverage",
    label: "Frequency band coverage",
    definition:
      "Largest out-of-band RMS fraction for transmitter-tagged wake flux; retained-band identity must also pass.",
  }),
  Object.freeze({
    id: "radialExponent",
    label: "Radial exponent",
    definition:
      "Largest absolute primary-versus-refined change in eligible radial-exponent rows; row identity must also match.",
  }),
  Object.freeze({
    id: "rawEmissionReference",
    label: "Raw emission reference",
    definition:
      "Largest relative residual against the complete-cycle raw-emission reference; every reference row must pass.",
  }),
  Object.freeze({
    id: "retainedSpectralPower",
    label: "Retained spectral power",
    definition:
      "Largest relative primary-versus-refined change in retained spectral-power rows.",
  }),
  Object.freeze({
    id: "signedEmissionReference",
    label: "Signed emission reference",
    definition:
      "Largest relative-or-absolute residual against the signed complete-cycle emission reference; every reference row must pass.",
  }),
]);

function fail(message) {
  throw new Error(message);
}

function finiteValues(values = []) {
  return values
    .filter((value) => typeof value === "number" && Number.isFinite(value));
}

function assertSha256(value, label) {
  if (typeof value !== "string" || !SHA256_PATTERN.test(value)) {
    fail(`${label} must be a lowercase hexadecimal SHA-256.`);
  }
}

export function validateCompactSweepDashboardData(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    fail("dashboard data must be an object.");
  }
  if (data.schema !== COMPACT_SWEEP_DASHBOARD_SCHEMA) {
    fail(`unsupported dashboard data schema ${String(data.schema)}.`);
  }
  if (data.status !== "terminal-read-only-export") {
    fail("dashboard data is not a terminal read-only export.");
  }
  if (data.claimBoundary?.diagnosticOnly !== true) {
    fail("dashboard data must preserve the diagnostic-only claim boundary.");
  }
  if (data.identity?.combinedCandidateScoreCreated !== false) {
    fail("dashboard data must not contain a combined candidate score.");
  }
  [
    ["identity.dataHash", data.identity?.dataHash],
    ["identity.databaseSha256", data.identity?.databaseSha256],
    [
      "identity.analyzerReceiptFileSha256",
      data.identity?.analyzerReceiptFileSha256,
    ],
    [
      "identity.databaseVerificationFileSha256",
      data.identity?.databaseVerificationFileSha256,
    ],
  ].forEach(([label, value]) => assertSha256(value, label));
  if (!Array.isArray(data.rows)) {
    fail("dashboard data rows must be an array.");
  }
  if (data.summary?.drawn !== data.rows.length) {
    fail("dashboard summary.drawn must equal the retained row count.");
  }
  const rowKeys = new Set();
  data.rows.forEach((row, index) => {
    const label = `rows[${index}]`;
    if (typeof row?.rowKey !== "string" || row.rowKey.length === 0) {
      fail(`${label}.rowKey must be a nonempty string.`);
    }
    if (rowKeys.has(row.rowKey)) fail(`${label}.rowKey is duplicated.`);
    rowKeys.add(row.rowKey);
    [
      ["campaignHash", row.campaignHash],
      ["caseHash", row.caseHash],
      ["sampledSpecHash", row.sampledSpecHash],
      ["exactSourceHash", row.exactSourceHash],
      ["protocolHash", row.protocolHash],
      ["implementationHash", row.implementationHash],
    ].forEach(([field, value]) => assertSha256(value, `${label}.${field}`));
    if (typeof row.familyId !== "string" || typeof row.memberId !== "string") {
      fail(`${label} must retain familyId and memberId.`);
    }
    if (![ACTIVE_CANDIDATE_DISPOSITION, DEPRECATED_CONTROL_DISPOSITION]
      .includes(row.candidateDisposition)) {
      fail(`${label}.candidateDisposition is unsupported.`);
    }
    if (typeof row.comparativeRankingEligible !== "boolean") {
      fail(`${label}.comparativeRankingEligible must be boolean.`);
    }
    if (typeof row.evaluation?.evaluated !== "boolean") {
      fail(`${label}.evaluation.evaluated must be boolean.`);
    }
    if (!row.exactRerunInstruction ||
        typeof row.exactRerunInstruction !== "object") {
      fail(`${label} must retain the exact rerun instruction.`);
    }
  });
  return data;
}

export function thresholdRatio(value, threshold) {
  const observed = Number(value);
  const limit = Number(threshold);
  return Number.isFinite(observed) && Number.isFinite(limit) && limit > 0
    ? observed / limit
    : null;
}

export function quantile(values, probability) {
  const sorted = finiteValues(values).sort((left, right) => left - right);
  if (sorted.length === 0) return null;
  const boundedProbability = Math.max(0, Math.min(1, Number(probability)));
  const position = (sorted.length - 1) * boundedProbability;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) return sorted[lower];
  return sorted[lower] +
    (sorted[upper] - sorted[lower]) * (position - lower);
}

export function median(values) {
  return quantile(values, 0.5);
}

export function summarizeDistribution(values = []) {
  const retained = finiteValues(values);
  return {
    count: retained.length,
    minimum: quantile(retained, 0),
    q1: quantile(retained, 0.25),
    median: quantile(retained, 0.5),
    q3: quantile(retained, 0.75),
    maximum: quantile(retained, 1),
  };
}

export function pearsonCorrelation(pairs = []) {
  const retained = pairs
    .filter(([left, right]) =>
      typeof left === "number" && Number.isFinite(left) &&
      typeof right === "number" && Number.isFinite(right));
  if (retained.length < 2) return null;
  const leftMean = retained.reduce((sum, [left]) => sum + left, 0) /
    retained.length;
  const rightMean = retained.reduce((sum, [, right]) => sum + right, 0) /
    retained.length;
  let numerator = 0;
  let leftSquareSum = 0;
  let rightSquareSum = 0;
  retained.forEach(([left, right]) => {
    const leftDelta = left - leftMean;
    const rightDelta = right - rightMean;
    numerator += leftDelta * rightDelta;
    leftSquareSum += leftDelta ** 2;
    rightSquareSum += rightDelta ** 2;
  });
  const denominator = Math.sqrt(leftSquareSum * rightSquareSum);
  return denominator === 0 ? null : numerator / denominator;
}

export function filterCompactSweepRows(rows = [], filters = {}) {
  const familyId = String(filters.familyId ?? "all");
  const memberId = String(filters.memberId ?? "all");
  const candidateDisposition = String(
    filters.candidateDisposition ?? "all",
  );
  return rows.filter((row) =>
    (familyId === "all" || row.familyId === familyId) &&
    (memberId === "all" || row.memberId === memberId) &&
    (candidateDisposition === "all" ||
      row.candidateDisposition === candidateDisposition));
}

export function filterCompactSweepCaseRows(
  rows = [],
  query = "",
  filters = {},
) {
  const normalizedQuery = String(query ?? "").trim().toLowerCase();
  const sampleMatch = normalizedQuery.match(/\bsample(?:\s+|-)(\d+)\b/u);
  const querySampleOrdinal = sampleMatch ? Number(sampleMatch[1]) : null;
  const memberId = String(filters.memberId ?? "all");
  const selectedSampleOrdinal = String(filters.sampleOrdinal ?? "all");
  const remainingQuery = sampleMatch
    ? normalizedQuery.replace(sampleMatch[0], " ").trim()
    : normalizedQuery;
  const terms = remainingQuery.split(/\s+/u).filter(Boolean);

  return rows.filter((row) => {
    if (
      (memberId !== "all" && row.memberId !== memberId) ||
      (
        selectedSampleOrdinal !== "all" &&
        String(row.sampleOrdinal) !== selectedSampleOrdinal
      ) ||
      (
        querySampleOrdinal !== null &&
        Number(row.sampleOrdinal) !== querySampleOrdinal
      )
    ) {
      return false;
    }
    const haystack = [
      row.caseId,
      row.candidateId,
      row.caseHash,
      row.campaignHash,
      row.sampledSpecHash,
      row.exactSourceHash,
      row.memberId,
    ].join(" ").toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

export function buildEvaluationFunnel(rows = []) {
  const evaluatedRows = rows.filter((row) =>
    row.evaluation?.evaluated === true);
  const notEvaluatedRows = rows.filter((row) =>
    row.evaluation?.evaluated !== true);
  const compactPassedRows = evaluatedRows.filter((row) =>
    row.score?.passed === true);
  const gateFailedRows = evaluatedRows.filter((row) =>
    row.score?.passed === false);
  return {
    drawn: rows.length,
    evaluated: evaluatedRows.length,
    drawnNotEvaluated: notEvaluatedRows.length,
    gateFailed: gateFailedRows.length,
    compactPassed: compactPassedRows.length,
    eventConvergenceFailures: notEvaluatedRows.filter((row) =>
      row.evaluation?.nullClass === "event-convergence").length,
    minimumSeparationFailures: notEvaluatedRows.filter((row) =>
      row.evaluation?.nullClass === "minimum-separation").length,
    otherNotEvaluated: notEvaluatedRows.filter((row) =>
      !["event-convergence", "minimum-separation"].includes(
        row.evaluation?.nullClass,
      )).length,
  };
}

export function groupRows(rows = [], key = "memberId") {
  const groups = new Map();
  rows.forEach((row) => {
    const value = String(row?.[key] ?? "unknown");
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(row);
  });
  return [...groups.entries()].sort(([left], [right]) =>
    left.localeCompare(right, undefined, { numeric: true }));
}

export function summarizeGate(rows = [], gateKind, gateId) {
  const gateRows = rows.flatMap((row) => {
    const gate = row.gates?.[gateKind]?.[gateId];
    return gate && typeof gate.passed === "boolean" ? [gate] : [];
  });
  const passCount = gateRows.filter((gate) => gate.passed).length;
  const thresholdRatios = gateRows
    .map((gate) => gate.thresholdRatio)
    .filter((value) => Number.isFinite(value));
  return {
    denominator: gateRows.length,
    passCount,
    failureCount: gateRows.length - passCount,
    passRate: gateRows.length === 0 ? null : passCount / gateRows.length,
    medianThresholdRatio: median(thresholdRatios),
  };
}

export function metricValue(row, metricId) {
  const value = row?.metrics?.[metricId];
  return Number.isFinite(value) ? value : null;
}

export function caseResidualDetail(row) {
  const signedCycleResidual = metricValue(row, "signedCycleResidual");
  const signedEmissionResidual = metricValue(row, "signedEmissionResidual");
  const signedEmissionGate =
    row?.gates?.surfaceQuadrature?.signedEmissionReference;
  const signedEmissionThreshold =
    Number.isFinite(signedEmissionGate?.threshold)
      ? signedEmissionGate.threshold
      : null;
  return {
    signedCycleResidual,
    signedEmissionResidual,
    signedEmissionThreshold,
    signedEmissionThresholdRatio: thresholdRatio(
      signedEmissionResidual,
      signedEmissionThreshold,
    ),
    signedEmissionGateMaximum:
      Number.isFinite(signedEmissionGate?.maximumChange)
        ? signedEmissionGate.maximumChange
        : null,
    signedEmissionGateThresholdRatio:
      Number.isFinite(signedEmissionGate?.thresholdRatio)
        ? signedEmissionGate.thresholdRatio
        : null,
  };
}
