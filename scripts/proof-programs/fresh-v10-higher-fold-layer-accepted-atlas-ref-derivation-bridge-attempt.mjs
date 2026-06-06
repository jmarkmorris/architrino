#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ATLAS_SOURCE_CERTIFICATE = `${CERT_DIR}/higher_fold_layer_accepted_atlas_ref_source_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_FRONTIER_CLASSIFIER = `${CERT_DIR}/higher_fold_layer_separator_certificate_readiness_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ATLAS_OBLIGATION = `${CERT_DIR}/higher_fold_layer_accepted_atlas_ref_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_accepted_atlas_ref_derivation_bridge_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_accepted_atlas_ref_derivation_bridge_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const ATLAS_SOURCE_CERTIFICATE_STATUS =
  "higher_fold_layer_accepted_atlas_ref_source_certificate_attempt_fail_closed_atlas_source_certificates_constructed_accepted_refs_absent_no_row_consumption";
const FRONTIER_CLASSIFIER_STATUS =
  "higher_fold_layer_separator_certificate_readiness_frontier_classifier_fail_closed_child_refs_complete_aggregate_present_atlas_impulse_parent_locks_absent_no_row_consumption";
const ATLAS_OBLIGATION_STATUS =
  "higher_fold_layer_accepted_atlas_ref_obligation_classifier_fail_closed_candidate_source_complete_separator_layer_certificate_absent_no_row_consumption";
const PROOF_FIELD_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_proof_field_dependency_classifier_fail_closed_impulse_direct_quadrature_source_packet_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_accepted_atlas_ref_derivation_bridge_attempt_fail_closed_atlas_source_certificates_present_derivation_bridge_absent_no_row_consumption";

const BRIDGE_BLOCKER = "accepted_atlas_ref_source_certificate_to_accepted_field_derivation_bridge_absent";
const ACCEPTED_ATLAS_DERIVATION_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const SOURCE_PACKET_ACCEPTANCE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";
const CHILD_FIELDS = ["alpha_floor", "exit_floor", "fold_layer_parity_record"];
const LOCK_FIELDS = [
  "higher_fold_layer_atlas_ref",
  "alpha_floor",
  "exit_floor",
  "fold_layer_parity_record",
  "same_packet_fold_impulse_or_direct_quadrature_bound",
  "parent_complement_consumption_ref",
  "higher_fold_separator_layer_certificate",
  "accepted_fold_layer_row",
  "row_consumed",
];

function parseArgs(argv) {
  const args = {
    atlasSourceCertificate: DEFAULT_ATLAS_SOURCE_CERTIFICATE,
    frontierClassifier: DEFAULT_FRONTIER_CLASSIFIER,
    atlasObligation: DEFAULT_ATLAS_OBLIGATION,
    proofFieldDependency: DEFAULT_PROOF_FIELD_DEPENDENCY,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--atlas-source-certificate") {
      args.atlasSourceCertificate = argv[++index];
    } else if (arg === "--frontier-classifier") {
      args.frontierClassifier = argv[++index];
    } else if (arg === "--atlas-obligation") {
      args.atlasObligation = argv[++index];
    } else if (arg === "--proof-field-dependency") {
      args.proofFieldDependency = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-accepted-atlas-ref-derivation-bridge-attempt.mjs [options]

Options:
  --atlas-source-certificate PATH  Accepted atlas-ref source-certificate attempt. Defaults to ${DEFAULT_ATLAS_SOURCE_CERTIFICATE}.
  --frontier-classifier PATH       Separator-certificate readiness frontier classifier. Defaults to ${DEFAULT_FRONTIER_CLASSIFIER}.
  --atlas-obligation PATH          Accepted atlas-ref obligation classifier. Defaults to ${DEFAULT_ATLAS_OBLIGATION}.
  --proof-field-dependency PATH    Separator proof-field dependency classifier. Defaults to ${DEFAULT_PROOF_FIELD_DEPENDENCY}.
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

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function rowSortKey(row) {
  return `${String(separatorSortKey(row.separator_event)).padStart(3, "0")}:${row.row_id}`;
}

function sortedObjectByKey(object, compareFn = undefined) {
  return Object.fromEntries(Object.entries(object).sort(([left], [right]) => compareFn?.(left, right) ?? left.localeCompare(right)));
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
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

function falseFieldMap(fields) {
  return Object.fromEntries(fields.map((field) => [field, false]));
}

function lockFieldMap() {
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

function validateInputs(inputs) {
  for (const [name, source] of Object.entries(inputs)) {
    assertPacketId(source, name);
    if (source.preledger_pass !== false || source.updates_live_ledger !== false || source.branch_chart_authorized !== false) {
      throw new Error(`Refusing to use ${name} because it authorizes preledger/live-ledger/branch-chart state.`);
    }
  }
  assertStatus(inputs.atlasSourceCertificate, "atlasSourceCertificate", ATLAS_SOURCE_CERTIFICATE_STATUS);
  assertStatus(inputs.frontierClassifier, "frontierClassifier", FRONTIER_CLASSIFIER_STATUS);
  assertStatus(inputs.atlasObligation, "atlasObligation", ATLAS_OBLIGATION_STATUS);
  assertStatus(inputs.proofFieldDependency, "proofFieldDependency", PROOF_FIELD_DEPENDENCY_STATUS);
  if (inputs.atlasSourceCertificate.summary?.separator_atlas_source_certificates_constructed !== 12) {
    throw new Error("Atlas source-certificate input no longer has 12 separator source certificates.");
  }
  if (inputs.atlasSourceCertificate.summary?.rows_with_accepted_atlas_ref_source_certificate !== 112) {
    throw new Error("Atlas source-certificate input no longer has 112 row source certificates.");
  }
  if (inputs.frontierClassifier.summary?.rows_with_child_proof_grade_refs_complete !== 112) {
    throw new Error("Frontier input no longer has complete child proof-grade refs.");
  }
}

function buildSeparatorAttempts(inputs) {
  const sourceBySeparator = mapBy(
    inputs.atlasSourceCertificate.separator_atlas_source_certificate_attempts,
    (entry) => entry.separator_event,
    "atlas source certificate separator",
  );
  const frontierBySeparator = mapBy(
    inputs.frontierClassifier.separator_frontier_profiles,
    (entry) => entry.separator_event,
    "frontier separator",
  );
  const obligationBySeparator = mapBy(
    inputs.atlasObligation.separator_atlas_ref_obligations,
    (entry) => entry.separator_event,
    "atlas obligation separator",
  );
  const dependencyBySeparator = mapBy(
    inputs.proofFieldDependency.separator_dependency_profiles,
    (entry) => entry.separator_event,
    "proof-field dependency separator",
  );

  return [...inputs.atlasSourceCertificate.separator_atlas_source_certificate_attempts]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((source) => {
      const frontier = requireMapEntry(frontierBySeparator, source.separator_event, "frontier separator");
      const obligation = requireMapEntry(obligationBySeparator, source.separator_event, "atlas obligation separator");
      const dependency = requireMapEntry(dependencyBySeparator, source.separator_event, "proof-field dependency separator");
      const atlasDependency = dependency.proof_field_dependencies?.higher_fold_layer_atlas_ref;
      const bridgeFacts = {
        atlas_source_certificate_present: source.atlas_source_certificate_constructed === true,
        proof_grade_atlas_source_certificate_ref_present:
          typeof source.proof_grade_atlas_source_certificate_ref === "string" &&
          source.proof_grade_atlas_source_certificate_ref.length > 0,
        source_certificate_ref_not_accepted_ref:
          source.proof_grade_atlas_source_certificate_ref !== source.accepted_higher_fold_layer_atlas_ref,
        candidate_source_evidence_complete: source.atlas_source_certificate_facts?.candidate_source_evidence_complete === true,
        proof_field_dependency_atlas_anchor_present: atlasDependency?.candidate_source_anchor_present === true,
        dependency_requests_accepted_atlas_derivation:
          atlasDependency?.first_missing_dependency === ACCEPTED_ATLAS_DERIVATION_BLOCKER,
        frontier_child_refs_complete: frontier.child_proof_grade_refs_complete === true,
        frontier_aggregate_fields_complete: frontier.separator_aggregate_fields_complete === true,
        prior_accepted_atlas_ref_absent: source.accepted_higher_fold_layer_atlas_ref_present === false,
        prior_separator_certificate_absent: frontier.higher_fold_separator_layer_certificate_present === false,
      };
      return {
        separator_event: source.separator_event,
        fold_interval: source.fold_interval,
        atlas_candidate_id: source.atlas_candidate_id,
        row_count: source.row_count,
        row_ids: source.row_ids,
        atlas_source_certificate_ref: source.proof_grade_atlas_source_certificate_ref,
        accepted_atlas_ref_derivation_bridge_facts: bridgeFacts,
        accepted_atlas_ref_derivation_bridge_present: false,
        accepted_atlas_ref_derivation_ref: null,
        accepted_higher_fold_layer_atlas_ref_present: false,
        accepted_higher_fold_layer_atlas_ref: null,
        source_certificate_ref_reused_as_accepted_atlas_ref: false,
        first_bridge_blocker: BRIDGE_BLOCKER,
        first_accepted_atlas_ref_blocker: ACCEPTED_ATLAS_DERIVATION_BLOCKER,
        source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
        parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
        separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
        obligation_first_certificate_blocker: obligation.first_certificate_blocker,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildRowAttempts(inputs, separatorAttempts) {
  const sourceByRow = mapBy(
    inputs.atlasSourceCertificate.row_atlas_source_certificate_attempts,
    (entry) => entry.row_id,
    "atlas source certificate row",
  );
  const frontierByRow = mapBy(inputs.frontierClassifier.row_frontier_profiles, (entry) => entry.row_id, "frontier row");
  const attemptBySeparator = mapBy(separatorAttempts, (entry) => entry.separator_event, "separator bridge attempt");

  return [...inputs.frontierClassifier.row_frontier_profiles]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((frontierRow) => {
      const sourceRow = requireMapEntry(sourceByRow, frontierRow.row_id, "atlas source certificate row");
      const separatorAttempt = requireMapEntry(attemptBySeparator, frontierRow.separator_event, "separator bridge attempt");
      const bridgeFacts = {
        atlas_source_certificate_present: sourceRow.proof_grade_atlas_source_certificate_present === true,
        separator_bridge_source_ready:
          separatorAttempt.accepted_atlas_ref_derivation_bridge_facts.atlas_source_certificate_present === true,
        child_proof_grade_refs_complete: frontierRow.child_proof_grade_refs_complete === true,
        separator_aggregate_fields_complete: frontierRow.separator_aggregate_fields_complete === true,
        prior_accepted_atlas_ref_absent: frontierRow.accepted_higher_fold_layer_atlas_ref_present === false,
      };
      return {
        row_id: frontierRow.row_id,
        ledger: frontierRow.ledger,
        status: frontierRow.status,
        failure_code: frontierRow.failure_code,
        separator_event: frontierRow.separator_event,
        fold_interval: frontierRow.fold_interval,
        atlas_source_certificate_ref: sourceRow.proof_grade_atlas_source_certificate_ref,
        accepted_atlas_ref_derivation_bridge_facts: bridgeFacts,
        accepted_atlas_ref_derivation_bridge_present: false,
        accepted_atlas_ref_derivation_ref: null,
        accepted_higher_fold_layer_atlas_ref_present: false,
        accepted_higher_fold_layer_atlas_ref: null,
        source_certificate_ref_reused_as_accepted_atlas_ref: false,
        child_proof_grade_refs_constructed: {
          alpha_floor: true,
          exit_floor: true,
          fold_layer_parity_record: true,
        },
        row_lock_fields_present_after_atlas_bridge_attempt: lockFieldMap(),
        first_bridge_blocker: BRIDGE_BLOCKER,
        first_accepted_atlas_ref_blocker: ACCEPTED_ATLAS_DERIVATION_BLOCKER,
        source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
        parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
        separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
      };
    });
}

function presenceCounts(rows, fields, getter) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => getter(row)[field] === true);
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function buildAttempt(paths, inputs) {
  validateInputs(inputs);
  const separatorAttempts = buildSeparatorAttempts(inputs);
  const rowAttempts = buildRowAttempts(inputs, separatorAttempts);
  const rowsBySeparatorCount = sortedObjectByKey(countBy(rowAttempts, (row) => row.separator_event), (left, right) => {
    return separatorSortKey(left) - separatorSortKey(right);
  });
  const childPresence = presenceCounts(rowAttempts, CHILD_FIELDS, (row) => row.child_proof_grade_refs_constructed);
  const lockPresence = presenceCounts(rowAttempts, LOCK_FIELDS, (row) => row.row_lock_fields_present_after_atlas_bridge_attempt);

  const summary = {
    separator_atlas_ref_derivation_bridge_attempts: separatorAttempts.length,
    fold_layer_rows: rowAttempts.length,
    rows_by_separator_count: rowsBySeparatorCount,
    separator_atlas_source_certificates_present: countTrue(
      separatorAttempts,
      (entry) => entry.accepted_atlas_ref_derivation_bridge_facts.atlas_source_certificate_present,
    ),
    rows_with_atlas_source_certificate: countTrue(
      rowAttempts,
      (row) => row.accepted_atlas_ref_derivation_bridge_facts.atlas_source_certificate_present,
    ),
    separator_atlas_ref_derivation_bridges_present: 0,
    rows_with_accepted_atlas_ref_derivation_bridge: 0,
    rows_with_accepted_atlas_ref_derivation_ref: 0,
    rows_with_accepted_higher_fold_layer_atlas_ref: 0,
    rows_with_source_certificate_ref_reused_as_accepted_atlas_ref: 0,
    rows_with_child_proof_grade_refs_complete: countTrue(
      rowAttempts,
      (row) => CHILD_FIELDS.every((field) => row.child_proof_grade_refs_constructed[field] === true),
    ),
    child_proof_grade_ref_presence_counts_after_atlas_bridge_attempt: childPresence,
    row_lock_field_presence_counts_after_atlas_bridge_attempt: lockPresence,
    rows_with_same_packet_fold_impulse_or_direct_quadrature_bound: 0,
    rows_with_parent_complement_consumption_ref: 0,
    rows_with_higher_fold_separator_layer_certificate: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_bridge_blocker: BRIDGE_BLOCKER,
    first_accepted_atlas_ref_blocker: ACCEPTED_ATLAS_DERIVATION_BLOCKER,
    source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
  };

  const invariant =
    summary.separator_atlas_ref_derivation_bridge_attempts === 12 &&
    summary.fold_layer_rows === 112 &&
    summary.separator_atlas_source_certificates_present === 12 &&
    summary.rows_with_atlas_source_certificate === 112 &&
    summary.separator_atlas_ref_derivation_bridges_present === 0 &&
    summary.rows_with_accepted_atlas_ref_derivation_bridge === 0 &&
    summary.rows_with_accepted_higher_fold_layer_atlas_ref === 0 &&
    summary.rows_with_child_proof_grade_refs_complete === 112 &&
    summary.rows_with_higher_fold_separator_layer_certificate === 0 &&
    summary.row_consumption_count === 0;
  if (!invariant) {
    throw new Error("Fail-closed accepted-atlas bridge invariant failed.");
  }

  return {
    schema: "breather-higher-fold-layer-accepted-atlas-ref-derivation-bridge-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only accepted higher_fold_layer_atlas_ref derivation-bridge attempt that separates proof-grade atlas source certificates from absent accepted-field derivation bridges; constructs no accepted atlas refs, separator certificates, row consumption, preledger pass, live-ledger update, or branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_accepted_atlas_ref_source_certificate_attempt: artifactRecord(paths.atlasSourceCertificate),
      higher_fold_layer_separator_certificate_readiness_frontier_classifier: artifactRecord(paths.frontierClassifier),
      higher_fold_layer_accepted_atlas_ref_obligation_classifier: artifactRecord(paths.atlasObligation),
      higher_fold_layer_separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
    },
    bridge_rule:
      "A proof-grade atlas source certificate is not an accepted higher_fold_layer_atlas_ref. This attempt requires an explicit accepted-atlas-ref derivation bridge before any source certificate can supply an accepted higher_fold_layer_atlas_ref field.",
    separator_atlas_ref_derivation_bridge_attempts: separatorAttempts,
    row_atlas_ref_derivation_bridge_attempts: rowAttempts,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "accepted-atlas-ref derivation bridge from proof_source_certificate_ref to accepted higher_fold_layer_atlas_ref, or a proof-grade reason that the separator certificate itself carries that derivation",
      continuation_class:
        "mechanical classifier/handoff continuation; accepted atlas-ref promotion remains blocked without a derivation bridge and must not be treated as row-consumption authority",
      fail_closed_stop_conditions: [
        "Do not treat proof_source_certificate_ref as accepted higher_fold_layer_atlas_ref.",
        "Do not construct higher_fold_separator_layer_certificate from atlas source certificates alone.",
        "Do not construct parent_complement_consumption_ref before separator-certificate authorization.",
        "Do not consume fold-layer rows, set preledger_pass, update the live ledger, or authorize a branch chart.",
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
      "Priority-only. This artifact proves only that the atlas source-certificate layer is ready and that the accepted-atlas derivation bridge is absent. It proves no accepted higher_fold_layer_atlas_ref, same_packet_fold_impulse_or_direct_quadrature_bound, parent_complement_consumption_ref, higher_fold_separator_layer_certificate, row consumption, live-ledger update, or branch-chart authorization.",
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

function fieldTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(entries) {
  return entries
    .map(
      (entry) =>
        `| \`${entry.separator_event}\` | \`${entry.fold_interval}\` | ${entry.row_count} | ${entry.accepted_atlas_ref_derivation_bridge_facts.atlas_source_certificate_present} | ${entry.accepted_atlas_ref_derivation_bridge_present} | ${entry.accepted_higher_fold_layer_atlas_ref_present} | ${entry.source_certificate_ref_reused_as_accepted_atlas_ref} | \`${entry.first_bridge_blocker}\` |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | ${row.accepted_atlas_ref_derivation_bridge_facts.atlas_source_certificate_present} | ${row.accepted_atlas_ref_derivation_bridge_present} | ${row.accepted_higher_fold_layer_atlas_ref_present} | ${row.row_lock_fields_present_after_atlas_bridge_attempt.higher_fold_separator_layer_certificate} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Accepted Atlas-Ref Derivation-Bridge Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

This attempt tests the boundary between proof-grade atlas source certificates
and accepted \`higher_fold_layer_atlas_ref\` fields. The source side is ready,
but no accepted-field derivation bridge is present.

- ${attempt.summary.separator_atlas_source_certificates_present}
  / ${attempt.summary.separator_atlas_ref_derivation_bridge_attempts}
  separator profiles have proof-grade atlas source certificates;
- ${attempt.summary.rows_with_atlas_source_certificate}
  / ${attempt.summary.fold_layer_rows} row associations have atlas source
  certificates;
- ${attempt.summary.rows_with_accepted_atlas_ref_derivation_bridge}
  / ${attempt.summary.fold_layer_rows} row associations have accepted-atlas
  derivation bridges;
- ${attempt.summary.rows_with_accepted_higher_fold_layer_atlas_ref}
  / ${attempt.summary.fold_layer_rows} row associations have accepted
  \`higher_fold_layer_atlas_ref\` fields.

It consumes 0 rows and authorizes no branch chart.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Separator Derivation-Bridge Attempts

| Separator | Fold interval | Rows | Source certificate | Derivation bridge | Accepted atlas ref | Source cert reused | First bridge blocker |
| --- | --- | ---: | --- | --- | --- | --- | --- |
${separatorTable(attempt.separator_atlas_ref_derivation_bridge_attempts)}

## Child Proof-Grade Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldTable(attempt.summary.child_proof_grade_ref_presence_counts_after_atlas_bridge_attempt)}

## Row Lock Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldTable(attempt.summary.row_lock_field_presence_counts_after_atlas_bridge_attempt)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Row Derivation-Bridge Attempts

| Row | Separator | Source certificate | Derivation bridge | Accepted atlas ref | Separator cert | Row consumed |
| --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_atlas_ref_derivation_bridge_attempts)}

## Certificate-Side Handoff

Next artifact target: \`${attempt.next_certificate_handoff.artifact_target}\`.

Continuation class: ${attempt.next_certificate_handoff.continuation_class}.

Fail-closed stop conditions:

${attempt.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is a priority-only accepted-atlas-ref derivation-bridge attempt.
It proves no accepted \`higher_fold_layer_atlas_ref\`,
\`same_packet_fold_impulse_or_direct_quadrature_bound\`,
\`parent_complement_consumption_ref\`,
\`higher_fold_separator_layer_certificate\`, row consumption, live-ledger
update, or branch-chart authorization.
`;
  writeText(filePath, report);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    atlasSourceCertificate: args.atlasSourceCertificate,
    frontierClassifier: args.frontierClassifier,
    atlasObligation: args.atlasObligation,
    proofFieldDependency: args.proofFieldDependency,
  };
  const inputs = {
    atlasSourceCertificate: readJson(paths.atlasSourceCertificate),
    frontierClassifier: readJson(paths.frontierClassifier),
    atlasObligation: readJson(paths.atlasObligation),
    proofFieldDependency: readJson(paths.proofFieldDependency),
  };
  const attempt = buildAttempt(paths, inputs);
  const outputJson = path.join(args.outDir, OUTPUT_JSON);
  const outputReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJson, attempt, args.pretty);
  writeReport(outputReport, attempt);
  console.log(`wrote ${outputJson}`);
  console.log(`wrote ${outputReport}`);
}

main();
