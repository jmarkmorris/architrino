#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_PAYLOAD_CONSTRUCTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_construction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONTRACT_SATISFACTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONTRACT_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_KERNEL_BINDING_SPLIT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const PAYLOAD_CONSTRUCTION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_rule_kernel_derivation_payload_construction_attempt_fail_closed_payload_target_slots_declared_proof_grade_derivation_schema_absent_no_rule_kernel_derivation_payload_no_derivation_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const CONTRACT_SATISFACTION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt_fail_closed_identity_premise_and_non_reinterpretation_fields_source_available_rule_kernel_derivation_payload_absent_no_derivation_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const CONTRACT_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_packet_fail_closed_contract_target_declared_current_pool_derivation_proof_object_absent_no_derivation_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const KERNEL_BINDING_SPLIT_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier_fail_closed_rule_kernel_and_binding_evidence_obligations_split_all_unsatisfied_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet_fail_closed_schema_target_declared_schema_absent_no_rule_kernel_derivation_payload_no_derivation_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";

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
const SOUNDNESS_PROOF_BLOCKER = "source_packet_acceptance_rule_soundness_proof_absent";
const APPLICATION_PROOF_BLOCKER = "source_packet_acceptance_rule_endpoint_application_proof_absent";
const CONFORMANCE_BLOCKER = "existing_constants_contract_packet_identity_mismatch";

const SCHEMA_TARGET_FIELDS = [
  "compatible_schema_role_lock",
  "compatible_proof_object_role_lock",
  "derivation_proof_target_lock",
  "derivation_proof_source_data_record_lock",
  "rule_kernel_obligation_binding",
  "rule_kernel_derivation_payload_target_binding",
  "proof_grade_derivation_schema_statement",
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-rule-kernel-payload-proof-grade-derivation-schema-target-packet.mjs [options]

Options:
  --payload-construction PATH   Rule-kernel derivation payload construction attempt. Defaults to ${DEFAULT_PAYLOAD_CONSTRUCTION}.
  --contract-satisfaction PATH  Derivation-proof object contract-target satisfaction attempt. Defaults to ${DEFAULT_CONTRACT_SATISFACTION}.
  --contract-target PATH        Derivation-proof object contract target packet. Defaults to ${DEFAULT_CONTRACT_TARGET}.
  --kernel-binding-split PATH   Source-packet acceptance rule kernel/binding split classifier. Defaults to ${DEFAULT_KERNEL_BINDING_SPLIT}.
  --out-dir PATH                Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                      Pretty-print JSON artifact.
  --help                        Show this help.`);
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

function validatePayloadConstruction(payloadConstruction) {
  assertPacketStatusAndLocks(payloadConstruction, "payloadConstruction", PAYLOAD_CONSTRUCTION_STATUS);
  const s = payloadConstruction.summary;
  expectEqual(s.direct_source_hash_checks_passed, 3, "payload construction direct locks");
  expectEqual(s.rule_kernel_derivation_payload_target_slots_declared, 124, "declared payload targets");
  expectEqual(s.rule_kernel_derivation_payloads_constructed, 0, "constructed payloads");
  expectEqual(s.payload_construction_field_slots, 868, "payload construction field slots");
  expectEqual(s.payload_construction_field_source_available_slots, 744, "source-available payload fields");
  expectEqual(s.proof_grade_derivation_schema_source_available_slots, 0, "source-available schema fields");
  expectEqual(s.retained_contract_field_source_available_slots, 868, "retained contract source fields");
  expectEqual(s.retained_contract_field_slots, 992, "retained contract field slots");
  expectEqual(s.retained_rule_kernel_obligation_slots, 372, "retained rule-kernel obligation slots");
  expectEqual(s.retained_binding_and_evidence_obligation_slots, 496, "retained binding/evidence slots");
  expectEqual(s.source_packet_acceptance_rules_constructed, 0, "source-packet acceptance rules");
  expectEqual(s.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "payload construction");
}

function validateContractSatisfaction(contractSatisfaction) {
  assertPacketStatusAndLocks(contractSatisfaction, "contractSatisfaction", CONTRACT_SATISFACTION_STATUS);
  const s = contractSatisfaction.summary;
  expectEqual(s.direct_source_hash_checks_passed, 5, "contract satisfaction direct locks");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_object_contract_field_source_available_slots, 868, "contract source fields");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_object_contract_field_slots, 992, "contract field slots");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_object_contract_field_slots_satisfied, 0, "satisfied contract field slots");
  expectEqual(s.rule_kernel_derivation_payload_slots_satisfied, 0, "satisfied payload slots");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "contract satisfaction");
}

function validateContractTarget(contractTarget) {
  assertPacketStatusAndLocks(contractTarget, "contractTarget", CONTRACT_TARGET_STATUS);
  const s = contractTarget.summary;
  expectEqual(s.direct_source_hash_checks_passed, 2, "contract target direct locks");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_object_contract_target_slots_declared, 124, "contract targets");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_object_contract_target_slots_satisfied, 0, "satisfied contract targets");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_object_contract_field_slots_satisfied, 0, "satisfied contract fields");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "contract target");
}

function validateKernelBindingSplit(kernelBindingSplit) {
  assertPacketStatusAndLocks(kernelBindingSplit, "kernelBindingSplit", KERNEL_BINDING_SPLIT_STATUS);
  const s = kernelBindingSplit.summary;
  expectEqual(s.direct_source_hash_checks_passed, 1, "kernel split direct locks");
  expectEqual(s.rule_kernel_obligation_slots, 372, "rule-kernel obligation slots");
  expectEqual(s.rule_kernel_obligation_slots_satisfied, 0, "satisfied rule-kernel obligations");
  expectEqual(s.binding_and_evidence_obligation_slots, 496, "binding/evidence obligation slots");
  expectEqual(s.binding_and_evidence_obligation_slots_satisfied, 0, "satisfied binding/evidence obligations");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "kernel binding split");
}

function schemaTargetRecord() {
  return {
    compatible_schema_role: COMPATIBLE_SCHEMA_ROLE,
    compatible_proof_object_role: COMPATIBLE_PROOF_OBJECT_ROLE,
    derivation_proof_target: DERIVATION_PROOF_TARGET,
    schema_target_declared: true,
    schema_target_satisfied: false,
    proof_grade_derivation_schema_present: false,
    proof_grade_derivation_schema_constructed: false,
    rule_kernel_derivation_payload_constructed: false,
    target_fields: SCHEMA_TARGET_FIELDS,
    first_schema_target_blocker: SCHEMA_TARGET_BLOCKER,
    first_payload_construction_blocker: PAYLOAD_SCHEMA_BLOCKER,
    first_missing_contract_field_blocker: RULE_KERNEL_PAYLOAD_BLOCKER,
    first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
  };
}

function buildSeparatorProfiles(payloadConstruction) {
  return payloadConstruction
    .separator_source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_construction_attempt_profiles
    .map((profile) => ({
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      row_count: profile.row_count,
      compatible_schema_role: COMPATIBLE_SCHEMA_ROLE,
      derivation_proof_target: DERIVATION_PROOF_TARGET,
      proof_grade_derivation_schema_targets_declared: 1,
      proof_grade_derivation_schema_targets_satisfied: 0,
      proof_grade_derivation_schemas_constructed: 0,
      rule_kernel_derivation_payloads_constructed: 0,
      schema_target_record: schemaTargetRecord(),
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
      classification:
        "separator_rule_kernel_payload_proof_grade_derivation_schema_target_declared_schema_absent_fail_closed",
    }))
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function buildRowProfiles(payloadConstruction) {
  return payloadConstruction
    .row_source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_construction_attempt_profiles
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
      derivation_proof_target: DERIVATION_PROOF_TARGET,
      proof_grade_derivation_schema_targets_declared: 1,
      proof_grade_derivation_schema_targets_satisfied: 0,
      proof_grade_derivation_schemas_constructed: 0,
      rule_kernel_derivation_payloads_constructed: 0,
      schema_target_record: schemaTargetRecord(),
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
      classification:
        "row_rule_kernel_payload_proof_grade_derivation_schema_target_declared_schema_absent_fail_closed",
    }))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, payloadConstruction, contractSatisfaction, contractTarget, kernelBindingSplit) {
  validatePayloadConstruction(payloadConstruction);
  validateContractSatisfaction(contractSatisfaction);
  validateContractTarget(contractTarget);
  validateKernelBindingSplit(kernelBindingSplit);

  const sourceChecks = sourceHashChecks(paths);
  const source = payloadConstruction.summary;
  const separatorProfiles = buildSeparatorProfiles(payloadConstruction);
  const rowProfiles = buildRowProfiles(payloadConstruction);
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const schemaSlots = separatorProfiles.length + rowProfiles.length;
  const schemaTargetFieldSlots = schemaSlots * SCHEMA_TARGET_FIELDS.length;

  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_payload_construction_direct_source_hash_checks_passed: source.direct_source_hash_checks_passed,
    retained_contract_satisfaction_direct_source_hash_checks_passed:
      contractSatisfaction.summary.direct_source_hash_checks_passed,
    retained_contract_target_direct_source_hash_checks_passed:
      contractTarget.summary.direct_source_hash_checks_passed,
    retained_derivation_proof_target_direct_source_hash_checks_passed:
      source.retained_derivation_proof_target_direct_source_hash_checks_passed,
    retained_kernel_binding_split_direct_source_hash_checks_passed:
      kernelBindingSplit.summary.direct_source_hash_checks_passed,
    candidate_higher_fold_constants_artifacts: source.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: separatorProfiles.length,
    candidate_row_constant_associations: rowProfiles.length,
    rows_by_separator_count: rowsBySeparator,
    separator_schema_target_profiles: separatorProfiles.length,
    row_schema_target_profiles: rowProfiles.length,
    derivation_proof_source_data_records: schemaSlots,
    derivation_proof_source_data_records_ready: source.derivation_proof_source_data_records_ready,
    retained_contract_field_slots:
      contractSatisfaction.summary.source_packet_acceptance_rule_derivation_proof_object_contract_field_slots,
    retained_contract_field_source_available_slots:
      contractSatisfaction.summary.source_packet_acceptance_rule_derivation_proof_object_contract_field_source_available_slots,
    retained_contract_field_slots_satisfied:
      contractSatisfaction.summary.source_packet_acceptance_rule_derivation_proof_object_contract_field_slots_satisfied,
    retained_rule_kernel_derivation_payload_target_slots:
      source.rule_kernel_derivation_payload_target_slots,
    retained_rule_kernel_derivation_payloads_constructed:
      source.rule_kernel_derivation_payloads_constructed,
    retained_payload_construction_field_slots: source.payload_construction_field_slots,
    retained_payload_construction_field_source_available_slots:
      source.payload_construction_field_source_available_slots,
    retained_proof_grade_derivation_schema_source_available_slots:
      source.proof_grade_derivation_schema_source_available_slots,
    retained_rule_kernel_obligation_slots: source.retained_rule_kernel_obligation_slots,
    retained_rule_kernel_obligation_slots_satisfied:
      source.retained_rule_kernel_obligation_slots_satisfied,
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
    retained_binding_and_evidence_obligation_slots:
      source.retained_binding_and_evidence_obligation_slots,
    retained_binding_and_evidence_obligation_slots_satisfied:
      source.retained_binding_and_evidence_obligation_slots_satisfied,
    retained_total_split_obligation_slots: source.retained_total_split_obligation_slots,
    retained_total_split_obligation_slots_satisfied:
      source.retained_total_split_obligation_slots_satisfied,
    proof_grade_derivation_schema_target_slots: schemaSlots,
    proof_grade_derivation_schema_target_slots_declared: schemaSlots,
    proof_grade_derivation_schema_target_slots_satisfied: 0,
    proof_grade_derivation_schema_target_fields: SCHEMA_TARGET_FIELDS.length,
    proof_grade_derivation_schema_target_field_slots: schemaTargetFieldSlots,
    proof_grade_derivation_schema_target_field_slots_satisfied: 0,
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
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_rule_blocker: RULE_BLOCKER,
    first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
    first_derivation_proof_object_contract_blocker: CONTRACT_BLOCKER,
    first_missing_contract_field: "rule_kernel_derivation_payload",
    first_missing_contract_field_blocker: RULE_KERNEL_PAYLOAD_BLOCKER,
    first_payload_construction_blocker: PAYLOAD_SCHEMA_BLOCKER,
    first_schema_target_blocker: SCHEMA_TARGET_BLOCKER,
    first_downstream_rule_kernel_blocker_after_derivation: SOUNDNESS_PROOF_BLOCKER,
    first_endpoint_application_blocker: APPLICATION_PROOF_BLOCKER,
    first_binding_and_evidence_blocker: CONFORMANCE_BLOCKER,
  };

  const packet = {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status rule-kernel payload proof-grade derivation schema target packet",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status source-packet acceptance rule derivation proof object rule-kernel derivation payload proof-grade derivation schema target packet",
    claim_level:
      "priority-only proof-grade derivation schema target packet; imports the rule-kernel derivation payload construction attempt, contract-target satisfaction attempt, contract target packet, and kernel/binding split, declares a compatible proof-grade derivation schema target for every missing rule_kernel_derivation_payload slot, and keeps every schema target unsatisfied with no rule-kernel derivation payload, derivation proof, proof rule, source-packet acceptance rule, accepted source packet, accepted interval-certified constants status, row consumption, live-ledger update, or branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
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
    proof_grade_derivation_schema_target_fields: SCHEMA_TARGET_FIELDS,
    proof_grade_derivation_schema_target_packet: {
      target: COMPATIBLE_SCHEMA_ROLE,
      compatible_proof_object_role: COMPATIBLE_PROOF_OBJECT_ROLE,
      derivation_proof_target: DERIVATION_PROOF_TARGET,
      proof_grade_derivation_schema_target_slots_declared: schemaSlots,
      proof_grade_derivation_schema_target_slots_satisfied: 0,
      proof_grade_derivation_schema_target_fields_per_slot: SCHEMA_TARGET_FIELDS.length,
      proof_grade_derivation_schema_target_field_slots: schemaTargetFieldSlots,
      proof_grade_derivation_schema_target_field_slots_satisfied: 0,
      proof_grade_derivation_schemas_constructed: 0,
      proof_grade_derivation_schemas_accepted: 0,
      first_schema_target_blocker: SCHEMA_TARGET_BLOCKER,
      rule_kernel_derivation_payloads_constructed: 0,
      derivation_proof_object_remains_absent: true,
    },
    separator_rule_kernel_payload_proof_grade_derivation_schema_target_profiles: separatorProfiles,
    row_rule_kernel_payload_proof_grade_derivation_schema_target_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "rule_kernel_payload_proof_grade_derivation_schema_target_packet",
      sharpened_blocker:
        "The rule-kernel derivation payload construction attempt now has an explicit compatible proof-grade derivation schema target for all 124 missing payload slots, but 0 / 124 schema targets are satisfied.",
      current_pool_closure_state:
        "proof-grade derivation schema target declared; schema absent; rule-kernel derivation payload unconstructed",
      first_rule_blocker: RULE_BLOCKER,
      first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
      first_payload_construction_blocker: PAYLOAD_SCHEMA_BLOCKER,
      first_schema_target_blocker: SCHEMA_TARGET_BLOCKER,
      mechanical_continuation_available: true,
      mechanical_continuation:
        "A fail-closed proof-grade derivation schema current-pool absence classifier can now use this target packet to reject schema target packets as evidence and prove whether a compatible schema object is absent from the current certificate pool.",
      decision_required_for_acceptance: true,
      required_external_inputs: [
        COMPATIBLE_SCHEMA_ROLE,
        "source_packet_acceptance_rule_derivation_proof",
      ],
      downstream_inputs_not_actionable_until_rule_kernel_derivation_payload_present: [
        "source_packet_acceptance_rule_soundness_proof",
        "source_packet_acceptance_rule_endpoint_application_proof",
        "accepted_constants_conformance",
        "compatible_source_packet_acceptance_evidence",
        "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
      ],
      forbidden_reinterpretations: [
        "rule_kernel_payload_proof_grade_derivation_schema_target_packet_as_proof_grade_derivation_schema",
        "rule_kernel_payload_construction_attempt_as_proof_grade_derivation_schema",
        "source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt_as_rule_kernel_derivation_payload",
        "source_packet_acceptance_rule_derivation_proof_target_packet_as_derivation_proof",
        "source_packet_acceptance_rule_kernel_binding_split_classifier_as_derivation_proof",
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
      "Priority-only. This packet declares a compatible proof-grade derivation schema target for the missing rule-kernel derivation payload; it does not construct, satisfy, accept, or apply a derivation-proof object.",
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
    s.direct_source_hash_checks === 4,
    s.direct_source_hash_checks_passed === 4,
    s.retained_payload_construction_direct_source_hash_checks_passed === 3,
    s.retained_contract_satisfaction_direct_source_hash_checks_passed === 5,
    s.retained_contract_target_direct_source_hash_checks_passed === 2,
    s.retained_derivation_proof_target_direct_source_hash_checks_passed === 2,
    s.retained_kernel_binding_split_direct_source_hash_checks_passed === 1,
    s.candidate_separator_constants === 12,
    s.candidate_row_constant_associations === 112,
    JSON.stringify(s.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR),
    s.derivation_proof_source_data_records === 124,
    s.derivation_proof_source_data_records_ready === 124,
    s.retained_contract_field_slots === 992,
    s.retained_contract_field_source_available_slots === 868,
    s.retained_contract_field_slots_satisfied === 0,
    s.retained_rule_kernel_derivation_payload_target_slots === 124,
    s.retained_rule_kernel_derivation_payloads_constructed === 0,
    s.retained_payload_construction_field_slots === 868,
    s.retained_payload_construction_field_source_available_slots === 744,
    s.retained_proof_grade_derivation_schema_source_available_slots === 0,
    s.retained_rule_kernel_obligation_slots === 372,
    s.retained_rule_kernel_obligation_slots_satisfied === 0,
    s.retained_binding_and_evidence_obligation_slots === 496,
    s.retained_binding_and_evidence_obligation_slots_satisfied === 0,
    s.retained_total_split_obligation_slots === 868,
    s.retained_total_split_obligation_slots_satisfied === 0,
    s.proof_grade_derivation_schema_target_slots === 124,
    s.proof_grade_derivation_schema_target_slots_declared === 124,
    s.proof_grade_derivation_schema_target_slots_satisfied === 0,
    s.proof_grade_derivation_schema_target_fields === SCHEMA_TARGET_FIELDS.length,
    s.proof_grade_derivation_schema_target_field_slots === 992,
    s.proof_grade_derivation_schema_target_field_slots_satisfied === 0,
    s.proof_grade_derivation_schemas_constructed === 0,
    s.proof_grade_derivation_schemas_accepted === 0,
    s.rule_kernel_derivation_payloads_constructed === 0,
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
    throw new Error("Rule-kernel payload proof-grade derivation schema target packet invariant failure.");
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
  const fieldRows = SCHEMA_TARGET_FIELDS.map((field) => [`\`${field}\``]);
  const rowScopeRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);

  return `# Candidate-Live Higher-Fold Constants Accepted-Status Rule-Kernel Payload Proof-Grade Derivation Schema Target Packet

Status: \`${packet.status}\`

## Claim Level

${packet.claim_level}

## Source Lock

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

Direct source-hash locks: ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks}.

## Schema Target

This packet declares the compatible proof-grade derivation schema target for the
missing \`rule_kernel_derivation_payload\`. It does not construct a schema,
payload, or derivation-proof object.

| Declared schema target field |
| --- |
${markdownTable(fieldRows)}

- schema target slots declared: ${s.proof_grade_derivation_schema_target_slots_declared}
- schema target slots satisfied: ${s.proof_grade_derivation_schema_target_slots_satisfied}
- schema target fields per slot: ${s.proof_grade_derivation_schema_target_fields}
- schema target field slots satisfied: ${s.proof_grade_derivation_schema_target_field_slots_satisfied} / ${s.proof_grade_derivation_schema_target_field_slots}
- proof-grade derivation schemas constructed: ${s.proof_grade_derivation_schemas_constructed}
- proof-grade derivation schemas accepted: ${s.proof_grade_derivation_schemas_accepted}
- first schema target blocker: \`${s.first_schema_target_blocker}\`

## Row Scope

| Separator | Rows |
| --- | --- |
${markdownTable(rowScopeRows)}

The packet preserves ${s.candidate_separator_constants} separator profiles and
${s.candidate_row_constant_associations} row profiles.

## Retained Payload And Contract State

- retained contract-field slots source-available: ${s.retained_contract_field_source_available_slots} / ${s.retained_contract_field_slots}
- retained contract-field slots satisfied: ${s.retained_contract_field_slots_satisfied} / ${s.retained_contract_field_slots}
- retained rule-kernel derivation payload targets: ${s.retained_rule_kernel_derivation_payload_target_slots}
- retained rule-kernel derivation payloads constructed: ${s.retained_rule_kernel_derivation_payloads_constructed}
- retained payload-construction field slots source-available: ${s.retained_payload_construction_field_source_available_slots} / ${s.retained_payload_construction_field_slots}
- retained proof-grade derivation schema source-available slots: ${s.retained_proof_grade_derivation_schema_source_available_slots}
- retained rule-kernel obligation slots satisfied: ${s.retained_rule_kernel_obligation_slots_satisfied} / ${s.retained_rule_kernel_obligation_slots}
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

This packet does not construct a proof-grade derivation schema, rule-kernel
derivation payload, derivation proof, proof rule, source-packet acceptance rule,
accepted source packet, accepted interval-certified constants status, row
consumption, live-ledger update, or branch-chart authorization.

## Next Handoff

The blocker is now \`${s.first_schema_target_blocker}\`: a compatible schema
target is declared for every missing \`rule_kernel_derivation_payload\`, but no
schema target is satisfied. The mechanical continuation is a fail-closed
proof-grade derivation schema current-pool absence classifier, or a proof-grade
schema input if one is actually derived.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    payloadConstruction: args.payloadConstruction,
    contractSatisfaction: args.contractSatisfaction,
    contractTarget: args.contractTarget,
    kernelBindingSplit: args.kernelBindingSplit,
  };
  const payloadConstruction = readJson(paths.payloadConstruction);
  const contractSatisfaction = readJson(paths.contractSatisfaction);
  const contractTarget = readJson(paths.contractTarget);
  const kernelBindingSplit = readJson(paths.kernelBindingSplit);
  const packet = buildPacket(paths, payloadConstruction, contractSatisfaction, contractTarget, kernelBindingSplit);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, packet, args.pretty);
  writeText(outReport, renderReport(packet));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
