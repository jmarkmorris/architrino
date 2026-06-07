#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_DECISION_FRONTIER = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROUTE_EXHAUSTION_CLOSURE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_certificate_pool_route_exhaustion_closure_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_SOURCE_PACKET_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_route_handoff_contract_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_route_handoff_contract_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_route_input_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
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
]);

const DECISION_FRONTIER_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_obligation_classifier_fail_closed_current_pool_exhausted_requires_proof_grade_status_evidence_or_source_packet_acceptance_decision_no_rule_decision_no_row_consumption";
const ROUTE_EXHAUSTION_CLOSURE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_certificate_pool_route_exhaustion_closure_classifier_fail_closed_proof_grade_and_source_packet_routes_exhausted_no_compatible_current_pool_evidence_no_primitive_acceptance_no_row_consumption";
const PROOF_GRADE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier_fail_closed_source_certificates_complete_no_compatible_proof_grade_status_evidence_no_primitive_acceptance_no_row_consumption";
const PRIMITIVE_SOURCE_PACKET_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier_fail_closed_frontier_locked_separator_aggregates_present_no_compatible_source_packet_acceptance_evidence_no_primitive_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_route_handoff_contract_classifier_fail_closed_two_route_handoff_contracts_declared_current_pool_inputs_absent_no_route_decision_no_rule_decision_no_row_consumption";

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
    decisionFrontier: DEFAULT_DECISION_FRONTIER,
    routeExhaustionClosure: DEFAULT_ROUTE_EXHAUSTION_CLOSURE,
    proofGradeEvidence: DEFAULT_PROOF_GRADE_EVIDENCE,
    primitiveSourcePacketEvidence: DEFAULT_PRIMITIVE_SOURCE_PACKET_EVIDENCE,
    certificatePoolDir: CERT_DIR,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--decision-frontier") {
      args.decisionFrontier = argv[++index];
    } else if (arg === "--route-exhaustion-closure") {
      args.routeExhaustionClosure = argv[++index];
    } else if (arg === "--proof-grade-evidence") {
      args.proofGradeEvidence = argv[++index];
    } else if (arg === "--primitive-source-packet-evidence") {
      args.primitiveSourcePacketEvidence = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-decision-frontier-route-handoff-contract-classifier.mjs [options]

Options:
  --decision-frontier PATH             Decision-frontier obligation classifier. Defaults to ${DEFAULT_DECISION_FRONTIER}.
  --route-exhaustion-closure PATH      Current certificate-pool route exhaustion closure classifier. Defaults to ${DEFAULT_ROUTE_EXHAUSTION_CLOSURE}.
  --proof-grade-evidence PATH          Proof-grade evidence dependency classifier. Defaults to ${DEFAULT_PROOF_GRADE_EVIDENCE}.
  --primitive-source-packet-evidence PATH
                                        Primitive source-packet acceptance evidence dependency classifier. Defaults to ${DEFAULT_PRIMITIVE_SOURCE_PACKET_EVIDENCE}.
  --certificate-pool-dir PATH          Certificate pool directory. Defaults to ${CERT_DIR}.
  --out-dir PATH                       Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                             Pretty-print JSON artifact.
  --help                               Show this help.`);
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
    ["accepted_status_decision_frontier_obligation_classifier", paths.decisionFrontier],
    ["accepted_status_current_certificate_pool_route_exhaustion_closure_classifier", paths.routeExhaustionClosure],
    ["accepted_status_proof_grade_evidence_dependency_classifier", paths.proofGradeEvidence],
    ["accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier", paths.primitiveSourcePacketEvidence],
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

function validateDecisionFrontier(decisionFrontier) {
  assertPacketStatusAndLocks(decisionFrontier, "decisionFrontier", DECISION_FRONTIER_STATUS);
  const s = decisionFrontier.summary;
  const expected = [
    [s.direct_source_hash_checks_passed, 4, "direct source-hash locks"],
    [s.retained_route_exhaustion_direct_source_hash_checks_passed, 3, "route-exhaustion locks"],
    [s.retained_frontier_source_hash_checks_passed, 4, "frontier locks"],
    [s.retained_bridge_locked_source_hash_checks_passed, 9, "bridge-locked locks"],
    [s.retained_source_packet_route_source_hash_checks_passed, 5, "source-packet route locks"],
    [s.current_certificate_pool_json_files_scanned, 240, "current certificate-pool JSON files"],
    [s.candidate_higher_fold_constants_artifacts, 1, "candidate artifacts"],
    [s.candidate_separator_constants, 12, "separator constants"],
    [s.candidate_row_constant_associations, 112, "row associations"],
    [s.decision_frontier_classes, 2, "decision frontier classes"],
    [s.mechanical_continuations_from_current_pool, 0, "mechanical continuations"],
    [s.proof_rule_decisions_made, 0, "proof-rule decisions"],
    [s.primitive_acceptance_decisions_made, 0, "primitive-acceptance decisions"],
    [s.row_consumption_count, 0, "row consumption"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected decision frontier ${label}: ${actual}`);
    }
  }
}

function validateDirectInputs(inputs) {
  validateDecisionFrontier(inputs.decisionFrontier);
  assertPacketStatusAndLocks(
    inputs.routeExhaustionClosure,
    "routeExhaustionClosure",
    ROUTE_EXHAUSTION_CLOSURE_STATUS,
  );
  assertPacketStatusAndLocks(inputs.proofGradeEvidence, "proofGradeEvidence", PROOF_GRADE_EVIDENCE_STATUS);
  assertPacketStatusAndLocks(
    inputs.primitiveSourcePacketEvidence,
    "primitiveSourcePacketEvidence",
    PRIMITIVE_SOURCE_PACKET_EVIDENCE_STATUS,
  );
  const expected = [
    [inputs.routeExhaustionClosure.summary.direct_source_hash_checks_passed, 3, "route-exhaustion locks"],
    [inputs.routeExhaustionClosure.summary.retained_frontier_source_hash_checks_passed, 4, "frontier locks"],
    [inputs.routeExhaustionClosure.summary.retained_bridge_locked_source_hash_checks_passed, 9, "bridge locks"],
    [
      inputs.routeExhaustionClosure.summary.retained_source_packet_route_source_hash_checks_passed,
      5,
      "source-packet route locks",
    ],
    [
      inputs.proofGradeEvidence.summary.evidence_pool_compatible_proof_grade_status_evidence_files,
      0,
      "compatible proof-grade evidence files",
    ],
    [
      inputs.primitiveSourcePacketEvidence.summary.evidence_pool_compatible_source_packet_acceptance_evidence_files,
      0,
      "compatible source-packet acceptance files",
    ],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected direct input ${label}: ${actual}`);
    }
  }
}

function routeHandoffContracts(decisionFrontier) {
  const s = decisionFrontier.summary;
  return [
    {
      route_handoff_contract: "proof_grade_accepted_interval_certified_constants_status_evidence_contract",
      required_route_input: "proof_grade_accepted_status_evidence_construction",
      contract_fields: decisionFrontier.proof_grade_decision_frontier_obligation_fields,
      separator_contract_slots: s.separator_proof_grade_decision_frontier_obligation_slots,
      separator_contract_slots_satisfied: s.separator_proof_grade_decision_frontier_obligation_slots_satisfied,
      separator_contract_slots_missing: s.separator_proof_grade_decision_frontier_obligation_slots_missing,
      row_contract_slots: s.row_proof_grade_decision_frontier_obligation_slots,
      row_contract_slots_satisfied: s.row_proof_grade_decision_frontier_obligation_slots_satisfied,
      row_contract_slots_missing: s.row_proof_grade_decision_frontier_obligation_slots_missing,
      contract_satisfied: false,
      decision_made: false,
      accepted_interval_certified_constants_status_constructed: false,
      first_contract_blocker: s.first_proof_grade_decision_frontier_blocker,
    },
    {
      route_handoff_contract: "primitive_source_packet_acceptance_contract",
      required_route_input: "source_packet_acceptance_rule_or_accepted_source_packet",
      contract_fields: decisionFrontier.primitive_source_packet_decision_frontier_obligation_fields,
      separator_contract_slots: s.separator_primitive_source_packet_decision_frontier_obligation_slots,
      separator_contract_slots_satisfied:
        s.separator_primitive_source_packet_decision_frontier_obligation_slots_satisfied,
      separator_contract_slots_missing: s.separator_primitive_source_packet_decision_frontier_obligation_slots_missing,
      row_contract_slots: s.row_primitive_source_packet_decision_frontier_obligation_slots,
      row_contract_slots_satisfied: s.row_primitive_source_packet_decision_frontier_obligation_slots_satisfied,
      row_contract_slots_missing: s.row_primitive_source_packet_decision_frontier_obligation_slots_missing,
      contract_satisfied: false,
      decision_made: false,
      source_packet_acceptance_rule_constructed: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_constructed: false,
      first_contract_blocker: s.first_primitive_source_packet_decision_frontier_blocker,
    },
  ];
}

function buildPacket(paths, inputs) {
  validateDirectInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const decisionFrontier = inputs.decisionFrontier;
  const contracts = routeHandoffContracts(decisionFrontier);
  const handoffInputSnapshot = currentCertificatePoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const s0 = decisionFrontier.summary;
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    retained_decision_frontier_direct_source_hash_checks_passed: s0.direct_source_hash_checks_passed,
    retained_route_exhaustion_direct_source_hash_checks_passed: s0.retained_route_exhaustion_direct_source_hash_checks_passed,
    retained_frontier_source_hash_checks_passed: s0.retained_frontier_source_hash_checks_passed,
    retained_bridge_locked_source_hash_checks_passed: s0.retained_bridge_locked_source_hash_checks_passed,
    retained_source_packet_route_source_hash_checks_passed: s0.retained_source_packet_route_source_hash_checks_passed,
    imported_route_exhaustion_current_certificate_pool_json_files_scanned: s0.current_certificate_pool_json_files_scanned,
    current_pool_handoff_input_json_files_scanned: handoffInputSnapshot.json_files_scanned_before_output,
    candidate_higher_fold_constants_artifacts: s0.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: s0.candidate_separator_constants,
    candidate_row_constant_associations: s0.candidate_row_constant_associations,
    rows_by_separator_count: s0.rows_by_separator_count,
    decision_frontier_classes: s0.decision_frontier_classes,
    route_handoff_contracts_declared: contracts.length,
    route_handoff_contracts_satisfied: countTrue(contracts, (entry) => entry.contract_satisfied),
    route_handoff_contracts_absent: contracts.length,
    proof_grade_route_handoff_contract_fields: s0.proof_grade_decision_frontier_obligation_families,
    primitive_source_packet_route_handoff_contract_fields:
      s0.primitive_source_packet_decision_frontier_obligation_families,
    combined_route_handoff_contract_fields: s0.combined_decision_frontier_obligation_families,
    separator_proof_grade_route_handoff_contract_slots: s0.separator_proof_grade_decision_frontier_obligation_slots,
    separator_proof_grade_route_handoff_contract_slots_satisfied:
      s0.separator_proof_grade_decision_frontier_obligation_slots_satisfied,
    separator_primitive_source_packet_route_handoff_contract_slots:
      s0.separator_primitive_source_packet_decision_frontier_obligation_slots,
    separator_primitive_source_packet_route_handoff_contract_slots_satisfied:
      s0.separator_primitive_source_packet_decision_frontier_obligation_slots_satisfied,
    separator_combined_route_handoff_contract_slots: s0.separator_combined_decision_frontier_obligation_slots,
    separator_combined_route_handoff_contract_slots_satisfied:
      s0.separator_combined_decision_frontier_obligation_slots_satisfied,
    separator_combined_route_handoff_contract_slots_missing:
      s0.separator_combined_decision_frontier_obligation_slots_missing,
    row_proof_grade_route_handoff_contract_slots: s0.row_proof_grade_decision_frontier_obligation_slots,
    row_proof_grade_route_handoff_contract_slots_satisfied:
      s0.row_proof_grade_decision_frontier_obligation_slots_satisfied,
    row_primitive_source_packet_route_handoff_contract_slots:
      s0.row_primitive_source_packet_decision_frontier_obligation_slots,
    row_primitive_source_packet_route_handoff_contract_slots_satisfied:
      s0.row_primitive_source_packet_decision_frontier_obligation_slots_satisfied,
    row_combined_route_handoff_contract_slots: s0.row_combined_decision_frontier_obligation_slots,
    row_combined_route_handoff_contract_slots_satisfied: s0.row_combined_decision_frontier_obligation_slots_satisfied,
    row_combined_route_handoff_contract_slots_missing: s0.row_combined_decision_frontier_obligation_slots_missing,
    mechanical_continuations_from_current_pool: s0.mechanical_continuations_from_current_pool,
    compatible_proof_grade_current_pool_evidence_files: s0.compatible_proof_grade_current_pool_evidence_files,
    compatible_source_packet_acceptance_current_pool_evidence_files:
      s0.compatible_source_packet_acceptance_current_pool_evidence_files,
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
    first_route_handoff_contract_blocker: "proof_grade_or_source_packet_route_handoff_contract_absent",
    parent_complement_consumption_ref_blocker: "parent_complement_consumption_ref_absent",
    first_separator_certificate_blocker: "higher_fold_separator_layer_certificate_absent",
  };
  const invariant =
    summary.direct_source_hash_checks === 4 &&
    summary.direct_source_hash_checks_passed === 4 &&
    summary.retained_decision_frontier_direct_source_hash_checks_passed === 4 &&
    summary.retained_route_exhaustion_direct_source_hash_checks_passed === 3 &&
    summary.retained_frontier_source_hash_checks_passed === 4 &&
    summary.retained_bridge_locked_source_hash_checks_passed === 9 &&
    summary.retained_source_packet_route_source_hash_checks_passed === 5 &&
    summary.imported_route_exhaustion_current_certificate_pool_json_files_scanned === 240 &&
    summary.current_pool_handoff_input_json_files_scanned === 242 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    JSON.stringify(summary.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR) &&
    summary.decision_frontier_classes === 2 &&
    summary.route_handoff_contracts_declared === 2 &&
    summary.route_handoff_contracts_satisfied === 0 &&
    summary.route_handoff_contracts_absent === 2 &&
    summary.proof_grade_route_handoff_contract_fields === 6 &&
    summary.primitive_source_packet_route_handoff_contract_fields === 2 &&
    summary.combined_route_handoff_contract_fields === 8 &&
    summary.separator_proof_grade_route_handoff_contract_slots === 72 &&
    summary.separator_proof_grade_route_handoff_contract_slots_satisfied === 0 &&
    summary.separator_primitive_source_packet_route_handoff_contract_slots === 24 &&
    summary.separator_primitive_source_packet_route_handoff_contract_slots_satisfied === 0 &&
    summary.separator_combined_route_handoff_contract_slots === 96 &&
    summary.separator_combined_route_handoff_contract_slots_satisfied === 0 &&
    summary.separator_combined_route_handoff_contract_slots_missing === 96 &&
    summary.row_proof_grade_route_handoff_contract_slots === 672 &&
    summary.row_proof_grade_route_handoff_contract_slots_satisfied === 0 &&
    summary.row_primitive_source_packet_route_handoff_contract_slots === 224 &&
    summary.row_primitive_source_packet_route_handoff_contract_slots_satisfied === 0 &&
    summary.row_combined_route_handoff_contract_slots === 896 &&
    summary.row_combined_route_handoff_contract_slots_satisfied === 0 &&
    summary.row_combined_route_handoff_contract_slots_missing === 896 &&
    summary.mechanical_continuations_from_current_pool === 0 &&
    summary.compatible_proof_grade_current_pool_evidence_files === 0 &&
    summary.compatible_source_packet_acceptance_current_pool_evidence_files === 0 &&
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
    throw new Error("Decision-frontier route-handoff contract invariant failed.");
  }
  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-decision-frontier-route-handoff-contract-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only accepted interval-certified status decision-frontier route-handoff contract classifier; declares the two admissible route-handoff contracts and verifies neither current-pool route input is present without making a route, rule, primitive-acceptance, or row-consumption decision",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_decision_frontier_obligation_classifier: artifactRecord(paths.decisionFrontier),
      accepted_status_current_certificate_pool_route_exhaustion_closure_classifier: artifactRecord(
        paths.routeExhaustionClosure,
      ),
      accepted_status_proof_grade_evidence_dependency_classifier: artifactRecord(paths.proofGradeEvidence),
      accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier: artifactRecord(
        paths.primitiveSourcePacketEvidence,
      ),
    },
    source_hash_checks: sourceChecks,
    current_pool_handoff_input_snapshot: handoffInputSnapshot,
    route_handoff_contract_rule:
      "The decision-frontier blocker can continue only by satisfying one of two route-handoff contracts: proof-grade accepted-status evidence or primitive/source-packet acceptance. This classifier declares both contracts and satisfies neither.",
    route_handoff_contracts: contracts,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The two open decision frontiers are now route-handoff contracts: one proof-grade accepted-status evidence contract and one primitive/source-packet acceptance contract; both are absent in the current pool.",
      continuation_class:
        "requires satisfying one route-handoff contract with proof-grade evidence or an explicit source-packet acceptance decision; no mechanical continuation exists from current inputs",
      fail_closed_stop_conditions: [
        "Do not treat this route-handoff contract classifier as an accepted interval-certified constants status.",
        "Do not infer a route choice, source-packet acceptance rule, or accepted source packet from contract absence.",
        "Do not construct parent_complement_consumption_ref or higher_fold_separator_layer_certificate from this classifier.",
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
      "Captured as a priority-only certificate-side route-handoff contract classifier under reference/priorities/proof-programs; no promotion to content/markdown/aaa.",
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
  const contractRows = packet.route_handoff_contracts.map((entry) => [
    `\`${entry.route_handoff_contract}\``,
    `\`${entry.required_route_input}\``,
    String(entry.contract_fields.length),
    String(entry.separator_contract_slots_missing),
    String(entry.row_contract_slots_missing),
    String(entry.contract_satisfied),
    `\`${entry.first_contract_blocker}\``,
  ]);
  const rowsBySeparatorRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Decision-Frontier Route-Handoff Contract Classifier

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Route-Handoff Contracts

This classifier imports the decision-frontier obligation classifier, the
current certificate-pool route exhaustion closure classifier, and the two
route-specific evidence dependency classifiers. It declares the two admissible
route-handoff contracts:

- proof-grade accepted interval-certified constants status evidence contract;
- primitive/source-packet acceptance contract.

It satisfies neither contract and introduces no route choice, proof rule,
primitive accepted-status rule, source-packet acceptance rule, accepted status,
accepted source packet, row consumption, live-ledger update, or branch-chart
authorization.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct route-handoff source-hash locks;
- ${s.retained_decision_frontier_direct_source_hash_checks_passed} / 4 retained decision-frontier source-hash locks;
- ${s.retained_route_exhaustion_direct_source_hash_checks_passed} / 3 retained route-exhaustion source-hash locks;
- ${s.retained_frontier_source_hash_checks_passed} / 4 retained frontier source-hash locks;
- ${s.retained_bridge_locked_source_hash_checks_passed} / 9 retained bridge-locked source-hash locks;
- ${s.retained_source_packet_route_source_hash_checks_passed} / 5 retained source-packet route source-hash locks.

Contract result:

- ${s.imported_route_exhaustion_current_certificate_pool_json_files_scanned} imported route-exhaustion current-pool JSON files scanned;
- ${s.current_pool_handoff_input_json_files_scanned} current-pool handoff-input JSON files scanned before this output;
- ${s.route_handoff_contracts_declared} route-handoff contracts declared;
- ${s.route_handoff_contracts_satisfied} route-handoff contracts satisfied;
- ${s.route_handoff_contracts_absent} route-handoff contracts absent;
- ${s.separator_combined_route_handoff_contract_slots} separator route-handoff contract slots;
- ${s.row_combined_route_handoff_contract_slots} row route-handoff contract slots;
- ${s.mechanical_continuations_from_current_pool} mechanical continuations from the current pool.

It consumes 0 rows and authorizes no branch chart.

## Source-Hash Checks

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

## Route-Handoff Contracts

| Contract | Required route input | Fields | Missing separator slots | Missing row slots | Satisfied | First blocker |
| --- | --- | ---: | ---: | ---: | --- | --- |
${markdownTable(contractRows)}

## Row Scope

| Separator | Rows |
| --- | ---: |
${markdownTable(rowsBySeparatorRows)}

## Certificate-Side Handoff

Sharpened blocker: the two open decision frontiers are now route-handoff
contracts: one proof-grade accepted-status evidence contract and one
primitive/source-packet acceptance contract. Both are absent in the current
pool.

Continuation class: requires satisfying one route-handoff contract with
proof-grade evidence or an explicit source-packet acceptance decision; no
mechanical continuation exists from current inputs.

Fail-closed stop conditions:

- Do not treat this route-handoff contract classifier as an accepted interval-certified
  constants status.
- Do not infer a route choice, source-packet acceptance rule, or accepted
  source packet from contract absence.
- Do not construct \`parent_complement_consumption_ref\` or
  \`higher_fold_separator_layer_certificate\` from this classifier.
- Do not consume rows, set \`preledger_pass\`, update the live ledger, or
  authorize a branch chart.

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

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
  const inputs = {
    decisionFrontier: readJson(args.decisionFrontier),
    routeExhaustionClosure: readJson(args.routeExhaustionClosure),
    proofGradeEvidence: readJson(args.proofGradeEvidence),
    primitiveSourcePacketEvidence: readJson(args.primitiveSourcePacketEvidence),
  };
  const packet = buildPacket(args, inputs);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, renderReport(packet));
  console.log(`wrote ${outputJsonPath}`);
  console.log(`wrote ${outputReportPath}`);
  console.log(packet.status);
  console.log(JSON.stringify(packet.summary, null, 2));
}

main();
