#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SEPARATOR_AGGREGATE = `${CERT_DIR}/higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_FRONTIER = `${CERT_DIR}/higher_fold_layer_separator_certificate_readiness_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONTRACT = `${CERT_DIR}/fold_interval_constants_contract.md`;
const DEFAULT_FALLBACK_LEGALITY = `${CERT_DIR}/fold_full_interval_fallback_legality.md`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SEPARATOR_AGGREGATE_STATUS =
  "higher_fold_layer_same_packet_separator_aggregate_certificate_attempt_fail_closed_row_enclosures_separator_aggregates_certified_source_packets_absent_no_row_consumption";
const IMPULSE_ACCEPTANCE_STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const FRONTIER_STATUS =
  "higher_fold_layer_separator_certificate_readiness_frontier_classifier_fail_closed_child_refs_complete_aggregate_present_atlas_impulse_parent_locks_absent_no_row_consumption";
const PROOF_FIELD_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_proof_field_dependency_classifier_fail_closed_impulse_direct_quadrature_source_packet_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier_fail_closed_aggregate_present_existing_constants_contract_packet_mismatch_no_source_packet_acceptance_no_row_consumption";

const CONTRACT_PACKET_ID = "seed-doubled-four-arc-cosine-template-v0";
const CONTRACT_REFINEMENT_ID = "preledger-separator-level-split-v1";
const EXISTING_CONSTANTS_CONTRACT_PACKET_MISMATCH = "existing_constants_contract_packet_identity_mismatch";
const EXISTING_CONSTANTS_CONTRACT_SEPARATOR_FAMILY_MISMATCH = "existing_constants_contract_separator_family_mismatch";
const ACCEPTED_HIGHER_FOLD_CONSTANTS_ARTIFACT_ABSENT = "accepted_same_packet_higher_fold_constants_artifact_absent";
const SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

const CONFORMANCE_FIELDS = [
  "separator_aggregate_fields_present",
  "row_enclosures_present",
  "contract_packet_identity_match",
  "contract_separator_family_match",
  "contract_row_family_match",
  "accepted_constants_artifact_present",
  "accepted_constants_conformance",
  "source_packet_acceptance_rule_present",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  "higher_fold_separator_layer_certificate",
];

function parseArgs(argv) {
  const args = {
    separatorAggregate: DEFAULT_SEPARATOR_AGGREGATE,
    impulseAcceptance: DEFAULT_IMPULSE_ACCEPTANCE,
    frontier: DEFAULT_FRONTIER,
    proofFieldDependency: DEFAULT_PROOF_FIELD_DEPENDENCY,
    contract: DEFAULT_CONTRACT,
    fallbackLegality: DEFAULT_FALLBACK_LEGALITY,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--separator-aggregate") {
      args.separatorAggregate = argv[++index];
    } else if (arg === "--impulse-acceptance") {
      args.impulseAcceptance = argv[++index];
    } else if (arg === "--frontier") {
      args.frontier = argv[++index];
    } else if (arg === "--proof-field-dependency") {
      args.proofFieldDependency = argv[++index];
    } else if (arg === "--contract") {
      args.contract = argv[++index];
    } else if (arg === "--fallback-legality") {
      args.fallbackLegality = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-fixed-parameter-aggregate-accepted-constants-conformance-classifier.mjs [options]

Options:
  --separator-aggregate PATH      Same-packet separator aggregate certificate attempt. Defaults to ${DEFAULT_SEPARATOR_AGGREGATE}.
  --impulse-acceptance PATH       Impulse-bound source-packet acceptance dependency classifier. Defaults to ${DEFAULT_IMPULSE_ACCEPTANCE}.
  --frontier PATH                 Separator-certificate readiness frontier classifier. Defaults to ${DEFAULT_FRONTIER}.
  --proof-field-dependency PATH   Separator proof-field dependency classifier. Defaults to ${DEFAULT_PROOF_FIELD_DEPENDENCY}.
  --contract PATH                 Fold interval constants contract. Defaults to ${DEFAULT_CONTRACT}.
  --fallback-legality PATH        Full-interval fallback legality note. Defaults to ${DEFAULT_FALLBACK_LEGALITY}.
  --out-dir PATH                  Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                        Pretty-print JSON artifact.
  --help                          Show this help.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
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

function assertPacketId(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
}

function assertStatus(source, name, expected) {
  if (source.status !== expected) {
    throw new Error(`Unexpected ${name} status: ${source.status}`);
  }
}

function assertFailClosed(source, name) {
  if (source.preledger_pass !== false || source.updates_live_ledger !== false) {
    throw new Error(`${name} does not preserve preledger/live-ledger locks.`);
  }
  if (source.branch_chart_authorized !== false) {
    throw new Error(`${name} does not preserve branch-chart lock.`);
  }
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

function presenceCounts(rows, fields) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => row[field] === true);
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function validateInputs(inputs) {
  assertPacketId(inputs.separatorAggregate, "separatorAggregate");
  assertPacketId(inputs.impulseAcceptance, "impulseAcceptance");
  assertPacketId(inputs.frontier, "frontier");
  assertPacketId(inputs.proofFieldDependency, "proofFieldDependency");
  assertFailClosed(inputs.separatorAggregate, "separatorAggregate");
  assertFailClosed(inputs.impulseAcceptance, "impulseAcceptance");
  assertFailClosed(inputs.frontier, "frontier");
  assertFailClosed(inputs.proofFieldDependency, "proofFieldDependency");
  assertStatus(inputs.separatorAggregate, "separatorAggregate", SEPARATOR_AGGREGATE_STATUS);
  assertStatus(inputs.impulseAcceptance, "impulseAcceptance", IMPULSE_ACCEPTANCE_STATUS);
  assertStatus(inputs.frontier, "frontier", FRONTIER_STATUS);
  assertStatus(inputs.proofFieldDependency, "proofFieldDependency", PROOF_FIELD_DEPENDENCY_STATUS);
  if (inputs.separatorAggregate.summary?.separator_aggregate_certificates !== 12) {
    throw new Error("Expected 12 higher-fold separator aggregate certificates.");
  }
  if (inputs.separatorAggregate.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 higher-fold aggregate rows.");
  }
  if (inputs.impulseAcceptance.summary?.separators_with_source_packet_acceptance_rule !== 0) {
    throw new Error("Impulse acceptance input unexpectedly contains source-packet acceptance rules.");
  }
  if (inputs.impulseAcceptance.summary?.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets !== 0) {
    throw new Error("Impulse acceptance input unexpectedly contains accepted source packets.");
  }
  if (!inputs.contractText.includes(CONTRACT_PACKET_ID) || !inputs.contractText.includes(CONTRACT_REFINEMENT_ID)) {
    throw new Error("Constants contract no longer exposes the expected seed packet scope.");
  }
  if (!inputs.fallbackText.includes(CONTRACT_PACKET_ID) || !inputs.fallbackText.includes(CONTRACT_REFINEMENT_ID)) {
    throw new Error("Fallback legality note no longer exposes the expected seed packet scope.");
  }
}

function buildContractConformance(inputs) {
  return {
    live_packet_id: PACKET_ID,
    contract_packet_id: CONTRACT_PACKET_ID,
    contract_refinement_id: CONTRACT_REFINEMENT_ID,
    contract_mentions_live_packet_id: inputs.contractText.includes(PACKET_ID),
    fallback_mentions_live_packet_id: inputs.fallbackText.includes(PACKET_ID),
    contract_seed_packet_bound: inputs.contractText.includes(CONTRACT_PACKET_ID),
    fallback_seed_packet_bound: inputs.fallbackText.includes(CONTRACT_PACKET_ID),
    contract_separator_family: "Sigma_1_through_Sigma_4",
    live_separator_family: "Sigma_hf_01_through_Sigma_hf_12",
    contract_mentions_higher_fold_separator_family: inputs.contractText.includes("Sigma_hf_01"),
    fallback_mentions_higher_fold_separator_family: inputs.fallbackText.includes("Sigma_hf_01"),
    contract_fold_row_count: 16,
    live_fold_layer_row_count: inputs.separatorAggregate.summary.fold_layer_rows,
    packet_identity_match: false,
    separator_family_match: false,
    row_family_match: false,
    fallback_permitted_in_principle_for_contract_scope:
      inputs.fallbackText.includes("do permit") && inputs.fallbackText.includes("coarse fixed-parameter consumption"),
    fallback_is_not_direct_quadrature: inputs.fallbackText.includes("not direct quadrature"),
    fallback_requires_accepted_interval_certified_data: inputs.fallbackText.includes(
      "accepted interval-certified data",
    ),
    existing_diagnostic_attempts_not_accepted: inputs.fallbackText.includes(
      "existing diagnostic attempts do not satisfy",
    ),
    accepted_constants_artifact_present: false,
    accepted_constants_conformance: false,
    first_conformance_blocker: EXISTING_CONSTANTS_CONTRACT_PACKET_MISMATCH,
    blockers: [
      EXISTING_CONSTANTS_CONTRACT_PACKET_MISMATCH,
      EXISTING_CONSTANTS_CONTRACT_SEPARATOR_FAMILY_MISMATCH,
      ACCEPTED_HIGHER_FOLD_CONSTANTS_ARTIFACT_ABSENT,
      SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    ],
  };
}

function separatorConformanceProfile(separator, conformance) {
  return {
    separator_event: separator.separator_event,
    fold_interval: separator.fold_interval,
    row_count: separator.row_count,
    row_ids: separator.row_ids,
    selected_route_candidate: separator.selected_route_candidate,
    aggregate_certificate_rule: separator.aggregate_certificate_rule,
    separator_aggregate_fields_present:
      separator.separator_aggregate_C_Sigma_present === true &&
      separator.separator_aggregate_A_Sigma_eta_epsilon_c_present === true &&
      separator.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present === true,
    row_enclosures_present: separator.source_row_enclosures_complete === true,
    row_tube_eta_sqrt_scaling_certified: separator.row_tube_eta_sqrt_scaling_certified_rows > 0,
    direct_quadrature_I_fold_B_present: separator.direct_quadrature_I_fold_B_rows > 0,
    contract_packet_identity_match: conformance.packet_identity_match,
    contract_separator_family_match: conformance.separator_family_match,
    contract_row_family_match: conformance.row_family_match,
    accepted_constants_artifact_present: conformance.accepted_constants_artifact_present,
    accepted_constants_conformance: false,
    source_packet_acceptance_rule_present: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
    higher_fold_separator_layer_certificate: false,
    first_conformance_blocker: EXISTING_CONSTANTS_CONTRACT_PACKET_MISMATCH,
    first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
    conformance_blockers: conformance.blockers,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };
}

function rowConformanceProfile(row, conformance) {
  return {
    row_id: row.row_id,
    ledger: row.ledger,
    status: row.status,
    failure_code: row.failure_code,
    separator_event: row.separator_event,
    fold_interval: row.fold_interval,
    receiver_interval: row.receiver_interval,
    source_interval: row.source_interval,
    selected_route_candidate: row.selected_route_candidate,
    row_enclosure_present: row.row_impulse_enclosure === true,
    row_tube_eta_sqrt_scaling_certified: row.row_tube_eta_sqrt_scaling_certified === true,
    direct_quadrature_I_fold_B_present: row.direct_quadrature_I_fold_B_present === true,
    separator_aggregate_fields_present:
      row.separator_aggregate_C_Sigma_present === true &&
      row.separator_aggregate_A_Sigma_eta_epsilon_c_present === true &&
      row.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present === true,
    contract_packet_identity_match: conformance.packet_identity_match,
    contract_separator_family_match: conformance.separator_family_match,
    contract_row_family_match: conformance.row_family_match,
    accepted_constants_artifact_present: conformance.accepted_constants_artifact_present,
    accepted_constants_conformance: false,
    source_packet_acceptance_rule_present: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
    higher_fold_separator_layer_certificate: false,
    first_conformance_blocker: EXISTING_CONSTANTS_CONTRACT_PACKET_MISMATCH,
    first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
    conformance_blockers: conformance.blockers,
    accepted_fold_layer_row: false,
    row_consumed: false,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
  };
}

function buildClassifier(paths, inputs) {
  validateInputs(inputs);
  const contractConformance = buildContractConformance(inputs);
  const separators = inputs.separatorAggregate.separator_aggregate_certificates
    .map((separator) => separatorConformanceProfile(separator, contractConformance))
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
  const rows = inputs.separatorAggregate.row_aggregate_certificates
    .map((row) => rowConformanceProfile(row, contractConformance))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rows, (row) => row.separator_event));

  const summary = {
    separator_conformance_profiles: separators.length,
    fold_layer_rows: rows.length,
    rows_by_separator_count: rowsBySeparatorCount,
    separators_with_separator_aggregate_fields: countTrue(
      separators,
      (separator) => separator.separator_aggregate_fields_present,
    ),
    rows_with_row_enclosures: countTrue(rows, (row) => row.row_enclosure_present),
    separators_with_row_tube_eta_sqrt_scaling_certified: countTrue(
      separators,
      (separator) => separator.row_tube_eta_sqrt_scaling_certified,
    ),
    rows_with_row_tube_eta_sqrt_scaling_certified: countTrue(
      rows,
      (row) => row.row_tube_eta_sqrt_scaling_certified,
    ),
    separators_with_direct_quadrature_I_fold_B: countTrue(
      separators,
      (separator) => separator.direct_quadrature_I_fold_B_present,
    ),
    rows_with_direct_quadrature_I_fold_B: countTrue(rows, (row) => row.direct_quadrature_I_fold_B_present),
    separators_with_contract_packet_identity_match: countTrue(
      separators,
      (separator) => separator.contract_packet_identity_match,
    ),
    separators_with_contract_separator_family_match: countTrue(
      separators,
      (separator) => separator.contract_separator_family_match,
    ),
    separators_with_accepted_constants_artifact: countTrue(
      separators,
      (separator) => separator.accepted_constants_artifact_present,
    ),
    separators_with_accepted_constants_conformance: countTrue(
      separators,
      (separator) => separator.accepted_constants_conformance,
    ),
    rows_with_accepted_constants_conformance: countTrue(rows, (row) => row.accepted_constants_conformance),
    separators_with_source_packet_acceptance_rule: countTrue(
      separators,
      (separator) => separator.source_packet_acceptance_rule_present,
    ),
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: countTrue(
      separators,
      (separator) => separator.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet,
    ),
    rows_with_accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: countTrue(
      rows,
      (row) => row.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet,
    ),
    rows_with_higher_fold_separator_layer_certificate: countTrue(
      rows,
      (row) => row.higher_fold_separator_layer_certificate,
    ),
    conformance_field_presence_counts: presenceCounts(separators, CONFORMANCE_FIELDS),
    row_conformance_field_presence_counts: presenceCounts(rows, [
      "separator_aggregate_fields_present",
      "row_enclosure_present",
      "contract_packet_identity_match",
      "contract_separator_family_match",
      "contract_row_family_match",
      "accepted_constants_artifact_present",
      "accepted_constants_conformance",
      "source_packet_acceptance_rule_present",
      "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
      "higher_fold_separator_layer_certificate",
      "row_consumed",
    ]),
    contract_packet_identity_mismatch: true,
    contract_separator_family_mismatch: true,
    accepted_constants_artifact_present: false,
    first_conformance_blocker: EXISTING_CONSTANTS_CONTRACT_PACKET_MISMATCH,
    first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  const invariant =
    summary.separator_conformance_profiles === 12 &&
    summary.fold_layer_rows === 112 &&
    summary.separators_with_separator_aggregate_fields === 12 &&
    summary.rows_with_row_enclosures === 112 &&
    summary.separators_with_row_tube_eta_sqrt_scaling_certified === 0 &&
    summary.separators_with_direct_quadrature_I_fold_B === 0 &&
    summary.separators_with_contract_packet_identity_match === 0 &&
    summary.separators_with_contract_separator_family_match === 0 &&
    summary.separators_with_accepted_constants_artifact === 0 &&
    summary.separators_with_accepted_constants_conformance === 0 &&
    summary.separators_with_source_packet_acceptance_rule === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.rows_with_higher_fold_separator_layer_certificate === 0 &&
    summary.row_consumption_count === 0;
  if (!invariant) {
    throw new Error("Fail-closed accepted constants conformance invariant failed.");
  }

  return {
    schema: "breather-higher-fold-layer-same-packet-fixed-parameter-aggregate-accepted-constants-conformance-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only accepted constants conformance classifier for the fixed-parameter aggregate route; confirms higher-fold aggregate fields are present but the existing constants contract/fallback notes are scoped to a different packet and separator family, so no source-packet acceptance, row consumption, preledger pass, live-ledger update, or branch-chart authorization follows",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      same_packet_separator_aggregate_certificate_attempt: artifactRecord(paths.separatorAggregate),
      same_packet_impulse_bound_source_packet_acceptance_dependency_classifier: artifactRecord(
        paths.impulseAcceptance,
      ),
      separator_certificate_readiness_frontier_classifier: artifactRecord(paths.frontier),
      separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
      fold_interval_constants_contract: artifactRecord(paths.contract),
      fold_full_interval_fallback_legality: artifactRecord(paths.fallbackLegality),
    },
    accepted_constants_conformance_rule: {
      name: "same_packet_fixed_parameter_aggregate_accepted_constants_conformance",
      live_packet_id: PACKET_ID,
      accepted_constants_artifact_required: true,
      accepted_constants_artifact_present: false,
      existing_contract_packet_id: CONTRACT_PACKET_ID,
      existing_contract_refinement_id: CONTRACT_REFINEMENT_ID,
      existing_contract_scope_matches_live_packet: false,
      existing_contract_separator_family_matches_live_packet: false,
      existing_contract_row_family_matches_live_packet: false,
      first_conformance_blocker: EXISTING_CONSTANTS_CONTRACT_PACKET_MISMATCH,
      source_packet_acceptance_rule_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    },
    contract_conformance: contractConformance,
    separator_conformance_profiles: separators,
    row_conformance_profiles: rows,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "accepted higher-fold constants artifact on packet fresh-v10-higher-fold-12-root-rebuild-v0 for Sigma_hf_01 through Sigma_hf_12, or an explicit source-packet acceptance rule",
      continuation_class:
        "mechanical if an accepted same-packet higher-fold constants artifact appears; otherwise the impulse/source-packet route remains acceptance-rule blocked",
      decision_boundary:
        "this classifier does not accept the seed packet constants contract for the higher-fold packet and does not introduce a source-packet acceptance rule",
      fail_closed_stop_conditions: [
        "Do not reuse the seed-doubled-four-arc-cosine-template-v0 constants contract as accepted constants for fresh-v10-higher-fold-12-root-rebuild-v0.",
        "Do not treat Sigma_1 through Sigma_4 fallback legality as acceptance for Sigma_hf_01 through Sigma_hf_12.",
        "Do not promote separator aggregate fields into accepted same_packet_fold_impulse_or_direct_quadrature_bound source packets.",
        "Do not construct parent_complement_consumption_ref or higher_fold_separator_layer_certificate from this conformance classifier.",
        "Do not consume rows, set preledger_pass, update the live ledger, or authorize a branch chart.",
      ],
    },
    authorization_lock: {
      preledger_pass_rows: 0,
      accepted_fold_layer_rows: 0,
      row_consumption_count: 0,
      branch_chart_authorized_rows: 0,
      preledger_pass_authorized: false,
      accepted_fold_layer_rows_authorized: false,
      row_consumption_authorized: false,
      branch_chart_authorized: false,
    },
    capture_decision:
      "Priority-only. This classifier proves only that the existing constants contract/fallback notes do not conform as an accepted constants artifact for the fresh-v10 higher-fold packet. It proves no accepted same_packet_fold_impulse_or_direct_quadrature_bound, higher_fold_separator_layer_certificate, row consumption, live-ledger update, or branch-chart authorization.",
  };
}

function sourceTable(sourceArtifacts) {
  return Object.entries(sourceArtifacts)
    .map(
      ([name, artifact]) =>
        `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present ? "true" : "false"} | \`${artifact.sha256 ?? "missing"}\` |`,
    )
    .join("\n");
}

function fieldPresenceTable(counts) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(separators) {
  return separators
    .map(
      (separator) =>
        `| \`${separator.separator_event}\` | \`${separator.fold_interval}\` | ${separator.row_count} | ${separator.separator_aggregate_fields_present} | ${separator.row_enclosures_present} | ${separator.contract_packet_identity_match} | ${separator.contract_separator_family_match} | ${separator.accepted_constants_conformance} | ${separator.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet} |`,
    )
    .join("\n");
}

function reportMarkdown(classifier) {
  return `# Higher-Fold Layer Same-Packet Fixed-Parameter Aggregate Accepted Constants Conformance Classifier

Packet: \`${classifier.packet_id}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

The same-packet separator aggregate route has interval aggregate fields for
12 / 12 higher-fold separator profiles and row enclosures for 112 / 112
fold-layer rows. This classifier tests whether the existing constants contract
and full-interval fallback legality note can serve as an accepted constants
artifact for this packet.

They cannot. The contract and fallback legality note are scoped to
\`${classifier.contract_conformance.contract_packet_id}\` with refinement
\`${classifier.contract_conformance.contract_refinement_id}\`, separator family
\`${classifier.contract_conformance.contract_separator_family}\`, and 16 fold
rows. The live route is \`${classifier.contract_conformance.live_packet_id}\`,
separator family \`${classifier.contract_conformance.live_separator_family}\`,
and ${classifier.contract_conformance.live_fold_layer_row_count} fold-layer
rows.

The first conformance blocker is
\`${classifier.summary.first_conformance_blocker}\`. The source-packet blocker
remains \`${classifier.summary.first_source_packet_blocker}\`.

It records 0 accepted \`same_packet_fold_impulse_or_direct_quadrature_bound\`
source packets, 0 separator certificates, 0 row consumption,
\`preledger_pass=false\`, no live-ledger update, and no branch-chart
authorization.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Contract Conformance

| Check | Value |
| --- | --- |
| live packet | \`${classifier.contract_conformance.live_packet_id}\` |
| existing contract packet | \`${classifier.contract_conformance.contract_packet_id}\` |
| packet identity match | ${classifier.contract_conformance.packet_identity_match} |
| live separator family | \`${classifier.contract_conformance.live_separator_family}\` |
| contract separator family | \`${classifier.contract_conformance.contract_separator_family}\` |
| separator family match | ${classifier.contract_conformance.separator_family_match} |
| live fold-layer rows | ${classifier.contract_conformance.live_fold_layer_row_count} |
| contract fold rows | ${classifier.contract_conformance.contract_fold_row_count} |
| row family match | ${classifier.contract_conformance.row_family_match} |
| accepted constants artifact present | ${classifier.contract_conformance.accepted_constants_artifact_present} |
| accepted constants conformance | ${classifier.contract_conformance.accepted_constants_conformance} |

## Separator Conformance

| Separator | Fold interval | Rows | Aggregates | Row enclosures | Packet match | Family match | Constants conformance | Accepted source packet |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- |
${separatorTable(classifier.separator_conformance_profiles)}

## Field Presence

Separator-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${fieldPresenceTable(classifier.summary.conformance_field_presence_counts)}

Row-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${fieldPresenceTable(classifier.summary.row_conformance_field_presence_counts)}

## Certificate-Side Handoff

Next artifact target: \`${classifier.next_certificate_handoff.artifact_target}\`.

Continuation class: ${classifier.next_certificate_handoff.continuation_class}.

Decision boundary: ${classifier.next_certificate_handoff.decision_boundary}.

Fail-closed stop conditions:

${classifier.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is priority-only and proves no accepted
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
    separatorAggregate: args.separatorAggregate,
    impulseAcceptance: args.impulseAcceptance,
    frontier: args.frontier,
    proofFieldDependency: args.proofFieldDependency,
    contract: args.contract,
    fallbackLegality: args.fallbackLegality,
  };
  const inputs = {
    separatorAggregate: readJson(paths.separatorAggregate),
    impulseAcceptance: readJson(paths.impulseAcceptance),
    frontier: readJson(paths.frontier),
    proofFieldDependency: readJson(paths.proofFieldDependency),
    contractText: readText(paths.contract),
    fallbackText: readText(paths.fallbackLegality),
  };
  const classifier = buildClassifier(paths, inputs);
  const outputJson = path.join(args.outDir, OUTPUT_JSON);
  const outputReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJson, classifier, args.pretty);
  writeText(outputReport, reportMarkdown(classifier));
  console.log(JSON.stringify({ status: classifier.status, output_json: outputJson, output_report: outputReport }, null, 2));
}

main();
