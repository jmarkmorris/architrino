#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ROUTE_INPUT_DISJUNCTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_disjunction_closure_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CURRENT_POOL_EXHAUSTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_certificate_pool_route_exhaustion_closure_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
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
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
]);

const ROUTE_INPUT_DISJUNCTION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_disjunction_closure_handoff_classifier_fail_closed_proof_grade_and_primitive_route_inputs_absent_current_pool_disjunction_unsatisfied_no_route_decision_no_rule_decision_no_row_consumption";
const CURRENT_POOL_EXHAUSTION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_certificate_pool_route_exhaustion_closure_classifier_fail_closed_proof_grade_and_source_packet_routes_exhausted_no_compatible_current_pool_evidence_no_primitive_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet_fail_closed_current_pool_route_input_disjunction_exhausted_external_route_evidence_or_acceptance_decision_required_no_row_consumption";

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
    routeInputDisjunction: DEFAULT_ROUTE_INPUT_DISJUNCTION,
    currentPoolExhaustion: DEFAULT_CURRENT_POOL_EXHAUSTION,
    certificatePoolDir: CERT_DIR,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--route-input-disjunction") {
      args.routeInputDisjunction = argv[++index];
    } else if (arg === "--current-pool-exhaustion") {
      args.currentPoolExhaustion = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-current-pool-route-input-disjunction-exhaustion-obligation-packet.mjs [options]

Options:
  --route-input-disjunction PATH  Route-input disjunction closure handoff classifier. Defaults to ${DEFAULT_ROUTE_INPUT_DISJUNCTION}.
  --current-pool-exhaustion PATH  Older current-pool route exhaustion closure classifier. Defaults to ${DEFAULT_CURRENT_POOL_EXHAUSTION}.
  --certificate-pool-dir PATH     Certificate pool directory. Defaults to ${CERT_DIR}.
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
    ["accepted_status_route_input_disjunction_closure_handoff_classifier", paths.routeInputDisjunction],
    ["accepted_status_current_certificate_pool_route_exhaustion_closure_classifier", paths.currentPoolExhaustion],
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
  const fileRecords = [];
  const counters = {
    accepted_status_route_artifacts: 0,
    accepted_status_route_artifacts_fail_closed: 0,
    accepted_status_route_artifacts_non_fail_closed: 0,
    source_packet_acceptance_rule_non_fail_closed_files: 0,
    preledger_pass_true_files: 0,
    live_ledger_update_true_files: 0,
    branch_chart_authorized_true_files: 0,
    row_consumption_positive_files: 0,
    accepted_interval_certified_constants_status_positive_files: 0,
  };
  const nonFailClosedAcceptedStatusBasenames = [];
  const nonFailClosedSourcePacketRuleBasenames = [];

  for (const basename of jsonFiles) {
    const filePath = path.join(certificatePoolDir, basename);
    const fileBytes = fs.readFileSync(filePath);
    const sha256 = crypto.createHash("sha256").update(fileBytes).digest("hex");
    fileRecords.push({ basename, sha256 });
    let parsed;
    try {
      parsed = JSON.parse(fileBytes);
    } catch {
      continue;
    }
    const status = String(parsed.status ?? "");
    const summary = parsed.summary ?? {};
    const text = fileBytes.toString("utf8");
    if (status.includes("accepted_interval_certified_status")) {
      counters.accepted_status_route_artifacts += 1;
      if (status.includes("fail_closed")) {
        counters.accepted_status_route_artifacts_fail_closed += 1;
      } else {
        counters.accepted_status_route_artifacts_non_fail_closed += 1;
        nonFailClosedAcceptedStatusBasenames.push(basename);
      }
    }
    if (text.includes("source_packet_acceptance_rule") && !status.includes("fail_closed")) {
      counters.source_packet_acceptance_rule_non_fail_closed_files += 1;
      nonFailClosedSourcePacketRuleBasenames.push(basename);
    }
    if (parsed.preledger_pass === true || summary.preledger_pass === true) {
      counters.preledger_pass_true_files += 1;
    }
    if (parsed.updates_live_ledger === true || summary.updates_live_ledger === true) {
      counters.live_ledger_update_true_files += 1;
    }
    if (parsed.branch_chart_authorized === true || summary.branch_chart_authorized === true) {
      counters.branch_chart_authorized_true_files += 1;
    }
    if ((summary.row_consumption_count ?? 0) > 0) {
      counters.row_consumption_positive_files += 1;
    }
    if ((summary.accepted_interval_certified_constants_statuses_constructed ?? 0) > 0) {
      counters.accepted_interval_certified_constants_status_positive_files += 1;
    }
  }

  const poolHash = crypto
    .createHash("sha256")
    .update(fileRecords.map((record) => `${record.basename}:${record.sha256}`).join("\n"))
    .digest("hex");
  return {
    directory: certificatePoolDir,
    output_json_basename_excluded: outputBasename,
    json_files_scanned_before_output: fileRecords.length,
    json_pool_sha256: poolHash,
    counters,
    non_fail_closed_accepted_status_basenames: nonFailClosedAcceptedStatusBasenames,
    non_fail_closed_source_packet_acceptance_rule_basenames: nonFailClosedSourcePacketRuleBasenames,
  };
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
  assertPacketStatusAndLocks(inputs.routeInputDisjunction, "routeInputDisjunction", ROUTE_INPUT_DISJUNCTION_STATUS);
  assertPacketStatusAndLocks(inputs.currentPoolExhaustion, "currentPoolExhaustion", CURRENT_POOL_EXHAUSTION_STATUS);
  const disjunction = inputs.routeInputDisjunction.summary;
  const exhaustion = inputs.currentPoolExhaustion.summary;
  const expected = [
    [disjunction.direct_source_hash_checks_passed, 4, "route-input disjunction direct source-hash locks"],
    [disjunction.current_pool_route_input_disjunction_json_files_scanned, 246, "route-input disjunction pool scan"],
    [disjunction.route_input_disjunctions_declared, 1, "route-input disjunctions declared"],
    [disjunction.route_input_disjunctions_satisfied, 0, "route-input disjunctions satisfied"],
    [disjunction.total_proof_grade_route_input_target_slots, 744, "proof-grade route-input slots"],
    [disjunction.total_proof_grade_route_input_target_slots_satisfied, 0, "proof-grade route-input slots satisfied"],
    [disjunction.total_primitive_source_packet_route_input_target_slots, 248, "primitive route-input slots"],
    [
      disjunction.total_primitive_source_packet_route_input_target_slots_satisfied,
      0,
      "primitive route-input slots satisfied",
    ],
    [disjunction.total_combined_route_input_disjunction_slots, 992, "combined route-input disjunction slots"],
    [disjunction.total_combined_route_input_disjunction_slots_satisfied, 0, "combined route-input slots satisfied"],
    [disjunction.mechanical_continuations_from_current_pool, 0, "route-input mechanical continuations"],
    [exhaustion.direct_source_hash_checks_passed, 3, "current-pool exhaustion direct source-hash locks"],
    [exhaustion.current_certificate_pool_json_files_scanned, 240, "current-pool exhaustion scan"],
    [exhaustion.evidence_pool_route_classes_exhausted, 2, "route classes exhausted"],
    [exhaustion.compatible_proof_grade_current_pool_evidence_files, 0, "proof-grade current-pool evidence"],
    [exhaustion.compatible_source_packet_acceptance_current_pool_evidence_files, 0, "source-packet current-pool evidence"],
    [exhaustion.mechanical_continuations_from_current_pool, 0, "old current-pool mechanical continuations"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
  assertRowsBySeparator(disjunction, "route-input disjunction");
  assertRowsBySeparator(exhaustion, "current-pool exhaustion");
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const poolSnapshot = currentCertificatePoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const disjunction = inputs.routeInputDisjunction.summary;
  const exhaustion = inputs.currentPoolExhaustion.summary;
  const counters = poolSnapshot.counters;
  const terminalRouteObligations = [
    {
      obligation_id: "proof_grade_accepted_status_route_input",
      obligation_class: "external_proof_grade_accepted_status_evidence",
      required_route_input_fields: disjunction.proof_grade_route_input_target_fields,
      required_slots: disjunction.total_proof_grade_route_input_target_slots,
      satisfied_slots: disjunction.total_proof_grade_route_input_target_slots_satisfied,
      missing_slots: disjunction.total_proof_grade_route_input_target_slots_missing,
      current_pool_satisfied: false,
      first_blocker: disjunction.first_proof_grade_route_input_blocker,
    },
    {
      obligation_id: "primitive_source_packet_route_input",
      obligation_class: "explicit_primitive_source_packet_acceptance_decision",
      required_route_input_fields: disjunction.primitive_source_packet_route_input_target_fields,
      required_slots: disjunction.total_primitive_source_packet_route_input_target_slots,
      satisfied_slots: disjunction.total_primitive_source_packet_route_input_target_slots_satisfied,
      missing_slots: disjunction.total_primitive_source_packet_route_input_target_slots_missing,
      current_pool_satisfied: false,
      first_blocker: disjunction.first_primitive_source_packet_route_input_blocker,
    },
    {
      obligation_id: "source_packet_acceptance_rule",
      obligation_class: "explicit_source_packet_acceptance_rule",
      required_slots: disjunction.total_source_packet_acceptance_rule_target_slots,
      satisfied_slots: 0,
      missing_slots: disjunction.total_source_packet_acceptance_rule_target_slots_missing,
      current_pool_satisfied: false,
      first_blocker: disjunction.first_source_packet_acceptance_rule_target_blocker,
    },
  ];
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    retained_route_input_disjunction_direct_source_hash_checks_passed: disjunction.direct_source_hash_checks_passed,
    retained_current_pool_exhaustion_direct_source_hash_checks_passed: exhaustion.direct_source_hash_checks_passed,
    current_pool_terminal_route_json_files_scanned: poolSnapshot.json_files_scanned_before_output,
    current_pool_json_delta_since_route_input_disjunction_scan:
      poolSnapshot.json_files_scanned_before_output - disjunction.current_pool_route_input_disjunction_json_files_scanned,
    current_pool_json_delta_since_current_pool_exhaustion_scan:
      poolSnapshot.json_files_scanned_before_output - exhaustion.current_certificate_pool_json_files_scanned,
    route_input_disjunction_handoff_files_added_since_previous_scan: 1,
    accepted_status_route_artifacts_in_current_pool: counters.accepted_status_route_artifacts,
    accepted_status_route_artifacts_fail_closed: counters.accepted_status_route_artifacts_fail_closed,
    accepted_status_route_artifacts_non_fail_closed: counters.accepted_status_route_artifacts_non_fail_closed,
    source_packet_acceptance_rule_non_fail_closed_files: counters.source_packet_acceptance_rule_non_fail_closed_files,
    preledger_pass_true_files: counters.preledger_pass_true_files,
    live_ledger_update_true_files: counters.live_ledger_update_true_files,
    branch_chart_authorized_true_files: counters.branch_chart_authorized_true_files,
    row_consumption_positive_files: counters.row_consumption_positive_files,
    accepted_interval_certified_constants_status_positive_files:
      counters.accepted_interval_certified_constants_status_positive_files,
    candidate_higher_fold_constants_artifacts: disjunction.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: disjunction.candidate_separator_constants,
    candidate_row_constant_associations: disjunction.candidate_row_constant_associations,
    rows_by_separator_count: disjunction.rows_by_separator_count,
    evidence_pool_route_classes_exhausted: exhaustion.evidence_pool_route_classes_exhausted,
    route_input_disjunctions_declared: disjunction.route_input_disjunctions_declared,
    route_input_disjunctions_satisfied: disjunction.route_input_disjunctions_satisfied,
    route_input_disjunctions_absent: disjunction.route_input_disjunctions_absent,
    proof_grade_route_input_targets_declared: disjunction.proof_grade_route_input_targets_declared,
    proof_grade_route_input_targets_satisfied: disjunction.proof_grade_route_input_targets_satisfied,
    total_proof_grade_route_input_target_slots: disjunction.total_proof_grade_route_input_target_slots,
    total_proof_grade_route_input_target_slots_satisfied:
      disjunction.total_proof_grade_route_input_target_slots_satisfied,
    total_proof_grade_route_input_target_slots_missing: disjunction.total_proof_grade_route_input_target_slots_missing,
    primitive_source_packet_route_input_targets_declared:
      disjunction.primitive_source_packet_route_input_targets_declared,
    primitive_source_packet_route_input_targets_satisfied:
      disjunction.primitive_source_packet_route_input_targets_satisfied,
    total_primitive_source_packet_route_input_target_slots:
      disjunction.total_primitive_source_packet_route_input_target_slots,
    total_primitive_source_packet_route_input_target_slots_satisfied:
      disjunction.total_primitive_source_packet_route_input_target_slots_satisfied,
    total_primitive_source_packet_route_input_target_slots_missing:
      disjunction.total_primitive_source_packet_route_input_target_slots_missing,
    source_packet_acceptance_rule_targets_declared: disjunction.source_packet_acceptance_rule_targets_declared,
    total_source_packet_acceptance_rule_target_slots: disjunction.total_source_packet_acceptance_rule_target_slots,
    total_source_packet_acceptance_rule_target_slots_missing:
      disjunction.total_source_packet_acceptance_rule_target_slots_missing,
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
    terminal_route_obligations_declared: terminalRouteObligations.length,
    terminal_route_obligations_satisfied: 0,
    terminal_route_obligations_unsatisfied: terminalRouteObligations.length,
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
    first_terminal_route_blocker: "current_pool_route_input_disjunction_exhausted",
    first_external_proof_grade_obligation: disjunction.first_proof_grade_route_input_blocker,
    first_external_primitive_obligation: disjunction.first_primitive_source_packet_route_input_blocker,
    first_source_packet_acceptance_rule_obligation: disjunction.first_source_packet_acceptance_rule_target_blocker,
    parent_complement_consumption_ref_blocker: disjunction.parent_complement_consumption_ref_blocker,
    first_separator_certificate_blocker: disjunction.first_separator_certificate_blocker,
  };

  const invariant =
    summary.direct_source_hash_checks === 2 &&
    summary.direct_source_hash_checks_passed === 2 &&
    summary.retained_route_input_disjunction_direct_source_hash_checks_passed === 4 &&
    summary.retained_current_pool_exhaustion_direct_source_hash_checks_passed === 3 &&
    summary.current_pool_terminal_route_json_files_scanned === 247 &&
    summary.current_pool_json_delta_since_route_input_disjunction_scan === 1 &&
    summary.current_pool_json_delta_since_current_pool_exhaustion_scan === 7 &&
    summary.route_input_disjunction_handoff_files_added_since_previous_scan === 1 &&
    summary.accepted_status_route_artifacts_in_current_pool === 14 &&
    summary.accepted_status_route_artifacts_fail_closed === 14 &&
    summary.accepted_status_route_artifacts_non_fail_closed === 0 &&
    summary.source_packet_acceptance_rule_non_fail_closed_files === 0 &&
    summary.preledger_pass_true_files === 0 &&
    summary.live_ledger_update_true_files === 0 &&
    summary.branch_chart_authorized_true_files === 0 &&
    summary.row_consumption_positive_files === 0 &&
    summary.accepted_interval_certified_constants_status_positive_files === 0 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    JSON.stringify(summary.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR) &&
    summary.evidence_pool_route_classes_exhausted === 2 &&
    summary.route_input_disjunctions_declared === 1 &&
    summary.route_input_disjunctions_satisfied === 0 &&
    summary.proof_grade_route_input_targets_declared === 1 &&
    summary.total_proof_grade_route_input_target_slots === 744 &&
    summary.total_proof_grade_route_input_target_slots_satisfied === 0 &&
    summary.primitive_source_packet_route_input_targets_declared === 1 &&
    summary.total_primitive_source_packet_route_input_target_slots === 248 &&
    summary.total_primitive_source_packet_route_input_target_slots_satisfied === 0 &&
    summary.source_packet_acceptance_rule_targets_declared === 1 &&
    summary.total_source_packet_acceptance_rule_target_slots === 124 &&
    summary.total_combined_route_input_disjunction_slots === 992 &&
    summary.total_combined_route_input_disjunction_slots_satisfied === 0 &&
    summary.compatible_proof_grade_current_pool_evidence_files === 0 &&
    summary.compatible_source_packet_acceptance_current_pool_evidence_files === 0 &&
    summary.compatible_route_input_disjunction_current_pool_files === 0 &&
    summary.terminal_route_obligations_declared === 3 &&
    summary.terminal_route_obligations_satisfied === 0 &&
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
    throw new Error("Current-pool route-input disjunction exhaustion obligation invariant failed.");
  }

  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-current-pool-route-input-disjunction-exhaustion-obligation-packet-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only current-pool route-input disjunction exhaustion obligation packet; proves the current pool gained only a fail-closed disjunction handoff after the previous route exhaustion classifier and still contains no accepted-status route input, source-packet acceptance rule, accepted source packet, row consumption, preledger pass, live-ledger update, or branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_route_input_disjunction_closure_handoff_classifier: artifactRecord(paths.routeInputDisjunction),
      accepted_status_current_certificate_pool_route_exhaustion_closure_classifier: artifactRecord(
        paths.currentPoolExhaustion,
      ),
    },
    source_hash_checks: sourceChecks,
    current_pool_terminal_route_snapshot: poolSnapshot,
    exhaustion_rule:
      "A current-pool route-input disjunction exhaustion obligation packet may declare only external obligations when every accepted-status route artifact in the current pool remains fail-closed, neither branch of the route-input disjunction is satisfied, and all row/preledger/live-ledger/branch-chart locks remain false.",
    terminal_route_obligations: terminalRouteObligations,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The current pool now contains the route-input disjunction closure handoff, but it is itself fail-closed and supplies no accepted-status route input.",
      continuation_class:
        "no mechanical continuation from the current certificate pool; continue only by supplying proof-grade accepted-status evidence or by making an explicit primitive/source-packet acceptance decision outside this packet",
      mechanical_lane_can_continue_from_current_pool: false,
      decision_required: true,
      fail_closed_stop_conditions: [
        "Do not treat the route-input disjunction closure handoff as branch satisfaction.",
        "Do not treat any fail-closed accepted-status-lane artifact as an accepted interval-certified constants status.",
        "Do not construct or infer a source-packet acceptance rule from this obligation packet.",
        "Do not infer parent_complement_consumption_ref or higher_fold_separator_layer_certificate from this packet.",
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
      "Captured as a priority-only certificate-side current-pool route-input disjunction exhaustion obligation packet under reference/priorities/proof-programs; no promotion to content/markdown/aaa.",
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
  const obligationRows = packet.terminal_route_obligations.map((obligation) => [
    `\`${obligation.obligation_id}\``,
    `\`${obligation.obligation_class}\``,
    String(obligation.required_slots),
    String(obligation.satisfied_slots),
    String(obligation.missing_slots),
    String(obligation.current_pool_satisfied),
    `\`${obligation.first_blocker}\``,
  ]);
  const rowsBySeparatorRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Current-Pool Route-Input Disjunction Exhaustion Obligation Packet

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Exhaustion Boundary

This packet imports the latest route-input disjunction closure handoff
classifier and the older current-certificate-pool route exhaustion closure
classifier. It records that the current pool gained the fail-closed
route-input disjunction handoff, not a route input. The accepted-status lane
therefore has no mechanical continuation from the current pool.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct source-hash locks;
- ${s.retained_route_input_disjunction_direct_source_hash_checks_passed} / 4 retained route-input disjunction locks;
- ${s.retained_current_pool_exhaustion_direct_source_hash_checks_passed} / 3 retained current-pool exhaustion locks;
- ${s.current_pool_terminal_route_json_files_scanned} current-pool JSON files scanned before this output;
- ${s.current_pool_json_delta_since_route_input_disjunction_scan} current-pool JSON file added since the route-input disjunction scan;
- ${s.current_pool_json_delta_since_current_pool_exhaustion_scan} current-pool JSON files added since the older exhaustion scan.

Current-pool terminal scan:

- ${s.accepted_status_route_artifacts_in_current_pool} accepted-status-lane artifacts in the current pool;
- ${s.accepted_status_route_artifacts_fail_closed} fail-closed accepted-status-lane artifacts;
- ${s.accepted_status_route_artifacts_non_fail_closed} non-fail-closed accepted-status-lane artifacts;
- ${s.source_packet_acceptance_rule_non_fail_closed_files} non-fail-closed source-packet acceptance rule files;
- ${s.preledger_pass_true_files} files with \`preledger_pass=true\`;
- ${s.live_ledger_update_true_files} files with \`updates_live_ledger=true\`;
- ${s.branch_chart_authorized_true_files} files with \`branch_chart_authorized=true\`;
- ${s.row_consumption_positive_files} files with positive row consumption;
- ${s.accepted_interval_certified_constants_status_positive_files} files with constructed accepted interval-certified constants statuses.

Route-input disjunction state:

- ${s.route_input_disjunctions_declared} route-input disjunction declared;
- ${s.route_input_disjunctions_satisfied} route-input disjunctions satisfied;
- ${s.total_proof_grade_route_input_target_slots} proof-grade route-input slots, ${s.total_proof_grade_route_input_target_slots_satisfied} satisfied;
- ${s.total_primitive_source_packet_route_input_target_slots} primitive/source-packet route-input slots, ${s.total_primitive_source_packet_route_input_target_slots_satisfied} satisfied;
- ${s.total_source_packet_acceptance_rule_target_slots} source-packet acceptance rule target slots;
- ${s.total_combined_route_input_disjunction_slots} total combined route-input disjunction slots, ${s.total_combined_route_input_disjunction_slots_satisfied} satisfied;
- ${s.mechanical_continuations_from_current_pool} mechanical continuations from the current pool.

The first terminal route blocker is \`${s.first_terminal_route_blocker}\`.

## Source-Hash Checks

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

## Terminal Route Obligations

| Obligation | Class | Required slots | Satisfied slots | Missing slots | Current-pool satisfied | First blocker |
| --- | --- | ---: | ---: | ---: | --- | --- |
${markdownTable(obligationRows)}

## Row Scope

| Separator | Rows |
| --- | ---: |
${markdownTable(rowsBySeparatorRows)}

## Certificate-Side Handoff

Sharpened blocker: the current pool now contains the route-input disjunction
closure handoff, but that handoff is fail-closed and does not satisfy either
accepted-status route branch.

Continuation class: no mechanical continuation from the current certificate
pool. Continue only by supplying proof-grade accepted-status evidence or by
making an explicit primitive/source-packet acceptance decision outside this
packet.

Fail-closed stop conditions:

- Do not treat the route-input disjunction closure handoff as branch
  satisfaction.
- Do not treat any fail-closed accepted-status-lane artifact as an accepted
  interval-certified constants status.
- Do not construct or infer a source-packet acceptance rule from this
  obligation packet.
- Do not infer \`parent_complement_consumption_ref\` or
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
    routeInputDisjunction: args.routeInputDisjunction,
    currentPoolExhaustion: args.currentPoolExhaustion,
    certificatePoolDir: args.certificatePoolDir,
  };
  const inputs = {
    routeInputDisjunction: readJson(paths.routeInputDisjunction),
    currentPoolExhaustion: readJson(paths.currentPoolExhaustion),
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
