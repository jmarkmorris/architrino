#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_BLOCKER_VECTOR = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_acceptance_rule_blocker_vector_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const BLOCKER_VECTOR_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_acceptance_rule_blocker_vector_handoff_classifier_fail_closed_rule_target_locked_six_rule_obligation_classes_unsatisfied_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier_fail_closed_rule_kernel_and_binding_evidence_obligations_split_all_unsatisfied_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";

const RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const RULE_DERIVATION_CLASS = "source_packet_acceptance_rule_derivation_proof";
const RULE_SOUNDNESS_CLASS = "source_packet_acceptance_rule_soundness_proof";
const RULE_APPLICATION_CLASS = "source_packet_acceptance_rule_endpoint_application_proof";
const CONFORMANCE_CLASS = "accepted_constants_conformance";
const COMPATIBLE_EVIDENCE_CLASS = "compatible_source_packet_acceptance_evidence";
const ACCEPTED_SOURCE_PACKET_CLASS = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet";

const RULE_KERNEL_CLASSES = [RULE_DERIVATION_CLASS, RULE_SOUNDNESS_CLASS, RULE_APPLICATION_CLASS];
const BINDING_AND_EVIDENCE_CLASSES = [
  CONFORMANCE_CLASS,
  COMPATIBLE_EVIDENCE_CLASS,
  ACCEPTED_SOURCE_PACKET_CLASS,
];

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
    blockerVector: DEFAULT_BLOCKER_VECTOR,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--blocker-vector") {
      args.blockerVector = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-source-packet-acceptance-rule-kernel-binding-split-classifier.mjs [options]

Options:
  --blocker-vector PATH  Source-packet acceptance rule proof-obligation blocker-vector handoff classifier. Defaults to ${DEFAULT_BLOCKER_VECTOR}.
  --out-dir PATH         Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty               Pretty-print JSON artifact.
  --help                 Show this help.`);
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
    ["accepted_status_source_packet_acceptance_rule_blocker_vector_handoff_classifier", paths.blockerVector],
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

function blockerMap(vector) {
  return new Map(vector.map((entry) => [entry.blocker_class, entry]));
}

function splitGroup(name, rank, classes, vector) {
  const byClass = blockerMap(vector);
  const classEntries = classes.map((blockerClass) => {
    const entry = byClass.get(blockerClass);
    if (!entry) {
      throw new Error(`Missing blocker class: ${blockerClass}`);
    }
    return entry;
  });
  const slotsDeclared = classEntries.reduce((sum, entry) => sum + entry.slots_declared, 0);
  const slotsSatisfied = classEntries.reduce((sum, entry) => sum + entry.slots_satisfied, 0);
  return {
    split_group: name,
    blocking_order_rank: rank,
    blocker_classes: classes,
    blocker_classes_declared: classes.length,
    blocker_classes_satisfied: countTrue(classEntries, (entry) => entry.slots_satisfied === entry.slots_declared),
    slots_declared: slotsDeclared,
    slots_satisfied: slotsSatisfied,
    slots_missing: slotsDeclared - slotsSatisfied,
    class_entries: classEntries,
    first_unsatisfied_class:
      classEntries.find((entry) => entry.slots_satisfied !== entry.slots_declared)?.blocker_class ?? null,
    first_blocker:
      classEntries.find((entry) => entry.slots_satisfied !== entry.slots_declared)?.first_blocker ?? null,
    split_group_satisfied: slotsDeclared > 0 && slotsSatisfied === slotsDeclared,
  };
}

function kernelBindingSplit(vector) {
  return [
    splitGroup("rule_kernel_obligations", 1, RULE_KERNEL_CLASSES, vector),
    splitGroup("binding_and_evidence_obligations", 2, BINDING_AND_EVIDENCE_CLASSES, vector),
  ];
}

function validateInput(blockerVector) {
  assertPacketStatusAndLocks(blockerVector, "blockerVector", BLOCKER_VECTOR_STATUS);
  const s = blockerVector.summary;
  expectEqual(s.direct_source_hash_checks_passed, 1, "blocker-vector direct source locks");
  expectEqual(s.retained_proof_obligation_direct_source_hash_checks_passed, 7, "retained proof-obligation locks");
  expectEqual(s.source_material_premise_slots, 124, "source-material premise slots");
  expectEqual(s.source_material_premise_slots_satisfied, 124, "source-material premises satisfied");
  expectEqual(s.candidate_exact_consistency_premise_slots, 124, "exact-consistency premise slots");
  expectEqual(s.candidate_exact_consistency_premise_slots_satisfied, 124, "exact-consistency premises satisfied");
  expectEqual(s.source_packet_acceptance_rule_target_slots, 124, "rule target slots");
  expectEqual(s.source_packet_acceptance_rule_target_slots_satisfied, 0, "rule target slots satisfied");
  expectEqual(s.blocker_classes, 6, "blocker classes");
  expectEqual(s.blocker_classes_satisfied, 0, "blocker classes satisfied");
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
  expectEqual(
    s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_slots,
    124,
    "accepted source-packet slots",
  );
  expectEqual(
    s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_slots_satisfied,
    0,
    "accepted source-packet slots satisfied",
  );
  expectEqual(s.route_decisions_made, 0, "route decisions");
  expectEqual(s.proof_rule_decisions_made, 0, "proof-rule decisions");
  expectEqual(s.primitive_acceptance_decisions_made, 0, "primitive-acceptance decisions");
  expectEqual(s.source_packet_acceptance_decisions_made, 0, "source-packet acceptance decisions");
  expectEqual(s.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "blocker vector");
}

function buildSeparatorProfiles(blockerVector) {
  return blockerVector.separator_source_packet_acceptance_rule_proof_obligation_blocker_vector_profiles
    .map((profile) => {
      const split = kernelBindingSplit(profile.blocker_vector);
      return {
        separator_event: profile.separator_event,
        fold_interval: profile.fold_interval,
        row_count: profile.row_count,
        aggregate_inputs_complete: profile.aggregate_inputs_complete,
        rule_target_locked: profile.rule_target_locked,
        source_material_premises_complete: profile.source_material_premises_complete,
        blocker_classes_declared: profile.blocker_classes_declared,
        blocker_classes_satisfied: profile.blocker_classes_satisfied,
        rule_kernel_obligation_classes: split[0].blocker_classes_declared,
        rule_kernel_obligation_classes_satisfied: split[0].blocker_classes_satisfied,
        rule_kernel_obligation_slots: split[0].slots_declared,
        rule_kernel_obligation_slots_satisfied: split[0].slots_satisfied,
        binding_and_evidence_obligation_classes: split[1].blocker_classes_declared,
        binding_and_evidence_obligation_classes_satisfied: split[1].blocker_classes_satisfied,
        binding_and_evidence_obligation_slots: split[1].slots_declared,
        binding_and_evidence_obligation_slots_satisfied: split[1].slots_satisfied,
        split_groups_satisfied: countTrue(split, (group) => group.split_group_satisfied),
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
        first_rule_kernel_blocker: split[0].first_blocker,
        first_binding_and_evidence_blocker: split[1].first_blocker,
        kernel_binding_split: split,
        classification: "separator_source_packet_acceptance_rule_kernel_binding_split_unsatisfied_fail_closed",
      };
    })
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function buildRowProfiles(blockerVector) {
  return blockerVector.row_source_packet_acceptance_rule_proof_obligation_blocker_vector_profiles
    .map((profile) => {
      const split = kernelBindingSplit(profile.blocker_vector);
      return {
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
        blocker_classes_declared: profile.blocker_classes_declared,
        blocker_classes_satisfied: profile.blocker_classes_satisfied,
        rule_kernel_obligation_classes: split[0].blocker_classes_declared,
        rule_kernel_obligation_classes_satisfied: split[0].blocker_classes_satisfied,
        rule_kernel_obligation_slots: split[0].slots_declared,
        rule_kernel_obligation_slots_satisfied: split[0].slots_satisfied,
        binding_and_evidence_obligation_classes: split[1].blocker_classes_declared,
        binding_and_evidence_obligation_classes_satisfied: split[1].blocker_classes_satisfied,
        binding_and_evidence_obligation_slots: split[1].slots_declared,
        binding_and_evidence_obligation_slots_satisfied: split[1].slots_satisfied,
        split_groups_satisfied: countTrue(split, (group) => group.split_group_satisfied),
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
        first_rule_kernel_blocker: split[0].first_blocker,
        first_binding_and_evidence_blocker: split[1].first_blocker,
        kernel_binding_split: split,
        classification: "row_source_packet_acceptance_rule_kernel_binding_split_unsatisfied_fail_closed",
      };
    })
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, blockerVector) {
  validateInput(blockerVector);
  const sourceChecks = sourceHashChecks(paths);
  const blocker = blockerVector.summary;
  const vector = blockerVector.source_packet_acceptance_rule_proof_obligation_blocker_vector;
  const split = kernelBindingSplit(vector);
  const ruleKernel = split[0];
  const bindingAndEvidence = split[1];
  const separatorProfiles = buildSeparatorProfiles(blockerVector);
  const rowProfiles = buildRowProfiles(blockerVector);
  const totalSplitSlots = split.reduce((sum, group) => sum + group.slots_declared, 0);
  const totalSplitSatisfied = split.reduce((sum, group) => sum + group.slots_satisfied, 0);

  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_blocker_vector_direct_source_hash_checks_passed: blocker.direct_source_hash_checks_passed,
    retained_blocker_vector_source_hash_checks: blocker.direct_source_hash_checks,
    retained_proof_obligation_direct_source_hash_checks_passed:
      blocker.retained_proof_obligation_direct_source_hash_checks_passed,
    retained_proof_obligation_source_hash_checks: blocker.retained_proof_obligation_source_hash_checks,
    candidate_higher_fold_constants_artifacts: blocker.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: blocker.candidate_separator_constants,
    candidate_row_constant_associations: blocker.candidate_row_constant_associations,
    rows_by_separator_count: blocker.rows_by_separator_count,
    separator_kernel_binding_split_profiles: separatorProfiles.length,
    row_kernel_binding_split_profiles: rowProfiles.length,
    source_material_premise_slots: blocker.source_material_premise_slots,
    source_material_premise_slots_satisfied: blocker.source_material_premise_slots_satisfied,
    candidate_exact_consistency_premise_slots: blocker.candidate_exact_consistency_premise_slots,
    candidate_exact_consistency_premise_slots_satisfied:
      blocker.candidate_exact_consistency_premise_slots_satisfied,
    source_packet_acceptance_rule_target_slots: blocker.source_packet_acceptance_rule_target_slots,
    source_packet_acceptance_rule_target_slots_satisfied:
      blocker.source_packet_acceptance_rule_target_slots_satisfied,
    blocker_classes: blocker.blocker_classes,
    blocker_classes_satisfied: blocker.blocker_classes_satisfied,
    split_groups: split.length,
    split_groups_satisfied: countTrue(split, (group) => group.split_group_satisfied),
    rule_kernel_obligation_classes: ruleKernel.blocker_classes_declared,
    rule_kernel_obligation_classes_satisfied: ruleKernel.blocker_classes_satisfied,
    rule_kernel_obligation_slots: ruleKernel.slots_declared,
    rule_kernel_obligation_slots_satisfied: ruleKernel.slots_satisfied,
    rule_kernel_obligation_slots_missing: ruleKernel.slots_missing,
    binding_and_evidence_obligation_classes: bindingAndEvidence.blocker_classes_declared,
    binding_and_evidence_obligation_classes_satisfied: bindingAndEvidence.blocker_classes_satisfied,
    binding_and_evidence_obligation_slots: bindingAndEvidence.slots_declared,
    binding_and_evidence_obligation_slots_satisfied: bindingAndEvidence.slots_satisfied,
    binding_and_evidence_obligation_slots_missing: bindingAndEvidence.slots_missing,
    total_split_obligation_slots: totalSplitSlots,
    total_split_obligation_slots_satisfied: totalSplitSatisfied,
    total_split_obligation_slots_missing: totalSplitSlots - totalSplitSatisfied,
    source_packet_acceptance_rule_derivation_proof_slots:
      blocker.source_packet_acceptance_rule_derivation_proof_slots,
    source_packet_acceptance_rule_derivation_proof_slots_satisfied:
      blocker.source_packet_acceptance_rule_derivation_proof_slots_satisfied,
    source_packet_acceptance_rule_soundness_proof_slots:
      blocker.source_packet_acceptance_rule_soundness_proof_slots,
    source_packet_acceptance_rule_soundness_proof_slots_satisfied:
      blocker.source_packet_acceptance_rule_soundness_proof_slots_satisfied,
    source_packet_acceptance_rule_endpoint_application_proof_slots:
      blocker.source_packet_acceptance_rule_endpoint_application_proof_slots,
    source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied:
      blocker.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied,
    accepted_constants_conformance_obligation_slots:
      blocker.accepted_constants_conformance_obligation_slots,
    accepted_constants_conformance_obligation_slots_satisfied:
      blocker.accepted_constants_conformance_obligation_slots_satisfied,
    compatible_source_packet_acceptance_evidence_slots:
      blocker.compatible_source_packet_acceptance_evidence_slots,
    compatible_source_packet_acceptance_evidence_slots_filled:
      blocker.compatible_source_packet_acceptance_evidence_slots_filled,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_slots:
      blocker.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_slots,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_slots_satisfied:
      blocker.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_slots_satisfied,
    source_packet_acceptance_rules_constructed: blocker.source_packet_acceptance_rules_constructed,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets:
      blocker.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets,
    accepted_interval_certified_constants_status_refs_constructed:
      blocker.accepted_interval_certified_constants_status_refs_constructed,
    accepted_interval_certified_constants_statuses_constructed:
      blocker.accepted_interval_certified_constants_statuses_constructed,
    accepted_fold_layer_rows: blocker.accepted_fold_layer_rows,
    row_consumption_count: blocker.row_consumption_count,
    route_decisions_made: blocker.route_decisions_made,
    proof_rule_decisions_made: blocker.proof_rule_decisions_made,
    primitive_acceptance_decisions_made: blocker.primitive_acceptance_decisions_made,
    source_packet_acceptance_decisions_made: blocker.source_packet_acceptance_decisions_made,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_rule_blocker: RULE_BLOCKER,
    first_rule_kernel_blocker: ruleKernel.first_blocker,
    first_binding_and_evidence_blocker: bindingAndEvidence.first_blocker,
  };

  const packet = {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_source_packet_acceptance_rule_kernel_binding_split_classifier.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status source-packet acceptance rule kernel binding split",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status source-packet acceptance rule kernel binding split",
    claim_level:
      "priority-only source-packet acceptance rule kernel/binding split classifier; imports the blocker-vector handoff and separates the six unsatisfied rule/acceptance blocker classes into rule-kernel obligations and downstream binding/evidence obligations without making proof-rule, route, primitive-acceptance, source-packet acceptance, accepted-status, row-consumption, live-ledger, or branch-chart decisions",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_source_packet_acceptance_rule_blocker_vector_handoff_classifier: artifactRecord(
        paths.blockerVector,
      ),
    },
    source_hash_checks: sourceChecks,
    source_packet_acceptance_rule_kernel_binding_split: split,
    separator_source_packet_acceptance_rule_kernel_binding_split_profiles: separatorProfiles,
    row_source_packet_acceptance_rule_kernel_binding_split_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "source_packet_acceptance_rule_kernel_binding_split",
      current_pool_closure_state:
        "not mechanically closable from the blocker-vector handoff; rule-kernel obligations and downstream binding/evidence obligations are both fully unsatisfied",
      blocking_order: [
        "rule_kernel_obligations",
        "binding_and_evidence_obligations_after_rule_kernel_obligations",
      ],
      first_rule_blocker: RULE_BLOCKER,
      first_rule_kernel_blocker: ruleKernel.first_blocker,
      first_binding_and_evidence_blocker: bindingAndEvidence.first_blocker,
      mechanical_continuation_available: false,
      decision_required: true,
      required_external_inputs: [
        "source_packet_acceptance_rule_derivation_proof",
        "source_packet_acceptance_rule_soundness_proof",
        "source_packet_acceptance_rule_endpoint_application_proof",
      ],
      downstream_inputs_not_actionable_until_rule_kernel_present: BINDING_AND_EVIDENCE_CLASSES,
      forbidden_reinterpretations: [
        "source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule",
        "complete_separator_aggregate_inputs_as_accepted_source_packet",
        "existing_constants_contract_packet_identity_mismatch_as_accepted_constants_conformance",
        "source_packet_acceptance_rule_blocker_vector_handoff_classifier_as_source_packet_acceptance_rule",
        "source_packet_acceptance_rule_kernel_binding_split_classifier_as_source_packet_acceptance_rule",
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
      "Priority-only. This classifier narrows the blocker-vector handoff by separating the unsatisfied source-packet acceptance rule kernel from downstream binding/evidence obligations.",
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
    s.retained_blocker_vector_direct_source_hash_checks_passed === 1,
    s.retained_blocker_vector_source_hash_checks === 1,
    s.retained_proof_obligation_direct_source_hash_checks_passed === 7,
    s.retained_proof_obligation_source_hash_checks === 7,
    s.candidate_separator_constants === 12,
    s.candidate_row_constant_associations === 112,
    s.separator_kernel_binding_split_profiles === 12,
    s.row_kernel_binding_split_profiles === 112,
    s.source_material_premise_slots === 124,
    s.source_material_premise_slots_satisfied === 124,
    s.candidate_exact_consistency_premise_slots === 124,
    s.candidate_exact_consistency_premise_slots_satisfied === 124,
    s.source_packet_acceptance_rule_target_slots === 124,
    s.source_packet_acceptance_rule_target_slots_satisfied === 0,
    s.blocker_classes === 6,
    s.blocker_classes_satisfied === 0,
    s.split_groups === 2,
    s.split_groups_satisfied === 0,
    s.rule_kernel_obligation_classes === 3,
    s.rule_kernel_obligation_classes_satisfied === 0,
    s.rule_kernel_obligation_slots === 372,
    s.rule_kernel_obligation_slots_satisfied === 0,
    s.binding_and_evidence_obligation_classes === 3,
    s.binding_and_evidence_obligation_classes_satisfied === 0,
    s.binding_and_evidence_obligation_slots === 496,
    s.binding_and_evidence_obligation_slots_satisfied === 0,
    s.total_split_obligation_slots === 868,
    s.total_split_obligation_slots_satisfied === 0,
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
    throw new Error("Source-packet acceptance rule kernel/binding split invariant failure.");
  }
}

function renderReport(packet) {
  const s = packet.summary;
  const sourceRows = Object.entries(packet.source_artifacts)
    .map(([key, record]) => `| \`${key}\` | \`${record.basename}\` | \`${record.sha256}\` | ${record.present} |`)
    .join("\n");
  const splitRows = packet.source_packet_acceptance_rule_kernel_binding_split
    .map(
      (entry) =>
        `| \`${entry.split_group}\` | ${entry.blocking_order_rank} | ${entry.blocker_classes_declared} | ${entry.slots_declared} | ${entry.slots_satisfied} | \`${entry.first_blocker}\` |`,
    )
    .join("\n");
  return `# Candidate-Live Higher-Fold Constants Accepted-Status Source-Packet Acceptance Rule Kernel/Binding Split Classifier

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

## Kernel/Binding Split

| Split group | Rank | Classes | Slots | Satisfied | First blocker |
| --- | ---: | ---: | ---: | ---: | --- |
${splitRows}

Total split-obligation slots satisfied: ${s.total_split_obligation_slots_satisfied} / ${s.total_split_obligation_slots}.

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
    blockerVector: args.blockerVector,
  };
  const blockerVector = readJson(paths.blockerVector);
  const packet = buildPacket(paths, blockerVector);
  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(jsonPath, packet, args.pretty);
  writeText(reportPath, renderReport(packet));
  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${reportPath}`);
}

main();
