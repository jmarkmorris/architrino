#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildReport as buildPressureRowReport,
  validationErrors as pressureRowValidationErrors,
} from "./pressure-row-branch-intake-report.mjs";

const REJECTION_CODE_LEGEND = {
  target_only_source: "Target or required-target provenance cannot authorize a retained pressure row.",
  toy_source: "Toy pressure, packing, or Hessian rows cannot authorize branch-derived pressure response.",
  fixture_path: "Fixture files are negative controls or scaffolds, not accepted non-fixture sources.",
  diagnostic_source: "Diagnostic-only rows do not carry accepted branch-history status.",
  partial_source: "Partial rows leave required pressure-row intake fields unavailable.",
  negative_control_source: "Negative controls intentionally prove rejection behavior.",
  empirical_source: "Empirical or benchmark skeleton rows cannot substitute for branch-emitted pressure records.",
  nested_target_provenance:
    "Nested field provenance remains target-only or required-target instead of accepted source evidence.",
  same_row_binding_missing: "Required fields do not bind to one retained pressure row.",
  required_fields_missing: "The retained pressure-row contract still has missing or rejected fields.",
  accepted_history_missing: "No accepted history segment is available for the candidate row.",
  priority_packet_not_source_row: "Priority prose states a target or contract but does not emit a source row.",
  contract_target_not_source_row: "The file defines an intake contract or theorem target rather than source evidence.",
  provider_boundary_not_pressure_row:
    "Branch-provider boundary reports do not emit the retained pressure-row fields until provider readiness is accepted.",
};

const AUTO_DISCOVERED_CANDIDATES = [
  {
    path: "reference/priorities/solver/branch-provider-evidence-report.md",
    candidate_kind: "branch_provider_boundary_report",
    source_status: "same_domain_branch_provider_missing_not_retained_pressure_row",
    rejection_codes: [
      "provider_boundary_not_pressure_row",
      "contract_target_not_source_row",
      "required_fields_missing",
      "accepted_history_missing",
    ],
  },
];

const RETAINED_PRESSURE_ROW_SOURCE_FIELDS = [
  "branch_id",
  "accepted_history_segment_id",
  "source_path",
  "quotient_chart_id",
  "pressure_record.Pi",
  "pressure_record.A",
  "pressure_record.s_n",
  "pressure_record.Q_chi_ab",
  "pressure_record.S_dev_ab",
  "pressure_record.retained_replay_direction",
  "exposure_source_record.E_internal",
  "exposure_source_record.zeta",
  "exposure_source_record.M0_src",
  "exposure_source_record.N_tf_ab",
  "pressure_response_record.partial_P_M0_src",
  "pressure_response_record.C_chi_iso",
  "pressure_response_record.C_chi_aniso",
  "pressure_response_record.m_S",
  "reversible_domain.R_tr",
  "reversible_domain.R_tr_star",
  "reversible_domain.loss_channels_closed",
  "null_sector_record.clock_signal",
  "null_sector_record.birefringence",
  "null_sector_record.photon_dispersion",
  "null_sector_record.preferred_frame",
  "null_sector_record.directional_tensor",
  "null_sector_record.transport",
];

const REJECTION_PATTERNS = [
  ["target_only_source", /target[_-]?only|target_required|provider_target/i],
  ["toy_source", /toy/i],
  ["diagnostic_source", /diagnostic/i],
  ["partial_source", /partial/i],
  ["negative_control_source", /negative[_-]?control/i],
  ["empirical_source", /empirical|benchmark/i],
  ["accepted_history_missing", /not_accepted_history|accepted[_-]?history.*missing|accepted-history-source-missing/i],
];

function defaultRepoRoot() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
}

function defaultManifestPath(repoRoot = defaultRepoRoot()) {
  return path.join(
    repoRoot,
    "scripts/mass-map/fixtures/pressure-row-branch-intake-source-scout-manifest.json"
  );
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort();
}

function withoutDuplicatePaths(candidates) {
  const seen = new Set();
  return candidates.filter((candidate) => {
    if (seen.has(candidate.path)) {
      return false;
    }
    seen.add(candidate.path);
    return true;
  });
}

function classifyRejectedValue(value) {
  if (value === true) {
    return ["diagnostic_source"];
  }
  if (typeof value !== "string") {
    return [];
  }
  return REJECTION_PATTERNS.flatMap(([code, pattern]) => (pattern.test(value) ? [code] : []));
}

function classifyPressureRowReport(candidatePath, report) {
  const codes = [];
  if (/(^|\/)fixtures\//.test(candidatePath)) {
    codes.push("fixture_path");
  }
  if (!report.same_row_binding) {
    codes.push("same_row_binding_missing");
  }
  if (report.field_results.some((field) => !field.pass)) {
    codes.push("required_fields_missing");
  }
  if (report.missing_or_rejected_fields.includes("accepted_history_segment_id")) {
    codes.push("accepted_history_missing");
  }

  for (const field of report.accepted_source_evidence.rejected_status_fields) {
    codes.push(...classifyRejectedValue(field.value));
    if (field.path.includes(".") && /target_required|target[_-]?only/i.test(String(field.value))) {
      codes.push("nested_target_provenance");
    }
  }

  return uniqueSorted(codes);
}

function pressureRowCandidate(entry, repoRoot) {
  const absolutePath = path.join(repoRoot, entry.path);
  const candidate = readJson(absolutePath);
  const pressureRowReport = buildPressureRowReport(candidate, { sourceRef: entry.path });
  const reportErrors = pressureRowValidationErrors(pressureRowReport);
  const rejectionCodes = uniqueSorted([
    ...(entry.rejection_codes ?? []),
    ...classifyPressureRowReport(entry.path, pressureRowReport),
  ]);
  const accepted =
    pressureRowReport.branch_intake_verdict === "accepted_retained_pressure_row" &&
    rejectionCodes.length === 0;

  return {
    path: entry.path,
    candidate_kind: entry.candidate_kind ?? "pressure_row_json",
    source_status:
      entry.source_status ??
      candidate.provider_source_status ??
      candidate.candidate_status ??
      candidate.target_status ??
      pressureRowReport.first_failure,
    accepted_non_fixture_source: accepted,
    rejection_codes: rejectionCodes,
    pressure_row_report: {
      row_id: pressureRowReport.row_id,
      branch_intake_verdict: pressureRowReport.branch_intake_verdict,
      first_failure: pressureRowReport.first_failure,
      same_row_binding: pressureRowReport.same_row_binding,
      failed_field_count: pressureRowReport.field_results.filter((field) => !field.pass).length,
      accepted_source_pass: pressureRowReport.accepted_source_evidence.pass,
      rejected_status_field_count:
        pressureRowReport.accepted_source_evidence.rejected_status_fields.length,
      missing_or_rejected_fields: pressureRowReport.missing_or_rejected_fields,
      validation_errors: reportErrors,
    },
  };
}

function stripMarkdownCell(cell) {
  return cell.trim().replace(/^`+|`+$/g, "").trim();
}

function markdownTableValue(body, fieldName) {
  for (const line of body.split(/\r?\n/)) {
    const cells = line.split("|").map(stripMarkdownCell);
    if (cells.length >= 4 && cells[1] === fieldName) {
      return cells[2] === "" ? null : cells[2];
    }
  }
  return null;
}

function documentCandidate(entry, repoRoot) {
  const absolutePath = path.join(repoRoot, entry.path);
  const body = fs.readFileSync(absolutePath, "utf8");
  const termCounts = Object.fromEntries(
    ["accepted", "pressure", "exposure", "Noether sea", "target", "toy", "diagnostic"].map(
      (term) => [term, (body.match(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) ?? []).length]
    )
  );
  const providerReportReading =
    entry.candidate_kind === "branch_provider_boundary_report"
      ? {
          provider_verdict: markdownTableValue(body, "provider_verdict"),
          first_failure: markdownTableValue(body, "first_failure"),
          candidate_count: markdownTableValue(body, "candidate_count"),
          provider_ready_consumer_count: markdownTableValue(body, "provider_ready_consumer_count"),
        }
      : null;

  return {
    path: entry.path,
    candidate_kind: entry.candidate_kind ?? "priority_packet",
    source_status: entry.source_status,
    accepted_non_fixture_source: false,
    rejection_codes: uniqueSorted(entry.rejection_codes ?? ["priority_packet_not_source_row"]),
    term_counts: termCounts,
    ...(providerReportReading ? { provider_report_reading: providerReportReading } : {}),
  };
}

function candidateDistance(candidate) {
  const pressureReport = candidate.pressure_row_report;
  if (!pressureReport) {
    return [1, 1, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, candidate.path];
  }
  return [
    0,
    pressureReport.same_row_binding ? 0 : 1,
    pressureReport.failed_field_count,
    pressureReport.rejected_status_field_count,
    candidate.path,
  ];
}

function compareDistance(left, right) {
  const leftDistance = candidateDistance(left);
  const rightDistance = candidateDistance(right);
  for (let i = 0; i < leftDistance.length; i += 1) {
    const leftValue = leftDistance[i];
    const rightValue = rightDistance[i];
    if (leftValue < rightValue) {
      return -1;
    }
    if (leftValue > rightValue) {
      return 1;
    }
  }
  return 0;
}

function minimalMissingRows(candidate) {
  const missing = candidate.pressure_row_report?.missing_or_rejected_fields ?? [];
  if (missing.length === 1 && missing[0] === "accepted_non_fixture_source") {
    return RETAINED_PRESSURE_ROW_SOURCE_FIELDS;
  }
  return missing;
}

function buildFailureFamilyDelta(candidates, acceptedCandidates) {
  if (acceptedCandidates.length > 0) {
    return {
      nearest_candidate: null,
      minimal_missing_rows: [],
      provider_boundary_candidate: null,
    };
  }

  const nearestCandidate = candidates
    .filter((candidate) => candidate.pressure_row_report)
    .sort(compareDistance)[0];
  const providerBoundaryCandidate = candidates.find(
    (candidate) => candidate.candidate_kind === "branch_provider_boundary_report"
  );

  return {
    nearest_candidate: nearestCandidate
      ? {
          path: nearestCandidate.path,
          candidate_kind: nearestCandidate.candidate_kind,
          source_status: nearestCandidate.source_status,
          first_failure: nearestCandidate.pressure_row_report.first_failure,
          same_row_binding: nearestCandidate.pressure_row_report.same_row_binding,
          failed_field_count: nearestCandidate.pressure_row_report.failed_field_count,
          rejected_status_field_count:
            nearestCandidate.pressure_row_report.rejected_status_field_count,
          reason:
            nearestCandidate.pressure_row_report.failed_field_count === 0 &&
            nearestCandidate.pressure_row_report.same_row_binding
              ? "All retained pressure-row contract fields bind to one row, but accepted non-fixture source provenance is still absent."
              : "This candidate has the shortest current missing-field list under the pressure-row intake contract.",
        }
      : null,
    minimal_missing_rows: nearestCandidate ? minimalMissingRows(nearestCandidate) : [],
    provider_boundary_candidate: providerBoundaryCandidate
      ? {
          path: providerBoundaryCandidate.path,
          source_status: providerBoundaryCandidate.source_status,
          rejection_codes: providerBoundaryCandidate.rejection_codes,
          provider_report_reading: providerBoundaryCandidate.provider_report_reading ?? null,
        }
      : null,
  };
}

export function buildSourceScoutReport(manifest, options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot();
  if (!isObject(manifest) || !Array.isArray(manifest.candidates)) {
    throw new Error("Scout manifest must be an object with a candidates array.");
  }

  const manifestCandidates = manifest.candidates;
  const autoDiscoveredCandidates = AUTO_DISCOVERED_CANDIDATES;
  const entries = withoutDuplicatePaths([...manifestCandidates, ...autoDiscoveredCandidates]);
  const candidates = entries.map((entry) => {
    const absolutePath = path.join(repoRoot, entry.path);
    if (!fs.existsSync(absolutePath)) {
      return {
        path: entry.path,
        candidate_kind: entry.candidate_kind ?? "missing",
        source_status: "missing_candidate_path",
        accepted_non_fixture_source: false,
        rejection_codes: ["required_fields_missing"],
        missing_path: true,
      };
    }
    return path.extname(entry.path) === ".json"
      ? pressureRowCandidate(entry, repoRoot)
      : documentCandidate(entry, repoRoot);
  });
  const acceptedCandidates = candidates.filter((candidate) => candidate.accepted_non_fixture_source);

  return {
    schema: "pressure_row_branch_intake_source_scout_report/v0",
    scout_ref: manifest.scout_ref ?? "pressure_row_branch_intake_accepted_source_scout/v0",
    source_manifest_ref: manifest.source_manifest_ref ?? null,
    purpose:
      "Enumerate current repo candidates for an accepted non-fixture retained pressure-row source before branch-derived pressure response can be consumed.",
    candidate_count: candidates.length,
    source_scope: {
      manifest_candidate_count: manifestCandidates.length,
      auto_discovered_candidate_count: autoDiscoveredCandidates.filter(
        (candidate) => !manifestCandidates.some((entry) => entry.path === candidate.path)
      ).length,
      auto_discovered_families: ["branch_provider_boundary_report"],
    },
    accepted_non_fixture_candidate_count: acceptedCandidates.length,
    first_failure:
      acceptedCandidates.length === 0 ? "accepted_non_fixture_source_missing" : null,
    rejection_code_legend: REJECTION_CODE_LEGEND,
    candidates,
    failure_family_delta: buildFailureFamilyDelta(candidates, acceptedCandidates),
    authorization: {
      branch_derived_pressure_response: false,
      empirical_mass_response: false,
      retained_branch_claim: false,
      observer_export: false,
      export_readiness: false,
    },
  };
}

export function scoutValidationErrors(report) {
  const errors = [];
  if (!isObject(report)) {
    return ["report must be an object"];
  }
  if (report.schema !== "pressure_row_branch_intake_source_scout_report/v0") {
    errors.push("schema must be pressure_row_branch_intake_source_scout_report/v0");
  }
  if (!Array.isArray(report.candidates)) {
    errors.push("candidates must be an array");
  }
  if (Array.isArray(report.candidates) && report.candidate_count !== report.candidates.length) {
    errors.push("candidate_count must equal candidates.length");
  }
  if (report.accepted_non_fixture_candidate_count === 0 && report.first_failure !== "accepted_non_fixture_source_missing") {
    errors.push("empty accepted-source scout must fail at accepted_non_fixture_source_missing");
  }
  const knownCodes = new Set(Object.keys(REJECTION_CODE_LEGEND));
  for (const candidate of report.candidates ?? []) {
    for (const code of candidate.rejection_codes ?? []) {
      if (!knownCodes.has(code)) {
        errors.push(`unknown rejection code: ${code}`);
      }
    }
    if (candidate.accepted_non_fixture_source === true && (candidate.rejection_codes ?? []).length > 0) {
      errors.push(`accepted candidate has rejection codes: ${candidate.path}`);
    }
  }
  if (report.authorization?.empirical_mass_response !== false) {
    errors.push("empirical_mass_response must remain false");
  }
  if (report.authorization?.retained_branch_claim !== false) {
    errors.push("retained_branch_claim must remain false");
  }
  if (report.authorization?.observer_export !== false) {
    errors.push("observer_export must remain false");
  }
  if (report.authorization?.export_readiness !== false) {
    errors.push("export_readiness must remain false");
  }
  return errors;
}

function parseArgs(argv) {
  const args = {
    manifest: defaultManifestPath(),
    out: null,
    validate: null,
    pretty: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--manifest") {
      args.manifest = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--validate") {
      args.validate = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/pressure-row-branch-intake-source-scout.mjs [options]

Options:
  --manifest PATH    Scout manifest JSON. Defaults to the rank-4 source-scout manifest fixture.
  --validate PATH    Validate an emitted source-scout report.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON output.
  --help             Show this help.

This is a priority-only scout for accepted non-fixture retained pressure-row
sources. It does not authorize branch-derived pressure response, retained-branch
claims, observer export, export readiness, or empirical mass response.`);
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
  if (args.validate) {
    const report = readJson(args.validate);
    const errors = scoutValidationErrors(report);
    writeOutput(
      {
        valid: errors.length === 0,
        errors,
        accepted_non_fixture_candidate_count:
          report.accepted_non_fixture_candidate_count ?? null,
        first_failure: report.first_failure ?? null,
      },
      args
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const manifestPath = path.resolve(args.manifest);
  const manifest = readJson(manifestPath);
  const report = buildSourceScoutReport(manifest, {
    repoRoot: path.resolve(path.dirname(manifestPath), "../../.."),
  });
  writeOutput(report, args);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
