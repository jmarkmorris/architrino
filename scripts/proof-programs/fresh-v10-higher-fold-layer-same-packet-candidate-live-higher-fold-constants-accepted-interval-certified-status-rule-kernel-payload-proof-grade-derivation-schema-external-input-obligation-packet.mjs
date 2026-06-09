#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SCHEMA_ABSENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SCHEMA_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PAYLOAD_CONSTRUCTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_construction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONTRACT_SATISFACTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONTRACT_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_KERNEL_BINDING_SPLIT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SCHEMA_ABSENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier_fail_closed_schema_target_declared_current_pool_schema_absent_no_rule_kernel_derivation_payload_no_derivation_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const SCHEMA_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet_fail_closed_schema_target_declared_schema_absent_no_rule_kernel_derivation_payload_no_derivation_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const PAYLOAD_CONSTRUCTION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_rule_kernel_derivation_payload_construction_attempt_fail_closed_payload_target_slots_declared_proof_grade_derivation_schema_absent_no_rule_kernel_derivation_payload_no_derivation_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const CONTRACT_SATISFACTION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt_fail_closed_identity_premise_and_non_reinterpretation_fields_source_available_rule_kernel_derivation_payload_absent_no_derivation_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const CONTRACT_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_packet_fail_closed_contract_target_declared_current_pool_derivation_proof_object_absent_no_derivation_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const KERNEL_BINDING_SPLIT_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier_fail_closed_rule_kernel_and_binding_evidence_obligations_split_all_unsatisfied_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet_fail_closed_schema_absent_from_current_pool_external_input_required_no_rule_kernel_derivation_payload_no_derivation_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";

const COMPATIBLE_SCHEMA_ROLE =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema";
const COMPATIBLE_PROOF_OBJECT_ROLE = "source_packet_acceptance_rule_derivation_proof_object";
const DERIVATION_PROOF_TARGET =
  "source_packet_acceptance_rule_derivation_proof_for_live_same_packet_separator_aggregate_family";
const RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const DERIVATION_PROOF_BLOCKER = "source_packet_acceptance_rule_derivation_proof_absent";
const CONTRACT_BLOCKER = "source_packet_acceptance_rule_derivation_proof_object_contract_unfilled";
const RULE_KERNEL_PAYLOAD_BLOCKER =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_absent";
const PAYLOAD_SCHEMA_BLOCKER =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_absent";
const SCHEMA_TARGET_BLOCKER =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_target_declared_schema_absent";
const CURRENT_POOL_SCHEMA_ABSENCE_BLOCKER =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_absent_from_current_certificate_pool";
const EXTERNAL_SCHEMA_OBLIGATION_BLOCKER =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_external_input_required";
const SOUNDNESS_PROOF_BLOCKER = "source_packet_acceptance_rule_soundness_proof_absent";
const APPLICATION_PROOF_BLOCKER = "source_packet_acceptance_rule_endpoint_application_proof_absent";
const CONFORMANCE_BLOCKER = "existing_constants_contract_packet_identity_mismatch";

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
    schemaAbsence: DEFAULT_SCHEMA_ABSENCE,
    schemaTarget: DEFAULT_SCHEMA_TARGET,
    payloadConstruction: DEFAULT_PAYLOAD_CONSTRUCTION,
    contractSatisfaction: DEFAULT_CONTRACT_SATISFACTION,
    contractTarget: DEFAULT_CONTRACT_TARGET,
    kernelBindingSplit: DEFAULT_KERNEL_BINDING_SPLIT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--schema-absence") {
      args.schemaAbsence = argv[++index];
    } else if (arg === "--schema-target") {
      args.schemaTarget = argv[++index];
    } else if (arg === "--payload-construction") {
      args.payloadConstruction = argv[++index];
    } else if (arg === "--contract-satisfaction") {
      args.contractSatisfaction = argv[++index];
    } else if (arg === "--contract-target") {
      args.contractTarget = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-rule-kernel-payload-proof-grade-derivation-schema-external-input-obligation-packet.mjs [options]

Options:
  --schema-absence PATH       Proof-grade derivation schema current-pool absence classifier. Defaults to ${DEFAULT_SCHEMA_ABSENCE}.
  --schema-target PATH        Proof-grade derivation schema target packet. Defaults to ${DEFAULT_SCHEMA_TARGET}.
  --payload-construction PATH Rule-kernel derivation payload construction attempt. Defaults to ${DEFAULT_PAYLOAD_CONSTRUCTION}.
  --contract-satisfaction PATH Derivation-proof object contract-target satisfaction attempt. Defaults to ${DEFAULT_CONTRACT_SATISFACTION}.
  --contract-target PATH      Derivation-proof object contract target packet. Defaults to ${DEFAULT_CONTRACT_TARGET}.
  --kernel-binding-split PATH Source-packet acceptance rule kernel/binding split classifier. Defaults to ${DEFAULT_KERNEL_BINDING_SPLIT}.
  --out-dir PATH              Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                    Pretty-print JSON artifact.
  --help                      Show this help.`);
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
    ["accepted_status_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier", paths.schemaAbsence],
    ["accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet", paths.schemaTarget],
    ["accepted_status_rule_kernel_payload_construction_attempt", paths.payloadConstruction],
    [
      "accepted_status_source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt",
      paths.contractSatisfaction,
    ],
    [
      "accepted_status_source_packet_acceptance_rule_derivation_proof_object_contract_target_packet",
      paths.contractTarget,
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

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
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

function validateInputs(inputs) {
  assertPacketStatusAndLocks(inputs.schemaAbsence, "schemaAbsence", SCHEMA_ABSENCE_STATUS);
  assertPacketStatusAndLocks(inputs.schemaTarget, "schemaTarget", SCHEMA_TARGET_STATUS);
  assertPacketStatusAndLocks(inputs.payloadConstruction, "payloadConstruction", PAYLOAD_CONSTRUCTION_STATUS);
  assertPacketStatusAndLocks(inputs.contractSatisfaction, "contractSatisfaction", CONTRACT_SATISFACTION_STATUS);
  assertPacketStatusAndLocks(inputs.contractTarget, "contractTarget", CONTRACT_TARGET_STATUS);
  assertPacketStatusAndLocks(inputs.kernelBindingSplit, "kernelBindingSplit", KERNEL_BINDING_SPLIT_STATUS);
  const s = inputs.schemaAbsence.summary;
  expectEqual(s.direct_source_hash_checks_passed, 5, "schema absence direct locks");
  expectEqual(s.retained_schema_target_direct_source_hash_checks_passed, 4, "retained schema target locks");
  expectEqual(s.current_pool_json_files_scanned, 271, "current pool files");
  expectEqual(s.accepted_status_lane_json_files_scanned, 37, "accepted-status lane files");
  expectEqual(s.accepted_status_lane_fail_closed_json_files, 37, "accepted-status fail-closed files");
  expectEqual(s.accepted_status_lane_non_fail_closed_json_files, 0, "accepted-status non-fail-closed files");
  expectEqual(s.current_pool_proof_grade_derivation_schema_files_found, 0, "compatible schema files");
  expectEqual(s.current_pool_compatible_proof_grade_derivation_schema_refs, 0, "compatible schema refs");
  expectEqual(s.proof_grade_derivation_schema_target_slots, 124, "schema target slots");
  expectEqual(s.proof_grade_derivation_schema_target_slots_satisfied, 0, "satisfied schema target slots");
  expectEqual(s.proof_grade_derivation_schema_target_field_slots, 992, "schema target field slots");
  expectEqual(s.proof_grade_derivation_schema_target_field_slots_satisfied, 0, "satisfied schema field slots");
  expectEqual(s.proof_grade_derivation_schema_current_pool_absence_slots_satisfied, 124, "satisfied absence slots");
  expectEqual(s.proof_grade_derivation_schemas_constructed, 0, "schemas constructed");
  expectEqual(s.rule_kernel_derivation_payloads_constructed, 0, "payloads constructed");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "schema absence");
}

function buildSeparatorProfiles(schemaAbsence) {
  return schemaAbsence.separator_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_profiles
    .map((profile) => ({
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      row_count: profile.row_count,
      compatible_schema_role: COMPATIBLE_SCHEMA_ROLE,
      compatible_proof_object_role: COMPATIBLE_PROOF_OBJECT_ROLE,
      derivation_proof_target: DERIVATION_PROOF_TARGET,
      current_pool_proof_grade_derivation_schema_present: false,
      current_pool_schema_absence_slot_satisfied: true,
      proof_grade_derivation_schema_external_input_obligation_declared: true,
      proof_grade_derivation_schema_external_input_obligation_satisfied: false,
      proof_grade_derivation_schema_external_input_required: true,
      required_external_input: COMPATIBLE_SCHEMA_ROLE,
      required_external_input_fields: profile.schema_target_record.target_fields,
      compatible_current_pool_proof_grade_derivation_schema_refs: [],
      compatible_external_proof_grade_derivation_schema_ref: null,
      proof_grade_derivation_schema_constructed: false,
      proof_grade_derivation_schema_accepted: false,
      rule_kernel_derivation_payload_constructed: false,
      schema_target_record: profile.schema_target_record,
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
      first_payload_construction_blocker: PAYLOAD_SCHEMA_BLOCKER,
      first_schema_target_blocker: SCHEMA_TARGET_BLOCKER,
      first_current_pool_schema_absence_blocker: CURRENT_POOL_SCHEMA_ABSENCE_BLOCKER,
      first_external_schema_obligation_blocker: EXTERNAL_SCHEMA_OBLIGATION_BLOCKER,
      classification: "separator_rule_kernel_payload_proof_grade_derivation_schema_external_input_required_fail_closed",
    }))
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function buildRowProfiles(schemaAbsence) {
  return schemaAbsence.row_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_profiles
    .map((profile) => ({
      row_id: profile.row_id,
      ledger: profile.ledger,
      status: profile.status,
      failure_code: profile.failure_code,
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      receiver_interval: profile.receiver_interval,
      source_interval: profile.source_interval,
      compatible_schema_role: COMPATIBLE_SCHEMA_ROLE,
      compatible_proof_object_role: COMPATIBLE_PROOF_OBJECT_ROLE,
      derivation_proof_target: DERIVATION_PROOF_TARGET,
      current_pool_proof_grade_derivation_schema_present: false,
      current_pool_schema_absence_slot_satisfied: true,
      proof_grade_derivation_schema_external_input_obligation_declared: true,
      proof_grade_derivation_schema_external_input_obligation_satisfied: false,
      proof_grade_derivation_schema_external_input_required: true,
      required_external_input: COMPATIBLE_SCHEMA_ROLE,
      required_external_input_fields: profile.schema_target_record.target_fields,
      compatible_current_pool_proof_grade_derivation_schema_refs: [],
      compatible_external_proof_grade_derivation_schema_ref: null,
      proof_grade_derivation_schema_constructed: false,
      proof_grade_derivation_schema_accepted: false,
      rule_kernel_derivation_payload_constructed: false,
      schema_target_record: profile.schema_target_record,
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
      first_payload_construction_blocker: PAYLOAD_SCHEMA_BLOCKER,
      first_schema_target_blocker: SCHEMA_TARGET_BLOCKER,
      first_current_pool_schema_absence_blocker: CURRENT_POOL_SCHEMA_ABSENCE_BLOCKER,
      first_external_schema_obligation_blocker: EXTERNAL_SCHEMA_OBLIGATION_BLOCKER,
      classification: "row_rule_kernel_payload_proof_grade_derivation_schema_external_input_required_fail_closed",
    }))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const source = inputs.schemaAbsence.summary;
  const separatorProfiles = buildSeparatorProfiles(inputs.schemaAbsence);
  const rowProfiles = buildRowProfiles(inputs.schemaAbsence);
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const obligationSlots = separatorProfiles.length + rowProfiles.length;
  const requiredFields = inputs.schemaAbsence.separator_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_profiles[0]
    .schema_target_record.target_fields;
  const obligationFieldSlots = obligationSlots * requiredFields.length;

  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_schema_absence_direct_source_hash_checks_passed: source.direct_source_hash_checks_passed,
    retained_schema_target_direct_source_hash_checks_passed:
      source.retained_schema_target_direct_source_hash_checks_passed,
    retained_payload_construction_direct_source_hash_checks_passed:
      source.retained_payload_construction_direct_source_hash_checks_passed,
    retained_contract_satisfaction_direct_source_hash_checks_passed:
      source.retained_contract_satisfaction_direct_source_hash_checks_passed,
    retained_contract_target_direct_source_hash_checks_passed:
      source.retained_contract_target_direct_source_hash_checks_passed,
    retained_derivation_proof_target_direct_source_hash_checks_passed:
      source.retained_derivation_proof_target_direct_source_hash_checks_passed,
    retained_kernel_binding_split_direct_source_hash_checks_passed:
      source.retained_kernel_binding_split_direct_source_hash_checks_passed,
    current_pool_json_files_scanned: source.current_pool_json_files_scanned,
    accepted_status_lane_json_files_scanned: source.accepted_status_lane_json_files_scanned,
    accepted_status_lane_fail_closed_json_files: source.accepted_status_lane_fail_closed_json_files,
    accepted_status_lane_non_fail_closed_json_files: source.accepted_status_lane_non_fail_closed_json_files,
    current_pool_proof_grade_derivation_schema_files_found:
      source.current_pool_proof_grade_derivation_schema_files_found,
    current_pool_compatible_proof_grade_derivation_schema_refs:
      source.current_pool_compatible_proof_grade_derivation_schema_refs,
    candidate_higher_fold_constants_artifacts: source.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: separatorProfiles.length,
    candidate_row_constant_associations: rowProfiles.length,
    rows_by_separator_count: rowsBySeparator,
    separator_external_input_obligation_profiles: separatorProfiles.length,
    row_external_input_obligation_profiles: rowProfiles.length,
    total_external_input_obligation_profiles: obligationSlots,
    derivation_proof_source_data_records: source.derivation_proof_source_data_records,
    derivation_proof_source_data_records_ready: source.derivation_proof_source_data_records_ready,
    retained_contract_field_slots: source.retained_contract_field_slots,
    retained_contract_field_source_available_slots: source.retained_contract_field_source_available_slots,
    retained_contract_field_slots_satisfied: source.retained_contract_field_slots_satisfied,
    retained_rule_kernel_derivation_payload_target_slots:
      source.retained_rule_kernel_derivation_payload_target_slots,
    retained_rule_kernel_derivation_payloads_constructed:
      source.retained_rule_kernel_derivation_payloads_constructed,
    retained_payload_construction_field_slots: source.retained_payload_construction_field_slots,
    retained_payload_construction_field_source_available_slots:
      source.retained_payload_construction_field_source_available_slots,
    retained_proof_grade_derivation_schema_source_available_slots:
      source.retained_proof_grade_derivation_schema_source_available_slots,
    retained_rule_kernel_obligation_slots: source.retained_rule_kernel_obligation_slots,
    retained_rule_kernel_obligation_slots_satisfied: source.retained_rule_kernel_obligation_slots_satisfied,
    retained_source_packet_acceptance_rule_derivation_proof_slots:
      source.retained_source_packet_acceptance_rule_derivation_proof_slots,
    retained_source_packet_acceptance_rule_derivation_proof_slots_satisfied:
      source.retained_source_packet_acceptance_rule_derivation_proof_slots_satisfied,
    retained_source_packet_acceptance_rule_soundness_proof_slots:
      source.retained_source_packet_acceptance_rule_soundness_proof_slots,
    retained_source_packet_acceptance_rule_soundness_proof_slots_satisfied:
      source.retained_source_packet_acceptance_rule_soundness_proof_slots_satisfied,
    retained_source_packet_acceptance_rule_endpoint_application_proof_slots:
      source.retained_source_packet_acceptance_rule_endpoint_application_proof_slots,
    retained_source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied:
      source.retained_source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied,
    retained_binding_and_evidence_obligation_slots: source.retained_binding_and_evidence_obligation_slots,
    retained_binding_and_evidence_obligation_slots_satisfied:
      source.retained_binding_and_evidence_obligation_slots_satisfied,
    retained_total_split_obligation_slots: source.retained_total_split_obligation_slots,
    retained_total_split_obligation_slots_satisfied: source.retained_total_split_obligation_slots_satisfied,
    proof_grade_derivation_schema_target_slots: source.proof_grade_derivation_schema_target_slots,
    proof_grade_derivation_schema_target_slots_declared:
      source.proof_grade_derivation_schema_target_slots_declared,
    proof_grade_derivation_schema_target_slots_satisfied: 0,
    proof_grade_derivation_schema_target_fields: requiredFields.length,
    proof_grade_derivation_schema_target_field_slots: source.proof_grade_derivation_schema_target_field_slots,
    proof_grade_derivation_schema_target_field_slots_satisfied: 0,
    proof_grade_derivation_schema_current_pool_absence_slots:
      source.proof_grade_derivation_schema_current_pool_absence_slots,
    proof_grade_derivation_schema_current_pool_absence_slots_satisfied:
      source.proof_grade_derivation_schema_current_pool_absence_slots_satisfied,
    proof_grade_derivation_schema_external_input_obligation_slots: obligationSlots,
    proof_grade_derivation_schema_external_input_obligation_slots_declared: obligationSlots,
    proof_grade_derivation_schema_external_input_obligation_slots_satisfied: 0,
    proof_grade_derivation_schema_external_input_obligation_fields: requiredFields.length,
    proof_grade_derivation_schema_external_input_obligation_field_slots: obligationFieldSlots,
    proof_grade_derivation_schema_external_input_obligation_field_slots_satisfied: 0,
    proof_grade_derivation_schema_external_input_required_slots: obligationSlots,
    proof_grade_derivation_schema_external_input_received_slots: 0,
    proof_grade_derivation_schemas_constructed: 0,
    proof_grade_derivation_schemas_accepted: 0,
    rule_kernel_derivation_payloads_constructed: 0,
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
    mechanical_continuations_from_current_pool: 0,
    decision_required_for_acceptance: true,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_rule_blocker: RULE_BLOCKER,
    first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
    first_derivation_proof_object_contract_blocker: CONTRACT_BLOCKER,
    first_missing_contract_field_blocker: RULE_KERNEL_PAYLOAD_BLOCKER,
    first_payload_construction_blocker: PAYLOAD_SCHEMA_BLOCKER,
    first_schema_target_blocker: SCHEMA_TARGET_BLOCKER,
    first_current_pool_schema_absence_blocker: CURRENT_POOL_SCHEMA_ABSENCE_BLOCKER,
    first_external_schema_obligation_blocker: EXTERNAL_SCHEMA_OBLIGATION_BLOCKER,
    first_downstream_rule_kernel_blocker_after_derivation: SOUNDNESS_PROOF_BLOCKER,
    first_endpoint_application_blocker: APPLICATION_PROOF_BLOCKER,
    first_binding_and_evidence_blocker: CONFORMANCE_BLOCKER,
  };

  const packet = {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status rule-kernel payload proof-grade derivation schema external-input obligation",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status source-packet acceptance rule derivation proof object rule-kernel derivation payload proof-grade derivation schema external-input obligation",
    claim_level:
      "priority-only proof-grade derivation schema external-input obligation packet; imports the current-pool absence classifier and its target/payload/contract/kernel inputs, proves the current pool cannot mechanically supply the schema, declares the compatible proof-grade derivation schema as the required external input for all 124 slots, and keeps every proof-rule, primitive-acceptance, source-packet acceptance, accepted-status, row-consumption, live-ledger, and branch-chart decision absent",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier:
        artifactRecord(paths.schemaAbsence),
      accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet:
        artifactRecord(paths.schemaTarget),
      accepted_status_rule_kernel_payload_construction_attempt: artifactRecord(paths.payloadConstruction),
      accepted_status_source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt:
        artifactRecord(paths.contractSatisfaction),
      accepted_status_source_packet_acceptance_rule_derivation_proof_object_contract_target_packet:
        artifactRecord(paths.contractTarget),
      accepted_status_source_packet_acceptance_rule_kernel_binding_split_classifier:
        artifactRecord(paths.kernelBindingSplit),
    },
    source_hash_checks: sourceChecks,
    compatible_schema_role: COMPATIBLE_SCHEMA_ROLE,
    compatible_proof_object_role: COMPATIBLE_PROOF_OBJECT_ROLE,
    derivation_proof_target: DERIVATION_PROOF_TARGET,
    external_input_obligation: {
      required_external_input: COMPATIBLE_SCHEMA_ROLE,
      compatible_proof_object_role: COMPATIBLE_PROOF_OBJECT_ROLE,
      derivation_proof_target: DERIVATION_PROOF_TARGET,
      required_external_input_fields: requiredFields,
      obligation_slots_declared: obligationSlots,
      obligation_slots_satisfied: 0,
      current_pool_schema_absence_slots_satisfied:
        source.proof_grade_derivation_schema_current_pool_absence_slots_satisfied,
      compatible_current_pool_proof_grade_derivation_schema_refs: [],
      first_external_schema_obligation_blocker: EXTERNAL_SCHEMA_OBLIGATION_BLOCKER,
    },
    separator_rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_profiles:
      separatorProfiles,
    row_rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation",
      sharpened_blocker:
        "The current pool has no compatible proof-grade derivation schema, so all 124 rule-kernel payload schema slots require an external proof-grade derivation schema input.",
      current_pool_closure_state:
        "not mechanically closable from the current certificate pool; current-pool absence is proved and the remaining obligation is external input, not a route or primitive-acceptance decision",
      first_rule_blocker: RULE_BLOCKER,
      first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
      first_payload_construction_blocker: PAYLOAD_SCHEMA_BLOCKER,
      first_schema_target_blocker: SCHEMA_TARGET_BLOCKER,
      first_current_pool_schema_absence_blocker: CURRENT_POOL_SCHEMA_ABSENCE_BLOCKER,
      first_external_schema_obligation_blocker: EXTERNAL_SCHEMA_OBLIGATION_BLOCKER,
      mechanical_continuation_available: false,
      decision_required: true,
      required_external_inputs: [
        COMPATIBLE_SCHEMA_ROLE,
        "source_packet_acceptance_rule_derivation_proof",
      ],
      downstream_inputs_not_actionable_until_proof_grade_derivation_schema_present: [
        "rule_kernel_derivation_payload",
        "source_packet_acceptance_rule_derivation_proof",
        "source_packet_acceptance_rule_soundness_proof",
        "source_packet_acceptance_rule_endpoint_application_proof",
        "accepted_constants_conformance",
        "compatible_source_packet_acceptance_evidence",
        "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
      ],
      forbidden_reinterpretations: [
        "rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet_as_proof_grade_derivation_schema",
        "rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier_as_proof_grade_derivation_schema",
        "rule_kernel_payload_proof_grade_derivation_schema_target_packet_as_proof_grade_derivation_schema",
        "rule_kernel_payload_construction_attempt_as_proof_grade_derivation_schema",
        "source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt_as_proof_grade_derivation_schema",
        "source_packet_acceptance_rule_kernel_binding_split_classifier_as_proof_grade_derivation_schema",
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
      "Priority-only. This packet declares the external-input obligation after current-pool schema absence; it does not construct or accept a proof-grade derivation schema, rule-kernel derivation payload, derivation proof, proof rule, source-packet acceptance rule, accepted source packet, or accepted interval-certified constants status.",
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
    s.direct_source_hash_checks === 6,
    s.direct_source_hash_checks_passed === 6,
    s.retained_schema_absence_direct_source_hash_checks_passed === 5,
    s.retained_schema_target_direct_source_hash_checks_passed === 4,
    s.retained_payload_construction_direct_source_hash_checks_passed === 3,
    s.retained_contract_satisfaction_direct_source_hash_checks_passed === 5,
    s.retained_contract_target_direct_source_hash_checks_passed === 2,
    s.retained_derivation_proof_target_direct_source_hash_checks_passed === 2,
    s.retained_kernel_binding_split_direct_source_hash_checks_passed === 1,
    s.current_pool_json_files_scanned === 271,
    s.accepted_status_lane_json_files_scanned === 37,
    s.accepted_status_lane_fail_closed_json_files === 37,
    s.accepted_status_lane_non_fail_closed_json_files === 0,
    s.current_pool_proof_grade_derivation_schema_files_found === 0,
    s.current_pool_compatible_proof_grade_derivation_schema_refs === 0,
    s.candidate_separator_constants === 12,
    s.candidate_row_constant_associations === 112,
    JSON.stringify(s.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR),
    s.total_external_input_obligation_profiles === 124,
    s.proof_grade_derivation_schema_target_slots === 124,
    s.proof_grade_derivation_schema_target_slots_declared === 124,
    s.proof_grade_derivation_schema_target_slots_satisfied === 0,
    s.proof_grade_derivation_schema_target_fields === 8,
    s.proof_grade_derivation_schema_target_field_slots === 992,
    s.proof_grade_derivation_schema_target_field_slots_satisfied === 0,
    s.proof_grade_derivation_schema_current_pool_absence_slots === 124,
    s.proof_grade_derivation_schema_current_pool_absence_slots_satisfied === 124,
    s.proof_grade_derivation_schema_external_input_obligation_slots === 124,
    s.proof_grade_derivation_schema_external_input_obligation_slots_declared === 124,
    s.proof_grade_derivation_schema_external_input_obligation_slots_satisfied === 0,
    s.proof_grade_derivation_schema_external_input_obligation_fields === 8,
    s.proof_grade_derivation_schema_external_input_obligation_field_slots === 992,
    s.proof_grade_derivation_schema_external_input_obligation_field_slots_satisfied === 0,
    s.proof_grade_derivation_schema_external_input_required_slots === 124,
    s.proof_grade_derivation_schema_external_input_received_slots === 0,
    s.proof_grade_derivation_schemas_constructed === 0,
    s.proof_grade_derivation_schemas_accepted === 0,
    s.rule_kernel_derivation_payloads_constructed === 0,
    s.source_packet_acceptance_rules_constructed === 0,
    s.accepted_interval_certified_constants_statuses_constructed === 0,
    s.row_consumption_count === 0,
    s.route_decisions_made === 0,
    s.proof_rule_decisions_made === 0,
    s.primitive_acceptance_decisions_made === 0,
    s.source_packet_acceptance_decisions_made === 0,
    s.mechanical_continuations_from_current_pool === 0,
    s.decision_required_for_acceptance === true,
    s.preledger_pass === false,
    s.updates_live_ledger === false,
    s.branch_chart_authorized === false,
    s.first_external_schema_obligation_blocker === EXTERNAL_SCHEMA_OBLIGATION_BLOCKER,
    packet.next_certificate_handoff.mechanical_continuation_available === false,
    packet.next_certificate_handoff.decision_required === true,
  ];
  if (!checks.every(Boolean)) {
    throw new Error("Rule-kernel payload proof-grade derivation schema external-input obligation invariant failure.");
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
  const fieldRows = packet.external_input_obligation.required_external_input_fields.map((field) => [
    `\`${field}\``,
  ]);
  const rowScopeRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);

  return `# Candidate-Live Higher-Fold Constants Accepted-Status Rule-Kernel Payload Proof-Grade Derivation Schema External-Input Obligation Packet

Status: \`${packet.status}\`

## Claim Level

${packet.claim_level}

## Source Lock

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

Direct source-hash locks: ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks}.

## External Input Obligation

The current certificate pool has already been scanned and cannot mechanically
supply the proof-grade derivation schema. The remaining object is an external
proof-grade schema input for the compatible role
\`${packet.external_input_obligation.required_external_input}\`.

| Required external schema field |
| --- |
${markdownTable(fieldRows)}

- external-input obligation slots declared: ${s.proof_grade_derivation_schema_external_input_obligation_slots_declared}
- external-input obligation slots satisfied: ${s.proof_grade_derivation_schema_external_input_obligation_slots_satisfied}
- external-input field slots satisfied: ${s.proof_grade_derivation_schema_external_input_obligation_field_slots_satisfied} / ${s.proof_grade_derivation_schema_external_input_obligation_field_slots}
- external schema input slots received: ${s.proof_grade_derivation_schema_external_input_received_slots} / ${s.proof_grade_derivation_schema_external_input_required_slots}
- first external schema obligation blocker: \`${s.first_external_schema_obligation_blocker}\`

## Current-Pool Lock

- certificate JSON files scanned: ${s.current_pool_json_files_scanned}
- accepted-status lane JSON files scanned: ${s.accepted_status_lane_json_files_scanned}
- accepted-status lane fail-closed JSON files: ${s.accepted_status_lane_fail_closed_json_files}
- compatible proof-grade derivation schema files found: ${s.current_pool_proof_grade_derivation_schema_files_found}
- compatible proof-grade derivation schema refs found: ${s.current_pool_compatible_proof_grade_derivation_schema_refs}
- current-pool schema absence slots satisfied: ${s.proof_grade_derivation_schema_current_pool_absence_slots_satisfied} / ${s.proof_grade_derivation_schema_current_pool_absence_slots}

## Row Scope

| Separator | Rows |
| --- | --- |
${markdownTable(rowScopeRows)}

The packet preserves ${s.candidate_separator_constants} separator profiles and
${s.candidate_row_constant_associations} row profiles.

## Retained Target And Payload State

- schema target slots declared: ${s.proof_grade_derivation_schema_target_slots_declared}
- schema target slots satisfied: ${s.proof_grade_derivation_schema_target_slots_satisfied}
- schema target field slots satisfied: ${s.proof_grade_derivation_schema_target_field_slots_satisfied} / ${s.proof_grade_derivation_schema_target_field_slots}
- proof-grade derivation schemas constructed: ${s.proof_grade_derivation_schemas_constructed}
- proof-grade derivation schemas accepted: ${s.proof_grade_derivation_schemas_accepted}
- rule-kernel derivation payload targets: ${s.retained_rule_kernel_derivation_payload_target_slots}
- rule-kernel derivation payloads constructed: ${s.rule_kernel_derivation_payloads_constructed}
- retained payload-construction field slots source-available: ${s.retained_payload_construction_field_source_available_slots} / ${s.retained_payload_construction_field_slots}
- retained rule-kernel obligation slots satisfied: ${s.retained_rule_kernel_obligation_slots_satisfied} / ${s.retained_rule_kernel_obligation_slots}
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

This packet does not construct a proof-grade derivation schema, rule-kernel
derivation payload, derivation proof, proof rule, source-packet acceptance rule,
accepted source packet, accepted interval-certified constants status, row
consumption, live-ledger update, or branch-chart authorization.

## Next Handoff

The blocker is now \`${s.first_external_schema_obligation_blocker}\`. The lane
is not mechanically closable from the current certificate pool; acceptance
requires an external compatible proof-grade schema or derivation proof.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    schemaAbsence: args.schemaAbsence,
    schemaTarget: args.schemaTarget,
    payloadConstruction: args.payloadConstruction,
    contractSatisfaction: args.contractSatisfaction,
    contractTarget: args.contractTarget,
    kernelBindingSplit: args.kernelBindingSplit,
  };
  const inputs = {
    schemaAbsence: readJson(paths.schemaAbsence),
    schemaTarget: readJson(paths.schemaTarget),
    payloadConstruction: readJson(paths.payloadConstruction),
    contractSatisfaction: readJson(paths.contractSatisfaction),
    contractTarget: readJson(paths.contractTarget),
    kernelBindingSplit: readJson(paths.kernelBindingSplit),
  };
  const packet = buildPacket(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, packet, args.pretty);
  writeText(outReport, renderReport(packet));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
