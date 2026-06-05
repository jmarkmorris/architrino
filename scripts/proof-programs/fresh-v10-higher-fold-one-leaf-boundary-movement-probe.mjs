#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_ATLAS = `${CERT_DIR}/source_cover_defect_atlas.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OWNERSHIP_AUDIT = `${CERT_DIR}/source_cover_boundary_ownership_audit.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_boundary_movement_probe.${PACKET_ID}.proof-interval-v6.json`;
const OUTPUT_REPORT = `one_leaf_boundary_movement_probe_report.${PACKET_ID}.proof-interval-v6.md`;

const PROBE_ROWS = ["R_w_A04_A03", "R_u_A10_A09", "R_u_A07_A06"];
const REQUIRED_FIELDS = [
  "one_leaf_probe_selected",
  "complete_receiver_partition",
  "single_boundary_leaf",
  "monotone_receiver_certificate_present",
  "boundary_candidate_memory_depth_floor_positive",
  "source_boundary_movement_certified",
  "receiver_range_contraction_certified",
  "memory_margins_all_owned_components",
  "endpoint_ownership_no_double_counting",
  "simple_root_branch_reuse_exclusion",
  "non_owned_complement_closed",
];

function parseArgs(argv) {
  const args = {
    ledger: DEFAULT_LEDGER,
    atlas: DEFAULT_ATLAS,
    ownershipAudit: DEFAULT_OWNERSHIP_AUDIT,
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
    } else if (arg === "--atlas") {
      args.atlas = argv[++i];
    } else if (arg === "--ownership-audit") {
      args.ownershipAudit = argv[++i];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-boundary-movement-probe.mjs [options]

Options:
  --ledger PATH          Higher-fold proof-interval v6 ledger. Defaults to ${DEFAULT_LEDGER}.
  --atlas PATH           Higher-fold source-cover defect atlas. Defaults to ${DEFAULT_ATLAS}.
  --ownership-audit PATH Higher-fold boundary ownership audit. Defaults to ${DEFAULT_OWNERSHIP_AUDIT}.
  --out-dir PATH         Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty               Pretty-print JSON artifact.
  --help                 Show this help.`);
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

function fieldCounts(rows) {
  return Object.fromEntries(
    REQUIRED_FIELDS.map((field) => [field, rows.filter((row) => row.required_fields_present[field] === true).length])
  );
}

function movementKind(failedSide) {
  if (failedSide === "lo") {
    return {
      side: "lower",
      source_movement_field: "source_lower_boundary_moved_lower",
      receiver_contraction_field: "receiver_lower_boundary_contracted_higher",
      source_boundary: "source_inner_range_q.lo",
      receiver_boundary: "receiver_range_q.lo",
      margin_field: "source_cover_lo_margin_q",
      source_action: "lower_source_inner_boundary",
      receiver_action: "raise_receiver_lower_boundary",
    };
  }
  if (failedSide === "hi") {
    return {
      side: "upper",
      source_movement_field: "source_upper_boundary_moved_higher",
      receiver_contraction_field: "receiver_upper_boundary_contracted_lower",
      source_boundary: "source_inner_range_q.hi",
      receiver_boundary: "receiver_range_q.hi",
      margin_field: "source_cover_hi_margin_q",
      source_action: "raise_source_inner_boundary",
      receiver_action: "lower_receiver_upper_boundary",
    };
  }
  throw new Error(`Expected one-sided failed_side for probe row; got ${failedSide}`);
}

function findProbeCover(ledger, rowId) {
  const cover = (ledger.simple_root_receiver_covers ?? []).find((candidate) => candidate.parent_base_row_id === rowId);
  if (!cover) {
    throw new Error(`Missing receiver cover for ${rowId}`);
  }
  if (cover.missing_terminal_leaf_count !== 1 || (cover.missing_receiver_grid_cells ?? []).length !== 1) {
    throw new Error(`Expected one missing terminal leaf for ${rowId}`);
  }
  return cover;
}

function findOwnershipRow(ownershipAudit, rowId) {
  const row = (ownershipAudit.rows ?? []).find((candidate) => candidate.row_id === rowId);
  if (!row) {
    throw new Error(`Missing ownership audit row for ${rowId}`);
  }
  return row;
}

function findAtlasRow(atlas, rowId) {
  const row = (atlas.rows ?? []).find((candidate) => candidate.row_id === rowId);
  if (!row) {
    throw new Error(`Missing defect-atlas row for ${rowId}`);
  }
  return row;
}

function positiveQ(value) {
  return qCmp(qFromJson(value), q(0n)) > 0;
}

function auditProbeRow(ledger, atlas, ownershipAudit, rowId) {
  const cover = findProbeCover(ledger, rowId);
  const parentRow = (ledger.rows ?? []).find((candidate) => candidate.row_id === rowId);
  if (!parentRow) {
    throw new Error(`Missing parent row for ${rowId}`);
  }
  const atlasRow = findAtlasRow(atlas, rowId);
  const ownershipRow = findOwnershipRow(ownershipAudit, rowId);
  const missing = cover.missing_receiver_grid_cells[0];
  const movement = movementKind(missing.failed_side);
  const defect = qFromJson(missing.coverage_defect_q);
  const boundaryComponent = ownershipRow.components.find((component) => component.kind.endsWith("_boundary_unowned"));
  if (!boundaryComponent) {
    throw new Error(`Missing boundary component for ${rowId}`);
  }
  if (boundaryComponent.terminal_leaf_count !== 1) {
    throw new Error(`Expected one-leaf boundary component for ${rowId}`);
  }

  const fields = {
    one_leaf_probe_selected: true,
    complete_receiver_partition: ownershipRow.receiver_partition_complete === true,
    single_boundary_leaf: true,
    monotone_receiver_certificate_present: missing.monotone_lookup_status === "receiver_monotone_certificate_present",
    boundary_candidate_memory_depth_floor_positive: positiveQ(missing.memory_depth_range_q.lo),
    source_boundary_movement_certified: false,
    receiver_range_contraction_certified: false,
    memory_margins_all_owned_components: false,
    endpoint_ownership_no_double_counting: false,
    simple_root_branch_reuse_exclusion: false,
    non_owned_complement_closed: false,
  };

  return {
    row_id: rowId,
    cover_id: cover.row_id,
    ledger: cover.ledger,
    receiver_interval: cover.receiver_interval,
    source_interval: cover.source_interval,
    parent_status: parentRow.status,
    parent_failure_code: parentRow.failure_code,
    parent_receiver_range_q: parentRow.receiver_range_q,
    parent_source_range_q: parentRow.source_range_q,
    parent_receiver_monotone_floor_display: parentRow.receiver_monotone_floor ?? null,
    parent_proof_fields_present: {
      memory_depth_range: parentRow.memory_depth_range != null,
      gamma_tau_q: parentRow.gamma_tau_q != null,
      gamma_h_q: parentRow.gamma_h_q != null,
      gamma_sign_q: parentRow.gamma_sign_q != null,
      monotone_floor_q: parentRow.monotone_floor_q != null,
      jacobian_floor_q: parentRow.jacobian_floor_q != null,
      root_count_bound: parentRow.root_count_bound != null,
      simple_root_ref: parentRow.simple_root_ref != null,
      source_coverage_gap_q: parentRow.source_coverage_gap_q != null,
    },
    failed_side: missing.failed_side,
    movement_side: movement.side,
    terminal_grid_span: { ...missing.receiver_terminal_grid_span },
    receiver_cell_path: missing.receiver_cell_path,
    receiver_theta_range_q: missing.receiver_theta_range_q,
    receiver_range_q: {
      lo: qArtifactFromJson(missing.receiver_range_q.lo),
      hi: qArtifactFromJson(missing.receiver_range_q.hi),
    },
    source_inner_range_q: {
      lo: qArtifactFromJson(missing.source_inner_range_q.lo),
      hi: qArtifactFromJson(missing.source_inner_range_q.hi),
    },
    current_failed_margin_q: qArtifactFromJson(missing[movement.margin_field]),
    required_strict_improvement_q: qArtifact(defect),
    required_source_boundary_movement: {
      action: movement.source_action,
      field: movement.source_movement_field,
      boundary_ref: movement.source_boundary,
      threshold_q: qArtifact(defect),
      strict: true,
      certified: false,
    },
    required_receiver_contraction: {
      action: movement.receiver_action,
      field: movement.receiver_contraction_field,
      boundary_ref: movement.receiver_boundary,
      threshold_q: qArtifact(defect),
      strict: true,
      certified: false,
    },
    endpoint_topology_ownership: {
      certified: false,
      blocker: "no endpoint/topology ownership certificate is present for this positive-width terminal component",
    },
    memory_depth_range_q: {
      lo: qArtifactFromJson(missing.memory_depth_range_q.lo),
      hi: qArtifactFromJson(missing.memory_depth_range_q.hi),
    },
    gamma_tau_q: qArtifactFromJson(missing.gamma_tau_q),
    gamma_h_q: qArtifactFromJson(missing.gamma_h_q),
    monotone_lookup_status: missing.monotone_lookup_status,
    atlas_defect_q: atlasRow.source_cover_max_terminal_defect_q,
    ownership_component_id: boundaryComponent.component_id,
    required_fields_present: fields,
    closure_alternative_certified:
      fields.source_boundary_movement_certified === true || fields.receiver_range_contraction_certified === true,
    pass_rule_satisfied:
      fields.one_leaf_probe_selected === true &&
      fields.complete_receiver_partition === true &&
      fields.single_boundary_leaf === true &&
      fields.monotone_receiver_certificate_present === true &&
      fields.boundary_candidate_memory_depth_floor_positive === true &&
      (fields.source_boundary_movement_certified === true || fields.receiver_range_contraction_certified === true) &&
      fields.memory_margins_all_owned_components === true &&
      fields.endpoint_ownership_no_double_counting === true &&
      fields.simple_root_branch_reuse_exclusion === true &&
      fields.non_owned_complement_closed === true,
    row_consumed: false,
    branch_chart_authorized: false,
    closure_blocker:
      "existing same-packet data records the exact one-leaf boundary defect, monotone receiver data, and positive memory-depth margin, but contains no source-boundary movement certificate, receiver-contraction certificate, or endpoint/topology ownership certificate.",
  };
}

function buildProbe(ledger, atlas, ownershipAudit, ledgerPath, atlasPath, ownershipAuditPath) {
  for (const input of [ledger, atlas, ownershipAudit]) {
    if (input.packet_id !== PACKET_ID) {
      throw new Error(`Unexpected packet id: ${input.packet_id}`);
    }
    if (input.branch_chart_authorized !== false) {
      throw new Error("Refusing to build a probe from a branch-authorized input.");
    }
  }

  const rows = PROBE_ROWS.map((rowId) => auditProbeRow(ledger, atlas, ownershipAudit, rowId));
  return {
    schema: "breather-higher-fold-one-leaf-boundary-movement-probe-v1",
    packet_id: PACKET_ID,
    source_ledger: path.basename(ledgerPath),
    source_ledger_sha256: sha256File(ledgerPath),
    source_atlas: path.basename(atlasPath),
    source_atlas_sha256: sha256File(atlasPath),
    source_ownership_audit: path.basename(ownershipAuditPath),
    source_ownership_audit_sha256: sha256File(ownershipAuditPath),
    status: "one_leaf_boundary_movement_probe_fail_closed",
    theorem_target: "One-Leaf Source-Boundary Movement Or Receiver-Contraction Probe",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only exact-rational probe for the three one-leaf regular parent-complement boundary components; no row consumption",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    summary: {
      probe_rows: rows.length,
      one_leaf_probe_selected: rows.filter((row) => row.required_fields_present.one_leaf_probe_selected).length,
      single_boundary_leaf_rows: rows.filter((row) => row.required_fields_present.single_boundary_leaf).length,
      failed_side_counts: countBy(rows, (row) => row.failed_side),
      receiver_partitions_complete: rows.filter((row) => row.required_fields_present.complete_receiver_partition).length,
      monotone_receiver_certificates_present: rows.filter(
        (row) => row.required_fields_present.monotone_receiver_certificate_present
      ).length,
      positive_boundary_candidate_memory_depth_floors: rows.filter(
        (row) => row.required_fields_present.boundary_candidate_memory_depth_floor_positive
      ).length,
      source_boundary_movement_certified: rows.filter(
        (row) => row.required_fields_present.source_boundary_movement_certified
      ).length,
      receiver_range_contraction_certified: rows.filter(
        (row) => row.required_fields_present.receiver_range_contraction_certified
      ).length,
      memory_margins_all_owned_components: rows.filter(
        (row) => row.required_fields_present.memory_margins_all_owned_components
      ).length,
      endpoint_ownership_no_double_counting: rows.filter(
        (row) => row.required_fields_present.endpoint_ownership_no_double_counting
      ).length,
      closure_alternatives_certified: rows.filter((row) => row.closure_alternative_certified).length,
      rows_passing_probe_rule: rows.filter((row) => row.pass_rule_satisfied).length,
      required_fields_certified_counts: fieldCounts(rows),
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    pass_rule:
      "A one-leaf boundary probe row may be consumed only after the exact boundary component has strict source-boundary movement or strict receiver contraction, plus endpoint/topology ownership, no-double-counting, simple-root branch-reuse exclusion, and non-owned-complement closure.",
    rows,
  };
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.terminal_grid_span.lo}/${row.terminal_grid_span.den}..${row.terminal_grid_span.hi}/${row.terminal_grid_span.den} | ${row.required_strict_improvement_q.display} | ${row.required_source_boundary_movement.action} | ${row.required_receiver_contraction.action} | ${row.required_fields_present.monotone_receiver_certificate_present} | ${row.required_fields_present.boundary_candidate_memory_depth_floor_positive} | ${row.pass_rule_satisfied} |`
    )
    .join("\n");
}

function fieldTable(probe) {
  return REQUIRED_FIELDS.map(
    (field) => `| \`${field}\` | ${probe.summary.required_fields_certified_counts[field]} / ${probe.summary.probe_rows} |`
  ).join("\n");
}

function buildReport(probe) {
  return `# Higher-Fold One-Leaf Boundary Movement Probe

## Verdict

The higher-fold packet \`${PACKET_ID}\` still fail-closes before branch-chart
authorization. This sidecar audits the three smallest regular
parent-complement boundary components from the source-cover defect atlas:
\`${PROBE_ROWS.join("`, `")}\`.

Each probe has exactly one missing terminal leaf on the receiver-left boundary.
The existing data proves the receiver partition and records receiver
monotonicity lookup plus a positive boundary-candidate memory-depth floor for
all three rows. It does not prove all-owned-component memory margins,
source-boundary movement, receiver contraction, endpoint/topology ownership,
no-double-counting, simple-root branch-reuse exclusion, or non-owned complement
closure. Therefore ${probe.summary.rows_passing_probe_rule} / ${probe.summary.probe_rows}
probe rows pass, and no row is consumed.

| Quantity | Value |
| --- | ---: |
| Probe rows | ${probe.summary.probe_rows} |
| Selected one-leaf probes | ${probe.summary.one_leaf_probe_selected} |
| Single-boundary-leaf rows | ${probe.summary.single_boundary_leaf_rows} |
| Receiver partitions complete | ${probe.summary.receiver_partitions_complete} |
| Monotone receiver certificates present | ${probe.summary.monotone_receiver_certificates_present} |
| Positive boundary-candidate memory-depth floors | ${probe.summary.positive_boundary_candidate_memory_depth_floors} |
| Source-boundary movement certified | ${probe.summary.source_boundary_movement_certified} |
| Receiver-range contraction certified | ${probe.summary.receiver_range_contraction_certified} |
| All-owned-component memory margins certified | ${probe.summary.memory_margins_all_owned_components} |
| Endpoint ownership/no-double-counting certified | ${probe.summary.endpoint_ownership_no_double_counting} |
| Closure alternatives certified | ${probe.summary.closure_alternatives_certified} |
| Rows passing probe rule | ${probe.summary.rows_passing_probe_rule} |
| Row consumption count | ${probe.summary.row_consumption_count} |

## Required-Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(probe)}

## Probe Rows

| Row | Failed side | Terminal span | Strict improvement threshold | Source-boundary route | Receiver-contraction route | Monotone data | Memory floor | Pass rule |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- |
${rowTable(probe.rows)}

## Closure Condition

For the two low-side failures, a future certificate must strictly lower the
source-inner lower boundary by more than the recorded threshold or strictly
raise the receiver lower boundary by more than that threshold. For the high-side
failure, a future certificate must strictly raise the source-inner upper
boundary or strictly lower the receiver upper boundary by more than the recorded
threshold. In all cases, endpoint/topology ownership, no-double-counting,
simple-root branch-reuse exclusion, and non-owned complement closure are still
required before any regular parent row may become \`simple_root\`.

## Capture Decision

Priority-only. This sidecar isolates the smallest regular-row movement
thresholds but deliberately leaves row consumption at 0 because the movement,
contraction, and ownership fields are absent.
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
  const ownershipAudit = readJson(args.ownershipAudit);
  const probe = buildProbe(ledger, atlas, ownershipAudit, args.ledger, args.atlas, args.ownershipAudit);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, probe, args.pretty);
  writeText(outReport, buildReport(probe));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
