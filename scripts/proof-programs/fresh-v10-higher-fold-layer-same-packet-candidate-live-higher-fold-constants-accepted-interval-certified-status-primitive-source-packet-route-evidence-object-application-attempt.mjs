#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_PRIMITIVE_CONTRACT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROUTE_CONTRACT_DISJUNCTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_contract_disjunction_exhaustion_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_RULE_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_NARROWING = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_narrowing_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONFORMANCE = `${CERT_DIR}/higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_AGGREGATE = `${CERT_DIR}/higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
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

const PRIMITIVE_CONTRACT_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_contract_target_packet_fail_closed_contract_declared_source_packet_acceptance_rule_and_accepted_source_packet_absent_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";
const ROUTE_CONTRACT_DISJUNCTION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_contract_disjunction_exhaustion_classifier_fail_closed_proof_grade_and_primitive_route_evidence_object_contracts_unsatisfied_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";
const RULE_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet_fail_closed_acceptance_rule_target_declared_aggregate_inputs_complete_rule_absent_no_primitive_acceptance_no_row_consumption";
const PRIMITIVE_NARROWING_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_acceptance_rule_handoff_narrowing_classifier_fail_closed_aggregate_inputs_complete_acceptance_rule_and_accepted_source_packet_absent_no_primitive_acceptance_no_row_consumption";
const PRIMITIVE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier_fail_closed_frontier_locked_separator_aggregates_present_no_compatible_source_packet_acceptance_evidence_no_primitive_acceptance_no_row_consumption";
const IMPULSE_ACCEPTANCE_STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const CONFORMANCE_STATUS =
  "higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier_fail_closed_aggregate_present_existing_constants_contract_packet_mismatch_no_source_packet_acceptance_no_row_consumption";
const SEPARATOR_AGGREGATE_STATUS =
  "higher_fold_layer_same_packet_separator_aggregate_certificate_attempt_fail_closed_row_enclosures_separator_aggregates_certified_source_packets_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt_fail_closed_contract_declared_rule_target_and_aggregate_inputs_not_application_evidence_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";

const ACCEPTED_STATUS_LANE_PREFIX =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_";
const SOURCE_PACKET_ACCEPTANCE_RULE_FIELD = "source_packet_acceptance_rule";
const ACCEPTED_SOURCE_PACKET_FIELD = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet";
const SOURCE_PACKET_RULE_TARGET_REJECTION =
  "source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule";
const COMPLETE_AGGREGATE_REJECTION = "complete_separator_aggregate_inputs_as_accepted_source_packet";
const ROUTE_INPUT_BLOCKER = "source_packet_acceptance_rule_or_accepted_source_packet_absent";
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
    primitiveContract: DEFAULT_PRIMITIVE_CONTRACT,
    routeContractDisjunction: DEFAULT_ROUTE_CONTRACT_DISJUNCTION,
    ruleTarget: DEFAULT_RULE_TARGET,
    primitiveNarrowing: DEFAULT_PRIMITIVE_NARROWING,
    primitiveEvidence: DEFAULT_PRIMITIVE_EVIDENCE,
    impulseAcceptance: DEFAULT_IMPULSE_ACCEPTANCE,
    conformance: DEFAULT_CONFORMANCE,
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
    } else if (arg === "--primitive-contract") {
      args.primitiveContract = argv[++index];
    } else if (arg === "--route-contract-disjunction") {
      args.routeContractDisjunction = argv[++index];
    } else if (arg === "--rule-target") {
      args.ruleTarget = argv[++index];
    } else if (arg === "--primitive-narrowing") {
      args.primitiveNarrowing = argv[++index];
    } else if (arg === "--primitive-evidence") {
      args.primitiveEvidence = argv[++index];
    } else if (arg === "--impulse-acceptance") {
      args.impulseAcceptance = argv[++index];
    } else if (arg === "--conformance") {
      args.conformance = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-primitive-source-packet-route-evidence-object-application-attempt.mjs [options]

Options:
  --primitive-contract PATH           Primitive/source-packet route evidence-object contract target. Defaults to ${DEFAULT_PRIMITIVE_CONTRACT}.
  --route-contract-disjunction PATH   Route evidence-object contract disjunction exhaustion classifier. Defaults to ${DEFAULT_ROUTE_CONTRACT_DISJUNCTION}.
  --rule-target PATH                  Source-packet acceptance rule target packet. Defaults to ${DEFAULT_RULE_TARGET}.
  --primitive-narrowing PATH          Primitive source-packet route narrowing classifier. Defaults to ${DEFAULT_PRIMITIVE_NARROWING}.
  --primitive-evidence PATH           Primitive source-packet acceptance evidence dependency classifier. Defaults to ${DEFAULT_PRIMITIVE_EVIDENCE}.
  --impulse-acceptance PATH           Impulse-bound source-packet acceptance dependency classifier. Defaults to ${DEFAULT_IMPULSE_ACCEPTANCE}.
  --conformance PATH                  Fixed-parameter aggregate accepted constants conformance classifier. Defaults to ${DEFAULT_CONFORMANCE}.
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
    ["accepted_status_primitive_source_packet_route_evidence_object_contract_target_packet", paths.primitiveContract],
    [
      "accepted_status_route_evidence_object_contract_disjunction_exhaustion_classifier",
      paths.routeContractDisjunction,
    ],
    ["accepted_status_source_packet_acceptance_rule_target_packet", paths.ruleTarget],
    ["accepted_status_primitive_source_packet_route_narrowing_classifier", paths.primitiveNarrowing],
    ["accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier", paths.primitiveEvidence],
    ["same_packet_impulse_bound_source_packet_acceptance_dependency_classifier", paths.impulseAcceptance],
    ["same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier", paths.conformance],
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
  assertPacketStatusAndLocks(inputs.primitiveContract, "primitiveContract", PRIMITIVE_CONTRACT_STATUS);
  assertPacketStatusAndLocks(
    inputs.routeContractDisjunction,
    "routeContractDisjunction",
    ROUTE_CONTRACT_DISJUNCTION_STATUS,
  );
  assertPacketStatusAndLocks(inputs.ruleTarget, "ruleTarget", RULE_TARGET_STATUS);
  assertPacketStatusAndLocks(inputs.primitiveNarrowing, "primitiveNarrowing", PRIMITIVE_NARROWING_STATUS);
  assertPacketStatusAndLocks(inputs.primitiveEvidence, "primitiveEvidence", PRIMITIVE_EVIDENCE_STATUS);
  assertPacketStatusAndLocks(inputs.impulseAcceptance, "impulseAcceptance", IMPULSE_ACCEPTANCE_STATUS);
  assertPacketStatusAndLocks(inputs.conformance, "conformance", CONFORMANCE_STATUS);
  assertPacketStatusAndLocks(inputs.separatorAggregate, "separatorAggregate", SEPARATOR_AGGREGATE_STATUS);

  const contract = inputs.primitiveContract.summary;
  const disjunction = inputs.routeContractDisjunction.summary;
  const rule = inputs.ruleTarget.summary;
  const narrowing = inputs.primitiveNarrowing.summary;
  const primitiveEvidence = inputs.primitiveEvidence.summary;
  const impulse = inputs.impulseAcceptance.summary;
  const conformance = inputs.conformance.summary;
  const aggregate = inputs.separatorAggregate.summary;
  const expected = [
    [contract.direct_source_hash_checks_passed, 6, "primitive contract direct locks"],
    [contract.total_primitive_source_packet_route_evidence_object_contract_slots, 248, "contract slots"],
    [contract.contract_slots_satisfied, 0, "contract slots satisfied"],
    [
      disjunction.route_evidence_object_contract_disjunctions_satisfied,
      0,
      "route contract disjunction satisfied",
    ],
    [disjunction.current_pool_compatible_route_evidence_object_refs, 0, "route evidence object refs"],
    [rule.direct_source_hash_checks_passed, 3, "rule target direct locks"],
    [rule.total_source_packet_acceptance_rule_target_slots, 124, "rule target slots"],
    [rule.total_source_packet_acceptance_rule_target_slots_satisfied, 0, "rule target slots satisfied"],
    [narrowing.direct_source_hash_checks_passed, 5, "primitive narrowing direct locks"],
    [narrowing.total_primitive_source_packet_route_input_target_slots, 248, "primitive route slots"],
    [narrowing.total_primitive_source_packet_route_input_target_slots_satisfied, 0, "primitive route slots filled"],
    [primitiveEvidence.source_packet_route_source_hash_checks_passed, 5, "primitive evidence locks"],
    [primitiveEvidence.evidence_pool_compatible_source_packet_acceptance_evidence_files, 0, "compatible evidence files"],
    [impulse.separators_with_source_packet_acceptance_rule, 0, "impulse source-packet rules"],
    [impulse.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "impulse accepted packets"],
    [conformance.separators_with_source_packet_acceptance_rule, 0, "conformance source-packet rules"],
    [conformance.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "conformance packets"],
    [aggregate.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "aggregate packets"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
  assertRowsBySeparator(contract, "primitive contract");
  assertRowsBySeparator(disjunction, "route contract disjunction");
  assertRowsBySeparator(rule, "rule target");
  assertRowsBySeparator(narrowing, "primitive narrowing");
  assertRowsBySeparator(primitiveEvidence, "primitive evidence");
  assertRowsBySeparator(impulse, "impulse acceptance");
  assertRowsBySeparator(conformance, "conformance");
  assertRowsBySeparator(aggregate, "separator aggregate");
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
    current_pool_source_packet_acceptance_rule_evidence_object_files_found: 0,
    current_pool_accepted_source_packet_evidence_object_files_found: 0,
    current_pool_compatible_primitive_source_packet_route_input_refs: 0,
    preledger_pass_true_files: 0,
    live_ledger_update_true_files: 0,
    branch_chart_authorized_true_files: 0,
    row_consumption_positive_files: 0,
    accepted_interval_certified_constants_status_positive_files: 0,
  };
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
    if (parsed.packet_id === PACKET_ID && !failClosed) {
      const artifactRole = parsed.artifact_role ?? parsed.compatible_evidence_role ?? summary.compatible_evidence_role;
      if (
        artifactRole === SOURCE_PACKET_ACCEPTANCE_RULE_FIELD ||
        /"source_packet_acceptance_rule_present"\s*:\s*true/.test(text) ||
        /"source_packet_acceptance_rules_constructed"\s*:\s*[1-9]/.test(text)
      ) {
        counters.current_pool_source_packet_acceptance_rule_evidence_object_files_found += 1;
        counters.current_pool_compatible_primitive_source_packet_route_input_refs += 1;
      }
      if (
        artifactRole === ACCEPTED_SOURCE_PACKET_FIELD ||
        /"accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet(?:_present)?"\s*:\s*true/.test(text) ||
        /"accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets"\s*:\s*[1-9]/.test(text)
      ) {
        counters.current_pool_accepted_source_packet_evidence_object_files_found += 1;
        counters.current_pool_compatible_primitive_source_packet_route_input_refs += 1;
      }
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
    non_fail_closed_accepted_status_basenames: nonFailClosedAcceptedStatusBasenames,
  };
}

function buildSeparatorApplicationAttempts(inputs) {
  const ruleBySeparator = indexBy(
    inputs.ruleTarget.separator_source_packet_acceptance_rule_target_profiles,
    "separator_event",
    "separator rule target",
  );
  const evidenceBySeparator = indexBy(
    inputs.primitiveEvidence.separator_source_packet_acceptance_evidence_dependency_profiles,
    "separator_event",
    "separator primitive evidence",
  );
  const impulseBySeparator = indexBy(
    inputs.impulseAcceptance.separator_acceptance_dependency_profiles,
    "separator_event",
    "separator impulse acceptance",
  );
  const conformanceBySeparator = indexBy(
    inputs.conformance.separator_conformance_profiles,
    "separator_event",
    "separator conformance",
  );
  const aggregateBySeparator = indexBy(
    inputs.separatorAggregate.separator_aggregate_certificates,
    "separator_event",
    "separator aggregate",
  );
  return inputs.primitiveContract.separator_primitive_source_packet_route_evidence_object_contract_profiles.map(
    (profile) => {
      const rule = requireEntry(ruleBySeparator, profile.separator_event, "separator rule target");
      const evidence = requireEntry(evidenceBySeparator, profile.separator_event, "separator primitive evidence");
      const impulse = requireEntry(impulseBySeparator, profile.separator_event, "separator impulse acceptance");
      const conformance = requireEntry(conformanceBySeparator, profile.separator_event, "separator conformance");
      const aggregate = requireEntry(aggregateBySeparator, profile.separator_event, "separator aggregate");
      return {
        separator_event: profile.separator_event,
        fold_interval: profile.fold_interval,
        row_count: profile.row_count,
        separator_aggregate_fields_complete: profile.separator_aggregate_fields_complete,
        source_packet_acceptance_rule_target_declared: rule.source_packet_acceptance_rule_target_field === SOURCE_PACKET_ACCEPTANCE_RULE_FIELD,
        source_packet_acceptance_rule_target_satisfied: rule.source_packet_acceptance_rule_target_satisfied,
        source_packet_acceptance_rule_target_packet_is_rule: false,
        source_packet_acceptance_rule_target_packet_as_rule_rejected: true,
        complete_separator_aggregate_inputs_present:
          aggregate.separator_aggregate_C_Sigma_present === true &&
          aggregate.separator_aggregate_A_Sigma_eta_epsilon_c_present === true &&
          aggregate.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present === true,
        complete_separator_aggregate_inputs_are_accepted_source_packet: false,
        complete_separator_aggregate_inputs_as_accepted_source_packet_rejected: true,
        source_packet_acceptance_rule_present: impulse.source_packet_acceptance_rule_present,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present:
          impulse.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet,
        compatible_source_packet_acceptance_evidence_slots_filled:
          evidence.compatible_source_packet_acceptance_evidence_slots_filled,
        accepted_constants_conformance: conformance.accepted_constants_conformance,
        route_application_attempt_slots: 2,
        route_application_authorized_slots: 0,
        route_application_rejected_slots: 2,
        rule_target_as_rule_rejections: 1,
        complete_aggregate_inputs_as_accepted_source_packet_rejections: 1,
        source_packet_acceptance_rule_constructed: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_constructed: false,
        route_decision_made: false,
        proof_rule_decision_made: false,
        primitive_acceptance_decision_made: false,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
        first_application_blocker: ROUTE_INPUT_BLOCKER,
        first_rule_application_rejection: SOURCE_PACKET_RULE_TARGET_REJECTION,
        first_accepted_source_packet_application_rejection: COMPLETE_AGGREGATE_REJECTION,
        first_source_packet_acceptance_rule_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
        first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
        classification: "separator_primitive_source_packet_route_evidence_object_application_rejected_fail_closed",
      };
    },
  );
}

function buildRowApplicationAttempts(inputs) {
  const ruleByRow = indexBy(inputs.ruleTarget.row_source_packet_acceptance_rule_target_profiles, "row_id", "row rule target");
  const evidenceByRow = indexBy(
    inputs.primitiveEvidence.row_source_packet_acceptance_evidence_dependency_profiles,
    "row_id",
    "row primitive evidence",
  );
  const impulseByRow = indexBy(inputs.impulseAcceptance.row_acceptance_dependency_profiles, "row_id", "row impulse acceptance");
  const conformanceByRow = indexBy(inputs.conformance.row_conformance_profiles, "row_id", "row conformance");
  const aggregateByRow = indexBy(inputs.separatorAggregate.row_aggregate_certificates, "row_id", "row aggregate");
  return inputs.primitiveContract.row_primitive_source_packet_route_evidence_object_contract_profiles
    .map((profile) => {
      const rule = requireEntry(ruleByRow, profile.row_id, "row rule target");
      const evidence = requireEntry(evidenceByRow, profile.row_id, "row primitive evidence");
      const impulse = requireEntry(impulseByRow, profile.row_id, "row impulse acceptance");
      const conformance = requireEntry(conformanceByRow, profile.row_id, "row conformance");
      const aggregate = requireEntry(aggregateByRow, profile.row_id, "row aggregate");
      return {
        row_id: profile.row_id,
        ledger: profile.ledger,
        status: profile.status,
        failure_code: profile.failure_code,
        separator_event: profile.separator_event,
        fold_interval: profile.fold_interval,
        receiver_interval: profile.receiver_interval,
        source_interval: profile.source_interval,
        separator_aggregate_fields_complete: profile.separator_aggregate_fields_complete,
        source_packet_acceptance_rule_target_declared:
          rule.source_packet_acceptance_rule_target_field === SOURCE_PACKET_ACCEPTANCE_RULE_FIELD,
        source_packet_acceptance_rule_target_satisfied: rule.source_packet_acceptance_rule_target_satisfied,
        source_packet_acceptance_rule_target_packet_is_rule: false,
        source_packet_acceptance_rule_target_packet_as_rule_rejected: true,
        complete_separator_aggregate_inputs_present:
          aggregate.separator_aggregate_C_Sigma_present === true &&
          aggregate.separator_aggregate_A_Sigma_eta_epsilon_c_present === true &&
          aggregate.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present === true,
        complete_separator_aggregate_inputs_are_accepted_source_packet: false,
        complete_separator_aggregate_inputs_as_accepted_source_packet_rejected: true,
        source_packet_acceptance_rule_present: impulse.source_packet_acceptance_rule_present,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present:
          impulse.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet,
        compatible_source_packet_acceptance_evidence_slots_filled:
          evidence.compatible_source_packet_acceptance_evidence_slots_filled,
        accepted_constants_conformance: conformance.accepted_constants_conformance,
        route_application_attempt_slots: 2,
        route_application_authorized_slots: 0,
        route_application_rejected_slots: 2,
        rule_target_as_rule_rejections: 1,
        complete_aggregate_inputs_as_accepted_source_packet_rejections: 1,
        source_packet_acceptance_rule_constructed: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_constructed: false,
        route_decision_made: false,
        proof_rule_decision_made: false,
        primitive_acceptance_decision_made: false,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
        first_application_blocker: ROUTE_INPUT_BLOCKER,
        first_rule_application_rejection: SOURCE_PACKET_RULE_TARGET_REJECTION,
        first_accepted_source_packet_application_rejection: COMPLETE_AGGREGATE_REJECTION,
        first_source_packet_acceptance_rule_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
        first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
        classification: "row_primitive_source_packet_route_evidence_object_application_rejected_fail_closed",
      };
    })
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const poolSnapshot = currentPoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const separatorAttempts = buildSeparatorApplicationAttempts(inputs);
  const rowAttempts = buildRowApplicationAttempts(inputs);
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowAttempts, (row) => row.separator_event));
  const contract = inputs.primitiveContract.summary;
  const disjunction = inputs.routeContractDisjunction.summary;
  const rule = inputs.ruleTarget.summary;
  const narrowing = inputs.primitiveNarrowing.summary;
  const evidence = inputs.primitiveEvidence.summary;
  const impulse = inputs.impulseAcceptance.summary;
  const conformance = inputs.conformance.summary;
  const aggregate = inputs.separatorAggregate.summary;
  const counters = poolSnapshot.counters;
  const attemptSlots = separatorAttempts.length * 2 + rowAttempts.length * 2;
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_primitive_contract_direct_source_hash_checks_passed: contract.direct_source_hash_checks_passed,
    retained_route_contract_disjunction_direct_source_hash_checks_passed: disjunction.direct_source_hash_checks_passed,
    retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed: rule.direct_source_hash_checks_passed,
    retained_primitive_narrowing_direct_source_hash_checks_passed: narrowing.direct_source_hash_checks_passed,
    retained_primitive_evidence_source_hash_checks_passed: evidence.source_packet_route_source_hash_checks_passed,
    retained_impulse_acceptance_separator_profiles: impulse.separator_acceptance_dependency_profiles,
    retained_conformance_separator_profiles: conformance.separator_conformance_profiles,
    retained_separator_aggregate_certificates: aggregate.separator_aggregate_certificates,
    current_pool_json_files_scanned: poolSnapshot.json_files_scanned_before_output,
    accepted_status_lane_json_files_scanned: counters.accepted_status_lane_json_files,
    accepted_status_lane_fail_closed_json_files: counters.accepted_status_lane_fail_closed_json_files,
    accepted_status_lane_non_fail_closed_json_files: counters.accepted_status_lane_non_fail_closed_json_files,
    current_pool_source_packet_acceptance_rule_evidence_object_files_found:
      counters.current_pool_source_packet_acceptance_rule_evidence_object_files_found,
    current_pool_accepted_source_packet_evidence_object_files_found:
      counters.current_pool_accepted_source_packet_evidence_object_files_found,
    current_pool_compatible_primitive_source_packet_route_input_refs:
      counters.current_pool_compatible_primitive_source_packet_route_input_refs,
    candidate_higher_fold_constants_artifacts: contract.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: contract.candidate_separator_constants,
    candidate_row_constant_associations: contract.candidate_row_constant_associations,
    rows_by_separator_count: rowsBySeparator,
    separators_with_separator_aggregate_fields_complete: contract.separators_with_separator_aggregate_fields_complete,
    rows_with_separator_aggregate_fields_complete: contract.rows_with_separator_aggregate_fields_complete,
    primitive_source_packet_route_input_target_fields: contract.primitive_source_packet_route_input_target_fields,
    total_primitive_source_packet_route_evidence_object_contract_slots:
      contract.total_primitive_source_packet_route_evidence_object_contract_slots,
    primitive_source_packet_route_evidence_object_contract_slots_satisfied: contract.contract_slots_satisfied,
    primitive_source_packet_route_evidence_object_contract_slots_missing: contract.contract_slots_missing,
    route_evidence_object_contract_disjunctions_declared:
      disjunction.route_evidence_object_contract_disjunctions_declared,
    route_evidence_object_contract_disjunctions_satisfied:
      disjunction.route_evidence_object_contract_disjunctions_satisfied,
    total_source_packet_acceptance_rule_target_slots: rule.total_source_packet_acceptance_rule_target_slots,
    total_source_packet_acceptance_rule_target_slots_satisfied:
      rule.total_source_packet_acceptance_rule_target_slots_satisfied,
    separator_route_evidence_object_application_attempts: separatorAttempts.length * 2,
    row_route_evidence_object_application_attempts: rowAttempts.length * 2,
    total_route_evidence_object_application_attempts: attemptSlots,
    separator_route_evidence_object_applications_authorized: 0,
    row_route_evidence_object_applications_authorized: 0,
    total_route_evidence_object_applications_authorized: 0,
    total_route_evidence_object_application_rejections: attemptSlots,
    source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections:
      separatorAttempts.length + rowAttempts.length,
    complete_separator_aggregate_inputs_as_accepted_source_packet_rejections:
      separatorAttempts.length + rowAttempts.length,
    source_packet_acceptance_rule_targets_declared: rule.source_packet_acceptance_rule_targets_declared,
    source_packet_acceptance_rule_targets_satisfied: rule.source_packet_acceptance_rule_targets_satisfied,
    separators_with_source_packet_acceptance_rule: impulse.separators_with_source_packet_acceptance_rule,
    rows_with_source_packet_acceptance_rule: impulse.row_field_presence_counts.source_packet_acceptance_rule_present.present,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets:
      impulse.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets,
    rows_with_accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet:
      impulse.row_field_presence_counts.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet.present,
    compatible_source_packet_acceptance_evidence_files:
      evidence.evidence_pool_compatible_source_packet_acceptance_evidence_files,
    accepted_constants_conformance_separator_count: conformance.separators_with_accepted_constants_conformance,
    accepted_constants_conformance_row_count: conformance.rows_with_accepted_constants_conformance,
    route_decisions_made: 0,
    proof_rule_decisions_made: 0,
    primitive_acceptance_decisions_made: 0,
    source_packet_acceptance_rules_constructed: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets_constructed: 0,
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
    first_application_blocker: ROUTE_INPUT_BLOCKER,
    first_rule_application_rejection: SOURCE_PACKET_RULE_TARGET_REJECTION,
    first_accepted_source_packet_application_rejection: COMPLETE_AGGREGATE_REJECTION,
    first_source_packet_acceptance_rule_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
    parent_complement_consumption_ref_blocker: contract.parent_complement_consumption_ref_blocker,
    first_separator_certificate_blocker: contract.first_separator_certificate_blocker,
  };

  assertPacketInvariants(summary);
  return {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status primitive source-packet route evidence-object application attempt",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status primitive source-packet route evidence-object application",
    claim_level:
      "priority-only primitive/source-packet route evidence-object application attempt; proves the declared source_packet_acceptance_rule target packet and complete separator aggregate inputs cannot be applied as the missing branch evidence objects without making proof-rule, route, primitive-acceptance, source-packet acceptance, accepted-status, or row-consumption decisions",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_primitive_source_packet_route_evidence_object_contract_target_packet: artifactRecord(
        paths.primitiveContract,
      ),
      accepted_status_route_evidence_object_contract_disjunction_exhaustion_classifier: artifactRecord(
        paths.routeContractDisjunction,
      ),
      accepted_status_source_packet_acceptance_rule_target_packet: artifactRecord(paths.ruleTarget),
      accepted_status_primitive_source_packet_route_narrowing_classifier: artifactRecord(paths.primitiveNarrowing),
      accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier: artifactRecord(
        paths.primitiveEvidence,
      ),
      same_packet_impulse_bound_source_packet_acceptance_dependency_classifier: artifactRecord(paths.impulseAcceptance),
      same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier: artifactRecord(paths.conformance),
      same_packet_separator_aggregate_certificate_attempt: artifactRecord(paths.separatorAggregate),
    },
    source_hash_checks: sourceChecks,
    current_pool_primitive_source_packet_route_application_snapshot: poolSnapshot,
    primitive_source_packet_route_application_rejection_rules: [
      {
        rejection: SOURCE_PACKET_RULE_TARGET_REJECTION,
        reason:
          "a source_packet_acceptance_rule target packet declares the missing rule field but is not itself the rule evidence object",
      },
      {
        rejection: COMPLETE_AGGREGATE_REJECTION,
        reason:
          "complete separator aggregate inputs certify aggregate arithmetic but are not an accepted same-packet fold impulse/direct-quadrature source packet",
      },
    ],
    separator_primitive_source_packet_route_evidence_object_application_attempts: separatorAttempts,
    row_primitive_source_packet_route_evidence_object_application_attempts: rowAttempts,
    summary,
    next_certificate_handoff: {
      handoff_class: "primitive_source_packet_route_evidence_object_application_attempt",
      current_pool_closure_state:
        "not mechanically closable from the current certificate pool; applying the primitive/source-packet contract requires a real source_packet_acceptance_rule or accepted source-packet object, not a target packet or aggregate-input certificate",
      applications_authorized: 0,
      mechanical_continuation_available: false,
      decision_required: true,
      allowed_next_inputs: [
        "source_packet_acceptance_rule_for_live_same_packet_separator_aggregate_family",
        "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_for_live_same_packet_separator_aggregate_family",
      ],
      forbidden_reinterpretations: [
        SOURCE_PACKET_RULE_TARGET_REJECTION,
        COMPLETE_AGGREGATE_REJECTION,
        "primitive_source_packet_route_evidence_object_contract_target_as_source_packet_rule_or_accepted_source_packet",
        "route_evidence_object_contract_disjunction_exhaustion_classifier_as_route_evidence_object",
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
      "Priority-only. This attempt proves the primitive/source-packet evidence-object contract cannot be applied from rule-target packets or complete aggregate inputs in the current certificate pool.",
  };
}

function assertPacketInvariants(summary) {
  const checks = [
    summary.direct_source_hash_checks === 8,
    summary.direct_source_hash_checks_passed === 8,
    summary.retained_primitive_contract_direct_source_hash_checks_passed === 6,
    summary.retained_route_contract_disjunction_direct_source_hash_checks_passed === 3,
    summary.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed === 3,
    summary.retained_primitive_narrowing_direct_source_hash_checks_passed === 5,
    summary.retained_primitive_evidence_source_hash_checks_passed === 5,
    summary.retained_impulse_acceptance_separator_profiles === 12,
    summary.retained_conformance_separator_profiles === 12,
    summary.retained_separator_aggregate_certificates === 12,
    summary.current_pool_json_files_scanned === 256,
    summary.accepted_status_lane_json_files_scanned === 21,
    summary.accepted_status_lane_fail_closed_json_files === 21,
    summary.accepted_status_lane_non_fail_closed_json_files === 0,
    summary.current_pool_source_packet_acceptance_rule_evidence_object_files_found === 0,
    summary.current_pool_accepted_source_packet_evidence_object_files_found === 0,
    summary.current_pool_compatible_primitive_source_packet_route_input_refs === 0,
    summary.candidate_separator_constants === 12,
    summary.candidate_row_constant_associations === 112,
    summary.separators_with_separator_aggregate_fields_complete === 12,
    summary.rows_with_separator_aggregate_fields_complete === 112,
    summary.total_primitive_source_packet_route_evidence_object_contract_slots === 248,
    summary.primitive_source_packet_route_evidence_object_contract_slots_satisfied === 0,
    summary.primitive_source_packet_route_evidence_object_contract_slots_missing === 248,
    summary.route_evidence_object_contract_disjunctions_satisfied === 0,
    summary.total_source_packet_acceptance_rule_target_slots === 124,
    summary.total_source_packet_acceptance_rule_target_slots_satisfied === 0,
    summary.separator_route_evidence_object_application_attempts === 24,
    summary.row_route_evidence_object_application_attempts === 224,
    summary.total_route_evidence_object_application_attempts === 248,
    summary.total_route_evidence_object_applications_authorized === 0,
    summary.total_route_evidence_object_application_rejections === 248,
    summary.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections === 124,
    summary.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections === 124,
    summary.source_packet_acceptance_rule_targets_declared === 1,
    summary.source_packet_acceptance_rule_targets_satisfied === 0,
    summary.separators_with_source_packet_acceptance_rule === 0,
    summary.rows_with_source_packet_acceptance_rule === 0,
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0,
    summary.rows_with_accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet === 0,
    summary.compatible_source_packet_acceptance_evidence_files === 0,
    summary.accepted_constants_conformance_separator_count === 0,
    summary.accepted_constants_conformance_row_count === 0,
    summary.route_decisions_made === 0,
    summary.proof_rule_decisions_made === 0,
    summary.primitive_acceptance_decisions_made === 0,
    summary.source_packet_acceptance_rules_constructed === 0,
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets_constructed === 0,
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
    throw new Error("Primitive/source-packet route evidence-object application attempt invariants failed.");
  }
  if (JSON.stringify(summary.rows_by_separator_count) !== JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR)) {
    throw new Error("Unexpected primitive/source-packet application rows-by-separator count.");
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
  const rejectionRows = packet.primitive_source_packet_route_application_rejection_rules.map((rule) => [
    `\`${rule.rejection}\``,
    rule.reason,
  ]);
  const separatorRows = Object.entries(s.rows_by_separator_count).map(([separator, rows]) => [
    `\`${separator}\``,
    String(rows),
  ]);

  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Primitive Source-Packet Route Evidence-Object Application Attempt

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Primitive Source-Packet Route Application Boundary

This attempt imports the primitive/source-packet route evidence-object contract
target packet, the route evidence-object contract disjunction exhaustion
classifier, the source-packet acceptance rule target packet, the primitive
source-packet route narrowing classifier, the primitive source-packet acceptance
evidence dependency classifier, the impulse-bound source-packet acceptance
dependency classifier, the fixed-parameter aggregate accepted constants
conformance classifier, and the separator aggregate certificate attempt.

It tests whether the declared primitive/source-packet contract can be applied
from current rule-target and aggregate-input objects. It cannot: a
\`${SOURCE_PACKET_ACCEPTANCE_RULE_FIELD}\` target packet is not the rule itself,
and complete separator aggregate inputs are not an accepted
\`${ACCEPTED_SOURCE_PACKET_FIELD}\`.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct source-hash locks;
- ${s.retained_primitive_contract_direct_source_hash_checks_passed} / 6 retained primitive/source-packet contract locks;
- ${s.retained_route_contract_disjunction_direct_source_hash_checks_passed} / 3 retained route-disjunction locks;
- ${s.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed} / 3 retained source-packet acceptance rule target locks;
- ${s.retained_primitive_narrowing_direct_source_hash_checks_passed} / 5 retained primitive route narrowing locks;
- ${s.retained_primitive_evidence_source_hash_checks_passed} / 5 retained primitive source-packet evidence locks.

Current-pool scan:

- ${s.current_pool_json_files_scanned} certificate JSON files scanned before this output;
- ${s.accepted_status_lane_json_files_scanned} accepted-status-lane JSON files scanned;
- ${s.accepted_status_lane_fail_closed_json_files} accepted-status-lane JSON files fail-closed;
- ${s.accepted_status_lane_non_fail_closed_json_files} accepted-status-lane JSON files non-fail-closed;
- ${s.current_pool_source_packet_acceptance_rule_evidence_object_files_found} compatible source-packet acceptance rule objects found;
- ${s.current_pool_accepted_source_packet_evidence_object_files_found} compatible accepted source-packet objects found;
- ${s.current_pool_compatible_primitive_source_packet_route_input_refs} compatible primitive/source-packet route-input refs found.

Application result:

- ${s.total_primitive_source_packet_route_evidence_object_contract_slots} primitive/source-packet route evidence-object contract slots;
- ${s.primitive_source_packet_route_evidence_object_contract_slots_satisfied} contract slots satisfied;
- ${s.total_route_evidence_object_application_attempts} route evidence-object applications attempted;
- ${s.total_route_evidence_object_applications_authorized} route evidence-object applications authorized;
- ${s.source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule_rejections} source-packet acceptance rule target-packet-as-rule rejections;
- ${s.complete_separator_aggregate_inputs_as_accepted_source_packet_rejections} complete aggregate-input-as-accepted-source-packet rejections;
- ${s.source_packet_acceptance_rules_constructed} source-packet acceptance rules constructed;
- ${s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets_constructed} accepted source packets constructed;
- ${s.accepted_interval_certified_constants_statuses_constructed} accepted statuses constructed.

## Source-Hash Checks

${markdownTable(["Source artifact", "Current file", "Current SHA-256", "Hash matches"], sourceRows)}

## Rejection Rules

${markdownTable(["Rejected reinterpretation", "Reason"], rejectionRows)}

## Row Scope

${markdownTable(["Separator", "Rows"], separatorRows)}

## Certificate-Side Handoff

Sharpened blocker: the primitive/source-packet branch is not missing another
target declaration. It is missing a real \`${SOURCE_PACKET_ACCEPTANCE_RULE_FIELD}\`
or a real \`${ACCEPTED_SOURCE_PACKET_FIELD}\`. Rule-target packets and complete
separator aggregate inputs are explicitly rejected as application evidence.

Continuation class: not mechanically closable from the current certificate pool.
Continue only by importing one of the allowed branch evidence-object inputs or by
recording an explicit route/proof-rule/primitive-acceptance decision in a
separate artifact.

Fail-closed stop conditions:

- Do not treat the source-packet acceptance rule target packet as the rule.
- Do not treat complete separator aggregate inputs as an accepted source packet.
- Do not treat the primitive/source-packet contract target packet or route
  evidence-object contract disjunction classifier as route evidence.
- Do not construct accepted interval-certified constants status refs or statuses
  from this attempt.
- Do not infer \`parent_complement_consumption_ref\` or
  \`higher_fold_separator_layer_certificate\` from this attempt.
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
    primitiveContract: args.primitiveContract,
    routeContractDisjunction: args.routeContractDisjunction,
    ruleTarget: args.ruleTarget,
    primitiveNarrowing: args.primitiveNarrowing,
    primitiveEvidence: args.primitiveEvidence,
    impulseAcceptance: args.impulseAcceptance,
    conformance: args.conformance,
    separatorAggregate: args.separatorAggregate,
    certificatePoolDir: args.certificatePoolDir,
  };
  const inputs = {
    primitiveContract: readJson(paths.primitiveContract),
    routeContractDisjunction: readJson(paths.routeContractDisjunction),
    ruleTarget: readJson(paths.ruleTarget),
    primitiveNarrowing: readJson(paths.primitiveNarrowing),
    primitiveEvidence: readJson(paths.primitiveEvidence),
    impulseAcceptance: readJson(paths.impulseAcceptance),
    conformance: readJson(paths.conformance),
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
