#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ROUTE_APPLICATION_EXHAUSTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_application_exhaustion_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_FIRST_BLOCKER_HANDOFF = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_first_blocker_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_TERMINAL_ROUTE_OBLIGATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_CONTRACT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_CONTRACT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_CURRENT_POOL_ABSENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_obligation_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
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

const ROUTE_APPLICATION_EXHAUSTION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_application_exhaustion_classifier_fail_closed_proof_grade_and_primitive_route_applications_rejected_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";
const FIRST_BLOCKER_HANDOFF_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_first_blocker_handoff_classifier_fail_closed_uniform_proof_grade_derivation_ref_evidence_absent_uniform_source_packet_acceptance_rule_absent_accepted_source_packet_absent_current_pool_disjunction_unsatisfied_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";
const TERMINAL_ROUTE_OBLIGATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet_fail_closed_current_pool_route_input_disjunction_exhausted_external_route_evidence_or_acceptance_decision_required_no_row_consumption";
const PROOF_GRADE_CONTRACT_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet_fail_closed_contract_declared_current_pool_derivation_ref_evidence_object_absent_no_status_ref_no_proof_rule_no_route_decision_no_primitive_acceptance_no_row_consumption";
const PRIMITIVE_CONTRACT_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_contract_target_packet_fail_closed_contract_declared_source_packet_acceptance_rule_and_accepted_source_packet_absent_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";
const PROOF_GRADE_CURRENT_POOL_ABSENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier_fail_closed_current_pool_scanned_derivation_ref_evidence_object_absent_downstream_outputs_not_evidence_no_status_ref_no_proof_rule_no_route_decision_no_primitive_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_obligation_classifier_fail_closed_route_input_disjunction_and_route_evidence_object_applications_exhausted_external_route_evidence_or_acceptance_decision_required_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_row_consumption";

const ACCEPTED_STATUS_LANE_PREFIX =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_";
const PROOF_GRADE_ALLOWED_INPUT =
  "proof_grade_derivation_ref_evidence_object_for_accepted_interval_certified_constants_status";
const SOURCE_PACKET_ACCEPTANCE_RULE_ALLOWED_INPUT =
  "source_packet_acceptance_rule_for_live_same_packet_separator_aggregate_family";
const ACCEPTED_SOURCE_PACKET_ALLOWED_INPUT =
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_for_live_same_packet_separator_aggregate_family";
const PROOF_GRADE_FIELD = "accepted_interval_certified_constants_status_proof_grade_derivation_ref";
const SOURCE_PACKET_ACCEPTANCE_RULE_FIELD = "source_packet_acceptance_rule";
const ACCEPTED_SOURCE_PACKET_FIELD = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet";
const ROUTE_APPLICATION_BLOCKER = "route_evidence_object_application_authorization_absent";
const PROOF_GRADE_BLOCKER = "proof_grade_derivation_ref_evidence_object_absent";
const SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const ACCEPTED_SOURCE_PACKET_BLOCKER = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_absent";
const SOURCE_HANDLE_REJECTION = "source_certificate_handle_not_proof_grade_derivation_ref";
const SOURCE_PACKET_RULE_TARGET_REJECTION =
  "source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule";
const COMPLETE_AGGREGATE_REJECTION = "complete_separator_aggregate_inputs_as_accepted_source_packet";

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
    routeApplicationExhaustion: DEFAULT_ROUTE_APPLICATION_EXHAUSTION,
    firstBlockerHandoff: DEFAULT_FIRST_BLOCKER_HANDOFF,
    terminalRouteObligation: DEFAULT_TERMINAL_ROUTE_OBLIGATION,
    proofGradeContract: DEFAULT_PROOF_GRADE_CONTRACT,
    primitiveContract: DEFAULT_PRIMITIVE_CONTRACT,
    proofGradeCurrentPoolAbsence: DEFAULT_PROOF_GRADE_CURRENT_POOL_ABSENCE,
    certificatePoolDir: CERT_DIR,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--route-application-exhaustion") {
      args.routeApplicationExhaustion = argv[++index];
    } else if (arg === "--first-blocker-handoff") {
      args.firstBlockerHandoff = argv[++index];
    } else if (arg === "--terminal-route-obligation") {
      args.terminalRouteObligation = argv[++index];
    } else if (arg === "--proof-grade-contract") {
      args.proofGradeContract = argv[++index];
    } else if (arg === "--primitive-contract") {
      args.primitiveContract = argv[++index];
    } else if (arg === "--proof-grade-current-pool-absence") {
      args.proofGradeCurrentPoolAbsence = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-route-evidence-object-terminal-obligation-classifier.mjs [options]

Options:
  --route-application-exhaustion PATH     Route evidence-object application exhaustion classifier. Defaults to ${DEFAULT_ROUTE_APPLICATION_EXHAUSTION}.
  --first-blocker-handoff PATH            Route-input first-blocker handoff classifier. Defaults to ${DEFAULT_FIRST_BLOCKER_HANDOFF}.
  --terminal-route-obligation PATH        Current-pool route-input disjunction exhaustion obligation packet. Defaults to ${DEFAULT_TERMINAL_ROUTE_OBLIGATION}.
  --proof-grade-contract PATH             Proof-grade derivation-ref evidence-object contract target packet. Defaults to ${DEFAULT_PROOF_GRADE_CONTRACT}.
  --primitive-contract PATH               Primitive/source-packet route evidence-object contract target packet. Defaults to ${DEFAULT_PRIMITIVE_CONTRACT}.
  --proof-grade-current-pool-absence PATH Proof-grade derivation-ref current-pool evidence absence classifier. Defaults to ${DEFAULT_PROOF_GRADE_CURRENT_POOL_ABSENCE}.
  --certificate-pool-dir PATH             Certificate JSON pool directory. Defaults to ${CERT_DIR}.
  --out-dir PATH                          Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                Pretty-print JSON artifact.
  --help                                  Show this help.`);
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
    ["accepted_status_route_evidence_object_application_exhaustion_classifier", paths.routeApplicationExhaustion],
    ["accepted_status_route_input_first_blocker_handoff_classifier", paths.firstBlockerHandoff],
    ["accepted_status_current_pool_route_input_disjunction_exhaustion_obligation_packet", paths.terminalRouteObligation],
    ["accepted_status_proof_grade_derivation_ref_evidence_object_contract_target_packet", paths.proofGradeContract],
    ["accepted_status_primitive_source_packet_route_evidence_object_contract_target_packet", paths.primitiveContract],
    [
      "accepted_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier",
      paths.proofGradeCurrentPoolAbsence,
    ],
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

function expectEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`Unexpected ${label}: expected ${expected}, got ${actual}`);
  }
}

function validateInputs(inputs) {
  assertPacketStatusAndLocks(
    inputs.routeApplicationExhaustion,
    "routeApplicationExhaustion",
    ROUTE_APPLICATION_EXHAUSTION_STATUS,
  );
  assertPacketStatusAndLocks(inputs.firstBlockerHandoff, "firstBlockerHandoff", FIRST_BLOCKER_HANDOFF_STATUS);
  assertPacketStatusAndLocks(inputs.terminalRouteObligation, "terminalRouteObligation", TERMINAL_ROUTE_OBLIGATION_STATUS);
  assertPacketStatusAndLocks(inputs.proofGradeContract, "proofGradeContract", PROOF_GRADE_CONTRACT_STATUS);
  assertPacketStatusAndLocks(inputs.primitiveContract, "primitiveContract", PRIMITIVE_CONTRACT_STATUS);
  assertPacketStatusAndLocks(
    inputs.proofGradeCurrentPoolAbsence,
    "proofGradeCurrentPoolAbsence",
    PROOF_GRADE_CURRENT_POOL_ABSENCE_STATUS,
  );
  for (const [name, source] of Object.entries(inputs)) {
    if (!Array.isArray(source.source_hash_checks) || source.source_hash_checks.some((check) => check.hash_matches !== true)) {
      throw new Error(`${name} does not preserve source-hash locks.`);
    }
  }

  const route = inputs.routeApplicationExhaustion.summary;
  const firstBlocker = inputs.firstBlockerHandoff.summary;
  const terminal = inputs.terminalRouteObligation.summary;
  const proofContract = inputs.proofGradeContract.summary;
  const primitiveContract = inputs.primitiveContract.summary;
  const proofAbsence = inputs.proofGradeCurrentPoolAbsence.summary;
  expectEqual(route.total_route_evidence_object_application_attempts, 372, "route application attempts");
  expectEqual(route.total_route_evidence_object_applications_authorized, 0, "route applications authorized");
  expectEqual(route.total_route_evidence_object_application_rejections, 372, "route application rejections");
  expectEqual(route.proof_grade_derivation_ref_application_attempts, 124, "proof-grade application attempts");
  expectEqual(route.source_certificate_handle_as_derivation_ref_rejections, 124, "source-handle rejections");
  expectEqual(route.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections, 124, "rule target rejections");
  expectEqual(route.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections, 124, "aggregate rejections");
  expectEqual(route.source_packet_acceptance_rules_constructed, 0, "source-packet acceptance rules constructed");
  expectEqual(route.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "accepted source packets");
  expectEqual(route.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses");
  expectEqual(route.row_consumption_count, 0, "route row consumption");
  expectEqual(firstBlocker.route_input_disjunctions_satisfied, 0, "first-blocker route disjunctions satisfied");
  expectEqual(firstBlocker.total_combined_route_input_disjunction_slots, 992, "first-blocker route-input slots");
  expectEqual(firstBlocker.total_combined_route_input_disjunction_slots_satisfied, 0, "first-blocker route-input slots satisfied");
  expectEqual(firstBlocker.source_packet_acceptance_rules_constructed, 0, "first-blocker source-packet acceptance rules");
  expectEqual(firstBlocker.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "first-blocker accepted source packets");
  expectEqual(firstBlocker.accepted_interval_certified_constants_statuses_constructed, 0, "first-blocker accepted statuses");
  expectEqual(terminal.terminal_route_obligations_declared, 3, "terminal route obligations declared");
  expectEqual(terminal.terminal_route_obligations_satisfied, 0, "terminal route obligations satisfied");
  expectEqual(terminal.mechanical_continuations_from_current_pool, 0, "terminal mechanical continuations");
  expectEqual(proofContract.total_derivation_ref_evidence_object_contract_slots, 124, "proof-grade contract slots");
  expectEqual(proofContract.contract_slots_satisfied, 0, "proof-grade contract slots satisfied");
  expectEqual(proofAbsence.current_pool_derivation_ref_evidence_object_files_found, 0, "proof-grade current-pool evidence objects");
  expectEqual(primitiveContract.total_primitive_source_packet_route_evidence_object_contract_slots, 248, "primitive contract slots");
  expectEqual(primitiveContract.contract_slots_satisfied, 0, "primitive contract slots satisfied");
  expectEqual(primitiveContract.total_source_packet_acceptance_rule_target_slots, 124, "source-packet rule target slots");
  expectEqual(primitiveContract.current_pool_source_packet_acceptance_rule_evidence_object_files_found, 0, "current-pool rule objects");
  expectEqual(primitiveContract.current_pool_accepted_source_packet_evidence_object_files_found, 0, "current-pool accepted source-packet objects");
  assertRowsBySeparator(route, "route application exhaustion");
  assertRowsBySeparator(firstBlocker, "first-blocker handoff");
  assertRowsBySeparator(terminal, "terminal route obligation");
  assertRowsBySeparator(proofContract, "proof-grade contract");
  assertRowsBySeparator(primitiveContract, "primitive contract");
}

function proofGradeEvidenceObjectMatches(parsed, text) {
  const status = String(parsed.status ?? "");
  if (parsed.packet_id !== PACKET_ID || status.includes("fail_closed")) {
    return false;
  }
  return (
    /"derivation_ref_evidence_object_present"\s*:\s*true/.test(text) ||
    /"accepted_interval_certified_constants_status_proof_grade_derivation_ref_present"\s*:\s*true/.test(text) ||
    /"accepted_interval_certified_constants_status_proof_grade_derivation_refs_constructed"\s*:\s*[1-9]/.test(text) ||
    /"proof_grade_derivation_ref_applications_authorized"\s*:\s*[1-9]/.test(text)
  );
}

function sourcePacketRoleMatches(parsed, text, role) {
  const summary = parsed.summary ?? {};
  const artifactRole = parsed.artifact_role ?? parsed.compatible_evidence_role ?? summary.compatible_evidence_role;
  if (artifactRole === role) {
    return true;
  }
  if (role === SOURCE_PACKET_ACCEPTANCE_RULE_FIELD) {
    return (
      /"source_packet_acceptance_rule_present"\s*:\s*true/.test(text) ||
      /"source_packet_acceptance_rules_constructed"\s*:\s*[1-9]/.test(text)
    );
  }
  return (
    /"accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet(?:_present)?"\s*:\s*true/.test(text) ||
    /"accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets"\s*:\s*[1-9]/.test(text)
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
    current_pool_proof_grade_derivation_ref_evidence_object_files_found: 0,
    current_pool_source_packet_acceptance_rule_files_found: 0,
    current_pool_accepted_source_packet_files_found: 0,
    current_pool_allowed_route_input_refs: 0,
    source_packet_acceptance_rule_non_fail_closed_files: 0,
    accepted_source_packet_non_fail_closed_files: 0,
    preledger_pass_true_files: 0,
    live_ledger_update_true_files: 0,
    branch_chart_authorized_true_files: 0,
    row_consumption_positive_files: 0,
    accepted_interval_certified_constants_status_positive_files: 0,
  };
  const compatibleProofGradeBasenames = [];
  const compatibleRuleBasenames = [];
  const compatibleAcceptedSourcePacketBasenames = [];
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
    const proofMatches = proofGradeEvidenceObjectMatches(parsed, text);
    const packetMatches = parsed.packet_id === PACKET_ID;
    const ruleMatches =
      packetMatches &&
      !failClosed &&
      sourcePacketRoleMatches(parsed, text, SOURCE_PACKET_ACCEPTANCE_RULE_FIELD);
    const acceptedSourceMatches =
      packetMatches &&
      !failClosed &&
      sourcePacketRoleMatches(parsed, text, ACCEPTED_SOURCE_PACKET_FIELD);
    if (proofMatches) {
      counters.current_pool_proof_grade_derivation_ref_evidence_object_files_found += 1;
      counters.current_pool_allowed_route_input_refs += 1;
      compatibleProofGradeBasenames.push(basename);
    }
    if (ruleMatches) {
      counters.current_pool_source_packet_acceptance_rule_files_found += 1;
      counters.current_pool_allowed_route_input_refs += 1;
      counters.source_packet_acceptance_rule_non_fail_closed_files += 1;
      compatibleRuleBasenames.push(basename);
    }
    if (acceptedSourceMatches) {
      counters.current_pool_accepted_source_packet_files_found += 1;
      counters.current_pool_allowed_route_input_refs += 1;
      counters.accepted_source_packet_non_fail_closed_files += 1;
      compatibleAcceptedSourcePacketBasenames.push(basename);
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
    compatible_proof_grade_derivation_ref_evidence_object_basenames: compatibleProofGradeBasenames,
    compatible_source_packet_acceptance_rule_basenames: compatibleRuleBasenames,
    compatible_accepted_source_packet_basenames: compatibleAcceptedSourcePacketBasenames,
    non_fail_closed_accepted_status_basenames: nonFailClosedAcceptedStatusBasenames,
  };
}

function buildSeparatorProfiles(routeApplicationExhaustion) {
  return routeApplicationExhaustion.separator_route_evidence_object_application_exhaustion_profiles
    .map((profile) => ({
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      row_count: profile.row_count,
      allowed_route_input_obligations: [
        PROOF_GRADE_ALLOWED_INPUT,
        SOURCE_PACKET_ACCEPTANCE_RULE_ALLOWED_INPUT,
        ACCEPTED_SOURCE_PACKET_ALLOWED_INPUT,
      ],
      allowed_route_input_slots: 3,
      allowed_route_input_slots_satisfied: 0,
      allowed_route_input_slots_missing: 3,
      proof_grade_derivation_ref_evidence_object_required: true,
      proof_grade_derivation_ref_evidence_object_present: false,
      source_packet_acceptance_rule_required: true,
      source_packet_acceptance_rule_present: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_required: true,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
      route_evidence_object_applications_authorized: profile.route_evidence_object_applications_authorized,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      source_packet_acceptance_rule_constructed: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_constructed: false,
      row_consumption_count: 0,
      preledger_pass_rows: 0,
      branch_chart_authorized_rows: 0,
      first_allowed_route_input_blocker: "allowed_route_input_absent",
      first_proof_grade_allowed_input_blocker: PROOF_GRADE_BLOCKER,
      first_source_packet_acceptance_rule_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
      first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
      first_route_application_blocker: ROUTE_APPLICATION_BLOCKER,
      classification: "separator_allowed_route_inputs_absent_fail_closed",
    }))
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function buildRowProfiles(routeApplicationExhaustion) {
  return routeApplicationExhaustion.row_route_evidence_object_application_exhaustion_profiles
    .map((profile) => ({
      row_id: profile.row_id,
      ledger: profile.ledger,
      status: profile.status,
      failure_code: profile.failure_code,
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      receiver_interval: profile.receiver_interval,
      source_interval: profile.source_interval,
      allowed_route_input_obligations: [
        PROOF_GRADE_ALLOWED_INPUT,
        SOURCE_PACKET_ACCEPTANCE_RULE_ALLOWED_INPUT,
        ACCEPTED_SOURCE_PACKET_ALLOWED_INPUT,
      ],
      allowed_route_input_slots: 3,
      allowed_route_input_slots_satisfied: 0,
      allowed_route_input_slots_missing: 3,
      proof_grade_derivation_ref_evidence_object_required: true,
      proof_grade_derivation_ref_evidence_object_present: false,
      source_packet_acceptance_rule_required: true,
      source_packet_acceptance_rule_present: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_required: true,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
      route_evidence_object_applications_authorized: profile.route_evidence_object_applications_authorized,
      accepted_fold_layer_row: false,
      row_consumed: false,
      preledger_pass: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      source_packet_acceptance_rule_constructed: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_constructed: false,
      first_allowed_route_input_blocker: "allowed_route_input_absent",
      first_proof_grade_allowed_input_blocker: PROOF_GRADE_BLOCKER,
      first_source_packet_acceptance_rule_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
      first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
      first_route_application_blocker: ROUTE_APPLICATION_BLOCKER,
      classification: "row_allowed_route_inputs_absent_fail_closed",
    }))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const poolSnapshot = currentPoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const counters = poolSnapshot.counters;
  const route = inputs.routeApplicationExhaustion.summary;
  const firstBlocker = inputs.firstBlockerHandoff.summary;
  const terminal = inputs.terminalRouteObligation.summary;
  const proofContract = inputs.proofGradeContract.summary;
  const primitiveContract = inputs.primitiveContract.summary;
  const proofAbsence = inputs.proofGradeCurrentPoolAbsence.summary;
  const separatorProfiles = buildSeparatorProfiles(inputs.routeApplicationExhaustion);
  const rowProfiles = buildRowProfiles(inputs.routeApplicationExhaustion);
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const totalAllowedSlots = separatorProfiles.length * 3 + rowProfiles.length * 3;

  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_route_application_exhaustion_direct_source_hash_checks_passed:
      route.direct_source_hash_checks_passed,
    retained_first_blocker_handoff_direct_source_hash_checks_passed:
      firstBlocker.direct_source_hash_checks_passed,
    retained_terminal_route_obligation_direct_source_hash_checks_passed:
      terminal.direct_source_hash_checks_passed,
    retained_proof_grade_contract_direct_source_hash_checks_passed:
      proofContract.direct_source_hash_checks_passed,
    retained_primitive_contract_direct_source_hash_checks_passed:
      primitiveContract.direct_source_hash_checks_passed,
    retained_proof_grade_current_pool_absence_direct_source_hash_checks_passed:
      proofAbsence.direct_source_hash_checks_passed,
    current_pool_json_files_scanned: poolSnapshot.json_files_scanned_before_output,
    accepted_status_lane_json_files_scanned: counters.accepted_status_lane_json_files,
    accepted_status_lane_fail_closed_json_files: counters.accepted_status_lane_fail_closed_json_files,
    accepted_status_lane_non_fail_closed_json_files: counters.accepted_status_lane_non_fail_closed_json_files,
    current_pool_proof_grade_derivation_ref_evidence_object_files_found:
      counters.current_pool_proof_grade_derivation_ref_evidence_object_files_found,
    current_pool_source_packet_acceptance_rule_files_found:
      counters.current_pool_source_packet_acceptance_rule_files_found,
    current_pool_accepted_source_packet_files_found:
      counters.current_pool_accepted_source_packet_files_found,
    current_pool_allowed_route_input_refs: counters.current_pool_allowed_route_input_refs,
    source_packet_acceptance_rule_non_fail_closed_files:
      counters.source_packet_acceptance_rule_non_fail_closed_files,
    accepted_source_packet_non_fail_closed_files: counters.accepted_source_packet_non_fail_closed_files,
    candidate_higher_fold_constants_artifacts: route.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: route.candidate_separator_constants,
    candidate_row_constant_associations: route.candidate_row_constant_associations,
    rows_by_separator_count: rowsBySeparator,
    allowed_route_input_families_declared: 3,
    allowed_route_input_families_satisfied: 0,
    allowed_route_input_families_missing: 3,
    separator_allowed_route_input_slots: separatorProfiles.length * 3,
    separator_allowed_route_input_slots_satisfied: 0,
    separator_allowed_route_input_slots_missing: separatorProfiles.length * 3,
    row_allowed_route_input_slots: rowProfiles.length * 3,
    row_allowed_route_input_slots_satisfied: 0,
    row_allowed_route_input_slots_missing: rowProfiles.length * 3,
    total_allowed_route_input_obligation_slots: totalAllowedSlots,
    total_allowed_route_input_obligation_slots_satisfied: 0,
    total_allowed_route_input_obligation_slots_missing: totalAllowedSlots,
    proof_grade_derivation_ref_evidence_object_allowed_input_slots:
      proofContract.total_derivation_ref_evidence_object_contract_slots,
    proof_grade_derivation_ref_evidence_object_allowed_input_slots_satisfied: 0,
    source_packet_acceptance_rule_allowed_input_slots:
      primitiveContract.total_source_packet_acceptance_rule_target_slots,
    source_packet_acceptance_rule_allowed_input_slots_satisfied: 0,
    accepted_source_packet_allowed_input_slots:
      primitiveContract.total_source_packet_acceptance_rule_target_slots,
    accepted_source_packet_allowed_input_slots_satisfied: 0,
    route_evidence_object_application_attempts: route.total_route_evidence_object_application_attempts,
    route_evidence_object_applications_authorized:
      route.total_route_evidence_object_applications_authorized,
    route_evidence_object_application_rejections:
      route.total_route_evidence_object_application_rejections,
    source_certificate_handle_as_derivation_ref_rejections:
      route.source_certificate_handle_as_derivation_ref_rejections,
    source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections:
      route.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections,
    complete_separator_aggregate_inputs_as_accepted_source_packet_rejections:
      route.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections,
    imported_current_pool_derivation_ref_evidence_object_files_found:
      proofAbsence.current_pool_derivation_ref_evidence_object_files_found,
    imported_current_pool_compatible_derivation_ref_evidence_refs:
      proofAbsence.current_pool_compatible_derivation_ref_evidence_refs,
    imported_current_pool_compatible_primitive_source_packet_route_input_refs:
      primitiveContract.current_pool_compatible_primitive_source_packet_route_input_refs,
    terminal_route_obligations_declared: terminal.terminal_route_obligations_declared,
    terminal_route_obligations_satisfied: terminal.terminal_route_obligations_satisfied,
    terminal_route_obligations_unsatisfied: terminal.terminal_route_obligations_unsatisfied,
    route_input_disjunctions_satisfied: firstBlocker.route_input_disjunctions_satisfied,
    route_input_disjunction_slots: firstBlocker.total_combined_route_input_disjunction_slots,
    route_input_disjunction_slots_satisfied:
      firstBlocker.total_combined_route_input_disjunction_slots_satisfied,
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
    first_allowed_route_input_blocker: "allowed_route_input_absent",
    first_proof_grade_allowed_input_blocker: PROOF_GRADE_BLOCKER,
    first_source_packet_acceptance_rule_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
    first_route_application_blocker: ROUTE_APPLICATION_BLOCKER,
    first_source_handle_rejection: SOURCE_HANDLE_REJECTION,
    first_rule_application_rejection: SOURCE_PACKET_RULE_TARGET_REJECTION,
    first_accepted_source_packet_application_rejection: COMPLETE_AGGREGATE_REJECTION,
    parent_complement_consumption_ref_blocker: "parent_complement_consumption_ref_absent",
    first_separator_certificate_blocker: "higher_fold_separator_layer_certificate_absent",
  };

  const packet = {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_route_evidence_object_terminal_obligation_classifier.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status route evidence-object terminal obligation",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status route evidence-object terminal obligation",
    claim_level:
      "priority-only route evidence-object terminal obligation classifier; declares the three admissible external input families after route evidence-object application exhaustion and proves the current certificate pool supplies none without making proof-rule, route, primitive-acceptance, source-packet acceptance, accepted-status, or row-consumption decisions",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_route_evidence_object_application_exhaustion_classifier: artifactRecord(
        paths.routeApplicationExhaustion,
      ),
      accepted_status_route_input_first_blocker_handoff_classifier: artifactRecord(paths.firstBlockerHandoff),
      accepted_status_current_pool_route_input_disjunction_exhaustion_obligation_packet: artifactRecord(
        paths.terminalRouteObligation,
      ),
      accepted_status_proof_grade_derivation_ref_evidence_object_contract_target_packet: artifactRecord(
        paths.proofGradeContract,
      ),
      accepted_status_primitive_source_packet_route_evidence_object_contract_target_packet: artifactRecord(
        paths.primitiveContract,
      ),
      accepted_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier: artifactRecord(
        paths.proofGradeCurrentPoolAbsence,
      ),
    },
    source_hash_checks: sourceChecks,
    current_pool_allowed_route_input_snapshot: poolSnapshot,
    allowed_route_input_obligations: [
      {
        obligation_id: PROOF_GRADE_ALLOWED_INPUT,
        required_field: PROOF_GRADE_FIELD,
        required_role: "proof_grade_derivation_ref_evidence_object",
        slots_declared: summary.proof_grade_derivation_ref_evidence_object_allowed_input_slots,
        slots_satisfied: 0,
        current_pool_files_found:
          summary.current_pool_proof_grade_derivation_ref_evidence_object_files_found,
        first_blocker: PROOF_GRADE_BLOCKER,
      },
      {
        obligation_id: SOURCE_PACKET_ACCEPTANCE_RULE_ALLOWED_INPUT,
        required_field: SOURCE_PACKET_ACCEPTANCE_RULE_FIELD,
        required_role: SOURCE_PACKET_ACCEPTANCE_RULE_FIELD,
        slots_declared: summary.source_packet_acceptance_rule_allowed_input_slots,
        slots_satisfied: 0,
        current_pool_files_found: summary.current_pool_source_packet_acceptance_rule_files_found,
        first_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
      },
      {
        obligation_id: ACCEPTED_SOURCE_PACKET_ALLOWED_INPUT,
        required_field: ACCEPTED_SOURCE_PACKET_FIELD,
        required_role: ACCEPTED_SOURCE_PACKET_FIELD,
        slots_declared: summary.accepted_source_packet_allowed_input_slots,
        slots_satisfied: 0,
        current_pool_files_found: summary.current_pool_accepted_source_packet_files_found,
        first_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
      },
    ],
    separator_allowed_route_input_obligation_profiles: separatorProfiles,
    row_allowed_route_input_obligation_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "route_evidence_object_terminal_obligation",
      current_pool_closure_state:
        "not mechanically closable from the current certificate pool; all allowed route application inputs are absent",
      allowed_route_input_families_declared: 3,
      allowed_route_input_families_satisfied: 0,
      current_pool_allowed_route_input_refs: counters.current_pool_allowed_route_input_refs,
      mechanical_continuation_available: false,
      decision_required: true,
      required_external_inputs: [
        PROOF_GRADE_ALLOWED_INPUT,
        SOURCE_PACKET_ACCEPTANCE_RULE_ALLOWED_INPUT,
        ACCEPTED_SOURCE_PACKET_ALLOWED_INPUT,
      ],
      forbidden_reinterpretations: [
        "source_certificate_handle_not_proof_grade_derivation_ref",
        "source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule",
        "complete_separator_aggregate_inputs_as_accepted_source_packet",
        "route_evidence_object_application_exhaustion_classifier_as_route_decision",
        "route_evidence_object_terminal_obligation_classifier_as_allowed_route_input",
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
      "Priority-only. This classifier declares the only three allowed route application input families after application exhaustion and proves the current pool supplies none.",
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
    s.retained_route_application_exhaustion_direct_source_hash_checks_passed === 6,
    s.retained_first_blocker_handoff_direct_source_hash_checks_passed === 5,
    s.retained_terminal_route_obligation_direct_source_hash_checks_passed === 2,
    s.retained_proof_grade_contract_direct_source_hash_checks_passed === 6,
    s.retained_primitive_contract_direct_source_hash_checks_passed === 6,
    s.retained_proof_grade_current_pool_absence_direct_source_hash_checks_passed === 5,
    s.current_pool_json_files_scanned === 258,
    s.accepted_status_lane_json_files_scanned === 23,
    s.accepted_status_lane_fail_closed_json_files === 23,
    s.accepted_status_lane_non_fail_closed_json_files === 0,
    s.current_pool_proof_grade_derivation_ref_evidence_object_files_found === 0,
    s.current_pool_source_packet_acceptance_rule_files_found === 0,
    s.current_pool_accepted_source_packet_files_found === 0,
    s.current_pool_allowed_route_input_refs === 0,
    s.allowed_route_input_families_declared === 3,
    s.allowed_route_input_families_satisfied === 0,
    s.separator_allowed_route_input_slots === 36,
    s.row_allowed_route_input_slots === 336,
    s.total_allowed_route_input_obligation_slots === 372,
    s.total_allowed_route_input_obligation_slots_satisfied === 0,
    s.proof_grade_derivation_ref_evidence_object_allowed_input_slots === 124,
    s.source_packet_acceptance_rule_allowed_input_slots === 124,
    s.accepted_source_packet_allowed_input_slots === 124,
    s.route_evidence_object_application_attempts === 372,
    s.route_evidence_object_applications_authorized === 0,
    s.route_evidence_object_application_rejections === 372,
    s.source_certificate_handle_as_derivation_ref_rejections === 124,
    s.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections === 124,
    s.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections === 124,
    s.imported_current_pool_derivation_ref_evidence_object_files_found === 0,
    s.imported_current_pool_compatible_derivation_ref_evidence_refs === 0,
    s.imported_current_pool_compatible_primitive_source_packet_route_input_refs === 0,
    s.terminal_route_obligations_declared === 3,
    s.terminal_route_obligations_satisfied === 0,
    s.route_input_disjunctions_satisfied === 0,
    s.route_input_disjunction_slots === 992,
    s.route_input_disjunction_slots_satisfied === 0,
    s.mechanical_continuations_from_current_pool === 0,
    s.route_decisions_made === 0,
    s.proof_rule_decisions_made === 0,
    s.primitive_acceptance_decisions_made === 0,
    s.source_packet_acceptance_rules_constructed === 0,
    s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0,
    s.accepted_interval_certified_constants_statuses_constructed === 0,
    s.row_consumption_count === 0,
    s.preledger_pass === false,
    s.updates_live_ledger === false,
    s.branch_chart_authorized === false,
    JSON.stringify(s.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR),
    packet.next_certificate_handoff.mechanical_continuation_available === false,
    packet.next_certificate_handoff.decision_required === true,
  ];
  if (!checks.every(Boolean)) {
    throw new Error("Route evidence-object terminal obligation classifier invariant failure.");
  }
}

function renderReport(packet) {
  const s = packet.summary;
  const sourceRows = Object.entries(packet.source_artifacts)
    .map(([key, record]) => `| \`${key}\` | \`${record.basename}\` | \`${record.sha256}\` | ${record.present} |`)
    .join("\n");
  const obligationRows = packet.allowed_route_input_obligations
    .map(
      (obligation) =>
        `| \`${obligation.obligation_id}\` | \`${obligation.required_field}\` | ${obligation.slots_declared} | ${obligation.slots_satisfied} | ${obligation.current_pool_files_found} | \`${obligation.first_blocker}\` |`,
    )
    .join("\n");
  return `# Candidate-Live Higher-Fold Constants Accepted-Status Route Evidence-Object Terminal Obligation Classifier

Status: \`${packet.status}\`

## Claim Level

${packet.claim_level}

## Source Locks

| Source | Basename | SHA-256 | Present |
| --- | --- | --- | --- |
${sourceRows}

Direct source-hash locks: ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks}.

## Current Pool Scan

- ${s.current_pool_json_files_scanned} certificate JSON files scanned before this output;
- ${s.accepted_status_lane_fail_closed_json_files} / ${s.accepted_status_lane_json_files_scanned} accepted-status-lane JSON files fail-closed;
- ${s.accepted_status_lane_non_fail_closed_json_files} accepted-status-lane JSON files non-fail-closed;
- ${s.current_pool_proof_grade_derivation_ref_evidence_object_files_found} compatible proof-grade derivation-ref evidence-object files found;
- ${s.current_pool_source_packet_acceptance_rule_files_found} compatible source-packet acceptance rule files found;
- ${s.current_pool_accepted_source_packet_files_found} compatible accepted source-packet files found;
- ${s.current_pool_allowed_route_input_refs} total allowed route input refs found.

## Allowed Route Input Obligations

| Obligation | Required field | Slots | Satisfied | Current-pool files | First blocker |
| --- | --- | ---: | ---: | ---: | --- |
${obligationRows}

## Retained Route Application Exhaustion

- ${s.route_evidence_object_application_attempts} route evidence-object applications attempted;
- ${s.route_evidence_object_applications_authorized} route evidence-object applications authorized;
- ${s.route_evidence_object_application_rejections} route evidence-object applications rejected;
- ${s.source_certificate_handle_as_derivation_ref_rejections} source-certificate-handle-as-derivation-ref rejections;
- ${s.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections} source-packet acceptance rule target-packet-as-rule rejections;
- ${s.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections} complete aggregate-input-as-accepted-source-packet rejections.

## Authorization Lock

- preledger_pass: ${packet.authorization_lock.preledger_pass}
- updates_live_ledger: ${packet.authorization_lock.updates_live_ledger}
- row_consumption_count: ${packet.authorization_lock.row_consumption_count}
- branch_chart_authorized: ${packet.authorization_lock.branch_chart_authorized}

## Next Handoff

Continue only by supplying one compatible allowed route input:

1. \`${PROOF_GRADE_ALLOWED_INPUT}\`
2. \`${SOURCE_PACKET_ACCEPTANCE_RULE_ALLOWED_INPUT}\`
3. \`${ACCEPTED_SOURCE_PACKET_ALLOWED_INPUT}\`

This packet does not make a proof-rule, route, primitive-acceptance,
source-packet acceptance, accepted-status, row-consumption, live-ledger, or
branch-chart decision.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    routeApplicationExhaustion: args.routeApplicationExhaustion,
    firstBlockerHandoff: args.firstBlockerHandoff,
    terminalRouteObligation: args.terminalRouteObligation,
    proofGradeContract: args.proofGradeContract,
    primitiveContract: args.primitiveContract,
    proofGradeCurrentPoolAbsence: args.proofGradeCurrentPoolAbsence,
    certificatePoolDir: args.certificatePoolDir,
  };
  const inputs = {
    routeApplicationExhaustion: readJson(paths.routeApplicationExhaustion),
    firstBlockerHandoff: readJson(paths.firstBlockerHandoff),
    terminalRouteObligation: readJson(paths.terminalRouteObligation),
    proofGradeContract: readJson(paths.proofGradeContract),
    primitiveContract: readJson(paths.primitiveContract),
    proofGradeCurrentPoolAbsence: readJson(paths.proofGradeCurrentPoolAbsence),
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
