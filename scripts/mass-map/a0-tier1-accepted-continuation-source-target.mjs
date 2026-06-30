#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ACCEPTED_SOURCE_STATUSES = new Set([
  "accepted_non_fixture_source",
  "accepted_tier1_continuation",
  "tier1_continuation_accepted",
  "accepted_history_segment",
]);

const REQUIRED_PROOF_FIELD_GROUPS = {
  provider_provenance: [
    "provider_source_status",
    "source_ref",
    "accepted_status",
    "branch_certificate_ref",
    "same_domain_record_ref",
    "active_root_or_live_ledger_identity",
    "branch_local_projection_or_normalization_identity",
  ],
  direct_one_period_residual_ledger: [
    "direct_one_period_residual_ledger.status",
    "direct_one_period_residual_ledger.residuals_below_tolerance",
    "direct_one_period_residual_ledger.residual_vector.R_state",
    "direct_one_period_residual_ledger.residual_vector.R_root",
    "direct_one_period_residual_ledger.residual_vector.R_phase",
    "direct_one_period_residual_ledger.residual_vector.R_E",
    "direct_one_period_residual_ledger.residual_vector.R_drift",
    "direct_one_period_residual_ledger.residual_vector.R_speed",
    "direct_one_period_residual_ledger.residual_vector.R_lock",
  ],
  no_center_drift: [
    "no_secular_center_drift.status",
    "no_secular_center_drift.pass",
  ],
  quotient_row_identity: [
    "quotient_row_identity.status",
    "quotient_row_identity.branch_label",
    "quotient_row_identity.z_lambda",
    "quotient_row_identity.source_row_identity_matches",
  ],
  quotient_monodromy: [
    "quotient_monodromy.status",
    "quotient_monodromy.Delta_k",
    "quotient_monodromy.Delta_k_positive",
  ],
  eta_ladder_persistence: [
    "eta_ladder_persistence.status",
    "eta_ladder_persistence.same_branch_persists_across_eta_ladder",
    "eta_ladder_persistence.eta_values",
    "eta_ladder_persistence.quotient_row_identity_carried",
  ],
  retained_source_binding: [
    "retained_source_binding.retained_record_id",
    "retained_source_binding.source_record_id",
    "retained_source_binding.source_artifact_hash",
    "retained_source_binding.causal_root_replay_ref",
  ],
  receiver_normal_branch_strength: [
    "receiver_normal_branch_strength.D_s",
    "receiver_normal_branch_strength.D_t",
    "receiver_normal_branch_strength.W_rec",
    "receiver_normal_branch_strength.retained_root_row_ids",
  ],
  benchmark_exclusion: [
    "benchmark_exclusion.benchmark_inputs_excluded",
    "benchmark_exclusion.excluded_source_families",
  ],
};

const FORBIDDEN_SOURCE_FAMILIES = [
  "fixture_ref",
  "proxy_ref",
  "diagnostic_row",
  "sampled_window",
  "aggregate_row",
  "h39_theta3minus_quotient_row",
  "source_normal_denominator_machinery",
  "toy_or_empirical_row",
  "cross_row_bundle",
];

const FIRST_MISSING_FIELD_ORDER = [
  "provider_source_status",
  "source_ref",
  "accepted_status",
  "branch_certificate_ref",
  "same_domain_record_ref",
  "active_root_or_live_ledger_identity",
  "branch_local_projection_or_normalization_identity",
  "direct_one_period_residual_ledger",
  "no_secular_center_drift",
  "quotient_row_identity",
  "quotient_monodromy",
  "eta_ladder_persistence",
  "retained_source_binding",
  "receiver_normal_branch_strength",
  "benchmark_exclusion",
];

function parseArgs(argv) {
  const args = {
    source: null,
    fromCorrectedAttempt: null,
    pretty: false,
    out: null,
    validate: null,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--source") {
      args.source = argv[++i];
    } else if (arg === "--from-corrected-attempt") {
      args.fromCorrectedAttempt = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--validate") {
      args.validate = argv[++i];
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/a0-tier1-accepted-continuation-source-target.mjs [options]

Options:
  --source PATH      Candidate A0 Tier 1 continuation/provider source JSON.
  --from-corrected-attempt PATH
                     Translate an a0-tier1-fold-layer-locked-one-period-attempt/v1
                     corrected-rerun artifact into a fail-closed source target.
  --validate PATH    Validate a previously emitted target report.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON.
  --help             Show this help.

This executable emits the fail-closed a0-tier1-accepted-continuation-source/v1
producer target needed before A0 can provide an accepted retained pressure-row
provider. It names the missing proof fields and rejects fixture, proxy,
diagnostic, sampled, aggregate, H39/theta3minus, source-normal, toy/empirical,
and cross-row-bundle shortcuts.`);
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
  return (
    candidate?.provider_source_status ??
    candidate?.source_status ??
    candidate?.branch_source_frontier?.source_status ??
    candidate?.status ??
    null
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
  if (/sampled[_ -]?window|short[_ -]?horizon|carrier replay/i.test(statusText)) {
    codes.push("sampled_window");
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
  if (/cross[_ -]?row|bundle/i.test(statusText)) {
    codes.push("cross_row_bundle");
  }
  return [...new Set(codes)];
}

function acceptedStatusPass(candidate) {
  return (
    ACCEPTED_SOURCE_STATUSES.has(providerSourceStatus(candidate)) &&
    (candidate?.accepted_status === true ||
      candidate?.accepted_status === "accepted" ||
      candidate?.acceptance?.status === "accepted")
  );
}

function pathPass(candidate, pathExpression) {
  const value = getPath(candidate, pathExpression);
  if (!present(value)) {
    return false;
  }
  if (pathExpression.endsWith(".residuals_below_tolerance")) {
    return value === true;
  }
  if (pathExpression.endsWith(".pass")) {
    return value === true;
  }
  if (pathExpression.endsWith(".source_row_identity_matches")) {
    return value === true;
  }
  if (pathExpression.endsWith(".Delta_k_positive")) {
    return value === true && Number(candidate.quotient_monodromy?.Delta_k) > 0;
  }
  if (pathExpression.endsWith(".same_branch_persists_across_eta_ladder")) {
    return value === true;
  }
  if (pathExpression.endsWith(".quotient_row_identity_carried")) {
    return value === true;
  }
  if (pathExpression.endsWith(".benchmark_inputs_excluded")) {
    return value === true;
  }
  if (pathExpression.endsWith(".retained_root_row_ids")) {
    return Array.isArray(value) && value.length > 0;
  }
  if (pathExpression.endsWith(".excluded_source_families")) {
    return FORBIDDEN_SOURCE_FAMILIES.every((family) => value.includes(family));
  }
  if (pathExpression === "source_ref") {
    return present(value) && !isFixtureRef(value) && !isProxyRef(value);
  }
  if (pathExpression === "provider_source_status") {
    return ACCEPTED_SOURCE_STATUSES.has(value);
  }
  if (pathExpression === "accepted_status") {
    return acceptedStatusPass(candidate);
  }
  if (pathExpression === "branch_certificate_ref") {
    return present(value) && !isProxyRef(value);
  }
  if (pathExpression.endsWith(".status")) {
    return ["pass", "accepted", "accepted_source", "closed"].includes(value);
  }
  return true;
}

function fieldResults(candidate) {
  return Object.entries(REQUIRED_PROOF_FIELD_GROUPS).flatMap(([group, fields]) =>
    fields.map((pathExpression) => {
      const currentValue = getPath(candidate, pathExpression);
      return {
        group,
        path: pathExpression,
        present: present(currentValue),
        pass: pathPass(candidate, pathExpression),
        current_value: present(currentValue) ? currentValue : null,
      };
    })
  );
}

function groupedMissingFields(results) {
  return Object.fromEntries(
    Object.keys(REQUIRED_PROOF_FIELD_GROUPS).map((group) => [
      group,
      results.filter((field) => field.group === group && !field.pass).map((field) => field.path),
    ])
  );
}

function statusPass(status) {
  return status === "passed" || status === "pass" || status === "accepted" || status === "closed";
}

function maxResidual(...values) {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  return finiteValues.length > 0 ? Math.max(...finiteValues.map((value) => Math.abs(value))) : null;
}

function firstCorrectedAttemptRow(attempt) {
  if (!Array.isArray(attempt?.rows)) {
    return null;
  }
  return (
    attempt.rows.find((row) => row?.correction_context?.status === "correction_context_ready") ??
    attempt.rows[0] ??
    null
  );
}

function directResidualLedgerFromAttemptRow(row) {
  const ledgers = row?.residual_ledgers ?? {};
  const state = ledgers.state_return ?? {};
  const root = ledgers.root_closure ?? {};
  const phase = ledgers.phase_closure ?? {};
  const energy = ledgers.energy_like_speed ?? {};
  const drift = ledgers.center_drift ?? {};
  const speed = ledgers.speed_ordering ?? {};
  const lock = ledgers.fold_layer_lock ?? {};
  const residualsBelowTolerance =
    row?.accepted_history_boundary?.residuals_below_tolerance === true &&
    statusPass(state.status) &&
    statusPass(root.status) &&
    statusPass(phase.status) &&
    statusPass(energy.status) &&
    statusPass(drift.status) &&
    statusPass(speed.status) &&
    statusPass(lock.status);
  return {
    status: residualsBelowTolerance ? "pass" : "failed",
    residuals_below_tolerance: residualsBelowTolerance,
    residual_vector: {
      R_state: maxResidual(state.max_state_return_residual),
      R_root: maxResidual(root.max_root_residual),
      R_phase: maxResidual(phase.phase_closure_residual),
      R_E: maxResidual(energy.energy_like_speed_residual),
      R_drift: maxResidual(drift.max_center_drift),
      R_speed: maxResidual(speed.max_speed_ordering_residual),
      R_lock: statusPass(lock.status) ? 0 : null,
    },
  };
}

function firstFailedCorrectedAttemptProofField(row) {
  const ledgers = row?.residual_ledgers ?? {};
  if (row?.accepted_history_boundary?.residuals_below_tolerance !== true) {
    return "direct_one_period_residual_ledger.residuals_below_tolerance";
  }
  if (statusPass(ledgers.center_drift?.status) !== true) {
    return "no_secular_center_drift.pass";
  }
  if (present(row?.source_row?.branch_label) !== true || present(row?.source_row?.z_lambda) !== true) {
    return "quotient_row_identity.z_lambda";
  }
  if (ledgers.monodromy?.Delta_k_positive !== true) {
    return "quotient_monodromy.Delta_k_positive";
  }
  if (ledgers.eta_ladder?.same_branch_persists_across_eta_ladder !== true) {
    return "eta_ladder_persistence.same_branch_persists_across_eta_ladder";
  }
  if (row?.accepted_history_boundary?.status_is_accepted_history_segment !== true) {
    return "accepted_history_boundary.status_is_accepted_history_segment";
  }
  return null;
}

function correctedAttemptBoundary(attempt, row, sourceRefValue) {
  const ledgers = row?.residual_ledgers ?? {};
  return {
    schema: "a0-tier1-corrected-rerun-source-boundary/v1",
    source_ref: sourceRefValue,
    corrected_rerun_artifact_schema: attempt?.artifact_schema ?? null,
    corrected_rerun_status: row?.status ?? attempt?.metadata?.status ?? null,
    correction_context_status: row?.correction_context?.status ?? null,
    accepted_history_boundary: row?.accepted_history_boundary ?? null,
    measured_residuals: {
      R_state: ledgers.state_return?.max_state_return_residual ?? null,
      R_root: ledgers.root_closure?.max_root_residual ?? null,
      R_phase: ledgers.phase_closure?.phase_closure_residual ?? null,
      R_E: ledgers.energy_like_speed?.energy_like_speed_residual ?? null,
      R_drift: ledgers.center_drift?.max_center_drift ?? null,
      R_speed: ledgers.speed_ordering?.max_speed_ordering_residual ?? null,
      residual_balance_relative_residual: ledgers.residual_balance?.relative_residual ?? null,
      refined_i_receiver_phase_bin_relative_residual:
        ledgers.refined_i_receiver_phase_bin_residual_balance?.relative_residual ?? null,
    },
    pass_fail_fields: {
      status_is_accepted_history_segment: row?.accepted_history_boundary?.status_is_accepted_history_segment === true,
      direct_one_period_residuals_below_tolerance:
        row?.accepted_history_boundary?.residuals_below_tolerance === true,
      no_secular_center_drift: row?.accepted_history_boundary?.no_secular_center_drift === true,
      quotient_row_identity:
        present(row?.source_row?.branch_label) === true &&
        present(row?.source_row?.z_lambda) === true &&
        row?.validation?.source_row_present === true,
      Delta_k_positive: ledgers.monodromy?.Delta_k_positive === true,
      same_branch_persists_across_eta_ladder:
        ledgers.eta_ladder?.same_branch_persists_across_eta_ladder === true,
      benchmark_inputs_excluded: row?.validation?.benchmark_inputs_excluded === true,
    },
    first_failed_proof_field: firstFailedCorrectedAttemptProofField(row),
    smallest_next_source_boundary:
      "branch-chart revision with corrected one-period residual closure before quotient monodromy and eta-ladder persistence",
  };
}

function buildCandidateFromCorrectedAttempt(attempt, options = {}) {
  const row = firstCorrectedAttemptRow(attempt);
  const sourceRefValue = options.sourceRef ?? null;
  if (!row) {
    return {
      provider_source_status: "corrected_rerun_missing",
      source_ref: sourceRefValue,
      accepted_status: false,
      diagnostic_only: true,
      notes: "diagnostic corrected rerun source row missing",
    };
  }
  const ledgers = row.residual_ledgers ?? {};
  return {
    provider_source_status: `diagnostic_${row.status ?? "corrected_rerun"}`,
    source_ref: sourceRefValue,
    accepted_status: false,
    diagnostic_only: true,
    notes:
      "diagnostic corrected rerun measured residual row; not accepted non-fixture A0 Tier 1 continuation evidence",
    branch_certificate_ref: null,
    same_domain_record_ref: row.row ?? null,
    active_root_or_live_ledger_identity: row.active_causal_root_ledger ?? null,
    branch_local_projection_or_normalization_identity: row.source_row?.branch_label ?? null,
    direct_one_period_residual_ledger: directResidualLedgerFromAttemptRow(row),
    no_secular_center_drift: {
      status: statusPass(ledgers.center_drift?.status) ? "pass" : (ledgers.center_drift?.status ?? null),
      pass: statusPass(ledgers.center_drift?.status),
      max_center_drift: ledgers.center_drift?.max_center_drift ?? null,
    },
    quotient_row_identity: {
      status:
        present(row.source_row?.branch_label) && present(row.source_row?.z_lambda) && row.validation?.source_row_present
          ? "pass"
          : "failed",
      branch_label: row.source_row?.branch_label ?? null,
      z_lambda: row.source_row?.z_lambda ?? null,
      source_row_identity_matches:
        present(row.source_row?.branch_label) && present(row.source_row?.z_lambda) && row.validation?.source_row_present,
    },
    quotient_monodromy: {
      status: ledgers.monodromy?.status ?? "not_computed",
      Delta_k: ledgers.monodromy?.Delta_k ?? null,
      Delta_k_positive: ledgers.monodromy?.Delta_k_positive === true,
    },
    eta_ladder_persistence: {
      status: ledgers.eta_ladder?.status ?? "not_computed",
      same_branch_persists_across_eta_ladder: ledgers.eta_ladder?.same_branch_persists_across_eta_ladder === true,
      eta_values: ledgers.eta_ladder?.eta_values ?? [],
      quotient_row_identity_carried: false,
    },
    retained_source_binding: null,
    receiver_normal_branch_strength: null,
    benchmark_exclusion: {
      benchmark_inputs_excluded: row.validation?.benchmark_inputs_excluded === true,
      excluded_source_families: FORBIDDEN_SOURCE_FAMILIES,
    },
    corrected_rerun_source_boundary: correctedAttemptBoundary(attempt, row, sourceRefValue),
  };
}

function firstMissingField(results) {
  for (const pathPrefix of FIRST_MISSING_FIELD_ORDER) {
    const field = results.find((entry) => !entry.pass && entry.path.startsWith(pathPrefix));
    if (field) {
      return field.path;
    }
  }
  return results.find((entry) => !entry.pass)?.path ?? null;
}

function buildAcceptedContinuationSourceTarget(candidate = {}, options = {}) {
  const fallbackSourceRef = options.sourceRef ?? null;
  const normalizedCandidate = isObject(candidate) ? candidate : {};
  const ref = sourceRef(normalizedCandidate, fallbackSourceRef);
  const rejectionCodes = sourceFamilyRejections(normalizedCandidate, fallbackSourceRef);
  const results = fieldResults({
    ...normalizedCandidate,
    provider_source_status: providerSourceStatus(normalizedCandidate),
    source_ref: ref,
  });
  const missingByGroup = groupedMissingFields(results);
  const acceptedSourceCandidate =
    results.every((field) => field.pass) && rejectionCodes.length === 0 && acceptedStatusPass(normalizedCandidate);
  const firstMissing = firstMissingField(results);
  return {
    schema: "a0-tier1-accepted-continuation-source/v1",
    artifact: "a0-tier1-accepted-continuation-source-target",
    claim_level: "fail-closed producer target, not accepted continuation evidence",
    target_status: acceptedSourceCandidate
      ? "accepted_candidate_fields_present"
      : "accepted_tier1_continuation_source_missing",
    accepted_source_candidate_available: acceptedSourceCandidate,
    authorizes_retained_pressure_row_provider: false,
    provider_source_status: providerSourceStatus(normalizedCandidate),
    source_ref: ref,
    first_failure: acceptedSourceCandidate ? null : "accepted_tier1_continuation_source_missing",
    first_missing_field: acceptedSourceCandidate ? null : firstMissing,
    smallest_next_producer: "accepted_non_fixture_a0_tier1_continuation_source_row",
    required_proof_field_groups: REQUIRED_PROOF_FIELD_GROUPS,
    forbidden_source_families: FORBIDDEN_SOURCE_FAMILIES,
    rejected_source_family_codes: rejectionCodes,
    missing_or_rejected_fields_by_group: missingByGroup,
    missing_or_rejected_fields: results.filter((field) => !field.pass).map((field) => field.path),
    field_results: results,
    pressure_row_provider_binding_required: {
      same_record_binding: true,
      required_provider_fields: [
        "provider_source_status",
        "source_ref",
        "branch_certificate_ref",
        "same_domain_record_ref",
        "active_root_or_live_ledger_identity",
        "branch_local_projection_or_normalization_identity",
        "receiver_normal_branch_strength",
        "retained_source_binding",
        "accepted_status",
      ],
      keeps_pressure_row_non_authorizing_until_accepted: true,
    },
    corrected_rerun_source_boundary: normalizedCandidate.corrected_rerun_source_boundary ?? null,
  };
}

function validationErrors(report) {
  const errors = [];
  if (report?.schema !== "a0-tier1-accepted-continuation-source/v1") {
    errors.push("schema must be a0-tier1-accepted-continuation-source/v1");
  }
  if (report?.artifact !== "a0-tier1-accepted-continuation-source-target") {
    errors.push("artifact must be a0-tier1-accepted-continuation-source-target");
  }
  if (report?.authorizes_retained_pressure_row_provider !== false) {
    errors.push("target must not authorize retained pressure-row provider");
  }
  if (!isObject(report?.required_proof_field_groups)) {
    errors.push("required_proof_field_groups must be present");
  }
  if (!Array.isArray(report?.field_results)) {
    errors.push("field_results must be an array");
  }
  if (report?.accepted_source_candidate_available !== true && report?.first_missing_field === null) {
    errors.push("fail-closed report must name first_missing_field");
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
        first_failure: report.first_failure ?? null,
        first_missing_field: report.first_missing_field ?? null,
      },
      args
    );
    return;
  }
  const sourcePath = args.source ? path.resolve(args.source) : null;
  const correctedAttemptPath = args.fromCorrectedAttempt ? path.resolve(args.fromCorrectedAttempt) : null;
  const candidate = correctedAttemptPath
    ? buildCandidateFromCorrectedAttempt(readJson(correctedAttemptPath), {
        sourceRef: path.relative(process.cwd(), correctedAttemptPath),
      })
    : sourcePath
      ? readJson(sourcePath)
      : {};
  writeOutput(
    buildAcceptedContinuationSourceTarget(candidate, {
      sourceRef: correctedAttemptPath
        ? path.relative(process.cwd(), correctedAttemptPath)
        : sourcePath
          ? path.relative(process.cwd(), sourcePath)
          : null,
    }),
    args
  );
}

export {
  REQUIRED_PROOF_FIELD_GROUPS,
  buildCandidateFromCorrectedAttempt,
  buildAcceptedContinuationSourceTarget,
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
