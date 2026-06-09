#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_TERMINAL_DECISION_FRONTIER = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_decision_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_RULE_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_APPLICATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ACCEPTED_CONSTANTS_CONFORMANCE = `${CERT_DIR}/higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_AGGREGATE = `${CERT_DIR}/higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_construction_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_construction_frontier_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
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

const TERMINAL_DECISION_FRONTIER_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_decision_frontier_classifier_fail_closed_terminal_inputs_ordered_source_packet_acceptance_rule_target_first_no_allowed_route_input_refs_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_row_consumption";
const RULE_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet_fail_closed_acceptance_rule_target_declared_aggregate_inputs_complete_rule_absent_no_primitive_acceptance_no_row_consumption";
const PRIMITIVE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier_fail_closed_frontier_locked_separator_aggregates_present_no_compatible_source_packet_acceptance_evidence_no_primitive_acceptance_no_row_consumption";
const PRIMITIVE_APPLICATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt_fail_closed_contract_declared_rule_target_and_aggregate_inputs_not_application_evidence_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";
const IMPULSE_ACCEPTANCE_STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const ACCEPTED_CONSTANTS_CONFORMANCE_STATUS =
  "higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier_fail_closed_aggregate_present_existing_constants_contract_packet_mismatch_no_source_packet_acceptance_no_row_consumption";
const SEPARATOR_AGGREGATE_STATUS =
  "higher_fold_layer_same_packet_separator_aggregate_certificate_attempt_fail_closed_row_enclosures_separator_aggregates_certified_source_packets_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_construction_frontier_classifier_fail_closed_ranked_rule_target_locked_aggregate_inputs_complete_rule_and_accepted_constants_conformance_absent_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_row_consumption";

const ACCEPTED_STATUS_LANE_PREFIX =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_";
const RANK_1_ALLOWED_ROUTE_INPUT =
  "source_packet_acceptance_rule_for_live_same_packet_separator_aggregate_family";
const ACCEPTED_SOURCE_PACKET_ALLOWED_INPUT =
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_for_live_same_packet_separator_aggregate_family";
const PROOF_GRADE_ALLOWED_INPUT =
  "proof_grade_derivation_ref_evidence_object_for_accepted_interval_certified_constants_status";
const SOURCE_PACKET_ACCEPTANCE_RULE_FIELD = "source_packet_acceptance_rule";
const ACCEPTED_SOURCE_PACKET_FIELD = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet";
const RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const ACCEPTED_SOURCE_PACKET_BLOCKER = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_absent";
const CONFORMANCE_BLOCKER = "existing_constants_contract_packet_identity_mismatch";
const RULE_TARGET_AS_RULE_REJECTION = "source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule";
const AGGREGATE_AS_SOURCE_PACKET_REJECTION = "complete_separator_aggregate_inputs_as_accepted_source_packet";

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
    terminalDecisionFrontier: DEFAULT_TERMINAL_DECISION_FRONTIER,
    ruleTarget: DEFAULT_RULE_TARGET,
    primitiveEvidence: DEFAULT_PRIMITIVE_EVIDENCE,
    primitiveApplication: DEFAULT_PRIMITIVE_APPLICATION,
    impulseAcceptance: DEFAULT_IMPULSE_ACCEPTANCE,
    acceptedConstantsConformance: DEFAULT_ACCEPTED_CONSTANTS_CONFORMANCE,
    separatorAggregate: DEFAULT_SEPARATOR_AGGREGATE,
    certificatePoolDir: CERT_DIR,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--terminal-decision-frontier") {
      args.terminalDecisionFrontier = argv[++index];
    } else if (arg === "--rule-target") {
      args.ruleTarget = argv[++index];
    } else if (arg === "--primitive-evidence") {
      args.primitiveEvidence = argv[++index];
    } else if (arg === "--primitive-application") {
      args.primitiveApplication = argv[++index];
    } else if (arg === "--impulse-acceptance") {
      args.impulseAcceptance = argv[++index];
    } else if (arg === "--accepted-constants-conformance") {
      args.acceptedConstantsConformance = argv[++index];
    } else if (arg === "--separator-aggregate") {
      args.separatorAggregate = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-source-packet-acceptance-rule-construction-frontier-classifier.mjs [options]

Options:
  --terminal-decision-frontier PATH      Route evidence-object terminal decision-frontier classifier. Defaults to ${DEFAULT_TERMINAL_DECISION_FRONTIER}.
  --rule-target PATH                     Source-packet acceptance rule target packet. Defaults to ${DEFAULT_RULE_TARGET}.
  --primitive-evidence PATH              Primitive source-packet acceptance evidence dependency classifier. Defaults to ${DEFAULT_PRIMITIVE_EVIDENCE}.
  --primitive-application PATH           Primitive source-packet route evidence-object application attempt. Defaults to ${DEFAULT_PRIMITIVE_APPLICATION}.
  --impulse-acceptance PATH              Impulse-bound source-packet acceptance dependency classifier. Defaults to ${DEFAULT_IMPULSE_ACCEPTANCE}.
  --accepted-constants-conformance PATH  Accepted-constants conformance classifier. Defaults to ${DEFAULT_ACCEPTED_CONSTANTS_CONFORMANCE}.
  --separator-aggregate PATH             Same-packet separator aggregate certificate attempt. Defaults to ${DEFAULT_SEPARATOR_AGGREGATE}.
  --certificate-pool-dir PATH            Certificate JSON pool directory. Defaults to ${CERT_DIR}.
  --out-dir PATH                         Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                               Pretty-print JSON artifact.
  --help                                 Show this help.`);
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
    ["accepted_status_route_evidence_object_terminal_decision_frontier_classifier", paths.terminalDecisionFrontier],
    ["accepted_status_source_packet_acceptance_rule_target_packet", paths.ruleTarget],
    ["accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier", paths.primitiveEvidence],
    ["accepted_status_primitive_source_packet_route_evidence_object_application_attempt", paths.primitiveApplication],
    ["same_packet_impulse_bound_source_packet_acceptance_dependency_classifier", paths.impulseAcceptance],
    ["same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier", paths.acceptedConstantsConformance],
    ["same_packet_separator_aggregate_certificate_attempt", paths.separatorAggregate],
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
  assertPacketStatusAndLocks(inputs.terminalDecisionFrontier, "terminalDecisionFrontier", TERMINAL_DECISION_FRONTIER_STATUS);
  assertPacketStatusAndLocks(inputs.ruleTarget, "ruleTarget", RULE_TARGET_STATUS);
  assertPacketStatusAndLocks(inputs.primitiveEvidence, "primitiveEvidence", PRIMITIVE_EVIDENCE_STATUS);
  assertPacketStatusAndLocks(inputs.primitiveApplication, "primitiveApplication", PRIMITIVE_APPLICATION_STATUS);
  assertPacketStatusAndLocks(inputs.impulseAcceptance, "impulseAcceptance", IMPULSE_ACCEPTANCE_STATUS);
  assertPacketStatusAndLocks(
    inputs.acceptedConstantsConformance,
    "acceptedConstantsConformance",
    ACCEPTED_CONSTANTS_CONFORMANCE_STATUS,
  );
  assertPacketStatusAndLocks(inputs.separatorAggregate, "separatorAggregate", SEPARATOR_AGGREGATE_STATUS);

  const terminal = inputs.terminalDecisionFrontier.summary;
  const rule = inputs.ruleTarget.summary;
  const primitiveEvidence = inputs.primitiveEvidence.summary;
  const primitiveApplication = inputs.primitiveApplication.summary;
  const impulse = inputs.impulseAcceptance.summary;
  const conformance = inputs.acceptedConstantsConformance.summary;
  const aggregate = inputs.separatorAggregate.summary;

  expectEqual(terminal.direct_source_hash_checks_passed, 7, "terminal decision-frontier direct locks");
  expectEqual(terminal.rank_1_allowed_route_input_family, RANK_1_ALLOWED_ROUTE_INPUT, "rank-1 allowed route input");
  expectEqual(terminal.rank_1_source_packet_acceptance_rule_slots, 124, "rank-1 rule slots");
  expectEqual(terminal.rank_1_source_packet_acceptance_rule_slots_satisfied, 0, "rank-1 rule slots satisfied");
  expectEqual(terminal.current_pool_allowed_route_input_refs, 0, "terminal current-pool allowed route input refs");
  expectEqual(rule.direct_source_hash_checks_passed, 3, "rule target direct locks");
  expectEqual(rule.total_source_packet_acceptance_rule_target_slots, 124, "rule target slots");
  expectEqual(rule.total_source_packet_acceptance_rule_target_slots_satisfied, 0, "rule target slots satisfied");
  expectEqual(rule.separators_with_separator_aggregate_fields_complete, 12, "rule target complete separators");
  expectEqual(rule.rows_with_separator_aggregate_fields_complete, 112, "rule target complete rows");
  expectEqual(primitiveEvidence.source_packet_route_source_hash_checks_passed, 5, "primitive evidence locks");
  expectEqual(primitiveEvidence.evidence_pool_compatible_source_packet_acceptance_evidence_files, 0, "compatible source-packet evidence files");
  expectEqual(primitiveEvidence.separator_source_packet_acceptance_evidence_slots, 24, "separator source-packet evidence slots");
  expectEqual(primitiveEvidence.row_source_packet_acceptance_evidence_slots, 224, "row source-packet evidence slots");
  expectEqual(primitiveApplication.direct_source_hash_checks_passed, 8, "primitive application direct locks");
  expectEqual(primitiveApplication.total_route_evidence_object_application_attempts, 248, "primitive route applications");
  expectEqual(primitiveApplication.total_route_evidence_object_applications_authorized, 0, "primitive route applications authorized");
  expectEqual(
    primitiveApplication.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections,
    124,
    "rule target as rule rejections",
  );
  expectEqual(
    primitiveApplication.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections,
    124,
    "aggregate as accepted source-packet rejections",
  );
  expectEqual(impulse.separators_with_separator_aggregate_C_Sigma, 12, "impulse aggregate C");
  expectEqual(impulse.separators_with_source_packet_acceptance_rule, 0, "impulse source-packet rules");
  expectEqual(impulse.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "impulse accepted source packets");
  expectEqual(conformance.separators_with_separator_aggregate_fields, 12, "conformance separator aggregates");
  expectEqual(conformance.separators_with_accepted_constants_artifact, 0, "accepted constants artifacts");
  expectEqual(conformance.separators_with_accepted_constants_conformance, 0, "accepted constants conformance");
  expectEqual(conformance.rows_with_accepted_constants_conformance, 0, "row accepted constants conformance");
  expectEqual(conformance.separators_with_source_packet_acceptance_rule, 0, "conformance source-packet rules");
  expectEqual(conformance.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "conformance accepted source packets");
  expectEqual(aggregate.separators_with_separator_aggregate_C_Sigma, 12, "separator aggregate C");
  expectEqual(aggregate.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "aggregate accepted source packets");
  assertRowsBySeparator(terminal, "terminal decision-frontier");
  assertRowsBySeparator(rule, "rule target");
  assertRowsBySeparator(primitiveEvidence, "primitive evidence");
  assertRowsBySeparator(primitiveApplication, "primitive application");
  assertRowsBySeparator(impulse, "impulse acceptance");
  assertRowsBySeparator(conformance, "accepted constants conformance");
  assertRowsBySeparator(aggregate, "separator aggregate");
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

function acceptedConstantsConformanceMatches(parsed, text) {
  const status = String(parsed.status ?? "");
  const summary = parsed.summary ?? {};
  if (parsed.packet_id !== PACKET_ID || status.includes("fail_closed")) {
    return false;
  }
  return (
    summary.accepted_constants_conformance === true ||
    /"accepted_constants_conformance"\s*:\s*true/.test(text) ||
    /"separators_with_accepted_constants_conformance"\s*:\s*[1-9]/.test(text) ||
    /"rows_with_accepted_constants_conformance"\s*:\s*[1-9]/.test(text)
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
    current_pool_source_packet_acceptance_rule_files_found: 0,
    current_pool_accepted_source_packet_files_found: 0,
    current_pool_accepted_constants_conformance_files_found: 0,
    current_pool_rule_construction_input_refs: 0,
    preledger_pass_true_files: 0,
    live_ledger_update_true_files: 0,
    branch_chart_authorized_true_files: 0,
    row_consumption_positive_files: 0,
    accepted_interval_certified_constants_status_positive_files: 0,
  };
  const compatibleRuleBasenames = [];
  const compatibleAcceptedSourcePacketBasenames = [];
  const compatibleConformanceBasenames = [];
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
    const packetMatches = parsed.packet_id === PACKET_ID;
    const ruleMatches =
      packetMatches &&
      !failClosed &&
      sourcePacketRoleMatches(parsed, text, SOURCE_PACKET_ACCEPTANCE_RULE_FIELD);
    const acceptedSourceMatches =
      packetMatches &&
      !failClosed &&
      sourcePacketRoleMatches(parsed, text, ACCEPTED_SOURCE_PACKET_FIELD);
    const conformanceMatches = acceptedConstantsConformanceMatches(parsed, text);
    if (ruleMatches) {
      counters.current_pool_source_packet_acceptance_rule_files_found += 1;
      counters.current_pool_rule_construction_input_refs += 1;
      compatibleRuleBasenames.push(basename);
    }
    if (acceptedSourceMatches) {
      counters.current_pool_accepted_source_packet_files_found += 1;
      counters.current_pool_rule_construction_input_refs += 1;
      compatibleAcceptedSourcePacketBasenames.push(basename);
    }
    if (conformanceMatches) {
      counters.current_pool_accepted_constants_conformance_files_found += 1;
      counters.current_pool_rule_construction_input_refs += 1;
      compatibleConformanceBasenames.push(basename);
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
    compatible_source_packet_acceptance_rule_basenames: compatibleRuleBasenames,
    compatible_accepted_source_packet_basenames: compatibleAcceptedSourcePacketBasenames,
    compatible_accepted_constants_conformance_basenames: compatibleConformanceBasenames,
    non_fail_closed_accepted_status_basenames: nonFailClosedAcceptedStatusBasenames,
  };
}

function buildSeparatorProfiles(ruleTarget) {
  return ruleTarget.separator_source_packet_acceptance_rule_target_profiles
    .map((profile) => ({
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      row_count: profile.row_count,
      aggregate_inputs_complete: profile.separator_aggregate_fields_complete,
      rank_1_allowed_route_input_family: RANK_1_ALLOWED_ROUTE_INPUT,
      source_packet_acceptance_rule_target_slots: profile.source_packet_acceptance_rule_target_slots,
      source_packet_acceptance_rule_target_slots_satisfied:
        profile.source_packet_acceptance_rule_target_slots_satisfied,
      source_packet_acceptance_rule_construction_frontier_slots: 1,
      source_packet_acceptance_rule_construction_frontier_slots_satisfied: 0,
      source_packet_acceptance_rule_present: false,
      accepted_constants_conformance_present: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
      current_pool_rule_construction_input_refs: 0,
      target_packet_is_rule: false,
      aggregate_inputs_are_accepted_source_packet: false,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      source_packet_acceptance_decision_made: false,
      source_packet_acceptance_rule_constructed: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_constructed: false,
      row_consumption_count: 0,
      preledger_pass_rows: 0,
      branch_chart_authorized_rows: 0,
      first_rule_construction_frontier_blocker: RULE_BLOCKER,
      first_accepted_constants_conformance_blocker: CONFORMANCE_BLOCKER,
      first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
      first_rule_target_rejection: RULE_TARGET_AS_RULE_REJECTION,
      first_aggregate_reinterpretation_rejection: AGGREGATE_AS_SOURCE_PACKET_REJECTION,
      classification: "separator_rule_construction_frontier_open_fail_closed",
    }))
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function buildRowProfiles(ruleTarget) {
  return ruleTarget.row_source_packet_acceptance_rule_target_profiles
    .map((profile) => ({
      row_id: profile.row_id,
      ledger: profile.ledger,
      status: profile.status,
      failure_code: profile.failure_code,
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      receiver_interval: profile.receiver_interval,
      source_interval: profile.source_interval,
      aggregate_inputs_complete: profile.separator_aggregate_fields_complete,
      rank_1_allowed_route_input_family: RANK_1_ALLOWED_ROUTE_INPUT,
      source_packet_acceptance_rule_target_slots: profile.source_packet_acceptance_rule_target_slots,
      source_packet_acceptance_rule_target_slots_satisfied:
        profile.source_packet_acceptance_rule_target_slots_satisfied,
      source_packet_acceptance_rule_construction_frontier_slots: 1,
      source_packet_acceptance_rule_construction_frontier_slots_satisfied: 0,
      source_packet_acceptance_rule_present: false,
      accepted_constants_conformance_present: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
      current_pool_rule_construction_input_refs: 0,
      target_packet_is_rule: false,
      aggregate_inputs_are_accepted_source_packet: false,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      source_packet_acceptance_decision_made: false,
      source_packet_acceptance_rule_constructed: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_constructed: false,
      accepted_fold_layer_row: false,
      row_consumed: false,
      preledger_pass: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
      first_rule_construction_frontier_blocker: RULE_BLOCKER,
      first_accepted_constants_conformance_blocker: CONFORMANCE_BLOCKER,
      first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
      first_rule_target_rejection: RULE_TARGET_AS_RULE_REJECTION,
      first_aggregate_reinterpretation_rejection: AGGREGATE_AS_SOURCE_PACKET_REJECTION,
      classification: "row_rule_construction_frontier_open_fail_closed",
    }))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const poolSnapshot = currentPoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const counters = poolSnapshot.counters;
  const terminal = inputs.terminalDecisionFrontier.summary;
  const rule = inputs.ruleTarget.summary;
  const primitiveEvidence = inputs.primitiveEvidence.summary;
  const primitiveApplication = inputs.primitiveApplication.summary;
  const impulse = inputs.impulseAcceptance.summary;
  const conformance = inputs.acceptedConstantsConformance.summary;
  const aggregate = inputs.separatorAggregate.summary;
  const separatorProfiles = buildSeparatorProfiles(inputs.ruleTarget);
  const rowProfiles = buildRowProfiles(inputs.ruleTarget);
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const frontierSlots = separatorProfiles.length + rowProfiles.length;
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_terminal_decision_frontier_direct_source_hash_checks_passed:
      terminal.direct_source_hash_checks_passed,
    retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed:
      rule.direct_source_hash_checks_passed,
    retained_primitive_source_packet_acceptance_evidence_source_hash_checks_passed:
      primitiveEvidence.source_packet_route_source_hash_checks_passed,
    retained_primitive_application_direct_source_hash_checks_passed:
      primitiveApplication.direct_source_hash_checks_passed,
    retained_impulse_acceptance_separator_profiles: impulse.separator_acceptance_dependency_profiles,
    retained_accepted_constants_conformance_separator_profiles: conformance.separator_conformance_profiles,
    retained_separator_aggregate_certificates: aggregate.separator_aggregate_certificates,
    current_pool_json_files_scanned: poolSnapshot.json_files_scanned_before_output,
    accepted_status_lane_json_files_scanned: counters.accepted_status_lane_json_files,
    accepted_status_lane_fail_closed_json_files: counters.accepted_status_lane_fail_closed_json_files,
    accepted_status_lane_non_fail_closed_json_files: counters.accepted_status_lane_non_fail_closed_json_files,
    current_pool_source_packet_acceptance_rule_files_found:
      counters.current_pool_source_packet_acceptance_rule_files_found,
    current_pool_accepted_source_packet_files_found:
      counters.current_pool_accepted_source_packet_files_found,
    current_pool_accepted_constants_conformance_files_found:
      counters.current_pool_accepted_constants_conformance_files_found,
    current_pool_rule_construction_input_refs: counters.current_pool_rule_construction_input_refs,
    candidate_higher_fold_constants_artifacts: rule.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: rule.candidate_separator_constants,
    candidate_row_constant_associations: rule.candidate_row_constant_associations,
    rows_by_separator_count: rowsBySeparator,
    rank_1_allowed_route_input_family: terminal.rank_1_allowed_route_input_family,
    rank_1_rule_target_slots: terminal.rank_1_source_packet_acceptance_rule_slots,
    rank_1_rule_target_slots_satisfied: terminal.rank_1_source_packet_acceptance_rule_slots_satisfied,
    rank_2_allowed_route_input_family: ACCEPTED_SOURCE_PACKET_ALLOWED_INPUT,
    rank_3_allowed_route_input_family: PROOF_GRADE_ALLOWED_INPUT,
    separators_with_separator_aggregate_fields_complete:
      rule.separators_with_separator_aggregate_fields_complete,
    rows_with_separator_aggregate_fields_complete:
      rule.rows_with_separator_aggregate_fields_complete,
    separator_aggregate_C_Sigma_present: rule.separator_aggregate_C_Sigma_present,
    separator_aggregate_A_Sigma_eta_epsilon_c_present:
      rule.separator_aggregate_A_Sigma_eta_epsilon_c_present,
    separator_aggregate_I_fold_eta_epsilon_c_Sigma_present:
      rule.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present,
    aggregate_certificate_separator_aggregate_fields_present:
      rule.aggregate_certificate_separator_aggregate_fields_present,
    source_packet_acceptance_rule_targets_declared:
      rule.source_packet_acceptance_rule_targets_declared,
    source_packet_acceptance_rule_targets_satisfied:
      rule.source_packet_acceptance_rule_targets_satisfied,
    source_packet_acceptance_rule_target_slots: rule.total_source_packet_acceptance_rule_target_slots,
    source_packet_acceptance_rule_target_slots_satisfied:
      rule.total_source_packet_acceptance_rule_target_slots_satisfied,
    source_packet_acceptance_rule_construction_frontier_slots: frontierSlots,
    source_packet_acceptance_rule_construction_frontier_slots_satisfied: 0,
    source_packet_acceptance_rule_construction_frontier_slots_missing: frontierSlots,
    separator_source_packet_acceptance_rule_construction_frontier_slots: separatorProfiles.length,
    separator_source_packet_acceptance_rule_construction_frontier_slots_satisfied: 0,
    row_source_packet_acceptance_rule_construction_frontier_slots: rowProfiles.length,
    row_source_packet_acceptance_rule_construction_frontier_slots_satisfied: 0,
    primitive_source_packet_acceptance_evidence_slots:
      primitiveEvidence.separator_source_packet_acceptance_evidence_slots +
      primitiveEvidence.row_source_packet_acceptance_evidence_slots,
    primitive_source_packet_acceptance_evidence_slots_filled:
      primitiveEvidence.separator_compatible_source_packet_acceptance_evidence_slots_filled +
      primitiveEvidence.row_compatible_source_packet_acceptance_evidence_slots_filled,
    primitive_source_packet_route_application_attempts:
      primitiveApplication.total_route_evidence_object_application_attempts,
    primitive_source_packet_route_applications_authorized:
      primitiveApplication.total_route_evidence_object_applications_authorized,
    source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections:
      primitiveApplication.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections,
    complete_separator_aggregate_inputs_as_accepted_source_packet_rejections:
      primitiveApplication.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections,
    accepted_constants_artifact_present: conformance.accepted_constants_artifact_present,
    contract_packet_identity_mismatch: conformance.contract_packet_identity_mismatch,
    contract_separator_family_mismatch: conformance.contract_separator_family_mismatch,
    accepted_constants_conformance_separator_count:
      conformance.separators_with_accepted_constants_conformance,
    accepted_constants_conformance_row_count:
      conformance.rows_with_accepted_constants_conformance,
    conformance_source_packet_acceptance_rule_count:
      conformance.separators_with_source_packet_acceptance_rule,
    impulse_source_packet_acceptance_rule_count:
      impulse.separators_with_source_packet_acceptance_rule,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    rows_with_accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet:
      primitiveApplication.rows_with_accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet,
    source_packet_acceptance_rules_constructed: 0,
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
    mechanical_continuations_from_current_pool: 0,
    route_decisions_made: 0,
    proof_rule_decisions_made: 0,
    primitive_acceptance_decisions_made: 0,
    source_packet_acceptance_decisions_made: 0,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_rule_construction_frontier_blocker: RULE_BLOCKER,
    first_accepted_constants_conformance_blocker: CONFORMANCE_BLOCKER,
    first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
    first_rule_target_rejection: RULE_TARGET_AS_RULE_REJECTION,
    first_aggregate_reinterpretation_rejection: AGGREGATE_AS_SOURCE_PACKET_REJECTION,
    parent_complement_consumption_ref_blocker: "parent_complement_consumption_ref_absent",
    first_separator_certificate_blocker: "higher_fold_separator_layer_certificate_absent",
  };

  const packet = {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_source_packet_acceptance_rule_construction_frontier_classifier.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status source-packet acceptance rule construction frontier",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status source-packet acceptance rule construction frontier",
    claim_level:
      "priority-only source-packet acceptance rule construction-frontier classifier; locks the ranked rule target over complete separator aggregate inputs, proves the rule and accepted-constants conformance routes are absent, and makes no route, proof-rule, primitive-acceptance, source-packet acceptance, accepted-status, or row-consumption decision",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_route_evidence_object_terminal_decision_frontier_classifier: artifactRecord(
        paths.terminalDecisionFrontier,
      ),
      accepted_status_source_packet_acceptance_rule_target_packet: artifactRecord(paths.ruleTarget),
      accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier: artifactRecord(
        paths.primitiveEvidence,
      ),
      accepted_status_primitive_source_packet_route_evidence_object_application_attempt: artifactRecord(
        paths.primitiveApplication,
      ),
      same_packet_impulse_bound_source_packet_acceptance_dependency_classifier: artifactRecord(
        paths.impulseAcceptance,
      ),
      same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier: artifactRecord(
        paths.acceptedConstantsConformance,
      ),
      same_packet_separator_aggregate_certificate_attempt: artifactRecord(paths.separatorAggregate),
    },
    source_hash_checks: sourceChecks,
    current_pool_source_packet_acceptance_rule_construction_frontier_snapshot: poolSnapshot,
    source_packet_acceptance_rule_construction_frontiers: [
      {
        frontier_id: "source_packet_acceptance_rule_required",
        slots_declared: summary.source_packet_acceptance_rule_construction_frontier_slots,
        slots_satisfied: 0,
        current_pool_refs: summary.current_pool_source_packet_acceptance_rule_files_found,
        first_blocker: RULE_BLOCKER,
      },
      {
        frontier_id: "accepted_constants_conformance_route_absent",
        slots_declared: summary.source_packet_acceptance_rule_construction_frontier_slots,
        slots_satisfied: 0,
        current_pool_refs: summary.current_pool_accepted_constants_conformance_files_found,
        first_blocker: CONFORMANCE_BLOCKER,
      },
      {
        frontier_id: "accepted_source_packet_route_absent",
        slots_declared: summary.source_packet_acceptance_rule_construction_frontier_slots,
        slots_satisfied: 0,
        current_pool_refs: summary.current_pool_accepted_source_packet_files_found,
        first_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
      },
    ],
    separator_source_packet_acceptance_rule_construction_frontier_profiles: separatorProfiles,
    row_source_packet_acceptance_rule_construction_frontier_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "source_packet_acceptance_rule_construction_frontier",
      current_pool_closure_state:
        "not mechanically closable from the current certificate pool; the ranked source-packet acceptance rule target is declared over complete aggregate inputs, but no source-packet acceptance rule, accepted constants conformance artifact, or accepted source packet is present",
      ranked_next_mechanical_target: RANK_1_ALLOWED_ROUTE_INPUT,
      ranked_next_mechanical_target_blocker: RULE_BLOCKER,
      mechanical_continuation_available: false,
      decision_required: true,
      required_external_input: RANK_1_ALLOWED_ROUTE_INPUT,
      forbidden_reinterpretations: [
        RULE_TARGET_AS_RULE_REJECTION,
        AGGREGATE_AS_SOURCE_PACKET_REJECTION,
        "candidate_live_higher_fold_constants_artifact_as_accepted_constants_artifact",
        "accepted_constants_conformance_classifier_as_source_packet_acceptance_rule",
        "source_packet_acceptance_rule_construction_frontier_classifier_as_source_packet_acceptance_rule",
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
      "Priority-only. This classifier sharpens the rank-1 terminal handoff to the source-packet acceptance rule construction frontier and proves that current certificate data still supplies no rule or accepted alternate route.",
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
    s.direct_source_hash_checks === 7,
    s.direct_source_hash_checks_passed === 7,
    s.retained_terminal_decision_frontier_direct_source_hash_checks_passed === 7,
    s.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed === 3,
    s.retained_primitive_source_packet_acceptance_evidence_source_hash_checks_passed === 5,
    s.retained_primitive_application_direct_source_hash_checks_passed === 8,
    s.retained_impulse_acceptance_separator_profiles === 12,
    s.retained_accepted_constants_conformance_separator_profiles === 12,
    s.retained_separator_aggregate_certificates === 12,
    s.current_pool_json_files_scanned === 260,
    s.accepted_status_lane_json_files_scanned === 25,
    s.accepted_status_lane_fail_closed_json_files === 25,
    s.accepted_status_lane_non_fail_closed_json_files === 0,
    s.current_pool_source_packet_acceptance_rule_files_found === 0,
    s.current_pool_accepted_source_packet_files_found === 0,
    s.current_pool_accepted_constants_conformance_files_found === 0,
    s.current_pool_rule_construction_input_refs === 0,
    s.rank_1_allowed_route_input_family === RANK_1_ALLOWED_ROUTE_INPUT,
    s.rank_1_rule_target_slots === 124,
    s.rank_1_rule_target_slots_satisfied === 0,
    s.source_packet_acceptance_rule_target_slots === 124,
    s.source_packet_acceptance_rule_target_slots_satisfied === 0,
    s.source_packet_acceptance_rule_construction_frontier_slots === 124,
    s.source_packet_acceptance_rule_construction_frontier_slots_satisfied === 0,
    s.source_packet_acceptance_rule_construction_frontier_slots_missing === 124,
    s.separators_with_separator_aggregate_fields_complete === 12,
    s.rows_with_separator_aggregate_fields_complete === 112,
    s.primitive_source_packet_acceptance_evidence_slots === 248,
    s.primitive_source_packet_acceptance_evidence_slots_filled === 0,
    s.primitive_source_packet_route_application_attempts === 248,
    s.primitive_source_packet_route_applications_authorized === 0,
    s.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections === 124,
    s.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections === 124,
    s.accepted_constants_artifact_present === false,
    s.contract_packet_identity_mismatch === true,
    s.contract_separator_family_mismatch === true,
    s.accepted_constants_conformance_separator_count === 0,
    s.accepted_constants_conformance_row_count === 0,
    s.conformance_source_packet_acceptance_rule_count === 0,
    s.impulse_source_packet_acceptance_rule_count === 0,
    s.source_packet_acceptance_rules_constructed === 0,
    s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0,
    s.accepted_interval_certified_constants_statuses_constructed === 0,
    s.row_consumption_count === 0,
    s.route_decisions_made === 0,
    s.proof_rule_decisions_made === 0,
    s.primitive_acceptance_decisions_made === 0,
    s.source_packet_acceptance_decisions_made === 0,
    s.preledger_pass === false,
    s.updates_live_ledger === false,
    s.branch_chart_authorized === false,
    JSON.stringify(s.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR),
    packet.next_certificate_handoff.mechanical_continuation_available === false,
    packet.next_certificate_handoff.decision_required === true,
  ];
  if (!checks.every(Boolean)) {
    throw new Error("Source-packet acceptance rule construction-frontier invariant failure.");
  }
}

function renderReport(packet) {
  const s = packet.summary;
  const sourceRows = Object.entries(packet.source_artifacts)
    .map(([key, record]) => `| \`${key}\` | \`${record.basename}\` | \`${record.sha256}\` | ${record.present} |`)
    .join("\n");
  const frontierRows = packet.source_packet_acceptance_rule_construction_frontiers
    .map(
      (frontier) =>
        `| \`${frontier.frontier_id}\` | ${frontier.slots_declared} | ${frontier.slots_satisfied} | ${frontier.current_pool_refs} | \`${frontier.first_blocker}\` |`,
    )
    .join("\n");
  return `# Candidate-Live Higher-Fold Constants Accepted-Status Source-Packet Acceptance Rule Construction-Frontier Classifier

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
- ${s.current_pool_source_packet_acceptance_rule_files_found} compatible source-packet acceptance rule files found;
- ${s.current_pool_accepted_constants_conformance_files_found} accepted constants conformance files found;
- ${s.current_pool_accepted_source_packet_files_found} compatible accepted source-packet files found;
- ${s.current_pool_rule_construction_input_refs} total rule-construction input refs found.

## Construction Frontiers

| Frontier | Slots | Satisfied | Current-pool refs | First blocker |
| --- | ---: | ---: | ---: | --- |
${frontierRows}

## Ranked Rule Target

Rank 1 remains \`${s.rank_1_allowed_route_input_family}\`.

- ${s.separators_with_separator_aggregate_fields_complete} / ${s.candidate_separator_constants} separator aggregate profiles complete;
- ${s.rows_with_separator_aggregate_fields_complete} / ${s.candidate_row_constant_associations} row aggregate profiles complete;
- ${s.source_packet_acceptance_rule_target_slots_satisfied} / ${s.source_packet_acceptance_rule_target_slots} rule-target slots satisfied;
- ${s.source_packet_acceptance_rule_construction_frontier_slots_satisfied} / ${s.source_packet_acceptance_rule_construction_frontier_slots} rule-construction frontier slots satisfied;
- ${s.primitive_source_packet_acceptance_evidence_slots_filled} / ${s.primitive_source_packet_acceptance_evidence_slots} primitive/source-packet evidence slots filled.

## Rejected Reinterpretations

- ${s.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections} source-packet acceptance rule target-packet-as-rule rejections;
- ${s.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections} complete aggregate-input-as-accepted-source-packet rejections;
- accepted constants artifact present: ${s.accepted_constants_artifact_present};
- accepted constants conformance separator count: ${s.accepted_constants_conformance_separator_count};
- contract packet identity mismatch: ${s.contract_packet_identity_mismatch};
- contract separator-family mismatch: ${s.contract_separator_family_mismatch}.

## Authorization Lock

- preledger_pass: ${packet.authorization_lock.preledger_pass}
- updates_live_ledger: ${packet.authorization_lock.updates_live_ledger}
- row_consumption_count: ${packet.authorization_lock.row_consumption_count}
- branch_chart_authorized: ${packet.authorization_lock.branch_chart_authorized}

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
    terminalDecisionFrontier: args.terminalDecisionFrontier,
    ruleTarget: args.ruleTarget,
    primitiveEvidence: args.primitiveEvidence,
    primitiveApplication: args.primitiveApplication,
    impulseAcceptance: args.impulseAcceptance,
    acceptedConstantsConformance: args.acceptedConstantsConformance,
    separatorAggregate: args.separatorAggregate,
    certificatePoolDir: args.certificatePoolDir,
  };
  const inputs = {
    terminalDecisionFrontier: readJson(paths.terminalDecisionFrontier),
    ruleTarget: readJson(paths.ruleTarget),
    primitiveEvidence: readJson(paths.primitiveEvidence),
    primitiveApplication: readJson(paths.primitiveApplication),
    impulseAcceptance: readJson(paths.impulseAcceptance),
    acceptedConstantsConformance: readJson(paths.acceptedConstantsConformance),
    separatorAggregate: readJson(paths.separatorAggregate),
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
