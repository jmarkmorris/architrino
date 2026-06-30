#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INPUT_SCHEMA = "aaa-equation-map-weak-gauge-exposure-domain-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-weak-gauge-exposure-domain-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";
const SOURCE_EVIDENCE_FAILURE_REASONS = new Set([
  "accepted_without_evidence_source",
  "raw_url_source_not_mirrored",
  "weak_visible_branch_ledger_source_contract_mismatch",
]);

const REQUIRED_ROWS = [
  "weak_visible_branch_ledger",
  "weak_projection",
  "weak_quotient",
  "weak_exposure_record",
  "va_chirality_gate",
  "ckm_overlap_readout",
  "pmns_overlap_readout",
  "weak_corridor_provenance",
  "effective_gauge_covariance_witness",
  "reaction_event_ledger",
  "noether_sea_response",
];

const DOMAIN_ROWS = [
  "weak_visible_branch_ledger",
  "weak_projection",
  "weak_quotient",
  "weak_exposure_record",
  "va_chirality_gate",
  "ckm_overlap_readout",
  "pmns_overlap_readout",
  "weak_corridor_provenance",
  "effective_gauge_covariance_witness",
];

const DEFAULT_TOLERANCES = {
  covariance: 1e-12,
  va: 1e-12,
  ckm: 1e-12,
  pmns: 1e-12,
  provenance: 1e-12,
  retune: 1e-12,
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}
if (!args.input) {
  throw new Error("Missing required --input PATH argument.");
}

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluateWeakGaugeExposureDomain(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/weak-gauge-exposure-domain.mjs --input PATH [options]

Options:
  --input PATH          Weak/gauge exposure-domain input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the exposure-domain packet is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-16 weak/gauge exposure-domain
packet. It does not recover Yang-Mills, QED, QCD, V-A, CKM, or PMNS rows by
itself; it only prevents those observer-level readouts from splitting across
different retained weak-visible domains.`);
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

function evaluateWeakGaugeExposureDomain(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const rows = input.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const sourceEvidence = evaluateSourceEvidence(rowChecks);
  const domain = evaluateDomain(rows);
  const branchRecord = evaluateGaugeBranchRecord(input.gauge ?? {});
  const residuals = evaluateResiduals(input.residuals ?? {}, tolerances);
  const status = decideStatus({
    missingRows,
    rowChecks,
    sourceEvidence,
    domain,
    branchRecord,
    residuals,
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
      id: input.residualId ?? null,
      row: "EQ-16",
      supportedRows: ["EQ-15", "EQ-16", "EQ-16A", "EQ-27", "EQ-30"],
      claimLevel:
        "score-neutral weak/gauge exposure-domain packet; accepted retained rows are required before score review",
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
        rowChecks,
        sourceEvidence,
        domain,
        branchRecord,
        residuals,
      }),
      sourceEvidencePass: sourceEvidence.passed,
      sourceEvidenceFailureCount: sourceEvidence.failures.length,
      domainPass: domain.passed,
      sharedDomainId: domain.sharedDomainId,
      domainSplitCount: domain.uniqueDomainIds.length,
      gaugeBranchRecordStable: branchRecord.stable,
      covariancePass: residuals.covariance.passed,
      vaPass: residuals.va.passed,
      ckmPass: residuals.ckm.passed,
      pmnsPass: residuals.pmns.passed,
      provenancePass: residuals.provenance.passed,
      retunePass: residuals.retune.passed,
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
          domainId: domainIdForRow(rows[rowId]),
          branchRecordId: rows[rowId]?.branchRecordId ?? null,
        },
      ]),
    ),
    domain,
    sourceEvidence,
    branchRecord,
    residuals,
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

function evaluateDomain(rows) {
  const rowDomainIds = {};
  const missingDomainRows = [];
  for (const rowId of DOMAIN_ROWS) {
    const domainId = domainIdForRow(rows[rowId]);
    rowDomainIds[rowId] = domainId;
    if (!domainId) {
      missingDomainRows.push(rowId);
    }
  }
  const uniqueDomainIds = uniqueStrings(Object.values(rowDomainIds).filter(Boolean));
  const passed = missingDomainRows.length === 0 && uniqueDomainIds.length === 1;
  return {
    requiredRows: DOMAIN_ROWS,
    rowDomainIds,
    uniqueDomainIds,
    missingDomainRows,
    sharedDomainId: passed ? uniqueDomainIds[0] : null,
    passed,
  };
}

function domainIdForRow(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return null;
  }
  return (
    stringOrNull(row.domainId) ??
    stringOrNull(row.retainedDomainId) ??
    stringOrNull(row.eventId) ??
    stringOrNull(row.carrierId) ??
    null
  );
}

function evaluateGaugeBranchRecord(raw) {
  const changed =
    raw.physicalBranchRecordChanged === true ||
    raw.branchRecordChanged === true ||
    raw.gaugeRelabelChangesBranchRecord === true;
  return {
    stable: !changed,
    physicalBranchRecordChanged: changed,
    gaugeChartId: raw.gaugeChartId ?? null,
    branchRecordId: raw.branchRecordId ?? null,
  };
}

function evaluateResiduals(raw, tolerances) {
  return {
    covariance: evaluateScalarResidual(
      raw.covarianceResidual ?? raw.R_cov,
      tolerances.covariance,
      "covariance",
    ),
    va: evaluateScalarResidual(
      raw.vaResidual ?? raw.R_VA ?? raw.R_va,
      tolerances.va,
      "V-A",
    ),
    ckm: evaluateScalarResidual(
      raw.ckmResidual ?? raw.R_CKM ?? raw.R_ckm,
      tolerances.ckm,
      "CKM",
    ),
    pmns: evaluateScalarResidual(
      raw.pmnsResidual ?? raw.R_PMNS ?? raw.R_pmns,
      tolerances.pmns,
      "PMNS",
    ),
    provenance: evaluateScalarResidual(
      raw.provenanceResidual ?? raw.R_prov,
      tolerances.provenance,
      "provenance",
    ),
    retune: evaluateScalarResidual(
      raw.retuneResidual ?? raw.S_retune,
      tolerances.retune,
      "retune",
    ),
  };
}

function evaluateSourceEvidence(rowChecks) {
  const failures = Object.entries(rowChecks)
    .filter(([, check]) => SOURCE_EVIDENCE_FAILURE_REASONS.has(check.reason))
    .map(([rowId, check]) => ({
      rowId,
      reason: check.reason,
      sourcePath: check.sourcePath ?? null,
    }));
  return {
    passed: failures.length === 0,
    failures,
  };
}

function hasNonSourceEvidenceMissingRows(missingRows, rowChecks) {
  return missingRows.some((rowId) => !SOURCE_EVIDENCE_FAILURE_REASONS.has(rowChecks[rowId]?.reason));
}

function decideStatus({ missingRows, rowChecks, sourceEvidence, domain, branchRecord, residuals }) {
  if (missingRows.length > 0 && hasNonSourceEvidenceMissingRows(missingRows, rowChecks)) {
    return "blocked_missing_rows";
  }
  if (!domain.passed) {
    return "blocked_hidden_domain_split";
  }
  if (!sourceEvidence.passed) {
    return "blocked_source_evidence";
  }
  if (!branchRecord.stable) {
    return "blocked_gauge_branch_record_changed";
  }
  if (!residuals.covariance.passed) {
    return "blocked_covariance_residual";
  }
  if (!residuals.va.passed || !residuals.ckm.passed || !residuals.pmns.passed) {
    return "blocked_weak_residual";
  }
  if (!residuals.provenance.passed) {
    return "blocked_provenance_residual";
  }
  if (!residuals.retune.passed) {
    return "blocked_hidden_retune";
  }
  return "populated";
}

function firstBlocker({ status, missingRows, rowChecks, sourceEvidence, domain, branchRecord, residuals }) {
  if (status === "blocked_hidden_domain_split") {
    if (domain.missingDomainRows.length > 0) {
      return `missing_domain_id_${domain.missingDomainRows[0]}`;
    }
    return "weak_hidden_domain_split";
  }
  if (missingRows.length > 0) {
    if (SOURCE_EVIDENCE_FAILURE_REASONS.has(rowChecks[missingRows[0]]?.reason)) {
      return rowChecks[missingRows[0]].reason;
    }
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!sourceEvidence.passed) {
    return sourceEvidence.failures[0]?.reason ?? "accepted_without_evidence_source";
  }
  if (!branchRecord.stable) {
    return "gauge_branch_record_changed";
  }
  if (!residuals.covariance.passed) {
    return "covariance_residual_above_tolerance";
  }
  if (!residuals.va.passed) {
    return "va_residual_above_tolerance";
  }
  if (!residuals.ckm.passed) {
    return "ckm_residual_above_tolerance";
  }
  if (!residuals.pmns.passed) {
    return "pmns_residual_above_tolerance";
  }
  if (!residuals.provenance.passed) {
    return "provenance_residual_above_tolerance";
  }
  if (!residuals.retune.passed) {
    return "retune_residual_above_tolerance";
  }
  return null;
}

function parseTolerances(raw) {
  return Object.fromEntries(
    Object.entries(DEFAULT_TOLERANCES).map(([key, defaultValue]) => [
      key,
      positiveNumberOrDefault(raw[key], defaultValue),
    ]),
  );
}

function evaluateAcceptedRow(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return { accepted: false, reason: "row_missing" };
  }
  const status = normalizeStatus(row);
  if (!ACCEPTED_STATUSES.has(status)) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  const sourceCheck = evaluateDurableSource(row.sourcePath ?? row.source, row);
  if (!sourceCheck.accepted) {
    return {
      accepted: false,
      reason: sourceCheck.reason,
      sourcePath: row.sourcePath ?? row.source ?? null,
    };
  }
  return { accepted: true, reason: "accepted" };
}

function evaluateDurableSource(sourcePath, row = {}) {
  if (typeof sourcePath !== "string" || sourcePath.trim() === "") {
    return { accepted: false, reason: "source_missing" };
  }
  if (
    sourcePath === "pending-retained-source" ||
    sourcePath.startsWith("/tmp/") ||
    sourcePath.startsWith("/private/tmp/") ||
    sourcePath.startsWith("content/generated/")
  ) {
    return { accepted: false, reason: "source_not_durable" };
  }
  if (/^https?:\/\//.test(sourcePath)) {
    return { accepted: false, reason: "raw_url_source_not_mirrored" };
  }
  const resolvedPath = path.resolve(sourcePath);
  if (!fs.existsSync(resolvedPath)) {
    return { accepted: false, reason: "source_not_found" };
  }
  if (fs.statSync(resolvedPath).isDirectory()) {
    return { accepted: false, reason: "source_is_directory" };
  }
  if (!isEvidenceSourcePath(resolvedPath)) {
    return { accepted: false, reason: "accepted_without_evidence_source" };
  }
  if (!sourceSupportsWeakVisibleBranchLedger(resolvedPath, row)) {
    return { accepted: false, reason: "weak_visible_branch_ledger_source_contract_mismatch" };
  }
  return { accepted: true, reason: "source_file" };
}

function isEvidenceSourcePath(filePath) {
  const relative = path.relative(process.cwd(), path.normalize(filePath));
  if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
    return false;
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return false;
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return false;
  }
  if (relative.startsWith(`content${path.sep}generated${path.sep}`)) {
    return false;
  }
  const basename = path.basename(relative).toLowerCase();
  return (
    !basename.includes("attempt") &&
    !basename.includes("source-contract") &&
    !basename.includes("mock") &&
    !basename.includes("negative-control")
  );
}

function sourceSupportsWeakVisibleBranchLedger(filePath, row) {
  let source;
  try {
    source = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return false;
  }
  const sourceValues = collectSourceSupportValues(source)
    .filter((value) => typeof value === "string")
    .map((value) => value.toLowerCase());
  const rowSupported = sourceValues.some(
    (value) => value.includes("eq-16") || value.includes("eq16"),
  );
  const ledgerSupported = sourceValues.some(
    (value) =>
      value.includes("weak_visible_branch_ledger") ||
      value.includes("weak-visible branch ledger") ||
      value.includes("weak visible branch ledger"),
  );
  const expectedDomainId = domainIdForRow(row);
  const expectedBranchRecordId = row?.branchRecordId ?? null;
  const sourceStrings = new Set(collectSourceSupportValues(source).filter((value) => typeof value === "string"));
  const domainSupported =
    !expectedDomainId || sourceStrings.has(expectedDomainId);
  const branchSupported =
    !expectedBranchRecordId || sourceStrings.has(expectedBranchRecordId);
  return rowSupported && ledgerSupported && domainSupported && branchSupported;
}

function collectSourceSupportValues(value) {
  if (Array.isArray(value)) {
    return value.flatMap((entry) => collectSourceSupportValues(entry));
  }
  if (value && typeof value === "object") {
    return [
      value.row,
      value.targetRow,
      value.sourceRole,
      value.sourceFamily,
      value.sourceKind,
      value.sourceSupport,
      value.sourceSupports,
      value.requiredSourceSupport,
      value.evidenceFamily,
      value.evidenceRole,
      value.evidenceSupports,
      value.claimLevel,
      value.purpose,
      value.supportedRows,
      value.domainId,
      value.retainedDomainId,
      value.eventId,
      value.carrierId,
      value.branchRecordId,
      ...Object.values(value).flatMap((entry) =>
        typeof entry === "object" ? collectSourceSupportValues(entry) : [],
      ),
    ].flatMap((entry) => (Array.isArray(entry) ? entry : [entry]));
  }
  return typeof value === "string" ? [value] : [];
}

function normalizeStatus(row) {
  if (!row || typeof row !== "object") {
    return "missing";
  }
  return typeof row.status === "string" ? row.status : "missing";
}

function evaluateScalarResidual(raw, tolerance, label) {
  const value = finiteNumberOrNull(raw);
  return {
    label,
    raw: value,
    tolerance,
    passed: value !== null && Math.abs(value) <= tolerance,
  };
}

function positiveNumberOrDefault(value, defaultValue) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultValue;
}

function finiteNumberOrNull(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function stringOrNull(value) {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

function uniqueStrings(values) {
  return [...new Set(values.filter((value) => typeof value === "string"))];
}
