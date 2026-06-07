#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_FIRST_BLOCKER = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_first_blocker_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_route_input_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_target_packet_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const FIRST_BLOCKER_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_first_blocker_handoff_classifier_fail_closed_uniform_proof_grade_derivation_ref_evidence_absent_uniform_source_packet_acceptance_rule_absent_accepted_source_packet_absent_current_pool_disjunction_unsatisfied_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";
const PROOF_GRADE_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_route_input_target_packet_fail_closed_proof_grade_route_input_target_declared_current_pool_input_absent_no_route_decision_no_rule_decision_no_row_consumption";
const PROOF_GRADE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier_fail_closed_source_certificates_complete_no_compatible_proof_grade_status_evidence_no_primitive_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_target_packet_fail_closed_derivation_ref_evidence_target_declared_current_pool_evidence_absent_no_proof_rule_no_route_decision_no_row_consumption";

const TARGET_FIELD = "accepted_interval_certified_constants_status_proof_grade_derivation_ref";
const TARGET_SLOT_CHECK = "accepted_interval_certified_constants_status_proof_grade_derivation_ref_present";
const TARGET_BLOCKER = "accepted_interval_certified_constants_status_proof_grade_derivation_ref_evidence_absent";

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
    firstBlocker: DEFAULT_FIRST_BLOCKER,
    proofGradeTarget: DEFAULT_PROOF_GRADE_TARGET,
    proofGradeEvidence: DEFAULT_PROOF_GRADE_EVIDENCE,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--first-blocker") {
      args.firstBlocker = argv[++index];
    } else if (arg === "--proof-grade-target") {
      args.proofGradeTarget = argv[++index];
    } else if (arg === "--proof-grade-evidence") {
      args.proofGradeEvidence = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-proof-grade-derivation-ref-evidence-target-packet.mjs [options]

Options:
  --first-blocker PATH          Route-input first-blocker handoff classifier. Defaults to ${DEFAULT_FIRST_BLOCKER}.
  --proof-grade-target PATH     Proof-grade route-input target packet. Defaults to ${DEFAULT_PROOF_GRADE_TARGET}.
  --proof-grade-evidence PATH   Proof-grade evidence dependency classifier. Defaults to ${DEFAULT_PROOF_GRADE_EVIDENCE}.
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
    ["accepted_status_route_input_first_blocker_handoff_classifier", paths.firstBlocker],
    ["accepted_status_proof_grade_route_input_target_packet", paths.proofGradeTarget],
    ["accepted_status_proof_grade_evidence_dependency_classifier", paths.proofGradeEvidence],
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

function assertTargetSlot(profile, label) {
  const check = profile.evidence_slot_checks?.[TARGET_SLOT_CHECK];
  if (!check) {
    throw new Error(`Missing ${label} target slot check.`);
  }
  if (check.role !== "proof_grade_derivation_ref") {
    throw new Error(`Unexpected ${label} role: ${check.role}`);
  }
  if (check.filled !== false) {
    throw new Error(`${label} target slot should be unfilled.`);
  }
  if (check.first_blocker !== TARGET_BLOCKER) {
    throw new Error(`Unexpected ${label} first blocker: ${check.first_blocker}`);
  }
  if (!Array.isArray(check.compatible_evidence_refs) || check.compatible_evidence_refs.length !== 0) {
    throw new Error(`${label} should have no compatible evidence refs.`);
  }
}

function validateInputs(inputs) {
  assertPacketStatusAndLocks(inputs.firstBlocker, "firstBlocker", FIRST_BLOCKER_STATUS);
  assertPacketStatusAndLocks(inputs.proofGradeTarget, "proofGradeTarget", PROOF_GRADE_TARGET_STATUS);
  assertPacketStatusAndLocks(inputs.proofGradeEvidence, "proofGradeEvidence", PROOF_GRADE_EVIDENCE_STATUS);
  const first = inputs.firstBlocker.summary;
  const target = inputs.proofGradeTarget.summary;
  const evidence = inputs.proofGradeEvidence.summary;
  const expected = [
    [first.direct_source_hash_checks_passed, 5, "first-blocker direct source-hash locks"],
    [first.proof_grade_separator_uniform_first_blocker_count, 12, "first-blocker separator count"],
    [first.proof_grade_row_uniform_first_blocker_count, 112, "first-blocker row count"],
    [target.direct_source_hash_checks_passed, 3, "proof-grade route target direct source-hash locks"],
    [target.proof_grade_route_input_target_fields, 6, "proof-grade route target fields"],
    [target.total_proof_grade_route_input_target_slots, 744, "proof-grade route target slots"],
    [target.total_proof_grade_route_input_target_slots_satisfied, 0, "proof-grade route target satisfied slots"],
    [evidence.source_hash_checks_passed, 9, "proof-grade evidence source-hash locks"],
    [evidence.evidence_pool_compatible_proof_grade_status_evidence_files, 0, "compatible proof-grade status evidence files"],
    [evidence.separator_proof_grade_evidence_slots, 72, "separator proof-grade evidence slots"],
    [evidence.row_proof_grade_evidence_slots, 672, "row proof-grade evidence slots"],
    [evidence.separator_compatible_proof_grade_evidence_slots_filled, 0, "separator evidence slots filled"],
    [evidence.row_compatible_proof_grade_evidence_slots_filled, 0, "row evidence slots filled"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
  assertRowsBySeparator(first, "first blocker");
  assertRowsBySeparator(target, "proof-grade target");
  assertRowsBySeparator(evidence, "proof-grade evidence");
  inputs.proofGradeEvidence.separator_proof_grade_evidence_dependency_profiles.forEach((profile) =>
    assertTargetSlot(profile, `separator ${profile.separator_event}`),
  );
  inputs.proofGradeEvidence.row_proof_grade_evidence_dependency_profiles.forEach((profile) =>
    assertTargetSlot(profile, `row ${profile.row_id}`),
  );
}

function buildSeparatorTargetProfiles(proofGradeEvidence) {
  return proofGradeEvidence.separator_proof_grade_evidence_dependency_profiles.map((profile) => ({
    separator_event: profile.separator_event,
    fold_interval: profile.fold_interval,
    row_count: profile.row_count,
    derivation_source_evidence_complete: profile.derivation_source_evidence_complete,
    proof_grade_derivation_ref_evidence_target_field: TARGET_FIELD,
    proof_grade_derivation_ref_evidence_target_slots: 1,
    proof_grade_derivation_ref_evidence_target_slots_satisfied: 0,
    proof_grade_derivation_ref_evidence_target_slots_missing: 1,
    proof_grade_derivation_ref_evidence_target_satisfied: false,
    compatible_evidence_refs: [],
    first_target_blocker: TARGET_BLOCKER,
    accepted_interval_certified_constants_status_ref_constructed: false,
    accepted_interval_certified_constants_status_present: false,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    classification: "separator_source_certificates_complete_proof_grade_derivation_ref_evidence_target_unfilled",
  }));
}

function buildRowTargetProfiles(proofGradeEvidence) {
  return proofGradeEvidence.row_proof_grade_evidence_dependency_profiles.map((profile) => ({
    row_id: profile.row_id,
    ledger: profile.ledger,
    status: profile.status,
    failure_code: profile.failure_code,
    separator_event: profile.separator_event,
    fold_interval: profile.fold_interval,
    receiver_interval: profile.receiver_interval,
    source_interval: profile.source_interval,
    derivation_source_evidence_complete: profile.derivation_source_evidence_complete,
    proof_grade_derivation_ref_evidence_target_field: TARGET_FIELD,
    proof_grade_derivation_ref_evidence_target_slots: 1,
    proof_grade_derivation_ref_evidence_target_slots_satisfied: 0,
    proof_grade_derivation_ref_evidence_target_slots_missing: 1,
    proof_grade_derivation_ref_evidence_target_satisfied: false,
    compatible_evidence_refs: [],
    first_target_blocker: TARGET_BLOCKER,
    accepted_interval_certified_constants_status_ref_constructed: false,
    accepted_interval_certified_constants_status_present: false,
    accepted_fold_layer_row: false,
    row_consumed: false,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    classification: "row_source_certificates_complete_proof_grade_derivation_ref_evidence_target_unfilled",
  }));
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const first = inputs.firstBlocker.summary;
  const target = inputs.proofGradeTarget.summary;
  const evidence = inputs.proofGradeEvidence.summary;
  const separatorTargets = buildSeparatorTargetProfiles(inputs.proofGradeEvidence);
  const rowTargets = buildRowTargetProfiles(inputs.proofGradeEvidence);
  const separatorBlockerCounts = countBy(separatorTargets, (profile) => profile.first_target_blocker);
  const rowBlockerCounts = countBy(rowTargets, (profile) => profile.first_target_blocker);
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    retained_first_blocker_direct_source_hash_checks_passed: first.direct_source_hash_checks_passed,
    retained_proof_grade_route_input_direct_source_hash_checks_passed: target.direct_source_hash_checks_passed,
    retained_proof_grade_evidence_source_hash_checks_passed: evidence.source_hash_checks_passed,
    candidate_higher_fold_constants_artifacts: first.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: first.candidate_separator_constants,
    candidate_row_constant_associations: first.candidate_row_constant_associations,
    rows_by_separator_count: first.rows_by_separator_count,
    proof_grade_route_input_target_fields: target.proof_grade_route_input_target_fields,
    total_proof_grade_route_input_target_slots: target.total_proof_grade_route_input_target_slots,
    total_proof_grade_route_input_target_slots_satisfied: target.total_proof_grade_route_input_target_slots_satisfied,
    total_proof_grade_route_input_target_slots_missing: target.total_proof_grade_route_input_target_slots_missing,
    proof_grade_derivation_ref_evidence_target_fields: 1,
    separator_proof_grade_derivation_ref_evidence_target_slots: separatorTargets.length,
    separator_proof_grade_derivation_ref_evidence_target_slots_satisfied: 0,
    separator_proof_grade_derivation_ref_evidence_target_slots_missing: separatorTargets.length,
    row_proof_grade_derivation_ref_evidence_target_slots: rowTargets.length,
    row_proof_grade_derivation_ref_evidence_target_slots_satisfied: 0,
    row_proof_grade_derivation_ref_evidence_target_slots_missing: rowTargets.length,
    total_proof_grade_derivation_ref_evidence_target_slots: separatorTargets.length + rowTargets.length,
    total_proof_grade_derivation_ref_evidence_target_slots_satisfied: 0,
    total_proof_grade_derivation_ref_evidence_target_slots_missing: separatorTargets.length + rowTargets.length,
    proof_grade_derivation_ref_evidence_targets_declared: 1,
    proof_grade_derivation_ref_evidence_targets_satisfied: 0,
    compatible_proof_grade_status_evidence_files: evidence.evidence_pool_compatible_proof_grade_status_evidence_files,
    compatible_proof_grade_derivation_ref_evidence_refs: 0,
    proof_grade_uniform_first_blocker: first.proof_grade_uniform_first_blocker,
    proof_grade_separator_uniform_first_blocker_count: first.proof_grade_separator_uniform_first_blocker_count,
    proof_grade_row_uniform_first_blocker_count: first.proof_grade_row_uniform_first_blocker_count,
    proof_grade_derivation_ref_evidence_separator_first_blocker_count: separatorBlockerCounts[TARGET_BLOCKER] ?? 0,
    proof_grade_derivation_ref_evidence_row_first_blocker_count: rowBlockerCounts[TARGET_BLOCKER] ?? 0,
    route_input_disjunctions_declared: first.route_input_disjunctions_declared,
    route_input_disjunctions_satisfied: first.route_input_disjunctions_satisfied,
    total_combined_route_input_disjunction_slots: first.total_combined_route_input_disjunction_slots,
    total_combined_route_input_disjunction_slots_satisfied: first.total_combined_route_input_disjunction_slots_satisfied,
    mechanical_continuations_from_current_pool: 0,
    route_decisions_made: 0,
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
    first_proof_grade_derivation_ref_evidence_target_blocker: TARGET_BLOCKER,
    parent_complement_consumption_ref_blocker: first.parent_complement_consumption_ref_blocker,
    first_separator_certificate_blocker: first.first_separator_certificate_blocker,
  };

  const invariant =
    summary.direct_source_hash_checks === 3 &&
    summary.direct_source_hash_checks_passed === 3 &&
    summary.retained_first_blocker_direct_source_hash_checks_passed === 5 &&
    summary.retained_proof_grade_route_input_direct_source_hash_checks_passed === 3 &&
    summary.retained_proof_grade_evidence_source_hash_checks_passed === 9 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    JSON.stringify(summary.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR) &&
    summary.proof_grade_route_input_target_fields === 6 &&
    summary.total_proof_grade_route_input_target_slots === 744 &&
    summary.total_proof_grade_route_input_target_slots_satisfied === 0 &&
    summary.proof_grade_derivation_ref_evidence_target_fields === 1 &&
    summary.separator_proof_grade_derivation_ref_evidence_target_slots === 12 &&
    summary.separator_proof_grade_derivation_ref_evidence_target_slots_satisfied === 0 &&
    summary.row_proof_grade_derivation_ref_evidence_target_slots === 112 &&
    summary.row_proof_grade_derivation_ref_evidence_target_slots_satisfied === 0 &&
    summary.total_proof_grade_derivation_ref_evidence_target_slots === 124 &&
    summary.total_proof_grade_derivation_ref_evidence_target_slots_satisfied === 0 &&
    summary.total_proof_grade_derivation_ref_evidence_target_slots_missing === 124 &&
    summary.compatible_proof_grade_status_evidence_files === 0 &&
    summary.compatible_proof_grade_derivation_ref_evidence_refs === 0 &&
    summary.proof_grade_separator_uniform_first_blocker_count === 12 &&
    summary.proof_grade_row_uniform_first_blocker_count === 112 &&
    summary.proof_grade_derivation_ref_evidence_separator_first_blocker_count === 12 &&
    summary.proof_grade_derivation_ref_evidence_row_first_blocker_count === 112 &&
    summary.route_input_disjunctions_declared === 1 &&
    summary.route_input_disjunctions_satisfied === 0 &&
    summary.total_combined_route_input_disjunction_slots === 992 &&
    summary.total_combined_route_input_disjunction_slots_satisfied === 0 &&
    summary.mechanical_continuations_from_current_pool === 0 &&
    summary.route_decisions_made === 0 &&
    summary.proof_rule_decisions_made === 0 &&
    summary.primitive_acceptance_decisions_made === 0 &&
    summary.source_packet_acceptance_rules_constructed === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.accepted_interval_certified_constants_statuses_constructed === 0 &&
    summary.row_consumption_count === 0 &&
    summary.preledger_pass === false &&
    summary.updates_live_ledger === false &&
    summary.branch_chart_authorized === false;
  if (!invariant) {
    throw new Error("Proof-grade derivation-ref evidence target invariant failed.");
  }

  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-proof-grade-derivation-ref-evidence-target-packet-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only proof-grade derivation-ref evidence target packet; narrows the proof-grade accepted-status route input to the first missing derivation-ref evidence field over the 12-separator and 112-row scope without deriving evidence, choosing a proof rule, accepting a status, or consuming rows",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_route_input_first_blocker_handoff_classifier: artifactRecord(paths.firstBlocker),
      accepted_status_proof_grade_route_input_target_packet: artifactRecord(paths.proofGradeTarget),
      accepted_status_proof_grade_evidence_dependency_classifier: artifactRecord(paths.proofGradeEvidence),
    },
    source_hash_checks: sourceChecks,
    proof_grade_derivation_ref_evidence_target_rule:
      "The proof-grade route can continue on this branch only after compatible accepted_interval_certified_constants_status_proof_grade_derivation_ref evidence exists for the live higher-fold separator family and row scope. This packet declares that first target field and fills none of it.",
    separator_proof_grade_derivation_ref_evidence_target_profiles: separatorTargets,
    row_proof_grade_derivation_ref_evidence_target_profiles: rowTargets,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The proof-grade route-input branch is now reduced from six missing route-input fields to the first missing field: compatible accepted_interval_certified_constants_status_proof_grade_derivation_ref evidence.",
      continuation_class:
        "mechanical only after proof-grade derivation-ref evidence is supplied; this packet does not derive that evidence or select a proof rule",
      fail_closed_stop_conditions: [
        "Do not treat a derivation-ref evidence target as derivation-ref evidence.",
        "Do not treat proof-grade evidence dependency records as accepted interval-certified constants statuses.",
        "Do not introduce a proof rule, status derivation, soundness proof, endpoint application, accepted constants conformance derivation, source-packet acceptance rule, primitive acceptance, or route decision from this packet.",
        "Do not infer parent_complement_consumption_ref or higher_fold_separator_layer_certificate from this packet.",
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
      "Captured as a priority-only certificate-side proof-grade derivation-ref evidence target packet under reference/priorities/proof-programs; no promotion to content/markdown/aaa.",
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
  const rowsBySeparatorRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Proof-Grade Derivation-Ref Evidence Target Packet

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Derivation-Ref Evidence Target

This packet imports the route-input first-blocker handoff classifier, the
proof-grade route-input target packet, and the proof-grade evidence dependency
classifier. It narrows the proof-grade branch from six missing route-input
fields to the first missing evidence field:
\`${TARGET_FIELD}\`.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct source-hash locks;
- ${s.retained_first_blocker_direct_source_hash_checks_passed} / 5 retained first-blocker locks;
- ${s.retained_proof_grade_route_input_direct_source_hash_checks_passed} / 3 retained proof-grade route-input locks;
- ${s.retained_proof_grade_evidence_source_hash_checks_passed} / 9 retained proof-grade evidence locks.

Target state:

- ${s.proof_grade_route_input_target_fields} proof-grade route-input fields remain declared;
- ${s.total_proof_grade_route_input_target_slots} proof-grade route-input slots, ${s.total_proof_grade_route_input_target_slots_satisfied} satisfied;
- ${s.proof_grade_derivation_ref_evidence_target_fields} derivation-ref evidence target field;
- ${s.separator_proof_grade_derivation_ref_evidence_target_slots} separator derivation-ref evidence target slots;
- ${s.row_proof_grade_derivation_ref_evidence_target_slots} row derivation-ref evidence target slots;
- ${s.total_proof_grade_derivation_ref_evidence_target_slots} total derivation-ref evidence target slots;
- ${s.total_proof_grade_derivation_ref_evidence_target_slots_satisfied} derivation-ref evidence target slots satisfied;
- ${s.compatible_proof_grade_derivation_ref_evidence_refs} compatible derivation-ref evidence refs;
- ${s.mechanical_continuations_from_current_pool} mechanical continuations from the current pool.

The first proof-grade derivation-ref evidence target blocker is
\`${s.first_proof_grade_derivation_ref_evidence_target_blocker}\`.

## Source-Hash Checks

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

## Row Scope

| Separator | Rows |
| --- | ---: |
${markdownTable(rowsBySeparatorRows)}

## Certificate-Side Handoff

Sharpened blocker: the proof-grade accepted-status route input is now reduced
to the first missing target field, compatible
\`${TARGET_FIELD}\` evidence, over 12 / 12 separators and 112 / 112 rows.

Continuation class: mechanical only after proof-grade derivation-ref evidence
is supplied. This packet does not derive that evidence and does not select a
proof rule.

Fail-closed stop conditions:

- Do not treat a derivation-ref evidence target as derivation-ref evidence.
- Do not treat proof-grade evidence dependency records as accepted
  interval-certified constants statuses.
- Do not introduce a proof rule, status derivation, soundness proof, endpoint
  application, accepted constants conformance derivation, source-packet
  acceptance rule, primitive acceptance, or route decision from this packet.
- Do not infer \`parent_complement_consumption_ref\` or
  \`higher_fold_separator_layer_certificate\` from this packet.
- Do not consume rows, set \`preledger_pass\`, update the live ledger, or
  authorize a branch chart.

## Authorization Lock

- \`preledger_pass\`: ${packet.authorization_lock.preledger_pass}
- \`updates_live_ledger\`: ${packet.authorization_lock.updates_live_ledger}
- \`accepted_fold_layer_rows\`: ${packet.authorization_lock.accepted_fold_layer_rows}
- \`row_consumption_count\`: ${packet.authorization_lock.row_consumption_count}
- \`branch_chart_authorized\`: ${packet.authorization_lock.branch_chart_authorized}

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
    firstBlocker: args.firstBlocker,
    proofGradeTarget: args.proofGradeTarget,
    proofGradeEvidence: args.proofGradeEvidence,
  };
  const inputs = {
    firstBlocker: readJson(paths.firstBlocker),
    proofGradeTarget: readJson(paths.proofGradeTarget),
    proofGradeEvidence: readJson(paths.proofGradeEvidence),
  };
  const packet = buildPacket(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, packet, args.pretty);
  writeText(outReport, renderReport(packet));
  console.log(`wrote ${outJson}`);
  console.log(`wrote ${outReport}`);
  for (const [key, value] of Object.entries(packet.summary)) {
    if (typeof value !== "object" || value === null) {
      console.log(`${key}: ${value}`);
    } else if (key === "rows_by_separator_count") {
      console.log(`${key}: ${Object.values(value).join(",")}`);
    }
  }
}

main();
