#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_BRIDGE = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_certificate_to_proof_grade_derivation_bridge_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const BRIDGE_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_source_certificate_to_proof_grade_derivation_bridge_attempt_fail_closed_source_certificates_present_proof_grade_status_derivation_bridge_absent_no_primitive_acceptance_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_proof_grade_evidence_dependency_classifier_fail_closed_source_certificates_complete_no_compatible_proof_grade_status_evidence_no_primitive_acceptance_no_row_consumption";

const EXPECTED_SEPARATORS = Array.from({ length: 12 }, (_, index) => `Sigma_hf_${String(index + 1).padStart(2, "0")}`);
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

const PROOF_GRADE_EVIDENCE_FIELDS = [
  "accepted_interval_certified_constants_status_proof_grade_derivation_ref_present",
  "accepted_interval_certified_constants_status_derivation_present",
  "accepted_interval_certified_constants_status_rule_present",
  "accepted_interval_certified_constants_status_soundness_proof_present",
  "accepted_interval_certified_constants_status_endpoint_application_present",
  "accepted_constants_conformance_derivation_present",
];

const EVIDENCE_FIELD_LABELS = {
  accepted_interval_certified_constants_status_proof_grade_derivation_ref_present: "proof_grade_derivation_ref",
  accepted_interval_certified_constants_status_derivation_present: "status_derivation",
  accepted_interval_certified_constants_status_rule_present: "status_rule",
  accepted_interval_certified_constants_status_soundness_proof_present: "soundness_proof",
  accepted_interval_certified_constants_status_endpoint_application_present: "endpoint_application",
  accepted_constants_conformance_derivation_present: "accepted_constants_conformance_derivation",
};

const REJECTION_BUCKETS = [
  "packet_identity_mismatch",
  "separator_family_mismatch",
  "row_family_mismatch",
  "schema_status_mismatch",
  "source_certificate_not_proof_grade",
  "rule_target_not_rule",
  "candidate_live_not_accepted",
];

function parseArgs(argv) {
  const args = {
    bridge: DEFAULT_BRIDGE,
    outDir: DEFAULT_OUT_DIR,
    evidencePoolDir: CERT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--bridge") {
      args.bridge = argv[++index];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++index];
    } else if (arg === "--evidence-pool-dir") {
      args.evidencePoolDir = argv[++index];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-proof-grade-evidence-dependency-classifier.mjs [options]

Options:
  --bridge PATH              Accepted-status source-certificate bridge attempt. Defaults to ${DEFAULT_BRIDGE}.
  --evidence-pool-dir PATH   JSON evidence pool directory. Defaults to ${CERT_DIR}.
  --out-dir PATH             Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                   Pretty-print JSON artifact.
  --help                     Show this help.`);
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

function uniqueRegexMatches(text, regex) {
  return [...new Set([...text.matchAll(regex)].map((match) => match[1] ?? match[0]))].sort();
}

function sourceHashChecks(bridge) {
  const entries = Object.entries(bridge.source_artifacts ?? {});
  const checks = entries.map(([sourceArtifact, record]) => {
    const currentHash = sha256File(record.path);
    return {
      source_artifact: sourceArtifact,
      imported_basename: record.basename,
      current_basename: path.basename(record.path),
      imported_sha256: record.sha256,
      current_sha256: currentHash,
      hash_matches: record.sha256 === currentHash,
    };
  });
  if (!checks.every((check) => check.hash_matches)) {
    throw new Error("Proof-grade evidence dependency source hashes do not match bridge locks.");
  }
  return checks;
}

function validateBridge(bridge) {
  if (bridge.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected bridge packet id: ${bridge.packet_id}`);
  }
  if (bridge.status !== BRIDGE_STATUS) {
    throw new Error(`Unexpected bridge status: ${bridge.status}`);
  }
  if (bridge.preledger_pass !== false || bridge.updates_live_ledger !== false || bridge.branch_chart_authorized !== false) {
    throw new Error("Bridge does not preserve fail-closed ledger locks.");
  }
  const summary = bridge.summary;
  const expected = [
    [summary.source_data_obligation_source_hash_checks_passed, 9, "source hash locks"],
    [summary.candidate_higher_fold_constants_artifacts, 1, "candidate artifacts"],
    [summary.candidate_separator_constants, 12, "candidate separator constants"],
    [summary.candidate_row_constant_associations, 112, "candidate row associations"],
    [summary.separators_with_derivation_source_evidence_complete, 12, "separator source evidence"],
    [summary.rows_with_derivation_source_evidence_complete, 112, "row source evidence"],
    [summary.separator_status_derivation_bridge_ready_count, 0, "separator bridge ready"],
    [summary.row_status_derivation_bridge_ready_count, 0, "row bridge ready"],
    [summary.missing_separator_bridge_criteria, 72, "missing separator bridge criteria"],
    [summary.missing_row_bridge_criteria, 672, "missing row bridge criteria"],
    [summary.accepted_interval_certified_constants_status_refs_constructed, 0, "status refs constructed"],
    [summary.accepted_interval_certified_constants_statuses_constructed, 0, "statuses constructed"],
    [summary.row_consumption_count, 0, "row consumption"],
  ];
  for (const [actual, want, label] of expected) {
    if (actual !== want) {
      throw new Error(`Unexpected bridge ${label}: ${actual}`);
    }
  }
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
    statusSurface.includes("accepted_interval_certified_constants_status") ||
    text.includes("accepted interval-certified constants status");
  const rolePresence = Object.fromEntries(
    PROOF_GRADE_EVIDENCE_FIELDS.map((field) => [
      field,
      new RegExp(`"${field}"\\s*:\\s*true`).test(text),
    ]),
  );
  const proofGradeAcceptedStatusRoleMatches = PROOF_GRADE_EVIDENCE_FIELDS.every((field) => rolePresence[field]);
  const acceptedStatusConstructed =
    /"accepted_interval_certified_constants_status_present"\s*:\s*true/.test(text) ||
    /"accepted_interval_certified_constants_statuses_constructed"\s*:\s*[1-9]/.test(text);
  const hasSourceCertificate = text.includes("source_certificate") || text.includes("source-certificate");
  const hasRuleTarget = text.includes("rule_target") || text.includes("proof_rule_target");
  const hasStatusRule = /"accepted_interval_certified_constants_status_rule_present"\s*:\s*true/.test(text);
  const candidateLiveOnly = text.includes("candidate_live") && !acceptedStatusConstructed;
  const compatible =
    packetId === PACKET_ID &&
    containsTargetSeparatorFamily &&
    rowScopeMatches &&
    schemaStatusMatches &&
    proofGradeAcceptedStatusRoleMatches;

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
  if (hasSourceCertificate && !proofGradeAcceptedStatusRoleMatches) {
    rejectionBuckets.push("source_certificate_not_proof_grade");
  }
  if (hasRuleTarget && !hasStatusRule) {
    rejectionBuckets.push("rule_target_not_rule");
  }
  if (candidateLiveOnly) {
    rejectionBuckets.push("candidate_live_not_accepted");
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
    proof_grade_accepted_status_role_matches: proofGradeAcceptedStatusRoleMatches,
    role_presence: rolePresence,
    compatible_proof_grade_status_evidence: compatible,
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

function buildSeparatorProfiles(bridge) {
  return [...bridge.separator_accepted_status_derivation_bridge_attempts]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((entry) => ({
      separator_event: entry.separator_event,
      fold_interval: entry.fold_interval,
      row_count: entry.row_count,
      derivation_source_evidence_complete: entry.derivation_source_evidence_complete === true,
      evidence_slot_checks: Object.fromEntries(
        PROOF_GRADE_EVIDENCE_FIELDS.map((field) => [
          field,
          {
            role: EVIDENCE_FIELD_LABELS[field],
            compatible_evidence_refs: [],
            filled: false,
            first_blocker: `${field.replace(/_present$/, "")}_evidence_absent`,
          },
        ]),
      ),
      proof_grade_evidence_slots: PROOF_GRADE_EVIDENCE_FIELDS.length,
      compatible_proof_grade_evidence_slots_filled: 0,
      compatible_proof_grade_evidence_slots_missing: PROOF_GRADE_EVIDENCE_FIELDS.length,
      proof_grade_status_evidence_dependency_satisfied: false,
      accepted_interval_certified_constants_status_ref_constructed: false,
      accepted_interval_certified_constants_status_present: false,
      row_consumption_count: 0,
      preledger_pass_rows: 0,
      branch_chart_authorized_rows: 0,
      classification: "source_certificates_complete_no_compatible_proof_grade_accepted_status_evidence",
    }));
}

function buildRowProfiles(bridge) {
  return [...bridge.row_accepted_status_derivation_bridge_attempts]
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
      derivation_source_evidence_complete: entry.derivation_source_evidence_complete === true,
      evidence_slot_checks: Object.fromEntries(
        PROOF_GRADE_EVIDENCE_FIELDS.map((field) => [
          field,
          {
            role: EVIDENCE_FIELD_LABELS[field],
            compatible_evidence_refs: [],
            filled: false,
            first_blocker: `${field.replace(/_present$/, "")}_evidence_absent`,
          },
        ]),
      ),
      proof_grade_evidence_slots: PROOF_GRADE_EVIDENCE_FIELDS.length,
      compatible_proof_grade_evidence_slots_filled: 0,
      compatible_proof_grade_evidence_slots_missing: PROOF_GRADE_EVIDENCE_FIELDS.length,
      proof_grade_status_evidence_dependency_satisfied: false,
      accepted_interval_certified_constants_status_ref_constructed: false,
      accepted_interval_certified_constants_status_present: false,
      accepted_fold_layer_row: false,
      row_consumed: false,
      preledger_pass: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
      classification: "row_source_certificates_complete_no_compatible_proof_grade_accepted_status_evidence",
    }));
}

function buildPacket(paths, bridge, evidenceRecords) {
  validateBridge(bridge);
  const sourceChecks = sourceHashChecks(bridge);
  const separatorProfiles = buildSeparatorProfiles(bridge);
  const rowProfiles = buildRowProfiles(bridge);
  const compatibleEvidence = evidenceRecords.filter((record) => record.compatible_proof_grade_status_evidence);
  const summary = {
    source_hash_checks: sourceChecks.length,
    source_hash_checks_passed: countTrue(sourceChecks, (entry) => entry.hash_matches),
    candidate_higher_fold_constants_artifacts: bridge.summary.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: separatorProfiles.length,
    candidate_row_constant_associations: rowProfiles.length,
    rows_by_separator_count: sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event)),
    separators_with_derivation_source_evidence_complete: countTrue(
      separatorProfiles,
      (entry) => entry.derivation_source_evidence_complete,
    ),
    rows_with_derivation_source_evidence_complete: countTrue(
      rowProfiles,
      (entry) => entry.derivation_source_evidence_complete,
    ),
    evidence_pool_json_files_scanned: evidenceRecords.length,
    evidence_pool_compatible_proof_grade_status_evidence_files: compatibleEvidence.length,
    evidence_pool_rejection_bucket_counts: rejectionBucketCounts(evidenceRecords),
    separator_proof_grade_evidence_slots: separatorProfiles.length * PROOF_GRADE_EVIDENCE_FIELDS.length,
    separator_compatible_proof_grade_evidence_slots_filled: 0,
    separator_compatible_proof_grade_evidence_slots_missing: separatorProfiles.length * PROOF_GRADE_EVIDENCE_FIELDS.length,
    row_proof_grade_evidence_slots: rowProfiles.length * PROOF_GRADE_EVIDENCE_FIELDS.length,
    row_compatible_proof_grade_evidence_slots_filled: 0,
    row_compatible_proof_grade_evidence_slots_missing: rowProfiles.length * PROOF_GRADE_EVIDENCE_FIELDS.length,
    separator_proof_grade_status_evidence_dependency_satisfied_count: 0,
    row_proof_grade_status_evidence_dependency_satisfied_count: 0,
    accepted_interval_certified_constants_status_refs_constructed: 0,
    accepted_interval_certified_constants_statuses_constructed: 0,
    source_packet_acceptance_rules_constructed: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_evidence_dependency_blocker: "compatible_proof_grade_accepted_interval_certified_constants_status_evidence_absent",
    first_source_packet_decision_blocker:
      "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent",
    parent_complement_consumption_ref_blocker: "parent_complement_consumption_ref_absent",
    first_separator_certificate_blocker: "higher_fold_separator_layer_certificate_absent",
  };
  const invariant =
    summary.source_hash_checks === 9 &&
    summary.source_hash_checks_passed === 9 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    JSON.stringify(Object.values(summary.rows_by_separator_count)) === JSON.stringify(Object.values(EXPECTED_ROWS_BY_SEPARATOR)) &&
    summary.separators_with_derivation_source_evidence_complete === 12 &&
    summary.rows_with_derivation_source_evidence_complete === 112 &&
    summary.evidence_pool_compatible_proof_grade_status_evidence_files === 0 &&
    summary.separator_proof_grade_evidence_slots === 72 &&
    summary.separator_compatible_proof_grade_evidence_slots_filled === 0 &&
    summary.separator_compatible_proof_grade_evidence_slots_missing === 72 &&
    summary.row_proof_grade_evidence_slots === 672 &&
    summary.row_compatible_proof_grade_evidence_slots_filled === 0 &&
    summary.row_compatible_proof_grade_evidence_slots_missing === 672 &&
    summary.accepted_interval_certified_constants_status_refs_constructed === 0 &&
    summary.accepted_interval_certified_constants_statuses_constructed === 0 &&
    summary.source_packet_acceptance_rules_constructed === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.row_consumption_count === 0 &&
    summary.preledger_pass_rows === 0 &&
    summary.branch_chart_authorized_rows === 0;
  if (!invariant) {
    throw new Error("Proof-grade accepted-status evidence dependency invariant failed.");
  }
  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-proof-grade-evidence-dependency-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only proof-grade evidence dependency classifier; scans certificate-side JSON evidence and proves that complete source certificates have no compatible proof-grade accepted interval-certified constants status evidence under the live packet, separator family, row scope, schema/status family, and role checks",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: bridge.source_artifacts,
    bridge_attempt_artifact: artifactRecord(paths.bridge),
    source_hash_checks: sourceChecks,
    evidence_compatibility_rule:
      "A certificate JSON object is compatible proof-grade accepted-status evidence only when packet id, separator family, row scope, schema/status family, and proof-grade accepted-status role match the live higher-fold constants route exactly. Source certificates, source-hash locks, candidate/live exact consistency, target notes, and rule targets are rejected as evidence.",
    proof_grade_evidence_fields: PROOF_GRADE_EVIDENCE_FIELDS,
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
      proof_grade_accepted_status_role_matches: record.proof_grade_accepted_status_role_matches,
      compatible_proof_grade_status_evidence: record.compatible_proof_grade_status_evidence,
      rejection_buckets: record.rejection_buckets,
      sha256: record.sha256,
    })),
    separator_proof_grade_evidence_dependency_profiles: separatorProfiles,
    row_proof_grade_evidence_dependency_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "Complete source certificates are present, but no compatible proof-grade accepted interval-certified constants status evidence object exists in the certificate JSON pool.",
      continuation_class:
        "mechanical only after a proof-grade accepted-status derivation evidence object is supplied; otherwise blocked on an explicit source-packet acceptance rule decision",
      fail_closed_stop_conditions: [
        "Do not parse Markdown prose as proof evidence.",
        "Do not treat source certificates, source-hash locks, candidate/live exact consistency, target notes, or rule targets as accepted interval-certified constants status evidence.",
        "Do not reuse the seed-doubled-four-arc-cosine-template-v0 constants contract for the fresh higher-fold packet.",
        "Do not introduce a proof rule, primitive accepted-status rule, source-packet acceptance rule, accepted status, row consumption, preledger pass, live-ledger update, or branch-chart authorization from this classifier.",
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
      "Captured as a priority-only certificate-side dependency classifier under reference/priorities/proof-programs; no promotion to content/markdown/aaa.",
  };
}

function markdownTable(rows) {
  return rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
}

function renderReport(packet) {
  const s = packet.summary;
  const sourceRows = packet.source_hash_checks.map((check) => [
    `\`${check.source_artifact}\``,
    `\`${check.imported_basename}\``,
    `\`${check.current_basename}\``,
    String(check.hash_matches),
  ]);
  const bucketRows = Object.entries(s.evidence_pool_rejection_bucket_counts).map(([bucket, count]) => [
    `\`${bucket}\``,
    String(count),
  ]);
  const separatorRows = packet.separator_proof_grade_evidence_dependency_profiles.map((entry) => [
    `\`${entry.separator_event}\``,
    `\`${entry.fold_interval}\``,
    String(entry.row_count),
    String(entry.derivation_source_evidence_complete),
    String(entry.compatible_proof_grade_evidence_slots_filled),
    String(entry.compatible_proof_grade_evidence_slots_missing),
  ]);
  const rowsBySeparatorRows = Object.entries(s.rows_by_separator_count).map(([separator, count]) => [
    `\`${separator}\``,
    String(count),
  ]);
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted Interval-Certified Status Proof-Grade Evidence Dependency Classifier

Packet: \`${packet.packet_id}\`

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

## Evidence Dependency Sharpened

This classifier starts from the accepted interval-certified status
source-certificate-to-proof-grade-derivation bridge attempt and scans only
certificate-side JSON objects for compatible proof-grade accepted-status
evidence.

Compatibility requires exact match on packet id, separator family, row scope,
schema/status family, and proof-grade accepted-status role. Source certificates,
source-hash locks, candidate/live exact consistency, target notes, rule targets,
and Markdown prose are not counted as proof evidence.

Verified source side:

- ${s.source_hash_checks_passed} / ${s.source_hash_checks} bridge-locked source-hash locks;
- ${s.separators_with_derivation_source_evidence_complete} / ${s.candidate_separator_constants} separator derivation-source evidence profiles complete;
- ${s.rows_with_derivation_source_evidence_complete} / ${s.candidate_row_constant_associations} row derivation-source evidence profiles complete.

Evidence dependency result:

- ${s.evidence_pool_json_files_scanned} certificate JSON files scanned;
- ${s.evidence_pool_compatible_proof_grade_status_evidence_files} compatible proof-grade accepted-status evidence files;
- ${s.separator_proof_grade_evidence_slots} separator proof-grade evidence slots;
- ${s.separator_compatible_proof_grade_evidence_slots_filled} separator proof-grade evidence slots filled;
- ${s.row_proof_grade_evidence_slots} row proof-grade evidence slots;
- ${s.row_compatible_proof_grade_evidence_slots_filled} row proof-grade evidence slots filled.

The first evidence dependency blocker is
\`${s.first_evidence_dependency_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source-Hash Checks

| Source artifact | Imported file | Current file | Hash matches |
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

## Separator Evidence Slots

| Separator | Fold interval | Rows | Source evidence complete | Filled slots | Missing slots |
| --- | --- | ---: | --- | ---: | ---: |
${markdownTable(separatorRows)}

## Row Scope

| Separator | Rows |
| --- | ---: |
${markdownTable(rowsBySeparatorRows)}

## Certificate-Side Handoff

Sharpened blocker: Complete source certificates are present, but no compatible
proof-grade accepted interval-certified constants status evidence object exists
in the certificate JSON pool.

Continuation class: mechanical only after a proof-grade accepted-status
derivation evidence object is supplied; otherwise blocked on an explicit
source-packet acceptance rule decision.

Fail-closed stop conditions:

- Do not parse Markdown prose as proof evidence.
- Do not treat source certificates, source-hash locks, candidate/live exact
  consistency, target notes, or rule targets as accepted interval-certified
  constants status evidence.
- Do not reuse the seed-doubled-four-arc-cosine-template-v0 constants contract
  for the fresh higher-fold packet.
- Do not introduce a proof rule, primitive accepted-status rule,
  source-packet acceptance rule, accepted status, row consumption,
  preledger pass, live-ledger update, or branch-chart authorization from this
  classifier.

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is priority-only and proves no accepted interval-certified
constants status, accepted \`same_packet_fold_impulse_or_direct_quadrature_bound\`,
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
  const bridge = readJson(args.bridge);
  const evidenceRecords = scanEvidencePool(args.evidencePoolDir, OUTPUT_JSON);
  const packet = buildPacket(args, bridge, evidenceRecords);
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
