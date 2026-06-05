#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_layer_burden.${PACKET_ID}.json`;
const OUTPUT_REPORT = `fold_layer_burden_report.${PACKET_ID}.md`;
const FOLD_LAYER_FAILURE = "trig_range_overlap_touches_fold_layer_candidate";

function parseArgs(argv) {
  const args = {
    ledger: DEFAULT_LEDGER,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--ledger") {
      args.ledger = argv[++i];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-layer-burden-atlas.mjs [options]

Options:
  --ledger PATH   Higher-fold proof-interval v6 ledger. Defaults to ${DEFAULT_LEDGER}.
  --out-dir PATH  Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty        Pretty-print JSON artifact.
  --help          Show this help.`);
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
  const lo = Math.max(Number(leftRange[0]), Number(rightRange[0]));
  const hi = Math.min(Number(leftRange[1]), Number(rightRange[1]));
  if (!Number.isFinite(lo) || !Number.isFinite(hi) || hi < lo) {
    return null;
  }
  return [cleanNumber(lo), cleanNumber(hi)];
}

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function rowSortKey(row) {
  return `${separatorSortKey(row.separator_event).toString().padStart(3, "0")}:${row.row_id}`;
}

function groupRows(rows, keyFn) {
  return rows.reduce((groups, row) => {
    const key = keyFn(row);
    groups[key] ??= [];
    groups[key].push(row.row_id);
    return groups;
  }, {});
}

function buildBurden(ledger, ledgerPath) {
  if (ledger.packet_id !== PACKET_ID) {
    throw new Error(`Expected packet_id ${PACKET_ID}; got ${ledger.packet_id}`);
  }
  if (ledger.branch_chart_authorized !== false) {
    throw new Error("Refusing to build a burden atlas from a branch-authorized ledger.");
  }

  const intervalById = new Map((ledger.intervals ?? []).map((interval) => [interval.interval_id, interval]));
  const foldRows = ledger.rows
    .filter((row) => row.failure_code === FOLD_LAYER_FAILURE)
    .map((row) => {
      const receiver = intervalById.get(row.receiver_interval);
      const source = intervalById.get(row.source_interval);
      if (!receiver || !source) {
        throw new Error(`Missing interval data for ${row.row_id}`);
      }
      const foldIntervals = [receiver, source]
        .filter((interval) => interval.type === "fold_layer_candidate")
        .map((interval) => interval.interval_id);
      const distinctFoldIntervals = [...new Set(foldIntervals)];
      if (distinctFoldIntervals.length !== 1) {
        throw new Error(
          `Expected exactly one fold-layer interval family for ${row.row_id}; got ${distinctFoldIntervals.join(", ")}`
        );
      }
      const foldInterval = intervalById.get(distinctFoldIntervals[0]);
      const overlap = overlapRange(row.receiver_range, row.source_range);
      return {
        row_id: row.row_id,
        packet_id: PACKET_ID,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        fold_interval: foldInterval.interval_id,
        separator_event: foldInterval.separator_event,
        receiver_interval: row.receiver_interval,
        source_interval: row.source_interval,
        receiver_type: receiver.type,
        source_type: source.type,
        receiver_theta_range: row.receiver_theta_range,
        source_theta_range: row.source_theta_range,
        fold_theta_range: foldInterval.theta_range,
        fold_time_range: foldInterval.t_range,
        receiver_range: row.receiver_range,
        source_range: row.source_range,
        diagnostic_overlap_range: overlap,
        diagnostic_overlap_width: overlap ? cleanNumber(overlap[1] - overlap[0]) : 0,
        missing_same_packet_fields: [
          "higher_fold_layer_atlas_ref",
          "alpha_floor",
          "exit_floor",
          "same_packet_fold_impulse_or_direct_quadrature_bound",
          "fold_layer_parity_record",
          "parent_complement_consumption_ref",
        ],
        row_may_become: "fold_layer",
        row_must_not_become: "simple_root",
        branch_chart_authorized: false,
      };
    })
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));

  const rowsBySeparator = Object.fromEntries(
    Object.entries(groupRows(foldRows, (row) => row.separator_event)).sort(
      ([left], [right]) => separatorSortKey(left) - separatorSortKey(right)
    )
  );
  const rowsByFoldInterval = Object.fromEntries(
    Object.entries(groupRows(foldRows, (row) => row.fold_interval)).sort(([left], [right]) =>
      left.localeCompare(right, undefined, { numeric: true })
    )
  );

  return {
    schema: "breather-higher-fold-layer-burden-atlas-v1",
    packet_id: PACKET_ID,
    source_ledger: path.basename(ledgerPath),
    source_report: `causal_preledger_interval_report.${PACKET_ID}.proof-interval-v6.md`,
    source_backend_certificate: `preledger_interval_backend_certificate.${PACKET_ID}.proof-interval-v6.json`,
    status: "higher_fold_layer_burden_recorded_no_row_consumption",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only higher-fold fold-layer burden atlas; records missing same-packet fields for the v6 fold-layer blockers but consumes no rows",
    summary: {
      split_required_base_rows: ledger.summary.split_required_base_rows,
      fold_layer_rows: foldRows.length,
      separator_count: Object.keys(rowsBySeparator).length,
      rows_by_separator: rowsBySeparator,
      rows_by_fold_interval: rowsByFoldInterval,
      v6_failure_code: FOLD_LAYER_FAILURE,
      v6_regular_parent_complement_rows: 42,
      v6_periodic_endpoint_complement_rows: 8,
      branch_chart_authorized: false,
    },
    required_same_packet_fields: [
      "higher-fold packet identity refs to phi_cyc, mesh, input screen, proof-interval ledger, and root-count certificate",
      "same-packet fold-layer atlas rows for Sigma_hf_01 through Sigma_hf_12",
      "theta_center, t_center, theta_range, t_range, ledger, and layer radii for each separator layer",
      "alpha_floor > 0 and exit_floor > 0 for each higher-fold separator layer",
      "fold-layer parity data: delta root count, signed degree, local even jump, and parity status",
      "mollifier proof or direct quadrature route under the higher-fold packet identity",
      "Gamma/g coupling certification under the higher-fold packet identity",
      "per-row support coverage and finite fold impulse bound or direct fold-row action bound",
      "parent-complement consumption rule after accepted fold-layer rows are removed",
    ],
    template_only_refs: [
      "fold_layer_burden.fresh-same-packet-fold-shear-seed-v0.json",
      "fold_layer_burden_report.fresh-same-packet-fold-shear-seed-v0.md",
      "fold_layer_atlas.json",
      "fold_full_interval_constants_certificate.json",
      "fold_full_interval_fallback_legality.md",
    ],
    consumption_rule:
      "A higher-fold row may become fold_layer only after the same-packet fields above are accepted. It must not be rewritten as simple_root, and no branch-sum residual may be routed through a separator layer.",
    rows: foldRows,
  };
}

function separatorTable(burden) {
  return Object.entries(burden.summary.rows_by_separator)
    .map(([separator, rows]) => `| \`${separator}\` | ${rows.length} | ${rows.map((row) => `\`${row}\``).join(", ")} |`)
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.ledger}\` | \`${row.receiver_interval}\` | \`${row.source_interval}\` | ${row.diagnostic_overlap_width} |`
    )
    .join("\n");
}

function buildReport(burden) {
  return `# Higher-Fold Fold-Layer Burden Atlas

## Verdict

The higher-fold packet \`${PACKET_ID}\` still fail-closes before branch-chart
authorization. The proof-interval v6 ledger leaves ${burden.summary.fold_layer_rows}
fold-layer candidate rows under \`${FOLD_LAYER_FAILURE}\`. This atlas groups
those rows by the 12 higher-fold separator layers and records the same-packet
fields required before any of them may be consumed.

This report is priority-only. It does not update the live \`causal_ledger.json\`,
does not mark any row \`fold_layer\`, and does not authorize
\`branch_chart.json\`.

| Separator | Rows | Row ids |
| --- | ---: | --- |
${separatorTable(burden)}

## Row Burden

| Row | Separator | Ledger | Receiver | Source | Diagnostic overlap width |
| --- | --- | --- | --- | --- | ---: |
${rowTable(burden.rows)}

## Required Same-Packet Fields

${burden.required_same_packet_fields.map((field) => `- ${field}.`).join("\n")}

## Template-Only Reuse

The older fold-layer packets may be reused only as templates:
${burden.template_only_refs.map((ref) => `\`${ref}\``).join(", ")}. They are
not higher-fold same-packet evidence and do not consume the rows above.

## Consumption Rule

Each row above may become \`fold_layer\` only after the higher-fold same-packet
fields are accepted. No row above may be rewritten as \`simple_root\`, and no
branch-sum residual may be routed through a separator layer.

## Capture Decision

Priority-only. This atlas sharpens the remaining v6 burden: the 42 regular
parent-complement rows need a new source-cover/parent-complement theorem or
candidate change, the 8 periodic endpoint/complement rows need endpoint
ownership, and the 112 rows above need higher-fold same-packet fold-layer
certification.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const ledgerPath = path.resolve(args.ledger);
  const ledger = readJson(ledgerPath);
  const burden = buildBurden(ledger, ledgerPath);
  const outDir = path.resolve(args.outDir);
  writeJson(path.join(outDir, OUTPUT_JSON), burden, args.pretty);
  writeText(path.join(outDir, OUTPUT_REPORT), buildReport(burden));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
