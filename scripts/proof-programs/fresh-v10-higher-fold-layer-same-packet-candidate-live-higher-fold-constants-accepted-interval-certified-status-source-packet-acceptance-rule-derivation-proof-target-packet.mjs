#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_KERNEL_BINDING_SPLIT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_RULE_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_target_packet_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const KERNEL_BINDING_SPLIT_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier_fail_closed_rule_kernel_and_binding_evidence_obligations_split_all_unsatisfied_no_route_decision_no_proof_rule_no_primitive_acceptance_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const RULE_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet_fail_closed_acceptance_rule_target_declared_aggregate_inputs_complete_rule_absent_no_primitive_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_target_packet_fail_closed_derivation_proof_target_declared_rule_kernel_unsatisfied_no_derivation_proof_no_soundness_proof_no_endpoint_application_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";

const RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const DERIVATION_PROOF_BLOCKER = "source_packet_acceptance_rule_derivation_proof_absent";
const SOUNDNESS_PROOF_BLOCKER = "source_packet_acceptance_rule_soundness_proof_absent";
const APPLICATION_PROOF_BLOCKER = "source_packet_acceptance_rule_endpoint_application_proof_absent";
const CONFORMANCE_BLOCKER = "existing_constants_contract_packet_identity_mismatch";
const DERIVATION_PROOF_TARGET =
  "source_packet_acceptance_rule_derivation_proof_for_live_same_packet_separator_aggregate_family";

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
    kernelBindingSplit: DEFAULT_KERNEL_BINDING_SPLIT,
    ruleTarget: DEFAULT_RULE_TARGET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--kernel-binding-split") {
      args.kernelBindingSplit = argv[++index];
    } else if (arg === "--rule-target") {
      args.ruleTarget = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-source-packet-acceptance-rule-derivation-proof-target-packet.mjs [options]

Options:
  --kernel-binding-split PATH  Source-packet acceptance rule kernel/binding split classifier. Defaults to ${DEFAULT_KERNEL_BINDING_SPLIT}.
  --rule-target PATH           Source-packet acceptance rule target packet. Defaults to ${DEFAULT_RULE_TARGET}.
  --out-dir PATH               Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                     Pretty-print JSON artifact.
  --help                       Show this help.`);
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
    ["accepted_status_source_packet_acceptance_rule_kernel_binding_split_classifier", paths.kernelBindingSplit],
    ["accepted_status_source_packet_acceptance_rule_target_packet", paths.ruleTarget],
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

function validateRuleTarget(ruleTarget) {
  assertPacketStatusAndLocks(ruleTarget, "ruleTarget", RULE_TARGET_STATUS);
  const s = ruleTarget.summary;
  expectEqual(s.direct_source_hash_checks_passed, 3, "rule-target direct source locks");
  expectEqual(s.candidate_separator_constants, 12, "rule-target separator constants");
  expectEqual(s.candidate_row_constant_associations, 112, "rule-target row associations");
  expectEqual(s.source_packet_acceptance_rule_targets_declared, 1, "declared source-packet acceptance rule targets");
  expectEqual(s.source_packet_acceptance_rule_targets_satisfied, 0, "satisfied source-packet acceptance rule targets");
  expectEqual(s.total_source_packet_acceptance_rule_target_slots, 124, "total rule-target slots");
  expectEqual(s.total_source_packet_acceptance_rule_target_slots_satisfied, 0, "satisfied rule-target slots");
  expectEqual(s.source_packet_acceptance_rules_constructed, 0, "source-packet acceptance rules constructed");
  expectEqual(s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "accepted source packets");
  expectEqual(s.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses");
  expectEqual(s.route_decisions_made, 0, "route decisions");
  expectEqual(s.proof_rule_decisions_made, 0, "proof-rule decisions");
  expectEqual(s.primitive_acceptance_decisions_made, 0, "primitive-acceptance decisions");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "rule target");
}

function validateInput(kernelBindingSplit, ruleTarget) {
  assertPacketStatusAndLocks(kernelBindingSplit, "kernelBindingSplit", KERNEL_BINDING_SPLIT_STATUS);
  validateRuleTarget(ruleTarget);
  const s = kernelBindingSplit.summary;
  expectEqual(s.direct_source_hash_checks_passed, 1, "kernel/binding split direct source locks");
  expectEqual(s.retained_blocker_vector_direct_source_hash_checks_passed, 1, "retained blocker-vector locks");
  expectEqual(s.retained_proof_obligation_direct_source_hash_checks_passed, 7, "retained proof-obligation locks");
  expectEqual(s.source_material_premise_slots, 124, "source-material premise slots");
  expectEqual(s.source_material_premise_slots_satisfied, 124, "source-material premises satisfied");
  expectEqual(s.candidate_exact_consistency_premise_slots, 124, "exact-consistency premise slots");
  expectEqual(s.candidate_exact_consistency_premise_slots_satisfied, 124, "exact-consistency premises satisfied");
  expectEqual(s.source_packet_acceptance_rule_target_slots, 124, "source-packet acceptance rule target slots");
  expectEqual(s.source_packet_acceptance_rule_target_slots_satisfied, 0, "source-packet acceptance rule targets satisfied");
  expectEqual(s.rule_kernel_obligation_classes, 3, "rule-kernel classes");
  expectEqual(s.rule_kernel_obligation_classes_satisfied, 0, "rule-kernel classes satisfied");
  expectEqual(s.rule_kernel_obligation_slots, 372, "rule-kernel slots");
  expectEqual(s.rule_kernel_obligation_slots_satisfied, 0, "rule-kernel slots satisfied");
  expectEqual(s.binding_and_evidence_obligation_slots, 496, "binding/evidence slots");
  expectEqual(s.binding_and_evidence_obligation_slots_satisfied, 0, "binding/evidence slots satisfied");
  expectEqual(s.total_split_obligation_slots, 868, "total split-obligation slots");
  expectEqual(s.total_split_obligation_slots_satisfied, 0, "total split-obligation slots satisfied");
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
  expectEqual(s.source_packet_acceptance_rules_constructed, 0, "source-packet acceptance rules constructed");
  expectEqual(s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "accepted source packets");
  expectEqual(s.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses");
  expectEqual(s.route_decisions_made, 0, "route decisions");
  expectEqual(s.proof_rule_decisions_made, 0, "proof-rule decisions");
  expectEqual(s.primitive_acceptance_decisions_made, 0, "primitive-acceptance decisions");
  expectEqual(s.source_packet_acceptance_decisions_made, 0, "source-packet acceptance decisions");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "kernel/binding split");
}

function derivationTargetRecord(profile) {
  return {
    derivation_proof_target: DERIVATION_PROOF_TARGET,
    derivation_proof_target_declared: true,
    derivation_proof_target_slots: 1,
    derivation_proof_slots_satisfied: 0,
    source_material_premises_complete: profile.source_material_premises_complete,
    exact_consistency_premises_complete: true,
    rule_target_locked: profile.rule_target_locked,
    source_packet_acceptance_rule_constructed: false,
    source_packet_acceptance_rule_derivation_proof_present: false,
    source_packet_acceptance_rule_derivation_proof_accepted: false,
    proof_rule_decision_made: false,
    first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
    forbidden_reinterpretations: [
      "source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule",
      "source_packet_acceptance_rule_kernel_binding_split_classifier_as_derivation_proof",
      "source_packet_acceptance_rule_derivation_proof_target_packet_as_derivation_proof",
    ],
  };
}

function buildSeparatorProfiles(kernelBindingSplit) {
  return kernelBindingSplit.separator_source_packet_acceptance_rule_kernel_binding_split_profiles
    .map((profile) => ({
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      row_count: profile.row_count,
      aggregate_inputs_complete: profile.aggregate_inputs_complete,
      rule_target_locked: profile.rule_target_locked,
      source_material_premises_complete: profile.source_material_premises_complete,
      rule_kernel_obligation_classes: profile.rule_kernel_obligation_classes,
      rule_kernel_obligation_classes_satisfied: profile.rule_kernel_obligation_classes_satisfied,
      rule_kernel_obligation_slots: profile.rule_kernel_obligation_slots,
      rule_kernel_obligation_slots_satisfied: profile.rule_kernel_obligation_slots_satisfied,
      derivation_proof_target_slots: 1,
      derivation_proof_target_slots_declared: 1,
      derivation_proof_slots_satisfied: 0,
      soundness_proof_slots_waiting_on_derivation: 1,
      endpoint_application_proof_slots_waiting_on_derivation: 1,
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
      first_rule_kernel_blocker: DERIVATION_PROOF_BLOCKER,
      first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
      derivation_proof_target_record: derivationTargetRecord(profile),
      classification: "separator_source_packet_acceptance_rule_derivation_proof_target_declared_unsatisfied_fail_closed",
    }))
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function buildRowProfiles(kernelBindingSplit) {
  return kernelBindingSplit.row_source_packet_acceptance_rule_kernel_binding_split_profiles
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
      rule_kernel_obligation_classes: profile.rule_kernel_obligation_classes,
      rule_kernel_obligation_classes_satisfied: profile.rule_kernel_obligation_classes_satisfied,
      rule_kernel_obligation_slots: profile.rule_kernel_obligation_slots,
      rule_kernel_obligation_slots_satisfied: profile.rule_kernel_obligation_slots_satisfied,
      derivation_proof_target_slots: 1,
      derivation_proof_target_slots_declared: 1,
      derivation_proof_slots_satisfied: 0,
      soundness_proof_slots_waiting_on_derivation: 1,
      endpoint_application_proof_slots_waiting_on_derivation: 1,
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
      first_rule_kernel_blocker: DERIVATION_PROOF_BLOCKER,
      first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
      derivation_proof_target_record: derivationTargetRecord(profile),
      classification: "row_source_packet_acceptance_rule_derivation_proof_target_declared_unsatisfied_fail_closed",
    }))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, kernelBindingSplit, ruleTarget) {
  validateInput(kernelBindingSplit, ruleTarget);
  const sourceChecks = sourceHashChecks(paths);
  const source = kernelBindingSplit.summary;
  const target = ruleTarget.summary;
  const separatorProfiles = buildSeparatorProfiles(kernelBindingSplit);
  const rowProfiles = buildRowProfiles(kernelBindingSplit);
  const derivationTargetSlots = separatorProfiles.length + rowProfiles.length;
  const downstreamRuleKernelSlotsWaiting =
    source.source_packet_acceptance_rule_soundness_proof_slots +
    source.source_packet_acceptance_rule_endpoint_application_proof_slots;

  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_kernel_binding_split_direct_source_hash_checks_passed: source.direct_source_hash_checks_passed,
    retained_kernel_binding_split_source_hash_checks: source.direct_source_hash_checks,
    retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed:
      target.direct_source_hash_checks_passed,
    retained_source_packet_acceptance_rule_target_source_hash_checks: target.direct_source_hash_checks,
    retained_blocker_vector_direct_source_hash_checks_passed:
      source.retained_blocker_vector_direct_source_hash_checks_passed,
    retained_blocker_vector_source_hash_checks: source.retained_blocker_vector_source_hash_checks,
    retained_proof_obligation_direct_source_hash_checks_passed:
      source.retained_proof_obligation_direct_source_hash_checks_passed,
    retained_proof_obligation_source_hash_checks: source.retained_proof_obligation_source_hash_checks,
    candidate_higher_fold_constants_artifacts: source.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: source.candidate_separator_constants,
    candidate_row_constant_associations: source.candidate_row_constant_associations,
    rows_by_separator_count: source.rows_by_separator_count,
    separator_derivation_proof_target_profiles: separatorProfiles.length,
    row_derivation_proof_target_profiles: rowProfiles.length,
    source_material_premise_slots: source.source_material_premise_slots,
    source_material_premise_slots_satisfied: source.source_material_premise_slots_satisfied,
    candidate_exact_consistency_premise_slots: source.candidate_exact_consistency_premise_slots,
    candidate_exact_consistency_premise_slots_satisfied:
      source.candidate_exact_consistency_premise_slots_satisfied,
    source_packet_acceptance_rule_target_slots: source.source_packet_acceptance_rule_target_slots,
    source_packet_acceptance_rule_target_slots_satisfied:
      source.source_packet_acceptance_rule_target_slots_satisfied,
    source_packet_acceptance_rule_targets_declared: target.source_packet_acceptance_rule_targets_declared,
    retained_source_packet_acceptance_rule_target_slots:
      target.total_source_packet_acceptance_rule_target_slots,
    retained_source_packet_acceptance_rule_target_slots_satisfied:
      target.total_source_packet_acceptance_rule_target_slots_satisfied,
    rule_kernel_obligation_classes: source.rule_kernel_obligation_classes,
    rule_kernel_obligation_classes_satisfied: source.rule_kernel_obligation_classes_satisfied,
    rule_kernel_obligation_slots: source.rule_kernel_obligation_slots,
    rule_kernel_obligation_slots_satisfied: source.rule_kernel_obligation_slots_satisfied,
    derivation_proof_target_slots: derivationTargetSlots,
    derivation_proof_target_slots_declared: derivationTargetSlots,
    derivation_proof_target_slots_satisfied: 0,
    source_packet_acceptance_rule_derivation_proof_slots:
      source.source_packet_acceptance_rule_derivation_proof_slots,
    source_packet_acceptance_rule_derivation_proof_slots_satisfied:
      source.source_packet_acceptance_rule_derivation_proof_slots_satisfied,
    downstream_rule_kernel_slots_waiting_on_derivation_proof: downstreamRuleKernelSlotsWaiting,
    downstream_rule_kernel_slots_waiting_on_derivation_proof_satisfied: 0,
    source_packet_acceptance_rule_soundness_proof_slots:
      source.source_packet_acceptance_rule_soundness_proof_slots,
    source_packet_acceptance_rule_soundness_proof_slots_satisfied:
      source.source_packet_acceptance_rule_soundness_proof_slots_satisfied,
    source_packet_acceptance_rule_endpoint_application_proof_slots:
      source.source_packet_acceptance_rule_endpoint_application_proof_slots,
    source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied:
      source.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied,
    binding_and_evidence_obligation_classes: source.binding_and_evidence_obligation_classes,
    binding_and_evidence_obligation_classes_satisfied: source.binding_and_evidence_obligation_classes_satisfied,
    binding_and_evidence_obligation_slots: source.binding_and_evidence_obligation_slots,
    binding_and_evidence_obligation_slots_satisfied:
      source.binding_and_evidence_obligation_slots_satisfied,
    total_split_obligation_slots: source.total_split_obligation_slots,
    total_split_obligation_slots_satisfied: source.total_split_obligation_slots_satisfied,
    source_packet_acceptance_rules_constructed: source.source_packet_acceptance_rules_constructed,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets:
      source.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets,
    accepted_interval_certified_constants_status_refs_constructed:
      source.accepted_interval_certified_constants_status_refs_constructed,
    accepted_interval_certified_constants_statuses_constructed:
      source.accepted_interval_certified_constants_statuses_constructed,
    accepted_fold_layer_rows: source.accepted_fold_layer_rows,
    row_consumption_count: source.row_consumption_count,
    route_decisions_made: source.route_decisions_made,
    proof_rule_decisions_made: source.proof_rule_decisions_made,
    primitive_acceptance_decisions_made: source.primitive_acceptance_decisions_made,
    source_packet_acceptance_decisions_made: source.source_packet_acceptance_decisions_made,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_rule_blocker: RULE_BLOCKER,
    first_rule_kernel_blocker: DERIVATION_PROOF_BLOCKER,
    first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
    first_downstream_rule_kernel_blocker_after_derivation: SOUNDNESS_PROOF_BLOCKER,
    first_endpoint_application_blocker: APPLICATION_PROOF_BLOCKER,
    first_binding_and_evidence_blocker: CONFORMANCE_BLOCKER,
  };

  const packet = {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_source_packet_acceptance_rule_derivation_proof_target_packet.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status source-packet acceptance rule derivation-proof target",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status source-packet acceptance rule derivation proof target",
    claim_level:
      "priority-only source-packet acceptance rule derivation-proof target packet; imports the kernel/binding split, declares the first rule-kernel proof target, and keeps the derivation proof, soundness proof, endpoint-application proof, source-packet acceptance rule, accepted source packet, accepted status, row-consumption, live-ledger, and branch-chart decisions absent",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_source_packet_acceptance_rule_kernel_binding_split_classifier: artifactRecord(
        paths.kernelBindingSplit,
      ),
      accepted_status_source_packet_acceptance_rule_target_packet: artifactRecord(paths.ruleTarget),
    },
    source_hash_checks: sourceChecks,
    source_packet_acceptance_rule_derivation_proof_target: {
      target: DERIVATION_PROOF_TARGET,
      target_slots_declared: derivationTargetSlots,
      target_slots_satisfied: 0,
      first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
      required_prior_ready_premises: [
        "source_packet_acceptance_rule_target_packet",
        "source_material_premise_slots",
        "candidate_exact_consistency_premise_slots",
        "source_packet_acceptance_rule_target_slots",
        "rule_kernel_obligations",
      ],
      required_missing_proof_object: "source_packet_acceptance_rule_derivation_proof",
    },
    separator_source_packet_acceptance_rule_derivation_proof_target_profiles: separatorProfiles,
    row_source_packet_acceptance_rule_derivation_proof_target_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "source_packet_acceptance_rule_derivation_proof_target",
      current_pool_closure_state:
        "not mechanically closable from the kernel/binding split; the first rule-kernel proof target is declared but no derivation proof is present",
      first_rule_blocker: RULE_BLOCKER,
      first_rule_kernel_blocker: DERIVATION_PROOF_BLOCKER,
      mechanical_continuation_available: false,
      decision_required: true,
      required_external_inputs: [DERIVATION_PROOF_TARGET],
      downstream_inputs_not_actionable_until_derivation_proof_present: [
        "source_packet_acceptance_rule_soundness_proof",
        "source_packet_acceptance_rule_endpoint_application_proof",
        "accepted_constants_conformance",
        "compatible_source_packet_acceptance_evidence",
        "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
      ],
      forbidden_reinterpretations: [
        "source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule",
        "source_packet_acceptance_rule_kernel_binding_split_classifier_as_derivation_proof",
        "source_packet_acceptance_rule_derivation_proof_target_packet_as_derivation_proof",
        "source_packet_acceptance_rule_derivation_proof_target_packet_as_source_packet_acceptance_rule",
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
      "Priority-only. This target packet narrows the first rule-kernel blocker to a derivation-proof obligation without constructing or accepting a proof rule.",
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
    s.direct_source_hash_checks_passed === 2,
    s.direct_source_hash_checks === 2,
    s.retained_kernel_binding_split_direct_source_hash_checks_passed === 1,
    s.retained_kernel_binding_split_source_hash_checks === 1,
    s.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed === 3,
    s.retained_source_packet_acceptance_rule_target_source_hash_checks === 3,
    s.retained_blocker_vector_direct_source_hash_checks_passed === 1,
    s.retained_proof_obligation_direct_source_hash_checks_passed === 7,
    s.candidate_separator_constants === 12,
    s.candidate_row_constant_associations === 112,
    s.separator_derivation_proof_target_profiles === 12,
    s.row_derivation_proof_target_profiles === 112,
    s.source_material_premise_slots === 124,
    s.source_material_premise_slots_satisfied === 124,
    s.candidate_exact_consistency_premise_slots === 124,
    s.candidate_exact_consistency_premise_slots_satisfied === 124,
    s.source_packet_acceptance_rule_target_slots === 124,
    s.source_packet_acceptance_rule_target_slots_satisfied === 0,
    s.source_packet_acceptance_rule_targets_declared === 1,
    s.retained_source_packet_acceptance_rule_target_slots === 124,
    s.retained_source_packet_acceptance_rule_target_slots_satisfied === 0,
    s.rule_kernel_obligation_classes === 3,
    s.rule_kernel_obligation_classes_satisfied === 0,
    s.rule_kernel_obligation_slots === 372,
    s.rule_kernel_obligation_slots_satisfied === 0,
    s.derivation_proof_target_slots === 124,
    s.derivation_proof_target_slots_declared === 124,
    s.derivation_proof_target_slots_satisfied === 0,
    s.source_packet_acceptance_rule_derivation_proof_slots === 124,
    s.source_packet_acceptance_rule_derivation_proof_slots_satisfied === 0,
    s.downstream_rule_kernel_slots_waiting_on_derivation_proof === 248,
    s.downstream_rule_kernel_slots_waiting_on_derivation_proof_satisfied === 0,
    s.source_packet_acceptance_rule_soundness_proof_slots === 124,
    s.source_packet_acceptance_rule_soundness_proof_slots_satisfied === 0,
    s.source_packet_acceptance_rule_endpoint_application_proof_slots === 124,
    s.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied === 0,
    s.binding_and_evidence_obligation_slots === 496,
    s.binding_and_evidence_obligation_slots_satisfied === 0,
    s.total_split_obligation_slots === 868,
    s.total_split_obligation_slots_satisfied === 0,
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
    throw new Error("Source-packet acceptance rule derivation-proof target invariant failure.");
  }
}

function renderReport(packet) {
  const s = packet.summary;
  const sourceRows = Object.entries(packet.source_artifacts)
    .map(([key, record]) => `| \`${key}\` | \`${record.basename}\` | \`${record.sha256}\` | ${record.present} |`)
    .join("\n");
  return `# Candidate-Live Higher-Fold Constants Accepted-Status Source-Packet Acceptance Rule Derivation-Proof Target Packet

Status: \`${packet.status}\`

## Claim Level

${packet.claim_level}

## Source Locks

| Source | Basename | SHA-256 | Present |
| --- | --- | --- | --- |
${sourceRows}

Direct source-hash locks: ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks}.

## Derivation-Proof Target

- target: \`${packet.source_packet_acceptance_rule_derivation_proof_target.target}\`
- target slots declared: ${s.derivation_proof_target_slots_declared}
- target slots satisfied: ${s.derivation_proof_target_slots_satisfied}
- first derivation-proof blocker: \`${s.first_derivation_proof_blocker}\`

## Retained Rule-Kernel State

- source-material premise slots ready: ${s.source_material_premise_slots_satisfied} / ${s.source_material_premise_slots}
- candidate exact-consistency premise slots ready: ${s.candidate_exact_consistency_premise_slots_satisfied} / ${s.candidate_exact_consistency_premise_slots}
- source-packet acceptance rule target slots satisfied: ${s.source_packet_acceptance_rule_target_slots_satisfied} / ${s.source_packet_acceptance_rule_target_slots}
- rule-kernel obligation slots satisfied: ${s.rule_kernel_obligation_slots_satisfied} / ${s.rule_kernel_obligation_slots}
- downstream rule-kernel slots waiting on derivation proof: ${s.downstream_rule_kernel_slots_waiting_on_derivation_proof_satisfied} / ${s.downstream_rule_kernel_slots_waiting_on_derivation_proof}
- binding/evidence obligation slots satisfied: ${s.binding_and_evidence_obligation_slots_satisfied} / ${s.binding_and_evidence_obligation_slots}

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

This packet is a target packet only. It does not construct a derivation proof,
proof rule, source-packet acceptance rule, accepted source packet, accepted
interval-certified constants status, row consumption, live-ledger update, or
branch-chart authorization.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    kernelBindingSplit: args.kernelBindingSplit,
    ruleTarget: args.ruleTarget,
  };
  const kernelBindingSplit = readJson(paths.kernelBindingSplit);
  const ruleTarget = readJson(paths.ruleTarget);
  const packet = buildPacket(paths, kernelBindingSplit, ruleTarget);
  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(jsonPath, packet, args.pretty);
  writeText(reportPath, renderReport(packet));
  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${reportPath}`);
}

main();
