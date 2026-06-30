#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const TARGET_SCHEMA = "a0-branch-chart-source-target/v1";
const TARGET_ARTIFACT = "a0-branch-chart-source-target";
const TARGET_OBJECT_ID =
  "higher_sample_count_finite_delay_sector_or_separator_fold_event_branch_chart_source_record";
const BASELINE_OBSERVATION_BUCKET_COUNT = 16;
const DEFAULT_TOLERANCE = 0.02;

const ACCEPTED_PROVIDER_STATUSES = new Set([
  "accepted_non_fixture_source",
  "accepted_tier1_continuation",
  "tier1_continuation_accepted",
  "accepted_history_segment",
]);

const ROUTE_SOURCE_KINDS = new Set([
  "higher_sample_count_finite_delay_sector",
  "separator_fold_event",
]);

const FORBIDDEN_SOURCE_FAMILIES = [
  "fixture_ref",
  "proxy_ref",
  "diagnostic_row",
  "sampled_only_row",
  "aggregate_row",
  "h39_theta3minus_quotient_row",
  "source_normal_denominator_machinery",
  "toy_or_empirical_row",
  "benchmark_only_row",
  "generated_decoy",
  "cross_row_bundle",
];

const REQUIRED_FIELD_GROUPS = {
  source_record: [
    "source_kind",
    "branch_chart_source_record_id",
    "branch_chart_source_provenance.source_declared_before_fit",
    "branch_chart_source_provenance.z_lambda_star_ref",
    "branch_chart_source_provenance.branch_chart_source_record_id",
  ],
  provider_provenance: [
    "provider_source_status",
    "source_ref",
    "accepted_status",
    "branch_certificate_ref",
    "same_domain_record_ref",
  ],
  retained_source_binding: [
    "retained_source_binding.retained_record_id",
    "retained_source_binding.source_record_id",
    "retained_source_binding.source_artifact_hash",
    "retained_source_binding.causal_root_replay_ref",
  ],
  held_out_residual_ledger: [
    "held_out_residual_ledger.status",
    "held_out_residual_ledger.tolerance",
    "held_out_residual_ledger.max_held_out_relative_residual",
    "held_out_residual_ledger.residuals_below_tolerance",
    "held_out_residual_ledger.held_out_bucket_scheme",
    "held_out_residual_ledger.fit_sample_count",
    "held_out_residual_ledger.holdout_sample_count",
    "held_out_residual_ledger.overdetermined",
    "held_out_residual_ledger.feature_rank",
  ],
  root_ledger_refinement_status: [
    "root_ledger_refinement_status.status",
    "root_ledger_refinement_status.root_ledger_stable_under_refinement",
    "root_ledger_refinement_status.raw_row_rerun_authorizing",
  ],
  sample_count_fields: [
    "sample_count_fields.observation_bucket_count",
    "sample_count_fields.source_row_count",
    "sample_count_fields.higher_than_baseline_16",
  ],
  finite_delay_sector_rows: [
    "finite_delay_sector_rows",
  ],
  separator_fold_event_rows: [
    "separator_fold_event_rows",
  ],
  root_phase_speed_closure_fields: [
    "root_phase_speed_closure_fields.root_closure_pass",
    "root_phase_speed_closure_fields.phase_closure_pass",
    "root_phase_speed_closure_fields.speed_ordering_pass",
  ],
  benchmark_exclusion: [
    "benchmark_exclusion.benchmark_inputs_excluded",
    "benchmark_exclusion.excluded_source_families",
  ],
};

const FIRST_MISSING_FIELD_ORDER = [
  "source_kind",
  "branch_chart_source_record_id",
  "provider_source_status",
  "source_ref",
  "branch_certificate_ref",
  "branch_chart_source_provenance.source_declared_before_fit",
  "branch_chart_source_provenance.z_lambda_star_ref",
  "retained_source_binding",
  "held_out_residual_ledger",
  "root_ledger_refinement_status",
  "sample_count_fields",
  "finite_delay_sector_rows",
  "separator_fold_event_rows",
  "root_phase_speed_closure_fields",
  "benchmark_exclusion",
];

function parseArgs(argv) {
  const args = {
    source: null,
    validate: null,
    out: null,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--source") {
      args.source = argv[++index];
    } else if (arg === "--validate") {
      args.validate = argv[++index];
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/a0-branch-chart-source-target.mjs [options]

Options:
  --source PATH    Candidate higher-sample finite delay-sector or separator/fold-event source JSON.
  --validate PATH  Validate a previously emitted target report.
  --out PATH       Write JSON output to a file instead of stdout.
  --pretty         Pretty-print JSON.
  --help           Show this help.

This executable emits the fail-closed source target for
${TARGET_OBJECT_ID}. It does not authorize corrected rerun, accepted history,
retained pressure-row evidence, or receiver-normal branch strength.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
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

function getPath(value, pathExpression) {
  return pathExpression.split(".").reduce((cursor, key) => cursor?.[key], value);
}

function sourceRef(candidate, fallbackSourceRef) {
  return candidate?.source_ref ?? candidate?.source_path ?? fallbackSourceRef ?? null;
}

function providerSourceStatus(candidate) {
  return candidate?.provider_source_status ?? candidate?.source_status ?? candidate?.status ?? null;
}

function acceptedStatusPass(candidate) {
  return (
    ACCEPTED_PROVIDER_STATUSES.has(providerSourceStatus(candidate)) &&
    (candidate?.accepted_status === true ||
      candidate?.accepted_status === "accepted" ||
      candidate?.acceptance?.status === "accepted")
  );
}

function isFixtureRef(value) {
  return typeof value === "string" && /(^|\/)fixtures\//.test(value);
}

function isProxyRef(value) {
  return typeof value === "string" && /(^|:|\/)proxy[:/-]/i.test(value);
}

function sourceFamilyRejections(candidate, fallbackSourceRef) {
  const ref = sourceRef(candidate, fallbackSourceRef);
  const refs = [candidate?.source_ref, candidate?.source_path, fallbackSourceRef].filter(Boolean);
  const statusText = [
    providerSourceStatus(candidate),
    candidate?.candidate_status,
    candidate?.promotion_status,
    candidate?.claim_scope,
    candidate?.notes,
    candidate?.source_family,
  ]
    .filter(Boolean)
    .join(" ");
  const codes = [];
  if (refs.some((entry) => isFixtureRef(entry))) {
    codes.push("fixture_ref");
  }
  if (refs.some((entry) => isProxyRef(entry)) || isProxyRef(candidate?.branch_certificate_ref)) {
    codes.push("proxy_ref");
  }
  if (candidate?.diagnostic_only === true || /diagnostic/i.test(statusText)) {
    codes.push("diagnostic_row");
  }
  if (/sampled[_ -]?(only|window)|short[_ -]?horizon/i.test(statusText)) {
    codes.push("sampled_only_row");
  }
  if (/aggregate|preaggregation/i.test(statusText)) {
    codes.push("aggregate_row");
  }
  if (/h39|theta3minus/i.test(statusText) || /h39|theta3minus/i.test(String(ref ?? ""))) {
    codes.push("h39_theta3minus_quotient_row");
  }
  if (/source[_ -]?normal|denominator/i.test(statusText)) {
    codes.push("source_normal_denominator_machinery");
  }
  if (/toy|empirical/i.test(statusText) || /toy|empirical/i.test(String(ref ?? ""))) {
    codes.push("toy_or_empirical_row");
  }
  if (/benchmark[_ -]?only/i.test(statusText)) {
    codes.push("benchmark_only_row");
  }
  if (/generated[_ -]?decoy/i.test(statusText)) {
    codes.push("generated_decoy");
  }
  if (/cross[_ -]?row|bundle/i.test(statusText)) {
    codes.push("cross_row_bundle");
  }
  return [...new Set(codes)];
}

function routeKind(candidate) {
  return candidate?.source_kind ?? candidate?.branch_chart_source_kind ?? null;
}

function routeRequired(candidate, pathExpression) {
  const kind = routeKind(candidate);
  if (pathExpression === "finite_delay_sector_rows") {
    return kind === "higher_sample_count_finite_delay_sector";
  }
  if (pathExpression === "separator_fold_event_rows" || pathExpression.startsWith("root_phase_speed_closure_fields.")) {
    return kind === "separator_fold_event";
  }
  if (!ROUTE_SOURCE_KINDS.has(kind) && pathExpression.startsWith("root_phase_speed_closure_fields.")) {
    return false;
  }
  return true;
}

function rowsPass(rows, requiredFields) {
  return (
    Array.isArray(rows) &&
    rows.length > 0 &&
    rows.every((row) => requiredFields.every((field) => present(getPath(row, field))))
  );
}

function finiteDelaySectorRowsPass(candidate) {
  return rowsPass(candidate?.finite_delay_sector_rows, [
    "sector_id",
    "root_key",
    "t",
    "delay",
    "J",
    "theta",
    "D_tau",
    "D_J",
    "receiver",
    "source",
  ]);
}

function separatorFoldEventRowsPass(candidate) {
  return rowsPass(candidate?.separator_fold_event_rows, [
    "event_id",
    "event_type",
    "t",
    "pre_event_active_root_identity",
    "post_event_active_root_identity",
    "z_lambda_star_coordinate",
  ]);
}

function pathPass(candidate, pathExpression, fallbackSourceRef) {
  if (!routeRequired(candidate, pathExpression)) {
    return true;
  }
  const value = getPath(candidate, pathExpression);
  if (pathExpression === "source_kind") {
    return ROUTE_SOURCE_KINDS.has(value);
  }
  if (pathExpression === "source_ref") {
    return present(value) && !isFixtureRef(value) && !isProxyRef(value);
  }
  if (pathExpression === "provider_source_status") {
    return ACCEPTED_PROVIDER_STATUSES.has(value);
  }
  if (pathExpression === "accepted_status") {
    return acceptedStatusPass(candidate);
  }
  if (pathExpression === "branch_certificate_ref") {
    return present(value) && !isProxyRef(value);
  }
  if (pathExpression === "branch_chart_source_provenance.source_declared_before_fit") {
    return value === true;
  }
  if (pathExpression.endsWith(".residuals_below_tolerance")) {
    return value === true;
  }
  if (pathExpression === "held_out_residual_ledger.max_held_out_relative_residual") {
    return Number.isFinite(value) && value <= (candidate?.held_out_residual_ledger?.tolerance ?? DEFAULT_TOLERANCE);
  }
  if (pathExpression === "held_out_residual_ledger.tolerance") {
    return Number.isFinite(value) && value > 0;
  }
  if (pathExpression.endsWith(".fit_sample_count") || pathExpression.endsWith(".holdout_sample_count")) {
    return Number.isInteger(value) && value > 0;
  }
  if (pathExpression === "held_out_residual_ledger.overdetermined") {
    return value === true;
  }
  if (pathExpression === "held_out_residual_ledger.feature_rank") {
    return Number.isInteger(value) && value > 0;
  }
  if (pathExpression.endsWith(".root_ledger_stable_under_refinement")) {
    return value === true;
  }
  if (pathExpression.endsWith(".raw_row_rerun_authorizing")) {
    return value === true;
  }
  if (pathExpression === "sample_count_fields.higher_than_baseline_16") {
    return value === true;
  }
  if (pathExpression === "sample_count_fields.observation_bucket_count") {
    return Number.isInteger(value) && value > BASELINE_OBSERVATION_BUCKET_COUNT;
  }
  if (pathExpression === "sample_count_fields.source_row_count") {
    return Number.isInteger(value) && value > 0;
  }
  if (pathExpression === "finite_delay_sector_rows") {
    return finiteDelaySectorRowsPass(candidate);
  }
  if (pathExpression === "separator_fold_event_rows") {
    return separatorFoldEventRowsPass(candidate);
  }
  if (pathExpression.startsWith("root_phase_speed_closure_fields.")) {
    return value === true;
  }
  if (pathExpression === "benchmark_exclusion.benchmark_inputs_excluded") {
    return value === true;
  }
  if (pathExpression === "benchmark_exclusion.excluded_source_families") {
    return Array.isArray(value) && FORBIDDEN_SOURCE_FAMILIES.every((family) => value.includes(family));
  }
  if (pathExpression.endsWith(".status")) {
    return ["pass", "passed", "accepted", "closed"].includes(value);
  }
  return present(value ?? (pathExpression === "source_ref" ? fallbackSourceRef : undefined));
}

function fieldResults(candidate, fallbackSourceRef) {
  return Object.entries(REQUIRED_FIELD_GROUPS).flatMap(([group, fields]) =>
    fields.map((pathExpression) => {
      const currentValue = getPath(candidate, pathExpression);
      return {
        group,
        path: pathExpression,
        required_for_route: routeRequired(candidate, pathExpression),
        present: present(currentValue),
        pass: pathPass(candidate, pathExpression, fallbackSourceRef),
        current_value: present(currentValue) ? currentValue : null,
      };
    })
  );
}

function groupedMissingFields(results) {
  return Object.fromEntries(
    Object.keys(REQUIRED_FIELD_GROUPS).map((group) => [
      group,
      results
        .filter((field) => field.group === group && field.required_for_route && !field.pass)
        .map((field) => field.path),
    ])
  );
}

function firstMissingField(results) {
  for (const pathPrefix of FIRST_MISSING_FIELD_ORDER) {
    const field = results.find(
      (entry) => entry.required_for_route && !entry.pass && entry.path.startsWith(pathPrefix)
    );
    if (field) {
      return field.path;
    }
  }
  return results.find((entry) => entry.required_for_route && !entry.pass)?.path ?? null;
}

function buildBranchChartSourceTarget(candidate = {}, options = {}) {
  const fallbackSourceRef = options.sourceRef ?? null;
  const normalizedCandidate = isObject(candidate) ? candidate : {};
  const ref = sourceRef(normalizedCandidate, fallbackSourceRef);
  const candidateWithSource = {
    ...normalizedCandidate,
    provider_source_status: providerSourceStatus(normalizedCandidate),
    source_ref: ref,
  };
  const rejectionCodes = sourceFamilyRejections(candidateWithSource, fallbackSourceRef);
  const results = fieldResults(candidateWithSource, fallbackSourceRef);
  const missingByGroup = groupedMissingFields(results);
  const sourceCandidateAvailable =
    ROUTE_SOURCE_KINDS.has(routeKind(candidateWithSource)) &&
    results.every((field) => !field.required_for_route || field.pass) &&
    rejectionCodes.length === 0;
  const firstMissing = firstMissingField(results);
  return {
    schema: TARGET_SCHEMA,
    artifact: TARGET_ARTIFACT,
    object_id: TARGET_OBJECT_ID,
    claim_level: "fail-closed branch-chart source target, not accepted continuation evidence",
    target_status: sourceCandidateAvailable
      ? "branch_chart_source_candidate_fields_present"
      : "branch_chart_source_record_missing",
    source_candidate_available: sourceCandidateAvailable,
    accepted_continuation_authorized: false,
    corrected_rerun_authorized: false,
    retained_pressure_row_provider_authorized: false,
    receiver_normal_branch_strength_authorized: false,
    source_kind: routeKind(candidateWithSource),
    provider_source_status: providerSourceStatus(candidateWithSource),
    source_ref: ref,
    first_failure: sourceCandidateAvailable ? null : "branch_chart_source_record_missing",
    first_missing_field: sourceCandidateAvailable ? null : firstMissing,
    smallest_next_producer: TARGET_OBJECT_ID,
    route_requirements: {
      higher_sample_count_finite_delay_sector:
        "finite delay-sector rows with source-declared branch-chart provenance, retained source binding, root-ledger refinement status, held-out residual pass, and sample count above 16 observation buckets",
      separator_fold_event:
        "separator/fold-event rows declared in z_Lambda^star before fitting, with retained source binding, root/phase/speed closure fields, provider provenance, and held-out residual pass",
    },
    required_field_groups: REQUIRED_FIELD_GROUPS,
    forbidden_source_families: FORBIDDEN_SOURCE_FAMILIES,
    rejected_source_family_codes: rejectionCodes,
    missing_or_rejected_fields_by_group: missingByGroup,
    missing_or_rejected_fields: results
      .filter((field) => field.required_for_route && !field.pass)
      .map((field) => field.path),
    field_results: results,
  };
}

function validationErrors(report) {
  const errors = [];
  if (report?.schema !== TARGET_SCHEMA) {
    errors.push(`schema must be ${TARGET_SCHEMA}`);
  }
  if (report?.artifact !== TARGET_ARTIFACT) {
    errors.push(`artifact must be ${TARGET_ARTIFACT}`);
  }
  if (report?.object_id !== TARGET_OBJECT_ID) {
    errors.push(`object_id must be ${TARGET_OBJECT_ID}`);
  }
  if (report?.accepted_continuation_authorized !== false) {
    errors.push("target must not authorize accepted continuation");
  }
  if (report?.corrected_rerun_authorized !== false) {
    errors.push("target must not authorize corrected rerun");
  }
  if (report?.retained_pressure_row_provider_authorized !== false) {
    errors.push("target must not authorize retained pressure-row provider");
  }
  if (report?.receiver_normal_branch_strength_authorized !== false) {
    errors.push("target must not authorize receiver-normal branch strength");
  }
  if (!isObject(report?.required_field_groups)) {
    errors.push("required_field_groups must be present");
  }
  if (!Array.isArray(report?.field_results)) {
    errors.push("field_results must be an array");
  }
  if (report?.source_candidate_available !== true && !present(report?.first_missing_field)) {
    errors.push("fail-closed report must name first_missing_field");
  }
  if (report?.source_candidate_available !== true && report?.first_failure !== "branch_chart_source_record_missing") {
    errors.push("fail-closed report must use branch_chart_source_record_missing first_failure");
  }
  return errors;
}

function serialize(value, pretty) {
  return `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
}

function writeOutput(value, args) {
  const output = serialize(value, args.pretty);
  if (args.out) {
    fs.writeFileSync(path.resolve(args.out), output);
  } else {
    process.stdout.write(output);
  }
}

function runCli() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (args.validate) {
    const report = readJson(path.resolve(args.validate));
    writeOutput(
      {
        valid: validationErrors(report).length === 0,
        errors: validationErrors(report),
        schema: report.schema ?? null,
        object_id: report.object_id ?? null,
        first_failure: report.first_failure ?? null,
        first_missing_field: report.first_missing_field ?? null,
      },
      args
    );
    return;
  }
  const sourcePath = args.source ? path.resolve(args.source) : null;
  const candidate = sourcePath ? readJson(sourcePath) : {};
  writeOutput(
    buildBranchChartSourceTarget(candidate, {
      sourceRef: sourcePath ? path.relative(process.cwd(), sourcePath) : null,
    }),
    args
  );
}

export {
  BASELINE_OBSERVATION_BUCKET_COUNT,
  FORBIDDEN_SOURCE_FAMILIES,
  REQUIRED_FIELD_GROUPS,
  TARGET_OBJECT_ID,
  TARGET_SCHEMA,
  buildBranchChartSourceTarget,
  validationErrors,
};

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    runCli();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
