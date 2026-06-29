#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "eq26-hydrogen-spectral-carrier-source-attempt.v1.json");
const INPUT_SCHEMA = "aaa-equation-map-eq26-hydrogen-spectral-carrier-identity-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq26-hydrogen-spectral-carrier-identity-check/v1";
const SCORE_DECISION = "no_score_increase";
const FIRST_BLOCKER = "missing_accepted_theta_H_spec";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);

const REQUIRED_LINES = ["H_alpha_3_to_2", "H_beta_4_to_2"];

const IDENTITY_FIELDS = [
  "carrierId",
  "branchId",
  "lineSetId",
  "staticResponseId",
  "gammaNRowId",
  "eventLedgerId",
  "retuneWitnessId",
];

const REQUIRED_ROWS = [
  "recovered_label_rows",
  "envelope_gap_rows",
  "gamma_N_row",
  "static_response_row",
  "photon_action_support",
  "residual_budget",
  "event_ledger_row",
  "source_provenance",
  "no_hidden_retune_witness",
];

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluateEq26HydrogenSpectralCarrier(input, inputPath, { evaluateControls: true });
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
  console.log(`Usage: node scripts/equation-mapping/eq26-hydrogen-spectral-carrier-identity-check.mjs [options]

Options:
  --input PATH          EQ-26 hydrogen spectral carrier identity JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the identity shell is populated.
  --help                Show this help.

This checker is score-neutral. It validates that H-alpha and H-beta line
labels, envelope gaps, Noether sea response, photon/action support, event
ledger, residual budget, and no-retune rows bind to one theta_H_spec carrier.
Observed Rydberg factors, photon packets, Compton Gate A rows, and theta_alpha
support rows are not accepted hydrogen spectral evidence by themselves.`);
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

function evaluateEq26HydrogenSpectralCarrier(input, inputPath, options = {}) {
  const rows = input.rows ?? {};
  const schemaOk = input.schema === INPUT_SCHEMA;
  const topLevel = evaluateTopLevel(input);
  const carrier = evaluateCarrier(input.carrier ?? {}, input.sourceIdentity ?? {});
  const sourceIdentity = evaluateSourceIdentity(input.sourceIdentity ?? {});
  const lineSet = evaluateLineSet(input.lines ?? []);
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
    lineSet,
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
    lineSet,
    rowContract,
    identityConsistency,
    sourceEvidence,
    rowAcceptance,
  });
  const negativeControls = options.evaluateControls
    ? evaluateNegativeControls(input.negativeControls ?? [], inputPath)
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
      row: "EQ-26",
      claimLevel:
        "score-neutral hydrogen spectral carrier identity check; spectral residual arithmetic is deferred until accepted theta_H_spec evidence exists",
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
      lineSetPass: lineSet.passed,
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
    lineSet,
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
      expectedStatus: control.expectedStatus,
      expectedNextBlocker: control.expectedNextBlocker,
      status: control.status,
      nextBlocker: control.nextBlocker,
      passed: control.passed,
    })),
  };
}

function evaluateTopLevel(input) {
  const required = [
    ["schema", input.schema, concreteValue],
    ["row", input.row, concreteValue],
    ["scoreDecision", input.scoreDecision, concreteValue],
    ["nextBlocker", input.nextBlocker, concreteValue],
    ["carrier.id", input.carrier?.id, concreteValue],
    ["carrier.rowId", input.carrier?.rowId, concreteValue],
    ["carrier.status", input.carrier?.status, valuePresent],
    ["carrier.sourcePath", input.carrier?.sourcePath, concreteValue],
  ];
  const missing = required.filter(([, value, predicate]) => !predicate(value)).map(([field]) => field);
  const mismatches = [];
  if (concreteValue(input.row) && input.row !== "EQ-26") {
    mismatches.push({ field: "row", expected: "EQ-26", actual: input.row, reason: "wrong_row" });
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
  if (supportCarrierSubstitution(carrier)) {
    mismatches.push({
      field: "carrier.sourceRole",
      expected: "theta_H_spec hydrogen spectral carrier",
      actual: carrier.sourceRole ?? carrier.sourceFamily ?? null,
      reason: "theta_H_spec_support_substitution",
    });
  }
  return {
    passed: mismatches.length === 0,
    status: normalizeStatus(carrier),
    mismatches,
  };
}

function evaluateSourceIdentity(sourceIdentity) {
  const missing = IDENTITY_FIELDS.filter((field) => !concreteValue(sourceIdentity[field]));
  return {
    passed: missing.length === 0,
    missing,
  };
}

function evaluateLineSet(lines) {
  const ids = new Set(lines.map((line) => line.id).filter(Boolean));
  const missingLines = REQUIRED_LINES.filter((lineId) => !ids.has(lineId));
  const carrierSplits = [];
  for (const line of lines) {
    for (const field of ["carrierId", "branchId", "lineSetId"]) {
      if (!concreteValue(line[field])) {
        carrierSplits.push({ line: line.id ?? null, field, reason: "line_identity_missing" });
      }
    }
    if (line.recoveredLabels === false) {
      carrierSplits.push({ line: line.id ?? null, field: "recoveredLabels", reason: "labels_not_recovered" });
    }
  }
  return {
    passed: missingLines.length === 0 && carrierSplits.length === 0,
    requiredLines: REQUIRED_LINES,
    presentLines: [...ids],
    missingLines,
    carrierSplits,
  };
}

function evaluateRows(rows) {
  const evaluated = {};
  for (const rowId of REQUIRED_ROWS) {
    const row = rows[rowId] ?? null;
    const missing = [];
    if (!row) {
      missing.push("row");
    } else {
      for (const field of ["status", "rowId", "carrierId", "branchId", "lineSetId", "sourcePath"]) {
        const valid = field === "status" ? valuePresent(row[field]) : concreteValue(row[field]);
        if (!valid) {
          missing.push(field);
        }
      }
    }
    evaluated[rowId] = {
      present: Boolean(row),
      status: normalizeStatus(row),
      missing,
      passed: Boolean(row) && missing.length === 0,
      sourcePath: row?.sourcePath ?? row?.source ?? null,
    };
  }
  return {
    passed: Object.values(evaluated).every((row) => row.passed),
    rows: evaluated,
  };
}

function evaluateIdentityConsistency({ carrier, sourceIdentity, rows }) {
  const mismatches = [];
  for (const rowId of REQUIRED_ROWS) {
    const row = rows[rowId];
    if (!row) {
      continue;
    }
    for (const field of IDENTITY_FIELDS) {
      if (!concreteValue(row[field]) || !concreteValue(sourceIdentity[field])) {
        continue;
      }
      if (row[field] !== sourceIdentity[field]) {
        mismatches.push({
          row: rowId,
          field,
          expected: sourceIdentity[field],
          actual: row[field],
          reason: `${field}_split_before_residual_scoring`,
        });
      }
    }
  }
  if (concreteValue(carrier.id) && concreteValue(sourceIdentity.carrierId) && carrier.id !== sourceIdentity.carrierId) {
    mismatches.unshift({
      row: "carrier",
      field: "carrierId",
      expected: sourceIdentity.carrierId,
      actual: carrier.id,
      reason: "carrier_id_split",
    });
  }
  return {
    passed: mismatches.length === 0,
    firstMismatch: mismatches[0] ?? null,
    mismatches,
  };
}

function evaluateAcceptedSourceEvidence(carrier, rows) {
  const candidates = [{ id: "theta_H_spec", object: carrier }, ...REQUIRED_ROWS.map((id) => ({ id, object: rows[id] }))];
  const failures = [];
  for (const candidate of candidates) {
    const sourceCheck = evaluateSourcePath(candidate.object?.sourcePath ?? candidate.object?.source ?? null);
    if (isAccepted(candidate.object) && !sourceCheck.acceptedSource) {
      failures.push({
        id: candidate.id,
        status: normalizeStatus(candidate.object),
        sourcePath: sourceCheck.sourcePath,
        reason: sourceCheck.reason,
      });
    }
  }
  return {
    passed: failures.length === 0,
    failures,
    firstFailure: failures[0] ?? null,
  };
}

function evaluateRowAcceptance(carrier, rows) {
  const carrierSource = evaluateSourcePath(carrier?.sourcePath ?? carrier?.source ?? null);
  const carrierAccepted = isAccepted(carrier) && carrierSource.acceptedSource && !supportCarrierSubstitution(carrier);
  const acceptedRows = [];
  const missingRows = [];
  for (const rowId of REQUIRED_ROWS) {
    const row = rows[rowId];
    const rowSource = evaluateSourcePath(row?.sourcePath ?? row?.source ?? null);
    if (isAccepted(row) && rowSource.acceptedSource) {
      acceptedRows.push(rowId);
    } else {
      missingRows.push(rowId);
    }
  }
  return {
    carrierAccepted,
    acceptedRows,
    missingRows: carrierAccepted ? missingRows : ["theta_H_spec", ...missingRows],
  };
}

function decideStatus({
  schemaOk,
  topLevel,
  carrier,
  sourceIdentity,
  lineSet,
  rowContract,
  identityConsistency,
  sourceEvidence,
  rowAcceptance,
}) {
  if (!schemaOk) {
    return "blocked_invalid_schema";
  }
  if (!topLevel.passed || !sourceIdentity.passed || !lineSet.passed || !rowContract.passed) {
    return "blocked_invalid_contract";
  }
  if (!carrier.passed || !identityConsistency.passed) {
    return "blocked_identity_split";
  }
  if (!sourceEvidence.passed) {
    return "blocked_accepted_without_evidence_source";
  }
  if (!rowAcceptance.carrierAccepted || rowAcceptance.missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  return "populated_score_neutral";
}

function firstBlocker({
  status,
  topLevel,
  carrier,
  sourceIdentity,
  lineSet,
  rowContract,
  identityConsistency,
  sourceEvidence,
  rowAcceptance,
}) {
  if (status === "blocked_invalid_schema") {
    return "invalid_schema";
  }
  if (!topLevel.passed) {
    return topLevel.missing[0] ?? topLevel.mismatches[0]?.reason ?? "invalid_top_level";
  }
  if (!sourceIdentity.passed) {
    return `missing_source_identity_${sourceIdentity.missing[0]}`;
  }
  if (!lineSet.passed) {
    return lineSet.missingLines[0] ? `missing_line_${lineSet.missingLines[0]}` : lineSet.carrierSplits[0]?.reason;
  }
  if (!rowContract.passed) {
    const [rowId, row] = Object.entries(rowContract.rows).find(([, value]) => !value.passed) ?? [];
    return rowId ? `invalid_row_contract_${rowId}_${row.missing[0]}` : "invalid_row_contract";
  }
  if (!carrier.passed) {
    return carrier.mismatches[0]?.reason ?? "carrier_identity_mismatch";
  }
  if (!identityConsistency.passed) {
    return identityConsistency.firstMismatch?.reason ?? "identity_split_before_residual_scoring";
  }
  if (!sourceEvidence.passed) {
    return sourceEvidence.firstFailure?.reason ?? "accepted_without_evidence_source";
  }
  if (!rowAcceptance.carrierAccepted) {
    return FIRST_BLOCKER;
  }
  if (rowAcceptance.missingRows.length > 0) {
    return `missing_accepted_${rowAcceptance.missingRows[0]}`;
  }
  return null;
}

function evaluateNegativeControls(controls, inputPath) {
  return controls.map((control) => {
    const controlPath = path.resolve(path.dirname(inputPath), control.inputPath ?? "");
    try {
      const controlInput = readJson(controlPath);
      const controlOutput = evaluateEq26HydrogenSpectralCarrier(controlInput, controlPath, { evaluateControls: false });
      const status = controlOutput.summary.status;
      const nextBlocker = controlOutput.summary.nextBlocker;
      const statusPass = control.expectedStatus ? status === control.expectedStatus : true;
      const blockerPass = control.expectedNextBlocker ? nextBlocker === control.expectedNextBlocker : true;
      return {
        id: control.id,
        inputPath: control.inputPath,
        expectedStatus: control.expectedStatus ?? null,
        expectedNextBlocker: control.expectedNextBlocker ?? null,
        status,
        nextBlocker,
        passed: statusPass && blockerPass,
      };
    } catch (error) {
      return {
        id: control.id,
        inputPath: control.inputPath,
        expectedStatus: control.expectedStatus ?? null,
        expectedNextBlocker: control.expectedNextBlocker ?? null,
        status: "control_error",
        nextBlocker: "control_error",
        error: error.message,
        passed: false,
      };
    }
  });
}

function isAccepted(value) {
  return ACCEPTED_STATUSES.has(normalizeStatus(value));
}

function normalizeStatus(value) {
  if (!value) {
    return "missing";
  }
  if (typeof value === "string") {
    return value;
  }
  return value.status ?? "missing";
}

function concreteValue(value) {
  if (typeof value !== "string") {
    return value !== null && value !== undefined;
  }
  const trimmed = value.trim();
  return (
    trimmed.length > 0 &&
    !/^(pending|placeholder|mock|toy|attempt|tbd|null|undefined)$/i.test(trimmed) &&
    !trimmed.includes("/tmp/") &&
    !trimmed.includes("/private/tmp/") &&
    !trimmed.includes("content/generated/")
  );
}

function valuePresent(value) {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

function supportCarrierSubstitution(carrier) {
  const text = [carrier.sourceRole, carrier.sourceFamily, carrier.id, carrier.rowId]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return (
    text.includes("theta_gamma_packet") ||
    text.includes("photon_packet") ||
    text.includes("gate_a") ||
    text.includes("theta_alpha") ||
    text.includes("support_substitution")
  );
}

function evaluateSourcePath(sourcePath) {
  if (!concreteValue(sourcePath)) {
    return { acceptedSource: false, sourcePath: sourcePath ?? null, reason: "source_reference_missing" };
  }
  const normalized = sourcePath.replaceAll("\\", "/");
  if (disallowedEvidencePath(normalized)) {
    return { acceptedSource: false, sourcePath, reason: "accepted_without_evidence_source" };
  }
  const absolute = path.isAbsolute(sourcePath) ? sourcePath : path.resolve(REPO_ROOT, sourcePath);
  if (!fs.existsSync(absolute)) {
    return { acceptedSource: false, sourcePath, reason: "source_reference_missing" };
  }
  return { acceptedSource: true, sourcePath, reason: "source_reference_exists" };
}

function disallowedEvidencePath(sourcePath) {
  const lower = sourcePath.toLowerCase();
  const basename = path.basename(lower);
  return (
    lower.startsWith("reference/priorities/") ||
    lower.includes("/reference/priorities/") ||
    lower.startsWith("content/markdown/aaa/") ||
    lower.includes("/content/markdown/aaa/") ||
    lower.startsWith("content/generated/") ||
    lower.includes("/content/generated/") ||
    lower.includes("/tmp/") ||
    lower.includes("/private/tmp/") ||
    /(?:^|[-_])(attempt|mock|toy|probe|source-evidence-probe|negative-control)(?:[-_.]|$)/.test(basename)
  );
}
