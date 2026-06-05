#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ONE_LEAF = `${CERT_DIR}/one_leaf_candidate_change_boundary_data.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_FOLD_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_input.nonlinear-v0.json`;
const DEFAULT_FOLD_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_result.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_fold_coordinate_collocation_candidate_change_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `one_leaf_fold_coordinate_collocation_candidate_change_theorem_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SCREEN_FIELDS = [
  "one_leaf_candidate_change_boundary_data_input_present",
  "fold_coordinate_collocation_input_present",
  "fold_coordinate_collocation_result_present",
  "row_identity_matched",
  "candidate_change_boundary_target_declared",
  "combined_boundary_opening_condition_declared",
  "strict_threshold_identity_inherited_from_constructor",
  "fold_coordinate_symbol_mapping_matched",
  "fold_coordinate_screen_witness_present",
  "fold_coordinate_screen_combined_opening_gt_threshold",
  "finite_tangent_matrix_status_feasible",
  "declared_structural_rows_satisfied_with_tolerance",
];

const PROOF_REQUIRED_FIELDS = [
  "same_packet_candidate_change_data_present",
  "strict_combined_boundary_opening_gt_threshold",
  "source_monotonicity_preserved_under_candidate_change",
  "receiver_monotonicity_preserved_under_candidate_change",
  "memory_margins_all_owned_components",
  "endpoint_ownership_no_double_counting",
  "simple_root_branch_reuse_exclusion",
  "non_owned_complement_closed",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_preledger_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
];

const ROW_AUDIT_FIELDS = [...SCREEN_FIELDS, ...PROOF_REQUIRED_FIELDS];

function parseArgs(argv) {
  const args = {
    oneLeaf: DEFAULT_ONE_LEAF,
    foldInput: DEFAULT_FOLD_INPUT,
    foldResult: DEFAULT_FOLD_RESULT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--one-leaf") {
      args.oneLeaf = argv[++i];
    } else if (arg === "--fold-input") {
      args.foldInput = argv[++i];
    } else if (arg === "--fold-result") {
      args.foldResult = argv[++i];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-fold-coordinate-candidate-change-theorem.mjs [options]

Options:
  --one-leaf PATH     One-leaf candidate-change boundary-data JSON. Defaults to ${DEFAULT_ONE_LEAF}.
  --fold-input PATH   Nonlinear fold-coordinate collocation input JSON. Defaults to ${DEFAULT_FOLD_INPUT}.
  --fold-result PATH  Nonlinear fold-coordinate collocation scanner result JSON. Defaults to ${DEFAULT_FOLD_RESULT}.
  --out-dir PATH      Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty            Pretty-print JSON artifact.
  --help              Show this help.`);
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

function qFromDecimal(value, label) {
  if (!Number.isFinite(value)) {
    throw new Error(`Expected finite decimal ${label}, got ${value}`);
  }
  const text = value.toString();
  if (text.includes("e") || text.includes("E")) {
    throw new Error(`Refusing exponential decimal for ${label}: ${text}`);
  }
  if (!text.includes(".")) {
    return q(BigInt(text), 1n);
  }
  const sign = text.startsWith("-") ? -1n : 1n;
  const unsigned = text.replace(/^-/, "");
  const [integer, fraction] = unsigned.split(".");
  const den = 10n ** BigInt(fraction.length);
  const num = sign * BigInt(`${integer}${fraction}`);
  return q(num, den);
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

function fieldCounts(rows, fields = ROW_AUDIT_FIELDS) {
  return Object.fromEntries(
    fields.map((field) => [field, rows.filter((row) => row.required_fields_present[field] === true).length])
  );
}

function rowById(rows, rowId, label) {
  const row = rows.find((candidate) => candidate.row_id === rowId);
  if (!row) {
    throw new Error(`Missing ${label} row for ${rowId}`);
  }
  return row;
}

function assertInputs(oneLeaf, foldInput, foldResult) {
  if (oneLeaf.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected one-leaf packet id: ${oneLeaf.packet_id}`);
  }
  if (foldInput.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate input packet id: ${foldInput.packet_id}`);
  }
  if (foldResult.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate result packet id: ${foldResult.packet_id}`);
  }
  for (const input of [oneLeaf, foldInput, foldResult]) {
    if (input.branch_chart_authorized === true || input.preledger_pass === true || input.updates_live_ledger === true) {
      throw new Error("Refusing to build a theorem attempt from an authorized or live-updating input.");
    }
  }
  if (!Array.isArray(oneLeaf.rows) || oneLeaf.rows.length !== 3) {
    throw new Error("Expected exactly 3 one-leaf candidate-change rows.");
  }
  if (!Array.isArray(foldInput.one_leaf_boundary_opening_constraints)) {
    throw new Error("Fold-coordinate input lacks one_leaf_boundary_opening_constraints.");
  }
  if (foldResult.status !== "feasible") {
    throw new Error(`Fold-coordinate result must be feasible, got ${foldResult.status}.`);
  }
  if (foldInput.basis_includes_fold_coordinate_columns !== true) {
    throw new Error("Fold-coordinate input does not declare fold-coordinate columns.");
  }
  if (foldResult.basis_includes_fold_coordinate_columns !== true) {
    throw new Error("Fold-coordinate result does not preserve the fold-coordinate column marker.");
  }
}

function structuralPairingRowsVerified(foldResult) {
  return (
    foldResult.structural_constraint_count === 3 &&
    foldResult.B_xi_residual_verified_zero_with_tolerance === true &&
    foldResult.max_structural_residual === 0 &&
    Array.isArray(foldResult.structural_rows) &&
    foldResult.structural_rows.length === 3 &&
    foldResult.structural_rows.every((row) => row.residual === 0)
  );
}

function auditRow(oneLeafRow, foldInputRow, foldResult, structuralVerified) {
  const witness = foldResult.witness ?? {};
  const sourceVariable = foldInputRow.source_shift_variable;
  const receiverVariable = foldInputRow.receiver_shift_variable;
  const sourceSymbol = oneLeafRow.candidate_change_variables.favorable_source_shift.symbol;
  const receiverSymbol = oneLeafRow.candidate_change_variables.favorable_receiver_shift.symbol;
  const rowIdentityMatched =
    foldInputRow.row_id === oneLeafRow.row_id &&
    foldInputRow.cover_id === oneLeafRow.cover_id &&
    foldInputRow.failed_side === oneLeafRow.failed_side &&
    foldInputRow.boundary_side === oneLeafRow.boundary_side;
  const symbolMappingMatched = sourceVariable === `fc_${sourceSymbol}` && receiverVariable === `fc_${receiverSymbol}`;
  const sourceShift = qFromDecimal(Number(witness[sourceVariable]), sourceVariable);
  const receiverShift = qFromDecimal(Number(witness[receiverVariable]), receiverVariable);
  const combinedOpening = qAdd(sourceShift, receiverShift);
  const requiredOpening = qFromJson(oneLeafRow.combined_boundary_opening_condition.required_combined_opening_q);
  const margin = qSub(combinedOpening, requiredOpening);
  const inputScreenPass = foldInputRow.strict_screen_pass === true;
  const screenWitnessPresent =
    Number.isFinite(Number(witness[sourceVariable])) && Number.isFinite(Number(witness[receiverVariable]));
  const strictScreenOpening = inputScreenPass && qCmp(margin, q(0n)) > 0;
  const tangentDataPresent =
    strictScreenOpening &&
    qCmp(sourceShift, q(0n)) >= 0 &&
    qCmp(receiverShift, q(0n)) >= 0 &&
    screenWitnessPresent;

  const screenFields = {
    one_leaf_candidate_change_boundary_data_input_present: true,
    fold_coordinate_collocation_input_present: true,
    fold_coordinate_collocation_result_present: true,
    row_identity_matched: rowIdentityMatched,
    candidate_change_boundary_target_declared:
      oneLeafRow.required_fields_present.candidate_change_boundary_target_declared === true,
    combined_boundary_opening_condition_declared:
      oneLeafRow.required_fields_present.combined_boundary_opening_condition_declared === true,
    strict_threshold_identity_inherited_from_constructor:
      oneLeafRow.required_fields_present.strict_threshold_identities_verified === true,
    fold_coordinate_symbol_mapping_matched: symbolMappingMatched,
    fold_coordinate_screen_witness_present: screenWitnessPresent,
    fold_coordinate_screen_combined_opening_gt_threshold: tangentDataPresent,
    finite_tangent_matrix_status_feasible: foldResult.status === "feasible",
    declared_structural_rows_satisfied_with_tolerance: structuralVerified,
  };
  const proofFields = {
    same_packet_candidate_change_data_present: false,
    strict_combined_boundary_opening_gt_threshold: false,
    source_monotonicity_preserved_under_candidate_change: false,
    receiver_monotonicity_preserved_under_candidate_change: false,
    memory_margins_all_owned_components: false,
    endpoint_ownership_no_double_counting: false,
    simple_root_branch_reuse_exclusion: false,
    non_owned_complement_closed: false,
    root_topology_recertified_for_candidate_change: false,
    proof_interval_preledger_rerun_for_candidate_change: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  const fields = {
    ...screenFields,
    ...proofFields,
  };
  const theoremPassRuleSatisfied = ROW_AUDIT_FIELDS.every((field) => fields[field] === true);

  return {
    row_id: oneLeafRow.row_id,
    cover_id: oneLeafRow.cover_id,
    ledger: oneLeafRow.ledger,
    receiver_interval: oneLeafRow.receiver_interval,
    source_interval: oneLeafRow.source_interval,
    failed_side: oneLeafRow.failed_side,
    boundary_side: oneLeafRow.boundary_side,
    terminal_grid_span: oneLeafRow.terminal_grid_span,
    ownership_component_id: oneLeafRow.ownership_component_id,
    source_boundary_ref: oneLeafRow.source_boundary_ref,
    receiver_boundary_ref: oneLeafRow.receiver_boundary_ref,
    fold_coordinate_screen_variables: {
      source_shift_variable: sourceVariable,
      receiver_shift_variable: receiverVariable,
      success_inequality: foldInputRow.success_inequality,
      source_shift_q: qArtifact(sourceShift),
      receiver_shift_q: qArtifact(receiverShift),
      combined_boundary_opening_q: qArtifact(combinedOpening),
      required_combined_opening_q: qArtifact(requiredOpening),
      combined_boundary_opening_margin_q: qArtifact(margin),
    },
    source_candidate_change_variable: oneLeafRow.candidate_change_variables.favorable_source_shift,
    receiver_candidate_change_variable: oneLeafRow.candidate_change_variables.favorable_receiver_shift,
    source_constructor_status: oneLeafRow.source_theorem_row_status,
    receiver_constructor_status: oneLeafRow.receiver_theorem_row_status,
    screen_status: {
      strict_screen_pass: foldInputRow.strict_screen_pass,
      witness_combined_opening: foldInputRow.witness_combined_opening,
      witness_margin_after_required_opening: foldInputRow.witness_margin_after_required_opening,
      screen_only_not_proof_grade: true,
    },
    screen_fields_present: screenFields,
    proof_required_fields_present: proofFields,
    required_fields_present: fields,
    theorem_pass_rule_satisfied: theoremPassRuleSatisfied,
    row_consumed: false,
    branch_chart_authorized: false,
    theorem_blocker:
      "The fold-coordinate tangent witness gives a strict screen-level boundary opening, but it is not yet a proof-grade same-packet candidate change and does not certify monotonicity, memory margins, endpoint ownership, branch-reuse exclusion, or non-owned complement closure.",
  };
}

function buildTheoremAttempt(oneLeaf, foldInput, foldResult, oneLeafPath, foldInputPath, foldResultPath) {
  assertInputs(oneLeaf, foldInput, foldResult);
  const structuralVerified = structuralPairingRowsVerified(foldResult);
  const rows = oneLeaf.rows.map((row) =>
    auditRow(
      row,
      rowById(foldInput.one_leaf_boundary_opening_constraints, row.row_id, "fold-coordinate one-leaf screen"),
      foldResult,
      structuralVerified
    )
  );
  const screenMargins = rows.map((row) => qFromJson(row.fold_coordinate_screen_variables.combined_boundary_opening_margin_q));
  const minScreenMargin = screenMargins.reduce((min, value) => (qCmp(value, min) < 0 ? value : min), screenMargins[0]);
  const counts = fieldCounts(rows);
  const screenCounts = fieldCounts(rows, SCREEN_FIELDS);
  const proofCounts = fieldCounts(rows, PROOF_REQUIRED_FIELDS);
  const foldCoordinateColumnCount = (foldInput.variables ?? []).filter(
    (variable) => variable.collocation_role === "fold_coordinate_boundary_opening"
  ).length;

  return {
    schema: "breather-higher-fold-one-leaf-fold-coordinate-candidate-change-theorem-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    source_one_leaf_candidate_change_boundary_data: path.basename(oneLeafPath),
    source_one_leaf_candidate_change_boundary_data_sha256: sha256File(oneLeafPath),
    source_fold_coordinate_collocation_input: path.basename(foldInputPath),
    source_fold_coordinate_collocation_input_sha256: sha256File(foldInputPath),
    source_fold_coordinate_collocation_result: path.basename(foldResultPath),
    source_fold_coordinate_collocation_result_sha256: sha256File(foldResultPath),
    status: "one_leaf_fold_coordinate_collocation_candidate_change_theorem_attempt_fail_closed",
    theorem_target: "One-Leaf Fold-Coordinate Collocation Candidate-Change Theorem Attempt",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only screen-to-boundary-data bridge; positive fold-coordinate tangent witness, no proof-grade same-packet candidate-change data",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    theorem_rule:
      "A one-leaf fold-coordinate candidate-change theorem can consume a row only after the strict screen-level fold-coordinate boundary opening is upgraded to a same-packet candidate change and carries source monotonicity, receiver monotonicity, memory margins, endpoint ownership/no-double-counting, simple-root branch-reuse exclusion, and non-owned-complement closure.",
    fold_coordinate_screen_guard: {
      scanner_status: foldResult.status,
      theory_success_marker: foldResult.theory_success_marker,
      basis_includes_fold_coordinate_columns: foldResult.basis_includes_fold_coordinate_columns,
      structural_pairing_rows_verified: structuralVerified,
      B_xi_residual_verified_zero_with_tolerance: foldResult.B_xi_residual_verified_zero_with_tolerance,
      B_xi_residual_certified_zero: foldResult.B_xi_residual_certified_zero,
      rank_B_certified: foldResult.rank_B_certified,
      xi_infinity_norm: foldResult.xi_infinity_norm,
      min_strict_gap_value_after_required_margin: foldResult.min_gap_value_after_required_margin,
      one_leaf_screen_level_success: foldResult.one_leaf_screen_level_success,
    },
    summary: {
      theorem_attempt_rows: rows.length,
      theorem_rows: rows.length,
      constructor_rows_matched: screenCounts.row_identity_matched,
      fold_coordinate_screen_rows: foldInput.one_leaf_boundary_opening_constraints.length,
      fold_coordinate_screen_positive_rows: counts.fold_coordinate_screen_combined_opening_gt_threshold,
      strict_threshold_identities_inherited: counts.strict_threshold_identity_inherited_from_constructor,
      same_packet_candidate_change_data_present_rows: proofCounts.same_packet_candidate_change_data_present,
      proof_grade_combined_boundary_opening_rows: proofCounts.strict_combined_boundary_opening_gt_threshold,
      source_monotonicity_certified_rows: proofCounts.source_monotonicity_preserved_under_candidate_change,
      receiver_monotonicity_certified_rows: proofCounts.receiver_monotonicity_preserved_under_candidate_change,
      memory_margin_certified_rows: proofCounts.memory_margins_all_owned_components,
      endpoint_ownership_no_double_counting_rows: proofCounts.endpoint_ownership_no_double_counting,
      simple_root_branch_reuse_exclusion_rows: proofCounts.simple_root_branch_reuse_exclusion,
      non_owned_complement_closed_rows: proofCounts.non_owned_complement_closed,
      proof_grade_rows: rows.filter((row) => row.theorem_pass_rule_satisfied).length,
      proof_obligation_rows_certified: rows.filter((row) => row.theorem_pass_rule_satisfied).length,
      min_fold_coordinate_screen_margin_q: qArtifact(minScreenMargin),
      screen_field_certification_counts: screenCounts,
      proof_required_field_certification_counts: proofCounts,
      required_fields_certified_counts: counts,
      gap_constraint_count: foldResult.gap_constraint_count,
      structural_constraint_count: foldResult.structural_constraint_count,
      variable_count: foldResult.variable_count,
      fold_coordinate_column_count: foldCoordinateColumnCount,
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
        `| \`${row.row_id}\` | \`${row.failed_side}\` | \`${row.fold_coordinate_screen_variables.source_shift_variable}\` + \`${row.fold_coordinate_screen_variables.receiver_shift_variable}\` | ${row.fold_coordinate_screen_variables.combined_boundary_opening_q.display} | ${row.fold_coordinate_screen_variables.required_combined_opening_q.display} | ${row.fold_coordinate_screen_variables.combined_boundary_opening_margin_q.display} | ${row.required_fields_present.fold_coordinate_screen_combined_opening_gt_threshold} | ${row.theorem_pass_rule_satisfied} |`
    )
    .join("\n");
}

function fieldTable(theoremAttempt) {
  return ROW_AUDIT_FIELDS.map(
    (field) =>
      `| \`${field}\` | ${theoremAttempt.summary.required_fields_certified_counts[field]} / ${theoremAttempt.summary.theorem_rows} |`
  ).join("\n");
}

function buildReport(theoremAttempt) {
  return `# Higher-Fold One-Leaf Fold-Coordinate Candidate-Change Theorem Attempt

## Verdict

The fold-coordinate candidate-change theorem attempt still fail-closes for
packet \`${PACKET_ID}\`, but it records a real screen-level advance. The
nonlinear fold-coordinate collocation witness supplies positive lower and upper
fold-coordinate boundary-opening variables, and those variables strictly open
all ${theoremAttempt.summary.theorem_rows} one-leaf candidate-change boundary
targets.

This is not a proof-grade candidate-change theorem. The witness is a bounded
tangent screen, not an accepted same-packet deformation or endpoint-tightening
certificate. Therefore ${theoremAttempt.summary.proof_obligation_rows_certified} / ${theoremAttempt.summary.theorem_rows} theorem rows pass, no row is consumed, and branch-chart authorization remains locked off.

| Quantity | Value |
| --- | ---: |
| Theorem-attempt rows | ${theoremAttempt.summary.theorem_attempt_rows} |
| Constructor rows matched | ${theoremAttempt.summary.constructor_rows_matched} |
| Fold-coordinate screen rows | ${theoremAttempt.summary.fold_coordinate_screen_rows} |
| Fold-coordinate screen positive rows | ${theoremAttempt.summary.fold_coordinate_screen_positive_rows} |
| Strict threshold identities inherited | ${theoremAttempt.summary.strict_threshold_identities_inherited} |
| Same-packet candidate-change data present | ${theoremAttempt.summary.same_packet_candidate_change_data_present_rows} |
| Proof-grade combined boundary openings | ${theoremAttempt.summary.proof_grade_combined_boundary_opening_rows} |
| Source monotonicity certified rows | ${theoremAttempt.summary.source_monotonicity_certified_rows} |
| Receiver monotonicity certified rows | ${theoremAttempt.summary.receiver_monotonicity_certified_rows} |
| Memory-margin certified rows | ${theoremAttempt.summary.memory_margin_certified_rows} |
| Endpoint ownership/no-double-counting rows | ${theoremAttempt.summary.endpoint_ownership_no_double_counting_rows} |
| Simple-root branch-reuse exclusion rows | ${theoremAttempt.summary.simple_root_branch_reuse_exclusion_rows} |
| Non-owned complement closed rows | ${theoremAttempt.summary.non_owned_complement_closed_rows} |
| Proof-grade rows | ${theoremAttempt.summary.proof_grade_rows} |
| Minimum fold-coordinate screen margin | ${theoremAttempt.summary.min_fold_coordinate_screen_margin_q.display} |
| Gap constraint count | ${theoremAttempt.summary.gap_constraint_count} |
| Structural constraint count | ${theoremAttempt.summary.structural_constraint_count} |
| Variable count | ${theoremAttempt.summary.variable_count} |
| Fold-coordinate column count | ${theoremAttempt.summary.fold_coordinate_column_count} |
| Row consumption count | ${theoremAttempt.summary.row_consumption_count} |

## Required-Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(theoremAttempt)}

## One-Leaf Fold-Coordinate Rows

| Row | Failed side | Fold-coordinate opening | Witness opening | Required opening | Screen margin | Screen pass | Theorem pass |
| --- | --- | --- | ---: | ---: | ---: | --- | --- |
${rowTable(theoremAttempt.rows)}

## Interpretation

The imported screen witness uses
\`fc_sigma_source_lower = fc_rho_receiver_lower = fc_sigma_source_upper = fc_rho_receiver_upper = 0.5\`.
Thus each one-leaf row receives a screen-level combined opening of \`1\`,
which is strictly larger than the exact candidate-change boundary target. This
is the first positive bridge from the fold-coordinate collocation screen back
into the one-leaf candidate-change theorem stack.

The remaining blocker is proof-grade promotion: the tangent witness must become
a same-packet candidate change and must preserve source monotonicity, receiver
monotonicity, memory margins, endpoint ownership/no-double-counting,
simple-root branch-reuse exclusion, and non-owned complement closure before any
row can enter a causal preledger or branch chart.

## Capture Decision

Priority-only theorem attempt. This packet sharpens the current blocker by
separating the solved screen-level boundary opening from the unsolved
same-packet proof obligations. It is not ready for promotion into authored
AAA prose because it remains diagnostic and row-blocked.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const oneLeaf = readJson(args.oneLeaf);
  const foldInput = readJson(args.foldInput);
  const foldResult = readJson(args.foldResult);
  const theoremAttempt = buildTheoremAttempt(oneLeaf, foldInput, foldResult, args.oneLeaf, args.foldInput, args.foldResult);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, theoremAttempt, args.pretty);
  writeText(outReport, buildReport(theoremAttempt));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
