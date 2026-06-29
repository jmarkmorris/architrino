#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INPUT_SCHEMA = "aaa-equation-map-shared-observation-residual-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-shared-observation-residual-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";

const REQUIRED_ROWS = [
  "theta_obs",
  "theta_src",
  "theta_read",
  "theta_therm_prov",
  "theta_gal",
  "event_ledger",
  "frw_handoff",
  "thermal_provenance_ledger",
  "no_hidden_retune_witness",
];

const PROJECTION_FAMILIES = ["BBN", "CMB", "growth", "RAR"];

const EXPECTED_SHARED_KEYS = [
  "rho_NS",
  "n",
  "chi_sea",
  "Gamma_N",
  "u_sea",
  "M_sea_ab",
  "rho_bar",
  "rho_A",
  "eta",
  "N_eff",
  "Y_p",
  "H_eff",
  "a_eff",
];

const DEFAULT_TOLERANCES = {
  residual: 1,
  retune: 1e-12,
  handoff: 1e-12,
  provenance: 1e-12,
  sharedKey: 1e-12,
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}
if (!args.input) {
  throw new Error("Missing required --input PATH argument.");
}

const input = readJson(path.resolve(args.input));
const output = evaluateSharedObservationResidual(input, path.resolve(args.input));
writeOutput(output, args);

if (args.requirePopulated && output.summary.status !== "populated") {
  process.exitCode = 1;
}

function parseArgs(argv) {
const parsed = {
    input: null,
    out: null,
    pretty: false,
    summary: false,
    requirePopulated: false,
    focusRow: null,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      parsed.input = argv[++index];
    } else if (arg === "--out") {
      parsed.out = argv[++index];
    } else if (arg === "--pretty") {
      parsed.pretty = true;
    } else if (arg === "--summary") {
      parsed.summary = true;
    } else if (arg === "--require-populated") {
      parsed.requirePopulated = true;
    } else if (arg === "--focus-row") {
      parsed.focusRow = argv[++index];
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/equation-mapping/shared-observation-residual.mjs --input PATH [options]

Options:
  --input PATH          Shared-observation residual input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --focus-row ROW       Add diagnostic-only blocker detail for a required row.
  --help                Show this help.

This checker evaluates the score-neutral EQ-21/EQ-22/EQ-23/EQ-32
shared-observation residual. Attempt rows, toy rows, and non-durable
sources never raise scores.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeOutput(output, parsedArgs) {
  if (parsedArgs.focusRow) {
    output.summary.focusedBlockers = buildFocusedBlockers(output.rows, parsedArgs.focusRow);
  }
  const payload = parsedArgs.summary ? summarizeOutput(output) : output;
  const text = JSON.stringify(payload, null, parsedArgs.pretty ? 2 : 0);
  if (parsedArgs.out) {
    fs.writeFileSync(path.resolve(parsedArgs.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function buildFocusedBlockers(rows, focusRow) {
  const rowIds = focusRow === "all" ? REQUIRED_ROWS : [focusRow];
  return Object.fromEntries(
    rowIds.map((rowId) => {
      const row = rows[rowId];
      if (!row) {
        return [
          rowId,
          {
            nextBlocker: `unsupported_focus_row_${rowId}`,
            reason: "unsupported_focus_row",
          },
        ];
      }
      return [
        rowId,
        {
          nextBlocker: row.accepted ? null : `missing_accepted_${rowId}`,
          reason: row.accepted ? "accepted" : row.reason,
          status: row.status,
          rowId: row.rowId,
          sourcePath: row.sourcePath,
        },
      ];
    }),
  );
}

function evaluateSharedObservationResidual(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const observationRecord = input.observationRecord ?? {};
  const rows = collectRows(observationRecord);
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const projections = evaluateProjections(input.projections ?? {});
  const sharedKeys = evaluateSharedKeys(input.sharedKeys ?? [], tolerances);
  const sourceEvidence = evaluateSourceEvidence({
    rows,
    projections,
    sharedKeys,
  });
  const residual = evaluateResidual(input.residualComponents ?? {}, tolerances);
  const status = decideStatus({
    missingRows,
    sourceEvidence,
    projections,
    sharedKeys,
    residual,
  });
  const blockerContext = {
    status,
    missingRows,
    rows,
    rowChecks,
    sourceEvidence,
    projections,
    sharedKeys,
    residual,
  };
  const nextBlocker = firstBlocker(blockerContext);

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      schema: input.schema ?? null,
      schemaOk: input.schema === INPUT_SCHEMA,
      claimLevel: input.claimLevel ?? null,
    },
    residual: {
      id: input.residualId ?? null,
      row: "EQ-21/EQ-22/EQ-23/EQ-32",
      supportedRows: ["EQ-21", "EQ-22", "EQ-23", "EQ-32"],
      claimLevel:
        "score-neutral shared-observation residual; accepted retained rows are required before score movement",
    },
    tolerances,
    summary: {
      status,
      scoreDecision:
        status === "populated" ? "score_review_required" : SCORE_DECISION,
      missingRows,
      missingProjectionFamilies: projections.missingProjectionFamilies,
      missingSharedKeys: sharedKeys.missingSharedKeys,
      sharedKeyMismatchCount: sharedKeys.mismatches.length,
      nextBlocker,
      nextBlockerDetails: firstBlockerDetails(nextBlocker, blockerContext),
      thetaObsAccepted: rowChecks.theta_obs.accepted,
      sourceEvidenceAccepted: sourceEvidence.passed,
      sourceEvidenceFailureCount: sourceEvidence.failures.length,
      projectionFamiliesAccepted: projections.accepted,
      allExpectedKeysDeclared: sharedKeys.allExpectedKeysDeclared,
      sharedKeysAccepted: sharedKeys.accepted,
      hiddenRetuneNumericPass: sharedKeys.hiddenRetuneNumericPass,
      residualComputed: residual.computed,
      residualTotal: residual.total,
      residualPass: residual.passed,
    },
    rows: Object.fromEntries(
      REQUIRED_ROWS.map((rowId) => [
        rowId,
        {
          status: normalizeStatus(rows[rowId]),
          accepted: rowChecks[rowId].accepted,
          reason: rowChecks[rowId].reason,
          rowId: rows[rowId]?.rowId ?? rows[rowId]?.id ?? null,
          sourcePath: rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null,
        },
      ]),
    ),
    projections,
    sharedKeys,
    sourceEvidence,
    residualComponents: residual,
  };
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    residual: output.residual,
    summary: output.summary,
    rows: output.rows,
    projections: {
      accepted: output.projections.accepted,
      missingProjectionFamilies: output.projections.missingProjectionFamilies,
      families: output.projections.families,
    },
    sharedKeys: {
      accepted: output.sharedKeys.accepted,
      missingSharedKeys: output.sharedKeys.missingSharedKeys,
      hiddenRetuneNumericPass: output.sharedKeys.hiddenRetuneNumericPass,
      mismatches: output.sharedKeys.mismatches,
    },
    sourceEvidence: {
      accepted: output.sourceEvidence.passed,
      failureCount: output.sourceEvidence.failures.length,
      firstFailure: output.sourceEvidence.firstFailure,
    },
    residualComponents: {
      computed: output.residualComponents.computed,
      total: output.residualComponents.total,
      passed: output.residualComponents.passed,
      terms: output.residualComponents.terms,
    },
  };
}

function evaluateSourceEvidence({ rows, projections, sharedKeys }) {
  const retainedRows = REQUIRED_ROWS.map((rowId) =>
    evaluateSourceEvidenceEntry({
      scope: "row",
      id: rowId,
      status: rows[rowId]?.status ?? rows[rowId]?.retainedStatus ?? null,
      sourcePath: rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null,
    }),
  );
  const projectionRows = PROJECTION_FAMILIES.map((family) =>
    evaluateSourceEvidenceEntry({
      scope: "projection",
      id: family,
      status: projections.families[family]?.status,
      sourcePath: projections.families[family]?.sourcePath,
    }),
  );
  const sharedKeyRows = EXPECTED_SHARED_KEYS.map((key) =>
    evaluateSourceEvidenceEntry({
      scope: "shared_key",
      id: key,
      status: sharedKeys.keys[key]?.status,
      sourcePath: sharedKeys.keys[key]?.sourcePath,
    }),
  );
  const entries = [...retainedRows, ...projectionRows, ...sharedKeyRows];
  const failures = entries.filter((entry) => !entry.passed);
  return {
    passed: failures.length === 0,
    failures,
    firstFailure: failures[0] ?? null,
    entries,
  };
}

function evaluateSourceEvidenceEntry({ scope, id, status, sourcePath }) {
  const requiresEvidence = ACCEPTED_STATUSES.has(status);
  if (!requiresEvidence) {
    return {
      scope,
      id,
      status: status ?? "missing",
      sourcePath: sourcePath ?? null,
      passed: true,
      reason: "not_accepted",
    };
  }
  const evidenceReason = sourceEvidenceReason(sourcePath);
  return {
    scope,
    id,
    status,
    sourcePath: sourcePath ?? null,
    passed: evidenceReason === "accepted",
    reason: evidenceReason,
  };
}

function collectRows(observationRecord) {
  const subrecords = observationRecord.subrecords ?? {};
  return {
    theta_obs: observationRecord,
    theta_src: subrecords.theta_src,
    theta_read: subrecords.theta_read,
    theta_therm_prov: subrecords.theta_therm_prov,
    theta_gal: subrecords.theta_gal,
    event_ledger: subrecords.event_ledger,
    frw_handoff: observationRecord.frwHandoff,
    thermal_provenance_ledger: observationRecord.thermalProvenanceLedger,
    no_hidden_retune_witness: observationRecord.noHiddenRetuneWitness,
  };
}

function evaluateProjections(rawProjections) {
  const familyRows = Object.fromEntries(
    PROJECTION_FAMILIES.map((family) => {
      const row = rawProjections[family] ?? rawProjections[family.toLowerCase()];
      const check = evaluateAcceptedRow(row);
      return [
        family,
        {
          id: row?.id ?? row?.rowId ?? null,
          status: normalizeStatus(row),
          accepted: check.accepted,
          reason: check.reason,
          residual: finiteNumberOrNull(row?.residual),
          consumedKeys: Array.isArray(row?.consumedKeys) ? row.consumedKeys : [],
          sourcePath: row?.sourcePath ?? row?.source ?? null,
        },
      ];
    }),
  );
  const missingProjectionFamilies = PROJECTION_FAMILIES.filter(
    (family) => !familyRows[family].accepted,
  );
  return {
    accepted: missingProjectionFamilies.length === 0,
    missingProjectionFamilies,
    families: familyRows,
  };
}

function evaluateSharedKeys(rawKeys, tolerances) {
  const keyRows = new Map(
    (Array.isArray(rawKeys) ? rawKeys : []).map((row) => [row.key, row]),
  );
  const keys = Object.fromEntries(
    EXPECTED_SHARED_KEYS.map((key) => {
      const row = keyRows.get(key);
      const check = evaluateAcceptedRow(row);
      const comparison = compareProjectionValues(row?.projectionValues ?? {}, tolerances);
      return [
        key,
        {
          status: normalizeStatus(row),
          accepted: check.accepted,
          reason: check.reason,
          sourcePath: row?.sourcePath ?? row?.source ?? null,
          declaredTransformationStatus:
            row?.declaredTransformation?.status ??
            row?.transformationStatus ??
            null,
          values: row?.projectionValues ?? {},
          mismatch: comparison.mismatch,
          maxDelta: comparison.maxDelta,
          pass: comparison.pass,
        },
      ];
    }),
  );
  const missingSharedKeys = EXPECTED_SHARED_KEYS.filter(
    (key) => !keys[key].accepted,
  );
  const mismatches = Object.entries(keys)
    .filter(([, value]) => value.mismatch)
    .map(([key, value]) => ({
      key,
      maxDelta: value.maxDelta,
      declaredTransformationStatus: value.declaredTransformationStatus,
    }));
  return {
    accepted: missingSharedKeys.length === 0,
    allExpectedKeysDeclared: EXPECTED_SHARED_KEYS.every((key) => keyRows.has(key)),
    missingSharedKeys,
    expectedKeys: EXPECTED_SHARED_KEYS,
    hiddenRetuneNumericPass: mismatches.length === 0,
    mismatches,
    keys,
  };
}

function evaluateResidual(rawComponents, tolerances) {
  const terms = Object.entries(rawComponents)
    .map(([name, component]) => {
      const value = finiteNumberOrNull(component?.value ?? component);
      const weight = finiteNumberOrNull(component?.weight) ?? 1;
      return {
        name,
        value,
        weight,
        contribution: value === null ? null : weight * value,
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));
  const computed = terms.length > 0 && terms.every((term) => term.contribution !== null);
  const total = computed
    ? terms.reduce((sum, term) => sum + term.contribution, 0)
    : null;
  return {
    computed,
    total,
    tolerance: tolerances.residual,
    passed: total !== null && total <= tolerances.residual,
    terms,
  };
}

function compareProjectionValues(projectionValues, tolerances) {
  const values = Object.values(projectionValues)
    .map((value) => finiteNumberOrNull(value))
    .filter((value) => value !== null);
  if (values.length < 2) {
    return { mismatch: false, maxDelta: 0, pass: true };
  }
  let maxDelta = 0;
  for (let index = 0; index < values.length; index += 1) {
    for (let other = index + 1; other < values.length; other += 1) {
      maxDelta = Math.max(maxDelta, Math.abs(values[index] - values[other]));
    }
  }
  return {
    mismatch: maxDelta > tolerances.sharedKey,
    maxDelta,
    pass: maxDelta <= tolerances.sharedKey,
  };
}

function decideStatus({ missingRows, sourceEvidence, projections, sharedKeys, residual }) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!sourceEvidence.passed) {
    return "blocked_source_evidence";
  }
  if (!projections.accepted) {
    return "blocked_missing_projection_family";
  }
  if (!sharedKeys.accepted) {
    return "blocked_missing_shared_keys";
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return "blocked_hidden_retune";
  }
  if (!residual.computed) {
    return "blocked_missing_residual_vector";
  }
  if (!residual.passed) {
    return "blocked_residual_above_tolerance";
  }
  return "populated";
}

function firstBlocker({ status, missingRows, sourceEvidence, projections, sharedKeys, residual }) {
  if (status === "populated") {
    return null;
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!sourceEvidence.passed) {
    return "accepted_without_evidence_source";
  }
  if (!projections.accepted) {
    return `missing_accepted_projection_${projections.missingProjectionFamilies[0]}`;
  }
  if (!sharedKeys.accepted) {
    return `missing_accepted_shared_key_${sharedKeys.missingSharedKeys[0]}`;
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return `hidden_retune_${sharedKeys.mismatches[0]?.key ?? "shared_key"}`;
  }
  if (!residual.computed) {
    return "missing_residual_vector";
  }
  if (!residual.passed) {
    return "residual_above_tolerance";
  }
  return status;
}

function firstBlockerDetails(nextBlocker, context) {
  if (!nextBlocker) {
    return null;
  }
  const { missingRows, rows, rowChecks, sourceEvidence, projections, sharedKeys, residual } = context;
  const missingRowId = missingRows.find(
    (rowId) => nextBlocker === `missing_accepted_${rowId}`,
  );
  if (missingRowId) {
    return retainedRowDetail(missingRowId, rows[missingRowId], rowChecks[missingRowId]);
  }
  if (nextBlocker === "accepted_without_evidence_source") {
    return {
      id: sourceEvidence.firstFailure?.id ?? "source_evidence",
      scope: sourceEvidence.firstFailure?.scope ?? null,
      status: sourceEvidence.firstFailure?.status ?? "failed",
      reason: sourceEvidence.firstFailure?.reason ?? "accepted_without_evidence_source",
      sourcePath: sourceEvidence.firstFailure?.sourcePath ?? null,
      failureCount: sourceEvidence.failures.length,
    };
  }
  const projectionPrefix = "missing_accepted_projection_";
  if (nextBlocker.startsWith(projectionPrefix)) {
    const family = nextBlocker.slice(projectionPrefix.length);
    return projectionDetail(family, projections.families[family]);
  }
  const sharedKeyPrefix = "missing_accepted_shared_key_";
  if (nextBlocker.startsWith(sharedKeyPrefix)) {
    const key = nextBlocker.slice(sharedKeyPrefix.length);
    return sharedKeyDetail(key, sharedKeys.keys[key]);
  }
  if (nextBlocker.startsWith("hidden_retune_")) {
    const mismatch = sharedKeys.mismatches[0] ?? null;
    return {
      id: nextBlocker,
      reason: "shared_key_hidden_retune_mismatch",
      mismatch,
      key: mismatch?.key ?? null,
      keyDetail: mismatch ? sharedKeyDetail(mismatch.key, sharedKeys.keys[mismatch.key]) : null,
    };
  }
  if (nextBlocker === "missing_residual_vector") {
    return {
      id: nextBlocker,
      reason: "residual_vector_missing_or_not_numeric",
      computed: residual.computed,
      termCount: residual.terms.length,
    };
  }
  if (nextBlocker === "residual_above_tolerance") {
    return {
      id: nextBlocker,
      reason: "residual_above_tolerance",
      total: residual.total,
      tolerance: residual.tolerance,
    };
  }
  return {
    id: nextBlocker,
    reason: "first_blocker_without_detail",
  };
}

function retainedRowDetail(id, row, check) {
  const sourcePath = row?.sourcePath ?? row?.source ?? null;
  return {
    id,
    status: normalizeStatus(row),
    accepted: check?.accepted ?? false,
    reason: check?.reason ?? "missing_row",
    rowId: row?.rowId ?? row?.id ?? row?.key ?? null,
    sourcePath,
    sourceReferenceExists: sourceReferenceExists(sourcePath),
  };
}

function projectionDetail(family, row) {
  const sourcePath = row?.sourcePath ?? null;
  return {
    id: `projection_${family}`,
    family,
    status: row?.status ?? "missing",
    accepted: row?.accepted ?? false,
    reason: row?.reason ?? "missing_projection_family",
    rowId: row?.id ?? null,
    sourcePath,
    sourceReferenceExists: sourceReferenceExists(sourcePath),
    residual: row?.residual ?? null,
    consumedKeys: row?.consumedKeys ?? [],
  };
}

function sharedKeyDetail(key, row) {
  const sourcePath = row?.sourcePath ?? null;
  return {
    id: `shared_key_${key}`,
    key,
    status: row?.status ?? "missing",
    accepted: row?.accepted ?? false,
    reason: row?.reason ?? "missing_shared_key",
    sourcePath,
    sourceReferenceExists: sourceReferenceExists(sourcePath),
    declaredTransformationStatus: row?.declaredTransformationStatus ?? null,
    maxDelta: row?.maxDelta ?? null,
    pass: row?.pass ?? null,
  };
}

function parseTolerances(raw) {
  return {
    residual: positiveNumber(
      raw.residual ?? DEFAULT_TOLERANCES.residual,
      "tolerances.residual",
    ),
    retune: positiveNumber(
      raw.retune ?? DEFAULT_TOLERANCES.retune,
      "tolerances.retune",
    ),
    handoff: positiveNumber(
      raw.handoff ?? DEFAULT_TOLERANCES.handoff,
      "tolerances.handoff",
    ),
    provenance: positiveNumber(
      raw.provenance ?? DEFAULT_TOLERANCES.provenance,
      "tolerances.provenance",
    ),
    sharedKey: positiveNumber(
      raw.sharedKey ?? DEFAULT_TOLERANCES.sharedKey,
      "tolerances.sharedKey",
    ),
  };
}

function evaluateAcceptedRow(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return { accepted: false, reason: "missing_row" };
  }
  const status = row.status ?? row.retainedStatus ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  if (!concreteString(row.rowId ?? row.id ?? row.key)) {
    return { accepted: false, reason: "row_identity_not_concrete" };
  }
  const sourceReason = firstSourceEvidenceReason(row.sourcePath, row.source);
  if (sourceReason !== "accepted") {
    return { accepted: false, reason: sourceReason };
  }
  return { accepted: true, reason: "accepted" };
}

function normalizeStatus(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return "missing";
  }
  return row.status ?? row.retainedStatus ?? "declared";
}

function finiteNumberOrNull(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function positiveNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${label} must be a positive finite number.`);
  }
  return number;
}

function concreteString(value) {
  const text = typeof value === "string" ? value.trim() : "";
  const lowerText = text.toLowerCase();
  return (
    text !== "" &&
    text !== "..." &&
    !text.includes("<") &&
    !lowerText.includes("todo") &&
    !lowerText.includes("pending") &&
    !lowerText.includes("placeholder")
  );
}

function sourceReferenceExists(value) {
  return sourceEvidenceReason(value) === "accepted";
}

function firstSourceEvidenceReason(...values) {
  let firstReason = "missing_source_path";
  for (const value of values) {
    const reason = sourceEvidenceReason(value);
    if (reason === "accepted") {
      return "accepted";
    }
    if (firstReason === "missing_source_path") {
      firstReason = reason;
    }
  }
  return firstReason;
}

function sourceEvidenceReason(value) {
  if (!concreteString(value)) {
    return "missing_source_path";
  }
  const resolvedPath = path.resolve(value.trim());
  if (isNonDurableSourcePath(resolvedPath)) {
    return "non_durable_source_path";
  }
  try {
    if (!fs.statSync(resolvedPath).isFile()) {
      return "source_not_file";
    }
  } catch {
    return "source_not_found";
  }
  const normalized = path.normalize(resolvedPath);
  const relative = path.relative(process.cwd(), normalized);
  if (
    relative === "" ||
    relative.startsWith("..") ||
    path.isAbsolute(relative)
  ) {
    return "source_outside_repo";
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return "coordination_source_path";
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return "authored_prose_source_path";
  }
  const basename = path.basename(normalized).toLowerCase();
  if (
    basename.includes("attempt") ||
    basename.includes("mock") ||
    basename.includes("toy") ||
    basename.includes("probe") ||
    basename.includes("negative-control") ||
    basename.includes(".tmp")
  ) {
    return "control_or_attempt_source_path";
  }
  return "accepted";
}

function isNonDurableSourcePath(filePath) {
  const normalized = path.normalize(filePath);
  return (
    normalized.startsWith(`${path.normalize("/tmp")}${path.sep}`) ||
    normalized.startsWith(`${path.normalize("/private/tmp")}${path.sep}`) ||
    normalized.includes(`${path.sep}content${path.sep}generated${path.sep}`) ||
    path.basename(normalized).includes(".tmp")
  );
}
