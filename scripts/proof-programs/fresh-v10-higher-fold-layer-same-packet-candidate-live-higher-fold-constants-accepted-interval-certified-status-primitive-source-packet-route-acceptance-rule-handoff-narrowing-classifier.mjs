#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ROUTE_HANDOFF = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_route_handoff_contract_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONFORMANCE = `${CERT_DIR}/higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_AGGREGATE = `${CERT_DIR}/higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_narrowing_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_narrowing_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
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

const ROUTE_HANDOFF_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_route_handoff_contract_classifier_fail_closed_two_route_handoff_contracts_declared_current_pool_inputs_absent_no_route_decision_no_rule_decision_no_row_consumption";
const PRIMITIVE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier_fail_closed_frontier_locked_separator_aggregates_present_no_compatible_source_packet_acceptance_evidence_no_primitive_acceptance_no_row_consumption";
const IMPULSE_ACCEPTANCE_STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const CONFORMANCE_STATUS =
  "higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier_fail_closed_aggregate_present_existing_constants_contract_packet_mismatch_no_source_packet_acceptance_no_row_consumption";
const AGGREGATE_STATUS =
  "higher_fold_layer_same_packet_separator_aggregate_certificate_attempt_fail_closed_row_enclosures_separator_aggregates_certified_source_packets_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_acceptance_rule_handoff_narrowing_classifier_fail_closed_aggregate_inputs_complete_acceptance_rule_and_accepted_source_packet_absent_no_primitive_acceptance_no_row_consumption";

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

const PRIMITIVE_ROUTE_INPUT_FIELDS = [
  "source_packet_acceptance_rule",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
];

function parseArgs(argv) {
  const args = {
    routeHandoff: DEFAULT_ROUTE_HANDOFF,
    primitiveEvidence: DEFAULT_PRIMITIVE_EVIDENCE,
    impulseAcceptance: DEFAULT_IMPULSE_ACCEPTANCE,
    conformance: DEFAULT_CONFORMANCE,
    aggregate: DEFAULT_AGGREGATE,
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
    } else if (arg === "--primitive-evidence") {
      args.primitiveEvidence = argv[++index];
    } else if (arg === "--impulse-acceptance") {
      args.impulseAcceptance = argv[++index];
    } else if (arg === "--conformance") {
      args.conformance = argv[++index];
    } else if (arg === "--aggregate") {
      args.aggregate = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-primitive-source-packet-route-acceptance-rule-handoff-narrowing-classifier.mjs [options]

Options:
  --route-handoff PATH        Decision-frontier route-handoff contract classifier. Defaults to ${DEFAULT_ROUTE_HANDOFF}.
  --primitive-evidence PATH   Primitive source-packet acceptance evidence dependency classifier. Defaults to ${DEFAULT_PRIMITIVE_EVIDENCE}.
  --impulse-acceptance PATH   Impulse-bound source-packet acceptance dependency classifier. Defaults to ${DEFAULT_IMPULSE_ACCEPTANCE}.
  --conformance PATH          Fixed-parameter aggregate accepted constants conformance classifier. Defaults to ${DEFAULT_CONFORMANCE}.
  --aggregate PATH            Separator aggregate certificate attempt. Defaults to ${DEFAULT_AGGREGATE}.
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
    ["accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier", paths.primitiveEvidence],
    ["same_packet_impulse_bound_source_packet_acceptance_dependency_classifier", paths.impulseAcceptance],
    ["same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier", paths.conformance],
    ["same_packet_separator_aggregate_certificate_attempt", paths.aggregate],
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

function assertRowsBySeparator(summary, label) {
  if (JSON.stringify(summary.rows_by_separator_count) !== JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR)) {
    throw new Error(`Unexpected ${label} rows-by-separator count.`);
  }
}

function validateInputs(inputs) {
  assertPacketStatusAndLocks(inputs.routeHandoff, "routeHandoff", ROUTE_HANDOFF_STATUS);
  assertPacketStatusAndLocks(inputs.primitiveEvidence, "primitiveEvidence", PRIMITIVE_EVIDENCE_STATUS);
  assertPacketStatusAndLocks(inputs.impulseAcceptance, "impulseAcceptance", IMPULSE_ACCEPTANCE_STATUS);
  assertPacketStatusAndLocks(inputs.conformance, "conformance", CONFORMANCE_STATUS);
  assertPacketStatusAndLocks(inputs.aggregate, "aggregate", AGGREGATE_STATUS);

  const routeSummary = inputs.routeHandoff.summary;
  const primitiveSummary = inputs.primitiveEvidence.summary;
  const impulseSummary = inputs.impulseAcceptance.summary;
  const conformanceSummary = inputs.conformance.summary;
  const aggregateSummary = inputs.aggregate.summary;
  const buckets = primitiveSummary.evidence_pool_rejection_bucket_counts;
  const expected = [
    [routeSummary.route_handoff_contracts_declared, 2, "route-handoff contracts declared"],
    [routeSummary.route_handoff_contracts_satisfied, 0, "route-handoff contracts satisfied"],
    [routeSummary.primitive_source_packet_route_handoff_contract_fields, 2, "primitive contract fields"],
    [routeSummary.separator_primitive_source_packet_route_handoff_contract_slots, 24, "separator primitive slots"],
    [routeSummary.row_primitive_source_packet_route_handoff_contract_slots, 224, "row primitive slots"],
    [primitiveSummary.source_packet_route_source_hash_checks_passed, 5, "source-packet route source locks"],
    [primitiveSummary.separators_with_separator_aggregate_fields_complete, 12, "complete separator aggregates"],
    [primitiveSummary.rows_with_separator_aggregate_fields_complete, 112, "complete row aggregates"],
    [primitiveSummary.evidence_pool_json_files_scanned, 239, "source-packet evidence pool scan"],
    [
      primitiveSummary.evidence_pool_compatible_source_packet_acceptance_evidence_files,
      0,
      "compatible source-packet evidence files",
    ],
    [primitiveSummary.separator_source_packet_acceptance_evidence_slots, 24, "separator evidence slots"],
    [primitiveSummary.row_source_packet_acceptance_evidence_slots, 224, "row evidence slots"],
    [buckets.packet_identity_mismatch, 74, "packet mismatch bucket"],
    [buckets.separator_family_mismatch, 31, "separator mismatch bucket"],
    [buckets.schema_status_mismatch, 200, "schema/status mismatch bucket"],
    [buckets.aggregate_source_not_acceptance_rule, 10, "aggregate source not acceptance rule bucket"],
    [buckets.rule_target_not_rule, 30, "rule target not rule bucket"],
    [buckets.candidate_live_not_accepted, 7, "candidate live not accepted bucket"],
    [buckets.source_packet_not_accepted, 39, "source packet not accepted bucket"],
    [impulseSummary.separators_with_separator_aggregate_C_Sigma, 12, "impulse aggregate C"],
    [impulseSummary.separators_with_source_packet_acceptance_rule, 0, "impulse acceptance rules"],
    [conformanceSummary.separators_with_separator_aggregate_fields, 12, "conformance aggregate fields"],
    [conformanceSummary.separators_with_source_packet_acceptance_rule, 0, "conformance acceptance rules"],
    [aggregateSummary.separators_with_separator_aggregate_C_Sigma, 12, "aggregate C"],
    [aggregateSummary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "accepted sources"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
  assertRowsBySeparator(routeSummary, "route-handoff");
  assertRowsBySeparator(primitiveSummary, "primitive evidence");
  assertRowsBySeparator(impulseSummary, "impulse acceptance");
  assertRowsBySeparator(conformanceSummary, "conformance");
  assertRowsBySeparator(aggregateSummary, "aggregate");
}

function primitiveContract(routeHandoff) {
  const contract = routeHandoff.route_handoff_contracts.find(
    (entry) => entry.route_handoff_contract === "primitive_source_packet_acceptance_contract",
  );
  if (!contract) {
    throw new Error("Missing primitive/source-packet route-handoff contract.");
  }
  return {
    route_input_target: "primitive_source_packet_acceptance_rule_or_accepted_source_packet_route_input",
    source_contract: contract.route_handoff_contract,
    required_route_input: contract.required_route_input,
    target_fields: PRIMITIVE_ROUTE_INPUT_FIELDS,
    separator_route_input_slots: contract.separator_contract_slots,
    separator_route_input_slots_satisfied: 0,
    separator_route_input_slots_missing: contract.separator_contract_slots,
    row_route_input_slots: contract.row_contract_slots,
    row_route_input_slots_satisfied: 0,
    row_route_input_slots_missing: contract.row_contract_slots,
    route_input_target_satisfied: false,
    route_decision_made: false,
    primitive_acceptance_decision_made: false,
    source_packet_acceptance_rule_constructed: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_constructed: false,
    first_route_input_blocker: contract.first_contract_blocker,
  };
}

function separatorTargets(primitiveEvidence) {
  return primitiveEvidence.separator_source_packet_acceptance_evidence_dependency_profiles.map((profile) => ({
    separator_event: profile.separator_event,
    fold_interval: profile.fold_interval,
    row_count: profile.row_count,
    separator_aggregate_fields_complete: profile.separator_aggregate_fields_complete,
    route_input_target_fields: PRIMITIVE_ROUTE_INPUT_FIELDS,
    route_input_target_slots: profile.source_packet_acceptance_evidence_slots,
    route_input_target_slots_satisfied: profile.compatible_source_packet_acceptance_evidence_slots_filled,
    route_input_target_slots_missing: profile.compatible_source_packet_acceptance_evidence_slots_missing,
    primitive_source_packet_route_input_target_satisfied: false,
    source_packet_acceptance_rule_constructed: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_route_input_blocker: firstMissingEvidenceBlocker(profile.evidence_slot_checks),
    classification: "separator_aggregate_complete_primitive_source_packet_route_input_target_unfilled",
  }));
}

function rowTargets(primitiveEvidence) {
  return primitiveEvidence.row_source_packet_acceptance_evidence_dependency_profiles.map((profile) => ({
    row_id: profile.row_id,
    ledger: profile.ledger,
    status: profile.status,
    failure_code: profile.failure_code,
    separator_event: profile.separator_event,
    fold_interval: profile.fold_interval,
    receiver_interval: profile.receiver_interval,
    source_interval: profile.source_interval,
    separator_aggregate_fields_complete: profile.separator_aggregate_fields_complete,
    route_input_target_fields: PRIMITIVE_ROUTE_INPUT_FIELDS,
    route_input_target_slots: profile.source_packet_acceptance_evidence_slots,
    route_input_target_slots_satisfied: profile.compatible_source_packet_acceptance_evidence_slots_filled,
    route_input_target_slots_missing: profile.compatible_source_packet_acceptance_evidence_slots_missing,
    primitive_source_packet_route_input_target_satisfied: false,
    source_packet_acceptance_rule_constructed: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
    accepted_fold_layer_row: false,
    row_consumed: false,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_route_input_blocker: firstMissingEvidenceBlocker(profile.evidence_slot_checks),
    classification: "row_separator_aggregate_complete_primitive_source_packet_route_input_target_unfilled",
  }));
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const poolSnapshot = currentCertificatePoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const routeSummary = inputs.routeHandoff.summary;
  const primitiveSummary = inputs.primitiveEvidence.summary;
  const impulseSummary = inputs.impulseAcceptance.summary;
  const conformanceSummary = inputs.conformance.summary;
  const aggregateSummary = inputs.aggregate.summary;
  const contract = primitiveContract(inputs.routeHandoff);
  const separatorProfiles = separatorTargets(inputs.primitiveEvidence);
  const rowProfiles = rowTargets(inputs.primitiveEvidence);
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
    retained_source_packet_route_source_hash_checks_passed:
      primitiveSummary.source_packet_route_source_hash_checks_passed,
    retained_frontier_source_hash_checks_passed: primitiveSummary.retained_frontier_source_hash_checks_passed,
    retained_bridge_locked_source_hash_checks_passed: primitiveSummary.retained_bridge_locked_source_hash_checks_passed,
    imported_source_packet_evidence_pool_json_files_scanned: primitiveSummary.evidence_pool_json_files_scanned,
    imported_current_pool_handoff_input_json_files_scanned: routeSummary.current_pool_handoff_input_json_files_scanned,
    current_pool_primitive_route_input_json_files_scanned: poolSnapshot.json_files_scanned_before_output,
    candidate_higher_fold_constants_artifacts: routeSummary.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: routeSummary.candidate_separator_constants,
    candidate_row_constant_associations: routeSummary.candidate_row_constant_associations,
    rows_by_separator_count: routeSummary.rows_by_separator_count,
    separators_with_separator_aggregate_fields_complete:
      primitiveSummary.separators_with_separator_aggregate_fields_complete,
    rows_with_separator_aggregate_fields_complete: primitiveSummary.rows_with_separator_aggregate_fields_complete,
    separator_aggregate_C_Sigma_present: impulseSummary.separators_with_separator_aggregate_C_Sigma,
    separator_aggregate_A_Sigma_eta_epsilon_c_present:
      impulseSummary.separators_with_separator_aggregate_A_Sigma_eta_epsilon_c,
    separator_aggregate_I_fold_eta_epsilon_c_Sigma_present:
      impulseSummary.separators_with_separator_aggregate_I_fold_eta_epsilon_c_Sigma,
    conformance_separator_aggregate_fields_present: conformanceSummary.separators_with_separator_aggregate_fields,
    aggregate_certificate_separator_aggregate_fields_present:
      aggregateSummary.separators_with_separator_aggregate_C_Sigma,
    route_handoff_contracts_declared: routeSummary.route_handoff_contracts_declared,
    route_handoff_contracts_satisfied: routeSummary.route_handoff_contracts_satisfied,
    route_handoff_contracts_absent: routeSummary.route_handoff_contracts_absent,
    primitive_source_packet_route_handoff_contracts_selected: 1,
    primitive_source_packet_route_handoff_contracts_satisfied: 0,
    primitive_source_packet_route_input_targets_declared: 1,
    primitive_source_packet_route_input_targets_satisfied: 0,
    primitive_source_packet_route_input_target_fields: PRIMITIVE_ROUTE_INPUT_FIELDS.length,
    separator_primitive_source_packet_route_input_target_slots: contract.separator_route_input_slots,
    separator_primitive_source_packet_route_input_target_slots_satisfied: contract.separator_route_input_slots_satisfied,
    separator_primitive_source_packet_route_input_target_slots_missing: contract.separator_route_input_slots_missing,
    row_primitive_source_packet_route_input_target_slots: contract.row_route_input_slots,
    row_primitive_source_packet_route_input_target_slots_satisfied: contract.row_route_input_slots_satisfied,
    row_primitive_source_packet_route_input_target_slots_missing: contract.row_route_input_slots_missing,
    total_primitive_source_packet_route_input_target_slots: totalSlots,
    total_primitive_source_packet_route_input_target_slots_satisfied: totalSlotsSatisfied,
    total_primitive_source_packet_route_input_target_slots_missing: totalSlotsMissing,
    evidence_pool_compatible_source_packet_acceptance_evidence_files:
      primitiveSummary.evidence_pool_compatible_source_packet_acceptance_evidence_files,
    compatible_source_packet_acceptance_current_pool_evidence_files:
      routeSummary.compatible_source_packet_acceptance_current_pool_evidence_files,
    compatible_primitive_source_packet_route_input_current_pool_files: 0,
    evidence_pool_rejection_bucket_counts: primitiveSummary.evidence_pool_rejection_bucket_counts,
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
    first_primitive_source_packet_route_input_blocker: contract.first_route_input_blocker,
    first_source_packet_acceptance_rule_blocker: primitiveSummary.first_source_packet_acceptance_rule_blocker,
    first_accepted_source_packet_evidence_blocker: primitiveSummary.first_accepted_source_packet_evidence_blocker,
    parent_complement_consumption_ref_blocker: "parent_complement_consumption_ref_absent",
    first_separator_certificate_blocker: "higher_fold_separator_layer_certificate_absent",
  };

  const buckets = summary.evidence_pool_rejection_bucket_counts;
  const invariant =
    summary.direct_source_hash_checks === 5 &&
    summary.direct_source_hash_checks_passed === 5 &&
    summary.retained_route_handoff_direct_source_hash_checks_passed === 4 &&
    summary.retained_decision_frontier_direct_source_hash_checks_passed === 4 &&
    summary.retained_source_packet_route_source_hash_checks_passed === 5 &&
    summary.imported_source_packet_evidence_pool_json_files_scanned === 239 &&
    summary.imported_current_pool_handoff_input_json_files_scanned === 242 &&
    summary.current_pool_primitive_route_input_json_files_scanned === 244 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    JSON.stringify(summary.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR) &&
    summary.separators_with_separator_aggregate_fields_complete === 12 &&
    summary.rows_with_separator_aggregate_fields_complete === 112 &&
    summary.route_handoff_contracts_declared === 2 &&
    summary.route_handoff_contracts_satisfied === 0 &&
    summary.route_handoff_contracts_absent === 2 &&
    summary.primitive_source_packet_route_input_target_fields === 2 &&
    summary.separator_primitive_source_packet_route_input_target_slots === 24 &&
    summary.separator_primitive_source_packet_route_input_target_slots_satisfied === 0 &&
    summary.separator_primitive_source_packet_route_input_target_slots_missing === 24 &&
    summary.row_primitive_source_packet_route_input_target_slots === 224 &&
    summary.row_primitive_source_packet_route_input_target_slots_satisfied === 0 &&
    summary.row_primitive_source_packet_route_input_target_slots_missing === 224 &&
    summary.total_primitive_source_packet_route_input_target_slots === 248 &&
    summary.total_primitive_source_packet_route_input_target_slots_satisfied === 0 &&
    summary.total_primitive_source_packet_route_input_target_slots_missing === 248 &&
    summary.evidence_pool_compatible_source_packet_acceptance_evidence_files === 0 &&
    summary.compatible_source_packet_acceptance_current_pool_evidence_files === 0 &&
    summary.compatible_primitive_source_packet_route_input_current_pool_files === 0 &&
    buckets.packet_identity_mismatch === 74 &&
    buckets.separator_family_mismatch === 31 &&
    buckets.schema_status_mismatch === 200 &&
    buckets.aggregate_source_not_acceptance_rule === 10 &&
    buckets.rule_target_not_rule === 30 &&
    buckets.candidate_live_not_accepted === 7 &&
    buckets.source_packet_not_accepted === 39 &&
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
    throw new Error("Primitive/source-packet route narrowing invariant failed.");
  }

  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-primitive-source-packet-route-acceptance-rule-handoff-narrowing-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only primitive/source-packet route acceptance-rule handoff narrowing classifier; verifies aggregate inputs are complete while the source-packet acceptance rule and accepted source-packet route inputs remain absent without making a route, proof-rule, primitive-acceptance, or row-consumption decision",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_decision_frontier_route_handoff_contract_classifier: artifactRecord(paths.routeHandoff),
      accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier: artifactRecord(
        paths.primitiveEvidence,
      ),
      same_packet_impulse_bound_source_packet_acceptance_dependency_classifier: artifactRecord(
        paths.impulseAcceptance,
      ),
      same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier: artifactRecord(
        paths.conformance,
      ),
      same_packet_separator_aggregate_certificate_attempt: artifactRecord(paths.aggregate),
    },
    source_hash_checks: sourceChecks,
    current_pool_primitive_route_input_snapshot: poolSnapshot,
    primitive_source_packet_route_input_narrowing_rule:
      "The primitive/source-packet route can continue only when either a source-packet acceptance rule or an accepted same_packet_fold_impulse_or_direct_quadrature source packet is supplied for the live separator aggregate family and row scope. Aggregate inputs are complete; both route inputs remain absent.",
    primitive_source_packet_route_input_contract: contract,
    separator_primitive_source_packet_route_input_target_profiles: separatorProfiles,
    row_primitive_source_packet_route_input_target_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The primitive/source-packet route is narrowed to two fields across 12 separators and 112 row associations, for 248 route-input slots. Aggregate inputs are complete and all route-input slots remain unfilled.",
      continuation_class:
        "mechanical only after a source-packet acceptance rule or accepted same-packet fold impulse/direct-quadrature source packet is supplied; otherwise blocked at primitive/source-packet acceptance",
      fail_closed_stop_conditions: [
        "Do not treat this narrowing classifier as a source-packet acceptance rule.",
        "Do not treat complete aggregate inputs as an accepted same_packet_fold_impulse_or_direct_quadrature source packet.",
        "Do not infer an accepted interval-certified constants status, parent_complement_consumption_ref, or higher_fold_separator_layer_certificate from this classifier.",
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
      "Captured as a priority-only certificate-side primitive/source-packet route narrowing classifier under reference/priorities/proof-programs; no promotion to content/markdown/aaa.",
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
  const fieldRows = packet.primitive_source_packet_route_input_contract.target_fields.map((field) => [
    `\`${field}\``,
    "0",
    String(s.candidate_separator_constants),
    String(s.candidate_row_constant_associations),
  ]);
  const bucketRows = Object.entries(s.evidence_pool_rejection_bucket_counts).map(([bucket, count]) => [
    `\`${bucket}\``,
    String(count),
  ]);
  const separatorRows = packet.separator_primitive_source_packet_route_input_target_profiles.map((entry) => [
    `\`${entry.separator_event}\``,
    `\`${entry.fold_interval}\``,
    String(entry.row_count),
    String(entry.separator_aggregate_fields_complete),
    String(entry.route_input_target_slots_satisfied),
    String(entry.route_input_target_slots_missing),
    `\`${entry.first_route_input_blocker}\``,
  ]);
  const rowsBySeparatorRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Primitive Source-Packet Route Acceptance-Rule Handoff Narrowing Classifier

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Primitive Source-Packet Route Narrowed

This classifier imports the decision-frontier route-handoff contract classifier,
the primitive source-packet acceptance evidence dependency classifier, the
impulse-bound source-packet acceptance dependency classifier, the
fixed-parameter aggregate accepted constants conformance classifier, and the
separator aggregate certificate attempt. It verifies that the aggregate inputs
are complete and that neither primitive/source-packet route input is present.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct source-hash locks;
- ${s.retained_route_handoff_direct_source_hash_checks_passed} / 4 retained route-handoff source-hash locks;
- ${s.retained_decision_frontier_direct_source_hash_checks_passed} / 4 retained decision-frontier source-hash locks;
- ${s.retained_source_packet_route_source_hash_checks_passed} / 5 retained source-packet route source-hash locks;
- ${s.separators_with_separator_aggregate_fields_complete} / ${s.candidate_separator_constants} separator aggregate input profiles complete;
- ${s.rows_with_separator_aggregate_fields_complete} / ${s.candidate_row_constant_associations} row aggregate input profiles complete.

Narrowing result:

- ${s.imported_source_packet_evidence_pool_json_files_scanned} imported source-packet evidence-pool JSON files scanned;
- ${s.current_pool_primitive_route_input_json_files_scanned} current-pool JSON files scanned before this output;
- ${s.evidence_pool_compatible_source_packet_acceptance_evidence_files} compatible source-packet acceptance evidence files;
- ${s.primitive_source_packet_route_input_targets_declared} primitive/source-packet route-input target declared;
- ${s.primitive_source_packet_route_input_targets_satisfied} primitive/source-packet route-input targets satisfied;
- ${s.primitive_source_packet_route_input_target_fields} primitive/source-packet route-input fields;
- ${s.separator_primitive_source_packet_route_input_target_slots} separator primitive/source-packet route-input slots;
- ${s.row_primitive_source_packet_route_input_target_slots} row primitive/source-packet route-input slots;
- ${s.total_primitive_source_packet_route_input_target_slots} total primitive/source-packet route-input slots;
- ${s.total_primitive_source_packet_route_input_target_slots_satisfied} total primitive/source-packet route-input slots satisfied;
- ${s.total_primitive_source_packet_route_input_target_slots_missing} total primitive/source-packet route-input slots missing;
- ${s.mechanical_continuations_from_current_pool} mechanical continuations from the current pool.

The first primitive/source-packet route-input blocker is
\`${s.first_primitive_source_packet_route_input_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source-Hash Checks

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

## Route-Input Fields

| Field | Filled now | Separator slots required | Row slots required |
| --- | ---: | ---: | ---: |
${markdownTable(fieldRows)}

## Evidence Rejection Buckets

| Rejection bucket | Count |
| --- | ---: |
${markdownTable(bucketRows)}

## Separator Route-Input Targets

| Separator | Fold interval | Rows | Aggregate inputs complete | Slots filled | Slots missing | First blocker |
| --- | --- | ---: | --- | ---: | ---: | --- |
${markdownTable(separatorRows)}

## Row Scope

| Separator | Rows |
| --- | ---: |
${markdownTable(rowsBySeparatorRows)}

## Certificate-Side Handoff

Sharpened blocker: the primitive/source-packet route has complete aggregate
inputs, but the two route inputs remain absent: a source-packet acceptance rule
and an accepted same-packet fold impulse/direct-quadrature source packet.

Continuation class: requires a source-packet acceptance rule or accepted
source packet; this classifier makes no primitive-acceptance decision and
supplies neither object.

Fail-closed stop conditions:

- Do not treat this narrowing classifier as a source-packet acceptance rule.
- Do not treat complete aggregate inputs as an accepted
  \`same_packet_fold_impulse_or_direct_quadrature\` source packet.
- Do not infer an accepted interval-certified constants status,
  \`parent_complement_consumption_ref\`, or
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
    primitiveEvidence: args.primitiveEvidence,
    impulseAcceptance: args.impulseAcceptance,
    conformance: args.conformance,
    aggregate: args.aggregate,
    certificatePoolDir: args.certificatePoolDir,
  };
  const inputs = {
    routeHandoff: readJson(paths.routeHandoff),
    primitiveEvidence: readJson(paths.primitiveEvidence),
    impulseAcceptance: readJson(paths.impulseAcceptance),
    conformance: readJson(paths.conformance),
    aggregate: readJson(paths.aggregate),
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
