#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_ATLAS = `${CERT_DIR}/source_cover_defect_atlas.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `source_cover_boundary_ownership_audit.${PACKET_ID}.proof-interval-v6.json`;
const OUTPUT_REPORT = `source_cover_boundary_ownership_audit_report.${PACKET_ID}.proof-interval-v6.md`;

const TARGET_FIELDS = [
  "complete_receiver_partition",
  "all_terminal_spans_owned",
  "strict_source_coverage_or_contraction",
  "memory_margins_all_owned_components",
  "endpoint_ownership_no_double_counting",
  "simple_root_branch_reuse_exclusion",
  "non_owned_complement_closed",
];

function parseArgs(argv) {
  const args = {
    atlas: DEFAULT_ATLAS,
    ledger: DEFAULT_LEDGER,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--atlas") {
      args.atlas = argv[++i];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-source-cover-boundary-ownership-audit.mjs [options]

Options:
  --atlas PATH   Higher-fold source-cover defect atlas. Defaults to ${DEFAULT_ATLAS}.
  --ledger PATH  Higher-fold proof-interval v6 ledger. Defaults to ${DEFAULT_LEDGER}.
  --out-dir PATH Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty       Pretty-print JSON artifact.
  --help         Show this help.`);
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

function qAdd(left, right) {
  return q(left.num * right.den + right.num * left.den, left.den * right.den);
}

function qSub(left, right) {
  return q(left.num * right.den - right.num * left.den, left.den * right.den);
}

function qMul(left, right) {
  return q(left.num * right.num, left.den * right.den);
}

function qCmp(left, right) {
  const lhs = left.num * right.den;
  const rhs = right.num * left.den;
  if (lhs < rhs) return -1;
  if (lhs > rhs) return 1;
  return 0;
}

function qMax(values) {
  return values.reduce((best, value) => (qCmp(value, best) > 0 ? value : best), values[0] ?? q(0n));
}

function qMin(values) {
  return values.reduce((best, value) => (qCmp(value, best) < 0 ? value : best), values[0] ?? q(0n));
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

function terminalSpanKey(span) {
  return `${span.lo}:${span.hi}:${span.den}`;
}

function spanLeafCount(span) {
  return span.hi - span.lo;
}

function rowSortKey(rowId) {
  const match = rowId.match(/^R_([uw])_A(\d+)_A(\d+)$/);
  if (!match) {
    return rowId;
  }
  const [, ledger, receiver, source] = match;
  return `${receiver.padStart(3, "0")}:${source.padStart(3, "0")}:${ledger}`;
}

function componentKind(component) {
  if (component.kind === "certified") {
    return "certified_simple_root";
  }
  if (component.boundary_side === "receiver_left") {
    return "left_boundary_unowned";
  }
  if (component.boundary_side === "receiver_right") {
    return "right_boundary_unowned";
  }
  return "interior_unowned";
}

function mergeTerminalComponents(components) {
  const sorted = [...components].sort((left, right) => left.span.lo - right.span.lo || left.span.hi - right.span.hi);
  const merged = [];
  for (const component of sorted) {
    const last = merged[merged.length - 1];
    if (
      last &&
      last.span.den === component.span.den &&
      last.span.hi === component.span.lo &&
      last.kind === component.kind
    ) {
      last.span.hi = component.span.hi;
      last.leaf_count += spanLeafCount(component.span);
      last.cell_count += component.cell_count;
      last.failed_side = last.failed_side === component.failed_side ? last.failed_side : "mixed";
      last.coverage_defect_q = qArtifact(
        qMax([qFromJson(last.coverage_defect_q), qFromJson(component.coverage_defect_q)])
      );
      last.source_cover_min_margin_q = qArtifact(
        qMin([qFromJson(last.source_cover_min_margin_q), qFromJson(component.source_cover_min_margin_q)])
      );
      continue;
    }
    merged.push({
      ...component,
      span: { ...component.span },
      leaf_count: spanLeafCount(component.span),
      cell_count: component.cell_count,
    });
  }
  for (const component of merged) {
    if (component.kind === "boundary") {
      component.boundary_side = boundarySide(component.span);
    }
  }
  return merged;
}

function thetaRangeForSpan(row, span) {
  const receiverLo = qFromJson(row.receiver_theta_range_q.lo);
  const receiverHi = qFromJson(row.receiver_theta_range_q.hi);
  const width = qSub(receiverHi, receiverLo);
  const loFrac = q(BigInt(span.lo), BigInt(span.den));
  const hiFrac = q(BigInt(span.hi), BigInt(span.den));
  return {
    lo: qArtifact(qAdd(receiverLo, qMul(width, loFrac))),
    hi: qArtifact(qAdd(receiverLo, qMul(width, hiFrac))),
  };
}

function boundarySide(span) {
  if (span.lo === 0) {
    return "receiver_left";
  }
  if (span.hi === span.den) {
    return "receiver_right";
  }
  return "receiver_interior";
}

function validatePartition(components, den) {
  const sorted = [...components].sort((left, right) => left.span.lo - right.span.lo || left.span.hi - right.span.hi);
  const defects = [];
  let cursor = 0;
  for (const component of sorted) {
    if (component.span.den !== den) {
      defects.push(`wrong_denominator:${component.span.den}`);
    }
    if (component.span.lo !== cursor) {
      defects.push(`gap_or_overlap:${cursor}->${component.span.lo}`);
    }
    cursor = component.span.hi;
  }
  if (cursor !== den) {
    defects.push(`terminal_gap:${cursor}->${den}`);
  }
  return {
    complete: defects.length === 0,
    defects,
  };
}

function missingComponent(cell) {
  return {
    kind: "boundary",
    span: { ...cell.receiver_terminal_grid_span },
    boundary_side: boundarySide(cell.receiver_terminal_grid_span),
    failed_side: cell.failed_side,
    cell_count: 1,
    coverage_defect_q: qArtifactFromJson(cell.coverage_defect_q),
    source_cover_min_margin_q: qArtifactFromJson(cell.source_cover_min_margin_q),
    reason: cell.reason,
    classification: cell.classification,
    ownership_certified: false,
  };
}

function acceptedComponent(cell) {
  return {
    kind: "certified",
    span: { ...cell.receiver_terminal_grid_span },
    boundary_side: null,
    failed_side: null,
    cell_count: 1,
    coverage_defect_q: qArtifact(q(0n)),
    source_cover_min_margin_q: qArtifact(q(0n)),
    reason: "proof_interval_v6_simple_root_receiver_cover_cell",
    classification: "certified_simple_root_receiver_component",
    ownership_certified: true,
  };
}

function auditRow(cover, atlasRow) {
  const den = cover.receiver_terminal_grid_size;
  const accepted = mergeTerminalComponents((cover.cells ?? []).map(acceptedComponent));
  const boundary = mergeTerminalComponents((cover.missing_receiver_grid_cells ?? []).map(missingComponent));
  const components = [...accepted, ...boundary].sort(
    (left, right) => left.span.lo - right.span.lo || left.span.hi - right.span.hi
  );
  const partition = validatePartition(components, den);
  const interiorMissing = boundary.filter((component) => component.boundary_side === "receiver_interior");
  const leftLeafCount = boundary
    .filter((component) => component.boundary_side === "receiver_left")
    .reduce((sum, component) => sum + component.leaf_count, 0);
  const rightLeafCount = boundary
    .filter((component) => component.boundary_side === "receiver_right")
    .reduce((sum, component) => sum + component.leaf_count, 0);
  const boundaryLeaves = boundary.reduce((sum, component) => sum + component.leaf_count, 0);
  const certifiedLeaves = accepted.reduce((sum, component) => sum + component.leaf_count, 0);
  const fields = {
    complete_receiver_partition: partition.complete,
    all_terminal_spans_owned: false,
    strict_source_coverage_or_contraction: false,
    memory_margins_all_owned_components: false,
    endpoint_ownership_no_double_counting: false,
    simple_root_branch_reuse_exclusion: false,
    non_owned_complement_closed: false,
  };
  return {
    row_id: cover.parent_base_row_id,
    cover_id: cover.row_id,
    ledger: cover.ledger,
    receiver_interval: cover.receiver_interval,
    source_interval: cover.source_interval,
    receiver_terminal_grid_size: den,
    certified_terminal_leaf_count: certifiedLeaves,
    boundary_terminal_leaf_count: boundaryLeaves,
    left_boundary_leaf_count: leftLeafCount,
    right_boundary_leaf_count: rightLeafCount,
    interior_missing_leaf_count: interiorMissing.reduce((sum, component) => sum + component.leaf_count, 0),
    certified_component_count: accepted.length,
    boundary_component_count: boundary.length,
    max_boundary_defect_q: qArtifact(qMax(boundary.map((component) => qFromJson(component.coverage_defect_q)))),
    source_cover_max_terminal_defect_q: atlasRow.source_cover_max_terminal_defect_q,
    receiver_partition_complete: partition.complete,
    receiver_partition_defects: partition.defects,
    required_fields_present: fields,
    pass_rule_satisfied: TARGET_FIELDS.every((field) => fields[field] === true),
    row_consumed: false,
    row_status_after_audit: "split_required",
    closure_blocker:
      "boundary spans are terminal-grid partition components, but source-boundary movement, receiver contraction, endpoint ownership/no-double-counting, branch-reuse exclusion, and non-owned complement closure are absent.",
    components: components.map((component) => ({
      component_id: `${cover.parent_base_row_id}:${componentKind(component)}:${terminalSpanKey(component.span)}`,
      kind: componentKind(component),
      terminal_grid_span: component.span,
      terminal_leaf_count: component.leaf_count,
      receiver_theta_range_q: thetaRangeForSpan(cover, component.span),
      cell_count: component.cell_count,
      coverage_defect_q: component.coverage_defect_q,
      source_cover_min_margin_q: component.source_cover_min_margin_q,
      reason: component.reason,
      classification: component.classification,
      ownership_certified: component.ownership_certified,
    })),
  };
}

function countTrue(rows, field) {
  return rows.filter((row) => row.required_fields_present[field] === true).length;
}

function buildAudit(ledger, atlas, ledgerPath, atlasPath) {
  if (ledger.packet_id !== PACKET_ID || atlas.packet_id !== PACKET_ID) {
    throw new Error("Input packet ids do not match the higher-fold packet target.");
  }
  if (ledger.branch_chart_authorized !== false || atlas.branch_chart_authorized !== false) {
    throw new Error("Refusing to audit a branch-authorized input.");
  }
  if (atlas.schema !== "breather-higher-fold-source-cover-defect-atlas-v1") {
    throw new Error(`Unexpected atlas schema: ${atlas.schema}`);
  }

  const coversByParent = new Map((ledger.simple_root_receiver_covers ?? []).map((cover) => [cover.parent_base_row_id, cover]));
  const rows = [...(atlas.rows ?? [])]
    .sort((left, right) => rowSortKey(left.row_id).localeCompare(rowSortKey(right.row_id)))
    .map((atlasRow) => {
      const cover = coversByParent.get(atlasRow.row_id);
      if (!cover) {
        throw new Error(`Missing v6 receiver cover for ${atlasRow.row_id}`);
      }
      return auditRow(cover, atlasRow);
    });

  if (rows.length !== 42) {
    throw new Error(`Expected 42 regular parent-complement rows; got ${rows.length}`);
  }

  const boundaryLeafCount = rows.reduce((sum, row) => sum + row.boundary_terminal_leaf_count, 0);
  const leftLeafCount = rows.reduce((sum, row) => sum + row.left_boundary_leaf_count, 0);
  const rightLeafCount = rows.reduce((sum, row) => sum + row.right_boundary_leaf_count, 0);
  const interiorLeafCount = rows.reduce((sum, row) => sum + row.interior_missing_leaf_count, 0);

  if (boundaryLeafCount !== atlas.summary.terminal_missing_leaves) {
    throw new Error(`Boundary leaf count mismatch: ${boundaryLeafCount} vs ${atlas.summary.terminal_missing_leaves}`);
  }
  if (leftLeafCount !== atlas.summary.receiver_boundary_span_counts.receiver_left_boundary_missing_leaves) {
    throw new Error("Left boundary leaf count mismatch with source-cover defect atlas.");
  }
  if (rightLeafCount !== atlas.summary.receiver_boundary_span_counts.receiver_right_boundary_missing_leaves) {
    throw new Error("Right boundary leaf count mismatch with source-cover defect atlas.");
  }
  if (interiorLeafCount !== atlas.summary.receiver_boundary_span_counts.receiver_interior_missing_leaves) {
    throw new Error("Interior missing leaf count mismatch with source-cover defect atlas.");
  }

  const fieldCertificationCounts = Object.fromEntries(TARGET_FIELDS.map((field) => [field, countTrue(rows, field)]));
  return {
    schema: "breather-higher-fold-source-cover-boundary-ownership-audit-v1",
    packet_id: PACKET_ID,
    source_ledger: path.basename(ledgerPath),
    source_ledger_sha256: sha256File(ledgerPath),
    source_atlas: path.basename(atlasPath),
    source_atlas_sha256: sha256File(atlasPath),
    source_theorem_target: "source_cover_boundary_ownership_certificate_target.md",
    status: "receiver_terminal_partitions_complete_boundary_ownership_absent",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only exact-rational receiver terminal partition audit for the 42 regular parent-complement rows; no row consumption",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    summary: {
      parent_rows: rows.length,
      complete_receiver_partitions: rows.filter((row) => row.receiver_partition_complete).length,
      rows_with_only_boundary_missing_components: rows.filter((row) => row.interior_missing_leaf_count === 0).length,
      rows_passing_boundary_ownership_rule: rows.filter((row) => row.pass_rule_satisfied).length,
      certified_terminal_leaf_count: rows.reduce((sum, row) => sum + row.certified_terminal_leaf_count, 0),
      boundary_terminal_leaf_count: boundaryLeafCount,
      receiver_left_boundary_missing_leaves: leftLeafCount,
      receiver_right_boundary_missing_leaves: rightLeafCount,
      receiver_interior_missing_leaves: interiorLeafCount,
      boundary_component_count: rows.reduce((sum, row) => sum + row.boundary_component_count, 0),
      certified_component_count: rows.reduce((sum, row) => sum + row.certified_component_count, 0),
      field_certification_counts: fieldCertificationCounts,
      nearest_probe_rows: atlas.summary.nearest_closure_rows.slice(0, 3),
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    pass_rule:
      "This audit certifies only the exact terminal-grid receiver partition field. All boundary components remain unowned until a same-packet proof supplies source-boundary movement, receiver contraction, or endpoint/topology ownership with no double counting.",
    rows,
  };
}

function boolMark(value) {
  return value ? "true" : "false";
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | ${row.certified_component_count} | ${row.certified_terminal_leaf_count} | ${row.boundary_component_count} | ${row.left_boundary_leaf_count} | ${row.right_boundary_leaf_count} | ${row.interior_missing_leaf_count} | ${row.max_boundary_defect_q.display} | ${boolMark(row.receiver_partition_complete)} | ${boolMark(row.pass_rule_satisfied)} |`
    )
    .join("\n");
}

function fieldTable(audit) {
  return TARGET_FIELDS.map(
    (field) => `| \`${field}\` | ${audit.summary.field_certification_counts[field]} / ${audit.summary.parent_rows} |`
  ).join("\n");
}

function probeTable(audit) {
  const rowById = new Map(audit.rows.map((row) => [row.row_id, row]));
  return audit.summary.nearest_probe_rows
    .map((rowId) => {
      const row = rowById.get(rowId);
      return `| \`${row.row_id}\` | ${row.boundary_terminal_leaf_count} | ${row.left_boundary_leaf_count} | ${row.right_boundary_leaf_count} | ${row.max_boundary_defect_q.display} | ${boolMark(row.pass_rule_satisfied)} |`;
    })
    .join("\n");
}

function buildReport(audit) {
  return `# Higher-Fold Source-Cover Boundary Ownership Audit

## Verdict

The higher-fold packet \`${PACKET_ID}\` still fail-closes before branch-chart
authorization. This sidecar imports the proof-interval v6 receiver covers and
the source-cover defect atlas, then proves the exact terminal receiver
partition for the 42 regular parent-complement rows:

- ${audit.summary.complete_receiver_partitions} / ${audit.summary.parent_rows}
  rows have complete terminal-grid receiver partitions;
- ${audit.summary.boundary_terminal_leaf_count} missing terminal leaves are
  boundary components;
- ${audit.summary.receiver_left_boundary_missing_leaves} missing leaves attach
  to the receiver-left boundary and ${audit.summary.receiver_right_boundary_missing_leaves}
  attach to the receiver-right boundary;
- ${audit.summary.receiver_interior_missing_leaves} missing leaves are
  receiver-interior components.

The audit does not consume rows. It proves that the regular-row obstruction is
not an interior receiver-cover hole, but it also proves that boundary ownership
is still absent: ${audit.summary.rows_passing_boundary_ownership_rule} rows
satisfy the finite boundary-ownership pass rule.

| Quantity | Value |
| --- | ---: |
| Parent rows | ${audit.summary.parent_rows} |
| Complete receiver partitions | ${audit.summary.complete_receiver_partitions} |
| Rows with only boundary missing components | ${audit.summary.rows_with_only_boundary_missing_components} |
| Certified terminal leaves | ${audit.summary.certified_terminal_leaf_count} |
| Boundary terminal leaves | ${audit.summary.boundary_terminal_leaf_count} |
| Boundary components | ${audit.summary.boundary_component_count} |
| Certified components | ${audit.summary.certified_component_count} |
| Rows passing boundary ownership rule | ${audit.summary.rows_passing_boundary_ownership_rule} |
| Row consumption count | ${audit.summary.row_consumption_count} |

## Pass-Rule Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(audit)}

## First Probe Rows

These are the smallest boundary burdens from the source-cover defect atlas.
They are now exact one-boundary terminal partition probes, but none is accepted
because ownership and no-double-counting fields are absent.

| Row | Boundary leaves | Left leaves | Right leaves | Max defect | Pass rule satisfied |
| --- | ---: | ---: | ---: | ---: | --- |
${probeTable(audit)}

## Row Partition Summary

| Row | Certified components | Certified leaves | Boundary components | Left leaves | Right leaves | Interior leaves | Max defect | Partition complete | Pass rule satisfied |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
${rowTable(audit.rows)}

## Closure Condition

The next proof object must supply one of the accepted alternatives for each
boundary component: same-packet source-boundary movement, receiver-range
contraction, or endpoint/topology ownership with no double counting and no
simple-root branch reuse. Until those fields are present, every audited regular
parent-complement row remains \`split_required\`.

## Capture Decision

Priority-only. This sidecar upgrades the source-cover defect atlas into an
exact rational terminal receiver-partition audit, but it deliberately leaves
row consumption at 0 because the ownership fields are not certified.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const ledger = readJson(args.ledger);
  const atlas = readJson(args.atlas);
  const audit = buildAudit(ledger, atlas, args.ledger, args.atlas);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, audit, args.pretty);
  writeText(outReport, buildReport(audit));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
