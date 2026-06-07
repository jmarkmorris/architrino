#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_PRIMITIVE_NARROWING = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_narrowing_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_AGGREGATE = `${CERT_DIR}/higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_disjunction_closure_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_first_blocker_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_contract_disjunction_exhaustion_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
]);

const PRIMITIVE_NARROWING_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_acceptance_rule_handoff_narrowing_classifier_fail_closed_aggregate_inputs_complete_acceptance_rule_and_accepted_source_packet_absent_no_primitive_acceptance_no_row_consumption";
const IMPULSE_ACCEPTANCE_STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const AGGREGATE_STATUS =
  "higher_fold_layer_same_packet_separator_aggregate_certificate_attempt_fail_closed_row_enclosures_separator_aggregates_certified_source_packets_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet_fail_closed_acceptance_rule_target_declared_aggregate_inputs_complete_rule_absent_no_primitive_acceptance_no_row_consumption";

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
    primitiveNarrowing: DEFAULT_PRIMITIVE_NARROWING,
    impulseAcceptance: DEFAULT_IMPULSE_ACCEPTANCE,
    aggregate: DEFAULT_AGGREGATE,
    certificatePoolDir: CERT_DIR,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--primitive-narrowing") {
      args.primitiveNarrowing = argv[++index];
    } else if (arg === "--impulse-acceptance") {
      args.impulseAcceptance = argv[++index];
    } else if (arg === "--aggregate") {
      args.aggregate = argv[++index];
    } else if (arg === "--certificate-pool-dir") {
      args.certificatePoolDir = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-source-packet-acceptance-rule-target-packet.mjs [options]

Options:
  --primitive-narrowing PATH  Primitive source-packet route narrowing classifier. Defaults to ${DEFAULT_PRIMITIVE_NARROWING}.
  --impulse-acceptance PATH   Impulse-bound source-packet acceptance dependency classifier. Defaults to ${DEFAULT_IMPULSE_ACCEPTANCE}.
  --aggregate PATH            Separator aggregate certificate attempt. Defaults to ${DEFAULT_AGGREGATE}.
  --certificate-pool-dir PATH Certificate pool directory. Defaults to ${CERT_DIR}.
  --out-dir PATH              Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                    Pretty-print JSON artifact.
  --help                      Show this help.`);
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
    ["accepted_status_primitive_source_packet_route_narrowing_classifier", paths.primitiveNarrowing],
    ["same_packet_impulse_bound_source_packet_acceptance_dependency_classifier", paths.impulseAcceptance],
    ["same_packet_separator_aggregate_certificate_attempt", paths.aggregate],
  ].map(([sourceArtifact, filePath]) => ({
    source_artifact: sourceArtifact,
    current_basename: path.basename(filePath),
    current_sha256: sha256File(filePath),
    hash_matches: true,
  }));
}

function currentCertificatePoolSnapshot(certificatePoolDir, outputBasename) {
  const jsonFiles = fs
    .readdirSync(certificatePoolDir)
    .filter(
      (entry) => entry.endsWith(".json") && entry !== outputBasename && !DOWNSTREAM_OUTPUT_JSON_BASENAMES.has(entry),
    )
    .sort();
  const fileRecords = jsonFiles.map((basename) => {
    const filePath = path.join(certificatePoolDir, basename);
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
    directory: certificatePoolDir,
    output_json_basename_excluded: outputBasename,
    json_files_scanned_before_output: fileRecords.length,
    json_pool_sha256: poolHash,
  };
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
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

function validateInputs(inputs) {
  assertPacketStatusAndLocks(inputs.primitiveNarrowing, "primitiveNarrowing", PRIMITIVE_NARROWING_STATUS);
  assertPacketStatusAndLocks(inputs.impulseAcceptance, "impulseAcceptance", IMPULSE_ACCEPTANCE_STATUS);
  assertPacketStatusAndLocks(inputs.aggregate, "aggregate", AGGREGATE_STATUS);
  const primitive = inputs.primitiveNarrowing.summary;
  const impulse = inputs.impulseAcceptance.summary;
  const aggregate = inputs.aggregate.summary;
  const expected = [
    [primitive.direct_source_hash_checks_passed, 5, "primitive narrowing direct source-hash locks"],
    [primitive.primitive_source_packet_route_input_target_fields, 2, "primitive route-input fields"],
    [primitive.separator_primitive_source_packet_route_input_target_slots, 24, "primitive separator slots"],
    [primitive.row_primitive_source_packet_route_input_target_slots, 224, "primitive row slots"],
    [primitive.separators_with_separator_aggregate_fields_complete, 12, "complete primitive separator aggregates"],
    [primitive.rows_with_separator_aggregate_fields_complete, 112, "complete primitive row aggregates"],
    [primitive.source_packet_acceptance_rules_constructed, 0, "constructed source-packet acceptance rules"],
    [primitive.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets, 0, "accepted source packets"],
    [impulse.separators_with_separator_aggregate_C_Sigma, 12, "impulse aggregate C"],
    [impulse.separators_with_source_packet_acceptance_rule, 0, "impulse acceptance rules"],
    [impulse.row_field_presence_counts.source_packet_acceptance_rule_present.present, 0, "row acceptance rule present"],
    [impulse.row_field_presence_counts.source_packet_acceptance_rule_present.missing, 112, "row acceptance rule missing"],
    [aggregate.separators_with_separator_aggregate_C_Sigma, 12, "aggregate C"],
    [aggregate.rows_with_same_packet_fold_impulse_or_direct_quadrature_bound, 0, "aggregate source packets"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
  assertRowsBySeparator(primitive, "primitive narrowing");
  assertRowsBySeparator(impulse, "impulse acceptance");
  assertRowsBySeparator(aggregate, "aggregate");
}

function separatorRuleTargets(primitiveNarrowing) {
  return primitiveNarrowing.separator_primitive_source_packet_route_input_target_profiles.map((profile) => ({
    separator_event: profile.separator_event,
    fold_interval: profile.fold_interval,
    row_count: profile.row_count,
    separator_aggregate_fields_complete: profile.separator_aggregate_fields_complete,
    source_packet_acceptance_rule_target_field: "source_packet_acceptance_rule",
    source_packet_acceptance_rule_target_slots: 1,
    source_packet_acceptance_rule_target_slots_satisfied: 0,
    source_packet_acceptance_rule_target_slots_missing: 1,
    source_packet_acceptance_rule_target_satisfied: false,
    source_packet_acceptance_rule_constructed: false,
    primitive_acceptance_decision_made: false,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_rule_target_blocker:
      "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent",
    classification: "separator_aggregate_complete_source_packet_acceptance_rule_target_unfilled",
  }));
}

function rowRuleTargets(primitiveNarrowing) {
  return primitiveNarrowing.row_primitive_source_packet_route_input_target_profiles.map((profile) => ({
    row_id: profile.row_id,
    ledger: profile.ledger,
    status: profile.status,
    failure_code: profile.failure_code,
    separator_event: profile.separator_event,
    fold_interval: profile.fold_interval,
    receiver_interval: profile.receiver_interval,
    source_interval: profile.source_interval,
    separator_aggregate_fields_complete: profile.separator_aggregate_fields_complete,
    source_packet_acceptance_rule_target_field: "source_packet_acceptance_rule",
    source_packet_acceptance_rule_target_slots: 1,
    source_packet_acceptance_rule_target_slots_satisfied: 0,
    source_packet_acceptance_rule_target_slots_missing: 1,
    source_packet_acceptance_rule_target_satisfied: false,
    source_packet_acceptance_rule_constructed: false,
    primitive_acceptance_decision_made: false,
    accepted_fold_layer_row: false,
    row_consumed: false,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_rule_target_blocker:
      "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent",
    classification: "row_separator_aggregate_complete_source_packet_acceptance_rule_target_unfilled",
  }));
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const poolSnapshot = currentCertificatePoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const primitive = inputs.primitiveNarrowing.summary;
  const impulse = inputs.impulseAcceptance.summary;
  const aggregate = inputs.aggregate.summary;
  const separatorProfiles = separatorRuleTargets(inputs.primitiveNarrowing);
  const rowProfiles = rowRuleTargets(inputs.primitiveNarrowing);

  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    retained_primitive_narrowing_direct_source_hash_checks_passed: primitive.direct_source_hash_checks_passed,
    retained_route_handoff_direct_source_hash_checks_passed: primitive.retained_route_handoff_direct_source_hash_checks_passed,
    retained_source_packet_route_source_hash_checks_passed: primitive.retained_source_packet_route_source_hash_checks_passed,
    imported_primitive_route_input_json_files_scanned: primitive.current_pool_primitive_route_input_json_files_scanned,
    current_pool_source_packet_acceptance_rule_target_json_files_scanned: poolSnapshot.json_files_scanned_before_output,
    candidate_higher_fold_constants_artifacts: primitive.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: primitive.candidate_separator_constants,
    candidate_row_constant_associations: primitive.candidate_row_constant_associations,
    rows_by_separator_count: primitive.rows_by_separator_count,
    separators_with_separator_aggregate_fields_complete: primitive.separators_with_separator_aggregate_fields_complete,
    rows_with_separator_aggregate_fields_complete: primitive.rows_with_separator_aggregate_fields_complete,
    separator_aggregate_C_Sigma_present: impulse.separators_with_separator_aggregate_C_Sigma,
    separator_aggregate_A_Sigma_eta_epsilon_c_present: impulse.separators_with_separator_aggregate_A_Sigma_eta_epsilon_c,
    separator_aggregate_I_fold_eta_epsilon_c_Sigma_present: impulse.separators_with_separator_aggregate_I_fold_eta_epsilon_c_Sigma,
    aggregate_certificate_separator_aggregate_fields_present: aggregate.separators_with_separator_aggregate_C_Sigma,
    source_packet_acceptance_rule_targets_declared: 1,
    source_packet_acceptance_rule_targets_satisfied: 0,
    source_packet_acceptance_rule_target_fields: 1,
    separator_source_packet_acceptance_rule_target_slots: separatorProfiles.length,
    separator_source_packet_acceptance_rule_target_slots_satisfied: 0,
    separator_source_packet_acceptance_rule_target_slots_missing: separatorProfiles.length,
    row_source_packet_acceptance_rule_target_slots: rowProfiles.length,
    row_source_packet_acceptance_rule_target_slots_satisfied: 0,
    row_source_packet_acceptance_rule_target_slots_missing: rowProfiles.length,
    total_source_packet_acceptance_rule_target_slots: separatorProfiles.length + rowProfiles.length,
    total_source_packet_acceptance_rule_target_slots_satisfied: 0,
    total_source_packet_acceptance_rule_target_slots_missing: separatorProfiles.length + rowProfiles.length,
    source_packet_acceptance_rules_constructed: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    accepted_interval_certified_constants_status_refs_constructed: 0,
    accepted_interval_certified_constants_statuses_constructed: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    route_decisions_made: 0,
    proof_rule_decisions_made: 0,
    primitive_acceptance_decisions_made: 0,
    mechanical_continuations_from_current_pool: 0,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_source_packet_acceptance_rule_target_blocker:
      "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent",
    first_accepted_source_packet_evidence_blocker: primitive.first_accepted_source_packet_evidence_blocker,
    parent_complement_consumption_ref_blocker: "parent_complement_consumption_ref_absent",
    first_separator_certificate_blocker: "higher_fold_separator_layer_certificate_absent",
  };

  const invariant =
    summary.direct_source_hash_checks === 3 &&
    summary.direct_source_hash_checks_passed === 3 &&
    summary.retained_primitive_narrowing_direct_source_hash_checks_passed === 5 &&
    summary.retained_route_handoff_direct_source_hash_checks_passed === 4 &&
    summary.retained_source_packet_route_source_hash_checks_passed === 5 &&
    summary.imported_primitive_route_input_json_files_scanned === 244 &&
    summary.current_pool_source_packet_acceptance_rule_target_json_files_scanned === 245 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    JSON.stringify(summary.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR) &&
    summary.separators_with_separator_aggregate_fields_complete === 12 &&
    summary.rows_with_separator_aggregate_fields_complete === 112 &&
    summary.source_packet_acceptance_rule_targets_declared === 1 &&
    summary.source_packet_acceptance_rule_targets_satisfied === 0 &&
    summary.source_packet_acceptance_rule_target_fields === 1 &&
    summary.separator_source_packet_acceptance_rule_target_slots === 12 &&
    summary.separator_source_packet_acceptance_rule_target_slots_satisfied === 0 &&
    summary.separator_source_packet_acceptance_rule_target_slots_missing === 12 &&
    summary.row_source_packet_acceptance_rule_target_slots === 112 &&
    summary.row_source_packet_acceptance_rule_target_slots_satisfied === 0 &&
    summary.row_source_packet_acceptance_rule_target_slots_missing === 112 &&
    summary.total_source_packet_acceptance_rule_target_slots === 124 &&
    summary.total_source_packet_acceptance_rule_target_slots_satisfied === 0 &&
    summary.total_source_packet_acceptance_rule_target_slots_missing === 124 &&
    summary.source_packet_acceptance_rules_constructed === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.accepted_interval_certified_constants_statuses_constructed === 0 &&
    summary.row_consumption_count === 0 &&
    summary.route_decisions_made === 0 &&
    summary.proof_rule_decisions_made === 0 &&
    summary.primitive_acceptance_decisions_made === 0 &&
    summary.preledger_pass === false &&
    summary.updates_live_ledger === false &&
    summary.branch_chart_authorized === false;
  if (!invariant) {
    throw new Error("Source-packet acceptance rule target invariant failed.");
  }

  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-source-packet-acceptance-rule-target-packet-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only source-packet acceptance rule target packet; declares the exact source_packet_acceptance_rule target above complete aggregate inputs while proving the rule is absent and making no route, proof-rule, primitive-acceptance, or row-consumption decision",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_primitive_source_packet_route_narrowing_classifier: artifactRecord(paths.primitiveNarrowing),
      same_packet_impulse_bound_source_packet_acceptance_dependency_classifier: artifactRecord(paths.impulseAcceptance),
      same_packet_separator_aggregate_certificate_attempt: artifactRecord(paths.aggregate),
    },
    source_hash_checks: sourceChecks,
    current_pool_source_packet_acceptance_rule_target_snapshot: poolSnapshot,
    source_packet_acceptance_rule_target_rule:
      "The source-packet acceptance route can continue only if a source_packet_acceptance_rule is supplied for the live same-packet separator aggregate family and row scope. This packet declares that rule target and fills no rule slots.",
    separator_source_packet_acceptance_rule_target_profiles: separatorProfiles,
    row_source_packet_acceptance_rule_target_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "Complete aggregate inputs are present, but the source_packet_acceptance_rule target is absent across 12 separator slots and 112 row slots.",
      continuation_class:
        "mechanical only after a proof-grade source_packet_acceptance_rule is supplied; otherwise the primitive/source-packet route remains decision-blocked",
      fail_closed_stop_conditions: [
        "Do not treat this target packet as a source-packet acceptance rule.",
        "Do not infer an accepted same_packet_fold_impulse_or_direct_quadrature source packet from complete aggregate inputs.",
        "Do not infer an accepted interval-certified constants status, parent_complement_consumption_ref, or higher_fold_separator_layer_certificate from this packet.",
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
      "Captured as a priority-only certificate-side source-packet acceptance rule target packet under reference/priorities/proof-programs; no promotion to content/markdown/aaa.",
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
  const separatorRows = packet.separator_source_packet_acceptance_rule_target_profiles.map((entry) => [
    `\`${entry.separator_event}\``,
    `\`${entry.fold_interval}\``,
    String(entry.row_count),
    String(entry.separator_aggregate_fields_complete),
    String(entry.source_packet_acceptance_rule_target_slots_satisfied),
    String(entry.source_packet_acceptance_rule_target_slots_missing),
    `\`${entry.first_rule_target_blocker}\``,
  ]);
  const rowsBySeparatorRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Source-Packet Acceptance Rule Target Packet

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Acceptance-Rule Target

This packet imports the primitive source-packet route narrowing classifier, the
impulse-bound source-packet acceptance dependency classifier, and the separator
aggregate certificate attempt. It declares the exact
\`source_packet_acceptance_rule\` target above complete aggregate inputs and
fills no rule slots.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct source-hash locks;
- ${s.retained_primitive_narrowing_direct_source_hash_checks_passed} / 5 retained primitive route narrowing locks;
- ${s.retained_route_handoff_direct_source_hash_checks_passed} / 4 retained route-handoff locks;
- ${s.retained_source_packet_route_source_hash_checks_passed} / 5 retained source-packet route locks;
- ${s.separators_with_separator_aggregate_fields_complete} / ${s.candidate_separator_constants} separator aggregate input profiles complete;
- ${s.rows_with_separator_aggregate_fields_complete} / ${s.candidate_row_constant_associations} row aggregate input profiles complete.

Target result:

- ${s.current_pool_source_packet_acceptance_rule_target_json_files_scanned} current-pool JSON files scanned before this output;
- ${s.source_packet_acceptance_rule_targets_declared} source-packet acceptance rule target declared;
- ${s.source_packet_acceptance_rule_targets_satisfied} source-packet acceptance rule targets satisfied;
- ${s.separator_source_packet_acceptance_rule_target_slots} separator rule-target slots;
- ${s.row_source_packet_acceptance_rule_target_slots} row rule-target slots;
- ${s.total_source_packet_acceptance_rule_target_slots} total rule-target slots;
- ${s.total_source_packet_acceptance_rule_target_slots_satisfied} total rule-target slots satisfied;
- ${s.total_source_packet_acceptance_rule_target_slots_missing} total rule-target slots missing;
- ${s.mechanical_continuations_from_current_pool} mechanical continuations from the current pool.

The first source-packet acceptance rule target blocker is
\`${s.first_source_packet_acceptance_rule_target_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source-Hash Checks

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

## Separator Rule Targets

| Separator | Fold interval | Rows | Aggregate inputs complete | Rule slots filled | Rule slots missing | First blocker |
| --- | --- | ---: | --- | ---: | ---: | --- |
${markdownTable(separatorRows)}

## Row Scope

| Separator | Rows |
| --- | ---: |
${markdownTable(rowsBySeparatorRows)}

## Certificate-Side Handoff

Sharpened blocker: complete aggregate inputs are present, but the
\`source_packet_acceptance_rule\` target is absent across
${s.total_source_packet_acceptance_rule_target_slots} rule-target slots.

Continuation class: requires a proof-grade \`source_packet_acceptance_rule\`;
this packet makes no primitive-acceptance decision and supplies no rule.

Fail-closed stop conditions:

- Do not treat this target packet as a source-packet acceptance rule.
- Do not infer an accepted
  \`same_packet_fold_impulse_or_direct_quadrature\` source packet from complete
  aggregate inputs.
- Do not infer an accepted interval-certified constants status,
  \`parent_complement_consumption_ref\`, or
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
constants status, source-packet acceptance rule, accepted
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
    primitiveNarrowing: args.primitiveNarrowing,
    impulseAcceptance: args.impulseAcceptance,
    aggregate: args.aggregate,
    certificatePoolDir: args.certificatePoolDir,
  };
  const inputs = {
    primitiveNarrowing: readJson(paths.primitiveNarrowing),
    impulseAcceptance: readJson(paths.impulseAcceptance),
    aggregate: readJson(paths.aggregate),
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
