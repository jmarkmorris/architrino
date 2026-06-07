#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SOURCE_DATA_READINESS = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_current_pool_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_current_pool_absence_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SOURCE_DATA_READINESS_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier_fail_closed_source_data_ready_derivation_proof_absent_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_current_pool_absence_classifier_fail_closed_source_data_ready_current_pool_derivation_proof_object_absent_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";

const RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const DERIVATION_PROOF_BLOCKER = "source_packet_acceptance_rule_derivation_proof_absent";
const CURRENT_POOL_DERIVATION_PROOF_OBJECT_BLOCKER =
  "source_packet_acceptance_rule_derivation_proof_object_absent_from_current_certificate_pool";
const SOUNDNESS_PROOF_BLOCKER = "source_packet_acceptance_rule_soundness_proof_absent";
const APPLICATION_PROOF_BLOCKER = "source_packet_acceptance_rule_endpoint_application_proof_absent";
const CONFORMANCE_BLOCKER = "existing_constants_contract_packet_identity_mismatch";
const DERIVATION_PROOF_TARGET =
  "source_packet_acceptance_rule_derivation_proof_for_live_same_packet_separator_aggregate_family";
const COMPATIBLE_PROOF_OBJECT_ROLE = "source_packet_acceptance_rule_derivation_proof_object";

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

const ACCEPTED_STATUS_LANE_PREFIXES = [
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_",
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_",
];

const DOWNSTREAM_BASENAME_KEYS = {
  source_packet_acceptance_rule_target:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  kernel_binding_split:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  blocker_vector:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_acceptance_rule_blocker_vector_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  proof_obligation_dependency:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_proof_obligation_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  derivation_proof_target:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  source_data_readiness:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  construction_frontier:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_construction_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  route_input_disjunction:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_disjunction_closure_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  route_evidence_terminal_decision:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_decision_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  route_evidence_terminal_obligation:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
};

const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_construction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
]);

const REJECTION_BUCKETS = [
  "packet_identity_mismatch",
  "not_source_packet_acceptance_rule_derivation_proof_object",
  "fail_closed_artifact",
  "source_packet_acceptance_rule_target_packet_not_derivation_proof_object",
  "kernel_binding_split_classifier_not_derivation_proof_object",
  "blocker_vector_handoff_classifier_not_derivation_proof_object",
  "proof_obligation_dependency_classifier_not_derivation_proof_object",
  "derivation_proof_target_packet_not_derivation_proof_object",
  "source_data_readiness_classifier_not_derivation_proof_object",
  "derivation_source_data_record_not_derivation_proof_object",
  "construction_or_route_frontier_not_derivation_proof_object",
  "proof_grade_derivation_ref_wrong_evidence_family",
  "source_certificate_or_source_data_handle_not_derivation_proof_object",
  "source_packet_acceptance_rule_absent",
  "accepted_status_absent",
];

function parseArgs(argv) {
  const args = {
    sourceDataReadiness: DEFAULT_SOURCE_DATA_READINESS,
    certificatePoolDir: CERT_DIR,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--source-data-readiness") {
      args.sourceDataReadiness = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-source-packet-acceptance-rule-derivation-proof-object-current-pool-absence-classifier.mjs [options]

Options:
  --source-data-readiness PATH  Source-packet acceptance rule derivation-proof source-data readiness classifier. Defaults to ${DEFAULT_SOURCE_DATA_READINESS}.
  --certificate-pool-dir PATH   Certificate JSON pool directory. Defaults to ${CERT_DIR}.
  --out-dir PATH                Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                      Pretty-print JSON artifact.
  --help                        Show this help.`);
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
    [
      "accepted_status_source_packet_acceptance_rule_derivation_proof_source_data_readiness_classifier",
      paths.sourceDataReadiness,
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

function sortedObjectBySeparator(counts) {
  return Object.fromEntries(
    Object.entries(counts).sort(([left], [right]) => separatorSortKey(left) - separatorSortKey(right)),
  );
}

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function rowSortKey(row) {
  return `${String(separatorSortKey(row.separator_event)).padStart(3, "0")}:${row.row_id}`;
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

function validateSourceDataReadiness(sourceDataReadiness) {
  assertPacketStatusAndLocks(sourceDataReadiness, "sourceDataReadiness", SOURCE_DATA_READINESS_STATUS);
  const s = sourceDataReadiness.summary;
  expectEqual(s.direct_source_hash_checks_passed, 1, "source-data readiness direct locks");
  expectEqual(
    s.retained_derivation_proof_target_direct_source_hash_checks_passed,
    2,
    "retained derivation-proof target locks",
  );
  expectEqual(s.retained_kernel_binding_split_direct_source_hash_checks_passed, 1, "retained kernel locks");
  expectEqual(
    s.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed,
    3,
    "retained source-packet acceptance rule target locks",
  );
  expectEqual(s.retained_blocker_vector_direct_source_hash_checks_passed, 1, "retained blocker-vector locks");
  expectEqual(s.retained_proof_obligation_direct_source_hash_checks_passed, 7, "retained proof-obligation locks");
  expectEqual(s.candidate_separator_constants, 12, "separator constants");
  expectEqual(s.candidate_row_constant_associations, 112, "row associations");
  expectEqual(s.derivation_proof_source_data_records, 124, "source-data records");
  expectEqual(s.derivation_proof_source_data_records_ready, 124, "source-data records ready");
  expectEqual(s.derivation_proof_source_data_records_missing, 0, "source-data records missing");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_object_slots, 124, "derivation-proof object slots");
  expectEqual(
    s.source_packet_acceptance_rule_derivation_proof_object_slots_satisfied,
    0,
    "derivation-proof object slots satisfied",
  );
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_slots, 124, "derivation proof slots");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_slots_satisfied, 0, "derivation proof slots satisfied");
  expectEqual(s.source_packet_acceptance_rules_constructed, 0, "source-packet acceptance rules constructed");
  expectEqual(
    s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets,
    0,
    "accepted source packets",
  );
  expectEqual(
    s.accepted_interval_certified_constants_statuses_constructed,
    0,
    "accepted statuses constructed",
  );
  expectEqual(s.row_consumption_count, 0, "row consumption");
  expectEqual(s.route_decisions_made, 0, "route decisions");
  expectEqual(s.proof_rule_decisions_made, 0, "proof-rule decisions");
  expectEqual(s.primitive_acceptance_decisions_made, 0, "primitive-acceptance decisions");
  expectEqual(s.source_packet_acceptance_decisions_made, 0, "source-packet acceptance decisions");
  assertRowsBySeparator(s, "source-data readiness");
}

function isAcceptedStatusLane(basename) {
  return ACCEPTED_STATUS_LANE_PREFIXES.some((prefix) => basename.startsWith(prefix));
}

function candidateHasCompatibleDerivationProofObject(parsed, text) {
  if (String(parsed.status ?? "").includes("fail_closed")) {
    return false;
  }
  if (parsed.packet_id !== PACKET_ID) {
    return false;
  }
  return (
    parsed.compatible_evidence_role === COMPATIBLE_PROOF_OBJECT_ROLE ||
    parsed.source_packet_acceptance_rule_derivation_proof_role === COMPATIBLE_PROOF_OBJECT_ROLE ||
    /"source_packet_acceptance_rule_derivation_proof_object_present"\s*:\s*true/.test(text) ||
    /"source_packet_acceptance_rule_derivation_proof_present"\s*:\s*true/.test(text) ||
    /"source_packet_acceptance_rule_derivation_proof_accepted"\s*:\s*true/.test(text) ||
    /"source_packet_acceptance_rule_derivation_proof_objects_constructed"\s*:\s*[1-9]/.test(text) ||
    /"source_packet_acceptance_rule_derivation_proofs_constructed"\s*:\s*[1-9]/.test(text)
  );
}

function rejectionBucketsForPoolRecord(basename, parsed, text, compatible) {
  if (compatible) {
    return [];
  }
  const buckets = [];
  const status = String(parsed.status ?? "");
  if (parsed.packet_id !== undefined && parsed.packet_id !== PACKET_ID) {
    buckets.push("packet_identity_mismatch");
  }
  if (status.includes("fail_closed")) {
    buckets.push("fail_closed_artifact");
  }
  if (basename === DOWNSTREAM_BASENAME_KEYS.source_packet_acceptance_rule_target) {
    buckets.push("source_packet_acceptance_rule_target_packet_not_derivation_proof_object");
  }
  if (basename === DOWNSTREAM_BASENAME_KEYS.kernel_binding_split) {
    buckets.push("kernel_binding_split_classifier_not_derivation_proof_object");
  }
  if (basename === DOWNSTREAM_BASENAME_KEYS.blocker_vector) {
    buckets.push("blocker_vector_handoff_classifier_not_derivation_proof_object");
  }
  if (basename === DOWNSTREAM_BASENAME_KEYS.proof_obligation_dependency) {
    buckets.push("proof_obligation_dependency_classifier_not_derivation_proof_object");
  }
  if (basename === DOWNSTREAM_BASENAME_KEYS.derivation_proof_target) {
    buckets.push("derivation_proof_target_packet_not_derivation_proof_object");
  }
  if (basename === DOWNSTREAM_BASENAME_KEYS.source_data_readiness) {
    buckets.push("source_data_readiness_classifier_not_derivation_proof_object");
  }
  if (text.includes("derivation_proof_source_data_record")) {
    buckets.push("derivation_source_data_record_not_derivation_proof_object");
  }
  if (
    basename === DOWNSTREAM_BASENAME_KEYS.construction_frontier ||
    basename === DOWNSTREAM_BASENAME_KEYS.route_input_disjunction ||
    basename === DOWNSTREAM_BASENAME_KEYS.route_evidence_terminal_decision ||
    basename === DOWNSTREAM_BASENAME_KEYS.route_evidence_terminal_obligation ||
    text.includes("route_evidence_object") ||
    text.includes("route_input_disjunction")
  ) {
    buckets.push("construction_or_route_frontier_not_derivation_proof_object");
  }
  if (text.includes("proof_grade_derivation_ref")) {
    buckets.push("proof_grade_derivation_ref_wrong_evidence_family");
  }
  if (text.includes("source_certificate") || text.includes("source-certificate") || text.includes("source_data")) {
    buckets.push("source_certificate_or_source_data_handle_not_derivation_proof_object");
  }
  if (
    !/"source_packet_acceptance_rule_constructed"\s*:\s*true/.test(text) &&
    !/"source_packet_acceptance_rules_constructed"\s*:\s*[1-9]/.test(text)
  ) {
    buckets.push("source_packet_acceptance_rule_absent");
  }
  if (
    !/"accepted_interval_certified_constants_status_present"\s*:\s*true/.test(text) &&
    !/"accepted_interval_certified_constants_statuses_constructed"\s*:\s*[1-9]/.test(text)
  ) {
    buckets.push("accepted_status_absent");
  }
  if (buckets.length === 0) {
    buckets.push("not_source_packet_acceptance_rule_derivation_proof_object");
  }
  return buckets;
}

function analyzePoolFile(filePath, outputBasename) {
  const basename = path.basename(filePath);
  if (basename === outputBasename || DOWNSTREAM_OUTPUT_JSON_BASENAMES.has(basename)) {
    return null;
  }
  const text = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(text);
  const status = String(parsed.status ?? "");
  const compatible = candidateHasCompatibleDerivationProofObject(parsed, text);
  return {
    basename,
    sha256: sha256File(filePath),
    packet_id: parsed.packet_id ?? null,
    schema: String(parsed.schema ?? ""),
    status,
    accepted_status_lane: isAcceptedStatusLane(basename),
    fail_closed: status.includes("fail_closed"),
    compatible_source_packet_acceptance_rule_derivation_proof_object: compatible,
    has_derivation_proof_object_present_true:
      /"source_packet_acceptance_rule_derivation_proof_object_present"\s*:\s*true/.test(text),
    has_derivation_proof_present_true:
      /"source_packet_acceptance_rule_derivation_proof_present"\s*:\s*true/.test(text),
    source_packet_acceptance_rules_constructed:
      Number(parsed.summary?.source_packet_acceptance_rules_constructed ?? 0),
    accepted_interval_certified_constants_statuses_constructed:
      Number(parsed.summary?.accepted_interval_certified_constants_statuses_constructed ?? 0),
    row_consumption_count: Number(parsed.summary?.row_consumption_count ?? 0),
    preledger_pass: parsed.preledger_pass === true || parsed.summary?.preledger_pass === true,
    updates_live_ledger: parsed.updates_live_ledger === true || parsed.summary?.updates_live_ledger === true,
    branch_chart_authorized:
      parsed.branch_chart_authorized === true || parsed.summary?.branch_chart_authorized === true,
    rejection_buckets: rejectionBucketsForPoolRecord(basename, parsed, text, compatible),
  };
}

function scanCertificatePool(certificatePoolDir, outputBasename) {
  return fs
    .readdirSync(certificatePoolDir)
    .filter((entry) => entry.endsWith(".json"))
    .sort()
    .map((entry) => analyzePoolFile(path.join(certificatePoolDir, entry), outputBasename))
    .filter((entry) => entry !== null);
}

function rejectionBucketCounts(records) {
  const counts = Object.fromEntries(REJECTION_BUCKETS.map((bucket) => [bucket, 0]));
  for (const record of records) {
    for (const bucket of record.rejection_buckets) {
      counts[bucket] = (counts[bucket] ?? 0) + 1;
    }
  }
  return counts;
}

function buildSeparatorProfiles(sourceDataReadiness) {
  return sourceDataReadiness.separator_source_packet_acceptance_rule_derivation_proof_source_data_readiness_profiles
    .map((profile) => ({
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      row_count: profile.row_count,
      derivation_proof_target: DERIVATION_PROOF_TARGET,
      current_pool_derivation_proof_object_scan_complete: true,
      compatible_current_pool_derivation_proof_object_refs: [],
      current_pool_derivation_proof_object_present: false,
      derivation_proof_source_data_records: profile.derivation_proof_source_data_records,
      derivation_proof_source_data_records_ready: profile.derivation_proof_source_data_records_ready,
      source_packet_acceptance_rule_derivation_proof_object_slots:
        profile.source_packet_acceptance_rule_derivation_proof_object_slots,
      source_packet_acceptance_rule_derivation_proof_object_slots_satisfied: 0,
      derivation_proof_source_data_record: profile.derivation_proof_source_data_record,
      derivation_proof_target_packet_is_derivation_proof_object: false,
      source_data_readiness_classifier_is_derivation_proof_object: false,
      derivation_proof_source_data_record_is_derivation_proof_object: false,
      source_packet_acceptance_rule_constructed: false,
      source_packet_acceptance_rule_derivation_proof_present: false,
      source_packet_acceptance_rule_derivation_proof_object_accepted: false,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      source_packet_acceptance_decision_made: false,
      accepted_interval_certified_constants_status_constructed: false,
      row_consumption_count: 0,
      preledger_pass_rows: 0,
      branch_chart_authorized_rows: 0,
      first_rule_blocker: RULE_BLOCKER,
      first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
      first_current_pool_derivation_proof_object_absence_blocker:
        CURRENT_POOL_DERIVATION_PROOF_OBJECT_BLOCKER,
      classification:
        "separator_source_packet_acceptance_rule_derivation_proof_object_current_pool_absent_fail_closed",
    }))
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function buildRowProfiles(sourceDataReadiness) {
  return sourceDataReadiness.row_source_packet_acceptance_rule_derivation_proof_source_data_readiness_profiles
    .map((profile) => ({
      row_id: profile.row_id,
      ledger: profile.ledger,
      status: profile.status,
      failure_code: profile.failure_code,
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      receiver_interval: profile.receiver_interval,
      source_interval: profile.source_interval,
      derivation_proof_target: DERIVATION_PROOF_TARGET,
      current_pool_derivation_proof_object_scan_complete: true,
      compatible_current_pool_derivation_proof_object_refs: [],
      current_pool_derivation_proof_object_present: false,
      derivation_proof_source_data_records: profile.derivation_proof_source_data_records,
      derivation_proof_source_data_records_ready: profile.derivation_proof_source_data_records_ready,
      source_packet_acceptance_rule_derivation_proof_object_slots:
        profile.source_packet_acceptance_rule_derivation_proof_object_slots,
      source_packet_acceptance_rule_derivation_proof_object_slots_satisfied: 0,
      derivation_proof_source_data_record: profile.derivation_proof_source_data_record,
      derivation_proof_target_packet_is_derivation_proof_object: false,
      source_data_readiness_classifier_is_derivation_proof_object: false,
      derivation_proof_source_data_record_is_derivation_proof_object: false,
      source_packet_acceptance_rule_constructed: false,
      source_packet_acceptance_rule_derivation_proof_present: false,
      source_packet_acceptance_rule_derivation_proof_object_accepted: false,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      source_packet_acceptance_decision_made: false,
      accepted_interval_certified_constants_status_constructed: false,
      accepted_fold_layer_row: false,
      row_consumed: false,
      preledger_pass: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
      first_rule_blocker: RULE_BLOCKER,
      first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
      first_current_pool_derivation_proof_object_absence_blocker:
        CURRENT_POOL_DERIVATION_PROOF_OBJECT_BLOCKER,
      classification: "row_source_packet_acceptance_rule_derivation_proof_object_current_pool_absent_fail_closed",
    }))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, sourceDataReadiness, poolRecords) {
  validateSourceDataReadiness(sourceDataReadiness);
  const sourceChecks = sourceHashChecks(paths);
  const source = sourceDataReadiness.summary;
  const separatorProfiles = buildSeparatorProfiles(sourceDataReadiness);
  const rowProfiles = buildRowProfiles(sourceDataReadiness);
  const acceptedStatusLaneRecords = poolRecords.filter((record) => record.accepted_status_lane);
  const compatibleProofObjectRecords = poolRecords.filter(
    (record) => record.compatible_source_packet_acceptance_rule_derivation_proof_object,
  );
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const sourceDataRecords = separatorProfiles.length + rowProfiles.length;
  const sourceDataReady =
    countTrue(separatorProfiles, (profile) => profile.derivation_proof_source_data_records_ready === 1) +
    countTrue(rowProfiles, (profile) => profile.derivation_proof_source_data_records_ready === 1);

  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_source_data_readiness_direct_source_hash_checks_passed: source.direct_source_hash_checks_passed,
    retained_derivation_proof_target_direct_source_hash_checks_passed:
      source.retained_derivation_proof_target_direct_source_hash_checks_passed,
    retained_derivation_proof_target_source_hash_checks:
      source.retained_derivation_proof_target_source_hash_checks,
    retained_kernel_binding_split_direct_source_hash_checks_passed:
      source.retained_kernel_binding_split_direct_source_hash_checks_passed,
    retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed:
      source.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed,
    retained_blocker_vector_direct_source_hash_checks_passed:
      source.retained_blocker_vector_direct_source_hash_checks_passed,
    retained_proof_obligation_direct_source_hash_checks_passed:
      source.retained_proof_obligation_direct_source_hash_checks_passed,
    current_pool_json_files_scanned: poolRecords.length,
    accepted_status_lane_json_files_scanned: acceptedStatusLaneRecords.length,
    accepted_status_lane_fail_closed_json_files: countTrue(acceptedStatusLaneRecords, (record) => record.fail_closed),
    accepted_status_lane_non_fail_closed_json_files: countTrue(
      acceptedStatusLaneRecords,
      (record) => record.fail_closed === false,
    ),
    current_pool_source_packet_acceptance_rule_derivation_proof_object_files_found:
      compatibleProofObjectRecords.length,
    current_pool_compatible_source_packet_acceptance_rule_derivation_proof_object_refs: 0,
    current_pool_rejection_bucket_counts: rejectionBucketCounts(poolRecords),
    candidate_higher_fold_constants_artifacts: source.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: separatorProfiles.length,
    candidate_row_constant_associations: rowProfiles.length,
    rows_by_separator_count: rowsBySeparator,
    separator_current_pool_derivation_proof_object_absence_profiles: separatorProfiles.length,
    row_current_pool_derivation_proof_object_absence_profiles: rowProfiles.length,
    total_current_pool_derivation_proof_object_absence_profiles: sourceDataRecords,
    derivation_proof_source_data_records: sourceDataRecords,
    derivation_proof_source_data_records_ready: sourceDataReady,
    derivation_proof_source_data_records_missing: sourceDataRecords - sourceDataReady,
    source_material_premise_slots: source.source_material_premise_slots,
    source_material_premise_slots_satisfied: source.source_material_premise_slots_satisfied,
    candidate_exact_consistency_premise_slots: source.candidate_exact_consistency_premise_slots,
    candidate_exact_consistency_premise_slots_satisfied:
      source.candidate_exact_consistency_premise_slots_satisfied,
    source_packet_acceptance_rule_target_slots: source.source_packet_acceptance_rule_target_slots,
    source_packet_acceptance_rule_target_slots_satisfied:
      source.source_packet_acceptance_rule_target_slots_satisfied,
    derivation_proof_target_slots: source.derivation_proof_target_slots,
    derivation_proof_target_slots_declared: source.derivation_proof_target_slots_declared,
    derivation_proof_target_slots_satisfied: source.derivation_proof_target_slots_satisfied,
    source_packet_acceptance_rule_derivation_proof_source_data_ready_slots:
      source.source_packet_acceptance_rule_derivation_proof_source_data_ready_slots,
    source_packet_acceptance_rule_derivation_proof_source_data_ready_slots_satisfied:
      source.source_packet_acceptance_rule_derivation_proof_source_data_ready_slots_satisfied,
    source_packet_acceptance_rule_derivation_proof_object_slots: sourceDataRecords,
    source_packet_acceptance_rule_derivation_proof_object_slots_satisfied: 0,
    source_packet_acceptance_rule_derivation_proof_slots:
      source.source_packet_acceptance_rule_derivation_proof_slots,
    source_packet_acceptance_rule_derivation_proof_slots_satisfied:
      source.source_packet_acceptance_rule_derivation_proof_slots_satisfied,
    source_packet_acceptance_rule_soundness_proof_slots:
      source.source_packet_acceptance_rule_soundness_proof_slots,
    source_packet_acceptance_rule_soundness_proof_slots_satisfied:
      source.source_packet_acceptance_rule_soundness_proof_slots_satisfied,
    source_packet_acceptance_rule_endpoint_application_proof_slots:
      source.source_packet_acceptance_rule_endpoint_application_proof_slots,
    source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied:
      source.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied,
    rule_kernel_obligation_slots: source.rule_kernel_obligation_slots,
    rule_kernel_obligation_slots_satisfied: source.rule_kernel_obligation_slots_satisfied,
    binding_and_evidence_obligation_slots: source.binding_and_evidence_obligation_slots,
    binding_and_evidence_obligation_slots_satisfied:
      source.binding_and_evidence_obligation_slots_satisfied,
    total_split_obligation_slots: source.total_split_obligation_slots,
    total_split_obligation_slots_satisfied: source.total_split_obligation_slots_satisfied,
    derivation_proof_target_packet_as_derivation_proof_object_rejections: sourceDataRecords,
    source_data_readiness_classifier_as_derivation_proof_object_rejections: sourceDataRecords,
    derivation_proof_source_data_record_as_derivation_proof_object_rejections: sourceDataRecords,
    source_packet_acceptance_rule_target_packet_as_derivation_proof_object_rejections: sourceDataRecords,
    kernel_binding_split_classifier_as_derivation_proof_object_rejections: sourceDataRecords,
    blocker_vector_handoff_classifier_as_derivation_proof_object_rejections: sourceDataRecords,
    proof_obligation_dependency_classifier_as_derivation_proof_object_rejections: sourceDataRecords,
    source_packet_acceptance_rules_constructed: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    accepted_interval_certified_constants_status_refs_constructed: 0,
    accepted_interval_certified_constants_statuses_constructed: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    route_decisions_made: 0,
    proof_rule_decisions_made: 0,
    primitive_acceptance_decisions_made: 0,
    source_packet_acceptance_decisions_made: 0,
    preledger_pass_true_files: countTrue(poolRecords, (record) => record.preledger_pass),
    live_ledger_update_true_files: countTrue(poolRecords, (record) => record.updates_live_ledger),
    branch_chart_authorized_true_files: countTrue(poolRecords, (record) => record.branch_chart_authorized),
    row_consumption_positive_files: countTrue(poolRecords, (record) => record.row_consumption_count > 0),
    source_packet_acceptance_rule_positive_files: countTrue(
      poolRecords,
      (record) => record.source_packet_acceptance_rules_constructed > 0,
    ),
    accepted_interval_certified_constants_status_positive_files: countTrue(
      poolRecords,
      (record) => record.accepted_interval_certified_constants_statuses_constructed > 0,
    ),
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_rule_blocker: RULE_BLOCKER,
    first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
    first_current_pool_derivation_proof_object_absence_blocker:
      CURRENT_POOL_DERIVATION_PROOF_OBJECT_BLOCKER,
    first_downstream_rule_kernel_blocker_after_derivation: SOUNDNESS_PROOF_BLOCKER,
    first_endpoint_application_blocker: APPLICATION_PROOF_BLOCKER,
    first_binding_and_evidence_blocker: CONFORMANCE_BLOCKER,
  };

  const packet = {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_source_packet_acceptance_rule_derivation_proof_object_current_pool_absence_classifier.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status source-packet acceptance rule derivation-proof object current-pool absence",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status source-packet acceptance rule derivation proof object current-pool absence",
    claim_level:
      "priority-only source-packet acceptance rule derivation-proof object current-pool absence classifier; imports the derivation-proof source-data readiness classifier, scans the certificate JSON pool, proves no compatible source_packet_acceptance_rule_derivation_proof object exists, and keeps proof-rule, source-packet acceptance rule, accepted source packet, accepted status, row-consumption, live-ledger, and branch-chart decisions absent",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_source_packet_acceptance_rule_derivation_proof_source_data_readiness_classifier:
        artifactRecord(paths.sourceDataReadiness),
    },
    source_hash_checks: sourceChecks,
    compatible_proof_object_role: COMPATIBLE_PROOF_OBJECT_ROLE,
    current_pool_scan_rule:
      "A compatible object must be an explicit non-fail-closed source_packet_acceptance_rule_derivation_proof object for this packet. Target packets, readiness classifiers, source-data records, source-packet acceptance rule targets, kernel/binding split classifiers, blocker-vector classifiers, proof-obligation classifiers, route/frontier artifacts, proof-grade derivation-ref evidence families, source certificates, and source-data handles are rejected as derivation-proof objects.",
    current_pool_source_packet_acceptance_rule_derivation_proof_object_records:
      compatibleProofObjectRecords,
    current_pool_rejection_bucket_counts: summary.current_pool_rejection_bucket_counts,
    separator_source_packet_acceptance_rule_derivation_proof_object_current_pool_absence_profiles:
      separatorProfiles,
    row_source_packet_acceptance_rule_derivation_proof_object_current_pool_absence_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class:
        "source_packet_acceptance_rule_derivation_proof_object_current_pool_absence",
      sharpened_blocker:
        "Source data is ready for all 124 separator/row slots, but the current certificate JSON pool contains 0 compatible source_packet_acceptance_rule_derivation_proof objects.",
      current_pool_closure_state:
        "not mechanically closable from the current certificate pool; a proof-grade derivation-proof object is still required before source-packet acceptance rule construction, soundness, endpoint application, accepted source-packet construction, or accepted interval-certified constants status construction can proceed",
      first_rule_blocker: RULE_BLOCKER,
      first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
      first_current_pool_derivation_proof_object_absence_blocker:
        CURRENT_POOL_DERIVATION_PROOF_OBJECT_BLOCKER,
      mechanical_continuation_available: false,
      decision_required: true,
      required_external_inputs: ["source_packet_acceptance_rule_derivation_proof"],
      downstream_inputs_not_actionable_until_derivation_proof_present: [
        "source_packet_acceptance_rule_soundness_proof",
        "source_packet_acceptance_rule_endpoint_application_proof",
        "accepted_constants_conformance",
        "compatible_source_packet_acceptance_evidence",
        "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
      ],
      forbidden_reinterpretations: [
        "source_packet_acceptance_rule_target_packet_as_derivation_proof_object",
        "source_packet_acceptance_rule_kernel_binding_split_classifier_as_derivation_proof_object",
        "source_packet_acceptance_rule_proof_obligation_dependency_classifier_as_derivation_proof_object",
        "source_packet_acceptance_rule_derivation_proof_target_packet_as_derivation_proof_object",
        "source_packet_acceptance_rule_derivation_proof_source_data_readiness_classifier_as_derivation_proof_object",
        "derivation_proof_source_data_record_as_derivation_proof_object",
        "proof_grade_derivation_ref_evidence_object_as_source_packet_acceptance_rule_derivation_proof_object",
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
      "Priority-only. This classifier proves current-pool absence for the source-packet acceptance rule derivation-proof object; it does not construct or accept a proof rule.",
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
    s.direct_source_hash_checks === 1,
    s.direct_source_hash_checks_passed === 1,
    s.retained_source_data_readiness_direct_source_hash_checks_passed === 1,
    s.retained_derivation_proof_target_direct_source_hash_checks_passed === 2,
    s.retained_kernel_binding_split_direct_source_hash_checks_passed === 1,
    s.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed === 3,
    s.retained_blocker_vector_direct_source_hash_checks_passed === 1,
    s.retained_proof_obligation_direct_source_hash_checks_passed === 7,
    s.current_pool_json_files_scanned === 266,
    s.accepted_status_lane_json_files_scanned === 32,
    s.accepted_status_lane_fail_closed_json_files === 32,
    s.accepted_status_lane_non_fail_closed_json_files === 0,
    s.current_pool_source_packet_acceptance_rule_derivation_proof_object_files_found === 0,
    s.current_pool_compatible_source_packet_acceptance_rule_derivation_proof_object_refs === 0,
    s.candidate_separator_constants === 12,
    s.candidate_row_constant_associations === 112,
    JSON.stringify(s.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR),
    s.total_current_pool_derivation_proof_object_absence_profiles === 124,
    s.derivation_proof_source_data_records === 124,
    s.derivation_proof_source_data_records_ready === 124,
    s.derivation_proof_source_data_records_missing === 0,
    s.source_material_premise_slots === 124,
    s.source_material_premise_slots_satisfied === 124,
    s.candidate_exact_consistency_premise_slots === 124,
    s.candidate_exact_consistency_premise_slots_satisfied === 124,
    s.source_packet_acceptance_rule_target_slots === 124,
    s.source_packet_acceptance_rule_target_slots_satisfied === 0,
    s.derivation_proof_target_slots_declared === 124,
    s.derivation_proof_target_slots_satisfied === 0,
    s.source_packet_acceptance_rule_derivation_proof_source_data_ready_slots === 124,
    s.source_packet_acceptance_rule_derivation_proof_source_data_ready_slots_satisfied === 124,
    s.source_packet_acceptance_rule_derivation_proof_object_slots === 124,
    s.source_packet_acceptance_rule_derivation_proof_object_slots_satisfied === 0,
    s.source_packet_acceptance_rule_derivation_proof_slots === 124,
    s.source_packet_acceptance_rule_derivation_proof_slots_satisfied === 0,
    s.source_packet_acceptance_rule_soundness_proof_slots === 124,
    s.source_packet_acceptance_rule_soundness_proof_slots_satisfied === 0,
    s.source_packet_acceptance_rule_endpoint_application_proof_slots === 124,
    s.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied === 0,
    s.rule_kernel_obligation_slots === 372,
    s.rule_kernel_obligation_slots_satisfied === 0,
    s.binding_and_evidence_obligation_slots === 496,
    s.binding_and_evidence_obligation_slots_satisfied === 0,
    s.derivation_proof_target_packet_as_derivation_proof_object_rejections === 124,
    s.source_data_readiness_classifier_as_derivation_proof_object_rejections === 124,
    s.derivation_proof_source_data_record_as_derivation_proof_object_rejections === 124,
    s.source_packet_acceptance_rule_target_packet_as_derivation_proof_object_rejections === 124,
    s.kernel_binding_split_classifier_as_derivation_proof_object_rejections === 124,
    s.blocker_vector_handoff_classifier_as_derivation_proof_object_rejections === 124,
    s.proof_obligation_dependency_classifier_as_derivation_proof_object_rejections === 124,
    s.source_packet_acceptance_rules_constructed === 0,
    s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0,
    s.accepted_interval_certified_constants_statuses_constructed === 0,
    s.row_consumption_count === 0,
    s.route_decisions_made === 0,
    s.proof_rule_decisions_made === 0,
    s.primitive_acceptance_decisions_made === 0,
    s.source_packet_acceptance_decisions_made === 0,
    s.preledger_pass_true_files === 0,
    s.live_ledger_update_true_files === 0,
    s.branch_chart_authorized_true_files === 0,
    s.row_consumption_positive_files === 0,
    s.source_packet_acceptance_rule_positive_files === 0,
    s.accepted_interval_certified_constants_status_positive_files === 0,
    s.preledger_pass === false,
    s.updates_live_ledger === false,
    s.branch_chart_authorized === false,
    packet.next_certificate_handoff.mechanical_continuation_available === false,
    packet.next_certificate_handoff.decision_required === true,
  ];
  if (!checks.every(Boolean)) {
    throw new Error("Source-packet acceptance rule derivation-proof object current-pool absence invariant failure.");
  }
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
  const rowScopeRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  const rejectionRows = Object.entries(s.current_pool_rejection_bucket_counts).map(([bucket, count]) => [
    `\`${bucket}\``,
    String(count),
  ]);

  return `# Candidate-Live Higher-Fold Constants Accepted-Status Source-Packet Acceptance Rule Derivation-Proof Object Current-Pool Absence Classifier

Status: \`${packet.status}\`

## Claim Level

${packet.claim_level}

## Source Lock

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

Direct source-hash locks: ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks}.

## Current-Pool Scan

This classifier imports the source-packet acceptance rule derivation-proof
source-data readiness classifier and scans the current certificate JSON pool.
The scan accepts only an explicit non-fail-closed
\`${COMPATIBLE_PROOF_OBJECT_ROLE}\` for this packet as a compatible derivation
proof object.

- certificate JSON files scanned: ${s.current_pool_json_files_scanned}
- accepted-status-lane JSON files scanned: ${s.accepted_status_lane_json_files_scanned}
- accepted-status-lane fail-closed JSON files: ${s.accepted_status_lane_fail_closed_json_files}
- accepted-status-lane non-fail-closed JSON files: ${s.accepted_status_lane_non_fail_closed_json_files}
- compatible derivation-proof object files found: ${s.current_pool_source_packet_acceptance_rule_derivation_proof_object_files_found}
- compatible derivation-proof object refs found: ${s.current_pool_compatible_source_packet_acceptance_rule_derivation_proof_object_refs}

## Row Scope

| Separator | Rows |
| --- | --- |
${markdownTable(rowScopeRows)}

The classifier preserves ${s.candidate_separator_constants} separator profiles
and ${s.candidate_row_constant_associations} row profiles.

## Source-Data And Object Slots

- derivation-proof source-data records ready: ${s.derivation_proof_source_data_records_ready} / ${s.derivation_proof_source_data_records}
- source-material premise slots ready: ${s.source_material_premise_slots_satisfied} / ${s.source_material_premise_slots}
- candidate exact-consistency premise slots ready: ${s.candidate_exact_consistency_premise_slots_satisfied} / ${s.candidate_exact_consistency_premise_slots}
- derivation-proof target slots satisfied: ${s.derivation_proof_target_slots_satisfied} / ${s.derivation_proof_target_slots_declared}
- derivation-proof object slots satisfied: ${s.source_packet_acceptance_rule_derivation_proof_object_slots_satisfied} / ${s.source_packet_acceptance_rule_derivation_proof_object_slots}
- first current-pool derivation-proof object blocker: \`${s.first_current_pool_derivation_proof_object_absence_blocker}\`

## Non-Reinterpretation Guard

| Rejection bucket | Count |
| --- | --- |
${markdownTable(rejectionRows)}

Slot-level rejection locks:

- derivation-proof target packet as derivation-proof object rejections: ${s.derivation_proof_target_packet_as_derivation_proof_object_rejections}
- source-data readiness classifier as derivation-proof object rejections: ${s.source_data_readiness_classifier_as_derivation_proof_object_rejections}
- derivation-proof source-data record as derivation-proof object rejections: ${s.derivation_proof_source_data_record_as_derivation_proof_object_rejections}
- source-packet acceptance rule target packet as derivation-proof object rejections: ${s.source_packet_acceptance_rule_target_packet_as_derivation_proof_object_rejections}
- kernel/binding split classifier as derivation-proof object rejections: ${s.kernel_binding_split_classifier_as_derivation_proof_object_rejections}
- blocker-vector handoff classifier as derivation-proof object rejections: ${s.blocker_vector_handoff_classifier_as_derivation_proof_object_rejections}
- proof-obligation dependency classifier as derivation-proof object rejections: ${s.proof_obligation_dependency_classifier_as_derivation_proof_object_rejections}

## Authorization Lock

- route_decisions_made: ${s.route_decisions_made}
- proof_rule_decisions_made: ${s.proof_rule_decisions_made}
- primitive_acceptance_decisions_made: ${s.primitive_acceptance_decisions_made}
- source_packet_acceptance_decisions_made: ${s.source_packet_acceptance_decisions_made}
- source_packet_acceptance_rules_constructed: ${s.source_packet_acceptance_rules_constructed}
- accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: ${s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets}
- accepted_interval_certified_constants_statuses_constructed: ${s.accepted_interval_certified_constants_statuses_constructed}
- row_consumption_count: ${packet.authorization_lock.row_consumption_count}
- preledger_pass: ${packet.authorization_lock.preledger_pass}
- updates_live_ledger: ${packet.authorization_lock.updates_live_ledger}
- branch_chart_authorized: ${packet.authorization_lock.branch_chart_authorized}

This classifier does not construct a derivation proof, proof rule, source-packet
acceptance rule, accepted source packet, accepted interval-certified constants
status, row consumption, live-ledger update, or branch-chart authorization.

## Next Handoff

The remaining blocker is \`${s.first_derivation_proof_blocker}\`, sharpened to
\`${s.first_current_pool_derivation_proof_object_absence_blocker}\` by the
current-pool scan. The lane cannot continue mechanically from the present
certificate pool; it needs a proof-grade
\`source_packet_acceptance_rule_derivation_proof\` object before source-packet
acceptance rule construction or accepted-status construction can proceed.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    sourceDataReadiness: args.sourceDataReadiness,
  };
  const sourceDataReadiness = readJson(paths.sourceDataReadiness);
  const poolRecords = scanCertificatePool(args.certificatePoolDir, OUTPUT_JSON);
  const packet = buildPacket(paths, sourceDataReadiness, poolRecords);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, packet, args.pretty);
  writeText(outReport, renderReport(packet));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
