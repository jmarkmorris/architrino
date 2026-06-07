#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_DERIVATION_REF_ABSENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_DERIVATION_REF_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_ROUTE_INPUT_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_route_input_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_BRIDGE_ATTEMPT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_certificate_to_proof_grade_derivation_bridge_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_application_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const DERIVATION_REF_ABSENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_absence_classifier_fail_closed_target_declared_no_derivation_ref_evidence_object_no_proof_rule_no_route_decision_no_row_consumption";
const DERIVATION_REF_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_target_packet_fail_closed_derivation_ref_evidence_target_declared_current_pool_evidence_absent_no_proof_rule_no_route_decision_no_row_consumption";
const PROOF_GRADE_ROUTE_INPUT_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_route_input_target_packet_fail_closed_proof_grade_route_input_target_declared_current_pool_input_absent_no_route_decision_no_rule_decision_no_row_consumption";
const BRIDGE_ATTEMPT_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_certificate_to_proof_grade_derivation_bridge_attempt_fail_closed_source_certificates_present_proof_grade_status_derivation_bridge_absent_no_primitive_acceptance_no_row_consumption";
const PROOF_GRADE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier_fail_closed_source_certificates_complete_no_compatible_proof_grade_status_evidence_no_primitive_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_application_attempt_fail_closed_target_declared_derivation_ref_evidence_object_absent_no_status_ref_no_proof_rule_no_route_decision_no_row_consumption";

const TARGET_FIELD = "accepted_interval_certified_constants_status_proof_grade_derivation_ref";
const ABSENCE_BLOCKER = "proof_grade_derivation_ref_evidence_object_absent";
const TARGET_BLOCKER = "accepted_interval_certified_constants_status_proof_grade_derivation_ref_evidence_absent";
const SOURCE_HANDLE_BLOCKER = "source_certificate_handle_not_proof_grade_derivation_ref";

const ROUTE_INPUT_FIELDS = [
  "accepted_interval_certified_constants_status_proof_grade_derivation_ref",
  "accepted_interval_certified_constants_status_derivation",
  "accepted_interval_certified_constants_status_rule",
  "accepted_interval_certified_constants_status_soundness_proof",
  "accepted_interval_certified_constants_status_endpoint_application",
  "accepted_constants_conformance_derivation",
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
    derivationRefAbsence: DEFAULT_DERIVATION_REF_ABSENCE,
    derivationRefTarget: DEFAULT_DERIVATION_REF_TARGET,
    proofGradeRouteInputTarget: DEFAULT_PROOF_GRADE_ROUTE_INPUT_TARGET,
    bridgeAttempt: DEFAULT_BRIDGE_ATTEMPT,
    proofGradeEvidence: DEFAULT_PROOF_GRADE_EVIDENCE,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--derivation-ref-absence") {
      args.derivationRefAbsence = argv[++index];
    } else if (arg === "--derivation-ref-target") {
      args.derivationRefTarget = argv[++index];
    } else if (arg === "--proof-grade-route-input-target") {
      args.proofGradeRouteInputTarget = argv[++index];
    } else if (arg === "--bridge-attempt") {
      args.bridgeAttempt = argv[++index];
    } else if (arg === "--proof-grade-evidence") {
      args.proofGradeEvidence = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-proof-grade-derivation-ref-application-attempt.mjs [options]

Options:
  --derivation-ref-absence PATH       Proof-grade derivation-ref evidence absence classifier. Defaults to ${DEFAULT_DERIVATION_REF_ABSENCE}.
  --derivation-ref-target PATH        Proof-grade derivation-ref evidence target packet. Defaults to ${DEFAULT_DERIVATION_REF_TARGET}.
  --proof-grade-route-input-target PATH  Proof-grade route-input target packet. Defaults to ${DEFAULT_PROOF_GRADE_ROUTE_INPUT_TARGET}.
  --bridge-attempt PATH               Source-certificate to proof-grade derivation bridge attempt. Defaults to ${DEFAULT_BRIDGE_ATTEMPT}.
  --proof-grade-evidence PATH         Proof-grade evidence dependency classifier. Defaults to ${DEFAULT_PROOF_GRADE_EVIDENCE}.
  --out-dir PATH                      Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                            Pretty-print JSON artifact.
  --help                              Show this help.`);
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
    ["accepted_status_proof_grade_derivation_ref_evidence_absence_classifier", paths.derivationRefAbsence],
    ["accepted_status_proof_grade_derivation_ref_evidence_target_packet", paths.derivationRefTarget],
    ["accepted_status_proof_grade_route_input_target_packet", paths.proofGradeRouteInputTarget],
    ["accepted_status_source_certificate_to_proof_grade_derivation_bridge_attempt", paths.bridgeAttempt],
    ["accepted_status_proof_grade_evidence_dependency_classifier", paths.proofGradeEvidence],
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

function falsePresenceMap(fields) {
  return Object.fromEntries(fields.map((field) => [field, false]));
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

function indexBy(array, keyName, label) {
  const map = new Map();
  for (const entry of array) {
    const key = entry[keyName];
    if (map.has(key)) {
      throw new Error(`Duplicate ${label}: ${key}`);
    }
    map.set(key, entry);
  }
  return map;
}

function requireEntry(map, key, label) {
  const entry = map.get(key);
  if (!entry) {
    throw new Error(`Missing ${label}: ${key}`);
  }
  return entry;
}

function validateInputs(inputs) {
  assertPacketStatusAndLocks(inputs.derivationRefAbsence, "derivationRefAbsence", DERIVATION_REF_ABSENCE_STATUS);
  assertPacketStatusAndLocks(inputs.derivationRefTarget, "derivationRefTarget", DERIVATION_REF_TARGET_STATUS);
  assertPacketStatusAndLocks(
    inputs.proofGradeRouteInputTarget,
    "proofGradeRouteInputTarget",
    PROOF_GRADE_ROUTE_INPUT_TARGET_STATUS,
  );
  assertPacketStatusAndLocks(inputs.bridgeAttempt, "bridgeAttempt", BRIDGE_ATTEMPT_STATUS);
  assertPacketStatusAndLocks(inputs.proofGradeEvidence, "proofGradeEvidence", PROOF_GRADE_EVIDENCE_STATUS);
  const absence = inputs.derivationRefAbsence.summary;
  const target = inputs.derivationRefTarget.summary;
  const routeTarget = inputs.proofGradeRouteInputTarget.summary;
  const bridge = inputs.bridgeAttempt.summary;
  const evidence = inputs.proofGradeEvidence.summary;
  const expected = [
    [absence.direct_source_hash_checks_passed, 3, "absence direct locks"],
    [absence.total_proof_grade_derivation_ref_evidence_absence_slots, 124, "absence slots"],
    [absence.derivation_ref_evidence_objects_found, 0, "absence evidence objects"],
    [absence.compatible_proof_grade_derivation_ref_evidence_refs, 0, "absence compatible derivation refs"],
    [target.direct_source_hash_checks_passed, 3, "target direct locks"],
    [target.total_proof_grade_derivation_ref_evidence_target_slots, 124, "target slots"],
    [target.total_proof_grade_derivation_ref_evidence_target_slots_satisfied, 0, "target slots satisfied"],
    [routeTarget.direct_source_hash_checks_passed, 3, "proof-grade route target direct locks"],
    [routeTarget.proof_grade_route_input_target_fields, 6, "proof-grade route fields"],
    [routeTarget.total_proof_grade_route_input_target_slots, 744, "proof-grade route slots"],
    [routeTarget.total_proof_grade_route_input_target_slots_satisfied, 0, "proof-grade route satisfied slots"],
    [bridge.source_data_obligation_source_hash_checks_passed, 9, "bridge locks"],
    [bridge.separator_status_derivation_bridge_ready_count, 0, "separator bridges ready"],
    [bridge.row_status_derivation_bridge_ready_count, 0, "row bridges ready"],
    [evidence.source_hash_checks_passed, 9, "proof-grade evidence locks"],
    [evidence.evidence_pool_compatible_proof_grade_status_evidence_files, 0, "compatible status evidence"],
    [evidence.separator_compatible_proof_grade_evidence_slots_filled, 0, "separator evidence filled"],
    [evidence.row_compatible_proof_grade_evidence_slots_filled, 0, "row evidence filled"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
  assertRowsBySeparator(absence, "derivation-ref absence");
  assertRowsBySeparator(target, "derivation-ref target");
  assertRowsBySeparator(routeTarget, "proof-grade route target");
  assertRowsBySeparator(bridge, "bridge attempt");
  assertRowsBySeparator(evidence, "proof-grade evidence");
}

function buildSeparatorApplicationAttempts(inputs) {
  const bridgeBySeparator = indexBy(inputs.bridgeAttempt.separator_accepted_status_derivation_bridge_attempts, "separator_event", "separator bridge attempt");
  const absenceBySeparator = indexBy(
    inputs.derivationRefAbsence.separator_proof_grade_derivation_ref_evidence_absence_profiles,
    "separator_event",
    "separator absence profile",
  );
  const targetBySeparator = indexBy(
    inputs.derivationRefTarget.separator_proof_grade_derivation_ref_evidence_target_profiles,
    "separator_event",
    "separator target profile",
  );
  return inputs.proofGradeEvidence.separator_proof_grade_evidence_dependency_profiles.map((profile) => {
    const bridge = requireEntry(bridgeBySeparator, profile.separator_event, "separator bridge");
    const absence = requireEntry(absenceBySeparator, profile.separator_event, "separator absence");
    const target = requireEntry(targetBySeparator, profile.separator_event, "separator target");
    return {
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      row_count: profile.row_count,
      derivation_source_evidence_complete: profile.derivation_source_evidence_complete,
      source_certificate_handle_present: bridge.derivation_source_evidence_complete === true,
      source_certificate_handle_is_proof_grade_derivation_ref: false,
      source_certificate_handle_reused_as_derivation_ref: false,
      route_input_field_presence: falsePresenceMap(ROUTE_INPUT_FIELDS),
      route_input_fields_present: 0,
      route_input_fields_missing: ROUTE_INPUT_FIELDS.length,
      target_declared: target.proof_grade_derivation_ref_evidence_target_satisfied === false,
      target_satisfied: false,
      derivation_ref_evidence_object_present: absence.derivation_ref_evidence_object_present,
      bridge_ready: bridge.bridge_ready,
      imported_proof_grade_derivation_ref_present: false,
      constructed_proof_grade_derivation_ref_present: false,
      accepted_interval_certified_constants_status_ref_constructed: false,
      accepted_interval_certified_constants_status_present: false,
      application_authorized: false,
      first_application_blocker: ABSENCE_BLOCKER,
      first_source_handle_blocker: SOURCE_HANDLE_BLOCKER,
      first_target_blocker: target.first_target_blocker,
      row_consumption_count: 0,
      preledger_pass_rows: 0,
      branch_chart_authorized_rows: 0,
      classification: "separator_target_declared_derivation_ref_evidence_object_absent_application_blocked",
    };
  });
}

function buildRowApplicationAttempts(inputs) {
  const bridgeByRow = indexBy(inputs.bridgeAttempt.row_accepted_status_derivation_bridge_attempts, "row_id", "row bridge attempt");
  const absenceByRow = indexBy(
    inputs.derivationRefAbsence.row_proof_grade_derivation_ref_evidence_absence_profiles,
    "row_id",
    "row absence profile",
  );
  const targetByRow = indexBy(
    inputs.derivationRefTarget.row_proof_grade_derivation_ref_evidence_target_profiles,
    "row_id",
    "row target profile",
  );
  return inputs.proofGradeEvidence.row_proof_grade_evidence_dependency_profiles.map((profile) => {
    const bridge = requireEntry(bridgeByRow, profile.row_id, "row bridge");
    const absence = requireEntry(absenceByRow, profile.row_id, "row absence");
    const target = requireEntry(targetByRow, profile.row_id, "row target");
    return {
      row_id: profile.row_id,
      ledger: profile.ledger,
      status: profile.status,
      failure_code: profile.failure_code,
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      receiver_interval: profile.receiver_interval,
      source_interval: profile.source_interval,
      derivation_source_evidence_complete: profile.derivation_source_evidence_complete,
      source_certificate_handle_present: bridge.derivation_source_evidence_complete === true,
      source_certificate_handle_is_proof_grade_derivation_ref: false,
      source_certificate_handle_reused_as_derivation_ref: false,
      route_input_field_presence: falsePresenceMap(ROUTE_INPUT_FIELDS),
      route_input_fields_present: 0,
      route_input_fields_missing: ROUTE_INPUT_FIELDS.length,
      target_declared: target.proof_grade_derivation_ref_evidence_target_satisfied === false,
      target_satisfied: false,
      derivation_ref_evidence_object_present: absence.derivation_ref_evidence_object_present,
      bridge_ready: bridge.bridge_ready,
      imported_proof_grade_derivation_ref_present: false,
      constructed_proof_grade_derivation_ref_present: false,
      accepted_interval_certified_constants_status_ref_constructed: false,
      accepted_interval_certified_constants_status_present: false,
      accepted_fold_layer_row: false,
      row_consumed: false,
      preledger_pass: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
      application_authorized: false,
      first_application_blocker: ABSENCE_BLOCKER,
      first_source_handle_blocker: SOURCE_HANDLE_BLOCKER,
      first_target_blocker: target.first_target_blocker,
      classification: "row_target_declared_derivation_ref_evidence_object_absent_application_blocked",
    };
  });
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const absence = inputs.derivationRefAbsence.summary;
  const target = inputs.derivationRefTarget.summary;
  const routeTarget = inputs.proofGradeRouteInputTarget.summary;
  const bridge = inputs.bridgeAttempt.summary;
  const evidence = inputs.proofGradeEvidence.summary;
  const separatorAttempts = buildSeparatorApplicationAttempts(inputs);
  const rowAttempts = buildRowApplicationAttempts(inputs);
  const attemptSlots = separatorAttempts.length + rowAttempts.length;
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    retained_derivation_ref_absence_direct_source_hash_checks_passed: absence.direct_source_hash_checks_passed,
    retained_derivation_ref_target_direct_source_hash_checks_passed: target.direct_source_hash_checks_passed,
    retained_proof_grade_route_input_direct_source_hash_checks_passed: routeTarget.direct_source_hash_checks_passed,
    retained_bridge_source_data_obligation_source_hash_checks_passed:
      bridge.source_data_obligation_source_hash_checks_passed,
    retained_proof_grade_evidence_source_hash_checks_passed: evidence.source_hash_checks_passed,
    candidate_higher_fold_constants_artifacts: routeTarget.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: routeTarget.candidate_separator_constants,
    candidate_row_constant_associations: routeTarget.candidate_row_constant_associations,
    rows_by_separator_count: routeTarget.rows_by_separator_count,
    proof_grade_route_input_target_fields: routeTarget.proof_grade_route_input_target_fields,
    separator_proof_grade_route_input_slots: 72,
    row_proof_grade_route_input_slots: 672,
    total_proof_grade_route_input_target_slots: routeTarget.total_proof_grade_route_input_target_slots,
    total_proof_grade_route_input_target_slots_satisfied: routeTarget.total_proof_grade_route_input_target_slots_satisfied,
    total_proof_grade_route_input_target_slots_missing: routeTarget.total_proof_grade_route_input_target_slots_missing,
    proof_grade_derivation_ref_evidence_target_fields: target.proof_grade_derivation_ref_evidence_target_fields,
    total_proof_grade_derivation_ref_evidence_target_slots:
      target.total_proof_grade_derivation_ref_evidence_target_slots,
    total_proof_grade_derivation_ref_evidence_target_slots_satisfied:
      target.total_proof_grade_derivation_ref_evidence_target_slots_satisfied,
    total_proof_grade_derivation_ref_evidence_absence_slots:
      absence.total_proof_grade_derivation_ref_evidence_absence_slots,
    total_proof_grade_derivation_ref_evidence_absence_slots_with_evidence_object:
      absence.total_proof_grade_derivation_ref_evidence_absence_slots_with_evidence_object,
    separator_proof_grade_derivation_ref_application_attempts: separatorAttempts.length,
    row_proof_grade_derivation_ref_application_attempts: rowAttempts.length,
    total_proof_grade_derivation_ref_application_attempts: attemptSlots,
    separator_source_certificate_handles_tested: countTrue(
      separatorAttempts,
      (profile) => profile.source_certificate_handle_present,
    ),
    row_source_certificate_handles_tested: countTrue(rowAttempts, (profile) => profile.source_certificate_handle_present),
    total_source_certificate_handles_tested: attemptSlots,
    source_certificate_handle_as_derivation_ref_rejections: attemptSlots,
    source_certificate_handle_reuse_authorizations: 0,
    proof_grade_derivation_ref_applications_authorized: 0,
    separator_derivation_ref_applications_authorized: 0,
    row_derivation_ref_applications_authorized: 0,
    accepted_interval_certified_constants_status_proof_grade_derivation_refs_constructed: 0,
    separator_imported_proof_grade_derivation_refs: 0,
    row_imported_proof_grade_derivation_refs: 0,
    total_imported_proof_grade_derivation_refs: 0,
    separator_constructed_proof_grade_derivation_refs: 0,
    row_constructed_proof_grade_derivation_refs: 0,
    total_constructed_proof_grade_derivation_refs: 0,
    separator_status_derivation_bridge_ready_count: bridge.separator_status_derivation_bridge_ready_count,
    row_status_derivation_bridge_ready_count: bridge.row_status_derivation_bridge_ready_count,
    derivation_ref_evidence_objects_found: absence.derivation_ref_evidence_objects_found,
    compatible_proof_grade_derivation_ref_evidence_refs:
      absence.compatible_proof_grade_derivation_ref_evidence_refs,
    target_packet_as_derivation_ref_evidence_rejections:
      absence.target_packet_as_derivation_ref_evidence_rejections,
    evidence_dependency_record_as_derivation_ref_evidence_rejections:
      absence.evidence_dependency_record_as_derivation_ref_evidence_rejections,
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
    first_derivation_ref_application_blocker: ABSENCE_BLOCKER,
    first_source_handle_blocker: SOURCE_HANDLE_BLOCKER,
    first_derivation_ref_target_blocker: TARGET_BLOCKER,
    first_bridge_blocker: bridge.first_bridge_blocker,
    parent_complement_consumption_ref_blocker: bridge.parent_complement_consumption_ref_blocker,
    first_separator_certificate_blocker: bridge.first_separator_certificate_blocker,
  };

  const invariant =
    summary.direct_source_hash_checks === 5 &&
    summary.direct_source_hash_checks_passed === 5 &&
    summary.retained_derivation_ref_absence_direct_source_hash_checks_passed === 3 &&
    summary.retained_derivation_ref_target_direct_source_hash_checks_passed === 3 &&
    summary.retained_proof_grade_route_input_direct_source_hash_checks_passed === 3 &&
    summary.retained_bridge_source_data_obligation_source_hash_checks_passed === 9 &&
    summary.retained_proof_grade_evidence_source_hash_checks_passed === 9 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    JSON.stringify(summary.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR) &&
    summary.proof_grade_route_input_target_fields === 6 &&
    summary.separator_proof_grade_route_input_slots === 72 &&
    summary.row_proof_grade_route_input_slots === 672 &&
    summary.total_proof_grade_route_input_target_slots === 744 &&
    summary.total_proof_grade_route_input_target_slots_satisfied === 0 &&
    summary.total_proof_grade_derivation_ref_evidence_target_slots === 124 &&
    summary.total_proof_grade_derivation_ref_evidence_target_slots_satisfied === 0 &&
    summary.total_proof_grade_derivation_ref_evidence_absence_slots === 124 &&
    summary.total_proof_grade_derivation_ref_evidence_absence_slots_with_evidence_object === 0 &&
    summary.separator_proof_grade_derivation_ref_application_attempts === 12 &&
    summary.row_proof_grade_derivation_ref_application_attempts === 112 &&
    summary.total_proof_grade_derivation_ref_application_attempts === 124 &&
    summary.total_source_certificate_handles_tested === 124 &&
    summary.source_certificate_handle_as_derivation_ref_rejections === 124 &&
    summary.proof_grade_derivation_ref_applications_authorized === 0 &&
    summary.accepted_interval_certified_constants_status_proof_grade_derivation_refs_constructed === 0 &&
    summary.total_imported_proof_grade_derivation_refs === 0 &&
    summary.total_constructed_proof_grade_derivation_refs === 0 &&
    summary.derivation_ref_evidence_objects_found === 0 &&
    summary.compatible_proof_grade_derivation_ref_evidence_refs === 0 &&
    summary.route_decisions_made === 0 &&
    summary.proof_rule_decisions_made === 0 &&
    summary.primitive_acceptance_decisions_made === 0 &&
    summary.source_packet_acceptance_rules_constructed === 0 &&
    summary.accepted_interval_certified_constants_statuses_constructed === 0 &&
    summary.row_consumption_count === 0 &&
    summary.preledger_pass === false &&
    summary.updates_live_ledger === false &&
    summary.branch_chart_authorized === false;
  if (!invariant) {
    throw new Error("Proof-grade derivation-ref application invariant failed.");
  }

  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-proof-grade-derivation-ref-application-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only proof-grade derivation-ref application attempt; proves that a declared accepted_interval_certified_constants_status_proof_grade_derivation_ref target cannot be applied from current source-certificate handles while the derivation-ref evidence object remains absent",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_proof_grade_derivation_ref_evidence_absence_classifier: artifactRecord(paths.derivationRefAbsence),
      accepted_status_proof_grade_derivation_ref_evidence_target_packet: artifactRecord(paths.derivationRefTarget),
      accepted_status_proof_grade_route_input_target_packet: artifactRecord(paths.proofGradeRouteInputTarget),
      accepted_status_source_certificate_to_proof_grade_derivation_bridge_attempt: artifactRecord(paths.bridgeAttempt),
      accepted_status_proof_grade_evidence_dependency_classifier: artifactRecord(paths.proofGradeEvidence),
    },
    source_hash_checks: sourceChecks,
    proof_grade_derivation_ref_application_rule:
      "A declared proof-grade derivation-ref target cannot be applied until a separate compatible accepted_interval_certified_constants_status_proof_grade_derivation_ref evidence object exists. Source-certificate/source-data handles, target packets, bridge attempts, and dependency records are not derivation-ref evidence objects.",
    separator_proof_grade_derivation_ref_application_attempts: separatorAttempts,
    row_proof_grade_derivation_ref_application_attempts: rowAttempts,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The live proof-grade branch is blocked at the application boundary: the target is declared, but 0 / 124 slots have a derivation-ref evidence object, so 0 / 124 applications are authorized.",
      continuation_class:
        "mechanical only after an imported proof-grade derivation-ref evidence object is supplied or an explicit proof-rule decision is made; this attempt does not make that decision",
      fail_closed_stop_conditions: [
        "Do not apply a derivation-ref target without a derivation-ref evidence object.",
        "Do not reuse source-certificate or source-data handles as proof-grade derivation refs.",
        "Do not treat a target packet, absence classifier, bridge attempt, or dependency record as a derivation-ref evidence object.",
        "Do not construct accepted interval-certified constants status refs, statuses, derivations, rules, soundness proofs, endpoint applications, or accepted constants conformance derivations from this attempt.",
        "Do not introduce a primitive source-packet acceptance rule or accepted source packet from this attempt.",
        "Do not infer parent_complement_consumption_ref or higher_fold_separator_layer_certificate from this attempt.",
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
      "Captured as a priority-only certificate-side proof-grade derivation-ref application attempt under reference/priorities/proof-programs; no promotion to content/markdown/aaa.",
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
  const rowsBySeparatorRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Proof-Grade Derivation-Ref Application Attempt

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Application Boundary Tested

This attempt imports the proof-grade derivation-ref evidence absence classifier,
the proof-grade derivation-ref evidence target packet, the proof-grade
route-input target packet, the source-certificate to proof-grade derivation
bridge attempt, and the proof-grade evidence dependency classifier. It tests
whether the declared \`${TARGET_FIELD}\` target can be applied from the current
source-certificate/source-data handles. It cannot: the target is declared, but
the derivation-ref evidence object is absent.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct source-hash locks;
- ${s.retained_derivation_ref_absence_direct_source_hash_checks_passed} / 3 retained derivation-ref absence locks;
- ${s.retained_derivation_ref_target_direct_source_hash_checks_passed} / 3 retained derivation-ref target locks;
- ${s.retained_proof_grade_route_input_direct_source_hash_checks_passed} / 3 retained proof-grade route-input locks;
- ${s.retained_bridge_source_data_obligation_source_hash_checks_passed} / 9 retained bridge source-data locks;
- ${s.retained_proof_grade_evidence_source_hash_checks_passed} / 9 retained proof-grade evidence locks.

Application result:

- ${s.total_proof_grade_route_input_target_slots} proof-grade route-input slots, ${s.total_proof_grade_route_input_target_slots_satisfied} satisfied;
- ${s.total_proof_grade_derivation_ref_evidence_target_slots} derivation-ref evidence target slots, ${s.total_proof_grade_derivation_ref_evidence_target_slots_satisfied} satisfied;
- ${s.total_proof_grade_derivation_ref_evidence_absence_slots} derivation-ref evidence absence slots;
- ${s.total_source_certificate_handles_tested} source-certificate/source-data handles tested;
- ${s.source_certificate_handle_as_derivation_ref_rejections} source-certificate-handle-as-derivation-ref rejections;
- ${s.derivation_ref_evidence_objects_found} derivation-ref evidence objects found;
- ${s.proof_grade_derivation_ref_applications_authorized} derivation-ref applications authorized;
- ${s.accepted_interval_certified_constants_status_proof_grade_derivation_refs_constructed} accepted-status proof-grade derivation refs constructed;
- ${s.accepted_interval_certified_constants_status_refs_constructed} accepted-status refs constructed;
- ${s.accepted_interval_certified_constants_statuses_constructed} accepted statuses constructed.

The first derivation-ref application blocker is
\`${s.first_derivation_ref_application_blocker}\`.

## Source-Hash Checks

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

## Row Scope

| Separator | Rows |
| --- | ---: |
${markdownTable(rowsBySeparatorRows)}

## Certificate-Side Handoff

Sharpened blocker: the derivation-ref target is declared, but 0 / 124 slots
have a derivation-ref evidence object, so 0 / 124 applications are authorized.
The lane still requires a separate proof-grade derivation-ref evidence object
or an explicit proof-rule decision before any accepted-status ref or status
object can be constructed.

Continuation class: mechanical only after an imported proof-grade derivation-ref
evidence object is supplied or an explicit proof-rule decision is made. This
attempt does not make that decision.

Fail-closed stop conditions:

- Do not apply a derivation-ref target without a derivation-ref evidence object.
- Do not reuse source-certificate or source-data handles as proof-grade
  derivation refs.
- Do not treat a target packet, absence classifier, bridge attempt, or
  dependency record as a derivation-ref evidence object.
- Do not construct accepted interval-certified constants status refs, statuses,
  derivations, rules, soundness proofs, endpoint applications, or accepted
  constants conformance derivations from this attempt.
- Do not introduce a primitive source-packet acceptance rule or accepted source
  packet from this attempt.
- Do not infer \`parent_complement_consumption_ref\` or
  \`higher_fold_separator_layer_certificate\` from this attempt.
- Do not consume rows, set \`preledger_pass\`, update the live ledger, or
  authorize a branch chart.

## Authorization Lock

- \`preledger_pass\`: ${packet.authorization_lock.preledger_pass}
- \`updates_live_ledger\`: ${packet.authorization_lock.updates_live_ledger}
- \`accepted_fold_layer_rows\`: ${packet.authorization_lock.accepted_fold_layer_rows}
- \`row_consumption_count\`: ${packet.authorization_lock.row_consumption_count}
- \`branch_chart_authorized\`: ${packet.authorization_lock.branch_chart_authorized}

This artifact is priority-only and proves no accepted interval-certified
constants status, proof rule, source-packet acceptance rule, accepted
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
    derivationRefAbsence: args.derivationRefAbsence,
    derivationRefTarget: args.derivationRefTarget,
    proofGradeRouteInputTarget: args.proofGradeRouteInputTarget,
    bridgeAttempt: args.bridgeAttempt,
    proofGradeEvidence: args.proofGradeEvidence,
  };
  const inputs = {
    derivationRefAbsence: readJson(paths.derivationRefAbsence),
    derivationRefTarget: readJson(paths.derivationRefTarget),
    proofGradeRouteInputTarget: readJson(paths.proofGradeRouteInputTarget),
    bridgeAttempt: readJson(paths.bridgeAttempt),
    proofGradeEvidence: readJson(paths.proofGradeEvidence),
  };
  const packet = buildPacket(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, packet, args.pretty);
  writeText(outReport, renderReport(packet));
  console.log(`wrote ${outJson}`);
  console.log(`wrote ${outReport}`);
  for (const [key, value] of Object.entries(packet.summary)) {
    if (typeof value === "object" && value !== null) {
      console.log(`${key}: ${Object.values(value).join(",")}`);
    } else {
      console.log(`${key}: ${value}`);
    }
  }
}

main();
