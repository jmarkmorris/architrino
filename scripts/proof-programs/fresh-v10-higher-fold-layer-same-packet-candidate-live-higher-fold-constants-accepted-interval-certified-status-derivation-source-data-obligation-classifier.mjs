#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_OBSTRUCTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_obstruction_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONSISTENCY = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_consistency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_derivation_source_data_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_derivation_source_data_obligation_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const OBSTRUCTION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_obstruction_classifier_fail_closed_candidate_consistent_accepted_status_absent_acceptance_obligations_classified_no_row_consumption";
const CONSISTENCY_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_consistency_classifier_fail_closed_candidate_exact_interval_consistency_verified_accepted_interval_certified_status_absent_no_source_packet_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_derivation_source_data_obligation_classifier_fail_closed_derivation_source_data_complete_accepted_status_derivation_absent_no_primitive_acceptance_no_row_consumption";

const ACCEPTED_STATUS_PROOF_GRADE_DERIVATION_REF_BLOCKER =
  "accepted_interval_certified_constants_status_proof_grade_derivation_ref_absent";
const ACCEPTED_STATUS_OBJECT_BLOCKER = "accepted_interval_certified_constants_status_ref_absent";
const ACCEPTED_STATUS_DERIVATION_BLOCKER = "accepted_interval_certified_constants_status_derivation_absent";
const ACCEPTED_STATUS_RULE_BLOCKER = "accepted_interval_certified_constants_status_rule_absent";
const ACCEPTED_STATUS_SOUNDNESS_BLOCKER = "accepted_interval_certified_constants_status_soundness_proof_absent";
const ACCEPTED_STATUS_ENDPOINT_APPLICATION_BLOCKER =
  "accepted_interval_certified_constants_status_endpoint_application_absent";
const ACCEPTED_CONSTANTS_CONFORMANCE_DERIVATION_BLOCKER = "accepted_constants_conformance_derivation_absent";
const SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const ACCEPTED_SOURCE_PACKET_BLOCKER = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_absent";
const ACCEPTED_ARTIFACT_BLOCKER = "accepted_same_packet_higher_fold_constants_artifact_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

const DERIVATION_OBLIGATION_FIELDS = [
  "accepted_interval_certified_constants_status_proof_grade_derivation_ref_present",
  "accepted_interval_certified_constants_status_ref_present",
  "accepted_interval_certified_constants_status_derivation_present",
  "accepted_interval_certified_constants_status_rule_present",
  "accepted_interval_certified_constants_status_soundness_proof_present",
  "accepted_interval_certified_constants_status_endpoint_application_present",
  "accepted_constants_conformance_derivation_present",
  "source_packet_acceptance_rule_present",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present",
];

function parseArgs(argv) {
  const args = {
    obstruction: DEFAULT_OBSTRUCTION,
    consistency: DEFAULT_CONSISTENCY,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--obstruction") {
      args.obstruction = argv[++index];
    } else if (arg === "--consistency") {
      args.consistency = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-derivation-source-data-obligation-classifier.mjs [options]

Options:
  --obstruction PATH    Accepted-status obstruction classifier. Defaults to ${DEFAULT_OBSTRUCTION}.
  --consistency PATH    Candidate-live constants artifact consistency classifier. Defaults to ${DEFAULT_CONSISTENCY}.
  --out-dir PATH        Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty              Pretty-print JSON artifact.
  --help                Show this help.`);
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

function mapBy(array, getter, name) {
  const map = new Map();
  for (const entry of array ?? []) {
    const key = getter(entry);
    if (key == null) {
      continue;
    }
    if (map.has(key)) {
      throw new Error(`Duplicate ${name} key: ${key}`);
    }
    map.set(key, entry);
  }
  return map;
}

function requireMapEntry(map, key, name) {
  if (!map.has(key)) {
    throw new Error(`Missing ${name}: ${key}`);
  }
  return map.get(key);
}

function allTrue(value) {
  return Object.values(value).every(Boolean);
}

function falseFieldMap(fields) {
  return Object.fromEntries(fields.map((field) => [field, false]));
}

function presenceCounts(rows, fields) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => row[field] === true);
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function countMissingFields(row, fields) {
  return fields.filter((field) => row[field] !== true).length;
}

function validateInputs(inputs) {
  assertPacketId(inputs.obstruction, "obstruction");
  assertPacketId(inputs.consistency, "consistency");
  assertFailClosed(inputs.obstruction, "obstruction");
  assertFailClosed(inputs.consistency, "consistency");
  assertStatus(inputs.obstruction, "obstruction", OBSTRUCTION_STATUS);
  assertStatus(inputs.consistency, "consistency", CONSISTENCY_STATUS);
  if (inputs.obstruction.summary?.consistency_source_hash_checks_passed !== 6) {
    throw new Error("Obstruction input no longer preserves 6 / 6 current consistency-source hash locks.");
  }
  if (inputs.obstruction.summary?.materialization_source_hash_checks_retained_passed !== 5) {
    throw new Error("Obstruction input no longer retains 5 / 5 materialization source-hash locks.");
  }
  if (inputs.obstruction.summary?.separators_with_candidate_status_preconditions_complete !== 12) {
    throw new Error("Obstruction input no longer has 12 separator precondition profiles complete.");
  }
  if (inputs.obstruction.summary?.rows_with_candidate_status_preconditions_complete !== 112) {
    throw new Error("Obstruction input no longer has 112 row precondition profiles complete.");
  }
  if (inputs.obstruction.summary?.separators_with_accepted_interval_certified_constants_status !== 0) {
    throw new Error("Obstruction input unexpectedly has accepted interval-certified constants statuses.");
  }
  if (inputs.obstruction.summary?.row_consumption_count !== 0) {
    throw new Error("Obstruction input unexpectedly consumes rows.");
  }
  if (inputs.consistency.summary?.candidate_exact_consistent_separator_constants !== 12) {
    throw new Error("Consistency input no longer has 12 exact-consistent separator constants.");
  }
  if (inputs.consistency.summary?.candidate_exact_arithmetic_consistent_separator_constants !== 12) {
    throw new Error("Consistency input no longer has 12 exact-arithmetic separator constants.");
  }
  if (inputs.consistency.summary?.candidate_exact_consistent_rows !== 112) {
    throw new Error("Consistency input no longer has 112 exact-consistent rows.");
  }
  if (inputs.consistency.summary?.candidate_exact_arithmetic_consistent_rows !== 112) {
    throw new Error("Consistency input no longer has 112 exact-arithmetic rows.");
  }
}

function assertObstructionSourceHash(paths, obstruction) {
  const sourceRecord = obstruction.source_artifacts?.candidate_live_higher_fold_constants_artifact_consistency_classifier;
  const currentHash = sha256File(paths.consistency);
  if (sourceRecord?.sha256 !== currentHash) {
    throw new Error("Accepted-status obstruction input is not locked to the current consistency classifier.");
  }
  return {
    source_artifact: "candidate_live_higher_fold_constants_artifact_consistency_classifier",
    obstruction_basename: sourceRecord.basename,
    current_basename: path.basename(paths.consistency),
    obstruction_sha256: sourceRecord.sha256,
    current_sha256: currentHash,
    hash_matches: true,
  };
}

function derivationSourceEvidence(entry, consistencyEntry) {
  return {
    candidate_status_preconditions_complete: entry.candidate_status_preconditions_complete === true,
    exact_field_consistency_verified: consistencyEntry.candidate_exact_consistency_pass === true,
    exact_arithmetic_consistency_verified: consistencyEntry.exact_arithmetic_consistency_pass === true,
    accepted_status_obstruction_recorded: entry.first_status_obstruction === "accepted_interval_certified_constants_status_absent",
  };
}

function derivationObligationMap() {
  return falseFieldMap(DERIVATION_OBLIGATION_FIELDS);
}

function blockerStack() {
  return [
    ACCEPTED_STATUS_PROOF_GRADE_DERIVATION_REF_BLOCKER,
    ACCEPTED_STATUS_OBJECT_BLOCKER,
    ACCEPTED_STATUS_DERIVATION_BLOCKER,
    ACCEPTED_STATUS_RULE_BLOCKER,
    ACCEPTED_STATUS_SOUNDNESS_BLOCKER,
    ACCEPTED_STATUS_ENDPOINT_APPLICATION_BLOCKER,
    ACCEPTED_CONSTANTS_CONFORMANCE_DERIVATION_BLOCKER,
    SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    ACCEPTED_SOURCE_PACKET_BLOCKER,
  ];
}

function buildSeparatorProfiles(inputs) {
  const consistencyBySeparator = mapBy(
    inputs.consistency.separator_consistency_classification,
    (entry) => entry.separator_event,
    "consistency separator",
  );
  return [...inputs.obstruction.separator_accepted_status_obstruction_profiles]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((entry) => {
      const consistency = requireMapEntry(consistencyBySeparator, entry.separator_event, "consistency separator");
      const sourceEvidence = derivationSourceEvidence(entry, consistency);
      const obligations = derivationObligationMap();
      const sourceEvidenceComplete = allTrue(sourceEvidence);
      const derivationObjectsComplete = allTrue(obligations);
      return {
        separator_event: entry.separator_event,
        fold_interval: entry.fold_interval,
        row_count: entry.row_count,
        candidate_artifact_ref: entry.candidate_artifact_ref,
        derivation_source_evidence: sourceEvidence,
        derivation_source_evidence_complete: sourceEvidenceComplete,
        ...obligations,
        accepted_status_derivation_objects_complete: derivationObjectsComplete,
        missing_derivation_obligation_count: countMissingFields(obligations, DERIVATION_OBLIGATION_FIELDS),
        first_derivation_obligation_blocker: ACCEPTED_STATUS_PROOF_GRADE_DERIVATION_REF_BLOCKER,
        blocker_stack: blockerStack(),
        accepted_higher_fold_constants_artifact_present: false,
        accepted_interval_certified_constants_status_present: false,
        accepted_constants_conformance: false,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
        classification:
          sourceEvidenceComplete && !derivationObjectsComplete
            ? "candidate_consistency_complete_status_derivation_objects_absent"
            : "candidate_status_derivation_source_evidence_or_obligation_unexpected",
      };
    });
}

function buildRowProfiles(inputs) {
  const consistencyByRow = mapBy(inputs.consistency.row_consistency_classification, (entry) => entry.row_id, "consistency row");
  return [...inputs.obstruction.row_accepted_status_obstruction_profiles]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((entry) => {
      const consistency = requireMapEntry(consistencyByRow, entry.row_id, "consistency row");
      const sourceEvidence = derivationSourceEvidence(entry, consistency);
      const obligations = derivationObligationMap();
      const sourceEvidenceComplete = allTrue(sourceEvidence);
      const derivationObjectsComplete = allTrue(obligations);
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
        derivation_source_evidence: sourceEvidence,
        derivation_source_evidence_complete: sourceEvidenceComplete,
        ...obligations,
        accepted_status_derivation_objects_complete: derivationObjectsComplete,
        missing_derivation_obligation_count: countMissingFields(obligations, DERIVATION_OBLIGATION_FIELDS),
        first_derivation_obligation_blocker: ACCEPTED_STATUS_PROOF_GRADE_DERIVATION_REF_BLOCKER,
        blocker_stack: blockerStack(),
        accepted_higher_fold_constants_artifact_present: false,
        accepted_interval_certified_constants_status_present: false,
        accepted_constants_conformance: false,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
        classification:
          sourceEvidenceComplete && !derivationObjectsComplete
            ? "candidate_row_consistency_complete_status_derivation_objects_absent"
            : "candidate_row_status_derivation_source_evidence_or_obligation_unexpected",
      };
    });
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const obstructionSourceHashCheck = assertObstructionSourceHash(paths, inputs.obstruction);
  const separatorProfiles = buildSeparatorProfiles(inputs);
  const rowProfiles = buildRowProfiles(inputs);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const completeRowsBySeparator = sortedObjectBySeparator(
    countBy(
      rowProfiles.filter((row) => row.derivation_source_evidence_complete),
      (row) => row.separator_event,
    ),
  );
  const derivationBlockedRowsBySeparator = sortedObjectBySeparator(
    countBy(
      rowProfiles.filter((row) => row.classification === "candidate_row_consistency_complete_status_derivation_objects_absent"),
      (row) => row.separator_event,
    ),
  );
  const summary = {
    obstruction_source_hash_checks: 1,
    obstruction_source_hash_checks_passed: obstructionSourceHashCheck.hash_matches ? 1 : 0,
    retained_current_consistency_source_hash_checks_passed:
      inputs.obstruction.summary.consistency_source_hash_checks_passed,
    retained_materialization_source_hash_checks_passed:
      inputs.obstruction.summary.materialization_source_hash_checks_retained_passed,
    candidate_higher_fold_constants_artifacts: inputs.obstruction.summary.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: separatorProfiles.length,
    candidate_row_constant_associations: rowProfiles.length,
    rows_by_separator_count: rowsBySeparatorCount,
    separators_with_derivation_source_evidence_complete: countTrue(
      separatorProfiles,
      (entry) => entry.derivation_source_evidence_complete,
    ),
    rows_with_derivation_source_evidence_complete: countTrue(
      rowProfiles,
      (entry) => entry.derivation_source_evidence_complete,
    ),
    candidate_exact_consistent_separator_constants: inputs.obstruction.summary.candidate_exact_consistent_separator_constants,
    candidate_exact_arithmetic_consistent_separator_constants:
      inputs.obstruction.summary.candidate_exact_arithmetic_consistent_separator_constants,
    candidate_exact_consistent_rows: inputs.obstruction.summary.candidate_exact_consistent_rows,
    candidate_exact_arithmetic_consistent_rows: inputs.obstruction.summary.candidate_exact_arithmetic_consistent_rows,
    separators_with_accepted_interval_certified_constants_status_ref: countTrue(
      separatorProfiles,
      (entry) => entry.accepted_interval_certified_constants_status_ref_present,
    ),
    separators_with_accepted_interval_certified_constants_status_proof_grade_derivation_ref: countTrue(
      separatorProfiles,
      (entry) => entry.accepted_interval_certified_constants_status_proof_grade_derivation_ref_present,
    ),
    separators_with_accepted_interval_certified_constants_status_derivation: countTrue(
      separatorProfiles,
      (entry) => entry.accepted_interval_certified_constants_status_derivation_present,
    ),
    separators_with_accepted_interval_certified_constants_status_rule: countTrue(
      separatorProfiles,
      (entry) => entry.accepted_interval_certified_constants_status_rule_present,
    ),
    separators_with_accepted_interval_certified_constants_status_soundness_proof: countTrue(
      separatorProfiles,
      (entry) => entry.accepted_interval_certified_constants_status_soundness_proof_present,
    ),
    separators_with_accepted_interval_certified_constants_status_endpoint_application: countTrue(
      separatorProfiles,
      (entry) => entry.accepted_interval_certified_constants_status_endpoint_application_present,
    ),
    separators_with_accepted_constants_conformance_derivation: countTrue(
      separatorProfiles,
      (entry) => entry.accepted_constants_conformance_derivation_present,
    ),
    separators_with_source_packet_acceptance_rule: countTrue(
      separatorProfiles,
      (entry) => entry.source_packet_acceptance_rule_present,
    ),
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: countTrue(
      separatorProfiles,
      (entry) => entry.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present,
    ),
    rows_with_accepted_interval_certified_constants_status_ref: countTrue(
      rowProfiles,
      (entry) => entry.accepted_interval_certified_constants_status_ref_present,
    ),
    rows_with_accepted_interval_certified_constants_status_proof_grade_derivation_ref: countTrue(
      rowProfiles,
      (entry) => entry.accepted_interval_certified_constants_status_proof_grade_derivation_ref_present,
    ),
    rows_with_source_packet_acceptance_rule: countTrue(rowProfiles, (entry) => entry.source_packet_acceptance_rule_present),
    rows_with_accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: countTrue(
      rowProfiles,
      (entry) => entry.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present,
    ),
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    rows_with_complete_derivation_source_evidence_by_separator: completeRowsBySeparator,
    derivation_blocked_rows_by_separator: derivationBlockedRowsBySeparator,
    separator_derivation_obligation_presence_counts: presenceCounts(separatorProfiles, DERIVATION_OBLIGATION_FIELDS),
    row_derivation_obligation_presence_counts: presenceCounts(rowProfiles, DERIVATION_OBLIGATION_FIELDS),
    missing_separator_derivation_obligations: separatorProfiles.reduce(
      (sum, entry) => sum + entry.missing_derivation_obligation_count,
      0,
    ),
    missing_row_derivation_obligations: rowProfiles.reduce(
      (sum, entry) => sum + entry.missing_derivation_obligation_count,
      0,
    ),
    first_derivation_obligation_blocker: ACCEPTED_STATUS_PROOF_GRADE_DERIVATION_REF_BLOCKER,
    first_status_derivation_blocker: ACCEPTED_STATUS_DERIVATION_BLOCKER,
    first_status_rule_blocker: ACCEPTED_STATUS_RULE_BLOCKER,
    first_status_soundness_blocker: ACCEPTED_STATUS_SOUNDNESS_BLOCKER,
    first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
  };
  const invariant =
    summary.obstruction_source_hash_checks_passed === 1 &&
    summary.retained_current_consistency_source_hash_checks_passed === 6 &&
    summary.retained_materialization_source_hash_checks_passed === 5 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    summary.separators_with_derivation_source_evidence_complete === 12 &&
    summary.rows_with_derivation_source_evidence_complete === 112 &&
    summary.candidate_exact_consistent_separator_constants === 12 &&
    summary.candidate_exact_arithmetic_consistent_separator_constants === 12 &&
    summary.candidate_exact_consistent_rows === 112 &&
    summary.candidate_exact_arithmetic_consistent_rows === 112 &&
    summary.separators_with_accepted_interval_certified_constants_status_proof_grade_derivation_ref === 0 &&
    summary.separators_with_accepted_interval_certified_constants_status_ref === 0 &&
    summary.separators_with_accepted_interval_certified_constants_status_derivation === 0 &&
    summary.separators_with_accepted_interval_certified_constants_status_rule === 0 &&
    summary.separators_with_source_packet_acceptance_rule === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.rows_with_accepted_interval_certified_constants_status_ref === 0 &&
    summary.rows_with_accepted_interval_certified_constants_status_proof_grade_derivation_ref === 0 &&
    summary.row_consumption_count === 0;
  if (!invariant) {
    throw new Error("Accepted interval-certified status derivation source-data obligation classifier invariant failed.");
  }
  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-derivation-source-data-obligation-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only accepted interval-certified status derivation source-data obligation classifier; preserves complete candidate consistency evidence while proving accepted interval-certified constants status proof-grade derivation refs, status refs, derivations, rules, soundness proofs, endpoint applications, source-packet acceptance, row consumption, live-ledger update, and branch-chart authorization remain absent",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_obstruction_classifier: artifactRecord(paths.obstruction),
      candidate_live_higher_fold_constants_artifact_consistency_classifier: artifactRecord(paths.consistency),
    },
    obstruction_source_hash_check: obstructionSourceHashCheck,
    accepted_status_derivation_obligation_fields: DERIVATION_OBLIGATION_FIELDS,
    accepted_status_derivation_obligation_blocker_stack: blockerStack(),
    separator_accepted_status_derivation_obligation_profiles: separatorProfiles,
    row_accepted_status_derivation_obligation_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "proof-grade accepted interval-certified constants status ref plus derivation/rule/soundness/endpoint-application evidence, or an explicit source-packet acceptance rule for the same-packet fixed-parameter aggregate",
      continuation_class:
        "blocked from mechanical row consumption until accepted-status derivation evidence or a primitive source-packet acceptance decision exists",
      decision_boundary:
        "this packet only counts missing accepted-status derivation objects; it does not accept the candidate/live constants artifact and does not introduce a primitive rule",
      fail_closed_stop_conditions: [
        "Do not treat candidate consistency or source-hash locks as accepted interval-certified constants status.",
        "Do not infer an accepted-status derivation, rule, soundness proof, or endpoint application from this packet.",
        "Do not infer accepted constants conformance from the seed-packet constants contract.",
        "Do not treat the candidate/live constants artifact as an accepted same_packet_fold_impulse_or_direct_quadrature_bound source packet.",
        "Do not construct parent_complement_consumption_ref or higher_fold_separator_layer_certificate from this packet.",
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
      "Priority-only. This classifier narrows the live blocker to proof-grade accepted-status derivation source data and the unchanged source-packet acceptance rule gap. It proves no accepted constants status, accepted source packet, row consumption, live-ledger update, or branch-chart authorization.",
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

function countTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count} |`)
    .join("\n");
}

function presenceTable(counts) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function blockerTable(blockers) {
  return blockers.map((blocker, index) => `| ${index + 1} | \`${blocker}\` |`).join("\n");
}

function separatorTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.row_count} | ${row.derivation_source_evidence_complete} | ${row.accepted_interval_certified_constants_status_proof_grade_derivation_ref_present} | ${row.accepted_interval_certified_constants_status_ref_present} | ${row.accepted_interval_certified_constants_status_rule_present} | \`${row.classification}\` |`,
    )
    .join("\n");
}

function rowSummaryTable(packet) {
  return Object.entries(packet.summary.rows_by_separator_count)
    .map(([separator, count]) => {
      const sourceComplete = packet.summary.rows_with_complete_derivation_source_evidence_by_separator[separator] ?? 0;
      const blocked = packet.summary.derivation_blocked_rows_by_separator[separator] ?? 0;
      return `| \`${separator}\` | ${count} | ${sourceComplete} | ${blocked} |`;
    })
    .join("\n");
}

function reportMarkdown(packet) {
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Derivation Source-Data Obligation Classifier

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Blocker Sharpened

This classifier starts from the accepted-status obstruction classifier and
freezes the proof-grade derivation source-data obligations that would be
required before the candidate/live constants artifact could be treated as
accepted interval-certified constants data.

Verified source side:

- ${packet.summary.obstruction_source_hash_checks_passed}
  / ${packet.summary.obstruction_source_hash_checks} accepted-status
  obstruction source-hash locks;
- ${packet.summary.retained_current_consistency_source_hash_checks_passed}
  / 6 retained current consistency-source hash locks;
- ${packet.summary.retained_materialization_source_hash_checks_passed}
  / 5 retained materialization source-hash locks;
- ${packet.summary.candidate_exact_consistent_separator_constants}
  / ${packet.summary.candidate_separator_constants} separator exact-field
  consistency classifications;
- ${packet.summary.candidate_exact_arithmetic_consistent_separator_constants}
  / ${packet.summary.candidate_separator_constants} separator
  exact-arithmetic consistency classifications;
- ${packet.summary.candidate_exact_consistent_rows}
  / ${packet.summary.candidate_row_constant_associations} row exact-field
  consistency classifications;
- ${packet.summary.candidate_exact_arithmetic_consistent_rows}
  / ${packet.summary.candidate_row_constant_associations} row
  exact-arithmetic consistency classifications;
- ${packet.summary.separators_with_derivation_source_evidence_complete}
  / ${packet.summary.candidate_separator_constants} separator derivation-source
  evidence profiles complete;
- ${packet.summary.rows_with_derivation_source_evidence_complete}
  / ${packet.summary.candidate_row_constant_associations} row
  derivation-source evidence profiles complete.

Still absent:

- ${packet.summary.separators_with_accepted_interval_certified_constants_status_proof_grade_derivation_ref}
  / ${packet.summary.candidate_separator_constants} accepted
  interval-certified constants proof-grade derivation refs;
- ${packet.summary.separators_with_accepted_interval_certified_constants_status_ref}
  / ${packet.summary.candidate_separator_constants} accepted
  interval-certified constants status refs;
- ${packet.summary.separators_with_accepted_interval_certified_constants_status_derivation}
  / ${packet.summary.candidate_separator_constants} accepted-status
  derivations;
- ${packet.summary.separators_with_accepted_interval_certified_constants_status_rule}
  / ${packet.summary.candidate_separator_constants} accepted-status rules;
- ${packet.summary.separators_with_accepted_interval_certified_constants_status_soundness_proof}
  / ${packet.summary.candidate_separator_constants} accepted-status soundness
  proofs;
- ${packet.summary.separators_with_accepted_interval_certified_constants_status_endpoint_application}
  / ${packet.summary.candidate_separator_constants} accepted-status endpoint
  applications;
- ${packet.summary.separators_with_accepted_constants_conformance_derivation}
  / ${packet.summary.candidate_separator_constants} accepted constants
  conformance derivations;
- ${packet.summary.separators_with_source_packet_acceptance_rule}
  / ${packet.summary.candidate_separator_constants} source-packet acceptance
  rules;
- ${packet.summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets}
  / ${packet.summary.candidate_separator_constants} accepted
  impulse/direct-quadrature source packets.

The first derivation-obligation blocker is
\`${packet.summary.first_derivation_obligation_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(packet.source_artifacts)}

Obstruction source-hash check:

| Source artifact | Obstruction file | Current file | Hash matches |
| --- | --- | --- | --- |
| \`${packet.obstruction_source_hash_check.source_artifact}\` | \`${packet.obstruction_source_hash_check.obstruction_basename}\` | \`${packet.obstruction_source_hash_check.current_basename}\` | ${packet.obstruction_source_hash_check.hash_matches} |

## Derivation Obligation Blocker Stack

| Order | Blocker |
| ---: | --- |
${blockerTable(packet.accepted_status_derivation_obligation_blocker_stack)}

## Separator Derivation Obligation Profiles

| Separator | Fold interval | Rows | Source evidence complete | Proof-grade derivation ref | Status ref | Status rule | Classification |
| --- | --- | ---: | --- | --- | --- | --- | --- |
${separatorTable(packet.separator_accepted_status_derivation_obligation_profiles)}

## Row Derivation Obligation Summary

| Separator | Rows | Source evidence complete | Derivation blocked rows |
| --- | ---: | ---: | ---: |
${rowSummaryTable(packet)}

## Derivation Obligation Field Presence

Separator-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(packet.summary.separator_derivation_obligation_presence_counts)}

Row-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(packet.summary.row_derivation_obligation_presence_counts)}

## Certificate-Side Handoff

Next artifact target: \`${packet.next_certificate_handoff.artifact_target}\`.

Continuation class: ${packet.next_certificate_handoff.continuation_class}.

Decision boundary: ${packet.next_certificate_handoff.decision_boundary}.

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
    obstruction: args.obstruction,
    consistency: args.consistency,
  };
  const inputs = {
    obstruction: readJson(paths.obstruction),
    consistency: readJson(paths.consistency),
  };
  const packet = buildPacket(paths, inputs);
  const outputJson = path.join(args.outDir, OUTPUT_JSON);
  const outputReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJson, packet, args.pretty);
  writeText(outputReport, reportMarkdown(packet));
  console.log(JSON.stringify({ status: packet.status, output_json: outputJson, output_report: outputReport }, null, 2));
}

main();
