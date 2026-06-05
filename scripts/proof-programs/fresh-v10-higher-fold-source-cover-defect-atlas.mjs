#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `source_cover_defect_atlas.${PACKET_ID}.proof-interval-v6.json`;
const OUTPUT_REPORT = `source_cover_defect_atlas_report.${PACKET_ID}.proof-interval-v6.md`;
const SIMPLE_ROOT_COVER_FAILURE = "trig_range_overlap_simple_root_receiver_not_strictly_covered";

const Q_ZERO = Object.freeze({ num: 0n, den: 1n });

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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-source-cover-defect-atlas.mjs [options]

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

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function absBigInt(value) {
  return value < 0n ? -value : value;
}

function gcd(a, b) {
  let x = absBigInt(a);
  let y = absBigInt(b);
  while (y !== 0n) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x || 1n;
}

function q(num, den = 1n) {
  if (den === 0n) {
    throw new Error("Rational denominator must be nonzero.");
  }
  let n = BigInt(num);
  let d = BigInt(den);
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  const divisor = gcd(n, d);
  return { num: n / divisor, den: d / divisor };
}

function qFromJson(value) {
  if (!value || value.num === undefined || value.den === undefined) {
    throw new Error(`Invalid rational JSON: ${JSON.stringify(value)}`);
  }
  return q(BigInt(value.num), BigInt(value.den));
}

function qJson(value) {
  return {
    num: value.num.toString(),
    den: value.den.toString(),
  };
}

function qCmp(left, right) {
  const lhs = left.num * right.den;
  const rhs = right.num * left.den;
  if (lhs < rhs) return -1;
  if (lhs > rhs) return 1;
  return 0;
}

function qMax(values) {
  return values.reduce((best, value) => (qCmp(value, best) > 0 ? value : best), values[0] ?? Q_ZERO);
}

function qMin(values) {
  return values.reduce((best, value) => (qCmp(value, best) < 0 ? value : best), values[0] ?? Q_ZERO);
}

function qToDecimal(value, places = 15) {
  const normalized = q(value.num, value.den);
  const sign = normalized.num < 0n ? "-" : "";
  let numerator = absBigInt(normalized.num);
  const integer = numerator / normalized.den;
  let remainder = numerator % normalized.den;
  if (places === 0 || remainder === 0n) {
    return `${sign}${integer.toString()}`;
  }
  const digits = [];
  for (let i = 0; i < places; i += 1) {
    remainder *= 10n;
    digits.push((remainder / normalized.den).toString());
    remainder %= normalized.den;
    if (remainder === 0n) {
      break;
    }
  }
  while (digits.length > 0 && digits[digits.length - 1] === "0") {
    digits.pop();
  }
  return digits.length === 0 ? `${sign}${integer.toString()}` : `${sign}${integer.toString()}.${digits.join("")}`;
}

function qArtifact(value) {
  return {
    ...qJson(value),
    display: qToDecimal(value),
  };
}

function qArtifactFromJson(value) {
  return qArtifact(qFromJson(value));
}

function countBy(values, keyFn) {
  return values.reduce((counts, value) => {
    const key = keyFn(value);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function includeCellForSide(cell, side) {
  return cell.failed_side === side || cell.failed_side === "both";
}

function terminalSpanSortKey(cell) {
  return cell.receiver_terminal_grid_span.lo;
}

function mergedTerminalSpans(cells) {
  const sorted = [...cells].sort((left, right) => terminalSpanSortKey(left) - terminalSpanSortKey(right));
  const spans = [];
  for (const cell of sorted) {
    const span = cell.receiver_terminal_grid_span;
    const last = spans[spans.length - 1];
    if (last && last.hi === span.lo && last.den === span.den) {
      last.hi = span.hi;
      last.leaf_count += span.hi - span.lo;
      last.last_cell_path = cell.receiver_cell_path;
      continue;
    }
    spans.push({
      lo: span.lo,
      hi: span.hi,
      den: span.den,
      leaf_count: span.hi - span.lo,
      first_cell_path: cell.receiver_cell_path,
      last_cell_path: cell.receiver_cell_path,
    });
  }
  return spans;
}

function sideBurden(cells, side) {
  const sideCells = cells.filter((cell) => includeCellForSide(cell, side));
  const coverageDefects = sideCells.map((cell) => qFromJson(cell.coverage_defect_q));
  const sourceMinMargins = sideCells.map((cell) => qFromJson(cell.source_cover_min_margin_q));
  return {
    terminal_leaf_count: sideCells.length,
    required_source_boundary_expansion_q: qArtifact(qMax(coverageDefects)),
    worst_source_cover_min_margin_q: qArtifact(qMin(sourceMinMargins)),
    terminal_spans: mergedTerminalSpans(sideCells),
  };
}

function sidePattern(loCount, hiCount) {
  if (loCount > 0 && hiCount > 0) {
    return "both_sides";
  }
  if (loCount > 0) {
    return "lo_only";
  }
  if (hiCount > 0) {
    return "hi_only";
  }
  return "none";
}

function routeForSidePattern(pattern) {
  if (pattern === "both_sides") {
    return "source-inner range must expand on both boundaries, or the receiver outer ranges must contract on both sides, before the parent can close.";
  }
  if (pattern === "lo_only") {
    return "source-inner lower boundary must move lower, or the receiver lower hull must move higher, before the parent can close.";
  }
  if (pattern === "hi_only") {
    return "source-inner upper boundary must move higher, or the receiver upper hull must move lower, before the parent can close.";
  }
  return "no source-cover defect recorded.";
}

function rowSortKey(rowId) {
  const match = rowId.match(/^R_([uw])_A(\d+)_A(\d+)$/);
  if (!match) {
    return rowId;
  }
  const [, ledger, receiver, source] = match;
  return `${receiver.padStart(3, "0")}:${source.padStart(3, "0")}:${ledger}`;
}

function summarizeCover(cover) {
  const missingCells = cover.missing_receiver_grid_cells ?? [];
  if (missingCells.length !== cover.missing_terminal_leaf_count) {
    throw new Error(`Missing-cell count mismatch for ${cover.parent_base_row_id}`);
  }
  const sideCounts = countBy(missingCells, (cell) => cell.failed_side ?? "none");
  const loCount = missingCells.filter((cell) => includeCellForSide(cell, "lo")).length;
  const hiCount = missingCells.filter((cell) => includeCellForSide(cell, "hi")).length;
  const pattern = sidePattern(loCount, hiCount);
  const defects = missingCells.map((cell) => qFromJson(cell.coverage_defect_q));
  const minMargins = missingCells.map((cell) => qFromJson(cell.source_cover_min_margin_q));
  const firstMissing = [...missingCells].sort((left, right) => terminalSpanSortKey(left) - terminalSpanSortKey(right))[0];
  const lastMissing = [...missingCells].sort((left, right) => terminalSpanSortKey(right) - terminalSpanSortKey(left))[0];

  return {
    row_id: cover.parent_base_row_id,
    cover_id: cover.row_id,
    packet_id: PACKET_ID,
    ledger: cover.ledger,
    receiver_interval: cover.receiver_interval,
    source_interval: cover.source_interval,
    source_lift_periods: cover.source_lift_periods,
    receiver_theta_range_q: cover.receiver_theta_range_q,
    source_theta_range_q: cover.source_theta_range_q,
    receiver_terminal_grid_size: cover.receiver_terminal_grid_size,
    receiver_max_refinement_depth: cover.receiver_max_refinement_depth,
    accepted_leaf_count: cover.accepted_leaf_count,
    missing_terminal_leaf_count: cover.missing_terminal_leaf_count,
    structural_miss_count: cover.structural_miss_count,
    indeterminate_miss_count: cover.indeterminate_miss_count,
    accepted_receiver_width_q: qArtifactFromJson(cover.accepted_receiver_width_q),
    missing_receiver_width_q: qArtifactFromJson(cover.missing_receiver_width_q),
    structural_missing_width_q: qArtifactFromJson(cover.structural_missing_width_q),
    parent_receiver_width_q: qArtifactFromJson(cover.parent_receiver_width_q),
    coverage_ratio_q: qArtifactFromJson(cover.coverage_ratio_q),
    failed_side_counts: sideCounts,
    side_pattern: pattern,
    source_cover_max_terminal_defect_q: qArtifact(qMax(defects)),
    source_cover_worst_terminal_margin_q: qArtifact(qMin(minMargins)),
    required_source_lowering_q: sideBurden(missingCells, "lo").required_source_boundary_expansion_q,
    required_source_raising_q: sideBurden(missingCells, "hi").required_source_boundary_expansion_q,
    lower_boundary_burden: sideBurden(missingCells, "lo"),
    upper_boundary_burden: sideBurden(missingCells, "hi"),
    first_missing_terminal_leaf: firstMissing
      ? {
          receiver_cell_path: firstMissing.receiver_cell_path,
          receiver_terminal_grid_span: firstMissing.receiver_terminal_grid_span,
          failed_side: firstMissing.failed_side,
          coverage_defect_q: qArtifactFromJson(firstMissing.coverage_defect_q),
        }
      : null,
    last_missing_terminal_leaf: lastMissing
      ? {
          receiver_cell_path: lastMissing.receiver_cell_path,
          receiver_terminal_grid_span: lastMissing.receiver_terminal_grid_span,
          failed_side: lastMissing.failed_side,
          coverage_defect_q: qArtifactFromJson(lastMissing.coverage_defect_q),
        }
      : null,
    closure_route_hint: routeForSidePattern(pattern),
    parent_consumed: false,
    branch_chart_authorized: false,
  };
}

function buildAtlas(ledger, ledgerPath) {
  if (ledger.packet_id !== PACKET_ID) {
    throw new Error(`Expected packet_id ${PACKET_ID}; got ${ledger.packet_id}`);
  }
  if (ledger.branch_chart_authorized !== false) {
    throw new Error("Refusing to build a defect atlas from a branch-authorized ledger.");
  }

  const covers = [...(ledger.simple_root_receiver_covers ?? [])].sort((left, right) =>
    rowSortKey(left.parent_base_row_id).localeCompare(rowSortKey(right.parent_base_row_id))
  );
  if (covers.length !== 42) {
    throw new Error(`Expected 42 simple-root receiver covers; got ${covers.length}`);
  }
  for (const cover of covers) {
    if (cover.failure_reason_counts?.[SIMPLE_ROOT_COVER_FAILURE] !== cover.missing_terminal_leaf_count) {
      throw new Error(`Unexpected failure reason mix in ${cover.parent_base_row_id}`);
    }
    if (cover.parent_consumed !== false || cover.receiver_grid_cover_complete !== false) {
      throw new Error(`Unexpected consumed or complete parent cover in ${cover.parent_base_row_id}`);
    }
  }

  const rows = covers.map(summarizeCover);
  const terminalSpans = rows.flatMap((row) => [
    ...row.lower_boundary_burden.terminal_spans,
    ...row.upper_boundary_burden.terminal_spans,
  ]);
  const receiverBoundarySpanCounts = terminalSpans.reduce(
    (counts, span) => {
      counts.terminal_missing_span_count += 1;
      counts.terminal_missing_leaf_count += span.leaf_count;
      if (span.lo === 0) {
        counts.receiver_left_boundary_missing_leaves += span.leaf_count;
      } else if (span.hi === span.den) {
        counts.receiver_right_boundary_missing_leaves += span.leaf_count;
      } else {
        counts.receiver_interior_missing_leaves += span.leaf_count;
      }
      return counts;
    },
    {
      terminal_missing_span_count: 0,
      terminal_missing_leaf_count: 0,
      receiver_left_boundary_missing_leaves: 0,
      receiver_right_boundary_missing_leaves: 0,
      receiver_interior_missing_leaves: 0,
    }
  );
  const failedSideCounts = countBy(
    covers.flatMap((cover) => cover.missing_receiver_grid_cells ?? []),
    (cell) => cell.failed_side ?? "none"
  );
  const sidePatternCounts = countBy(rows, (row) => row.side_pattern);
  const coverageRatios = rows.map((row) => qFromJson(row.coverage_ratio_q));
  const maxDefectRows = [...rows]
    .sort((left, right) =>
      qCmp(qFromJson(right.source_cover_max_terminal_defect_q), qFromJson(left.source_cover_max_terminal_defect_q))
    )
    .slice(0, 8)
    .map((row) => row.row_id);
  const nearestClosureRows = [...rows]
    .sort((left, right) => {
      const missingCompare = left.missing_terminal_leaf_count - right.missing_terminal_leaf_count;
      if (missingCompare !== 0) {
        return missingCompare;
      }
      return qCmp(qFromJson(left.source_cover_max_terminal_defect_q), qFromJson(right.source_cover_max_terminal_defect_q));
    })
    .slice(0, 8)
    .map((row) => row.row_id);

  return {
    schema: "breather-higher-fold-source-cover-defect-atlas-v1",
    packet_id: PACKET_ID,
    source_ledger: path.basename(ledgerPath),
    source_ledger_sha256: sha256File(ledgerPath),
    source_report: `causal_preledger_interval_report.${PACKET_ID}.proof-interval-v6.md`,
    status: "higher_fold_source_cover_defects_recorded_no_row_consumption",
    theorem_target: "Source-Cover Parent-Complement Closure",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only exact-rational defect atlas for the 42 regular parent-complement rows left open by proof-interval v6",
    summary: {
      parent_rows: rows.length,
      ledger_counts: countBy(rows, (row) => row.ledger),
      terminal_grid_size: ledger.summary.receiver_cover_terminal_grid_size,
      max_refinement_depth: ledger.summary.receiver_cover_max_refinement_depth,
      accepted_receiver_leaves: ledger.summary.receiver_cover_certified_cells,
      terminal_missing_leaves: ledger.summary.receiver_cover_missing_cells,
      structural_terminal_misses: ledger.summary.receiver_cover_structural_miss_count,
      indeterminate_terminal_misses: ledger.summary.receiver_cover_indeterminate_miss_count,
      coarse_cells_resolved_by_refinement: ledger.summary.receiver_cover_resolved_coarse_cells_by_refinement,
      failed_side_counts: failedSideCounts,
      side_pattern_counts: sidePatternCounts,
      receiver_boundary_span_counts: receiverBoundarySpanCounts,
      min_coverage_ratio_q: qArtifact(qMin(coverageRatios)),
      max_coverage_ratio_q: qArtifact(qMax(coverageRatios)),
      nearest_closure_rows: nearestClosureRows,
      largest_defect_rows: maxDefectRows,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    closure_condition:
      "For each row, a future source-cover/parent-complement theorem or candidate change must eliminate every terminal defect by proving sufficient same-packet source-inner boundary expansion, receiver-range contraction, or endpoint/topology ownership with no double counting. This atlas only records the exact terminal burdens.",
    pass_rule:
      "A regular parent-complement row may be consumed only after every terminal miss in this atlas has a proof-grade same-packet closure certificate and endpoint ownership/no-double-counting is certified. This artifact by itself consumes no rows.",
    rows,
  };
}

function sidePatternLabel(row) {
  if (row.side_pattern === "both_sides") return "both";
  if (row.side_pattern === "lo_only") return "lo";
  if (row.side_pattern === "hi_only") return "hi";
  return "none";
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.ledger}\` | \`${row.receiver_interval}\` | \`${row.source_interval}\` | ${row.accepted_leaf_count}/${row.receiver_terminal_grid_size} | ${row.missing_terminal_leaf_count} | ${sidePatternLabel(row)} | ${row.required_source_lowering_q.display} | ${row.required_source_raising_q.display} | ${row.source_cover_max_terminal_defect_q.display} |`
    )
    .join("\n");
}

function namedRowList(rows, ids) {
  const rowById = new Map(rows.map((row) => [row.row_id, row]));
  return ids
    .map((rowId) => {
      const row = rowById.get(rowId);
      return `| \`${row.row_id}\` | \`${row.ledger}\` | \`${row.receiver_interval}\` | \`${row.source_interval}\` | ${row.missing_terminal_leaf_count} | ${row.source_cover_max_terminal_defect_q.display} | ${sidePatternLabel(row)} |`;
    })
    .join("\n");
}

function buildReport(atlas) {
  return `# Higher-Fold Source-Cover Defect Atlas

## Verdict

The higher-fold packet \`${PACKET_ID}\` still fail-closes before branch-chart
authorization. Proof-interval v6 already shows that adaptive receiver-grid
refinement does not close the regular parent-complement rows: it resolves
${atlas.summary.coarse_cells_resolved_by_refinement} coarse cells by refinement
and leaves ${atlas.summary.structural_terminal_misses} structural terminal
source-cover misses across ${atlas.summary.parent_rows} parent rows.

This atlas records the exact boundary-expansion burden for those rows. It is
priority-only: it consumes 0 parent rows, does not update the live
\`causal_ledger.json\`, and does not authorize \`branch_chart.json\`.

| Quantity | Value |
| --- | ---: |
| Parent rows | ${atlas.summary.parent_rows} |
| \`u\` rows | ${atlas.summary.ledger_counts.u ?? 0} |
| \`w\` rows | ${atlas.summary.ledger_counts.w ?? 0} |
| Terminal grid size | ${atlas.summary.terminal_grid_size} |
| Accepted receiver leaves | ${atlas.summary.accepted_receiver_leaves} |
| Terminal missing leaves | ${atlas.summary.terminal_missing_leaves} |
| Structural terminal misses | ${atlas.summary.structural_terminal_misses} |
| Indeterminate terminal misses | ${atlas.summary.indeterminate_terminal_misses} |
| Failed low-side terminal leaves | ${atlas.summary.failed_side_counts.lo ?? 0} |
| Failed high-side terminal leaves | ${atlas.summary.failed_side_counts.hi ?? 0} |
| Receiver-left boundary missing leaves | ${atlas.summary.receiver_boundary_span_counts.receiver_left_boundary_missing_leaves} |
| Receiver-right boundary missing leaves | ${atlas.summary.receiver_boundary_span_counts.receiver_right_boundary_missing_leaves} |
| Receiver-interior missing leaves | ${atlas.summary.receiver_boundary_span_counts.receiver_interior_missing_leaves} |
| Rows with low-side only burden | ${atlas.summary.side_pattern_counts.lo_only ?? 0} |
| Rows with high-side only burden | ${atlas.summary.side_pattern_counts.hi_only ?? 0} |
| Rows with two-sided burden | ${atlas.summary.side_pattern_counts.both_sides ?? 0} |
| Minimum certified coverage ratio | ${atlas.summary.min_coverage_ratio_q.display} |
| Maximum certified coverage ratio | ${atlas.summary.max_coverage_ratio_q.display} |
| Row consumption count | ${atlas.summary.row_consumption_count} |

## Row Defect Burden

Here \`lower expansion\` means the source-inner lower boundary must move lower
by at least the recorded amount, or the corresponding receiver lower hull must
move higher. \`Upper expansion\` means the source-inner upper boundary must move
higher by at least the recorded amount, or the corresponding receiver upper
hull must move lower.

| Row | Ledger | Receiver | Source | Certified leaves | Missing leaves | Failed side | Lower expansion | Upper expansion | Max terminal defect |
| --- | --- | --- | --- | ---: | ---: | --- | ---: | ---: | ---: |
${rowTable(atlas.rows)}

## Nearest Closure Rows

These rows have the fewest terminal missing leaves and are the best local probes
for a source-cover parent-complement theorem.

| Row | Ledger | Receiver | Source | Missing leaves | Max terminal defect | Failed side |
| --- | --- | --- | --- | ---: | ---: | --- |
${namedRowList(atlas.rows, atlas.summary.nearest_closure_rows)}

## Largest Defect Rows

These rows have the largest single terminal source-cover defect and are the
right stress tests for a candidate-change route.

| Row | Ledger | Receiver | Source | Missing leaves | Max terminal defect | Failed side |
| --- | --- | --- | --- | ---: | ---: | --- |
${namedRowList(atlas.rows, atlas.summary.largest_defect_rows)}

## Boundary Span Diagnosis

All terminal source-cover defects in this atlas attach to receiver-boundary
spans: ${atlas.summary.receiver_boundary_span_counts.receiver_left_boundary_missing_leaves}
missing leaves touch the left boundary and
${atlas.summary.receiver_boundary_span_counts.receiver_right_boundary_missing_leaves}
touch the right boundary, while
${atlas.summary.receiver_boundary_span_counts.receiver_interior_missing_leaves}
terminal missing leaves are interior-only. The remaining regular-row problem is
therefore not an interior receiver-cover hole; it is a boundary ownership or
boundary movement problem.

## Closure Condition

${atlas.closure_condition}

## Pass Rule

${atlas.pass_rule}

## Capture Decision

Priority-only. The atlas sharpens the next proof target: a source-cover
parent-complement theorem must supply exact same-packet boundary movement,
receiver contraction, or endpoint/topology ownership for the 42 rows above.
Absent such a theorem, the next candidate must change the source-inner or
receiver outer ranges by at least the recorded rational burdens before these
rows can be consumed.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const ledger = readJson(args.ledger);
  const atlas = buildAtlas(ledger, args.ledger);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, atlas, args.pretty);
  writeText(outReport, buildReport(atlas));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
