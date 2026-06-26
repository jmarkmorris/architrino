#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "eq23a-explosive-source-window-identity-attempt.v1.json");
const INPUT_SCHEMA = "aaa-equation-map-eq23a-explosive-source-window-identity-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq23a-explosive-source-window-identity-check/v1";
const SCORE_DECISION = "no_score_increase";
const FIRST_BLOCKER = "missing_accepted_explosive_source_window_carrier";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);

const SOURCE_IDENTITY_FIELDS = [
  "carrierId",
  "thetaSrcId",
  "thetaThermProvId",
  "sourceWindowId",
  "supportId",
  "eventLedgerId",
  "noetherSeaUpdateId",
  "readoutIntervalId",
  "retuneWitnessId",
];

const ROW_IDENTITY_FIELDS = [
  "carrierId",
  "thetaSrcId",
  "thetaThermProvId",
  "sourceWindowId",
  "supportId",
  "eventLedgerId",
];

const REQUIRED_ROWS = [
  "shock_jump_blast_row",
  "neutrino_heating_row",
  "reaction_yield_row",
  "radioactive_heating_row",
  "photon_output_row",
  "remnant_medium_heating_row",
  "event_ledger_row",
  "source_provenance",
  "no_hidden_retune_witness",
];

const REQUIRED_ROW_FIELDS = [
  "status",
  "rowId",
  "carrierId",
  "thetaSrcId",
  "thetaThermProvId",
  "sourceWindowId",
  "supportId",
  "eventLedgerId",
  "sourcePath",
];

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluateEq23aExplosiveIdentity(input, inputPath, { evaluateControls: true });
writeOutput(output, args);

if (args.requirePopulated && output.summary.status !== "populated_score_neutral") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: DEFAULT_INPUT_PATH,
    out: null,
    pretty: false,
    summary: false,
    requirePopulated: false,
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
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/equation-mapping/eq23a-explosive-source-window-identity-check.mjs [options]

Options:
  --input PATH          EQ-23A explosive source-window identity JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the identity shell is populated.
  --help                Show this help.

This checker is score-neutral. It validates the EQ-23A source-window identity
contract and rejects split source, thermal/provenance, ledger, Noether sea,
or retune-witness rows before any explosive residual arithmetic is evaluated.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeOutput(output, parsedArgs) {
  const payload = parsedArgs.summary ? summarizeOutput(output) : output;
  const text = JSON.stringify(payload, null, parsedArgs.pretty ? 2 : 0);
  if (parsedArgs.out) {
    fs.writeFileSync(path.resolve(parsedArgs.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function evaluateEq23aExplosiveIdentity(input, inputPath, options = {}) {
  const rows = input.rows ?? {};
  const schemaOk = input.schema === INPUT_SCHEMA;
  const topLevel = evaluateTopLevel(input);
  const carrier = evaluateCarrier(input.carrier ?? {}, input.sourceIdentity ?? {});
  const sourceIdentity = evaluateSourceIdentity(input.sourceIdentity ?? {});
  const rowContract = evaluateRows(rows);
  const identityConsistency = evaluateIdentityConsistency({
    carrier: input.carrier ?? {},
    sourceIdentity: input.sourceIdentity ?? {},
    rows,
  });
  const sourceEvidence = evaluateAcceptedSourceEvidence(input.carrier ?? {}, rows);
  const rowAcceptance = evaluateRowAcceptance(input.carrier ?? {}, rows);
  const status = decideStatus({
    schemaOk,
    topLevel,
    carrier,
    sourceIdentity,
    rowContract,
    identityConsistency,
    sourceEvidence,
    rowAcceptance,
  });
  const nextBlocker = firstBlocker({
    status,
    schemaOk,
    topLevel,
    carrier,
    sourceIdentity,
    rowContract,
    identityConsistency,
    sourceEvidence,
    rowAcceptance,
  });
  const negativeControls = options.evaluateControls
    ? evaluateNegativeControls(input, input.negativeControls ?? [], inputPath)
    : [];

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      schema: input.schema ?? null,
      schemaOk,
      claimLevel: input.claimLevel ?? null,
    },
    residual: {
      row: "EQ-23A",
      claimLevel:
        "score-neutral explosive source-window identity check; residual arithmetic is deferred until an accepted carrier exists",
      residualArithmeticEvaluated: false,
    },
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      declaredScoreDecision: input.scoreDecision ?? null,
      nextBlocker,
      declaredNextBlocker: input.nextBlocker ?? null,
      residualArithmeticEvaluated: false,
      schemaOk,
      topLevelPass: topLevel.passed,
      carrierIdentityPass: carrier.passed,
      sourceIdentityPass: sourceIdentity.passed,
      rowContractPass: rowContract.passed,
      identityConsistencyPass: identityConsistency.passed,
      sourceEvidenceAccepted: sourceEvidence.passed,
      sourceEvidenceFailureCount: sourceEvidence.failures.length,
      carrierAccepted: rowAcceptance.carrierAccepted,
      acceptedRowCount: rowAcceptance.acceptedRows.length,
      missingRows: rowAcceptance.missingRows,
      negativeControlPassCount: negativeControls.filter((control) => control.passed).length,
      negativeControlCount: negativeControls.length,
      failedNegativeControls: negativeControls.filter((control) => !control.passed).map((control) => control.id),
    },
    topLevel,
    carrier,
    sourceIdentity,
    rows: rowContract.rows,
    identityConsistency,
    sourceEvidence,
    rowAcceptance,
    negativeControls,
  };
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    residual: output.residual,
    summary: output.summary,
    firstMismatch: output.identityConsistency.firstMismatch,
    sourceEvidenceFirstFailure: output.sourceEvidence.firstFailure,
    negativeControls: output.negativeControls.map((control) => ({
      id: control.id,
      expectedFailure: control.expectedFailure,
      status: control.status,
      nextBlocker: control.nextBlocker,
      passed: control.passed,
    })),
  };
}

function evaluateTopLevel(input) {
  const required = [
    ["schema", input.schema],
    ["row", input.row],
    ["scoreDecision", input.scoreDecision],
    ["nextBlocker", input.nextBlocker],
    ["carrier.id", input.carrier?.id],
    ["carrier.rowId", input.carrier?.rowId],
    ["carrier.status", input.carrier?.status],
    ["carrier.sourcePath", input.carrier?.sourcePath],
  ];
  const missing = required.filter(([, value]) => !concreteValue(value)).map(([field]) => field);
  const mismatches = [];
  if (concreteValue(input.row) && input.row !== "EQ-23A") {
    mismatches.push({ field: "row", expected: "EQ-23A", actual: input.row, reason: "wrong_row" });
  }
  if (concreteValue(input.scoreDecision) && input.scoreDecision !== SCORE_DECISION) {
    mismatches.push({
      field: "scoreDecision",
      expected: SCORE_DECISION,
      actual: input.scoreDecision,
      reason: "score_decision_not_neutral",
    });
  }
  return {
    passed: missing.length === 0 && mismatches.length === 0,
    missing,
    mismatches,
  };
}

function evaluateCarrier(carrier, sourceIdentity) {
  const mismatches = [];
  if (concreteValue(carrier.id) && concreteValue(sourceIdentity.carrierId) && carrier.id !== sourceIdentity.carrierId) {
    mismatches.push({
      field: "carrier.id",
      expected: sourceIdentity.carrierId,
      actual: carrier.id,
      reason: "carrier_id_split",
    });
  }
  return {
    status: normalizeStatus(carrier),
    id: carrier.id ?? null,
    rowId: carrier.rowId ?? null,
    sourcePath: carrier.sourcePath ?? carrier.source ?? null,
    passed: mismatches.length === 0,
    mismatches,
  };
}

function evaluateSourceIdentity(sourceIdentity) {
  const missingFields = SOURCE_IDENTITY_FIELDS.filter((field) => !concreteValue(sourceIdentity[field]));
  return {
    passed: missingFields.length === 0,
    fields: Object.fromEntries(SOURCE_IDENTITY_FIELDS.map((field) => [field, sourceIdentity[field] ?? null])),
    missingFields,
  };
}

function evaluateRows(rows) {
  const evaluatedRows = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => {
      const row = rows[rowId] ?? {};
      const missingFields = REQUIRED_ROW_FIELDS.filter((field) => !concreteValue(row[field]));
      if (rowId === "remnant_medium_heating_row" && !concreteValue(row.noetherSeaUpdateId)) {
        missingFields.push("noetherSeaUpdateId");
      }
      if (rowId === "no_hidden_retune_witness" && !concreteValue(row.retuneWitnessId)) {
        missingFields.push("retuneWitnessId");
      }
      return [
        rowId,
        {
          status: normalizeStatus(row),
          rowId: row.rowId ?? row.id ?? null,
          sourcePath: row.sourcePath ?? row.source ?? null,
          missingFields,
          passed: missingFields.length === 0,
        },
      ];
    }),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !isPlainObject(rows[rowId]));
  const rowsWithMissingFields = Object.entries(evaluatedRows)
    .filter(([, row]) => row.missingFields.length > 0)
    .map(([rowId, row]) => ({ rowId, missingFields: row.missingFields }));
  return {
    passed: missingRows.length === 0 && rowsWithMissingFields.length === 0,
    missingRows,
    rowsWithMissingFields,
    rows: evaluatedRows,
  };
}

function evaluateIdentityConsistency({ carrier, sourceIdentity, rows }) {
  const mismatches = [];
  if (concreteValue(carrier.id) && concreteValue(sourceIdentity.carrierId) && carrier.id !== sourceIdentity.carrierId) {
    mismatches.push({
      rowId: "carrier",
      field: "carrierId",
      expected: sourceIdentity.carrierId,
      actual: carrier.id,
      reason: "carrier_id_split",
    });
  }
  for (const rowId of REQUIRED_ROWS) {
    const row = rows[rowId] ?? {};
    for (const field of ROW_IDENTITY_FIELDS) {
      pushIdentityMismatch(mismatches, rowId, field, sourceIdentity[field], row[field]);
    }
  }
  const remnantRow = rows.remnant_medium_heating_row ?? {};
  pushIdentityMismatch(
    mismatches,
    "remnant_medium_heating_row",
    "noetherSeaUpdateId",
    sourceIdentity.noetherSeaUpdateId,
    remnantRow.noetherSeaUpdateId,
  );
  const retuneRow = rows.no_hidden_retune_witness ?? {};
  pushIdentityMismatch(
    mismatches,
    "no_hidden_retune_witness",
    "retuneWitnessId",
    sourceIdentity.retuneWitnessId,
    retuneRow.retuneWitnessId,
  );
  return {
    passed: mismatches.length === 0,
    mismatches,
    firstMismatch: mismatches[0] ?? null,
  };
}

function pushIdentityMismatch(mismatches, rowId, field, expected, actual) {
  if (!concreteValue(expected) || !concreteValue(actual)) {
    return;
  }
  if (expected !== actual) {
    mismatches.push({
      rowId,
      field,
      expected,
      actual,
      reason: mismatchReason(field),
    });
  }
}

function mismatchReason(field) {
  const reasonByField = {
    carrierId: "carrier_split",
    thetaSrcId: "theta_src_split",
    thetaThermProvId: "thermal_provenance_split",
    sourceWindowId: "source_window_split",
    supportId: "support_split",
    eventLedgerId: "event_ledger_split",
    noetherSeaUpdateId: "noether_sea_update_split",
    retuneWitnessId: "retune_witness_split",
  };
  return reasonByField[field] ?? `${field}_split`;
}

function evaluateAcceptedSourceEvidence(carrier, rows) {
  const entries = [["carrier", carrier], ...REQUIRED_ROWS.map((rowId) => [rowId, rows[rowId]])].map(
    ([rowId, row]) => {
      const status = normalizeStatus(row);
      const sourcePath = isPlainObject(row) ? row.sourcePath ?? row.source ?? null : null;
      const source = evaluateSourcePath(sourcePath);
      const requiresEvidence = ACCEPTED_STATUSES.has(status);
      const passed = !requiresEvidence || source.evidenceAccepted;
      return {
        rowId,
        status,
        sourcePath,
        requiresEvidence,
        sourceReferenceExists: source.referenceExists,
        sourceEvidenceReferenceExists: source.evidenceAccepted,
        reason: passed ? "passed" : source.evidenceReason,
        passed,
      };
    },
  );
  const failures = entries.filter((entry) => !entry.passed);
  return {
    passed: failures.length === 0,
    failures,
    firstFailure: failures[0] ?? null,
    rows: Object.fromEntries(entries.map((entry) => [entry.rowId, entry])),
  };
}

function evaluateRowAcceptance(carrier, rows) {
  const carrierAccepted = ACCEPTED_STATUSES.has(normalizeStatus(carrier));
  const acceptedRows = REQUIRED_ROWS.filter((rowId) => ACCEPTED_STATUSES.has(normalizeStatus(rows[rowId])));
  const missingRows = REQUIRED_ROWS.filter((rowId) => !ACCEPTED_STATUSES.has(normalizeStatus(rows[rowId])));
  return {
    carrierAccepted,
    acceptedRows,
    missingRows,
    populated: carrierAccepted && missingRows.length === 0,
  };
}

function decideStatus({
  schemaOk,
  topLevel,
  carrier,
  sourceIdentity,
  rowContract,
  identityConsistency,
  sourceEvidence,
  rowAcceptance,
}) {
  if (!schemaOk) return "blocked_invalid_schema";
  if (!topLevel.passed) return "blocked_top_level_contract";
  if (!carrier.passed) return statusForMismatch(carrier.mismatches[0]);
  if (!sourceIdentity.passed) return "blocked_missing_source_identity_fields";
  if (!rowContract.passed) return "blocked_missing_required_row_fields";
  if (!identityConsistency.passed) return statusForMismatch(identityConsistency.firstMismatch);
  if (!sourceEvidence.passed) return "blocked_accepted_without_evidence_source";
  if (!rowAcceptance.populated) return "blocked_missing_rows";
  return "populated_score_neutral";
}

function firstBlocker({
  status,
  schemaOk,
  topLevel,
  carrier,
  sourceIdentity,
  rowContract,
  identityConsistency,
  sourceEvidence,
}) {
  if (!schemaOk) return "invalid_schema";
  if (!topLevel.passed) return topLevel.mismatches[0]?.reason ?? `missing_${topLevel.missing[0]}`;
  if (!carrier.passed) return blockerForMismatch(carrier.mismatches[0]);
  if (!sourceIdentity.passed) return `missing_${sourceIdentity.missingFields[0]}`;
  if (!rowContract.passed) {
    const row = rowContract.rowsWithMissingFields[0];
    return row ? `missing_${row.rowId}.${row.missingFields[0]}` : `missing_${rowContract.missingRows[0]}`;
  }
  if (!identityConsistency.passed) return blockerForMismatch(identityConsistency.firstMismatch);
  if (!sourceEvidence.passed) return sourceEvidence.firstFailure?.reason ?? "accepted_without_evidence_source";
  if (status === "populated_score_neutral") return null;
  return FIRST_BLOCKER;
}

function statusForMismatch(mismatch) {
  const statusByReason = {
    carrier_split: "blocked_carrier_split",
    theta_src_split: "blocked_theta_src_split",
    thermal_provenance_split: "blocked_thermal_provenance_split",
    source_window_split: "blocked_source_window_split",
    support_split: "blocked_support_split",
    event_ledger_split: "blocked_event_ledger_split",
    noether_sea_update_split: "blocked_noether_sea_update_split",
    retune_witness_split: "blocked_retune_witness_split",
  };
  return statusByReason[mismatch?.reason] ?? "blocked_identity_split";
}

function blockerForMismatch(mismatch) {
  const blockerByReason = {
    carrier_split: "carrier_split_before_residual_scoring",
    theta_src_split: "theta_src_split_before_residual_scoring",
    thermal_provenance_split: "thermal_provenance_split_before_residual_scoring",
    source_window_split: "source_window_split_before_residual_scoring",
    support_split: "support_split_before_residual_scoring",
    event_ledger_split: "event_ledger_split_before_residual_scoring",
    noether_sea_update_split: "noether_sea_update_split_before_residual_scoring",
    retune_witness_split: "retune_witness_split_before_residual_scoring",
  };
  return blockerByReason[mismatch?.reason] ?? "identity_split_before_residual_scoring";
}

function evaluateNegativeControls(input, negativeControls, inputPath) {
  return negativeControls.map((control) => {
    const mutated = deepClone(input);
    for (const [mutationPath, value] of Object.entries(control.mutation ?? {})) {
      setByPath(mutated, mutationPath, value);
    }
    const result = evaluateEq23aExplosiveIdentity(mutated, inputPath, { evaluateControls: false });
    const expectedFailure = control.expectedFailure ?? null;
    return {
      id: control.id ?? null,
      expectedFailure,
      status: result.summary.status,
      nextBlocker: result.summary.nextBlocker,
      residualArithmeticEvaluated: result.summary.residualArithmeticEvaluated,
      passed:
        result.summary.nextBlocker === expectedFailure &&
        result.summary.residualArithmeticEvaluated === false &&
        result.summary.scoreDecision === SCORE_DECISION,
      firstMismatch: result.identityConsistency.firstMismatch,
    };
  });
}

function evaluateSourcePath(sourcePath) {
  if (!concreteValue(sourcePath)) {
    return {
      referenceExists: false,
      evidenceAccepted: false,
      evidenceReason: "missing_source_path",
    };
  }
  if (path.isAbsolute(sourcePath) && !path.resolve(sourcePath).startsWith(REPO_ROOT)) {
    return {
      referenceExists: false,
      evidenceAccepted: false,
      evidenceReason: "outside_repo_source_path",
    };
  }
  const normalized = sourcePath.split(path.sep).join("/");
  if (normalized.startsWith("/tmp/") || normalized.startsWith("tmp/")) {
    return {
      referenceExists: false,
      evidenceAccepted: false,
      evidenceReason: "temporary_source_path",
    };
  }
  const resolved = path.resolve(REPO_ROOT, sourcePath);
  const referenceExists = fs.existsSync(resolved);
  if (!referenceExists) {
    return {
      referenceExists: false,
      evidenceAccepted: false,
      evidenceReason: "source_path_missing",
    };
  }
  const basename = path.basename(sourcePath).toLowerCase();
  const forbiddenPath =
    normalized.startsWith("reference/priorities/") ||
    normalized.startsWith("content/generated/") ||
    basename.includes("attempt") ||
    basename.includes("mock") ||
    basename.includes("negative-control");
  if (forbiddenPath) {
    return {
      referenceExists,
      evidenceAccepted: false,
      evidenceReason: "accepted_without_evidence_source",
    };
  }
  return {
    referenceExists,
    evidenceAccepted: true,
    evidenceReason: "passed",
  };
}

function setByPath(target, dottedPath, value) {
  const parts = dottedPath.split(".");
  let cursor = target;
  for (const part of parts.slice(0, -1)) {
    if (!isPlainObject(cursor[part])) {
      cursor[part] = {};
    }
    cursor = cursor[part];
  }
  cursor[parts.at(-1)] = value;
}

function normalizeStatus(row) {
  if (!isPlainObject(row)) return null;
  return typeof row.status === "string" ? row.status : null;
}

function concreteValue(value) {
  return typeof value === "string" ? value.trim().length > 0 : value !== null && value !== undefined;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}
