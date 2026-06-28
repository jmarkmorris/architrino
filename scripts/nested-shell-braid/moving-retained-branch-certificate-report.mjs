#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const REQUIRED_ROWS = [
  {
    path: "branch_certificate_ref",
    requirement:
      "One branch label, window, separator chart, active root ledger, positive gaps, memory depth, and active wave-vector gap, all bound through same_record_identity.",
    failureCode: "blocked_pending_accepted_branch_chart",
  },
  {
    path: "moving_continuation_ref",
    requirement: "Same branch, window, and active-root ledger with nonzero drift band and no branch transition.",
    failureCode: "structural.branch_split",
  },
  {
    path: "root_boundary_ref",
    requirement:
      "Same active-root record reports the gap, transversality, or signed root-index boundary for limiting speed.",
    failureCode: "structural.root_index_unreported",
  },
  {
    path: "deformation_generator_ref",
    requirement: "One generator produces both the envelope coefficient row and the clock-phase row.",
    failureCode: "structural.generator_split",
  },
  {
    path: "common_speed_record_ref",
    requirement:
      "Same homogeneous Noether sea and clock/ruler map extracts common material, photon, gravitational-wave, and calibrated speeds.",
    failureCode: "residual.speed_conflation",
  },
  {
    path: "signal_sector_refs",
    requirement:
      "Photon Gate A, gravitational-wave TT, two-way signal, and nondispersion rows replay on the same branch and dressing record.",
    failureCode: "tri_lorentz.photon_gate_split",
  },
  {
    path: "event_ledger_ref",
    requirement: "Same-window event ledger closes or names the first residual channel.",
    failureCode: "event.ledger_residual",
  },
];

const SOURCE_SCOUT_SCHEMA =
  "moving_retained_branch_certificate_accepted_branch_chart_source_scout/v0";
const SOURCE_SCOUT_MANIFEST_SCHEMA =
  "moving_retained_branch_certificate_accepted_branch_chart_source_scout_manifest/v0";
const ACCEPTED_BRANCH_CHART_SOURCE_STATUS = "accepted_same_record_branch_chart";

const SAME_RECORD_IDENTITY_ROWS = [
  {
    path: "same_record_identity.branch_label",
    requirement: "Moving branch label q consumed by every structural-integrity row.",
    missingCode: "same_record_identity_branch_label_missing",
    proxyCode: "same_record_identity_branch_label_proxy_not_accepted",
  },
  {
    path: "same_record_identity.extraction_window_id",
    requirement: "Extraction window W shared by branch, signal, common-speed, and event-ledger rows.",
    missingCode: "same_record_identity_extraction_window_id_missing",
    proxyCode: "same_record_identity_extraction_window_id_proxy_not_accepted",
  },
  {
    path: "same_record_identity.active_root_ledger_hash",
    requirement: "Accepted active-root ledger identity for the retained moving branch.",
    missingCode: "same_record_identity_active_root_ledger_hash_missing",
    proxyCode: "same_record_identity_active_root_ledger_hash_proxy_not_accepted",
  },
  {
    path: "same_record_identity.accepted_branch_chart_ref",
    requirement: "Accepted branch-chart record, not a fixture-only or proxy branch reference.",
    missingCode: "same_record_identity_accepted_branch_chart_ref_missing",
    proxyCode: "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted",
  },
  {
    path: "same_record_identity.separator_chart_ref",
    requirement: "Separator chart used by the accepted branch chart.",
    missingCode: "same_record_identity_separator_chart_ref_missing",
    proxyCode: "same_record_identity_separator_chart_ref_proxy_not_accepted",
  },
  {
    path: "same_record_identity.positive_gap_record_ref",
    requirement: "Positive stability or gap record for the same retained branch.",
    missingCode: "same_record_identity_positive_gap_record_ref_missing",
    proxyCode: "same_record_identity_positive_gap_record_ref_proxy_not_accepted",
  },
  {
    path: "same_record_identity.memory_depth_record_ref",
    requirement: "Memory-depth bound h_mem for the same retained branch.",
    missingCode: "same_record_identity_memory_depth_record_ref_missing",
    proxyCode: "same_record_identity_memory_depth_record_ref_proxy_not_accepted",
  },
  {
    path: "same_record_identity.active_wave_vector_gap_ref",
    requirement: "Active wave-vector gap Delta_k for the same retained branch.",
    missingCode: "same_record_identity_active_wave_vector_gap_ref_missing",
    proxyCode: "same_record_identity_active_wave_vector_gap_ref_proxy_not_accepted",
  },
];

function parseArgs(argv) {
  const args = {
    input: null,
    out: null,
    validate: null,
    sourceScout: null,
    validateSourceScout: null,
    pretty: false,
    printContract: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--input") {
      args.input = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--validate") {
      args.validate = argv[++i];
    } else if (arg === "--source-scout") {
      args.sourceScout = argv[++i];
    } else if (arg === "--validate-source-scout") {
      args.validateSourceScout = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--print-contract") {
      args.printContract = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/nested-shell-braid/moving-retained-branch-certificate-report.mjs [options]

Options:
  --input PATH       Candidate moving retained branch certificate JSON.
  --validate PATH    Validate an emitted moving retained branch certificate report.
  --source-scout PATH
                     Evaluate current accepted-branch-chart source candidates.
  --validate-source-scout PATH
                     Validate an emitted accepted-branch-chart source scout.
  --print-contract   Print the required moving retained branch certificate rows.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON output.
  --help             Show this help.

This is a fail-closed priority-side checker. It can populate the structural
integrity residual vector only after the same-record moving branch certificate
is present; it does not accept rest-only or independently fitted speed rows.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function getPath(value, pathExpression) {
  return pathExpression.split(".").reduce((cursor, key) => cursor?.[key], value);
}

function present(value) {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === "string") {
    return value.trim() !== "";
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length > 0;
  }
  return true;
}

function proxyValue(value) {
  return typeof value === "string" && value.trim().startsWith("proxy:");
}

function rejectionCodeForPath(rowPath, kind) {
  const suffix = kind === "proxy" ? "proxy_not_accepted" : "missing";
  return `${rowPath.replaceAll(".", "_")}_${suffix}`;
}

function sourceStatusRejectionCode(sourceStatus) {
  if (sourceStatus === ACCEPTED_BRANCH_CHART_SOURCE_STATUS) {
    return null;
  }
  if (!present(sourceStatus)) {
    return "accepted_same_record_branch_chart_source_status_missing";
  }
  return `${String(sourceStatus).replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "")}_not_accepted_branch_chart_source`;
}

function contract() {
  return {
    schema: "moving_retained_branch_certificate_contract/v0",
    purpose:
      "Minimum same-record moving branch object before structural-integrity common-limit rows may be populated.",
    minimum_same_record_identity_fields: SAME_RECORD_IDENTITY_ROWS.map(({ path: rowPath, requirement, missingCode, proxyCode }) => ({
      path: rowPath,
      requirement,
      failure_code: "blocked_pending_accepted_branch_chart",
      missing_field_code: missingCode,
      proxy_field_code: proxyCode,
    })),
    required_rows: REQUIRED_ROWS.map(({ path: rowPath, requirement, failureCode }) => ({
      path: rowPath,
      requirement,
      failure_code: failureCode,
    })),
    required_certificate_status: "accepted_same_branch",
    authorization_boundary: {
      populates_structural_integrity_residual_vector_requires_all_rows: true,
      photon_gate_a_accepted_by_this_contract: false,
      observer_export_authorized_by_this_contract: false,
    },
  };
}

function sourceScoutContract() {
  return {
    schema: `${SOURCE_SCOUT_SCHEMA}_contract`,
    purpose:
      "Enumerate current rank-6 branch-chart source candidates before accepting moving_retained_branch_certificate/v0.",
    accepted_source_status: ACCEPTED_BRANCH_CHART_SOURCE_STATUS,
    required_candidate_fields: [
      {
        path: "branch_certificate_ref",
        requirement: "Non-proxy retained branch certificate reference on the candidate source.",
      },
      ...SAME_RECORD_IDENTITY_ROWS.map(({ path: rowPath, requirement }) => ({
        path: rowPath,
        requirement,
      })),
    ],
    authorization_boundary: {
      source_scout_accepts_moving_certificate: false,
      structural_integrity_residual_vector: false,
      photon_gate_a: false,
      lorentz_rows: false,
      observer_export: false,
    },
  };
}

function evaluateSameRecordIdentity(candidate) {
  const rows = SAME_RECORD_IDENTITY_ROWS.map(({ path: rowPath, requirement, missingCode, proxyCode }) => {
    const value = getPath(candidate, rowPath);
    const fieldPresent = present(value);
    const proxy = proxyValue(value);
    const pass = fieldPresent && !proxy;
    return {
      path: rowPath,
      requirement,
      present: fieldPresent,
      proxy,
      pass,
      failure_code: pass ? null : proxy ? proxyCode : missingCode,
    };
  });
  const failedRows = rows.filter((row) => !row.pass);
  return {
    pass: failedRows.length === 0,
    rows,
    missing_or_rejected_fields: failedRows.map((row) => row.path),
    missing_or_rejected_field_codes: failedRows.map((row) => row.failure_code),
  };
}

function evaluateSourceScoutField(candidate, rowPath, requirement) {
  const value = rowPath.startsWith("same_record_identity.")
    ? getPath(candidate, rowPath) ?? getPath(candidate, rowPath.replace("same_record_identity.", ""))
    : getPath(candidate, rowPath);
  const fieldPresent = present(value);
  const proxy = proxyValue(value);
  const pass = fieldPresent && !proxy;
  return {
    path: rowPath,
    requirement,
    present: fieldPresent,
    proxy,
    pass,
    failure_code: pass ? null : rejectionCodeForPath(rowPath, proxy ? "proxy" : "missing"),
  };
}

function evaluateRow(candidate, row) {
  const value = getPath(candidate, row.path);
  if (row.path === "branch_certificate_ref") {
    const sameRecordIdentity = evaluateSameRecordIdentity(candidate);
    const branchReferencePresent = present(value);
    const branchReferenceProxy = proxyValue(value);
    const pass = branchReferencePresent && !branchReferenceProxy && sameRecordIdentity.pass;
    return {
      path: row.path,
      requirement: row.requirement,
      present: branchReferencePresent,
      pass,
      failure_code: pass ? null : row.failureCode,
      accepted_branch_chart_intake: {
        schema: "moving_retained_branch_certificate_accepted_branch_chart_intake/v0",
        claim_boundary:
          "Rejects proxy branch references before structural-integrity residual population; it does not authorize Photon Gate A, Lorentz rows, or observer export.",
        branch_certificate_ref_present: branchReferencePresent,
        branch_certificate_ref_proxy: branchReferenceProxy,
        minimum_same_record_identity_fields: sameRecordIdentity.rows,
        missing_or_rejected_fields: sameRecordIdentity.missing_or_rejected_fields,
        missing_or_rejected_field_codes: sameRecordIdentity.missing_or_rejected_field_codes,
        rejects_proxy_branch_certificate_refs: true,
        first_missing_or_rejected_field_code:
          (branchReferenceProxy ? "branch_certificate_ref_proxy_not_accepted" : null) ??
          sameRecordIdentity.missing_or_rejected_field_codes[0] ??
          null,
        first_failure: pass ? null : row.failureCode,
      },
    };
  }
  return {
    path: row.path,
    requirement: row.requirement,
    present: present(value),
    pass: present(value),
    failure_code: present(value) ? null : row.failureCode,
  };
}

function evaluateSourceScoutCandidate(candidate) {
  const fieldRows = [
    {
      path: "branch_certificate_ref",
      requirement: "Non-proxy retained branch certificate reference on the candidate source.",
    },
    ...SAME_RECORD_IDENTITY_ROWS.map(({ path: rowPath, requirement }) => ({
      path: rowPath,
      requirement,
    })),
  ].map((row) => evaluateSourceScoutField(candidate, row.path, row.requirement));
  const failedFields = fieldRows.filter((row) => !row.pass);
  const sourceStatusAccepted = candidate.source_status === ACCEPTED_BRANCH_CHART_SOURCE_STATUS;
  const sourceStatusCode = sourceStatusRejectionCode(candidate.source_status);
  const firstRejectionCode =
    failedFields[0]?.failure_code ?? sourceStatusCode ?? null;
  const accepted = failedFields.length === 0 && sourceStatusAccepted;

  return {
    id: candidate.id ?? null,
    family: candidate.family ?? null,
    source_ref: candidate.source_ref ?? null,
    source_status: candidate.source_status ?? null,
    source_status_accepted: sourceStatusAccepted,
    source_status_rejection_code: sourceStatusCode,
    accepted,
    first_rejection_code: accepted ? null : firstRejectionCode,
    missing_or_rejected_fields: failedFields.map((row) => row.path),
    missing_or_rejected_field_codes: failedFields.map((row) => row.failure_code),
    field_results: fieldRows,
    evidence_note: candidate.evidence_note ?? null,
  };
}

export function buildReport(candidate, options = {}) {
  if (!isObject(candidate)) {
    throw new Error("Candidate moving retained branch certificate must be a JSON object.");
  }

  const rowResults = REQUIRED_ROWS.map((row) => evaluateRow(candidate, row));
  const failedRows = rowResults.filter((row) => !row.pass);
  const rowsComplete = failedRows.length === 0;
  const statusAccepted = candidate.certificate_status === "accepted_same_branch";
  const accepted = rowsComplete && statusAccepted;
  const firstFailure = failedRows[0]?.failure_code ?? (statusAccepted ? null : "blocked_pending_accepted_branch_chart");
  const acceptedBranchChartIntake =
    rowResults.find((row) => row.path === "branch_certificate_ref")?.accepted_branch_chart_intake ?? null;

  return {
    schema: "moving_retained_branch_certificate_report/v0",
    source_ref: options.sourceRef ?? candidate.source_ref ?? null,
    certificate_id: candidate.certificate_id ?? candidate.id ?? "moving-retained-branch-candidate",
    promotion_status: candidate.promotion_status ?? "priority-only",
    certificate_verdict: accepted ? "accepted_same_branch" : firstFailure,
    first_failure: accepted ? null : firstFailure,
    row_results: rowResults,
    accepted_branch_chart_intake: {
      ...acceptedBranchChartIntake,
      accepted_branch_chart: acceptedBranchChartIntake?.first_failure === null && statusAccepted,
      certificate_status: candidate.certificate_status ?? null,
    },
    missing_or_rejected_rows: failedRows.map((row) => row.path),
    certificate_status: candidate.certificate_status ?? null,
    authorization: {
      populates_structural_integrity_residual_vector: accepted,
      photon_gate_a_accepted: false,
      observer_export: false,
    },
  };
}

export function buildAcceptedBranchChartSourceScout(manifest, options = {}) {
  if (!isObject(manifest)) {
    throw new Error("Accepted branch chart source scout manifest must be a JSON object.");
  }
  if (!Array.isArray(manifest.candidates)) {
    throw new Error("Accepted branch chart source scout manifest must include candidates array.");
  }

  const candidateResults = manifest.candidates.map(evaluateSourceScoutCandidate);
  const acceptedCandidates = candidateResults.filter((candidate) => candidate.accepted);

  return {
    schema: SOURCE_SCOUT_SCHEMA,
    manifest_schema: manifest.schema ?? null,
    scout_id: manifest.scout_id ?? "moving-retained-branch-accepted-branch-chart-source-scout",
    source_ref: options.sourceRef ?? manifest.source_ref ?? null,
    promotion_status: "priority-only",
    contract: sourceScoutContract(),
    candidate_count: candidateResults.length,
    accepted_count: acceptedCandidates.length,
    accepted_candidate_ids: acceptedCandidates.map((candidate) => candidate.id).filter(Boolean),
    first_failure:
      acceptedCandidates.length > 0
        ? null
        : "accepted_same_record_branch_chart_absent",
    first_rejection_code:
      acceptedCandidates.length > 0
        ? null
        : candidateResults.find((candidate) => candidate.first_rejection_code)?.first_rejection_code ??
          "accepted_same_record_branch_chart_candidate_absent",
    candidate_results: candidateResults,
    required_next_object: {
      object:
        "accepted_same_record_branch_chart on one moving branch window",
      required_fields: sourceScoutContract().required_candidate_fields.map((field) => field.path),
      must_be_non_fixture: true,
      must_bind_same_record_identity: true,
    },
    authorization: {
      accepted_branch_chart_source_ready: acceptedCandidates.length > 0,
      moving_retained_branch_certificate: false,
      structural_integrity_residual_vector: false,
      photon_gate_a: false,
      lorentz_rows: false,
      observer_export: false,
    },
    not_authorized: [
      "does not populate moving_retained_branch_certificate/v0",
      "does not populate structural-integrity residual rows",
      "does not accept Photon Gate A",
      "does not authorize Lorentz, gravitational-wave, or observer export rows",
    ],
  };
}

export function validationErrors(report) {
  const errors = [];
  if (!isObject(report)) {
    return ["report must be an object"];
  }
  if (report.schema !== "moving_retained_branch_certificate_report/v0") {
    errors.push("schema must be moving_retained_branch_certificate_report/v0");
  }
  if (typeof report.certificate_id !== "string" || report.certificate_id.trim() === "") {
    errors.push("certificate_id must be a nonempty string");
  }
  if (typeof report.certificate_verdict !== "string") {
    errors.push("certificate_verdict must be a string");
  }
  if (report.promotion_status !== "priority-only") {
    errors.push("promotion_status must remain priority-only");
  }
  if (report.certificate_verdict === "accepted_same_branch" && report.first_failure !== null) {
    errors.push("accepted reports must not carry first_failure");
  }
  if (report.certificate_verdict !== "accepted_same_branch" && typeof report.first_failure !== "string") {
    errors.push("blocked reports must carry first_failure");
  }
  if (!Array.isArray(report.row_results)) {
    errors.push("row_results must be an array");
  }
  if (!isObject(report.accepted_branch_chart_intake)) {
    errors.push("accepted_branch_chart_intake must be an object");
  }
  if (report.accepted_branch_chart_intake?.schema !== "moving_retained_branch_certificate_accepted_branch_chart_intake/v0") {
    errors.push("accepted_branch_chart_intake schema must be moving_retained_branch_certificate_accepted_branch_chart_intake/v0");
  }
  if (report.accepted_branch_chart_intake?.rejects_proxy_branch_certificate_refs !== true) {
    errors.push("accepted_branch_chart_intake must reject proxy branch certificate refs");
  }
  if (!isObject(report.authorization)) {
    errors.push("authorization must be an object");
  }
  if (report.authorization?.photon_gate_a_accepted !== false) {
    errors.push("photon_gate_a_accepted must remain false");
  }
  if (report.authorization?.observer_export !== false) {
    errors.push("observer_export must remain false");
  }
  return errors;
}

export function sourceScoutValidationErrors(report) {
  const errors = [];
  if (!isObject(report)) {
    return ["source scout report must be an object"];
  }
  if (report.schema !== SOURCE_SCOUT_SCHEMA) {
    errors.push(`schema must be ${SOURCE_SCOUT_SCHEMA}`);
  }
  if (report.manifest_schema !== SOURCE_SCOUT_MANIFEST_SCHEMA) {
    errors.push(`manifest_schema must be ${SOURCE_SCOUT_MANIFEST_SCHEMA}`);
  }
  if (report.promotion_status !== "priority-only") {
    errors.push("promotion_status must remain priority-only");
  }
  if (!Number.isInteger(report.candidate_count) || report.candidate_count < 0) {
    errors.push("candidate_count must be a nonnegative integer");
  }
  if (!Number.isInteger(report.accepted_count) || report.accepted_count < 0) {
    errors.push("accepted_count must be a nonnegative integer");
  }
  if (!Array.isArray(report.candidate_results)) {
    errors.push("candidate_results must be an array");
  } else if (report.candidate_results.length !== report.candidate_count) {
    errors.push("candidate_results length must equal candidate_count");
  }
  if (report.accepted_count === 0 && report.first_failure !== "accepted_same_record_branch_chart_absent") {
    errors.push("zero-accepted source scouts must carry accepted_same_record_branch_chart_absent");
  }
  if (!isObject(report.authorization)) {
    errors.push("authorization must be an object");
  }
  if (report.authorization?.moving_retained_branch_certificate !== false) {
    errors.push("source scout must not authorize moving_retained_branch_certificate");
  }
  if (report.authorization?.structural_integrity_residual_vector !== false) {
    errors.push("source scout must not authorize structural-integrity residual rows");
  }
  if (report.authorization?.photon_gate_a !== false) {
    errors.push("source scout must not authorize Photon Gate A");
  }
  if (report.authorization?.observer_export !== false) {
    errors.push("source scout must not authorize observer export");
  }
  return errors;
}

function writeOutput(value, args) {
  const body = `${JSON.stringify(value, null, args.pretty ? 2 : 0)}\n`;
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, body);
  } else {
    process.stdout.write(body);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (args.printContract) {
    writeOutput(contract(), args);
    return;
  }
  if (args.sourceScout) {
    const manifest = readJson(args.sourceScout);
    writeOutput(buildAcceptedBranchChartSourceScout(manifest, { sourceRef: args.sourceScout }), args);
    return;
  }
  if (args.validateSourceScout) {
    const report = readJson(args.validateSourceScout);
    const errors = sourceScoutValidationErrors(report);
    writeOutput(
      {
        valid: errors.length === 0,
        errors,
        scout_id: report.scout_id ?? null,
        candidate_count: report.candidate_count ?? null,
        accepted_count: report.accepted_count ?? null,
        first_failure: report.first_failure ?? null,
        first_rejection_code: report.first_rejection_code ?? null,
      },
      args,
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  if (args.validate) {
    const report = readJson(args.validate);
    const errors = validationErrors(report);
    writeOutput(
      {
        valid: errors.length === 0,
        errors,
        certificate_id: report.certificate_id ?? null,
        certificate_verdict: report.certificate_verdict ?? null,
        first_failure: report.first_failure ?? null,
      },
      args,
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  if (!args.input) {
    throw new Error("--input is required unless --validate or --print-contract is used.");
  }
  const candidate = readJson(args.input);
  writeOutput(buildReport(candidate, { sourceRef: args.input }), args);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
