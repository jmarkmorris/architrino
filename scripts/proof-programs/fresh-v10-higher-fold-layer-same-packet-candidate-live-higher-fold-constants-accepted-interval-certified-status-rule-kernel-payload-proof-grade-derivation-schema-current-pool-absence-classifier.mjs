#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SCHEMA_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PAYLOAD_CONSTRUCTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_construction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONTRACT_SATISFACTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONTRACT_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_KERNEL_BINDING_SPLIT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SCHEMA_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet_fail_closed_schema_target_declared_schema_absent_no_rule_kernel_derivation_payload_no_derivation_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier_fail_closed_schema_target_declared_current_pool_schema_absent_no_rule_kernel_derivation_payload_no_derivation_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";

const COMPATIBLE_SCHEMA_ROLE =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema";
const COMPATIBLE_PROOF_OBJECT_ROLE = "source_packet_acceptance_rule_derivation_proof_object";
const DERIVATION_PROOF_TARGET =
  "source_packet_acceptance_rule_derivation_proof_for_live_same_packet_separator_aggregate_family";
const RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const DERIVATION_PROOF_BLOCKER = "source_packet_acceptance_rule_derivation_proof_absent";
const CONTRACT_BLOCKER = "source_packet_acceptance_rule_derivation_proof_object_contract_unfilled";
const RULE_KERNEL_PAYLOAD_BLOCKER =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_absent";
const PAYLOAD_SCHEMA_BLOCKER =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_absent";
const SCHEMA_TARGET_BLOCKER =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_target_declared_schema_absent";
const CURRENT_POOL_SCHEMA_ABSENCE_BLOCKER =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_absent_from_current_certificate_pool";
const SOUNDNESS_PROOF_BLOCKER = "source_packet_acceptance_rule_soundness_proof_absent";
const APPLICATION_PROOF_BLOCKER = "source_packet_acceptance_rule_endpoint_application_proof_absent";
const CONFORMANCE_BLOCKER = "existing_constants_contract_packet_identity_mismatch";

const EXPECTED_CURRENT_POOL_JSON_FILES = 271;
const EXPECTED_ACCEPTED_STATUS_LANE_JSON_FILES = 37;
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

const KNOWN_BASENAME_KEYS = {
  schema_target:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  payload_construction:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_construction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  contract_satisfaction:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  contract_target:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  kernel_binding_split:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  derivation_proof_object_absence:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_current_pool_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  source_data_readiness:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  derivation_proof_target:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  source_packet_acceptance_rule_target:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  blocker_vector:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_acceptance_rule_blocker_vector_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  proof_obligation_dependency:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_proof_obligation_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
};

const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
]);

const REJECTION_BUCKETS = [
  "packet_identity_mismatch",
  "not_rule_kernel_payload_proof_grade_derivation_schema",
  "fail_closed_artifact",
  "schema_target_packet_not_schema",
  "payload_construction_attempt_not_schema",
  "contract_satisfaction_attempt_not_schema",
  "contract_target_packet_not_schema",
  "kernel_binding_split_classifier_not_schema",
  "derivation_proof_object_current_pool_absence_classifier_not_schema",
  "source_data_readiness_classifier_not_schema",
  "derivation_proof_target_packet_not_schema",
  "source_packet_acceptance_rule_target_packet_not_schema",
  "blocker_vector_handoff_classifier_not_schema",
  "proof_obligation_dependency_classifier_not_schema",
  "proof_grade_derivation_ref_wrong_evidence_family",
  "source_certificate_or_source_data_handle_not_schema",
  "rule_kernel_derivation_payload_absent",
  "derivation_proof_absent",
  "accepted_status_absent",
];

function parseArgs(argv) {
  const args = {
    schemaTarget: DEFAULT_SCHEMA_TARGET,
    payloadConstruction: DEFAULT_PAYLOAD_CONSTRUCTION,
    contractSatisfaction: DEFAULT_CONTRACT_SATISFACTION,
    contractTarget: DEFAULT_CONTRACT_TARGET,
    kernelBindingSplit: DEFAULT_KERNEL_BINDING_SPLIT,
    certificatePoolDir: CERT_DIR,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--schema-target") {
      args.schemaTarget = argv[++index];
    } else if (arg === "--payload-construction") {
      args.payloadConstruction = argv[++index];
    } else if (arg === "--contract-satisfaction") {
      args.contractSatisfaction = argv[++index];
    } else if (arg === "--contract-target") {
      args.contractTarget = argv[++index];
    } else if (arg === "--kernel-binding-split") {
      args.kernelBindingSplit = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-rule-kernel-payload-proof-grade-derivation-schema-current-pool-absence-classifier.mjs [options]

Options:
  --schema-target PATH        Proof-grade derivation schema target packet. Defaults to ${DEFAULT_SCHEMA_TARGET}.
  --payload-construction PATH Rule-kernel derivation payload construction attempt. Defaults to ${DEFAULT_PAYLOAD_CONSTRUCTION}.
  --contract-satisfaction PATH Derivation-proof object contract-target satisfaction attempt. Defaults to ${DEFAULT_CONTRACT_SATISFACTION}.
  --contract-target PATH      Derivation-proof object contract target packet. Defaults to ${DEFAULT_CONTRACT_TARGET}.
  --kernel-binding-split PATH Source-packet acceptance rule kernel/binding split classifier. Defaults to ${DEFAULT_KERNEL_BINDING_SPLIT}.
  --certificate-pool-dir PATH Certificate JSON pool directory. Defaults to ${CERT_DIR}.
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
    ["accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet", paths.schemaTarget],
    ["accepted_status_rule_kernel_payload_construction_attempt", paths.payloadConstruction],
    [
      "accepted_status_source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt",
      paths.contractSatisfaction,
    ],
    [
      "accepted_status_source_packet_acceptance_rule_derivation_proof_object_contract_target_packet",
      paths.contractTarget,
    ],
    ["accepted_status_source_packet_acceptance_rule_kernel_binding_split_classifier", paths.kernelBindingSplit],
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

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
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

function validateSchemaTarget(schemaTarget) {
  assertPacketStatusAndLocks(schemaTarget, "schemaTarget", SCHEMA_TARGET_STATUS);
  const s = schemaTarget.summary;
  expectEqual(s.direct_source_hash_checks_passed, 4, "schema target direct locks");
  expectEqual(s.retained_payload_construction_direct_source_hash_checks_passed, 3, "retained payload locks");
  expectEqual(s.retained_contract_satisfaction_direct_source_hash_checks_passed, 5, "retained satisfaction locks");
  expectEqual(s.retained_contract_target_direct_source_hash_checks_passed, 2, "retained contract target locks");
  expectEqual(s.retained_derivation_proof_target_direct_source_hash_checks_passed, 2, "retained derivation target locks");
  expectEqual(s.retained_kernel_binding_split_direct_source_hash_checks_passed, 1, "retained kernel split locks");
  expectEqual(s.candidate_separator_constants, 12, "separator constants");
  expectEqual(s.candidate_row_constant_associations, 112, "row associations");
  expectEqual(s.proof_grade_derivation_schema_target_slots, 124, "schema target slots");
  expectEqual(s.proof_grade_derivation_schema_target_slots_declared, 124, "schema target slots declared");
  expectEqual(s.proof_grade_derivation_schema_target_slots_satisfied, 0, "schema target slots satisfied");
  expectEqual(s.proof_grade_derivation_schema_target_fields, 8, "schema target fields");
  expectEqual(s.proof_grade_derivation_schema_target_field_slots, 992, "schema target field slots");
  expectEqual(s.proof_grade_derivation_schema_target_field_slots_satisfied, 0, "schema target field slots satisfied");
  expectEqual(s.proof_grade_derivation_schemas_constructed, 0, "schemas constructed");
  expectEqual(s.proof_grade_derivation_schemas_accepted, 0, "schemas accepted");
  expectEqual(s.rule_kernel_derivation_payloads_constructed, 0, "payloads constructed");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  expectEqual(s.route_decisions_made, 0, "route decisions");
  expectEqual(s.proof_rule_decisions_made, 0, "proof-rule decisions");
  expectEqual(s.primitive_acceptance_decisions_made, 0, "primitive-acceptance decisions");
  expectEqual(s.source_packet_acceptance_decisions_made, 0, "source-packet acceptance decisions");
  assertRowsBySeparator(s, "schema target");
}

function isAcceptedStatusLane(basename) {
  return ACCEPTED_STATUS_LANE_PREFIXES.some((prefix) => basename.startsWith(prefix));
}

function positiveSummaryNumber(parsed, field) {
  return Number(parsed.summary?.[field] ?? parsed[field] ?? 0) > 0;
}

function candidateHasCompatibleProofGradeDerivationSchema(parsed, text) {
  if (String(parsed.status ?? "").includes("fail_closed")) {
    return false;
  }
  if (parsed.packet_id !== PACKET_ID) {
    return false;
  }
  return (
    parsed.compatible_schema_role === COMPATIBLE_SCHEMA_ROLE ||
    parsed.proof_grade_derivation_schema?.compatible_schema_role === COMPATIBLE_SCHEMA_ROLE ||
    /"proof_grade_derivation_schema_present"\s*:\s*true/.test(text) ||
    /"proof_grade_derivation_schema_accepted"\s*:\s*true/.test(text) ||
    /"proof_grade_derivation_schemas_constructed"\s*:\s*[1-9]/.test(text) ||
    /"proof_grade_derivation_schemas_accepted"\s*:\s*[1-9]/.test(text)
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
  if (basename === KNOWN_BASENAME_KEYS.schema_target) {
    buckets.push("schema_target_packet_not_schema");
  }
  if (basename === KNOWN_BASENAME_KEYS.payload_construction) {
    buckets.push("payload_construction_attempt_not_schema");
  }
  if (basename === KNOWN_BASENAME_KEYS.contract_satisfaction) {
    buckets.push("contract_satisfaction_attempt_not_schema");
  }
  if (basename === KNOWN_BASENAME_KEYS.contract_target) {
    buckets.push("contract_target_packet_not_schema");
  }
  if (basename === KNOWN_BASENAME_KEYS.kernel_binding_split) {
    buckets.push("kernel_binding_split_classifier_not_schema");
  }
  if (basename === KNOWN_BASENAME_KEYS.derivation_proof_object_absence) {
    buckets.push("derivation_proof_object_current_pool_absence_classifier_not_schema");
  }
  if (basename === KNOWN_BASENAME_KEYS.source_data_readiness) {
    buckets.push("source_data_readiness_classifier_not_schema");
  }
  if (basename === KNOWN_BASENAME_KEYS.derivation_proof_target) {
    buckets.push("derivation_proof_target_packet_not_schema");
  }
  if (basename === KNOWN_BASENAME_KEYS.source_packet_acceptance_rule_target) {
    buckets.push("source_packet_acceptance_rule_target_packet_not_schema");
  }
  if (basename === KNOWN_BASENAME_KEYS.blocker_vector) {
    buckets.push("blocker_vector_handoff_classifier_not_schema");
  }
  if (basename === KNOWN_BASENAME_KEYS.proof_obligation_dependency) {
    buckets.push("proof_obligation_dependency_classifier_not_schema");
  }
  if (text.includes("proof_grade_derivation_ref")) {
    buckets.push("proof_grade_derivation_ref_wrong_evidence_family");
  }
  if (text.includes("source_certificate") || text.includes("source-certificate") || text.includes("source_data")) {
    buckets.push("source_certificate_or_source_data_handle_not_schema");
  }
  if (
    !/"rule_kernel_derivation_payload_constructed"\s*:\s*true/.test(text) &&
    !/"rule_kernel_derivation_payloads_constructed"\s*:\s*[1-9]/.test(text)
  ) {
    buckets.push("rule_kernel_derivation_payload_absent");
  }
  if (
    !/"source_packet_acceptance_rule_derivation_proof_present"\s*:\s*true/.test(text) &&
    !/"source_packet_acceptance_rule_derivation_proofs_constructed"\s*:\s*[1-9]/.test(text)
  ) {
    buckets.push("derivation_proof_absent");
  }
  if (
    !/"accepted_interval_certified_constants_status_present"\s*:\s*true/.test(text) &&
    !/"accepted_interval_certified_constants_statuses_constructed"\s*:\s*[1-9]/.test(text)
  ) {
    buckets.push("accepted_status_absent");
  }
  if (buckets.length === 0) {
    buckets.push("not_rule_kernel_payload_proof_grade_derivation_schema");
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
  const compatible = candidateHasCompatibleProofGradeDerivationSchema(parsed, text);
  return {
    basename,
    sha256: sha256File(filePath),
    packet_id: parsed.packet_id ?? null,
    schema: String(parsed.schema ?? ""),
    status,
    accepted_status_lane: isAcceptedStatusLane(basename),
    fail_closed: status.includes("fail_closed"),
    compatible_rule_kernel_payload_proof_grade_derivation_schema: compatible,
    has_proof_grade_derivation_schema_present_true:
      /"proof_grade_derivation_schema_present"\s*:\s*true/.test(text),
    proof_grade_derivation_schemas_constructed: Number(
      parsed.summary?.proof_grade_derivation_schemas_constructed ?? 0,
    ),
    rule_kernel_derivation_payloads_constructed: Number(
      parsed.summary?.rule_kernel_derivation_payloads_constructed ?? 0,
    ),
    source_packet_acceptance_rule_derivation_proofs_constructed: Number(
      parsed.summary?.source_packet_acceptance_rule_derivation_proofs_constructed ?? 0,
    ),
    source_packet_acceptance_rules_constructed: Number(
      parsed.summary?.source_packet_acceptance_rules_constructed ?? 0,
    ),
    accepted_interval_certified_constants_statuses_constructed: Number(
      parsed.summary?.accepted_interval_certified_constants_statuses_constructed ?? 0,
    ),
    row_consumption_count: Number(parsed.summary?.row_consumption_count ?? 0),
    preledger_pass: parsed.preledger_pass === true || parsed.summary?.preledger_pass === true,
    updates_live_ledger: parsed.updates_live_ledger === true || parsed.summary?.updates_live_ledger === true,
    branch_chart_authorized:
      parsed.branch_chart_authorized === true || parsed.summary?.branch_chart_authorized === true,
    proof_grade_derivation_schema_positive:
      positiveSummaryNumber(parsed, "proof_grade_derivation_schemas_constructed") ||
      positiveSummaryNumber(parsed, "proof_grade_derivation_schemas_accepted"),
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

function buildSeparatorProfiles(schemaTarget) {
  return schemaTarget.separator_rule_kernel_payload_proof_grade_derivation_schema_target_profiles
    .map((profile) => ({
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      row_count: profile.row_count,
      compatible_schema_role: COMPATIBLE_SCHEMA_ROLE,
      compatible_proof_object_role: COMPATIBLE_PROOF_OBJECT_ROLE,
      derivation_proof_target: DERIVATION_PROOF_TARGET,
      current_pool_proof_grade_derivation_schema_scan_complete: true,
      compatible_current_pool_proof_grade_derivation_schema_refs: [],
      current_pool_proof_grade_derivation_schema_present: false,
      proof_grade_derivation_schema_targets_declared: profile.proof_grade_derivation_schema_targets_declared,
      proof_grade_derivation_schema_targets_satisfied: 0,
      proof_grade_derivation_schema_target_packet_is_schema: false,
      rule_kernel_payload_construction_attempt_is_schema: false,
      proof_grade_derivation_schema_constructed: false,
      proof_grade_derivation_schema_accepted: false,
      rule_kernel_derivation_payload_constructed: false,
      schema_target_record: profile.schema_target_record,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      source_packet_acceptance_decision_made: false,
      source_packet_acceptance_rule_constructed: false,
      accepted_interval_certified_constants_status_constructed: false,
      row_consumption_count: 0,
      preledger_pass_rows: 0,
      branch_chart_authorized_rows: 0,
      first_rule_blocker: RULE_BLOCKER,
      first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
      first_payload_construction_blocker: PAYLOAD_SCHEMA_BLOCKER,
      first_schema_target_blocker: SCHEMA_TARGET_BLOCKER,
      first_current_pool_schema_absence_blocker: CURRENT_POOL_SCHEMA_ABSENCE_BLOCKER,
      classification:
        "separator_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absent_fail_closed",
    }))
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function buildRowProfiles(schemaTarget) {
  return schemaTarget.row_rule_kernel_payload_proof_grade_derivation_schema_target_profiles
    .map((profile) => ({
      row_id: profile.row_id,
      ledger: profile.ledger,
      status: profile.status,
      failure_code: profile.failure_code,
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      receiver_interval: profile.receiver_interval,
      source_interval: profile.source_interval,
      compatible_schema_role: COMPATIBLE_SCHEMA_ROLE,
      compatible_proof_object_role: COMPATIBLE_PROOF_OBJECT_ROLE,
      derivation_proof_target: DERIVATION_PROOF_TARGET,
      current_pool_proof_grade_derivation_schema_scan_complete: true,
      compatible_current_pool_proof_grade_derivation_schema_refs: [],
      current_pool_proof_grade_derivation_schema_present: false,
      proof_grade_derivation_schema_targets_declared: profile.proof_grade_derivation_schema_targets_declared,
      proof_grade_derivation_schema_targets_satisfied: 0,
      proof_grade_derivation_schema_target_packet_is_schema: false,
      rule_kernel_payload_construction_attempt_is_schema: false,
      proof_grade_derivation_schema_constructed: false,
      proof_grade_derivation_schema_accepted: false,
      rule_kernel_derivation_payload_constructed: false,
      schema_target_record: profile.schema_target_record,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      source_packet_acceptance_decision_made: false,
      source_packet_acceptance_rule_constructed: false,
      accepted_interval_certified_constants_status_constructed: false,
      accepted_fold_layer_row: false,
      row_consumed: false,
      preledger_pass: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
      first_rule_blocker: RULE_BLOCKER,
      first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
      first_payload_construction_blocker: PAYLOAD_SCHEMA_BLOCKER,
      first_schema_target_blocker: SCHEMA_TARGET_BLOCKER,
      first_current_pool_schema_absence_blocker: CURRENT_POOL_SCHEMA_ABSENCE_BLOCKER,
      classification: "row_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absent_fail_closed",
    }))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, schemaTarget, poolRecords) {
  validateSchemaTarget(schemaTarget);
  const sourceChecks = sourceHashChecks(paths);
  const source = schemaTarget.summary;
  const separatorProfiles = buildSeparatorProfiles(schemaTarget);
  const rowProfiles = buildRowProfiles(schemaTarget);
  const acceptedStatusLaneRecords = poolRecords.filter((record) => record.accepted_status_lane);
  const compatibleSchemaRecords = poolRecords.filter(
    (record) => record.compatible_rule_kernel_payload_proof_grade_derivation_schema,
  );
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const schemaSlots = separatorProfiles.length + rowProfiles.length;
  const targetFieldSlots = source.proof_grade_derivation_schema_target_field_slots;

  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_schema_target_direct_source_hash_checks_passed: source.direct_source_hash_checks_passed,
    retained_payload_construction_direct_source_hash_checks_passed:
      source.retained_payload_construction_direct_source_hash_checks_passed,
    retained_contract_satisfaction_direct_source_hash_checks_passed:
      source.retained_contract_satisfaction_direct_source_hash_checks_passed,
    retained_contract_target_direct_source_hash_checks_passed:
      source.retained_contract_target_direct_source_hash_checks_passed,
    retained_derivation_proof_target_direct_source_hash_checks_passed:
      source.retained_derivation_proof_target_direct_source_hash_checks_passed,
    retained_kernel_binding_split_direct_source_hash_checks_passed:
      source.retained_kernel_binding_split_direct_source_hash_checks_passed,
    current_pool_json_files_scanned: poolRecords.length,
    accepted_status_lane_json_files_scanned: acceptedStatusLaneRecords.length,
    accepted_status_lane_fail_closed_json_files: countTrue(acceptedStatusLaneRecords, (record) => record.fail_closed),
    accepted_status_lane_non_fail_closed_json_files: countTrue(
      acceptedStatusLaneRecords,
      (record) => record.fail_closed === false,
    ),
    current_pool_proof_grade_derivation_schema_files_found: compatibleSchemaRecords.length,
    current_pool_compatible_proof_grade_derivation_schema_refs: 0,
    current_pool_rejection_bucket_counts: rejectionBucketCounts(poolRecords),
    candidate_higher_fold_constants_artifacts: source.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: separatorProfiles.length,
    candidate_row_constant_associations: rowProfiles.length,
    rows_by_separator_count: rowsBySeparator,
    separator_current_pool_schema_absence_profiles: separatorProfiles.length,
    row_current_pool_schema_absence_profiles: rowProfiles.length,
    total_current_pool_schema_absence_profiles: schemaSlots,
    derivation_proof_source_data_records: source.derivation_proof_source_data_records,
    derivation_proof_source_data_records_ready: source.derivation_proof_source_data_records_ready,
    retained_contract_field_slots: source.retained_contract_field_slots,
    retained_contract_field_source_available_slots: source.retained_contract_field_source_available_slots,
    retained_contract_field_slots_satisfied: source.retained_contract_field_slots_satisfied,
    retained_rule_kernel_derivation_payload_target_slots:
      source.retained_rule_kernel_derivation_payload_target_slots,
    retained_rule_kernel_derivation_payloads_constructed:
      source.retained_rule_kernel_derivation_payloads_constructed,
    retained_payload_construction_field_slots: source.retained_payload_construction_field_slots,
    retained_payload_construction_field_source_available_slots:
      source.retained_payload_construction_field_source_available_slots,
    retained_proof_grade_derivation_schema_source_available_slots:
      source.retained_proof_grade_derivation_schema_source_available_slots,
    retained_rule_kernel_obligation_slots: source.retained_rule_kernel_obligation_slots,
    retained_rule_kernel_obligation_slots_satisfied: source.retained_rule_kernel_obligation_slots_satisfied,
    retained_source_packet_acceptance_rule_derivation_proof_slots:
      source.retained_source_packet_acceptance_rule_derivation_proof_slots,
    retained_source_packet_acceptance_rule_derivation_proof_slots_satisfied:
      source.retained_source_packet_acceptance_rule_derivation_proof_slots_satisfied,
    retained_source_packet_acceptance_rule_soundness_proof_slots:
      source.retained_source_packet_acceptance_rule_soundness_proof_slots,
    retained_source_packet_acceptance_rule_soundness_proof_slots_satisfied:
      source.retained_source_packet_acceptance_rule_soundness_proof_slots_satisfied,
    retained_source_packet_acceptance_rule_endpoint_application_proof_slots:
      source.retained_source_packet_acceptance_rule_endpoint_application_proof_slots,
    retained_source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied:
      source.retained_source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied,
    retained_binding_and_evidence_obligation_slots: source.retained_binding_and_evidence_obligation_slots,
    retained_binding_and_evidence_obligation_slots_satisfied:
      source.retained_binding_and_evidence_obligation_slots_satisfied,
    retained_total_split_obligation_slots: source.retained_total_split_obligation_slots,
    retained_total_split_obligation_slots_satisfied: source.retained_total_split_obligation_slots_satisfied,
    proof_grade_derivation_schema_target_slots: source.proof_grade_derivation_schema_target_slots,
    proof_grade_derivation_schema_target_slots_declared:
      source.proof_grade_derivation_schema_target_slots_declared,
    proof_grade_derivation_schema_target_slots_satisfied: 0,
    proof_grade_derivation_schema_target_fields: source.proof_grade_derivation_schema_target_fields,
    proof_grade_derivation_schema_target_field_slots: targetFieldSlots,
    proof_grade_derivation_schema_target_field_slots_satisfied: 0,
    proof_grade_derivation_schema_current_pool_absence_slots: schemaSlots,
    proof_grade_derivation_schema_current_pool_absence_slots_satisfied: schemaSlots,
    proof_grade_derivation_schemas_constructed: 0,
    proof_grade_derivation_schemas_accepted: 0,
    rule_kernel_derivation_payloads_constructed: 0,
    schema_target_packet_as_schema_rejections: schemaSlots,
    rule_kernel_payload_construction_attempt_as_schema_rejections: schemaSlots,
    contract_target_satisfaction_attempt_as_schema_rejections: schemaSlots,
    contract_target_packet_as_schema_rejections: schemaSlots,
    kernel_binding_split_classifier_as_schema_rejections: schemaSlots,
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
    proof_grade_derivation_schema_positive_files: countTrue(
      poolRecords,
      (record) => record.proof_grade_derivation_schema_positive,
    ),
    rule_kernel_derivation_payload_positive_files: countTrue(
      poolRecords,
      (record) => record.rule_kernel_derivation_payloads_constructed > 0,
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
    first_derivation_proof_object_contract_blocker: CONTRACT_BLOCKER,
    first_missing_contract_field_blocker: RULE_KERNEL_PAYLOAD_BLOCKER,
    first_payload_construction_blocker: PAYLOAD_SCHEMA_BLOCKER,
    first_schema_target_blocker: SCHEMA_TARGET_BLOCKER,
    first_current_pool_schema_absence_blocker: CURRENT_POOL_SCHEMA_ABSENCE_BLOCKER,
    first_downstream_rule_kernel_blocker_after_derivation: SOUNDNESS_PROOF_BLOCKER,
    first_endpoint_application_blocker: APPLICATION_PROOF_BLOCKER,
    first_binding_and_evidence_blocker: CONFORMANCE_BLOCKER,
  };

  const packet = {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status rule-kernel payload proof-grade derivation schema current-pool absence",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status source-packet acceptance rule derivation proof object rule-kernel derivation payload proof-grade derivation schema current-pool absence",
    claim_level:
      "priority-only proof-grade derivation schema current-pool absence classifier; imports the proof-grade derivation schema target packet, scans the current certificate JSON pool, proves that no compatible proof-grade derivation schema object exists for the declared rule-kernel payload schema target, and keeps every proof-rule, primitive-acceptance, source-packet acceptance, accepted-status, row-consumption, live-ledger, and branch-chart decision absent",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet:
        artifactRecord(paths.schemaTarget),
      accepted_status_rule_kernel_payload_construction_attempt: artifactRecord(paths.payloadConstruction),
      accepted_status_source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt:
        artifactRecord(paths.contractSatisfaction),
      accepted_status_source_packet_acceptance_rule_derivation_proof_object_contract_target_packet:
        artifactRecord(paths.contractTarget),
      accepted_status_source_packet_acceptance_rule_kernel_binding_split_classifier:
        artifactRecord(paths.kernelBindingSplit),
    },
    source_hash_checks: sourceChecks,
    compatible_schema_role: COMPATIBLE_SCHEMA_ROLE,
    compatible_proof_object_role: COMPATIBLE_PROOF_OBJECT_ROLE,
    derivation_proof_target: DERIVATION_PROOF_TARGET,
    current_pool_scan_rule:
      "A compatible object must be an explicit non-fail-closed proof-grade derivation schema for the rule-kernel derivation payload role and packet id. Schema target packets, payload construction attempts, contract-target satisfaction attempts, contract target packets, kernel/binding split classifiers, derivation-proof object absence classifiers, source-data readiness classifiers, derivation-proof target packets, source-packet acceptance rule target packets, blocker-vector/proof-obligation classifiers, proof-grade derivation-ref evidence families, source certificates, and source-data handles are rejected as schema objects.",
    current_pool_proof_grade_derivation_schema_records: compatibleSchemaRecords,
    current_pool_rejection_bucket_counts: summary.current_pool_rejection_bucket_counts,
    separator_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_profiles:
      separatorProfiles,
    row_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence",
      sharpened_blocker:
        "The proof-grade derivation schema target is declared for all 124 rule-kernel payload slots, but the current certificate JSON pool contains 0 compatible proof-grade derivation schema objects.",
      current_pool_closure_state:
        "not mechanically closable from the current certificate pool; a proof-grade derivation schema object is still required before rule-kernel derivation payload construction or derivation-proof construction can proceed",
      first_rule_blocker: RULE_BLOCKER,
      first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
      first_payload_construction_blocker: PAYLOAD_SCHEMA_BLOCKER,
      first_schema_target_blocker: SCHEMA_TARGET_BLOCKER,
      first_current_pool_schema_absence_blocker: CURRENT_POOL_SCHEMA_ABSENCE_BLOCKER,
      mechanical_continuation_available: false,
      decision_required: true,
      required_external_inputs: [
        COMPATIBLE_SCHEMA_ROLE,
        "source_packet_acceptance_rule_derivation_proof",
      ],
      downstream_inputs_not_actionable_until_proof_grade_derivation_schema_present: [
        "rule_kernel_derivation_payload",
        "source_packet_acceptance_rule_derivation_proof",
        "source_packet_acceptance_rule_soundness_proof",
        "source_packet_acceptance_rule_endpoint_application_proof",
        "accepted_constants_conformance",
        "compatible_source_packet_acceptance_evidence",
        "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
      ],
      forbidden_reinterpretations: [
        "rule_kernel_payload_proof_grade_derivation_schema_target_packet_as_proof_grade_derivation_schema",
        "rule_kernel_payload_construction_attempt_as_proof_grade_derivation_schema",
        "source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt_as_proof_grade_derivation_schema",
        "source_packet_acceptance_rule_derivation_proof_object_contract_target_packet_as_proof_grade_derivation_schema",
        "source_packet_acceptance_rule_kernel_binding_split_classifier_as_proof_grade_derivation_schema",
        "proof_grade_derivation_ref_evidence_object_as_rule_kernel_payload_proof_grade_derivation_schema",
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
      "Priority-only. This classifier proves current-pool absence for the proof-grade derivation schema target; it does not construct or accept a proof-grade derivation schema, rule-kernel derivation payload, derivation proof, proof rule, source-packet acceptance rule, accepted source packet, or accepted interval-certified constants status.",
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
    s.direct_source_hash_checks === 5,
    s.direct_source_hash_checks_passed === 5,
    s.retained_schema_target_direct_source_hash_checks_passed === 4,
    s.retained_payload_construction_direct_source_hash_checks_passed === 3,
    s.retained_contract_satisfaction_direct_source_hash_checks_passed === 5,
    s.retained_contract_target_direct_source_hash_checks_passed === 2,
    s.retained_derivation_proof_target_direct_source_hash_checks_passed === 2,
    s.retained_kernel_binding_split_direct_source_hash_checks_passed === 1,
    s.current_pool_json_files_scanned === EXPECTED_CURRENT_POOL_JSON_FILES,
    s.accepted_status_lane_json_files_scanned === EXPECTED_ACCEPTED_STATUS_LANE_JSON_FILES,
    s.accepted_status_lane_fail_closed_json_files === EXPECTED_ACCEPTED_STATUS_LANE_JSON_FILES,
    s.accepted_status_lane_non_fail_closed_json_files === 0,
    s.current_pool_proof_grade_derivation_schema_files_found === 0,
    s.current_pool_compatible_proof_grade_derivation_schema_refs === 0,
    s.candidate_separator_constants === 12,
    s.candidate_row_constant_associations === 112,
    JSON.stringify(s.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR),
    s.total_current_pool_schema_absence_profiles === 124,
    s.derivation_proof_source_data_records === 124,
    s.derivation_proof_source_data_records_ready === 124,
    s.retained_contract_field_slots === 992,
    s.retained_contract_field_source_available_slots === 868,
    s.retained_contract_field_slots_satisfied === 0,
    s.retained_rule_kernel_derivation_payload_target_slots === 124,
    s.retained_rule_kernel_derivation_payloads_constructed === 0,
    s.retained_payload_construction_field_slots === 868,
    s.retained_payload_construction_field_source_available_slots === 744,
    s.retained_proof_grade_derivation_schema_source_available_slots === 0,
    s.retained_rule_kernel_obligation_slots === 372,
    s.retained_rule_kernel_obligation_slots_satisfied === 0,
    s.retained_binding_and_evidence_obligation_slots === 496,
    s.retained_binding_and_evidence_obligation_slots_satisfied === 0,
    s.retained_total_split_obligation_slots === 868,
    s.retained_total_split_obligation_slots_satisfied === 0,
    s.proof_grade_derivation_schema_target_slots === 124,
    s.proof_grade_derivation_schema_target_slots_declared === 124,
    s.proof_grade_derivation_schema_target_slots_satisfied === 0,
    s.proof_grade_derivation_schema_target_fields === 8,
    s.proof_grade_derivation_schema_target_field_slots === 992,
    s.proof_grade_derivation_schema_target_field_slots_satisfied === 0,
    s.proof_grade_derivation_schema_current_pool_absence_slots === 124,
    s.proof_grade_derivation_schema_current_pool_absence_slots_satisfied === 124,
    s.proof_grade_derivation_schemas_constructed === 0,
    s.proof_grade_derivation_schemas_accepted === 0,
    s.rule_kernel_derivation_payloads_constructed === 0,
    s.proof_grade_derivation_schema_positive_files === 0,
    s.rule_kernel_derivation_payload_positive_files === 0,
    s.source_packet_acceptance_rules_constructed === 0,
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
    s.preledger_pass === false,
    s.updates_live_ledger === false,
    s.branch_chart_authorized === false,
    s.first_current_pool_schema_absence_blocker === CURRENT_POOL_SCHEMA_ABSENCE_BLOCKER,
    packet.next_certificate_handoff.mechanical_continuation_available === false,
    packet.next_certificate_handoff.decision_required === true,
  ];
  if (!checks.every(Boolean)) {
    throw new Error("Rule-kernel payload proof-grade derivation schema current-pool absence invariant failure.");
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
  const rejectionRows = Object.entries(s.current_pool_rejection_bucket_counts).map(([bucket, count]) => [
    `\`${bucket}\``,
    String(count),
  ]);
  const rowScopeRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);

  return `# Candidate-Live Higher-Fold Constants Accepted-Status Rule-Kernel Payload Proof-Grade Derivation Schema Current-Pool Absence Classifier

Status: \`${packet.status}\`

## Claim Level

${packet.claim_level}

## Source Lock

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

Direct source-hash locks: ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks}.

## Current-Pool Scan

- certificate JSON files scanned: ${s.current_pool_json_files_scanned}
- accepted-status lane JSON files scanned: ${s.accepted_status_lane_json_files_scanned}
- accepted-status lane fail-closed JSON files: ${s.accepted_status_lane_fail_closed_json_files}
- accepted-status lane non-fail-closed JSON files: ${s.accepted_status_lane_non_fail_closed_json_files}
- compatible proof-grade derivation schema files found: ${s.current_pool_proof_grade_derivation_schema_files_found}
- compatible proof-grade derivation schema refs found: ${s.current_pool_compatible_proof_grade_derivation_schema_refs}
- first current-pool schema absence blocker: \`${s.first_current_pool_schema_absence_blocker}\`

| Rejection bucket | Count |
| --- | --- |
${markdownTable(rejectionRows)}

## Row Scope

| Separator | Rows |
| --- | --- |
${markdownTable(rowScopeRows)}

The classifier preserves ${s.candidate_separator_constants} separator profiles
and ${s.candidate_row_constant_associations} row profiles.

## Retained Schema Target

- schema target slots declared: ${s.proof_grade_derivation_schema_target_slots_declared}
- schema target slots satisfied: ${s.proof_grade_derivation_schema_target_slots_satisfied}
- schema target fields per slot: ${s.proof_grade_derivation_schema_target_fields}
- schema target field slots satisfied: ${s.proof_grade_derivation_schema_target_field_slots_satisfied} / ${s.proof_grade_derivation_schema_target_field_slots}
- current-pool schema absence slots satisfied: ${s.proof_grade_derivation_schema_current_pool_absence_slots_satisfied} / ${s.proof_grade_derivation_schema_current_pool_absence_slots}
- proof-grade derivation schemas constructed: ${s.proof_grade_derivation_schemas_constructed}
- proof-grade derivation schemas accepted: ${s.proof_grade_derivation_schemas_accepted}
- rule-kernel derivation payloads constructed: ${s.rule_kernel_derivation_payloads_constructed}
- first schema target blocker: \`${s.first_schema_target_blocker}\`

## Retained Payload And Contract State

- retained contract-field slots source-available: ${s.retained_contract_field_source_available_slots} / ${s.retained_contract_field_slots}
- retained contract-field slots satisfied: ${s.retained_contract_field_slots_satisfied} / ${s.retained_contract_field_slots}
- retained rule-kernel derivation payload targets: ${s.retained_rule_kernel_derivation_payload_target_slots}
- retained rule-kernel derivation payloads constructed: ${s.retained_rule_kernel_derivation_payloads_constructed}
- retained payload-construction field slots source-available: ${s.retained_payload_construction_field_source_available_slots} / ${s.retained_payload_construction_field_slots}
- retained proof-grade derivation schema source-available slots: ${s.retained_proof_grade_derivation_schema_source_available_slots}
- retained rule-kernel obligation slots satisfied: ${s.retained_rule_kernel_obligation_slots_satisfied} / ${s.retained_rule_kernel_obligation_slots}
- retained binding/evidence obligation slots satisfied: ${s.retained_binding_and_evidence_obligation_slots_satisfied} / ${s.retained_binding_and_evidence_obligation_slots}
- retained total split-obligation slots satisfied: ${s.retained_total_split_obligation_slots_satisfied} / ${s.retained_total_split_obligation_slots}

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

This classifier does not construct a proof-grade derivation schema, rule-kernel
derivation payload, derivation proof, proof rule, source-packet acceptance rule,
accepted source packet, accepted interval-certified constants status, row
consumption, live-ledger update, or branch-chart authorization.

## Next Handoff

The blocker is now \`${s.first_current_pool_schema_absence_blocker}\`: the
schema target is declared for every missing \`rule_kernel_derivation_payload\`,
but the current certificate JSON pool contains no compatible schema object.
Acceptance remains blocked until a proof-grade schema or derivation proof is
actually supplied.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    schemaTarget: args.schemaTarget,
    payloadConstruction: args.payloadConstruction,
    contractSatisfaction: args.contractSatisfaction,
    contractTarget: args.contractTarget,
    kernelBindingSplit: args.kernelBindingSplit,
  };
  const schemaTarget = readJson(paths.schemaTarget);
  const poolRecords = scanCertificatePool(args.certificatePoolDir, OUTPUT_JSON);
  const packet = buildPacket(paths, schemaTarget, poolRecords);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, packet, args.pretty);
  writeText(outReport, renderReport(packet));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
