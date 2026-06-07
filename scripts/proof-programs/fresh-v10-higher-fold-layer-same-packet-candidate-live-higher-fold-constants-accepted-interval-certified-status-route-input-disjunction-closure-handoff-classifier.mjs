#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ROUTE_HANDOFF = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_route_handoff_contract_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_route_input_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_NARROWING = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_narrowing_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_RULE_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_disjunction_closure_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_disjunction_closure_handoff_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_first_blocker_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_contract_disjunction_exhaustion_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_application_exhaustion_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_decision_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_construction_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_proof_obligation_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_acceptance_rule_blocker_vector_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_current_pool_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_construction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
]);

const ROUTE_HANDOFF_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_route_handoff_contract_classifier_fail_closed_two_route_handoff_contracts_declared_current_pool_inputs_absent_no_route_decision_no_rule_decision_no_row_consumption";
const PROOF_GRADE_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_route_input_target_packet_fail_closed_proof_grade_route_input_target_declared_current_pool_input_absent_no_route_decision_no_rule_decision_no_row_consumption";
const PRIMITIVE_NARROWING_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_acceptance_rule_handoff_narrowing_classifier_fail_closed_aggregate_inputs_complete_acceptance_rule_and_accepted_source_packet_absent_no_primitive_acceptance_no_row_consumption";
const RULE_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet_fail_closed_acceptance_rule_target_declared_aggregate_inputs_complete_rule_absent_no_primitive_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_disjunction_closure_handoff_classifier_fail_closed_proof_grade_and_primitive_route_inputs_absent_current_pool_disjunction_unsatisfied_no_route_decision_no_rule_decision_no_row_consumption";

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
    routeHandoff: DEFAULT_ROUTE_HANDOFF,
    proofGradeTarget: DEFAULT_PROOF_GRADE_TARGET,
    primitiveNarrowing: DEFAULT_PRIMITIVE_NARROWING,
    ruleTarget: DEFAULT_RULE_TARGET,
    certificatePoolDir: CERT_DIR,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--route-handoff") {
      args.routeHandoff = argv[++index];
    } else if (arg === "--proof-grade-target") {
      args.proofGradeTarget = argv[++index];
    } else if (arg === "--primitive-narrowing") {
      args.primitiveNarrowing = argv[++index];
    } else if (arg === "--rule-target") {
      args.ruleTarget = argv[++index];
    } else if (arg === "--certificate-pool-dir") {
      args.certificatePoolDir = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-route-input-disjunction-closure-handoff-classifier.mjs [options]

Options:
  --route-handoff PATH        Decision-frontier route-handoff contract classifier. Defaults to ${DEFAULT_ROUTE_HANDOFF}.
  --proof-grade-target PATH   Proof-grade route-input target packet. Defaults to ${DEFAULT_PROOF_GRADE_TARGET}.
  --primitive-narrowing PATH  Primitive source-packet route narrowing classifier. Defaults to ${DEFAULT_PRIMITIVE_NARROWING}.
  --rule-target PATH          Source-packet acceptance rule target packet. Defaults to ${DEFAULT_RULE_TARGET}.
  --certificate-pool-dir PATH Certificate pool directory. Defaults to ${CERT_DIR}.
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
    ["accepted_status_decision_frontier_route_handoff_contract_classifier", paths.routeHandoff],
    ["accepted_status_proof_grade_route_input_target_packet", paths.proofGradeTarget],
    ["accepted_status_primitive_source_packet_route_narrowing_classifier", paths.primitiveNarrowing],
    ["accepted_status_source_packet_acceptance_rule_target_packet", paths.ruleTarget],
  ].map(([sourceArtifact, filePath]) => ({
    source_artifact: sourceArtifact,
    current_basename: path.basename(filePath),
    current_sha256: sha256File(filePath),
    hash_matches: true,
  }));
}

function currentCertificatePoolSnapshot(certificatePoolDir, outputBasename) {
  const jsonFiles = fs
    .readdirSync(certificatePoolDir)
    .filter(
      (entry) => entry.endsWith(".json") && entry !== outputBasename && !DOWNSTREAM_OUTPUT_JSON_BASENAMES.has(entry),
    )
    .sort();
  const fileRecords = jsonFiles.map((basename) => {
    const filePath = path.join(certificatePoolDir, basename);
    return {
      basename,
      sha256: sha256File(filePath),
    };
  });
  const poolHash = crypto
    .createHash("sha256")
    .update(fileRecords.map((record) => `${record.basename}:${record.sha256}`).join("\n"))
    .digest("hex");
  return {
    directory: certificatePoolDir,
    output_json_basename_excluded: outputBasename,
    json_files_scanned_before_output: fileRecords.length,
    json_pool_sha256: poolHash,
  };
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
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

function assertRowsBySeparator(summary, label) {
  if (JSON.stringify(summary.rows_by_separator_count) !== JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR)) {
    throw new Error(`Unexpected ${label} rows-by-separator count.`);
  }
}

function validateInputs(inputs) {
  assertPacketStatusAndLocks(inputs.routeHandoff, "routeHandoff", ROUTE_HANDOFF_STATUS);
  assertPacketStatusAndLocks(inputs.proofGradeTarget, "proofGradeTarget", PROOF_GRADE_TARGET_STATUS);
  assertPacketStatusAndLocks(inputs.primitiveNarrowing, "primitiveNarrowing", PRIMITIVE_NARROWING_STATUS);
  assertPacketStatusAndLocks(inputs.ruleTarget, "ruleTarget", RULE_TARGET_STATUS);
  const route = inputs.routeHandoff.summary;
  const proof = inputs.proofGradeTarget.summary;
  const primitive = inputs.primitiveNarrowing.summary;
  const rule = inputs.ruleTarget.summary;
  const expected = [
    [route.route_handoff_contracts_declared, 2, "route-handoff contracts declared"],
    [route.route_handoff_contracts_satisfied, 0, "route-handoff contracts satisfied"],
    [proof.proof_grade_route_input_targets_declared, 1, "proof-grade targets declared"],
    [proof.total_proof_grade_route_input_target_slots, 744, "proof-grade total slots"],
    [proof.total_proof_grade_route_input_target_slots_satisfied, 0, "proof-grade satisfied slots"],
    [primitive.primitive_source_packet_route_input_targets_declared, 1, "primitive targets declared"],
    [primitive.total_primitive_source_packet_route_input_target_slots, 248, "primitive total slots"],
    [primitive.total_primitive_source_packet_route_input_target_slots_satisfied, 0, "primitive satisfied slots"],
    [rule.source_packet_acceptance_rule_targets_declared, 1, "rule targets declared"],
    [rule.total_source_packet_acceptance_rule_target_slots, 124, "rule total slots"],
    [rule.source_packet_acceptance_rules_constructed, 0, "constructed source-packet acceptance rules"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
  assertRowsBySeparator(route, "route handoff");
  assertRowsBySeparator(proof, "proof-grade target");
  assertRowsBySeparator(primitive, "primitive narrowing");
  assertRowsBySeparator(rule, "rule target");
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const poolSnapshot = currentCertificatePoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const route = inputs.routeHandoff.summary;
  const proof = inputs.proofGradeTarget.summary;
  const primitive = inputs.primitiveNarrowing.summary;
  const rule = inputs.ruleTarget.summary;
  const combinedFields = proof.proof_grade_route_input_target_fields + primitive.primitive_source_packet_route_input_target_fields;
  const combinedSeparatorSlots =
    proof.separator_proof_grade_route_input_target_slots +
    primitive.separator_primitive_source_packet_route_input_target_slots;
  const combinedRowSlots =
    proof.row_proof_grade_route_input_target_slots + primitive.row_primitive_source_packet_route_input_target_slots;
  const combinedTotalSlots =
    proof.total_proof_grade_route_input_target_slots + primitive.total_primitive_source_packet_route_input_target_slots;
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    retained_route_handoff_direct_source_hash_checks_passed: route.direct_source_hash_checks_passed,
    retained_proof_grade_route_input_direct_source_hash_checks_passed: proof.direct_source_hash_checks_passed,
    retained_primitive_route_input_direct_source_hash_checks_passed: primitive.direct_source_hash_checks_passed,
    retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed: rule.direct_source_hash_checks_passed,
    current_pool_route_input_disjunction_json_files_scanned: poolSnapshot.json_files_scanned_before_output,
    candidate_higher_fold_constants_artifacts: route.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: route.candidate_separator_constants,
    candidate_row_constant_associations: route.candidate_row_constant_associations,
    rows_by_separator_count: route.rows_by_separator_count,
    route_handoff_contracts_declared: route.route_handoff_contracts_declared,
    route_handoff_contracts_satisfied: route.route_handoff_contracts_satisfied,
    route_handoff_contracts_absent: route.route_handoff_contracts_absent,
    proof_grade_route_input_targets_declared: proof.proof_grade_route_input_targets_declared,
    proof_grade_route_input_targets_satisfied: proof.proof_grade_route_input_targets_satisfied,
    proof_grade_route_input_target_fields: proof.proof_grade_route_input_target_fields,
    separator_proof_grade_route_input_target_slots: proof.separator_proof_grade_route_input_target_slots,
    separator_proof_grade_route_input_target_slots_satisfied:
      proof.separator_proof_grade_route_input_target_slots_satisfied,
    separator_proof_grade_route_input_target_slots_missing: proof.separator_proof_grade_route_input_target_slots_missing,
    row_proof_grade_route_input_target_slots: proof.row_proof_grade_route_input_target_slots,
    row_proof_grade_route_input_target_slots_satisfied: proof.row_proof_grade_route_input_target_slots_satisfied,
    row_proof_grade_route_input_target_slots_missing: proof.row_proof_grade_route_input_target_slots_missing,
    total_proof_grade_route_input_target_slots: proof.total_proof_grade_route_input_target_slots,
    total_proof_grade_route_input_target_slots_satisfied: proof.total_proof_grade_route_input_target_slots_satisfied,
    total_proof_grade_route_input_target_slots_missing: proof.total_proof_grade_route_input_target_slots_missing,
    primitive_source_packet_route_input_targets_declared: primitive.primitive_source_packet_route_input_targets_declared,
    primitive_source_packet_route_input_targets_satisfied: primitive.primitive_source_packet_route_input_targets_satisfied,
    primitive_source_packet_route_input_target_fields: primitive.primitive_source_packet_route_input_target_fields,
    separator_primitive_source_packet_route_input_target_slots:
      primitive.separator_primitive_source_packet_route_input_target_slots,
    separator_primitive_source_packet_route_input_target_slots_satisfied:
      primitive.separator_primitive_source_packet_route_input_target_slots_satisfied,
    separator_primitive_source_packet_route_input_target_slots_missing:
      primitive.separator_primitive_source_packet_route_input_target_slots_missing,
    row_primitive_source_packet_route_input_target_slots: primitive.row_primitive_source_packet_route_input_target_slots,
    row_primitive_source_packet_route_input_target_slots_satisfied:
      primitive.row_primitive_source_packet_route_input_target_slots_satisfied,
    row_primitive_source_packet_route_input_target_slots_missing:
      primitive.row_primitive_source_packet_route_input_target_slots_missing,
    total_primitive_source_packet_route_input_target_slots:
      primitive.total_primitive_source_packet_route_input_target_slots,
    total_primitive_source_packet_route_input_target_slots_satisfied:
      primitive.total_primitive_source_packet_route_input_target_slots_satisfied,
    total_primitive_source_packet_route_input_target_slots_missing:
      primitive.total_primitive_source_packet_route_input_target_slots_missing,
    source_packet_acceptance_rule_targets_declared: rule.source_packet_acceptance_rule_targets_declared,
    total_source_packet_acceptance_rule_target_slots: rule.total_source_packet_acceptance_rule_target_slots,
    total_source_packet_acceptance_rule_target_slots_missing:
      rule.total_source_packet_acceptance_rule_target_slots_missing,
    route_input_disjunctions_declared: 1,
    route_input_disjunctions_satisfied: 0,
    route_input_disjunctions_absent: 1,
    combined_route_input_disjunction_fields: combinedFields,
    separator_combined_route_input_disjunction_slots: combinedSeparatorSlots,
    separator_combined_route_input_disjunction_slots_satisfied: 0,
    separator_combined_route_input_disjunction_slots_missing: combinedSeparatorSlots,
    row_combined_route_input_disjunction_slots: combinedRowSlots,
    row_combined_route_input_disjunction_slots_satisfied: 0,
    row_combined_route_input_disjunction_slots_missing: combinedRowSlots,
    total_combined_route_input_disjunction_slots: combinedTotalSlots,
    total_combined_route_input_disjunction_slots_satisfied: 0,
    total_combined_route_input_disjunction_slots_missing: combinedTotalSlots,
    compatible_proof_grade_current_pool_evidence_files: proof.compatible_proof_grade_current_pool_evidence_files,
    compatible_source_packet_acceptance_current_pool_evidence_files:
      primitive.compatible_source_packet_acceptance_current_pool_evidence_files,
    compatible_route_input_disjunction_current_pool_files: 0,
    mechanical_continuations_from_current_pool: 0,
    route_decisions_made: 0,
    proof_rule_decisions_made: 0,
    primitive_acceptance_decisions_made: 0,
    source_packet_acceptance_rules_constructed: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    accepted_interval_certified_constants_status_refs_constructed: 0,
    accepted_interval_certified_constants_statuses_constructed: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_route_input_disjunction_blocker: "proof_grade_and_primitive_route_inputs_absent",
    first_proof_grade_route_input_blocker: proof.first_proof_grade_route_input_blocker,
    first_primitive_source_packet_route_input_blocker: primitive.first_primitive_source_packet_route_input_blocker,
    first_source_packet_acceptance_rule_target_blocker: rule.first_source_packet_acceptance_rule_target_blocker,
    parent_complement_consumption_ref_blocker: "parent_complement_consumption_ref_absent",
    first_separator_certificate_blocker: "higher_fold_separator_layer_certificate_absent",
  };

  const invariant =
    summary.direct_source_hash_checks === 4 &&
    summary.direct_source_hash_checks_passed === 4 &&
    summary.retained_route_handoff_direct_source_hash_checks_passed === 4 &&
    summary.retained_proof_grade_route_input_direct_source_hash_checks_passed === 3 &&
    summary.retained_primitive_route_input_direct_source_hash_checks_passed === 5 &&
    summary.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed === 3 &&
    summary.current_pool_route_input_disjunction_json_files_scanned === 246 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    JSON.stringify(summary.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR) &&
    summary.route_handoff_contracts_declared === 2 &&
    summary.route_handoff_contracts_satisfied === 0 &&
    summary.proof_grade_route_input_targets_declared === 1 &&
    summary.total_proof_grade_route_input_target_slots === 744 &&
    summary.total_proof_grade_route_input_target_slots_satisfied === 0 &&
    summary.primitive_source_packet_route_input_targets_declared === 1 &&
    summary.total_primitive_source_packet_route_input_target_slots === 248 &&
    summary.total_primitive_source_packet_route_input_target_slots_satisfied === 0 &&
    summary.combined_route_input_disjunction_fields === 8 &&
    summary.separator_combined_route_input_disjunction_slots === 96 &&
    summary.separator_combined_route_input_disjunction_slots_satisfied === 0 &&
    summary.row_combined_route_input_disjunction_slots === 896 &&
    summary.row_combined_route_input_disjunction_slots_satisfied === 0 &&
    summary.total_combined_route_input_disjunction_slots === 992 &&
    summary.total_combined_route_input_disjunction_slots_satisfied === 0 &&
    summary.total_combined_route_input_disjunction_slots_missing === 992 &&
    summary.compatible_proof_grade_current_pool_evidence_files === 0 &&
    summary.compatible_source_packet_acceptance_current_pool_evidence_files === 0 &&
    summary.compatible_route_input_disjunction_current_pool_files === 0 &&
    summary.mechanical_continuations_from_current_pool === 0 &&
    summary.route_decisions_made === 0 &&
    summary.proof_rule_decisions_made === 0 &&
    summary.primitive_acceptance_decisions_made === 0 &&
    summary.source_packet_acceptance_rules_constructed === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.accepted_interval_certified_constants_statuses_constructed === 0 &&
    summary.row_consumption_count === 0 &&
    summary.preledger_pass === false &&
    summary.updates_live_ledger === false &&
    summary.branch_chart_authorized === false;
  if (!invariant) {
    throw new Error("Route-input disjunction closure invariant failed.");
  }

  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-route-input-disjunction-closure-handoff-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only route-input disjunction closure handoff classifier; proves both branch-specific route-input targets are explicit and the current pool satisfies neither side of the disjunction without making a route, proof-rule, primitive-acceptance, or row-consumption decision",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_decision_frontier_route_handoff_contract_classifier: artifactRecord(paths.routeHandoff),
      accepted_status_proof_grade_route_input_target_packet: artifactRecord(paths.proofGradeTarget),
      accepted_status_primitive_source_packet_route_narrowing_classifier: artifactRecord(paths.primitiveNarrowing),
      accepted_status_source_packet_acceptance_rule_target_packet: artifactRecord(paths.ruleTarget),
    },
    source_hash_checks: sourceChecks,
    current_pool_route_input_disjunction_snapshot: poolSnapshot,
    route_input_disjunction_rule:
      "The accepted interval-certified status lane can continue only if the proof-grade route input target or the primitive/source-packet route input target is satisfied. This classifier verifies neither side of that disjunction is satisfied in the current pool.",
    branch_route_input_targets: [
      {
        branch: "proof_grade_accepted_status_route_input",
        fields: proof.proof_grade_route_input_target_fields,
        total_slots: proof.total_proof_grade_route_input_target_slots,
        satisfied_slots: proof.total_proof_grade_route_input_target_slots_satisfied,
        missing_slots: proof.total_proof_grade_route_input_target_slots_missing,
        branch_satisfied: false,
        first_blocker: proof.first_proof_grade_route_input_blocker,
      },
      {
        branch: "primitive_source_packet_route_input",
        fields: primitive.primitive_source_packet_route_input_target_fields,
        total_slots: primitive.total_primitive_source_packet_route_input_target_slots,
        satisfied_slots: primitive.total_primitive_source_packet_route_input_target_slots_satisfied,
        missing_slots: primitive.total_primitive_source_packet_route_input_target_slots_missing,
        branch_satisfied: false,
        first_blocker: primitive.first_primitive_source_packet_route_input_blocker,
      },
    ],
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "Both accepted-status route-input branches are explicit, but the current pool satisfies neither the proof-grade route input nor the primitive/source-packet route input.",
      continuation_class:
        "requires new proof-grade accepted-status evidence or an explicit primitive/source-packet acceptance decision; no mechanical continuation exists from current inputs",
      fail_closed_stop_conditions: [
        "Do not treat this disjunction closure classifier as an accepted interval-certified constants status.",
        "Do not choose a branch, proof rule, source-packet acceptance rule, or primitive acceptance from an unsatisfied disjunction.",
        "Do not infer parent_complement_consumption_ref or higher_fold_separator_layer_certificate from this classifier.",
        "Do not consume rows, set preledger_pass, update the live ledger, or authorize a branch chart.",
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
      "Captured as a priority-only certificate-side route-input disjunction closure handoff classifier under reference/priorities/proof-programs; no promotion to content/markdown/aaa.",
  };
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
  const branchRows = packet.branch_route_input_targets.map((branch) => [
    `\`${branch.branch}\``,
    String(branch.fields),
    String(branch.total_slots),
    String(branch.satisfied_slots),
    String(branch.missing_slots),
    String(branch.branch_satisfied),
    `\`${branch.first_blocker}\``,
  ]);
  const rowsBySeparatorRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Route-Input Disjunction Closure Handoff Classifier

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Disjunction Closure

This classifier imports the route-handoff contract classifier, the proof-grade
route-input target packet, the primitive source-packet route narrowing
classifier, and the source-packet acceptance rule target packet. It proves that
both accepted-status route-input branches are explicit and that the current
pool satisfies neither side of the disjunction.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct source-hash locks;
- ${s.retained_route_handoff_direct_source_hash_checks_passed} / 4 retained route-handoff locks;
- ${s.retained_proof_grade_route_input_direct_source_hash_checks_passed} / 3 retained proof-grade route-input locks;
- ${s.retained_primitive_route_input_direct_source_hash_checks_passed} / 5 retained primitive route-input locks;
- ${s.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed} / 3 retained source-packet acceptance rule target locks.

Disjunction result:

- ${s.current_pool_route_input_disjunction_json_files_scanned} current-pool JSON files scanned before this output;
- ${s.route_input_disjunctions_declared} route-input disjunction declared;
- ${s.route_input_disjunctions_satisfied} route-input disjunctions satisfied;
- ${s.combined_route_input_disjunction_fields} combined route-input fields;
- ${s.separator_combined_route_input_disjunction_slots} separator combined route-input slots;
- ${s.row_combined_route_input_disjunction_slots} row combined route-input slots;
- ${s.total_combined_route_input_disjunction_slots} total combined route-input slots;
- ${s.total_combined_route_input_disjunction_slots_satisfied} total combined route-input slots satisfied;
- ${s.total_combined_route_input_disjunction_slots_missing} total combined route-input slots missing;
- ${s.mechanical_continuations_from_current_pool} mechanical continuations from the current pool.

The first route-input disjunction blocker is
\`${s.first_route_input_disjunction_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source-Hash Checks

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

## Branch Route Inputs

| Branch | Fields | Total slots | Satisfied slots | Missing slots | Branch satisfied | First blocker |
| --- | ---: | ---: | ---: | ---: | --- | --- |
${markdownTable(branchRows)}

## Row Scope

| Separator | Rows |
| --- | ---: |
${markdownTable(rowsBySeparatorRows)}

## Certificate-Side Handoff

Sharpened blocker: both accepted-status route-input branches are explicit, but
the current pool satisfies neither the proof-grade route input nor the
primitive/source-packet route input.

Continuation class: requires new proof-grade accepted-status evidence or an
explicit primitive/source-packet acceptance decision; this classifier makes no
branch choice and supplies no rule.

Fail-closed stop conditions:

- Do not treat this disjunction closure classifier as an accepted
  interval-certified constants status.
- Do not choose a branch, proof rule, source-packet acceptance rule, or
  primitive acceptance from an unsatisfied disjunction.
- Do not infer \`parent_complement_consumption_ref\` or
  \`higher_fold_separator_layer_certificate\` from this classifier.
- Do not consume rows, set \`preledger_pass\`, update the live ledger, or
  authorize a branch chart.

## Authorization Lock

- \`preledger_pass\`: ${packet.authorization_lock.preledger_pass}
- \`updates_live_ledger\`: ${packet.authorization_lock.updates_live_ledger}
- \`accepted_fold_layer_rows\`: ${packet.authorization_lock.accepted_fold_layer_rows}
- \`row_consumption_count\`: ${packet.authorization_lock.row_consumption_count}
- \`branch_chart_authorized\`: ${packet.authorization_lock.branch_chart_authorized}

This artifact is priority-only and proves no accepted interval-certified
constants status, source-packet acceptance rule, accepted
\`same_packet_fold_impulse_or_direct_quadrature_bound\`,
\`parent_complement_consumption_ref\`,
\`higher_fold_separator_layer_certificate\`, row consumption, live-ledger
update, or branch-chart authorization.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    routeHandoff: args.routeHandoff,
    proofGradeTarget: args.proofGradeTarget,
    primitiveNarrowing: args.primitiveNarrowing,
    ruleTarget: args.ruleTarget,
    certificatePoolDir: args.certificatePoolDir,
  };
  const inputs = {
    routeHandoff: readJson(paths.routeHandoff),
    proofGradeTarget: readJson(paths.proofGradeTarget),
    primitiveNarrowing: readJson(paths.primitiveNarrowing),
    ruleTarget: readJson(paths.ruleTarget),
  };
  const packet = buildPacket(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, packet, args.pretty);
  writeText(outReport, renderReport(packet));
  console.log(`wrote ${outJson}`);
  console.log(`wrote ${outReport}`);
  for (const [key, value] of Object.entries(packet.summary)) {
    if (typeof value !== "object" || value === null) {
      console.log(`${key}: ${value}`);
    } else if (key === "rows_by_separator_count") {
      console.log(`${key}: ${Object.values(value).join(",")}`);
    }
  }
}

main();
