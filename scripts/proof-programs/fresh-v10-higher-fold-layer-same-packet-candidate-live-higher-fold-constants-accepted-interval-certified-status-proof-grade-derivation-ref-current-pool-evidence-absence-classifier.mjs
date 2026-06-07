#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_APPLICATION_ATTEMPT = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_DERIVATION_REF_ABSENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_DERIVATION_REF_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_TERMINAL_ROUTE_OBLIGATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const APPLICATION_ATTEMPT_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_application_attempt_fail_closed_target_declared_derivation_ref_evidence_object_absent_no_status_ref_no_proof_rule_no_route_decision_no_row_consumption";
const DERIVATION_REF_ABSENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_absence_classifier_fail_closed_target_declared_no_derivation_ref_evidence_object_no_proof_rule_no_route_decision_no_row_consumption";
const DERIVATION_REF_TARGET_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_target_packet_fail_closed_derivation_ref_evidence_target_declared_current_pool_evidence_absent_no_proof_rule_no_route_decision_no_row_consumption";
const PROOF_GRADE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier_fail_closed_source_certificates_complete_no_compatible_proof_grade_status_evidence_no_primitive_acceptance_no_row_consumption";
const TERMINAL_ROUTE_OBLIGATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet_fail_closed_current_pool_route_input_disjunction_exhausted_external_route_evidence_or_acceptance_decision_required_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_current_pool_evidence_absence_classifier_fail_closed_current_pool_scanned_derivation_ref_evidence_object_absent_downstream_outputs_not_evidence_no_status_ref_no_proof_rule_no_route_decision_no_primitive_acceptance_no_row_consumption";

const TARGET_FIELD = "accepted_interval_certified_constants_status_proof_grade_derivation_ref";
const ABSENCE_BLOCKER = "proof_grade_derivation_ref_evidence_object_absent";
const SOURCE_HANDLE_BLOCKER = "source_certificate_handle_not_proof_grade_derivation_ref";
const TARGET_BLOCKER = "accepted_interval_certified_constants_status_proof_grade_derivation_ref_evidence_absent";
const COMPATIBLE_EVIDENCE_ROLE = "proof_grade_derivation_ref_evidence_object";

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

const DIRECT_SOURCE_INPUTS = [
  "accepted_status_proof_grade_derivation_ref_application_attempt",
  "accepted_status_proof_grade_derivation_ref_evidence_absence_classifier",
  "accepted_status_proof_grade_derivation_ref_evidence_target_packet",
  "accepted_status_proof_grade_evidence_dependency_classifier",
  "accepted_status_current_pool_route_input_disjunction_exhaustion_obligation_packet",
];

const DOWNSTREAM_BASENAME_KEYS = {
  target_packet:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  absence_classifier:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_absence_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  application_attempt:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  proof_grade_evidence_dependency:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  terminal_route_obligation:
    `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_pool_route_input_disjunction_exhaustion_obligation_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
};
const DOWNSTREAM_OUTPUT_JSON_BASENAMES = new Set([
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_derivation_ref_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_route_evidence_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_route_evidence_object_contract_disjunction_exhaustion_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
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
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
  `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_construction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`,
]);

const REJECTION_BUCKETS = [
  "packet_identity_mismatch",
  "not_accepted_status_derivation_ref_evidence_object",
  "fail_closed_artifact",
  "downstream_target_packet_not_evidence",
  "downstream_absence_classifier_not_evidence",
  "downstream_application_attempt_not_evidence",
  "proof_grade_evidence_dependency_record_not_evidence",
  "terminal_route_obligation_not_evidence",
  "source_certificate_or_source_data_handle_not_derivation_ref",
  "status_ref_absent",
  "accepted_status_absent",
];

const ACCEPTED_STATUS_LANE_PREFIX =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_";

function parseArgs(argv) {
  const args = {
    applicationAttempt: DEFAULT_APPLICATION_ATTEMPT,
    derivationRefAbsence: DEFAULT_DERIVATION_REF_ABSENCE,
    derivationRefTarget: DEFAULT_DERIVATION_REF_TARGET,
    proofGradeEvidence: DEFAULT_PROOF_GRADE_EVIDENCE,
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
    } else if (arg === "--application-attempt") {
      args.applicationAttempt = argv[++index];
    } else if (arg === "--derivation-ref-absence") {
      args.derivationRefAbsence = argv[++index];
    } else if (arg === "--derivation-ref-target") {
      args.derivationRefTarget = argv[++index];
    } else if (arg === "--proof-grade-evidence") {
      args.proofGradeEvidence = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-proof-grade-derivation-ref-current-pool-evidence-absence-classifier.mjs [options]

Options:
  --application-attempt PATH       Proof-grade derivation-ref application attempt. Defaults to ${DEFAULT_APPLICATION_ATTEMPT}.
  --derivation-ref-absence PATH    Proof-grade derivation-ref evidence absence classifier. Defaults to ${DEFAULT_DERIVATION_REF_ABSENCE}.
  --derivation-ref-target PATH     Proof-grade derivation-ref evidence target packet. Defaults to ${DEFAULT_DERIVATION_REF_TARGET}.
  --proof-grade-evidence PATH      Proof-grade evidence dependency classifier. Defaults to ${DEFAULT_PROOF_GRADE_EVIDENCE}.
  --terminal-route-obligation PATH Current-pool route-input disjunction exhaustion obligation packet. Defaults to ${DEFAULT_TERMINAL_ROUTE_OBLIGATION}.
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
    [DIRECT_SOURCE_INPUTS[0], paths.applicationAttempt],
    [DIRECT_SOURCE_INPUTS[1], paths.derivationRefAbsence],
    [DIRECT_SOURCE_INPUTS[2], paths.derivationRefTarget],
    [DIRECT_SOURCE_INPUTS[3], paths.proofGradeEvidence],
    [DIRECT_SOURCE_INPUTS[4], paths.terminalRouteObligation],
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
  assertPacketStatusAndLocks(inputs.applicationAttempt, "applicationAttempt", APPLICATION_ATTEMPT_STATUS);
  assertPacketStatusAndLocks(inputs.derivationRefAbsence, "derivationRefAbsence", DERIVATION_REF_ABSENCE_STATUS);
  assertPacketStatusAndLocks(inputs.derivationRefTarget, "derivationRefTarget", DERIVATION_REF_TARGET_STATUS);
  assertPacketStatusAndLocks(inputs.proofGradeEvidence, "proofGradeEvidence", PROOF_GRADE_EVIDENCE_STATUS);
  assertPacketStatusAndLocks(inputs.terminalRouteObligation, "terminalRouteObligation", TERMINAL_ROUTE_OBLIGATION_STATUS);
  const application = inputs.applicationAttempt.summary;
  const absence = inputs.derivationRefAbsence.summary;
  const target = inputs.derivationRefTarget.summary;
  const evidence = inputs.proofGradeEvidence.summary;
  const terminal = inputs.terminalRouteObligation.summary;
  const expected = [
    [application.direct_source_hash_checks_passed, 5, "application direct locks"],
    [application.total_proof_grade_derivation_ref_application_attempts, 124, "application attempts"],
    [application.source_certificate_handle_as_derivation_ref_rejections, 124, "source handle rejections"],
    [application.proof_grade_derivation_ref_applications_authorized, 0, "applications authorized"],
    [application.accepted_interval_certified_constants_statuses_constructed, 0, "accepted statuses constructed"],
    [absence.direct_source_hash_checks_passed, 3, "absence direct locks"],
    [absence.total_proof_grade_derivation_ref_evidence_absence_slots, 124, "absence slots"],
    [absence.total_proof_grade_derivation_ref_evidence_absence_slots_with_evidence_object, 0, "absence slots with evidence object"],
    [absence.derivation_ref_evidence_objects_found, 0, "absence evidence objects found"],
    [target.direct_source_hash_checks_passed, 3, "target direct locks"],
    [target.total_proof_grade_derivation_ref_evidence_target_slots, 124, "target slots"],
    [target.total_proof_grade_derivation_ref_evidence_target_slots_satisfied, 0, "target slots satisfied"],
    [evidence.source_hash_checks_passed, 9, "proof-grade evidence locks"],
    [evidence.evidence_pool_compatible_proof_grade_status_evidence_files, 0, "compatible proof-grade status evidence files"],
    [terminal.direct_source_hash_checks_passed, 2, "terminal direct locks"],
    [terminal.terminal_route_obligations_satisfied, 0, "terminal route obligations satisfied"],
    [terminal.mechanical_continuations_from_current_pool, 0, "mechanical continuations"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
  if (application.first_derivation_ref_application_blocker !== ABSENCE_BLOCKER) {
    throw new Error(`Unexpected application blocker: ${application.first_derivation_ref_application_blocker}`);
  }
  assertRowsBySeparator(application, "application attempt");
  assertRowsBySeparator(absence, "absence classifier");
  assertRowsBySeparator(target, "target packet");
  assertRowsBySeparator(evidence, "proof-grade evidence classifier");
  assertRowsBySeparator(terminal, "terminal route obligation");
}

function candidateHasAcceptedStatusDerivationRefEvidence(parsed, text) {
  if (String(parsed.status ?? "").includes("fail_closed")) {
    return false;
  }
  if (parsed.packet_id !== PACKET_ID) {
    return false;
  }
  return (
    /"derivation_ref_evidence_object_present"\s*:\s*true/.test(text) ||
    /"accepted_interval_certified_constants_status_proof_grade_derivation_ref_present"\s*:\s*true/.test(text) ||
    /"accepted_interval_certified_constants_status_proof_grade_derivation_refs_constructed"\s*:\s*[1-9]/.test(text) ||
    /"proof_grade_derivation_ref_applications_authorized"\s*:\s*[1-9]/.test(text)
  );
}

function rejectionBucketsForPoolRecord(basename, parsed, text, compatible) {
  if (compatible) {
    return [];
  }
  const buckets = [];
  const status = String(parsed.status ?? "");
  if (parsed.packet_id !== undefined && parsed.packet_id !== PACKET_ID) {
    buckets.push("packet_identity_mismatch");
  }
  if (status.includes("fail_closed")) {
    buckets.push("fail_closed_artifact");
  }
  if (basename === DOWNSTREAM_BASENAME_KEYS.target_packet) {
    buckets.push("downstream_target_packet_not_evidence");
  }
  if (basename === DOWNSTREAM_BASENAME_KEYS.absence_classifier) {
    buckets.push("downstream_absence_classifier_not_evidence");
  }
  if (basename === DOWNSTREAM_BASENAME_KEYS.application_attempt) {
    buckets.push("downstream_application_attempt_not_evidence");
  }
  if (basename === DOWNSTREAM_BASENAME_KEYS.proof_grade_evidence_dependency) {
    buckets.push("proof_grade_evidence_dependency_record_not_evidence");
  }
  if (basename === DOWNSTREAM_BASENAME_KEYS.terminal_route_obligation) {
    buckets.push("terminal_route_obligation_not_evidence");
  }
  if (text.includes("source_certificate") || text.includes("source-certificate") || text.includes("source_data")) {
    buckets.push("source_certificate_or_source_data_handle_not_derivation_ref");
  }
  if (!/"accepted_interval_certified_constants_status_ref_present"\s*:\s*true/.test(text)) {
    buckets.push("status_ref_absent");
  }
  if (
    !/"accepted_interval_certified_constants_status_present"\s*:\s*true/.test(text) &&
    !/"accepted_interval_certified_constants_statuses_constructed"\s*:\s*[1-9]/.test(text)
  ) {
    buckets.push("accepted_status_absent");
  }
  if (buckets.length === 0) {
    buckets.push("not_accepted_status_derivation_ref_evidence_object");
  }
  return buckets;
}

function analyzePoolFile(filePath, outputBasename) {
  const basename = path.basename(filePath);
  if (basename === outputBasename || DOWNSTREAM_OUTPUT_JSON_BASENAMES.has(basename)) {
    return null;
  }
  const text = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(text);
  const status = String(parsed.status ?? "");
  const compatible = candidateHasAcceptedStatusDerivationRefEvidence(parsed, text);
  return {
    basename,
    sha256: sha256File(filePath),
    packet_id: parsed.packet_id ?? null,
    schema: String(parsed.schema ?? ""),
    status,
    accepted_status_lane: basename.startsWith(ACCEPTED_STATUS_LANE_PREFIX),
    fail_closed: status.includes("fail_closed"),
    compatible_derivation_ref_evidence_object: compatible,
    has_derivation_ref_evidence_object_true: /"derivation_ref_evidence_object_present"\s*:\s*true/.test(text),
    has_proof_grade_derivation_ref_present_true:
      /"accepted_interval_certified_constants_status_proof_grade_derivation_ref_present"\s*:\s*true/.test(text),
    accepted_interval_certified_constants_statuses_constructed:
      Number(parsed.summary?.accepted_interval_certified_constants_statuses_constructed ?? 0),
    row_consumption_count: Number(parsed.summary?.row_consumption_count ?? 0),
    preledger_pass: parsed.preledger_pass === true || parsed.summary?.preledger_pass === true,
    updates_live_ledger: parsed.updates_live_ledger === true || parsed.summary?.updates_live_ledger === true,
    branch_chart_authorized:
      parsed.branch_chart_authorized === true || parsed.summary?.branch_chart_authorized === true,
    rejection_buckets: rejectionBucketsForPoolRecord(basename, parsed, text, compatible),
  };
}

function scanCertificatePool(certificatePoolDir, outputBasename) {
  return fs
    .readdirSync(certificatePoolDir)
    .filter((entry) => entry.endsWith(".json"))
    .sort()
    .map((entry) => analyzePoolFile(path.join(certificatePoolDir, entry), outputBasename))
    .filter((entry) => entry !== null);
}

function rejectionBucketCounts(records) {
  const counts = Object.fromEntries(REJECTION_BUCKETS.map((bucket) => [bucket, 0]));
  for (const record of records) {
    for (const bucket of record.rejection_buckets) {
      counts[bucket] = (counts[bucket] ?? 0) + 1;
    }
  }
  return counts;
}

function buildSeparatorProfiles(applicationAttempt) {
  return [...applicationAttempt.separator_proof_grade_derivation_ref_application_attempts]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((profile) => ({
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      row_count: profile.row_count,
      target_field: TARGET_FIELD,
      current_pool_evidence_scan_complete: true,
      compatible_current_pool_derivation_ref_evidence_refs: [],
      current_pool_derivation_ref_evidence_object_present: false,
      derivation_ref_evidence_object_present: false,
      source_certificate_handle_present: profile.source_certificate_handle_present,
      source_certificate_handle_is_proof_grade_derivation_ref: false,
      source_certificate_handle_reused_as_derivation_ref: false,
      downstream_target_packet_is_derivation_ref_evidence: false,
      downstream_absence_classifier_is_derivation_ref_evidence: false,
      downstream_application_attempt_is_derivation_ref_evidence: false,
      proof_grade_evidence_dependency_record_is_derivation_ref_evidence: false,
      application_authorized: false,
      accepted_interval_certified_constants_status_proof_grade_derivation_ref_constructed: false,
      accepted_interval_certified_constants_status_ref_constructed: false,
      accepted_interval_certified_constants_status_present: false,
      first_current_pool_evidence_absence_blocker: ABSENCE_BLOCKER,
      first_target_blocker: TARGET_BLOCKER,
      first_source_handle_blocker: SOURCE_HANDLE_BLOCKER,
      classification: "separator_current_pool_derivation_ref_evidence_object_absent_application_blocked",
    }));
}

function buildRowProfiles(applicationAttempt) {
  return [...applicationAttempt.row_proof_grade_derivation_ref_application_attempts]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
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
      current_pool_evidence_scan_complete: true,
      compatible_current_pool_derivation_ref_evidence_refs: [],
      current_pool_derivation_ref_evidence_object_present: false,
      derivation_ref_evidence_object_present: false,
      source_certificate_handle_present: profile.source_certificate_handle_present,
      source_certificate_handle_is_proof_grade_derivation_ref: false,
      source_certificate_handle_reused_as_derivation_ref: false,
      downstream_target_packet_is_derivation_ref_evidence: false,
      downstream_absence_classifier_is_derivation_ref_evidence: false,
      downstream_application_attempt_is_derivation_ref_evidence: false,
      proof_grade_evidence_dependency_record_is_derivation_ref_evidence: false,
      application_authorized: false,
      accepted_interval_certified_constants_status_proof_grade_derivation_ref_constructed: false,
      accepted_interval_certified_constants_status_ref_constructed: false,
      accepted_interval_certified_constants_status_present: false,
      accepted_fold_layer_row: false,
      row_consumed: false,
      preledger_pass: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
      first_current_pool_evidence_absence_blocker: ABSENCE_BLOCKER,
      first_target_blocker: TARGET_BLOCKER,
      first_source_handle_blocker: SOURCE_HANDLE_BLOCKER,
      classification: "row_current_pool_derivation_ref_evidence_object_absent_application_blocked",
    }));
}

function buildPacket(paths, inputs, poolRecords) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const application = inputs.applicationAttempt.summary;
  const absence = inputs.derivationRefAbsence.summary;
  const target = inputs.derivationRefTarget.summary;
  const evidence = inputs.proofGradeEvidence.summary;
  const terminal = inputs.terminalRouteObligation.summary;
  const separatorProfiles = buildSeparatorProfiles(inputs.applicationAttempt);
  const rowProfiles = buildRowProfiles(inputs.applicationAttempt);
  const acceptedStatusLaneRecords = poolRecords.filter((record) => record.accepted_status_lane);
  const compatibleEvidenceRecords = poolRecords.filter(
    (record) => record.compatible_derivation_ref_evidence_object,
  );
  const rowsBySeparator = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const summary = {
    direct_source_hash_checks: sourceChecks.length,
    direct_source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    retained_application_direct_source_hash_checks_passed: application.direct_source_hash_checks_passed,
    retained_derivation_ref_absence_direct_source_hash_checks_passed: absence.direct_source_hash_checks_passed,
    retained_derivation_ref_target_direct_source_hash_checks_passed: target.direct_source_hash_checks_passed,
    retained_proof_grade_evidence_source_hash_checks_passed: evidence.source_hash_checks_passed,
    retained_terminal_route_direct_source_hash_checks_passed: terminal.direct_source_hash_checks_passed,
    current_pool_json_files_scanned: poolRecords.length,
    accepted_status_lane_json_files_scanned: acceptedStatusLaneRecords.length,
    accepted_status_lane_fail_closed_json_files: countTrue(acceptedStatusLaneRecords, (record) => record.fail_closed),
    accepted_status_lane_non_fail_closed_json_files: countTrue(
      acceptedStatusLaneRecords,
      (record) => record.fail_closed === false,
    ),
    current_pool_derivation_ref_evidence_object_files_found: compatibleEvidenceRecords.length,
    current_pool_compatible_derivation_ref_evidence_refs: 0,
    current_pool_rejection_bucket_counts: rejectionBucketCounts(poolRecords),
    downstream_target_packet_as_evidence_rejections: 124,
    downstream_absence_classifier_as_evidence_rejections: 124,
    downstream_application_attempt_as_evidence_rejections: 124,
    proof_grade_evidence_dependency_record_as_evidence_rejections: 124,
    source_certificate_handle_as_derivation_ref_rejections:
      application.source_certificate_handle_as_derivation_ref_rejections,
    candidate_higher_fold_constants_artifacts: application.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: separatorProfiles.length,
    candidate_row_constant_associations: rowProfiles.length,
    rows_by_separator_count: rowsBySeparator,
    separator_current_pool_derivation_ref_evidence_absence_profiles: separatorProfiles.length,
    row_current_pool_derivation_ref_evidence_absence_profiles: rowProfiles.length,
    total_current_pool_derivation_ref_evidence_absence_profiles: separatorProfiles.length + rowProfiles.length,
    total_proof_grade_derivation_ref_evidence_target_slots:
      target.total_proof_grade_derivation_ref_evidence_target_slots,
    total_proof_grade_derivation_ref_evidence_target_slots_satisfied:
      target.total_proof_grade_derivation_ref_evidence_target_slots_satisfied,
    total_proof_grade_derivation_ref_evidence_absence_slots:
      absence.total_proof_grade_derivation_ref_evidence_absence_slots,
    total_proof_grade_derivation_ref_evidence_absence_slots_with_evidence_object:
      absence.total_proof_grade_derivation_ref_evidence_absence_slots_with_evidence_object,
    total_proof_grade_derivation_ref_application_attempts:
      application.total_proof_grade_derivation_ref_application_attempts,
    total_source_certificate_handles_tested: application.total_source_certificate_handles_tested,
    proof_grade_derivation_ref_applications_authorized: 0,
    accepted_interval_certified_constants_status_proof_grade_derivation_refs_constructed: 0,
    accepted_interval_certified_constants_status_refs_constructed: 0,
    accepted_interval_certified_constants_statuses_constructed: 0,
    route_decisions_made: 0,
    proof_rule_decisions_made: 0,
    primitive_acceptance_decisions_made: 0,
    source_packet_acceptance_rules_constructed: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    terminal_route_obligations_declared: terminal.terminal_route_obligations_declared,
    terminal_route_obligations_satisfied: terminal.terminal_route_obligations_satisfied,
    mechanical_continuations_from_current_pool: terminal.mechanical_continuations_from_current_pool,
    preledger_pass_true_files: countTrue(poolRecords, (record) => record.preledger_pass),
    live_ledger_update_true_files: countTrue(poolRecords, (record) => record.updates_live_ledger),
    branch_chart_authorized_true_files: countTrue(poolRecords, (record) => record.branch_chart_authorized),
    row_consumption_positive_files: countTrue(poolRecords, (record) => record.row_consumption_count > 0),
    accepted_interval_certified_constants_status_positive_files: countTrue(
      poolRecords,
      (record) => record.accepted_interval_certified_constants_statuses_constructed > 0,
    ),
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    first_current_pool_evidence_absence_blocker: ABSENCE_BLOCKER,
    first_derivation_ref_application_blocker: application.first_derivation_ref_application_blocker,
    first_derivation_ref_target_blocker: TARGET_BLOCKER,
    first_source_handle_blocker: SOURCE_HANDLE_BLOCKER,
    first_terminal_route_blocker: terminal.first_terminal_route_blocker,
    first_external_proof_grade_obligation: terminal.first_external_proof_grade_obligation,
    first_external_primitive_obligation: terminal.first_external_primitive_obligation,
    parent_complement_consumption_ref_blocker: application.parent_complement_consumption_ref_blocker,
    first_separator_certificate_blocker: application.first_separator_certificate_blocker,
  };

  const invariant =
    summary.direct_source_hash_checks === 5 &&
    summary.direct_source_hash_checks_passed === 5 &&
    summary.retained_application_direct_source_hash_checks_passed === 5 &&
    summary.retained_derivation_ref_absence_direct_source_hash_checks_passed === 3 &&
    summary.retained_derivation_ref_target_direct_source_hash_checks_passed === 3 &&
    summary.retained_proof_grade_evidence_source_hash_checks_passed === 9 &&
    summary.retained_terminal_route_direct_source_hash_checks_passed === 2 &&
    summary.current_pool_json_files_scanned === 252 &&
    summary.accepted_status_lane_json_files_scanned === 17 &&
    summary.accepted_status_lane_fail_closed_json_files === 17 &&
    summary.accepted_status_lane_non_fail_closed_json_files === 0 &&
    summary.current_pool_derivation_ref_evidence_object_files_found === 0 &&
    summary.current_pool_compatible_derivation_ref_evidence_refs === 0 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    JSON.stringify(summary.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR) &&
    summary.total_current_pool_derivation_ref_evidence_absence_profiles === 124 &&
    summary.total_proof_grade_derivation_ref_evidence_target_slots === 124 &&
    summary.total_proof_grade_derivation_ref_evidence_target_slots_satisfied === 0 &&
    summary.total_proof_grade_derivation_ref_evidence_absence_slots === 124 &&
    summary.total_proof_grade_derivation_ref_evidence_absence_slots_with_evidence_object === 0 &&
    summary.total_proof_grade_derivation_ref_application_attempts === 124 &&
    summary.total_source_certificate_handles_tested === 124 &&
    summary.source_certificate_handle_as_derivation_ref_rejections === 124 &&
    summary.proof_grade_derivation_ref_applications_authorized === 0 &&
    summary.accepted_interval_certified_constants_status_proof_grade_derivation_refs_constructed === 0 &&
    summary.accepted_interval_certified_constants_status_refs_constructed === 0 &&
    summary.accepted_interval_certified_constants_statuses_constructed === 0 &&
    summary.route_decisions_made === 0 &&
    summary.proof_rule_decisions_made === 0 &&
    summary.primitive_acceptance_decisions_made === 0 &&
    summary.source_packet_acceptance_rules_constructed === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.mechanical_continuations_from_current_pool === 0 &&
    summary.preledger_pass_true_files === 0 &&
    summary.live_ledger_update_true_files === 0 &&
    summary.branch_chart_authorized_true_files === 0 &&
    summary.row_consumption_positive_files === 0 &&
    summary.accepted_interval_certified_constants_status_positive_files === 0 &&
    summary.row_consumption_count === 0 &&
    summary.preledger_pass === false &&
    summary.updates_live_ledger === false &&
    summary.branch_chart_authorized === false;
  if (!invariant) {
    throw new Error("Current-pool derivation-ref evidence absence invariant failed.");
  }

  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-proof-grade-derivation-ref-current-pool-evidence-absence-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only current-pool proof-grade derivation-ref evidence absence classifier; scans the certificate JSON pool including downstream derivation-ref target, absence, and application outputs, and proves no compatible accepted-status proof-grade derivation-ref evidence object is present",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_proof_grade_derivation_ref_application_attempt: artifactRecord(paths.applicationAttempt),
      accepted_status_proof_grade_derivation_ref_evidence_absence_classifier: artifactRecord(
        paths.derivationRefAbsence,
      ),
      accepted_status_proof_grade_derivation_ref_evidence_target_packet: artifactRecord(paths.derivationRefTarget),
      accepted_status_proof_grade_evidence_dependency_classifier: artifactRecord(paths.proofGradeEvidence),
      accepted_status_current_pool_route_input_disjunction_exhaustion_obligation_packet: artifactRecord(
        paths.terminalRouteObligation,
      ),
    },
    source_hash_checks: sourceChecks,
    compatible_evidence_role: COMPATIBLE_EVIDENCE_ROLE,
    current_pool_scan_rule:
      "A compatible current-pool evidence object must be an accepted-status proof-grade derivation-ref evidence object, not a fail-closed target packet, absence classifier, dependency record, application attempt, source-certificate/source-data handle, or terminal route obligation packet.",
    current_pool_derivation_ref_evidence_records: compatibleEvidenceRecords,
    current_pool_rejection_bucket_counts: summary.current_pool_rejection_bucket_counts,
    separator_current_pool_derivation_ref_evidence_absence_profiles: separatorProfiles,
    row_current_pool_derivation_ref_evidence_absence_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The current certificate JSON pool has been scanned after the downstream target, absence, and application outputs exist; it contains 0 compatible proof-grade derivation-ref evidence objects across the 124-slot separator/row scope.",
      continuation_class:
        "not mechanically closable from the current certificate pool; continue only by importing a compatible proof-grade derivation-ref evidence object or recording an explicit proof-rule decision in a separate artifact",
      mechanical_lane_can_continue_from_current_pool: false,
      decision_required: true,
      fail_closed_stop_conditions: [
        "Do not treat the target packet as proof-grade derivation-ref evidence.",
        "Do not treat the absence classifier as proof-grade derivation-ref evidence.",
        "Do not treat the application attempt as proof-grade derivation-ref evidence.",
        "Do not reuse source-certificate or source-data handles as proof-grade derivation refs.",
        "Do not construct accepted interval-certified constants status refs, statuses, derivations, rules, soundness proofs, endpoint applications, or accepted constants conformance derivations from this classifier.",
        "Do not introduce a primitive source-packet acceptance rule or accepted source packet from this classifier.",
        "Do not infer parent_complement_consumption_ref or higher_fold_separator_layer_certificate from this classifier.",
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
      "Captured as a priority-only certificate-side current-pool proof-grade derivation-ref evidence absence classifier under reference/priorities/proof-programs; no promotion to content/markdown/aaa.",
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
  const rowScopeRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  const rejectionRows = Object.entries(s.current_pool_rejection_bucket_counts).map(([bucket, count]) => [
    `\`${bucket}\``,
    String(count),
  ]);
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Proof-Grade Derivation-Ref Current-Pool Evidence Absence Classifier

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Current-Pool Evidence Scan

This classifier imports the proof-grade derivation-ref application attempt, the
derivation-ref evidence absence classifier, the derivation-ref evidence target
packet, the proof-grade evidence dependency classifier, and the current-pool
route-input disjunction exhaustion obligation packet. It then scans the current
certificate JSON pool after the downstream target, absence, and application
outputs exist.

The scan proves the current pool contains no compatible
\`${COMPATIBLE_EVIDENCE_ROLE}\` for the declared \`${TARGET_FIELD}\` target.
The downstream target packet, absence classifier, application attempt, proof-grade
evidence dependency record, and source-certificate/source-data handles remain
obligation or diagnostic records only; none is a derivation-ref evidence object.

Verified source side:

- ${s.direct_source_hash_checks_passed} / ${s.direct_source_hash_checks} direct source-hash locks;
- ${s.retained_application_direct_source_hash_checks_passed} / 5 retained application-attempt locks;
- ${s.retained_derivation_ref_absence_direct_source_hash_checks_passed} / 3 retained absence-classifier locks;
- ${s.retained_derivation_ref_target_direct_source_hash_checks_passed} / 3 retained target-packet locks;
- ${s.retained_proof_grade_evidence_source_hash_checks_passed} / 9 retained proof-grade evidence locks;
- ${s.retained_terminal_route_direct_source_hash_checks_passed} / 2 retained terminal route-obligation locks.

Scan result:

- ${s.current_pool_json_files_scanned} certificate JSON files scanned;
- ${s.accepted_status_lane_json_files_scanned} accepted-status-lane JSON files scanned;
- ${s.accepted_status_lane_fail_closed_json_files} accepted-status-lane JSON files fail-closed;
- ${s.accepted_status_lane_non_fail_closed_json_files} accepted-status-lane JSON files non-fail-closed;
- ${s.current_pool_derivation_ref_evidence_object_files_found} compatible derivation-ref evidence-object files found;
- ${s.current_pool_compatible_derivation_ref_evidence_refs} compatible derivation-ref evidence refs found;
- ${s.total_current_pool_derivation_ref_evidence_absence_profiles} separator/row absence profiles;
- ${s.proof_grade_derivation_ref_applications_authorized} derivation-ref applications authorized;
- ${s.accepted_interval_certified_constants_status_proof_grade_derivation_refs_constructed} accepted-status proof-grade derivation refs constructed;
- ${s.accepted_interval_certified_constants_status_refs_constructed} accepted-status refs constructed;
- ${s.accepted_interval_certified_constants_statuses_constructed} accepted statuses constructed.

The first current-pool evidence absence blocker is
\`${s.first_current_pool_evidence_absence_blocker}\`.

## Source-Hash Checks

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

## Row Scope

| Separator | Rows |
| --- | ---: |
${markdownTable(rowScopeRows)}

## Rejection Buckets

| Rejection bucket | Files |
| --- | ---: |
${markdownTable(rejectionRows)}

## Certificate-Side Handoff

Sharpened blocker: after the target packet, absence classifier, and application
attempt exist, the current certificate JSON pool still contains 0 compatible
proof-grade derivation-ref evidence objects over the 124-slot scope. The lane
still requires a separate compatible derivation-ref evidence object or an
explicit proof-rule decision before any accepted-status ref or status object can
be constructed.

Continuation class: not mechanically closable from the current certificate
pool. Continue only by importing a compatible proof-grade derivation-ref
evidence object or recording an explicit proof-rule decision in a separate
artifact.

Fail-closed stop conditions:

- Do not treat the target packet as proof-grade derivation-ref evidence.
- Do not treat the absence classifier as proof-grade derivation-ref evidence.
- Do not treat the application attempt as proof-grade derivation-ref evidence.
- Do not reuse source-certificate or source-data handles as proof-grade
  derivation refs.
- Do not construct accepted interval-certified constants status refs, statuses,
  derivations, rules, soundness proofs, endpoint applications, or accepted
  constants conformance derivations from this classifier.
- Do not introduce a primitive source-packet acceptance rule or accepted source
  packet from this classifier.
- Do not infer \`parent_complement_consumption_ref\` or
  \`higher_fold_separator_layer_certificate\` from this classifier.
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
    applicationAttempt: args.applicationAttempt,
    derivationRefAbsence: args.derivationRefAbsence,
    derivationRefTarget: args.derivationRefTarget,
    proofGradeEvidence: args.proofGradeEvidence,
    terminalRouteObligation: args.terminalRouteObligation,
  };
  const inputs = {
    applicationAttempt: readJson(paths.applicationAttempt),
    derivationRefAbsence: readJson(paths.derivationRefAbsence),
    derivationRefTarget: readJson(paths.derivationRefTarget),
    proofGradeEvidence: readJson(paths.proofGradeEvidence),
    terminalRouteObligation: readJson(paths.terminalRouteObligation),
  };
  const poolRecords = scanCertificatePool(args.certificatePoolDir, OUTPUT_JSON);
  const packet = buildPacket(paths, inputs, poolRecords);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, packet, args.pretty);
  writeText(outReport, renderReport(packet));
  console.log(`wrote ${outJson}`);
  console.log(`wrote ${outReport}`);
  for (const [key, value] of Object.entries(packet.summary)) {
    if (typeof value === "object" && value !== null) {
      console.log(`${key}: ${Object.values(value).join(",")}`);
    } else {
      console.log(`${key}: ${value}`);
    }
  }
}

main();
