#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const INPUT_SCHEMA = "aaa-equation-map-finite-window-conservation-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-finite-window-conservation-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";

const REQUIRED_ROWS = [
  "branch_chart",
  "active_root_ledger",
  "force_row",
  "action_or_work_route",
  "wake_charge_route",
  "event_ledger",
  "boundary_flux",
  "same_root_checksum",
  "no_double_count_witness",
];

const SIGNATURE_FAMILIES = [
  "force",
  "wakeCharge",
  "eventLedger",
  "boundaryFlux",
  "actionRoute",
];

const SIGNATURE_KEYS = [
  "orderedPairPolicy",
  "activeRootLabels",
  "inactiveGapCover",
  "memoryDepth",
  "regularization",
  "jacobianFloor",
  "endpointConvention",
  "tailConvention",
  "branchLabel",
  "noetherSeaState",
];

const DEFAULT_TOLERANCES = {
  sameRoot: 0,
  energy: 1e-12,
  momentum: 1e-12,
  angularMomentum: 1e-12,
  event: 1e-12,
  boundary: 1e-12,
  crosswalk: 1e-12,
  noDoubleCount: 1e-12,
  epsilon: 1e-12,
};

const NON_EVIDENCE_SOURCE_DECLARATIONS = [
  [/not\s+(?:accepted\s+)?(?:retained\s+)?evidence/i, "source_declares_non_evidence"],
  [/not\s+accepted/i, "source_declares_non_evidence"],
  [/score-neutral/i, "source_declares_score_neutral"],
  [/negative[- ]control/i, "source_declares_negative_control"],
  [/source[- ]contract/i, "source_declares_source_contract"],
  [/source[- ]shell|\bsource shell\b/i, "source_declares_source_shell"],
  [/\battempt\b/i, "source_declares_attempt"],
  [/\btoy\b/i, "source_declares_toy"],
  [/\bprobe\b/i, "source_declares_probe"],
  [/\bmock\b/i, "source_declares_mock"],
  [/\bfixture\b/i, "source_declares_fixture"],
  [/\bshell\b/i, "source_declares_shell"],
];

const SOURCE_DECLARATION_KEYS = new Set([
  "claimlevel",
  "control",
  "evidence",
  "evidencestatus",
  "notes",
  "producerstatus",
  "provenance",
  "scoredecision",
  "sourceclaim",
  "sourceevidence",
  "sourceevidencestatus",
  "sourcekind",
  "sourcestatus",
  "status",
  "support",
  "supportstatus",
]);

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}
if (!args.input) {
  throw new Error("Missing required --input PATH argument.");
}

const input = readJson(path.resolve(args.input));
const output = evaluateConservationResidual(input, path.resolve(args.input));
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
  console.log(`Usage: node scripts/equation-mapping/finite-window-conservation-residual.mjs --input PATH [options]

Options:
  --input PATH          Finite-window conservation residual JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-05 finite-window conservation
residual R_01-05^B(W). Attempt rows, toy rows, hidden sinks, and non-durable
sources never raise scores.`);
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

function evaluateConservationResidual(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? {};
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const sameRoot = evaluateSameRoot(packet.rootSignatures ?? {}, tolerances);
  const charges = evaluateChargeResiduals(packet.charges ?? {}, tolerances);
  const eventLedger = evaluateScalarResidual(
    packet.eventLedger?.maxResidual ?? packet.eventLedger?.residual,
    tolerances.event,
    "event_ledger",
  );
  const boundaryFlux = evaluateScalarResidual(
    packet.boundaryFlux?.residual ?? packet.boundaryFlux?.leakageResidual,
    tolerances.boundary,
    "boundary_flux",
  );
  const wakeCrosswalk = evaluateScalarResidual(
    packet.wakeCrosswalk?.residual ?? packet.wakeCrosswalk?.maxResidual,
    tolerances.crosswalk,
    "wake_crosswalk",
  );
  const noDoubleCount = evaluateScalarResidual(
    packet.noDoubleCount?.residual ?? packet.noDoubleCount?.overlapResidual,
    tolerances.noDoubleCount,
    "no_double_count",
  );
  const status = decideStatus({
    missingRows,
    sameRoot,
    charges,
    eventLedger,
    boundaryFlux,
    wakeCrosswalk,
    noDoubleCount,
  });

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
      id: input.residualId ?? packet.id ?? null,
      row: "EQ-05",
      supportedRows: ["EQ-01", "EQ-05"],
      claimLevel:
        "score-neutral finite-window conservation residual; accepted retained rows are required before score review",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      scoreReviewPreconditionsMet: status === "populated",
      missingRows,
      nextBlocker: firstBlocker({
        status,
        missingRows,
        sameRoot,
        charges,
        eventLedger,
        boundaryFlux,
        wakeCrosswalk,
        noDoubleCount,
      }),
      sameRootPass: sameRoot.passed,
      sameRootMismatchCount: sameRoot.mismatches.length,
      energyResidual: charges.energy.normalizedResidual,
      energyPass: charges.energy.passed,
      momentumResidual: charges.momentum.normalizedResidual,
      momentumPass: charges.momentum.passed,
      angularMomentumResidual: charges.angularMomentum.normalizedResidual,
      angularMomentumPass: charges.angularMomentum.passed,
      eventLedgerResidual: eventLedger.value,
      eventLedgerPass: eventLedger.passed,
      boundaryFluxResidual: boundaryFlux.value,
      boundaryFluxPass: boundaryFlux.passed,
      wakeCrosswalkResidual: wakeCrosswalk.value,
      wakeCrosswalkPass: wakeCrosswalk.passed,
      noDoubleCountResidual: noDoubleCount.value,
      noDoubleCountPass: noDoubleCount.passed,
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
    sameRoot,
    charges,
    eventLedger,
    boundaryFlux,
    wakeCrosswalk,
    noDoubleCount,
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
  };
}

function evaluateSameRoot(rootSignatures, tolerances) {
  const normalized = Object.fromEntries(
    SIGNATURE_FAMILIES.map((family) => [
      family,
      normalizeSignature(rootSignatures[family]),
    ]),
  );
  const missingFamilies = SIGNATURE_FAMILIES.filter(
    (family) => normalized[family] === null,
  );
  const referenceFamily = SIGNATURE_FAMILIES.find(
    (family) => normalized[family] !== null,
  );
  const reference = referenceFamily ? stableStringify(normalized[referenceFamily]) : null;
  const mismatches = SIGNATURE_FAMILIES.filter((family) => {
    if (normalized[family] === null || reference === null) {
      return true;
    }
    return stableStringify(normalized[family]) !== reference;
  });
  const mismatchCount = mismatches.length;
  return {
    expectedFamilies: SIGNATURE_FAMILIES,
    missingFamilies,
    referenceFamily: referenceFamily ?? null,
    mismatchCount,
    tolerance: tolerances.sameRoot,
    passed: mismatchCount <= tolerances.sameRoot,
    mismatches,
    signatures: normalized,
  };
}

function normalizeSignature(signature) {
  if (!signature || typeof signature !== "object" || Array.isArray(signature)) {
    return null;
  }
  return Object.fromEntries(
    SIGNATURE_KEYS.map((key) => [key, signature[key] ?? null]),
  );
}

function evaluateChargeResiduals(charges, tolerances) {
  return {
    energy: evaluateScalarBalance(charges.energy ?? {}, {
      label: "energy",
      tolerance: tolerances.energy,
      epsilon: tolerances.epsilon,
    }),
    momentum: evaluateVectorBalance(charges.momentum ?? {}, {
      label: "momentum",
      tolerance: tolerances.momentum,
      epsilon: tolerances.epsilon,
    }),
    angularMomentum: evaluateVectorBalance(charges.angularMomentum ?? {}, {
      label: "angular_momentum",
      tolerance: tolerances.angularMomentum,
      epsilon: tolerances.epsilon,
    }),
  };
}

function evaluateScalarBalance(raw, { label, tolerance, epsilon }) {
  const deltaRetained = finiteNumberOrNull(raw.deltaRetained);
  const boundaryFlux = finiteNumberOrNull(raw.boundaryFlux);
  const external = finiteNumberOrNull(raw.external ?? raw.externalDrive) ?? 0;
  const event = finiteNumberOrNull(raw.event ?? raw.eventUpdate) ?? 0;
  const computed = deltaRetained !== null && boundaryFlux !== null;
  const balance = computed ? deltaRetained + boundaryFlux - external - event : null;
  const denominator = computed
    ? Math.abs(deltaRetained) + Math.abs(boundaryFlux) + Math.abs(external) + Math.abs(event) + epsilon
    : null;
  const normalizedResidual =
    balance !== null && denominator !== null ? Math.abs(balance) / denominator : null;
  return {
    label,
    computed,
    deltaRetained,
    boundaryFlux,
    external,
    event,
    balance,
    denominator,
    normalizedResidual,
    tolerance,
    passed: normalizedResidual !== null && normalizedResidual <= tolerance,
  };
}

function evaluateVectorBalance(raw, { label, tolerance, epsilon }) {
  const deltaRetained = vectorOrNull(raw.deltaRetained);
  const boundaryFlux = vectorOrNull(raw.boundaryFlux);
  const external = vectorOrNull(raw.external ?? raw.externalDrive) ?? [0, 0, 0];
  const event = vectorOrNull(raw.event ?? raw.eventUpdate) ?? [0, 0, 0];
  const computed = deltaRetained !== null && boundaryFlux !== null;
  const balance = computed
    ? deltaRetained.map(
        (value, index) => value + boundaryFlux[index] - external[index] - event[index],
      )
    : null;
  const denominator = computed
    ? vectorNorm(deltaRetained) + vectorNorm(boundaryFlux) + vectorNorm(external) + vectorNorm(event) + epsilon
    : null;
  const normalizedResidual =
    balance !== null && denominator !== null ? vectorNorm(balance) / denominator : null;
  return {
    label,
    computed,
    deltaRetained,
    boundaryFlux,
    external,
    event,
    balance,
    denominator,
    normalizedResidual,
    tolerance,
    passed: normalizedResidual !== null && normalizedResidual <= tolerance,
  };
}

function evaluateScalarResidual(value, tolerance, label) {
  const parsed = finiteNumberOrNull(value);
  return {
    label,
    value: parsed,
    tolerance,
    computed: parsed !== null,
    passed: parsed !== null && Math.abs(parsed) <= tolerance,
  };
}

function decideStatus({
  missingRows,
  sameRoot,
  charges,
  eventLedger,
  boundaryFlux,
  wakeCrosswalk,
  noDoubleCount,
}) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!sameRoot.passed) {
    return "blocked_root_signature_split";
  }
  if (!allChargesComputed(charges)) {
    return "blocked_missing_charge_terms";
  }
  if (!allChargesPassed(charges)) {
    return "blocked_conservation_residual_above_tolerance";
  }
  if (!eventLedger.computed) {
    return "blocked_missing_event_ledger_residual";
  }
  if (!eventLedger.passed) {
    return "blocked_event_ledger_residual_above_tolerance";
  }
  if (!boundaryFlux.computed) {
    return "blocked_missing_boundary_flux_residual";
  }
  if (!boundaryFlux.passed) {
    return "blocked_boundary_flux_residual_above_tolerance";
  }
  if (!wakeCrosswalk.computed) {
    return "blocked_missing_wake_crosswalk_residual";
  }
  if (!wakeCrosswalk.passed) {
    return "blocked_wake_crosswalk_residual_above_tolerance";
  }
  if (!noDoubleCount.computed) {
    return "blocked_missing_no_double_count_witness";
  }
  if (!noDoubleCount.passed) {
    return "blocked_no_double_count_failed";
  }
  return "populated";
}

function firstBlocker({
  status,
  missingRows,
  sameRoot,
  charges,
  eventLedger,
  boundaryFlux,
  wakeCrosswalk,
  noDoubleCount,
}) {
  if (status === "populated") {
    return null;
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!sameRoot.passed) {
    return "root_signature_split";
  }
  const chargeBlocker = firstChargeBlocker(charges);
  if (chargeBlocker !== null) {
    return chargeBlocker;
  }
  if (!eventLedger.computed) {
    return "missing_event_ledger_residual";
  }
  if (!eventLedger.passed) {
    return "event_ledger_residual_above_tolerance";
  }
  if (!boundaryFlux.computed) {
    return "missing_boundary_flux_residual";
  }
  if (!boundaryFlux.passed) {
    return "boundary_flux_residual_above_tolerance";
  }
  if (!wakeCrosswalk.computed) {
    return "missing_wake_crosswalk_residual";
  }
  if (!wakeCrosswalk.passed) {
    return "wake_crosswalk_residual_above_tolerance";
  }
  if (!noDoubleCount.computed) {
    return "missing_no_double_count_witness";
  }
  if (!noDoubleCount.passed) {
    return "no_double_count_failed";
  }
  return status;
}

function firstChargeBlocker(charges) {
  const ordered = [
    ["energy", charges.energy],
    ["momentum", charges.momentum],
    ["angular_momentum", charges.angularMomentum],
  ];
  const missing = ordered.find(([, charge]) => !charge.computed);
  if (missing) {
    return `missing_${missing[0]}_charge_terms`;
  }
  const failed = ordered.find(([, charge]) => !charge.passed);
  if (failed) {
    return `${failed[0]}_residual_above_tolerance`;
  }
  return null;
}

function allChargesComputed(charges) {
  return (
    charges.energy.computed &&
    charges.momentum.computed &&
    charges.angularMomentum.computed
  );
}

function allChargesPassed(charges) {
  return (
    charges.energy.passed &&
    charges.momentum.passed &&
    charges.angularMomentum.passed
  );
}

function parseTolerances(raw) {
  return {
    sameRoot: nonnegativeNumber(
      raw.sameRoot ?? DEFAULT_TOLERANCES.sameRoot,
      "tolerances.sameRoot",
    ),
    energy: positiveNumber(raw.energy ?? DEFAULT_TOLERANCES.energy, "tolerances.energy"),
    momentum: positiveNumber(
      raw.momentum ?? DEFAULT_TOLERANCES.momentum,
      "tolerances.momentum",
    ),
    angularMomentum: positiveNumber(
      raw.angularMomentum ?? DEFAULT_TOLERANCES.angularMomentum,
      "tolerances.angularMomentum",
    ),
    event: positiveNumber(raw.event ?? DEFAULT_TOLERANCES.event, "tolerances.event"),
    boundary: positiveNumber(
      raw.boundary ?? DEFAULT_TOLERANCES.boundary,
      "tolerances.boundary",
    ),
    crosswalk: positiveNumber(
      raw.crosswalk ?? DEFAULT_TOLERANCES.crosswalk,
      "tolerances.crosswalk",
    ),
    noDoubleCount: positiveNumber(
      raw.noDoubleCount ?? DEFAULT_TOLERANCES.noDoubleCount,
      "tolerances.noDoubleCount",
    ),
    epsilon: positiveNumber(
      raw.epsilon ?? DEFAULT_TOLERANCES.epsilon,
      "tolerances.epsilon",
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
  if (!concreteString(row.rowId ?? row.id)) {
    return { accepted: false, reason: "row_identity_not_concrete" };
  }
  const sourceCheck = firstSourceReferenceCheck(row.sourcePath, row.source);
  if (!sourceCheck.accepted) {
    return { accepted: false, reason: sourceCheck.reason };
  }
  return { accepted: true, reason: "accepted" };
}

function normalizeStatus(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return "missing";
  }
  return row.status ?? row.retainedStatus ?? "declared";
}

function vectorOrNull(value) {
  if (!Array.isArray(value) || value.length !== 3) {
    return null;
  }
  const vector = value.map((entry) => finiteNumberOrNull(entry));
  return vector.every((entry) => entry !== null) ? vector : null;
}

function vectorNorm(vector) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
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

function nonnegativeNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    throw new Error(`${label} must be a nonnegative finite number.`);
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
  return sourceReferenceCheck(value).accepted;
}

function firstSourceReferenceCheck(...values) {
  let firstFailure = { accepted: false, reason: "missing_source_path" };
  for (const value of values) {
    const check = sourceReferenceCheck(value);
    if (check.accepted) {
      return check;
    }
    if (firstFailure.reason === "missing_source_path") {
      firstFailure = check;
    }
  }
  return firstFailure;
}

function sourceReferenceCheck(value) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(REPO_ROOT, sourcePath);
  const rejectionReason = sourceReferenceRejectionReason(resolvedPath);
  if (rejectionReason) {
    return { accepted: false, reason: rejectionReason };
  }
  try {
    if (!fs.statSync(resolvedPath).isFile()) {
      return { accepted: false, reason: "source_not_file" };
    }
  } catch {
    return { accepted: false, reason: "source_not_found" };
  }
  const contentRejectionReason = sourceContentRejectionReason(resolvedPath);
  if (contentRejectionReason !== null) {
    return { accepted: false, reason: contentRejectionReason };
  }
  return { accepted: true, reason: "accepted" };
}

function isNonDurableSourcePath(filePath) {
  return sourceReferenceRejectionReason(filePath) !== null;
}

function sourceReferenceRejectionReason(filePath) {
  const normalized = path.normalize(filePath);
  const tempRoot = path.normalize("/tmp");
  const privateTempRoot = path.normalize("/private/tmp");
  if (
    normalized.startsWith(`${tempRoot}${path.sep}`) ||
    normalized.startsWith(`${privateTempRoot}${path.sep}`)
  ) {
    return "temp_source_path";
  }
  const relative = path.relative(REPO_ROOT, normalized);
  const basename = path.basename(normalized).toLowerCase();
  if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
    return "source_outside_repo";
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return "coordination_source_path";
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return "authored_prose_source_path";
  }
  if (relative.startsWith(`content${path.sep}generated${path.sep}`)) {
    return "generated_source_path";
  }
  if (
    basename.includes("attempt") ||
    basename.includes("mock") ||
    basename.includes("toy") ||
    basename.includes("probe") ||
    basename.includes("negative-control") ||
    basename.includes("source-contract") ||
    basename.includes(".tmp")
  ) {
    return "control_or_attempt_source_path";
  }
  return null;
}

function sourceContentRejectionReason(filePath) {
  let text;
  try {
    text = fs.readFileSync(filePath, "utf8");
  } catch {
    return "source_unreadable";
  }
  const declarationText = sourceDeclarationText(text);
  for (const [pattern, reason] of NON_EVIDENCE_SOURCE_DECLARATIONS) {
    if (pattern.test(declarationText)) {
      return reason;
    }
  }
  return null;
}

function sourceDeclarationText(text) {
  try {
    const parsed = JSON.parse(text);
    const declarations = [];
    collectSourceDeclarations(parsed, declarations);
    return declarations.length > 0 ? declarations.join("\n") : text;
  } catch {
    return text;
  }
}

function collectSourceDeclarations(value, declarations, key = "") {
  if (value === null || value === undefined) {
    return;
  }
  if (Array.isArray(value)) {
    for (const entry of value) {
      collectSourceDeclarations(entry, declarations, key);
    }
    return;
  }
  if (typeof value === "object") {
    for (const [childKey, childValue] of Object.entries(value)) {
      collectSourceDeclarations(childValue, declarations, childKey);
    }
    return;
  }
  if (typeof value === "string" && SOURCE_DECLARATION_KEYS.has(key.toLowerCase())) {
    declarations.push(value);
  }
}

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((entry) => stableStringify(entry)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}
