import {
  validateBorgSelection,
} from "../shared/BorgSelectionNavigation.mjs";
import {
  exactModelKey,
  validateBorgAssemblyRegistry,
} from "../borg/registry/BorgAssemblyRegistryContract.mjs";
import {
  describeBorgScientificStatus,
  validateBorgScientificStatusProjection,
} from "../borg/BorgScientificStatus.mjs";

export const BRAID_EVIDENCE_INDEX_SCHEMA = "braid-search/evidence-index.v1";

export const COMPACT_SWEEP_DASHBOARD_SCHEMA =
  "prescribed-path-analysis/compact-sweep-dashboard-data.v3";

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
      "Primary-resolution fixed internal receiver verification completed without a verification failure.",
  }),
  Object.freeze({
    id: "fixedInternalRefined",
    label: "Fixed internal · refined",
    definition:
      "Refined-resolution fixed internal receiver verification completed without a verification failure.",
  }),
  Object.freeze({
    id: "movingReceiverPrimary",
    label: "Moving receiver · primary",
    definition:
      "Primary-resolution moving internal receiver verification completed without a verification failure.",
  }),
  Object.freeze({
    id: "movingReceiverRefined",
    label: "Moving receiver · refined",
    definition:
      "Refined-resolution moving internal receiver verification completed without a verification failure.",
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
    ["identity.borgRegistrySha256", data.identity?.borgRegistrySha256],
  ].forEach(([label, value]) => assertSha256(value, label));
  if (typeof data.identity?.borgRegistryRevision !== "string" ||
      data.identity.borgRegistryRevision.length === 0) {
    fail("identity.borgRegistryRevision must be a nonempty string.");
  }
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
    if (typeof row.assemblyId !== "string" ||
        typeof row.sourceSlug !== "string") {
      fail(`${label} must retain assemblyId and sourceSlug.`);
    }
    assertSha256(row.modelRevisionSha256, `${label}.modelRevisionSha256`);
    if (row.assemblyId !== `asm-${row.modelRevisionSha256.slice(0, 32)}`) {
      fail(`${label} exact identity pair is inconsistent.`);
    }
    let borgSelection;
    try {
      borgSelection = validateBorgSelection(
        row.borgSelection,
        `${label}.borgSelection`,
      );
    } catch {
      fail(`${label}.borgSelection must retain the row's exact assembly pair and permanent braidId.`);
    }
    if (borgSelection.assemblyId !== row.assemblyId ||
        borgSelection.modelRevisionSha256 !== row.modelRevisionSha256) {
      fail(`${label}.borgSelection must retain the row's exact assembly pair and permanent braidId.`);
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
  const assemblyId = String(filters.assemblyId ?? "all");
  const sourceSlug = String(filters.sourceSlug ?? "all");
  const candidateDisposition = String(
    filters.candidateDisposition ?? "all",
  );
  return rows.filter((row) =>
    (assemblyId === "all" || row.assemblyId === assemblyId) &&
    (sourceSlug === "all" || row.sourceSlug === sourceSlug) &&
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
  const sourceSlug = String(filters.sourceSlug ?? "all");
  const selectedSampleOrdinal = String(filters.sampleOrdinal ?? "all");
  const remainingQuery = sampleMatch
    ? normalizedQuery.replace(sampleMatch[0], " ").trim()
    : normalizedQuery;
  const terms = remainingQuery.split(/\s+/u).filter(Boolean);

  return rows.filter((row) => {
    if (
      (sourceSlug !== "all" && row.sourceSlug !== sourceSlug) ||
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
      row.sourceSlug,
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

export function groupRows(rows = [], key = "sourceSlug") {
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

function validateCampaignRegistry(value, registryEntries) {
  if (value?.schema !==
      "prescribed-path-analysis/all-candidate-campaign-registry.v2" ||
      !Array.isArray(value.candidates)) {
    fail("current compact campaign registry is invalid.");
  }
  const registered = new Map(registryEntries.map((entry) => [
    exactModelKey(entry),
    entry,
  ]));
  const identities = new Set();
  value.candidates.forEach((candidate, index) => {
    const key = exactModelKey(candidate);
    if (!registered.has(key)) {
      fail(`campaign candidate ${index} is not a current Borg identity.`);
    }
    if (identities.has(key)) {
      fail(`campaign candidate ${index} duplicates an exact identity.`);
    }
    identities.add(key);
    if (candidate.specPath !== registered.get(key).sourceSpec) {
      fail(`campaign candidate ${index} does not match its Borg source.`);
    }
  });
  return value;
}

function validateSourceSpec(entry, spec) {
  if (spec?.schema !== "prescribed-assembly-spec.v3" ||
      spec.identity?.assemblyId !== entry.assemblyId ||
      spec.identity?.modelRevisionSha256 !== entry.modelRevisionSha256 ||
      typeof spec.claimGrade !== "string" ||
      typeof spec.evidenceStatus !== "string") {
    fail(`source specification does not match ${exactModelKey(entry)}.`);
  }
  return spec;
}

function compactRowsByIdentity(campaignData, entries) {
  const result = new Map(entries.map((entry) => [exactModelKey(entry), []]));
  if (campaignData == null) return result;
  const data = validateCompactSweepDashboardData(campaignData);
  data.rows.forEach((row) => {
    const key = exactModelKey(row);
    if (!result.has(key)) {
      fail(`compact campaign row is not a current Borg identity: ${key}.`);
    }
    result.get(key).push(row);
  });
  return result;
}

function countEvidenceLinks(status) {
  return [status.current, ...status.context]
    .filter(Boolean)
    .reduce((count, relation) => count + relation.evidenceLinks.length, 0);
}

export function validateHistoricalCompactArchive(value) {
  if (value?.schema !==
      "prescribed-path-analysis/compact-sweep-dashboard-data.v1" ||
      value?.status !== "terminal-read-only-export" ||
      !Array.isArray(value.rows) ||
      value.summary?.drawn !== value.rows.length) {
    fail("historical compact archive is invalid.");
  }
  return Object.freeze({
    schema: value.schema,
    status: "preserved-unbound",
    drawn: value.summary.drawn,
    evaluated: value.summary.evaluated,
    drawnNotEvaluated: value.summary.drawnNotEvaluated,
    compactPassed: value.summary.compactPassed,
    campaignCount: value.summary.campaignCount,
    reason:
      "The retained rows predate exact Borg identity pins. They remain available " +
      "as historical campaign evidence but are not reassigned to current models.",
  });
}

export function buildBraidEvidenceIndex({
  registry: rawRegistry,
  projection: rawProjection,
  campaignRegistry: rawCampaignRegistry,
  sourceSpecsByPath,
  campaignData = null,
  campaignError = null,
  historicalArchive = null,
  projectionIntegrity = {},
} = {}) {
  const registry = validateBorgAssemblyRegistry(rawRegistry);
  const projection = validateBorgScientificStatusProjection(rawProjection);
  const campaignRegistry = validateCampaignRegistry(
    rawCampaignRegistry,
    registry.entries,
  );
  if (!(sourceSpecsByPath instanceof Map)) {
    fail("sourceSpecsByPath must be a Map.");
  }
  const campaignTargets = new Map(campaignRegistry.candidates.map(
    (candidate) => [exactModelKey(candidate), candidate],
  ));
  const campaignRows = compactRowsByIdentity(campaignData, registry.entries);
  const records = registry.entries.map((entry) => {
    const spec = validateSourceSpec(entry, sourceSpecsByPath.get(entry.sourceSpec));
    const scientificStatus = describeBorgScientificStatus(
      spec,
      entry,
      projection,
      projectionIntegrity,
    );
    const rows = campaignRows.get(exactModelKey(entry));
    const campaignTarget = campaignTargets.get(exactModelKey(entry)) ?? null;
    return Object.freeze({
      assemblyId: entry.assemblyId,
      modelRevisionSha256: entry.modelRevisionSha256,
      braidId: entry.braidId,
      label: entry.label,
      sourceIdentity: entry.sourceIdentity,
      sourceSpec: entry.sourceSpec,
      recordUrl: entry.recordUrl,
      recordSha256: entry.recordSha256,
      claimGrade: spec.claimGrade,
      evidenceStatus: spec.evidenceStatus,
      scientificStatus,
      compactCampaign: Object.freeze({
        targeted: campaignTarget !== null,
        sourceSlug: campaignTarget?.sourceSlug ?? null,
        rowCount: rows.length,
        status: rows.length > 0
          ? "exact-rows-loaded"
          : campaignTarget
            ? "targeted-no-export"
            : "not-in-current-cohort",
      }),
      evidenceItemCount: 2 + countEvidenceLinks(scientificStatus) + rows.length,
    });
  });
  const counts = records.reduce((result, record) => {
    result[record.scientificStatus.aggregateCategory] += 1;
    if (record.scientificStatus.current) result.exactAdjudications += 1;
    if (record.scientificStatus.context.length) result.contextLinked += 1;
    if (record.compactCampaign.targeted) result.compactTargets += 1;
    if (record.compactCampaign.rowCount) result.compactRows += record.compactCampaign.rowCount;
    return result;
  }, {
    pass: 0,
    "scoped-fail": 0,
    unknown: 0,
    unindexed: 0,
    stale: 0,
    exactAdjudications: 0,
    contextLinked: 0,
    compactTargets: 0,
    compactRows: 0,
  });
  return Object.freeze({
    schema: BRAID_EVIDENCE_INDEX_SCHEMA,
    registryRevision: registry.revision,
    projectionRevision: projection.revision,
    records: Object.freeze(records),
    summary: Object.freeze({
      identityCount: records.length,
      ...counts,
    }),
    compactCampaign: Object.freeze({
      loaded: campaignData !== null,
      error: campaignError,
    }),
    historicalArchive,
  });
}
