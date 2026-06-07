#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_FRONTIER = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_bridge_prerequisite_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_SOURCE_PACKET_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_certificate_pool_route_exhaustion_closure_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_certificate_pool_route_exhaustion_closure_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const FRONTIER_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_bridge_prerequisite_frontier_classifier_fail_closed_proof_grade_bridge_and_source_packet_acceptance_frontiers_absent_no_row_consumption";
const PROOF_GRADE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier_fail_closed_source_certificates_complete_no_compatible_proof_grade_status_evidence_no_primitive_acceptance_no_row_consumption";
const PRIMITIVE_SOURCE_PACKET_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier_fail_closed_frontier_locked_separator_aggregates_present_no_compatible_source_packet_acceptance_evidence_no_primitive_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_certificate_pool_route_exhaustion_closure_classifier_fail_closed_proof_grade_and_source_packet_routes_exhausted_no_compatible_current_pool_evidence_no_primitive_acceptance_no_row_consumption";

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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-current-certificate-pool-route-exhaustion-closure-classifier.mjs [options]

Options:
  --bridge-frontier PATH                    Bridge prerequisite frontier classifier. Defaults to ${DEFAULT_FRONTIER}.
  --proof-grade-evidence PATH               Proof-grade accepted-status evidence dependency classifier. Defaults to ${DEFAULT_PROOF_GRADE_EVIDENCE}.
  --primitive-source-packet-evidence PATH   Primitive source-packet acceptance evidence dependency classifier. Defaults to ${DEFAULT_PRIMITIVE_SOURCE_PACKET_EVIDENCE}.
  --out-dir PATH                            Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                  Pretty-print JSON artifact.
  --help                                    Show this help.`);
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

function currentCertificatePoolSnapshot(evidencePoolDir, outputBasename) {
  const jsonFiles = fs
    .readdirSync(evidencePoolDir)
    .filter((entry) => entry.endsWith(".json") && entry !== outputBasename)
    .sort();
  const fileRecords = jsonFiles.map((basename) => {
    const filePath = path.join(evidencePoolDir, basename);
    return {
      basename,
      sha256: sha256File(filePath),
    };
  });
  const poolHash = crypto
    .createHash("sha256")
    .update(fileRecords.map((record) => `${record.basename}:${record.sha256}`).join("\n"))
    .digest("hex");
  return {
    directory: evidencePoolDir,
    output_json_basename_excluded: outputBasename,
    json_files_scanned_before_output: fileRecords.length,
    json_pool_sha256: poolHash,
    json_basenames: fileRecords.map((record) => record.basename),
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

function assertPacketAndStatus(source, name, expectedStatus) {
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

function sourceHashChecks(paths) {
  return [
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

function validateInputs(inputs) {
  assertPacketAndStatus(inputs.frontier, "frontier", FRONTIER_STATUS);
  assertPacketAndStatus(inputs.proofGradeEvidence, "proofGradeEvidence", PROOF_GRADE_EVIDENCE_STATUS);
  assertPacketAndStatus(
    inputs.primitiveSourcePacketEvidence,
    "primitiveSourcePacketEvidence",
    PRIMITIVE_SOURCE_PACKET_EVIDENCE_STATUS,
  );
  const expected = [
    [inputs.frontier.summary.separator_mechanical_continuation_available_from_current_inputs, 0, "frontier separator mechanical continuation"],
    [inputs.frontier.summary.row_mechanical_continuation_available_from_current_inputs, 0, "frontier row mechanical continuation"],
    [inputs.frontier.summary.missing_separator_frontier_prerequisites, 96, "frontier separator prerequisites"],
    [inputs.frontier.summary.missing_row_frontier_prerequisites, 896, "frontier row prerequisites"],
    [
      inputs.proofGradeEvidence.summary.evidence_pool_compatible_proof_grade_status_evidence_files,
      0,
      "compatible proof-grade status evidence files",
    ],
    [inputs.proofGradeEvidence.summary.separator_proof_grade_evidence_slots, 72, "separator proof-grade slots"],
    [inputs.proofGradeEvidence.summary.row_proof_grade_evidence_slots, 672, "row proof-grade slots"],
    [
      inputs.primitiveSourcePacketEvidence.summary.evidence_pool_compatible_source_packet_acceptance_evidence_files,
      0,
      "compatible primitive source-packet files",
    ],
    [
      inputs.primitiveSourcePacketEvidence.summary.separator_source_packet_acceptance_evidence_slots,
      24,
      "separator primitive slots",
    ],
    [inputs.primitiveSourcePacketEvidence.summary.row_source_packet_acceptance_evidence_slots, 224, "row primitive slots"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
}

function buildSeparatorProfiles(inputs) {
  const proofBySeparator = new Map(
    inputs.proofGradeEvidence.separator_proof_grade_evidence_dependency_profiles.map((entry) => [
      entry.separator_event,
      entry,
    ]),
  );
  const primitiveBySeparator = new Map(
    inputs.primitiveSourcePacketEvidence.separator_source_packet_acceptance_evidence_dependency_profiles.map((entry) => [
      entry.separator_event,
      entry,
    ]),
  );
  return [...inputs.frontier.separator_bridge_prerequisite_frontier_profiles]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((entry) => {
      const proof = proofBySeparator.get(entry.separator_event);
      const primitive = primitiveBySeparator.get(entry.separator_event);
      if (!proof || !primitive) {
        throw new Error(`Missing route profile for ${entry.separator_event}`);
      }
      return {
        separator_event: entry.separator_event,
        fold_interval: entry.fold_interval,
        row_count: entry.row_count,
        derivation_source_evidence_complete: entry.derivation_source_evidence_complete === true,
        separator_aggregate_fields_complete: primitive.separator_aggregate_fields_complete === true,
        proof_grade_evidence_slots: proof.proof_grade_evidence_slots,
        proof_grade_evidence_slots_filled: proof.compatible_proof_grade_evidence_slots_filled,
        proof_grade_evidence_slots_missing: proof.compatible_proof_grade_evidence_slots_missing,
        primitive_source_packet_acceptance_evidence_slots: primitive.source_packet_acceptance_evidence_slots,
        primitive_source_packet_acceptance_evidence_slots_filled:
          primitive.compatible_source_packet_acceptance_evidence_slots_filled,
        primitive_source_packet_acceptance_evidence_slots_missing:
          primitive.compatible_source_packet_acceptance_evidence_slots_missing,
        combined_route_evidence_slots: proof.proof_grade_evidence_slots + primitive.source_packet_acceptance_evidence_slots,
        combined_route_evidence_slots_filled:
          proof.compatible_proof_grade_evidence_slots_filled +
          primitive.compatible_source_packet_acceptance_evidence_slots_filled,
        combined_route_evidence_slots_missing:
          proof.compatible_proof_grade_evidence_slots_missing +
          primitive.compatible_source_packet_acceptance_evidence_slots_missing,
        proof_grade_route_exhausted_in_current_certificate_pool: true,
        primitive_source_packet_route_exhausted_in_current_certificate_pool: true,
        current_certificate_pool_route_exhausted: true,
        mechanical_continuation_available_from_current_inputs: false,
        accepted_interval_certified_constants_status_ref_constructed: false,
        accepted_interval_certified_constants_status_present: false,
        source_packet_acceptance_rule_constructed: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
        first_proof_grade_route_blocker:
          "compatible_proof_grade_accepted_interval_certified_constants_status_evidence_absent",
        first_primitive_route_blocker: "compatible_source_packet_acceptance_evidence_absent",
        classification: "current_certificate_pool_exhausts_proof_grade_and_primitive_accepted_status_routes",
      };
    });
}

function buildRowProfiles(inputs) {
  const proofByRow = new Map(
    inputs.proofGradeEvidence.row_proof_grade_evidence_dependency_profiles.map((entry) => [entry.row_id, entry]),
  );
  const primitiveByRow = new Map(
    inputs.primitiveSourcePacketEvidence.row_source_packet_acceptance_evidence_dependency_profiles.map((entry) => [
      entry.row_id,
      entry,
    ]),
  );
  return [...inputs.frontier.row_bridge_prerequisite_frontier_profiles]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((entry) => {
      const proof = proofByRow.get(entry.row_id);
      const primitive = primitiveByRow.get(entry.row_id);
      if (!proof || !primitive) {
        throw new Error(`Missing route profile for ${entry.row_id}`);
      }
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
        separator_aggregate_fields_complete: primitive.separator_aggregate_fields_complete === true,
        proof_grade_evidence_slots: proof.proof_grade_evidence_slots,
        proof_grade_evidence_slots_filled: proof.compatible_proof_grade_evidence_slots_filled,
        proof_grade_evidence_slots_missing: proof.compatible_proof_grade_evidence_slots_missing,
        primitive_source_packet_acceptance_evidence_slots: primitive.source_packet_acceptance_evidence_slots,
        primitive_source_packet_acceptance_evidence_slots_filled:
          primitive.compatible_source_packet_acceptance_evidence_slots_filled,
        primitive_source_packet_acceptance_evidence_slots_missing:
          primitive.compatible_source_packet_acceptance_evidence_slots_missing,
        combined_route_evidence_slots: proof.proof_grade_evidence_slots + primitive.source_packet_acceptance_evidence_slots,
        combined_route_evidence_slots_filled:
          proof.compatible_proof_grade_evidence_slots_filled +
          primitive.compatible_source_packet_acceptance_evidence_slots_filled,
        combined_route_evidence_slots_missing:
          proof.compatible_proof_grade_evidence_slots_missing +
          primitive.compatible_source_packet_acceptance_evidence_slots_missing,
        proof_grade_route_exhausted_in_current_certificate_pool: true,
        primitive_source_packet_route_exhausted_in_current_certificate_pool: true,
        current_certificate_pool_route_exhausted: true,
        mechanical_continuation_available_from_current_inputs: false,
        accepted_interval_certified_constants_status_ref_constructed: false,
        accepted_interval_certified_constants_status_present: false,
        source_packet_acceptance_rule_constructed: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
        first_proof_grade_route_blocker:
          "compatible_proof_grade_accepted_interval_certified_constants_status_evidence_absent",
        first_primitive_route_blocker: "compatible_source_packet_acceptance_evidence_absent",
        classification: "row_current_certificate_pool_exhausts_proof_grade_and_primitive_accepted_status_routes",
      };
    });
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const currentPoolSnapshot = currentCertificatePoolSnapshot(paths.outDir, OUTPUT_JSON);
  const separatorProfiles = buildSeparatorProfiles(inputs);
  const rowProfiles = buildRowProfiles(inputs);
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    retained_frontier_source_hash_checks_passed: inputs.frontier.summary.frontier_source_hash_checks_passed,
    retained_bridge_locked_source_hash_checks_passed: inputs.proofGradeEvidence.summary.source_hash_checks_passed,
    retained_source_packet_route_source_hash_checks_passed:
      inputs.primitiveSourcePacketEvidence.summary.source_packet_route_source_hash_checks_passed,
    current_certificate_pool_json_files_scanned: currentPoolSnapshot.json_files_scanned_before_output,
    candidate_higher_fold_constants_artifacts: inputs.frontier.summary.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: separatorProfiles.length,
    candidate_row_constant_associations: rowProfiles.length,
    rows_by_separator_count: sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event)),
    separators_with_derivation_source_evidence_complete: countTrue(
      separatorProfiles,
      (entry) => entry.derivation_source_evidence_complete,
    ),
    rows_with_derivation_source_evidence_complete: countTrue(
      rowProfiles,
      (entry) => entry.derivation_source_evidence_complete,
    ),
    separators_with_separator_aggregate_fields_complete: countTrue(
      separatorProfiles,
      (entry) => entry.separator_aggregate_fields_complete,
    ),
    rows_with_separator_aggregate_fields_complete: countTrue(
      rowProfiles,
      (entry) => entry.separator_aggregate_fields_complete,
    ),
    proof_grade_evidence_pool_json_files_scanned: inputs.proofGradeEvidence.summary.evidence_pool_json_files_scanned,
    compatible_proof_grade_current_pool_evidence_files:
      inputs.proofGradeEvidence.summary.evidence_pool_compatible_proof_grade_status_evidence_files,
    primitive_source_packet_evidence_pool_json_files_scanned:
      inputs.primitiveSourcePacketEvidence.summary.evidence_pool_json_files_scanned,
    compatible_source_packet_acceptance_current_pool_evidence_files:
      inputs.primitiveSourcePacketEvidence.summary.evidence_pool_compatible_source_packet_acceptance_evidence_files,
    evidence_pool_route_classes_exhausted: 2,
    proof_grade_bridge_routes_ready: 0,
    primitive_source_packet_routes_ready: 0,
    mechanical_continuations_from_current_pool: 0,
    separator_proof_grade_evidence_slots: separatorProfiles.reduce((sum, entry) => sum + entry.proof_grade_evidence_slots, 0),
    separator_proof_grade_evidence_slots_filled: separatorProfiles.reduce(
      (sum, entry) => sum + entry.proof_grade_evidence_slots_filled,
      0,
    ),
    separator_primitive_source_packet_acceptance_evidence_slots: separatorProfiles.reduce(
      (sum, entry) => sum + entry.primitive_source_packet_acceptance_evidence_slots,
      0,
    ),
    separator_primitive_source_packet_acceptance_evidence_slots_filled: separatorProfiles.reduce(
      (sum, entry) => sum + entry.primitive_source_packet_acceptance_evidence_slots_filled,
      0,
    ),
    separator_combined_route_evidence_slots: separatorProfiles.reduce(
      (sum, entry) => sum + entry.combined_route_evidence_slots,
      0,
    ),
    separator_combined_route_evidence_slots_filled: separatorProfiles.reduce(
      (sum, entry) => sum + entry.combined_route_evidence_slots_filled,
      0,
    ),
    separator_combined_route_evidence_slots_missing: separatorProfiles.reduce(
      (sum, entry) => sum + entry.combined_route_evidence_slots_missing,
      0,
    ),
    row_proof_grade_evidence_slots: rowProfiles.reduce((sum, entry) => sum + entry.proof_grade_evidence_slots, 0),
    row_proof_grade_evidence_slots_filled: rowProfiles.reduce(
      (sum, entry) => sum + entry.proof_grade_evidence_slots_filled,
      0,
    ),
    row_primitive_source_packet_acceptance_evidence_slots: rowProfiles.reduce(
      (sum, entry) => sum + entry.primitive_source_packet_acceptance_evidence_slots,
      0,
    ),
    row_primitive_source_packet_acceptance_evidence_slots_filled: rowProfiles.reduce(
      (sum, entry) => sum + entry.primitive_source_packet_acceptance_evidence_slots_filled,
      0,
    ),
    row_combined_route_evidence_slots: rowProfiles.reduce((sum, entry) => sum + entry.combined_route_evidence_slots, 0),
    row_combined_route_evidence_slots_filled: rowProfiles.reduce(
      (sum, entry) => sum + entry.combined_route_evidence_slots_filled,
      0,
    ),
    row_combined_route_evidence_slots_missing: rowProfiles.reduce(
      (sum, entry) => sum + entry.combined_route_evidence_slots_missing,
      0,
    ),
    separator_current_certificate_pool_route_exhausted_count: countTrue(
      separatorProfiles,
      (entry) => entry.current_certificate_pool_route_exhausted,
    ),
    row_current_certificate_pool_route_exhausted_count: countTrue(
      rowProfiles,
      (entry) => entry.current_certificate_pool_route_exhausted,
    ),
    separator_mechanical_continuation_available_from_current_inputs: 0,
    row_mechanical_continuation_available_from_current_inputs: 0,
    accepted_interval_certified_constants_status_refs_constructed: 0,
    accepted_interval_certified_constants_statuses_constructed: 0,
    source_packet_acceptance_rules_constructed: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_proof_grade_route_blocker:
      "compatible_proof_grade_accepted_interval_certified_constants_status_evidence_absent",
    first_primitive_route_blocker: "compatible_source_packet_acceptance_evidence_absent",
    first_source_packet_acceptance_rule_blocker:
      "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent",
    first_accepted_source_packet_blocker: "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_absent",
    parent_complement_consumption_ref_blocker: "parent_complement_consumption_ref_absent",
    first_separator_certificate_blocker: "higher_fold_separator_layer_certificate_absent",
  };
  const invariant =
    summary.direct_source_hash_checks === 3 &&
    summary.direct_source_hash_checks_passed === 3 &&
    summary.retained_frontier_source_hash_checks_passed === 4 &&
    summary.retained_bridge_locked_source_hash_checks_passed === 9 &&
    summary.retained_source_packet_route_source_hash_checks_passed === 5 &&
    summary.current_certificate_pool_json_files_scanned === 240 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    JSON.stringify(summary.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR) &&
    summary.separators_with_derivation_source_evidence_complete === 12 &&
    summary.rows_with_derivation_source_evidence_complete === 112 &&
    summary.separators_with_separator_aggregate_fields_complete === 12 &&
    summary.rows_with_separator_aggregate_fields_complete === 112 &&
    summary.compatible_proof_grade_current_pool_evidence_files === 0 &&
    summary.compatible_source_packet_acceptance_current_pool_evidence_files === 0 &&
    summary.evidence_pool_route_classes_exhausted === 2 &&
    summary.proof_grade_bridge_routes_ready === 0 &&
    summary.primitive_source_packet_routes_ready === 0 &&
    summary.mechanical_continuations_from_current_pool === 0 &&
    summary.separator_proof_grade_evidence_slots === 72 &&
    summary.separator_proof_grade_evidence_slots_filled === 0 &&
    summary.separator_primitive_source_packet_acceptance_evidence_slots === 24 &&
    summary.separator_primitive_source_packet_acceptance_evidence_slots_filled === 0 &&
    summary.separator_combined_route_evidence_slots === 96 &&
    summary.separator_combined_route_evidence_slots_filled === 0 &&
    summary.separator_combined_route_evidence_slots_missing === 96 &&
    summary.row_proof_grade_evidence_slots === 672 &&
    summary.row_proof_grade_evidence_slots_filled === 0 &&
    summary.row_primitive_source_packet_acceptance_evidence_slots === 224 &&
    summary.row_primitive_source_packet_acceptance_evidence_slots_filled === 0 &&
    summary.row_combined_route_evidence_slots === 896 &&
    summary.row_combined_route_evidence_slots_filled === 0 &&
    summary.row_combined_route_evidence_slots_missing === 896 &&
    summary.separator_current_certificate_pool_route_exhausted_count === 12 &&
    summary.row_current_certificate_pool_route_exhausted_count === 112 &&
    summary.separator_mechanical_continuation_available_from_current_inputs === 0 &&
    summary.row_mechanical_continuation_available_from_current_inputs === 0 &&
    summary.accepted_interval_certified_constants_statuses_constructed === 0 &&
    summary.source_packet_acceptance_rules_constructed === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.row_consumption_count === 0 &&
    summary.preledger_pass_rows === 0 &&
    summary.branch_chart_authorized_rows === 0 &&
    summary.preledger_pass === false &&
    summary.updates_live_ledger === false &&
    summary.branch_chart_authorized === false;
  if (!invariant) {
    throw new Error("Current certificate-pool route exhaustion invariant failed.");
  }
  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-current-certificate-pool-route-exhaustion-closure-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only current-certificate-pool route exhaustion closure classifier; combines the proof-grade accepted-status evidence dependency classifier and primitive source-packet acceptance evidence dependency classifier to prove that neither accepted-status route has compatible local evidence and no mechanical continuation is available from current inputs",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_bridge_prerequisite_frontier_classifier: artifactRecord(paths.frontier),
      accepted_status_proof_grade_evidence_dependency_classifier: artifactRecord(paths.proofGradeEvidence),
      accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier: artifactRecord(
        paths.primitiveSourcePacketEvidence,
      ),
    },
    source_hash_checks: sourceChecks,
    current_certificate_pool_snapshot: currentPoolSnapshot,
    exhaustion_rule:
      "The current certificate pool is exhausted only for the imported evidence pool snapshots: the proof-grade accepted-status route has zero compatible evidence files and zero filled proof-grade evidence slots, and the primitive/source-packet route has zero compatible evidence files and zero filled source-packet acceptance slots. This classifier introduces no proof rule or primitive acceptance rule.",
    separator_current_certificate_pool_route_exhaustion_profiles: separatorProfiles,
    row_current_certificate_pool_route_exhaustion_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The current certificate pool supplies complete source certificates and separator aggregates, but no compatible proof-grade accepted-status evidence and no compatible primitive/source-packet acceptance evidence.",
      continuation_class:
        "requires a new proof-grade accepted-status evidence object or an explicit primitive source-packet acceptance decision; no mechanical continuation exists from current inputs",
      fail_closed_stop_conditions: [
        "Do not treat route exhaustion as an accepted interval-certified constants status.",
        "Do not infer a source-packet acceptance rule or accepted source packet from absence classification.",
        "Do not construct parent_complement_consumption_ref or higher_fold_separator_layer_certificate from this classifier.",
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
      "Captured as a priority-only certificate-side route exhaustion classifier under reference/priorities/proof-programs; no promotion to content/markdown/aaa.",
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
  const separatorRows = packet.separator_current_certificate_pool_route_exhaustion_profiles.map((entry) => [
    `\`${entry.separator_event}\``,
    `\`${entry.fold_interval}\``,
    String(entry.row_count),
    String(entry.proof_grade_evidence_slots_filled),
    String(entry.primitive_source_packet_acceptance_evidence_slots_filled),
    String(entry.combined_route_evidence_slots_missing),
    String(entry.mechanical_continuation_available_from_current_inputs),
  ]);
  const rowsBySeparatorRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Current Certificate-Pool Route Exhaustion Closure Classifier

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Route Exhaustion Sharpened

This classifier combines the two certificate-side evidence dependency
classifiers after the bridge prerequisite frontier:

- proof-grade accepted-status evidence dependency;
- primitive/source-packet acceptance evidence dependency.

It does not scan Markdown prose and does not create proof rules, primitive
acceptance rules, accepted statuses, accepted source packets, row consumption,
live-ledger updates, or branch-chart authorization.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct route-exhaustion source-hash locks;
- ${s.retained_frontier_source_hash_checks_passed} / 4 retained frontier source-hash locks;
- ${s.retained_bridge_locked_source_hash_checks_passed} / 9 retained proof-grade evidence source-hash locks;
- ${s.retained_source_packet_route_source_hash_checks_passed} / 5 retained primitive source-packet source-hash locks;
- ${s.current_certificate_pool_json_files_scanned} current certificate-pool JSON files scanned before this output;
- ${s.separators_with_derivation_source_evidence_complete} / ${s.candidate_separator_constants} separator derivation-source evidence profiles complete;
- ${s.separators_with_separator_aggregate_fields_complete} / ${s.candidate_separator_constants} separator aggregate evidence profiles complete.

Current certificate-pool result:

- ${s.proof_grade_evidence_pool_json_files_scanned} proof-grade evidence-pool JSON files scanned upstream;
- ${s.compatible_proof_grade_current_pool_evidence_files} compatible proof-grade accepted-status evidence files;
- ${s.primitive_source_packet_evidence_pool_json_files_scanned} primitive source-packet evidence-pool JSON files scanned upstream;
- ${s.compatible_source_packet_acceptance_current_pool_evidence_files} compatible primitive source-packet acceptance evidence files;
- ${s.evidence_pool_route_classes_exhausted} evidence-pool route classes exhausted;
- ${s.separator_combined_route_evidence_slots} separator combined route evidence slots;
- ${s.separator_combined_route_evidence_slots_filled} separator combined route evidence slots filled;
- ${s.row_combined_route_evidence_slots} row combined route evidence slots;
- ${s.row_combined_route_evidence_slots_filled} row combined route evidence slots filled;
- ${s.separator_mechanical_continuation_available_from_current_inputs} separator mechanical continuations available from current inputs.

The first proof-grade route blocker is
\`${s.first_proof_grade_route_blocker}\`.

The first primitive route blocker is
\`${s.first_primitive_route_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source-Hash Checks

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

## Separator Route Exhaustion Profiles

| Separator | Fold interval | Rows | Proof slots filled | Primitive slots filled | Missing combined slots | Mechanical now |
| --- | --- | ---: | ---: | ---: | ---: | --- |
${markdownTable(separatorRows)}

## Row Scope

| Separator | Rows |
| --- | ---: |
${markdownTable(rowsBySeparatorRows)}

## Certificate-Side Handoff

Sharpened blocker: the current certificate pool supplies complete source
certificates and separator aggregates, but no compatible proof-grade
accepted-status evidence and no compatible primitive/source-packet acceptance
evidence.

Continuation class: requires a new proof-grade accepted-status evidence object
or an explicit primitive source-packet acceptance decision; no mechanical
continuation exists from current inputs.

Fail-closed stop conditions:

- Do not treat route exhaustion as an accepted interval-certified constants
  status.
- Do not infer a source-packet acceptance rule or accepted source packet from
  absence classification.
- Do not construct \`parent_complement_consumption_ref\` or
  \`higher_fold_separator_layer_certificate\` from this classifier.
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
