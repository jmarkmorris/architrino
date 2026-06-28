#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const REQUIRED_ROWS = [
  {
    path: "branch_certificate_ref",
    requirement:
      "One branch label, window, separator chart, active root ledger, positive gaps, memory depth, and active wave-vector gap.",
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

function parseArgs(argv) {
  const args = {
    input: null,
    out: null,
    validate: null,
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

function contract() {
  return {
    schema: "moving_retained_branch_certificate_contract/v0",
    purpose:
      "Minimum same-record moving branch object before structural-integrity common-limit rows may be populated.",
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

function evaluateRow(candidate, row) {
  const value = getPath(candidate, row.path);
  return {
    path: row.path,
    requirement: row.requirement,
    present: present(value),
    pass: present(value),
    failure_code: present(value) ? null : row.failureCode,
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

  return {
    schema: "moving_retained_branch_certificate_report/v0",
    source_ref: options.sourceRef ?? candidate.source_ref ?? null,
    certificate_id: candidate.certificate_id ?? candidate.id ?? "moving-retained-branch-candidate",
    certificate_verdict: accepted ? "accepted_same_branch" : firstFailure,
    first_failure: accepted ? null : firstFailure,
    row_results: rowResults,
    missing_or_rejected_rows: failedRows.map((row) => row.path),
    certificate_status: candidate.certificate_status ?? null,
    authorization: {
      populates_structural_integrity_residual_vector: accepted,
      photon_gate_a_accepted: false,
      observer_export: false,
    },
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
  if (report.certificate_verdict === "accepted_same_branch" && report.first_failure !== null) {
    errors.push("accepted reports must not carry first_failure");
  }
  if (report.certificate_verdict !== "accepted_same_branch" && typeof report.first_failure !== "string") {
    errors.push("blocked reports must carry first_failure");
  }
  if (!Array.isArray(report.row_results)) {
    errors.push("row_results must be an array");
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
