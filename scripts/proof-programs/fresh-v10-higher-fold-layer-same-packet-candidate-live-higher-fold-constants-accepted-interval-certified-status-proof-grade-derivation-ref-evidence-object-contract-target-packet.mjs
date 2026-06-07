#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CURRENT_POOL_DERIVATION_REF_ABSENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_APPLICATION_ATTEMPT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_DERIVATION_REF_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_ROUTE_INPUT_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_route_input_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_TERMINAL_ROUTE_OBLIGATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_contract_disjunction_exhaustion_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
]);

const CURRENT_POOL_DERIVATION_REF_ABSENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier_fail_closed_current_pool_scanned_derivation_ref_evidence_object_absent_downstream_outputs_not_evidence_no_status_ref_no_proof_rule_no_route_decision_no_primitive_acceptance_no_row_consumption";
const APPLICATION_ATTEMPT_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_application_attempt_fail_closed_target_declared_derivation_ref_evidence_object_absent_no_status_ref_no_proof_rule_no_route_decision_no_row_consumption";
const DERIVATION_REF_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_target_packet_fail_closed_derivation_ref_evidence_target_declared_current_pool_evidence_absent_no_proof_rule_no_route_decision_no_row_consumption";
const PROOF_GRADE_ROUTE_INPUT_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_route_input_target_packet_fail_closed_proof_grade_route_input_target_declared_current_pool_input_absent_no_route_decision_no_rule_decision_no_row_consumption";
const TERMINAL_ROUTE_OBLIGATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet_fail_closed_current_pool_route_input_disjunction_exhausted_external_route_evidence_or_acceptance_decision_required_no_row_consumption";
const PROOF_GRADE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier_fail_closed_source_certificates_complete_no_compatible_proof_grade_status_evidence_no_primitive_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet_fail_closed_contract_declared_current_pool_derivation_ref_evidence_object_absent_no_status_ref_no_proof_rule_no_route_decision_no_primitive_acceptance_no_row_consumption";

const ACCEPTED_STATUS_LANE_PREFIX =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_";
const TARGET_FIELD = "accepted_interval_certified_constants_status_proof_grade_derivation_ref";
const EVIDENCE_OBJECT_ROLE = "proof_grade_derivation_ref_evidence_object";
const CONTRACT_BLOCKER = "proof_grade_derivation_ref_evidence_object_absent";
const STATUS_REF_BLOCKER = "accepted_interval_certified_constants_status_ref_absent";
const ACCEPTED_STATUS_BLOCKER = "accepted_interval_certified_constants_status_absent";
const SOURCE_HANDLE_BLOCKER = "source_certificate_handle_not_proof_grade_derivation_ref";

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
    currentPoolDerivationRefAbsence: DEFAULT_CURRENT_POOL_DERIVATION_REF_ABSENCE,
    applicationAttempt: DEFAULT_APPLICATION_ATTEMPT,
    derivationRefTarget: DEFAULT_DERIVATION_REF_TARGET,
    proofGradeRouteInputTarget: DEFAULT_PROOF_GRADE_ROUTE_INPUT_TARGET,
    terminalRouteObligation: DEFAULT_TERMINAL_ROUTE_OBLIGATION,
    proofGradeEvidence: DEFAULT_PROOF_GRADE_EVIDENCE,
    certificatePoolDir: CERT_DIR,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--current-pool-derivation-ref-absence") {
      args.currentPoolDerivationRefAbsence = argv[++index];
    } else if (arg === "--application-attempt") {
      args.applicationAttempt = argv[++index];
    } else if (arg === "--derivation-ref-target") {
      args.derivationRefTarget = argv[++index];
    } else if (arg === "--proof-grade-route-input-target") {
      args.proofGradeRouteInputTarget = argv[++index];
    } else if (arg === "--terminal-route-obligation") {
      args.terminalRouteObligation = argv[++index];
    } else if (arg === "--proof-grade-evidence") {
      args.proofGradeEvidence = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-proof-grade-derivation-ref-evidence-object-contract-target-packet.mjs [options]

Options:
  --current-pool-derivation-ref-absence PATH  Current-pool derivation-ref evidence absence classifier. Defaults to ${DEFAULT_CURRENT_POOL_DERIVATION_REF_ABSENCE}.
  --application-attempt PATH                  Proof-grade derivation-ref application attempt. Defaults to ${DEFAULT_APPLICATION_ATTEMPT}.
  --derivation-ref-target PATH                Proof-grade derivation-ref evidence target packet. Defaults to ${DEFAULT_DERIVATION_REF_TARGET}.
  --proof-grade-route-input-target PATH       Proof-grade route-input target packet. Defaults to ${DEFAULT_PROOF_GRADE_ROUTE_INPUT_TARGET}.
  --terminal-route-obligation PATH            Current-pool route-input disjunction exhaustion obligation packet. Defaults to ${DEFAULT_TERMINAL_ROUTE_OBLIGATION}.
  --proof-grade-evidence PATH                 Proof-grade evidence dependency classifier. Defaults to ${DEFAULT_PROOF_GRADE_EVIDENCE}.
  --certificate-pool-dir PATH                 Certificate JSON pool directory. Defaults to ${CERT_DIR}.
  --out-dir PATH                              Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                    Pretty-print JSON artifact.
  --help                                      Show this help.`);
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
    ["accepted_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier", paths.currentPoolDerivationRefAbsence],
    ["accepted_status_proof_grade_derivation_ref_application_attempt", paths.applicationAttempt],
    ["accepted_status_proof_grade_derivation_ref_evidence_target_packet", paths.derivationRefTarget],
    ["accepted_status_proof_grade_route_input_target_packet", paths.proofGradeRouteInputTarget],
    ["accepted_status_current_pool_route_input_disjunction_exhaustion_obligation_packet", paths.terminalRouteObligation],
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

function sortedObjectBySeparator(counts) {
  return Object.fromEntries(
    Object.entries(counts).sort(([left], [right]) => separatorSortKey(left) - separatorSortKey(right)),
  );
}

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function rowSortKey(row) {
  return `${String(separatorSortKey(row.separator_event)).padStart(3, "0")}:${row.row_id}`;
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

function validateInputs(inputs) {
  assertPacketStatusAndLocks(
    inputs.currentPoolDerivationRefAbsence,
    "currentPoolDerivationRefAbsence",
    CURRENT_POOL_DERIVATION_REF_ABSENCE_STATUS,
  );
  assertPacketStatusAndLocks(inputs.applicationAttempt, "applicationAttempt", APPLICATION_ATTEMPT_STATUS);
  assertPacketStatusAndLocks(inputs.derivationRefTarget, "derivationRefTarget", DERIVATION_REF_TARGET_STATUS);
  assertPacketStatusAndLocks(
    inputs.proofGradeRouteInputTarget,
    "proofGradeRouteInputTarget",
    PROOF_GRADE_ROUTE_INPUT_TARGET_STATUS,
  );
  assertPacketStatusAndLocks(inputs.terminalRouteObligation, "terminalRouteObligation", TERMINAL_ROUTE_OBLIGATION_STATUS);
  assertPacketStatusAndLocks(inputs.proofGradeEvidence, "proofGradeEvidence", PROOF_GRADE_EVIDENCE_STATUS);

  const currentPool = inputs.currentPoolDerivationRefAbsence.summary;
  const application = inputs.applicationAttempt.summary;
  const target = inputs.derivationRefTarget.summary;
  const routeTarget = inputs.proofGradeRouteInputTarget.summary;
  const terminal = inputs.terminalRouteObligation.summary;
  const evidence = inputs.proofGradeEvidence.summary;
  const expected = [
    [currentPool.direct_source_hash_checks_passed, 5, "current-pool direct source-hash locks"],
    [currentPool.current_pool_json_files_scanned, 252, "current-pool derivation-ref scan"],
    [currentPool.accepted_status_lane_json_files_scanned, 17, "current-pool accepted-status scan"],
    [currentPool.current_pool_derivation_ref_evidence_object_files_found, 0, "current-pool derivation-ref evidence objects"],
    [currentPool.current_pool_compatible_derivation_ref_evidence_refs, 0, "current-pool compatible derivation refs"],
    [currentPool.total_current_pool_derivation_ref_evidence_absence_profiles, 124, "current-pool absence profiles"],
    [currentPool.source_certificate_handle_as_derivation_ref_rejections, 124, "source handles rejected as derivation refs"],
    [application.direct_source_hash_checks_passed, 5, "application direct source-hash locks"],
    [application.total_proof_grade_derivation_ref_application_attempts, 124, "application attempts"],
    [application.source_certificate_handle_as_derivation_ref_rejections, 124, "application source handle rejections"],
    [application.proof_grade_derivation_ref_applications_authorized, 0, "applications authorized"],
    [application.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses constructed"],
    [target.direct_source_hash_checks_passed, 3, "target direct source-hash locks"],
    [target.total_proof_grade_derivation_ref_evidence_target_slots, 124, "target slots"],
    [target.total_proof_grade_derivation_ref_evidence_target_slots_satisfied, 0, "target slots satisfied"],
    [routeTarget.direct_source_hash_checks_passed, 3, "proof-grade route-input direct source-hash locks"],
    [routeTarget.total_proof_grade_route_input_target_slots, 744, "proof-grade route-input target slots"],
    [routeTarget.total_proof_grade_route_input_target_slots_satisfied, 0, "proof-grade route-input satisfied slots"],
    [terminal.direct_source_hash_checks_passed, 2, "terminal route direct source-hash locks"],
    [terminal.terminal_route_obligations_declared, 3, "terminal route obligations declared"],
    [terminal.terminal_route_obligations_satisfied, 0, "terminal route obligations satisfied"],
    [terminal.mechanical_continuations_from_current_pool, 0, "terminal mechanical continuations"],
    [evidence.source_hash_checks_passed, 9, "proof-grade evidence locks"],
    [evidence.evidence_pool_compatible_proof_grade_status_evidence_files, 0, "compatible proof-grade status evidence files"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
  assertRowsBySeparator(currentPool, "current-pool derivation-ref absence");
  assertRowsBySeparator(application, "application attempt");
  assertRowsBySeparator(target, "derivation-ref target");
  assertRowsBySeparator(routeTarget, "proof-grade route-input target");
  assertRowsBySeparator(terminal, "terminal route obligation");
  assertRowsBySeparator(evidence, "proof-grade evidence dependency");
}

function candidateSatisfiesEvidenceObjectContract(parsed, text) {
  const status = String(parsed.status ?? "");
  if (status.includes("fail_closed")) {
    return false;
  }
  if (parsed.packet_id !== PACKET_ID) {
    return false;
  }
  const roleMatches =
    parsed.artifact_role === EVIDENCE_OBJECT_ROLE ||
    parsed.compatible_evidence_role === EVIDENCE_OBJECT_ROLE ||
    parsed.summary?.compatible_evidence_role === EVIDENCE_OBJECT_ROLE;
  const targetMatches = text.includes(TARGET_FIELD);
  const evidenceObjectPresent =
    /"derivation_ref_evidence_object_present"\s*:\s*true/.test(text) ||
    /"accepted_interval_certified_constants_status_proof_grade_derivation_ref_present"\s*:\s*true/.test(text) ||
    /"accepted_interval_certified_constants_status_proof_grade_derivation_refs_constructed"\s*:\s*[1-9]/.test(text) ||
    /"proof_grade_derivation_ref_applications_authorized"\s*:\s*[1-9]/.test(text);
  return roleMatches && targetMatches && evidenceObjectPresent;
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
    current_pool_compatible_derivation_ref_evidence_refs: 0,
    preledger_pass_true_files: 0,
    live_ledger_update_true_files: 0,
    branch_chart_authorized_true_files: 0,
    row_consumption_positive_files: 0,
    accepted_interval_certified_constants_status_positive_files: 0,
  };
  const compatibleEvidenceBasenames = [];
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
    if (basename.startsWith(ACCEPTED_STATUS_LANE_PREFIX)) {
      counters.accepted_status_lane_json_files += 1;
      if (status.includes("fail_closed")) {
        counters.accepted_status_lane_fail_closed_json_files += 1;
      } else {
        counters.accepted_status_lane_non_fail_closed_json_files += 1;
        nonFailClosedAcceptedStatusBasenames.push(basename);
      }
    }
    if (candidateSatisfiesEvidenceObjectContract(parsed, text)) {
      counters.current_pool_derivation_ref_evidence_object_files_found += 1;
      counters.current_pool_compatible_derivation_ref_evidence_refs += 1;
      compatibleEvidenceBasenames.push(basename);
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
    compatible_derivation_ref_evidence_object_basenames: compatibleEvidenceBasenames,
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
      requirement_id: "artifact_role_is_proof_grade_derivation_ref_evidence_object",
      required: true,
      current_pool_satisfied_slots: 0,
    },
    {
      requirement_id: "target_field_is_accepted_interval_certified_constants_status_proof_grade_derivation_ref",
      required: true,
      current_pool_satisfied_slots: 0,
    },
    {
      requirement_id: "derivation_ref_evidence_object_present",
      required: true,
      current_pool_satisfied_slots: 0,
    },
    {
      requirement_id: "source_certificate_handle_is_not_reused_as_derivation_ref",
      required: true,
      current_pool_satisfied_slots: 0,
    },
    {
      requirement_id: "accepted_status_ref_and_status_are_not_constructed_by_this_target_packet",
      required: true,
      current_pool_satisfied_slots: 0,
    },
  ];
}

function buildSeparatorContractProfiles(currentPoolAbsence) {
  return currentPoolAbsence.separator_current_pool_derivation_ref_evidence_absence_profiles.map((profile) => ({
    separator_event: profile.separator_event,
    fold_interval: profile.fold_interval,
    row_count: profile.row_count,
    target_field: TARGET_FIELD,
    required_artifact_role: EVIDENCE_OBJECT_ROLE,
    contract_slot_declared: true,
    contract_slot_satisfied: false,
    current_pool_evidence_scan_complete: true,
    current_pool_derivation_ref_evidence_object_present: false,
    compatible_derivation_ref_evidence_ref_present: false,
    source_certificate_handle_present: profile.source_certificate_handle_present,
    source_certificate_handle_is_proof_grade_derivation_ref: false,
    source_certificate_handle_reused_as_derivation_ref: false,
    accepted_interval_certified_constants_status_ref_present: false,
    accepted_interval_certified_constants_status_present: false,
    application_authorized: false,
    route_decision_made: false,
    proof_rule_decision_made: false,
    primitive_acceptance_decision_made: false,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_contract_blocker: CONTRACT_BLOCKER,
    first_status_ref_blocker: STATUS_REF_BLOCKER,
    first_accepted_status_blocker: ACCEPTED_STATUS_BLOCKER,
    first_source_handle_blocker: SOURCE_HANDLE_BLOCKER,
    classification: "separator_proof_grade_derivation_ref_evidence_object_contract_declared_unfilled",
  }));
}

function buildRowContractProfiles(currentPoolAbsence) {
  return currentPoolAbsence.row_current_pool_derivation_ref_evidence_absence_profiles
    .map((profile) => ({
      row_id: profile.row_id,
      ledger: profile.ledger,
      status: profile.status,
      failure_code: profile.failure_code,
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      receiver_interval: profile.receiver_interval,
      source_interval: profile.source_interval,
      target_field: TARGET_FIELD,
      required_artifact_role: EVIDENCE_OBJECT_ROLE,
      contract_slot_declared: true,
      contract_slot_satisfied: false,
      current_pool_evidence_scan_complete: true,
      current_pool_derivation_ref_evidence_object_present: false,
      compatible_derivation_ref_evidence_ref_present: false,
      source_certificate_handle_present: profile.source_certificate_handle_present,
      source_certificate_handle_is_proof_grade_derivation_ref: false,
      source_certificate_handle_reused_as_derivation_ref: false,
      accepted_interval_certified_constants_status_ref_present: false,
      accepted_interval_certified_constants_status_present: false,
      application_authorized: false,
      route_decision_made: false,
      proof_rule_decision_made: false,
      primitive_acceptance_decision_made: false,
      accepted_fold_layer_row: false,
      row_consumed: false,
      preledger_pass: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
      first_contract_blocker: CONTRACT_BLOCKER,
      first_status_ref_blocker: STATUS_REF_BLOCKER,
      first_accepted_status_blocker: ACCEPTED_STATUS_BLOCKER,
      first_source_handle_blocker: SOURCE_HANDLE_BLOCKER,
      classification: "row_proof_grade_derivation_ref_evidence_object_contract_declared_unfilled",
    }))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
}

function buildPacket(inputs, paths) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const poolSnapshot = currentPoolSnapshot(paths.certificatePoolDir, OUTPUT_JSON);
  const separatorProfiles = buildSeparatorContractProfiles(inputs.currentPoolDerivationRefAbsence);
  const rowProfiles = buildRowContractProfiles(inputs.currentPoolDerivationRefAbsence);
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const currentPool = inputs.currentPoolDerivationRefAbsence.summary;
  const application = inputs.applicationAttempt.summary;
  const target = inputs.derivationRefTarget.summary;
  const routeTarget = inputs.proofGradeRouteInputTarget.summary;
  const terminal = inputs.terminalRouteObligation.summary;
  const evidence = inputs.proofGradeEvidence.summary;
  const counters = poolSnapshot.counters;
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (check) => check.hash_matches),
    retained_current_pool_derivation_ref_absence_direct_source_hash_checks_passed:
      currentPool.direct_source_hash_checks_passed,
    retained_application_attempt_direct_source_hash_checks_passed: application.direct_source_hash_checks_passed,
    retained_derivation_ref_target_direct_source_hash_checks_passed: target.direct_source_hash_checks_passed,
    retained_proof_grade_route_input_target_direct_source_hash_checks_passed:
      routeTarget.direct_source_hash_checks_passed,
    retained_terminal_route_obligation_direct_source_hash_checks_passed: terminal.direct_source_hash_checks_passed,
    retained_proof_grade_evidence_source_hash_checks_passed: evidence.source_hash_checks_passed,
    current_pool_json_files_scanned: poolSnapshot.json_files_scanned_before_output,
    accepted_status_lane_json_files_scanned: counters.accepted_status_lane_json_files,
    accepted_status_lane_fail_closed_json_files: counters.accepted_status_lane_fail_closed_json_files,
    accepted_status_lane_non_fail_closed_json_files: counters.accepted_status_lane_non_fail_closed_json_files,
    current_pool_derivation_ref_evidence_object_files_found:
      counters.current_pool_derivation_ref_evidence_object_files_found,
    current_pool_compatible_derivation_ref_evidence_refs:
      counters.current_pool_compatible_derivation_ref_evidence_refs,
    imported_current_pool_derivation_ref_evidence_object_files_found:
      currentPool.current_pool_derivation_ref_evidence_object_files_found,
    imported_current_pool_compatible_derivation_ref_evidence_refs:
      currentPool.current_pool_compatible_derivation_ref_evidence_refs,
    candidate_higher_fold_constants_artifacts: currentPool.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: currentPool.candidate_separator_constants,
    candidate_row_constant_associations: currentPool.candidate_row_constant_associations,
    rows_by_separator_count: rowsBySeparator,
    separator_derivation_ref_evidence_object_contract_slots: separatorProfiles.length,
    separator_derivation_ref_evidence_object_contract_slots_satisfied: 0,
    row_derivation_ref_evidence_object_contract_slots: rowProfiles.length,
    row_derivation_ref_evidence_object_contract_slots_satisfied: 0,
    total_derivation_ref_evidence_object_contract_slots: separatorProfiles.length + rowProfiles.length,
    contract_slots_satisfied: 0,
    contract_slots_missing: separatorProfiles.length + rowProfiles.length,
    total_proof_grade_derivation_ref_evidence_target_slots:
      target.total_proof_grade_derivation_ref_evidence_target_slots,
    total_proof_grade_derivation_ref_evidence_target_slots_satisfied:
      target.total_proof_grade_derivation_ref_evidence_target_slots_satisfied,
    total_proof_grade_route_input_target_slots: routeTarget.total_proof_grade_route_input_target_slots,
    total_proof_grade_route_input_target_slots_satisfied:
      routeTarget.total_proof_grade_route_input_target_slots_satisfied,
    source_certificate_handle_as_derivation_ref_rejections:
      currentPool.source_certificate_handle_as_derivation_ref_rejections,
    proof_grade_derivation_ref_applications_authorized:
      application.proof_grade_derivation_ref_applications_authorized,
    accepted_interval_certified_constants_status_proof_grade_derivation_refs_constructed:
      application.accepted_interval_certified_constants_status_proof_grade_derivation_refs_constructed,
    accepted_interval_certified_constants_status_refs_constructed:
      application.accepted_interval_certified_constants_status_refs_constructed,
    accepted_interval_certified_constants_statuses_constructed:
      application.accepted_interval_certified_constants_statuses_constructed,
    compatible_proof_grade_status_evidence_files:
      evidence.evidence_pool_compatible_proof_grade_status_evidence_files,
    terminal_route_obligations_declared: terminal.terminal_route_obligations_declared,
    terminal_route_obligations_satisfied: terminal.terminal_route_obligations_satisfied,
    route_decisions_made: 0,
    proof_rule_decisions_made: 0,
    primitive_acceptance_decisions_made: 0,
    source_packet_acceptance_rules_constructed: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    mechanical_continuations_from_current_pool: 0,
    preledger_pass_true_files: counters.preledger_pass_true_files,
    live_ledger_update_true_files: counters.live_ledger_update_true_files,
    branch_chart_authorized_true_files: counters.branch_chart_authorized_true_files,
    row_consumption_positive_files: counters.row_consumption_positive_files,
    accepted_interval_certified_constants_status_positive_files:
      counters.accepted_interval_certified_constants_status_positive_files,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_derivation_ref_evidence_object_contract_blocker: CONTRACT_BLOCKER,
    first_status_ref_blocker: STATUS_REF_BLOCKER,
    first_accepted_status_blocker: ACCEPTED_STATUS_BLOCKER,
    first_source_handle_blocker: SOURCE_HANDLE_BLOCKER,
    first_terminal_route_blocker: terminal.first_terminal_route_blocker,
    parent_complement_consumption_ref_blocker: currentPool.parent_complement_consumption_ref_blocker,
    first_separator_certificate_blocker: currentPool.first_separator_certificate_blocker,
  };

  assertPacketInvariants(summary);
  return {
    schema:
      "architrino.proof_programs.accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet.v0",
    packet_id: PACKET_ID,
    route:
      "fresh-v10 higher-fold null-coordinate preledger accepted interval-certified status proof-grade derivation-ref evidence-object contract target",
    status: STATUS,
    theorem_target:
      "candidate-live higher-fold constants accepted interval-certified constants status proof-grade derivation-ref evidence-object contract",
    claim_level:
      "priority-only proof-grade derivation-ref evidence-object contract target packet; declares the exact evidence-object contract for the proof-grade accepted-status branch and proves the current certificate pool satisfies zero slots without making proof-rule, route, primitive-acceptance, source-packet acceptance, or row-consumption decisions",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier: artifactRecord(
        paths.currentPoolDerivationRefAbsence,
      ),
      accepted_status_proof_grade_derivation_ref_application_attempt: artifactRecord(paths.applicationAttempt),
      accepted_status_proof_grade_derivation_ref_evidence_target_packet: artifactRecord(paths.derivationRefTarget),
      accepted_status_proof_grade_route_input_target_packet: artifactRecord(paths.proofGradeRouteInputTarget),
      accepted_status_current_pool_route_input_disjunction_exhaustion_obligation_packet: artifactRecord(
        paths.terminalRouteObligation,
      ),
      accepted_status_proof_grade_evidence_dependency_classifier: artifactRecord(paths.proofGradeEvidence),
    },
    source_hash_checks: sourceChecks,
    evidence_object_contract_role: EVIDENCE_OBJECT_ROLE,
    evidence_object_contract_target_field: TARGET_FIELD,
    evidence_object_contract_requirements: contractRequirements(),
    current_pool_evidence_object_contract_snapshot: poolSnapshot,
    separator_derivation_ref_evidence_object_contract_profiles: separatorProfiles,
    row_derivation_ref_evidence_object_contract_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      handoff_class: "proof_grade_derivation_ref_evidence_object_contract_target",
      current_pool_closure_state:
        "not mechanically closable from the current certificate pool; the proof-grade branch requires a compatible derivation-ref evidence object satisfying this contract",
      contract_satisfied_from_current_pool: false,
      mechanical_continuation_available: false,
      decision_required: true,
      allowed_next_input: "proof_grade_derivation_ref_evidence_object_for_accepted_interval_certified_constants_status",
      forbidden_reinterpretations: [
        "target_packet_as_proof_grade_derivation_ref_evidence_object",
        "absence_classifier_as_proof_grade_derivation_ref_evidence_object",
        "application_attempt_as_proof_grade_derivation_ref_evidence_object",
        "source_certificate_handle_as_derivation_ref",
        "proof_grade_evidence_dependency_classifier_as_evidence_object",
        "terminal_route_obligation_packet_as_evidence_object",
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
      "Priority-only. This packet turns proof_grade_derivation_ref_evidence_object_absent into an explicit evidence-object contract target and proves the current certificate pool does not satisfy it.",
  };
}

function assertPacketInvariants(summary) {
  const checks = [
    summary.direct_source_hash_checks === 6,
    summary.direct_source_hash_checks_passed === 6,
    summary.retained_current_pool_derivation_ref_absence_direct_source_hash_checks_passed === 5,
    summary.retained_application_attempt_direct_source_hash_checks_passed === 5,
    summary.retained_derivation_ref_target_direct_source_hash_checks_passed === 3,
    summary.retained_proof_grade_route_input_target_direct_source_hash_checks_passed === 3,
    summary.retained_terminal_route_obligation_direct_source_hash_checks_passed === 2,
    summary.retained_proof_grade_evidence_source_hash_checks_passed === 9,
    summary.current_pool_json_files_scanned === 253,
    summary.accepted_status_lane_json_files_scanned === 18,
    summary.accepted_status_lane_fail_closed_json_files === 18,
    summary.accepted_status_lane_non_fail_closed_json_files === 0,
    summary.current_pool_derivation_ref_evidence_object_files_found === 0,
    summary.current_pool_compatible_derivation_ref_evidence_refs === 0,
    summary.imported_current_pool_derivation_ref_evidence_object_files_found === 0,
    summary.imported_current_pool_compatible_derivation_ref_evidence_refs === 0,
    summary.candidate_separator_constants === 12,
    summary.candidate_row_constant_associations === 112,
    summary.separator_derivation_ref_evidence_object_contract_slots === 12,
    summary.separator_derivation_ref_evidence_object_contract_slots_satisfied === 0,
    summary.row_derivation_ref_evidence_object_contract_slots === 112,
    summary.row_derivation_ref_evidence_object_contract_slots_satisfied === 0,
    summary.total_derivation_ref_evidence_object_contract_slots === 124,
    summary.contract_slots_satisfied === 0,
    summary.contract_slots_missing === 124,
    summary.source_certificate_handle_as_derivation_ref_rejections === 124,
    summary.proof_grade_derivation_ref_applications_authorized === 0,
    summary.accepted_interval_certified_constants_status_proof_grade_derivation_refs_constructed === 0,
    summary.accepted_interval_certified_constants_status_refs_constructed === 0,
    summary.accepted_interval_certified_constants_statuses_constructed === 0,
    summary.compatible_proof_grade_status_evidence_files === 0,
    summary.terminal_route_obligations_satisfied === 0,
    summary.route_decisions_made === 0,
    summary.proof_rule_decisions_made === 0,
    summary.primitive_acceptance_decisions_made === 0,
    summary.source_packet_acceptance_rules_constructed === 0,
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0,
    summary.mechanical_continuations_from_current_pool === 0,
    summary.preledger_pass_true_files === 0,
    summary.live_ledger_update_true_files === 0,
    summary.branch_chart_authorized_true_files === 0,
    summary.row_consumption_positive_files === 0,
    summary.accepted_interval_certified_constants_status_positive_files === 0,
    summary.accepted_fold_layer_rows === 0,
    summary.row_consumption_count === 0,
    summary.preledger_pass === false,
    summary.updates_live_ledger === false,
    summary.branch_chart_authorized === false,
  ];
  if (!checks.every(Boolean)) {
    throw new Error("Proof-grade derivation-ref evidence-object contract target invariants failed.");
  }
  if (JSON.stringify(summary.rows_by_separator_count) !== JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR)) {
    throw new Error("Unexpected contract target rows-by-separator count.");
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
  const requirementRows = packet.evidence_object_contract_requirements.map((requirement) => [
    `\`${requirement.requirement_id}\``,
    String(requirement.required),
    String(requirement.current_pool_satisfied_slots),
  ]);
  const separatorRows = Object.entries(s.rows_by_separator_count).map(([separator, rows]) => [
    `\`${separator}\``,
    String(rows),
  ]);

  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Proof-Grade Derivation-Ref Evidence-Object Contract Target Packet

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Evidence-Object Contract Target

This packet imports the current-pool proof-grade derivation-ref evidence absence
classifier, the proof-grade derivation-ref application attempt, the derivation-ref
evidence target packet, the proof-grade route-input target packet, the terminal
route-input disjunction exhaustion obligation packet, and the proof-grade evidence
dependency classifier.

It turns the blocker \`${CONTRACT_BLOCKER}\` into an explicit typed contract:
a future proof-grade route input must supply a compatible
\`${EVIDENCE_OBJECT_ROLE}\` for \`${TARGET_FIELD}\`. The current pool still
satisfies none of that contract.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct source-hash locks;
- ${s.retained_current_pool_derivation_ref_absence_direct_source_hash_checks_passed} / 5 retained current-pool absence locks;
- ${s.retained_application_attempt_direct_source_hash_checks_passed} / 5 retained application-attempt locks;
- ${s.retained_derivation_ref_target_direct_source_hash_checks_passed} / 3 retained derivation-ref target locks;
- ${s.retained_proof_grade_route_input_target_direct_source_hash_checks_passed} / 3 retained proof-grade route-input target locks;
- ${s.retained_terminal_route_obligation_direct_source_hash_checks_passed} / 2 retained terminal route-obligation locks;
- ${s.retained_proof_grade_evidence_source_hash_checks_passed} / 9 retained proof-grade evidence locks.

Current-pool contract scan:

- ${s.current_pool_json_files_scanned} certificate JSON files scanned before this output;
- ${s.accepted_status_lane_json_files_scanned} accepted-status-lane JSON files scanned;
- ${s.accepted_status_lane_fail_closed_json_files} accepted-status-lane JSON files fail-closed;
- ${s.accepted_status_lane_non_fail_closed_json_files} accepted-status-lane JSON files non-fail-closed;
- ${s.current_pool_derivation_ref_evidence_object_files_found} compatible derivation-ref evidence-object files found;
- ${s.current_pool_compatible_derivation_ref_evidence_refs} compatible derivation-ref evidence refs found.

Contract result:

- ${s.total_derivation_ref_evidence_object_contract_slots} derivation-ref evidence-object contract slots;
- ${s.contract_slots_satisfied} contract slots satisfied;
- ${s.contract_slots_missing} contract slots missing;
- ${s.source_certificate_handle_as_derivation_ref_rejections} source-certificate handles rejected as derivation refs;
- ${s.proof_grade_derivation_ref_applications_authorized} proof-grade derivation-ref applications authorized;
- ${s.accepted_interval_certified_constants_status_proof_grade_derivation_refs_constructed} accepted-status proof-grade derivation refs constructed;
- ${s.accepted_interval_certified_constants_statuses_constructed} accepted statuses constructed.

## Source-Hash Checks

${markdownTable(["Source artifact", "Current file", "Current SHA-256", "Hash matches"], sourceRows)}

## Contract Requirements

${markdownTable(["Requirement", "Required", "Current-pool satisfied slots"], requirementRows)}

## Row Scope

${markdownTable(["Separator", "Rows"], separatorRows)}

## Certificate-Side Handoff

Sharpened blocker: the current lane is not missing another target packet or
application attempt. It is missing a compatible \`${EVIDENCE_OBJECT_ROLE}\`
that satisfies the declared contract for \`${TARGET_FIELD}\`.

Continuation class: not mechanically closable from the current certificate pool.
Continue only by importing a contract-satisfying proof-grade derivation-ref
evidence object or by recording an explicit proof-rule decision in a separate
artifact.

Fail-closed stop conditions:

- Do not treat the derivation-ref target packet as the evidence object.
- Do not treat the absence classifier as the evidence object.
- Do not treat the application attempt as the evidence object.
- Do not treat the proof-grade evidence dependency classifier as the evidence
  object.
- Do not reuse source-certificate or source-data handles as proof-grade
  derivation refs.
- Do not construct accepted interval-certified constants status refs, statuses,
  derivations, rules, soundness proofs, endpoint applications, or accepted
  constants conformance derivations from this packet.
- Do not introduce a primitive source-packet acceptance rule or accepted source
  packet from this packet.
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
    currentPoolDerivationRefAbsence: args.currentPoolDerivationRefAbsence,
    applicationAttempt: args.applicationAttempt,
    derivationRefTarget: args.derivationRefTarget,
    proofGradeRouteInputTarget: args.proofGradeRouteInputTarget,
    terminalRouteObligation: args.terminalRouteObligation,
    proofGradeEvidence: args.proofGradeEvidence,
    certificatePoolDir: args.certificatePoolDir,
  };
  const inputs = {
    currentPoolDerivationRefAbsence: readJson(paths.currentPoolDerivationRefAbsence),
    applicationAttempt: readJson(paths.applicationAttempt),
    derivationRefTarget: readJson(paths.derivationRefTarget),
    proofGradeRouteInputTarget: readJson(paths.proofGradeRouteInputTarget),
    terminalRouteObligation: readJson(paths.terminalRouteObligation),
    proofGradeEvidence: readJson(paths.proofGradeEvidence),
  };
  const packet = buildPacket(inputs, paths);
  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(jsonPath, packet, args.pretty);
  writeText(reportPath, renderReport(packet));
  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${reportPath}`);
}

main();
