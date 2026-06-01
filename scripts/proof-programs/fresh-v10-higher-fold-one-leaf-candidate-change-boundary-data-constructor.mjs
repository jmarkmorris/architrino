#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_PROBE = `${CERT_DIR}/one_leaf_boundary_movement_probe.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_SOURCE_THEOREM = `${CERT_DIR}/one_leaf_source_boundary_movement_theorem.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_RECEIVER_THEOREM = `${CERT_DIR}/one_leaf_receiver_range_contraction_theorem.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_candidate_change_boundary_data.${PACKET_ID}.proof-interval-v6.json`;
const OUTPUT_REPORT = `one_leaf_candidate_change_boundary_data_report.${PACKET_ID}.proof-interval-v6.md`;

const REQUIRED_FIELDS = [
  "one_leaf_probe_input_present",
  "source_theorem_input_present",
  "receiver_theorem_input_present",
  "strict_threshold_identities_verified",
  "candidate_change_boundary_target_declared",
  "combined_boundary_opening_condition_declared",
  "same_packet_candidate_change_data_present",
  "strict_combined_boundary_opening_gt_threshold",
  "source_monotonicity_preserved_under_candidate_change",
  "receiver_monotonicity_preserved_under_candidate_change",
  "memory_margins_all_owned_components",
  "endpoint_ownership_no_double_counting",
  "simple_root_branch_reuse_exclusion",
  "non_owned_complement_closed",
];

function parseArgs(argv) {
  const args = {
    probe: DEFAULT_PROBE,
    sourceTheorem: DEFAULT_SOURCE_THEOREM,
    receiverTheorem: DEFAULT_RECEIVER_THEOREM,
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
    } else if (arg === "--source-theorem") {
      args.sourceTheorem = argv[++i];
    } else if (arg === "--receiver-theorem") {
      args.receiverTheorem = argv[++i];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-candidate-change-boundary-data-constructor.mjs [options]

Options:
  --probe PATH            One-leaf boundary movement probe. Defaults to ${DEFAULT_PROBE}.
  --source-theorem PATH   One-leaf source-boundary theorem attempt. Defaults to ${DEFAULT_SOURCE_THEOREM}.
  --receiver-theorem PATH One-leaf receiver-range theorem attempt. Defaults to ${DEFAULT_RECEIVER_THEOREM}.
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

function fieldCounts(rows) {
  return Object.fromEntries(
    REQUIRED_FIELDS.map((field) => [field, rows.filter((row) => row.required_fields_present[field] === true).length])
  );
}

function rowById(input, rowId, label) {
  const row = (input.rows ?? []).find((candidate) => candidate.row_id === rowId);
  if (!row) {
    throw new Error(`Missing ${label} row for ${rowId}`);
  }
  return row;
}

function movementModel(failedSide) {
  if (failedSide === "lo") {
    return {
      boundary_side: "lower",
      source_shift_symbol: "sigma_source_lower",
      receiver_shift_symbol: "rho_receiver_lower",
      favorable_source_action: "lower_source_inner_boundary",
      favorable_receiver_action: "raise_receiver_lower_boundary",
      source_boundary_ref: "source_inner_range_q.lo",
      receiver_boundary_ref: "receiver_range_q.lo",
      strict_boundary_condition:
        "(source_inner_range_q.lo - sigma_source_lower) < (receiver_range_q.lo + rho_receiver_lower)",
    };
  }
  if (failedSide === "hi") {
    return {
      boundary_side: "upper",
      source_shift_symbol: "sigma_source_upper",
      receiver_shift_symbol: "rho_receiver_upper",
      favorable_source_action: "raise_source_inner_boundary",
      favorable_receiver_action: "lower_receiver_upper_boundary",
      source_boundary_ref: "source_inner_range_q.hi",
      receiver_boundary_ref: "receiver_range_q.hi",
      strict_boundary_condition:
        "(source_inner_range_q.hi + sigma_source_upper) > (receiver_range_q.hi - rho_receiver_upper)",
    };
  }
  throw new Error(`Expected one-sided failure; got ${failedSide}`);
}

function auditRow(probe, sourceTheorem, receiverTheorem, probeRow) {
  const sourceRow = rowById(sourceTheorem, probeRow.row_id, "source theorem");
  const receiverRow = rowById(receiverTheorem, probeRow.row_id, "receiver theorem");
  const threshold = qFromJson(probeRow.required_strict_improvement_q);
  const sourceThreshold = qFromJson(sourceRow.required_strict_improvement_q);
  const receiverThreshold = qFromJson(receiverRow.required_strict_improvement_q);
  const thresholdIdentitiesVerified =
    sourceRow.strict_threshold_identity_verified === true &&
    receiverRow.strict_threshold_identity_verified === true &&
    qCmp(threshold, sourceThreshold) === 0 &&
    qCmp(threshold, receiverThreshold) === 0;
  const model = movementModel(probeRow.failed_side);
  const currentCandidateSourceShift = q(0n);
  const currentCandidateReceiverShift = q(0n);
  const currentCombinedOpening = q(0n);
  const currentCombinedMargin = qNeg(threshold);
  const fields = {
    one_leaf_probe_input_present: true,
    source_theorem_input_present: true,
    receiver_theorem_input_present: true,
    strict_threshold_identities_verified: thresholdIdentitiesVerified,
    candidate_change_boundary_target_declared: true,
    combined_boundary_opening_condition_declared: true,
    same_packet_candidate_change_data_present: false,
    strict_combined_boundary_opening_gt_threshold: false,
    source_monotonicity_preserved_under_candidate_change: false,
    receiver_monotonicity_preserved_under_candidate_change: false,
    memory_margins_all_owned_components: false,
    endpoint_ownership_no_double_counting: false,
    simple_root_branch_reuse_exclusion: false,
    non_owned_complement_closed: false,
  };
  const passRuleSatisfied =
    fields.one_leaf_probe_input_present === true &&
    fields.source_theorem_input_present === true &&
    fields.receiver_theorem_input_present === true &&
    fields.strict_threshold_identities_verified === true &&
    fields.candidate_change_boundary_target_declared === true &&
    fields.combined_boundary_opening_condition_declared === true &&
    fields.same_packet_candidate_change_data_present === true &&
    fields.strict_combined_boundary_opening_gt_threshold === true &&
    fields.source_monotonicity_preserved_under_candidate_change === true &&
    fields.receiver_monotonicity_preserved_under_candidate_change === true &&
    fields.memory_margins_all_owned_components === true &&
    fields.endpoint_ownership_no_double_counting === true &&
    fields.simple_root_branch_reuse_exclusion === true &&
    fields.non_owned_complement_closed === true;

  return {
    row_id: probeRow.row_id,
    cover_id: probeRow.cover_id,
    ledger: probeRow.ledger,
    receiver_interval: probeRow.receiver_interval,
    source_interval: probeRow.source_interval,
    failed_side: probeRow.failed_side,
    boundary_side: model.boundary_side,
    terminal_grid_span: probeRow.terminal_grid_span,
    ownership_component_id: probeRow.ownership_component_id,
    source_boundary_ref: model.source_boundary_ref,
    receiver_boundary_ref: model.receiver_boundary_ref,
    current_source_boundary_q:
      probeRow.failed_side === "lo" ? sourceRow.current_source_boundary_q : sourceRow.current_source_boundary_q,
    current_receiver_boundary_q:
      probeRow.failed_side === "lo" ? receiverRow.current_receiver_boundary_q : receiverRow.current_receiver_boundary_q,
    required_strict_improvement_q: qArtifact(threshold),
    candidate_change_variables: {
      favorable_source_shift: {
        symbol: model.source_shift_symbol,
        action: model.favorable_source_action,
        meaning:
          probeRow.failed_side === "lo"
            ? "nonnegative lowering magnitude applied to the source inner lower boundary"
            : "nonnegative raising magnitude applied to the source inner upper boundary",
      },
      favorable_receiver_shift: {
        symbol: model.receiver_shift_symbol,
        action: model.favorable_receiver_action,
        meaning:
          probeRow.failed_side === "lo"
            ? "nonnegative raising magnitude applied to the receiver lower boundary"
            : "nonnegative lowering magnitude applied to the receiver upper boundary",
      },
    },
    combined_boundary_opening_condition: {
      strict_boundary_condition: model.strict_boundary_condition,
      combined_shift_condition: `${model.source_shift_symbol} + ${model.receiver_shift_symbol} > required_strict_improvement_q`,
      required_combined_opening_q: qArtifact(threshold),
      weak_equality_is_insufficient: true,
    },
    current_candidate_change_data: {
      same_packet_candidate_change_data_present: false,
      candidate_source_shift_q: qArtifact(currentCandidateSourceShift),
      candidate_receiver_shift_q: qArtifact(currentCandidateReceiverShift),
      combined_boundary_opening_q: qArtifact(currentCombinedOpening),
      combined_boundary_opening_margin_q: qArtifact(currentCombinedMargin),
    },
    source_theorem_row_status: {
      strict_threshold_identity_verified: sourceRow.strict_threshold_identity_verified,
      theorem_pass_rule_satisfied: sourceRow.theorem_pass_rule_satisfied,
      theorem_blocker: sourceRow.theorem_blocker,
    },
    receiver_theorem_row_status: {
      strict_threshold_identity_verified: receiverRow.strict_threshold_identity_verified,
      theorem_pass_rule_satisfied: receiverRow.theorem_pass_rule_satisfied,
      theorem_blocker: receiverRow.theorem_blocker,
    },
    required_fields_present: fields,
    constructor_pass_rule_satisfied: passRuleSatisfied,
    row_consumed: false,
    branch_chart_authorized: false,
    constructor_blocker:
      "The combined boundary-opening target is exact, but the current packet contains no same-packet candidate-change data assigning positive source or receiver boundary shifts.",
  };
}

function buildConstructor(probe, sourceTheorem, receiverTheorem, probePath, sourceTheoremPath, receiverTheoremPath) {
  for (const input of [probe, sourceTheorem, receiverTheorem]) {
    if (input.packet_id !== PACKET_ID) {
      throw new Error(`Unexpected packet id: ${input.packet_id}`);
    }
    if (input.branch_chart_authorized !== false || input.preledger_pass !== false || input.updates_live_ledger !== false) {
      throw new Error("Refusing to build a constructor from an authorized or live-updating input.");
    }
  }
  const rows = probe.rows.map((row) => auditRow(probe, sourceTheorem, receiverTheorem, row));
  return {
    schema: "breather-higher-fold-one-leaf-candidate-change-boundary-data-constructor-v1",
    packet_id: PACKET_ID,
    source_probe: path.basename(probePath),
    source_probe_sha256: sha256File(probePath),
    source_source_boundary_theorem: path.basename(sourceTheoremPath),
    source_source_boundary_theorem_sha256: sha256File(sourceTheoremPath),
    source_receiver_range_theorem: path.basename(receiverTheoremPath),
    source_receiver_range_theorem_sha256: sha256File(receiverTheoremPath),
    status: "one_leaf_candidate_change_boundary_data_fail_closed",
    theorem_target: "One-Leaf Candidate-Change Boundary-Data Constructor",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only exact-rational constructor for candidate-change boundary-opening targets on the three one-leaf rows; no row consumption",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    constructor_rule:
      "For each one-leaf row, a candidate-change boundary datum must assign nonnegative favorable source and receiver boundary shifts whose sum is strictly greater than the exact recorded defect, then prove source and receiver monotonicity preservation, all-owned memory margins, endpoint ownership/no-double-counting, simple-root branch-reuse exclusion, and non-owned-complement closure before any row is consumed.",
    summary: {
      constructor_rows: rows.length,
      strict_threshold_identities_verified: rows.filter(
        (row) => row.required_fields_present.strict_threshold_identities_verified
      ).length,
      candidate_change_boundary_targets_declared: rows.filter(
        (row) => row.required_fields_present.candidate_change_boundary_target_declared
      ).length,
      combined_boundary_opening_conditions_declared: rows.filter(
        (row) => row.required_fields_present.combined_boundary_opening_condition_declared
      ).length,
      same_packet_candidate_change_data_present: rows.filter(
        (row) => row.required_fields_present.same_packet_candidate_change_data_present
      ).length,
      strict_combined_boundary_openings_certified: rows.filter(
        (row) => row.required_fields_present.strict_combined_boundary_opening_gt_threshold
      ).length,
      constructor_pass_rows: rows.filter((row) => row.constructor_pass_rule_satisfied).length,
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
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_strict_improvement_q.display} | \`${row.combined_boundary_opening_condition.combined_shift_condition}\` | ${row.current_candidate_change_data.combined_boundary_opening_q.display} | ${row.current_candidate_change_data.combined_boundary_opening_margin_q.display} | ${row.constructor_pass_rule_satisfied} |`
    )
    .join("\n");
}

function fieldTable(constructor) {
  return REQUIRED_FIELDS.map(
    (field) =>
      `| \`${field}\` | ${constructor.summary.required_fields_certified_counts[field]} / ${constructor.summary.constructor_rows} |`
  ).join("\n");
}

function buildReport(constructor) {
  return `# Higher-Fold One-Leaf Candidate-Change Boundary-Data Constructor

## Verdict

The candidate-change boundary-data route still fail-closes for packet
\`${PACKET_ID}\`. The source-boundary and receiver-range theorem attempts prove
the same exact one-leaf defects, so the combined candidate-change target is now
finite and explicit: for each row, a favorable source-boundary shift plus a
favorable receiver-boundary shift must be strictly greater than the recorded
defect. Current same-packet candidate-change data assigns no such shifts.
Therefore ${constructor.summary.constructor_pass_rows} / ${constructor.summary.constructor_rows} candidate-change boundary-data rows pass, and no row is consumed.

| Quantity | Value |
| --- | ---: |
| Constructor rows | ${constructor.summary.constructor_rows} |
| Strict threshold identities verified | ${constructor.summary.strict_threshold_identities_verified} |
| Candidate-change boundary targets declared | ${constructor.summary.candidate_change_boundary_targets_declared} |
| Combined boundary-opening conditions declared | ${constructor.summary.combined_boundary_opening_conditions_declared} |
| Same-packet candidate-change data present | ${constructor.summary.same_packet_candidate_change_data_present} |
| Strict combined boundary openings certified | ${constructor.summary.strict_combined_boundary_openings_certified} |
| Constructor pass rows | ${constructor.summary.constructor_pass_rows} |
| Row consumption count | ${constructor.summary.row_consumption_count} |

## Required-Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(constructor)}

## Candidate-Change Rows

| Row | Failed side | Required combined opening | Combined condition | Current opening | Current margin | Pass rule |
| --- | --- | ---: | --- | ---: | ---: | --- |
${rowTable(constructor.rows)}

## Constructor Form

For low-side rows, a candidate change must satisfy
\`(source_inner_range_q.lo - sigma_source_lower) < (receiver_range_q.lo + rho_receiver_lower)\`,
or equivalently
\`sigma_source_lower + rho_receiver_lower > required_strict_improvement_q\`.
For the high-side row, it must satisfy
\`(source_inner_range_q.hi + sigma_source_upper) > (receiver_range_q.hi - rho_receiver_upper)\`,
or equivalently
\`sigma_source_upper + rho_receiver_upper > required_strict_improvement_q\`.
Equality remains insufficient because the simple-root source-cover rule requires
strict coverage.

## Capture Decision

Priority-only constructor. This packet turns the separate source-boundary and
receiver-range theorem attempts into one combined candidate-change boundary
target. It does not certify a candidate change: the missing data is an actual
same-packet deformation or endpoint-tightening certificate assigning positive
boundary shifts, plus preservation of source and receiver monotonicity, memory
margins, endpoint ownership/no-double-counting, branch-reuse exclusion, and
non-owned-complement closure.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const probe = readJson(args.probe);
  const sourceTheorem = readJson(args.sourceTheorem);
  const receiverTheorem = readJson(args.receiverTheorem);
  const constructor = buildConstructor(
    probe,
    sourceTheorem,
    receiverTheorem,
    args.probe,
    args.sourceTheorem,
    args.receiverTheorem
  );
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, constructor, args.pretty);
  writeText(outReport, buildReport(constructor));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
