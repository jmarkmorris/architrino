#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_ROW_FAMILY = `${CERT_DIR}/preledger_row_family_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROOT_TUBE_AUDIT = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_certificate.v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `periodic_endpoint_complement_ownership_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `periodic_endpoint_complement_ownership_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const PERIODIC_ENDPOINT_CODE = "trig_range_overlap_periodic_seam_endpoint_ownership_required";
const PERIODIC_SOURCE_LIFT_REASON = "periodic_source_lift_requires_endpoint_or_complement_ownership";

const REQUIRED_FIELDS = [
  "periodic_endpoint_complement_row_identified",
  "periodic_source_lift_applied",
  "row_specific_trig_ranges_overlap_or_touch",
  "periodic_source_lift_requires_endpoint_or_complement_ownership",
  "periodic_source_lift_consistency_proven",
  "periodic_endpoint_ownership_certificate_present",
  "periodic_complement_closure_certificate_present",
  "endpoint_no_double_counting_certificate_present",
  "periodic_branch_reuse_exclusion_present",
  "periodic_row_consumption_authorized",
];

function parseArgs(argv) {
  const args = {
    ledger: DEFAULT_LEDGER,
    rowFamily: DEFAULT_ROW_FAMILY,
    rootTubeAudit: DEFAULT_ROOT_TUBE_AUDIT,
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
    } else if (arg === "--root-tube-audit") {
      args.rootTubeAudit = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-periodic-endpoint-complement-ownership-classifier.mjs [options]

Options:
  --ledger PATH           Higher-fold proof-interval v6 ledger. Defaults to ${DEFAULT_LEDGER}.
  --row-family PATH       Row-family classifier. Defaults to ${DEFAULT_ROW_FAMILY}.
  --root-tube-audit PATH  Higher-fold root-tube audit. Defaults to ${DEFAULT_ROOT_TUBE_AUDIT}.
  --out-dir PATH          Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                Pretty-print JSON artifact.
  --help                  Show this help.`);
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

function numeric(value) {
  const result = Number(value);
  if (!Number.isFinite(result)) {
    return null;
  }
  return result;
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

function overlapRange(leftRange, rightRange) {
  const lo = Math.max(numeric(leftRange?.[0]), numeric(rightRange?.[0]));
  const hi = Math.min(numeric(leftRange?.[1]), numeric(rightRange?.[1]));
  if (!Number.isFinite(lo) || !Number.isFinite(hi) || hi < lo) {
    return null;
  }
  return [cleanNumber(lo), cleanNumber(hi)];
}

function rowSortKey(row) {
  const rowId = typeof row === "string" ? row : row.row_id;
  const match = rowId.match(/^R_([uw])_([AF]\d+)_([AF]\d+)$/);
  if (!match) {
    return rowId;
  }
  const [, ledger, receiver, source] = match;
  return `${source}:${receiver}:${ledger}`;
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function uniqueSorted(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
}

function firstMissing(fields) {
  return REQUIRED_FIELDS.find((field) => fields[field] !== true) ?? null;
}

function buildRows(ledger) {
  const intervalById = new Map((ledger.intervals ?? []).map((interval) => [interval.interval_id, interval]));
  return (ledger.rows ?? [])
    .filter((row) => row.failure_code === PERIODIC_ENDPOINT_CODE)
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      const receiverInterval = intervalById.get(row.receiver_interval);
      const sourceInterval = intervalById.get(row.source_interval);
      if (!receiverInterval || !sourceInterval) {
        throw new Error(`Missing interval metadata for ${row.row_id}`);
      }
      const overlap = overlapRange(row.receiver_range, row.source_range);
      const requiredFieldsPresent = {
        periodic_endpoint_complement_row_identified: true,
        periodic_source_lift_applied: row.source_lift_periods === -1,
        row_specific_trig_ranges_overlap_or_touch: row.failure_reasons?.includes("row_specific_trig_ranges_overlap_or_touch") === true,
        periodic_source_lift_requires_endpoint_or_complement_ownership:
          row.failure_reasons?.includes(PERIODIC_SOURCE_LIFT_REASON) === true,
        periodic_source_lift_consistency_proven: false,
        periodic_endpoint_ownership_certificate_present: false,
        periodic_complement_closure_certificate_present: false,
        endpoint_no_double_counting_certificate_present: false,
        periodic_branch_reuse_exclusion_present: false,
        periodic_row_consumption_authorized: false,
      };
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        receiver_interval: row.receiver_interval,
        source_interval: row.source_interval,
        receiver_interval_type: receiverInterval.type,
        source_interval_type: sourceInterval.type,
        receiver_velocity_class: receiverInterval.velocity_class,
        source_velocity_class: sourceInterval.velocity_class,
        source_lift_periods: row.source_lift_periods,
        receiver_theta_range: row.receiver_theta_range,
        source_theta_range: row.source_theta_range,
        receiver_time_range_q: row.receiver_time_range_q,
        source_time_range_q: row.source_time_range_q,
        receiver_range: row.receiver_range,
        source_range: row.source_range,
        diagnostic_overlap_range: overlap,
        diagnostic_overlap_width: overlap ? cleanNumber(overlap[1] - overlap[0]) : 0,
        receiver_monotone_floor: row.receiver_monotone_floor,
        range_gap_display: row.range_gap_display,
        failure_code: row.failure_code,
        failure_reasons: row.failure_reasons ?? [],
        required_fields_present: requiredFieldsPresent,
        first_missing_field: firstMissing(requiredFieldsPresent),
        row_consumed: false,
        branch_chart_authorized: false,
        obstruction:
          "The row-specific trigonometric ranges overlap or touch across the periodic seam, and the lifted source interval requires periodic endpoint/complement ownership before the row can be consumed.",
      };
    });
}

function buildClassifier(paths, inputs) {
  assertPacketId(inputs.ledger, "ledger");
  assertPacketId(inputs.rowFamily, "rowFamily");
  if (inputs.rootTubeAudit.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected rootTubeAudit packet id: ${inputs.rootTubeAudit.packet_id}`);
  }

  const rowFamily = inputs.rowFamily.row_families?.find(
    (family) => family.family_id === "periodic_endpoint_complement_ownership",
  );
  if (!rowFamily) {
    throw new Error("Missing periodic endpoint/complement family in row-family classifier.");
  }

  const rows = buildRows(inputs.ledger);
  const rowIds = rows.map((row) => row.row_id);
  const rowFamilyIds = [...(rowFamily.row_ids ?? [])].sort(rowSortKey);
  if (JSON.stringify(rowIds) !== JSON.stringify(rowFamilyIds)) {
    throw new Error("Periodic row set does not match row-family classifier.");
  }

  const overlapWidths = rows.map((row) => row.diagnostic_overlap_width).filter((value) => value !== null);
  const summary = {
    periodic_endpoint_complement_rows: rows.length,
    row_family_rows: rowFamily.row_count,
    source_lift_minus_one_rows: rows.filter((row) => row.source_lift_periods === -1).length,
    source_intervals: uniqueSorted(rows.map((row) => row.source_interval)),
    receiver_intervals: uniqueSorted(rows.map((row) => row.receiver_interval)),
    ledger_counts: countBy(rows, (row) => row.ledger),
    receiver_velocity_class_counts: countBy(rows, (row) => row.receiver_velocity_class),
    source_velocity_class_counts: countBy(rows, (row) => row.source_velocity_class),
    range_overlap_or_touch_rows: rows.filter((row) =>
      row.failure_reasons.includes("row_specific_trig_ranges_overlap_or_touch"),
    ).length,
    periodic_source_lift_requires_endpoint_or_complement_ownership_rows: rows.filter((row) =>
      row.failure_reasons.includes(PERIODIC_SOURCE_LIFT_REASON),
    ).length,
    periodic_source_lift_consistency_proven_rows: 0,
    periodic_endpoint_ownership_certificate_rows: 0,
    periodic_complement_closure_certificate_rows: 0,
    endpoint_no_double_counting_certificate_rows: 0,
    periodic_branch_reuse_exclusion_rows: 0,
    rows_unblocked: 0,
    row_consumption_count: 0,
    branch_chart_authorized_rows: 0,
    min_diagnostic_overlap_width: overlapWidths.length ? Math.min(...overlapWidths) : null,
    max_diagnostic_overlap_width: overlapWidths.length ? Math.max(...overlapWidths) : null,
    first_missing_field_counts: countBy(rows, (row) => row.first_missing_field),
  };

  return {
    schema: "breather-higher-fold-periodic-endpoint-complement-ownership-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status:
      "periodic_endpoint_complement_ownership_classifier_fail_closed_source_lift_endpoint_ownership_absent_no_row_consumption",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only row classifier for the 8 periodic endpoint/complement rows; no endpoint ownership proof, no complement closure, no row consumption",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_proof_interval_v6_ledger: artifactRecord(paths.ledger),
      preledger_row_family_classifier: artifactRecord(paths.rowFamily),
      higher_fold_root_tube_audit: artifactRecord(paths.rootTubeAudit),
    },
    root_tube_periodic_endpoint_policy:
      inputs.rootTubeAudit.summary?.periodic_endpoint_policy ??
      "The root-count audit supplies 12 interior higher-fold root tubes, but no periodic endpoint/complement ownership certificate is imported by this classifier.",
    classifier_rule:
      "A periodic endpoint/complement row can be unblocked only by proof-grade periodic source-lift consistency plus either periodic endpoint ownership or periodic complement closure, with endpoint no-double-counting and branch-reuse exclusion. The current v6 data only identify the seam rows and their overlap/touching ranges.",
    periodic_endpoint_complement_rows: rows,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "periodic_source_lift_consistency_proven / periodic_endpoint_ownership_certificate_present / periodic_complement_closure_certificate_present",
      continuation_class:
        "mechanical endpoint/complement ownership certificate; no proof-rule or constructor-basis decision is required by this classifier",
      fail_closed_stop_conditions: [
        "Do not consume periodic endpoint/complement rows from row-specific trigonometric overlap or source-lift metadata alone.",
        "Do not treat the 12-root topology certificate as periodic endpoint ownership.",
        "Do not set preledger_pass, updates_live_ledger, row_consumed, or branch_chart_authorized from this classifier.",
      ],
    },
    authorization_lock: {
      preledger_pass_rows: 0,
      row_consumption_count: 0,
      branch_chart_authorized_rows: 0,
      preledger_pass_authorized: false,
      row_consumption_authorized: false,
      branch_chart_authorized: false,
    },
    capture_decision:
      "Priority-only. This classifier proves no periodic source-lift consistency, endpoint ownership, complement closure, no-double-counting, row consumption, live-ledger update, or branch-chart authorization.",
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

function summaryTable(summary) {
  return [
    ["Periodic endpoint/complement rows", summary.periodic_endpoint_complement_rows],
    ["Source-lift -1 rows", summary.source_lift_minus_one_rows],
    ["Range overlap/touch rows", summary.range_overlap_or_touch_rows],
    [
      "Rows requiring endpoint/complement ownership",
      summary.periodic_source_lift_requires_endpoint_or_complement_ownership_rows,
    ],
    ["Periodic source-lift consistency proofs", summary.periodic_source_lift_consistency_proven_rows],
    ["Periodic endpoint ownership certificates", summary.periodic_endpoint_ownership_certificate_rows],
    ["Periodic complement closure certificates", summary.periodic_complement_closure_certificate_rows],
    ["Endpoint no-double-counting certificates", summary.endpoint_no_double_counting_certificate_rows],
    ["Periodic branch-reuse exclusions", summary.periodic_branch_reuse_exclusion_rows],
    ["Rows unblocked", summary.rows_unblocked],
    ["Row consumption count", summary.row_consumption_count],
    ["Branch-chart authorized rows", summary.branch_chart_authorized_rows],
    ["Minimum diagnostic overlap width", summary.min_diagnostic_overlap_width],
    ["Maximum diagnostic overlap width", summary.max_diagnostic_overlap_width],
  ]
    .map(([label, value]) => `| ${label} | ${value} |`)
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.ledger}\` | \`${row.receiver_interval}\` | \`${row.source_interval}\` | ${row.source_lift_periods} | \`${row.receiver_velocity_class}\` | \`${row.source_velocity_class}\` | ${row.diagnostic_overlap_width} | \`${row.first_missing_field}\` | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, classifier) {
  const report = `# Periodic Endpoint/Complement Ownership Classifier

Packet: \`${PACKET_ID}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

This classifier isolates the 8 periodic endpoint/complement rows left by the
higher-fold proof-interval v6 preledger. All 8 rows have source interval
\`A12\`, source lift \`-1\`, range overlap or touching, and failure code
\`${PERIODIC_ENDPOINT_CODE}\`. The row-family classifier already identifies
this as a mechanical endpoint/complement ownership certificate lane.

The result is fail-closed. The current data identify the seam rows and preserve
the row-specific trigonometric overlap/touching evidence, but they provide
0 / 8 periodic source-lift consistency proofs, periodic endpoint ownership
certificates, periodic complement closure certificates, endpoint
no-double-counting certificates, periodic branch-reuse exclusions, row
consumptions, live-ledger updates, or branch-chart authorizations.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Counts

| Measure | Value |
| --- | ---: |
${summaryTable(classifier.summary)}

## Row Classifier

| Row | Ledger | Receiver | Source | Source lift periods | Receiver class | Source class | Diagnostic overlap width | First missing field | Row consumed |
| --- | --- | --- | --- | ---: | --- | --- | ---: | --- | --- |
${rowTable(classifier.periodic_endpoint_complement_rows)}

## Certificate-Side Handoff

Next artifact target: \`${classifier.next_certificate_handoff.artifact_target}\`.

Continuation class: ${classifier.next_certificate_handoff.continuation_class}.

Fail-closed stop conditions:

${classifier.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`branch_chart_authorized\`: false
- row consumption authorized: false

This artifact is a priority-only row classifier. It proves no periodic
source-lift consistency, no endpoint/complement ownership, no complement
closure, no no-double-counting, no row consumption, and no branch-chart
authorization.
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
    rootTubeAudit: args.rootTubeAudit,
  };
  const inputs = Object.fromEntries(Object.entries(paths).map(([name, filePath]) => [name, readJson(filePath)]));
  const classifier = buildClassifier(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, classifier, args.pretty);
  writeReport(outReport, classifier);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
