#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fold_coordinate_history_realization_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_FOLD_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_input.nonlinear-v0.json`;
const DEFAULT_FOLD_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_result.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_history_realization_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_history_realization_theorem_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const REALIZATION_FIELDS = [
  "same_packet_history_update_formula",
  "theta_support",
  "x_update_basis",
  "xdot_update_basis",
  "mesh_update_rule",
  "endpoint_motion_rule",
  "source_monotonicity_rule",
  "receiver_monotonicity_rule",
];

const VARIABLE_CHECK_FIELDS = [
  "contract_variable_present",
  "screen_coefficient_present",
  "basis_symbol_declared",
  "signed_boundary_delta_contract_present",
  "same_packet_history_update_formula_present",
  "theta_support_present",
  "x_update_basis_present",
  "xdot_update_basis_present",
  "mesh_update_rule_present",
  "endpoint_motion_rule_present",
  "source_monotonicity_rule_present",
  "receiver_monotonicity_rule_present",
  "exact_screen_zero_certified",
  "rank_certified",
  "realization_theorem_ready",
];

const ROW_CHECK_FIELDS = [
  "screen_positive_candidate_change_row",
  "signed_boundary_delta_contract_defined",
  "source_variable_realized",
  "receiver_variable_realized",
  "same_packet_candidate_change_data_present",
  "strict_combined_boundary_opening_proof_grade",
  "candidate_artifact_writers_authorized",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
];

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    foldInput: DEFAULT_FOLD_INPUT,
    foldResult: DEFAULT_FOLD_RESULT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--contract") {
      args.contract = argv[++index];
    } else if (arg === "--fold-input") {
      args.foldInput = argv[++index];
    } else if (arg === "--fold-result") {
      args.foldResult = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-history-realization-theorem-attempt.mjs [options]

Options:
  --contract PATH     History-realization contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --fold-input PATH   Fold-coordinate collocation input JSON. Defaults to ${DEFAULT_FOLD_INPUT}.
  --fold-result PATH  Fold-coordinate collocation result JSON. Defaults to ${DEFAULT_FOLD_RESULT}.
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

function artifactRecord(filePath) {
  const present = fs.existsSync(filePath);
  return {
    path: filePath,
    basename: path.basename(filePath),
    present,
    sha256: present ? sha256File(filePath) : null,
  };
}

function hasObjectField(record, field) {
  return record?.[field] !== undefined && record[field] !== null;
}

function fieldCounts(rows, fields, key = "required_fields_present") {
  return Object.fromEntries(
    fields.map((field) => [field, rows.filter((row) => row[key]?.[field] === true).length])
  );
}

function assertInputs(contract, foldInput, foldResult) {
  if (contract.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected contract packet id: ${contract.packet_id}`);
  }
  if (contract.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected contract fold-coordinate packet id: ${contract.fold_coordinate_packet_id}`);
  }
  if (contract.status !== "fold_coordinate_history_realization_contract_defined_realization_absent") {
    throw new Error(`Unexpected contract status: ${contract.status}`);
  }
  if (foldInput.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate input packet id: ${foldInput.packet_id}`);
  }
  if (foldResult.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate result packet id: ${foldResult.packet_id}`);
  }
  for (const input of [contract, foldInput, foldResult]) {
    if (input.branch_chart_authorized === true || input.preledger_pass === true || input.updates_live_ledger === true) {
      throw new Error("Refusing to build a theorem attempt from an authorized or live-updating input.");
    }
  }
  if (!Array.isArray(contract.realization_variables) || contract.realization_variables.length !== 4) {
    throw new Error("Expected exactly 4 realization variables.");
  }
  if (!Array.isArray(contract.rows) || contract.rows.length !== 3) {
    throw new Error("Expected exactly 3 contract rows.");
  }
}

function expectedArtifactRecords(contract) {
  const artifacts = contract.generator_contract?.materialized_candidate_artifacts ?? {};
  return Object.fromEntries(
    Object.entries(artifacts).map(([name, artifact]) => [name, artifactRecord(artifact.path)])
  );
}

function buildVariableAttempt(variable, foldResult, contract) {
  const presentFields = REALIZATION_FIELDS.filter((field) => hasObjectField(variable, field));
  const missingFields = REALIZATION_FIELDS.filter((field) => !presentFields.includes(field));
  const fields = {
    contract_variable_present: true,
    screen_coefficient_present: Number.isFinite(Number(variable.witness_coefficient_q?.display)),
    basis_symbol_declared: typeof variable.basis_symbol === "string" && variable.basis_symbol.length > 0,
    signed_boundary_delta_contract_present:
      Array.isArray(variable.boundary_delta_contracts) && variable.boundary_delta_contracts.length > 0,
    same_packet_history_update_formula_present: hasObjectField(variable, "same_packet_history_update_formula"),
    theta_support_present: hasObjectField(variable, "theta_support"),
    x_update_basis_present: hasObjectField(variable, "x_update_basis"),
    xdot_update_basis_present: hasObjectField(variable, "xdot_update_basis"),
    mesh_update_rule_present: hasObjectField(variable, "mesh_update_rule"),
    endpoint_motion_rule_present: hasObjectField(variable, "endpoint_motion_rule"),
    source_monotonicity_rule_present: hasObjectField(variable, "source_monotonicity_rule"),
    receiver_monotonicity_rule_present: hasObjectField(variable, "receiver_monotonicity_rule"),
    exact_screen_zero_certified: foldResult.B_xi_residual_certified_zero === true,
    rank_certified: foldResult.rank_B_certified === true,
    realization_theorem_ready: false,
  };
  fields.realization_theorem_ready =
    REALIZATION_FIELDS.every((field) => hasObjectField(variable, field)) &&
    fields.exact_screen_zero_certified &&
    fields.rank_certified;
  return {
    id: variable.id,
    source_symbol: variable.source_symbol,
    witness_coefficient_q: variable.witness_coefficient_q,
    basis_symbol: variable.basis_symbol,
    history_update_term: variable.history_update_term,
    row_uses: variable.row_uses,
    boundary_delta_contracts: variable.boundary_delta_contracts,
    present_realization_fields: presentFields,
    missing_realization_fields: missingFields,
    required_fields_present: fields,
    realization_theorem_ready: fields.realization_theorem_ready,
    blocker:
      fields.realization_theorem_ready
        ? null
        : "The variable has a screen coefficient and signed boundary contract, but no exact same-packet basis formula/support/derivative/mesh/endpoint/monotonicity realization; the B_xi evidence is not exact-certified.",
    contract_reference: {
      candidate_run_id: contract.candidate_run_id,
      artifact_stem: contract.artifact_stem,
    },
  };
}

function buildRowAttempt(row, variableMap, candidateArtifacts) {
  const sourceVariable = variableMap.get(row.source_boundary_delta.variable);
  const receiverVariable = variableMap.get(row.receiver_boundary_delta.variable);
  const allCandidateArtifactsPresent = Object.values(candidateArtifacts).every((artifact) => artifact.present);
  const fields = {
    screen_positive_candidate_change_row: row.required_fields_present?.screen_positive_candidate_change_row === true,
    signed_boundary_delta_contract_defined:
      row.required_fields_present?.source_boundary_delta_contract_defined === true &&
      row.required_fields_present?.receiver_boundary_delta_contract_defined === true,
    source_variable_realized: sourceVariable?.realization_theorem_ready === true,
    receiver_variable_realized: receiverVariable?.realization_theorem_ready === true,
    same_packet_candidate_change_data_present: false,
    strict_combined_boundary_opening_proof_grade: false,
    candidate_artifact_writers_authorized: allCandidateArtifactsPresent,
    root_topology_recertified_for_candidate_change:
      candidateArtifacts.root_topology_interval_certificate?.present === true,
    proof_interval_v1_v6_rerun_for_candidate_change: candidateArtifacts.proof_interval_replay_audit?.present === true,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.same_packet_candidate_change_data_present =
    fields.source_variable_realized && fields.receiver_variable_realized && fields.candidate_artifact_writers_authorized;
  fields.strict_combined_boundary_opening_proof_grade =
    fields.same_packet_candidate_change_data_present &&
    fields.root_topology_recertified_for_candidate_change &&
    fields.proof_interval_v1_v6_rerun_for_candidate_change;
  const pass = ROW_CHECK_FIELDS.every((field) => fields[field] === true);
  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    source_boundary_delta: row.source_boundary_delta,
    receiver_boundary_delta: row.receiver_boundary_delta,
    combined_boundary_opening_q: row.combined_boundary_opening_q,
    combined_boundary_opening_margin_q: row.combined_boundary_opening_margin_q,
    required_fields_present: fields,
    realization_pass_rule_satisfied: pass,
    row_consumed: false,
    branch_chart_authorized: false,
    theorem_blocker:
      "The signed boundary contract is present, but the source and receiver variables are not exact same-packet realizations and candidate topology/preledger replay artifacts are absent.",
  };
}

function buildAttempt(inputs, sources) {
  const { contract, foldInput, foldResult } = inputs;
  assertInputs(contract, foldInput, foldResult);
  const candidateArtifacts = expectedArtifactRecords(contract);
  const variableAttempts = contract.realization_variables.map((variable) =>
    buildVariableAttempt(variable, foldResult, contract)
  );
  const variableMap = new Map(variableAttempts.map((variable) => [variable.id, variable]));
  const rowAttempts = contract.rows.map((row) => buildRowAttempt(row, variableMap, candidateArtifacts));
  const variableCounts = fieldCounts(variableAttempts, VARIABLE_CHECK_FIELDS);
  const rowCounts = fieldCounts(rowAttempts, ROW_CHECK_FIELDS);
  return {
    schema: "breather-higher-fold-fold-coordinate-history-realization-theorem-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    candidate_run_id: contract.candidate_run_id,
    artifact_stem: contract.artifact_stem,
    status: "fold_coordinate_history_realization_theorem_attempt_fail_closed",
    theorem_target: "Fold-Coordinate Same-Packet History Realization Theorem Attempt",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only theorem attempt; screen-positive boundary deltas are present, exact same-packet realization formulas are absent",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_contract: path.basename(sources.contract),
    source_contract_sha256: sha256File(sources.contract),
    source_fold_coordinate_input: path.basename(sources.foldInput),
    source_fold_coordinate_input_sha256: sha256File(sources.foldInput),
    source_fold_coordinate_result: path.basename(sources.foldResult),
    source_fold_coordinate_result_sha256: sha256File(sources.foldResult),
    theorem_rule:
      "A fold-coordinate realization theorem passes only when each fc_* variable has exact same-packet formula, support, derivative basis, mesh update, endpoint motion, and source/receiver monotonicity rules, and when candidate phi/mesh/input, root topology, and v1-v6 replay artifacts exist in the same candidate namespace.",
    rejection_rule:
      "A symbolic basis name, signed boundary delta, feasible tangent screen, or tolerance-level B_xi residual is not a same-packet history realization.",
    fold_coordinate_screen_guard: {
      scanner_status: foldResult.status,
      B_xi_residual_verified_zero_with_tolerance: foldResult.B_xi_residual_verified_zero_with_tolerance,
      B_xi_residual_certified_zero: foldResult.B_xi_residual_certified_zero,
      rank_B_certified: foldResult.rank_B_certified,
      one_leaf_screen_level_success: foldResult.one_leaf_screen_level_success,
      claims_live_candidate: foldInput.claim_limits?.claims_live_candidate === true,
      claims_preledger_pass: foldInput.claim_limits?.claims_preledger_pass === true,
      claims_branch_chart_authorization: foldInput.claim_limits?.claims_branch_chart_authorization === true,
    },
    candidate_artifacts: candidateArtifacts,
    variable_attempts: variableAttempts,
    row_attempts: rowAttempts,
    summary: {
      variables: variableAttempts.length,
      variables_with_screen_coefficient: variableCounts.screen_coefficient_present,
      variables_with_signed_boundary_contract: variableCounts.signed_boundary_delta_contract_present,
      variables_with_all_realization_fields: variableAttempts.filter(
        (variable) => variable.missing_realization_fields.length === 0
      ).length,
      variables_ready_for_theorem: variableCounts.realization_theorem_ready,
      realization_fields_required_per_variable: REALIZATION_FIELDS.length,
      exact_screen_zero_certified: foldResult.B_xi_residual_certified_zero === true,
      rank_certified: foldResult.rank_B_certified === true,
      rows: rowAttempts.length,
      screen_positive_rows: rowCounts.screen_positive_candidate_change_row,
      signed_boundary_delta_rows: rowCounts.signed_boundary_delta_contract_defined,
      rows_with_both_variables_realized: rowAttempts.filter(
        (row) =>
          row.required_fields_present.source_variable_realized === true &&
          row.required_fields_present.receiver_variable_realized === true
      ).length,
      candidate_artifacts_present: Object.values(candidateArtifacts).filter((artifact) => artifact.present).length,
      candidate_artifact_count: Object.values(candidateArtifacts).length,
      root_topology_recertified_rows: rowCounts.root_topology_recertified_for_candidate_change,
      proof_interval_v1_v6_rerun_rows: rowCounts.proof_interval_v1_v6_rerun_for_candidate_change,
      theorem_ready_rows: rowAttempts.filter((row) => row.realization_pass_rule_satisfied).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      variable_required_fields_certified_counts: variableCounts,
      row_required_fields_certified_counts: rowCounts,
    },
  };
}

function artifactTable(artifacts) {
  return Object.entries(artifacts)
    .map(([name, artifact]) => `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present} |`)
    .join("\n");
}

function variableTable(variables) {
  return variables
    .map(
      (variable) =>
        `| \`${variable.id}\` | \`${variable.witness_coefficient_q.display}\` | ${variable.present_realization_fields.length} / ${REALIZATION_FIELDS.length} | ${variable.required_fields_present.exact_screen_zero_certified} | ${variable.required_fields_present.rank_certified} | ${variable.realization_theorem_ready} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | \`${row.source_boundary_delta.boundary_delta_q.display}\` | \`${row.receiver_boundary_delta.boundary_delta_q.display}\` | ${row.required_fields_present.source_variable_realized} | ${row.required_fields_present.receiver_variable_realized} | ${row.required_fields_present.root_topology_recertified_for_candidate_change} | ${row.required_fields_present.proof_interval_v1_v6_rerun_for_candidate_change} | ${row.realization_pass_rule_satisfied} |`
    )
    .join("\n");
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function buildReport(attempt) {
  return `# Higher-Fold Fold-Coordinate History-Realization Theorem Attempt

## Verdict

The realization theorem attempt fail-closes. The contract has a useful signed
boundary-motion target, but the current data still do not supply a finite
same-packet history realization for any of the four \`fc_*\` variables.

| Quantity | Value |
| --- | ---: |
| Variables | ${attempt.summary.variables} |
| Variables with screen coefficient | ${attempt.summary.variables_with_screen_coefficient} |
| Variables with signed boundary contract | ${attempt.summary.variables_with_signed_boundary_contract} |
| Variables with all realization fields | ${attempt.summary.variables_with_all_realization_fields} |
| Variables ready for theorem | ${attempt.summary.variables_ready_for_theorem} |
| Rows | ${attempt.summary.rows} |
| Screen-positive rows | ${attempt.summary.screen_positive_rows} |
| Signed boundary-delta rows | ${attempt.summary.signed_boundary_delta_rows} |
| Rows with both variables realized | ${attempt.summary.rows_with_both_variables_realized} |
| Candidate artifacts present | ${attempt.summary.candidate_artifacts_present} / ${attempt.summary.candidate_artifact_count} |
| Theorem-ready rows | ${attempt.summary.theorem_ready_rows} |
| Row consumption count | ${attempt.summary.row_consumption_count} |

## Exactness Gate

The current tangent screen verifies $B\\xi=0$ only at tolerance level:
\`${attempt.fold_coordinate_screen_guard.B_xi_residual_verified_zero_with_tolerance}\`.
It does not certify exact zero:
\`${attempt.fold_coordinate_screen_guard.B_xi_residual_certified_zero}\`,
and it does not certify rank:
\`${attempt.fold_coordinate_screen_guard.rank_B_certified}\`.

This attempt therefore rejects the symbolic form
$\\Delta X_{\\mathrm{fc}}(\\theta;\\xi)=\\sum_j\\xi_j\\Psi_j(\\theta)$ as a realized
same-packet history until each $\\Psi_j$ is supplied as an exact finite basis
with support, derivative, mesh, endpoint, and monotonicity rules.

## Variable Attempt

| Variable | Witness coefficient | Realization fields present | Exact zero | Rank certified | Theorem ready |
| --- | ---: | ---: | --- | --- | --- |
${variableTable(attempt.variable_attempts)}

## Candidate Artifacts

| Artifact | Expected file | Present |
| --- | --- | --- |
${artifactTable(attempt.candidate_artifacts)}

## Row Attempt

| Row | Failed side | Source delta | Receiver delta | Source realized | Receiver realized | Root recertified | v1-v6 replay | Pass |
| --- | --- | ---: | ---: | --- | --- | --- | --- | --- |
${rowTable(attempt.row_attempts)}

## Variable-Field Audit

| Field | Variables certified |
| --- | ---: |
${fieldTable(attempt.summary.variable_required_fields_certified_counts, VARIABLE_CHECK_FIELDS, attempt.summary.variables)}

## Row-Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(attempt.summary.row_required_fields_certified_counts, ROW_CHECK_FIELDS, attempt.summary.rows)}

## Closure Burden

The next mathematical object is no longer another screen or another contract.
It is an exact finite basis construction for the four functions
$\\Psi_{\\mathrm{fc\\_sigma\\_source\\_lower}}$,
$\\Psi_{\\mathrm{fc\\_rho\\_receiver\\_lower}}$,
$\\Psi_{\\mathrm{fc\\_sigma\\_source\\_upper}}$, and
$\\Psi_{\\mathrm{fc\\_rho\\_receiver\\_upper}}$, including their derivative,
support, mesh, endpoint, and monotonicity rules. Only after that basis exists
can candidate \`phi_cyc\`, \`mesh\`, input screen, topology, and v1-v6 replay
artifacts be emitted for the fold-coordinate namespace.

## Capture Decision

Priority-only theorem attempt. This packet sharpens the blocker from
"contract defined" to "basis construction absent." It is not ready for authored
AAA promotion because it proves absence under current priority data rather than
supplying the finite realization theorem.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const attempt = buildAttempt(
    {
      contract: readJson(args.contract),
      foldInput: readJson(args.foldInput),
      foldResult: readJson(args.foldResult),
    },
    {
      contract: args.contract,
      foldInput: args.foldInput,
      foldResult: args.foldResult,
    }
  );
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, attempt, args.pretty);
  writeText(outReport, buildReport(attempt));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
