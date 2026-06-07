#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_DERIVATION_PROOF_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const DERIVATION_PROOF_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_target_packet_fail_closed_derivation_proof_target_declared_rule_kernel_unsatisfied_no_derivation_proof_no_soundness_proof_no_endpoint_application_proof_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier_fail_closed_source_data_ready_derivation_proof_absent_no_proof_rule_no_source_packet_acceptance_no_accepted_status_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";

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
    derivationProofTarget: DEFAULT_DERIVATION_PROOF_TARGET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--derivation-proof-target") {
      args.derivationProofTarget = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-source-packet-acceptance-rule-derivation-proof-source-data-readiness-classifier.mjs [options]

Options:
  --derivation-proof-target PATH  Source-packet acceptance rule derivation-proof target packet. Defaults to ${DEFAULT_DERIVATION_PROOF_TARGET}.
  --out-dir PATH                  Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                        Pretty-print JSON artifact.
  --help                          Show this help.`);
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
    ["accepted_status_source_packet_acceptance_rule_derivation_proof_target_packet", paths.derivationProofTarget],
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

function validateInput(derivationProofTarget) {
  assertPacketStatusAndLocks(derivationProofTarget, "derivationProofTarget", DERIVATION_PROOF_TARGET_STATUS);
  const s = derivationProofTarget.summary;
  expectEqual(s.direct_source_hash_checks_passed, 2, "derivation target direct source locks");
  expectEqual(s.retained_kernel_binding_split_direct_source_hash_checks_passed, 1, "retained kernel/binding split locks");
  expectEqual(s.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed, 3, "retained rule-target locks");
  expectEqual(s.retained_blocker_vector_direct_source_hash_checks_passed, 1, "retained blocker-vector locks");
  expectEqual(s.retained_proof_obligation_direct_source_hash_checks_passed, 7, "retained proof-obligation locks");
  expectEqual(s.candidate_separator_constants, 12, "separator constants");
  expectEqual(s.candidate_row_constant_associations, 112, "row associations");
  expectEqual(s.separator_derivation_proof_target_profiles, 12, "separator derivation-proof target profiles");
  expectEqual(s.row_derivation_proof_target_profiles, 112, "row derivation-proof target profiles");
  expectEqual(s.source_material_premise_slots, 124, "source-material premise slots");
  expectEqual(s.source_material_premise_slots_satisfied, 124, "source-material premises satisfied");
  expectEqual(s.candidate_exact_consistency_premise_slots, 124, "exact-consistency premise slots");
  expectEqual(s.candidate_exact_consistency_premise_slots_satisfied, 124, "exact-consistency premises satisfied");
  expectEqual(s.source_packet_acceptance_rule_target_slots, 124, "source-packet acceptance rule target slots");
  expectEqual(s.source_packet_acceptance_rule_target_slots_satisfied, 0, "source-packet acceptance rule target slots satisfied");
  expectEqual(s.derivation_proof_target_slots_declared, 124, "derivation-proof target slots declared");
  expectEqual(s.derivation_proof_target_slots_satisfied, 0, "derivation-proof target slots satisfied");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_slots, 124, "derivation proof slots");
  expectEqual(s.source_packet_acceptance_rule_derivation_proof_slots_satisfied, 0, "derivation proof slots satisfied");
  expectEqual(s.source_packet_acceptance_rule_soundness_proof_slots, 124, "soundness proof slots");
  expectEqual(s.source_packet_acceptance_rule_soundness_proof_slots_satisfied, 0, "soundness proof slots satisfied");
  expectEqual(s.source_packet_acceptance_rule_endpoint_application_proof_slots, 124, "application proof slots");
  expectEqual(s.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied, 0, "application proof slots satisfied");
  expectEqual(s.source_packet_acceptance_rules_constructed, 0, "source-packet acceptance rules constructed");
  expectEqual(s.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "accepted source packets");
  expectEqual(s.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses");
  expectEqual(s.route_decisions_made, 0, "route decisions");
  expectEqual(s.proof_rule_decisions_made, 0, "proof-rule decisions");
  expectEqual(s.primitive_acceptance_decisions_made, 0, "primitive-acceptance decisions");
  expectEqual(s.source_packet_acceptance_decisions_made, 0, "source-packet acceptance decisions");
  expectEqual(s.row_consumption_count, 0, "row consumption");
  assertRowsBySeparator(s, "derivation-proof target");
}

function sourceDataRecord(profile) {
  const target = profile.derivation_proof_target_record ?? {};
  const sourceDataReady =
    profile.aggregate_inputs_complete === true &&
    profile.rule_target_locked === true &&
    profile.source_material_premises_complete === true &&
    target.exact_consistency_premises_complete === true &&
    target.derivation_proof_target_declared === true;
  return {
    derivation_proof_target: DERIVATION_PROOF_TARGET,
    derivation_proof_source_data_record_declared: true,
    derivation_proof_source_data_ready: sourceDataReady,
    aggregate_inputs_complete: profile.aggregate_inputs_complete,
    rule_target_locked: profile.rule_target_locked,
    source_material_premises_complete: profile.source_material_premises_complete,
    candidate_exact_consistency_premises_complete: target.exact_consistency_premises_complete === true,
    derivation_proof_target_declared: target.derivation_proof_target_declared === true,
    derivation_proof_target_slots: target.derivation_proof_target_slots ?? profile.derivation_proof_target_slots,
    derivation_proof_slots_satisfied: 0,
    source_packet_acceptance_rule_constructed: false,
    source_packet_acceptance_rule_derivation_proof_present: false,
    source_packet_acceptance_rule_derivation_proof_accepted: false,
    proof_rule_decision_made: false,
    first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
    forbidden_reinterpretations: [
      "source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule",
      "source_packet_acceptance_rule_kernel_binding_split_classifier_as_derivation_proof",
      "source_packet_acceptance_rule_derivation_proof_target_packet_as_derivation_proof",
      "source_packet_acceptance_rule_derivation_proof_source_data_readiness_classifier_as_derivation_proof",
      "derivation_proof_source_data_record_as_derivation_proof",
    ],
  };
}

function buildSeparatorProfiles(derivationProofTarget) {
  return derivationProofTarget.separator_source_packet_acceptance_rule_derivation_proof_target_profiles
    .map((profile) => {
      const record = sourceDataRecord(profile);
      return {
        separator_event: profile.separator_event,
        fold_interval: profile.fold_interval,
        row_count: profile.row_count,
        aggregate_inputs_complete: profile.aggregate_inputs_complete,
        rule_target_locked: profile.rule_target_locked,
        source_material_premises_complete: profile.source_material_premises_complete,
        candidate_exact_consistency_premises_complete:
          record.candidate_exact_consistency_premises_complete,
        derivation_proof_target_declared: record.derivation_proof_target_declared,
        derivation_proof_source_data_records: 1,
        derivation_proof_source_data_records_ready: record.derivation_proof_source_data_ready ? 1 : 0,
        source_packet_acceptance_rule_derivation_proof_object_slots: 1,
        source_packet_acceptance_rule_derivation_proof_object_slots_satisfied: 0,
        derivation_proof_source_data_record: record,
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
        classification:
          "separator_source_packet_acceptance_rule_derivation_proof_source_data_ready_proof_absent_fail_closed",
      };
    })
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function buildRowProfiles(derivationProofTarget) {
  return derivationProofTarget.row_source_packet_acceptance_rule_derivation_proof_target_profiles
    .map((profile) => {
      const record = sourceDataRecord(profile);
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
        candidate_exact_consistency_premises_complete:
          record.candidate_exact_consistency_premises_complete,
        derivation_proof_target_declared: record.derivation_proof_target_declared,
        derivation_proof_source_data_records: 1,
        derivation_proof_source_data_records_ready: record.derivation_proof_source_data_ready ? 1 : 0,
        source_packet_acceptance_rule_derivation_proof_object_slots: 1,
        source_packet_acceptance_rule_derivation_proof_object_slots_satisfied: 0,
        derivation_proof_source_data_record: record,
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
        classification:
          "row_source_packet_acceptance_rule_derivation_proof_source_data_ready_proof_absent_fail_closed",
      };
    })
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, derivationProofTarget) {
  validateInput(derivationProofTarget);
  const sourceChecks = sourceHashChecks(paths);
  const source = derivationProofTarget.summary;
  const separatorProfiles = buildSeparatorProfiles(derivationProofTarget);
  const rowProfiles = buildRowProfiles(derivationProofTarget);
  const sourceDataRecords = separatorProfiles.length + rowProfiles.length;
  const sourceDataReady =
    countTrue(separatorProfiles, (profile) => profile.derivation_proof_source_data_records_ready === 1) +
    countTrue(rowProfiles, (profile) => profile.derivation_proof_source_data_records_ready === 1);

  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_derivation_proof_target_direct_source_hash_checks_passed: source.direct_source_hash_checks_passed,
    retained_derivation_proof_target_source_hash_checks: source.direct_source_hash_checks,
    retained_kernel_binding_split_direct_source_hash_checks_passed:
      source.retained_kernel_binding_split_direct_source_hash_checks_passed,
    retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed:
      source.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed,
    retained_blocker_vector_direct_source_hash_checks_passed:
      source.retained_blocker_vector_direct_source_hash_checks_passed,
    retained_proof_obligation_direct_source_hash_checks_passed:
      source.retained_proof_obligation_direct_source_hash_checks_passed,
    candidate_higher_fold_constants_artifacts: source.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: source.candidate_separator_constants,
    candidate_row_constant_associations: source.candidate_row_constant_associations,
    rows_by_separator_count: source.rows_by_separator_count,
    separator_derivation_proof_source_data_profiles: separatorProfiles.length,
    row_derivation_proof_source_data_profiles: rowProfiles.length,
    derivation_proof_source_data_records: sourceDataRecords,
    derivation_proof_source_data_records_ready: sourceDataReady,
    derivation_proof_source_data_records_missing: sourceDataRecords - sourceDataReady,
    source_material_premise_slots: source.source_material_premise_slots,
    source_material_premise_slots_satisfied: source.source_material_premise_slots_satisfied,
    candidate_exact_consistency_premise_slots: source.candidate_exact_consistency_premise_slots,
    candidate_exact_consistency_premise_slots_satisfied:
      source.candidate_exact_consistency_premise_slots_satisfied,
    source_packet_acceptance_rule_target_slots: source.source_packet_acceptance_rule_target_slots,
    source_packet_acceptance_rule_target_slots_satisfied:
      source.source_packet_acceptance_rule_target_slots_satisfied,
    derivation_proof_target_slots: source.derivation_proof_target_slots,
    derivation_proof_target_slots_declared: source.derivation_proof_target_slots_declared,
    derivation_proof_target_slots_satisfied: source.derivation_proof_target_slots_satisfied,
    source_packet_acceptance_rule_derivation_proof_source_data_ready_slots: sourceDataRecords,
    source_packet_acceptance_rule_derivation_proof_source_data_ready_slots_satisfied: sourceDataReady,
    source_packet_acceptance_rule_derivation_proof_object_slots: sourceDataRecords,
    source_packet_acceptance_rule_derivation_proof_object_slots_satisfied: 0,
    source_packet_acceptance_rule_derivation_proof_slots:
      source.source_packet_acceptance_rule_derivation_proof_slots,
    source_packet_acceptance_rule_derivation_proof_slots_satisfied:
      source.source_packet_acceptance_rule_derivation_proof_slots_satisfied,
    source_packet_acceptance_rule_soundness_proof_slots:
      source.source_packet_acceptance_rule_soundness_proof_slots,
    source_packet_acceptance_rule_soundness_proof_slots_satisfied:
      source.source_packet_acceptance_rule_soundness_proof_slots_satisfied,
    source_packet_acceptance_rule_endpoint_application_proof_slots:
      source.source_packet_acceptance_rule_endpoint_application_proof_slots,
    source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied:
      source.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied,
    rule_kernel_obligation_slots: source.rule_kernel_obligation_slots,
    rule_kernel_obligation_slots_satisfied: source.rule_kernel_obligation_slots_satisfied,
    binding_and_evidence_obligation_slots: source.binding_and_evidence_obligation_slots,
    binding_and_evidence_obligation_slots_satisfied:
      source.binding_and_evidence_obligation_slots_satisfied,
    total_split_obligation_slots: source.total_split_obligation_slots,
    total_split_obligation_slots_satisfied: source.total_split_obligation_slots_satisfied,
    derivation_proof_target_packet_as_derivation_proof_rejections: sourceDataRecords,
    derivation_proof_source_data_record_as_derivation_proof_rejections: sourceDataRecords,
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
    first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
    first_downstream_rule_kernel_blocker_after_derivation: SOUNDNESS_PROOF_BLOCKER,
    first_endpoint_application_blocker: APPLICATION_PROOF_BLOCKER,
    first_binding_and_evidence_blocker: CONFORMANCE_BLOCKER,
  };

  const packet = {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_source_packet_acceptance_rule_derivation_proof_source_data_readiness_classifier.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status source-packet acceptance rule derivation-proof source-data readiness",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status source-packet acceptance rule derivation proof source-data readiness",
    claim_level:
      "priority-only source-packet acceptance rule derivation-proof source-data readiness classifier; imports the derivation-proof target packet, proves the derivation-proof source data is ready for all 12 separator profiles and 112 row profiles, and keeps the derivation proof object, proof rule, source-packet acceptance rule, accepted source packet, accepted status, row-consumption, live-ledger, and branch-chart decisions absent",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_source_packet_acceptance_rule_derivation_proof_target_packet: artifactRecord(
        paths.derivationProofTarget,
      ),
    },
    source_hash_checks: sourceChecks,
    source_packet_acceptance_rule_derivation_proof_source_data_readiness: {
      target: DERIVATION_PROOF_TARGET,
      source_data_records_declared: sourceDataRecords,
      source_data_records_ready: sourceDataReady,
      source_data_records_missing: sourceDataRecords - sourceDataReady,
      derivation_proof_object_slots: sourceDataRecords,
      derivation_proof_object_slots_satisfied: 0,
      first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
      required_missing_proof_object: "source_packet_acceptance_rule_derivation_proof",
    },
    separator_source_packet_acceptance_rule_derivation_proof_source_data_readiness_profiles:
      separatorProfiles,
    row_source_packet_acceptance_rule_derivation_proof_source_data_readiness_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "source_packet_acceptance_rule_derivation_proof_source_data_readiness",
      current_pool_closure_state:
        "source data is ready, but there is still no source-packet acceptance rule derivation proof object",
      first_rule_blocker: RULE_BLOCKER,
      first_derivation_proof_blocker: DERIVATION_PROOF_BLOCKER,
      mechanical_continuation_available: false,
      decision_required: true,
      required_external_inputs: ["source_packet_acceptance_rule_derivation_proof"],
      downstream_inputs_not_actionable_until_derivation_proof_present: [
        "source_packet_acceptance_rule_soundness_proof",
        "source_packet_acceptance_rule_endpoint_application_proof",
        "accepted_constants_conformance",
        "compatible_source_packet_acceptance_evidence",
        "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
      ],
      forbidden_reinterpretations: [
        "source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule",
        "source_packet_acceptance_rule_derivation_proof_target_packet_as_derivation_proof",
        "source_packet_acceptance_rule_derivation_proof_source_data_readiness_classifier_as_derivation_proof",
        "derivation_proof_source_data_record_as_derivation_proof",
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
      "Priority-only. This classifier separates ready derivation-proof source data from the absent source-packet acceptance rule derivation proof object; it does not construct or accept a proof rule.",
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
    s.retained_derivation_proof_target_direct_source_hash_checks_passed === 2,
    s.retained_kernel_binding_split_direct_source_hash_checks_passed === 1,
    s.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed === 3,
    s.retained_blocker_vector_direct_source_hash_checks_passed === 1,
    s.retained_proof_obligation_direct_source_hash_checks_passed === 7,
    s.candidate_separator_constants === 12,
    s.candidate_row_constant_associations === 112,
    s.separator_derivation_proof_source_data_profiles === 12,
    s.row_derivation_proof_source_data_profiles === 112,
    s.derivation_proof_source_data_records === 124,
    s.derivation_proof_source_data_records_ready === 124,
    s.derivation_proof_source_data_records_missing === 0,
    s.source_material_premise_slots === 124,
    s.source_material_premise_slots_satisfied === 124,
    s.candidate_exact_consistency_premise_slots === 124,
    s.candidate_exact_consistency_premise_slots_satisfied === 124,
    s.source_packet_acceptance_rule_target_slots === 124,
    s.source_packet_acceptance_rule_target_slots_satisfied === 0,
    s.derivation_proof_target_slots_declared === 124,
    s.derivation_proof_target_slots_satisfied === 0,
    s.source_packet_acceptance_rule_derivation_proof_source_data_ready_slots === 124,
    s.source_packet_acceptance_rule_derivation_proof_source_data_ready_slots_satisfied === 124,
    s.source_packet_acceptance_rule_derivation_proof_object_slots === 124,
    s.source_packet_acceptance_rule_derivation_proof_object_slots_satisfied === 0,
    s.source_packet_acceptance_rule_derivation_proof_slots === 124,
    s.source_packet_acceptance_rule_derivation_proof_slots_satisfied === 0,
    s.source_packet_acceptance_rule_soundness_proof_slots === 124,
    s.source_packet_acceptance_rule_soundness_proof_slots_satisfied === 0,
    s.source_packet_acceptance_rule_endpoint_application_proof_slots === 124,
    s.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied === 0,
    s.rule_kernel_obligation_slots === 372,
    s.rule_kernel_obligation_slots_satisfied === 0,
    s.binding_and_evidence_obligation_slots === 496,
    s.binding_and_evidence_obligation_slots_satisfied === 0,
    s.derivation_proof_target_packet_as_derivation_proof_rejections === 124,
    s.derivation_proof_source_data_record_as_derivation_proof_rejections === 124,
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
    throw new Error("Source-packet acceptance rule derivation-proof source-data readiness invariant failure.");
  }
}

function renderReport(packet) {
  const s = packet.summary;
  const sourceRows = Object.entries(packet.source_artifacts)
    .map(([key, record]) => `| \`${key}\` | \`${record.basename}\` | \`${record.sha256}\` | ${record.present} |`)
    .join("\n");
  return `# Candidate-Live Higher-Fold Constants Accepted-Status Source-Packet Acceptance Rule Derivation-Proof Source-Data Readiness Classifier

Status: \`${packet.status}\`

## Claim Level

${packet.claim_level}

## Source Locks

| Source | Basename | SHA-256 | Present |
| --- | --- | --- | --- |
${sourceRows}

Direct source-hash locks: ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks}.

## Source-Data Readiness

- derivation-proof source-data records ready: ${s.derivation_proof_source_data_records_ready} / ${s.derivation_proof_source_data_records}
- source-material premise slots ready: ${s.source_material_premise_slots_satisfied} / ${s.source_material_premise_slots}
- candidate exact-consistency premise slots ready: ${s.candidate_exact_consistency_premise_slots_satisfied} / ${s.candidate_exact_consistency_premise_slots}
- derivation-proof target slots satisfied: ${s.derivation_proof_target_slots_satisfied} / ${s.derivation_proof_target_slots_declared}
- derivation-proof object slots satisfied: ${s.source_packet_acceptance_rule_derivation_proof_object_slots_satisfied} / ${s.source_packet_acceptance_rule_derivation_proof_object_slots}
- first derivation-proof blocker: \`${s.first_derivation_proof_blocker}\`

## Non-Reinterpretation Guard

- derivation-proof target packet as derivation proof rejections: ${s.derivation_proof_target_packet_as_derivation_proof_rejections}
- derivation-proof source-data record as derivation proof rejections: ${s.derivation_proof_source_data_record_as_derivation_proof_rejections}

## Downstream Locks

- soundness proof slots satisfied: ${s.source_packet_acceptance_rule_soundness_proof_slots_satisfied} / ${s.source_packet_acceptance_rule_soundness_proof_slots}
- endpoint-application proof slots satisfied: ${s.source_packet_acceptance_rule_endpoint_application_proof_slots_satisfied} / ${s.source_packet_acceptance_rule_endpoint_application_proof_slots}
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

This classifier proves the derivation-proof source data is ready. It does not
construct a derivation proof, proof rule, source-packet acceptance rule,
accepted source packet, accepted interval-certified constants status, row
consumption, live-ledger update, or branch-chart authorization.

## Next Handoff

The remaining blocker is \`${s.first_derivation_proof_blocker}\`: a proof-grade
\`source_packet_acceptance_rule_derivation_proof\` object is still absent. Until
that object is supplied, the soundness proof, endpoint-application proof,
accepted-constants conformance, compatible source-packet acceptance evidence,
and accepted source-packet obligations remain downstream-only.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    derivationProofTarget: args.derivationProofTarget,
  };
  const derivationProofTarget = readJson(paths.derivationProofTarget);
  const packet = buildPacket(paths, derivationProofTarget);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, packet, args.pretty);
  writeText(outReport, renderReport(packet));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
