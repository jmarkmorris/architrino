#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SOURCE_AUDIT = `${CERT_DIR}/fold_coordinate_endpoint_functional_source_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONSTRUCTION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BASIS_ATTEMPT = `${CERT_DIR}/fold_coordinate_finite_realization_basis_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_binding_contract_no_go.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_binding_contract_no_go_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_BINDING_FIELDS = [
  "endpoint_locator_resolved",
  "row_local_endpoint_value_present",
  "functional_target_equation_defined",
  "target_action_sign_consistent",
  "endpoint_boundary_binding_present",
  "endpoint_functional_domain_present",
  "domain_chart_declared",
  "evaluation_map_declared",
  "endpoint_value_bound_to_domain",
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
  "binding_contract_satisfied",
];

const ROW_BINDING_FIELDS = [
  "row_locator_resolved",
  "source_binding_contract_satisfied",
  "receiver_binding_contract_satisfied",
  "combined_binding_pair_satisfied",
  "screen_positive_candidate_change_row",
  "proof_grade_boundary_opening_certified",
  "same_packet_history_update_formula_present",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
];

const BINDING_METHODS = [
  {
    id: "row_local_value_as_endpoint_binding",
    description:
      "Try to promote row-local endpoint q-values into endpoint-functional bindings.",
    required_fields: [
      "endpoint_locator_resolved",
      "row_local_endpoint_value_present",
      "endpoint_boundary_binding_present",
      "endpoint_functional_domain_present",
      "domain_chart_declared",
      "evaluation_map_declared",
      "endpoint_value_bound_to_domain",
    ],
  },
  {
    id: "target_equation_as_functional_definition",
    description:
      "Try to treat the target equation E_j(Psi_j)=+/-1 as a functional definition.",
    required_fields: [
      "functional_target_equation_defined",
      "target_action_sign_consistent",
      "endpoint_boundary_binding_present",
      "endpoint_functional_domain_present",
      "evaluation_map_declared",
      "non_target_endpoint_functionals_zero_certified",
    ],
  },
  {
    id: "basis_formula_endpoint_realization",
    description:
      "Try to realize the endpoint functional through an explicit same-packet basis formula.",
    required_fields: [
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
    ],
  },
  {
    id: "exact_screen_and_rank_certification",
    description:
      "Try to certify the endpoint-functional binding from exact screen-zero and rank data.",
    required_fields: ["exact_screen_zero_certified", "rank_certified"],
  },
];

function parseArgs(argv) {
  const args = {
    sourceAudit: DEFAULT_SOURCE_AUDIT,
    constructionAttempt: DEFAULT_CONSTRUCTION_ATTEMPT,
    basisAttempt: DEFAULT_BASIS_ATTEMPT,
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
    } else if (arg === "--construction-attempt") {
      args.constructionAttempt = argv[++index];
    } else if (arg === "--basis-attempt") {
      args.basisAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-binding-contract.mjs [options]

Options:
  --source-audit PATH           Endpoint-functional source audit JSON. Defaults to ${DEFAULT_SOURCE_AUDIT}.
  --construction-attempt PATH   Endpoint-functional construction attempt JSON. Defaults to ${DEFAULT_CONSTRUCTION_ATTEMPT}.
  --basis-attempt PATH          Finite-realization basis attempt JSON. Defaults to ${DEFAULT_BASIS_ATTEMPT}.
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

function hasObjectField(record, field) {
  return record?.[field] !== undefined && record[field] !== null;
}

function assertCommonProofInput(input, label) {
  if (input.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${label} packet id: ${input.packet_id}`);
  }
  if (input.branch_chart_authorized === true || input.preledger_pass === true || input.updates_live_ledger === true) {
    throw new Error(`Refusing to build binding contract from an authorized or live-updating ${label}.`);
  }
}

function assertInputs(inputs) {
  assertCommonProofInput(inputs.sourceAudit, "source audit");
  assertCommonProofInput(inputs.constructionAttempt, "construction attempt");
  assertCommonProofInput(inputs.basisAttempt, "basis attempt");
  if (inputs.sourceAudit.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected source-audit fold-coordinate packet id: ${inputs.sourceAudit.fold_coordinate_packet_id}`);
  }
  if (inputs.constructionAttempt.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(
      `Unexpected construction-attempt fold-coordinate packet id: ${inputs.constructionAttempt.fold_coordinate_packet_id}`
    );
  }
  if (inputs.basisAttempt.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected basis-attempt fold-coordinate packet id: ${inputs.basisAttempt.fold_coordinate_packet_id}`);
  }
  if (inputs.sourceAudit.status !== "fold_coordinate_endpoint_functional_source_audit_fail_closed") {
    throw new Error(`Unexpected source-audit status: ${inputs.sourceAudit.status}`);
  }
  if (inputs.constructionAttempt.status !== "fold_coordinate_endpoint_functional_construction_attempt_fail_closed") {
    throw new Error(`Unexpected construction-attempt status: ${inputs.constructionAttempt.status}`);
  }
  if (inputs.basisAttempt.status !== "fold_coordinate_finite_realization_basis_attempt_fail_closed") {
    throw new Error(`Unexpected basis-attempt status: ${inputs.basisAttempt.status}`);
  }
  if (!Array.isArray(inputs.sourceAudit.variable_sources) || inputs.sourceAudit.variable_sources.length !== 4) {
    throw new Error("Expected exactly 4 source-audit variables.");
  }
  if (
    !Array.isArray(inputs.constructionAttempt.endpoint_functional_attempts) ||
    inputs.constructionAttempt.endpoint_functional_attempts.length !== 4
  ) {
    throw new Error("Expected exactly 4 construction-attempt endpoint functionals.");
  }
  if (
    !Array.isArray(inputs.constructionAttempt.row_construction_attempts) ||
    inputs.constructionAttempt.row_construction_attempts.length !== 3
  ) {
    throw new Error("Expected exactly 3 construction-attempt rows.");
  }
}

function boolFrom(...values) {
  return values.some((value) => value === true);
}

function failureCodeForField(field) {
  return `missing_${field}`;
}

function evaluateBindingMethods(fields) {
  return BINDING_METHODS.map((method) => {
    const missingFields = method.required_fields.filter((field) => fields[field] !== true);
    return {
      method_id: method.id,
      description: method.description,
      required_fields: method.required_fields,
      missing_fields: missingFields,
      failure_codes: missingFields.map(failureCodeForField),
      passed: missingFields.length === 0,
    };
  });
}

function countFailureCodes(endpointBindingAttempts) {
  const counts = {};
  for (const attempt of endpointBindingAttempts) {
    for (const result of attempt.method_results) {
      for (const code of result.failure_codes) {
        counts[code] = (counts[code] ?? 0) + 1;
      }
    }
  }
  return Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)));
}

function buildEndpointBindingAttempt(constructionAttempt, sourceVariable, basisVariable) {
  const constructionFields = constructionAttempt.required_fields_present ?? {};
  const sourceFields = sourceVariable?.required_fields_present ?? {};
  const basisFields = basisVariable?.required_fields_present ?? {};
  const fields = {
    endpoint_locator_resolved: boolFrom(
      constructionFields.endpoint_locator_resolved,
      sourceFields.target_endpoint_ref_declared
    ),
    row_local_endpoint_value_present: boolFrom(
      constructionFields.endpoint_value_present,
      sourceFields.target_endpoint_value_present
    ),
    functional_target_equation_defined: constructionFields.functional_target_equation_defined === true,
    target_action_sign_consistent: boolFrom(
      constructionFields.target_action_sign_consistent,
      sourceFields.boundary_delta_sign_consistent
    ),
    endpoint_boundary_binding_present: boolFrom(
      constructionFields.endpoint_boundary_binding_present,
      sourceFields.endpoint_boundary_binding_present,
      basisFields.endpoint_boundary_binding_present
    ),
    endpoint_functional_domain_present: boolFrom(
      constructionFields.endpoint_functional_domain_present,
      sourceFields.endpoint_functional_domain_present,
      hasObjectField(sourceVariable, "endpoint_functional_domain"),
      hasObjectField(basisVariable, "endpoint_functional_domain")
    ),
    domain_chart_declared:
      hasObjectField(sourceVariable, "endpoint_functional_domain_chart") ||
      hasObjectField(basisVariable, "endpoint_functional_domain_chart"),
    evaluation_map_declared:
      hasObjectField(sourceVariable, "endpoint_evaluation_map") ||
      hasObjectField(basisVariable, "endpoint_evaluation_map"),
    endpoint_value_bound_to_domain: false,
    theta_support_present: boolFrom(
      constructionFields.theta_support_present,
      sourceFields.theta_support_present,
      basisFields.theta_support_present
    ),
    basis_formula_present: boolFrom(
      constructionFields.basis_formula_present,
      sourceFields.basis_formula_present,
      basisFields.basis_formula_present
    ),
    basis_derivative_formula_present: boolFrom(
      constructionFields.basis_derivative_formula_present,
      sourceFields.basis_derivative_formula_present,
      basisFields.basis_derivative_formula_present
    ),
    x_update_basis_present: boolFrom(
      constructionFields.x_update_basis_present,
      sourceFields.x_update_basis_present,
      basisFields.x_update_basis_present
    ),
    xdot_update_basis_present: boolFrom(
      constructionFields.xdot_update_basis_present,
      sourceFields.xdot_update_basis_present,
      basisFields.xdot_update_basis_present
    ),
    mesh_update_rule_present: boolFrom(
      constructionFields.mesh_update_rule_present,
      sourceFields.mesh_update_rule_present,
      basisFields.mesh_update_rule_present
    ),
    endpoint_motion_rule_present: boolFrom(
      constructionFields.endpoint_motion_rule_present,
      sourceFields.endpoint_motion_rule_present,
      basisFields.endpoint_motion_rule_present
    ),
    source_monotonicity_rule_present: boolFrom(
      constructionFields.source_monotonicity_rule_present,
      sourceFields.source_monotonicity_rule_present,
      basisFields.source_monotonicity_rule_present
    ),
    receiver_monotonicity_rule_present: boolFrom(
      constructionFields.receiver_monotonicity_rule_present,
      sourceFields.receiver_monotonicity_rule_present,
      basisFields.receiver_monotonicity_rule_present
    ),
    periodic_extension_rule_present: boolFrom(
      constructionFields.periodic_extension_rule_present,
      sourceFields.periodic_extension_rule_present,
      basisFields.periodic_extension_rule_present
    ),
    c1_gluing_rule_present: boolFrom(
      constructionFields.c1_gluing_rule_present,
      sourceFields.c1_gluing_rule_present,
      basisFields.c1_gluing_rule_present
    ),
    non_target_endpoint_functionals_zero_certified: boolFrom(
      constructionFields.non_target_endpoint_functionals_zero_certified,
      sourceFields.non_target_endpoint_functionals_zero_certified,
      basisFields.no_unintended_boundary_motion_certified
    ),
    exact_screen_zero_certified: boolFrom(
      constructionFields.exact_screen_zero_certified,
      sourceFields.exact_screen_zero_certified,
      basisFields.exact_screen_zero_certified
    ),
    rank_certified: boolFrom(constructionFields.rank_certified, sourceFields.rank_certified, basisFields.rank_certified),
    binding_contract_satisfied: false,
  };
  fields.endpoint_value_bound_to_domain =
    fields.row_local_endpoint_value_present &&
    fields.endpoint_boundary_binding_present &&
    fields.endpoint_functional_domain_present &&
    fields.evaluation_map_declared;
  fields.binding_contract_satisfied = ENDPOINT_BINDING_FIELDS.every(
    (field) => field === "binding_contract_satisfied" || fields[field] === true
  );
  const methodResults = evaluateBindingMethods(fields);
  return {
    id: constructionAttempt.id,
    endpoint_functional_id: constructionAttempt.endpoint_functional_id,
    role: constructionAttempt.role,
    basis_symbol: constructionAttempt.basis_symbol,
    source_symbol: constructionAttempt.source_symbol,
    row_uses: constructionAttempt.row_uses,
    target_endpoint_refs: constructionAttempt.target_endpoint_refs,
    target_endpoint_values: constructionAttempt.target_endpoint_refs?.map((ref) => ({
      row_id: ref.row_id,
      role: ref.role,
      endpoint_ref: ref.endpoint_ref,
      endpoint_value: ref.endpoint_value,
    })),
    required_endpoint_functionals: constructionAttempt.required_endpoint_functionals,
    rejected_promotions: [
      "A row-local endpoint q-value is not an endpoint-functional domain.",
      "A target equation such as E_j(Psi_j)=+/-1 is not an evaluation-map definition.",
      "A fold-coordinate witness coefficient is not a basis formula.",
      "A tolerance-level B_xi residual is not exact B_xi=0 certification.",
    ],
    method_results: methodResults,
    required_fields_present: fields,
    missing_binding_fields: ENDPOINT_BINDING_FIELDS.filter(
      (field) => field !== "binding_contract_satisfied" && fields[field] !== true
    ),
    binding_contract_satisfied: fields.binding_contract_satisfied,
    no_go_reason:
      fields.binding_contract_satisfied
        ? null
        : "The row-local endpoint value fixes where a row boundary is, but no endpoint-functional domain, boundary binding, evaluation map, support/formula data, exact screen-zero certificate, or rank certificate identifies that value with E_j(Psi_j).",
  };
}

function buildRowBindingAttempt(row, bindingById) {
  const sourceBinding = bindingById.get(row.source_functional_id);
  const receiverBinding = bindingById.get(row.receiver_functional_id);
  const rowFields = row.required_fields_present ?? {};
  const fields = {
    row_locator_resolved: rowFields.row_locator_resolved === true,
    source_binding_contract_satisfied: sourceBinding?.binding_contract_satisfied === true,
    receiver_binding_contract_satisfied: receiverBinding?.binding_contract_satisfied === true,
    combined_binding_pair_satisfied: false,
    screen_positive_candidate_change_row: rowFields.screen_positive_candidate_change_row === true,
    proof_grade_boundary_opening_certified: false,
    same_packet_history_update_formula_present: rowFields.same_packet_history_update_formula_present === true,
    candidate_artifacts_present: rowFields.candidate_artifact_writers_authorized === true,
    root_topology_recertified_for_candidate_change: rowFields.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change: rowFields.proof_interval_v1_v6_rerun_for_candidate_change === true,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_binding_pair_satisfied =
    fields.source_binding_contract_satisfied && fields.receiver_binding_contract_satisfied;
  fields.proof_grade_boundary_opening_certified =
    fields.combined_binding_pair_satisfied &&
    fields.same_packet_history_update_formula_present &&
    fields.root_topology_recertified_for_candidate_change &&
    fields.proof_interval_v1_v6_rerun_for_candidate_change;
  return {
    row_id: row.row_id,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    source_binding_id: row.source_functional_id,
    receiver_binding_id: row.receiver_functional_id,
    source_boundary_value: row.source_boundary_value,
    receiver_boundary_value: row.receiver_boundary_value,
    required_fields_present: fields,
    row_binding_contract_satisfied: ROW_BINDING_FIELDS.every((field) => fields[field] === true),
    obstruction:
      "The row has source and receiver endpoint values, but the source/receiver binding contracts are not satisfied and no proof-grade boundary-opening replay exists.",
  };
}

function buildBindingContract(inputs, sources) {
  assertInputs(inputs);
  const sourceById = byId(inputs.sourceAudit.variable_sources);
  const basisById = byId(inputs.basisAttempt.basis_attempts);
  const endpointBindingAttempts = inputs.constructionAttempt.endpoint_functional_attempts.map((attempt) =>
    buildEndpointBindingAttempt(attempt, sourceById.get(attempt.id), basisById.get(attempt.id))
  );
  const bindingById = byId(endpointBindingAttempts);
  const rowBindingAttempts = inputs.constructionAttempt.row_construction_attempts.map((row) =>
    buildRowBindingAttempt(row, bindingById)
  );
  const endpointCounts = countFields(endpointBindingAttempts, ENDPOINT_BINDING_FIELDS);
  const rowCounts = countFields(rowBindingAttempts, ROW_BINDING_FIELDS);
  const failureCodeCounts = countFailureCodes(endpointBindingAttempts);
  return {
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-binding-contract-no-go-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "fold_coordinate_endpoint_functional_binding_contract_no_go_fail_closed",
    theorem_target: "Fold-Coordinate Endpoint-Functional Binding Contract No-Go",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level: "priority-only binding contract/no-go; row-local endpoint values are not endpoint-functional bindings",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_artifacts: {
      sourceAudit: artifactRecord(sources.sourceAudit),
      constructionAttempt: artifactRecord(sources.constructionAttempt),
      basisAttempt: artifactRecord(sources.basisAttempt),
    },
    binding_contract_rule:
      "A row-local endpoint q-value may seed a target equation only after an explicit endpoint-functional domain, endpoint-boundary binding, and evaluation map identify how a basis perturbation moves that endpoint; the same object must also carry support, formula, derivative, mesh, endpoint, monotonicity, non-target zero, exact B_xi=0, rank, and replay certifications.",
    no_go_lemma:
      "Row-local scalar endpoint values do not determine endpoint functionals. Without a domain chart and evaluation map, the statement E_j(Psi_j)=+/-1 is only a target equation, not a proof-grade binding of a fold-coordinate basis to a same-packet endpoint motion.",
    rejection_rule:
      "Do not promote an endpoint ref, row-local q-value, witness coefficient, or tolerance-level tangent-screen residual into an endpoint-functional binding.",
    binding_methods: BINDING_METHODS,
    fold_coordinate_screen_guard: inputs.constructionAttempt.fold_coordinate_screen_guard,
    endpoint_binding_attempts: endpointBindingAttempts,
    row_binding_attempts: rowBindingAttempts,
    summary: {
      endpoint_functionals: endpointBindingAttempts.length,
      rows: rowBindingAttempts.length,
      endpoint_locators_resolved: endpointCounts.endpoint_locator_resolved,
      row_local_endpoint_values_present: endpointCounts.row_local_endpoint_value_present,
      functional_target_equations_defined: endpointCounts.functional_target_equation_defined,
      target_action_sign_consistent: endpointCounts.target_action_sign_consistent,
      endpoint_boundary_bindings_present: endpointCounts.endpoint_boundary_binding_present,
      endpoint_functional_domains_present: endpointCounts.endpoint_functional_domain_present,
      domain_charts_declared: endpointCounts.domain_chart_declared,
      evaluation_maps_declared: endpointCounts.evaluation_map_declared,
      endpoint_values_bound_to_domain: endpointCounts.endpoint_value_bound_to_domain,
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
      binding_contract_satisfied_endpoint_functionals: endpointCounts.binding_contract_satisfied,
      row_locators_resolved: rowCounts.row_locator_resolved,
      rows_with_source_binding_contract_satisfied: rowCounts.source_binding_contract_satisfied,
      rows_with_receiver_binding_contract_satisfied: rowCounts.receiver_binding_contract_satisfied,
      rows_with_combined_binding_pair_satisfied: rowCounts.combined_binding_pair_satisfied,
      proof_grade_boundary_opening_rows: rowCounts.proof_grade_boundary_opening_certified,
      row_binding_contract_satisfied: rowBindingAttempts.filter((row) => row.row_binding_contract_satisfied).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      binding_methods_tested: BINDING_METHODS.length,
      binding_method_evaluations: endpointBindingAttempts.reduce(
        (sum, attempt) => sum + attempt.method_results.length,
        0
      ),
      binding_contracts_certified: endpointCounts.binding_contract_satisfied,
      binding_failure_code_counts: failureCodeCounts,
      endpoint_required_fields_certified_counts: endpointCounts,
      row_required_fields_certified_counts: rowCounts,
    },
  };
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function endpointBindingTable(attempts) {
  return attempts
    .map(
      (attempt) =>
        `| \`${attempt.id}\` | \`${attempt.endpoint_functional_id}\` | ${attempt.required_fields_present.endpoint_locator_resolved} | ${attempt.required_fields_present.row_local_endpoint_value_present} | ${attempt.required_fields_present.endpoint_boundary_binding_present} | ${attempt.required_fields_present.endpoint_functional_domain_present} | ${attempt.required_fields_present.evaluation_map_declared} | ${attempt.required_fields_present.basis_formula_present} | ${attempt.binding_contract_satisfied} |`
    )
    .join("\n");
}

function rowBindingTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | ${row.required_fields_present.row_locator_resolved} | ${row.required_fields_present.source_binding_contract_satisfied} | ${row.required_fields_present.receiver_binding_contract_satisfied} | ${row.required_fields_present.proof_grade_boundary_opening_certified} | ${row.row_binding_contract_satisfied} |`
    )
    .join("\n");
}

function methodTable(methods) {
  return methods
    .map((method) => `| \`${method.id}\` | ${method.required_fields.length} | ${method.description} |`)
    .join("\n");
}

function failureCodeTable(counts) {
  const entries = Object.entries(counts);
  if (entries.length === 0) {
    return "| none | 0 |";
  }
  return entries.map(([code, count]) => `| \`${code}\` | ${count} |`).join("\n");
}

function buildReport(contract) {
  return `# Higher-Fold Fold-Coordinate Endpoint-Functional Binding Contract No-Go

## Verdict

The endpoint-functional binding contract fail-closes. The current data locate
the row-local endpoint refs and values for all four \`fc_*\` variables, but no
artifact supplies an endpoint-functional domain, endpoint-boundary binding, or
evaluation map that identifies those scalar q-values with $E_j(\\Psi_j)$.

| Quantity | Value |
| --- | ---: |
| Endpoint functionals checked | ${contract.summary.endpoint_functionals} |
| Endpoint locators resolved | ${contract.summary.endpoint_locators_resolved} |
| Row-local endpoint values present | ${contract.summary.row_local_endpoint_values_present} |
| Functional target equations defined | ${contract.summary.functional_target_equations_defined} |
| Endpoint boundary bindings present | ${contract.summary.endpoint_boundary_bindings_present} |
| Endpoint-functional domains present | ${contract.summary.endpoint_functional_domains_present} |
| Evaluation maps declared | ${contract.summary.evaluation_maps_declared} |
| Endpoint values bound to domain | ${contract.summary.endpoint_values_bound_to_domain} |
| Basis formulas present | ${contract.summary.basis_formulas_present} |
| Exact $B\\xi=0$ endpoint certificates | ${contract.summary.exact_screen_zero_certified_endpoint_functionals} |
| Rank certificates | ${contract.summary.rank_certified_endpoint_functionals} |
| Binding contracts satisfied | ${contract.summary.binding_contract_satisfied_endpoint_functionals} |
| Rows satisfying binding contract | ${contract.summary.row_binding_contract_satisfied} |
| Binding methods tested | ${contract.summary.binding_methods_tested} |
| Binding method evaluations | ${contract.summary.binding_method_evaluations} |
| Binding contracts certified | ${contract.summary.binding_contracts_certified} |
| Row consumption count | ${contract.summary.row_consumption_count} |

## No-Go Lemma

${contract.no_go_lemma}

The row-local q-values are therefore admissible as target-location data, not as
endpoint-functional construction data. The target equations
$E_j(\\Psi_j)=\\pm 1$ become proof-grade only after a domain chart and
evaluation map say what object $E_j$ evaluates and how $\\Psi_j$ changes the
same-packet endpoint.

## Binding Contract Rule

${contract.binding_contract_rule}

## Binding Methods Tested

| Method | Required fields | Description |
| --- | ---: | --- |
${methodTable(contract.binding_methods)}

## Binding Failure Codes

| Failure code | Count |
| --- | ---: |
${failureCodeTable(contract.summary.binding_failure_code_counts)}

## Endpoint Binding Attempts

| Variable | Functional | Locator | Endpoint value | Binding | Domain | Evaluation map | Basis formula | Contract |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${endpointBindingTable(contract.endpoint_binding_attempts)}

## Endpoint-Field Audit

| Field | Endpoint functionals certified |
| --- | ---: |
${fieldTable(
  contract.summary.endpoint_required_fields_certified_counts,
  ENDPOINT_BINDING_FIELDS,
  contract.summary.endpoint_functionals
)}

## Row Binding Attempts

| Row | Locator | Source binding | Receiver binding | Proof-grade opening | Contract |
| --- | --- | --- | --- | --- | --- |
${rowBindingTable(contract.row_binding_attempts)}

## Row-Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(contract.summary.row_required_fields_certified_counts, ROW_BINDING_FIELDS, contract.summary.rows)}

## Closure Burden

The next mathematical object must introduce the missing binding layer itself:
an endpoint-functional domain chart, an endpoint-boundary binding, an
evaluation map for $E_j$, theta support, basis and derivative formulas, $X$ and
$\\dot X$ update bases, mesh and endpoint motion rules, source/receiver
monotonicity, non-target endpoint-functional zero certification, exact
$B\\xi=0$, rank certification, candidate artifacts, topology recertification,
and v1-v6 replay. Without those fields, no endpoint-functional binding,
candidate history, row consumption, preledger pass, or branch chart is
authorized.

## Capture Decision

Priority-only binding no-go. This packet prevents the row-local endpoint
values from being mistaken for proof-grade endpoint-functional bindings. It is
not ready for authored AAA prose because it records an obstruction rather than
a completed theorem.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputs = {
    sourceAudit: readJson(args.sourceAudit),
    constructionAttempt: readJson(args.constructionAttempt),
    basisAttempt: readJson(args.basisAttempt),
  };
  const sources = {
    sourceAudit: args.sourceAudit,
    constructionAttempt: args.constructionAttempt,
    basisAttempt: args.basisAttempt,
  };
  const contract = buildBindingContract(inputs, sources);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, contract, args.pretty);
  writeText(outReport, buildReport(contract));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
