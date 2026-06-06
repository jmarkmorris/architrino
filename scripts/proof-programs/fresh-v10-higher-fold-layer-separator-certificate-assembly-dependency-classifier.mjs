#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_FRONTIER = `${CERT_DIR}/higher_fold_layer_separator_certificate_readiness_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ATLAS_BRIDGE = `${CERT_DIR}/higher_fold_layer_accepted_atlas_ref_derivation_bridge_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_separator_certificate_assembly_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_separator_certificate_assembly_dependency_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const FRONTIER_STATUS =
  "higher_fold_layer_separator_certificate_readiness_frontier_classifier_fail_closed_child_refs_complete_aggregate_present_atlas_impulse_parent_locks_absent_no_row_consumption";
const ATLAS_BRIDGE_STATUS =
  "higher_fold_layer_accepted_atlas_ref_derivation_bridge_attempt_fail_closed_atlas_source_certificates_present_derivation_bridge_absent_no_row_consumption";
const IMPULSE_ACCEPTANCE_STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_separator_certificate_assembly_dependency_classifier_fail_closed_child_refs_complete_atlas_bridge_impulse_acceptance_parent_consumption_absent_no_row_consumption";

const ATLAS_BRIDGE_BLOCKER = "accepted_atlas_ref_source_certificate_to_accepted_field_derivation_bridge_absent";
const ATLAS_REF_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const IMPULSE_ACCEPTANCE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

const SEPARATOR_FIELDS = [
  "child_proof_grade_refs_complete",
  "atlas_source_certificate_present",
  "accepted_atlas_ref_derivation_bridge_present",
  "accepted_higher_fold_layer_atlas_ref_present",
  "separator_aggregate_fields_complete",
  "source_packet_acceptance_rule_present",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  "parent_row_association_anchor_present",
  "parent_complement_consumption_ref_present",
  "higher_fold_separator_layer_certificate_present",
];

const ROW_FIELDS = [
  "child_proof_grade_refs_complete",
  "atlas_source_certificate_present",
  "accepted_atlas_ref_derivation_bridge_present",
  "accepted_higher_fold_layer_atlas_ref_present",
  "separator_aggregate_fields_complete",
  "source_packet_acceptance_rule_present",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  "parent_row_association_anchor_present",
  "parent_complement_consumption_ref_present",
  "higher_fold_separator_layer_certificate_present",
  "accepted_fold_layer_row",
  "row_consumed",
];

function parseArgs(argv) {
  const args = {
    frontier: DEFAULT_FRONTIER,
    atlasBridge: DEFAULT_ATLAS_BRIDGE,
    impulseAcceptance: DEFAULT_IMPULSE_ACCEPTANCE,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--frontier") {
      args.frontier = argv[++index];
    } else if (arg === "--atlas-bridge") {
      args.atlasBridge = argv[++index];
    } else if (arg === "--impulse-acceptance") {
      args.impulseAcceptance = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-separator-certificate-assembly-dependency-classifier.mjs [options]

Options:
  --frontier PATH             Separator-certificate readiness frontier classifier. Defaults to ${DEFAULT_FRONTIER}.
  --atlas-bridge PATH         Accepted atlas-ref derivation-bridge attempt. Defaults to ${DEFAULT_ATLAS_BRIDGE}.
  --impulse-acceptance PATH   Impulse-bound source-packet acceptance dependency classifier. Defaults to ${DEFAULT_IMPULSE_ACCEPTANCE}.
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

function mapBy(array, getter, name) {
  const map = new Map();
  for (const entry of array ?? []) {
    const key = getter(entry);
    if (key == null) {
      continue;
    }
    if (map.has(key)) {
      throw new Error(`Duplicate ${name} key: ${key}`);
    }
    map.set(key, entry);
  }
  return map;
}

function requireMapEntry(map, key, name) {
  if (!map.has(key)) {
    throw new Error(`Missing ${name}: ${key}`);
  }
  return map.get(key);
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
  for (const [name, source] of Object.entries(inputs)) {
    assertPacketId(source, name);
    assertFailClosed(source, name);
  }
  assertStatus(inputs.frontier, "frontier", FRONTIER_STATUS);
  assertStatus(inputs.atlasBridge, "atlasBridge", ATLAS_BRIDGE_STATUS);
  assertStatus(inputs.impulseAcceptance, "impulseAcceptance", IMPULSE_ACCEPTANCE_STATUS);
  if (inputs.frontier.summary?.rows_with_child_proof_grade_refs_complete !== 112) {
    throw new Error("Frontier input no longer has 112 complete child proof-grade rows.");
  }
  if (inputs.frontier.summary?.rows_with_separator_aggregate_fields_complete !== 112) {
    throw new Error("Frontier input no longer has 112 rows with separator aggregate fields.");
  }
  if (inputs.frontier.summary?.rows_with_parent_row_association_anchor !== 112) {
    throw new Error("Frontier input no longer has 112 parent row-association anchors.");
  }
  if (inputs.atlasBridge.summary?.rows_with_accepted_atlas_ref_derivation_bridge !== 0) {
    throw new Error("Atlas bridge input unexpectedly contains accepted-atlas derivation bridges.");
  }
  if (inputs.atlasBridge.summary?.rows_with_accepted_higher_fold_layer_atlas_ref !== 0) {
    throw new Error("Atlas bridge input unexpectedly contains accepted atlas refs.");
  }
  if (inputs.impulseAcceptance.summary?.separators_with_source_packet_acceptance_rule !== 0) {
    throw new Error("Impulse acceptance input unexpectedly contains source-packet acceptance rules.");
  }
  if (inputs.impulseAcceptance.summary?.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets !== 0) {
    throw new Error("Impulse acceptance input unexpectedly contains accepted source packets.");
  }
}

function rowLockFieldMap() {
  return {
    higher_fold_layer_atlas_ref: false,
    alpha_floor: true,
    exit_floor: true,
    fold_layer_parity_record: true,
    same_packet_fold_impulse_or_direct_quadrature_bound: false,
    parent_complement_consumption_ref: false,
    higher_fold_separator_layer_certificate: false,
    accepted_fold_layer_row: false,
    row_consumed: false,
  };
}

function assemblyBlockers() {
  return [ATLAS_BRIDGE_BLOCKER, IMPULSE_ACCEPTANCE_BLOCKER, PARENT_CONSUMPTION_BLOCKER, SEPARATOR_CERTIFICATE_BLOCKER];
}

function buildSeparatorProfiles(inputs) {
  const atlasBySeparator = mapBy(
    inputs.atlasBridge.separator_atlas_ref_derivation_bridge_attempts,
    (entry) => entry.separator_event,
    "atlas bridge separator",
  );
  const impulseBySeparator = mapBy(
    inputs.impulseAcceptance.separator_acceptance_dependency_profiles,
    (entry) => entry.separator_event,
    "impulse acceptance separator",
  );

  return [...inputs.frontier.separator_frontier_profiles]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((frontier) => {
      const atlas = requireMapEntry(atlasBySeparator, frontier.separator_event, "atlas bridge separator");
      const impulse = requireMapEntry(impulseBySeparator, frontier.separator_event, "impulse acceptance separator");
      return {
        separator_event: frontier.separator_event,
        fold_interval: frontier.fold_interval,
        row_count: frontier.row_count,
        row_ids: frontier.row_ids,
        child_proof_grade_refs_complete: frontier.child_proof_grade_refs_complete === true,
        atlas_source_certificate_present: frontier.atlas_source_certificate_present === true,
        accepted_atlas_ref_derivation_bridge_present: atlas.accepted_atlas_ref_derivation_bridge_present === true,
        accepted_higher_fold_layer_atlas_ref_present: atlas.accepted_higher_fold_layer_atlas_ref_present === true,
        separator_aggregate_C_Sigma_present: frontier.separator_aggregate_C_Sigma_present === true,
        separator_aggregate_A_Sigma_eta_epsilon_c_present:
          frontier.separator_aggregate_A_Sigma_eta_epsilon_c_present === true,
        separator_aggregate_I_fold_eta_epsilon_c_Sigma_present:
          frontier.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present === true,
        separator_aggregate_fields_complete: frontier.separator_aggregate_fields_complete === true,
        source_packet_acceptance_rule_present: impulse.source_packet_acceptance_rule_present === true,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet:
          impulse.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet === true,
        parent_row_association_anchor_present: frontier.parent_row_association_anchor_present === true,
        parent_complement_consumption_ref_present: frontier.parent_complement_consumption_ref_present === true,
        higher_fold_separator_layer_certificate_present: false,
        first_assembly_blocker: ATLAS_BRIDGE_BLOCKER,
        first_accepted_atlas_ref_blocker: ATLAS_REF_BLOCKER,
        first_source_packet_blocker: IMPULSE_ACCEPTANCE_BLOCKER,
        parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
        first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
        assembly_blockers: assemblyBlockers(),
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildRowProfiles(inputs) {
  const atlasByRow = mapBy(inputs.atlasBridge.row_atlas_ref_derivation_bridge_attempts, (entry) => entry.row_id, "atlas bridge row");
  const impulseByRow = mapBy(
    inputs.impulseAcceptance.row_acceptance_dependency_profiles,
    (entry) => entry.row_id,
    "impulse acceptance row",
  );

  return [...inputs.frontier.row_frontier_profiles]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((frontier) => {
      const atlas = requireMapEntry(atlasByRow, frontier.row_id, "atlas bridge row");
      const impulse = requireMapEntry(impulseByRow, frontier.row_id, "impulse acceptance row");
      return {
        row_id: frontier.row_id,
        ledger: frontier.ledger,
        status: frontier.status,
        failure_code: frontier.failure_code,
        separator_event: frontier.separator_event,
        fold_interval: frontier.fold_interval,
        child_proof_grade_refs_complete: frontier.child_proof_grade_refs_complete === true,
        atlas_source_certificate_present: frontier.atlas_source_certificate_present === true,
        accepted_atlas_ref_derivation_bridge_present: atlas.accepted_atlas_ref_derivation_bridge_present === true,
        accepted_higher_fold_layer_atlas_ref_present: atlas.accepted_higher_fold_layer_atlas_ref_present === true,
        separator_aggregate_fields_complete: frontier.separator_aggregate_fields_complete === true,
        source_packet_acceptance_rule_present: impulse.source_packet_acceptance_rule_present === true,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet:
          impulse.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet === true,
        parent_row_association_anchor_present: frontier.parent_row_association_anchor_present === true,
        parent_complement_consumption_ref_present: frontier.parent_complement_consumption_ref_present === true,
        higher_fold_separator_layer_certificate_present: false,
        row_lock_fields_present_after_assembly_dependency_classification: rowLockFieldMap(),
        first_assembly_blocker: ATLAS_BRIDGE_BLOCKER,
        first_accepted_atlas_ref_blocker: ATLAS_REF_BLOCKER,
        first_source_packet_blocker: IMPULSE_ACCEPTANCE_BLOCKER,
        parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
        first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
        assembly_blockers: assemblyBlockers(),
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
      };
    });
}

function buildClassifier(paths, inputs) {
  validateInputs(inputs);
  const separators = buildSeparatorProfiles(inputs);
  const rows = buildRowProfiles(inputs);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rows, (row) => row.separator_event));

  const summary = {
    separator_assembly_dependency_profiles: separators.length,
    fold_layer_rows: rows.length,
    rows_by_separator_count: rowsBySeparatorCount,
    rows_with_child_proof_grade_refs_complete: countTrue(rows, (row) => row.child_proof_grade_refs_complete),
    rows_with_atlas_source_certificate: countTrue(rows, (row) => row.atlas_source_certificate_present),
    rows_with_accepted_atlas_ref_derivation_bridge: countTrue(
      rows,
      (row) => row.accepted_atlas_ref_derivation_bridge_present,
    ),
    rows_with_accepted_higher_fold_layer_atlas_ref: countTrue(
      rows,
      (row) => row.accepted_higher_fold_layer_atlas_ref_present,
    ),
    rows_with_separator_aggregate_fields_complete: countTrue(rows, (row) => row.separator_aggregate_fields_complete),
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
    rows_with_parent_row_association_anchor: countTrue(rows, (row) => row.parent_row_association_anchor_present),
    rows_with_parent_complement_consumption_ref: countTrue(
      rows,
      (row) => row.parent_complement_consumption_ref_present,
    ),
    rows_with_higher_fold_separator_layer_certificate: countTrue(
      rows,
      (row) => row.higher_fold_separator_layer_certificate_present,
    ),
    separator_field_presence_counts: presenceCounts(separators, SEPARATOR_FIELDS),
    row_field_presence_counts: presenceCounts(rows, ROW_FIELDS),
    first_assembly_blocker: ATLAS_BRIDGE_BLOCKER,
    first_accepted_atlas_ref_blocker: ATLAS_REF_BLOCKER,
    first_source_packet_blocker: IMPULSE_ACCEPTANCE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  const invariant =
    summary.separator_assembly_dependency_profiles === 12 &&
    summary.fold_layer_rows === 112 &&
    summary.rows_with_child_proof_grade_refs_complete === 112 &&
    summary.rows_with_atlas_source_certificate === 112 &&
    summary.rows_with_accepted_atlas_ref_derivation_bridge === 0 &&
    summary.rows_with_accepted_higher_fold_layer_atlas_ref === 0 &&
    summary.rows_with_separator_aggregate_fields_complete === 112 &&
    summary.separators_with_source_packet_acceptance_rule === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.rows_with_parent_row_association_anchor === 112 &&
    summary.rows_with_parent_complement_consumption_ref === 0 &&
    summary.rows_with_higher_fold_separator_layer_certificate === 0 &&
    summary.row_consumption_count === 0;
  if (!invariant) {
    throw new Error("Fail-closed separator-certificate assembly dependency invariant failed.");
  }

  return {
    schema: "breather-higher-fold-layer-separator-certificate-assembly-dependency-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only separator-certificate assembly dependency classifier; combines the current child-ref, atlas-bridge, impulse-acceptance, and parent-anchor frontier while proving no higher_fold_separator_layer_certificate, row consumption, preledger pass, live-ledger update, or branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      separator_certificate_readiness_frontier_classifier: artifactRecord(paths.frontier),
      accepted_atlas_ref_derivation_bridge_attempt: artifactRecord(paths.atlasBridge),
      same_packet_impulse_bound_source_packet_acceptance_dependency_classifier: artifactRecord(
        paths.impulseAcceptance,
      ),
    },
    classifier_rule: {
      name: "higher_fold_separator_certificate_assembly_dependency_after_frontier",
      required_fields: [
        "accepted_higher_fold_layer_atlas_ref",
        "alpha_floor",
        "exit_floor",
        "same_packet_fold_impulse_or_direct_quadrature_bound",
        "fold_layer_parity_record",
        "parent_complement_consumption_ref",
      ],
      present_ready_source_fields: [
        "alpha_floor",
        "exit_floor",
        "fold_layer_parity_record",
        "atlas_source_certificate",
        "separator_aggregate_fields",
        "parent_row_association_anchor",
      ],
      absent_accepted_fields: [
        "accepted_atlas_ref_derivation_bridge",
        "accepted_higher_fold_layer_atlas_ref",
        "source_packet_acceptance_rule",
        "same_packet_fold_impulse_or_direct_quadrature_bound",
        "parent_complement_consumption_ref",
        "higher_fold_separator_layer_certificate",
      ],
      first_assembly_blocker: ATLAS_BRIDGE_BLOCKER,
      source_packet_blocker: IMPULSE_ACCEPTANCE_BLOCKER,
      parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    },
    separator_assembly_dependency_profiles: separators,
    row_assembly_dependency_profiles: rows,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "accepted higher_fold_layer_atlas_ref derivation bridge plus accepted same_packet_fold_impulse_or_direct_quadrature_bound source-packet evidence before parent_complement_consumption_ref or higher_fold_separator_layer_certificate assembly",
      continuation_class:
        "mechanical only for additional fail-closed classifiers or for importing proof-grade accepted-field evidence; separator-certificate assembly itself needs the absent accepted atlas-ref and accepted source-packet fields",
      decision_boundary:
        "this classifier does not introduce a source-packet acceptance rule, does not treat atlas source certificates as accepted atlas refs, and does not authorize parent-complement consumption",
      fail_closed_stop_conditions: [
        "Do not treat proof_source_certificate_ref as accepted higher_fold_layer_atlas_ref.",
        "Do not promote separator aggregate fields into accepted same_packet_fold_impulse_or_direct_quadrature_bound source packets.",
        "Do not construct parent_complement_consumption_ref before certificate/row-consumption authority exists.",
        "Do not construct higher_fold_separator_layer_certificate from this dependency classifier.",
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
      "Priority-only. This classifier proves only the separator-certificate assembly dependency state after the latest frontier. It proves no accepted higher_fold_layer_atlas_ref, accepted same_packet_fold_impulse_or_direct_quadrature_bound, parent_complement_consumption_ref, higher_fold_separator_layer_certificate, row consumption, live-ledger update, or branch-chart authorization.",
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

function countTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count} |`)
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
        `| \`${separator.separator_event}\` | \`${separator.fold_interval}\` | ${separator.row_count} | ${separator.child_proof_grade_refs_complete} | ${separator.accepted_atlas_ref_derivation_bridge_present} | ${separator.separator_aggregate_fields_complete} | ${separator.source_packet_acceptance_rule_present} | ${separator.parent_complement_consumption_ref_present} | ${separator.higher_fold_separator_layer_certificate_present} |`,
    )
    .join("\n");
}

function reportMarkdown(classifier) {
  return `# Higher-Fold Layer Separator-Certificate Assembly Dependency Classifier

Packet: \`${classifier.packet_id}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

This classifier combines the latest accepted-atlas derivation-bridge attempt,
same-packet impulse-bound source-packet acceptance dependency classifier, and
separator-certificate readiness frontier. It separates ready source-side data
from accepted separator-certificate assembly fields.

- ${classifier.summary.rows_with_child_proof_grade_refs_complete}
  / ${classifier.summary.fold_layer_rows} rows have complete proof-grade
  \`alpha_floor\`, \`exit_floor\`, and \`fold_layer_parity_record\` refs;
- ${classifier.summary.rows_with_atlas_source_certificate}
  / ${classifier.summary.fold_layer_rows} rows have atlas source certificates;
- ${classifier.summary.rows_with_accepted_atlas_ref_derivation_bridge}
  / ${classifier.summary.fold_layer_rows} rows have accepted-atlas derivation
  bridges;
- ${classifier.summary.rows_with_separator_aggregate_fields_complete}
  / ${classifier.summary.fold_layer_rows} rows have separator aggregate fields;
- ${classifier.summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets}
  / ${classifier.summary.separator_assembly_dependency_profiles} separator
  profiles have accepted impulse/direct-quadrature source packets;
- ${classifier.summary.rows_with_parent_complement_consumption_ref}
  / ${classifier.summary.fold_layer_rows} rows have
  \`parent_complement_consumption_ref\` fields;
- ${classifier.summary.rows_with_higher_fold_separator_layer_certificate}
  / ${classifier.summary.fold_layer_rows} rows have
  \`higher_fold_separator_layer_certificate\` fields.

The first assembly blocker is
\`${classifier.summary.first_assembly_blocker}\`. The source-packet blocker is
\`${classifier.summary.first_source_packet_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Separator Assembly Dependencies

| Separator | Fold interval | Rows | Child refs | Atlas bridge | Aggregates | Source rule | Parent consumption | Separator cert |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- |
${separatorTable(classifier.separator_assembly_dependency_profiles)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(classifier.summary.rows_by_separator_count)}

## Field Presence

Separator-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${fieldPresenceTable(classifier.summary.separator_field_presence_counts)}

Row-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${fieldPresenceTable(classifier.summary.row_field_presence_counts)}

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
\`higher_fold_layer_atlas_ref\`, accepted
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
    frontier: args.frontier,
    atlasBridge: args.atlasBridge,
    impulseAcceptance: args.impulseAcceptance,
  };
  const inputs = {
    frontier: readJson(paths.frontier),
    atlasBridge: readJson(paths.atlasBridge),
    impulseAcceptance: readJson(paths.impulseAcceptance),
  };
  const classifier = buildClassifier(paths, inputs);
  const outputJson = path.join(args.outDir, OUTPUT_JSON);
  const outputReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJson, classifier, args.pretty);
  writeText(outputReport, reportMarkdown(classifier));
  console.log(JSON.stringify({ status: classifier.status, output_json: outputJson, output_report: outputReport }, null, 2));
}

main();
