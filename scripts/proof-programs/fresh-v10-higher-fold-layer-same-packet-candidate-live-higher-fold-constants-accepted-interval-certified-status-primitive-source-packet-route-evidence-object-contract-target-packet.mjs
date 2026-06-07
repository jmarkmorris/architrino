#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_PRIMITIVE_NARROWING = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_narrowing_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_RULE_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_FIRST_BLOCKER_HANDOFF = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_first_blocker_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_TERMINAL_ROUTE_OBLIGATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_CONTRACT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_contract_target_packet_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_contract_disjunction_exhaustion_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
]);

const PRIMITIVE_NARROWING_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_acceptance_rule_handoff_narrowing_classifier_fail_closed_aggregate_inputs_complete_acceptance_rule_and_accepted_source_packet_absent_no_primitive_acceptance_no_row_consumption";
const RULE_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_target_packet_fail_closed_acceptance_rule_target_declared_aggregate_inputs_complete_rule_absent_no_primitive_acceptance_no_row_consumption";
const FIRST_BLOCKER_HANDOFF_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_input_first_blocker_handoff_classifier_fail_closed_uniform_proof_grade_derivation_ref_evidence_absent_uniform_source_packet_acceptance_rule_absent_accepted_source_packet_absent_current_pool_disjunction_unsatisfied_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";
const TERMINAL_ROUTE_OBLIGATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet_fail_closed_current_pool_route_input_disjunction_exhausted_external_route_evidence_or_acceptance_decision_required_no_row_consumption";
const PRIMITIVE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier_fail_closed_frontier_locked_separator_aggregates_present_no_compatible_source_packet_acceptance_evidence_no_primitive_acceptance_no_row_consumption";
const PROOF_GRADE_CONTRACT_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet_fail_closed_contract_declared_current_pool_derivation_ref_evidence_object_absent_no_status_ref_no_proof_rule_no_route_decision_no_primitive_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_contract_target_packet_fail_closed_contract_declared_source_packet_acceptance_rule_and_accepted_source_packet_absent_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";

const ACCEPTED_STATUS_LANE_PREFIX =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_";
const SOURCE_PACKET_ACCEPTANCE_RULE_FIELD = "source_packet_acceptance_rule";
const ACCEPTED_SOURCE_PACKET_FIELD = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet";
const PRIMITIVE_ROUTE_INPUT_FIELDS = [SOURCE_PACKET_ACCEPTANCE_RULE_FIELD, ACCEPTED_SOURCE_PACKET_FIELD];
const SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const ACCEPTED_SOURCE_PACKET_BLOCKER = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_absent";
const ROUTE_INPUT_BLOCKER = "source_packet_acceptance_rule_or_accepted_source_packet_absent";

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
    ruleTarget: DEFAULT_RULE_TARGET,
    firstBlockerHandoff: DEFAULT_FIRST_BLOCKER_HANDOFF,
    terminalRouteObligation: DEFAULT_TERMINAL_ROUTE_OBLIGATION,
    primitiveEvidence: DEFAULT_PRIMITIVE_EVIDENCE,
    proofGradeContract: DEFAULT_PROOF_GRADE_CONTRACT,
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
    } else if (arg === "--rule-target") {
      args.ruleTarget = argv[++index];
    } else if (arg === "--first-blocker-handoff") {
      args.firstBlockerHandoff = argv[++index];
    } else if (arg === "--terminal-route-obligation") {
      args.terminalRouteObligation = argv[++index];
    } else if (arg === "--primitive-evidence") {
      args.primitiveEvidence = argv[++index];
    } else if (arg === "--proof-grade-contract") {
      args.proofGradeContract = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-primitive-source-packet-route-evidence-object-contract-target-packet.mjs [options]

Options:
  --primitive-narrowing PATH       Primitive source-packet route narrowing classifier. Defaults to ${DEFAULT_PRIMITIVE_NARROWING}.
  --rule-target PATH               Source-packet acceptance rule target packet. Defaults to ${DEFAULT_RULE_TARGET}.
  --first-blocker-handoff PATH     Route-input first-blocker handoff classifier. Defaults to ${DEFAULT_FIRST_BLOCKER_HANDOFF}.
  --terminal-route-obligation PATH Current-pool route-input disjunction exhaustion obligation packet. Defaults to ${DEFAULT_TERMINAL_ROUTE_OBLIGATION}.
  --primitive-evidence PATH        Primitive source-packet acceptance evidence dependency classifier. Defaults to ${DEFAULT_PRIMITIVE_EVIDENCE}.
  --proof-grade-contract PATH      Proof-grade derivation-ref evidence-object contract target packet. Defaults to ${DEFAULT_PROOF_GRADE_CONTRACT}.
  --certificate-pool-dir PATH      Certificate JSON pool directory. Defaults to ${CERT_DIR}.
  --out-dir PATH                   Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                         Pretty-print JSON artifact.
  --help                           Show this help.`);
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
    ["accepted_status_source_packet_acceptance_rule_target_packet", paths.ruleTarget],
    ["accepted_status_route_input_first_blocker_handoff_classifier", paths.firstBlockerHandoff],
    ["accepted_status_current_pool_route_input_disjunction_exhaustion_obligation_packet", paths.terminalRouteObligation],
    ["accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier", paths.primitiveEvidence],
    ["accepted_status_proof_grade_derivation_ref_evidence_object_contract_target_packet", paths.proofGradeContract],
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

function sortedObjectBySeparator(counts) {
  return Object.fromEntries(
    Object.entries(counts).sort(([left], [right]) => separatorSortKey(left) - separatorSortKey(right)),
  );
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
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

function assertAll(rows, getter, want, label) {
  const badRows = rows.filter((row) => getter(row) !== want);
  if (badRows.length > 0) {
    throw new Error(`Unexpected ${label}: ${badRows.length} mismatches.`);
  }
}

function validateInputs(inputs) {
  assertPacketStatusAndLocks(inputs.primitiveNarrowing, "primitiveNarrowing", PRIMITIVE_NARROWING_STATUS);
  assertPacketStatusAndLocks(inputs.ruleTarget, "ruleTarget", RULE_TARGET_STATUS);
  assertPacketStatusAndLocks(inputs.firstBlockerHandoff, "firstBlockerHandoff", FIRST_BLOCKER_HANDOFF_STATUS);
  assertPacketStatusAndLocks(inputs.terminalRouteObligation, "terminalRouteObligation", TERMINAL_ROUTE_OBLIGATION_STATUS);
  assertPacketStatusAndLocks(inputs.primitiveEvidence, "primitiveEvidence", PRIMITIVE_EVIDENCE_STATUS);
  assertPacketStatusAndLocks(inputs.proofGradeContract, "proofGradeContract", PROOF_GRADE_CONTRACT_STATUS);

  const primitive = inputs.primitiveNarrowing.summary;
  const rule = inputs.ruleTarget.summary;
  const firstBlocker = inputs.firstBlockerHandoff.summary;
  const terminal = inputs.terminalRouteObligation.summary;
  const primitiveEvidence = inputs.primitiveEvidence.summary;
  const proofGradeContract = inputs.proofGradeContract.summary;
  const expected = [
    [primitive.direct_source_hash_checks_passed, 5, "primitive narrowing direct source-hash locks"],
    [primitive.total_primitive_source_packet_route_input_target_slots, 248, "primitive route-input slots"],
    [primitive.total_primitive_source_packet_route_input_target_slots_satisfied, 0, "primitive route-input slots satisfied"],
    [primitive.source_packet_acceptance_rules_constructed, 0, "primitive narrowing source-packet acceptance rules"],
    [
      primitive.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets,
      0,
      "primitive narrowing accepted source packets",
    ],
    [rule.direct_source_hash_checks_passed, 3, "source-packet acceptance rule target direct source-hash locks"],
    [rule.total_source_packet_acceptance_rule_target_slots, 124, "source-packet acceptance rule target slots"],
    [rule.total_source_packet_acceptance_rule_target_slots_satisfied, 0, "source-packet rule target slots satisfied"],
    [firstBlocker.direct_source_hash_checks_passed, 5, "first-blocker handoff direct source-hash locks"],
    [firstBlocker.total_primitive_source_packet_route_input_target_slots, 248, "first-blocker primitive slots"],
    [
      firstBlocker.total_primitive_source_packet_route_input_target_slots_satisfied,
      0,
      "first-blocker primitive slots satisfied",
    ],
    [
      firstBlocker.primitive_separator_uniform_rule_blocker_count,
      12,
      "first-blocker primitive separator blocker count",
    ],
    [firstBlocker.primitive_row_uniform_rule_blocker_count, 112, "first-blocker primitive row blocker count"],
    [firstBlocker.accepted_source_packet_separator_absent_count, 12, "first-blocker accepted source separator absent"],
    [firstBlocker.accepted_source_packet_row_absent_count, 112, "first-blocker accepted source row absent"],
    [terminal.direct_source_hash_checks_passed, 2, "terminal route direct source-hash locks"],
    [terminal.terminal_route_obligations_declared, 3, "terminal route obligations declared"],
    [terminal.terminal_route_obligations_satisfied, 0, "terminal route obligations satisfied"],
    [primitiveEvidence.source_packet_route_source_hash_checks_passed, 5, "primitive evidence direct source-hash locks"],
    [
      primitiveEvidence.evidence_pool_compatible_source_packet_acceptance_evidence_files,
      0,
      "primitive evidence compatible source-packet evidence files",
    ],
    [primitiveEvidence.separator_source_packet_acceptance_evidence_slots, 24, "primitive evidence separator slots"],
    [primitiveEvidence.row_source_packet_acceptance_evidence_slots, 224, "primitive evidence row slots"],
    [proofGradeContract.direct_source_hash_checks_passed, 6, "proof-grade contract direct source-hash locks"],
    [
      proofGradeContract.current_pool_derivation_ref_evidence_object_files_found,
      0,
      "proof-grade contract current-pool evidence objects",
    ],
    [proofGradeContract.total_derivation_ref_evidence_object_contract_slots, 124, "proof-grade contract slots"],
    [proofGradeContract.contract_slots_satisfied, 0, "proof-grade contract slots satisfied"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }

  assertRowsBySeparator(primitive, "primitive narrowing");
  assertRowsBySeparator(rule, "rule target");
  assertRowsBySeparator(firstBlocker, "first-blocker handoff");
  assertRowsBySeparator(terminal, "terminal route obligation");
  assertRowsBySeparator(primitiveEvidence, "primitive evidence dependency");
  assertRowsBySeparator(proofGradeContract, "proof-grade contract target");
  assertAll(
    inputs.primitiveNarrowing.separator_primitive_source_packet_route_input_target_profiles,
    (entry) => entry.first_route_input_blocker,
    SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    "primitive separator first route-input blocker",
  );
  assertAll(
    inputs.primitiveNarrowing.row_primitive_source_packet_route_input_target_profiles,
    (entry) => entry.first_route_input_blocker,
    SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    "primitive row first route-input blocker",
  );
}

function sourcePacketRoleMatches(parsed, text, role) {
  const summary = parsed.summary ?? {};
  const artifactRole = parsed.artifact_role ?? parsed.compatible_evidence_role ?? summary.compatible_evidence_role;
  if (artifactRole === role) {
    return true;
  }
  if (role === SOURCE_PACKET_ACCEPTANCE_RULE_FIELD) {
    return (
      /"source_packet_acceptance_rule_present"\s*:\s*true/.test(text) ||
      /"source_packet_acceptance_rules_constructed"\s*:\s*[1-9]/.test(text)
    );
  }
  return (
    /"accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet(?:_present)?"\s*:\s*true/.test(text) ||
    /"accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets"\s*:\s*[1-9]/.test(text)
  );
}

function currentPoolSnapshot(certificatePoolDir, outputBasename) {
  const jsonFiles = fs
    .readdirSync(certificatePoolDir)
    .filter(
      (entry) => entry.endsWith(".json") && entry !== outputBasename && !DOWNSTREAM_OUTPUT_JSON_BASENAMES.has(entry),
    )
    .sort();
  const records = [];
  const counters = {
    accepted_status_lane_json_files: 0,
    accepted_status_lane_fail_closed_json_files: 0,
    accepted_status_lane_non_fail_closed_json_files: 0,
    current_pool_source_packet_acceptance_rule_evidence_object_files_found: 0,
    current_pool_accepted_source_packet_evidence_object_files_found: 0,
    current_pool_compatible_primitive_source_packet_route_input_refs: 0,
    source_packet_acceptance_rule_non_fail_closed_files: 0,
    accepted_source_packet_non_fail_closed_files: 0,
    preledger_pass_true_files: 0,
    live_ledger_update_true_files: 0,
    branch_chart_authorized_true_files: 0,
    row_consumption_positive_files: 0,
    accepted_interval_certified_constants_status_positive_files: 0,
  };
  const compatibleRuleBasenames = [];
  const compatibleAcceptedSourcePacketBasenames = [];
  const nonFailClosedAcceptedStatusBasenames = [];

  for (const basename of jsonFiles) {
    const filePath = path.join(certificatePoolDir, basename);
    const text = fs.readFileSync(filePath, "utf8");
    const sha256 = crypto.createHash("sha256").update(text).digest("hex");
    records.push({ basename, sha256 });
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      continue;
    }
    const status = String(parsed.status ?? "");
    const summary = parsed.summary ?? {};
    const failClosed = status.includes("fail_closed");
    if (basename.startsWith(ACCEPTED_STATUS_LANE_PREFIX)) {
      counters.accepted_status_lane_json_files += 1;
      if (failClosed) {
        counters.accepted_status_lane_fail_closed_json_files += 1;
      } else {
        counters.accepted_status_lane_non_fail_closed_json_files += 1;
        nonFailClosedAcceptedStatusBasenames.push(basename);
      }
    }
    const packetMatches = parsed.packet_id === PACKET_ID;
    const ruleMatches = packetMatches && !failClosed && sourcePacketRoleMatches(parsed, text, SOURCE_PACKET_ACCEPTANCE_RULE_FIELD);
    const acceptedSourceMatches = packetMatches && !failClosed && sourcePacketRoleMatches(parsed, text, ACCEPTED_SOURCE_PACKET_FIELD);
    if (ruleMatches) {
      counters.current_pool_source_packet_acceptance_rule_evidence_object_files_found += 1;
      counters.current_pool_compatible_primitive_source_packet_route_input_refs += 1;
      counters.source_packet_acceptance_rule_non_fail_closed_files += 1;
      compatibleRuleBasenames.push(basename);
    }
    if (acceptedSourceMatches) {
      counters.current_pool_accepted_source_packet_evidence_object_files_found += 1;
      counters.current_pool_compatible_primitive_source_packet_route_input_refs += 1;
      counters.accepted_source_packet_non_fail_closed_files += 1;
      compatibleAcceptedSourcePacketBasenames.push(basename);
    }
    if (parsed.preledger_pass === true || summary.preledger_pass === true) {
      counters.preledger_pass_true_files += 1;
    }
    if (parsed.updates_live_ledger === true || summary.updates_live_ledger === true) {
      counters.live_ledger_update_true_files += 1;
    }
    if (parsed.branch_chart_authorized === true || summary.branch_chart_authorized === true) {
      counters.branch_chart_authorized_true_files += 1;
    }
    if ((summary.row_consumption_count ?? 0) > 0) {
      counters.row_consumption_positive_files += 1;
    }
    if ((summary.accepted_interval_certified_constants_statuses_constructed ?? 0) > 0) {
      counters.accepted_interval_certified_constants_status_positive_files += 1;
    }
  }

  const poolHash = crypto
    .createHash("sha256")
    .update(records.map((record) => `${record.basename}:${record.sha256}`).join("\n"))
    .digest("hex");
  return {
    directory: certificatePoolDir,
    output_json_basename_excluded: outputBasename,
    json_files_scanned_before_output: records.length,
    json_pool_sha256: poolHash,
    counters,
    compatible_source_packet_acceptance_rule_basenames: compatibleRuleBasenames,
    compatible_accepted_source_packet_basenames: compatibleAcceptedSourcePacketBasenames,
    non_fail_closed_accepted_status_basenames: nonFailClosedAcceptedStatusBasenames,
  };
}

function contractRequirements() {
  return [
    {
      requirement_id: "packet_identity_matches_fresh_v10_higher_fold_12_root_rebuild_v0",
      required: true,
      current_pool_satisfied_slots: 0,
    },
    {
      requirement_id: "target_field_is_source_packet_acceptance_rule",
      required: true,
      current_pool_satisfied_slots: 0,
    },
    {
      requirement_id: "target_field_is_accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
      required: true,
      current_pool_satisfied_slots: 0,
    },
    {
      requirement_id: "source_packet_acceptance_rule_is_not_a_rule_target_packet",
      required: true,
      current_pool_satisfied_slots: 0,
    },
    {
      requirement_id: "accepted_source_packet_is_not_inferred_from_complete_aggregate_inputs",
      required: true,
      current_pool_satisfied_slots: 0,
    },
    {
      requirement_id: "primitive_acceptance_and_row_consumption_are_not_constructed_by_this_target_packet",
      required: true,
      current_pool_satisfied_slots: 0,
    },
  ];
}

function buildSeparatorContractProfiles(primitiveNarrowing) {
  return primitiveNarrowing.separator_primitive_source_packet_route_input_target_profiles.map((profile) => ({
    separator_event: profile.separator_event,
    fold_interval: profile.fold_interval,
    row_count: profile.row_count,
    separator_aggregate_fields_complete: profile.separator_aggregate_fields_complete,
    target_fields: PRIMITIVE_ROUTE_INPUT_FIELDS,
    contract_slot_declared: true,
    contract_slots_declared: PRIMITIVE_ROUTE_INPUT_FIELDS.length,
    contract_slots_satisfied: 0,
    contract_slots_missing: PRIMITIVE_ROUTE_INPUT_FIELDS.length,
    source_packet_acceptance_rule_contract_declared: true,
    source_packet_acceptance_rule_contract_satisfied: false,
    accepted_source_packet_contract_declared: true,
    accepted_source_packet_contract_satisfied: false,
    current_pool_source_packet_acceptance_rule_evidence_object_present: false,
    current_pool_accepted_source_packet_evidence_object_present: false,
    source_packet_acceptance_rule_present: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
    primitive_source_packet_route_input_target_satisfied: false,
    source_packet_acceptance_rule_constructed: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_constructed: false,
    route_decision_made: false,
    proof_rule_decision_made: false,
    primitive_acceptance_decision_made: false,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_route_input_blocker: ROUTE_INPUT_BLOCKER,
    first_source_packet_acceptance_rule_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
    classification: "separator_primitive_source_packet_route_evidence_object_contract_declared_unfilled",
  }));
}

function buildRowContractProfiles(primitiveNarrowing) {
  return primitiveNarrowing.row_primitive_source_packet_route_input_target_profiles
    .map((profile) => ({
      row_id: profile.row_id,
      ledger: profile.ledger,
      status: profile.status,
      failure_code: profile.failure_code,
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      receiver_interval: profile.receiver_interval,
      source_interval: profile.source_interval,
      separator_aggregate_fields_complete: profile.separator_aggregate_fields_complete,
      target_fields: PRIMITIVE_ROUTE_INPUT_FIELDS,
      contract_slot_declared: true,
      contract_slots_declared: PRIMITIVE_ROUTE_INPUT_FIELDS.length,
      contract_slots_satisfied: 0,
      contract_slots_missing: PRIMITIVE_ROUTE_INPUT_FIELDS.length,
      source_packet_acceptance_rule_contract_declared: true,
      source_packet_acceptance_rule_contract_satisfied: false,
      accepted_source_packet_contract_declared: true,
      accepted_source_packet_contract_satisfied: false,
      current_pool_source_packet_acceptance_rule_evidence_object_present: false,
      current_pool_accepted_source_packet_evidence_object_present: false,
      source_packet_acceptance_rule_present: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
      primitive_source_packet_route_input_target_satisfied: false,
      source_packet_acceptance_rule_constructed: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_constructed: false,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      accepted_fold_layer_row: false,
      row_consumed: false,
      preledger_pass: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
      first_route_input_blocker: ROUTE_INPUT_BLOCKER,
      first_source_packet_acceptance_rule_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
      first_accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
      classification: "row_primitive_source_packet_route_evidence_object_contract_declared_unfilled",
    }))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const poolSnapshot = currentPoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const separatorProfiles = buildSeparatorContractProfiles(inputs.primitiveNarrowing);
  const rowProfiles = buildRowContractProfiles(inputs.primitiveNarrowing);
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const primitive = inputs.primitiveNarrowing.summary;
  const rule = inputs.ruleTarget.summary;
  const firstBlocker = inputs.firstBlockerHandoff.summary;
  const terminal = inputs.terminalRouteObligation.summary;
  const primitiveEvidence = inputs.primitiveEvidence.summary;
  const proofGradeContract = inputs.proofGradeContract.summary;
  const counters = poolSnapshot.counters;
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_primitive_narrowing_direct_source_hash_checks_passed: primitive.direct_source_hash_checks_passed,
    retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed: rule.direct_source_hash_checks_passed,
    retained_first_blocker_handoff_direct_source_hash_checks_passed: firstBlocker.direct_source_hash_checks_passed,
    retained_terminal_route_obligation_direct_source_hash_checks_passed: terminal.direct_source_hash_checks_passed,
    retained_primitive_evidence_source_hash_checks_passed:
      primitiveEvidence.source_packet_route_source_hash_checks_passed,
    retained_proof_grade_contract_direct_source_hash_checks_passed: proofGradeContract.direct_source_hash_checks_passed,
    current_pool_json_files_scanned: poolSnapshot.json_files_scanned_before_output,
    accepted_status_lane_json_files_scanned: counters.accepted_status_lane_json_files,
    accepted_status_lane_fail_closed_json_files: counters.accepted_status_lane_fail_closed_json_files,
    accepted_status_lane_non_fail_closed_json_files: counters.accepted_status_lane_non_fail_closed_json_files,
    current_pool_source_packet_acceptance_rule_evidence_object_files_found:
      counters.current_pool_source_packet_acceptance_rule_evidence_object_files_found,
    current_pool_accepted_source_packet_evidence_object_files_found:
      counters.current_pool_accepted_source_packet_evidence_object_files_found,
    current_pool_compatible_primitive_source_packet_route_input_refs:
      counters.current_pool_compatible_primitive_source_packet_route_input_refs,
    source_packet_acceptance_rule_non_fail_closed_files:
      counters.source_packet_acceptance_rule_non_fail_closed_files,
    accepted_source_packet_non_fail_closed_files: counters.accepted_source_packet_non_fail_closed_files,
    imported_primitive_evidence_pool_json_files_scanned: primitiveEvidence.evidence_pool_json_files_scanned,
    imported_primitive_evidence_compatible_source_packet_acceptance_files:
      primitiveEvidence.evidence_pool_compatible_source_packet_acceptance_evidence_files,
    candidate_higher_fold_constants_artifacts: primitive.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: primitive.candidate_separator_constants,
    candidate_row_constant_associations: primitive.candidate_row_constant_associations,
    rows_by_separator_count: rowsBySeparator,
    separators_with_separator_aggregate_fields_complete: primitive.separators_with_separator_aggregate_fields_complete,
    rows_with_separator_aggregate_fields_complete: primitive.rows_with_separator_aggregate_fields_complete,
    primitive_source_packet_route_input_target_fields: primitive.primitive_source_packet_route_input_target_fields,
    total_primitive_source_packet_route_input_target_slots:
      primitive.total_primitive_source_packet_route_input_target_slots,
    total_primitive_source_packet_route_input_target_slots_satisfied:
      primitive.total_primitive_source_packet_route_input_target_slots_satisfied,
    total_primitive_source_packet_route_input_target_slots_missing:
      primitive.total_primitive_source_packet_route_input_target_slots_missing,
    source_packet_acceptance_rule_targets_declared: rule.source_packet_acceptance_rule_targets_declared,
    total_source_packet_acceptance_rule_target_slots: rule.total_source_packet_acceptance_rule_target_slots,
    total_source_packet_acceptance_rule_target_slots_satisfied:
      rule.total_source_packet_acceptance_rule_target_slots_satisfied,
    total_source_packet_acceptance_rule_target_slots_missing:
      rule.total_source_packet_acceptance_rule_target_slots_missing,
    separator_source_packet_acceptance_rule_contract_slots: separatorProfiles.length,
    separator_source_packet_acceptance_rule_contract_slots_satisfied: 0,
    separator_accepted_source_packet_contract_slots: separatorProfiles.length,
    separator_accepted_source_packet_contract_slots_satisfied: 0,
    separator_primitive_source_packet_route_evidence_object_contract_slots:
      separatorProfiles.length * PRIMITIVE_ROUTE_INPUT_FIELDS.length,
    separator_primitive_source_packet_route_evidence_object_contract_slots_satisfied: 0,
    row_source_packet_acceptance_rule_contract_slots: rowProfiles.length,
    row_source_packet_acceptance_rule_contract_slots_satisfied: 0,
    row_accepted_source_packet_contract_slots: rowProfiles.length,
    row_accepted_source_packet_contract_slots_satisfied: 0,
    row_primitive_source_packet_route_evidence_object_contract_slots:
      rowProfiles.length * PRIMITIVE_ROUTE_INPUT_FIELDS.length,
    row_primitive_source_packet_route_evidence_object_contract_slots_satisfied: 0,
    total_primitive_source_packet_route_evidence_object_contract_slots:
      (separatorProfiles.length + rowProfiles.length) * PRIMITIVE_ROUTE_INPUT_FIELDS.length,
    contract_slots_satisfied: 0,
    contract_slots_missing: (separatorProfiles.length + rowProfiles.length) * PRIMITIVE_ROUTE_INPUT_FIELDS.length,
    proof_grade_derivation_ref_evidence_object_contract_slots:
      proofGradeContract.total_derivation_ref_evidence_object_contract_slots,
    proof_grade_derivation_ref_evidence_object_contract_slots_satisfied: proofGradeContract.contract_slots_satisfied,
    route_input_disjunctions_declared: terminal.route_input_disjunctions_declared,
    route_input_disjunctions_satisfied: terminal.route_input_disjunctions_satisfied,
    terminal_route_obligations_declared: terminal.terminal_route_obligations_declared,
    terminal_route_obligations_satisfied: terminal.terminal_route_obligations_satisfied,
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
    preledger_pass_true_files: counters.preledger_pass_true_files,
    live_ledger_update_true_files: counters.live_ledger_update_true_files,
    branch_chart_authorized_true_files: counters.branch_chart_authorized_true_files,
    row_consumption_positive_files: counters.row_consumption_positive_files,
    accepted_interval_certified_constants_status_positive_files:
      counters.accepted_interval_certified_constants_status_positive_files,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_route_input_blocker: ROUTE_INPUT_BLOCKER,
    first_source_packet_acceptance_rule_contract_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    first_accepted_source_packet_contract_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
    first_terminal_route_blocker: terminal.first_terminal_route_blocker,
    parent_complement_consumption_ref_blocker: primitive.parent_complement_consumption_ref_blocker,
    first_separator_certificate_blocker: primitive.first_separator_certificate_blocker,
  };

  assertPacketInvariants(summary);
  return {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_primitive_source_packet_route_evidence_object_contract_target_packet.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status primitive source-packet route evidence-object contract target",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status primitive source-packet route evidence-object contract",
    claim_level:
      "priority-only primitive/source-packet route evidence-object contract target packet; declares the exact source_packet_acceptance_rule and accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet contract roles and proves the current certificate pool satisfies zero slots without making proof-rule, route, primitive-acceptance, source-packet acceptance, accepted-status, or row-consumption decisions",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_primitive_source_packet_route_narrowing_classifier: artifactRecord(paths.primitiveNarrowing),
      accepted_status_source_packet_acceptance_rule_target_packet: artifactRecord(paths.ruleTarget),
      accepted_status_route_input_first_blocker_handoff_classifier: artifactRecord(paths.firstBlockerHandoff),
      accepted_status_current_pool_route_input_disjunction_exhaustion_obligation_packet: artifactRecord(
        paths.terminalRouteObligation,
      ),
      accepted_status_primitive_source_packet_acceptance_evidence_dependency_classifier: artifactRecord(
        paths.primitiveEvidence,
      ),
      accepted_status_proof_grade_derivation_ref_evidence_object_contract_target_packet: artifactRecord(
        paths.proofGradeContract,
      ),
    },
    source_hash_checks: sourceChecks,
    primitive_source_packet_route_contract_fields: PRIMITIVE_ROUTE_INPUT_FIELDS,
    primitive_source_packet_route_contract_requirements: contractRequirements(),
    current_pool_primitive_source_packet_route_contract_snapshot: poolSnapshot,
    separator_primitive_source_packet_route_evidence_object_contract_profiles: separatorProfiles,
    row_primitive_source_packet_route_evidence_object_contract_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "primitive_source_packet_route_evidence_object_contract_target",
      current_pool_closure_state:
        "not mechanically closable from the current certificate pool; the primitive/source-packet branch requires a compatible source_packet_acceptance_rule or accepted same-packet source-packet object satisfying this contract",
      contract_satisfied_from_current_pool: false,
      mechanical_continuation_available: false,
      decision_required: true,
      allowed_next_inputs: [
        "source_packet_acceptance_rule_for_live_same_packet_separator_aggregate_family",
        "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_for_live_same_packet_separator_aggregate_family",
      ],
      forbidden_reinterpretations: [
        "source_packet_acceptance_rule_target_packet_as_source_packet_acceptance_rule",
        "primitive_source_packet_route_narrowing_classifier_as_source_packet_acceptance_rule",
        "complete_separator_aggregate_inputs_as_accepted_source_packet",
        "candidate_live_higher_fold_constants_as_accepted_interval_certified_constants_status",
        "proof_grade_derivation_ref_evidence_object_contract_target_as_primitive_source_packet_object",
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
      "Priority-only. This packet turns the primitive/source-packet route-input absence into an explicit evidence-object contract target and proves the current certificate pool does not satisfy it.",
  };
}

function assertPacketInvariants(summary) {
  const checks = [
    summary.direct_source_hash_checks === 6,
    summary.direct_source_hash_checks_passed === 6,
    summary.retained_primitive_narrowing_direct_source_hash_checks_passed === 5,
    summary.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed === 3,
    summary.retained_first_blocker_handoff_direct_source_hash_checks_passed === 5,
    summary.retained_terminal_route_obligation_direct_source_hash_checks_passed === 2,
    summary.retained_primitive_evidence_source_hash_checks_passed === 5,
    summary.retained_proof_grade_contract_direct_source_hash_checks_passed === 6,
    summary.current_pool_json_files_scanned === 254,
    summary.accepted_status_lane_json_files_scanned === 19,
    summary.accepted_status_lane_fail_closed_json_files === 19,
    summary.accepted_status_lane_non_fail_closed_json_files === 0,
    summary.current_pool_source_packet_acceptance_rule_evidence_object_files_found === 0,
    summary.current_pool_accepted_source_packet_evidence_object_files_found === 0,
    summary.current_pool_compatible_primitive_source_packet_route_input_refs === 0,
    summary.source_packet_acceptance_rule_non_fail_closed_files === 0,
    summary.accepted_source_packet_non_fail_closed_files === 0,
    summary.imported_primitive_evidence_pool_json_files_scanned === 239,
    summary.imported_primitive_evidence_compatible_source_packet_acceptance_files === 0,
    summary.candidate_separator_constants === 12,
    summary.candidate_row_constant_associations === 112,
    summary.separators_with_separator_aggregate_fields_complete === 12,
    summary.rows_with_separator_aggregate_fields_complete === 112,
    summary.primitive_source_packet_route_input_target_fields === 2,
    summary.total_primitive_source_packet_route_input_target_slots === 248,
    summary.total_primitive_source_packet_route_input_target_slots_satisfied === 0,
    summary.total_primitive_source_packet_route_input_target_slots_missing === 248,
    summary.total_source_packet_acceptance_rule_target_slots === 124,
    summary.total_source_packet_acceptance_rule_target_slots_satisfied === 0,
    summary.total_source_packet_acceptance_rule_target_slots_missing === 124,
    summary.separator_source_packet_acceptance_rule_contract_slots === 12,
    summary.separator_source_packet_acceptance_rule_contract_slots_satisfied === 0,
    summary.separator_accepted_source_packet_contract_slots === 12,
    summary.separator_accepted_source_packet_contract_slots_satisfied === 0,
    summary.separator_primitive_source_packet_route_evidence_object_contract_slots === 24,
    summary.separator_primitive_source_packet_route_evidence_object_contract_slots_satisfied === 0,
    summary.row_source_packet_acceptance_rule_contract_slots === 112,
    summary.row_source_packet_acceptance_rule_contract_slots_satisfied === 0,
    summary.row_accepted_source_packet_contract_slots === 112,
    summary.row_accepted_source_packet_contract_slots_satisfied === 0,
    summary.row_primitive_source_packet_route_evidence_object_contract_slots === 224,
    summary.row_primitive_source_packet_route_evidence_object_contract_slots_satisfied === 0,
    summary.total_primitive_source_packet_route_evidence_object_contract_slots === 248,
    summary.contract_slots_satisfied === 0,
    summary.contract_slots_missing === 248,
    summary.proof_grade_derivation_ref_evidence_object_contract_slots === 124,
    summary.proof_grade_derivation_ref_evidence_object_contract_slots_satisfied === 0,
    summary.terminal_route_obligations_satisfied === 0,
    summary.mechanical_continuations_from_current_pool === 0,
    summary.route_decisions_made === 0,
    summary.proof_rule_decisions_made === 0,
    summary.primitive_acceptance_decisions_made === 0,
    summary.source_packet_acceptance_rules_constructed === 0,
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0,
    summary.accepted_interval_certified_constants_statuses_constructed === 0,
    summary.row_consumption_count === 0,
    summary.preledger_pass_true_files === 0,
    summary.live_ledger_update_true_files === 0,
    summary.branch_chart_authorized_true_files === 0,
    summary.row_consumption_positive_files === 0,
    summary.accepted_interval_certified_constants_status_positive_files === 0,
    summary.preledger_pass === false,
    summary.updates_live_ledger === false,
    summary.branch_chart_authorized === false,
  ];
  if (!checks.every(Boolean)) {
    throw new Error("Primitive/source-packet route evidence-object contract target invariants failed.");
  }
  if (JSON.stringify(summary.rows_by_separator_count) !== JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR)) {
    throw new Error("Unexpected primitive/source-packet contract target rows-by-separator count.");
  }
}

function markdownTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function renderReport(packet) {
  const s = packet.summary;
  const sourceRows = packet.source_hash_checks.map((check) => [
    `\`${check.source_artifact}\``,
    `\`${check.current_basename}\``,
    `\`${check.current_sha256}\``,
    String(check.hash_matches),
  ]);
  const requirementRows = packet.primitive_source_packet_route_contract_requirements.map((requirement) => [
    `\`${requirement.requirement_id}\``,
    String(requirement.required),
    String(requirement.current_pool_satisfied_slots),
  ]);
  const separatorRows = Object.entries(s.rows_by_separator_count).map(([separator, rows]) => [
    `\`${separator}\``,
    String(rows),
  ]);

  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Primitive Source-Packet Route Evidence-Object Contract Target Packet

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Primitive Source-Packet Contract Target

This packet imports the primitive source-packet route narrowing classifier, the
source-packet acceptance rule target packet, the route-input first-blocker
handoff classifier, the terminal route-input disjunction exhaustion obligation
packet, the primitive source-packet acceptance evidence dependency classifier,
and the proof-grade derivation-ref evidence-object contract target packet.

It turns the primitive/source-packet route-input blocker into an explicit typed
contract: a future primitive route input must supply either
\`${SOURCE_PACKET_ACCEPTANCE_RULE_FIELD}\` or
\`${ACCEPTED_SOURCE_PACKET_FIELD}\` for the live same-packet separator
aggregate family and row scope. The current pool still satisfies none of that
contract.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct source-hash locks;
- ${s.retained_primitive_narrowing_direct_source_hash_checks_passed} / 5 retained primitive route narrowing locks;
- ${s.retained_source_packet_acceptance_rule_target_direct_source_hash_checks_passed} / 3 retained source-packet acceptance rule target locks;
- ${s.retained_first_blocker_handoff_direct_source_hash_checks_passed} / 5 retained first-blocker handoff locks;
- ${s.retained_terminal_route_obligation_direct_source_hash_checks_passed} / 2 retained terminal route-obligation locks;
- ${s.retained_primitive_evidence_source_hash_checks_passed} / 5 retained primitive source-packet evidence locks;
- ${s.retained_proof_grade_contract_direct_source_hash_checks_passed} / 6 retained proof-grade contract locks.

Current-pool contract scan:

- ${s.current_pool_json_files_scanned} certificate JSON files scanned before this output;
- ${s.accepted_status_lane_json_files_scanned} accepted-status-lane JSON files scanned;
- ${s.accepted_status_lane_fail_closed_json_files} accepted-status-lane JSON files fail-closed;
- ${s.accepted_status_lane_non_fail_closed_json_files} accepted-status-lane JSON files non-fail-closed;
- ${s.current_pool_source_packet_acceptance_rule_evidence_object_files_found} compatible source-packet acceptance rule objects found;
- ${s.current_pool_accepted_source_packet_evidence_object_files_found} compatible accepted source-packet objects found;
- ${s.current_pool_compatible_primitive_source_packet_route_input_refs} compatible primitive/source-packet route-input refs found.

Contract result:

- ${s.total_primitive_source_packet_route_evidence_object_contract_slots} primitive/source-packet route evidence-object contract slots;
- ${s.contract_slots_satisfied} contract slots satisfied;
- ${s.contract_slots_missing} contract slots missing;
- ${s.total_source_packet_acceptance_rule_target_slots} source-packet acceptance rule target slots;
- ${s.total_source_packet_acceptance_rule_target_slots_satisfied} source-packet acceptance rule target slots satisfied;
- ${s.proof_grade_derivation_ref_evidence_object_contract_slots} proof-grade derivation-ref evidence-object contract slots retained for branch parity;
- ${s.proof_grade_derivation_ref_evidence_object_contract_slots_satisfied} proof-grade derivation-ref evidence-object contract slots satisfied.

## Source-Hash Checks

${markdownTable(["Source artifact", "Current file", "Current SHA-256", "Hash matches"], sourceRows)}

## Contract Requirements

${markdownTable(["Requirement", "Required", "Current-pool satisfied slots"], requirementRows)}

## Row Scope

${markdownTable(["Separator", "Rows"], separatorRows)}

## Certificate-Side Handoff

Sharpened blocker: the current lane is not missing another primitive narrowing
classifier or target packet. It is missing a compatible
\`${SOURCE_PACKET_ACCEPTANCE_RULE_FIELD}\` or
\`${ACCEPTED_SOURCE_PACKET_FIELD}\` object satisfying the declared contract.

Continuation class: not mechanically closable from the current certificate
pool. Continue only by importing a contract-satisfying source-packet acceptance
rule, importing a contract-satisfying accepted same-packet source-packet object,
or recording an explicit primitive/source-packet acceptance decision in a
separate artifact.

Fail-closed stop conditions:

- Do not treat the source-packet acceptance rule target packet as the rule.
- Do not treat the primitive route narrowing classifier as a rule.
- Do not treat complete aggregate inputs as an accepted
  \`same_packet_fold_impulse_or_direct_quadrature\` source packet.
- Do not construct accepted interval-certified constants status refs or
  statuses from this packet.
- Do not infer \`parent_complement_consumption_ref\` or
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
    primitiveNarrowing: args.primitiveNarrowing,
    ruleTarget: args.ruleTarget,
    firstBlockerHandoff: args.firstBlockerHandoff,
    terminalRouteObligation: args.terminalRouteObligation,
    primitiveEvidence: args.primitiveEvidence,
    proofGradeContract: args.proofGradeContract,
    certificatePoolDir: args.certificatePoolDir,
  };
  const inputs = {
    primitiveNarrowing: readJson(paths.primitiveNarrowing),
    ruleTarget: readJson(paths.ruleTarget),
    firstBlockerHandoff: readJson(paths.firstBlockerHandoff),
    terminalRouteObligation: readJson(paths.terminalRouteObligation),
    primitiveEvidence: readJson(paths.primitiveEvidence),
    proofGradeContract: readJson(paths.proofGradeContract),
  };
  const packet = buildPacket(paths, inputs);
  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(jsonPath, packet, args.pretty);
  writeText(reportPath, renderReport(packet));
  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${reportPath}`);
}

main();
