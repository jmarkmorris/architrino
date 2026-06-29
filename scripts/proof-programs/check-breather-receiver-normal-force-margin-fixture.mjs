#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA =
  "breather-receiver-normal-force-margin-fixture/v0";
export const BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID =
  "breather-receiver-normal-force-margin-restart/v0";

export const BREATHER_FORCE_MARGIN_STATUSES = Object.freeze({
  missing: "receiver_normal_breather_force_margin_missing",
  branchChartUnauthorized: "breather-force-margin-branch-chart-unauthorized",
  checksumMismatch: "breather-force-margin-branch-family-checksum-mismatch",
  receiverStrengthSubstitution: "breather-force-margin-source-normal-substitution",
  oldShellBraidResidue: "breather-force-margin-old-shell-braid-residue",
  aggregateOnly: "breather-force-margin-aggregate-only",
  derivativeMissing: "breather-force-margin-derivative-row-missing",
  derivativeReconstructionFailed: "breather-force-margin-derivative-reconstruction-failed",
  signStratumOpen: "breather-force-margin-sign-stratum-open",
  nonpositive: "breather-force-margin-nonpositive",
  sourceMissing: "accepted_non_fixture_source_missing",
  passed: "breather-force-margin-fixture-passed-priority-only",
});

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const ROOT_DIR = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
const DEFAULT_CERTIFICATE_SOURCE_ROOT =
  "reference/priorities/proof-programs/breather-proof/certificate";
const NUMERIC_TOLERANCE = 1e-12;
const BREATHER_FORCE_MARGIN_ROUTE_PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const BREATHER_FORCE_MARGIN_ROUTE_PROOF_INTERVAL = "proof-interval-v6";
const BREATHER_FORCE_MARGIN_ROUTE_CANDIDATE_RUN_ID = "fold-coordinate-candidate.nonlinear-v0";
const BREATHER_FORCE_MARGIN_ROUTE_LAMBDA_TAG = "lambda0305";

const BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_EXPECTED_PRODUCER_FILES = Object.freeze({
  branch_chart: "branch_chart.json",
  retained_rows:
    "breather_receiver_normal_retained_rows.fresh-v10-higher-fold-12-root-rebuild-v0.json",
  derivative_bundle:
    "breather_receiver_normal_derivative_bundle.fresh-v10-higher-fold-12-root-rebuild-v0.json",
  margin_intervals:
    "breather_receiver_normal_margin_intervals.fresh-v10-higher-fold-12-root-rebuild-v0.json",
  fixture:
    "breather_receiver_normal_force_margin_fixture.fresh-v10-higher-fold-12-root-rebuild-v0.json",
});

const BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ROUTE_SOURCE_FILES = Object.freeze({
  fold_coordinate_history_realization_contract:
    "fold_coordinate_history_realization_contract.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json",
  accepted_status_route_evidence_object_contract_disjunction:
    "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_contract_disjunction_exhaustion_classifier.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  route_input_first_blocker_handoff:
    "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_first_blocker_handoff_classifier.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  source_packet_rule_derivation_proof_contract_attempt:
    "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  same_packet_impulse_direct_quadrature_source_packet_attempt:
    "higher_fold_layer_same_packet_impulse_direct_quadrature_source_packet_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
});

const BREATHER_RULE_KERNEL_PAYLOAD_ROUTE_SOURCE_FILES = Object.freeze({
  derivation_proof_target_packet:
    "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_target_packet.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  proof_object_contract_target_packet:
    "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_packet.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  proof_grade_derivation_schema_target_packet:
    "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  proof_grade_derivation_schema_current_pool_absence:
    "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  proof_grade_derivation_schema_external_input_obligation:
    "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  sigma_hf_01_missing_proof_grade_fields_target:
    "sigma_hf_01_external_schema_candidate.missing-proof-grade-fields-derivation-target.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  sigma_hf_01_external_provenance_contract_replay:
    "sigma_hf_01_external_schema_candidate.external-provenance-contract-replay.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  sigma_hf_01_local_pool_nonreclassification:
    "sigma_hf_01_external_schema_candidate.local-proof-program-pool-nonreclassification-classifier.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
});

const BREATHER_RULE_KERNEL_PAYLOAD_REQUIRED_SCHEMA_FIELDS = Object.freeze([
  "compatible_schema_role_lock",
  "compatible_proof_object_role_lock",
  "derivation_proof_target_lock",
  "derivation_proof_source_data_record_lock",
  "rule_kernel_obligation_binding",
  "rule_kernel_derivation_payload_target_binding",
  "proof_grade_derivation_schema_statement",
  "non_reinterpretation_guard",
]);

const BREATHER_RULE_KERNEL_PAYLOAD_EXTERNAL_PROVENANCE_FIELDS = Object.freeze([
  "external_schema_provenance.provenance_class",
  "external_schema_provenance.source_ref",
  "external_schema_provenance.acceptance_contract_ref",
  "external_schema_provenance.received_for_schema_validation",
  "external_schema_provenance.authored_inside_local_proof_program_pool",
  "external_schema_provenance.derived_from_local_certificate_json",
  "external_schema_provenance.self_authored_placeholder",
  "external_schema_provenance.local_path_treated_as_external_evidence",
]);

const BREATHER_SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER_FIELDS = Object.freeze([
  "source_packet_acceptance_rule_derivation_proof",
  "source_packet_acceptance_rule_soundness_proof",
  "source_packet_acceptance_rule_endpoint_application_proof",
  "accepted_constants_conformance",
  "compatible_source_packet_acceptance_evidence",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
]);

const BREATHER_RULE_KERNEL_PAYLOAD_TRACEABILITY_FIELDS = Object.freeze([
  "source_identity",
  "source_section_or_equation_refs",
  "sigma_hf_01_source_data_record_lock",
  "same_record_rule_kernel_obligation_binding",
  "same_record_payload_target_binding",
  "same_record_schema_statement",
  "non_reinterpretation_guard",
  "negative_control_or_decoy_rejection",
]);

export const BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_REQUIRED_SOURCE_BOUNDARY =
  Object.freeze({
    expected_producer_object:
      "breather_receiver_normal_force_margin_fixture.<packet-id>.json",
    expected_artifact_id: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID,
    branch_chart_producer: "branch_chart.json",
    retained_record_fields: [
      "packet_identity",
      "retained_record_key",
      "branch_family_checksum",
      "D_s_interval",
      "D_t_interval",
      "W_rec_interval",
      "sign_stratum.zeta_s",
      "sign_stratum.zeta_t",
    ],
    derivative_fields: [
      "retained_record_key",
      "variation_key",
      "D_vD_s_interval",
      "D_vD_t_interval",
      "D_vW_rec_interval",
      "geometry_derivatives",
      "force_kernel_derivatives",
    ],
    consumer_fields: [
      "consumer_id",
      "retained_record_keys",
      "derivative_variation_keys",
      "gamma_rec_interval",
    ],
    expected_producer_files: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_EXPECTED_PRODUCER_FILES,
  });

export function buildBreatherReceiverNormalForceMarginFixtureSchema() {
  return {
    artifact_schema: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA,
    artifact_id: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID,
    claim_level: "priority-only fixture validator",
    required_top_level_fields: [
      "artifact_id",
      "packet_identity",
      "branch_chart_authorized",
      "branch_family_checksum",
      "receiver_normal_rows",
      "receiver_normal_derivative_rows",
      "margin_consumers",
      "margin_intervals",
      "negative_controls",
      "source_hashes",
    ],
    receiver_normal_row_contract: [
      "retained_record_key",
      "branch_family_checksum",
      "D_s_interval",
      "D_t_interval",
      "W_rec_interval",
      "sign_stratum.zeta_s",
      "sign_stratum.zeta_t",
    ],
    receiver_normal_derivative_row_contract: [
      "retained_record_key",
      "variation_key",
      "branch_family_checksum",
      "D_vD_s_interval",
      "D_vD_t_interval",
      "D_vW_rec_interval",
      "geometry_derivatives",
      "force_kernel_derivatives",
    ],
    margin_consumer_contract: [
      "consumer_id",
      "branch_family_checksum",
      "retained_record_keys",
      "derivative_variation_keys",
    ],
    margin_interval_contract: [
      "consumer_id",
      "branch_family_checksum",
      "gamma_rec_interval",
    ],
    absence_boundary_contract: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_REQUIRED_SOURCE_BOUNDARY,
    fail_closed_statuses: Object.values(BREATHER_FORCE_MARGIN_STATUSES).filter(
      (status) => status !== BREATHER_FORCE_MARGIN_STATUSES.passed,
    ),
  };
}

function listJsonFiles(entryPath) {
  if (!fs.existsSync(entryPath)) {
    return [];
  }
  const stat = fs.statSync(entryPath);
  if (stat.isFile()) {
    return path.extname(entryPath) === ".json" ? [entryPath] : [];
  }
  if (!stat.isDirectory()) {
    return [];
  }
  const files = [];
  for (const child of fs.readdirSync(entryPath)) {
    files.push(...listJsonFiles(path.join(entryPath, child)));
  }
  return files;
}

function relativeToRoot(pathname) {
  return path.relative(ROOT_DIR, pathname) || ".";
}

function collectKeys(value, targetKeys, matches, sourcePath) {
  if (Array.isArray(value)) {
    for (const item of value) {
      collectKeys(item, targetKeys, matches, sourcePath);
    }
    return;
  }
  if (!isPlainObject(value)) {
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (targetKeys.has(key)) {
      matches.get(key).push({
        path: relativeToRoot(sourcePath),
        value: child,
      });
    }
    collectKeys(child, targetKeys, matches, sourcePath);
  }
}

function parsedJsonEvidence(sourceRoot) {
  const sourceRootAbs = path.resolve(ROOT_DIR, sourceRoot);
  const files = listJsonFiles(sourceRootAbs);
  const targetKeys = new Set([
    "artifact_id",
    "branch_chart_authorized",
    "preledger_pass",
    "updates_live_ledger",
    "receiver_normal_rows",
    "receiver_normal_derivative_rows",
    "receiver_normal_derivative_bundle",
    "margin_consumers",
    "gamma_rec_interval",
  ]);
  const matches = new Map([...targetKeys].map((key) => [key, []]));
  const parseErrors = [];
  let parsedCount = 0;

  for (const file of files) {
    try {
      const value = JSON.parse(fs.readFileSync(file, "utf8"));
      parsedCount += 1;
      collectKeys(value, targetKeys, matches, file);
    } catch (error) {
      parseErrors.push({
        path: relativeToRoot(file),
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return {
    source_root: relativeToRoot(sourceRootAbs),
    json_files_scanned: files.length,
    json_files_parsed: parsedCount,
    json_parse_error_count: parseErrors.length,
    json_parse_errors: parseErrors,
    matches,
  };
}

function uniquePaths(entries, predicate = () => true) {
  return [...new Set(entries.filter(predicate).map((entry) => entry.path))].sort();
}

function readRouteJson(sourceRoot, filename) {
  const pathname = path.resolve(ROOT_DIR, sourceRoot, filename);
  const relativePath = relativeToRoot(pathname);
  if (!fs.existsSync(pathname)) {
    return { path: relativePath, present: false };
  }
  try {
    return {
      path: relativePath,
      present: true,
      value: JSON.parse(fs.readFileSync(pathname, "utf8")),
    };
  } catch (error) {
    return {
      path: relativePath,
      present: true,
      parse_error: error instanceof Error ? error.message : String(error),
    };
  }
}

function summarizeRouteJson(routeJson, summaryKeys) {
  const summary = {};
  for (const key of summaryKeys) {
    summary[key] = routeJson.value?.summary?.[key] ?? null;
  }
  return {
    path: routeJson.path,
    present: routeJson.present,
    parse_error: routeJson.parse_error ?? null,
    schema: routeJson.value?.schema ?? null,
    status: routeJson.value?.status ?? null,
    summary,
  };
}

function summarizeExpectedCandidateArtifacts(routeJson) {
  const artifacts = routeJson.value?.expected_candidate_artifacts;
  if (!isPlainObject(artifacts)) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(artifacts).map(([key, artifact]) => [
      key,
      {
        path: artifact?.path ?? null,
        present: artifact?.present === true,
      },
    ]),
  );
}

function summarizeSigmaHf01MissingFieldsTarget(routeJson) {
  return {
    path: routeJson.path,
    present: routeJson.present,
    parse_error: routeJson.parse_error ?? null,
    schema: routeJson.value?.schema ?? null,
    status: routeJson.value?.status ?? null,
    target_slot: routeJson.value?.target_slot ?? null,
    required_fields_total: routeJson.value?.required_fields_total ?? null,
    required_fields_present: routeJson.value?.required_fields_present ?? null,
    missing_field_count: routeJson.value?.missing_field_count ?? null,
    candidate_external_schema_received:
      routeJson.value?.candidate_external_schema_received ?? null,
    slot_result: routeJson.value?.slot_result ?? null,
    row_slots_parked: routeJson.value?.row_slots_parked ?? null,
    targeted_missing_fields: Array.isArray(routeJson.value?.targeted_missing_fields)
      ? routeJson.value.targeted_missing_fields.map((field) => ({
          field: field.field ?? null,
          status: field.status ?? null,
          required_predicates: Array.isArray(field.required_predicates)
            ? field.required_predicates
            : [],
        }))
      : [],
  };
}

function buildBreatherReceiverNormalForceMarginProducerRouteBoundary(sourceRoot) {
  const routes = Object.fromEntries(
    Object.entries(BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ROUTE_SOURCE_FILES).map(([key, filename]) => [
      key,
      readRouteJson(sourceRoot, filename),
    ]),
  );
  const foldContract = routes.fold_coordinate_history_realization_contract;
  const routeEvidence = routes.accepted_status_route_evidence_object_contract_disjunction;
  const routeInput = routes.route_input_first_blocker_handoff;
  const sourceRuleContract = routes.source_packet_rule_derivation_proof_contract_attempt;
  const sourcePacketAttempt = routes.same_packet_impulse_direct_quadrature_source_packet_attempt;
  const ruleKernelRoutes = Object.fromEntries(
    Object.entries(BREATHER_RULE_KERNEL_PAYLOAD_ROUTE_SOURCE_FILES).map(([key, filename]) => [
      key,
      readRouteJson(sourceRoot, filename),
    ]),
  );

  return {
    schema: `${BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA}.producer-route-boundary/v0`,
    packet_id: BREATHER_FORCE_MARGIN_ROUTE_PACKET_ID,
    proof_interval: BREATHER_FORCE_MARGIN_ROUTE_PROOF_INTERVAL,
    candidate_run_id: BREATHER_FORCE_MARGIN_ROUTE_CANDIDATE_RUN_ID,
    lambda_tag: BREATHER_FORCE_MARGIN_ROUTE_LAMBDA_TAG,
    expected_producer_files: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_EXPECTED_PRODUCER_FILES,
    first_required_proof_object:
      "source_packet_acceptance_rule_derivation_proof for fixed-parameter separator aggregate to same-packet fold impulse/direct-quadrature bound acceptance",
    first_branch_chart_realization_object:
      "fold-coordinate same-packet history realization bundle with same_packet_history_update_formula_supplied, candidate replay artifacts present, row_consumed=true, and branch_chart_authorized=true",
    branch_chart_route: {
      expected_file: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_EXPECTED_PRODUCER_FILES.branch_chart,
      authorization_rule:
        "branch_chart_authorized=true only after accepted same-packet fold-layer rows, candidate replay artifacts, and row-consumption locks are present for the same packet",
      route_source_files: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ROUTE_SOURCE_FILES,
      evidence: {
        fold_coordinate_history_realization_contract: {
          ...summarizeRouteJson(foldContract, [
            "variables_with_realization_supplied",
            "candidate_artifacts_present",
            "candidate_artifact_count",
            "contract_ready_rows",
            "row_consumption_count",
            "branch_chart_authorized",
          ]),
          expected_candidate_artifacts: summarizeExpectedCandidateArtifacts(foldContract),
          required_fields_certified_counts:
            foldContract.value?.summary?.required_fields_certified_counts ?? null,
        },
        accepted_status_route_evidence_object_contract_disjunction: summarizeRouteJson(routeEvidence, [
          "current_pool_json_files_scanned",
          "route_evidence_object_contract_disjunctions_satisfied",
          "proof_grade_derivation_ref_evidence_object_contract_slots_satisfied",
          "primitive_source_packet_route_evidence_object_contract_slots_satisfied",
          "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets",
          "accepted_fold_layer_rows",
          "row_consumption_count",
          "branch_chart_authorized",
          "first_route_evidence_object_contract_blocker",
          "first_proof_grade_contract_blocker",
          "first_primitive_contract_blocker",
          "first_source_packet_acceptance_rule_contract_blocker",
          "first_accepted_source_packet_contract_blocker",
          "parent_complement_consumption_ref_blocker",
          "first_separator_certificate_blocker",
        ]),
        route_input_first_blocker_handoff: summarizeRouteJson(routeInput, [
          "route_input_disjunctions_satisfied",
          "proof_grade_uniform_first_blocker",
          "primitive_uniform_rule_blocker",
          "accepted_source_packet_blocker",
          "accepted_fold_layer_rows",
          "row_consumption_count",
          "branch_chart_authorized",
          "first_separator_certificate_blocker",
        ]),
      },
    },
    receiver_normal_route: {
      retained_rows_expected_file:
        BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_EXPECTED_PRODUCER_FILES.retained_rows,
      derivative_bundle_expected_file:
        BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_EXPECTED_PRODUCER_FILES.derivative_bundle,
      margin_interval_expected_file:
        BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_EXPECTED_PRODUCER_FILES.margin_intervals,
      fixture_expected_file: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_EXPECTED_PRODUCER_FILES.fixture,
      blocked_until: [
        "branch_chart.json exists with branch_chart_authorized=true for the same packet",
        "same-record retained receiver-normal rows emit D_s_interval, D_t_interval, W_rec_interval, sign stratum, and branch_family_checksum",
        "same-record receiver-normal derivative bundle emits D_vD_s_interval, D_vD_t_interval, reconstructed D_vW_rec_interval, geometry_derivatives, and force_kernel_derivatives",
        "breather margin interval producer emits gamma_rec_interval for every recapture/self-drive/action/power/wake-history/Schauder-envelope consumer",
      ],
      required_retained_record_fields:
        BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_REQUIRED_SOURCE_BOUNDARY.retained_record_fields,
      required_derivative_fields:
        BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_REQUIRED_SOURCE_BOUNDARY.derivative_fields,
      margin_interval_source_field: "gamma_rec_interval",
    },
    source_packet_route_boundary: {
      expected_derivation_proof_object:
        "source_packet_acceptance_rule_derivation_proof_object.<external-source-id>.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
      expected_rule_kernel_schema_candidate:
        "sigma_hf_01_external_schema_candidate.<external-source-id>.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
      source_packet_acceptance_rule_fields:
        BREATHER_SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER_FIELDS,
      source_packet_rule_derivation_proof_contract_attempt: summarizeRouteJson(sourceRuleContract, [
        "source_material_premise_slots_satisfied",
        "candidate_exact_consistency_premise_slots_satisfied",
        "rule_kernel_derivation_payload_slots_satisfied",
        "source_packet_acceptance_rules_constructed",
        "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets",
        "accepted_fold_layer_rows",
        "row_consumption_count",
        "branch_chart_authorized",
        "first_rule_blocker",
        "first_derivation_proof_blocker",
        "first_missing_contract_field",
        "first_missing_contract_field_blocker",
        "first_downstream_rule_kernel_blocker_after_derivation",
      ]),
      same_packet_impulse_direct_quadrature_source_packet_attempt: summarizeRouteJson(sourcePacketAttempt, [
        "fold_layer_rows",
        "rows_with_full_rectangle_interval_sources",
        "rows_with_accepted_row_projection_source_slice_coverage_certificate",
        "rows_with_dual_mollified_row_integrand_interval_enclosure",
        "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets",
        "accepted_fold_layer_rows",
        "row_consumption_count",
        "branch_chart_authorized_rows",
        "first_missing_source_packet_field",
        "first_acceptance_blocker",
        "first_numerical_enclosure_blocker",
      ]),
      rule_kernel_payload_boundary: {
        schema: `${BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA}.rule-kernel-payload-boundary/v0`,
        expected_rule_kernel_schema_candidate:
          "sigma_hf_01_external_schema_candidate.<external-source-id>.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
        expected_derivation_proof_object:
          "source_packet_acceptance_rule_derivation_proof_object.<external-source-id>.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
        compatible_schema_role:
          "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema",
        compatible_proof_object_role: "source_packet_acceptance_rule_derivation_proof_object",
        derivation_proof_target:
          "source_packet_acceptance_rule_derivation_proof_for_live_same_packet_separator_aggregate_family",
        required_schema_fields: BREATHER_RULE_KERNEL_PAYLOAD_REQUIRED_SCHEMA_FIELDS,
        external_provenance_fields: BREATHER_RULE_KERNEL_PAYLOAD_EXTERNAL_PROVENANCE_FIELDS,
        required_traceability_fields: BREATHER_RULE_KERNEL_PAYLOAD_TRACEABILITY_FIELDS,
        source_packet_acceptance_rule_fields:
          BREATHER_SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER_FIELDS,
        blocked_downstream_until_schema_received: [
          "rule_kernel_derivation_payload",
          "source_packet_acceptance_rule_derivation_proof",
          "source_packet_acceptance_rule_soundness_proof",
          "source_packet_acceptance_rule_endpoint_application_proof",
          "accepted_constants_conformance",
          "compatible_source_packet_acceptance_evidence",
          "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
          "higher_fold_separator_layer_certificate",
          "branch_chart.json",
          BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_EXPECTED_PRODUCER_FILES.retained_rows,
          BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_EXPECTED_PRODUCER_FILES.derivative_bundle,
          BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_EXPECTED_PRODUCER_FILES.margin_intervals,
        ],
        evidence: {
          derivation_proof_target_packet: summarizeRouteJson(
            ruleKernelRoutes.derivation_proof_target_packet,
            [
              "derivation_proof_target_slots_declared",
              "source_packet_acceptance_rule_derivation_proof_slots_satisfied",
              "rule_kernel_obligation_slots",
              "rule_kernel_obligation_slots_satisfied",
              "first_rule_kernel_blocker",
              "first_downstream_rule_kernel_blocker_after_derivation",
            ],
          ),
          proof_object_contract_target_packet: summarizeRouteJson(
            ruleKernelRoutes.proof_object_contract_target_packet,
            [
              "source_packet_acceptance_rule_derivation_proof_object_contract_target_slots_declared",
              "source_packet_acceptance_rule_derivation_proof_object_contract_field_slots",
              "source_packet_acceptance_rule_derivation_proof_object_contract_field_slots_satisfied",
              "current_pool_source_packet_acceptance_rule_derivation_proof_object_files_found",
              "first_derivation_proof_object_contract_blocker",
            ],
          ),
          proof_grade_derivation_schema_target_packet: summarizeRouteJson(
            ruleKernelRoutes.proof_grade_derivation_schema_target_packet,
            [
              "proof_grade_derivation_schema_target_slots_declared",
              "proof_grade_derivation_schema_target_fields",
              "proof_grade_derivation_schema_target_field_slots",
              "proof_grade_derivation_schema_target_field_slots_satisfied",
              "proof_grade_derivation_schemas_constructed",
              "rule_kernel_derivation_payloads_constructed",
              "first_schema_target_blocker",
            ],
          ),
          proof_grade_derivation_schema_current_pool_absence: summarizeRouteJson(
            ruleKernelRoutes.proof_grade_derivation_schema_current_pool_absence,
            [
              "current_pool_json_files_scanned",
              "current_pool_proof_grade_derivation_schema_files_found",
              "current_pool_compatible_proof_grade_derivation_schema_refs",
              "retained_proof_grade_derivation_schema_source_available_slots",
              "proof_grade_derivation_schema_current_pool_absence_slots_satisfied",
              "proof_grade_derivation_schemas_constructed",
              "rule_kernel_derivation_payloads_constructed",
              "first_current_pool_schema_absence_blocker",
              "first_payload_construction_blocker",
            ],
          ),
          proof_grade_derivation_schema_external_input_obligation: summarizeRouteJson(
            ruleKernelRoutes.proof_grade_derivation_schema_external_input_obligation,
            [
              "proof_grade_derivation_schema_external_input_obligation_slots_declared",
              "proof_grade_derivation_schema_external_input_required_slots",
              "proof_grade_derivation_schema_external_input_received_slots",
              "proof_grade_derivation_schema_external_input_obligation_field_slots_satisfied",
              "first_external_schema_obligation_blocker",
              "mechanical_continuations_from_current_pool",
              "decision_required_for_acceptance",
            ],
          ),
          sigma_hf_01_missing_proof_grade_fields_target:
            summarizeSigmaHf01MissingFieldsTarget(
              ruleKernelRoutes.sigma_hf_01_missing_proof_grade_fields_target,
            ),
          sigma_hf_01_external_provenance_contract_replay: summarizeRouteJson(
            ruleKernelRoutes.sigma_hf_01_external_provenance_contract_replay,
            [
              "local_proof_program_json_files_screened_as_candidate_refs",
              "external_provenance_accepted_records",
              "schema_validation_intake_candidates_found",
              "field_complete_but_provenance_rejected_records",
              "external_schema_inputs_received",
              "first_failure",
            ],
          ),
          sigma_hf_01_local_pool_nonreclassification: summarizeRouteJson(
            ruleKernelRoutes.sigma_hf_01_local_pool_nonreclassification,
            [
              "local_proof_program_json_files_screened",
              "local_proof_program_json_files_reclassified_as_external_schema",
              "schema_validation_intake_candidates_found",
              "external_schema_input_received_records",
              "external_provenance_accepted_records",
              "local_eight_field_records_without_external_schema_intake",
              "first_nonreclassification_blocker",
            ],
          ),
        },
      },
    },
  };
}

export function buildBreatherReceiverNormalForceMarginAbsenceBoundary(options = {}) {
  const sourceRoot = options.sourceRoot ?? DEFAULT_CERTIFICATE_SOURCE_ROOT;
  const evidence = parsedJsonEvidence(sourceRoot);
  const artifactFiles = uniquePaths(
    evidence.matches.get("artifact_id"),
    (entry) => entry.value === BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID,
  );
  const branchChartAuthorizedFiles = uniquePaths(
    evidence.matches.get("branch_chart_authorized"),
    (entry) => entry.value === true,
  );
  const receiverRowSourceFiles = uniquePaths(evidence.matches.get("receiver_normal_rows"));
  const derivativeRowSourceFiles = uniquePaths(evidence.matches.get("receiver_normal_derivative_rows"));
  const derivativeBundleSourceFiles = uniquePaths(
    evidence.matches.get("receiver_normal_derivative_bundle"),
  );
  const marginConsumerSourceFiles = uniquePaths(evidence.matches.get("margin_consumers"));
  const gammaMarginSourceFiles = uniquePaths(evidence.matches.get("gamma_rec_interval"));
  const preledgerPassFiles = uniquePaths(
    evidence.matches.get("preledger_pass"),
    (entry) => entry.value === true,
  );
  const liveLedgerUpdateFiles = uniquePaths(
    evidence.matches.get("updates_live_ledger"),
    (entry) => entry.value === true,
  );

  const missingProducerObjects = [];
  if (artifactFiles.length === 0) {
    missingProducerObjects.push(
      BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_REQUIRED_SOURCE_BOUNDARY.expected_producer_object,
    );
  }
  if (branchChartAuthorizedFiles.length === 0) {
    missingProducerObjects.push(
      BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_REQUIRED_SOURCE_BOUNDARY.branch_chart_producer,
    );
  }
  if (derivativeRowSourceFiles.length === 0 && derivativeBundleSourceFiles.length === 0) {
    missingProducerObjects.push(
      "receiver-normal retained-record first-derivative bundle for breather margin consumers",
    );
  }
  if (receiverRowSourceFiles.length === 0) {
    missingProducerObjects.push(
      "same-record receiver-normal retained-row bundle for breather margin consumers",
    );
  }
  if (marginConsumerSourceFiles.length === 0 || gammaMarginSourceFiles.length === 0) {
    missingProducerObjects.push(
      "breather recapture/self-drive/Schauder margin interval producer",
    );
  }

  return {
    schema: `${BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA}.absence-boundary/v0`,
    artifact_id: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID,
    verdict: "fail_closed_absence_boundary",
    pass: false,
    status: BREATHER_FORCE_MARGIN_STATUSES.sourceMissing,
    claim_level: "priority-only absence boundary; not a fixture and not proof evidence",
    source_root: evidence.source_root,
    scanned_json_files: evidence.json_files_scanned,
    parsed_json_files: evidence.json_files_parsed,
    json_parse_error_count: evidence.json_parse_error_count,
    required_source_boundary: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_REQUIRED_SOURCE_BOUNDARY,
    producer_route_boundary:
      buildBreatherReceiverNormalForceMarginProducerRouteBoundary(sourceRoot),
    source_evidence: {
      fixture_artifact_files: artifactFiles,
      branch_chart_authorized_true_files: branchChartAuthorizedFiles,
      preledger_pass_true_files: preledgerPassFiles,
      live_ledger_update_true_files: liveLedgerUpdateFiles,
      receiver_normal_row_source_files: receiverRowSourceFiles,
      receiver_normal_derivative_row_source_files: derivativeRowSourceFiles,
      receiver_normal_derivative_bundle_source_files: derivativeBundleSourceFiles,
      margin_consumer_source_files: marginConsumerSourceFiles,
      gamma_margin_source_files: gammaMarginSourceFiles,
    },
    missing_producer_objects: missingProducerObjects,
    blocks_fixture_candidate: missingProducerObjects.length > 0,
    diagnostics:
      missingProducerObjects.length > 0
        ? [
            "no source evidence supports a real breather receiver-normal force-margin fixture candidate",
          ]
        : [
            "source-like files were found; run fixture construction only after manual evidence review",
          ],
  };
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function present(value) {
  return value !== null && value !== undefined && value !== "";
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function stableStringify(value) {
  if (!isPlainObject(value)) {
    return String(value);
  }
  return JSON.stringify(
    Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right))),
  );
}

function intervalOf(value) {
  if (isFiniteNumber(value)) {
    return [value, value];
  }
  if (Array.isArray(value) && value.length === 2 && value.every(isFiniteNumber)) {
    const [left, right] = value;
    return left <= right ? [left, right] : null;
  }
  if (isPlainObject(value)) {
    const lower = value.lower ?? value.lo ?? value.min;
    const upper = value.upper ?? value.hi ?? value.max;
    if (isFiniteNumber(lower) && isFiniteNumber(upper) && lower <= upper) {
      return [lower, upper];
    }
  }
  return null;
}

function intervalExcludesZero(interval) {
  return interval[1] < 0 || interval[0] > 0;
}

function intervalContains(container, expected, tolerance = NUMERIC_TOLERANCE) {
  return (
    container[0] <= expected[0] + tolerance * Math.max(1, Math.abs(expected[0])) &&
    container[1] >= expected[1] - tolerance * Math.max(1, Math.abs(expected[1]))
  );
}

function intervalFromEndpointPairs(left, right, operation) {
  const values = [
    operation(left[0], right[0]),
    operation(left[0], right[1]),
    operation(left[1], right[0]),
    operation(left[1], right[1]),
  ];
  if (!values.every(isFiniteNumber)) {
    return null;
  }
  return [Math.min(...values), Math.max(...values)];
}

function addInterval(left, right) {
  return [left[0] + right[0], left[1] + right[1]];
}

function subtractInterval(left, right) {
  return [left[0] - right[1], left[1] - right[0]];
}

function multiplyInterval(left, right) {
  return intervalFromEndpointPairs(left, right, (a, b) => a * b);
}

function divideInterval(left, right) {
  if (!intervalExcludesZero(right)) {
    return null;
  }
  return intervalFromEndpointPairs(left, right, (a, b) => a / b);
}

function absoluteInterval(interval) {
  if (interval[0] <= 0 && interval[1] >= 0) {
    return [0, Math.max(Math.abs(interval[0]), Math.abs(interval[1]))];
  }
  return [Math.min(Math.abs(interval[0]), Math.abs(interval[1])), Math.max(Math.abs(interval[0]), Math.abs(interval[1]))];
}

function squareIntervalExcludingZero(interval) {
  if (!intervalExcludesZero(interval)) {
    return null;
  }
  return [Math.min(interval[0] * interval[0], interval[1] * interval[1]), Math.max(interval[0] * interval[0], interval[1] * interval[1])];
}

function retainedRecordKey(record) {
  if (typeof record?.retained_record_key === "string") {
    return record.retained_record_key;
  }
  if (isPlainObject(record?.retained_record_key) && present(record.retained_record_key.record_id)) {
    return String(record.retained_record_key.record_id);
  }
  if (present(record?.retained_record_id)) {
    return String(record.retained_record_id);
  }
  if (present(record?.record_id)) {
    return String(record.record_id);
  }
  return null;
}

function variationKey(record) {
  return record?.variation_key ?? record?.v_key ?? record?.variation_id ?? null;
}

function hasSubstitutionFlag(entry) {
  return (
    entry?.uses_source_normal_substitution === true ||
    entry?.uses_source_normal_denominator === true ||
    entry?.substitutes_D_s_for_W_rec === true ||
    entry?.substitutes_J_for_W_rec === true
  );
}

function hasOldShellBraidFlag(entry) {
  return (
    entry?.uses_old_shell_braid_force_residue === true ||
    entry?.uses_old_shell_braid_force_weight === true ||
    entry?.old_shell_braid_residue_consumed === true
  );
}

function diagnosticsForMissingFixture() {
  return [
    "fixture object is absent",
    "same-record receiver-normal rows are absent",
    "same-record derivative rows are absent",
    "breather force-margin consumers are absent",
  ];
}

function fail(status, diagnostics, extra = {}) {
  return {
    schema: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA,
    artifact_id: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID,
    verdict: "fail_closed",
    pass: false,
    status,
    diagnostics,
    ...extra,
  };
}

function pass(diagnostics, extra = {}) {
  return {
    schema: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA,
    artifact_id: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID,
    verdict: "pass_priority_only",
    pass: true,
    status: BREATHER_FORCE_MARGIN_STATUSES.passed,
    diagnostics,
    row_consumption_authorized: false,
    branch_chart_authorized: true,
    ...extra,
  };
}

function branchFamilyChecksum(value) {
  return present(value) ? stableStringify(value) : null;
}

function rowInterval(row, names) {
  for (const name of names) {
    const interval = intervalOf(row?.[name]);
    if (interval) {
      return interval;
    }
  }
  return null;
}

function buildRowIndex(rows) {
  const index = new Map();
  for (const row of rows) {
    const key = retainedRecordKey(row);
    if (key) {
      index.set(key, row);
    }
  }
  return index;
}

function derivativeIndexKey(recordKey, vKey) {
  return `${recordKey}::${vKey ?? "default"}`;
}

function buildDerivativeIndex(rows) {
  const index = new Map();
  for (const row of rows) {
    const key = retainedRecordKey(row);
    if (!key) continue;
    index.set(derivativeIndexKey(key, variationKey(row)), row);
  }
  return index;
}

function expectedWInterval(receiverRow) {
  const dS = rowInterval(receiverRow, ["D_s_interval", "D_s"]);
  const dT = rowInterval(receiverRow, ["D_t_interval", "D_t"]);
  if (!dS || !dT || !intervalExcludesZero(dS)) {
    return null;
  }
  const ratio = divideInterval(dT, dS);
  return ratio ? absoluteInterval(ratio) : null;
}

function expectedDvWInterval(receiverRow, derivativeRow) {
  const dS = rowInterval(receiverRow, ["D_s_interval", "D_s"]);
  const dT = rowInterval(receiverRow, ["D_t_interval", "D_t"]);
  const dvDS = rowInterval(derivativeRow, ["D_vD_s_interval", "D_vD_s"]);
  const dvDT = rowInterval(derivativeRow, ["D_vD_t_interval", "D_vD_t"]);
  const zetaS = receiverRow?.sign_stratum?.zeta_s ?? receiverRow?.zeta_s;
  const zetaT = receiverRow?.sign_stratum?.zeta_t ?? receiverRow?.zeta_t;
  if (!dS || !dT || !dvDS || !dvDT || ![zetaS, zetaT].every((value) => value === -1 || value === 1)) {
    return null;
  }
  const dSSquared = squareIntervalExcludingZero(dS);
  if (!dSSquared) {
    return null;
  }
  const numerator = subtractInterval(multiplyInterval(dS, dvDT), multiplyInterval(dT, dvDS));
  const signedNumerator = zetaS * zetaT === 1 ? numerator : [-numerator[1], -numerator[0]];
  return divideInterval(signedNumerator, dSSquared);
}

function consumerRecordKeys(consumer) {
  const keys = consumer?.retained_record_keys ?? consumer?.retained_record_ids ?? consumer?.record_keys ?? [];
  return Array.isArray(keys) ? keys.map(String) : [];
}

function consumerVariationKeys(consumer) {
  const keys = consumer?.derivative_variation_keys ?? consumer?.variation_keys ?? [];
  return Array.isArray(keys) && keys.length > 0 ? keys.map(String) : ["default"];
}

export function validateBreatherReceiverNormalForceMarginFixture(fixture) {
  if (!fixture) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.missing, diagnosticsForMissingFixture());
  }

  const diagnostics = [];
  if (!isPlainObject(fixture)) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.missing, ["fixture is not a JSON object"]);
  }

  if (fixture.artifact_id !== BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID) {
    diagnostics.push("artifact_id does not match breather-receiver-normal-force-margin-restart/v0");
  }
  if (!present(fixture.packet_identity)) {
    diagnostics.push("packet_identity is absent");
  }
  const checksum = branchFamilyChecksum(fixture.branch_family_checksum);
  if (!checksum) {
    diagnostics.push("branch_family_checksum is absent");
  }

  const receiverRows = Array.isArray(fixture.receiver_normal_rows) ? fixture.receiver_normal_rows : [];
  const derivativeRows = Array.isArray(fixture.receiver_normal_derivative_rows)
    ? fixture.receiver_normal_derivative_rows
    : [];
  const consumers = Array.isArray(fixture.margin_consumers) ? fixture.margin_consumers : [];
  const intervals = Array.isArray(fixture.margin_intervals) ? fixture.margin_intervals : [];

  if (receiverRows.length === 0) {
    diagnostics.push("receiver_normal_rows is empty");
  }
  if (consumers.length === 0) {
    diagnostics.push("margin_consumers is empty");
  }
  if (intervals.length === 0) {
    diagnostics.push("margin_intervals is empty");
  }
  if (diagnostics.length > 0) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.missing, diagnostics);
  }

  if ([fixture, ...receiverRows, ...derivativeRows, ...consumers, ...intervals].some(hasSubstitutionFlag)) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.receiverStrengthSubstitution, [
      "fixture declares a forbidden receiver-strength substitution",
    ]);
  }
  if ([fixture, ...receiverRows, ...derivativeRows, ...consumers, ...intervals].some(hasOldShellBraidFlag)) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.oldShellBraidResidue, [
      "fixture declares consumption of a legacy shell-braid residue",
    ]);
  }
  if (fixture.branch_chart_authorized !== true) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.branchChartUnauthorized, [
      "same-packet branch chart is not authorized",
    ]);
  }

  const checksumRows = [...receiverRows, ...derivativeRows, ...consumers, ...intervals].filter((entry) =>
    present(entry?.branch_family_checksum),
  );
  if (
    checksumRows.length !== receiverRows.length + derivativeRows.length + consumers.length + intervals.length ||
    checksumRows.some((entry) => branchFamilyChecksum(entry.branch_family_checksum) !== checksum)
  ) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.checksumMismatch, [
      "not every consumed row repeats the fixture branch_family_checksum",
    ]);
  }

  const rowIndex = buildRowIndex(receiverRows);
  if (rowIndex.size !== receiverRows.length) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.missing, [
      "one or more receiver_normal_rows lacks a retained record key",
    ]);
  }

  for (const row of receiverRows) {
    const dS = rowInterval(row, ["D_s_interval", "D_s"]);
    const dT = rowInterval(row, ["D_t_interval", "D_t"]);
    const wRec = rowInterval(row, ["W_rec_interval", "W_rec"]);
    const zetaS = row?.sign_stratum?.zeta_s ?? row?.zeta_s;
    const zetaT = row?.sign_stratum?.zeta_t ?? row?.zeta_t;
    if (!dS || !dT || !wRec || !intervalExcludesZero(dS) || ![zetaS, zetaT].every((value) => value === -1 || value === 1)) {
      return fail(BREATHER_FORCE_MARGIN_STATUSES.signStratumOpen, [
        `retained row ${retainedRecordKey(row) ?? "<missing>"} lacks fixed receiver-normal intervals or signs`,
      ]);
    }
    const expectedW = expectedWInterval(row);
    if (!expectedW || !intervalContains(wRec, expectedW)) {
      return fail(BREATHER_FORCE_MARGIN_STATUSES.receiverStrengthSubstitution, [
        `retained row ${retainedRecordKey(row)} does not contain reconstructed W_rec`,
      ]);
    }
  }

  const derivativeIndex = buildDerivativeIndex(derivativeRows);
  for (const consumer of consumers) {
    const keys = consumerRecordKeys(consumer);
    if (consumer?.aggregate_only === true || keys.length === 0) {
      return fail(BREATHER_FORCE_MARGIN_STATUSES.aggregateOnly, [
        `consumer ${consumer?.consumer_id ?? "<missing>"} does not name retained rows`,
      ]);
    }
    for (const key of keys) {
      if (!rowIndex.has(key)) {
        return fail(BREATHER_FORCE_MARGIN_STATUSES.aggregateOnly, [
          `consumer ${consumer?.consumer_id ?? "<missing>"} names unknown retained row ${key}`,
        ]);
      }
    }
    if (consumer.requires_derivatives !== false) {
      for (const key of keys) {
        for (const vKey of consumerVariationKeys(consumer)) {
          const derivative = derivativeIndex.get(derivativeIndexKey(key, vKey));
          if (!derivative) {
            return fail(BREATHER_FORCE_MARGIN_STATUSES.derivativeMissing, [
              `consumer ${consumer?.consumer_id ?? "<missing>"} lacks derivative row ${key}::${vKey}`,
            ]);
          }
          const dvW = rowInterval(derivative, ["D_vW_rec_interval", "D_vW_rec"]);
          const expected = expectedDvWInterval(rowIndex.get(key), derivative);
          if (!dvW || !expected || !intervalContains(dvW, expected)) {
            return fail(BREATHER_FORCE_MARGIN_STATUSES.derivativeReconstructionFailed, [
              `derivative row ${key}::${vKey} does not contain reconstructed D_vW_rec`,
            ]);
          }
          if (!present(derivative.geometry_derivatives) || !present(derivative.force_kernel_derivatives)) {
            return fail(BREATHER_FORCE_MARGIN_STATUSES.derivativeMissing, [
              `derivative row ${key}::${vKey} lacks geometry or force-kernel derivative payload`,
            ]);
          }
        }
      }
    }
  }

  const intervalConsumerIds = new Set(intervals.map((entry) => String(entry.consumer_id)));
  for (const consumer of consumers) {
    if (!intervalConsumerIds.has(String(consumer.consumer_id))) {
      return fail(BREATHER_FORCE_MARGIN_STATUSES.nonpositive, [
        `consumer ${consumer?.consumer_id ?? "<missing>"} lacks a margin interval`,
      ]);
    }
  }
  for (const intervalRow of intervals) {
    const gamma = rowInterval(intervalRow, ["gamma_rec_interval", "gamma_interval", "gamma_rec"]);
    if (!gamma || gamma[0] <= 0) {
      return fail(BREATHER_FORCE_MARGIN_STATUSES.nonpositive, [
        `consumer ${intervalRow?.consumer_id ?? "<missing>"} has a nonpositive lower margin`,
      ]);
    }
  }

  return pass(["same-record receiver-normal force-margin fixture passed priority-only checks"], {
    retained_record_count: receiverRows.length,
    derivative_row_count: derivativeRows.length,
    margin_consumer_count: consumers.length,
    margin_interval_count: intervals.length,
  });
}

function parseArgs(argv) {
  const args = {
    fixturePath: null,
    allowFailClosed: false,
    pretty: false,
    schema: false,
    absenceBoundary: false,
    sourceRoot: DEFAULT_CERTIFICATE_SOURCE_ROOT,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--fixture" || arg === "--validate") {
      args.fixturePath = argv[index + 1];
      index += 1;
    } else if (arg === "--allow-fail-closed") {
      args.allowFailClosed = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--schema") {
      args.schema = true;
    } else if (arg === "--absence-boundary") {
      args.absenceBoundary = true;
      const next = argv[index + 1];
      if (next && !next.startsWith("--")) {
        args.sourceRoot = next;
        index += 1;
      }
    } else if (arg === "--source-root") {
      args.sourceRoot = argv[index + 1];
      index += 1;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return args;
}

function usage() {
  return [
    "Usage:",
    `  node ${SCRIPT_PATH} --fixture <fixture.json> [--allow-fail-closed] [--pretty]`,
    `  node ${SCRIPT_PATH} --allow-fail-closed [--pretty]`,
    `  node ${SCRIPT_PATH} --schema [--pretty]`,
    `  node ${SCRIPT_PATH} --absence-boundary [source-root] [--pretty]`,
  ].join("\n");
}

function readFixture(pathname) {
  return JSON.parse(fs.readFileSync(pathname, "utf8"));
}

if (process.argv[1] === SCRIPT_PATH) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
      console.log(usage());
      process.exit(0);
    }
    if (args.schema) {
      console.log(
        JSON.stringify(
          buildBreatherReceiverNormalForceMarginFixtureSchema(),
          null,
          args.pretty ? 2 : 0,
        ),
      );
      process.exit(0);
    }
    if (args.absenceBoundary) {
      console.log(
        JSON.stringify(
          buildBreatherReceiverNormalForceMarginAbsenceBoundary({
            sourceRoot: args.sourceRoot,
          }),
          null,
          args.pretty ? 2 : 0,
        ),
      );
      process.exit(0);
    }
    const fixture = args.fixturePath ? readFixture(args.fixturePath) : null;
    const report = validateBreatherReceiverNormalForceMarginFixture(fixture);
    console.log(JSON.stringify(report, null, args.pretty ? 2 : 0));
    if (!report.pass && !args.allowFailClosed) {
      process.exit(1);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    console.error(usage());
    process.exit(2);
  }
}
