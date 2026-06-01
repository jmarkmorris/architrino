#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fold_coordinate_history_realization_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_THEOREM_ATTEMPT = `${CERT_DIR}/fold_coordinate_history_realization_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_FOLD_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_input.nonlinear-v0.json`;
const DEFAULT_FOLD_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_result.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_finite_realization_basis_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_finite_realization_basis_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const BASIS_CONSTRUCTION_FIELDS = [
  "screen_variable_present",
  "basis_symbol_declared",
  "endpoint_boundary_action_declared",
  "endpoint_boundary_binding_present",
  "theta_support_present",
  "basis_formula_present",
  "basis_derivative_formula_present",
  "x_update_basis_present",
  "xdot_update_basis_present",
  "mesh_update_rule_present",
  "endpoint_motion_rule_present",
  "source_monotonicity_rule_present",
  "receiver_monotonicity_rule_present",
  "periodic_extension_rule_present",
  "c1_gluing_rule_present",
  "no_unintended_boundary_motion_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "finite_basis_ready",
];

const ROW_FIELDS = [
  "screen_positive_candidate_change_row",
  "signed_boundary_delta_contract_defined",
  "source_basis_ready",
  "receiver_basis_ready",
  "endpoint_functionals_certified",
  "same_packet_history_update_formula_present",
  "candidate_artifact_writers_authorized",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
];

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    theoremAttempt: DEFAULT_THEOREM_ATTEMPT,
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
    } else if (arg === "--theorem-attempt") {
      args.theoremAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-finite-realization-basis-attempt.mjs [options]

Options:
  --contract PATH         History-realization contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --theorem-attempt PATH  History-realization theorem-attempt JSON. Defaults to ${DEFAULT_THEOREM_ATTEMPT}.
  --fold-input PATH       Fold-coordinate collocation input JSON. Defaults to ${DEFAULT_FOLD_INPUT}.
  --fold-result PATH      Fold-coordinate collocation result JSON. Defaults to ${DEFAULT_FOLD_RESULT}.
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

function hasObjectField(record, field) {
  return record?.[field] !== undefined && record[field] !== null;
}

function countFields(rows, fields, key = "required_fields_present") {
  return Object.fromEntries(
    fields.map((field) => [field, rows.filter((row) => row[key]?.[field] === true).length])
  );
}

function assertInputs(contract, theoremAttempt, foldInput, foldResult) {
  if (contract.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected contract packet id: ${contract.packet_id}`);
  }
  if (contract.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected contract fold-coordinate packet id: ${contract.fold_coordinate_packet_id}`);
  }
  if (contract.status !== "fold_coordinate_history_realization_contract_defined_realization_absent") {
    throw new Error(`Unexpected contract status: ${contract.status}`);
  }
  if (theoremAttempt.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected theorem-attempt packet id: ${theoremAttempt.packet_id}`);
  }
  if (theoremAttempt.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected theorem-attempt fold-coordinate packet id: ${theoremAttempt.fold_coordinate_packet_id}`);
  }
  if (theoremAttempt.status !== "fold_coordinate_history_realization_theorem_attempt_fail_closed") {
    throw new Error(`Unexpected theorem-attempt status: ${theoremAttempt.status}`);
  }
  if (foldInput.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate input packet id: ${foldInput.packet_id}`);
  }
  if (foldResult.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate result packet id: ${foldResult.packet_id}`);
  }
  if (foldResult.status !== "feasible") {
    throw new Error(`Unexpected fold-coordinate result status: ${foldResult.status}`);
  }
  for (const input of [contract, theoremAttempt, foldInput, foldResult]) {
    if (input.branch_chart_authorized === true || input.preledger_pass === true || input.updates_live_ledger === true) {
      throw new Error("Refusing to build a finite-basis attempt from an authorized or live-updating input.");
    }
  }
  if (!Array.isArray(contract.realization_variables) || contract.realization_variables.length !== 4) {
    throw new Error("Expected exactly 4 contract realization variables.");
  }
  if (!Array.isArray(theoremAttempt.variable_attempts) || theoremAttempt.variable_attempts.length !== 4) {
    throw new Error("Expected exactly 4 theorem-attempt variables.");
  }
}

function expectedArtifactRecords(contract) {
  const artifacts = contract.generator_contract?.materialized_candidate_artifacts ?? {};
  return Object.fromEntries(
    Object.entries(artifacts).map(([name, artifact]) => [name, artifactRecord(artifact.path)])
  );
}

function requiredEndpointFunctional(variable) {
  const actions = variable.boundary_actions ?? [];
  const signs = variable.boundary_delta_signs ?? [];
  return actions.map((action, index) => ({
    action,
    sign: signs[index] ?? null,
    target_equation:
      signs[index] === undefined
        ? null
        : `E_${action}(${variable.basis_symbol}) = ${signs[index] > 0 ? "+1" : "-1"}`,
    zero_equation: `All non-target one-leaf boundary functionals vanish on ${variable.basis_symbol}.`,
  }));
}

function missingBasisFields(fields) {
  return BASIS_CONSTRUCTION_FIELDS.filter((field) => fields[field] !== true && field !== "finite_basis_ready");
}

function buildBasisAttempt(variable, theoremVariable, exactScreenZeroCertified, rankCertified) {
  const fields = {
    screen_variable_present: theoremVariable?.required_fields_present?.screen_coefficient_present === true,
    basis_symbol_declared: typeof variable.basis_symbol === "string" && variable.basis_symbol.length > 0,
    endpoint_boundary_action_declared:
      Array.isArray(variable.boundary_actions) && variable.boundary_actions.length > 0,
    endpoint_boundary_binding_present: hasObjectField(variable, "endpoint_boundary_binding"),
    theta_support_present: hasObjectField(variable, "theta_support"),
    basis_formula_present: hasObjectField(variable, "basis_formula"),
    basis_derivative_formula_present: hasObjectField(variable, "basis_derivative_formula"),
    x_update_basis_present: hasObjectField(variable, "x_update_basis"),
    xdot_update_basis_present: hasObjectField(variable, "xdot_update_basis"),
    mesh_update_rule_present: hasObjectField(variable, "mesh_update_rule"),
    endpoint_motion_rule_present: hasObjectField(variable, "endpoint_motion_rule"),
    source_monotonicity_rule_present: hasObjectField(variable, "source_monotonicity_rule"),
    receiver_monotonicity_rule_present: hasObjectField(variable, "receiver_monotonicity_rule"),
    periodic_extension_rule_present: hasObjectField(variable, "periodic_extension_rule"),
    c1_gluing_rule_present: hasObjectField(variable, "c1_gluing_rule"),
    no_unintended_boundary_motion_certified: hasObjectField(variable, "no_unintended_boundary_motion_certificate"),
    exact_screen_zero_certified: exactScreenZeroCertified,
    rank_certified: rankCertified,
    finite_basis_ready: false,
  };
  fields.finite_basis_ready = BASIS_CONSTRUCTION_FIELDS.every(
    (field) => field === "finite_basis_ready" || fields[field] === true
  );
  const missing = missingBasisFields(fields);
  return {
    id: variable.id,
    source_symbol: variable.source_symbol,
    basis_symbol: variable.basis_symbol,
    witness_coefficient_q: variable.witness_coefficient_q,
    row_uses: variable.row_uses,
    boundary_actions: variable.boundary_actions,
    boundary_delta_signs: variable.boundary_delta_signs,
    required_endpoint_functionals: requiredEndpointFunctional(variable),
    required_fields_present: fields,
    missing_basis_construction_fields: missing,
    finite_basis_ready: fields.finite_basis_ready,
    obstruction:
      fields.finite_basis_ready
        ? null
        : "The screen variable has a declared boundary action, but the current data do not bind that action to an exact endpoint functional on an explicit theta-support basis with derivative, mesh, endpoint, gluing, and monotonicity rules.",
  };
}

function buildRowAttempt(row, basisMap, artifacts) {
  const sourceBasis = basisMap.get(row.source_boundary_delta.variable);
  const receiverBasis = basisMap.get(row.receiver_boundary_delta.variable);
  const artifactsPresent = Object.values(artifacts).every((artifact) => artifact.present);
  const fields = {
    screen_positive_candidate_change_row: row.required_fields_present?.screen_positive_candidate_change_row === true,
    signed_boundary_delta_contract_defined:
      row.required_fields_present?.source_boundary_delta_contract_defined === true &&
      row.required_fields_present?.receiver_boundary_delta_contract_defined === true,
    source_basis_ready: sourceBasis?.finite_basis_ready === true,
    receiver_basis_ready: receiverBasis?.finite_basis_ready === true,
    endpoint_functionals_certified:
      sourceBasis?.required_fields_present.endpoint_boundary_binding_present === true &&
      receiverBasis?.required_fields_present.endpoint_boundary_binding_present === true,
    same_packet_history_update_formula_present:
      sourceBasis?.required_fields_present.x_update_basis_present === true &&
      receiverBasis?.required_fields_present.x_update_basis_present === true,
    candidate_artifact_writers_authorized: artifactsPresent,
    root_topology_recertified_for_candidate_change:
      artifacts.root_topology_interval_certificate?.present === true,
    proof_interval_v1_v6_rerun_for_candidate_change: artifacts.proof_interval_replay_audit?.present === true,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  const pass = ROW_FIELDS.every((field) => fields[field] === true);
  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    source_basis_id: row.source_boundary_delta.variable,
    receiver_basis_id: row.receiver_boundary_delta.variable,
    combined_boundary_opening_q: row.combined_boundary_opening_q,
    required_fields_present: fields,
    finite_basis_row_ready: pass,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has a signed screen-level boundary opening, but its source and receiver basis functions are not exact same-packet finite realizations and no candidate topology/preledger replay artifacts exist.",
  };
}

function buildAttempt(inputs, sources) {
  const { contract, theoremAttempt, foldInput, foldResult } = inputs;
  assertInputs(contract, theoremAttempt, foldInput, foldResult);
  const theoremVariables = new Map(theoremAttempt.variable_attempts.map((variable) => [variable.id, variable]));
  const exactScreenZeroCertified = theoremAttempt.summary?.exact_screen_zero_certified === true;
  const rankCertified = theoremAttempt.summary?.rank_certified === true;
  const artifacts = expectedArtifactRecords(contract);
  const basisAttempts = contract.realization_variables.map((variable) =>
    buildBasisAttempt(variable, theoremVariables.get(variable.id), exactScreenZeroCertified, rankCertified)
  );
  const basisMap = new Map(basisAttempts.map((basis) => [basis.id, basis]));
  const rowAttempts = contract.rows.map((row) => buildRowAttempt(row, basisMap, artifacts));
  const basisCounts = countFields(basisAttempts, BASIS_CONSTRUCTION_FIELDS);
  const rowCounts = countFields(rowAttempts, ROW_FIELDS);
  return {
    schema: "breather-higher-fold-fold-coordinate-finite-realization-basis-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    candidate_run_id: contract.candidate_run_id,
    artifact_stem: contract.artifact_stem,
    status: "fold_coordinate_finite_realization_basis_attempt_fail_closed",
    theorem_target: "Fold-Coordinate Exact Finite Basis Realization Attempt",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only finite-basis construction attempt; endpoint functional and same-packet basis data are absent",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_contract: path.basename(sources.contract),
    source_contract_sha256: sha256File(sources.contract),
    source_theorem_attempt: path.basename(sources.theoremAttempt),
    source_theorem_attempt_sha256: sha256File(sources.theoremAttempt),
    source_fold_coordinate_input: path.basename(sources.foldInput),
    source_fold_coordinate_input_sha256: sha256File(sources.foldInput),
    source_fold_coordinate_result: path.basename(sources.foldResult),
    source_fold_coordinate_result_sha256: sha256File(sources.foldResult),
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
    finite_basis_data_lemma:
      "A fold-coordinate basis function Psi_j can realize a same-packet boundary-opening variable only when an exact endpoint functional evaluates to the signed boundary action, all non-target one-leaf endpoint functionals vanish or are explicitly accounted for, and the same Psi_j carries theta support, basis and derivative formulas, X and Xdot update bases, mesh update, endpoint motion, periodic/gluing rules, source/receiver monotonicity, exact B_xi=0, and rank certification.",
    rejection_rule:
      "A declared basis symbol, witness coefficient, signed boundary-delta contract, or tolerance-level tangent-screen residual is not an exact finite same-packet basis realization.",
    candidate_artifacts: artifacts,
    basis_attempts: basisAttempts,
    row_attempts: rowAttempts,
    summary: {
      basis_variables: basisAttempts.length,
      screen_variables_present: basisCounts.screen_variable_present,
      variables_with_screen_coefficient: basisCounts.screen_variable_present,
      variables_with_signed_boundary_contract: basisCounts.endpoint_boundary_action_declared,
      basis_symbols_declared: basisCounts.basis_symbol_declared,
      variables_with_basis_symbol: basisCounts.basis_symbol_declared,
      endpoint_boundary_actions_declared: basisCounts.endpoint_boundary_action_declared,
      endpoint_boundary_bindings_present: basisCounts.endpoint_boundary_binding_present,
      theta_supports_present: basisCounts.theta_support_present,
      variables_with_theta_support: basisCounts.theta_support_present,
      basis_formulas_present: basisCounts.basis_formula_present,
      variables_with_finite_basis_formula: basisCounts.basis_formula_present,
      basis_derivative_formulas_present: basisCounts.basis_derivative_formula_present,
      variables_with_derivative_basis: basisCounts.basis_derivative_formula_present,
      x_update_bases_present: basisCounts.x_update_basis_present,
      xdot_update_bases_present: basisCounts.xdot_update_basis_present,
      mesh_update_rules_present: basisCounts.mesh_update_rule_present,
      variables_with_mesh_update_rule: basisCounts.mesh_update_rule_present,
      endpoint_motion_rules_present: basisCounts.endpoint_motion_rule_present,
      variables_with_endpoint_motion_rule: basisCounts.endpoint_motion_rule_present,
      source_monotonicity_rules_present: basisCounts.source_monotonicity_rule_present,
      variables_with_source_monotonicity_rule: basisCounts.source_monotonicity_rule_present,
      receiver_monotonicity_rules_present: basisCounts.receiver_monotonicity_rule_present,
      variables_with_receiver_monotonicity_rule: basisCounts.receiver_monotonicity_rule_present,
      periodic_extension_rules_present: basisCounts.periodic_extension_rule_present,
      c1_gluing_rules_present: basisCounts.c1_gluing_rule_present,
      no_unintended_boundary_motion_certificates_present:
        basisCounts.no_unintended_boundary_motion_certified,
      exact_screen_zero_certified: exactScreenZeroCertified,
      rank_certified: rankCertified,
      finite_basis_ready_variables: basisCounts.finite_basis_ready,
      variables_ready_for_finite_realization: basisCounts.finite_basis_ready,
      rows: rowAttempts.length,
      screen_positive_rows: rowCounts.screen_positive_candidate_change_row,
      signed_boundary_delta_rows: rowCounts.signed_boundary_delta_contract_defined,
      rows_with_source_basis_ready: rowCounts.source_basis_ready,
      rows_with_receiver_basis_ready: rowCounts.receiver_basis_ready,
      finite_basis_ready_rows: rowAttempts.filter((row) => row.finite_basis_row_ready).length,
      candidate_artifacts_present: Object.values(artifacts).filter((artifact) => artifact.present).length,
      candidate_artifact_count: Object.values(artifacts).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      basis_required_fields_certified_counts: basisCounts,
      row_required_fields_certified_counts: rowCounts,
    },
  };
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function basisTable(attempts) {
  return attempts
    .map(
      (basis) =>
        `| \`${basis.id}\` | \`${basis.basis_symbol}\` | ${basis.required_fields_present.endpoint_boundary_action_declared} | ${basis.required_fields_present.endpoint_boundary_binding_present} | ${basis.required_fields_present.theta_support_present} | ${basis.required_fields_present.basis_formula_present} | ${basis.required_fields_present.basis_derivative_formula_present} | ${basis.finite_basis_ready} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.source_basis_id}\` | \`${row.receiver_basis_id}\` | ${row.required_fields_present.source_basis_ready} | ${row.required_fields_present.receiver_basis_ready} | ${row.required_fields_present.endpoint_functionals_certified} | ${row.finite_basis_row_ready} |`
    )
    .join("\n");
}

function artifactTable(artifacts) {
  return Object.entries(artifacts)
    .map(([name, artifact]) => `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present} |`)
    .join("\n");
}

function endpointFunctionalTable(attempts) {
  return attempts
    .flatMap((basis) =>
      basis.required_endpoint_functionals.map(
        (functional) =>
          `| \`${basis.id}\` | \`${functional.action}\` | ${functional.sign} | \`${functional.target_equation}\` |`
      )
    )
    .join("\n");
}

function buildReport(attempt) {
  return `# Higher-Fold Fold-Coordinate Finite-Realization Basis Attempt

## Verdict

The finite-basis construction attempt fail-closes. The current artifacts declare
four fold-coordinate screen variables and the signed boundary actions they would
need to realize, but none of the four variables is bound to an exact endpoint
functional on an explicit finite same-packet basis.

| Quantity | Value |
| --- | ---: |
| Basis variables | ${attempt.summary.basis_variables} |
| Screen variables present | ${attempt.summary.screen_variables_present} |
| Basis symbols declared | ${attempt.summary.basis_symbols_declared} |
| Endpoint boundary actions declared | ${attempt.summary.endpoint_boundary_actions_declared} |
| Endpoint boundary bindings present | ${attempt.summary.endpoint_boundary_bindings_present} |
| Theta supports present | ${attempt.summary.theta_supports_present} |
| Basis formulas present | ${attempt.summary.basis_formulas_present} |
| Basis derivative formulas present | ${attempt.summary.basis_derivative_formulas_present} |
| Finite-basis-ready variables | ${attempt.summary.finite_basis_ready_variables} |
| Finite-basis-ready rows | ${attempt.summary.finite_basis_ready_rows} |
| Candidate artifacts present | ${attempt.summary.candidate_artifacts_present} / ${attempt.summary.candidate_artifact_count} |
| Row consumption count | ${attempt.summary.row_consumption_count} |

## Finite-Basis Data Lemma

A fold-coordinate basis function $\\Psi_j$ can realize a same-packet
boundary-opening variable only when an exact endpoint functional evaluates to
the signed boundary action, all non-target one-leaf endpoint functionals vanish
or are explicitly accounted for, and the same $\\Psi_j$ carries theta support,
basis and derivative formulas, $X$ and $\\dot X$ update bases, mesh update,
endpoint motion, periodic/gluing rules, source/receiver monotonicity, exact
$B\\xi=0$, and rank certification.

The present data satisfy only the first three parts of this lemma: each variable
exists in the screen, has a declared basis symbol, and names the desired
boundary action. The endpoint functional, support, formula, derivative, mesh,
endpoint, gluing, and monotonicity data are absent. Therefore no candidate
\`phi_cyc\`, \`mesh\`, root-topology certificate, or proof-interval replay may
be emitted from this basis attempt.

## Required Endpoint Functionals

| Variable | Boundary action | Sign | Required target equation |
| --- | --- | ---: | --- |
${endpointFunctionalTable(attempt.basis_attempts)}

## Basis Attempt

| Variable | Basis symbol | Action declared | Endpoint binding | Theta support | Basis formula | Derivative formula | Ready |
| --- | --- | --- | --- | --- | --- | --- | --- |
${basisTable(attempt.basis_attempts)}

## Basis-Field Audit

| Field | Variables certified |
| --- | ---: |
${fieldTable(
  attempt.summary.basis_required_fields_certified_counts,
  BASIS_CONSTRUCTION_FIELDS,
  attempt.summary.basis_variables
)}

## Row Attempt

| Row | Source basis | Receiver basis | Source ready | Receiver ready | Endpoint functionals | Row ready |
| --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_attempts)}

## Candidate Artifacts

| Artifact | Expected file | Present |
| --- | --- | --- |
${artifactTable(attempt.candidate_artifacts)}

## Closure Burden

The next proof object is an exact finite construction of
$\\Psi_{\\mathrm{fc\\_sigma\\_source\\_lower}}$,
$\\Psi_{\\mathrm{fc\\_rho\\_receiver\\_lower}}$,
$\\Psi_{\\mathrm{fc\\_sigma\\_source\\_upper}}$, and
$\\Psi_{\\mathrm{fc\\_rho\\_receiver\\_upper}}$ with endpoint functionals that
evaluate to the required signed boundary motions and vanish on non-target
one-leaf boundary functionals. That construction must also provide support,
basis and derivative formulas, $X$ and $\\dot X$ update bases, mesh and endpoint
rules, source/receiver monotonicity, exact $B\\xi=0$, rank certification, and
candidate-specific topology plus v1-v6 replay.

## Capture Decision

Priority-only construction attempt. This packet sharpens the blocker from
"finite basis absent" to "endpoint-functional finite basis data absent." It is
not ready for authored AAA promotion because it does not supply the basis; it
records the exact data lemma that any future basis construction must satisfy.
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
      theoremAttempt: readJson(args.theoremAttempt),
      foldInput: readJson(args.foldInput),
      foldResult: readJson(args.foldResult),
    },
    {
      contract: args.contract,
      theoremAttempt: args.theoremAttempt,
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
