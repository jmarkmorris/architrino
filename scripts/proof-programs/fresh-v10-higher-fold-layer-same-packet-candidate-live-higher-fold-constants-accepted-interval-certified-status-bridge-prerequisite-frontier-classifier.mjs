#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_BRIDGE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_certificate_to_proof_grade_derivation_bridge_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SOURCE_DATA_OBLIGATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_derivation_source_data_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ACCEPTED_CONSTANTS_CONFORMANCE = `${CERT_DIR}/higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_bridge_prerequisite_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_bridge_prerequisite_frontier_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const BRIDGE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_certificate_to_proof_grade_derivation_bridge_attempt_fail_closed_source_certificates_present_proof_grade_status_derivation_bridge_absent_no_primitive_acceptance_no_row_consumption";
const SOURCE_DATA_OBLIGATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_derivation_source_data_obligation_classifier_fail_closed_derivation_source_data_complete_accepted_status_derivation_absent_no_primitive_acceptance_no_row_consumption";
const ACCEPTED_CONSTANTS_CONFORMANCE_STATUS =
  "higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier_fail_closed_aggregate_present_existing_constants_contract_packet_mismatch_no_source_packet_acceptance_no_row_consumption";
const IMPULSE_ACCEPTANCE_STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_bridge_prerequisite_frontier_classifier_fail_closed_proof_grade_bridge_and_source_packet_acceptance_frontiers_absent_no_row_consumption";

const PROOF_BRIDGE_FIELDS = [
  "accepted_interval_certified_constants_status_proof_grade_derivation_ref_present",
  "accepted_interval_certified_constants_status_derivation_present",
  "accepted_interval_certified_constants_status_rule_present",
  "accepted_interval_certified_constants_status_soundness_proof_present",
  "accepted_interval_certified_constants_status_endpoint_application_present",
  "accepted_constants_conformance_derivation_present",
];
const PRIMITIVE_ACCEPTANCE_FIELDS = [
  "source_packet_acceptance_rule_present",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present",
];
const FRONTIER_FIELDS = [...PROOF_BRIDGE_FIELDS, ...PRIMITIVE_ACCEPTANCE_FIELDS];

const BLOCKERS_BY_FIELD = {
  accepted_interval_certified_constants_status_proof_grade_derivation_ref_present:
    "accepted_interval_certified_constants_status_proof_grade_derivation_ref_absent",
  accepted_interval_certified_constants_status_derivation_present:
    "accepted_interval_certified_constants_status_derivation_absent",
  accepted_interval_certified_constants_status_rule_present: "accepted_interval_certified_constants_status_rule_absent",
  accepted_interval_certified_constants_status_soundness_proof_present:
    "accepted_interval_certified_constants_status_soundness_proof_absent",
  accepted_interval_certified_constants_status_endpoint_application_present:
    "accepted_interval_certified_constants_status_endpoint_application_absent",
  accepted_constants_conformance_derivation_present: "accepted_constants_conformance_derivation_absent",
  source_packet_acceptance_rule_present:
    "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent",
  accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present:
    "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_absent",
};

function parseArgs(argv) {
  const args = {
    bridge: DEFAULT_BRIDGE,
    sourceDataObligation: DEFAULT_SOURCE_DATA_OBLIGATION,
    acceptedConstantsConformance: DEFAULT_ACCEPTED_CONSTANTS_CONFORMANCE,
    impulseAcceptance: DEFAULT_IMPULSE_ACCEPTANCE,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--bridge") {
      args.bridge = argv[++index];
    } else if (arg === "--source-data-obligation") {
      args.sourceDataObligation = argv[++index];
    } else if (arg === "--accepted-constants-conformance") {
      args.acceptedConstantsConformance = argv[++index];
    } else if (arg === "--impulse-acceptance") {
      args.impulseAcceptance = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-bridge-prerequisite-frontier-classifier.mjs [options]

Options:
  --bridge PATH                         Accepted-status source-certificate bridge attempt. Defaults to ${DEFAULT_BRIDGE}.
  --source-data-obligation PATH         Accepted-status derivation source-data obligation classifier. Defaults to ${DEFAULT_SOURCE_DATA_OBLIGATION}.
  --accepted-constants-conformance PATH Fixed-parameter aggregate accepted-constants conformance classifier. Defaults to ${DEFAULT_ACCEPTED_CONSTANTS_CONFORMANCE}.
  --impulse-acceptance PATH             Impulse-bound source-packet acceptance dependency classifier. Defaults to ${DEFAULT_IMPULSE_ACCEPTANCE}.
  --out-dir PATH                        Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                              Pretty-print JSON artifact.
  --help                                Show this help.`);
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

function presenceCounts(rows, fields, getter) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => getter(row, field));
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function frontierPresence(entry) {
  return {
    accepted_interval_certified_constants_status_proof_grade_derivation_ref_present:
      entry.bridge_criteria?.accepted_interval_certified_constants_status_proof_grade_derivation_ref_present === true,
    accepted_interval_certified_constants_status_derivation_present:
      entry.bridge_criteria?.accepted_interval_certified_constants_status_derivation_present === true,
    accepted_interval_certified_constants_status_rule_present:
      entry.bridge_criteria?.accepted_interval_certified_constants_status_rule_present === true,
    accepted_interval_certified_constants_status_soundness_proof_present:
      entry.bridge_criteria?.accepted_interval_certified_constants_status_soundness_proof_present === true,
    accepted_interval_certified_constants_status_endpoint_application_present:
      entry.bridge_criteria?.accepted_interval_certified_constants_status_endpoint_application_present === true,
    accepted_constants_conformance_derivation_present:
      entry.bridge_criteria?.accepted_constants_conformance_derivation_present === true,
    source_packet_acceptance_rule_present: entry.source_packet_acceptance_rule_present === true,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present:
      entry.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present === true,
  };
}

function firstMissing(fields) {
  const missing = FRONTIER_FIELDS.find((field) => fields[field] !== true);
  return missing ? BLOCKERS_BY_FIELD[missing] : null;
}

function missingCount(fields, subset = FRONTIER_FIELDS) {
  return subset.filter((field) => fields[field] !== true).length;
}

function validateInputs(inputs) {
  assertPacketId(inputs.bridge, "bridge");
  assertPacketId(inputs.sourceDataObligation, "sourceDataObligation");
  assertPacketId(inputs.acceptedConstantsConformance, "acceptedConstantsConformance");
  assertPacketId(inputs.impulseAcceptance, "impulseAcceptance");
  assertFailClosed(inputs.bridge, "bridge");
  assertFailClosed(inputs.sourceDataObligation, "sourceDataObligation");
  assertFailClosed(inputs.acceptedConstantsConformance, "acceptedConstantsConformance");
  assertFailClosed(inputs.impulseAcceptance, "impulseAcceptance");
  assertStatus(inputs.bridge, "bridge", BRIDGE_STATUS);
  assertStatus(inputs.sourceDataObligation, "sourceDataObligation", SOURCE_DATA_OBLIGATION_STATUS);
  assertStatus(
    inputs.acceptedConstantsConformance,
    "acceptedConstantsConformance",
    ACCEPTED_CONSTANTS_CONFORMANCE_STATUS,
  );
  assertStatus(inputs.impulseAcceptance, "impulseAcceptance", IMPULSE_ACCEPTANCE_STATUS);

  const summary = inputs.bridge.summary;
  const expectedCounts = [
    [summary.source_data_obligation_source_hash_checks_passed, 9, "bridge source-hash locks"],
    [summary.candidate_higher_fold_constants_artifacts, 1, "candidate artifacts"],
    [summary.candidate_separator_constants, 12, "candidate separator constants"],
    [summary.candidate_row_constant_associations, 112, "candidate row associations"],
    [summary.separators_with_derivation_source_evidence_complete, 12, "separator source evidence"],
    [summary.rows_with_derivation_source_evidence_complete, 112, "row source evidence"],
    [summary.separator_status_derivation_bridge_ready_count, 0, "separator bridge ready"],
    [summary.row_status_derivation_bridge_ready_count, 0, "row bridge ready"],
    [summary.accepted_interval_certified_constants_status_refs_constructed, 0, "status refs constructed"],
    [summary.accepted_interval_certified_constants_statuses_constructed, 0, "statuses constructed"],
    [summary.missing_separator_bridge_criteria, 72, "separator bridge criteria"],
    [summary.missing_row_bridge_criteria, 672, "row bridge criteria"],
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

function sourceHashChecks(paths, bridge) {
  const checks = [
    ["accepted_status_source_certificate_to_proof_grade_derivation_bridge_attempt", null, paths.bridge],
    [
      "accepted_interval_certified_status_derivation_source_data_obligation_classifier",
      bridge.source_artifacts?.accepted_interval_certified_status_derivation_source_data_obligation_classifier,
      paths.sourceDataObligation,
    ],
    [
      "same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier",
      bridge.source_artifacts?.same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier,
      paths.acceptedConstantsConformance,
    ],
    [
      "same_packet_impulse_bound_source_packet_acceptance_dependency_classifier",
      bridge.source_artifacts?.same_packet_impulse_bound_source_packet_acceptance_dependency_classifier,
      paths.impulseAcceptance,
    ],
  ].map(([name, record, currentPath]) => {
    const currentHash = sha256File(currentPath);
    return {
      source_artifact: name,
      imported_basename: record?.basename ?? path.basename(currentPath),
      current_basename: path.basename(currentPath),
      imported_sha256: record?.sha256 ?? currentHash,
      current_sha256: currentHash,
      hash_matches: (record?.sha256 ?? currentHash) === currentHash,
    };
  });
  if (!checks.every((check) => check.hash_matches)) {
    throw new Error("Bridge prerequisite frontier inputs are not locked to current source hashes.");
  }
  return checks;
}

function buildSeparatorProfiles(bridge) {
  return [...bridge.separator_accepted_status_derivation_bridge_attempts]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((entry) => {
      const frontier = frontierPresence(entry);
      return {
        separator_event: entry.separator_event,
        fold_interval: entry.fold_interval,
        row_count: entry.row_count,
        derivation_source_evidence_complete: entry.derivation_source_evidence_complete === true,
        source_certificate_bridge_ready: entry.bridge_ready === true,
        frontier_prerequisites_present: frontier,
        proof_grade_bridge_missing_criterion_count: missingCount(frontier, PROOF_BRIDGE_FIELDS),
        primitive_acceptance_missing_criterion_count: missingCount(frontier, PRIMITIVE_ACCEPTANCE_FIELDS),
        total_missing_frontier_prerequisite_count: missingCount(frontier),
        first_frontier_blocker: firstMissing(frontier),
        proof_grade_bridge_route_ready: PROOF_BRIDGE_FIELDS.every((field) => frontier[field] === true),
        primitive_source_packet_route_ready: PRIMITIVE_ACCEPTANCE_FIELDS.every((field) => frontier[field] === true),
        mechanical_continuation_available_from_current_inputs: false,
        accepted_interval_certified_constants_status_ref_constructed: false,
        accepted_interval_certified_constants_status_present: false,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
        classification: "bridge_frontier_waits_on_proof_grade_derivation_or_source_packet_acceptance_decision",
      };
    });
}

function buildRowProfiles(bridge) {
  return [...bridge.row_accepted_status_derivation_bridge_attempts]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((entry) => {
      const frontier = frontierPresence(entry);
      return {
        row_id: entry.row_id,
        ledger: entry.ledger,
        status: entry.status,
        failure_code: entry.failure_code,
        separator_event: entry.separator_event,
        fold_interval: entry.fold_interval,
        receiver_interval: entry.receiver_interval,
        source_interval: entry.source_interval,
        derivation_source_evidence_complete: entry.derivation_source_evidence_complete === true,
        source_certificate_bridge_ready: entry.bridge_ready === true,
        frontier_prerequisites_present: frontier,
        proof_grade_bridge_missing_criterion_count: missingCount(frontier, PROOF_BRIDGE_FIELDS),
        primitive_acceptance_missing_criterion_count: missingCount(frontier, PRIMITIVE_ACCEPTANCE_FIELDS),
        total_missing_frontier_prerequisite_count: missingCount(frontier),
        first_frontier_blocker: firstMissing(frontier),
        proof_grade_bridge_route_ready: PROOF_BRIDGE_FIELDS.every((field) => frontier[field] === true),
        primitive_source_packet_route_ready: PRIMITIVE_ACCEPTANCE_FIELDS.every((field) => frontier[field] === true),
        mechanical_continuation_available_from_current_inputs: false,
        accepted_interval_certified_constants_status_ref_constructed: false,
        accepted_interval_certified_constants_status_present: false,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
        classification: "row_bridge_frontier_waits_on_proof_grade_derivation_or_source_packet_acceptance_decision",
      };
    });
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths, inputs.bridge);
  const separatorProfiles = buildSeparatorProfiles(inputs.bridge);
  const rowProfiles = buildRowProfiles(inputs.bridge);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const rowsBlockedBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const summary = {
    frontier_source_hash_checks: sourceChecks.length,
    frontier_source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    retained_bridge_source_hash_checks_passed: inputs.bridge.summary.source_data_obligation_source_hash_checks_passed,
    retained_current_consistency_source_hash_checks_passed:
      inputs.bridge.summary.retained_current_consistency_source_hash_checks_passed,
    retained_materialization_source_hash_checks_passed:
      inputs.bridge.summary.retained_materialization_source_hash_checks_passed,
    candidate_higher_fold_constants_artifacts: inputs.bridge.summary.candidate_higher_fold_constants_artifacts,
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
    separator_status_derivation_bridge_ready_count: countTrue(separatorProfiles, (entry) => entry.source_certificate_bridge_ready),
    row_status_derivation_bridge_ready_count: countTrue(rowProfiles, (entry) => entry.source_certificate_bridge_ready),
    separator_proof_grade_bridge_route_ready_count: countTrue(
      separatorProfiles,
      (entry) => entry.proof_grade_bridge_route_ready,
    ),
    row_proof_grade_bridge_route_ready_count: countTrue(rowProfiles, (entry) => entry.proof_grade_bridge_route_ready),
    separator_primitive_source_packet_route_ready_count: countTrue(
      separatorProfiles,
      (entry) => entry.primitive_source_packet_route_ready,
    ),
    row_primitive_source_packet_route_ready_count: countTrue(
      rowProfiles,
      (entry) => entry.primitive_source_packet_route_ready,
    ),
    separator_mechanical_continuation_available_from_current_inputs: countTrue(
      separatorProfiles,
      (entry) => entry.mechanical_continuation_available_from_current_inputs,
    ),
    row_mechanical_continuation_available_from_current_inputs: countTrue(
      rowProfiles,
      (entry) => entry.mechanical_continuation_available_from_current_inputs,
    ),
    accepted_interval_certified_constants_status_refs_constructed: countTrue(
      separatorProfiles,
      (entry) => entry.accepted_interval_certified_constants_status_ref_constructed,
    ),
    accepted_interval_certified_constants_statuses_constructed: countTrue(
      separatorProfiles,
      (entry) => entry.accepted_interval_certified_constants_status_present,
    ),
    frontier_prerequisite_presence_counts: presenceCounts(
      separatorProfiles,
      FRONTIER_FIELDS,
      (entry, field) => entry.frontier_prerequisites_present[field],
    ),
    row_frontier_prerequisite_presence_counts: presenceCounts(
      rowProfiles,
      FRONTIER_FIELDS,
      (entry, field) => entry.frontier_prerequisites_present[field],
    ),
    missing_separator_proof_grade_bridge_prerequisites: separatorProfiles.reduce(
      (sum, entry) => sum + entry.proof_grade_bridge_missing_criterion_count,
      0,
    ),
    missing_row_proof_grade_bridge_prerequisites: rowProfiles.reduce(
      (sum, entry) => sum + entry.proof_grade_bridge_missing_criterion_count,
      0,
    ),
    missing_separator_primitive_acceptance_prerequisites: separatorProfiles.reduce(
      (sum, entry) => sum + entry.primitive_acceptance_missing_criterion_count,
      0,
    ),
    missing_row_primitive_acceptance_prerequisites: rowProfiles.reduce(
      (sum, entry) => sum + entry.primitive_acceptance_missing_criterion_count,
      0,
    ),
    missing_separator_frontier_prerequisites: separatorProfiles.reduce(
      (sum, entry) => sum + entry.total_missing_frontier_prerequisite_count,
      0,
    ),
    missing_row_frontier_prerequisites: rowProfiles.reduce(
      (sum, entry) => sum + entry.total_missing_frontier_prerequisite_count,
      0,
    ),
    bridge_frontier_blocked_rows_by_separator: rowsBlockedBySeparator,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_frontier_blocker: BLOCKERS_BY_FIELD.accepted_interval_certified_constants_status_proof_grade_derivation_ref_present,
    first_source_packet_decision_blocker: BLOCKERS_BY_FIELD.source_packet_acceptance_rule_present,
    parent_complement_consumption_ref_blocker: "parent_complement_consumption_ref_absent",
    first_separator_certificate_blocker: "higher_fold_separator_layer_certificate_absent",
  };
  const invariant =
    summary.frontier_source_hash_checks_passed === 4 &&
    summary.retained_bridge_source_hash_checks_passed === 9 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    summary.separators_with_derivation_source_evidence_complete === 12 &&
    summary.rows_with_derivation_source_evidence_complete === 112 &&
    summary.separator_status_derivation_bridge_ready_count === 0 &&
    summary.row_status_derivation_bridge_ready_count === 0 &&
    summary.separator_proof_grade_bridge_route_ready_count === 0 &&
    summary.row_proof_grade_bridge_route_ready_count === 0 &&
    summary.separator_primitive_source_packet_route_ready_count === 0 &&
    summary.row_primitive_source_packet_route_ready_count === 0 &&
    summary.separator_mechanical_continuation_available_from_current_inputs === 0 &&
    summary.row_mechanical_continuation_available_from_current_inputs === 0 &&
    summary.accepted_interval_certified_constants_status_refs_constructed === 0 &&
    summary.accepted_interval_certified_constants_statuses_constructed === 0 &&
    summary.missing_separator_proof_grade_bridge_prerequisites === 72 &&
    summary.missing_row_proof_grade_bridge_prerequisites === 672 &&
    summary.missing_separator_primitive_acceptance_prerequisites === 24 &&
    summary.missing_row_primitive_acceptance_prerequisites === 224 &&
    summary.missing_separator_frontier_prerequisites === 96 &&
    summary.missing_row_frontier_prerequisites === 896 &&
    summary.row_consumption_count === 0;
  if (!invariant) {
    throw new Error("Accepted interval-certified status bridge prerequisite frontier invariant failed.");
  }
  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-bridge-prerequisite-frontier-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only bridge prerequisite frontier classifier; partitions the live accepted-status blocker into absent proof-grade bridge evidence and absent source-packet acceptance route while preserving all fail-closed ledger locks",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_source_certificate_to_proof_grade_derivation_bridge_attempt: artifactRecord(paths.bridge),
      accepted_interval_certified_status_derivation_source_data_obligation_classifier: artifactRecord(
        paths.sourceDataObligation,
      ),
      same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier: artifactRecord(
        paths.acceptedConstantsConformance,
      ),
      same_packet_impulse_bound_source_packet_acceptance_dependency_classifier: artifactRecord(paths.impulseAcceptance),
    },
    source_hash_checks: sourceChecks,
    frontier_rule:
      "The proof-grade bridge route is ready only when every proof-grade accepted-status derivation prerequisite is already present. The primitive/source-packet route is ready only when a source-packet acceptance rule and accepted same_packet_fold_impulse_or_direct_quadrature_bound source packet are already present. This classifier chooses neither route and constructs no accepted status.",
    frontier_fields: FRONTIER_FIELDS,
    proof_grade_bridge_fields: PROOF_BRIDGE_FIELDS,
    primitive_acceptance_fields: PRIMITIVE_ACCEPTANCE_FIELDS,
    separator_bridge_prerequisite_frontier_profiles: separatorProfiles,
    row_bridge_prerequisite_frontier_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "Complete source certificates are present, but the route has no current mechanical continuation: the proof-grade bridge route has 72 missing separator prerequisites and the primitive source-packet route has 24 missing separator prerequisites.",
      continuation_class:
        "blocked for row consumption; mechanical only after proof-grade accepted-status bridge evidence is supplied, otherwise requires an explicit source-packet acceptance rule decision",
      fail_closed_stop_conditions: [
        "Do not treat bridge-ready source certificates as accepted interval-certified constants status.",
        "Do not infer a proof-grade accepted-status derivation ref, rule, soundness proof, endpoint application, or accepted constants conformance derivation from this frontier classifier.",
        "Do not introduce a source-packet acceptance rule or accepted same_packet_fold_impulse_or_direct_quadrature_bound source packet from this frontier classifier.",
        "Do not construct parent_complement_consumption_ref or higher_fold_separator_layer_certificate from this frontier classifier.",
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
      "Priority-only. This classifier turns the bridge miss into an explicit decision frontier: proof-grade bridge evidence can continue mechanically if supplied, while the source-packet route remains a separate acceptance-rule decision.",
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

function sourceHashTable(checks) {
  return checks
    .map(
      (check) =>
        `| \`${check.source_artifact}\` | \`${check.imported_basename}\` | \`${check.current_basename}\` | ${check.hash_matches} |`,
    )
    .join("\n");
}

function presenceTable(counts) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.row_count} | ${row.derivation_source_evidence_complete} | ${row.proof_grade_bridge_route_ready} | ${row.primitive_source_packet_route_ready} | ${row.mechanical_continuation_available_from_current_inputs} | \`${row.first_frontier_blocker}\` |`,
    )
    .join("\n");
}

function rowSummaryTable(packet) {
  return Object.entries(packet.summary.rows_by_separator_count)
    .map(([separator, count]) => {
      const blocked = packet.summary.bridge_frontier_blocked_rows_by_separator[separator] ?? 0;
      return `| \`${separator}\` | ${count} | ${blocked} |`;
    })
    .join("\n");
}

function reportMarkdown(packet) {
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Bridge Prerequisite Frontier Classifier

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Frontier Sharpened

This classifier starts from the accepted interval-certified status
source-certificate-to-proof-grade-derivation bridge attempt and partitions the
remaining blocker into two route classes:

- proof-grade accepted-status bridge evidence;
- primitive/source-packet acceptance evidence.

Both route classes remain absent under the current packet. The classifier
constructs no accepted interval-certified constants status and makes no
source-packet acceptance decision.

Verified source side:

- ${packet.summary.frontier_source_hash_checks_passed}
  / ${packet.summary.frontier_source_hash_checks} frontier source-hash locks;
- ${packet.summary.retained_bridge_source_hash_checks_passed}
  / 9 retained bridge source-hash locks;
- ${packet.summary.separators_with_derivation_source_evidence_complete}
  / ${packet.summary.candidate_separator_constants} separator derivation-source
  evidence profiles complete;
- ${packet.summary.rows_with_derivation_source_evidence_complete}
  / ${packet.summary.candidate_row_constant_associations} row
  derivation-source evidence profiles complete.

Frontier result:

- ${packet.summary.separator_proof_grade_bridge_route_ready_count}
  / ${packet.summary.candidate_separator_constants} separator proof-grade bridge
  routes ready;
- ${packet.summary.separator_primitive_source_packet_route_ready_count}
  / ${packet.summary.candidate_separator_constants} separator primitive
  source-packet routes ready;
- ${packet.summary.separator_mechanical_continuation_available_from_current_inputs}
  / ${packet.summary.candidate_separator_constants} separator mechanical
  continuations available from current inputs;
- ${packet.summary.missing_separator_proof_grade_bridge_prerequisites}
  missing separator proof-grade bridge prerequisites;
- ${packet.summary.missing_separator_primitive_acceptance_prerequisites}
  missing separator primitive acceptance prerequisites;
- ${packet.summary.missing_row_frontier_prerequisites}
  missing row frontier prerequisites.

The first frontier blocker is
\`${packet.summary.first_frontier_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(packet.source_artifacts)}

Source-hash checks:

| Source artifact | Imported file | Current file | Hash matches |
| --- | --- | --- | --- |
${sourceHashTable(packet.source_hash_checks)}

## Separator Frontier Profiles

| Separator | Fold interval | Rows | Source evidence complete | Proof bridge route ready | Source-packet route ready | Mechanical now | First blocker |
| --- | --- | ---: | --- | --- | --- | --- | --- |
${separatorTable(packet.separator_bridge_prerequisite_frontier_profiles)}

## Row Frontier Summary

| Separator | Rows | Frontier blocked rows |
| --- | ---: | ---: |
${rowSummaryTable(packet)}

## Frontier Prerequisite Presence

Separator-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(packet.summary.frontier_prerequisite_presence_counts)}

Row-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(packet.summary.row_frontier_prerequisite_presence_counts)}

## Certificate-Side Handoff

Sharpened blocker: ${packet.next_certificate_handoff.sharpened_blocker}

Continuation class: ${packet.next_certificate_handoff.continuation_class}.

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
    bridge: args.bridge,
    sourceDataObligation: args.sourceDataObligation,
    acceptedConstantsConformance: args.acceptedConstantsConformance,
    impulseAcceptance: args.impulseAcceptance,
  };
  const inputs = {
    bridge: readJson(paths.bridge),
    sourceDataObligation: readJson(paths.sourceDataObligation),
    acceptedConstantsConformance: readJson(paths.acceptedConstantsConformance),
    impulseAcceptance: readJson(paths.impulseAcceptance),
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
