#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SOURCE_AUDIT = `${CERT_DIR}/fold_coordinate_endpoint_functional_source_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BASIS_ATTEMPT = `${CERT_DIR}/fold_coordinate_finite_realization_basis_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_FOLD_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_input.nonlinear-v0.json`;
const DEFAULT_FOLD_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_result.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_CONSTRUCTION_FIELDS = [
  "endpoint_locator_resolved",
  "endpoint_value_present",
  "endpoint_boundary_binding_present",
  "endpoint_functional_domain_present",
  "functional_target_equation_defined",
  "target_action_sign_consistent",
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
  "non_target_endpoint_functionals_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "construction_ready",
];

const ROW_CONSTRUCTION_FIELDS = [
  "row_locator_resolved",
  "source_endpoint_functional_constructed",
  "receiver_endpoint_functional_constructed",
  "combined_endpoint_functional_pair_constructed",
  "screen_positive_candidate_change_row",
  "proof_grade_boundary_opening_certified",
  "same_packet_history_update_formula_present",
  "candidate_artifact_writers_authorized",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
];

function parseArgs(argv) {
  const args = {
    sourceAudit: DEFAULT_SOURCE_AUDIT,
    basisAttempt: DEFAULT_BASIS_ATTEMPT,
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
    } else if (arg === "--source-audit") {
      args.sourceAudit = argv[++index];
    } else if (arg === "--basis-attempt") {
      args.basisAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-construction-attempt.mjs [options]

Options:
  --source-audit PATH   Endpoint-functional source audit JSON. Defaults to ${DEFAULT_SOURCE_AUDIT}.
  --basis-attempt PATH  Finite-realization basis attempt JSON. Defaults to ${DEFAULT_BASIS_ATTEMPT}.
  --fold-input PATH     Fold-coordinate collocation input JSON. Defaults to ${DEFAULT_FOLD_INPUT}.
  --fold-result PATH    Fold-coordinate collocation result JSON. Defaults to ${DEFAULT_FOLD_RESULT}.
  --out-dir PATH        Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty              Pretty-print JSON artifact.
  --help                Show this help.`);
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

function byId(rows, idField = "id") {
  return new Map((rows ?? []).map((row) => [row[idField], row]));
}

function countFields(rows, fields, key = "required_fields_present") {
  return Object.fromEntries(
    fields.map((field) => [field, rows.filter((row) => row[key]?.[field] === true).length])
  );
}

function assertCommonProofInput(input, label) {
  if (input.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${label} packet id: ${input.packet_id}`);
  }
  if (input.branch_chart_authorized === true || input.preledger_pass === true || input.updates_live_ledger === true) {
    throw new Error(`Refusing to build construction attempt from an authorized or live-updating ${label}.`);
  }
}

function assertInputs(inputs) {
  assertCommonProofInput(inputs.sourceAudit, "source audit");
  assertCommonProofInput(inputs.basisAttempt, "basis attempt");
  if (inputs.foldInput.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate input packet id: ${inputs.foldInput.packet_id}`);
  }
  if (inputs.foldResult.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate result packet id: ${inputs.foldResult.packet_id}`);
  }
  if (inputs.foldInput.claim_limits?.claims_branch_chart_authorization === true) {
    throw new Error("Refusing to use a fold-coordinate input that claims branch-chart authorization.");
  }
  if (inputs.foldResult.branch_chart_authorized === true || inputs.foldResult.preledger_pass === true) {
    throw new Error("Refusing to use an authorized or passed fold-coordinate result.");
  }
  if (inputs.sourceAudit.status !== "fold_coordinate_endpoint_functional_source_audit_fail_closed") {
    throw new Error(`Unexpected source-audit status: ${inputs.sourceAudit.status}`);
  }
  if (inputs.basisAttempt.status !== "fold_coordinate_finite_realization_basis_attempt_fail_closed") {
    throw new Error(`Unexpected basis-attempt status: ${inputs.basisAttempt.status}`);
  }
  if (!Array.isArray(inputs.sourceAudit.variable_sources) || inputs.sourceAudit.variable_sources.length !== 4) {
    throw new Error("Expected exactly 4 endpoint source variables.");
  }
  if (!Array.isArray(inputs.sourceAudit.row_sources) || inputs.sourceAudit.row_sources.length !== 3) {
    throw new Error("Expected exactly 3 endpoint source rows.");
  }
}

function sourceVariableIsLocatorReady(sourceVariable) {
  const fields = sourceVariable.required_fields_present ?? {};
  return (
    fields.endpoint_locator_resolved === true ||
    (fields.target_endpoint_ref_declared === true &&
      fields.row_uses_covered === true &&
      fields.boundary_delta_sign_consistent === true)
  );
}

function sourceRowIsLocatorReady(row) {
  const fields = row.required_fields_present ?? {};
  return (
    fields.one_leaf_row_present === true &&
    fields.screen_row_resolved === true &&
    fields.mesh_receiver_interval_resolved === true &&
    fields.mesh_source_interval_resolved === true &&
    fields.source_cover_atlas_row_resolved === true &&
    fields.ownership_audit_row_resolved === true &&
    fields.ownership_component_resolved === true &&
    fields.source_boundary_ref_declared === true &&
    fields.receiver_boundary_ref_declared === true
  );
}

function buildEndpointFunctionalAttempt(sourceVariable, basisVariable, foldResult) {
  const sourceFields = sourceVariable.required_fields_present ?? {};
  const basisFields = basisVariable?.required_fields_present ?? {};
  const requiredFunctionals = basisVariable?.required_endpoint_functionals ?? sourceVariable.required_endpoint_functionals ?? [];
  const fields = {
    endpoint_locator_resolved: sourceVariableIsLocatorReady(sourceVariable),
    endpoint_value_present: sourceFields.target_endpoint_value_present === true,
    endpoint_boundary_binding_present:
      sourceFields.endpoint_boundary_binding_present === true || basisFields.endpoint_boundary_binding_present === true,
    endpoint_functional_domain_present: sourceFields.endpoint_functional_domain_present === true,
    functional_target_equation_defined:
      requiredFunctionals.length > 0 &&
      requiredFunctionals.every((functional) => typeof functional.target_equation === "string"),
    target_action_sign_consistent: sourceFields.boundary_delta_sign_consistent === true,
    theta_support_present: sourceFields.theta_support_present === true || basisFields.theta_support_present === true,
    basis_formula_present: sourceFields.basis_formula_present === true || basisFields.basis_formula_present === true,
    basis_derivative_formula_present:
      sourceFields.basis_derivative_formula_present === true || basisFields.basis_derivative_formula_present === true,
    x_update_basis_present: sourceFields.x_update_basis_present === true || basisFields.x_update_basis_present === true,
    xdot_update_basis_present:
      sourceFields.xdot_update_basis_present === true || basisFields.xdot_update_basis_present === true,
    mesh_update_rule_present: sourceFields.mesh_update_rule_present === true || basisFields.mesh_update_rule_present === true,
    endpoint_motion_rule_present:
      sourceFields.endpoint_motion_rule_present === true || basisFields.endpoint_motion_rule_present === true,
    source_monotonicity_rule_present:
      sourceFields.source_monotonicity_rule_present === true || basisFields.source_monotonicity_rule_present === true,
    receiver_monotonicity_rule_present:
      sourceFields.receiver_monotonicity_rule_present === true || basisFields.receiver_monotonicity_rule_present === true,
    periodic_extension_rule_present:
      sourceFields.periodic_extension_rule_present === true || basisFields.periodic_extension_rule_present === true,
    c1_gluing_rule_present: sourceFields.c1_gluing_rule_present === true || basisFields.c1_gluing_rule_present === true,
    non_target_endpoint_functionals_zero_certified:
      sourceFields.non_target_endpoint_functionals_zero_certified === true ||
      basisFields.no_unintended_boundary_motion_certified === true,
    exact_screen_zero_certified:
      sourceFields.exact_screen_zero_certified === true || foldResult.B_xi_residual_certified_zero === true,
    rank_certified: sourceFields.rank_certified === true || foldResult.rank_B_certified === true,
    construction_ready: false,
  };
  fields.construction_ready = ENDPOINT_CONSTRUCTION_FIELDS.every(
    (field) => field === "construction_ready" || fields[field] === true
  );
  return {
    id: sourceVariable.id,
    endpoint_functional_id: `E_${sourceVariable.boundary_actions?.[0] ?? sourceVariable.id}`,
    role: sourceVariable.role,
    basis_symbol: sourceVariable.basis_symbol,
    source_symbol: sourceVariable.source_symbol,
    row_uses: sourceVariable.row_uses,
    target_endpoint_refs: sourceVariable.target_endpoint_refs,
    required_endpoint_functionals: requiredFunctionals,
    attempted_binding: {
      binding_source: "row-local endpoint refs from source audit",
      binding_allowed: fields.construction_ready,
      reason:
        "Endpoint refs and row-local endpoint values locate the target row side, but endpoint-functional domains, bindings, supports, formulas, exact screen-zero certification, and rank certification are required before the binding can be proof-grade.",
    },
    required_fields_present: fields,
    missing_construction_fields: ENDPOINT_CONSTRUCTION_FIELDS.filter(
      (field) => field !== "construction_ready" && fields[field] !== true
    ),
    construction_ready: fields.construction_ready,
    obstruction:
      fields.construction_ready
        ? null
        : "The endpoint locator is available, but the exact endpoint-functional construction data are absent.",
  };
}

function buildRowConstructionAttempt(row, functionalMap, basisRowsById) {
  const basisRow = basisRowsById.get(row.row_id);
  const sourceFunctional = functionalMap.get(basisRow?.source_basis_id);
  const receiverFunctional = functionalMap.get(basisRow?.receiver_basis_id);
  const fields = {
    row_locator_resolved: sourceRowIsLocatorReady(row),
    source_endpoint_functional_constructed: sourceFunctional?.construction_ready === true,
    receiver_endpoint_functional_constructed: receiverFunctional?.construction_ready === true,
    combined_endpoint_functional_pair_constructed: false,
    screen_positive_candidate_change_row:
      basisRow?.required_fields_present?.screen_positive_candidate_change_row === true,
    proof_grade_boundary_opening_certified: false,
    same_packet_history_update_formula_present: false,
    candidate_artifact_writers_authorized:
      basisRow?.required_fields_present?.candidate_artifact_writers_authorized === true,
    root_topology_recertified_for_candidate_change:
      basisRow?.required_fields_present?.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change:
      basisRow?.required_fields_present?.proof_interval_v1_v6_rerun_for_candidate_change === true,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_endpoint_functional_pair_constructed =
    fields.source_endpoint_functional_constructed && fields.receiver_endpoint_functional_constructed;
  fields.proof_grade_boundary_opening_certified =
    fields.combined_endpoint_functional_pair_constructed &&
    fields.root_topology_recertified_for_candidate_change &&
    fields.proof_interval_v1_v6_rerun_for_candidate_change;
  fields.same_packet_history_update_formula_present =
    fields.combined_endpoint_functional_pair_constructed &&
    sourceFunctional?.required_fields_present.x_update_basis_present === true &&
    receiverFunctional?.required_fields_present.x_update_basis_present === true;
  return {
    row_id: row.row_id,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    source_functional_id: sourceFunctional?.id ?? null,
    receiver_functional_id: receiverFunctional?.id ?? null,
    source_endpoint_ref: row.source_boundary_ref,
    receiver_endpoint_ref: row.receiver_boundary_ref,
    source_boundary_value: row.source_boundary_value,
    receiver_boundary_value: row.receiver_boundary_value,
    required_fields_present: fields,
    row_construction_ready: ROW_CONSTRUCTION_FIELDS.every((field) => fields[field] === true),
    obstruction:
      "The row locator resolves, but source and receiver endpoint functionals are not constructed and no proof-grade boundary opening or replay artifacts exist.",
  };
}

function buildConstructionAttempt(inputs, sources) {
  assertInputs(inputs);
  const basisById = byId(inputs.basisAttempt.basis_attempts);
  const basisRowsById = byId(inputs.basisAttempt.row_attempts, "row_id");
  const endpointFunctionalAttempts = inputs.sourceAudit.variable_sources.map((sourceVariable) =>
    buildEndpointFunctionalAttempt(sourceVariable, basisById.get(sourceVariable.id), inputs.foldResult)
  );
  const functionalMap = byId(endpointFunctionalAttempts);
  const rowConstructionAttempts = inputs.sourceAudit.row_sources.map((row) =>
    buildRowConstructionAttempt(row, functionalMap, basisRowsById)
  );
  const endpointCounts = countFields(endpointFunctionalAttempts, ENDPOINT_CONSTRUCTION_FIELDS);
  const rowCounts = countFields(rowConstructionAttempts, ROW_CONSTRUCTION_FIELDS);
  return {
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "fold_coordinate_endpoint_functional_construction_attempt_fail_closed",
    theorem_target: "Fold-Coordinate Exact Endpoint-Functional Construction Attempt",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only construction attempt; endpoint locators and row-local endpoint values are present but exact endpoint-functional construction data are absent",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_artifacts: {
      sourceAudit: artifactRecord(sources.sourceAudit),
      basisAttempt: artifactRecord(sources.basisAttempt),
      foldInput: artifactRecord(sources.foldInput),
      foldResult: artifactRecord(sources.foldResult),
    },
    construction_rule:
      "A fold-coordinate endpoint functional E_j is constructed only if the row-local endpoint locator is bound to exact endpoint value data on an explicit endpoint-functional domain, the target equation and sign are fixed, the associated basis has theta support, formula, derivative, X and Xdot update bases, mesh and endpoint motion rules, periodic/gluing rules, source/receiver monotonicity, non-target endpoint-functional zero certification, exact B_xi=0, and rank certification.",
    rejection_rule:
      "A screen-level fold-coordinate column, witness coefficient, target endpoint ref, or tolerance-level B_xi residual is not an exact endpoint-functional construction.",
    fold_coordinate_screen_guard: {
      scanner_status: inputs.foldResult.status,
      B_xi_residual_verified_zero_with_tolerance: inputs.foldResult.B_xi_residual_verified_zero_with_tolerance,
      B_xi_residual_certified_zero: inputs.foldResult.B_xi_residual_certified_zero,
      rank_B_certified: inputs.foldResult.rank_B_certified,
      witness: inputs.foldResult.witness,
      structural_rows: inputs.foldResult.structural_rows,
      one_leaf_screen_level_success: inputs.foldResult.one_leaf_screen_level_success,
      one_leaf_min_boundary_opening_margin: inputs.foldResult.one_leaf_min_boundary_opening_margin,
    },
    endpoint_functional_attempts: endpointFunctionalAttempts,
    row_construction_attempts: rowConstructionAttempts,
    summary: {
      endpoint_functionals: endpointFunctionalAttempts.length,
      rows: rowConstructionAttempts.length,
      endpoint_locators_resolved: endpointCounts.endpoint_locator_resolved,
      endpoint_values_present: endpointCounts.endpoint_value_present,
      endpoint_boundary_bindings_present: endpointCounts.endpoint_boundary_binding_present,
      endpoint_functional_domains_present: endpointCounts.endpoint_functional_domain_present,
      functional_target_equations_defined: endpointCounts.functional_target_equation_defined,
      target_action_sign_consistent: endpointCounts.target_action_sign_consistent,
      theta_supports_present: endpointCounts.theta_support_present,
      basis_formulas_present: endpointCounts.basis_formula_present,
      basis_derivative_formulas_present: endpointCounts.basis_derivative_formula_present,
      x_update_bases_present: endpointCounts.x_update_basis_present,
      xdot_update_bases_present: endpointCounts.xdot_update_basis_present,
      mesh_update_rules_present: endpointCounts.mesh_update_rule_present,
      endpoint_motion_rules_present: endpointCounts.endpoint_motion_rule_present,
      source_monotonicity_rules_present: endpointCounts.source_monotonicity_rule_present,
      receiver_monotonicity_rules_present: endpointCounts.receiver_monotonicity_rule_present,
      non_target_endpoint_functionals_zero_certified:
        endpointCounts.non_target_endpoint_functionals_zero_certified,
      exact_screen_zero_certified_endpoint_functionals: endpointCounts.exact_screen_zero_certified,
      rank_certified_endpoint_functionals: endpointCounts.rank_certified,
      constructed_endpoint_functionals: endpointCounts.construction_ready,
      row_locators_resolved: rowCounts.row_locator_resolved,
      rows_with_source_endpoint_functional_constructed:
        rowCounts.source_endpoint_functional_constructed,
      rows_with_receiver_endpoint_functional_constructed:
        rowCounts.receiver_endpoint_functional_constructed,
      rows_with_combined_endpoint_functional_pair_constructed:
        rowCounts.combined_endpoint_functional_pair_constructed,
      proof_grade_boundary_opening_rows: rowCounts.proof_grade_boundary_opening_certified,
      constructed_rows: rowConstructionAttempts.filter((row) => row.row_construction_ready).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      endpoint_required_fields_certified_counts: endpointCounts,
      row_required_fields_certified_counts: rowCounts,
    },
  };
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function endpointFunctionalTable(attempts) {
  return attempts
    .map(
      (attempt) =>
        `| \`${attempt.id}\` | \`${attempt.endpoint_functional_id}\` | ${attempt.required_fields_present.endpoint_locator_resolved} | ${attempt.required_fields_present.endpoint_value_present} | ${attempt.required_fields_present.endpoint_boundary_binding_present} | ${attempt.required_fields_present.endpoint_functional_domain_present} | ${attempt.required_fields_present.basis_formula_present} | ${attempt.construction_ready} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | ${row.required_fields_present.row_locator_resolved} | ${row.required_fields_present.source_endpoint_functional_constructed} | ${row.required_fields_present.receiver_endpoint_functional_constructed} | ${row.required_fields_present.proof_grade_boundary_opening_certified} | ${row.row_construction_ready} |`
    )
    .join("\n");
}

function buildReport(attempt) {
  return `# Higher-Fold Fold-Coordinate Endpoint-Functional Construction Attempt

## Verdict

The endpoint-functional construction attempt fail-closes. The preceding source
audit supplied endpoint locators and row-local endpoint values for all four
\`fc_*\` variables, but the current artifacts do not construct any exact
endpoint functional.

| Quantity | Value |
| --- | ---: |
| Endpoint functionals attempted | ${attempt.summary.endpoint_functionals} |
| Endpoint locators resolved | ${attempt.summary.endpoint_locators_resolved} |
| Endpoint values present | ${attempt.summary.endpoint_values_present} |
| Endpoint boundary bindings present | ${attempt.summary.endpoint_boundary_bindings_present} |
| Endpoint-functional domains present | ${attempt.summary.endpoint_functional_domains_present} |
| Basis formulas present | ${attempt.summary.basis_formulas_present} |
| Exact $B\\xi=0$ endpoint certificates | ${attempt.summary.exact_screen_zero_certified_endpoint_functionals} |
| Rank certificates | ${attempt.summary.rank_certified_endpoint_functionals} |
| Constructed endpoint functionals | ${attempt.summary.constructed_endpoint_functionals} |
| Constructed rows | ${attempt.summary.constructed_rows} |
| Row consumption count | ${attempt.summary.row_consumption_count} |

## Construction Rule

A fold-coordinate endpoint functional $E_j$ is constructed only if the
row-local endpoint locator is bound to exact endpoint value data on an explicit
endpoint-functional domain, the target equation and sign are fixed, the
associated basis has theta support, formula, derivative, $X$ and $\\dot X$
update bases, mesh and endpoint motion rules, periodic/gluing rules,
source/receiver monotonicity, non-target endpoint-functional zero
certification, exact $B\\xi=0$, and rank certification.

The present data reach the locator, row-local endpoint-value, and
target-equation stages. The fold-coordinate matrix remains a tolerance-level
screen witness: it has
\`B_xi_residual_verified_zero_with_tolerance=true\`, but
\`B_xi_residual_certified_zero=false\` and \`rank_B_certified=false\`.

## Endpoint Functional Attempts

| Variable | Functional | Locator | Endpoint value | Boundary binding | Functional domain | Basis formula | Constructed |
| --- | --- | --- | --- | --- | --- | --- | --- |
${endpointFunctionalTable(attempt.endpoint_functional_attempts)}

## Endpoint-Field Audit

| Field | Endpoint functionals certified |
| --- | ---: |
${fieldTable(
  attempt.summary.endpoint_required_fields_certified_counts,
  ENDPOINT_CONSTRUCTION_FIELDS,
  attempt.summary.endpoint_functionals
)}

## Row Construction Attempt

| Row | Locator | Source functional | Receiver functional | Proof-grade opening | Constructed |
| --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_construction_attempts)}

## Row-Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(
  attempt.summary.row_required_fields_certified_counts,
  ROW_CONSTRUCTION_FIELDS,
  attempt.summary.rows
)}

## Closure Burden

The next mathematical object must supply an actual formula-level construction:
endpoint-functional domains and bindings, theta support, basis and derivative
formulas, $X$ and $\\dot X$ update bases, mesh and endpoint motion rules,
source/receiver monotonicity, non-target endpoint-functional zero
certification, exact $B\\xi=0$, and rank
certification. Without those fields, no fold-coordinate candidate \`phi_cyc\`,
\`mesh\`, topology certificate, v1-v6 replay, row consumption, or branch chart
is authorized.

## Capture Decision

Priority-only theorem attempt. This packet confirms that the current
fold-coordinate branch has endpoint locator data but no exact endpoint
functional construction. It should remain in the proof-program priority bucket
until a formula-level construction or a different row-closure geometry is
available.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const attempt = buildConstructionAttempt(
    {
      sourceAudit: readJson(args.sourceAudit),
      basisAttempt: readJson(args.basisAttempt),
      foldInput: readJson(args.foldInput),
      foldResult: readJson(args.foldResult),
    },
    {
      sourceAudit: args.sourceAudit,
      basisAttempt: args.basisAttempt,
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
