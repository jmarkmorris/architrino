#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_ROW_FAMILY = `${CERT_DIR}/preledger_row_family_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_FOLD_LAYER_BURDEN = `${CERT_DIR}/fold_layer_burden.${PACKET_ID}.json`;
const DEFAULT_FOLD_LAYER_REPORT = `${CERT_DIR}/fold_layer_burden_report.${PACKET_ID}.md`;
const DEFAULT_PHI_CYC = `${CERT_DIR}/phi_cyc.${PACKET_ID}.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_INPUT_SCREEN = `${CERT_DIR}/causal_preledger_input_screen.${PACKET_ID}.json`;
const DEFAULT_ROOT_TUBE = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_certificate.v0.json`;
const DEFAULT_ROOT_TUBE_INTERVAL = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`;
const DEFAULT_BACKEND = `${CERT_DIR}/preledger_interval_backend_certificate.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_field_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_field_readiness_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const FOLD_LAYER_FAILURE = "trig_range_overlap_touches_fold_layer_candidate";
const SAME_PACKET_FIELD_ORDER = [
  "higher_fold_layer_atlas_ref",
  "alpha_floor",
  "exit_floor",
  "same_packet_fold_impulse_or_direct_quadrature_bound",
  "fold_layer_parity_record",
  "parent_complement_consumption_ref",
];

const GUARD_FIELD_ORDER = [
  "row_may_become_fold_layer",
  "row_must_not_become_simple_root",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

function parseArgs(argv) {
  const args = {
    ledger: DEFAULT_LEDGER,
    rowFamily: DEFAULT_ROW_FAMILY,
    foldLayerBurden: DEFAULT_FOLD_LAYER_BURDEN,
    foldLayerReport: DEFAULT_FOLD_LAYER_REPORT,
    phiCyc: DEFAULT_PHI_CYC,
    mesh: DEFAULT_MESH,
    inputScreen: DEFAULT_INPUT_SCREEN,
    rootTube: DEFAULT_ROOT_TUBE,
    rootTubeInterval: DEFAULT_ROOT_TUBE_INTERVAL,
    backend: DEFAULT_BACKEND,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--ledger") {
      args.ledger = argv[++index];
    } else if (arg === "--row-family") {
      args.rowFamily = argv[++index];
    } else if (arg === "--fold-layer-burden") {
      args.foldLayerBurden = argv[++index];
    } else if (arg === "--fold-layer-report") {
      args.foldLayerReport = argv[++index];
    } else if (arg === "--phi-cyc") {
      args.phiCyc = argv[++index];
    } else if (arg === "--mesh") {
      args.mesh = argv[++index];
    } else if (arg === "--input-screen") {
      args.inputScreen = argv[++index];
    } else if (arg === "--root-tube") {
      args.rootTube = argv[++index];
    } else if (arg === "--root-tube-interval") {
      args.rootTubeInterval = argv[++index];
    } else if (arg === "--backend") {
      args.backend = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-field-readiness-classifier.mjs [options]

Options:
  --ledger PATH              Higher-fold proof-interval v6 ledger. Defaults to ${DEFAULT_LEDGER}.
  --row-family PATH          Row-family classifier. Defaults to ${DEFAULT_ROW_FAMILY}.
  --fold-layer-burden PATH   Fold-layer burden atlas. Defaults to ${DEFAULT_FOLD_LAYER_BURDEN}.
  --fold-layer-report PATH   Fold-layer burden report. Defaults to ${DEFAULT_FOLD_LAYER_REPORT}.
  --phi-cyc PATH             Same-packet phi_cyc artifact. Defaults to ${DEFAULT_PHI_CYC}.
  --mesh PATH                Same-packet mesh artifact. Defaults to ${DEFAULT_MESH}.
  --input-screen PATH        Same-packet input screen. Defaults to ${DEFAULT_INPUT_SCREEN}.
  --root-tube PATH           Higher-fold root-tube audit. Defaults to ${DEFAULT_ROOT_TUBE}.
  --root-tube-interval PATH  Root-tube interval certificate. Defaults to ${DEFAULT_ROOT_TUBE_INTERVAL}.
  --backend PATH             Proof-interval backend certificate. Defaults to ${DEFAULT_BACKEND}.
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

function assertPacketId(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
}

function cleanNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  if (Math.abs(value) < 1e-14) {
    return 0;
  }
  return Number(value.toPrecision(15));
}

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function rowSortKey(row) {
  const separator = typeof row === "string" ? "" : row.separator_event;
  const rowId = typeof row === "string" ? row : row.row_id;
  return `${String(separatorSortKey(separator)).padStart(3, "0")}:${rowId}`;
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

function firstMissing(fields, order) {
  return order.find((field) => fields[field] !== true) ?? null;
}

function missingFields(fields, order) {
  return order.filter((field) => fields[field] !== true);
}

function sortedObjectByKey(object, compareFn = undefined) {
  return Object.fromEntries(Object.entries(object).sort(([left], [right]) => compareFn?.(left, right) ?? left.localeCompare(right)));
}

function fieldCounts(rows, fieldName) {
  const present = countTrue(rows, (row) => row.required_same_packet_fields_present[fieldName]);
  return {
    present,
    missing: rows.length - present,
  };
}

function guardCounts(rows, fieldName) {
  const present = countTrue(rows, (row) => row.guard_fields_present[fieldName]);
  return {
    present,
    missing: rows.length - present,
  };
}

function buildRows(foldLayerBurden) {
  return [...(foldLayerBurden.rows ?? [])]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      if (row.failure_code !== FOLD_LAYER_FAILURE) {
        throw new Error(`Unexpected fold-layer failure code for ${row.row_id}: ${row.failure_code}`);
      }
      const missingSamePacketFields = row.missing_same_packet_fields ?? [];
      const requiredSamePacketFieldsPresent = Object.fromEntries(
        SAME_PACKET_FIELD_ORDER.map((field) => [field, !missingSamePacketFields.includes(field)]),
      );
      const guardFieldsPresent = {
        row_may_become_fold_layer: row.row_may_become === "fold_layer",
        row_must_not_become_simple_root: row.row_must_not_become === "simple_root",
        row_consumption_authorized: false,
        branch_chart_authorized: false,
      };
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        separator_event: row.separator_event,
        fold_interval: row.fold_interval,
        receiver_interval: row.receiver_interval,
        source_interval: row.source_interval,
        receiver_type: row.receiver_type,
        source_type: row.source_type,
        interval_type_pair: `${row.receiver_type} -> ${row.source_type}`,
        receiver_theta_range: row.receiver_theta_range,
        source_theta_range: row.source_theta_range,
        fold_theta_range: row.fold_theta_range,
        fold_time_range: row.fold_time_range,
        diagnostic_overlap_range: row.diagnostic_overlap_range,
        diagnostic_overlap_width: row.diagnostic_overlap_width,
        required_same_packet_fields_present: requiredSamePacketFieldsPresent,
        missing_same_packet_fields: missingFields(requiredSamePacketFieldsPresent, SAME_PACKET_FIELD_ORDER),
        guard_fields_present: guardFieldsPresent,
        missing_guard_fields: missingFields(guardFieldsPresent, GUARD_FIELD_ORDER),
        first_missing_same_packet_field: firstMissing(requiredSamePacketFieldsPresent, SAME_PACKET_FIELD_ORDER),
        row_may_become: "fold_layer",
        row_must_not_become: "simple_root",
        accepted_fold_layer_row: false,
        row_consumed: false,
        branch_chart_authorized: false,
      };
    });
}

function validateRowSets(rows, ledger, rowFamily, foldLayerBurden) {
  const ledgerFoldRows = (ledger.rows ?? []).filter((row) => row.failure_code === FOLD_LAYER_FAILURE);
  const family = (rowFamily.row_families ?? []).find((entry) => entry.family_id === "higher_fold_layer_certificate");
  if (!family) {
    throw new Error("Missing higher_fold_layer_certificate family in row-family classifier.");
  }
  if (family.row_count !== rows.length) {
    throw new Error(`Row-family fold-layer count mismatch: ${family.row_count} vs ${rows.length}.`);
  }
  if (foldLayerBurden.summary?.fold_layer_rows !== rows.length) {
    throw new Error(`Fold-layer burden count mismatch: ${foldLayerBurden.summary?.fold_layer_rows} vs ${rows.length}.`);
  }
  if (ledgerFoldRows.length !== rows.length) {
    throw new Error(`Ledger fold-layer count mismatch: ${ledgerFoldRows.length} vs ${rows.length}.`);
  }
}

function buildClassifier(paths, inputs) {
  assertPacketId(inputs.ledger, "ledger");
  assertPacketId(inputs.rowFamily, "rowFamily");
  assertPacketId(inputs.foldLayerBurden, "foldLayerBurden");
  assertPacketId(inputs.phiCyc, "phiCyc");
  assertPacketId(inputs.mesh, "mesh");
  assertPacketId(inputs.inputScreen, "inputScreen");
  assertPacketId(inputs.rootTube, "rootTube");
  assertPacketId(inputs.rootTubeInterval, "rootTubeInterval");
  assertPacketId(inputs.backend, "backend");
  if (inputs.ledger.branch_chart_authorized !== false) {
    throw new Error("Refusing to classify a branch-authorized ledger.");
  }

  const rows = buildRows(inputs.foldLayerBurden);
  validateRowSets(rows, inputs.ledger, inputs.rowFamily, inputs.foldLayerBurden);

  const separatorCounts = sortedObjectByKey(countBy(rows, (row) => row.separator_event), (left, right) => {
    return separatorSortKey(left) - separatorSortKey(right);
  });
  const field_presence_counts = Object.fromEntries(
    SAME_PACKET_FIELD_ORDER.map((field) => [field, fieldCounts(rows, field)]),
  );
  const guard_field_counts = Object.fromEntries(GUARD_FIELD_ORDER.map((field) => [field, guardCounts(rows, field)]));
  const overlapWidths = rows.map((row) => row.diagnostic_overlap_width).filter((value) => Number.isFinite(value));

  const summary = {
    fold_layer_rows: rows.length,
    split_required_fold_layer_rows: rows.filter((row) => row.status === "split_required").length,
    separator_count: Object.keys(separatorCounts).length,
    rows_by_separator_count: separatorCounts,
    ledger_counts: sortedObjectByKey(countBy(rows, (row) => row.ledger)),
    interval_type_counts: sortedObjectByKey(countBy(rows, (row) => row.interval_type_pair)),
    same_packet_field_presence_counts: field_presence_counts,
    guard_field_counts,
    same_packet_fields_complete_rows: rows.filter((row) => row.missing_same_packet_fields.length === 0).length,
    rows_missing_higher_fold_layer_atlas_ref: rows.filter(
      (row) => row.required_same_packet_fields_present.higher_fold_layer_atlas_ref !== true,
    ).length,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    branch_chart_authorized_rows: 0,
    preledger_pass_rows: 0,
    min_diagnostic_overlap_width: overlapWidths.length ? cleanNumber(Math.min(...overlapWidths)) : null,
    max_diagnostic_overlap_width: overlapWidths.length ? cleanNumber(Math.max(...overlapWidths)) : null,
    first_missing_same_packet_field_counts: countBy(rows, (row) => row.first_missing_same_packet_field),
  };

  return {
    schema: "breather-higher-fold-layer-same-packet-field-readiness-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: "higher_fold_layer_same_packet_field_readiness_classifier_fail_closed_no_row_consumption",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only same-packet field readiness classifier for the 112 higher-fold fold-layer rows; no accepted fold-layer rows, no row consumption, no live-ledger update",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_proof_interval_v6_ledger: artifactRecord(paths.ledger),
      preledger_row_family_classifier: artifactRecord(paths.rowFamily),
      fold_layer_burden_atlas: artifactRecord(paths.foldLayerBurden),
      fold_layer_burden_report: artifactRecord(paths.foldLayerReport),
      phi_cyc: artifactRecord(paths.phiCyc),
      mesh: artifactRecord(paths.mesh),
      causal_preledger_input_screen: artifactRecord(paths.inputScreen),
      higher_fold_root_tube_audit: artifactRecord(paths.rootTube),
      higher_fold_root_tube_interval_certificate: artifactRecord(paths.rootTubeInterval),
      proof_interval_backend_certificate: artifactRecord(paths.backend),
    },
    packet_identity_screen: {
      phi_cyc_packet_id: inputs.phiCyc.packet_id,
      mesh_packet_id: inputs.mesh.packet_id,
      input_screen_packet_id: inputs.inputScreen.packet_id,
      root_tube_interval_status: inputs.rootTubeInterval.status,
      root_tube_count: inputs.rootTubeInterval.summary?.root_tube_count ?? null,
      all_root_tubes_certified_one_root: inputs.rootTubeInterval.summary?.all_root_tubes_certified_one_root === true,
      all_complements_certified_no_extra_root:
        inputs.rootTubeInterval.summary?.all_complements_certified_no_extra_root === true,
      note:
        "These packet-identity artifacts are same-packet source artifacts, but they are not fold-layer atlas refs, alpha/exit floors, parity records, fold impulse/direct quadrature bounds, or parent-complement consumption refs.",
    },
    classifier_rule:
      "A higher-fold row may become fold_layer only after every required same-packet field is present and the guard fields preserve row_may_become=fold_layer, row_must_not_become=simple_root, no row consumption, and no branch-chart authorization. This classifier records readiness only.",
    required_same_packet_fields: SAME_PACKET_FIELD_ORDER,
    guard_fields: GUARD_FIELD_ORDER,
    higher_fold_layer_rows: rows,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "higher_fold_layer_atlas_ref / alpha_floor / exit_floor / fold_layer_parity_record / same_packet_fold_impulse_or_direct_quadrature_bound / parent_complement_consumption_ref",
      continuation_class:
        "mechanical fold-layer certificate; construct same-packet separator-layer fields for Sigma_hf_01 through Sigma_hf_12 before any fold-layer row can be accepted",
      fail_closed_stop_conditions: [
        "Do not consume fold-layer rows from the burden atlas alone.",
        "Do not rewrite fold-layer candidate rows as simple-root rows.",
        "Do not treat the root-tube interval certificate as a fold-layer atlas ref, alpha floor, exit floor, parity record, fold impulse bound, direct quadrature bound, or parent-complement consumption ref.",
        "Do not set preledger_pass, updates_live_ledger, row_consumed, or branch_chart_authorized from this classifier.",
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
      "Priority-only. This classifier proves no same-packet fold-layer acceptance field, no row consumption, no live-ledger update, and no branch-chart authorization.",
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

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.ledger}\` | \`${row.receiver_interval}\` | \`${row.source_interval}\` | \`${row.interval_type_pair}\` | ${row.diagnostic_overlap_width} | \`${row.first_missing_same_packet_field}\` | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, classifier) {
  const report = `# Higher-Fold Layer Same-Packet Field Readiness Classifier

Packet: \`${PACKET_ID}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

This classifier isolates the 112 proof-interval v6 higher-fold fold-layer rows
over 12 separator layers. The row set is mechanical: it is the
\`${FOLD_LAYER_FAILURE}\` family already recorded by the fold-layer burden atlas
and the row-family classifier.

The result is fail-closed. The same-packet packet-identity artifacts are
present, and the root-tube interval certificate remains available as source
evidence, but the row-acceptance fields are absent: 0 / 112 rows have a
\`higher_fold_layer_atlas_ref\`, \`alpha_floor\`, \`exit_floor\`,
\`same_packet_fold_impulse_or_direct_quadrature_bound\`,
\`fold_layer_parity_record\`, or \`parent_complement_consumption_ref\`.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Separator Counts

| Separator | Rows |
| --- | ---: |
${countTable(classifier.summary.rows_by_separator_count)}

## Field Readiness

| Same-packet field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldTable(classifier.summary.same_packet_field_presence_counts)}

## Guard Fields

| Guard field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldTable(classifier.summary.guard_field_counts)}

## Interval-Type Counts

| Interval-type pair | Rows |
| --- | ---: |
${countTable(classifier.summary.interval_type_counts)}

## Row Classifier

| Row | Separator | Ledger | Receiver | Source | Interval-type pair | Diagnostic overlap width | First missing same-packet field | Row consumed |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
${rowTable(classifier.higher_fold_layer_rows)}

## Certificate-Side Handoff

Next artifact target: \`${classifier.next_certificate_handoff.artifact_target}\`.

Continuation class: ${classifier.next_certificate_handoff.continuation_class}.

Fail-closed stop conditions:

${classifier.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`branch_chart_authorized\`: false
- row consumption authorized: false

This artifact is a priority-only readiness classifier. It proves no same-packet
fold-layer acceptance field, no row consumption, no live-ledger update, and no
branch-chart authorization.
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
    ledger: args.ledger,
    rowFamily: args.rowFamily,
    foldLayerBurden: args.foldLayerBurden,
    foldLayerReport: args.foldLayerReport,
    phiCyc: args.phiCyc,
    mesh: args.mesh,
    inputScreen: args.inputScreen,
    rootTube: args.rootTube,
    rootTubeInterval: args.rootTubeInterval,
    backend: args.backend,
  };
  const inputs = {
    ledger: readJson(paths.ledger),
    rowFamily: readJson(paths.rowFamily),
    foldLayerBurden: readJson(paths.foldLayerBurden),
    phiCyc: readJson(paths.phiCyc),
    mesh: readJson(paths.mesh),
    inputScreen: readJson(paths.inputScreen),
    rootTube: readJson(paths.rootTube),
    rootTubeInterval: readJson(paths.rootTubeInterval),
    backend: readJson(paths.backend),
  };
  const classifier = buildClassifier(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, classifier, args.pretty);
  writeReport(outReport, classifier);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
