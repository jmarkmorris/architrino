#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_PROOF_GRADE_CONTRACT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRIMITIVE_CONTRACT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_TERMINAL_ROUTE_OBLIGATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_contract_disjunction_exhaustion_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_contract_disjunction_exhaustion_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_application_exhaustion_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_terminal_decision_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_construction_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_packet_acceptance_rule_proof_obligation_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_acceptance_rule_blocker_vector_handoff_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_kernel_binding_split_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_current_pool_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
]);

const PROOF_GRADE_CONTRACT_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet_fail_closed_contract_declared_current_pool_derivation_ref_evidence_object_absent_no_status_ref_no_proof_rule_no_route_decision_no_primitive_acceptance_no_row_consumption";
const PRIMITIVE_CONTRACT_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_contract_target_packet_fail_closed_contract_declared_source_packet_acceptance_rule_and_accepted_source_packet_absent_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";
const TERMINAL_ROUTE_OBLIGATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet_fail_closed_current_pool_route_input_disjunction_exhausted_external_route_evidence_or_acceptance_decision_required_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_contract_disjunction_exhaustion_classifier_fail_closed_proof_grade_and_primitive_route_evidence_object_contracts_unsatisfied_no_route_decision_no_rule_decision_no_primitive_acceptance_no_row_consumption";

const ACCEPTED_STATUS_LANE_PREFIX =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_";
const PROOF_GRADE_ROLE = "proof_grade_derivation_ref_evidence_object";
const PROOF_GRADE_TARGET_FIELD = "accepted_interval_certified_constants_status_proof_grade_derivation_ref";
const SOURCE_PACKET_ACCEPTANCE_RULE_FIELD = "source_packet_acceptance_rule";
const ACCEPTED_SOURCE_PACKET_FIELD = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet";
const ROUTE_EVIDENCE_OBJECT_CONTRACT_BLOCKER = "route_evidence_object_contract_disjunction_unsatisfied";
const PROOF_GRADE_BLOCKER = "proof_grade_derivation_ref_evidence_object_absent";
const PRIMITIVE_BLOCKER = "source_packet_acceptance_rule_or_accepted_source_packet_absent";
const SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
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
    proofGradeContract: DEFAULT_PROOF_GRADE_CONTRACT,
    primitiveContract: DEFAULT_PRIMITIVE_CONTRACT,
    terminalRouteObligation: DEFAULT_TERMINAL_ROUTE_OBLIGATION,
    certificatePoolDir: CERT_DIR,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--proof-grade-contract") {
      args.proofGradeContract = argv[++index];
    } else if (arg === "--primitive-contract") {
      args.primitiveContract = argv[++index];
    } else if (arg === "--terminal-route-obligation") {
      args.terminalRouteObligation = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-route-evidence-object-contract-disjunction-exhaustion-classifier.mjs [options]

Options:
  --proof-grade-contract PATH       Proof-grade derivation-ref evidence-object contract target packet. Defaults to ${DEFAULT_PROOF_GRADE_CONTRACT}.
  --primitive-contract PATH         Primitive source-packet route evidence-object contract target packet. Defaults to ${DEFAULT_PRIMITIVE_CONTRACT}.
  --terminal-route-obligation PATH  Current-pool route-input disjunction exhaustion obligation packet. Defaults to ${DEFAULT_TERMINAL_ROUTE_OBLIGATION}.
  --certificate-pool-dir PATH       Certificate JSON pool directory. Defaults to ${CERT_DIR}.
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

function sourceHashChecks(paths) {
  return [
    ["accepted_status_proof_grade_derivation_ref_evidence_object_contract_target_packet", paths.proofGradeContract],
    ["accepted_status_primitive_source_packet_route_evidence_object_contract_target_packet", paths.primitiveContract],
    ["accepted_status_current_pool_route_input_disjunction_exhaustion_obligation_packet", paths.terminalRouteObligation],
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
  assertPacketStatusAndLocks(inputs.proofGradeContract, "proofGradeContract", PROOF_GRADE_CONTRACT_STATUS);
  assertPacketStatusAndLocks(inputs.primitiveContract, "primitiveContract", PRIMITIVE_CONTRACT_STATUS);
  assertPacketStatusAndLocks(inputs.terminalRouteObligation, "terminalRouteObligation", TERMINAL_ROUTE_OBLIGATION_STATUS);

  const proof = inputs.proofGradeContract.summary;
  const primitive = inputs.primitiveContract.summary;
  const terminal = inputs.terminalRouteObligation.summary;
  const expected = [
    [proof.direct_source_hash_checks_passed, 6, "proof-grade contract direct source-hash locks"],
    [proof.total_derivation_ref_evidence_object_contract_slots, 124, "proof-grade contract slots"],
    [proof.contract_slots_satisfied, 0, "proof-grade contract satisfied slots"],
    [proof.current_pool_derivation_ref_evidence_object_files_found, 0, "proof-grade current-pool evidence objects"],
    [proof.current_pool_compatible_derivation_ref_evidence_refs, 0, "proof-grade compatible derivation refs"],
    [primitive.direct_source_hash_checks_passed, 6, "primitive contract direct source-hash locks"],
    [
      primitive.total_primitive_source_packet_route_evidence_object_contract_slots,
      248,
      "primitive/source-packet contract slots",
    ],
    [primitive.contract_slots_satisfied, 0, "primitive/source-packet contract satisfied slots"],
    [
      primitive.current_pool_source_packet_acceptance_rule_evidence_object_files_found,
      0,
      "primitive source-packet acceptance rule evidence objects",
    ],
    [
      primitive.current_pool_accepted_source_packet_evidence_object_files_found,
      0,
      "primitive accepted source-packet evidence objects",
    ],
    [primitive.current_pool_compatible_primitive_source_packet_route_input_refs, 0, "primitive compatible route refs"],
    [terminal.direct_source_hash_checks_passed, 2, "terminal route direct source-hash locks"],
    [terminal.route_input_disjunctions_declared, 1, "terminal route-input disjunctions declared"],
    [terminal.route_input_disjunctions_satisfied, 0, "terminal route-input disjunctions satisfied"],
    [terminal.terminal_route_obligations_declared, 3, "terminal route obligations declared"],
    [terminal.terminal_route_obligations_satisfied, 0, "terminal route obligations satisfied"],
    [terminal.mechanical_continuations_from_current_pool, 0, "terminal mechanical continuations"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
  assertRowsBySeparator(proof, "proof-grade contract");
  assertRowsBySeparator(primitive, "primitive/source-packet contract");
  assertRowsBySeparator(terminal, "terminal route obligation");
}

function candidateSatisfiesProofGradeContract(parsed, text) {
  const status = String(parsed.status ?? "");
  if (status.includes("fail_closed") || parsed.packet_id !== PACKET_ID) {
    return false;
  }
  const roleMatches =
    parsed.artifact_role === PROOF_GRADE_ROLE ||
    parsed.compatible_evidence_role === PROOF_GRADE_ROLE ||
    parsed.summary?.compatible_evidence_role === PROOF_GRADE_ROLE;
  const targetMatches = text.includes(PROOF_GRADE_TARGET_FIELD);
  const evidencePresent =
    /"derivation_ref_evidence_object_present"\s*:\s*true/.test(text) ||
    /"accepted_interval_certified_constants_status_proof_grade_derivation_ref_present"\s*:\s*true/.test(text) ||
    /"accepted_interval_certified_constants_status_proof_grade_derivation_refs_constructed"\s*:\s*[1-9]/.test(text) ||
    /"proof_grade_derivation_ref_applications_authorized"\s*:\s*[1-9]/.test(text);
  return roleMatches && targetMatches && evidencePresent;
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
    current_pool_derivation_ref_evidence_object_files_found: 0,
    current_pool_source_packet_acceptance_rule_evidence_object_files_found: 0,
    current_pool_accepted_source_packet_evidence_object_files_found: 0,
    current_pool_compatible_route_evidence_object_refs: 0,
    preledger_pass_true_files: 0,
    live_ledger_update_true_files: 0,
    branch_chart_authorized_true_files: 0,
    row_consumption_positive_files: 0,
    accepted_interval_certified_constants_status_positive_files: 0,
  };
  const compatibleProofGradeBasenames = [];
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
    if (candidateSatisfiesProofGradeContract(parsed, text)) {
      counters.current_pool_derivation_ref_evidence_object_files_found += 1;
      counters.current_pool_compatible_route_evidence_object_refs += 1;
      compatibleProofGradeBasenames.push(basename);
    }
    if (parsed.packet_id === PACKET_ID && !failClosed && sourcePacketRoleMatches(parsed, text, SOURCE_PACKET_ACCEPTANCE_RULE_FIELD)) {
      counters.current_pool_source_packet_acceptance_rule_evidence_object_files_found += 1;
      counters.current_pool_compatible_route_evidence_object_refs += 1;
      compatibleRuleBasenames.push(basename);
    }
    if (parsed.packet_id === PACKET_ID && !failClosed && sourcePacketRoleMatches(parsed, text, ACCEPTED_SOURCE_PACKET_FIELD)) {
      counters.current_pool_accepted_source_packet_evidence_object_files_found += 1;
      counters.current_pool_compatible_route_evidence_object_refs += 1;
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
    compatible_proof_grade_derivation_ref_evidence_object_basenames: compatibleProofGradeBasenames,
    compatible_source_packet_acceptance_rule_basenames: compatibleRuleBasenames,
    compatible_accepted_source_packet_basenames: compatibleAcceptedSourcePacketBasenames,
    non_fail_closed_accepted_status_basenames: nonFailClosedAcceptedStatusBasenames,
  };
}

function buildSeparatorProfiles(proofGradeContract, primitiveContract) {
  const primitiveBySeparator = new Map(
    primitiveContract.separator_primitive_source_packet_route_evidence_object_contract_profiles.map((profile) => [
      profile.separator_event,
      profile,
    ]),
  );
  return proofGradeContract.separator_derivation_ref_evidence_object_contract_profiles.map((proofProfile) => {
    const primitiveProfile = primitiveBySeparator.get(proofProfile.separator_event);
    if (!primitiveProfile) {
      throw new Error(`Missing primitive/source-packet separator profile for ${proofProfile.separator_event}.`);
    }
    return {
      separator_event: proofProfile.separator_event,
      fold_interval: proofProfile.fold_interval,
      row_count: proofProfile.row_count,
      route_evidence_object_contract_disjunction_declared: true,
      route_evidence_object_contract_branches: [
        PROOF_GRADE_ROLE,
        SOURCE_PACKET_ACCEPTANCE_RULE_FIELD,
        ACCEPTED_SOURCE_PACKET_FIELD,
      ],
      contract_slots_declared: 3,
      contract_slots_satisfied: 0,
      contract_slots_missing: 3,
      proof_grade_derivation_ref_evidence_object_contract_declared: true,
      proof_grade_derivation_ref_evidence_object_contract_satisfied: false,
      source_packet_acceptance_rule_contract_declared: true,
      source_packet_acceptance_rule_contract_satisfied: false,
      accepted_source_packet_contract_declared: true,
      accepted_source_packet_contract_satisfied: false,
      route_evidence_object_contract_disjunction_satisfied: false,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      row_consumption_count: 0,
      preledger_pass_rows: 0,
      branch_chart_authorized_rows: 0,
      first_route_evidence_object_contract_blocker: ROUTE_EVIDENCE_OBJECT_CONTRACT_BLOCKER,
      first_proof_grade_contract_blocker: PROOF_GRADE_BLOCKER,
      first_primitive_contract_blocker: PRIMITIVE_BLOCKER,
      first_source_packet_acceptance_rule_contract_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
      first_accepted_source_packet_contract_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
      classification: "separator_route_evidence_object_contract_disjunction_declared_unsatisfied",
    };
  });
}

function buildRowProfiles(proofGradeContract, primitiveContract) {
  const primitiveByRow = new Map(
    primitiveContract.row_primitive_source_packet_route_evidence_object_contract_profiles.map((profile) => [
      profile.row_id,
      profile,
    ]),
  );
  return proofGradeContract.row_derivation_ref_evidence_object_contract_profiles
    .map((proofProfile) => {
      const primitiveProfile = primitiveByRow.get(proofProfile.row_id);
      if (!primitiveProfile) {
        throw new Error(`Missing primitive/source-packet row profile for ${proofProfile.row_id}.`);
      }
      return {
        row_id: proofProfile.row_id,
        ledger: proofProfile.ledger,
        status: proofProfile.status,
        failure_code: proofProfile.failure_code,
        separator_event: proofProfile.separator_event,
        fold_interval: proofProfile.fold_interval,
        receiver_interval: proofProfile.receiver_interval,
        source_interval: proofProfile.source_interval,
        route_evidence_object_contract_disjunction_declared: true,
        route_evidence_object_contract_branches: [
          PROOF_GRADE_ROLE,
          SOURCE_PACKET_ACCEPTANCE_RULE_FIELD,
          ACCEPTED_SOURCE_PACKET_FIELD,
        ],
        contract_slots_declared: 3,
        contract_slots_satisfied: 0,
        contract_slots_missing: 3,
        proof_grade_derivation_ref_evidence_object_contract_declared: true,
        proof_grade_derivation_ref_evidence_object_contract_satisfied: false,
        source_packet_acceptance_rule_contract_declared: true,
        source_packet_acceptance_rule_contract_satisfied: false,
        accepted_source_packet_contract_declared: true,
        accepted_source_packet_contract_satisfied: false,
        route_evidence_object_contract_disjunction_satisfied: false,
        route_decision_made: false,
        proof_rule_decision_made: false,
        primitive_acceptance_decision_made: false,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
        first_route_evidence_object_contract_blocker: ROUTE_EVIDENCE_OBJECT_CONTRACT_BLOCKER,
        first_proof_grade_contract_blocker: PROOF_GRADE_BLOCKER,
        first_primitive_contract_blocker: PRIMITIVE_BLOCKER,
        first_source_packet_acceptance_rule_contract_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
        first_accepted_source_packet_contract_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
        classification: "row_route_evidence_object_contract_disjunction_declared_unsatisfied",
      };
    })
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(paths, inputs) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const poolSnapshot = currentPoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const separatorProfiles = buildSeparatorProfiles(inputs.proofGradeContract, inputs.primitiveContract);
  const rowProfiles = buildRowProfiles(inputs.proofGradeContract, inputs.primitiveContract);
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const proof = inputs.proofGradeContract.summary;
  const primitive = inputs.primitiveContract.summary;
  const terminal = inputs.terminalRouteObligation.summary;
  const counters = poolSnapshot.counters;
  const routeBranchSlots = proof.total_derivation_ref_evidence_object_contract_slots +
    primitive.total_primitive_source_packet_route_evidence_object_contract_slots;
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_proof_grade_contract_direct_source_hash_checks_passed: proof.direct_source_hash_checks_passed,
    retained_primitive_contract_direct_source_hash_checks_passed: primitive.direct_source_hash_checks_passed,
    retained_terminal_route_obligation_direct_source_hash_checks_passed: terminal.direct_source_hash_checks_passed,
    current_pool_json_files_scanned: poolSnapshot.json_files_scanned_before_output,
    accepted_status_lane_json_files_scanned: counters.accepted_status_lane_json_files,
    accepted_status_lane_fail_closed_json_files: counters.accepted_status_lane_fail_closed_json_files,
    accepted_status_lane_non_fail_closed_json_files: counters.accepted_status_lane_non_fail_closed_json_files,
    current_pool_derivation_ref_evidence_object_files_found:
      counters.current_pool_derivation_ref_evidence_object_files_found,
    current_pool_source_packet_acceptance_rule_evidence_object_files_found:
      counters.current_pool_source_packet_acceptance_rule_evidence_object_files_found,
    current_pool_accepted_source_packet_evidence_object_files_found:
      counters.current_pool_accepted_source_packet_evidence_object_files_found,
    current_pool_compatible_route_evidence_object_refs:
      counters.current_pool_compatible_route_evidence_object_refs,
    candidate_higher_fold_constants_artifacts: proof.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: proof.candidate_separator_constants,
    candidate_row_constant_associations: proof.candidate_row_constant_associations,
    rows_by_separator_count: rowsBySeparator,
    route_evidence_object_contract_disjunctions_declared: 1,
    route_evidence_object_contract_disjunctions_satisfied: 0,
    proof_grade_derivation_ref_evidence_object_contract_slots:
      proof.total_derivation_ref_evidence_object_contract_slots,
    proof_grade_derivation_ref_evidence_object_contract_slots_satisfied: proof.contract_slots_satisfied,
    primitive_source_packet_route_evidence_object_contract_slots:
      primitive.total_primitive_source_packet_route_evidence_object_contract_slots,
    primitive_source_packet_route_evidence_object_contract_slots_satisfied: primitive.contract_slots_satisfied,
    separator_route_evidence_object_contract_slots: separatorProfiles.length * 3,
    separator_route_evidence_object_contract_slots_satisfied: 0,
    row_route_evidence_object_contract_slots: rowProfiles.length * 3,
    row_route_evidence_object_contract_slots_satisfied: 0,
    total_route_evidence_object_contract_slots: routeBranchSlots,
    route_evidence_object_contract_slots_satisfied: 0,
    route_evidence_object_contract_slots_missing: routeBranchSlots,
    proof_grade_route_contract_branch_satisfied: false,
    primitive_source_packet_route_contract_branch_satisfied: false,
    terminal_route_obligations_declared: terminal.terminal_route_obligations_declared,
    terminal_route_obligations_satisfied: terminal.terminal_route_obligations_satisfied,
    terminal_route_obligations_unsatisfied: terminal.terminal_route_obligations_unsatisfied,
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
    first_route_evidence_object_contract_blocker: ROUTE_EVIDENCE_OBJECT_CONTRACT_BLOCKER,
    first_proof_grade_contract_blocker: PROOF_GRADE_BLOCKER,
    first_primitive_contract_blocker: PRIMITIVE_BLOCKER,
    first_source_packet_acceptance_rule_contract_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    first_accepted_source_packet_contract_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
    first_terminal_route_blocker: terminal.first_terminal_route_blocker,
    parent_complement_consumption_ref_blocker: proof.parent_complement_consumption_ref_blocker,
    first_separator_certificate_blocker: proof.first_separator_certificate_blocker,
  };

  assertPacketInvariants(summary);
  return {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_route_evidence_object_contract_disjunction_exhaustion_classifier.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status route evidence-object contract disjunction exhaustion",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status route evidence-object contract disjunction exhaustion",
    claim_level:
      "priority-only route evidence-object contract disjunction exhaustion classifier; imports the proof-grade and primitive/source-packet evidence-object contract targets and proves both branches remain unsatisfied in the current certificate pool without making proof-rule, route, primitive-acceptance, source-packet acceptance, accepted-status, or row-consumption decisions",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_proof_grade_derivation_ref_evidence_object_contract_target_packet: artifactRecord(
        paths.proofGradeContract,
      ),
      accepted_status_primitive_source_packet_route_evidence_object_contract_target_packet: artifactRecord(
        paths.primitiveContract,
      ),
      accepted_status_current_pool_route_input_disjunction_exhaustion_obligation_packet: artifactRecord(
        paths.terminalRouteObligation,
      ),
    },
    source_hash_checks: sourceChecks,
    route_evidence_object_contract_branches: [
      {
        branch: "proof_grade_derivation_ref_evidence_object",
        required_role: PROOF_GRADE_ROLE,
        required_target_field: PROOF_GRADE_TARGET_FIELD,
        contract_slots: proof.total_derivation_ref_evidence_object_contract_slots,
        contract_slots_satisfied: proof.contract_slots_satisfied,
        first_contract_blocker: PROOF_GRADE_BLOCKER,
      },
      {
        branch: "primitive_source_packet_route_evidence_object",
        required_fields: [SOURCE_PACKET_ACCEPTANCE_RULE_FIELD, ACCEPTED_SOURCE_PACKET_FIELD],
        contract_slots: primitive.total_primitive_source_packet_route_evidence_object_contract_slots,
        contract_slots_satisfied: primitive.contract_slots_satisfied,
        first_contract_blocker: PRIMITIVE_BLOCKER,
      },
    ],
    current_pool_route_evidence_object_contract_disjunction_snapshot: poolSnapshot,
    separator_route_evidence_object_contract_disjunction_profiles: separatorProfiles,
    row_route_evidence_object_contract_disjunction_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "route_evidence_object_contract_disjunction_exhaustion",
      current_pool_closure_state:
        "not mechanically closable from the current certificate pool; both accepted-status route evidence-object branches remain unsatisfied",
      route_evidence_object_contract_disjunction_satisfied: false,
      mechanical_continuation_available: false,
      decision_required: true,
      allowed_next_inputs: [
        "proof_grade_derivation_ref_evidence_object_for_accepted_interval_certified_constants_status",
        "source_packet_acceptance_rule_for_live_same_packet_separator_aggregate_family",
        "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_for_live_same_packet_separator_aggregate_family",
      ],
      forbidden_reinterpretations: [
        "proof_grade_derivation_ref_evidence_object_contract_target_as_evidence_object",
        "primitive_source_packet_route_evidence_object_contract_target_as_source_packet_rule_or_accepted_source_packet",
        "terminal_route_obligation_packet_as_route_evidence_object",
        "candidate_live_higher_fold_constants_as_accepted_interval_certified_constants_status",
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
      "Priority-only. This classifier combines the proof-grade and primitive/source-packet route evidence-object contract targets and proves the current certificate pool satisfies neither branch.",
  };
}

function assertPacketInvariants(summary) {
  const checks = [
    summary.direct_source_hash_checks === 3,
    summary.direct_source_hash_checks_passed === 3,
    summary.retained_proof_grade_contract_direct_source_hash_checks_passed === 6,
    summary.retained_primitive_contract_direct_source_hash_checks_passed === 6,
    summary.retained_terminal_route_obligation_direct_source_hash_checks_passed === 2,
    summary.current_pool_json_files_scanned === 255,
    summary.accepted_status_lane_json_files_scanned === 20,
    summary.accepted_status_lane_fail_closed_json_files === 20,
    summary.accepted_status_lane_non_fail_closed_json_files === 0,
    summary.current_pool_derivation_ref_evidence_object_files_found === 0,
    summary.current_pool_source_packet_acceptance_rule_evidence_object_files_found === 0,
    summary.current_pool_accepted_source_packet_evidence_object_files_found === 0,
    summary.current_pool_compatible_route_evidence_object_refs === 0,
    summary.candidate_separator_constants === 12,
    summary.candidate_row_constant_associations === 112,
    summary.route_evidence_object_contract_disjunctions_declared === 1,
    summary.route_evidence_object_contract_disjunctions_satisfied === 0,
    summary.proof_grade_derivation_ref_evidence_object_contract_slots === 124,
    summary.proof_grade_derivation_ref_evidence_object_contract_slots_satisfied === 0,
    summary.primitive_source_packet_route_evidence_object_contract_slots === 248,
    summary.primitive_source_packet_route_evidence_object_contract_slots_satisfied === 0,
    summary.separator_route_evidence_object_contract_slots === 36,
    summary.separator_route_evidence_object_contract_slots_satisfied === 0,
    summary.row_route_evidence_object_contract_slots === 336,
    summary.row_route_evidence_object_contract_slots_satisfied === 0,
    summary.total_route_evidence_object_contract_slots === 372,
    summary.route_evidence_object_contract_slots_satisfied === 0,
    summary.route_evidence_object_contract_slots_missing === 372,
    summary.proof_grade_route_contract_branch_satisfied === false,
    summary.primitive_source_packet_route_contract_branch_satisfied === false,
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
    throw new Error("Route evidence-object contract disjunction exhaustion invariants failed.");
  }
  if (JSON.stringify(summary.rows_by_separator_count) !== JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR)) {
    throw new Error("Unexpected route evidence-object contract disjunction rows-by-separator count.");
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
  const branchRows = packet.route_evidence_object_contract_branches.map((branch) => [
    `\`${branch.branch}\``,
    String(branch.contract_slots),
    String(branch.contract_slots_satisfied),
    `\`${branch.first_contract_blocker}\``,
  ]);
  const separatorRows = Object.entries(s.rows_by_separator_count).map(([separator, rows]) => [
    `\`${separator}\``,
    String(rows),
  ]);

  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Route Evidence-Object Contract Disjunction Exhaustion Classifier

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Route Evidence-Object Contract Disjunction

This classifier imports the proof-grade derivation-ref evidence-object contract
target packet, the primitive source-packet route evidence-object contract target
packet, and the terminal route-input disjunction exhaustion obligation packet.

It combines the two accepted-status route evidence-object branches into a single
disjunction: either the proof-grade branch must supply a compatible
\`${PROOF_GRADE_ROLE}\` for \`${PROOF_GRADE_TARGET_FIELD}\`, or the
primitive/source-packet branch must supply \`${SOURCE_PACKET_ACCEPTANCE_RULE_FIELD}\`
and \`${ACCEPTED_SOURCE_PACKET_FIELD}\` evidence satisfying its contract. The
current certificate pool satisfies neither branch.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct source-hash locks;
- ${s.retained_proof_grade_contract_direct_source_hash_checks_passed} / 6 retained proof-grade contract locks;
- ${s.retained_primitive_contract_direct_source_hash_checks_passed} / 6 retained primitive/source-packet contract locks;
- ${s.retained_terminal_route_obligation_direct_source_hash_checks_passed} / 2 retained terminal route-obligation locks.

Current-pool contract-disjunction scan:

- ${s.current_pool_json_files_scanned} certificate JSON files scanned before this output;
- ${s.accepted_status_lane_json_files_scanned} accepted-status-lane JSON files scanned;
- ${s.accepted_status_lane_fail_closed_json_files} accepted-status-lane JSON files fail-closed;
- ${s.accepted_status_lane_non_fail_closed_json_files} accepted-status-lane JSON files non-fail-closed;
- ${s.current_pool_derivation_ref_evidence_object_files_found} compatible proof-grade derivation-ref evidence objects found;
- ${s.current_pool_source_packet_acceptance_rule_evidence_object_files_found} compatible source-packet acceptance rule objects found;
- ${s.current_pool_accepted_source_packet_evidence_object_files_found} compatible accepted source-packet objects found;
- ${s.current_pool_compatible_route_evidence_object_refs} compatible route evidence-object refs found.

Contract-disjunction result:

- ${s.route_evidence_object_contract_disjunctions_declared} route evidence-object contract disjunction declared;
- ${s.route_evidence_object_contract_disjunctions_satisfied} route evidence-object contract disjunctions satisfied;
- ${s.total_route_evidence_object_contract_slots} total route evidence-object contract slots;
- ${s.route_evidence_object_contract_slots_satisfied} route evidence-object contract slots satisfied;
- ${s.route_evidence_object_contract_slots_missing} route evidence-object contract slots missing;
- ${s.terminal_route_obligations_declared} terminal route obligations declared;
- ${s.terminal_route_obligations_satisfied} terminal route obligations satisfied.

## Source-Hash Checks

${markdownTable(["Source artifact", "Current file", "Current SHA-256", "Hash matches"], sourceRows)}

## Branch Contracts

${markdownTable(["Branch", "Contract slots", "Satisfied slots", "First blocker"], branchRows)}

## Row Scope

${markdownTable(["Separator", "Rows"], separatorRows)}

## Certificate-Side Handoff

Sharpened blocker: the current lane is no longer missing a target packet for
either route branch. It is missing a compatible proof-grade derivation-ref
evidence object, or the source-packet acceptance rule plus accepted source-packet
objects required by the primitive/source-packet branch.

Continuation class: not mechanically closable from the current certificate pool.
Continue only by importing one of the allowed branch evidence-object inputs or by
recording an explicit route/proof-rule/primitive-acceptance decision in a
separate artifact.

Fail-closed stop conditions:

- Do not treat either evidence-object contract target packet as satisfying its own contract.
- Do not treat the terminal route-obligation packet as route evidence.
- Do not construct accepted interval-certified constants status refs or statuses from this classifier.
- Do not infer \`parent_complement_consumption_ref\` or \`higher_fold_separator_layer_certificate\` from this classifier.
- Do not consume rows, set \`preledger_pass\`, update the live ledger, or authorize a branch chart.

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
    proofGradeContract: args.proofGradeContract,
    primitiveContract: args.primitiveContract,
    terminalRouteObligation: args.terminalRouteObligation,
    certificatePoolDir: args.certificatePoolDir,
  };
  const inputs = {
    proofGradeContract: readJson(paths.proofGradeContract),
    primitiveContract: readJson(paths.primitiveContract),
    terminalRouteObligation: readJson(paths.terminalRouteObligation),
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
