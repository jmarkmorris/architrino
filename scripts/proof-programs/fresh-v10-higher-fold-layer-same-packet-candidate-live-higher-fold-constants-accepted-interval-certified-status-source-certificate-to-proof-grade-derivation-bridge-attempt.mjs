#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SOURCE_DATA_OBLIGATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_derivation_source_data_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OBSTRUCTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_obstruction_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONSISTENCY = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_consistency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_MATERIALIZATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_materialization_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_AGGREGATE = `${CERT_DIR}/higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_FIELD_OBLIGATION = `${CERT_DIR}/higher_fold_layer_same_packet_higher_fold_constants_artifact_field_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ACCEPTED_CONSTANTS_CONFORMANCE = `${CERT_DIR}/higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_ASSEMBLY = `${CERT_DIR}/higher_fold_layer_separator_certificate_assembly_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_certificate_to_proof_grade_derivation_bridge_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_certificate_to_proof_grade_derivation_bridge_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SOURCE_DATA_OBLIGATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_derivation_source_data_obligation_classifier_fail_closed_derivation_source_data_complete_accepted_status_derivation_absent_no_primitive_acceptance_no_row_consumption";
const OBSTRUCTION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_obstruction_classifier_fail_closed_candidate_consistent_accepted_status_absent_acceptance_obligations_classified_no_row_consumption";
const CONSISTENCY_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_consistency_classifier_fail_closed_candidate_exact_interval_consistency_verified_accepted_interval_certified_status_absent_no_source_packet_acceptance_no_row_consumption";
const MATERIALIZATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_materialization_attempt_fail_closed_exact_interval_fields_materialized_accepted_interval_certified_status_absent_no_source_packet_acceptance_no_row_consumption";
const SEPARATOR_AGGREGATE_STATUS =
  "higher_fold_layer_same_packet_separator_aggregate_certificate_attempt_fail_closed_row_enclosures_separator_aggregates_certified_source_packets_absent_no_row_consumption";
const FIELD_OBLIGATION_STATUS =
  "higher_fold_layer_same_packet_higher_fold_constants_artifact_field_obligation_classifier_fail_closed_interval_fields_complete_accepted_constants_artifact_absent_no_source_packet_acceptance_no_row_consumption";
const IMPULSE_ACCEPTANCE_STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const ACCEPTED_CONSTANTS_CONFORMANCE_STATUS =
  "higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier_fail_closed_aggregate_present_existing_constants_contract_packet_mismatch_no_source_packet_acceptance_no_row_consumption";
const SEPARATOR_ASSEMBLY_STATUS =
  "higher_fold_layer_separator_certificate_assembly_dependency_classifier_fail_closed_child_refs_complete_atlas_bridge_impulse_acceptance_parent_consumption_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_certificate_to_proof_grade_derivation_bridge_attempt_fail_closed_source_certificates_present_proof_grade_status_derivation_bridge_absent_no_primitive_acceptance_no_row_consumption";

const ACCEPTED_STATUS_PROOF_GRADE_DERIVATION_REF_BLOCKER =
  "accepted_interval_certified_constants_status_proof_grade_derivation_ref_absent";
const ACCEPTED_STATUS_DERIVATION_BLOCKER = "accepted_interval_certified_constants_status_derivation_absent";
const ACCEPTED_STATUS_RULE_BLOCKER = "accepted_interval_certified_constants_status_rule_absent";
const ACCEPTED_STATUS_SOUNDNESS_BLOCKER = "accepted_interval_certified_constants_status_soundness_proof_absent";
const ACCEPTED_STATUS_ENDPOINT_APPLICATION_BLOCKER =
  "accepted_interval_certified_constants_status_endpoint_application_absent";
const ACCEPTED_CONSTANTS_CONFORMANCE_DERIVATION_BLOCKER = "accepted_constants_conformance_derivation_absent";
const SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const ACCEPTED_SOURCE_PACKET_BLOCKER = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

const BRIDGE_CRITERION_FIELDS = [
  "accepted_interval_certified_constants_status_proof_grade_derivation_ref_present",
  "accepted_interval_certified_constants_status_derivation_present",
  "accepted_interval_certified_constants_status_rule_present",
  "accepted_interval_certified_constants_status_soundness_proof_present",
  "accepted_interval_certified_constants_status_endpoint_application_present",
  "accepted_constants_conformance_derivation_present",
];

const BRIDGE_BLOCKERS_BY_FIELD = {
  accepted_interval_certified_constants_status_proof_grade_derivation_ref_present:
    ACCEPTED_STATUS_PROOF_GRADE_DERIVATION_REF_BLOCKER,
  accepted_interval_certified_constants_status_derivation_present: ACCEPTED_STATUS_DERIVATION_BLOCKER,
  accepted_interval_certified_constants_status_rule_present: ACCEPTED_STATUS_RULE_BLOCKER,
  accepted_interval_certified_constants_status_soundness_proof_present: ACCEPTED_STATUS_SOUNDNESS_BLOCKER,
  accepted_interval_certified_constants_status_endpoint_application_present:
    ACCEPTED_STATUS_ENDPOINT_APPLICATION_BLOCKER,
  accepted_constants_conformance_derivation_present: ACCEPTED_CONSTANTS_CONFORMANCE_DERIVATION_BLOCKER,
};

function parseArgs(argv) {
  const args = {
    sourceDataObligation: DEFAULT_SOURCE_DATA_OBLIGATION,
    obstruction: DEFAULT_OBSTRUCTION,
    consistency: DEFAULT_CONSISTENCY,
    materialization: DEFAULT_MATERIALIZATION,
    separatorAggregate: DEFAULT_SEPARATOR_AGGREGATE,
    fieldObligation: DEFAULT_FIELD_OBLIGATION,
    impulseAcceptance: DEFAULT_IMPULSE_ACCEPTANCE,
    acceptedConstantsConformance: DEFAULT_ACCEPTED_CONSTANTS_CONFORMANCE,
    separatorAssembly: DEFAULT_SEPARATOR_ASSEMBLY,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--source-data-obligation") {
      args.sourceDataObligation = argv[++index];
    } else if (arg === "--obstruction") {
      args.obstruction = argv[++index];
    } else if (arg === "--consistency") {
      args.consistency = argv[++index];
    } else if (arg === "--materialization") {
      args.materialization = argv[++index];
    } else if (arg === "--separator-aggregate") {
      args.separatorAggregate = argv[++index];
    } else if (arg === "--field-obligation") {
      args.fieldObligation = argv[++index];
    } else if (arg === "--impulse-acceptance") {
      args.impulseAcceptance = argv[++index];
    } else if (arg === "--accepted-constants-conformance") {
      args.acceptedConstantsConformance = argv[++index];
    } else if (arg === "--separator-assembly") {
      args.separatorAssembly = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-source-certificate-to-proof-grade-derivation-bridge-attempt.mjs [options]

Options:
  --source-data-obligation PATH  Accepted-status derivation source-data obligation classifier. Defaults to ${DEFAULT_SOURCE_DATA_OBLIGATION}.
  --obstruction PATH             Accepted-status obstruction classifier. Defaults to ${DEFAULT_OBSTRUCTION}.
  --consistency PATH             Candidate-live constants artifact consistency classifier. Defaults to ${DEFAULT_CONSISTENCY}.
  --materialization PATH          Candidate-live constants artifact materialization attempt. Defaults to ${DEFAULT_MATERIALIZATION}.
  --separator-aggregate PATH      Same-packet separator aggregate certificate attempt. Defaults to ${DEFAULT_SEPARATOR_AGGREGATE}.
  --field-obligation PATH         Higher-fold constants artifact field obligation classifier. Defaults to ${DEFAULT_FIELD_OBLIGATION}.
  --impulse-acceptance PATH       Impulse-bound source-packet acceptance dependency classifier. Defaults to ${DEFAULT_IMPULSE_ACCEPTANCE}.
  --accepted-constants-conformance PATH
                                  Fixed-parameter aggregate accepted-constants conformance classifier. Defaults to ${DEFAULT_ACCEPTED_CONSTANTS_CONFORMANCE}.
  --separator-assembly PATH       Separator-certificate assembly dependency classifier. Defaults to ${DEFAULT_SEPARATOR_ASSEMBLY}.
  --out-dir PATH                 Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                       Pretty-print JSON artifact.
  --help                         Show this help.`);
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

function assertPacketId(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
}

function assertStatus(source, name, expected) {
  if (source.status !== expected) {
    throw new Error(`Unexpected ${name} status: ${source.status}`);
  }
}

function assertFailClosed(source, name) {
  if (source.preledger_pass !== false || source.updates_live_ledger !== false) {
    throw new Error(`${name} does not preserve preledger/live-ledger locks.`);
  }
  if (source.branch_chart_authorized !== false) {
    throw new Error(`${name} does not preserve branch-chart lock.`);
  }
}

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function rowSortKey(row) {
  return `${String(separatorSortKey(row.separator_event)).padStart(3, "0")}:${row.row_id}`;
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

function sortedObjectBySeparator(counts) {
  return Object.fromEntries(
    Object.entries(counts).sort(([left], [right]) => separatorSortKey(left) - separatorSortKey(right)),
  );
}

function allTrue(value) {
  return Object.values(value).every(Boolean);
}

function criterionMap(entry) {
  return Object.fromEntries(BRIDGE_CRITERION_FIELDS.map((field) => [field, entry[field] === true]));
}

function firstMissingCriterion(criteria) {
  const missingField = BRIDGE_CRITERION_FIELDS.find((field) => criteria[field] !== true);
  return missingField ? BRIDGE_BLOCKERS_BY_FIELD[missingField] : null;
}

function presenceCounts(rows, fields, getter) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => getter(row, field));
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function countMissingFields(criteria) {
  return BRIDGE_CRITERION_FIELDS.filter((field) => criteria[field] !== true).length;
}

function validateInputs(inputs) {
  assertPacketId(inputs.sourceDataObligation, "sourceDataObligation");
  assertPacketId(inputs.obstruction, "obstruction");
  assertPacketId(inputs.consistency, "consistency");
  assertPacketId(inputs.materialization, "materialization");
  assertPacketId(inputs.separatorAggregate, "separatorAggregate");
  assertPacketId(inputs.fieldObligation, "fieldObligation");
  assertPacketId(inputs.impulseAcceptance, "impulseAcceptance");
  assertPacketId(inputs.acceptedConstantsConformance, "acceptedConstantsConformance");
  assertPacketId(inputs.separatorAssembly, "separatorAssembly");
  assertFailClosed(inputs.sourceDataObligation, "sourceDataObligation");
  assertFailClosed(inputs.obstruction, "obstruction");
  assertFailClosed(inputs.consistency, "consistency");
  assertFailClosed(inputs.materialization, "materialization");
  assertFailClosed(inputs.separatorAggregate, "separatorAggregate");
  assertFailClosed(inputs.fieldObligation, "fieldObligation");
  assertFailClosed(inputs.impulseAcceptance, "impulseAcceptance");
  assertFailClosed(inputs.acceptedConstantsConformance, "acceptedConstantsConformance");
  assertFailClosed(inputs.separatorAssembly, "separatorAssembly");
  assertStatus(inputs.sourceDataObligation, "sourceDataObligation", SOURCE_DATA_OBLIGATION_STATUS);
  assertStatus(inputs.obstruction, "obstruction", OBSTRUCTION_STATUS);
  assertStatus(inputs.consistency, "consistency", CONSISTENCY_STATUS);
  assertStatus(inputs.materialization, "materialization", MATERIALIZATION_STATUS);
  assertStatus(inputs.separatorAggregate, "separatorAggregate", SEPARATOR_AGGREGATE_STATUS);
  assertStatus(inputs.fieldObligation, "fieldObligation", FIELD_OBLIGATION_STATUS);
  assertStatus(inputs.impulseAcceptance, "impulseAcceptance", IMPULSE_ACCEPTANCE_STATUS);
  assertStatus(
    inputs.acceptedConstantsConformance,
    "acceptedConstantsConformance",
    ACCEPTED_CONSTANTS_CONFORMANCE_STATUS,
  );
  assertStatus(inputs.separatorAssembly, "separatorAssembly", SEPARATOR_ASSEMBLY_STATUS);

  const summary = inputs.sourceDataObligation.summary;
  const expectedCounts = [
    [summary.obstruction_source_hash_checks_passed, 1, "source-data obstruction hash checks"],
    [summary.retained_current_consistency_source_hash_checks_passed, 6, "retained consistency-source hashes"],
    [summary.retained_materialization_source_hash_checks_passed, 5, "retained materialization hashes"],
    [summary.candidate_higher_fold_constants_artifacts, 1, "candidate artifacts"],
    [summary.candidate_separator_constants, 12, "candidate separator constants"],
    [summary.candidate_row_constant_associations, 112, "candidate row associations"],
    [summary.separators_with_derivation_source_evidence_complete, 12, "separator source evidence"],
    [summary.rows_with_derivation_source_evidence_complete, 112, "row source evidence"],
    [summary.candidate_exact_consistent_separator_constants, 12, "exact-consistent separators"],
    [summary.candidate_exact_arithmetic_consistent_separator_constants, 12, "exact-arithmetic separators"],
    [summary.candidate_exact_consistent_rows, 112, "exact-consistent rows"],
    [summary.candidate_exact_arithmetic_consistent_rows, 112, "exact-arithmetic rows"],
    [summary.separators_with_accepted_interval_certified_constants_status_proof_grade_derivation_ref, 0, "proof-grade derivation refs"],
    [summary.separators_with_accepted_interval_certified_constants_status_ref, 0, "accepted status refs"],
    [summary.separators_with_accepted_interval_certified_constants_status_derivation, 0, "status derivations"],
    [summary.separators_with_accepted_interval_certified_constants_status_rule, 0, "status rules"],
    [summary.separators_with_accepted_interval_certified_constants_status_soundness_proof, 0, "status soundness proofs"],
    [summary.separators_with_accepted_interval_certified_constants_status_endpoint_application, 0, "status endpoint applications"],
    [summary.separators_with_accepted_constants_conformance_derivation, 0, "accepted constants conformance derivations"],
    [summary.separators_with_source_packet_acceptance_rule, 0, "source-packet acceptance rules"],
    [summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "accepted source packets"],
    [summary.row_consumption_count, 0, "row consumption"],
  ];
  for (const [actual, expected, label] of expectedCounts) {
    if (actual !== expected) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
}

function sourceHashChecks(paths, sourceDataObligation) {
  const obstructionRecord = sourceDataObligation.source_artifacts?.accepted_status_obstruction_classifier;
  const consistencyRecord =
    sourceDataObligation.source_artifacts?.candidate_live_higher_fold_constants_artifact_consistency_classifier;
  const obstruction = readJson(paths.obstruction);
  const obstructionSourceChecks = [
    [
      "candidate_live_higher_fold_constants_artifact_materialization_attempt",
      obstruction.source_artifacts?.candidate_live_higher_fold_constants_artifact_materialization_attempt,
      paths.materialization,
    ],
    [
      "same_packet_separator_aggregate_certificate_attempt",
      obstruction.source_artifacts?.same_packet_separator_aggregate_certificate_attempt,
      paths.separatorAggregate,
    ],
    [
      "higher_fold_constants_artifact_field_obligation_classifier",
      obstruction.source_artifacts?.higher_fold_constants_artifact_field_obligation_classifier,
      paths.fieldObligation,
    ],
    [
      "same_packet_impulse_bound_source_packet_acceptance_dependency_classifier",
      obstruction.source_artifacts?.same_packet_impulse_bound_source_packet_acceptance_dependency_classifier,
      paths.impulseAcceptance,
    ],
    [
      "same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier",
      obstruction.source_artifacts?.same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier,
      paths.acceptedConstantsConformance,
    ],
    [
      "higher_fold_layer_separator_certificate_assembly_dependency_classifier",
      obstruction.source_artifacts?.higher_fold_layer_separator_certificate_assembly_dependency_classifier,
      paths.separatorAssembly,
    ],
  ];
  const obstructionHash = sha256File(paths.obstruction);
  const consistencyHash = sha256File(paths.consistency);
  const obstructionMatches = obstructionRecord?.sha256 === obstructionHash;
  const consistencyMatches = consistencyRecord?.sha256 === consistencyHash;
  const obstructionToConsistencyMatches =
    sourceDataObligation.obstruction_source_hash_check?.current_sha256 === consistencyHash &&
    sourceDataObligation.obstruction_source_hash_check?.hash_matches === true;
  const checks = [
    {
      source_artifact: "accepted_status_obstruction_classifier",
      source_data_obligation_basename: obstructionRecord.basename,
      current_basename: path.basename(paths.obstruction),
      source_data_obligation_sha256: obstructionRecord.sha256,
      current_sha256: obstructionHash,
      hash_matches: obstructionMatches,
    },
    {
      source_artifact: "candidate_live_higher_fold_constants_artifact_consistency_classifier",
      source_data_obligation_basename: consistencyRecord.basename,
      current_basename: path.basename(paths.consistency),
      source_data_obligation_sha256: consistencyRecord.sha256,
      current_sha256: consistencyHash,
      hash_matches: consistencyMatches,
    },
    {
      source_artifact: "accepted_status_obstruction_to_consistency_hash_check",
      source_data_obligation_basename:
        sourceDataObligation.obstruction_source_hash_check?.obstruction_basename ?? path.basename(paths.consistency),
      current_basename: path.basename(paths.consistency),
      source_data_obligation_sha256: sourceDataObligation.obstruction_source_hash_check?.current_sha256,
      current_sha256: consistencyHash,
      hash_matches: obstructionToConsistencyMatches,
    },
    ...obstructionSourceChecks.map(([name, record, currentPath]) => {
      const currentHash = sha256File(currentPath);
      return {
        source_artifact: name,
        source_data_obligation_basename: record.basename,
        current_basename: path.basename(currentPath),
        source_data_obligation_sha256: record.sha256,
        current_sha256: currentHash,
        hash_matches: record.sha256 === currentHash,
      };
    }),
  ];
  if (!checks.every((check) => check.hash_matches)) {
    throw new Error("Source-data obligation classifier is not locked to the current bridge source inputs.");
  }
  return checks;
}

function blockerStack() {
  return [
    ACCEPTED_STATUS_PROOF_GRADE_DERIVATION_REF_BLOCKER,
    ACCEPTED_STATUS_DERIVATION_BLOCKER,
    ACCEPTED_STATUS_RULE_BLOCKER,
    ACCEPTED_STATUS_SOUNDNESS_BLOCKER,
    ACCEPTED_STATUS_ENDPOINT_APPLICATION_BLOCKER,
    ACCEPTED_CONSTANTS_CONFORMANCE_DERIVATION_BLOCKER,
  ];
}

function buildSeparatorAttempts(sourceDataObligation) {
  return [...sourceDataObligation.separator_accepted_status_derivation_obligation_profiles]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((entry) => {
      const criteria = criterionMap(entry);
      const bridgeReady = entry.derivation_source_evidence_complete === true && allTrue(criteria);
      return {
        separator_event: entry.separator_event,
        fold_interval: entry.fold_interval,
        row_count: entry.row_count,
        candidate_artifact_ref: entry.candidate_artifact_ref,
        derivation_source_evidence_complete: entry.derivation_source_evidence_complete === true,
        bridge_criteria: criteria,
        bridge_ready: bridgeReady,
        missing_bridge_criterion_count: countMissingFields(criteria),
        first_bridge_blocker: firstMissingCriterion(criteria),
        accepted_interval_certified_constants_status_ref_constructed: false,
        accepted_interval_certified_constants_status_present: false,
        source_packet_acceptance_rule_present: entry.source_packet_acceptance_rule_present === true,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present:
          entry.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present === true,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
        classification:
          entry.derivation_source_evidence_complete === true && !bridgeReady
            ? "source_certificates_present_proof_grade_status_derivation_bridge_absent"
            : "status_derivation_bridge_unexpected",
      };
    });
}

function buildRowAttempts(sourceDataObligation) {
  return [...sourceDataObligation.row_accepted_status_derivation_obligation_profiles]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((entry) => {
      const criteria = criterionMap(entry);
      const bridgeReady = entry.derivation_source_evidence_complete === true && allTrue(criteria);
      return {
        row_id: entry.row_id,
        ledger: entry.ledger,
        status: entry.status,
        failure_code: entry.failure_code,
        separator_event: entry.separator_event,
        fold_interval: entry.fold_interval,
        receiver_interval: entry.receiver_interval,
        source_interval: entry.source_interval,
        candidate_higher_fold_constants_artifact_ref: entry.candidate_higher_fold_constants_artifact_ref,
        derivation_source_evidence_complete: entry.derivation_source_evidence_complete === true,
        bridge_criteria: criteria,
        bridge_ready: bridgeReady,
        missing_bridge_criterion_count: countMissingFields(criteria),
        first_bridge_blocker: firstMissingCriterion(criteria),
        accepted_interval_certified_constants_status_ref_constructed: false,
        accepted_interval_certified_constants_status_present: false,
        source_packet_acceptance_rule_present: entry.source_packet_acceptance_rule_present === true,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present:
          entry.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present === true,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
        classification:
          entry.derivation_source_evidence_complete === true && !bridgeReady
            ? "source_certificates_present_row_proof_grade_status_derivation_bridge_absent"
            : "row_status_derivation_bridge_unexpected",
      };
    });
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths, inputs.sourceDataObligation);
  const separatorAttempts = buildSeparatorAttempts(inputs.sourceDataObligation);
  const rowAttempts = buildRowAttempts(inputs.sourceDataObligation);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowAttempts, (row) => row.separator_event));
  const bridgeBlockedRowsBySeparator = sortedObjectBySeparator(
    countBy(
      rowAttempts.filter(
        (row) => row.classification === "source_certificates_present_row_proof_grade_status_derivation_bridge_absent",
      ),
      (row) => row.separator_event,
    ),
  );
  const summary = {
    source_data_obligation_source_hash_checks: sourceChecks.length,
    source_data_obligation_source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    retained_current_consistency_source_hash_checks_passed:
      inputs.sourceDataObligation.summary.retained_current_consistency_source_hash_checks_passed,
    retained_materialization_source_hash_checks_passed:
      inputs.sourceDataObligation.summary.retained_materialization_source_hash_checks_passed,
    candidate_higher_fold_constants_artifacts:
      inputs.sourceDataObligation.summary.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: separatorAttempts.length,
    candidate_row_constant_associations: rowAttempts.length,
    rows_by_separator_count: rowsBySeparatorCount,
    separators_with_derivation_source_evidence_complete: countTrue(
      separatorAttempts,
      (entry) => entry.derivation_source_evidence_complete,
    ),
    rows_with_derivation_source_evidence_complete: countTrue(
      rowAttempts,
      (entry) => entry.derivation_source_evidence_complete,
    ),
    separator_status_derivation_bridge_ready_count: countTrue(separatorAttempts, (entry) => entry.bridge_ready),
    row_status_derivation_bridge_ready_count: countTrue(rowAttempts, (entry) => entry.bridge_ready),
    accepted_interval_certified_constants_status_refs_constructed: countTrue(
      separatorAttempts,
      (entry) => entry.accepted_interval_certified_constants_status_ref_constructed,
    ),
    accepted_interval_certified_constants_statuses_constructed: countTrue(
      separatorAttempts,
      (entry) => entry.accepted_interval_certified_constants_status_present,
    ),
    rows_with_accepted_interval_certified_constants_status_ref: countTrue(
      rowAttempts,
      (entry) => entry.accepted_interval_certified_constants_status_ref_constructed,
    ),
    rows_with_accepted_interval_certified_constants_status: countTrue(
      rowAttempts,
      (entry) => entry.accepted_interval_certified_constants_status_present,
    ),
    separator_bridge_criterion_presence_counts: presenceCounts(
      separatorAttempts,
      BRIDGE_CRITERION_FIELDS,
      (row, field) => row.bridge_criteria[field],
    ),
    row_bridge_criterion_presence_counts: presenceCounts(
      rowAttempts,
      BRIDGE_CRITERION_FIELDS,
      (row, field) => row.bridge_criteria[field],
    ),
    missing_separator_bridge_criteria: separatorAttempts.reduce(
      (sum, entry) => sum + entry.missing_bridge_criterion_count,
      0,
    ),
    missing_row_bridge_criteria: rowAttempts.reduce(
      (sum, entry) => sum + entry.missing_bridge_criterion_count,
      0,
    ),
    bridge_blocked_rows_by_separator: bridgeBlockedRowsBySeparator,
    separators_with_source_packet_acceptance_rule: countTrue(
      separatorAttempts,
      (entry) => entry.source_packet_acceptance_rule_present,
    ),
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: countTrue(
      separatorAttempts,
      (entry) => entry.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present,
    ),
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_bridge_blocker: ACCEPTED_STATUS_PROOF_GRADE_DERIVATION_REF_BLOCKER,
    first_status_derivation_blocker: ACCEPTED_STATUS_DERIVATION_BLOCKER,
    first_status_rule_blocker: ACCEPTED_STATUS_RULE_BLOCKER,
    first_status_soundness_blocker: ACCEPTED_STATUS_SOUNDNESS_BLOCKER,
    first_status_endpoint_application_blocker: ACCEPTED_STATUS_ENDPOINT_APPLICATION_BLOCKER,
    first_accepted_constants_conformance_derivation_blocker: ACCEPTED_CONSTANTS_CONFORMANCE_DERIVATION_BLOCKER,
    first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
  };
  const invariant =
    summary.source_data_obligation_source_hash_checks_passed === 9 &&
    summary.retained_current_consistency_source_hash_checks_passed === 6 &&
    summary.retained_materialization_source_hash_checks_passed === 5 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    summary.separators_with_derivation_source_evidence_complete === 12 &&
    summary.rows_with_derivation_source_evidence_complete === 112 &&
    summary.separator_status_derivation_bridge_ready_count === 0 &&
    summary.row_status_derivation_bridge_ready_count === 0 &&
    summary.accepted_interval_certified_constants_status_refs_constructed === 0 &&
    summary.accepted_interval_certified_constants_statuses_constructed === 0 &&
    summary.rows_with_accepted_interval_certified_constants_status_ref === 0 &&
    summary.rows_with_accepted_interval_certified_constants_status === 0 &&
    summary.missing_separator_bridge_criteria === 72 &&
    summary.missing_row_bridge_criteria === 672 &&
    summary.separators_with_source_packet_acceptance_rule === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.row_consumption_count === 0;
  if (!invariant) {
    throw new Error("Accepted interval-certified status source-certificate bridge invariant failed.");
  }
  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-source-certificate-to-proof-grade-derivation-bridge-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only source-certificate-to-proof-grade-derivation bridge attempt at the accepted interval-certified constants status boundary; applies no proof rule and constructs no accepted status unless imported proof-grade derivation refs, status derivations, rules, soundness proofs, endpoint applications, and accepted constants conformance derivations are already present",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_interval_certified_status_derivation_source_data_obligation_classifier: artifactRecord(
        paths.sourceDataObligation,
      ),
      accepted_status_obstruction_classifier: artifactRecord(paths.obstruction),
      candidate_live_higher_fold_constants_artifact_consistency_classifier: artifactRecord(paths.consistency),
      candidate_live_higher_fold_constants_artifact_materialization_attempt: artifactRecord(paths.materialization),
      same_packet_separator_aggregate_certificate_attempt: artifactRecord(paths.separatorAggregate),
      higher_fold_constants_artifact_field_obligation_classifier: artifactRecord(paths.fieldObligation),
      same_packet_impulse_bound_source_packet_acceptance_dependency_classifier: artifactRecord(paths.impulseAcceptance),
      same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier: artifactRecord(
        paths.acceptedConstantsConformance,
      ),
      higher_fold_layer_separator_certificate_assembly_dependency_classifier: artifactRecord(paths.separatorAssembly),
    },
    source_hash_checks: sourceChecks,
    proof_attempt_rule:
      "A complete accepted-status derivation source-data profile is bridge-ready only when an imported proof-grade derivation ref, status derivation, status rule, soundness proof, endpoint application, and accepted constants conformance derivation are all present. Candidate exact interval consistency and source-hash locks are never promoted by this attempt. This attempt does not create or accept a proof rule, primitive source-packet acceptance rule, accepted source packet, parent_complement_consumption_ref, higher_fold_separator_layer_certificate, row consumption, preledger pass, live-ledger update, or branch-chart authorization.",
    accepted_status_derivation_bridge_criterion_fields: BRIDGE_CRITERION_FIELDS,
    accepted_status_derivation_bridge_blocker_stack: blockerStack(),
    separator_accepted_status_derivation_bridge_attempts: separatorAttempts,
    row_accepted_status_derivation_bridge_attempts: rowAttempts,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The packet has complete source certificates for 12 / 12 separators and 112 / 112 rows, but the source-certificate-to-proof-grade-derivation bridge constructs 0 accepted interval-certified constants status refs because the imported proof-grade derivation refs, status derivations, rules, soundness proofs, endpoint applications, and accepted constants conformance derivations are absent.",
      remains_blocked: [
        "accepted interval-certified constants status proof-grade derivation refs are absent",
        "accepted interval-certified constants status derivations are absent",
        "accepted interval-certified constants status rules are absent",
        "accepted interval-certified constants status soundness proofs are absent",
        "accepted interval-certified constants status endpoint applications are absent",
        "accepted constants conformance derivations are absent",
        "source-packet acceptance rules remain absent",
        "accepted same_packet_fold_impulse_or_direct_quadrature_bound source packets remain absent",
        "parent_complement_consumption_ref remains absent",
        "higher_fold_separator_layer_certificate remains absent",
      ],
      mechanical_continuation:
        "Continue mechanically only by supplying proof-grade accepted-status derivation bridge evidence or by packaging a separate explicit source-packet acceptance rule decision. This packet does not convert candidate consistency into acceptance.",
      fail_closed_stop_conditions: [
        "Do not treat candidate/live exact interval consistency as an accepted interval-certified constants status.",
        "Do not construct an accepted status ref without an imported proof-grade derivation ref, rule, soundness proof, endpoint application, and accepted constants conformance derivation.",
        "Do not introduce a source-packet acceptance rule or primitive accepted-status rule from this attempt.",
        "Do not construct parent_complement_consumption_ref or higher_fold_separator_layer_certificate from this attempt.",
        "Do not consume rows, set preledger_pass, update the live ledger, or authorize a branch chart.",
      ],
    },
    authorization_lock: {
      preledger_pass_rows: 0,
      accepted_fold_layer_rows: 0,
      row_consumption_count: 0,
      branch_chart_authorized_rows: 0,
      preledger_pass_authorized: false,
      accepted_fold_layer_rows_authorized: false,
      row_consumption_authorized: false,
      branch_chart_authorized: false,
    },
    capture_decision:
      "Priority-only. This attempt closes the source-certificate-to-proof-grade-derivation bridge boundary against the current packet by proving that complete source certificates still construct no accepted interval-certified constants status without imported proof-grade derivation bridge evidence or an explicit source-packet acceptance rule decision.",
  };
}

function sourceTable(sourceArtifacts) {
  return Object.entries(sourceArtifacts)
    .map(
      ([name, artifact]) =>
        `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present ? "true" : "false"} | \`${artifact.sha256 ?? "missing"}\` |`,
    )
    .join("\n");
}

function sourceHashTable(sourceChecks) {
  return sourceChecks
    .map(
      (check) =>
        `| \`${check.source_artifact}\` | \`${check.source_data_obligation_basename}\` | \`${check.current_basename}\` | ${check.hash_matches} |`,
    )
    .join("\n");
}

function blockerTable(blockers) {
  return blockers.map((blocker, index) => `| ${index + 1} | \`${blocker}\` |`).join("\n");
}

function separatorTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.row_count} | ${row.derivation_source_evidence_complete} | ${row.bridge_ready} | ${row.accepted_interval_certified_constants_status_ref_constructed} | \`${row.first_bridge_blocker}\` | \`${row.classification}\` |`,
    )
    .join("\n");
}

function rowSummaryTable(packet) {
  return Object.entries(packet.summary.rows_by_separator_count)
    .map(([separator, count]) => {
      const blocked = packet.summary.bridge_blocked_rows_by_separator[separator] ?? 0;
      return `| \`${separator}\` | ${count} | ${blocked} |`;
    })
    .join("\n");
}

function presenceTable(counts) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function reportMarkdown(packet) {
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Source-Certificate-to-Proof-Grade-Derivation Bridge Attempt

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Blocker Sharpened

This attempt starts from the accepted interval-certified status derivation
source-data obligation classifier and tests the direct
source-certificate-to-proof-grade-derivation bridge. Complete candidate source
evidence is retained, but no accepted interval-certified constants status is
constructed because the proof-grade status-derivation bridge criteria are
absent.

Verified source side:

- ${packet.summary.source_data_obligation_source_hash_checks_passed}
  / ${packet.summary.source_data_obligation_source_hash_checks} source-data
  obligation source-hash locks;
- ${packet.summary.retained_current_consistency_source_hash_checks_passed}
  / 6 retained current consistency-source hash locks;
- ${packet.summary.retained_materialization_source_hash_checks_passed}
  / 5 retained materialization source-hash locks;
- ${packet.summary.separators_with_derivation_source_evidence_complete}
  / ${packet.summary.candidate_separator_constants} separator derivation-source
  evidence profiles complete;
- ${packet.summary.rows_with_derivation_source_evidence_complete}
  / ${packet.summary.candidate_row_constant_associations} row
  derivation-source evidence profiles complete.

Bridge result:

- ${packet.summary.separator_status_derivation_bridge_ready_count}
  / ${packet.summary.candidate_separator_constants} separator accepted-status
  derivation bridges ready;
- ${packet.summary.row_status_derivation_bridge_ready_count}
  / ${packet.summary.candidate_row_constant_associations} row accepted-status
  derivation bridges ready;
- ${packet.summary.accepted_interval_certified_constants_status_refs_constructed}
  / ${packet.summary.candidate_separator_constants} accepted
  interval-certified constants status refs constructed;
- ${packet.summary.accepted_interval_certified_constants_statuses_constructed}
  / ${packet.summary.candidate_separator_constants} accepted
  interval-certified constants statuses constructed;
- ${packet.summary.missing_separator_bridge_criteria}
  missing separator bridge criteria;
- ${packet.summary.missing_row_bridge_criteria}
  missing row bridge criteria.

The first bridge blocker is
\`${packet.summary.first_bridge_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(packet.source_artifacts)}

Source-hash checks:

| Source artifact | Source-data obligation file | Current file | Hash matches |
| --- | --- | --- | --- |
${sourceHashTable(packet.source_hash_checks)}

## Bridge Blocker Stack

| Order | Blocker |
| ---: | --- |
${blockerTable(packet.accepted_status_derivation_bridge_blocker_stack)}

## Separator Bridge Attempts

| Separator | Fold interval | Rows | Source evidence complete | Bridge ready | Status ref constructed | First blocker | Classification |
| --- | --- | ---: | --- | --- | --- | --- | --- |
${separatorTable(packet.separator_accepted_status_derivation_bridge_attempts)}

## Row Bridge Summary

| Separator | Rows | Bridge blocked rows |
| --- | ---: | ---: |
${rowSummaryTable(packet)}

## Bridge Criterion Presence

Separator-level criteria:

| Criterion | Present | Missing |
| --- | ---: | ---: |
${presenceTable(packet.summary.separator_bridge_criterion_presence_counts)}

Row-level criteria:

| Criterion | Present | Missing |
| --- | ---: | ---: |
${presenceTable(packet.summary.row_bridge_criterion_presence_counts)}

## Certificate-Side Handoff

Sharpened blocker: ${packet.next_certificate_handoff.sharpened_blocker}

Mechanical continuation: ${packet.next_certificate_handoff.mechanical_continuation}

Remains blocked:

${packet.next_certificate_handoff.remains_blocked.map((item) => `- ${item}`).join("\n")}

Fail-closed stop conditions:

${packet.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is priority-only and proves no accepted interval-certified
constants status, accepted \`same_packet_fold_impulse_or_direct_quadrature_bound\`,
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
    sourceDataObligation: args.sourceDataObligation,
    obstruction: args.obstruction,
    consistency: args.consistency,
    materialization: args.materialization,
    separatorAggregate: args.separatorAggregate,
    fieldObligation: args.fieldObligation,
    impulseAcceptance: args.impulseAcceptance,
    acceptedConstantsConformance: args.acceptedConstantsConformance,
    separatorAssembly: args.separatorAssembly,
  };
  const inputs = {
    sourceDataObligation: readJson(paths.sourceDataObligation),
    obstruction: readJson(paths.obstruction),
    consistency: readJson(paths.consistency),
    materialization: readJson(paths.materialization),
    separatorAggregate: readJson(paths.separatorAggregate),
    fieldObligation: readJson(paths.fieldObligation),
    impulseAcceptance: readJson(paths.impulseAcceptance),
    acceptedConstantsConformance: readJson(paths.acceptedConstantsConformance),
    separatorAssembly: readJson(paths.separatorAssembly),
  };
  const packet = buildPacket(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, packet, args.pretty);
  writeText(outReport, reportMarkdown(packet));
  console.log(`wrote ${outJson}`);
  console.log(`wrote ${outReport}`);
  console.log(`status ${packet.status}`);
}

main();
