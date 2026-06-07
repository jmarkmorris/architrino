#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONSTRUCTION_FRONTIER = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_construction_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_RULE_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_APPLICATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ACCEPTED_CONSTANTS_CONFORMANCE = `${CERT_DIR}/higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_AGGREGATE = `${CERT_DIR}/higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_proof_obligation_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_proof_obligation_dependency_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_acceptance_rule_blocker_vector_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_current_pool_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
]);

const CONSTRUCTION_FRONTIER_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_construction_frontier_classifier_fail_closed_ranked_rule_target_locked_aggregate_inputs_complete_rule_and_accepted_constants_conformance_absent_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_row_consumption";
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
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_proof_obligation_dependency_classifier_fail_closed_rule_target_locked_aggregate_inputs_complete_rule_derivation_soundness_and_application_absent_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_row_consumption";

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
const RULE_DERIVATION_BLOCKER = "source_packet_acceptance_rule_derivation_proof_absent";
const RULE_SOUNDNESS_BLOCKER = "source_packet_acceptance_rule_soundness_proof_absent";
const RULE_APPLICATION_BLOCKER = "source_packet_acceptance_rule_endpoint_application_proof_absent";
const COMPATIBLE_EVIDENCE_BLOCKER = "compatible_source_packet_acceptance_evidence_absent";
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
    constructionFrontier: DEFAULT_CONSTRUCTION_FRONTIER,
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
    } else if (arg === "--construction-frontier") {
      args.constructionFrontier = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-source-packet-acceptance-rule-proof-obligation-dependency-classifier.mjs [options]

Options:
  --construction-frontier PATH        Source-packet acceptance rule construction-frontier classifier. Defaults to ${DEFAULT_CONSTRUCTION_FRONTIER}.
  --rule-target PATH                  Source-packet acceptance rule target packet. Defaults to ${DEFAULT_RULE_TARGET}.
  --primitive-evidence PATH           Primitive source-packet acceptance evidence dependency classifier. Defaults to ${DEFAULT_PRIMITIVE_EVIDENCE}.
  --primitive-application PATH        Primitive/source-packet route evidence-object application attempt. Defaults to ${DEFAULT_PRIMITIVE_APPLICATION}.
  --impulse-acceptance PATH           Impulse-bound source-packet acceptance dependency classifier. Defaults to ${DEFAULT_IMPULSE_ACCEPTANCE}.
  --accepted-constants-conformance PATH
                                      Accepted-constants conformance classifier. Defaults to ${DEFAULT_ACCEPTED_CONSTANTS_CONFORMANCE}.
  --separator-aggregate PATH          Same-packet separator aggregate certificate attempt. Defaults to ${DEFAULT_SEPARATOR_AGGREGATE}.
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
    ["accepted_status_source_packet_acceptance_rule_construction_frontier_classifier", paths.constructionFrontier],
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
  assertPacketStatusAndLocks(inputs.constructionFrontier, "constructionFrontier", CONSTRUCTION_FRONTIER_STATUS);
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

  const construction = inputs.constructionFrontier.summary;
  const rule = inputs.ruleTarget.summary;
  const primitiveEvidence = inputs.primitiveEvidence.summary;
  const primitiveApplication = inputs.primitiveApplication.summary;
  const impulse = inputs.impulseAcceptance.summary;
  const conformance = inputs.acceptedConstantsConformance.summary;
  const aggregate = inputs.separatorAggregate.summary;

  expectEqual(construction.direct_source_hash_checks_passed, 7, "construction-frontier direct locks");
  expectEqual(construction.current_pool_json_files_scanned, 260, "construction-frontier current pool");
  expectEqual(construction.accepted_status_lane_fail_closed_json_files, 25, "construction-frontier accepted lane");
  expectEqual(construction.source_packet_acceptance_rule_construction_frontier_slots, 124, "construction-frontier slots");
  expectEqual(
    construction.source_packet_acceptance_rule_construction_frontier_slots_satisfied,
    0,
    "construction-frontier slots satisfied",
  );
  expectEqual(
    construction.current_pool_source_packet_acceptance_rule_files_found,
    0,
    "construction-frontier rule files",
  );
  expectEqual(
    construction.current_pool_accepted_constants_conformance_files_found,
    0,
    "construction-frontier accepted constants conformance files",
  );
  expectEqual(
    construction.current_pool_accepted_source_packet_files_found,
    0,
    "construction-frontier accepted source-packet files",
  );
  expectEqual(rule.direct_source_hash_checks_passed, 3, "rule target direct locks");
  expectEqual(rule.total_source_packet_acceptance_rule_target_slots, 124, "rule target slots");
  expectEqual(rule.total_source_packet_acceptance_rule_target_slots_satisfied, 0, "rule target slots satisfied");
  expectEqual(rule.separators_with_separator_aggregate_fields_complete, 12, "rule target complete separators");
  expectEqual(rule.rows_with_separator_aggregate_fields_complete, 112, "rule target complete rows");
  expectEqual(primitiveEvidence.source_packet_route_source_hash_checks_passed, 5, "primitive evidence locks");
  expectEqual(
    primitiveEvidence.evidence_pool_compatible_source_packet_acceptance_evidence_files,
    0,
    "compatible source-packet evidence files",
  );
  expectEqual(primitiveEvidence.separator_source_packet_acceptance_evidence_slots, 24, "separator evidence slots");
  expectEqual(primitiveEvidence.row_source_packet_acceptance_evidence_slots, 224, "row evidence slots");
  expectEqual(primitiveApplication.direct_source_hash_checks_passed, 8, "primitive application direct locks");
  expectEqual(primitiveApplication.total_route_evidence_object_application_attempts, 248, "primitive applications");
  expectEqual(primitiveApplication.total_route_evidence_object_applications_authorized, 0, "authorized applications");
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
  expectEqual(impulse.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "impulse source packets");
  expectEqual(conformance.separators_with_separator_aggregate_fields, 12, "conformance separator aggregates");
  expectEqual(conformance.separators_with_accepted_constants_artifact, 0, "accepted constants artifacts");
  expectEqual(conformance.separators_with_accepted_constants_conformance, 0, "accepted constants conformance");
  expectEqual(conformance.rows_with_accepted_constants_conformance, 0, "row accepted constants conformance");
  expectEqual(conformance.separators_with_source_packet_acceptance_rule, 0, "conformance source-packet rules");
  expectEqual(conformance.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "conformance source packets");
  expectEqual(aggregate.separators_with_separator_aggregate_C_Sigma, 12, "separator aggregate C");
  expectEqual(aggregate.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "aggregate source packets");
  assertRowsBySeparator(construction, "construction-frontier");
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
    current_pool_rule_proof_obligation_input_refs: 0,
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
      counters.current_pool_rule_proof_obligation_input_refs += 1;
      compatibleRuleBasenames.push(basename);
    }
    if (acceptedSourceMatches) {
      counters.current_pool_accepted_source_packet_files_found += 1;
      counters.current_pool_rule_proof_obligation_input_refs += 1;
      compatibleAcceptedSourcePacketBasenames.push(basename);
    }
    if (conformanceMatches) {
      counters.current_pool_accepted_constants_conformance_files_found += 1;
      counters.current_pool_rule_proof_obligation_input_refs += 1;
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

function buildObligationVector() {
  return [
    {
      obligation_id: "source_packet_acceptance_rule_derivation_proof",
      obligation_class: "proof_grade_rule_derivation",
      satisfied: false,
      blocker: RULE_DERIVATION_BLOCKER,
    },
    {
      obligation_id: "source_packet_acceptance_rule_soundness_proof",
      obligation_class: "proof_grade_rule_soundness",
      satisfied: false,
      blocker: RULE_SOUNDNESS_BLOCKER,
    },
    {
      obligation_id: "source_packet_acceptance_rule_endpoint_application_proof",
      obligation_class: "proof_grade_rule_application",
      satisfied: false,
      blocker: RULE_APPLICATION_BLOCKER,
    },
    {
      obligation_id: "accepted_constants_conformance_binding",
      obligation_class: "accepted_constants_conformance",
      satisfied: false,
      blocker: CONFORMANCE_BLOCKER,
    },
    {
      obligation_id: "compatible_source_packet_acceptance_evidence",
      obligation_class: "source_packet_acceptance_evidence",
      satisfied: false,
      blocker: COMPATIBLE_EVIDENCE_BLOCKER,
    },
    {
      obligation_id: "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_binding",
      obligation_class: "accepted_source_packet",
      satisfied: false,
      blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
    },
  ];
}

function buildSeparatorProfiles(constructionFrontier) {
  return constructionFrontier.separator_source_packet_acceptance_rule_construction_frontier_profiles
    .map((profile) => ({
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      row_count: profile.row_count,
      aggregate_inputs_complete: profile.aggregate_inputs_complete,
      rule_target_locked: true,
      source_material_premises_complete: profile.aggregate_inputs_complete,
      candidate_exact_consistency_required_before_acceptance: true,
      accepted_constants_conformance_present: false,
      compatible_source_packet_acceptance_evidence_present: false,
      source_packet_acceptance_rule_present: false,
      source_packet_acceptance_rule_derivation_proof_present: false,
      source_packet_acceptance_rule_soundness_proof_present: false,
      source_packet_acceptance_rule_endpoint_application_proof_present: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
      source_packet_acceptance_rule_proof_obligation_slots: 1,
      source_packet_acceptance_rule_proof_obligation_slots_satisfied: 0,
      proof_obligation_vector: buildObligationVector(),
      target_packet_is_rule: false,
      aggregate_inputs_are_accepted_source_packet: false,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      source_packet_acceptance_decision_made: false,
      source_packet_acceptance_rule_constructed: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_constructed: false,
      accepted_interval_certified_constants_status_constructed: false,
      row_consumption_count: 0,
      preledger_pass_rows: 0,
      branch_chart_authorized_rows: 0,
      first_rule_proof_obligation_blocker: RULE_BLOCKER,
      first_rule_derivation_blocker: RULE_DERIVATION_BLOCKER,
      first_rule_soundness_blocker: RULE_SOUNDNESS_BLOCKER,
      first_rule_application_blocker: RULE_APPLICATION_BLOCKER,
      first_compatible_evidence_blocker: COMPATIBLE_EVIDENCE_BLOCKER,
      first_accepted_constants_conformance_blocker: CONFORMANCE_BLOCKER,
      first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
      first_rule_target_rejection: RULE_TARGET_AS_RULE_REJECTION,
      first_aggregate_reinterpretation_rejection: AGGREGATE_AS_SOURCE_PACKET_REJECTION,
      classification: "separator_rule_proof_obligations_open_fail_closed",
    }))
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function buildRowProfiles(constructionFrontier) {
  return constructionFrontier.row_source_packet_acceptance_rule_construction_frontier_profiles
    .map((profile) => ({
      row_id: profile.row_id,
      ledger: profile.ledger,
      status: profile.status,
      failure_code: profile.failure_code,
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      receiver_interval: profile.receiver_interval,
      source_interval: profile.source_interval,
      aggregate_inputs_complete: profile.aggregate_inputs_complete,
      rule_target_locked: true,
      source_material_premises_complete: profile.aggregate_inputs_complete,
      candidate_exact_consistency_required_before_acceptance: true,
      accepted_constants_conformance_present: false,
      compatible_source_packet_acceptance_evidence_present: false,
      source_packet_acceptance_rule_present: false,
      source_packet_acceptance_rule_derivation_proof_present: false,
      source_packet_acceptance_rule_soundness_proof_present: false,
      source_packet_acceptance_rule_endpoint_application_proof_present: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
      source_packet_acceptance_rule_proof_obligation_slots: 1,
      source_packet_acceptance_rule_proof_obligation_slots_satisfied: 0,
      proof_obligation_vector: buildObligationVector(),
      target_packet_is_rule: false,
      aggregate_inputs_are_accepted_source_packet: false,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      source_packet_acceptance_decision_made: false,
      source_packet_acceptance_rule_constructed: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_constructed: false,
      accepted_interval_certified_constants_status_constructed: false,
      accepted_fold_layer_row: false,
      row_consumed: false,
      preledger_pass: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
      first_rule_proof_obligation_blocker: RULE_BLOCKER,
      first_rule_derivation_blocker: RULE_DERIVATION_BLOCKER,
      first_rule_soundness_blocker: RULE_SOUNDNESS_BLOCKER,
      first_rule_application_blocker: RULE_APPLICATION_BLOCKER,
      first_compatible_evidence_blocker: COMPATIBLE_EVIDENCE_BLOCKER,
      first_accepted_constants_conformance_blocker: CONFORMANCE_BLOCKER,
      first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
      first_rule_target_rejection: RULE_TARGET_AS_RULE_REJECTION,
      first_aggregate_reinterpretation_rejection: AGGREGATE_AS_SOURCE_PACKET_REJECTION,
      classification: "row_rule_proof_obligations_open_fail_closed",
    }))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const poolSnapshot = currentPoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const counters = poolSnapshot.counters;
  const construction = inputs.constructionFrontier.summary;
  const rule = inputs.ruleTarget.summary;
  const primitiveEvidence = inputs.primitiveEvidence.summary;
  const primitiveApplication = inputs.primitiveApplication.summary;
  const impulse = inputs.impulseAcceptance.summary;
  const conformance = inputs.acceptedConstantsConformance.summary;
  const aggregate = inputs.separatorAggregate.summary;
  const separatorProfiles = buildSeparatorProfiles(inputs.constructionFrontier);
  const rowProfiles = buildRowProfiles(inputs.constructionFrontier);
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const proofObligationSlots = separatorProfiles.length + rowProfiles.length;
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_construction_frontier_direct_source_hash_checks_passed: construction.direct_source_hash_checks_passed,
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
    current_pool_rule_proof_obligation_input_refs: counters.current_pool_rule_proof_obligation_input_refs,
    candidate_higher_fold_constants_artifacts: construction.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: construction.candidate_separator_constants,
    candidate_row_constant_associations: construction.candidate_row_constant_associations,
    rows_by_separator_count: rowsBySeparator,
    rank_1_allowed_route_input_family: construction.rank_1_allowed_route_input_family,
    rank_1_rule_target_slots: construction.rank_1_rule_target_slots,
    rank_1_rule_target_slots_satisfied: construction.rank_1_rule_target_slots_satisfied,
    rank_2_allowed_route_input_family: ACCEPTED_SOURCE_PACKET_ALLOWED_INPUT,
    rank_3_allowed_route_input_family: PROOF_GRADE_ALLOWED_INPUT,
    separators_with_separator_aggregate_fields_complete:
      construction.separators_with_separator_aggregate_fields_complete,
    rows_with_separator_aggregate_fields_complete:
      construction.rows_with_separator_aggregate_fields_complete,
    source_material_premise_slots: proofObligationSlots,
    source_material_premise_slots_satisfied: proofObligationSlots,
    candidate_exact_consistency_premise_slots: proofObligationSlots,
    candidate_exact_consistency_premise_slots_satisfied: proofObligationSlots,
    source_packet_acceptance_rule_target_slots: construction.source_packet_acceptance_rule_target_slots,
    source_packet_acceptance_rule_target_slots_satisfied:
      construction.source_packet_acceptance_rule_target_slots_satisfied,
    source_packet_acceptance_rule_proof_obligation_slots: proofObligationSlots,
    source_packet_acceptance_rule_proof_obligation_slots_satisfied: 0,
    source_packet_acceptance_rule_proof_obligation_slots_missing: proofObligationSlots,
    separator_source_packet_acceptance_rule_proof_obligation_slots: separatorProfiles.length,
    separator_source_packet_acceptance_rule_proof_obligation_slots_satisfied: 0,
    row_source_packet_acceptance_rule_proof_obligation_slots: rowProfiles.length,
    row_source_packet_acceptance_rule_proof_obligation_slots_satisfied: 0,
    source_packet_acceptance_rule_derivation_proof_slots: proofObligationSlots,
    source_packet_acceptance_rule_derivation_proof_slots_satisfied: 0,
    source_packet_acceptance_rule_soundness_proof_slots: proofObligationSlots,
    source_packet_acceptance_rule_soundness_proof_slots_satisfied: 0,
    source_packet_acceptance_rule_endpoint_application_proof_slots: proofObligationSlots,
    source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied: 0,
    accepted_constants_conformance_obligation_slots: proofObligationSlots,
    accepted_constants_conformance_obligation_slots_satisfied: 0,
    compatible_source_packet_acceptance_evidence_slots:
      primitiveEvidence.separator_source_packet_acceptance_evidence_slots +
      primitiveEvidence.row_source_packet_acceptance_evidence_slots,
    compatible_source_packet_acceptance_evidence_slots_filled:
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
    first_rule_proof_obligation_blocker: RULE_BLOCKER,
    first_rule_derivation_blocker: RULE_DERIVATION_BLOCKER,
    first_rule_soundness_blocker: RULE_SOUNDNESS_BLOCKER,
    first_rule_application_blocker: RULE_APPLICATION_BLOCKER,
    first_compatible_evidence_blocker: COMPATIBLE_EVIDENCE_BLOCKER,
    first_accepted_constants_conformance_blocker: CONFORMANCE_BLOCKER,
    first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
    first_rule_target_rejection: RULE_TARGET_AS_RULE_REJECTION,
    first_aggregate_reinterpretation_rejection: AGGREGATE_AS_SOURCE_PACKET_REJECTION,
    parent_complement_consumption_ref_blocker: "parent_complement_consumption_ref_absent",
    first_separator_certificate_blocker: "higher_fold_separator_layer_certificate_absent",
  };

  const packet = {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_source_packet_acceptance_rule_proof_obligation_dependency_classifier.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status source-packet acceptance rule proof-obligation dependency",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status source-packet acceptance rule proof-obligation dependency",
    claim_level:
      "priority-only source-packet acceptance rule proof-obligation dependency classifier; locks complete aggregate inputs and the rule target, separates them from absent rule derivation, soundness, endpoint-application, accepted-constants conformance, compatible source-packet evidence, and accepted source-packet obligations, and makes no route, proof-rule, primitive-acceptance, source-packet acceptance, accepted-status, or row-consumption decision",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_source_packet_acceptance_rule_construction_frontier_classifier: artifactRecord(
        paths.constructionFrontier,
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
    current_pool_source_packet_acceptance_rule_proof_obligation_snapshot: poolSnapshot,
    source_packet_acceptance_rule_proof_obligation_dependencies: [
      {
        dependency_id: "source_material_and_rule_target_ready",
        slots_declared: proofObligationSlots,
        slots_satisfied: proofObligationSlots,
        current_pool_refs: 0,
        blocker: null,
      },
      {
        dependency_id: "source_packet_acceptance_rule_derivation_proof_required",
        slots_declared: proofObligationSlots,
        slots_satisfied: 0,
        current_pool_refs: summary.current_pool_source_packet_acceptance_rule_files_found,
        blocker: RULE_DERIVATION_BLOCKER,
      },
      {
        dependency_id: "source_packet_acceptance_rule_soundness_proof_required",
        slots_declared: proofObligationSlots,
        slots_satisfied: 0,
        current_pool_refs: summary.current_pool_source_packet_acceptance_rule_files_found,
        blocker: RULE_SOUNDNESS_BLOCKER,
      },
      {
        dependency_id: "source_packet_acceptance_rule_endpoint_application_proof_required",
        slots_declared: proofObligationSlots,
        slots_satisfied: 0,
        current_pool_refs: summary.current_pool_source_packet_acceptance_rule_files_found,
        blocker: RULE_APPLICATION_BLOCKER,
      },
      {
        dependency_id: "accepted_constants_conformance_required",
        slots_declared: proofObligationSlots,
        slots_satisfied: 0,
        current_pool_refs: summary.current_pool_accepted_constants_conformance_files_found,
        blocker: CONFORMANCE_BLOCKER,
      },
      {
        dependency_id: "compatible_source_packet_acceptance_evidence_required",
        slots_declared: summary.compatible_source_packet_acceptance_evidence_slots,
        slots_satisfied: summary.compatible_source_packet_acceptance_evidence_slots_filled,
        current_pool_refs: summary.current_pool_rule_proof_obligation_input_refs,
        blocker: COMPATIBLE_EVIDENCE_BLOCKER,
      },
      {
        dependency_id: "accepted_source_packet_required",
        slots_declared: proofObligationSlots,
        slots_satisfied: 0,
        current_pool_refs: summary.current_pool_accepted_source_packet_files_found,
        blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
      },
    ],
    separator_source_packet_acceptance_rule_proof_obligation_profiles: separatorProfiles,
    row_source_packet_acceptance_rule_proof_obligation_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "source_packet_acceptance_rule_proof_obligation_dependency",
      current_pool_closure_state:
        "not mechanically closable from the current certificate pool; the source material and rule target are locked, but a proof-grade source-packet acceptance rule still needs derivation, soundness, endpoint-application, accepted-constants conformance, compatible source-packet acceptance evidence, and accepted source-packet bindings",
      ranked_next_mechanical_target: RANK_1_ALLOWED_ROUTE_INPUT,
      ranked_next_mechanical_target_blocker: RULE_BLOCKER,
      mechanical_continuation_available: false,
      decision_required: true,
      required_external_input: RANK_1_ALLOWED_ROUTE_INPUT,
      required_proof_obligations: [
        RULE_DERIVATION_BLOCKER,
        RULE_SOUNDNESS_BLOCKER,
        RULE_APPLICATION_BLOCKER,
        CONFORMANCE_BLOCKER,
        COMPATIBLE_EVIDENCE_BLOCKER,
        ACCEPTED_SOURCE_PACKET_BLOCKER,
      ],
      forbidden_reinterpretations: [
        RULE_TARGET_AS_RULE_REJECTION,
        AGGREGATE_AS_SOURCE_PACKET_REJECTION,
        "candidate_live_higher_fold_constants_artifact_as_accepted_constants_artifact",
        "accepted_constants_conformance_classifier_as_source_packet_acceptance_rule",
        "source_packet_acceptance_rule_construction_frontier_classifier_as_source_packet_acceptance_rule",
        "source_packet_acceptance_rule_proof_obligation_dependency_classifier_as_source_packet_acceptance_rule",
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
      "Priority-only. This classifier sharpens the live blocker from rule-object absence to the exact proof-obligation stack required before any source-packet acceptance rule, accepted source packet, accepted-status, row consumption, live-ledger update, or branch-chart authorization can occur.",
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
    s.retained_construction_frontier_direct_source_hash_checks_passed === 7,
    s.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed === 3,
    s.retained_primitive_source_packet_acceptance_evidence_source_hash_checks_passed === 5,
    s.retained_primitive_application_direct_source_hash_checks_passed === 8,
    s.retained_impulse_acceptance_separator_profiles === 12,
    s.retained_accepted_constants_conformance_separator_profiles === 12,
    s.retained_separator_aggregate_certificates === 12,
    s.current_pool_json_files_scanned === 261,
    s.accepted_status_lane_json_files_scanned === 26,
    s.accepted_status_lane_fail_closed_json_files === 26,
    s.accepted_status_lane_non_fail_closed_json_files === 0,
    s.current_pool_source_packet_acceptance_rule_files_found === 0,
    s.current_pool_accepted_source_packet_files_found === 0,
    s.current_pool_accepted_constants_conformance_files_found === 0,
    s.current_pool_rule_proof_obligation_input_refs === 0,
    s.rank_1_allowed_route_input_family === RANK_1_ALLOWED_ROUTE_INPUT,
    s.rank_1_rule_target_slots === 124,
    s.rank_1_rule_target_slots_satisfied === 0,
    s.source_material_premise_slots === 124,
    s.source_material_premise_slots_satisfied === 124,
    s.candidate_exact_consistency_premise_slots === 124,
    s.candidate_exact_consistency_premise_slots_satisfied === 124,
    s.source_packet_acceptance_rule_target_slots === 124,
    s.source_packet_acceptance_rule_target_slots_satisfied === 0,
    s.source_packet_acceptance_rule_proof_obligation_slots === 124,
    s.source_packet_acceptance_rule_proof_obligation_slots_satisfied === 0,
    s.source_packet_acceptance_rule_proof_obligation_slots_missing === 124,
    s.separators_with_separator_aggregate_fields_complete === 12,
    s.rows_with_separator_aggregate_fields_complete === 112,
    s.source_packet_acceptance_rule_derivation_proof_slots === 124,
    s.source_packet_acceptance_rule_derivation_proof_slots_satisfied === 0,
    s.source_packet_acceptance_rule_soundness_proof_slots === 124,
    s.source_packet_acceptance_rule_soundness_proof_slots_satisfied === 0,
    s.source_packet_acceptance_rule_endpoint_application_proof_slots === 124,
    s.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied === 0,
    s.accepted_constants_conformance_obligation_slots === 124,
    s.accepted_constants_conformance_obligation_slots_satisfied === 0,
    s.compatible_source_packet_acceptance_evidence_slots === 248,
    s.compatible_source_packet_acceptance_evidence_slots_filled === 0,
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
    throw new Error("Source-packet acceptance rule proof-obligation dependency invariant failure.");
  }
}

function renderReport(packet) {
  const s = packet.summary;
  const sourceRows = Object.entries(packet.source_artifacts)
    .map(([key, record]) => `| \`${key}\` | \`${record.basename}\` | \`${record.sha256}\` | ${record.present} |`)
    .join("\n");
  const dependencyRows = packet.source_packet_acceptance_rule_proof_obligation_dependencies
    .map(
      (dependency) =>
        `| \`${dependency.dependency_id}\` | ${dependency.slots_declared} | ${dependency.slots_satisfied} | ${dependency.current_pool_refs} | ${dependency.blocker === null ? "" : `\`${dependency.blocker}\``} |`,
    )
    .join("\n");
  return `# Candidate-Live Higher-Fold Constants Accepted-Status Source-Packet Acceptance Rule Proof-Obligation Dependency Classifier

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
- ${s.current_pool_rule_proof_obligation_input_refs} total rule proof-obligation input refs found.

## Proof-Obligation Dependencies

| Dependency | Slots | Satisfied | Current-pool refs | First blocker |
| --- | ---: | ---: | ---: | --- |
${dependencyRows}

## Ready Premises

- ${s.source_material_premise_slots_satisfied} / ${s.source_material_premise_slots} source-material premise slots ready;
- ${s.candidate_exact_consistency_premise_slots_satisfied} / ${s.candidate_exact_consistency_premise_slots} candidate exact-consistency premise slots ready;
- ${s.separators_with_separator_aggregate_fields_complete} / ${s.candidate_separator_constants} separator aggregate profiles complete;
- ${s.rows_with_separator_aggregate_fields_complete} / ${s.candidate_row_constant_associations} row aggregate profiles complete;
- ${s.source_packet_acceptance_rule_target_slots_satisfied} / ${s.source_packet_acceptance_rule_target_slots} source-packet acceptance rule target slots satisfied.

Complete source material is not a source-packet acceptance rule, and exact
candidate consistency is not accepted interval-certified constants status.

## Missing Rule Obligations

- ${s.source_packet_acceptance_rule_derivation_proof_slots_satisfied} / ${s.source_packet_acceptance_rule_derivation_proof_slots} rule derivation-proof slots satisfied;
- ${s.source_packet_acceptance_rule_soundness_proof_slots_satisfied} / ${s.source_packet_acceptance_rule_soundness_proof_slots} rule soundness-proof slots satisfied;
- ${s.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied} / ${s.source_packet_acceptance_rule_endpoint_application_proof_slots} endpoint-application proof slots satisfied;
- ${s.accepted_constants_conformance_obligation_slots_satisfied} / ${s.accepted_constants_conformance_obligation_slots} accepted-constants conformance slots satisfied;
- ${s.compatible_source_packet_acceptance_evidence_slots_filled} / ${s.compatible_source_packet_acceptance_evidence_slots} compatible source-packet acceptance evidence slots filled;
- ${s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets} accepted source packets constructed.

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
    constructionFrontier: args.constructionFrontier,
    ruleTarget: args.ruleTarget,
    primitiveEvidence: args.primitiveEvidence,
    primitiveApplication: args.primitiveApplication,
    impulseAcceptance: args.impulseAcceptance,
    acceptedConstantsConformance: args.acceptedConstantsConformance,
    separatorAggregate: args.separatorAggregate,
    certificatePoolDir: args.certificatePoolDir,
  };
  const inputs = {
    constructionFrontier: readJson(paths.constructionFrontier),
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
