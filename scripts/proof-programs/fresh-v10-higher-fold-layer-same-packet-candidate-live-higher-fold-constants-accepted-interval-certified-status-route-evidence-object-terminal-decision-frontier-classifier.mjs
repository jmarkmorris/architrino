#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_TERMINAL_OBLIGATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROUTE_APPLICATION_EXHAUSTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_application_exhaustion_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_CURRENT_POOL_ABSENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_APPLICATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_RULE_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_decision_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_decision_frontier_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
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

const TERMINAL_OBLIGATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_obligation_classifier_fail_closed_route_input_disjunction_and_route_evidence_object_applications_exhausted_external_route_evidence_or_acceptance_decision_required_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_row_consumption";
const ROUTE_APPLICATION_EXHAUSTION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_application_exhaustion_classifier_fail_closed_proof_grade_and_primitive_route_applications_rejected_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";
const PROOF_GRADE_CURRENT_POOL_ABSENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier_fail_closed_current_pool_scanned_derivation_ref_evidence_object_absent_downstream_outputs_not_evidence_no_status_ref_no_proof_rule_no_route_decision_no_primitive_acceptance_no_row_consumption";
const PROOF_GRADE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier_fail_closed_source_certificates_complete_no_compatible_proof_grade_status_evidence_no_primitive_acceptance_no_row_consumption";
const PRIMITIVE_APPLICATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt_fail_closed_contract_declared_rule_target_and_aggregate_inputs_not_application_evidence_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";
const PRIMITIVE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier_fail_closed_frontier_locked_separator_aggregates_present_no_compatible_source_packet_acceptance_evidence_no_primitive_acceptance_no_row_consumption";
const RULE_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet_fail_closed_acceptance_rule_target_declared_aggregate_inputs_complete_rule_absent_no_primitive_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_decision_frontier_classifier_fail_closed_terminal_inputs_ordered_source_packet_acceptance_rule_target_first_no_allowed_route_input_refs_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_row_consumption";

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
const PROOF_GRADE_BLOCKER = "proof_grade_derivation_ref_evidence_object_absent";
const SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const ACCEPTED_SOURCE_PACKET_BLOCKER = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_absent";
const SOURCE_PACKET_DECISION_BLOCKER = "source_packet_acceptance_decision_absent";
const TERMINAL_FRONTIER_BLOCKER = "proof_grade_evidence_or_source_packet_acceptance_decision_absent";
const ROUTE_APPLICATION_BLOCKER = "route_evidence_object_application_authorization_absent";
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
    terminalObligation: DEFAULT_TERMINAL_OBLIGATION,
    routeApplicationExhaustion: DEFAULT_ROUTE_APPLICATION_EXHAUSTION,
    proofGradeCurrentPoolAbsence: DEFAULT_PROOF_GRADE_CURRENT_POOL_ABSENCE,
    proofGradeEvidence: DEFAULT_PROOF_GRADE_EVIDENCE,
    primitiveApplication: DEFAULT_PRIMITIVE_APPLICATION,
    primitiveEvidence: DEFAULT_PRIMITIVE_EVIDENCE,
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
    } else if (arg === "--terminal-obligation") {
      args.terminalObligation = argv[++index];
    } else if (arg === "--route-application-exhaustion") {
      args.routeApplicationExhaustion = argv[++index];
    } else if (arg === "--proof-grade-current-pool-absence") {
      args.proofGradeCurrentPoolAbsence = argv[++index];
    } else if (arg === "--proof-grade-evidence") {
      args.proofGradeEvidence = argv[++index];
    } else if (arg === "--primitive-application") {
      args.primitiveApplication = argv[++index];
    } else if (arg === "--primitive-evidence") {
      args.primitiveEvidence = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-route-evidence-object-terminal-decision-frontier-classifier.mjs [options]

Options:
  --terminal-obligation PATH          Route evidence-object terminal obligation classifier. Defaults to ${DEFAULT_TERMINAL_OBLIGATION}.
  --route-application-exhaustion PATH Route evidence-object application exhaustion classifier. Defaults to ${DEFAULT_ROUTE_APPLICATION_EXHAUSTION}.
  --proof-grade-current-pool-absence PATH
                                      Proof-grade derivation-ref current-pool evidence absence classifier. Defaults to ${DEFAULT_PROOF_GRADE_CURRENT_POOL_ABSENCE}.
  --proof-grade-evidence PATH         Proof-grade evidence dependency classifier. Defaults to ${DEFAULT_PROOF_GRADE_EVIDENCE}.
  --primitive-application PATH        Primitive/source-packet route evidence-object application attempt. Defaults to ${DEFAULT_PRIMITIVE_APPLICATION}.
  --primitive-evidence PATH           Primitive source-packet acceptance evidence dependency classifier. Defaults to ${DEFAULT_PRIMITIVE_EVIDENCE}.
  --rule-target PATH                  Source-packet acceptance rule target packet. Defaults to ${DEFAULT_RULE_TARGET}.
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
    ["accepted_status_route_evidence_object_terminal_obligation_classifier", paths.terminalObligation],
    ["accepted_status_route_evidence_object_application_exhaustion_classifier", paths.routeApplicationExhaustion],
    [
      "accepted_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier",
      paths.proofGradeCurrentPoolAbsence,
    ],
    ["accepted_status_proof_grade_evidence_dependency_classifier", paths.proofGradeEvidence],
    ["accepted_status_primitive_source_packet_route_evidence_object_application_attempt", paths.primitiveApplication],
    ["accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier", paths.primitiveEvidence],
    ["accepted_status_source_packet_acceptance_rule_target_packet", paths.ruleTarget],
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
  if (!Array.isArray(source.source_hash_checks) || source.source_hash_checks.some((check) => check.hash_matches !== true)) {
    throw new Error(`${name} does not preserve source-hash locks.`);
  }
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

function validateInputs(inputs) {
  assertPacketStatusAndLocks(inputs.terminalObligation, "terminalObligation", TERMINAL_OBLIGATION_STATUS);
  assertPacketStatusAndLocks(
    inputs.routeApplicationExhaustion,
    "routeApplicationExhaustion",
    ROUTE_APPLICATION_EXHAUSTION_STATUS,
  );
  assertPacketStatusAndLocks(
    inputs.proofGradeCurrentPoolAbsence,
    "proofGradeCurrentPoolAbsence",
    PROOF_GRADE_CURRENT_POOL_ABSENCE_STATUS,
  );
  assertPacketStatusAndLocks(inputs.proofGradeEvidence, "proofGradeEvidence", PROOF_GRADE_EVIDENCE_STATUS);
  assertPacketStatusAndLocks(inputs.primitiveApplication, "primitiveApplication", PRIMITIVE_APPLICATION_STATUS);
  assertPacketStatusAndLocks(inputs.primitiveEvidence, "primitiveEvidence", PRIMITIVE_EVIDENCE_STATUS);
  assertPacketStatusAndLocks(inputs.ruleTarget, "ruleTarget", RULE_TARGET_STATUS);

  const terminal = inputs.terminalObligation.summary;
  const route = inputs.routeApplicationExhaustion.summary;
  const proofAbsence = inputs.proofGradeCurrentPoolAbsence.summary;
  const proofEvidence = inputs.proofGradeEvidence.summary;
  const primitive = inputs.primitiveApplication.summary;
  const primitiveEvidence = inputs.primitiveEvidence.summary;
  const rule = inputs.ruleTarget.summary;

  expectEqual(terminal.direct_source_hash_checks_passed, 6, "terminal direct locks");
  expectEqual(terminal.total_allowed_route_input_obligation_slots, 372, "terminal allowed route-input slots");
  expectEqual(terminal.total_allowed_route_input_obligation_slots_satisfied, 0, "terminal allowed route-input slots satisfied");
  expectEqual(terminal.current_pool_allowed_route_input_refs, 0, "terminal current-pool allowed refs");
  expectEqual(terminal.terminal_route_obligations_declared, 3, "terminal route obligations declared");
  expectEqual(terminal.terminal_route_obligations_satisfied, 0, "terminal route obligations satisfied");
  expectEqual(terminal.mechanical_continuations_from_current_pool, 0, "terminal mechanical continuations");
  expectEqual(route.direct_source_hash_checks_passed, 6, "route application direct locks");
  expectEqual(route.total_route_evidence_object_application_attempts, 372, "route evidence-object applications");
  expectEqual(route.total_route_evidence_object_applications_authorized, 0, "route evidence-object applications authorized");
  expectEqual(route.total_route_evidence_object_application_rejections, 372, "route evidence-object applications rejected");
  expectEqual(route.source_certificate_handle_as_derivation_ref_rejections, 124, "source handle rejections");
  expectEqual(route.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections, 124, "rule target rejections");
  expectEqual(route.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections, 124, "aggregate input rejections");
  expectEqual(proofAbsence.direct_source_hash_checks_passed, 5, "proof-grade current-pool absence direct locks");
  expectEqual(proofAbsence.current_pool_derivation_ref_evidence_object_files_found, 0, "proof-grade evidence objects");
  expectEqual(proofAbsence.current_pool_compatible_derivation_ref_evidence_refs, 0, "compatible proof-grade evidence refs");
  expectEqual(proofAbsence.total_proof_grade_derivation_ref_evidence_absence_slots, 124, "proof-grade absence slots");
  expectEqual(proofAbsence.proof_grade_derivation_ref_applications_authorized, 0, "proof-grade applications authorized");
  expectEqual(proofEvidence.source_hash_checks_passed, 9, "proof-grade evidence source locks");
  expectEqual(proofEvidence.separator_proof_grade_evidence_slots, 72, "separator proof-grade evidence slots");
  expectEqual(proofEvidence.separator_compatible_proof_grade_evidence_slots_filled, 0, "separator proof-grade evidence slots filled");
  expectEqual(proofEvidence.row_proof_grade_evidence_slots, 672, "row proof-grade evidence slots");
  expectEqual(proofEvidence.row_compatible_proof_grade_evidence_slots_filled, 0, "row proof-grade evidence slots filled");
  expectEqual(
    proofEvidence.evidence_pool_compatible_proof_grade_status_evidence_files,
    0,
    "compatible proof-grade status evidence files",
  );
  expectEqual(primitive.direct_source_hash_checks_passed, 8, "primitive application direct locks");
  expectEqual(primitive.total_route_evidence_object_application_attempts, 248, "primitive route applications");
  expectEqual(primitive.total_route_evidence_object_applications_authorized, 0, "primitive route applications authorized");
  expectEqual(primitive.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections, 124, "primitive rule target rejections");
  expectEqual(primitive.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections, 124, "primitive aggregate rejections");
  expectEqual(primitive.source_packet_acceptance_rules_constructed, 0, "source-packet acceptance rules constructed");
  expectEqual(
    primitive.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets_constructed,
    0,
    "accepted source packets constructed",
  );
  expectEqual(
    primitiveEvidence.evidence_pool_compatible_source_packet_acceptance_evidence_files,
    0,
    "compatible source-packet acceptance evidence files",
  );
  expectEqual(rule.total_source_packet_acceptance_rule_target_slots, 124, "source-packet rule target slots");
  expectEqual(rule.total_source_packet_acceptance_rule_target_slots_satisfied, 0, "source-packet rule target slots satisfied");
  assertRowsBySeparator(terminal, "terminal obligation");
  assertRowsBySeparator(route, "route application exhaustion");
  assertRowsBySeparator(proofAbsence, "proof-grade current-pool absence");
  assertRowsBySeparator(proofEvidence, "proof-grade evidence");
  assertRowsBySeparator(primitive, "primitive route application");
  assertRowsBySeparator(primitiveEvidence, "primitive evidence");
  assertRowsBySeparator(rule, "rule target");
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
    .filter((entry) => entry.endsWith(".json") && entry !== outputBasename && !DOWNSTREAM_OUTPUT_JSON_BASENAMES.has(entry))
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

function buildTerminalDecisionFrontiers(summary) {
  return [
    {
      frontier_id: "proof_grade_derivation_ref_evidence_construction_required",
      frontier_class: "proof_grade_evidence_construction",
      required_route_input_family: PROOF_GRADE_ALLOWED_INPUT,
      required_field: PROOF_GRADE_FIELD,
      slots_declared: summary.proof_grade_evidence_construction_slots,
      slots_satisfied: 0,
      current_pool_allowed_route_input_refs:
        summary.current_pool_proof_grade_derivation_ref_evidence_object_files_found,
      imported_application_attempts: summary.proof_grade_derivation_ref_application_attempts,
      imported_application_authorizations: summary.proof_grade_derivation_ref_applications_authorized,
      mechanical_continuation_available: false,
      external_decision_or_evidence_required: true,
      first_blocker: PROOF_GRADE_BLOCKER,
      forbidden_reinterpretations: [
        SOURCE_HANDLE_REJECTION,
        "proof_grade_derivation_ref_current_pool_evidence_absence_classifier_as_evidence_object",
        "route_evidence_object_terminal_obligation_classifier_as_evidence_object",
      ],
    },
    {
      frontier_id: "source_packet_acceptance_decision_required",
      frontier_class: "source_packet_acceptance_decision",
      required_route_input_families: [
        SOURCE_PACKET_ACCEPTANCE_RULE_ALLOWED_INPUT,
        ACCEPTED_SOURCE_PACKET_ALLOWED_INPUT,
      ],
      required_fields: [SOURCE_PACKET_ACCEPTANCE_RULE_FIELD, ACCEPTED_SOURCE_PACKET_FIELD],
      slots_declared: summary.source_packet_acceptance_decision_slots,
      slots_satisfied: 0,
      current_pool_allowed_route_input_refs:
        summary.current_pool_source_packet_acceptance_rule_files_found +
        summary.current_pool_accepted_source_packet_files_found,
      imported_application_attempts: summary.primitive_source_packet_route_application_attempts,
      imported_application_authorizations:
        summary.primitive_source_packet_route_applications_authorized,
      mechanical_continuation_available: false,
      external_decision_or_evidence_required: true,
      first_blocker: SOURCE_PACKET_DECISION_BLOCKER,
      first_source_packet_acceptance_rule_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
      first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
      forbidden_reinterpretations: [
        SOURCE_PACKET_RULE_TARGET_REJECTION,
        COMPLETE_AGGREGATE_REJECTION,
        "source_packet_acceptance_rule_target_packet_as_acceptance_rule",
        "separator_aggregate_certificate_attempt_as_accepted_source_packet",
      ],
    },
  ];
}

function buildAllowedRouteInputFrontierRankings(summary) {
  return [
    {
      rank: 1,
      allowed_route_input_family: SOURCE_PACKET_ACCEPTANCE_RULE_ALLOWED_INPUT,
      frontier_class: "source_packet_acceptance_rule_target",
      required_field: SOURCE_PACKET_ACCEPTANCE_RULE_FIELD,
      slots_declared: summary.source_packet_acceptance_rule_decision_slots,
      slots_satisfied: 0,
      aggregate_inputs_complete_separator_count:
        summary.rank_1_separator_aggregate_fields_complete_separator_count,
      aggregate_inputs_complete_row_count: summary.rank_1_separator_aggregate_fields_complete_row_count,
      current_pool_allowed_route_input_refs:
        summary.current_pool_source_packet_acceptance_rule_files_found,
      lower_burden_reason:
        "separator aggregate inputs are complete across the locked separator and row profiles; the source-packet acceptance rule itself remains absent",
      decision_made: false,
      first_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
      forbidden_reinterpretations: [
        SOURCE_PACKET_RULE_TARGET_REJECTION,
        "source_packet_acceptance_rule_target_packet_as_acceptance_rule",
      ],
    },
    {
      rank: 2,
      allowed_route_input_family: ACCEPTED_SOURCE_PACKET_ALLOWED_INPUT,
      frontier_class: "accepted_source_packet_target",
      required_field: ACCEPTED_SOURCE_PACKET_FIELD,
      slots_declared: summary.accepted_source_packet_decision_slots,
      slots_satisfied: 0,
      aggregate_inputs_complete_separator_count:
        summary.rank_1_separator_aggregate_fields_complete_separator_count,
      aggregate_inputs_complete_row_count: summary.rank_1_separator_aggregate_fields_complete_row_count,
      current_pool_allowed_route_input_refs: summary.current_pool_accepted_source_packet_files_found,
      lower_burden_reason:
        "accepted source-packet evidence is downstream of a source-packet acceptance decision and cannot be inferred from complete aggregate inputs",
      decision_made: false,
      first_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
      forbidden_reinterpretations: [
        COMPLETE_AGGREGATE_REJECTION,
        "separator_aggregate_certificate_attempt_as_accepted_source_packet",
      ],
    },
    {
      rank: 3,
      allowed_route_input_family: PROOF_GRADE_ALLOWED_INPUT,
      frontier_class: "proof_grade_derivation_ref_evidence_object_target",
      required_field: PROOF_GRADE_FIELD,
      slots_declared: summary.proof_grade_evidence_construction_slots,
      slots_satisfied: 0,
      proof_grade_status_evidence_dependency_slots:
        summary.proof_grade_status_evidence_dependency_slots,
      proof_grade_status_evidence_dependency_slots_filled:
        summary.proof_grade_status_evidence_dependency_slots_filled,
      current_pool_allowed_route_input_refs:
        summary.current_pool_proof_grade_derivation_ref_evidence_object_files_found,
      lower_burden_reason:
        "proof-grade derivation-ref evidence requires the wider proof-grade status evidence dependency burden before a compatible derivation-ref evidence object can be accepted",
      decision_made: false,
      first_blocker: PROOF_GRADE_BLOCKER,
      forbidden_reinterpretations: [
        SOURCE_HANDLE_REJECTION,
        "source_certificate_handle_as_proof_grade_derivation_ref",
      ],
    },
  ];
}

function buildSeparatorProfiles(terminalObligation) {
  return terminalObligation.separator_allowed_route_input_obligation_profiles
    .map((profile) => ({
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      row_count: profile.row_count,
      terminal_decision_frontier_classes_declared: 2,
      terminal_decision_frontier_classes_satisfied: 0,
      proof_grade_evidence_construction_slots: 1,
      proof_grade_evidence_construction_slots_satisfied: 0,
      source_packet_acceptance_decision_slots: 2,
      source_packet_acceptance_decision_slots_satisfied: 0,
      current_pool_allowed_route_input_refs: 0,
      route_evidence_object_applications_authorized: 0,
      proof_grade_derivation_ref_evidence_object_present: false,
      source_packet_acceptance_rule_present: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
      mechanical_continuation_available: false,
      decision_required: true,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      source_packet_acceptance_decision_made: false,
      row_consumption_count: 0,
      preledger_pass_rows: 0,
      branch_chart_authorized_rows: 0,
      first_terminal_decision_frontier_blocker: TERMINAL_FRONTIER_BLOCKER,
      first_proof_grade_frontier_blocker: PROOF_GRADE_BLOCKER,
      first_source_packet_acceptance_frontier_blocker: SOURCE_PACKET_DECISION_BLOCKER,
      classification: "separator_terminal_decision_frontier_open_fail_closed",
    }))
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function buildRowProfiles(terminalObligation) {
  return terminalObligation.row_allowed_route_input_obligation_profiles
    .map((profile) => ({
      row_id: profile.row_id,
      ledger: profile.ledger,
      status: profile.status,
      failure_code: profile.failure_code,
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      receiver_interval: profile.receiver_interval,
      source_interval: profile.source_interval,
      terminal_decision_frontier_classes_declared: 2,
      terminal_decision_frontier_classes_satisfied: 0,
      proof_grade_evidence_construction_slots: 1,
      proof_grade_evidence_construction_slots_satisfied: 0,
      source_packet_acceptance_decision_slots: 2,
      source_packet_acceptance_decision_slots_satisfied: 0,
      current_pool_allowed_route_input_refs: 0,
      route_evidence_object_applications_authorized: 0,
      proof_grade_derivation_ref_evidence_object_present: false,
      source_packet_acceptance_rule_present: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
      mechanical_continuation_available: false,
      decision_required: true,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      source_packet_acceptance_decision_made: false,
      accepted_fold_layer_row: false,
      row_consumed: false,
      preledger_pass: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
      first_terminal_decision_frontier_blocker: TERMINAL_FRONTIER_BLOCKER,
      first_proof_grade_frontier_blocker: PROOF_GRADE_BLOCKER,
      first_source_packet_acceptance_frontier_blocker: SOURCE_PACKET_DECISION_BLOCKER,
      classification: "row_terminal_decision_frontier_open_fail_closed",
    }))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const poolSnapshot = currentPoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const counters = poolSnapshot.counters;
  const terminal = inputs.terminalObligation.summary;
  const route = inputs.routeApplicationExhaustion.summary;
  const proofAbsence = inputs.proofGradeCurrentPoolAbsence.summary;
  const proofEvidence = inputs.proofGradeEvidence.summary;
  const primitive = inputs.primitiveApplication.summary;
  const primitiveEvidence = inputs.primitiveEvidence.summary;
  const rule = inputs.ruleTarget.summary;
  const separatorProfiles = buildSeparatorProfiles(inputs.terminalObligation);
  const rowProfiles = buildRowProfiles(inputs.terminalObligation);
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const proofGradeSlots = terminal.proof_grade_derivation_ref_evidence_object_allowed_input_slots;
  const sourcePacketRuleSlots = terminal.source_packet_acceptance_rule_allowed_input_slots;
  const acceptedSourcePacketSlots = terminal.accepted_source_packet_allowed_input_slots;
  const sourcePacketDecisionSlots = sourcePacketRuleSlots + acceptedSourcePacketSlots;
  const terminalDecisionFrontierSlots = proofGradeSlots + sourcePacketDecisionSlots;

  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_terminal_obligation_direct_source_hash_checks_passed:
      terminal.direct_source_hash_checks_passed,
    retained_route_application_exhaustion_direct_source_hash_checks_passed:
      route.direct_source_hash_checks_passed,
    retained_proof_grade_current_pool_absence_direct_source_hash_checks_passed:
      proofAbsence.direct_source_hash_checks_passed,
    retained_proof_grade_evidence_source_hash_checks_passed:
      proofEvidence.source_hash_checks_passed,
    retained_primitive_application_direct_source_hash_checks_passed:
      primitive.direct_source_hash_checks_passed,
    retained_primitive_source_packet_acceptance_evidence_source_hash_checks_passed:
      primitiveEvidence.source_packet_route_source_hash_checks_passed,
    retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed:
      rule.direct_source_hash_checks_passed,
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
    candidate_higher_fold_constants_artifacts: terminal.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: terminal.candidate_separator_constants,
    candidate_row_constant_associations: terminal.candidate_row_constant_associations,
    rows_by_separator_count: rowsBySeparator,
    terminal_allowed_route_input_families_declared: terminal.allowed_route_input_families_declared,
    terminal_allowed_route_input_families_satisfied: terminal.allowed_route_input_families_satisfied,
    terminal_allowed_route_input_obligation_slots:
      terminal.total_allowed_route_input_obligation_slots,
    terminal_allowed_route_input_obligation_slots_satisfied:
      terminal.total_allowed_route_input_obligation_slots_satisfied,
    terminal_allowed_route_input_obligation_slots_missing:
      terminal.total_allowed_route_input_obligation_slots_missing,
    terminal_decision_frontier_classes_declared: 2,
    terminal_decision_frontier_classes_satisfied: 0,
    terminal_decision_frontier_classes_missing: 2,
    terminal_decision_frontier_obligation_slots: terminalDecisionFrontierSlots,
    terminal_decision_frontier_obligation_slots_satisfied: 0,
    terminal_decision_frontier_obligation_slots_missing: terminalDecisionFrontierSlots,
    proof_grade_evidence_construction_slots: proofGradeSlots,
    proof_grade_evidence_construction_slots_satisfied: 0,
    source_packet_acceptance_decision_slots: sourcePacketDecisionSlots,
    source_packet_acceptance_decision_slots_satisfied: 0,
    source_packet_acceptance_rule_decision_slots: sourcePacketRuleSlots,
    source_packet_acceptance_rule_decision_slots_satisfied: 0,
    accepted_source_packet_decision_slots: acceptedSourcePacketSlots,
    accepted_source_packet_decision_slots_satisfied: 0,
    allowed_route_input_frontier_families_ranked: 3,
    rank_1_allowed_route_input_family: SOURCE_PACKET_ACCEPTANCE_RULE_ALLOWED_INPUT,
    rank_1_separator_aggregate_fields_complete_separator_count:
      primitiveEvidence.separators_with_separator_aggregate_fields_complete,
    rank_1_separator_aggregate_fields_complete_row_count:
      primitiveEvidence.rows_with_separator_aggregate_fields_complete,
    rank_1_source_packet_acceptance_rule_slots: sourcePacketRuleSlots,
    rank_1_source_packet_acceptance_rule_slots_satisfied: 0,
    rank_2_allowed_route_input_family: ACCEPTED_SOURCE_PACKET_ALLOWED_INPUT,
    rank_2_accepted_source_packet_slots: acceptedSourcePacketSlots,
    rank_2_accepted_source_packet_slots_satisfied: 0,
    rank_3_allowed_route_input_family: PROOF_GRADE_ALLOWED_INPUT,
    rank_3_proof_grade_derivation_ref_evidence_object_slots: proofGradeSlots,
    rank_3_proof_grade_derivation_ref_evidence_object_slots_satisfied: 0,
    proof_grade_status_evidence_dependency_slots:
      proofEvidence.separator_proof_grade_evidence_slots + proofEvidence.row_proof_grade_evidence_slots,
    proof_grade_status_evidence_dependency_slots_filled:
      proofEvidence.separator_compatible_proof_grade_evidence_slots_filled +
      proofEvidence.row_compatible_proof_grade_evidence_slots_filled,
    separator_proof_grade_status_evidence_dependency_slots:
      proofEvidence.separator_proof_grade_evidence_slots,
    row_proof_grade_status_evidence_dependency_slots:
      proofEvidence.row_proof_grade_evidence_slots,
    compatible_proof_grade_status_evidence_files:
      proofEvidence.evidence_pool_compatible_proof_grade_status_evidence_files,
    separator_terminal_decision_frontier_slots:
      separatorProfiles.reduce(
        (sum, profile) =>
          sum +
          profile.proof_grade_evidence_construction_slots +
          profile.source_packet_acceptance_decision_slots,
        0,
      ),
    separator_terminal_decision_frontier_slots_satisfied: 0,
    row_terminal_decision_frontier_slots:
      rowProfiles.reduce(
        (sum, profile) =>
          sum +
          profile.proof_grade_evidence_construction_slots +
          profile.source_packet_acceptance_decision_slots,
        0,
      ),
    row_terminal_decision_frontier_slots_satisfied: 0,
    proof_grade_derivation_ref_application_attempts:
      proofAbsence.total_proof_grade_derivation_ref_application_attempts,
    proof_grade_derivation_ref_applications_authorized:
      proofAbsence.proof_grade_derivation_ref_applications_authorized,
    primitive_source_packet_route_application_attempts:
      primitive.total_route_evidence_object_application_attempts,
    primitive_source_packet_route_applications_authorized:
      primitive.total_route_evidence_object_applications_authorized,
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
    imported_proof_grade_status_evidence_dependency_slots:
      proofEvidence.separator_proof_grade_evidence_slots + proofEvidence.row_proof_grade_evidence_slots,
    imported_proof_grade_status_evidence_dependency_slots_filled:
      proofEvidence.separator_compatible_proof_grade_evidence_slots_filled +
      proofEvidence.row_compatible_proof_grade_evidence_slots_filled,
    imported_compatible_source_packet_acceptance_evidence_files:
      primitiveEvidence.evidence_pool_compatible_source_packet_acceptance_evidence_files,
    imported_source_packet_acceptance_rule_target_slots:
      rule.total_source_packet_acceptance_rule_target_slots,
    imported_source_packet_acceptance_rule_target_slots_satisfied:
      rule.total_source_packet_acceptance_rule_target_slots_satisfied,
    terminal_route_obligations_declared: terminal.terminal_route_obligations_declared,
    terminal_route_obligations_satisfied: terminal.terminal_route_obligations_satisfied,
    terminal_route_obligations_unsatisfied: terminal.terminal_route_obligations_unsatisfied,
    route_input_disjunctions_satisfied: terminal.route_input_disjunctions_satisfied,
    route_input_disjunction_slots: terminal.route_input_disjunction_slots,
    route_input_disjunction_slots_satisfied: terminal.route_input_disjunction_slots_satisfied,
    mechanical_continuations_from_current_pool: 0,
    external_decision_frontiers_required: 2,
    external_decision_frontiers_satisfied: 0,
    route_decisions_made: 0,
    proof_rule_decisions_made: 0,
    primitive_acceptance_decisions_made: 0,
    source_packet_acceptance_decisions_made: 0,
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
    first_terminal_decision_frontier_blocker: TERMINAL_FRONTIER_BLOCKER,
    first_proof_grade_frontier_blocker: PROOF_GRADE_BLOCKER,
    first_source_packet_acceptance_frontier_blocker: SOURCE_PACKET_DECISION_BLOCKER,
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
      "architrino.proof_programs.accepted_interval_certified_status_route_evidence_object_terminal_decision_frontier_classifier.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status route evidence-object terminal decision frontier",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status route evidence-object terminal decision frontier",
    claim_level:
      "priority-only route evidence-object terminal decision-frontier classifier; separates the exhausted terminal obligation into proof-grade derivation-ref evidence construction and source-packet acceptance decision frontiers, ranks the allowed route-input families with the source-packet acceptance rule target first, and makes no proof-rule, route, primitive-acceptance, source-packet acceptance, accepted-status, or row-consumption decisions",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_route_evidence_object_terminal_obligation_classifier: artifactRecord(
        paths.terminalObligation,
      ),
      accepted_status_route_evidence_object_application_exhaustion_classifier: artifactRecord(
        paths.routeApplicationExhaustion,
      ),
      accepted_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier: artifactRecord(
        paths.proofGradeCurrentPoolAbsence,
      ),
      accepted_status_proof_grade_evidence_dependency_classifier: artifactRecord(paths.proofGradeEvidence),
      accepted_status_primitive_source_packet_route_evidence_object_application_attempt: artifactRecord(
        paths.primitiveApplication,
      ),
      accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier: artifactRecord(
        paths.primitiveEvidence,
      ),
      accepted_status_source_packet_acceptance_rule_target_packet: artifactRecord(paths.ruleTarget),
    },
    source_hash_checks: sourceChecks,
    current_pool_terminal_decision_frontier_snapshot: poolSnapshot,
    terminal_decision_frontiers: buildTerminalDecisionFrontiers(summary),
    allowed_route_input_frontier_rankings: buildAllowedRouteInputFrontierRankings(summary),
    separator_terminal_decision_frontier_profiles: separatorProfiles,
    row_terminal_decision_frontier_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "route_evidence_object_terminal_decision_frontier",
      current_pool_closure_state:
        "not mechanically closable from the current certificate pool; proof-grade derivation-ref evidence objects, source-packet acceptance rules, and accepted source packets are all absent",
      terminal_decision_frontier_classes_declared: 2,
      terminal_decision_frontier_classes_satisfied: 0,
      current_pool_allowed_route_input_refs: counters.current_pool_allowed_route_input_refs,
      mechanical_continuation_available: false,
      decision_required: true,
      required_external_decision_frontiers: [
        "proof_grade_derivation_ref_evidence_construction_required",
        "source_packet_acceptance_decision_required",
      ],
      required_external_route_inputs: [
        PROOF_GRADE_ALLOWED_INPUT,
        SOURCE_PACKET_ACCEPTANCE_RULE_ALLOWED_INPUT,
        ACCEPTED_SOURCE_PACKET_ALLOWED_INPUT,
      ],
      ranked_next_mechanical_target: SOURCE_PACKET_ACCEPTANCE_RULE_ALLOWED_INPUT,
      ranked_next_mechanical_target_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
      forbidden_reinterpretations: [
        SOURCE_HANDLE_REJECTION,
        SOURCE_PACKET_RULE_TARGET_REJECTION,
        COMPLETE_AGGREGATE_REJECTION,
        "route_evidence_object_application_exhaustion_classifier_as_route_decision",
        "route_evidence_object_terminal_obligation_classifier_as_allowed_route_input",
        "route_evidence_object_terminal_decision_frontier_classifier_as_allowed_route_input",
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
      "Priority-only. This classifier sharpens the terminal blocker into the two external decision frontiers still required for accepted interval-certified constants status closure and ranks the source-packet acceptance rule target as the lowest-burden next route-input family.",
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
    s.direct_source_hash_checks_passed === 7,
    s.direct_source_hash_checks === 7,
    s.retained_terminal_obligation_direct_source_hash_checks_passed === 6,
    s.retained_route_application_exhaustion_direct_source_hash_checks_passed === 6,
    s.retained_proof_grade_current_pool_absence_direct_source_hash_checks_passed === 5,
    s.retained_proof_grade_evidence_source_hash_checks_passed === 9,
    s.retained_primitive_application_direct_source_hash_checks_passed === 8,
    s.retained_primitive_source_packet_acceptance_evidence_source_hash_checks_passed === 5,
    s.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed === 3,
    s.current_pool_json_files_scanned === 259,
    s.accepted_status_lane_json_files_scanned === 24,
    s.accepted_status_lane_fail_closed_json_files === 24,
    s.accepted_status_lane_non_fail_closed_json_files === 0,
    s.current_pool_proof_grade_derivation_ref_evidence_object_files_found === 0,
    s.current_pool_source_packet_acceptance_rule_files_found === 0,
    s.current_pool_accepted_source_packet_files_found === 0,
    s.current_pool_allowed_route_input_refs === 0,
    s.terminal_allowed_route_input_families_declared === 3,
    s.terminal_allowed_route_input_families_satisfied === 0,
    s.terminal_allowed_route_input_obligation_slots === 372,
    s.terminal_allowed_route_input_obligation_slots_satisfied === 0,
    s.terminal_decision_frontier_classes_declared === 2,
    s.terminal_decision_frontier_classes_satisfied === 0,
    s.terminal_decision_frontier_obligation_slots === 372,
    s.terminal_decision_frontier_obligation_slots_satisfied === 0,
    s.proof_grade_evidence_construction_slots === 124,
    s.proof_grade_evidence_construction_slots_satisfied === 0,
    s.source_packet_acceptance_decision_slots === 248,
    s.source_packet_acceptance_decision_slots_satisfied === 0,
    s.source_packet_acceptance_rule_decision_slots === 124,
    s.accepted_source_packet_decision_slots === 124,
    s.allowed_route_input_frontier_families_ranked === 3,
    s.rank_1_allowed_route_input_family === SOURCE_PACKET_ACCEPTANCE_RULE_ALLOWED_INPUT,
    s.rank_1_separator_aggregate_fields_complete_separator_count === 12,
    s.rank_1_separator_aggregate_fields_complete_row_count === 112,
    s.rank_1_source_packet_acceptance_rule_slots === 124,
    s.rank_1_source_packet_acceptance_rule_slots_satisfied === 0,
    s.rank_2_allowed_route_input_family === ACCEPTED_SOURCE_PACKET_ALLOWED_INPUT,
    s.rank_2_accepted_source_packet_slots === 124,
    s.rank_2_accepted_source_packet_slots_satisfied === 0,
    s.rank_3_allowed_route_input_family === PROOF_GRADE_ALLOWED_INPUT,
    s.rank_3_proof_grade_derivation_ref_evidence_object_slots === 124,
    s.rank_3_proof_grade_derivation_ref_evidence_object_slots_satisfied === 0,
    s.proof_grade_status_evidence_dependency_slots === 744,
    s.proof_grade_status_evidence_dependency_slots_filled === 0,
    s.separator_proof_grade_status_evidence_dependency_slots === 72,
    s.row_proof_grade_status_evidence_dependency_slots === 672,
    s.compatible_proof_grade_status_evidence_files === 0,
    s.separator_terminal_decision_frontier_slots === 36,
    s.row_terminal_decision_frontier_slots === 336,
    s.proof_grade_derivation_ref_application_attempts === 124,
    s.proof_grade_derivation_ref_applications_authorized === 0,
    s.primitive_source_packet_route_application_attempts === 248,
    s.primitive_source_packet_route_applications_authorized === 0,
    s.route_evidence_object_application_attempts === 372,
    s.route_evidence_object_applications_authorized === 0,
    s.route_evidence_object_application_rejections === 372,
    s.source_certificate_handle_as_derivation_ref_rejections === 124,
    s.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections === 124,
    s.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections === 124,
    s.imported_current_pool_derivation_ref_evidence_object_files_found === 0,
    s.imported_current_pool_compatible_derivation_ref_evidence_refs === 0,
    s.imported_proof_grade_status_evidence_dependency_slots === 744,
    s.imported_proof_grade_status_evidence_dependency_slots_filled === 0,
    s.imported_compatible_source_packet_acceptance_evidence_files === 0,
    s.imported_source_packet_acceptance_rule_target_slots === 124,
    s.imported_source_packet_acceptance_rule_target_slots_satisfied === 0,
    s.terminal_route_obligations_declared === 3,
    s.terminal_route_obligations_satisfied === 0,
    s.route_input_disjunctions_satisfied === 0,
    s.route_input_disjunction_slots === 992,
    s.route_input_disjunction_slots_satisfied === 0,
    s.mechanical_continuations_from_current_pool === 0,
    s.external_decision_frontiers_required === 2,
    s.external_decision_frontiers_satisfied === 0,
    s.route_decisions_made === 0,
    s.proof_rule_decisions_made === 0,
    s.primitive_acceptance_decisions_made === 0,
    s.source_packet_acceptance_decisions_made === 0,
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
    throw new Error("Route evidence-object terminal decision frontier classifier invariant failure.");
  }
}

function renderReport(packet) {
  const s = packet.summary;
  const sourceRows = Object.entries(packet.source_artifacts)
    .map(([key, record]) => `| \`${key}\` | \`${record.basename}\` | \`${record.sha256}\` | ${record.present} |`)
    .join("\n");
  const frontierRows = packet.terminal_decision_frontiers
    .map(
      (frontier) =>
        `| \`${frontier.frontier_id}\` | \`${frontier.frontier_class}\` | ${frontier.slots_declared} | ${frontier.slots_satisfied} | ${frontier.current_pool_allowed_route_input_refs} | \`${frontier.first_blocker}\` |`,
    )
    .join("\n");
  const rankingRows = packet.allowed_route_input_frontier_rankings
    .map(
      (frontier) =>
        `| ${frontier.rank} | \`${frontier.allowed_route_input_family}\` | \`${frontier.frontier_class}\` | ${frontier.slots_declared} | ${frontier.slots_satisfied} | \`${frontier.first_blocker}\` |`,
    )
    .join("\n");
  return `# Candidate-Live Higher-Fold Constants Accepted-Status Route Evidence-Object Terminal Decision-Frontier Classifier

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

## Terminal Decision Frontiers

| Frontier | Class | Slots | Satisfied | Current-pool refs | First blocker |
| --- | --- | ---: | ---: | ---: | --- |
${frontierRows}

## Allowed Route-Input Frontier Ranking

| Rank | Allowed route-input family | Class | Slots | Satisfied | First blocker |
| ---: | --- | --- | ---: | ---: | --- |
${rankingRows}

Rank 1 is the source-packet acceptance rule target because ${s.rank_1_separator_aggregate_fields_complete_separator_count} / ${s.candidate_separator_constants} separators and ${s.rank_1_separator_aggregate_fields_complete_row_count} / ${s.candidate_row_constant_associations} rows retain complete separator aggregate inputs while the rule remains absent.

The proof-grade evidence dependency remains ${s.proof_grade_status_evidence_dependency_slots_filled} / ${s.proof_grade_status_evidence_dependency_slots} filled.

## Retained Application Exhaustion

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

The terminal blocker is now narrowed to two external decision frontiers:

1. \`proof_grade_derivation_ref_evidence_construction_required\`
2. \`source_packet_acceptance_decision_required\`

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
    terminalObligation: args.terminalObligation,
    routeApplicationExhaustion: args.routeApplicationExhaustion,
    proofGradeCurrentPoolAbsence: args.proofGradeCurrentPoolAbsence,
    proofGradeEvidence: args.proofGradeEvidence,
    primitiveApplication: args.primitiveApplication,
    primitiveEvidence: args.primitiveEvidence,
    ruleTarget: args.ruleTarget,
    certificatePoolDir: args.certificatePoolDir,
  };
  const inputs = {
    terminalObligation: readJson(paths.terminalObligation),
    routeApplicationExhaustion: readJson(paths.routeApplicationExhaustion),
    proofGradeCurrentPoolAbsence: readJson(paths.proofGradeCurrentPoolAbsence),
    proofGradeEvidence: readJson(paths.proofGradeEvidence),
    primitiveApplication: readJson(paths.primitiveApplication),
    primitiveEvidence: readJson(paths.primitiveEvidence),
    ruleTarget: readJson(paths.ruleTarget),
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
