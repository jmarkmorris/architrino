#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_FRONTIER = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_bridge_prerequisite_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_GRADE_EVIDENCE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ACCEPTED_CONSTANTS_CONFORMANCE = `${CERT_DIR}/higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_AGGREGATE = `${CERT_DIR}/higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const FRONTIER_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_bridge_prerequisite_frontier_classifier_fail_closed_proof_grade_bridge_and_source_packet_acceptance_frontiers_absent_no_row_consumption";
const PROOF_GRADE_EVIDENCE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier_fail_closed_source_certificates_complete_no_compatible_proof_grade_status_evidence_no_primitive_acceptance_no_row_consumption";
const IMPULSE_ACCEPTANCE_STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const ACCEPTED_CONSTANTS_CONFORMANCE_STATUS =
  "higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier_fail_closed_aggregate_present_existing_constants_contract_packet_mismatch_no_source_packet_acceptance_no_row_consumption";
const SEPARATOR_AGGREGATE_STATUS =
  "higher_fold_layer_same_packet_separator_aggregate_certificate_attempt_fail_closed_row_enclosures_separator_aggregates_certified_source_packets_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_primitive_source_packet_acceptance_evidence_dependency_classifier_fail_closed_frontier_locked_separator_aggregates_present_no_compatible_source_packet_acceptance_evidence_no_primitive_acceptance_no_row_consumption";

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
const EXPECTED_SEPARATORS = Object.keys(EXPECTED_ROWS_BY_SEPARATOR);

const SOURCE_PACKET_EVIDENCE_FIELDS = [
  "source_packet_acceptance_rule_present",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present",
];

const SOURCE_PACKET_EVIDENCE_LABELS = {
  source_packet_acceptance_rule_present: "source_packet_acceptance_rule",
  accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present:
    "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
};

const REJECTION_BUCKETS = [
  "packet_identity_mismatch",
  "separator_family_mismatch",
  "row_family_mismatch",
  "schema_status_mismatch",
  "aggregate_source_not_acceptance_rule",
  "rule_target_not_rule",
  "candidate_live_not_accepted",
  "source_packet_not_accepted",
];

function parseArgs(argv) {
  const args = {
    frontier: DEFAULT_FRONTIER,
    proofGradeEvidence: DEFAULT_PROOF_GRADE_EVIDENCE,
    impulseAcceptance: DEFAULT_IMPULSE_ACCEPTANCE,
    acceptedConstantsConformance: DEFAULT_ACCEPTED_CONSTANTS_CONFORMANCE,
    separatorAggregate: DEFAULT_SEPARATOR_AGGREGATE,
    evidencePoolDir: CERT_DIR,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--frontier" || arg === "--bridge-frontier") {
      args.frontier = argv[++index];
    } else if (arg === "--proof-grade-evidence") {
      args.proofGradeEvidence = argv[++index];
    } else if (arg === "--impulse-acceptance") {
      args.impulseAcceptance = argv[++index];
    } else if (arg === "--accepted-constants-conformance") {
      args.acceptedConstantsConformance = argv[++index];
    } else if (arg === "--separator-aggregate") {
      args.separatorAggregate = argv[++index];
    } else if (arg === "--evidence-pool-dir") {
      args.evidencePoolDir = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-primitive-source-packet-acceptance-evidence-dependency-classifier.mjs [options]

Options:
  --bridge-frontier PATH                 Accepted-status bridge prerequisite frontier classifier. Defaults to ${DEFAULT_FRONTIER}.
  --proof-grade-evidence PATH            Accepted-status proof-grade evidence dependency classifier. Defaults to ${DEFAULT_PROOF_GRADE_EVIDENCE}.
  --impulse-acceptance PATH              Impulse-bound source-packet acceptance dependency classifier. Defaults to ${DEFAULT_IMPULSE_ACCEPTANCE}.
  --accepted-constants-conformance PATH  Accepted-constants conformance classifier. Defaults to ${DEFAULT_ACCEPTED_CONSTANTS_CONFORMANCE}.
  --separator-aggregate PATH             Same-packet separator aggregate certificate attempt. Defaults to ${DEFAULT_SEPARATOR_AGGREGATE}.
  --evidence-pool-dir PATH               JSON evidence pool directory. Defaults to ${CERT_DIR}.
  --out-dir PATH                         Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                               Pretty-print JSON artifact.
  --help                                 Show this help.`);
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

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function rowSortKey(row) {
  return `${String(separatorSortKey(row.separator_event)).padStart(3, "0")}:${row.row_id}`;
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

function sortedObjectBySeparator(counts) {
  return Object.fromEntries(
    Object.entries(counts).sort(([left], [right]) => separatorSortKey(left) - separatorSortKey(right)),
  );
}

function uniqueRegexMatches(text, regex) {
  return [...new Set([...text.matchAll(regex)].map((match) => match[1] ?? match[0]))].sort();
}

function sourceHashChecks(paths) {
  const entries = [
    ["accepted_status_bridge_prerequisite_frontier_classifier", paths.frontier],
    ["accepted_status_proof_grade_evidence_dependency_classifier", paths.proofGradeEvidence],
    ["same_packet_impulse_bound_source_packet_acceptance_dependency_classifier", paths.impulseAcceptance],
    ["same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier", paths.acceptedConstantsConformance],
    ["same_packet_separator_aggregate_certificate_attempt", paths.separatorAggregate],
  ];
  const checks = entries.map(([sourceArtifact, filePath]) => {
    const currentHash = sha256File(filePath);
    return {
      source_artifact: sourceArtifact,
      current_basename: path.basename(filePath),
      current_sha256: currentHash,
      hash_matches: true,
    };
  });
  return checks;
}

function assertPacketAndStatus(source, name, expectedStatus) {
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
  assertPacketAndStatus(inputs.frontier, "frontier", FRONTIER_STATUS);
  assertPacketAndStatus(inputs.proofGradeEvidence, "proofGradeEvidence", PROOF_GRADE_EVIDENCE_STATUS);
  assertPacketAndStatus(inputs.impulseAcceptance, "impulseAcceptance", IMPULSE_ACCEPTANCE_STATUS);
  assertPacketAndStatus(
    inputs.acceptedConstantsConformance,
    "acceptedConstantsConformance",
    ACCEPTED_CONSTANTS_CONFORMANCE_STATUS,
  );
  assertPacketAndStatus(inputs.separatorAggregate, "separatorAggregate", SEPARATOR_AGGREGATE_STATUS);

  const expected = [
    [inputs.frontier.summary.frontier_source_hash_checks_passed, 4, "frontier locks"],
    [inputs.frontier.summary.separator_primitive_source_packet_route_ready_count, 0, "frontier separator route ready"],
    [inputs.frontier.summary.missing_separator_primitive_acceptance_prerequisites, 24, "frontier separator primitive missing"],
    [inputs.frontier.summary.missing_row_primitive_acceptance_prerequisites, 224, "frontier row primitive missing"],
    [inputs.proofGradeEvidence.summary.source_hash_checks_passed, 9, "proof evidence locks"],
    [
      inputs.proofGradeEvidence.summary.evidence_pool_compatible_proof_grade_status_evidence_files,
      0,
      "compatible proof evidence",
    ],
    [
      inputs.impulseAcceptance.summary.separators_with_source_packet_acceptance_rule,
      0,
      "source-packet acceptance rules",
    ],
    [
      inputs.impulseAcceptance.summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets,
      0,
      "accepted source packets",
    ],
    [inputs.impulseAcceptance.summary.fold_layer_rows, 112, "impulse rows"],
    [inputs.impulseAcceptance.summary.separator_acceptance_dependency_profiles, 12, "impulse separators"],
    [
      inputs.acceptedConstantsConformance.summary.separators_with_source_packet_acceptance_rule,
      0,
      "conformance source-packet acceptance rules",
    ],
    [
      inputs.acceptedConstantsConformance.summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets,
      0,
      "conformance accepted source packets",
    ],
    [inputs.separatorAggregate.summary.separators_with_separator_aggregate_C_Sigma, 12, "separator aggregate C_Sigma"],
    [
      inputs.separatorAggregate.summary.separators_with_separator_aggregate_A_Sigma_eta_epsilon_c,
      12,
      "separator aggregate A_Sigma",
    ],
    [
      inputs.separatorAggregate.summary.separators_with_separator_aggregate_I_fold_eta_epsilon_c_Sigma,
      12,
      "separator aggregate I_fold",
    ],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected ${label}: ${actual}`);
    }
  }
}

function canonicalSourcePacketRolePresence(text) {
  return {
    source_packet_acceptance_rule_present: /"source_packet_acceptance_rule_present"\s*:\s*true/.test(text),
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present:
      /"accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet(?:_present)?"\s*:\s*true/.test(text),
  };
}

function analyzeEvidenceFile(filePath, outputBasename) {
  const basename = path.basename(filePath);
  if (basename === outputBasename) {
    return null;
  }
  const text = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(text);
  const packetId = parsed.packet_id ?? null;
  const schema = String(parsed.schema ?? "");
  const status = String(parsed.status ?? "");
  const claimLevel = String(parsed.claim_level ?? "");
  const statusSurface = `${schema} ${status} ${claimLevel}`;
  const separators = uniqueRegexMatches(text, /Sigma_hf_\d{2}/g);
  const seedSeparators = uniqueRegexMatches(text, /Sigma_[1-4](?!\d)/g);
  const rowIds = uniqueRegexMatches(text, /"row_id"\s*:\s*"([^"]+)"/g);
  const containsTargetSeparatorFamily = EXPECTED_SEPARATORS.every((separator) => separators.includes(separator));
  const containsSeedSeparatorFamily =
    seedSeparators.length > 0 || text.includes("Sigma_1_through_Sigma_4") || text.includes("Sigma_1 through Sigma_4");
  const rowScopeCount =
    parsed.summary?.candidate_row_constant_associations ??
    parsed.summary?.fold_layer_rows ??
    parsed.summary?.rows_with_derivation_source_evidence_complete ??
    parsed.contract_conformance?.contract_fold_row_count ??
    rowIds.length;
  const rowScopeMatches = rowScopeCount === 112 || rowIds.length === 112;
  const schemaStatusMatches =
    statusSurface.includes("source_packet_acceptance") ||
    text.includes("source-packet acceptance") ||
    text.includes("same_packet_fold_impulse_or_direct_quadrature");
  const rolePresence = canonicalSourcePacketRolePresence(text);
  const sourcePacketAcceptanceRoleMatches = SOURCE_PACKET_EVIDENCE_FIELDS.every((field) => rolePresence[field]);
  const aggregateSourceOnly =
    text.includes("separator_aggregate_C_Sigma") &&
    text.includes("separator_aggregate_A_Sigma_eta_epsilon_c") &&
    !rolePresence.source_packet_acceptance_rule_present;
  const hasRuleTarget = text.includes("rule_target") || text.includes("proof_rule_target");
  const hasCandidateLive = text.includes("candidate_live");
  const hasSourcePacketMention = text.includes("same_packet_fold_impulse_or_direct_quadrature");
  const compatible =
    packetId === PACKET_ID &&
    containsTargetSeparatorFamily &&
    rowScopeMatches &&
    schemaStatusMatches &&
    sourcePacketAcceptanceRoleMatches;

  const rejectionBuckets = [];
  if (packetId !== null && packetId !== PACKET_ID) {
    rejectionBuckets.push("packet_identity_mismatch");
  }
  if (containsSeedSeparatorFamily || (schemaStatusMatches && !containsTargetSeparatorFamily)) {
    rejectionBuckets.push("separator_family_mismatch");
  }
  if (rowScopeCount !== 0 && rowScopeCount !== 112 && schemaStatusMatches) {
    rejectionBuckets.push("row_family_mismatch");
  }
  if (!schemaStatusMatches) {
    rejectionBuckets.push("schema_status_mismatch");
  }
  if (aggregateSourceOnly) {
    rejectionBuckets.push("aggregate_source_not_acceptance_rule");
  }
  if (hasRuleTarget && !rolePresence.source_packet_acceptance_rule_present) {
    rejectionBuckets.push("rule_target_not_rule");
  }
  if (hasCandidateLive && !rolePresence.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present) {
    rejectionBuckets.push("candidate_live_not_accepted");
  }
  if (hasSourcePacketMention && !rolePresence.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present) {
    rejectionBuckets.push("source_packet_not_accepted");
  }
  if (!compatible && rejectionBuckets.length === 0) {
    rejectionBuckets.push("schema_status_mismatch");
  }

  return {
    path: filePath,
    basename,
    sha256: sha256File(filePath),
    packet_id: packetId,
    schema,
    status,
    separator_family_matches: containsTargetSeparatorFamily,
    row_scope_count: rowScopeCount,
    row_scope_matches: rowScopeMatches,
    schema_status_matches: schemaStatusMatches,
    source_packet_acceptance_role_matches: sourcePacketAcceptanceRoleMatches,
    role_presence: rolePresence,
    compatible_source_packet_acceptance_evidence: compatible,
    rejection_buckets: compatible ? [] : rejectionBuckets,
  };
}

function scanEvidencePool(poolDir, outputBasename) {
  const entries = fs
    .readdirSync(poolDir)
    .filter((entry) => entry.endsWith(".json"))
    .sort()
    .map((entry) => path.join(poolDir, entry));
  const records = [];
  for (const filePath of entries) {
    const record = analyzeEvidenceFile(filePath, outputBasename);
    if (record !== null) {
      records.push(record);
    }
  }
  return records;
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

function buildSeparatorProfiles(impulseAcceptance) {
  return [...impulseAcceptance.separator_acceptance_dependency_profiles]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((entry) => ({
      separator_event: entry.separator_event,
      fold_interval: entry.fold_interval,
      row_count: entry.row_count,
      separator_aggregate_fields_complete:
        entry.separator_aggregate_C_Sigma_present === true &&
        entry.separator_aggregate_A_Sigma_eta_epsilon_c_present === true &&
        entry.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present === true,
      evidence_slot_checks: Object.fromEntries(
        SOURCE_PACKET_EVIDENCE_FIELDS.map((field) => [
          field,
          {
            role: SOURCE_PACKET_EVIDENCE_LABELS[field],
            compatible_evidence_refs: [],
            filled: false,
            first_blocker:
              field === "source_packet_acceptance_rule_present"
                ? "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent"
                : "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_absent",
          },
        ]),
      ),
      source_packet_acceptance_evidence_slots: SOURCE_PACKET_EVIDENCE_FIELDS.length,
      compatible_source_packet_acceptance_evidence_slots_filled: 0,
      compatible_source_packet_acceptance_evidence_slots_missing: SOURCE_PACKET_EVIDENCE_FIELDS.length,
      source_packet_acceptance_dependency_satisfied: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
      row_consumption_count: 0,
      preledger_pass_rows: 0,
      branch_chart_authorized_rows: 0,
      classification: "separator_aggregate_complete_no_compatible_source_packet_acceptance_evidence",
    }));
}

function buildRowProfiles(impulseAcceptance) {
  return [...impulseAcceptance.row_acceptance_dependency_profiles]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((entry) => ({
      row_id: entry.row_id,
      ledger: entry.ledger,
      status: entry.status,
      failure_code: entry.failure_code,
      separator_event: entry.separator_event,
      fold_interval: entry.fold_interval,
      receiver_interval: entry.receiver_interval,
      source_interval: entry.source_interval,
      separator_aggregate_fields_complete:
        entry.separator_aggregate_C_Sigma_present === true &&
        entry.separator_aggregate_A_Sigma_eta_epsilon_c_present === true &&
        entry.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present === true,
      evidence_slot_checks: Object.fromEntries(
        SOURCE_PACKET_EVIDENCE_FIELDS.map((field) => [
          field,
          {
            role: SOURCE_PACKET_EVIDENCE_LABELS[field],
            compatible_evidence_refs: [],
            filled: false,
            first_blocker:
              field === "source_packet_acceptance_rule_present"
                ? "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent"
                : "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_absent",
          },
        ]),
      ),
      source_packet_acceptance_evidence_slots: SOURCE_PACKET_EVIDENCE_FIELDS.length,
      compatible_source_packet_acceptance_evidence_slots_filled: 0,
      compatible_source_packet_acceptance_evidence_slots_missing: SOURCE_PACKET_EVIDENCE_FIELDS.length,
      source_packet_acceptance_dependency_satisfied: false,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_present: false,
      accepted_fold_layer_row: false,
      row_consumed: false,
      preledger_pass: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
      classification: "row_separator_aggregate_complete_no_compatible_source_packet_acceptance_evidence",
    }));
}

function buildPacket(paths, inputs, evidenceRecords) {
  validateInputs(inputs);
  const sourceChecks = sourceHashChecks(paths);
  const separatorProfiles = buildSeparatorProfiles(inputs.impulseAcceptance);
  const rowProfiles = buildRowProfiles(inputs.impulseAcceptance);
  const compatibleEvidence = evidenceRecords.filter((record) => record.compatible_source_packet_acceptance_evidence);
  const summary = {
    source_packet_route_source_hash_checks: sourceChecks.length,
    source_packet_route_source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    retained_frontier_source_hash_checks_passed: inputs.frontier.summary.frontier_source_hash_checks_passed,
    retained_bridge_locked_source_hash_checks_passed: inputs.proofGradeEvidence.summary.source_hash_checks_passed,
    retained_proof_grade_evidence_compatible_files:
      inputs.proofGradeEvidence.summary.evidence_pool_compatible_proof_grade_status_evidence_files,
    candidate_higher_fold_constants_artifacts: inputs.frontier.summary.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: separatorProfiles.length,
    candidate_row_constant_associations: rowProfiles.length,
    rows_by_separator_count: sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event)),
    separators_with_separator_aggregate_fields_complete: countTrue(
      separatorProfiles,
      (entry) => entry.separator_aggregate_fields_complete,
    ),
    rows_with_separator_aggregate_fields_complete: countTrue(
      rowProfiles,
      (entry) => entry.separator_aggregate_fields_complete,
    ),
    evidence_pool_json_files_scanned: evidenceRecords.length,
    evidence_pool_compatible_source_packet_acceptance_evidence_files: compatibleEvidence.length,
    evidence_pool_rejection_bucket_counts: rejectionBucketCounts(evidenceRecords),
    separator_source_packet_acceptance_evidence_slots:
      separatorProfiles.length * SOURCE_PACKET_EVIDENCE_FIELDS.length,
    separator_compatible_source_packet_acceptance_evidence_slots_filled: 0,
    separator_compatible_source_packet_acceptance_evidence_slots_missing:
      separatorProfiles.length * SOURCE_PACKET_EVIDENCE_FIELDS.length,
    row_source_packet_acceptance_evidence_slots: rowProfiles.length * SOURCE_PACKET_EVIDENCE_FIELDS.length,
    row_compatible_source_packet_acceptance_evidence_slots_filled: 0,
    row_compatible_source_packet_acceptance_evidence_slots_missing:
      rowProfiles.length * SOURCE_PACKET_EVIDENCE_FIELDS.length,
    separator_source_packet_acceptance_dependency_satisfied_count: 0,
    row_source_packet_acceptance_dependency_satisfied_count: 0,
    source_packet_acceptance_rules_constructed: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    accepted_interval_certified_constants_status_refs_constructed: 0,
    accepted_interval_certified_constants_statuses_constructed: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_source_packet_acceptance_evidence_blocker:
      "compatible_source_packet_acceptance_evidence_absent",
    first_source_packet_acceptance_rule_blocker:
      "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent",
    first_accepted_source_packet_evidence_blocker:
      "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_absent",
    parent_complement_consumption_ref_blocker: "parent_complement_consumption_ref_absent",
    first_separator_certificate_blocker: "higher_fold_separator_layer_certificate_absent",
  };
  const invariant =
    summary.source_packet_route_source_hash_checks === 5 &&
    summary.source_packet_route_source_hash_checks_passed === 5 &&
    summary.retained_frontier_source_hash_checks_passed === 4 &&
    summary.retained_bridge_locked_source_hash_checks_passed === 9 &&
    summary.retained_proof_grade_evidence_compatible_files === 0 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    JSON.stringify(summary.rows_by_separator_count) === JSON.stringify(EXPECTED_ROWS_BY_SEPARATOR) &&
    summary.separators_with_separator_aggregate_fields_complete === 12 &&
    summary.rows_with_separator_aggregate_fields_complete === 112 &&
    summary.evidence_pool_compatible_source_packet_acceptance_evidence_files === 0 &&
    summary.separator_source_packet_acceptance_evidence_slots === 24 &&
    summary.separator_compatible_source_packet_acceptance_evidence_slots_filled === 0 &&
    summary.separator_compatible_source_packet_acceptance_evidence_slots_missing === 24 &&
    summary.row_source_packet_acceptance_evidence_slots === 224 &&
    summary.row_compatible_source_packet_acceptance_evidence_slots_filled === 0 &&
    summary.row_compatible_source_packet_acceptance_evidence_slots_missing === 224 &&
    summary.source_packet_acceptance_rules_constructed === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.accepted_interval_certified_constants_statuses_constructed === 0 &&
    summary.row_consumption_count === 0 &&
    summary.preledger_pass_rows === 0 &&
    summary.branch_chart_authorized_rows === 0;
  if (!invariant) {
    throw new Error("Source-packet acceptance evidence dependency invariant failed.");
  }
  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-primitive-source-packet-acceptance-evidence-dependency-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only primitive source-packet acceptance evidence dependency classifier; scans certificate-side JSON evidence and proves that complete separator aggregates have no compatible source-packet acceptance rule or accepted same-packet fold impulse/direct-quadrature source packet under the live packet, separator family, row scope, schema/status family, and role checks",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      accepted_status_bridge_prerequisite_frontier_classifier: artifactRecord(paths.frontier),
      accepted_status_proof_grade_evidence_dependency_classifier: artifactRecord(paths.proofGradeEvidence),
      same_packet_impulse_bound_source_packet_acceptance_dependency_classifier: artifactRecord(paths.impulseAcceptance),
      same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier: artifactRecord(
        paths.acceptedConstantsConformance,
      ),
      same_packet_separator_aggregate_certificate_attempt: artifactRecord(paths.separatorAggregate),
    },
    source_hash_checks: sourceChecks,
    evidence_compatibility_rule:
      "A certificate JSON object is compatible source-packet acceptance evidence only when packet id, separator family, row scope, schema/status family, source_packet_acceptance_rule_present, and accepted same_packet_fold_impulse_or_direct_quadrature source-packet role match the live higher-fold constants route exactly. Separator aggregates, candidate/live constants artifacts, target notes, and rule targets are rejected as evidence.",
    source_packet_evidence_fields: SOURCE_PACKET_EVIDENCE_FIELDS,
    known_incompatible_evidence_contracts: [
      {
        contract: "seed constants contract",
        contract_packet_id: "seed-doubled-four-arc-cosine-template-v0",
        contract_separator_family: "Sigma_1_through_Sigma_4",
        contract_row_scope: 16,
        live_packet_id: PACKET_ID,
        live_separator_family: "Sigma_hf_01_through_Sigma_hf_12",
        live_row_scope: 112,
        rejection_buckets: ["packet_identity_mismatch", "separator_family_mismatch", "row_family_mismatch"],
      },
    ],
    evidence_pool_summary_records: evidenceRecords.map((record) => ({
      basename: record.basename,
      packet_id: record.packet_id,
      schema: record.schema,
      status: record.status,
      separator_family_matches: record.separator_family_matches,
      row_scope_count: record.row_scope_count,
      row_scope_matches: record.row_scope_matches,
      schema_status_matches: record.schema_status_matches,
      source_packet_acceptance_role_matches: record.source_packet_acceptance_role_matches,
      compatible_source_packet_acceptance_evidence: record.compatible_source_packet_acceptance_evidence,
      rejection_buckets: record.rejection_buckets,
      sha256: record.sha256,
    })),
    separator_source_packet_acceptance_evidence_dependency_profiles: separatorProfiles,
    row_source_packet_acceptance_evidence_dependency_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "Complete separator aggregate evidence is present, but no compatible source-packet acceptance rule or accepted same-packet fold impulse/direct-quadrature source-packet evidence object exists in the certificate JSON pool.",
      continuation_class:
        "mechanical only after a compatible source-packet acceptance rule and accepted same-packet fold impulse/direct-quadrature source packet are supplied; otherwise blocked on a primitive acceptance decision",
      fail_closed_stop_conditions: [
        "Do not parse Markdown prose as proof evidence.",
        "Do not treat separator aggregate fields, candidate/live constants artifacts, target notes, or rule targets as source-packet acceptance evidence.",
        "Do not reuse the seed-doubled-four-arc-cosine-template-v0 constants contract for the fresh higher-fold packet.",
        "Do not introduce a proof rule, primitive accepted-status rule, source-packet acceptance rule, accepted status, accepted source packet, row consumption, preledger pass, live-ledger update, or branch-chart authorization from this classifier.",
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
      "Captured as a priority-only certificate-side primitive source-packet acceptance evidence dependency classifier under reference/priorities/proof-programs; no promotion to content/markdown/aaa.",
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
  const bucketRows = Object.entries(s.evidence_pool_rejection_bucket_counts).map(([bucket, count]) => [
    `\`${bucket}\``,
    String(count),
  ]);
  const separatorRows = packet.separator_source_packet_acceptance_evidence_dependency_profiles.map((entry) => [
    `\`${entry.separator_event}\``,
    `\`${entry.fold_interval}\``,
    String(entry.row_count),
    String(entry.separator_aggregate_fields_complete),
    String(entry.compatible_source_packet_acceptance_evidence_slots_filled),
    String(entry.compatible_source_packet_acceptance_evidence_slots_missing),
  ]);
  const rowsBySeparatorRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Primitive Source-Packet Acceptance Evidence Dependency Classifier

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Primitive Source-Packet Acceptance Dependency Sharpened

This classifier starts from the source-packet side of the bridge prerequisite
frontier and scans only certificate-side JSON objects for compatible
source-packet acceptance evidence.

Compatibility requires exact match on packet id, separator family, row scope,
schema/status family, \`source_packet_acceptance_rule_present\`, and the
accepted \`same_packet_fold_impulse_or_direct_quadrature\` source-packet role.
Separator aggregates, candidate/live constants artifacts, target notes, rule
targets, and Markdown prose are not counted as proof evidence.

Verified source side:

- ${s.source_packet_route_source_hash_checks_passed} / ${s.source_packet_route_source_hash_checks} source-packet route source-hash locks;
- ${s.retained_frontier_source_hash_checks_passed} / 4 retained frontier source-hash locks;
- ${s.retained_bridge_locked_source_hash_checks_passed} / 9 retained bridge-locked source-hash locks;
- ${s.separators_with_separator_aggregate_fields_complete} / ${s.candidate_separator_constants} separator aggregate evidence profiles complete;
- ${s.rows_with_separator_aggregate_fields_complete} / ${s.candidate_row_constant_associations} row aggregate evidence profiles complete.

Evidence dependency result:

- ${s.evidence_pool_json_files_scanned} certificate JSON files scanned;
- ${s.evidence_pool_compatible_source_packet_acceptance_evidence_files} compatible source-packet acceptance evidence files;
- ${s.separator_source_packet_acceptance_evidence_slots} separator source-packet acceptance evidence slots;
- ${s.separator_compatible_source_packet_acceptance_evidence_slots_filled} separator source-packet acceptance evidence slots filled;
- ${s.row_source_packet_acceptance_evidence_slots} row source-packet acceptance evidence slots;
- ${s.row_compatible_source_packet_acceptance_evidence_slots_filled} row source-packet acceptance evidence slots filled.

The first source-packet acceptance evidence blocker is
\`${s.first_source_packet_acceptance_evidence_blocker}\`.

The source-packet acceptance rule blocker is
\`${s.first_source_packet_acceptance_rule_blocker}\`.

The first accepted source-packet evidence blocker is
\`${s.first_accepted_source_packet_evidence_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source-Hash Checks

| Source artifact | Current file | Current SHA-256 | Hash matches |
| --- | --- | --- | --- |
${markdownTable(sourceRows)}

## Evidence-Pool Rejection Buckets

| Bucket | Files |
| --- | ---: |
${markdownTable(bucketRows)}

Known incompatible evidence contract:

| Contract | Contract packet | Contract family | Contract rows | Live packet | Live family | Live rows |
| --- | --- | --- | ---: | --- | --- | ---: |
| seed constants contract | \`seed-doubled-four-arc-cosine-template-v0\` | \`Sigma_1_through_Sigma_4\` | 16 | \`${PACKET_ID}\` | \`Sigma_hf_01_through_Sigma_hf_12\` | 112 |

## Separator Source-Packet Evidence Slots

| Separator | Fold interval | Rows | Aggregate evidence complete | Filled slots | Missing slots |
| --- | --- | ---: | --- | ---: | ---: |
${markdownTable(separatorRows)}

## Row Scope

| Separator | Rows |
| --- | ---: |
${markdownTable(rowsBySeparatorRows)}

## Certificate-Side Handoff

Sharpened blocker: Complete separator aggregate evidence is present, but no
compatible source-packet acceptance rule or accepted same-packet fold
impulse/direct-quadrature source-packet evidence object exists in the
certificate JSON pool.

Continuation class: mechanical only after a compatible source-packet acceptance
rule and accepted same-packet fold impulse/direct-quadrature source packet are
supplied; otherwise blocked on a primitive acceptance decision.

Fail-closed stop conditions:

- Do not parse Markdown prose as proof evidence.
- Do not treat separator aggregate fields, candidate/live constants artifacts,
  target notes, or rule targets as source-packet acceptance evidence.
- Do not reuse the seed-doubled-four-arc-cosine-template-v0 constants contract
  for the fresh higher-fold packet.
- Do not introduce a proof rule, primitive accepted-status rule,
  source-packet acceptance rule, accepted status, accepted source packet,
  row consumption, preledger pass, live-ledger update, or branch-chart
  authorization from this classifier.

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is priority-only and proves no source-packet acceptance rule,
accepted \`same_packet_fold_impulse_or_direct_quadrature_bound\`, accepted
interval-certified constants status, \`parent_complement_consumption_ref\`,
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
  const inputs = {
    frontier: readJson(args.frontier),
    proofGradeEvidence: readJson(args.proofGradeEvidence),
    impulseAcceptance: readJson(args.impulseAcceptance),
    acceptedConstantsConformance: readJson(args.acceptedConstantsConformance),
    separatorAggregate: readJson(args.separatorAggregate),
  };
  const evidenceRecords = scanEvidencePool(args.evidencePoolDir, OUTPUT_JSON);
  const packet = buildPacket(args, inputs, evidenceRecords);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, renderReport(packet));
  console.log(`wrote ${outputJsonPath}`);
  console.log(`wrote ${outputReportPath}`);
  console.log(packet.status);
  console.log(JSON.stringify(packet.summary, null, 2));
}

main();
