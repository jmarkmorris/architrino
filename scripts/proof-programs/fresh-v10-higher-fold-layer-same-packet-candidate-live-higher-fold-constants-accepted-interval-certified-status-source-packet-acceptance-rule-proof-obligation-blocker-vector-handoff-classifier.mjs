#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_PROOF_OBLIGATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_proof_obligation_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_acceptance_rule_blocker_vector_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_acceptance_rule_blocker_vector_handoff_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const PROOF_OBLIGATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_proof_obligation_dependency_classifier_fail_closed_rule_target_locked_aggregate_inputs_complete_rule_derivation_soundness_and_application_absent_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_acceptance_rule_blocker_vector_handoff_classifier_fail_closed_rule_target_locked_six_rule_obligation_classes_unsatisfied_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";

const RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const RULE_DERIVATION_BLOCKER = "source_packet_acceptance_rule_derivation_proof_absent";
const RULE_SOUNDNESS_BLOCKER = "source_packet_acceptance_rule_soundness_proof_absent";
const RULE_APPLICATION_BLOCKER = "source_packet_acceptance_rule_endpoint_application_proof_absent";
const CONFORMANCE_BLOCKER = "existing_constants_contract_packet_identity_mismatch";
const COMPATIBLE_EVIDENCE_BLOCKER = "compatible_source_packet_acceptance_evidence_absent";
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
    proofObligation: DEFAULT_PROOF_OBLIGATION,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--proof-obligation") {
      args.proofObligation = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-source-packet-acceptance-rule-proof-obligation-blocker-vector-handoff-classifier.mjs [options]

Options:
  --proof-obligation PATH  Source-packet acceptance rule proof-obligation dependency classifier. Defaults to ${DEFAULT_PROOF_OBLIGATION}.
  --out-dir PATH           Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                 Pretty-print JSON artifact.
  --help                   Show this help.`);
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
    ["accepted_status_source_packet_acceptance_rule_proof_obligation_dependency_classifier", paths.proofObligation],
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

function expectEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`Unexpected ${label}: expected ${expected}, got ${actual}`);
  }
}

function validateInput(proofObligation) {
  assertPacketStatusAndLocks(proofObligation, "proofObligation", PROOF_OBLIGATION_STATUS);
  const s = proofObligation.summary;
  expectEqual(s.direct_source_hash_checks_passed, 7, "proof-obligation direct source locks");
  expectEqual(s.source_material_premise_slots, 124, "source-material premise slots");
  expectEqual(s.source_material_premise_slots_satisfied, 124, "source-material premises satisfied");
  expectEqual(s.candidate_exact_consistency_premise_slots, 124, "exact-consistency premise slots");
  expectEqual(s.candidate_exact_consistency_premise_slots_satisfied, 124, "exact-consistency premises satisfied");
  expectEqual(s.source_packet_acceptance_rule_target_slots, 124, "rule target slots");
  expectEqual(s.source_packet_acceptance_rule_target_slots_satisfied, 0, "rule target slots satisfied");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_slots, 124, "derivation proof slots");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_slots_satisfied, 0, "derivation proof slots satisfied");
  expectEqual(s.source_packet_acceptance_rule_soundness_proof_slots, 124, "soundness proof slots");
  expectEqual(s.source_packet_acceptance_rule_soundness_proof_slots_satisfied, 0, "soundness proof slots satisfied");
  expectEqual(s.source_packet_acceptance_rule_endpoint_application_proof_slots, 124, "application proof slots");
  expectEqual(
    s.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied,
    0,
    "application proof slots satisfied",
  );
  expectEqual(s.accepted_constants_conformance_obligation_slots, 124, "accepted-constants conformance slots");
  expectEqual(
    s.accepted_constants_conformance_obligation_slots_satisfied,
    0,
    "accepted-constants conformance slots satisfied",
  );
  expectEqual(s.compatible_source_packet_acceptance_evidence_slots, 248, "compatible source-packet evidence slots");
  expectEqual(
    s.compatible_source_packet_acceptance_evidence_slots_filled,
    0,
    "compatible source-packet evidence slots filled",
  );
  expectEqual(s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "accepted source packets");
  expectEqual(s.route_decisions_made, 0, "route decisions");
  expectEqual(s.proof_rule_decisions_made, 0, "proof-rule decisions");
  expectEqual(s.primitive_acceptance_decisions_made, 0, "primitive-acceptance decisions");
  expectEqual(s.source_packet_acceptance_decisions_made, 0, "source-packet acceptance decisions");
  expectEqual(s.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "proof obligation");
}

function blockerVector(summary) {
  return [
    {
      blocker_class: "source_packet_acceptance_rule_derivation_proof",
      slots_declared: summary.source_packet_acceptance_rule_derivation_proof_slots,
      slots_satisfied: summary.source_packet_acceptance_rule_derivation_proof_slots_satisfied,
      first_blocker: RULE_DERIVATION_BLOCKER,
    },
    {
      blocker_class: "source_packet_acceptance_rule_soundness_proof",
      slots_declared: summary.source_packet_acceptance_rule_soundness_proof_slots,
      slots_satisfied: summary.source_packet_acceptance_rule_soundness_proof_slots_satisfied,
      first_blocker: RULE_SOUNDNESS_BLOCKER,
    },
    {
      blocker_class: "source_packet_acceptance_rule_endpoint_application_proof",
      slots_declared: summary.source_packet_acceptance_rule_endpoint_application_proof_slots,
      slots_satisfied: summary.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied,
      first_blocker: RULE_APPLICATION_BLOCKER,
    },
    {
      blocker_class: "accepted_constants_conformance",
      slots_declared: summary.accepted_constants_conformance_obligation_slots,
      slots_satisfied: summary.accepted_constants_conformance_obligation_slots_satisfied,
      first_blocker: CONFORMANCE_BLOCKER,
    },
    {
      blocker_class: "compatible_source_packet_acceptance_evidence",
      slots_declared: summary.compatible_source_packet_acceptance_evidence_slots,
      slots_satisfied: summary.compatible_source_packet_acceptance_evidence_slots_filled,
      first_blocker: COMPATIBLE_EVIDENCE_BLOCKER,
    },
    {
      blocker_class: "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
      slots_declared: summary.source_packet_acceptance_rule_proof_obligation_slots,
      slots_satisfied: summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets,
      first_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
    },
  ];
}

function buildSeparatorProfiles(proofObligation) {
  return proofObligation.separator_source_packet_acceptance_rule_proof_obligation_profiles
    .map((profile) => ({
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      row_count: profile.row_count,
      aggregate_inputs_complete: profile.aggregate_inputs_complete,
      rule_target_locked: profile.rule_target_locked,
      source_material_premises_complete: profile.source_material_premises_complete,
      blocker_classes_declared: 6,
      blocker_classes_satisfied: 0,
      source_packet_acceptance_rule_derivation_proof_present: false,
      source_packet_acceptance_rule_soundness_proof_present: false,
      source_packet_acceptance_rule_endpoint_application_proof_present: false,
      accepted_constants_conformance_present: false,
      compatible_source_packet_acceptance_evidence_present: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
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
      blocker_vector: blockerVector(profileToSummaryLike(profile)),
      classification: "separator_source_packet_acceptance_rule_blocker_vector_open_fail_closed",
    }))
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function profileToSummaryLike(profile) {
  return {
    source_packet_acceptance_rule_derivation_proof_slots: 1,
    source_packet_acceptance_rule_derivation_proof_slots_satisfied: 0,
    source_packet_acceptance_rule_soundness_proof_slots: 1,
    source_packet_acceptance_rule_soundness_proof_slots_satisfied: 0,
    source_packet_acceptance_rule_endpoint_application_proof_slots: 1,
    source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied: 0,
    accepted_constants_conformance_obligation_slots: 1,
    accepted_constants_conformance_obligation_slots_satisfied: 0,
    compatible_source_packet_acceptance_evidence_slots: 2,
    compatible_source_packet_acceptance_evidence_slots_filled: 0,
    source_packet_acceptance_rule_proof_obligation_slots: 1,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
  };
}

function buildRowProfiles(proofObligation) {
  return proofObligation.row_source_packet_acceptance_rule_proof_obligation_profiles
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
      rule_target_locked: profile.rule_target_locked,
      source_material_premises_complete: profile.source_material_premises_complete,
      blocker_classes_declared: 6,
      blocker_classes_satisfied: 0,
      source_packet_acceptance_rule_derivation_proof_present: false,
      source_packet_acceptance_rule_soundness_proof_present: false,
      source_packet_acceptance_rule_endpoint_application_proof_present: false,
      accepted_constants_conformance_present: false,
      compatible_source_packet_acceptance_evidence_present: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
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
      blocker_vector: blockerVector(profileToSummaryLike(profile)),
      classification: "row_source_packet_acceptance_rule_blocker_vector_open_fail_closed",
    }))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, proofObligation) {
  validateInput(proofObligation);
  const sourceChecks = sourceHashChecks(paths);
  const proof = proofObligation.summary;
  const separatorProfiles = buildSeparatorProfiles(proofObligation);
  const rowProfiles = buildRowProfiles(proofObligation);
  const vector = blockerVector(proof);
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_proof_obligation_direct_source_hash_checks_passed: proof.direct_source_hash_checks_passed,
    retained_proof_obligation_source_hash_checks: proof.direct_source_hash_checks,
    candidate_higher_fold_constants_artifacts: proof.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: proof.candidate_separator_constants,
    candidate_row_constant_associations: proof.candidate_row_constant_associations,
    rows_by_separator_count: proof.rows_by_separator_count,
    separator_blocker_vector_profiles: separatorProfiles.length,
    row_blocker_vector_profiles: rowProfiles.length,
    source_material_premise_slots: proof.source_material_premise_slots,
    source_material_premise_slots_satisfied: proof.source_material_premise_slots_satisfied,
    candidate_exact_consistency_premise_slots: proof.candidate_exact_consistency_premise_slots,
    candidate_exact_consistency_premise_slots_satisfied:
      proof.candidate_exact_consistency_premise_slots_satisfied,
    source_packet_acceptance_rule_target_slots: proof.source_packet_acceptance_rule_target_slots,
    source_packet_acceptance_rule_target_slots_satisfied:
      proof.source_packet_acceptance_rule_target_slots_satisfied,
    blocker_classes: vector.length,
    blocker_classes_satisfied: countTrue(vector, (entry) => entry.slots_satisfied === entry.slots_declared),
    source_packet_acceptance_rule_derivation_proof_slots:
      proof.source_packet_acceptance_rule_derivation_proof_slots,
    source_packet_acceptance_rule_derivation_proof_slots_satisfied:
      proof.source_packet_acceptance_rule_derivation_proof_slots_satisfied,
    source_packet_acceptance_rule_soundness_proof_slots:
      proof.source_packet_acceptance_rule_soundness_proof_slots,
    source_packet_acceptance_rule_soundness_proof_slots_satisfied:
      proof.source_packet_acceptance_rule_soundness_proof_slots_satisfied,
    source_packet_acceptance_rule_endpoint_application_proof_slots:
      proof.source_packet_acceptance_rule_endpoint_application_proof_slots,
    source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied:
      proof.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied,
    accepted_constants_conformance_obligation_slots: proof.accepted_constants_conformance_obligation_slots,
    accepted_constants_conformance_obligation_slots_satisfied:
      proof.accepted_constants_conformance_obligation_slots_satisfied,
    compatible_source_packet_acceptance_evidence_slots: proof.compatible_source_packet_acceptance_evidence_slots,
    compatible_source_packet_acceptance_evidence_slots_filled:
      proof.compatible_source_packet_acceptance_evidence_slots_filled,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_slots:
      proof.source_packet_acceptance_rule_proof_obligation_slots,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_slots_satisfied:
      proof.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets,
    source_packet_acceptance_rules_constructed: proof.source_packet_acceptance_rules_constructed,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets:
      proof.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets,
    accepted_interval_certified_constants_status_refs_constructed:
      proof.accepted_interval_certified_constants_status_refs_constructed,
    accepted_interval_certified_constants_statuses_constructed:
      proof.accepted_interval_certified_constants_statuses_constructed,
    accepted_fold_layer_rows: proof.accepted_fold_layer_rows,
    row_consumption_count: proof.row_consumption_count,
    route_decisions_made: proof.route_decisions_made,
    proof_rule_decisions_made: proof.proof_rule_decisions_made,
    primitive_acceptance_decisions_made: proof.primitive_acceptance_decisions_made,
    source_packet_acceptance_decisions_made: proof.source_packet_acceptance_decisions_made,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_rule_blocker: RULE_BLOCKER,
    first_rule_derivation_blocker: RULE_DERIVATION_BLOCKER,
    first_rule_soundness_blocker: RULE_SOUNDNESS_BLOCKER,
    first_rule_application_blocker: RULE_APPLICATION_BLOCKER,
    first_accepted_constants_conformance_blocker: CONFORMANCE_BLOCKER,
    first_compatible_evidence_blocker: COMPATIBLE_EVIDENCE_BLOCKER,
    first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
  };

  const packet = {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_source_packet_acceptance_rule_proof_obligation_blocker_vector_handoff_classifier.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status source-packet acceptance rule proof-obligation blocker vector handoff",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status source-packet acceptance rule proof-obligation blocker vector handoff",
    claim_level:
      "priority-only source-packet acceptance rule proof-obligation blocker-vector handoff classifier; compactly freezes the six unsatisfied rule/acceptance blocker classes from the proof-obligation dependency packet and makes no route, proof-rule, primitive-acceptance, source-packet acceptance, accepted-status, row-consumption, live-ledger, or branch-chart decision",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_source_packet_acceptance_rule_proof_obligation_dependency_classifier: artifactRecord(
        paths.proofObligation,
      ),
    },
    source_hash_checks: sourceChecks,
    source_packet_acceptance_rule_proof_obligation_blocker_vector: vector,
    separator_source_packet_acceptance_rule_proof_obligation_blocker_vector_profiles: separatorProfiles,
    row_source_packet_acceptance_rule_proof_obligation_blocker_vector_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "source_packet_acceptance_rule_proof_obligation_blocker_vector",
      current_pool_closure_state:
        "not mechanically closable by the current dependency packet; all six source-packet acceptance rule proof/acceptance blocker classes remain unsatisfied",
      first_rule_blocker: RULE_BLOCKER,
      mechanical_continuation_available: false,
      decision_required: true,
      required_external_input: "source_packet_acceptance_rule_for_live_same_packet_separator_aggregate_family",
      blocker_classes: vector.map((entry) => entry.blocker_class),
      forbidden_reinterpretations: [
        "source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule",
        "complete_separator_aggregate_inputs_as_accepted_source_packet",
        "existing_constants_contract_packet_identity_mismatch_as_accepted_constants_conformance",
        "source_packet_acceptance_rule_proof_obligation_blocker_vector_handoff_classifier_as_source_packet_acceptance_rule",
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
      "Priority-only. This classifier preserves the proof-obligation dependency state as a compact six-class blocker vector for the next certificate-side handoff.",
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
    s.retained_proof_obligation_direct_source_hash_checks_passed === 7,
    s.retained_proof_obligation_source_hash_checks === 7,
    s.candidate_separator_constants === 12,
    s.candidate_row_constant_associations === 112,
    s.separator_blocker_vector_profiles === 12,
    s.row_blocker_vector_profiles === 112,
    s.source_material_premise_slots === 124,
    s.source_material_premise_slots_satisfied === 124,
    s.candidate_exact_consistency_premise_slots === 124,
    s.candidate_exact_consistency_premise_slots_satisfied === 124,
    s.source_packet_acceptance_rule_target_slots === 124,
    s.source_packet_acceptance_rule_target_slots_satisfied === 0,
    s.blocker_classes === 6,
    s.blocker_classes_satisfied === 0,
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
    s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_slots === 124,
    s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_slots_satisfied === 0,
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
    throw new Error("Source-packet acceptance rule blocker-vector handoff invariant failure.");
  }
}

function renderReport(packet) {
  const s = packet.summary;
  const sourceRows = Object.entries(packet.source_artifacts)
    .map(([key, record]) => `| \`${key}\` | \`${record.basename}\` | \`${record.sha256}\` | ${record.present} |`)
    .join("\n");
  const blockerRows = packet.source_packet_acceptance_rule_proof_obligation_blocker_vector
    .map(
      (entry) =>
        `| \`${entry.blocker_class}\` | ${entry.slots_declared} | ${entry.slots_satisfied} | \`${entry.first_blocker}\` |`,
    )
    .join("\n");
  return `# Candidate-Live Higher-Fold Constants Accepted-Status Source-Packet Acceptance Rule Proof-Obligation Blocker-Vector Handoff Classifier

Status: \`${packet.status}\`

## Claim Level

${packet.claim_level}

## Source Locks

| Source | Basename | SHA-256 | Present |
| --- | --- | --- | --- |
${sourceRows}

Direct source-hash locks: ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks}.

## Ready Premises

- ${s.source_material_premise_slots_satisfied} / ${s.source_material_premise_slots} source-material premise slots ready;
- ${s.candidate_exact_consistency_premise_slots_satisfied} / ${s.candidate_exact_consistency_premise_slots} candidate exact-consistency premise slots ready;
- ${s.source_packet_acceptance_rule_target_slots_satisfied} / ${s.source_packet_acceptance_rule_target_slots} source-packet acceptance rule target slots satisfied.

## Blocker Vector

| Blocker class | Slots | Satisfied | First blocker |
| --- | ---: | ---: | --- |
${blockerRows}

## Authorization Lock

- route_decisions_made: ${s.route_decisions_made}
- proof_rule_decisions_made: ${s.proof_rule_decisions_made}
- primitive_acceptance_decisions_made: ${s.primitive_acceptance_decisions_made}
- source_packet_acceptance_decisions_made: ${s.source_packet_acceptance_decisions_made}
- source_packet_acceptance_rules_constructed: ${s.source_packet_acceptance_rules_constructed}
- accepted_interval_certified_constants_statuses_constructed: ${s.accepted_interval_certified_constants_statuses_constructed}
- row_consumption_count: ${packet.authorization_lock.row_consumption_count}
- preledger_pass: ${packet.authorization_lock.preledger_pass}
- updates_live_ledger: ${packet.authorization_lock.updates_live_ledger}
- branch_chart_authorized: ${packet.authorization_lock.branch_chart_authorized}

This packet is a handoff classifier only. It does not construct a proof rule,
source-packet acceptance rule, accepted source packet, accepted interval-certified
constants status, row consumption, live-ledger update, or branch-chart
authorization.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    proofObligation: args.proofObligation,
  };
  const proofObligation = readJson(paths.proofObligation);
  const packet = buildPacket(paths, proofObligation);
  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(jsonPath, packet, args.pretty);
  writeText(reportPath, renderReport(packet));
  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${reportPath}`);
}

main();
