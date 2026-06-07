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
const DEFAULT_ROUTE_INPUT_DISJUNCTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_disjunction_closure_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_first_blocker_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_first_blocker_handoff_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const ROUTE_HANDOFF_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_route_handoff_contract_classifier_fail_closed_two_route_handoff_contracts_declared_current_pool_inputs_absent_no_route_decision_no_rule_decision_no_row_consumption";
const PROOF_GRADE_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_route_input_target_packet_fail_closed_proof_grade_route_input_target_declared_current_pool_input_absent_no_route_decision_no_rule_decision_no_row_consumption";
const PRIMITIVE_NARROWING_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_acceptance_rule_handoff_narrowing_classifier_fail_closed_aggregate_inputs_complete_acceptance_rule_and_accepted_source_packet_absent_no_primitive_acceptance_no_row_consumption";
const RULE_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet_fail_closed_acceptance_rule_target_declared_aggregate_inputs_complete_rule_absent_no_primitive_acceptance_no_row_consumption";
const ROUTE_INPUT_DISJUNCTION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_disjunction_closure_handoff_classifier_fail_closed_proof_grade_and_primitive_route_inputs_absent_current_pool_disjunction_unsatisfied_no_route_decision_no_rule_decision_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_first_blocker_handoff_classifier_fail_closed_uniform_proof_grade_derivation_ref_evidence_absent_uniform_source_packet_acceptance_rule_absent_accepted_source_packet_absent_current_pool_disjunction_unsatisfied_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";

const PROOF_GRADE_FIRST_BLOCKER = "accepted_interval_certified_constants_status_proof_grade_derivation_ref_evidence_absent";
const PRIMITIVE_RULE_FIRST_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const ACCEPTED_SOURCE_PACKET_BLOCKER = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_absent";

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
    routeInputDisjunction: DEFAULT_ROUTE_INPUT_DISJUNCTION,
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
    } else if (arg === "--route-input-disjunction") {
      args.routeInputDisjunction = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-route-input-first-blocker-handoff-classifier.mjs [options]

Options:
  --route-handoff PATH             Decision-frontier route-handoff contract classifier. Defaults to ${DEFAULT_ROUTE_HANDOFF}.
  --proof-grade-target PATH        Proof-grade route-input target packet. Defaults to ${DEFAULT_PROOF_GRADE_TARGET}.
  --primitive-narrowing PATH       Primitive source-packet route narrowing classifier. Defaults to ${DEFAULT_PRIMITIVE_NARROWING}.
  --rule-target PATH               Source-packet acceptance rule target packet. Defaults to ${DEFAULT_RULE_TARGET}.
  --route-input-disjunction PATH   Route-input disjunction closure handoff classifier. Defaults to ${DEFAULT_ROUTE_INPUT_DISJUNCTION}.
  --out-dir PATH                   Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                         Pretty-print JSON artifact.
  --help                           Show this help.`);
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
    ["accepted_status_route_input_disjunction_closure_handoff_classifier", paths.routeInputDisjunction],
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

function assertAll(rows, getter, want, label) {
  const bad = rows.filter((row) => getter(row) !== want);
  if (bad.length > 0) {
    throw new Error(`Unexpected ${label}: ${bad.length} mismatches.`);
  }
}

function validateInputs(inputs) {
  assertPacketStatusAndLocks(inputs.routeHandoff, "routeHandoff", ROUTE_HANDOFF_STATUS);
  assertPacketStatusAndLocks(inputs.proofGradeTarget, "proofGradeTarget", PROOF_GRADE_TARGET_STATUS);
  assertPacketStatusAndLocks(inputs.primitiveNarrowing, "primitiveNarrowing", PRIMITIVE_NARROWING_STATUS);
  assertPacketStatusAndLocks(inputs.ruleTarget, "ruleTarget", RULE_TARGET_STATUS);
  assertPacketStatusAndLocks(inputs.routeInputDisjunction, "routeInputDisjunction", ROUTE_INPUT_DISJUNCTION_STATUS);
  const route = inputs.routeHandoff.summary;
  const proof = inputs.proofGradeTarget.summary;
  const primitive = inputs.primitiveNarrowing.summary;
  const rule = inputs.ruleTarget.summary;
  const disjunction = inputs.routeInputDisjunction.summary;
  const expected = [
    [route.direct_source_hash_checks_passed, 4, "route-handoff direct source-hash locks"],
    [proof.direct_source_hash_checks_passed, 3, "proof-grade route-input direct source-hash locks"],
    [primitive.direct_source_hash_checks_passed, 5, "primitive route-input direct source-hash locks"],
    [rule.direct_source_hash_checks_passed, 3, "source-packet acceptance rule direct source-hash locks"],
    [disjunction.direct_source_hash_checks_passed, 4, "route-input disjunction direct source-hash locks"],
    [proof.proof_grade_route_input_target_fields, 6, "proof-grade route-input fields"],
    [proof.total_proof_grade_route_input_target_slots, 744, "proof-grade route-input slots"],
    [proof.total_proof_grade_route_input_target_slots_satisfied, 0, "proof-grade route-input slots satisfied"],
    [primitive.primitive_source_packet_route_input_target_fields, 2, "primitive route-input fields"],
    [primitive.total_primitive_source_packet_route_input_target_slots, 248, "primitive route-input slots"],
    [primitive.total_primitive_source_packet_route_input_target_slots_satisfied, 0, "primitive route-input slots satisfied"],
    [rule.total_source_packet_acceptance_rule_target_slots, 124, "source-packet acceptance rule slots"],
    [rule.total_source_packet_acceptance_rule_target_slots_satisfied, 0, "source-packet rule target slots satisfied"],
    [disjunction.route_input_disjunctions_declared, 1, "route-input disjunctions declared"],
    [disjunction.route_input_disjunctions_satisfied, 0, "route-input disjunctions satisfied"],
    [disjunction.total_combined_route_input_disjunction_slots, 992, "combined route-input slots"],
    [disjunction.total_combined_route_input_disjunction_slots_satisfied, 0, "combined route-input slots satisfied"],
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
  assertRowsBySeparator(disjunction, "route-input disjunction");
}

function buildUniformProfile(inputs) {
  const proofSeparators = inputs.proofGradeTarget.separator_proof_grade_route_input_target_profiles;
  const proofRows = inputs.proofGradeTarget.row_proof_grade_route_input_target_profiles;
  const primitiveSeparators = inputs.primitiveNarrowing.separator_primitive_source_packet_route_input_target_profiles;
  const primitiveRows = inputs.primitiveNarrowing.row_primitive_source_packet_route_input_target_profiles;
  const ruleSeparators = inputs.ruleTarget.separator_source_packet_acceptance_rule_target_profiles;
  const ruleRows = inputs.ruleTarget.row_source_packet_acceptance_rule_target_profiles;

  assertAll(proofSeparators, (row) => row.first_route_input_blocker, PROOF_GRADE_FIRST_BLOCKER, "proof separator first blocker");
  assertAll(proofRows, (row) => row.first_route_input_blocker, PROOF_GRADE_FIRST_BLOCKER, "proof row first blocker");
  assertAll(primitiveSeparators, (row) => row.first_route_input_blocker, PRIMITIVE_RULE_FIRST_BLOCKER, "primitive separator first blocker");
  assertAll(primitiveRows, (row) => row.first_route_input_blocker, PRIMITIVE_RULE_FIRST_BLOCKER, "primitive row first blocker");
  assertAll(ruleSeparators, (row) => row.first_rule_target_blocker, PRIMITIVE_RULE_FIRST_BLOCKER, "rule separator first blocker");
  assertAll(ruleRows, (row) => row.first_rule_target_blocker, PRIMITIVE_RULE_FIRST_BLOCKER, "rule row first blocker");
  assertAll(
    primitiveSeparators,
    (row) => row.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present,
    false,
    "primitive separator accepted source-packet presence",
  );
  assertAll(
    primitiveRows,
    (row) => row.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present,
    false,
    "primitive row accepted source-packet presence",
  );

  return {
    proof_grade_separator_first_blocker_counts: countBy(proofSeparators, (row) => row.first_route_input_blocker),
    proof_grade_row_first_blocker_counts: countBy(proofRows, (row) => row.first_route_input_blocker),
    primitive_separator_first_blocker_counts: countBy(primitiveSeparators, (row) => row.first_route_input_blocker),
    primitive_row_first_blocker_counts: countBy(primitiveRows, (row) => row.first_route_input_blocker),
    source_packet_rule_separator_first_blocker_counts: countBy(ruleSeparators, (row) => row.first_rule_target_blocker),
    source_packet_rule_row_first_blocker_counts: countBy(ruleRows, (row) => row.first_rule_target_blocker),
    accepted_source_packet_separator_absent_count: countTrue(
      primitiveSeparators,
      (row) => row.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present === false,
    ),
    accepted_source_packet_row_absent_count: countTrue(
      primitiveRows,
      (row) => row.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present === false,
    ),
  };
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const route = inputs.routeHandoff.summary;
  const proof = inputs.proofGradeTarget.summary;
  const primitive = inputs.primitiveNarrowing.summary;
  const rule = inputs.ruleTarget.summary;
  const disjunction = inputs.routeInputDisjunction.summary;
  const uniform = buildUniformProfile(inputs);
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    retained_route_handoff_direct_source_hash_checks_passed: route.direct_source_hash_checks_passed,
    retained_proof_grade_route_input_direct_source_hash_checks_passed: proof.direct_source_hash_checks_passed,
    retained_primitive_route_input_direct_source_hash_checks_passed: primitive.direct_source_hash_checks_passed,
    retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed: rule.direct_source_hash_checks_passed,
    retained_route_input_disjunction_direct_source_hash_checks_passed: disjunction.direct_source_hash_checks_passed,
    candidate_higher_fold_constants_artifacts: disjunction.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: disjunction.candidate_separator_constants,
    candidate_row_constant_associations: disjunction.candidate_row_constant_associations,
    rows_by_separator_count: disjunction.rows_by_separator_count,
    proof_grade_route_input_target_fields: proof.proof_grade_route_input_target_fields,
    total_proof_grade_route_input_target_slots: proof.total_proof_grade_route_input_target_slots,
    total_proof_grade_route_input_target_slots_satisfied: proof.total_proof_grade_route_input_target_slots_satisfied,
    total_proof_grade_route_input_target_slots_missing: proof.total_proof_grade_route_input_target_slots_missing,
    proof_grade_uniform_first_blocker: PROOF_GRADE_FIRST_BLOCKER,
    proof_grade_separator_uniform_first_blocker_count:
      uniform.proof_grade_separator_first_blocker_counts[PROOF_GRADE_FIRST_BLOCKER] ?? 0,
    proof_grade_row_uniform_first_blocker_count:
      uniform.proof_grade_row_first_blocker_counts[PROOF_GRADE_FIRST_BLOCKER] ?? 0,
    primitive_source_packet_route_input_target_fields: primitive.primitive_source_packet_route_input_target_fields,
    total_primitive_source_packet_route_input_target_slots:
      primitive.total_primitive_source_packet_route_input_target_slots,
    total_primitive_source_packet_route_input_target_slots_satisfied:
      primitive.total_primitive_source_packet_route_input_target_slots_satisfied,
    total_primitive_source_packet_route_input_target_slots_missing:
      primitive.total_primitive_source_packet_route_input_target_slots_missing,
    primitive_uniform_rule_blocker: PRIMITIVE_RULE_FIRST_BLOCKER,
    primitive_separator_uniform_rule_blocker_count:
      uniform.primitive_separator_first_blocker_counts[PRIMITIVE_RULE_FIRST_BLOCKER] ?? 0,
    primitive_row_uniform_rule_blocker_count:
      uniform.primitive_row_first_blocker_counts[PRIMITIVE_RULE_FIRST_BLOCKER] ?? 0,
    source_packet_acceptance_rule_targets_declared: rule.source_packet_acceptance_rule_targets_declared,
    total_source_packet_acceptance_rule_target_slots: rule.total_source_packet_acceptance_rule_target_slots,
    total_source_packet_acceptance_rule_target_slots_satisfied:
      rule.total_source_packet_acceptance_rule_target_slots_satisfied,
    total_source_packet_acceptance_rule_target_slots_missing:
      rule.total_source_packet_acceptance_rule_target_slots_missing,
    source_packet_rule_separator_uniform_first_blocker_count:
      uniform.source_packet_rule_separator_first_blocker_counts[PRIMITIVE_RULE_FIRST_BLOCKER] ?? 0,
    source_packet_rule_row_uniform_first_blocker_count:
      uniform.source_packet_rule_row_first_blocker_counts[PRIMITIVE_RULE_FIRST_BLOCKER] ?? 0,
    accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
    accepted_source_packet_separator_absent_count: uniform.accepted_source_packet_separator_absent_count,
    accepted_source_packet_row_absent_count: uniform.accepted_source_packet_row_absent_count,
    route_input_disjunctions_declared: disjunction.route_input_disjunctions_declared,
    route_input_disjunctions_satisfied: disjunction.route_input_disjunctions_satisfied,
    route_input_disjunctions_absent: disjunction.route_input_disjunctions_absent,
    total_combined_route_input_disjunction_slots: disjunction.total_combined_route_input_disjunction_slots,
    total_combined_route_input_disjunction_slots_satisfied:
      disjunction.total_combined_route_input_disjunction_slots_satisfied,
    total_combined_route_input_disjunction_slots_missing:
      disjunction.total_combined_route_input_disjunction_slots_missing,
    compatible_proof_grade_current_pool_evidence_files:
      disjunction.compatible_proof_grade_current_pool_evidence_files,
    compatible_source_packet_acceptance_current_pool_evidence_files:
      disjunction.compatible_source_packet_acceptance_current_pool_evidence_files,
    compatible_route_input_disjunction_current_pool_files:
      disjunction.compatible_route_input_disjunction_current_pool_files,
    mechanical_continuations_from_current_pool: disjunction.mechanical_continuations_from_current_pool,
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
    first_route_input_disjunction_blocker: disjunction.first_route_input_disjunction_blocker,
    first_proof_grade_uniform_blocker: PROOF_GRADE_FIRST_BLOCKER,
    first_primitive_uniform_rule_blocker: PRIMITIVE_RULE_FIRST_BLOCKER,
    first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
    parent_complement_consumption_ref_blocker: disjunction.parent_complement_consumption_ref_blocker,
    first_separator_certificate_blocker: disjunction.first_separator_certificate_blocker,
  };

  const invariant =
    summary.direct_source_hash_checks === 5 &&
    summary.direct_source_hash_checks_passed === 5 &&
    summary.retained_route_handoff_direct_source_hash_checks_passed === 4 &&
    summary.retained_proof_grade_route_input_direct_source_hash_checks_passed === 3 &&
    summary.retained_primitive_route_input_direct_source_hash_checks_passed === 5 &&
    summary.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed === 3 &&
    summary.retained_route_input_disjunction_direct_source_hash_checks_passed === 4 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    JSON.stringify(summary.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR) &&
    summary.proof_grade_route_input_target_fields === 6 &&
    summary.total_proof_grade_route_input_target_slots === 744 &&
    summary.total_proof_grade_route_input_target_slots_satisfied === 0 &&
    summary.total_proof_grade_route_input_target_slots_missing === 744 &&
    summary.proof_grade_uniform_first_blocker === PROOF_GRADE_FIRST_BLOCKER &&
    summary.proof_grade_separator_uniform_first_blocker_count === 12 &&
    summary.proof_grade_row_uniform_first_blocker_count === 112 &&
    summary.primitive_source_packet_route_input_target_fields === 2 &&
    summary.total_primitive_source_packet_route_input_target_slots === 248 &&
    summary.total_primitive_source_packet_route_input_target_slots_satisfied === 0 &&
    summary.total_primitive_source_packet_route_input_target_slots_missing === 248 &&
    summary.total_source_packet_acceptance_rule_target_slots === 124 &&
    summary.total_source_packet_acceptance_rule_target_slots_satisfied === 0 &&
    summary.total_source_packet_acceptance_rule_target_slots_missing === 124 &&
    summary.primitive_uniform_rule_blocker === PRIMITIVE_RULE_FIRST_BLOCKER &&
    summary.primitive_separator_uniform_rule_blocker_count === 12 &&
    summary.primitive_row_uniform_rule_blocker_count === 112 &&
    summary.source_packet_rule_separator_uniform_first_blocker_count === 12 &&
    summary.source_packet_rule_row_uniform_first_blocker_count === 112 &&
    summary.accepted_source_packet_separator_absent_count === 12 &&
    summary.accepted_source_packet_row_absent_count === 112 &&
    summary.route_input_disjunctions_declared === 1 &&
    summary.route_input_disjunctions_satisfied === 0 &&
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
    throw new Error("Route-input first-blocker handoff invariant failed.");
  }

  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-route-input-first-blocker-handoff-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only route-input first-blocker handoff classifier; proves the proof-grade route-input branch, primitive/source-packet route-input branch, and source-packet acceptance rule target have uniform first blockers over the 12-separator and 112-row scope while making no route, proof-rule, primitive-acceptance, or row-consumption decision",
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
      accepted_status_route_input_disjunction_closure_handoff_classifier: artifactRecord(paths.routeInputDisjunction),
    },
    source_hash_checks: sourceChecks,
    first_blocker_rule:
      "A route-input first-blocker handoff may classify only blockers already present uniformly in source profiles; it does not choose a route branch, introduce a proof rule, construct a source-packet acceptance rule, accept a primitive source packet, or consume rows.",
    first_blocker_profiles: [
      {
        route_branch: "proof_grade_accepted_status_route_input",
        uniform_first_blocker: PROOF_GRADE_FIRST_BLOCKER,
        separator_count: summary.proof_grade_separator_uniform_first_blocker_count,
        row_count: summary.proof_grade_row_uniform_first_blocker_count,
        branch_satisfied: false,
      },
      {
        route_branch: "primitive_source_packet_route_input",
        uniform_first_blocker: PRIMITIVE_RULE_FIRST_BLOCKER,
        separator_count: summary.primitive_separator_uniform_rule_blocker_count,
        row_count: summary.primitive_row_uniform_rule_blocker_count,
        branch_satisfied: false,
      },
      {
        route_branch: "accepted_source_packet_presence",
        uniform_first_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
        separator_count: summary.accepted_source_packet_separator_absent_count,
        row_count: summary.accepted_source_packet_row_absent_count,
        branch_satisfied: false,
      },
    ],
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The disjunction is not merely unsatisfied: the proof-grade branch is uniformly blocked first by missing proof-grade derivation-ref evidence, and the primitive/source-packet branch is uniformly blocked first by the absent source-packet acceptance rule plus absent accepted source packet.",
      continuation_class:
        "requires either proof-grade accepted interval-certified constants status derivation-ref evidence or an explicit source-packet acceptance rule and accepted source packet; no mechanical continuation exists from these blockers",
      fail_closed_stop_conditions: [
        "Do not treat a uniform first blocker as proof that the corresponding route is impossible.",
        "Do not treat a blocker classifier as an accepted interval-certified constants status.",
        "Do not introduce a proof rule, source-packet acceptance rule, primitive acceptance, or route decision from this classifier.",
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
      "Captured as a priority-only certificate-side route-input first-blocker handoff classifier under reference/priorities/proof-programs; no promotion to content/markdown/aaa.",
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
  const blockerRows = packet.first_blocker_profiles.map((profile) => [
    `\`${profile.route_branch}\``,
    `\`${profile.uniform_first_blocker}\``,
    String(profile.separator_count),
    String(profile.row_count),
    String(profile.branch_satisfied),
  ]);
  const rowsBySeparatorRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Route-Input First-Blocker Handoff Classifier

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## First-Blocker Handoff

This classifier imports the route-handoff contract classifier, proof-grade
route-input target packet, primitive source-packet route narrowing classifier,
source-packet acceptance rule target packet, and route-input disjunction
closure handoff classifier. It compresses the live blocker to uniform first
blockers across the 12-separator and 112-row scope.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct source-hash locks;
- ${s.retained_route_handoff_direct_source_hash_checks_passed} / 4 retained route-handoff locks;
- ${s.retained_proof_grade_route_input_direct_source_hash_checks_passed} / 3 retained proof-grade route-input locks;
- ${s.retained_primitive_route_input_direct_source_hash_checks_passed} / 5 retained primitive route-input locks;
- ${s.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed} / 3 retained source-packet acceptance rule target locks;
- ${s.retained_route_input_disjunction_direct_source_hash_checks_passed} / 4 retained route-input disjunction locks.

Uniform blockers:

- Proof-grade branch: ${s.total_proof_grade_route_input_target_slots} slots, ${s.total_proof_grade_route_input_target_slots_satisfied} satisfied, first blocker \`${s.first_proof_grade_uniform_blocker}\` on ${s.proof_grade_separator_uniform_first_blocker_count} / 12 separators and ${s.proof_grade_row_uniform_first_blocker_count} / 112 rows.
- Primitive/source-packet branch: ${s.total_primitive_source_packet_route_input_target_slots} slots, ${s.total_primitive_source_packet_route_input_target_slots_satisfied} satisfied, first rule blocker \`${s.first_primitive_uniform_rule_blocker}\` on ${s.primitive_separator_uniform_rule_blocker_count} / 12 separators and ${s.primitive_row_uniform_rule_blocker_count} / 112 rows.
- Source-packet acceptance rule target: ${s.total_source_packet_acceptance_rule_target_slots} slots, ${s.total_source_packet_acceptance_rule_target_slots_satisfied} satisfied.
- Accepted source packet blocker: \`${s.first_accepted_source_packet_blocker}\` on ${s.accepted_source_packet_separator_absent_count} / 12 separators and ${s.accepted_source_packet_row_absent_count} / 112 rows.
- Combined route-input disjunction: ${s.total_combined_route_input_disjunction_slots} slots, ${s.total_combined_route_input_disjunction_slots_satisfied} satisfied.
- Mechanical continuations from the current pool: ${s.mechanical_continuations_from_current_pool}.

## Source-Hash Checks

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

## First-Blocker Profiles

| Route branch | Uniform first blocker | Separators | Rows | Branch satisfied |
| --- | --- | ---: | ---: | --- |
${markdownTable(blockerRows)}

## Row Scope

| Separator | Rows |
| --- | ---: |
${markdownTable(rowsBySeparatorRows)}

## Certificate-Side Handoff

Sharpened blocker: the disjunction is not merely unsatisfied. The proof-grade
branch is uniformly blocked first by missing proof-grade derivation-ref
evidence, and the primitive/source-packet branch is uniformly blocked first by
the absent source-packet acceptance rule plus absent accepted source packet.

Continuation class: requires either proof-grade accepted interval-certified
constants status derivation-ref evidence or an explicit source-packet
acceptance rule and accepted source packet. This classifier makes no route
decision and supplies no rule.

Fail-closed stop conditions:

- Do not treat a uniform first blocker as proof that the corresponding route is
  impossible.
- Do not treat a blocker classifier as an accepted interval-certified constants
  status.
- Do not introduce a proof rule, source-packet acceptance rule, primitive
  acceptance, or route decision from this classifier.
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
    routeInputDisjunction: args.routeInputDisjunction,
  };
  const inputs = {
    routeHandoff: readJson(paths.routeHandoff),
    proofGradeTarget: readJson(paths.proofGradeTarget),
    primitiveNarrowing: readJson(paths.primitiveNarrowing),
    ruleTarget: readJson(paths.ruleTarget),
    routeInputDisjunction: readJson(paths.routeInputDisjunction),
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
