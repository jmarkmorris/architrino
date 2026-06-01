#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_PROBE = `${CERT_DIR}/one_leaf_boundary_movement_probe.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_source_boundary_movement_theorem.${PACKET_ID}.proof-interval-v6.json`;
const OUTPUT_REPORT = `one_leaf_source_boundary_movement_theorem_report.${PACKET_ID}.proof-interval-v6.md`;

const REQUIRED_FIELDS = [
  "one_leaf_probe_input_present",
  "strict_threshold_identity_verified",
  "source_boundary_route_selected",
  "same_packet_source_boundary_variation_present",
  "source_endpoint_tightening_certificate_present",
  "strict_source_boundary_movement_gt_threshold",
  "source_monotonicity_preserved_under_movement",
  "memory_margins_all_owned_components",
  "endpoint_ownership_no_double_counting",
  "simple_root_branch_reuse_exclusion",
  "non_owned_complement_closed",
];

function parseArgs(argv) {
  const args = {
    probe: DEFAULT_PROBE,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--probe") {
      args.probe = argv[++i];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-source-boundary-movement-theorem.mjs [options]

Options:
  --probe PATH   One-leaf boundary movement probe. Defaults to ${DEFAULT_PROBE}.
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

function qCmp(left, right) {
  const lhs = left.num * right.den;
  const rhs = right.num * left.den;
  if (lhs < rhs) return -1;
  if (lhs > rhs) return 1;
  return 0;
}

function qAdd(left, right) {
  return q(left.num * right.den + right.num * left.den, left.den * right.den);
}

function qSub(left, right) {
  return q(left.num * right.den - right.num * left.den, left.den * right.den);
}

function qNeg(value) {
  return q(-value.num, value.den);
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

function fieldCounts(rows) {
  return Object.fromEntries(
    REQUIRED_FIELDS.map((field) => [field, rows.filter((row) => row.required_fields_present[field] === true).length])
  );
}

function boundaryRoute(row) {
  if (row.failed_side === "lo") {
    const sourceBoundary = qFromJson(row.source_inner_range_q.lo);
    const receiverBoundary = qFromJson(row.receiver_range_q.lo);
    return {
      orientation: "lower",
      source_boundary_ref: "source_inner_range_q.lo",
      receiver_boundary_ref: "receiver_range_q.lo",
      current_source_boundary_q: sourceBoundary,
      receiver_boundary_q: receiverBoundary,
      source_movement_direction: "lower_source_inner_boundary",
      strict_target: "source_inner_range_q.lo < receiver_range_q.lo",
      signed_required_movement_q: qNeg(qFromJson(row.required_strict_improvement_q)),
      weak_target_q: receiverBoundary,
      current_defect_q: qSub(sourceBoundary, receiverBoundary),
    };
  }
  if (row.failed_side === "hi") {
    const sourceBoundary = qFromJson(row.source_inner_range_q.hi);
    const receiverBoundary = qFromJson(row.receiver_range_q.hi);
    return {
      orientation: "upper",
      source_boundary_ref: "source_inner_range_q.hi",
      receiver_boundary_ref: "receiver_range_q.hi",
      current_source_boundary_q: sourceBoundary,
      receiver_boundary_q: receiverBoundary,
      source_movement_direction: "raise_source_inner_boundary",
      strict_target: "source_inner_range_q.hi > receiver_range_q.hi",
      signed_required_movement_q: qFromJson(row.required_strict_improvement_q),
      weak_target_q: receiverBoundary,
      current_defect_q: qSub(receiverBoundary, sourceBoundary),
    };
  }
  throw new Error(`Expected one-sided failure for ${row.row_id}; got ${row.failed_side}`);
}

function auditRow(row) {
  const route = boundaryRoute(row);
  const threshold = qFromJson(row.required_strict_improvement_q);
  const identityVerified = qCmp(route.current_defect_q, threshold) === 0;
  const certifiedMovement = q(0n);
  const signedMovementMargin = qNeg(threshold);
  const fields = {
    one_leaf_probe_input_present: true,
    strict_threshold_identity_verified: identityVerified,
    source_boundary_route_selected: true,
    same_packet_source_boundary_variation_present: false,
    source_endpoint_tightening_certificate_present: false,
    strict_source_boundary_movement_gt_threshold: false,
    source_monotonicity_preserved_under_movement: false,
    memory_margins_all_owned_components: false,
    endpoint_ownership_no_double_counting: false,
    simple_root_branch_reuse_exclusion: false,
    non_owned_complement_closed: false,
  };
  const passRuleSatisfied =
    fields.one_leaf_probe_input_present === true &&
    fields.strict_threshold_identity_verified === true &&
    fields.source_boundary_route_selected === true &&
    fields.same_packet_source_boundary_variation_present === true &&
    fields.source_endpoint_tightening_certificate_present === true &&
    fields.strict_source_boundary_movement_gt_threshold === true &&
    fields.source_monotonicity_preserved_under_movement === true &&
    fields.memory_margins_all_owned_components === true &&
    fields.endpoint_ownership_no_double_counting === true &&
    fields.simple_root_branch_reuse_exclusion === true &&
    fields.non_owned_complement_closed === true;

  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    receiver_interval: row.receiver_interval,
    source_interval: row.source_interval,
    failed_side: row.failed_side,
    terminal_grid_span: row.terminal_grid_span,
    source_boundary_ref: route.source_boundary_ref,
    receiver_boundary_ref: route.receiver_boundary_ref,
    source_movement_direction: route.source_movement_direction,
    current_source_boundary_q: qArtifact(route.current_source_boundary_q),
    receiver_boundary_q: qArtifact(route.receiver_boundary_q),
    weak_target_source_boundary_q: qArtifact(route.weak_target_q),
    strict_target: route.strict_target,
    current_defect_q: qArtifact(route.current_defect_q),
    required_strict_improvement_q: qArtifact(threshold),
    signed_required_source_movement_q: qArtifact(route.signed_required_movement_q),
    certified_source_movement_q: qArtifact(certifiedMovement),
    source_movement_margin_after_certified_q: qArtifact(signedMovementMargin),
    strict_threshold_identity_verified: identityVerified,
    required_fields_present: fields,
    theorem_pass_rule_satisfied: passRuleSatisfied,
    row_consumed: false,
    branch_chart_authorized: false,
    theorem_blocker:
      "The one-leaf probe supplies the exact threshold but no same-packet source-boundary variation, endpoint-tightening, or movement-preservation certificate.",
  };
}

function buildTheoremAttempt(probe, probePath) {
  if (probe.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected packet id: ${probe.packet_id}`);
  }
  if (probe.branch_chart_authorized !== false || probe.preledger_pass !== false || probe.updates_live_ledger !== false) {
    throw new Error("Refusing to build a theorem attempt from an authorized or live-updating input.");
  }
  const rows = probe.rows.map(auditRow);
  return {
    schema: "breather-higher-fold-one-leaf-source-boundary-movement-theorem-attempt-v1",
    packet_id: PACKET_ID,
    source_probe: path.basename(probePath),
    source_probe_sha256: sha256File(probePath),
    status: "one_leaf_source_boundary_movement_theorem_fail_closed",
    theorem_target: "One-Leaf Source-Boundary Movement Theorem",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only exact-rational theorem attempt for source-boundary movement on the three one-leaf rows; no row consumption",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    theorem_rule:
      "A source-boundary movement theorem must prove strict same-packet movement beyond the recorded defect, preserve source monotonicity and memory margins, and supply endpoint ownership/no-double-counting, branch-reuse exclusion, and non-owned-complement closure before any parent row is consumed.",
    summary: {
      theorem_rows: rows.length,
      strict_threshold_identities_verified: rows.filter((row) => row.strict_threshold_identity_verified).length,
      same_packet_source_boundary_variations_present: rows.filter(
        (row) => row.required_fields_present.same_packet_source_boundary_variation_present
      ).length,
      source_endpoint_tightening_certificates_present: rows.filter(
        (row) => row.required_fields_present.source_endpoint_tightening_certificate_present
      ).length,
      strict_source_boundary_movements_certified: rows.filter(
        (row) => row.required_fields_present.strict_source_boundary_movement_gt_threshold
      ).length,
      theorem_pass_rows: rows.filter((row) => row.theorem_pass_rule_satisfied).length,
      required_fields_certified_counts: fieldCounts(rows),
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    rows,
  };
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.current_source_boundary_q.display} | ${row.receiver_boundary_q.display} | ${row.required_strict_improvement_q.display} | ${row.signed_required_source_movement_q.display} | ${row.certified_source_movement_q.display} | ${row.theorem_pass_rule_satisfied} |`
    )
    .join("\n");
}

function fieldTable(attempt) {
  return REQUIRED_FIELDS.map(
    (field) => `| \`${field}\` | ${attempt.summary.required_fields_certified_counts[field]} / ${attempt.summary.theorem_rows} |`
  ).join("\n");
}

function buildReport(attempt) {
  return `# Higher-Fold One-Leaf Source-Boundary Movement Theorem Attempt

## Verdict

The source-boundary route still fail-closes for packet \`${PACKET_ID}\`. The
one-leaf probe gives exact rational movement thresholds, and this theorem
attempt verifies that each threshold is exactly the current source-boundary
defect against the relevant receiver boundary. It does not find a same-packet
source-boundary variation, endpoint-tightening certificate, or proof that source
monotonicity and memory margins survive such a movement. Therefore ${attempt.summary.theorem_pass_rows} / ${attempt.summary.theorem_rows} source-boundary movement rows pass, and no row is consumed.

| Quantity | Value |
| --- | ---: |
| Theorem rows | ${attempt.summary.theorem_rows} |
| Strict threshold identities verified | ${attempt.summary.strict_threshold_identities_verified} |
| Same-packet source-boundary variations present | ${attempt.summary.same_packet_source_boundary_variations_present} |
| Source endpoint-tightening certificates present | ${attempt.summary.source_endpoint_tightening_certificates_present} |
| Strict source-boundary movements certified | ${attempt.summary.strict_source_boundary_movements_certified} |
| Theorem pass rows | ${attempt.summary.theorem_pass_rows} |
| Row consumption count | ${attempt.summary.row_consumption_count} |

## Required-Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(attempt)}

## Source-Boundary Rows

| Row | Failed side | Current source boundary | Receiver boundary | Required strict improvement | Signed source movement required | Certified movement | Pass rule |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
${rowTable(attempt.rows)}

## Theorem Form

For a low-side row, the required same-packet theorem is
\`source_inner_range_q.lo < receiver_range_q.lo\`, equivalently a strict
negative movement of the source lower boundary past the recorded defect. For the
high-side row, the required theorem is
\`source_inner_range_q.hi > receiver_range_q.hi\`, equivalently a strict positive
movement of the source upper boundary past the recorded defect. The weak target
is equality with the receiver boundary; equality is not enough because the
simple-root source-cover rule requires strict coverage.

## Capture Decision

Priority-only theorem attempt. This packet converts the one-leaf probe into the
exact source-boundary movement inequalities but leaves the theorem fail-closed.
The missing data is not another receiver partition. It is a same-packet
source-boundary variation or endpoint-tightening certificate, plus preservation
of source monotonicity, memory margins, endpoint ownership/no-double-counting,
branch-reuse exclusion, and non-owned-complement closure.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const probe = readJson(args.probe);
  const attempt = buildTheoremAttempt(probe, args.probe);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, attempt, args.pretty);
  writeText(outReport, buildReport(attempt));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
