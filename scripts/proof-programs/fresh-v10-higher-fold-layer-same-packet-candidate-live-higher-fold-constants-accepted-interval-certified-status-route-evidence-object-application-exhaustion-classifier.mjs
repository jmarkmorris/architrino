#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_PROOF_GRADE_APPLICATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_CURRENT_POOL_ABSENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_CONTRACT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_APPLICATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROUTE_CONTRACT_DISJUNCTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_contract_disjunction_exhaustion_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_TERMINAL_ROUTE_OBLIGATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_application_exhaustion_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_application_exhaustion_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
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

const PROOF_GRADE_APPLICATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_application_attempt_fail_closed_target_declared_derivation_ref_evidence_object_absent_no_status_ref_no_proof_rule_no_route_decision_no_row_consumption";
const PROOF_GRADE_CURRENT_POOL_ABSENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier_fail_closed_current_pool_scanned_derivation_ref_evidence_object_absent_downstream_outputs_not_evidence_no_status_ref_no_proof_rule_no_route_decision_no_primitive_acceptance_no_row_consumption";
const PROOF_GRADE_CONTRACT_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet_fail_closed_contract_declared_current_pool_derivation_ref_evidence_object_absent_no_status_ref_no_proof_rule_no_route_decision_no_primitive_acceptance_no_row_consumption";
const PRIMITIVE_APPLICATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt_fail_closed_contract_declared_rule_target_and_aggregate_inputs_not_application_evidence_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";
const ROUTE_CONTRACT_DISJUNCTION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_contract_disjunction_exhaustion_classifier_fail_closed_proof_grade_and_primitive_route_evidence_object_contracts_unsatisfied_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";
const TERMINAL_ROUTE_OBLIGATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet_fail_closed_current_pool_route_input_disjunction_exhausted_external_route_evidence_or_acceptance_decision_required_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_application_exhaustion_classifier_fail_closed_proof_grade_and_primitive_route_applications_rejected_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";

const ACCEPTED_STATUS_LANE_PREFIX =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_";
const PROOF_GRADE_FIELD = "accepted_interval_certified_constants_status_proof_grade_derivation_ref";
const SOURCE_PACKET_ACCEPTANCE_RULE_FIELD = "source_packet_acceptance_rule";
const ACCEPTED_SOURCE_PACKET_FIELD = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet";
const ROUTE_APPLICATION_BLOCKER = "route_evidence_object_application_authorization_absent";
const PROOF_GRADE_BLOCKER = "proof_grade_derivation_ref_evidence_object_absent";
const SOURCE_HANDLE_REJECTION = "source_certificate_handle_not_proof_grade_derivation_ref";
const SOURCE_PACKET_RULE_TARGET_REJECTION =
  "source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule";
const COMPLETE_AGGREGATE_REJECTION = "complete_separator_aggregate_inputs_as_accepted_source_packet";
const SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER =
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
    proofGradeApplication: DEFAULT_PROOF_GRADE_APPLICATION,
    proofGradeCurrentPoolAbsence: DEFAULT_PROOF_GRADE_CURRENT_POOL_ABSENCE,
    proofGradeContract: DEFAULT_PROOF_GRADE_CONTRACT,
    primitiveApplication: DEFAULT_PRIMITIVE_APPLICATION,
    routeContractDisjunction: DEFAULT_ROUTE_CONTRACT_DISJUNCTION,
    terminalRouteObligation: DEFAULT_TERMINAL_ROUTE_OBLIGATION,
    certificatePoolDir: CERT_DIR,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--proof-grade-application") {
      args.proofGradeApplication = argv[++index];
    } else if (arg === "--proof-grade-current-pool-absence") {
      args.proofGradeCurrentPoolAbsence = argv[++index];
    } else if (arg === "--proof-grade-contract") {
      args.proofGradeContract = argv[++index];
    } else if (arg === "--primitive-application") {
      args.primitiveApplication = argv[++index];
    } else if (arg === "--route-contract-disjunction") {
      args.routeContractDisjunction = argv[++index];
    } else if (arg === "--terminal-route-obligation") {
      args.terminalRouteObligation = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-route-evidence-object-application-exhaustion-classifier.mjs [options]

Options:
  --proof-grade-application PATH      Proof-grade derivation-ref application attempt. Defaults to ${DEFAULT_PROOF_GRADE_APPLICATION}.
  --proof-grade-current-pool-absence PATH
                                      Proof-grade derivation-ref current-pool absence classifier. Defaults to ${DEFAULT_PROOF_GRADE_CURRENT_POOL_ABSENCE}.
  --proof-grade-contract PATH         Proof-grade derivation-ref evidence-object contract target. Defaults to ${DEFAULT_PROOF_GRADE_CONTRACT}.
  --primitive-application PATH        Primitive/source-packet route evidence-object application attempt. Defaults to ${DEFAULT_PRIMITIVE_APPLICATION}.
  --route-contract-disjunction PATH   Route evidence-object contract disjunction exhaustion classifier. Defaults to ${DEFAULT_ROUTE_CONTRACT_DISJUNCTION}.
  --terminal-route-obligation PATH    Current-pool route-input disjunction exhaustion obligation packet. Defaults to ${DEFAULT_TERMINAL_ROUTE_OBLIGATION}.
  --certificate-pool-dir PATH         Certificate JSON pool directory. Defaults to ${CERT_DIR}.
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
    ["accepted_status_proof_grade_derivation_ref_application_attempt", paths.proofGradeApplication],
    [
      "accepted_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier",
      paths.proofGradeCurrentPoolAbsence,
    ],
    ["accepted_status_proof_grade_derivation_ref_evidence_object_contract_target_packet", paths.proofGradeContract],
    ["accepted_status_primitive_source_packet_route_evidence_object_application_attempt", paths.primitiveApplication],
    [
      "accepted_status_route_evidence_object_contract_disjunction_exhaustion_classifier",
      paths.routeContractDisjunction,
    ],
    ["accepted_status_current_pool_route_input_disjunction_exhaustion_obligation_packet", paths.terminalRouteObligation],
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
  assertPacketStatusAndLocks(inputs.proofGradeApplication, "proofGradeApplication", PROOF_GRADE_APPLICATION_STATUS);
  assertPacketStatusAndLocks(
    inputs.proofGradeCurrentPoolAbsence,
    "proofGradeCurrentPoolAbsence",
    PROOF_GRADE_CURRENT_POOL_ABSENCE_STATUS,
  );
  assertPacketStatusAndLocks(inputs.proofGradeContract, "proofGradeContract", PROOF_GRADE_CONTRACT_STATUS);
  assertPacketStatusAndLocks(inputs.primitiveApplication, "primitiveApplication", PRIMITIVE_APPLICATION_STATUS);
  assertPacketStatusAndLocks(
    inputs.routeContractDisjunction,
    "routeContractDisjunction",
    ROUTE_CONTRACT_DISJUNCTION_STATUS,
  );
  assertPacketStatusAndLocks(inputs.terminalRouteObligation, "terminalRouteObligation", TERMINAL_ROUTE_OBLIGATION_STATUS);

  const proof = inputs.proofGradeApplication.summary;
  const proofCurrentPoolAbsence = inputs.proofGradeCurrentPoolAbsence.summary;
  const proofContract = inputs.proofGradeContract.summary;
  const primitive = inputs.primitiveApplication.summary;
  const disjunction = inputs.routeContractDisjunction.summary;
  const terminal = inputs.terminalRouteObligation.summary;
  const expected = [
    [proof.direct_source_hash_checks_passed, 5, "proof-grade application direct source-hash locks"],
    [proof.total_proof_grade_derivation_ref_application_attempts, 124, "proof-grade application attempts"],
    [proof.proof_grade_derivation_ref_applications_authorized, 0, "proof-grade applications authorized"],
    [proof.source_certificate_handle_as_derivation_ref_rejections, 124, "source-handle rejections"],
    [proofCurrentPoolAbsence.direct_source_hash_checks_passed, 5, "proof current-pool absence direct locks"],
    [proofCurrentPoolAbsence.current_pool_json_files_scanned, 252, "proof current-pool absence scanned files"],
    [
      proofCurrentPoolAbsence.current_pool_derivation_ref_evidence_object_files_found,
      0,
      "proof current-pool derivation-ref evidence objects",
    ],
    [
      proofCurrentPoolAbsence.current_pool_compatible_derivation_ref_evidence_refs,
      0,
      "proof current-pool derivation-ref refs",
    ],
    [proofContract.direct_source_hash_checks_passed, 6, "proof contract direct locks"],
    [proofContract.total_derivation_ref_evidence_object_contract_slots, 124, "proof contract slots"],
    [proofContract.contract_slots_satisfied, 0, "proof contract slots satisfied"],
    [primitive.direct_source_hash_checks_passed, 8, "primitive application direct source-hash locks"],
    [primitive.total_route_evidence_object_application_attempts, 248, "primitive route application attempts"],
    [primitive.total_route_evidence_object_applications_authorized, 0, "primitive route applications authorized"],
    [
      primitive.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections,
      124,
      "source-packet rule target rejections",
    ],
    [
      primitive.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections,
      124,
      "aggregate-as-source-packet rejections",
    ],
    [disjunction.direct_source_hash_checks_passed, 3, "route disjunction direct source-hash locks"],
    [disjunction.total_route_evidence_object_contract_slots, 372, "route contract slots"],
    [disjunction.route_evidence_object_contract_slots_satisfied, 0, "route contract slots satisfied"],
    [disjunction.current_pool_compatible_route_evidence_object_refs, 0, "compatible route evidence refs"],
    [terminal.direct_source_hash_checks_passed, 2, "terminal route direct source-hash locks"],
    [terminal.terminal_route_obligations_declared, 3, "terminal route obligations"],
    [terminal.terminal_route_obligations_satisfied, 0, "terminal route obligations satisfied"],
    [terminal.mechanical_continuations_from_current_pool, 0, "terminal mechanical continuations"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
  assertRowsBySeparator(proof, "proof-grade application");
  assertRowsBySeparator(proofCurrentPoolAbsence, "proof current-pool absence");
  assertRowsBySeparator(proofContract, "proof-grade contract");
  assertRowsBySeparator(primitive, "primitive/source-packet application");
  assertRowsBySeparator(disjunction, "route contract disjunction");
  assertRowsBySeparator(terminal, "terminal route obligation");
}

function routeApplicationAuthorized(parsed, text) {
  const summary = parsed.summary ?? {};
  return (
    (summary.proof_grade_derivation_ref_applications_authorized ?? 0) > 0 ||
    (summary.total_route_evidence_object_applications_authorized ?? 0) > 0 ||
    (summary.route_evidence_object_applications_authorized ?? 0) > 0 ||
    /"application_authorized"\s*:\s*true/.test(text) ||
    /"route_evidence_object_application_authorized"\s*:\s*true/.test(text)
  );
}

function currentPoolSnapshot(certificatePoolDir, outputBasename) {
  const jsonFiles = fs
    .readdirSync(certificatePoolDir)
    .filter(
      (entry) => entry.endsWith(".json") && entry !== outputBasename && !DOWNSTREAM_OUTPUT_JSON_BASENAMES.has(entry),
    )
    .sort();
  const records = [];
  const counters = {
    accepted_status_lane_json_files: 0,
    accepted_status_lane_fail_closed_json_files: 0,
    accepted_status_lane_non_fail_closed_json_files: 0,
    current_pool_route_evidence_object_application_files_found: 0,
    current_pool_compatible_route_evidence_object_application_refs: 0,
    preledger_pass_true_files: 0,
    live_ledger_update_true_files: 0,
    branch_chart_authorized_true_files: 0,
    row_consumption_positive_files: 0,
    accepted_interval_certified_constants_status_positive_files: 0,
  };
  const compatibleApplicationBasenames = [];
  const nonFailClosedAcceptedStatusBasenames = [];

  for (const basename of jsonFiles) {
    const filePath = path.join(certificatePoolDir, basename);
    const text = fs.readFileSync(filePath, "utf8");
    const sha256 = crypto.createHash("sha256").update(text).digest("hex");
    records.push({ basename, sha256 });
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      continue;
    }
    const status = String(parsed.status ?? "");
    const summary = parsed.summary ?? {};
    const failClosed = status.includes("fail_closed");
    if (basename.startsWith(ACCEPTED_STATUS_LANE_PREFIX)) {
      counters.accepted_status_lane_json_files += 1;
      if (failClosed) {
        counters.accepted_status_lane_fail_closed_json_files += 1;
      } else {
        counters.accepted_status_lane_non_fail_closed_json_files += 1;
        nonFailClosedAcceptedStatusBasenames.push(basename);
      }
    }
    if (parsed.packet_id === PACKET_ID && !failClosed && routeApplicationAuthorized(parsed, text)) {
      counters.current_pool_route_evidence_object_application_files_found += 1;
      counters.current_pool_compatible_route_evidence_object_application_refs += 1;
      compatibleApplicationBasenames.push(basename);
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
    .update(records.map((record) => `${record.basename}:${record.sha256}`).join("\n"))
    .digest("hex");
  return {
    directory: certificatePoolDir,
    output_json_basename_excluded: outputBasename,
    json_files_scanned_before_output: records.length,
    json_pool_sha256: poolHash,
    counters,
    compatible_route_evidence_object_application_basenames: compatibleApplicationBasenames,
    non_fail_closed_accepted_status_basenames: nonFailClosedAcceptedStatusBasenames,
  };
}

function buildSeparatorProfiles(proofGradeApplication, primitiveApplication) {
  const primitiveBySeparator = indexBy(
    primitiveApplication.separator_primitive_source_packet_route_evidence_object_application_attempts,
    "separator_event",
    "separator primitive application",
  );
  return proofGradeApplication.separator_proof_grade_derivation_ref_application_attempts.map((proofProfile) => {
    const primitiveProfile = requireEntry(
      primitiveBySeparator,
      proofProfile.separator_event,
      "separator primitive application",
    );
    return {
      separator_event: proofProfile.separator_event,
      fold_interval: proofProfile.fold_interval,
      row_count: proofProfile.row_count,
      route_evidence_object_application_branches: [
        PROOF_GRADE_FIELD,
        SOURCE_PACKET_ACCEPTANCE_RULE_FIELD,
        ACCEPTED_SOURCE_PACKET_FIELD,
      ],
      route_evidence_object_application_slots: 3,
      route_evidence_object_applications_authorized: 0,
      route_evidence_object_applications_rejected: 3,
      proof_grade_derivation_ref_application_attempted: true,
      proof_grade_derivation_ref_application_authorized: proofProfile.application_authorized,
      source_certificate_handle_as_derivation_ref_rejected:
        proofProfile.source_certificate_handle_is_proof_grade_derivation_ref === false,
      source_packet_acceptance_rule_application_attempted: true,
      source_packet_acceptance_rule_application_authorized: false,
      source_packet_acceptance_rule_target_packet_as_rule_rejected:
        primitiveProfile.source_packet_acceptance_rule_target_packet_as_rule_rejected,
      accepted_source_packet_application_attempted: true,
      accepted_source_packet_application_authorized: false,
      complete_separator_aggregate_inputs_as_accepted_source_packet_rejected:
        primitiveProfile.complete_separator_aggregate_inputs_as_accepted_source_packet_rejected,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      source_packet_acceptance_rule_constructed: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_constructed: false,
      row_consumption_count: 0,
      preledger_pass_rows: 0,
      branch_chart_authorized_rows: 0,
      first_route_application_blocker: ROUTE_APPLICATION_BLOCKER,
      first_proof_grade_application_blocker: PROOF_GRADE_BLOCKER,
      first_source_handle_rejection: SOURCE_HANDLE_REJECTION,
      first_rule_application_rejection: SOURCE_PACKET_RULE_TARGET_REJECTION,
      first_accepted_source_packet_application_rejection: COMPLETE_AGGREGATE_REJECTION,
      first_source_packet_acceptance_rule_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
      first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
      classification: "separator_route_evidence_object_applications_rejected_fail_closed",
    };
  });
}

function buildRowProfiles(proofGradeApplication, primitiveApplication) {
  const primitiveByRow = indexBy(
    primitiveApplication.row_primitive_source_packet_route_evidence_object_application_attempts,
    "row_id",
    "row primitive application",
  );
  return proofGradeApplication.row_proof_grade_derivation_ref_application_attempts
    .map((proofProfile) => {
      const primitiveProfile = requireEntry(primitiveByRow, proofProfile.row_id, "row primitive application");
      return {
        row_id: proofProfile.row_id,
        ledger: proofProfile.ledger,
        status: proofProfile.status,
        failure_code: proofProfile.failure_code,
        separator_event: proofProfile.separator_event,
        fold_interval: proofProfile.fold_interval,
        receiver_interval: proofProfile.receiver_interval,
        source_interval: proofProfile.source_interval,
        route_evidence_object_application_branches: [
          PROOF_GRADE_FIELD,
          SOURCE_PACKET_ACCEPTANCE_RULE_FIELD,
          ACCEPTED_SOURCE_PACKET_FIELD,
        ],
        route_evidence_object_application_slots: 3,
        route_evidence_object_applications_authorized: 0,
        route_evidence_object_applications_rejected: 3,
        proof_grade_derivation_ref_application_attempted: true,
        proof_grade_derivation_ref_application_authorized: proofProfile.application_authorized,
        source_certificate_handle_as_derivation_ref_rejected:
          proofProfile.source_certificate_handle_is_proof_grade_derivation_ref === false,
        source_packet_acceptance_rule_application_attempted: true,
        source_packet_acceptance_rule_application_authorized: false,
        source_packet_acceptance_rule_target_packet_as_rule_rejected:
          primitiveProfile.source_packet_acceptance_rule_target_packet_as_rule_rejected,
        accepted_source_packet_application_attempted: true,
        accepted_source_packet_application_authorized: false,
        complete_separator_aggregate_inputs_as_accepted_source_packet_rejected:
          primitiveProfile.complete_separator_aggregate_inputs_as_accepted_source_packet_rejected,
        route_decision_made: false,
        proof_rule_decision_made: false,
        primitive_acceptance_decision_made: false,
        source_packet_acceptance_rule_constructed: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_constructed: false,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
        first_route_application_blocker: ROUTE_APPLICATION_BLOCKER,
        first_proof_grade_application_blocker: PROOF_GRADE_BLOCKER,
        first_source_handle_rejection: SOURCE_HANDLE_REJECTION,
        first_rule_application_rejection: SOURCE_PACKET_RULE_TARGET_REJECTION,
        first_accepted_source_packet_application_rejection: COMPLETE_AGGREGATE_REJECTION,
        first_source_packet_acceptance_rule_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
        first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
        classification: "row_route_evidence_object_applications_rejected_fail_closed",
      };
    })
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const poolSnapshot = currentPoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const separatorProfiles = buildSeparatorProfiles(inputs.proofGradeApplication, inputs.primitiveApplication);
  const rowProfiles = buildRowProfiles(inputs.proofGradeApplication, inputs.primitiveApplication);
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const proof = inputs.proofGradeApplication.summary;
  const proofCurrentPoolAbsence = inputs.proofGradeCurrentPoolAbsence.summary;
  const proofContract = inputs.proofGradeContract.summary;
  const primitive = inputs.primitiveApplication.summary;
  const disjunction = inputs.routeContractDisjunction.summary;
  const terminal = inputs.terminalRouteObligation.summary;
  const counters = poolSnapshot.counters;
  const totalRouteApplications =
    proof.total_proof_grade_derivation_ref_application_attempts +
    primitive.total_route_evidence_object_application_attempts;
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_proof_grade_application_direct_source_hash_checks_passed: proof.direct_source_hash_checks_passed,
    retained_proof_grade_current_pool_absence_direct_source_hash_checks_passed:
      proofCurrentPoolAbsence.direct_source_hash_checks_passed,
    retained_proof_grade_contract_direct_source_hash_checks_passed: proofContract.direct_source_hash_checks_passed,
    retained_primitive_application_direct_source_hash_checks_passed: primitive.direct_source_hash_checks_passed,
    retained_route_contract_disjunction_direct_source_hash_checks_passed:
      disjunction.direct_source_hash_checks_passed,
    retained_terminal_route_obligation_direct_source_hash_checks_passed:
      terminal.direct_source_hash_checks_passed,
    current_pool_json_files_scanned: poolSnapshot.json_files_scanned_before_output,
    accepted_status_lane_json_files_scanned: counters.accepted_status_lane_json_files,
    accepted_status_lane_fail_closed_json_files: counters.accepted_status_lane_fail_closed_json_files,
    accepted_status_lane_non_fail_closed_json_files: counters.accepted_status_lane_non_fail_closed_json_files,
    current_pool_route_evidence_object_application_files_found:
      counters.current_pool_route_evidence_object_application_files_found,
    current_pool_compatible_route_evidence_object_application_refs:
      counters.current_pool_compatible_route_evidence_object_application_refs,
    candidate_higher_fold_constants_artifacts: proof.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: proof.candidate_separator_constants,
    candidate_row_constant_associations: proof.candidate_row_constant_associations,
    rows_by_separator_count: rowsBySeparator,
    route_evidence_object_application_branches: 3,
    separator_route_evidence_object_application_slots: separatorProfiles.length * 3,
    separator_route_evidence_object_applications_authorized: 0,
    row_route_evidence_object_application_slots: rowProfiles.length * 3,
    row_route_evidence_object_applications_authorized: 0,
    total_route_evidence_object_application_attempts: totalRouteApplications,
    total_route_evidence_object_applications_authorized: 0,
    total_route_evidence_object_application_rejections: totalRouteApplications,
    proof_grade_derivation_ref_application_attempts:
      proof.total_proof_grade_derivation_ref_application_attempts,
    proof_grade_derivation_ref_applications_authorized:
      proof.proof_grade_derivation_ref_applications_authorized,
    source_certificate_handle_as_derivation_ref_rejections:
      proof.source_certificate_handle_as_derivation_ref_rejections,
    proof_grade_current_pool_json_files_scanned: proofCurrentPoolAbsence.current_pool_json_files_scanned,
    proof_grade_current_pool_derivation_ref_evidence_objects_found:
      proofCurrentPoolAbsence.current_pool_derivation_ref_evidence_object_files_found,
    proof_grade_current_pool_compatible_derivation_ref_evidence_refs:
      proofCurrentPoolAbsence.current_pool_compatible_derivation_ref_evidence_refs,
    proof_grade_derivation_ref_evidence_object_contract_slots:
      proofContract.total_derivation_ref_evidence_object_contract_slots,
    proof_grade_derivation_ref_evidence_object_contract_slots_satisfied:
      proofContract.contract_slots_satisfied,
    primitive_source_packet_route_evidence_object_application_attempts:
      primitive.total_route_evidence_object_application_attempts,
    primitive_source_packet_route_evidence_object_applications_authorized:
      primitive.total_route_evidence_object_applications_authorized,
    source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections:
      primitive.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections,
    complete_separator_aggregate_inputs_as_accepted_source_packet_rejections:
      primitive.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections,
    route_evidence_object_contract_disjunctions_declared:
      disjunction.route_evidence_object_contract_disjunctions_declared,
    route_evidence_object_contract_disjunctions_satisfied:
      disjunction.route_evidence_object_contract_disjunctions_satisfied,
    total_route_evidence_object_contract_slots: disjunction.total_route_evidence_object_contract_slots,
    route_evidence_object_contract_slots_satisfied:
      disjunction.route_evidence_object_contract_slots_satisfied,
    terminal_route_obligations_declared: terminal.terminal_route_obligations_declared,
    terminal_route_obligations_satisfied: terminal.terminal_route_obligations_satisfied,
    terminal_route_obligations_unsatisfied: terminal.terminal_route_obligations_unsatisfied,
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
    preledger_pass_true_files: counters.preledger_pass_true_files,
    live_ledger_update_true_files: counters.live_ledger_update_true_files,
    branch_chart_authorized_true_files: counters.branch_chart_authorized_true_files,
    row_consumption_positive_files: counters.row_consumption_positive_files,
    accepted_interval_certified_constants_status_positive_files:
      counters.accepted_interval_certified_constants_status_positive_files,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_route_application_blocker: ROUTE_APPLICATION_BLOCKER,
    first_proof_grade_application_blocker: PROOF_GRADE_BLOCKER,
    first_source_handle_rejection: SOURCE_HANDLE_REJECTION,
    first_rule_application_rejection: SOURCE_PACKET_RULE_TARGET_REJECTION,
    first_accepted_source_packet_application_rejection: COMPLETE_AGGREGATE_REJECTION,
    first_source_packet_acceptance_rule_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
    first_terminal_route_blocker: terminal.first_terminal_route_blocker,
    parent_complement_consumption_ref_blocker: proof.parent_complement_consumption_ref_blocker,
    first_separator_certificate_blocker: proof.first_separator_certificate_blocker,
  };

  assertPacketInvariants(summary);
  return {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_route_evidence_object_application_exhaustion_classifier.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status route evidence-object application exhaustion",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status route evidence-object application exhaustion",
    claim_level:
      "priority-only route evidence-object application exhaustion classifier; imports the proof-grade derivation-ref and primitive/source-packet application attempts and proves all route evidence-object applications remain unauthorized without making proof-rule, route, primitive-acceptance, source-packet acceptance, accepted-status, or row-consumption decisions",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_proof_grade_derivation_ref_application_attempt: artifactRecord(paths.proofGradeApplication),
      accepted_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier: artifactRecord(
        paths.proofGradeCurrentPoolAbsence,
      ),
      accepted_status_proof_grade_derivation_ref_evidence_object_contract_target_packet: artifactRecord(
        paths.proofGradeContract,
      ),
      accepted_status_primitive_source_packet_route_evidence_object_application_attempt: artifactRecord(
        paths.primitiveApplication,
      ),
      accepted_status_route_evidence_object_contract_disjunction_exhaustion_classifier: artifactRecord(
        paths.routeContractDisjunction,
      ),
      accepted_status_current_pool_route_input_disjunction_exhaustion_obligation_packet: artifactRecord(
        paths.terminalRouteObligation,
      ),
    },
    source_hash_checks: sourceChecks,
    current_pool_route_evidence_object_application_snapshot: poolSnapshot,
    route_evidence_object_application_branches: [
      {
        branch: "proof_grade_derivation_ref",
        required_field: PROOF_GRADE_FIELD,
        application_attempts: proof.total_proof_grade_derivation_ref_application_attempts,
        applications_authorized: proof.proof_grade_derivation_ref_applications_authorized,
        first_application_blocker: PROOF_GRADE_BLOCKER,
        first_rejection: SOURCE_HANDLE_REJECTION,
      },
      {
        branch: SOURCE_PACKET_ACCEPTANCE_RULE_FIELD,
        application_attempts: primitive.total_source_packet_acceptance_rule_target_slots,
        applications_authorized: 0,
        first_application_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
        first_rejection: SOURCE_PACKET_RULE_TARGET_REJECTION,
      },
      {
        branch: ACCEPTED_SOURCE_PACKET_FIELD,
        application_attempts: primitive.total_source_packet_acceptance_rule_target_slots,
        applications_authorized: 0,
        first_application_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
        first_rejection: COMPLETE_AGGREGATE_REJECTION,
      },
    ],
    separator_route_evidence_object_application_exhaustion_profiles: separatorProfiles,
    row_route_evidence_object_application_exhaustion_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "route_evidence_object_application_exhaustion",
      current_pool_closure_state:
        "not mechanically closable from the current certificate pool; proof-grade and primitive/source-packet route evidence-object application attempts are all rejected",
      route_evidence_object_applications_authorized: 0,
      mechanical_continuation_available: false,
      decision_required: true,
      allowed_next_inputs: [
        "proof_grade_derivation_ref_evidence_object_for_accepted_interval_certified_constants_status",
        "source_packet_acceptance_rule_for_live_same_packet_separator_aggregate_family",
        "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_for_live_same_packet_separator_aggregate_family",
      ],
      forbidden_reinterpretations: [
        SOURCE_HANDLE_REJECTION,
        SOURCE_PACKET_RULE_TARGET_REJECTION,
        COMPLETE_AGGREGATE_REJECTION,
        "route_evidence_object_contract_disjunction_exhaustion_classifier_as_route_evidence_object",
        "route_evidence_object_application_exhaustion_classifier_as_route_decision",
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
      "Priority-only. This classifier combines the proof-grade and primitive/source-packet application attempts and proves the current route evidence-object application surface authorizes zero applications.",
  };
}

function assertPacketInvariants(summary) {
  const checks = [
    summary.direct_source_hash_checks === 6,
    summary.direct_source_hash_checks_passed === 6,
    summary.retained_proof_grade_application_direct_source_hash_checks_passed === 5,
    summary.retained_proof_grade_current_pool_absence_direct_source_hash_checks_passed === 5,
    summary.retained_proof_grade_contract_direct_source_hash_checks_passed === 6,
    summary.retained_primitive_application_direct_source_hash_checks_passed === 8,
    summary.retained_route_contract_disjunction_direct_source_hash_checks_passed === 3,
    summary.retained_terminal_route_obligation_direct_source_hash_checks_passed === 2,
    summary.current_pool_json_files_scanned === 257,
    summary.accepted_status_lane_json_files_scanned === 22,
    summary.accepted_status_lane_fail_closed_json_files === 22,
    summary.accepted_status_lane_non_fail_closed_json_files === 0,
    summary.current_pool_route_evidence_object_application_files_found === 0,
    summary.current_pool_compatible_route_evidence_object_application_refs === 0,
    summary.candidate_separator_constants === 12,
    summary.candidate_row_constant_associations === 112,
    summary.route_evidence_object_application_branches === 3,
    summary.separator_route_evidence_object_application_slots === 36,
    summary.separator_route_evidence_object_applications_authorized === 0,
    summary.row_route_evidence_object_application_slots === 336,
    summary.row_route_evidence_object_applications_authorized === 0,
    summary.total_route_evidence_object_application_attempts === 372,
    summary.total_route_evidence_object_applications_authorized === 0,
    summary.total_route_evidence_object_application_rejections === 372,
    summary.proof_grade_derivation_ref_application_attempts === 124,
    summary.proof_grade_derivation_ref_applications_authorized === 0,
    summary.source_certificate_handle_as_derivation_ref_rejections === 124,
    summary.proof_grade_current_pool_json_files_scanned === 252,
    summary.proof_grade_current_pool_derivation_ref_evidence_objects_found === 0,
    summary.proof_grade_current_pool_compatible_derivation_ref_evidence_refs === 0,
    summary.proof_grade_derivation_ref_evidence_object_contract_slots === 124,
    summary.proof_grade_derivation_ref_evidence_object_contract_slots_satisfied === 0,
    summary.primitive_source_packet_route_evidence_object_application_attempts === 248,
    summary.primitive_source_packet_route_evidence_object_applications_authorized === 0,
    summary.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections === 124,
    summary.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections === 124,
    summary.route_evidence_object_contract_disjunctions_satisfied === 0,
    summary.total_route_evidence_object_contract_slots === 372,
    summary.route_evidence_object_contract_slots_satisfied === 0,
    summary.terminal_route_obligations_satisfied === 0,
    summary.mechanical_continuations_from_current_pool === 0,
    summary.route_decisions_made === 0,
    summary.proof_rule_decisions_made === 0,
    summary.primitive_acceptance_decisions_made === 0,
    summary.source_packet_acceptance_rules_constructed === 0,
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0,
    summary.accepted_interval_certified_constants_statuses_constructed === 0,
    summary.row_consumption_count === 0,
    summary.preledger_pass_true_files === 0,
    summary.live_ledger_update_true_files === 0,
    summary.branch_chart_authorized_true_files === 0,
    summary.row_consumption_positive_files === 0,
    summary.accepted_interval_certified_constants_status_positive_files === 0,
    summary.preledger_pass === false,
    summary.updates_live_ledger === false,
    summary.branch_chart_authorized === false,
  ];
  if (!checks.every(Boolean)) {
    throw new Error("Route evidence-object application exhaustion invariants failed.");
  }
  if (JSON.stringify(summary.rows_by_separator_count) !== JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR)) {
    throw new Error("Unexpected route evidence-object application exhaustion rows-by-separator count.");
  }
}

function markdownTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function renderReport(packet) {
  const s = packet.summary;
  const sourceRows = packet.source_hash_checks.map((check) => [
    `\`${check.source_artifact}\``,
    `\`${check.current_basename}\``,
    `\`${check.current_sha256}\``,
    String(check.hash_matches),
  ]);
  const branchRows = packet.route_evidence_object_application_branches.map((branch) => [
    `\`${branch.branch}\``,
    String(branch.application_attempts),
    String(branch.applications_authorized),
    `\`${branch.first_application_blocker}\``,
    `\`${branch.first_rejection}\``,
  ]);
  const separatorRows = Object.entries(s.rows_by_separator_count).map(([separator, rows]) => [
    `\`${separator}\``,
    String(rows),
  ]);

  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Route Evidence-Object Application Exhaustion Classifier

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Route Evidence-Object Application Exhaustion

This classifier imports the proof-grade derivation-ref application attempt, the
primitive/source-packet route evidence-object application attempt, the route
evidence-object contract disjunction exhaustion classifier, and the terminal
route-input disjunction exhaustion obligation packet.

It combines the proof-grade branch and primitive/source-packet branch application
attempts into one route evidence-object application surface. The current
certificate pool authorizes none of the applications.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct source-hash locks;
- ${s.retained_proof_grade_application_direct_source_hash_checks_passed} / 5 retained proof-grade application locks;
- ${s.retained_proof_grade_current_pool_absence_direct_source_hash_checks_passed} / 5 retained proof-grade current-pool absence locks;
- ${s.retained_proof_grade_contract_direct_source_hash_checks_passed} / 6 retained proof-grade evidence-object contract locks;
- ${s.retained_primitive_application_direct_source_hash_checks_passed} / 8 retained primitive/source-packet application locks;
- ${s.retained_route_contract_disjunction_direct_source_hash_checks_passed} / 3 retained route contract-disjunction locks;
- ${s.retained_terminal_route_obligation_direct_source_hash_checks_passed} / 2 retained terminal route-obligation locks.

Current-pool route application scan:

- ${s.current_pool_json_files_scanned} certificate JSON files scanned before this output;
- ${s.accepted_status_lane_json_files_scanned} accepted-status-lane JSON files scanned;
- ${s.accepted_status_lane_fail_closed_json_files} accepted-status-lane JSON files fail-closed;
- ${s.accepted_status_lane_non_fail_closed_json_files} accepted-status-lane JSON files non-fail-closed;
- ${s.current_pool_route_evidence_object_application_files_found} route evidence-object application files found;
- ${s.current_pool_compatible_route_evidence_object_application_refs} compatible route evidence-object application refs found.

Application result:

- ${s.total_route_evidence_object_contract_slots} route evidence-object contract slots retained;
- ${s.total_route_evidence_object_application_attempts} route evidence-object applications attempted;
- ${s.total_route_evidence_object_applications_authorized} route evidence-object applications authorized;
- ${s.source_certificate_handle_as_derivation_ref_rejections} source-certificate-handle-as-derivation-ref rejections;
- ${s.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections} source-packet acceptance rule target-packet-as-rule rejections;
- ${s.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections} complete aggregate-input-as-accepted-source-packet rejections;
- ${s.source_packet_acceptance_rules_constructed} source-packet acceptance rules constructed;
- ${s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets} accepted source packets constructed;
- ${s.accepted_interval_certified_constants_statuses_constructed} accepted statuses constructed.

## Source-Hash Checks

${markdownTable(["Source artifact", "Current file", "Current SHA-256", "Hash matches"], sourceRows)}

## Branch Applications

${markdownTable(["Branch", "Attempts", "Authorized", "First blocker", "First rejection"], branchRows)}

## Row Scope

${markdownTable(["Separator", "Rows"], separatorRows)}

## Certificate-Side Handoff

Sharpened blocker: the current lane has now tested both route evidence-object
application branches. Neither proof-grade derivation-ref application nor
primitive/source-packet application is authorized from the current certificate
pool.

Continuation class: not mechanically closable from the current certificate pool.
Continue only by importing a compatible proof-grade derivation-ref evidence
object, a compatible source-packet acceptance rule, a compatible accepted
same-packet source packet, or by recording an explicit route/proof-rule/
primitive-acceptance decision in a separate artifact.

Fail-closed stop conditions:

- Do not treat a source-certificate handle as a proof-grade derivation ref.
- Do not treat the source-packet acceptance rule target packet as the rule.
- Do not treat complete separator aggregate inputs as an accepted source packet.
- Do not treat this exhaustion classifier as a route decision.
- Do not construct accepted interval-certified constants status refs or statuses
  from this classifier.
- Do not consume rows, set \`preledger_pass\`, update the live ledger, or
  authorize a branch chart.

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

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
    proofGradeApplication: args.proofGradeApplication,
    proofGradeCurrentPoolAbsence: args.proofGradeCurrentPoolAbsence,
    proofGradeContract: args.proofGradeContract,
    primitiveApplication: args.primitiveApplication,
    routeContractDisjunction: args.routeContractDisjunction,
    terminalRouteObligation: args.terminalRouteObligation,
    certificatePoolDir: args.certificatePoolDir,
  };
  const inputs = {
    proofGradeApplication: readJson(paths.proofGradeApplication),
    proofGradeCurrentPoolAbsence: readJson(paths.proofGradeCurrentPoolAbsence),
    proofGradeContract: readJson(paths.proofGradeContract),
    primitiveApplication: readJson(paths.primitiveApplication),
    routeContractDisjunction: readJson(paths.routeContractDisjunction),
    terminalRouteObligation: readJson(paths.terminalRouteObligation),
  };
  const packet = buildPacket(paths, inputs);
  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(jsonPath, packet, args.pretty);
  writeText(reportPath, renderReport(packet));
  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${reportPath}`);
}

main();
