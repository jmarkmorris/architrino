#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ROUTE_HANDOFF = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_route_handoff_contract_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_BRIDGE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_certificate_to_proof_grade_derivation_bridge_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_route_input_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_route_input_target_packet_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_narrowing_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_disjunction_closure_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
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
]);

const ROUTE_HANDOFF_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_route_handoff_contract_classifier_fail_closed_two_route_handoff_contracts_declared_current_pool_inputs_absent_no_route_decision_no_rule_decision_no_row_consumption";
const PROOF_GRADE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier_fail_closed_source_certificates_complete_no_compatible_proof_grade_status_evidence_no_primitive_acceptance_no_row_consumption";
const BRIDGE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_certificate_to_proof_grade_derivation_bridge_attempt_fail_closed_source_certificates_present_proof_grade_status_derivation_bridge_absent_no_primitive_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_route_input_target_packet_fail_closed_proof_grade_route_input_target_declared_current_pool_input_absent_no_route_decision_no_rule_decision_no_row_consumption";

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

const PROOF_GRADE_ROUTE_INPUT_FIELDS = [
  "accepted_interval_certified_constants_status_proof_grade_derivation_ref",
  "accepted_interval_certified_constants_status_derivation",
  "accepted_interval_certified_constants_status_rule",
  "accepted_interval_certified_constants_status_soundness_proof",
  "accepted_interval_certified_constants_status_endpoint_application",
  "accepted_constants_conformance_derivation",
];

function parseArgs(argv) {
  const args = {
    routeHandoff: DEFAULT_ROUTE_HANDOFF,
    proofGradeEvidence: DEFAULT_PROOF_GRADE_EVIDENCE,
    bridge: DEFAULT_BRIDGE,
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
    } else if (arg === "--proof-grade-evidence") {
      args.proofGradeEvidence = argv[++index];
    } else if (arg === "--bridge") {
      args.bridge = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-proof-grade-route-input-target-packet.mjs [options]

Options:
  --route-handoff PATH         Decision-frontier route-handoff contract classifier. Defaults to ${DEFAULT_ROUTE_HANDOFF}.
  --proof-grade-evidence PATH  Proof-grade evidence dependency classifier. Defaults to ${DEFAULT_PROOF_GRADE_EVIDENCE}.
  --bridge PATH                Source-certificate-to-proof-grade-derivation bridge attempt. Defaults to ${DEFAULT_BRIDGE}.
  --certificate-pool-dir PATH  Certificate pool directory. Defaults to ${CERT_DIR}.
  --out-dir PATH               Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                     Pretty-print JSON artifact.
  --help                       Show this help.`);
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
    ["accepted_status_proof_grade_evidence_dependency_classifier", paths.proofGradeEvidence],
    ["accepted_status_source_certificate_to_proof_grade_derivation_bridge_attempt", paths.bridge],
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

function firstMissingEvidenceBlocker(evidenceSlotChecks) {
  for (const field of Object.keys(evidenceSlotChecks)) {
    const check = evidenceSlotChecks[field];
    if (check?.filled !== true) {
      return check?.first_blocker ?? `${field}_absent`;
    }
  }
  return null;
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
  assertPacketStatusAndLocks(inputs.routeHandoff, "routeHandoff", ROUTE_HANDOFF_STATUS);
  assertPacketStatusAndLocks(inputs.proofGradeEvidence, "proofGradeEvidence", PROOF_GRADE_EVIDENCE_STATUS);
  assertPacketStatusAndLocks(inputs.bridge, "bridge", BRIDGE_STATUS);

  const routeSummary = inputs.routeHandoff.summary;
  const evidenceSummary = inputs.proofGradeEvidence.summary;
  const bridgeSummary = inputs.bridge.summary;
  const expected = [
    [routeSummary.direct_source_hash_checks_passed, 4, "route-handoff direct source-hash locks"],
    [routeSummary.retained_decision_frontier_direct_source_hash_checks_passed, 4, "decision-frontier locks"],
    [routeSummary.retained_route_exhaustion_direct_source_hash_checks_passed, 3, "route-exhaustion locks"],
    [routeSummary.retained_bridge_locked_source_hash_checks_passed, 9, "bridge-locked locks"],
    [routeSummary.route_handoff_contracts_declared, 2, "route-handoff contracts declared"],
    [routeSummary.route_handoff_contracts_satisfied, 0, "route-handoff contracts satisfied"],
    [routeSummary.proof_grade_route_handoff_contract_fields, 6, "proof-grade contract fields"],
    [routeSummary.separator_proof_grade_route_handoff_contract_slots, 72, "separator proof-grade slots"],
    [routeSummary.row_proof_grade_route_handoff_contract_slots, 672, "row proof-grade slots"],
    [routeSummary.current_pool_handoff_input_json_files_scanned, 242, "route-handoff current-pool scan"],
    [evidenceSummary.source_hash_checks_passed, 9, "proof-grade evidence source locks"],
    [
      evidenceSummary.evidence_pool_compatible_proof_grade_status_evidence_files,
      0,
      "compatible proof-grade evidence files",
    ],
    [evidenceSummary.separator_proof_grade_evidence_slots, 72, "separator proof-grade evidence slots"],
    [evidenceSummary.row_proof_grade_evidence_slots, 672, "row proof-grade evidence slots"],
    [bridgeSummary.source_data_obligation_source_hash_checks_passed, 9, "bridge source-data locks"],
    [bridgeSummary.separator_status_derivation_bridge_ready_count, 0, "separator bridge-ready count"],
    [bridgeSummary.row_status_derivation_bridge_ready_count, 0, "row bridge-ready count"],
    [bridgeSummary.missing_separator_bridge_criteria, 72, "missing separator bridge criteria"],
    [bridgeSummary.missing_row_bridge_criteria, 672, "missing row bridge criteria"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
  if (JSON.stringify(routeSummary.rows_by_separator_count) !== JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR)) {
    throw new Error("Unexpected route-handoff rows-by-separator count.");
  }
  if (JSON.stringify(evidenceSummary.rows_by_separator_count) !== JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR)) {
    throw new Error("Unexpected proof-grade evidence rows-by-separator count.");
  }
  if (JSON.stringify(bridgeSummary.rows_by_separator_count) !== JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR)) {
    throw new Error("Unexpected bridge rows-by-separator count.");
  }
}

function routeInputContract(routeHandoff) {
  const proofContract = routeHandoff.route_handoff_contracts.find(
    (contract) =>
      contract.route_handoff_contract ===
      "proof_grade_accepted_interval_certified_constants_status_evidence_contract",
  );
  if (!proofContract) {
    throw new Error("Missing proof-grade route-handoff contract.");
  }
  return {
    route_input_target: "proof_grade_accepted_interval_certified_constants_status_route_input",
    source_contract: proofContract.route_handoff_contract,
    required_route_input: proofContract.required_route_input,
    target_fields: PROOF_GRADE_ROUTE_INPUT_FIELDS,
    separator_route_input_slots: proofContract.separator_contract_slots,
    separator_route_input_slots_satisfied: 0,
    separator_route_input_slots_missing: proofContract.separator_contract_slots,
    row_route_input_slots: proofContract.row_contract_slots,
    row_route_input_slots_satisfied: 0,
    row_route_input_slots_missing: proofContract.row_contract_slots,
    route_input_target_satisfied: false,
    route_decision_made: false,
    proof_rule_decision_made: false,
    accepted_interval_certified_constants_status_constructed: false,
    first_route_input_blocker: proofContract.first_contract_blocker,
  };
}

function separatorTargets(proofGradeEvidence) {
  return proofGradeEvidence.separator_proof_grade_evidence_dependency_profiles.map((profile) => ({
    separator_event: profile.separator_event,
    fold_interval: profile.fold_interval,
    row_count: profile.row_count,
    derivation_source_evidence_complete: profile.derivation_source_evidence_complete,
    route_input_target_fields: PROOF_GRADE_ROUTE_INPUT_FIELDS,
    route_input_target_slots: profile.proof_grade_evidence_slots,
    route_input_target_slots_satisfied: profile.compatible_proof_grade_evidence_slots_filled,
    route_input_target_slots_missing: profile.compatible_proof_grade_evidence_slots_missing,
    proof_grade_route_input_target_satisfied: false,
    accepted_interval_certified_constants_status_ref_constructed: false,
    accepted_interval_certified_constants_status_present: false,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_route_input_blocker: firstMissingEvidenceBlocker(profile.evidence_slot_checks),
    classification: "separator_source_certificates_complete_proof_grade_route_input_target_unfilled",
  }));
}

function rowTargets(proofGradeEvidence) {
  return proofGradeEvidence.row_proof_grade_evidence_dependency_profiles.map((profile) => ({
    row_id: profile.row_id,
    ledger: profile.ledger,
    status: profile.status,
    failure_code: profile.failure_code,
    separator_event: profile.separator_event,
    fold_interval: profile.fold_interval,
    receiver_interval: profile.receiver_interval,
    source_interval: profile.source_interval,
    derivation_source_evidence_complete: profile.derivation_source_evidence_complete,
    route_input_target_fields: PROOF_GRADE_ROUTE_INPUT_FIELDS,
    route_input_target_slots: profile.proof_grade_evidence_slots,
    route_input_target_slots_satisfied: profile.compatible_proof_grade_evidence_slots_filled,
    route_input_target_slots_missing: profile.compatible_proof_grade_evidence_slots_missing,
    proof_grade_route_input_target_satisfied: false,
    accepted_interval_certified_constants_status_ref_constructed: false,
    accepted_interval_certified_constants_status_present: false,
    accepted_fold_layer_row: false,
    row_consumed: false,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_route_input_blocker: firstMissingEvidenceBlocker(profile.evidence_slot_checks),
    classification: "row_source_certificates_complete_proof_grade_route_input_target_unfilled",
  }));
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const poolSnapshot = currentCertificatePoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const routeSummary = inputs.routeHandoff.summary;
  const evidenceSummary = inputs.proofGradeEvidence.summary;
  const bridgeSummary = inputs.bridge.summary;
  const contract = routeInputContract(inputs.routeHandoff);
  const separatorProfiles = separatorTargets(inputs.proofGradeEvidence);
  const rowProfiles = rowTargets(inputs.proofGradeEvidence);
  const totalSlots = contract.separator_route_input_slots + contract.row_route_input_slots;
  const totalSlotsSatisfied =
    contract.separator_route_input_slots_satisfied + contract.row_route_input_slots_satisfied;
  const totalSlotsMissing = contract.separator_route_input_slots_missing + contract.row_route_input_slots_missing;

  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    retained_route_handoff_direct_source_hash_checks_passed: routeSummary.direct_source_hash_checks_passed,
    retained_decision_frontier_direct_source_hash_checks_passed:
      routeSummary.retained_decision_frontier_direct_source_hash_checks_passed,
    retained_route_exhaustion_direct_source_hash_checks_passed:
      routeSummary.retained_route_exhaustion_direct_source_hash_checks_passed,
    retained_bridge_locked_source_hash_checks_passed: routeSummary.retained_bridge_locked_source_hash_checks_passed,
    retained_proof_grade_evidence_source_hash_checks_passed: evidenceSummary.source_hash_checks_passed,
    retained_bridge_source_data_obligation_source_hash_checks_passed:
      bridgeSummary.source_data_obligation_source_hash_checks_passed,
    imported_current_pool_handoff_input_json_files_scanned: routeSummary.current_pool_handoff_input_json_files_scanned,
    current_pool_proof_grade_route_input_json_files_scanned: poolSnapshot.json_files_scanned_before_output,
    candidate_higher_fold_constants_artifacts: routeSummary.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: routeSummary.candidate_separator_constants,
    candidate_row_constant_associations: routeSummary.candidate_row_constant_associations,
    rows_by_separator_count: routeSummary.rows_by_separator_count,
    separators_with_derivation_source_evidence_complete:
      evidenceSummary.separators_with_derivation_source_evidence_complete,
    rows_with_derivation_source_evidence_complete: evidenceSummary.rows_with_derivation_source_evidence_complete,
    proof_grade_route_handoff_contracts_selected: 1,
    proof_grade_route_handoff_contracts_satisfied: 0,
    proof_grade_route_input_targets_declared: 1,
    proof_grade_route_input_targets_satisfied: 0,
    proof_grade_route_input_target_fields: PROOF_GRADE_ROUTE_INPUT_FIELDS.length,
    separator_proof_grade_route_input_target_slots: contract.separator_route_input_slots,
    separator_proof_grade_route_input_target_slots_satisfied: contract.separator_route_input_slots_satisfied,
    separator_proof_grade_route_input_target_slots_missing: contract.separator_route_input_slots_missing,
    row_proof_grade_route_input_target_slots: contract.row_route_input_slots,
    row_proof_grade_route_input_target_slots_satisfied: contract.row_route_input_slots_satisfied,
    row_proof_grade_route_input_target_slots_missing: contract.row_route_input_slots_missing,
    total_proof_grade_route_input_target_slots: totalSlots,
    total_proof_grade_route_input_target_slots_satisfied: totalSlotsSatisfied,
    total_proof_grade_route_input_target_slots_missing: totalSlotsMissing,
    compatible_proof_grade_current_pool_evidence_files: routeSummary.compatible_proof_grade_current_pool_evidence_files,
    compatible_proof_grade_route_input_current_pool_files: 0,
    separator_status_derivation_bridge_ready_count: bridgeSummary.separator_status_derivation_bridge_ready_count,
    row_status_derivation_bridge_ready_count: bridgeSummary.row_status_derivation_bridge_ready_count,
    missing_separator_bridge_criteria: bridgeSummary.missing_separator_bridge_criteria,
    missing_row_bridge_criteria: bridgeSummary.missing_row_bridge_criteria,
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
    first_proof_grade_route_input_blocker: contract.first_route_input_blocker,
    parent_complement_consumption_ref_blocker: "parent_complement_consumption_ref_absent",
    first_separator_certificate_blocker: "higher_fold_separator_layer_certificate_absent",
  };

  const invariant =
    summary.direct_source_hash_checks === 3 &&
    summary.direct_source_hash_checks_passed === 3 &&
    summary.retained_route_handoff_direct_source_hash_checks_passed === 4 &&
    summary.retained_decision_frontier_direct_source_hash_checks_passed === 4 &&
    summary.retained_route_exhaustion_direct_source_hash_checks_passed === 3 &&
    summary.retained_bridge_locked_source_hash_checks_passed === 9 &&
    summary.retained_proof_grade_evidence_source_hash_checks_passed === 9 &&
    summary.retained_bridge_source_data_obligation_source_hash_checks_passed === 9 &&
    summary.imported_current_pool_handoff_input_json_files_scanned === 242 &&
    summary.current_pool_proof_grade_route_input_json_files_scanned === 243 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    JSON.stringify(summary.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR) &&
    summary.proof_grade_route_handoff_contracts_selected === 1 &&
    summary.proof_grade_route_handoff_contracts_satisfied === 0 &&
    summary.proof_grade_route_input_targets_declared === 1 &&
    summary.proof_grade_route_input_targets_satisfied === 0 &&
    summary.proof_grade_route_input_target_fields === 6 &&
    summary.separator_proof_grade_route_input_target_slots === 72 &&
    summary.separator_proof_grade_route_input_target_slots_satisfied === 0 &&
    summary.separator_proof_grade_route_input_target_slots_missing === 72 &&
    summary.row_proof_grade_route_input_target_slots === 672 &&
    summary.row_proof_grade_route_input_target_slots_satisfied === 0 &&
    summary.row_proof_grade_route_input_target_slots_missing === 672 &&
    summary.total_proof_grade_route_input_target_slots === 744 &&
    summary.total_proof_grade_route_input_target_slots_satisfied === 0 &&
    summary.total_proof_grade_route_input_target_slots_missing === 744 &&
    summary.compatible_proof_grade_current_pool_evidence_files === 0 &&
    summary.compatible_proof_grade_route_input_current_pool_files === 0 &&
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
    throw new Error("Proof-grade route-input target invariant failed.");
  }

  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-proof-grade-route-input-target-packet-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only accepted interval-certified status proof-grade route-input target packet; declares the exact proof-grade route input target that would satisfy one route-handoff contract while proving the current pool does not supply it and making no route, rule, primitive-acceptance, or row-consumption decision",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_decision_frontier_route_handoff_contract_classifier: artifactRecord(paths.routeHandoff),
      accepted_status_proof_grade_evidence_dependency_classifier: artifactRecord(paths.proofGradeEvidence),
      accepted_status_source_certificate_to_proof_grade_derivation_bridge_attempt: artifactRecord(paths.bridge),
    },
    source_hash_checks: sourceChecks,
    current_pool_proof_grade_route_input_snapshot: poolSnapshot,
    proof_grade_route_input_target_rule:
      "The proof-grade accepted-status route can continue only when all six accepted interval-certified status route input fields are supplied for the live higher-fold separator family and row scope. This target packet declares those fields and fills none of them.",
    proof_grade_route_input_contract: contract,
    separator_proof_grade_route_input_target_profiles: separatorProfiles,
    row_proof_grade_route_input_target_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "One route-handoff contract has been expanded into a proof-grade route-input target: 6 fields across 12 separators and 112 row associations, for 744 route-input slots. All slots remain unfilled in the current pool.",
      continuation_class:
        "mechanical only after a proof-grade accepted-status route input object is supplied; otherwise blocked on proof-grade evidence construction or the separate source-packet acceptance route",
      fail_closed_stop_conditions: [
        "Do not treat this route-input target packet as an accepted interval-certified constants status.",
        "Do not treat declaration of the proof-grade route-input target as a route choice or proof-rule decision.",
        "Do not infer a source-packet acceptance rule, accepted source packet, parent_complement_consumption_ref, or higher_fold_separator_layer_certificate from this packet.",
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
      "Captured as a priority-only certificate-side proof-grade route-input target packet under reference/priorities/proof-programs; no promotion to content/markdown/aaa.",
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
  const contract = packet.proof_grade_route_input_contract;
  const fieldRows = contract.target_fields.map((field) => [
    `\`${field}\``,
    "0",
    String(s.candidate_separator_constants),
    String(s.candidate_row_constant_associations),
  ]);
  const separatorRows = packet.separator_proof_grade_route_input_target_profiles.map((entry) => [
    `\`${entry.separator_event}\``,
    `\`${entry.fold_interval}\``,
    String(entry.row_count),
    String(entry.derivation_source_evidence_complete),
    String(entry.route_input_target_slots_satisfied),
    String(entry.route_input_target_slots_missing),
    `\`${entry.first_route_input_blocker}\``,
  ]);
  const rowsBySeparatorRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Proof-Grade Route-Input Target Packet

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Proof-Grade Route-Input Target

This packet imports the decision-frontier route-handoff contract classifier, the
proof-grade evidence dependency classifier, and the
source-certificate-to-proof-grade-derivation bridge attempt. It expands the
proof-grade accepted-status route-handoff contract into an explicit route-input
target and fills no route-input fields.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct source-hash locks;
- ${s.retained_route_handoff_direct_source_hash_checks_passed} / 4 retained route-handoff source-hash locks;
- ${s.retained_decision_frontier_direct_source_hash_checks_passed} / 4 retained decision-frontier source-hash locks;
- ${s.retained_route_exhaustion_direct_source_hash_checks_passed} / 3 retained route-exhaustion source-hash locks;
- ${s.retained_bridge_locked_source_hash_checks_passed} / 9 retained bridge-locked source-hash locks;
- ${s.retained_proof_grade_evidence_source_hash_checks_passed} / 9 retained proof-grade evidence source-hash locks;
- ${s.retained_bridge_source_data_obligation_source_hash_checks_passed} / 9 retained bridge source-data source-hash locks.

Target result:

- ${s.current_pool_proof_grade_route_input_json_files_scanned} current-pool JSON files scanned before this output;
- ${s.proof_grade_route_input_targets_declared} proof-grade route-input target declared;
- ${s.proof_grade_route_input_targets_satisfied} proof-grade route-input targets satisfied;
- ${s.proof_grade_route_input_target_fields} proof-grade route-input fields;
- ${s.separator_proof_grade_route_input_target_slots} separator proof-grade route-input slots;
- ${s.row_proof_grade_route_input_target_slots} row proof-grade route-input slots;
- ${s.total_proof_grade_route_input_target_slots} total proof-grade route-input slots;
- ${s.total_proof_grade_route_input_target_slots_satisfied} total proof-grade route-input slots satisfied;
- ${s.total_proof_grade_route_input_target_slots_missing} total proof-grade route-input slots missing;
- ${s.mechanical_continuations_from_current_pool} mechanical continuations from the current pool.

The first proof-grade route-input blocker is
\`${s.first_proof_grade_route_input_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source-Hash Checks

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

## Route-Input Fields

| Field | Filled now | Separator slots required | Row slots required |
| --- | ---: | ---: | ---: |
${markdownTable(fieldRows)}

## Separator Route-Input Targets

| Separator | Fold interval | Rows | Source evidence complete | Slots filled | Slots missing | First blocker |
| --- | --- | ---: | --- | ---: | ---: | --- |
${markdownTable(separatorRows)}

## Row Scope

| Separator | Rows |
| --- | ---: |
${markdownTable(rowsBySeparatorRows)}

## Certificate-Side Handoff

Sharpened blocker: one route-handoff contract is now an explicit proof-grade
route-input target with ${s.total_proof_grade_route_input_target_slots} slots,
all missing.

Continuation class: requires a proof-grade accepted-status route input object
or the separate source-packet acceptance route; this packet makes no route
choice and supplies no rule.

Fail-closed stop conditions:

- Do not treat this route-input target packet as an accepted interval-certified
  constants status.
- Do not treat declaration of the proof-grade route-input target as a route
  choice or proof-rule decision.
- Do not infer a source-packet acceptance rule, accepted source packet,
  \`parent_complement_consumption_ref\`, or
  \`higher_fold_separator_layer_certificate\` from this packet.
- Do not consume rows, set \`preledger_pass\`, update the live ledger, or
  authorize a branch chart.

## Authorization Lock

- \`preledger_pass\`: ${packet.authorization_lock.preledger_pass}
- \`updates_live_ledger\`: ${packet.authorization_lock.updates_live_ledger}
- \`accepted_fold_layer_rows\`: ${packet.authorization_lock.accepted_fold_layer_rows}
- \`row_consumption_count\`: ${packet.authorization_lock.row_consumption_count}
- \`branch_chart_authorized\`: ${packet.authorization_lock.branch_chart_authorized}

This artifact is priority-only and proves no accepted interval-certified
constants status, accepted \`same_packet_fold_impulse_or_direct_quadrature_bound\`,
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
    proofGradeEvidence: args.proofGradeEvidence,
    bridge: args.bridge,
    certificatePoolDir: args.certificatePoolDir,
  };
  const inputs = {
    routeHandoff: readJson(paths.routeHandoff),
    proofGradeEvidence: readJson(paths.proofGradeEvidence),
    bridge: readJson(paths.bridge),
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
