#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ROUTE_EXHAUSTION_CLOSURE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_certificate_pool_route_exhaustion_closure_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_FRONTIER = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_bridge_prerequisite_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_SOURCE_PACKET_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_obligation_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const ROUTE_EXHAUSTION_CLOSURE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_certificate_pool_route_exhaustion_closure_classifier_fail_closed_proof_grade_and_source_packet_routes_exhausted_no_compatible_current_pool_evidence_no_primitive_acceptance_no_row_consumption";
const FRONTIER_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_bridge_prerequisite_frontier_classifier_fail_closed_proof_grade_bridge_and_source_packet_acceptance_frontiers_absent_no_row_consumption";
const PROOF_GRADE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier_fail_closed_source_certificates_complete_no_compatible_proof_grade_status_evidence_no_primitive_acceptance_no_row_consumption";
const PRIMITIVE_SOURCE_PACKET_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier_fail_closed_frontier_locked_separator_aggregates_present_no_compatible_source_packet_acceptance_evidence_no_primitive_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_decision_frontier_obligation_classifier_fail_closed_current_pool_exhausted_requires_proof_grade_status_evidence_or_source_packet_acceptance_decision_no_rule_decision_no_row_consumption";

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

const PROOF_GRADE_DECISION_FRONTIER_OBLIGATIONS = [
  "accepted_interval_certified_constants_status_proof_grade_derivation_ref",
  "accepted_interval_certified_constants_status_derivation",
  "accepted_interval_certified_constants_status_rule",
  "accepted_interval_certified_constants_status_soundness_proof",
  "accepted_interval_certified_constants_status_endpoint_application",
  "accepted_constants_conformance_derivation",
];

const PRIMITIVE_SOURCE_PACKET_DECISION_FRONTIER_OBLIGATIONS = [
  "source_packet_acceptance_rule",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
];

function parseArgs(argv) {
  const args = {
    routeExhaustionClosure: DEFAULT_ROUTE_EXHAUSTION_CLOSURE,
    frontier: DEFAULT_FRONTIER,
    proofGradeEvidence: DEFAULT_PROOF_GRADE_EVIDENCE,
    primitiveSourcePacketEvidence: DEFAULT_PRIMITIVE_SOURCE_PACKET_EVIDENCE,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--route-exhaustion-closure") {
      args.routeExhaustionClosure = argv[++index];
    } else if (arg === "--frontier" || arg === "--bridge-frontier") {
      args.frontier = argv[++index];
    } else if (arg === "--proof-grade-evidence") {
      args.proofGradeEvidence = argv[++index];
    } else if (arg === "--primitive-source-packet-evidence") {
      args.primitiveSourcePacketEvidence = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-decision-frontier-obligation-classifier.mjs [options]

Options:
  --route-exhaustion-closure PATH   Current certificate-pool route exhaustion closure classifier. Defaults to ${DEFAULT_ROUTE_EXHAUSTION_CLOSURE}.
  --bridge-frontier PATH            Bridge prerequisite frontier classifier. Defaults to ${DEFAULT_FRONTIER}.
  --proof-grade-evidence PATH       Proof-grade evidence dependency classifier. Defaults to ${DEFAULT_PROOF_GRADE_EVIDENCE}.
  --primitive-source-packet-evidence PATH
                                      Primitive source-packet acceptance evidence dependency classifier. Defaults to ${DEFAULT_PRIMITIVE_SOURCE_PACKET_EVIDENCE}.
  --out-dir PATH                    Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                          Pretty-print JSON artifact.
  --help                            Show this help.`);
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

function sourceHashChecks(paths) {
  return [
    ["accepted_status_current_certificate_pool_route_exhaustion_closure_classifier", paths.routeExhaustionClosure],
    ["accepted_status_bridge_prerequisite_frontier_classifier", paths.frontier],
    ["accepted_status_proof_grade_evidence_dependency_classifier", paths.proofGradeEvidence],
    ["accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier", paths.primitiveSourcePacketEvidence],
  ].map(([sourceArtifact, filePath]) => ({
    source_artifact: sourceArtifact,
    current_basename: path.basename(filePath),
    current_sha256: sha256File(filePath),
    hash_matches: true,
  }));
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

function validateRouteExhaustionClosure(routeExhaustionClosure) {
  assertPacketStatusAndLocks(routeExhaustionClosure, "routeExhaustionClosure", ROUTE_EXHAUSTION_CLOSURE_STATUS);
  const s = routeExhaustionClosure.summary;
  const expected = [
    [s.direct_source_hash_checks_passed, 3, "direct source-hash locks"],
    [s.retained_frontier_source_hash_checks_passed, 4, "frontier source-hash locks"],
    [s.retained_bridge_locked_source_hash_checks_passed, 9, "bridge-locked source-hash locks"],
    [s.retained_source_packet_route_source_hash_checks_passed, 5, "source-packet route source-hash locks"],
    [s.current_certificate_pool_json_files_scanned, 240, "current certificate-pool JSON files"],
    [s.candidate_higher_fold_constants_artifacts, 1, "candidate artifacts"],
    [s.candidate_separator_constants, 12, "separator constants"],
    [s.candidate_row_constant_associations, 112, "row associations"],
    [s.compatible_proof_grade_current_pool_evidence_files, 0, "compatible proof-grade evidence files"],
    [s.compatible_source_packet_acceptance_current_pool_evidence_files, 0, "compatible source-packet evidence files"],
    [s.separator_combined_route_evidence_slots, 96, "separator combined route slots"],
    [s.row_combined_route_evidence_slots, 896, "row combined route slots"],
    [s.mechanical_continuations_from_current_pool, 0, "mechanical continuations"],
    [s.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses"],
    [s.source_packet_acceptance_rules_constructed, 0, "source-packet acceptance rules"],
    [s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "accepted source packets"],
    [s.row_consumption_count, 0, "row consumption"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected route exhaustion closure ${label}: ${actual}`);
    }
  }
}

function validateDirectInputs(inputs) {
  validateRouteExhaustionClosure(inputs.routeExhaustionClosure);
  assertPacketStatusAndLocks(inputs.frontier, "frontier", FRONTIER_STATUS);
  assertPacketStatusAndLocks(inputs.proofGradeEvidence, "proofGradeEvidence", PROOF_GRADE_EVIDENCE_STATUS);
  assertPacketStatusAndLocks(
    inputs.primitiveSourcePacketEvidence,
    "primitiveSourcePacketEvidence",
    PRIMITIVE_SOURCE_PACKET_EVIDENCE_STATUS,
  );
  const expected = [
    [inputs.frontier.summary.frontier_source_hash_checks_passed, 4, "frontier source-hash locks"],
    [inputs.proofGradeEvidence.summary.source_hash_checks_passed, 9, "proof-grade source-hash locks"],
    [
      inputs.primitiveSourcePacketEvidence.summary.source_packet_route_source_hash_checks_passed,
      5,
      "primitive source-packet source-hash locks",
    ],
    [
      inputs.proofGradeEvidence.summary.evidence_pool_compatible_proof_grade_status_evidence_files,
      0,
      "compatible proof-grade evidence files",
    ],
    [
      inputs.primitiveSourcePacketEvidence.summary.evidence_pool_compatible_source_packet_acceptance_evidence_files,
      0,
      "compatible primitive source-packet evidence files",
    ],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected direct input ${label}: ${actual}`);
    }
  }
}

function decisionObligationProfile(base, rowScoped) {
  const proofMissing = base.proof_grade_evidence_slots_missing;
  const primitiveMissing = base.primitive_source_packet_acceptance_evidence_slots_missing;
  const combinedMissing = base.combined_route_evidence_slots_missing;
  return {
    ...(rowScoped
      ? {
          row_id: base.row_id,
          ledger: base.ledger,
          status: base.status,
          failure_code: base.failure_code,
        }
      : {}),
    separator_event: base.separator_event,
    fold_interval: base.fold_interval,
    ...(rowScoped
      ? {
          receiver_interval: base.receiver_interval,
          source_interval: base.source_interval,
        }
      : {
          row_count: base.row_count,
        }),
    proof_grade_decision_frontier_obligation_fields: PROOF_GRADE_DECISION_FRONTIER_OBLIGATIONS,
    primitive_source_packet_decision_frontier_obligation_fields:
      PRIMITIVE_SOURCE_PACKET_DECISION_FRONTIER_OBLIGATIONS,
    proof_grade_decision_frontier_obligation_slots: base.proof_grade_evidence_slots,
    proof_grade_decision_frontier_obligation_slots_satisfied: base.proof_grade_evidence_slots_filled,
    proof_grade_decision_frontier_obligation_slots_missing: proofMissing,
    primitive_source_packet_decision_frontier_obligation_slots:
      base.primitive_source_packet_acceptance_evidence_slots,
    primitive_source_packet_decision_frontier_obligation_slots_satisfied:
      base.primitive_source_packet_acceptance_evidence_slots_filled,
    primitive_source_packet_decision_frontier_obligation_slots_missing: primitiveMissing,
    combined_decision_frontier_obligation_slots: base.combined_route_evidence_slots,
    combined_decision_frontier_obligation_slots_satisfied: base.combined_route_evidence_slots_filled,
    combined_decision_frontier_obligation_slots_missing: combinedMissing,
    proof_grade_decision_frontier_open: proofMissing > 0,
    primitive_source_packet_decision_frontier_open: primitiveMissing > 0,
    current_pool_mechanical_continuation_available: false,
    proof_rule_decision_made: false,
    primitive_acceptance_decision_made: false,
    accepted_interval_certified_constants_status_present: false,
    source_packet_acceptance_rule_present: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
    row_consumed: false,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    decision_frontier_classification:
      "proof_grade_evidence_or_primitive_source_packet_acceptance_obligation_open_no_decision_made",
  };
}

function buildSeparatorProfiles(routeExhaustionClosure) {
  return routeExhaustionClosure.separator_current_certificate_pool_route_exhaustion_profiles
    .slice()
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((entry) => decisionObligationProfile(entry, false));
}

function buildRowProfiles(routeExhaustionClosure) {
  return routeExhaustionClosure.row_current_certificate_pool_route_exhaustion_profiles
    .slice()
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((entry) => decisionObligationProfile(entry, true));
}

function buildPacket(paths, inputs) {
  validateDirectInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const routeExhaustionClosure = inputs.routeExhaustionClosure;
  const separatorProfiles = buildSeparatorProfiles(routeExhaustionClosure);
  const rowProfiles = buildRowProfiles(routeExhaustionClosure);
  const s0 = routeExhaustionClosure.summary;
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    retained_route_exhaustion_direct_source_hash_checks_passed: s0.direct_source_hash_checks_passed,
    retained_frontier_source_hash_checks_passed: s0.retained_frontier_source_hash_checks_passed,
    retained_bridge_locked_source_hash_checks_passed: s0.retained_bridge_locked_source_hash_checks_passed,
    retained_source_packet_route_source_hash_checks_passed: s0.retained_source_packet_route_source_hash_checks_passed,
    current_certificate_pool_json_files_scanned: s0.current_certificate_pool_json_files_scanned,
    candidate_higher_fold_constants_artifacts: s0.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: separatorProfiles.length,
    candidate_row_constant_associations: rowProfiles.length,
    rows_by_separator_count: sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event)),
    decision_frontier_classes: 2,
    proof_grade_decision_frontier_obligation_families: PROOF_GRADE_DECISION_FRONTIER_OBLIGATIONS.length,
    primitive_source_packet_decision_frontier_obligation_families:
      PRIMITIVE_SOURCE_PACKET_DECISION_FRONTIER_OBLIGATIONS.length,
    combined_decision_frontier_obligation_families:
      PROOF_GRADE_DECISION_FRONTIER_OBLIGATIONS.length +
      PRIMITIVE_SOURCE_PACKET_DECISION_FRONTIER_OBLIGATIONS.length,
    proof_grade_bridge_routes_ready: s0.proof_grade_bridge_routes_ready,
    primitive_source_packet_routes_ready: s0.primitive_source_packet_routes_ready,
    mechanical_continuations_from_current_pool: s0.mechanical_continuations_from_current_pool,
    compatible_proof_grade_current_pool_evidence_files: s0.compatible_proof_grade_current_pool_evidence_files,
    compatible_source_packet_acceptance_current_pool_evidence_files:
      s0.compatible_source_packet_acceptance_current_pool_evidence_files,
    separator_proof_grade_decision_frontier_obligation_slots: separatorProfiles.reduce(
      (sum, entry) => sum + entry.proof_grade_decision_frontier_obligation_slots,
      0,
    ),
    separator_proof_grade_decision_frontier_obligation_slots_satisfied: separatorProfiles.reduce(
      (sum, entry) => sum + entry.proof_grade_decision_frontier_obligation_slots_satisfied,
      0,
    ),
    separator_proof_grade_decision_frontier_obligation_slots_missing: separatorProfiles.reduce(
      (sum, entry) => sum + entry.proof_grade_decision_frontier_obligation_slots_missing,
      0,
    ),
    separator_primitive_source_packet_decision_frontier_obligation_slots: separatorProfiles.reduce(
      (sum, entry) => sum + entry.primitive_source_packet_decision_frontier_obligation_slots,
      0,
    ),
    separator_primitive_source_packet_decision_frontier_obligation_slots_satisfied: separatorProfiles.reduce(
      (sum, entry) => sum + entry.primitive_source_packet_decision_frontier_obligation_slots_satisfied,
      0,
    ),
    separator_primitive_source_packet_decision_frontier_obligation_slots_missing: separatorProfiles.reduce(
      (sum, entry) => sum + entry.primitive_source_packet_decision_frontier_obligation_slots_missing,
      0,
    ),
    separator_combined_decision_frontier_obligation_slots: separatorProfiles.reduce(
      (sum, entry) => sum + entry.combined_decision_frontier_obligation_slots,
      0,
    ),
    separator_combined_decision_frontier_obligation_slots_satisfied: separatorProfiles.reduce(
      (sum, entry) => sum + entry.combined_decision_frontier_obligation_slots_satisfied,
      0,
    ),
    separator_combined_decision_frontier_obligation_slots_missing: separatorProfiles.reduce(
      (sum, entry) => sum + entry.combined_decision_frontier_obligation_slots_missing,
      0,
    ),
    row_proof_grade_decision_frontier_obligation_slots: rowProfiles.reduce(
      (sum, entry) => sum + entry.proof_grade_decision_frontier_obligation_slots,
      0,
    ),
    row_proof_grade_decision_frontier_obligation_slots_satisfied: rowProfiles.reduce(
      (sum, entry) => sum + entry.proof_grade_decision_frontier_obligation_slots_satisfied,
      0,
    ),
    row_proof_grade_decision_frontier_obligation_slots_missing: rowProfiles.reduce(
      (sum, entry) => sum + entry.proof_grade_decision_frontier_obligation_slots_missing,
      0,
    ),
    row_primitive_source_packet_decision_frontier_obligation_slots: rowProfiles.reduce(
      (sum, entry) => sum + entry.primitive_source_packet_decision_frontier_obligation_slots,
      0,
    ),
    row_primitive_source_packet_decision_frontier_obligation_slots_satisfied: rowProfiles.reduce(
      (sum, entry) => sum + entry.primitive_source_packet_decision_frontier_obligation_slots_satisfied,
      0,
    ),
    row_primitive_source_packet_decision_frontier_obligation_slots_missing: rowProfiles.reduce(
      (sum, entry) => sum + entry.primitive_source_packet_decision_frontier_obligation_slots_missing,
      0,
    ),
    row_combined_decision_frontier_obligation_slots: rowProfiles.reduce(
      (sum, entry) => sum + entry.combined_decision_frontier_obligation_slots,
      0,
    ),
    row_combined_decision_frontier_obligation_slots_satisfied: rowProfiles.reduce(
      (sum, entry) => sum + entry.combined_decision_frontier_obligation_slots_satisfied,
      0,
    ),
    row_combined_decision_frontier_obligation_slots_missing: rowProfiles.reduce(
      (sum, entry) => sum + entry.combined_decision_frontier_obligation_slots_missing,
      0,
    ),
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
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_proof_grade_decision_frontier_blocker:
      "accepted_interval_certified_constants_status_proof_grade_evidence_construction_absent",
    first_primitive_source_packet_decision_frontier_blocker:
      "source_packet_acceptance_rule_or_accepted_source_packet_absent",
    parent_complement_consumption_ref_blocker: "parent_complement_consumption_ref_absent",
    first_separator_certificate_blocker: "higher_fold_separator_layer_certificate_absent",
  };
  const invariant =
    summary.direct_source_hash_checks === 4 &&
    summary.direct_source_hash_checks_passed === 4 &&
    summary.retained_route_exhaustion_direct_source_hash_checks_passed === 3 &&
    summary.retained_frontier_source_hash_checks_passed === 4 &&
    summary.retained_bridge_locked_source_hash_checks_passed === 9 &&
    summary.retained_source_packet_route_source_hash_checks_passed === 5 &&
    summary.current_certificate_pool_json_files_scanned === 240 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    JSON.stringify(summary.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR) &&
    summary.decision_frontier_classes === 2 &&
    summary.proof_grade_decision_frontier_obligation_families === 6 &&
    summary.primitive_source_packet_decision_frontier_obligation_families === 2 &&
    summary.combined_decision_frontier_obligation_families === 8 &&
    summary.proof_grade_bridge_routes_ready === 0 &&
    summary.primitive_source_packet_routes_ready === 0 &&
    summary.mechanical_continuations_from_current_pool === 0 &&
    summary.compatible_proof_grade_current_pool_evidence_files === 0 &&
    summary.compatible_source_packet_acceptance_current_pool_evidence_files === 0 &&
    summary.separator_proof_grade_decision_frontier_obligation_slots === 72 &&
    summary.separator_proof_grade_decision_frontier_obligation_slots_satisfied === 0 &&
    summary.separator_proof_grade_decision_frontier_obligation_slots_missing === 72 &&
    summary.separator_primitive_source_packet_decision_frontier_obligation_slots === 24 &&
    summary.separator_primitive_source_packet_decision_frontier_obligation_slots_satisfied === 0 &&
    summary.separator_primitive_source_packet_decision_frontier_obligation_slots_missing === 24 &&
    summary.separator_combined_decision_frontier_obligation_slots === 96 &&
    summary.separator_combined_decision_frontier_obligation_slots_satisfied === 0 &&
    summary.separator_combined_decision_frontier_obligation_slots_missing === 96 &&
    summary.row_proof_grade_decision_frontier_obligation_slots === 672 &&
    summary.row_proof_grade_decision_frontier_obligation_slots_satisfied === 0 &&
    summary.row_proof_grade_decision_frontier_obligation_slots_missing === 672 &&
    summary.row_primitive_source_packet_decision_frontier_obligation_slots === 224 &&
    summary.row_primitive_source_packet_decision_frontier_obligation_slots_satisfied === 0 &&
    summary.row_primitive_source_packet_decision_frontier_obligation_slots_missing === 224 &&
    summary.row_combined_decision_frontier_obligation_slots === 896 &&
    summary.row_combined_decision_frontier_obligation_slots_satisfied === 0 &&
    summary.row_combined_decision_frontier_obligation_slots_missing === 896 &&
    summary.proof_rule_decisions_made === 0 &&
    summary.primitive_acceptance_decisions_made === 0 &&
    summary.source_packet_acceptance_rules_constructed === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.accepted_interval_certified_constants_statuses_constructed === 0 &&
    summary.accepted_fold_layer_rows === 0 &&
    summary.row_consumption_count === 0 &&
    summary.preledger_pass === false &&
    summary.updates_live_ledger === false &&
    summary.branch_chart_authorized === false;
  if (!invariant) {
    throw new Error("Current certificate-pool decision-frontier obligation invariant failed.");
  }
  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-decision-frontier-obligation-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only accepted interval-certified status decision-frontier obligation classifier; reduces the exhausted proof-grade and primitive/source-packet routes to explicit missing obligation families without making a proof-rule or primitive-acceptance decision",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_current_certificate_pool_route_exhaustion_closure_classifier: artifactRecord(
        paths.routeExhaustionClosure,
      ),
      accepted_status_bridge_prerequisite_frontier_classifier: artifactRecord(paths.frontier),
      accepted_status_proof_grade_evidence_dependency_classifier: artifactRecord(paths.proofGradeEvidence),
      accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier: artifactRecord(
        paths.primitiveSourcePacketEvidence,
      ),
    },
    source_hash_checks: sourceChecks,
    decision_frontier_rule:
      "After current-pool route exhaustion, this packet records the two remaining explicit frontiers: a proof-grade accepted interval-certified constants status evidence construction frontier and a primitive/source-packet acceptance frontier. It does not satisfy either frontier and introduces no acceptance rule.",
    proof_grade_decision_frontier_obligation_fields: PROOF_GRADE_DECISION_FRONTIER_OBLIGATIONS,
    primitive_source_packet_decision_frontier_obligation_fields:
      PRIMITIVE_SOURCE_PACKET_DECISION_FRONTIER_OBLIGATIONS,
    separator_decision_frontier_obligation_profiles: separatorProfiles,
    row_decision_frontier_obligation_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The current certificate pool is no longer merely missing compatible evidence; the missing evidence is reduced to two explicit decision frontiers with 6 proof-grade accepted-status obligation families and 2 primitive/source-packet obligation families.",
      continuation_class:
        "requires construction of proof-grade accepted-status evidence or an explicit source-packet acceptance rule/accepted source packet; no mechanical continuation exists from current inputs",
      fail_closed_stop_conditions: [
        "Do not treat this obligation classifier as an accepted interval-certified constants status.",
        "Do not infer a source-packet acceptance rule or accepted source packet from the decision-frontier classification.",
        "Do not construct parent_complement_consumption_ref or higher_fold_separator_layer_certificate from this packet.",
        "Do not consume rows, set preledger_pass, update the live ledger, or authorize a branch chart.",
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
      "Captured as a priority-only certificate-side decision-frontier obligation classifier under reference/priorities/proof-programs; no promotion to content/markdown/aaa.",
  };
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
  const obligationRows = [
    [
      "Proof-grade accepted-status evidence",
      String(s.proof_grade_decision_frontier_obligation_families),
      String(s.separator_proof_grade_decision_frontier_obligation_slots_missing),
      String(s.row_proof_grade_decision_frontier_obligation_slots_missing),
      `\`${s.first_proof_grade_decision_frontier_blocker}\``,
    ],
    [
      "Primitive/source-packet acceptance",
      String(s.primitive_source_packet_decision_frontier_obligation_families),
      String(s.separator_primitive_source_packet_decision_frontier_obligation_slots_missing),
      String(s.row_primitive_source_packet_decision_frontier_obligation_slots_missing),
      `\`${s.first_primitive_source_packet_decision_frontier_blocker}\``,
    ],
  ];
  const separatorRows = packet.separator_decision_frontier_obligation_profiles.map((entry) => [
    `\`${entry.separator_event}\``,
    `\`${entry.fold_interval}\``,
    String(entry.row_count),
    String(entry.proof_grade_decision_frontier_obligation_slots_missing),
    String(entry.primitive_source_packet_decision_frontier_obligation_slots_missing),
    String(entry.combined_decision_frontier_obligation_slots_missing),
    String(entry.current_pool_mechanical_continuation_available),
  ]);
  const rowsBySeparatorRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Decision-Frontier Obligation Classifier

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Decision Frontier Sharpened

This packet imports the current certificate-pool route exhaustion closure
classifier and reduces the live blocker to two explicit obligation frontiers:

- proof-grade accepted-status evidence construction;
- primitive/source-packet acceptance.

It introduces no proof rule, primitive accepted-status rule, source-packet
acceptance rule, accepted status, accepted source packet, row consumption,
live-ledger update, or branch-chart authorization.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct decision-frontier source-hash locks;
- ${s.retained_route_exhaustion_direct_source_hash_checks_passed} / 3 retained route-exhaustion source-hash locks;
- ${s.retained_frontier_source_hash_checks_passed} / 4 retained frontier source-hash locks;
- ${s.retained_bridge_locked_source_hash_checks_passed} / 9 retained bridge-locked source-hash locks;
- ${s.retained_source_packet_route_source_hash_checks_passed} / 5 retained source-packet route source-hash locks;
- ${s.current_certificate_pool_json_files_scanned} current certificate-pool JSON files scanned by the imported closure classifier.

Decision-frontier result:

- ${s.decision_frontier_classes} route classes remain open;
- ${s.proof_grade_decision_frontier_obligation_families} proof-grade accepted-status obligation families;
- ${s.primitive_source_packet_decision_frontier_obligation_families} primitive/source-packet obligation families;
- ${s.separator_combined_decision_frontier_obligation_slots} separator decision-frontier obligation slots;
- ${s.separator_combined_decision_frontier_obligation_slots_satisfied} separator decision-frontier obligation slots satisfied;
- ${s.row_combined_decision_frontier_obligation_slots} row decision-frontier obligation slots;
- ${s.row_combined_decision_frontier_obligation_slots_satisfied} row decision-frontier obligation slots satisfied;
- ${s.mechanical_continuations_from_current_pool} mechanical continuations from the current pool.

The first proof-grade decision-frontier blocker is
\`${s.first_proof_grade_decision_frontier_blocker}\`.

The first primitive/source-packet decision-frontier blocker is
\`${s.first_primitive_source_packet_decision_frontier_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source-Hash Checks

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

## Open Decision Frontiers

| Frontier | Obligation families | Missing separator slots | Missing row slots | First blocker |
| --- | ---: | ---: | ---: | --- |
${markdownTable(obligationRows)}

## Separator Obligation Profiles

| Separator | Fold interval | Rows | Proof-grade missing | Primitive missing | Combined missing | Mechanical now |
| --- | --- | ---: | ---: | ---: | ---: | --- |
${markdownTable(separatorRows)}

## Row Scope

| Separator | Rows |
| --- | ---: |
${markdownTable(rowsBySeparatorRows)}

## Certificate-Side Handoff

Sharpened blocker: the current certificate pool is no longer merely missing
compatible evidence. The missing evidence is reduced to two explicit decision
frontiers with 6 proof-grade accepted-status obligation families and 2
primitive/source-packet obligation families.

Continuation class: requires construction of proof-grade accepted-status
evidence or an explicit source-packet acceptance rule/accepted source packet;
no mechanical continuation exists from current inputs.

Fail-closed stop conditions:

- Do not treat this obligation classifier as an accepted interval-certified
  constants status.
- Do not infer a source-packet acceptance rule or accepted source packet from
  the decision-frontier classification.
- Do not construct \`parent_complement_consumption_ref\` or
  \`higher_fold_separator_layer_certificate\` from this packet.
- Do not consume rows, set \`preledger_pass\`, update the live ledger, or
  authorize a branch chart.

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
  const inputs = {
    routeExhaustionClosure: readJson(args.routeExhaustionClosure),
    frontier: readJson(args.frontier),
    proofGradeEvidence: readJson(args.proofGradeEvidence),
    primitiveSourcePacketEvidence: readJson(args.primitiveSourcePacketEvidence),
  };
  const packet = buildPacket(args, inputs);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, renderReport(packet));
  console.log(`wrote ${outputJsonPath}`);
  console.log(`wrote ${outputReportPath}`);
  console.log(packet.status);
  console.log(JSON.stringify(packet.summary, null, 2));
}

main();
