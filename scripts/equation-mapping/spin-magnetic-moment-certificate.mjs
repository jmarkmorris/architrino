#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INPUT_SCHEMA = "aaa-equation-map-spin-magnetic-certificate-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-spin-magnetic-certificate-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const ROW_ORDER = [
  "ordered_frame_loop",
  "spin_lift",
  "gauge_control",
  "angular_momentum_ledger",
  "moment_map_magnetic",
  "covering_degree_g2",
  "exposure_fiber_residual",
];
const DEFAULT_TOLERANCES = {
  gauge: 1e-12,
  angularMomentum: 1e-9,
  gLead: 1e-12,
};
const ASSIGNED_SPIN_MARKERS = [
  "assignedspin",
  "observerformula",
  "gq2ms",
  "spinlabel",
];

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}
if (!args.input) {
  throw new Error("Missing required --input PATH argument.");
}

const input = readJson(path.resolve(args.input));
const output = evaluateCertificate(input, path.resolve(args.input));
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
  console.log(`Usage: node scripts/equation-mapping/spin-magnetic-moment-certificate.mjs --input PATH [options]

Options:
  --input PATH          Spin-to-magnetic-moment certificate input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the leading certificate is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-15/EQ-27 certificate
C_spin_to_mu. Attempt rows, toy rows, or non-durable sources never raise scores.`);
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

function evaluateCertificate(input, inputPath) {
  const rows = input.rows ?? {};
  const tolerances = parseTolerances(input.tolerances ?? {});
  const rowChecks = Object.fromEntries(
    ROW_ORDER.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId])]),
  );
  const missingRows = ROW_ORDER.filter((rowId) => !rowChecks[rowId].accepted);
  const sourceEvidence = evaluateSourceEvidence(rowChecks);
  const sameRecord = evaluateSameRecord({
    rows,
    sameRecordId: input.sameRecordId ?? null,
  });
  const spinLift = evaluateSpinLift(rows.spin_lift);
  const gaugeControl = evaluateGaugeControl(rows.gauge_control, tolerances);
  const angularMomentum = evaluateAngularMomentum(
    rows.angular_momentum_ledger,
    tolerances,
  );
  const momentMap = evaluateMomentMap(rows.moment_map_magnetic);
  const coveringDegree = evaluateCoveringDegree(
    rows.covering_degree_g2,
    tolerances,
  );
  const momentMapProvenance = evaluateMomentMapProvenance(
    rows.moment_map_magnetic,
    rows.covering_degree_g2,
  );
  const exposureFiber = evaluateExposureFiber(rows.exposure_fiber_residual);
  const status = decideStatus({
    missingRows,
    rowChecks,
    sourceEvidence,
    sameRecord,
    spinLift,
    gaugeControl,
    angularMomentum,
    momentMap,
    coveringDegree,
    momentMapProvenance,
    exposureFiber,
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
    certificate: {
      id: input.certificateId ?? null,
      row: "EQ-15/EQ-27",
      supportedRows: ["EQ-15", "EQ-27"],
      claimLevel:
        "score-neutral spinor-to-magnetic-moment certificate; accepted retained rows are required before score review",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: "no_score_increase",
      scoreReviewPreconditionsMet: status === "populated",
      missingRows,
      sourceEvidenceFailureCount: sourceEvidence.failures.length,
      nextBlocker: firstBlocker({
        status,
        missingRows,
        rowChecks,
        sourceEvidence,
        sameRecord,
        spinLift,
        gaugeControl,
        angularMomentum,
        momentMap,
        coveringDegree,
        momentMapProvenance,
        exposureFiber,
      }),
      sameRecordPass: sameRecord.passed,
      etaSpin: spinLift.etaSpin,
      etaSpinPass: spinLift.etaSpinPass,
      doubledPathRestores: spinLift.doubledPathRestores,
      doubledPathPass: spinLift.doubledPathPass,
      gaugeResidual: gaugeControl.residual,
      gaugePass: gaugeControl.passed,
      angularMomentumResidual: angularMomentum.residual,
      angularMomentumPass: angularMomentum.passed,
      momentMapPass: momentMap.passed,
      momentMapProvenancePass: momentMapProvenance.passed,
      momentMapProvenanceViolations: momentMapProvenance.violations.length,
      gLead: coveringDegree.gLead,
      gLeadResidual: coveringDegree.residual,
      gLeadPass: coveringDegree.passed,
      exposureFiberResidual: exposureFiber.residual,
      exposureFiberPass: exposureFiber.passed,
    },
    rows: Object.fromEntries(
      ROW_ORDER.map((rowId) => [
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
    sourceEvidenceFailures: sourceEvidence.failures,
    sameRecord,
    diagnostics: {
      spinLift,
      gaugeControl,
      angularMomentum,
      momentMap,
      coveringDegree,
      momentMapProvenance,
      exposureFiber,
    },
  };
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    certificate: output.certificate,
    summary: output.summary,
    rows: output.rows,
  };
}

function parseTolerances(raw) {
  return {
    gauge: positiveNumber(raw.gauge ?? DEFAULT_TOLERANCES.gauge, "tolerances.gauge"),
    angularMomentum: positiveNumber(
      raw.angularMomentum ?? DEFAULT_TOLERANCES.angularMomentum,
      "tolerances.angularMomentum",
    ),
    gLead: positiveNumber(raw.gLead ?? DEFAULT_TOLERANCES.gLead, "tolerances.gLead"),
  };
}

function evaluateAcceptedRow(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return { accepted: false, reason: "missing_row" };
  }
  const sourcePath = row.sourcePath ?? row.source ?? null;
  const status = row.status ?? row.retainedStatus ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    return { accepted: false, reason: "row_not_accepted", sourcePath };
  }
  if (!concreteString(row.rowId ?? row.id)) {
    return { accepted: false, reason: "row_identity_not_concrete", sourcePath };
  }
  const sourceCheck = evaluateSourceReference(sourcePath);
  if (!sourceCheck.exists) {
    return { accepted: false, reason: "row_source_not_found", sourcePath };
  }
  if (!sourceCheck.evidence) {
    return { accepted: false, reason: "accepted_without_evidence_source", sourcePath };
  }
  return { accepted: true, reason: "accepted", sourcePath };
}

function normalizeStatus(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return "missing";
  }
  return row.status ?? row.retainedStatus ?? "declared";
}

function evaluateSourceEvidence(rowChecks) {
  const failures = Object.entries(rowChecks)
    .filter(([, check]) => check.reason === "accepted_without_evidence_source")
    .map(([rowId, check]) => ({ rowId, sourcePath: check.sourcePath ?? null }));
  return {
    passed: failures.length === 0,
    failures,
  };
}

function hasNonSourceEvidenceMissingRows(missingRows, rowChecks) {
  return missingRows.some(
    (rowId) => rowChecks[rowId]?.reason !== "accepted_without_evidence_source",
  );
}

function evaluateSameRecord({ rows, sameRecordId }) {
  const rowStatuses = Object.fromEntries(
    ROW_ORDER.map((rowId) => {
      const row = rows[rowId] ?? {};
      const rowRecordId =
        row.sameRecordId ?? row.supportId ?? row.domainId ?? row.eventId ?? null;
      return [rowId, rowRecordId === sameRecordId ? "matched" : "mismatch"];
    }),
  );
  return {
    sameRecordId,
    passed: concreteString(sameRecordId) &&
      Object.values(rowStatuses).every((status) => status === "matched"),
    rowStatuses,
  };
}

function evaluateSpinLift(row) {
  const etaSpin = integerOrNull(row?.etaSpin ?? row?.eta_spin);
  const doubledPathRestores =
    row?.doubledPathRestores ?? row?.doubled_path_restores ?? null;
  return {
    etaSpin,
    etaSpinPass: etaSpin === 1,
    doubledPathRestores,
    doubledPathPass: doubledPathRestores === true,
  };
}

function evaluateGaugeControl(row, tolerances) {
  const residual = finiteNumberOrNull(row?.deltaGauge ?? row?.residual);
  return {
    residual,
    tolerance: tolerances.gauge,
    passed: residual !== null && residual <= tolerances.gauge,
  };
}

function evaluateAngularMomentum(row, tolerances) {
  const residual = finiteNumberOrNull(
    row?.deltaJ ?? row?.deltaAngularMomentum ?? row?.residual,
  );
  return {
    residual,
    tolerance: tolerances.angularMomentum,
    passed: residual !== null && residual <= tolerances.angularMomentum,
  };
}

function evaluateMomentMap(row) {
  const mu = row?.mu_E ?? row?.mu ?? row?.momentMap ?? null;
  const vector = Array.isArray(mu) ? mu.map(Number) : null;
  const vectorFinite = vector !== null && vector.every(Number.isFinite);
  const norm = vectorFinite
    ? Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0))
    : null;
  return {
    mu: vectorFinite ? vector : null,
    norm,
    passed: vectorFinite && norm > 0,
  };
}

function evaluateCoveringDegree(row, tolerances) {
  const gLead = finiteNumberOrNull(row?.gLead ?? row?.g_lead);
  const residual = gLead === null ? null : Math.abs(gLead - 2);
  return {
    gLead,
    residual,
    tolerance: tolerances.gLead,
    passed: residual !== null && residual <= tolerances.gLead,
  };
}

function evaluateMomentMapProvenance(momentRow, coveringRow) {
  const textFields = [
    ["moment_map_magnetic.momentMapKind", momentRow?.momentMapKind],
    ["moment_map_magnetic.formula", momentRow?.formula],
    ["moment_map_magnetic.derivation", momentRow?.derivation],
    ["moment_map_magnetic.proofKind", momentRow?.proofKind],
    ["moment_map_magnetic.constructionKind", momentRow?.constructionKind],
    ["covering_degree_g2.g2Derivation", coveringRow?.g2Derivation],
    ["covering_degree_g2.derivation", coveringRow?.derivation],
    ["covering_degree_g2.formula", coveringRow?.formula],
    ["covering_degree_g2.coveringDegreeKind", coveringRow?.coveringDegreeKind],
  ];
  const violations = [];
  for (const [field, value] of textFields) {
    const normalized = normalizeMarkerText(value);
    if (ASSIGNED_SPIN_MARKERS.some((marker) => normalized.includes(marker))) {
      violations.push({
        field,
        reason: "assigned_spin_label",
        value: String(value),
      });
    }
  }
  if (momentRow?.exposureCurrentIntegral === false) {
    violations.push({
      field: "moment_map_magnetic.exposureCurrentIntegral",
      reason: "missing_exposure_current_integral",
      value: false,
    });
  }
  if (coveringRow?.coveringDegreeWitness === false) {
    violations.push({
      field: "covering_degree_g2.coveringDegreeWitness",
      reason: "missing_covering_degree_witness",
      value: false,
    });
  }
  return {
    passed: violations.length === 0,
    violations,
    firstViolation: violations[0] ?? null,
  };
}

function evaluateExposureFiber(row) {
  const residual = finiteNumberOrNull(
    row?.R_fib ?? row?.exposureFiberResidual ?? row?.residual,
  );
  return {
    residual,
    passed: residual !== null && residual >= 0,
  };
}

function decideStatus({
  missingRows,
  rowChecks,
  sourceEvidence,
  sameRecord,
  spinLift,
  gaugeControl,
  angularMomentum,
  momentMap,
  coveringDegree,
  momentMapProvenance,
  exposureFiber,
}) {
  if (missingRows.length > 0 && hasNonSourceEvidenceMissingRows(missingRows, rowChecks)) {
    return "blocked_missing_rows";
  }
  if (!sourceEvidence.passed) {
    return "blocked_source_evidence";
  }
  if (!sameRecord.passed) {
    return "blocked_record_split";
  }
  if (!spinLift.etaSpinPass) {
    return "blocked_spin_lift_not_odd";
  }
  if (!spinLift.doubledPathPass) {
    return "blocked_doubled_path_not_restored";
  }
  if (!gaugeControl.passed) {
    return "blocked_gauge_residual";
  }
  if (!angularMomentum.passed) {
    return "blocked_angular_momentum_residual";
  }
  if (!momentMap.passed) {
    return "blocked_missing_moment_map";
  }
  if (!coveringDegree.passed) {
    return "blocked_leading_g_not_two";
  }
  if (!momentMapProvenance.passed) {
    return "blocked_assigned_spin_label";
  }
  if (!exposureFiber.passed) {
    return "blocked_missing_exposure_fiber_residual";
  }
  return "populated";
}

function firstBlocker({
  status,
  missingRows,
  rowChecks,
  sourceEvidence,
  sameRecord,
  spinLift,
  gaugeControl,
  angularMomentum,
  momentMap,
  coveringDegree,
  momentMapProvenance,
  exposureFiber,
}) {
  if (status === "populated") {
    return null;
  }
  if (missingRows.length > 0) {
    if (rowChecks[missingRows[0]]?.reason === "accepted_without_evidence_source") {
      return "accepted_without_evidence_source";
    }
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!sourceEvidence.passed) {
    return "accepted_without_evidence_source";
  }
  if (!sameRecord.passed) {
    return "record_split";
  }
  if (!spinLift.etaSpinPass) {
    return "spin_lift_not_odd";
  }
  if (!spinLift.doubledPathPass) {
    return "doubled_path_not_restored";
  }
  if (!gaugeControl.passed) {
    return "gauge_residual";
  }
  if (!angularMomentum.passed) {
    return "angular_momentum_residual";
  }
  if (!momentMap.passed) {
    return "missing_moment_map";
  }
  if (!coveringDegree.passed) {
    return "leading_g_not_two";
  }
  if (!momentMapProvenance.passed) {
    return "eq27.assigned_spin_label";
  }
  if (!exposureFiber.passed) {
    return "missing_exposure_fiber_residual";
  }
  return status;
}

function integerOrNull(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const number = Number(value);
  return Number.isInteger(number) ? number : null;
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

function normalizeMarkerText(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function evaluateSourceReference(value) {
  if (!concreteString(value)) {
    return { exists: false, evidence: false };
  }
  if (/^https?:\/\//.test(value.trim())) {
    return { exists: true, evidence: true };
  }
  const resolvedPath = path.resolve(value.trim());
  try {
    const exists = fs.statSync(resolvedPath).isFile();
    return {
      exists,
      evidence: exists && isEvidenceSourcePath(resolvedPath),
    };
  } catch {
    return { exists: false, evidence: false };
  }
}

function isEvidenceSourcePath(filePath) {
  const normalized = path.normalize(filePath);
  const repoRoot = path.resolve(".");
  const relative = path.relative(repoRoot, normalized);
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
  const basename = path.basename(normalized).toLowerCase();
  return (
    !normalized.startsWith(`${path.normalize("/tmp")}${path.sep}`) &&
    !normalized.startsWith(`${path.normalize("/private/tmp")}${path.sep}`) &&
    !basename.includes(".tmp") &&
    !basename.includes("attempt") &&
    !basename.includes("toy") &&
    !basename.includes("source-contract") &&
    !basename.includes("source-evidence-probe") &&
    !basename.includes("probe") &&
    !basename.includes("mock") &&
    !basename.includes("negative-control")
  );
}
