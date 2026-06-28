#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_FOLD_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_input.nonlinear-v0.json`;
const DEFAULT_FOLD_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_result.nonlinear-v0.json`;
const DEFAULT_THEOREM_ATTEMPT = `${CERT_DIR}/one_leaf_fold_coordinate_collocation_candidate_change_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_MATERIALIZATION_AUDIT = `${CERT_DIR}/fold_coordinate_candidate_materialization_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_history_realization_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_history_realization_contract_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const VARIABLE_REALIZATION_FIELDS = [
  "same_packet_history_update_formula",
  "theta_support",
  "x_update_basis",
  "xdot_update_basis",
  "mesh_update_rule",
  "endpoint_motion_rule",
  "source_monotonicity_rule",
  "receiver_monotonicity_rule",
];

const PACKET_GENERATOR_FIELDS = [
  "base_packet_id",
  "candidate_run_id",
  "candidate_packet_id",
  "artifact_stem",
  "source_bindings",
  "coefficient_assignment",
  "delta_x_formula",
  "periodic_extension_rule",
  "phi_cyc_writer",
  "mesh_writer",
  "preledger_input_screen_writer",
  "candidate_artifact_namespace",
  "candidate_replay_output_dir",
  "root_topology_recertification_rule",
  "proof_interval_v1_v6_replay_rule",
  "v1_to_v6_previous_ledger_plan",
];

const ROW_ACCEPTANCE_FIELDS = [
  "screen_positive_candidate_change_row",
  "source_boundary_delta_contract_defined",
  "receiver_boundary_delta_contract_defined",
  "same_packet_history_update_formula_supplied",
  "theta_support_supplied",
  "x_update_basis_supplied",
  "xdot_update_basis_supplied",
  "mesh_update_rule_supplied",
  "endpoint_motion_rule_supplied",
  "source_monotonicity_rule_supplied",
  "receiver_monotonicity_rule_supplied",
  "candidate_phi_cyc_writer_authorized",
  "candidate_mesh_writer_authorized",
  "candidate_preledger_input_screen_writer_authorized",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
];

const ACTION_SIGNS = new Map([
  ["lower_source_inner_boundary", { sign: -1, boundary_delta: "decrease source inner lower boundary" }],
  ["raise_source_inner_boundary", { sign: 1, boundary_delta: "increase source inner upper boundary" }],
  ["raise_receiver_lower_boundary", { sign: 1, boundary_delta: "increase receiver lower boundary" }],
  ["lower_receiver_upper_boundary", { sign: -1, boundary_delta: "decrease receiver upper boundary" }],
]);

function parseArgs(argv) {
  const args = {
    foldInput: DEFAULT_FOLD_INPUT,
    foldResult: DEFAULT_FOLD_RESULT,
    theoremAttempt: DEFAULT_THEOREM_ATTEMPT,
    materializationAudit: DEFAULT_MATERIALIZATION_AUDIT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--fold-input") {
      args.foldInput = argv[++index];
    } else if (arg === "--fold-result") {
      args.foldResult = argv[++index];
    } else if (arg === "--theorem-attempt") {
      args.theoremAttempt = argv[++index];
    } else if (arg === "--materialization-audit") {
      args.materializationAudit = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-history-realization-contract.mjs [options]

Options:
  --fold-input PATH             Fold-coordinate collocation input JSON. Defaults to ${DEFAULT_FOLD_INPUT}.
  --fold-result PATH            Fold-coordinate collocation result JSON. Defaults to ${DEFAULT_FOLD_RESULT}.
  --theorem-attempt PATH        One-leaf theorem-attempt JSON. Defaults to ${DEFAULT_THEOREM_ATTEMPT}.
  --materialization-audit PATH  Materialization audit JSON. Defaults to ${DEFAULT_MATERIALIZATION_AUDIT}.
  --out-dir PATH                Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                      Pretty-print JSON artifact.
  --help                        Show this help.`);
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
  for (let index = 0; index < places; index += 1) {
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
    num: value.num.toString(),
    den: value.den.toString(),
    display: qToDecimal(value),
  };
}

function qMulInteger(value, factor) {
  return q(value.num * BigInt(factor), value.den);
}

function assertInputs(foldInput, foldResult, theoremAttempt, materializationAudit) {
  if (foldInput.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate input packet id: ${foldInput.packet_id}`);
  }
  if (foldResult.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate result packet id: ${foldResult.packet_id}`);
  }
  if (theoremAttempt.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected theorem-attempt packet id: ${theoremAttempt.packet_id}`);
  }
  if (materializationAudit.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected materialization-audit packet id: ${materializationAudit.packet_id}`);
  }
  if (foldResult.status !== "feasible") {
    throw new Error(`Expected feasible fold-coordinate result, got ${foldResult.status}`);
  }
  if (theoremAttempt.status !== "one_leaf_fold_coordinate_collocation_candidate_change_theorem_attempt_fail_closed") {
    throw new Error(`Unexpected theorem-attempt status: ${theoremAttempt.status}`);
  }
  if (materializationAudit.status !== "fold_coordinate_candidate_materialization_audit_fail_closed") {
    throw new Error(`Unexpected materialization-audit status: ${materializationAudit.status}`);
  }
  for (const input of [foldInput, foldResult, theoremAttempt, materializationAudit]) {
    if (input.branch_chart_authorized === true || input.preledger_pass === true || input.updates_live_ledger === true) {
      throw new Error("Refusing to build a contract from an authorized or live-updating input.");
    }
  }
  if (!Array.isArray(theoremAttempt.rows) || theoremAttempt.rows.length !== 3) {
    throw new Error("Expected exactly 3 theorem-attempt rows.");
  }
  if (materializationAudit.summary?.materialization_ready_rows !== 0) {
    throw new Error("History-realization contract must be revised if materialization rows are already ready.");
  }
}

function fieldCounts(rows) {
  return Object.fromEntries(
    ROW_ACCEPTANCE_FIELDS.map((field) => [field, rows.filter((row) => row.required_fields_present[field] === true).length])
  );
}

function unique(values) {
  return [...new Set(values)];
}

function actionSign(action) {
  const entry = ACTION_SIGNS.get(action);
  if (!entry) {
    throw new Error(`Unknown boundary action: ${action}`);
  }
  return entry;
}

function variableAction(row, variableId) {
  if (row.fold_coordinate_screen_variables.source_shift_variable === variableId) {
    const action = row.source_candidate_change_variable.action;
    return {
      variable_role: "source",
      candidate_change_symbol: row.source_candidate_change_variable.symbol,
      action,
      action_meaning: row.source_candidate_change_variable.meaning,
      ...actionSign(action),
    };
  }
  if (row.fold_coordinate_screen_variables.receiver_shift_variable === variableId) {
    const action = row.receiver_candidate_change_variable.action;
    return {
      variable_role: "receiver",
      candidate_change_symbol: row.receiver_candidate_change_variable.symbol,
      action,
      action_meaning: row.receiver_candidate_change_variable.meaning,
      ...actionSign(action),
    };
  }
  throw new Error(`Variable ${variableId} is not used by row ${row.row_id}`);
}

function buildVariableContracts(foldInput, foldResult, theoremAttempt, materializationAudit) {
  const materializationVariables = new Map(
    (materializationAudit.fold_coordinate_variable_audit ?? []).map((variable) => [variable.id, variable])
  );
  return (foldInput.variables ?? [])
    .filter((variable) => variable.collocation_role === "fold_coordinate_boundary_opening")
    .map((variable) => {
      const usedRows = theoremAttempt.rows.filter(
        (row) =>
          row.fold_coordinate_screen_variables.source_shift_variable === variable.id ||
          row.fold_coordinate_screen_variables.receiver_shift_variable === variable.id
      );
      const actions = usedRows.map((row) => variableAction(row, variable.id));
      const witness = qFromDecimal(Number(foldResult.witness?.[variable.id]), variable.id);
      const materializationRecord = materializationVariables.get(variable.id);
      const presentFields = materializationRecord?.present_realization_fields ?? [];
      const missingFields = VARIABLE_REALIZATION_FIELDS.filter((field) => !presentFields.includes(field));
      return {
        id: variable.id,
        source_symbol: variable.source_symbol,
        meaning: variable.meaning,
        collocation_role: variable.collocation_role,
        bounded_screen_range: variable.bounded_screen_range,
        witness_coefficient_q: qArtifact(witness),
        basis_symbol: `Psi_${variable.id}`,
        history_update_term: `${variable.id} * Psi_${variable.id}(theta)`,
        row_uses: usedRows.map((row) => row.row_id),
        variable_roles: unique(actions.map((action) => action.variable_role)),
        boundary_actions: unique(actions.map((action) => action.action)),
        boundary_delta_signs: unique(actions.map((action) => action.sign)),
        boundary_delta_contracts: unique(actions.map((action) => `${action.boundary_delta} by ${action.candidate_change_symbol}`)),
        required_realization_fields: VARIABLE_REALIZATION_FIELDS,
        present_realization_fields: presentFields,
        missing_realization_fields: missingFields,
        contract_defined: true,
        realization_supplied: missingFields.length === 0,
      };
    });
}

function buildBoundaryDelta(row, variableId) {
  const action = variableAction(row, variableId);
  const magnitude =
    action.variable_role === "source"
      ? qFromJson(row.fold_coordinate_screen_variables.source_shift_q)
      : qFromJson(row.fold_coordinate_screen_variables.receiver_shift_q);
  return {
    variable: variableId,
    variable_role: action.variable_role,
    candidate_change_symbol: action.candidate_change_symbol,
    action: action.action,
    boundary_delta_sign: action.sign,
    boundary_delta_q: qArtifact(qMulInteger(magnitude, action.sign)),
    magnitude_q: qArtifact(magnitude),
    contract: `${action.boundary_delta}; signed boundary delta is ${action.sign > 0 ? "+" : "-"}${action.candidate_change_symbol}.`,
  };
}

function buildRowContracts(theoremAttempt) {
  return theoremAttempt.rows.map((row) => {
    const sourceVariable = row.fold_coordinate_screen_variables.source_shift_variable;
    const receiverVariable = row.fold_coordinate_screen_variables.receiver_shift_variable;
    const fields = {
      screen_positive_candidate_change_row:
        row.required_fields_present.fold_coordinate_screen_combined_opening_gt_threshold === true,
      source_boundary_delta_contract_defined: true,
      receiver_boundary_delta_contract_defined: true,
      same_packet_history_update_formula_supplied: false,
      theta_support_supplied: false,
      x_update_basis_supplied: false,
      xdot_update_basis_supplied: false,
      mesh_update_rule_supplied: false,
      endpoint_motion_rule_supplied: false,
      source_monotonicity_rule_supplied: false,
      receiver_monotonicity_rule_supplied: false,
      candidate_phi_cyc_writer_authorized: false,
      candidate_mesh_writer_authorized: false,
      candidate_preledger_input_screen_writer_authorized: false,
      root_topology_recertified_for_candidate_change: false,
      proof_interval_v1_v6_rerun_for_candidate_change: false,
      row_consumed: false,
      branch_chart_authorized: false,
    };
    return {
      row_id: row.row_id,
      cover_id: row.cover_id,
      ledger: row.ledger,
      failed_side: row.failed_side,
      boundary_side: row.boundary_side,
      source_boundary_ref: row.source_boundary_ref,
      receiver_boundary_ref: row.receiver_boundary_ref,
      ownership_component_id: row.ownership_component_id,
      source_boundary_delta: buildBoundaryDelta(row, sourceVariable),
      receiver_boundary_delta: buildBoundaryDelta(row, receiverVariable),
      combined_boundary_opening_q: row.fold_coordinate_screen_variables.combined_boundary_opening_q,
      required_combined_opening_q: row.fold_coordinate_screen_variables.required_combined_opening_q,
      combined_boundary_opening_margin_q: row.fold_coordinate_screen_variables.combined_boundary_opening_margin_q,
      success_inequality: row.fold_coordinate_screen_variables.success_inequality,
      required_fields_present: fields,
      contract_pass_rule_satisfied: ROW_ACCEPTANCE_FIELDS.every((field) => fields[field] === true),
      row_consumed: false,
      branch_chart_authorized: false,
      contract_blocker:
        "The row has a signed boundary-delta contract and a positive screen inequality, but no same-packet history-update basis, mesh update rule, monotonicity proof, candidate artifact writer, topology recertification, or v1-v6 preledger replay.",
    };
  });
}

function buildContract(inputs, sources) {
  const { foldInput, foldResult, theoremAttempt, materializationAudit } = inputs;
  assertInputs(foldInput, foldResult, theoremAttempt, materializationAudit);
  const variables = buildVariableContracts(foldInput, foldResult, theoremAttempt, materializationAudit);
  const rows = buildRowContracts(theoremAttempt);
  const counts = fieldCounts(rows);
  const expectedArtifacts = materializationAudit.expected_candidate_artifacts;
  const artifactBasenames = Object.fromEntries(
    Object.entries(expectedArtifacts).map(([key, artifact]) => [key, artifact.basename])
  );
  const sourceBindings = {
    fold_coordinate_input: {
      path: sources.foldInput,
      basename: path.basename(sources.foldInput),
      sha256: sha256File(sources.foldInput),
    },
    fold_coordinate_result: {
      path: sources.foldResult,
      basename: path.basename(sources.foldResult),
      sha256: sha256File(sources.foldResult),
    },
    theorem_attempt: {
      path: sources.theoremAttempt,
      basename: path.basename(sources.theoremAttempt),
      sha256: sha256File(sources.theoremAttempt),
    },
    materialization_audit: {
      path: sources.materializationAudit,
      basename: path.basename(sources.materializationAudit),
      sha256: sha256File(sources.materializationAudit),
    },
  };
  const artifactPresenceCount = Object.values(expectedArtifacts).filter((artifact) => artifact.present).length;
  const candidateRunId = "fold-coordinate-candidate.nonlinear-v0";
  const artifactStem = `${PACKET_ID}.${candidateRunId}`;
  const candidateReplayOutputDir = "${TMPDIR:-/tmp}/proof-programs-fold-coordinate-candidate-nonlinear-v0/preledger";
  const replayPlan = [1, 2, 3, 4, 5, 6].map((stage) => ({
    stage: `proof-interval-v${stage}`,
    previous_ledger:
      stage === 1 ? null : `${candidateReplayOutputDir}/causal_ledger.${PACKET_ID}.proof-interval-v${stage - 1}.json`,
    output_ledger: `${candidateReplayOutputDir}/causal_ledger.${PACKET_ID}.proof-interval-v${stage}.json`,
    output_namespace_policy:
      "The output directory carries the fold-coordinate candidate identity because the preledger scripts emit hard-coded basenames.",
  }));
  return {
    schema: "breather-higher-fold-fold-coordinate-history-realization-contract-v1",
    packet_id: PACKET_ID,
    base_packet_id: PACKET_ID,
    candidate_run_id: candidateRunId,
    artifact_stem: artifactStem,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "fold_coordinate_history_realization_contract_defined_realization_absent",
    theorem_target: "Fold-Coordinate Same-Packet History Realization Contract",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only theorem/generator contract; defines realization burden but supplies no same-packet history-update proof",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_bindings: sourceBindings,
    source_fold_coordinate_input: sourceBindings.fold_coordinate_input.basename,
    source_fold_coordinate_input_sha256: sourceBindings.fold_coordinate_input.sha256,
    source_fold_coordinate_result: sourceBindings.fold_coordinate_result.basename,
    source_fold_coordinate_result_sha256: sourceBindings.fold_coordinate_result.sha256,
    source_theorem_attempt: sourceBindings.theorem_attempt.basename,
    source_theorem_attempt_sha256: sourceBindings.theorem_attempt.sha256,
    source_materialization_audit: sourceBindings.materialization_audit.basename,
    source_materialization_audit_sha256: sourceBindings.materialization_audit.sha256,
    fold_coordinate_screen_guard: {
      scanner_status: foldResult.status,
      basis_includes_fold_coordinate_columns: foldResult.basis_includes_fold_coordinate_columns,
      structural_constraint_count: foldResult.structural_constraint_count,
      B_xi_residual_verified_zero_with_tolerance: foldResult.B_xi_residual_verified_zero_with_tolerance,
      B_xi_residual_certified_zero: foldResult.B_xi_residual_certified_zero,
      rank_B_certified: foldResult.rank_B_certified,
      guard_note:
        "Tolerance-level B_xi verification is screen evidence only; exact history-realization formulas and interval replay are still required.",
    },
    theorem_contract: {
      coefficient_vector: variables.map((variable) => variable.id),
      target_formula:
        "X_fc(theta; xi) = X_fresh(theta) + Delta X_fc(theta; xi), Delta X_fc(theta; xi) = sum_j xi_j * Psi_j(theta).",
      derivative_formula:
        "xdot_fc(theta; xi) = xdot_fresh(theta) + sum_j xi_j * dPsi_j(theta)/dtheta.",
      coordinate_functionals: foldInput.basis_definition?.coordinate_functionals ?? null,
      fixed_period_required: foldInput.basis_definition?.fixed_period === true,
      required_variable_fields: VARIABLE_REALIZATION_FIELDS,
      row_acceptance_fields: ROW_ACCEPTANCE_FIELDS,
      proof_rule:
        "A fold-coordinate boundary-opening screen row becomes proof-grade only after each used coefficient has a same-packet basis function with theta support, derivative consistency, mesh and endpoint update rules, source and receiver monotonicity preservation, candidate artifact emission, root-topology recertification, and v1-v6 preledger replay.",
    },
    generator_contract: {
      required_packet_fields: PACKET_GENERATOR_FIELDS,
      base_packet_id: PACKET_ID,
      candidate_run_id: candidateRunId,
      candidate_packet_id: artifactStem,
      artifact_stem: artifactStem,
      source_bindings_required: true,
      candidate_artifact_namespace: artifactStem,
      candidate_replay_output_dir: candidateReplayOutputDir,
      expected_candidate_artifacts: artifactBasenames,
      materialized_candidate_artifacts: {
        same_packet_phi_cyc: expectedArtifacts.expected_phi_cyc,
        same_packet_mesh: expectedArtifacts.expected_mesh,
        same_packet_preledger_input_screen: expectedArtifacts.expected_preledger_input_screen,
        root_topology_interval_certificate: expectedArtifacts.expected_root_topology_certificate,
        proof_interval_replay_audit: expectedArtifacts.expected_preledger_replay,
      },
      output_collision_policy:
        "Candidate preledger replay must use a candidate-specific output directory or wrapper because the v1-v6 preledger scripts emit hard-coded proof-interval basenames.",
      direct_path_reuse_policy:
        "The lambda=0.305 direct-path artifacts are allowed only as contrast artifacts; they do not satisfy the fold-coordinate realization contract.",
      v1_to_v6_previous_ledger_plan: replayPlan,
      replay_order: [
        "emit candidate phi_cyc",
        "emit candidate mesh",
        "emit candidate preledger input screen",
        "rerun candidate root-tube binary64 certificate",
        "rerun candidate root-tube outward-rational interval certificate",
        "rerun proof-interval preledger v1 through v6 in the candidate namespace",
      ],
      authorization_rule:
        "Set row_consumed=true and branch_chart_authorized=true only after every row acceptance field is certified true and the candidate replay artifacts are present for the same candidate namespace.",
    },
    expected_candidate_artifacts: expectedArtifacts,
    materialized_candidate_artifacts: {
      same_packet_phi_cyc: expectedArtifacts.expected_phi_cyc,
      same_packet_mesh: expectedArtifacts.expected_mesh,
      same_packet_preledger_input_screen: expectedArtifacts.expected_preledger_input_screen,
      root_topology_interval_certificate: expectedArtifacts.expected_root_topology_certificate,
      proof_interval_replay_audit: expectedArtifacts.expected_preledger_replay,
    },
    realization_variables: variables,
    fold_coordinate_variables: variables,
    rows,
    summary: {
      contract_rows: rows.length,
      screen_positive_rows: counts.screen_positive_candidate_change_row,
      fold_coordinate_variable_count: variables.length,
      variables_with_contract_defined: variables.filter((variable) => variable.contract_defined).length,
      variables_with_realization_supplied: variables.filter((variable) => variable.realization_supplied).length,
      variable_realization_field_count: VARIABLE_REALIZATION_FIELDS.length,
      packet_generator_field_count: PACKET_GENERATOR_FIELDS.length,
      source_binding_count: Object.keys(sourceBindings).length,
      replay_plan_stages: replayPlan.length,
      row_acceptance_field_count: ROW_ACCEPTANCE_FIELDS.length,
      signed_boundary_delta_contract_rows:
        rows.filter(
          (row) =>
            row.required_fields_present.source_boundary_delta_contract_defined &&
            row.required_fields_present.receiver_boundary_delta_contract_defined
        ).length,
      candidate_artifacts_present: artifactPresenceCount,
      candidate_artifact_count: Object.values(expectedArtifacts).length,
      contract_ready_rows: rows.filter((row) => row.contract_pass_rule_satisfied).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      required_fields_certified_counts: counts,
    },
  };
}

function variableTable(variables) {
  return variables
    .map(
      (variable) =>
        `| \`${variable.id}\` | \`${variable.source_symbol}\` | \`${variable.witness_coefficient_q.display}\` | \`${variable.boundary_delta_contracts.join("; ")}\` | ${variable.present_realization_fields.length} / ${VARIABLE_REALIZATION_FIELDS.length} | ${variable.realization_supplied} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | \`${row.source_boundary_delta.variable}\` | \`${row.source_boundary_delta.boundary_delta_q.display}\` | \`${row.receiver_boundary_delta.variable}\` | \`${row.receiver_boundary_delta.boundary_delta_q.display}\` | \`${row.combined_boundary_opening_q.display}\` | \`${row.combined_boundary_opening_margin_q.display}\` | ${row.contract_pass_rule_satisfied} |`
    )
    .join("\n");
}

function fieldTable(contract) {
  return ROW_ACCEPTANCE_FIELDS.map(
    (field) => `| \`${field}\` | ${contract.summary.required_fields_certified_counts[field]} / ${contract.summary.contract_rows} |`
  ).join("\n");
}

function artifactTable(artifacts) {
  return Object.entries(artifacts)
    .map(([name, artifact]) => `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present} |`)
    .join("\n");
}

function buildReport(contract) {
  return `# Higher-Fold Fold-Coordinate History-Realization Contract

## Verdict

The fold-coordinate history-realization contract is now explicit, but no
history-realization proof is supplied yet. The contract defines the finite
same-packet update that a future generator must satisfy before candidate
\`phi_cyc\`, \`mesh\`, preledger input, topology, or preledger replay artifacts
can be accepted.

| Quantity | Value |
| --- | ---: |
| Contract rows | ${contract.summary.contract_rows} |
| Screen-positive rows | ${contract.summary.screen_positive_rows} |
| Fold-coordinate variables | ${contract.summary.fold_coordinate_variable_count} |
| Variables with contract defined | ${contract.summary.variables_with_contract_defined} |
| Variables with realization supplied | ${contract.summary.variables_with_realization_supplied} |
| Variable realization fields per variable | ${contract.summary.variable_realization_field_count} |
| Packet generator fields | ${contract.summary.packet_generator_field_count} |
| Source bindings | ${contract.summary.source_binding_count} |
| Replay plan stages | ${contract.summary.replay_plan_stages} |
| Signed boundary-delta contract rows | ${contract.summary.signed_boundary_delta_contract_rows} |
| Candidate artifacts present | ${contract.summary.candidate_artifacts_present} / ${contract.summary.candidate_artifact_count} |
| Contract-ready rows | ${contract.summary.contract_ready_rows} |
| Row consumption count | ${contract.summary.row_consumption_count} |

## Theorem Contract

The required same-packet form is

$$
X_{\\mathrm{fc}}(\\theta;\\xi)
= X_{\\mathrm{fresh}}(\\theta)
+ \\Delta X_{\\mathrm{fc}}(\\theta;\\xi),
\\qquad
\\Delta X_{\\mathrm{fc}}(\\theta;\\xi)
= \\sum_j \\xi_j \\Psi_j(\\theta).
$$

The derivative contract is

$$
\\dot X_{\\mathrm{fc}}(\\theta;\\xi)
= \\dot X_{\\mathrm{fresh}}(\\theta)
+ \\sum_j \\xi_j \\frac{d\\Psi_j}{d\\theta}(\\theta).
$$

Each basis function $\\Psi_j$ must supply:
\`${VARIABLE_REALIZATION_FIELDS.join("`, `")}\`.

The current $B\\xi$ evidence is only screen-level: tolerance verification is
\`${contract.fold_coordinate_screen_guard.B_xi_residual_verified_zero_with_tolerance}\`,
exact zero certification is
\`${contract.fold_coordinate_screen_guard.B_xi_residual_certified_zero}\`, and
rank certification is \`${contract.fold_coordinate_screen_guard.rank_B_certified}\`.

## Variable Contracts

| Variable | Source symbol | Witness coefficient | Signed boundary contract | Realization fields present | Realization supplied |
| --- | --- | ---: | --- | ---: | --- |
${variableTable(contract.fold_coordinate_variables)}

## Row Boundary Contract

| Row | Failed side | Source variable | Source delta | Receiver variable | Receiver delta | Combined opening | Margin | Contract pass |
| --- | --- | --- | ---: | --- | ---: | ---: | ---: | --- |
${rowTable(contract.rows)}

Lower-side rows require a source lower-boundary decrease and a receiver
lower-boundary increase. The upper-side row requires a source upper-boundary
increase and a receiver upper-boundary decrease. These signed deltas encode the
screen inequality as an actual boundary-motion contract; they are not yet a
same-packet history update.

## Generator Contract

Required packet fields are:
\`${PACKET_GENERATOR_FIELDS.join("`, `")}\`.

The candidate artifact namespace is
\`${contract.generator_contract.candidate_artifact_namespace}\`.

The candidate replay output directory is
\`${contract.generator_contract.candidate_replay_output_dir}\`. This directory
carries the fold-coordinate candidate identity because the preledger scripts
emit hard-coded proof-interval basenames.

| Artifact | Expected file | Present |
| --- | --- | --- |
${artifactTable(contract.expected_candidate_artifacts)}

Replay order:

1. emit candidate \`phi_cyc\`;
2. emit candidate \`mesh\`;
3. emit candidate preledger input screen;
4. rerun candidate root-tube binary64 certificate;
5. rerun candidate root-tube outward-rational interval certificate;
6. rerun proof-interval preledger v1 through v6 in the candidate namespace.

The direct-path \`lambda=0.305\` artifacts remain contrast artifacts only. They
do not satisfy this fold-coordinate realization contract.

## Required-Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(contract)}

## Capture Decision

Priority-only theorem/generator contract. This is not ready for authored AAA
promotion because it supplies the exact proof burden rather than the proof. It
does close the previous ambiguity: candidate artifact emission is blocked until
the four \`fc_*\` variables have same-packet basis functions, derivative
consistency, mesh and endpoint update rules, monotonicity preservation, root
topology recertification, and a v1-v6 preledger replay in the candidate
namespace.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const contract = buildContract(
    {
      foldInput: readJson(args.foldInput),
      foldResult: readJson(args.foldResult),
      theoremAttempt: readJson(args.theoremAttempt),
      materializationAudit: readJson(args.materializationAudit),
    },
    {
      foldInput: args.foldInput,
      foldResult: args.foldResult,
      theoremAttempt: args.theoremAttempt,
      materializationAudit: args.materializationAudit,
    }
  );
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, contract, args.pretty);
  writeText(outReport, buildReport(contract));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
