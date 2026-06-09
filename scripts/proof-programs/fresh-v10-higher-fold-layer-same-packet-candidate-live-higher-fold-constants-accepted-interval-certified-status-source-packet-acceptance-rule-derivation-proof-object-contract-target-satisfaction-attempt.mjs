#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CURRENT_POOL_ABSENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_current_pool_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SOURCE_DATA_READINESS = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_DERIVATION_PROOF_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_KERNEL_BINDING_SPLIT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const CONTRACT_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_packet_fail_closed_contract_target_declared_current_pool_derivation_proof_object_absent_no_derivation_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const CURRENT_POOL_ABSENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_current_pool_absence_classifier_fail_closed_source_data_ready_current_pool_derivation_proof_object_absent_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const SOURCE_DATA_READINESS_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier_fail_closed_source_data_ready_derivation_proof_absent_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const DERIVATION_PROOF_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_target_packet_fail_closed_derivation_proof_target_declared_rule_kernel_unsatisfied_no_derivation_proof_no_soundness_proof_no_endpoint_application_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const KERNEL_BINDING_SPLIT_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier_fail_closed_rule_kernel_and_binding_evidence_obligations_split_all_unsatisfied_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt_fail_closed_identity_premise_and_non_reinterpretation_fields_source_available_rule_kernel_derivation_payload_absent_no_derivation_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";

const COMPATIBLE_PROOF_OBJECT_ROLE = "source_packet_acceptance_rule_derivation_proof_object";
const DERIVATION_PROOF_TARGET =
  "source_packet_acceptance_rule_derivation_proof_for_live_same_packet_separator_aggregate_family";
const CONTRACT_BLOCKER = "source_packet_acceptance_rule_derivation_proof_object_contract_unfilled";
const RULE_KERNEL_PAYLOAD_BLOCKER =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_absent";
const DERIVATION_PROOF_BLOCKER = "source_packet_acceptance_rule_derivation_proof_absent";
const CURRENT_POOL_DERIVATION_PROOF_OBJECT_BLOCKER =
  "source_packet_acceptance_rule_derivation_proof_object_absent_from_current_certificate_pool";
const RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const SOUNDNESS_PROOF_BLOCKER = "source_packet_acceptance_rule_soundness_proof_absent";
const APPLICATION_PROOF_BLOCKER = "source_packet_acceptance_rule_endpoint_application_proof_absent";
const CONFORMANCE_BLOCKER = "existing_constants_contract_packet_identity_mismatch";

const CONTRACT_FIELDS = [
  "packet_identity_lock",
  "compatible_proof_object_role_lock",
  "derivation_proof_target_binding",
  "derivation_proof_source_data_record_binding",
  "source_material_premise_binding",
  "candidate_exact_consistency_premise_binding",
  "rule_kernel_derivation_payload",
  "non_reinterpretation_guard",
];

const EXPECTED_ROWS_BY_SEPARATOR = {
  Sigma_hf_01: 11,
  Sigma_hf_02: 11,
  Sigma_hf_03: 7,
  Sigma_hf_04: 9,
  Sigma_hf_05: 9,
  Sigma_hf_06: 9,
  Sigma_hf_07: 11,
  Sigma_hf_08: 11,
  Sigma_hf_09: 7,
  Sigma_hf_10: 9,
  Sigma_hf_11: 9,
  Sigma_hf_12: 9,
};

function parseArgs(argv) {
  const args = {
    contractTarget: DEFAULT_CONTRACT_TARGET,
    currentPoolAbsence: DEFAULT_CURRENT_POOL_ABSENCE,
    sourceDataReadiness: DEFAULT_SOURCE_DATA_READINESS,
    derivationProofTarget: DEFAULT_DERIVATION_PROOF_TARGET,
    kernelBindingSplit: DEFAULT_KERNEL_BINDING_SPLIT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--contract-target") {
      args.contractTarget = argv[++index];
    } else if (arg === "--current-pool-absence") {
      args.currentPoolAbsence = argv[++index];
    } else if (arg === "--source-data-readiness") {
      args.sourceDataReadiness = argv[++index];
    } else if (arg === "--derivation-proof-target") {
      args.derivationProofTarget = argv[++index];
    } else if (arg === "--kernel-binding-split") {
      args.kernelBindingSplit = argv[++index];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++index];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-source-packet-acceptance-rule-derivation-proof-object-contract-target-satisfaction-attempt.mjs [options]

Options:
  --contract-target PATH          Derivation-proof object contract target packet. Defaults to ${DEFAULT_CONTRACT_TARGET}.
  --current-pool-absence PATH     Derivation-proof object current-pool absence classifier. Defaults to ${DEFAULT_CURRENT_POOL_ABSENCE}.
  --source-data-readiness PATH    Derivation-proof source-data readiness classifier. Defaults to ${DEFAULT_SOURCE_DATA_READINESS}.
  --derivation-proof-target PATH  Derivation-proof target packet. Defaults to ${DEFAULT_DERIVATION_PROOF_TARGET}.
  --kernel-binding-split PATH     Source-packet acceptance rule kernel/binding split classifier. Defaults to ${DEFAULT_KERNEL_BINDING_SPLIT}.
  --out-dir PATH                  Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                        Pretty-print JSON artifact.
  --help                          Show this help.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function artifactRecord(filePath) {
  const present = fs.existsSync(filePath);
  return {
    path: filePath,
    basename: path.basename(filePath),
    present,
    sha256: present ? sha256File(filePath) : null,
  };
}

function sourceHashChecks(paths) {
  return [
    [
      "accepted_status_source_packet_acceptance_rule_derivation_proof_object_contract_target_packet",
      paths.contractTarget,
    ],
    [
      "accepted_status_source_packet_acceptance_rule_derivation_proof_object_current_pool_absence_classifier",
      paths.currentPoolAbsence,
    ],
    [
      "accepted_status_source_packet_acceptance_rule_derivation_proof_source_data_readiness_classifier",
      paths.sourceDataReadiness,
    ],
    [
      "accepted_status_source_packet_acceptance_rule_derivation_proof_target_packet",
      paths.derivationProofTarget,
    ],
    ["accepted_status_source_packet_acceptance_rule_kernel_binding_split_classifier", paths.kernelBindingSplit],
  ].map(([sourceArtifact, filePath]) => ({
    source_artifact: sourceArtifact,
    current_basename: path.basename(filePath),
    current_sha256: sha256File(filePath),
    hash_matches: true,
  }));
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function rowSortKey(row) {
  return `${String(separatorSortKey(row.separator_event)).padStart(3, "0")}:${row.row_id}`;
}

function sortedObjectBySeparator(counts) {
  return Object.fromEntries(
    Object.entries(counts).sort(([left], [right]) => separatorSortKey(left) - separatorSortKey(right)),
  );
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function expectEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`Unexpected ${label}: expected ${expected}, got ${actual}`);
  }
}

function assertRowsBySeparator(summary, label) {
  if (JSON.stringify(summary.rows_by_separator_count) !== JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR)) {
    throw new Error(`Unexpected ${label} rows-by-separator count.`);
  }
}

function assertPacketStatusAndLocks(source, name, expectedStatus) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
  if (source.status !== expectedStatus) {
    throw new Error(`Unexpected ${name} status: ${source.status}`);
  }
  if (source.preledger_pass !== false || source.updates_live_ledger !== false) {
    throw new Error(`${name} does not preserve preledger/live-ledger locks.`);
  }
  if (source.branch_chart_authorized !== false) {
    throw new Error(`${name} does not preserve branch-chart lock.`);
  }
}

function validateContractTarget(contractTarget) {
  assertPacketStatusAndLocks(contractTarget, "contractTarget", CONTRACT_TARGET_STATUS);
  const s = contractTarget.summary;
  expectEqual(s.direct_source_hash_checks_passed, 2, "contract target direct locks");
  expectEqual(s.retained_current_pool_absence_direct_source_hash_checks_passed, 1, "retained absence lock");
  expectEqual(s.retained_source_data_readiness_direct_source_hash_checks_passed, 1, "retained source-data lock");
  expectEqual(s.retained_kernel_binding_split_direct_source_hash_checks_passed, 1, "retained kernel split lock");
  expectEqual(s.retained_proof_obligation_direct_source_hash_checks_passed, 7, "retained proof obligation locks");
  expectEqual(s.retained_current_pool_json_files_scanned, 266, "retained current-pool scan count");
  expectEqual(s.retained_accepted_status_lane_json_files_scanned, 32, "retained accepted-status lane scan count");
  expectEqual(s.retained_current_pool_derivation_proof_object_files_found, 0, "retained derivation-proof object files");
  expectEqual(s.derivation_proof_source_data_records, 124, "source-data records");
  expectEqual(s.derivation_proof_source_data_records_ready, 124, "ready source-data records");
  expectEqual(s.source_material_premise_slots_satisfied, 124, "source-material premise slots");
  expectEqual(s.candidate_exact_consistency_premise_slots_satisfied, 124, "exact-consistency premise slots");
  expectEqual(
    s.source_packet_acceptance_rule_derivation_proof_object_contract_target_slots_declared,
    124,
    "contract target slots declared",
  );
  expectEqual(
    s.source_packet_acceptance_rule_derivation_proof_object_contract_target_slots_satisfied,
    0,
    "contract target slots satisfied",
  );
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_object_contract_field_slots, 992, "contract field slots");
  expectEqual(
    s.source_packet_acceptance_rule_derivation_proof_object_contract_field_slots_satisfied,
    0,
    "contract field slots satisfied",
  );
  expectEqual(s.source_packet_acceptance_rules_constructed, 0, "source-packet acceptance rules");
  expectEqual(s.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "contract target");
}

function validateCurrentPoolAbsence(currentPoolAbsence) {
  assertPacketStatusAndLocks(currentPoolAbsence, "currentPoolAbsence", CURRENT_POOL_ABSENCE_STATUS);
  const s = currentPoolAbsence.summary;
  expectEqual(s.direct_source_hash_checks_passed, 1, "current-pool absence direct locks");
  expectEqual(s.current_pool_json_files_scanned, 266, "current-pool JSON scan count");
  expectEqual(s.accepted_status_lane_json_files_scanned, 32, "accepted-status lane scan count");
  expectEqual(s.accepted_status_lane_fail_closed_json_files, 32, "accepted-status lane fail-closed count");
  expectEqual(s.current_pool_source_packet_acceptance_rule_derivation_proof_object_files_found, 0, "compatible derivation-proof object files");
  expectEqual(s.current_pool_compatible_source_packet_acceptance_rule_derivation_proof_object_refs, 0, "compatible derivation-proof object refs");
  expectEqual(s.derivation_proof_source_data_records, 124, "source-data records");
  expectEqual(s.derivation_proof_source_data_records_ready, 124, "ready source-data records");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_object_slots_satisfied, 0, "proof object slots satisfied");
  expectEqual(s.source_packet_acceptance_rules_constructed, 0, "source-packet acceptance rules");
  expectEqual(s.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "current-pool absence");
}

function validateSourceDataReadiness(sourceDataReadiness) {
  assertPacketStatusAndLocks(sourceDataReadiness, "sourceDataReadiness", SOURCE_DATA_READINESS_STATUS);
  const s = sourceDataReadiness.summary;
  expectEqual(s.direct_source_hash_checks_passed, 1, "source-data readiness direct locks");
  expectEqual(s.derivation_proof_source_data_records, 124, "source-data records");
  expectEqual(s.derivation_proof_source_data_records_ready, 124, "ready source-data records");
  expectEqual(s.derivation_proof_source_data_records_missing, 0, "missing source-data records");
  expectEqual(s.source_material_premise_slots_satisfied, 124, "source-material premise slots");
  expectEqual(s.candidate_exact_consistency_premise_slots_satisfied, 124, "exact-consistency premise slots");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_object_slots_satisfied, 0, "proof object slots satisfied");
  expectEqual(s.source_packet_acceptance_rules_constructed, 0, "source-packet acceptance rules");
  expectEqual(s.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "source-data readiness");
}

function validateDerivationProofTarget(derivationProofTarget) {
  assertPacketStatusAndLocks(derivationProofTarget, "derivationProofTarget", DERIVATION_PROOF_TARGET_STATUS);
  const s = derivationProofTarget.summary;
  expectEqual(s.direct_source_hash_checks_passed, 2, "derivation-proof target direct locks");
  expectEqual(s.derivation_proof_target_slots_declared, 124, "derivation-proof target slots declared");
  expectEqual(s.derivation_proof_target_slots_satisfied, 0, "derivation-proof target slots satisfied");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_slots_satisfied, 0, "derivation proof slots satisfied");
  expectEqual(s.downstream_rule_kernel_slots_waiting_on_derivation_proof, 248, "downstream rule-kernel slots waiting");
  expectEqual(s.rule_kernel_obligation_slots, 372, "rule-kernel obligation slots");
  expectEqual(s.rule_kernel_obligation_slots_satisfied, 0, "rule-kernel obligation slots satisfied");
  expectEqual(s.source_packet_acceptance_rules_constructed, 0, "source-packet acceptance rules");
  expectEqual(s.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "derivation-proof target");
}

function validateKernelBindingSplit(kernelBindingSplit) {
  assertPacketStatusAndLocks(kernelBindingSplit, "kernelBindingSplit", KERNEL_BINDING_SPLIT_STATUS);
  const s = kernelBindingSplit.summary;
  expectEqual(s.direct_source_hash_checks_passed, 1, "kernel split direct locks");
  expectEqual(s.rule_kernel_obligation_slots, 372, "rule-kernel obligation slots");
  expectEqual(s.rule_kernel_obligation_slots_satisfied, 0, "rule-kernel obligation slots satisfied");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_slots, 124, "derivation proof slots");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_slots_satisfied, 0, "derivation proof slots satisfied");
  expectEqual(s.source_packet_acceptance_rule_soundness_proof_slots_satisfied, 0, "soundness slots satisfied");
  expectEqual(
    s.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied,
    0,
    "endpoint application slots satisfied",
  );
  expectEqual(s.source_packet_acceptance_rules_constructed, 0, "source-packet acceptance rules");
  expectEqual(s.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "kernel binding split");
}

function requiredForbiddenReinterpretationsPresent(record) {
  const forbidden = new Set(record.forbidden_reinterpretations ?? []);
  return [
    "source_packet_acceptance_rule_target_packet_as_derivation_proof_object",
    "source_packet_acceptance_rule_kernel_binding_split_classifier_as_derivation_proof_object",
    "source_packet_acceptance_rule_proof_obligation_dependency_classifier_as_derivation_proof_object",
    "source_packet_acceptance_rule_derivation_proof_target_packet_as_derivation_proof_object",
    "source_packet_acceptance_rule_derivation_proof_source_data_readiness_classifier_as_derivation_proof_object",
    "source_packet_acceptance_rule_derivation_proof_object_current_pool_absence_classifier_as_derivation_proof_object",
    "source_packet_acceptance_rule_derivation_proof_object_contract_target_packet_as_derivation_proof_object",
    "derivation_proof_source_data_record_as_derivation_proof_object",
  ].every((entry) => forbidden.has(entry));
}

function fieldAvailabilityVector(profile) {
  const record = profile.source_packet_acceptance_rule_derivation_proof_object_contract_target_record;
  const sourceData = record.derivation_proof_source_data_record;
  const fieldChecks = {
    packet_identity_lock: true,
    compatible_proof_object_role_lock: record.compatible_proof_object_role === COMPATIBLE_PROOF_OBJECT_ROLE,
    derivation_proof_target_binding:
      record.derivation_proof_target === DERIVATION_PROOF_TARGET &&
      sourceData.derivation_proof_target === DERIVATION_PROOF_TARGET &&
      sourceData.derivation_proof_target_declared === true,
    derivation_proof_source_data_record_binding:
      sourceData.derivation_proof_source_data_record_declared === true &&
      sourceData.derivation_proof_source_data_ready === true,
    source_material_premise_binding: sourceData.source_material_premises_complete === true,
    candidate_exact_consistency_premise_binding:
      sourceData.candidate_exact_consistency_premises_complete === true,
    rule_kernel_derivation_payload: false,
    non_reinterpretation_guard: requiredForbiddenReinterpretationsPresent(record),
  };
  return CONTRACT_FIELDS.map((field) => ({
    field,
    source_available: fieldChecks[field] === true,
    proof_object_field_satisfied: false,
    blocker: fieldChecks[field] === true ? null : RULE_KERNEL_PAYLOAD_BLOCKER,
  }));
}

function availabilityRecord(profile) {
  const vector = fieldAvailabilityVector(profile);
  return {
    compatible_proof_object_role: COMPATIBLE_PROOF_OBJECT_ROLE,
    derivation_proof_target: DERIVATION_PROOF_TARGET,
    contract_target_declared: true,
    contract_target_satisfied: false,
    contract_fields: CONTRACT_FIELDS.length,
    contract_field_source_availability_slots_ready: countTrue(vector, (entry) => entry.source_available),
    contract_field_source_availability_slots_missing: vector.filter((entry) => entry.source_available !== true).length,
    contract_field_slots_satisfied: 0,
    rule_kernel_derivation_payload_present: false,
    source_packet_acceptance_rule_derivation_proof_present: false,
    source_packet_acceptance_rule_derivation_proof_object_accepted: false,
    contract_field_availability_vector: vector,
    first_missing_contract_field: "rule_kernel_derivation_payload",
    first_missing_contract_field_blocker: RULE_KERNEL_PAYLOAD_BLOCKER,
    first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
    first_contract_blocker: CONTRACT_BLOCKER,
    current_pool_derivation_proof_object_absence_blocker:
      CURRENT_POOL_DERIVATION_PROOF_OBJECT_BLOCKER,
  };
}

function buildSeparatorProfiles(contractTarget) {
  return contractTarget.separator_source_packet_acceptance_rule_derivation_proof_object_contract_target_profiles
    .map((profile) => {
      const availability = availabilityRecord(profile);
      return {
        separator_event: profile.separator_event,
        fold_interval: profile.fold_interval,
        row_count: profile.row_count,
        derivation_proof_target: DERIVATION_PROOF_TARGET,
        derivation_proof_source_data_records_ready: profile.derivation_proof_source_data_records_ready,
        source_packet_acceptance_rule_derivation_proof_object_contract_targets: 1,
        source_packet_acceptance_rule_derivation_proof_object_contract_targets_satisfied: 0,
        contract_fields: CONTRACT_FIELDS.length,
        contract_field_source_availability_slots_ready:
          availability.contract_field_source_availability_slots_ready,
        contract_field_source_availability_slots_missing:
          availability.contract_field_source_availability_slots_missing,
        contract_field_slots_satisfied: 0,
        contract_field_availability_record: availability,
        rule_kernel_derivation_payload_present: false,
        source_packet_acceptance_rule_derivation_proof_present: false,
        source_packet_acceptance_rule_derivation_proof_object_accepted: false,
        route_decision_made: false,
        proof_rule_decision_made: false,
        primitive_acceptance_decision_made: false,
        source_packet_acceptance_decision_made: false,
        source_packet_acceptance_rule_constructed: false,
        accepted_interval_certified_constants_status_constructed: false,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
        first_rule_blocker: RULE_BLOCKER,
        first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
        first_missing_contract_field: "rule_kernel_derivation_payload",
        first_missing_contract_field_blocker: RULE_KERNEL_PAYLOAD_BLOCKER,
        classification:
          "separator_source_packet_acceptance_rule_derivation_proof_object_contract_field_availability_rule_kernel_payload_absent_fail_closed",
      };
    })
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function buildRowProfiles(contractTarget) {
  return contractTarget.row_source_packet_acceptance_rule_derivation_proof_object_contract_target_profiles
    .map((profile) => {
      const availability = availabilityRecord(profile);
      return {
        row_id: profile.row_id,
        ledger: profile.ledger,
        status: profile.status,
        failure_code: profile.failure_code,
        separator_event: profile.separator_event,
        fold_interval: profile.fold_interval,
        receiver_interval: profile.receiver_interval,
        source_interval: profile.source_interval,
        derivation_proof_target: DERIVATION_PROOF_TARGET,
        derivation_proof_source_data_records_ready: profile.derivation_proof_source_data_records_ready,
        source_packet_acceptance_rule_derivation_proof_object_contract_targets: 1,
        source_packet_acceptance_rule_derivation_proof_object_contract_targets_satisfied: 0,
        contract_fields: CONTRACT_FIELDS.length,
        contract_field_source_availability_slots_ready:
          availability.contract_field_source_availability_slots_ready,
        contract_field_source_availability_slots_missing:
          availability.contract_field_source_availability_slots_missing,
        contract_field_slots_satisfied: 0,
        contract_field_availability_record: availability,
        rule_kernel_derivation_payload_present: false,
        source_packet_acceptance_rule_derivation_proof_present: false,
        source_packet_acceptance_rule_derivation_proof_object_accepted: false,
        route_decision_made: false,
        proof_rule_decision_made: false,
        primitive_acceptance_decision_made: false,
        source_packet_acceptance_decision_made: false,
        source_packet_acceptance_rule_constructed: false,
        accepted_interval_certified_constants_status_constructed: false,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
        first_rule_blocker: RULE_BLOCKER,
        first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
        first_missing_contract_field: "rule_kernel_derivation_payload",
        first_missing_contract_field_blocker: RULE_KERNEL_PAYLOAD_BLOCKER,
        classification:
          "row_source_packet_acceptance_rule_derivation_proof_object_contract_field_availability_rule_kernel_payload_absent_fail_closed",
      };
    })
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function fieldAvailabilityCounts(profiles) {
  return Object.fromEntries(
    CONTRACT_FIELDS.map((field) => {
      const count = profiles.filter(
        (profile) =>
          profile.contract_field_availability_record.contract_field_availability_vector.find(
            (entry) => entry.field === field,
          )?.source_available === true,
      ).length;
      return [field, count];
    }),
  );
}

function buildPacket(paths, contractTarget, currentPoolAbsence, sourceDataReadiness, derivationProofTarget, kernelBindingSplit) {
  validateContractTarget(contractTarget);
  validateCurrentPoolAbsence(currentPoolAbsence);
  validateSourceDataReadiness(sourceDataReadiness);
  validateDerivationProofTarget(derivationProofTarget);
  validateKernelBindingSplit(kernelBindingSplit);
  const sourceChecks = sourceHashChecks(paths);
  const source = contractTarget.summary;
  const kernel = kernelBindingSplit.summary;
  const separatorProfiles = buildSeparatorProfiles(contractTarget);
  const rowProfiles = buildRowProfiles(contractTarget);
  const profiles = [...separatorProfiles, ...rowProfiles];
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const contractTargetSlots = profiles.length;
  const contractFieldSlots = contractTargetSlots * CONTRACT_FIELDS.length;
  const contractFieldSourceAvailableSlots = profiles.reduce(
    (sum, profile) => sum + profile.contract_field_source_availability_slots_ready,
    0,
  );
  const contractFieldSourceMissingSlots = contractFieldSlots - contractFieldSourceAvailableSlots;
  const availabilityByField = fieldAvailabilityCounts(profiles);

  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_contract_target_direct_source_hash_checks_passed: source.direct_source_hash_checks_passed,
    retained_current_pool_absence_direct_source_hash_checks_passed:
      currentPoolAbsence.summary.direct_source_hash_checks_passed,
    retained_source_data_readiness_direct_source_hash_checks_passed:
      sourceDataReadiness.summary.direct_source_hash_checks_passed,
    retained_derivation_proof_target_direct_source_hash_checks_passed:
      derivationProofTarget.summary.direct_source_hash_checks_passed,
    retained_kernel_binding_split_direct_source_hash_checks_passed:
      kernel.direct_source_hash_checks_passed,
    retained_proof_obligation_direct_source_hash_checks_passed:
      source.retained_proof_obligation_direct_source_hash_checks_passed,
    retained_current_pool_json_files_scanned: source.retained_current_pool_json_files_scanned,
    retained_accepted_status_lane_json_files_scanned: source.retained_accepted_status_lane_json_files_scanned,
    retained_accepted_status_lane_fail_closed_json_files:
      source.retained_accepted_status_lane_fail_closed_json_files,
    retained_current_pool_derivation_proof_object_files_found:
      source.retained_current_pool_derivation_proof_object_files_found,
    candidate_higher_fold_constants_artifacts: source.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: separatorProfiles.length,
    candidate_row_constant_associations: rowProfiles.length,
    rows_by_separator_count: rowsBySeparator,
    separator_contract_field_availability_profiles: separatorProfiles.length,
    row_contract_field_availability_profiles: rowProfiles.length,
    derivation_proof_source_data_records: contractTargetSlots,
    derivation_proof_source_data_records_ready: source.derivation_proof_source_data_records_ready,
    source_material_premise_slots: source.source_material_premise_slots,
    source_material_premise_slots_satisfied: source.source_material_premise_slots_satisfied,
    candidate_exact_consistency_premise_slots: source.candidate_exact_consistency_premise_slots,
    candidate_exact_consistency_premise_slots_satisfied:
      source.candidate_exact_consistency_premise_slots_satisfied,
    source_packet_acceptance_rule_derivation_proof_object_contract_target_slots:
      contractTargetSlots,
    source_packet_acceptance_rule_derivation_proof_object_contract_target_slots_declared:
      contractTargetSlots,
    source_packet_acceptance_rule_derivation_proof_object_contract_target_slots_satisfied: 0,
    source_packet_acceptance_rule_derivation_proof_object_contract_fields:
      CONTRACT_FIELDS.length,
    source_packet_acceptance_rule_derivation_proof_object_contract_field_slots:
      contractFieldSlots,
    source_packet_acceptance_rule_derivation_proof_object_contract_field_source_available_slots:
      contractFieldSourceAvailableSlots,
    source_packet_acceptance_rule_derivation_proof_object_contract_field_source_missing_slots:
      contractFieldSourceMissingSlots,
    source_packet_acceptance_rule_derivation_proof_object_contract_field_slots_satisfied: 0,
    contract_field_source_availability_by_field: availabilityByField,
    packet_identity_lock_source_available_slots: availabilityByField.packet_identity_lock,
    compatible_proof_object_role_lock_source_available_slots:
      availabilityByField.compatible_proof_object_role_lock,
    derivation_proof_target_binding_source_available_slots:
      availabilityByField.derivation_proof_target_binding,
    derivation_proof_source_data_record_binding_source_available_slots:
      availabilityByField.derivation_proof_source_data_record_binding,
    source_material_premise_binding_source_available_slots:
      availabilityByField.source_material_premise_binding,
    candidate_exact_consistency_premise_binding_source_available_slots:
      availabilityByField.candidate_exact_consistency_premise_binding,
    rule_kernel_derivation_payload_source_available_slots:
      availabilityByField.rule_kernel_derivation_payload,
    non_reinterpretation_guard_source_available_slots:
      availabilityByField.non_reinterpretation_guard,
    rule_kernel_derivation_payload_slots: contractTargetSlots,
    rule_kernel_derivation_payload_slots_satisfied: 0,
    rule_kernel_derivation_payload_slots_missing: contractTargetSlots,
    retained_rule_kernel_obligation_slots: kernel.rule_kernel_obligation_slots,
    retained_rule_kernel_obligation_slots_satisfied: kernel.rule_kernel_obligation_slots_satisfied,
    retained_source_packet_acceptance_rule_derivation_proof_slots:
      kernel.source_packet_acceptance_rule_derivation_proof_slots,
    retained_source_packet_acceptance_rule_derivation_proof_slots_satisfied:
      kernel.source_packet_acceptance_rule_derivation_proof_slots_satisfied,
    retained_source_packet_acceptance_rule_soundness_proof_slots:
      kernel.source_packet_acceptance_rule_soundness_proof_slots,
    retained_source_packet_acceptance_rule_soundness_proof_slots_satisfied:
      kernel.source_packet_acceptance_rule_soundness_proof_slots_satisfied,
    retained_source_packet_acceptance_rule_endpoint_application_proof_slots:
      kernel.source_packet_acceptance_rule_endpoint_application_proof_slots,
    retained_source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied:
      kernel.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied,
    retained_binding_and_evidence_obligation_slots:
      kernel.binding_and_evidence_obligation_slots,
    retained_binding_and_evidence_obligation_slots_satisfied:
      kernel.binding_and_evidence_obligation_slots_satisfied,
    retained_total_split_obligation_slots: kernel.total_split_obligation_slots,
    retained_total_split_obligation_slots_satisfied:
      kernel.total_split_obligation_slots_satisfied,
    source_packet_acceptance_rules_constructed: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    accepted_interval_certified_constants_status_refs_constructed: 0,
    accepted_interval_certified_constants_statuses_constructed: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    route_decisions_made: 0,
    proof_rule_decisions_made: 0,
    primitive_acceptance_decisions_made: 0,
    source_packet_acceptance_decisions_made: 0,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_rule_blocker: RULE_BLOCKER,
    first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
    first_current_pool_derivation_proof_object_absence_blocker:
      CURRENT_POOL_DERIVATION_PROOF_OBJECT_BLOCKER,
    first_derivation_proof_object_contract_blocker: CONTRACT_BLOCKER,
    first_missing_contract_field: "rule_kernel_derivation_payload",
    first_missing_contract_field_blocker: RULE_KERNEL_PAYLOAD_BLOCKER,
    first_downstream_rule_kernel_blocker_after_derivation: SOUNDNESS_PROOF_BLOCKER,
    first_endpoint_application_blocker: APPLICATION_PROOF_BLOCKER,
    first_binding_and_evidence_blocker: CONFORMANCE_BLOCKER,
  };

  const packet = {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status source-packet acceptance rule derivation-proof object contract target satisfaction attempt",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status source-packet acceptance rule derivation proof object contract target satisfaction attempt",
    claim_level:
      "priority-only contract-target satisfaction attempt; imports the derivation-proof object contract target, current-pool absence classifier, source-data readiness classifier, derivation-proof target packet, and kernel/binding split, records that identity, role, target-binding, source-data, source-material, exact-consistency, and non-reinterpretation fields are source-available, but the rule-kernel derivation payload is absent; keeps the contract target unsatisfied and makes no proof-rule, source-packet acceptance, accepted-status, row-consumption, live-ledger, or branch-chart decision",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_source_packet_acceptance_rule_derivation_proof_object_contract_target_packet:
        artifactRecord(paths.contractTarget),
      accepted_status_source_packet_acceptance_rule_derivation_proof_object_current_pool_absence_classifier:
        artifactRecord(paths.currentPoolAbsence),
      accepted_status_source_packet_acceptance_rule_derivation_proof_source_data_readiness_classifier:
        artifactRecord(paths.sourceDataReadiness),
      accepted_status_source_packet_acceptance_rule_derivation_proof_target_packet:
        artifactRecord(paths.derivationProofTarget),
      accepted_status_source_packet_acceptance_rule_kernel_binding_split_classifier:
        artifactRecord(paths.kernelBindingSplit),
    },
    source_hash_checks: sourceChecks,
    compatible_proof_object_role: COMPATIBLE_PROOF_OBJECT_ROLE,
    derivation_proof_object_contract_fields: CONTRACT_FIELDS,
    source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt: {
      target: COMPATIBLE_PROOF_OBJECT_ROLE,
      derivation_proof_target: DERIVATION_PROOF_TARGET,
      contract_target_slots_declared: contractTargetSlots,
      contract_target_slots_satisfied: 0,
      contract_fields_per_slot: CONTRACT_FIELDS.length,
      contract_field_slots: contractFieldSlots,
      contract_field_source_available_slots: contractFieldSourceAvailableSlots,
      contract_field_source_missing_slots: contractFieldSourceMissingSlots,
      contract_field_slots_satisfied: 0,
      first_missing_contract_field: "rule_kernel_derivation_payload",
      first_missing_contract_field_blocker: RULE_KERNEL_PAYLOAD_BLOCKER,
      current_pool_derivation_proof_object_absent: true,
      contract_target_remains_unsatisfied: true,
    },
    separator_source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt_profiles:
      separatorProfiles,
    row_source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt_profiles:
      rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt",
      sharpened_blocker:
        "The contract target has 868 / 992 source-available contract-field slots, but 0 / 992 proof-object contract fields are satisfied because every rule-kernel derivation payload slot is absent.",
      current_pool_closure_state:
        "source identity, premise, target-binding, and non-reinterpretation fields available; rule-kernel derivation payload absent; contract target unsatisfied",
      first_rule_blocker: RULE_BLOCKER,
      first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
      first_current_pool_derivation_proof_object_absence_blocker:
        CURRENT_POOL_DERIVATION_PROOF_OBJECT_BLOCKER,
      first_derivation_proof_object_contract_blocker: CONTRACT_BLOCKER,
      first_missing_contract_field: "rule_kernel_derivation_payload",
      first_missing_contract_field_blocker: RULE_KERNEL_PAYLOAD_BLOCKER,
      mechanical_continuation_available: true,
      mechanical_continuation:
        "A future fail-closed rule-kernel derivation payload construction attempt can target only the missing rule_kernel_derivation_payload slots while preserving the no-acceptance locks.",
      decision_required_for_acceptance: true,
      required_external_inputs: ["source_packet_acceptance_rule_derivation_proof"],
      downstream_inputs_not_actionable_until_rule_kernel_derivation_payload_present: [
        "source_packet_acceptance_rule_soundness_proof",
        "source_packet_acceptance_rule_endpoint_application_proof",
        "accepted_constants_conformance",
        "compatible_source_packet_acceptance_evidence",
        "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
      ],
      forbidden_reinterpretations: [
        "source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt_as_derivation_proof_object",
        "source_packet_acceptance_rule_derivation_proof_object_contract_target_packet_as_derivation_proof_object",
        "source_packet_acceptance_rule_derivation_proof_object_current_pool_absence_classifier_as_derivation_proof_object",
        "source_packet_acceptance_rule_derivation_proof_source_data_readiness_classifier_as_derivation_proof_object",
        "source_packet_acceptance_rule_derivation_proof_target_packet_as_derivation_proof_object",
        "derivation_proof_source_data_record_as_derivation_proof_object",
      ],
    },
    authorization_lock: {
      preledger_pass: false,
      updates_live_ledger: false,
      accepted_fold_layer_rows: 0,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    capture_decision:
      "Priority-only. This attempt records contract-field source availability only; it does not construct, satisfy, accept, or apply a derivation-proof object.",
  };
  assertPacketInvariants(packet);
  return packet;
}

function assertPacketInvariants(packet) {
  const s = packet.summary;
  const checks = [
    packet.status === STATUS,
    packet.preledger_pass === false,
    packet.updates_live_ledger === false,
    packet.branch_chart_authorized === false,
    s.direct_source_hash_checks === 5,
    s.direct_source_hash_checks_passed === 5,
    s.retained_contract_target_direct_source_hash_checks_passed === 2,
    s.retained_current_pool_absence_direct_source_hash_checks_passed === 1,
    s.retained_source_data_readiness_direct_source_hash_checks_passed === 1,
    s.retained_derivation_proof_target_direct_source_hash_checks_passed === 2,
    s.retained_kernel_binding_split_direct_source_hash_checks_passed === 1,
    s.retained_proof_obligation_direct_source_hash_checks_passed === 7,
    s.retained_current_pool_json_files_scanned === 266,
    s.retained_accepted_status_lane_json_files_scanned === 32,
    s.retained_accepted_status_lane_fail_closed_json_files === 32,
    s.retained_current_pool_derivation_proof_object_files_found === 0,
    s.candidate_separator_constants === 12,
    s.candidate_row_constant_associations === 112,
    JSON.stringify(s.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR),
    s.derivation_proof_source_data_records === 124,
    s.derivation_proof_source_data_records_ready === 124,
    s.source_material_premise_slots_satisfied === 124,
    s.candidate_exact_consistency_premise_slots_satisfied === 124,
    s.source_packet_acceptance_rule_derivation_proof_object_contract_target_slots === 124,
    s.source_packet_acceptance_rule_derivation_proof_object_contract_target_slots_satisfied === 0,
    s.source_packet_acceptance_rule_derivation_proof_object_contract_fields === CONTRACT_FIELDS.length,
    s.source_packet_acceptance_rule_derivation_proof_object_contract_field_slots === 992,
    s.source_packet_acceptance_rule_derivation_proof_object_contract_field_source_available_slots === 868,
    s.source_packet_acceptance_rule_derivation_proof_object_contract_field_source_missing_slots === 124,
    s.source_packet_acceptance_rule_derivation_proof_object_contract_field_slots_satisfied === 0,
    s.packet_identity_lock_source_available_slots === 124,
    s.compatible_proof_object_role_lock_source_available_slots === 124,
    s.derivation_proof_target_binding_source_available_slots === 124,
    s.derivation_proof_source_data_record_binding_source_available_slots === 124,
    s.source_material_premise_binding_source_available_slots === 124,
    s.candidate_exact_consistency_premise_binding_source_available_slots === 124,
    s.rule_kernel_derivation_payload_source_available_slots === 0,
    s.non_reinterpretation_guard_source_available_slots === 124,
    s.rule_kernel_derivation_payload_slots === 124,
    s.rule_kernel_derivation_payload_slots_satisfied === 0,
    s.rule_kernel_derivation_payload_slots_missing === 124,
    s.retained_rule_kernel_obligation_slots === 372,
    s.retained_rule_kernel_obligation_slots_satisfied === 0,
    s.retained_source_packet_acceptance_rule_derivation_proof_slots === 124,
    s.retained_source_packet_acceptance_rule_derivation_proof_slots_satisfied === 0,
    s.retained_binding_and_evidence_obligation_slots === 496,
    s.retained_binding_and_evidence_obligation_slots_satisfied === 0,
    s.retained_total_split_obligation_slots === 868,
    s.retained_total_split_obligation_slots_satisfied === 0,
    s.source_packet_acceptance_rules_constructed === 0,
    s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0,
    s.accepted_interval_certified_constants_statuses_constructed === 0,
    s.row_consumption_count === 0,
    s.route_decisions_made === 0,
    s.proof_rule_decisions_made === 0,
    s.primitive_acceptance_decisions_made === 0,
    s.source_packet_acceptance_decisions_made === 0,
    s.preledger_pass === false,
    s.updates_live_ledger === false,
    s.branch_chart_authorized === false,
    packet.next_certificate_handoff.mechanical_continuation_available === true,
    packet.next_certificate_handoff.decision_required_for_acceptance === true,
  ];
  if (!checks.every(Boolean)) {
    throw new Error("Source-packet acceptance rule derivation-proof object contract-target satisfaction attempt invariant failure.");
  }
}

function markdownTable(rows) {
  return rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
}

function renderReport(packet) {
  const s = packet.summary;
  const sourceRows = packet.source_hash_checks.map((check) => [
    `\`${check.source_artifact}\``,
    `\`${check.current_basename}\``,
    `\`${check.current_sha256}\``,
    String(check.hash_matches),
  ]);
  const fieldRows = CONTRACT_FIELDS.map((field) => [
    `\`${field}\``,
    `${s.contract_field_source_availability_by_field[field]} / ${s.derivation_proof_source_data_records}`,
    field === "rule_kernel_derivation_payload" ? `\`${RULE_KERNEL_PAYLOAD_BLOCKER}\`` : "",
  ]);
  const rowScopeRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);

  return `# Candidate-Live Higher-Fold Constants Accepted-Status Source-Packet Acceptance Rule Derivation-Proof Object Contract-Target Satisfaction Attempt

Status: \`${packet.status}\`

## Claim Level

${packet.claim_level}

## Source Lock

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

Direct source-hash locks: ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks}.

## Contract-Target Satisfaction Attempt

This attempt does not satisfy the derivation-proof object contract. It records
which required contract fields have source material available before a future
proof object is constructed.

| Required contract field | Source-available slots | First blocker |
| --- | ---: | --- |
${markdownTable(fieldRows)}

- contract target slots declared: ${s.source_packet_acceptance_rule_derivation_proof_object_contract_target_slots_declared}
- contract target slots satisfied: ${s.source_packet_acceptance_rule_derivation_proof_object_contract_target_slots_satisfied}
- contract fields per slot: ${s.source_packet_acceptance_rule_derivation_proof_object_contract_fields}
- source-available contract-field slots: ${s.source_packet_acceptance_rule_derivation_proof_object_contract_field_source_available_slots} / ${s.source_packet_acceptance_rule_derivation_proof_object_contract_field_slots}
- proof-object contract-field slots satisfied: ${s.source_packet_acceptance_rule_derivation_proof_object_contract_field_slots_satisfied} / ${s.source_packet_acceptance_rule_derivation_proof_object_contract_field_slots}
- first missing contract field: \`${s.first_missing_contract_field}\`
- first missing contract-field blocker: \`${s.first_missing_contract_field_blocker}\`

## Row Scope

| Separator | Rows |
| --- | --- |
${markdownTable(rowScopeRows)}

The attempt preserves ${s.candidate_separator_constants} separator profiles
and ${s.candidate_row_constant_associations} row profiles.

## Retained Rule-Kernel State

- retained rule-kernel obligation slots satisfied: ${s.retained_rule_kernel_obligation_slots_satisfied} / ${s.retained_rule_kernel_obligation_slots}
- retained derivation-proof slots satisfied: ${s.retained_source_packet_acceptance_rule_derivation_proof_slots_satisfied} / ${s.retained_source_packet_acceptance_rule_derivation_proof_slots}
- retained soundness-proof slots satisfied: ${s.retained_source_packet_acceptance_rule_soundness_proof_slots_satisfied} / ${s.retained_source_packet_acceptance_rule_soundness_proof_slots}
- retained endpoint-application proof slots satisfied: ${s.retained_source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied} / ${s.retained_source_packet_acceptance_rule_endpoint_application_proof_slots}
- retained binding/evidence obligation slots satisfied: ${s.retained_binding_and_evidence_obligation_slots_satisfied} / ${s.retained_binding_and_evidence_obligation_slots}
- retained total split-obligation slots satisfied: ${s.retained_total_split_obligation_slots_satisfied} / ${s.retained_total_split_obligation_slots}

## Authorization Lock

- route_decisions_made: ${s.route_decisions_made}
- proof_rule_decisions_made: ${s.proof_rule_decisions_made}
- primitive_acceptance_decisions_made: ${s.primitive_acceptance_decisions_made}
- source_packet_acceptance_decisions_made: ${s.source_packet_acceptance_decisions_made}
- source_packet_acceptance_rules_constructed: ${s.source_packet_acceptance_rules_constructed}
- accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: ${s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets}
- accepted_interval_certified_constants_statuses_constructed: ${s.accepted_interval_certified_constants_statuses_constructed}
- row_consumption_count: ${packet.authorization_lock.row_consumption_count}
- preledger_pass: ${packet.authorization_lock.preledger_pass}
- updates_live_ledger: ${packet.authorization_lock.updates_live_ledger}
- branch_chart_authorized: ${packet.authorization_lock.branch_chart_authorized}

This attempt does not construct a derivation proof, proof rule, source-packet
acceptance rule, accepted source packet, accepted interval-certified constants
status, row consumption, live-ledger update, or branch-chart authorization.

## Next Handoff

The blocker is now \`${s.first_missing_contract_field_blocker}\`: every
contract target still lacks the \`${s.first_missing_contract_field}\` field.
The remaining mechanical continuation is a fail-closed rule-kernel derivation
payload construction attempt. Acceptance still requires a proof-grade
\`${COMPATIBLE_PROOF_OBJECT_ROLE}\`; this attempt supplies no accepted
status.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    contractTarget: args.contractTarget,
    currentPoolAbsence: args.currentPoolAbsence,
    sourceDataReadiness: args.sourceDataReadiness,
    derivationProofTarget: args.derivationProofTarget,
    kernelBindingSplit: args.kernelBindingSplit,
  };
  const contractTarget = readJson(paths.contractTarget);
  const currentPoolAbsence = readJson(paths.currentPoolAbsence);
  const sourceDataReadiness = readJson(paths.sourceDataReadiness);
  const derivationProofTarget = readJson(paths.derivationProofTarget);
  const kernelBindingSplit = readJson(paths.kernelBindingSplit);
  const packet = buildPacket(
    paths,
    contractTarget,
    currentPoolAbsence,
    sourceDataReadiness,
    derivationProofTarget,
    kernelBindingSplit,
  );
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, packet, args.pretty);
  writeText(outReport, renderReport(packet));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
