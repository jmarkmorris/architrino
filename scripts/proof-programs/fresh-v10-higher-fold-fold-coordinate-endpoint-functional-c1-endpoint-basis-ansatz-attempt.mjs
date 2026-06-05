#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_DOMAIN_EVALUATION_CONTRACT = `${CERT_DIR}/fold_coordinate_endpoint_functional_domain_evaluation_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_FOLD_COORDINATE_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_input.nonlinear-v0.json`;
const DEFAULT_FOLD_COORDINATE_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_result.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_c1_endpoint_basis_ansatz_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_c1_endpoint_basis_ansatz_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_PROOF_FIELDS = [
  "endpoint_locator_resolved",
  "row_local_endpoint_value_present",
  "functional_target_equation_defined",
  "target_action_sign_consistent",
  "endpoint_boundary_binding_present",
  "endpoint_functional_domain_present",
  "domain_chart_declared",
  "domain_coordinate_rule_declared",
  "basis_vector_bound_to_domain",
  "evaluation_map_declared",
  "endpoint_evaluation_rule_declared",
  "endpoint_value_bound_to_evaluation_map",
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
  "same_packet_history_update_formula_present",
  "non_target_endpoint_functionals_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "domain_evaluation_map_constructed",
];

const ENDPOINT_ANSATZ_FIELDS = [
  "c1_source_template_available",
  "c1_source_template_same_packet",
  "ansatz_family_declared",
  "ansatz_theta_support_declared",
  "ansatz_basis_formula_declared",
  "ansatz_basis_derivative_formula_declared",
  "ansatz_periodic_extension_rule_declared",
  "ansatz_c1_gluing_rule_declared",
  "ansatz_endpoint_motion_rule_derived",
  "ansatz_target_action_matches_contract",
  "ansatz_non_target_zero_rule_checked",
  "ansatz_promoted_to_same_packet_basis",
  "c1_endpoint_basis_ansatz_constructed",
];

const ROW_ANSATZ_FIELDS = [
  "row_locator_resolved",
  "source_endpoint_contract_declared",
  "receiver_endpoint_contract_declared",
  "source_c1_endpoint_basis_ansatz_constructed",
  "receiver_c1_endpoint_basis_ansatz_constructed",
  "source_domain_evaluation_map_constructed",
  "receiver_domain_evaluation_map_constructed",
  "combined_domain_evaluation_pair_constructed",
  "screen_positive_candidate_change_row",
  "signed_boundary_delta_contract_defined",
  "proof_grade_boundary_opening_certified",
  "same_packet_history_update_formula_present",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
];

const ANSATZ_METHODS = [
  {
    id: "shifted_separator_c1_bump_as_endpoint_basis",
    description: "Try to reuse an existing shifted-separator $C^1$ bump as a fold-coordinate endpoint basis.",
    required_ansatz_fields: [
      "c1_source_template_available",
      "ansatz_family_declared",
      "ansatz_basis_formula_declared",
      "ansatz_c1_gluing_rule_declared",
    ],
    required_proof_fields: [
      "endpoint_boundary_binding_present",
      "endpoint_functional_domain_present",
      "domain_chart_declared",
      "basis_vector_bound_to_domain",
      "endpoint_motion_rule_present",
      "non_target_endpoint_functionals_zero_certified",
    ],
  },
  {
    id: "fold_coordinate_column_as_c1_basis_formula",
    description: "Try to treat the bounded fold-coordinate column itself as the $C^1$ endpoint basis formula.",
    required_ansatz_fields: [
      "c1_source_template_available",
      "ansatz_family_declared",
      "ansatz_basis_formula_declared",
      "ansatz_target_action_matches_contract",
    ],
    required_proof_fields: [
      "theta_support_present",
      "basis_formula_present",
      "basis_derivative_formula_present",
      "x_update_basis_present",
      "xdot_update_basis_present",
      "mesh_update_rule_present",
      "same_packet_history_update_formula_present",
    ],
  },
  {
    id: "screen_witness_value_as_endpoint_derivative",
    description: "Try to promote the screen witness scalar into the endpoint derivative required by the target equation.",
    required_ansatz_fields: [
      "c1_source_template_available",
      "ansatz_target_action_matches_contract",
    ],
    required_proof_fields: [
      "endpoint_functional_domain_present",
      "evaluation_map_declared",
      "endpoint_evaluation_rule_declared",
      "endpoint_value_bound_to_evaluation_map",
      "endpoint_motion_rule_present",
      "exact_screen_zero_certified",
      "rank_certified",
    ],
  },
  {
    id: "diagnostic_screen_as_same_packet_history",
    description: "Try to use the feasible fold-coordinate tangent screen as the same-packet history-update construction.",
    required_ansatz_fields: [
      "c1_source_template_available",
      "ansatz_family_declared",
      "ansatz_promoted_to_same_packet_basis",
    ],
    required_proof_fields: [
      "same_packet_history_update_formula_present",
      "candidate_artifacts_present",
      "root_topology_recertified_for_candidate_change",
      "proof_interval_v1_v6_rerun_for_candidate_change",
      "exact_screen_zero_certified",
      "rank_certified",
    ],
  },
  {
    id: "local_endpoint_bump_template_instantiation",
    description: "Try to instantiate a new endpoint-local $C^1$ bump template for each target endpoint.",
    required_ansatz_fields: [
      "c1_source_template_available",
      "ansatz_theta_support_declared",
      "ansatz_basis_formula_declared",
      "ansatz_basis_derivative_formula_declared",
      "ansatz_periodic_extension_rule_declared",
      "ansatz_c1_gluing_rule_declared",
    ],
    required_proof_fields: [
      "endpoint_functional_domain_present",
      "domain_chart_declared",
      "domain_coordinate_rule_declared",
      "theta_support_present",
      "basis_formula_present",
      "basis_derivative_formula_present",
      "endpoint_motion_rule_present",
      "source_monotonicity_rule_present",
      "receiver_monotonicity_rule_present",
      "non_target_endpoint_functionals_zero_certified",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    domainEvaluationContract: DEFAULT_DOMAIN_EVALUATION_CONTRACT,
    foldCoordinateInput: DEFAULT_FOLD_COORDINATE_INPUT,
    foldCoordinateResult: DEFAULT_FOLD_COORDINATE_RESULT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--domain-evaluation-contract") {
      args.domainEvaluationContract = argv[++index];
    } else if (arg === "--fold-coordinate-input") {
      args.foldCoordinateInput = argv[++index];
    } else if (arg === "--fold-coordinate-result") {
      args.foldCoordinateResult = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-c1-endpoint-basis-ansatz-attempt.mjs [options]

Options:
  --domain-evaluation-contract PATH  Endpoint-functional domain/evaluation-map contract JSON. Defaults to ${DEFAULT_DOMAIN_EVALUATION_CONTRACT}.
  --fold-coordinate-input PATH       Fold-coordinate collocation input JSON. Defaults to ${DEFAULT_FOLD_COORDINATE_INPUT}.
  --fold-coordinate-result PATH      Fold-coordinate collocation result JSON. Defaults to ${DEFAULT_FOLD_COORDINATE_RESULT}.
  --out-dir PATH                     Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                           Pretty-print JSON artifact.
  --help                             Show this help.`);
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

function assertInputs(inputs) {
  const contract = inputs.domainEvaluationContract;
  const foldInput = inputs.foldCoordinateInput;
  const foldResult = inputs.foldCoordinateResult;
  if (contract.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected contract packet id: ${contract.packet_id}`);
  }
  if (contract.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected contract fold-coordinate packet id: ${contract.fold_coordinate_packet_id}`);
  }
  if (
    contract.status !==
    "fold_coordinate_endpoint_functional_domain_evaluation_map_contract_defined_domain_evaluation_map_absent"
  ) {
    throw new Error(`Unexpected contract status: ${contract.status}`);
  }
  if (contract.branch_chart_authorized || contract.preledger_pass || contract.updates_live_ledger) {
    throw new Error("Refusing to build ansatz attempt from an authorized endpoint-functional contract.");
  }
  if (foldInput.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate input packet id: ${foldInput.packet_id}`);
  }
  if (foldResult.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate result packet id: ${foldResult.packet_id}`);
  }
  if (foldInput.packet_identity?.basis_model !== "shifted_separator_c1_bumps_plus_fold_coordinate_boundary_opening_columns") {
    throw new Error(`Unexpected fold-coordinate basis model: ${foldInput.packet_identity?.basis_model}`);
  }
  if (foldInput.packet_identity?.matrix_status !== "diagnostic_nonlinear_fold_coordinate_collocation_tangent_matrix_not_full_candidate") {
    throw new Error(`Unexpected fold-coordinate input matrix status: ${foldInput.packet_identity?.matrix_status}`);
  }
  if (foldResult.status !== "feasible") {
    throw new Error(`Unexpected fold-coordinate result status: ${foldResult.status}`);
  }
  if (foldResult.branch_chart_authorized || foldResult.preledger_pass || foldResult.updates_live_ledger) {
    throw new Error("Refusing to build ansatz attempt from an authorized fold-coordinate screen.");
  }
  if (!Array.isArray(contract.endpoint_domain_evaluation_contracts) || contract.endpoint_domain_evaluation_contracts.length !== 4) {
    throw new Error("Expected exactly 4 endpoint domain/evaluation-map contracts.");
  }
  if (!Array.isArray(contract.row_domain_evaluation_contracts) || contract.row_domain_evaluation_contracts.length !== 3) {
    throw new Error("Expected exactly 3 row domain/evaluation-map contracts.");
  }
}

function c1Variables(foldInput) {
  return (foldInput.variables ?? []).filter((variable) => variable.collocation_role === "shifted_separator_c1_arc_bump");
}

function foldCoordinateVariable(foldInput, id) {
  return (foldInput.variables ?? []).find((variable) => variable.id === id) ?? null;
}

function ansatzFields(foldInput, foldResult, endpointContract) {
  const basisDefinition = foldInput.basis_definition ?? {};
  const formula = basisDefinition.formula ?? "";
  const c1Count = c1Variables(foldInput).length;
  const foldColumn = foldCoordinateVariable(foldInput, endpointContract.id);
  const witnessValue = Number(foldResult.witness?.[endpointContract.id]);
  const sourceTemplateAvailable =
    c1Count > 0 &&
    formula.includes("sin") &&
    formula.includes("^2") &&
    formula.includes("H(theta+1/2)=-H(theta)");
  return {
    c1_source_template_available: sourceTemplateAvailable,
    c1_source_template_same_packet: false,
    ansatz_family_declared: sourceTemplateAvailable && foldColumn !== null && foldResult.status === "feasible",
    ansatz_theta_support_declared: sourceTemplateAvailable,
    ansatz_basis_formula_declared: sourceTemplateAvailable,
    ansatz_basis_derivative_formula_declared: sourceTemplateAvailable,
    ansatz_periodic_extension_rule_declared: sourceTemplateAvailable,
    ansatz_c1_gluing_rule_declared: sourceTemplateAvailable && typeof basisDefinition.separator_velocity_note === "string",
    ansatz_endpoint_motion_rule_derived: false,
    ansatz_target_action_matches_contract:
      foldColumn !== null &&
      Number.isFinite(witnessValue) &&
      endpointContract.required_fields_present?.target_action_sign_consistent === true,
    ansatz_non_target_zero_rule_checked: false,
    ansatz_promoted_to_same_packet_basis: false,
    c1_endpoint_basis_ansatz_constructed: false,
  };
}

function proofFieldsFromContract(endpointContract) {
  const contractFields = endpointContract.required_fields_present ?? {};
  return Object.fromEntries(ENDPOINT_PROOF_FIELDS.map((field) => [field, contractFields[field] === true]));
}

function methodResult(method, ansatzFieldValues, proofFieldValues) {
  const missingAnsatzFields = method.required_ansatz_fields.filter((field) => ansatzFieldValues[field] !== true);
  const missingProofFields = method.required_proof_fields.filter((field) => proofFieldValues[field] !== true);
  return {
    method_id: method.id,
    description: method.description,
    required_ansatz_fields: method.required_ansatz_fields,
    required_proof_fields: method.required_proof_fields,
    missing_ansatz_fields: missingAnsatzFields,
    missing_proof_fields: missingProofFields,
    failure_codes: [
      ...missingAnsatzFields.map((field) => `missing_ansatz_${field}`),
      ...missingProofFields.map((field) => `missing_proof_${field}`),
    ],
    passed: missingAnsatzFields.length === 0 && missingProofFields.length === 0,
  };
}

function buildEndpointAttempt(endpointContract, foldInput, foldResult) {
  const ansatzFieldValues = ansatzFields(foldInput, foldResult, endpointContract);
  const proofFieldValues = proofFieldsFromContract(endpointContract);
  const methodResults = ANSATZ_METHODS.map((method) => methodResult(method, ansatzFieldValues, proofFieldValues));
  const c1Bumps = c1Variables(foldInput);
  const foldColumn = foldCoordinateVariable(foldInput, endpointContract.id);
  return {
    id: endpointContract.id,
    endpoint_functional_id: endpointContract.endpoint_functional_id,
    role: endpointContract.role,
    basis_symbol: endpointContract.basis_symbol,
    source_symbol: endpointContract.source_symbol,
    row_uses: endpointContract.row_uses,
    target_equation: endpointContract.target_equation,
    target_action: endpointContract.target_action,
    target_sign: endpointContract.target_sign,
    c1_template_source: {
      basis_model: foldInput.packet_identity?.basis_model,
      formula_template: foldInput.basis_definition?.formula ?? null,
      c1_variables: c1Bumps.map((variable) => variable.id),
      fold_coordinate_column: foldColumn,
      fold_coordinate_witness_value: foldResult.witness?.[endpointContract.id] ?? null,
    },
    ansatz_fields_present: ansatzFieldValues,
    required_fields_present: proofFieldValues,
    method_results: methodResults,
    passed_methods: methodResults.filter((result) => result.passed).map((result) => result.method_id),
    failed_methods: methodResults.filter((result) => !result.passed).map((result) => result.method_id),
    c1_source_template_available: ansatzFieldValues.c1_source_template_available === true,
    c1_endpoint_basis_ansatz_constructed: ansatzFieldValues.c1_endpoint_basis_ansatz_constructed === true,
    domain_evaluation_map_constructed: proofFieldValues.domain_evaluation_map_constructed === true,
    realization_supplied: false,
    no_promotion_reason:
      "The $C^1$ bump template supplies a diagnostic smooth perturbation family, but no same-packet endpoint-functional domain chart, endpoint evaluation map, endpoint-motion rule, or exact replay certificate is bound to this `fc_*` endpoint.",
  };
}

function buildRowAttempt(rowContract, endpointAttemptById) {
  const source = endpointAttemptById.get(rowContract.source_endpoint_contract_id);
  const receiver = endpointAttemptById.get(rowContract.receiver_endpoint_contract_id);
  const contractFields = rowContract.required_fields_present ?? {};
  const fields = {
    row_locator_resolved: contractFields.row_locator_resolved === true,
    source_endpoint_contract_declared: rowContract.endpoint_contract_status?.source_endpoint_contract_declared === true,
    receiver_endpoint_contract_declared: rowContract.endpoint_contract_status?.receiver_endpoint_contract_declared === true,
    source_c1_endpoint_basis_ansatz_constructed: source?.c1_endpoint_basis_ansatz_constructed === true,
    receiver_c1_endpoint_basis_ansatz_constructed: receiver?.c1_endpoint_basis_ansatz_constructed === true,
    source_domain_evaluation_map_constructed: source?.domain_evaluation_map_constructed === true,
    receiver_domain_evaluation_map_constructed: receiver?.domain_evaluation_map_constructed === true,
    combined_domain_evaluation_pair_constructed: false,
    screen_positive_candidate_change_row: contractFields.screen_positive_candidate_change_row === true,
    signed_boundary_delta_contract_defined: contractFields.signed_boundary_delta_contract_defined === true,
    proof_grade_boundary_opening_certified: false,
    same_packet_history_update_formula_present: contractFields.same_packet_history_update_formula_present === true,
    candidate_artifacts_present: contractFields.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change: contractFields.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change: contractFields.proof_interval_v1_v6_rerun_for_candidate_change === true,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_domain_evaluation_pair_constructed =
    fields.source_domain_evaluation_map_constructed && fields.receiver_domain_evaluation_map_constructed;
  fields.proof_grade_boundary_opening_certified =
    fields.combined_domain_evaluation_pair_constructed &&
    fields.screen_positive_candidate_change_row &&
    fields.signed_boundary_delta_contract_defined &&
    fields.same_packet_history_update_formula_present &&
    fields.root_topology_recertified_for_candidate_change &&
    fields.proof_interval_v1_v6_rerun_for_candidate_change;
  return {
    row_id: rowContract.row_id,
    source_interval: rowContract.source_interval,
    receiver_interval: rowContract.receiver_interval,
    failed_side: rowContract.failed_side,
    boundary_side: rowContract.boundary_side,
    source_endpoint_contract_id: rowContract.source_endpoint_contract_id,
    receiver_endpoint_contract_id: rowContract.receiver_endpoint_contract_id,
    required_fields_present: fields,
    c1_source_template_pair_available: source?.c1_source_template_available === true && receiver?.c1_source_template_available === true,
    c1_endpoint_basis_ansatz_pair_constructed:
      fields.source_c1_endpoint_basis_ansatz_constructed && fields.receiver_c1_endpoint_basis_ansatz_constructed,
    row_ready: ROW_ANSATZ_FIELDS.every((field) => fields[field] === true),
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has a source/receiver $C^1$ ansatz pair and a signed screen-positive contract, but source and receiver endpoint-functional domain/evaluation maps are not constructed and no proof-grade same-packet replay exists.",
  };
}

function failureCodeCounts(endpointAttempts) {
  const counts = new Map();
  for (const attempt of endpointAttempts) {
    for (const result of attempt.method_results) {
      for (const code of result.failure_codes) {
        counts.set(code, (counts.get(code) ?? 0) + 1);
      }
    }
  }
  return Object.fromEntries([...counts.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

function buildAttempt(inputs, sources) {
  assertInputs(inputs);
  const endpointAttempts = inputs.domainEvaluationContract.endpoint_domain_evaluation_contracts.map((contract) =>
    buildEndpointAttempt(contract, inputs.foldCoordinateInput, inputs.foldCoordinateResult)
  );
  const endpointAttemptById = byId(endpointAttempts);
  const rowAttempts = inputs.domainEvaluationContract.row_domain_evaluation_contracts.map((rowContract) =>
    buildRowAttempt(rowContract, endpointAttemptById)
  );
  const endpointProofCounts = countFields(endpointAttempts, ENDPOINT_PROOF_FIELDS);
  const endpointAnsatzCounts = countFields(endpointAttempts, ENDPOINT_ANSATZ_FIELDS, "ansatz_fields_present");
  const rowCounts = countFields(rowAttempts, ROW_ANSATZ_FIELDS);
  const methodCounts = Object.fromEntries(
    ANSATZ_METHODS.map((method) => [
      method.id,
      endpointAttempts.filter((attempt) => attempt.method_results.some((result) => result.method_id === method.id && result.passed))
        .length,
    ])
  );
  return {
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-c1-endpoint-basis-ansatz-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "fold_coordinate_endpoint_functional_c1_endpoint_basis_ansatz_attempt_fail_closed",
    theorem_target: "Fold-Coordinate Endpoint-Functional C1 Endpoint-Basis Ansatz Attempt",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only C1 endpoint-basis ansatz attempt; reuses diagnostic smooth-bump template data but constructs no endpoint-functional domain/evaluation maps and consumes no rows",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_artifacts: {
      domainEvaluationContract: artifactRecord(sources.domainEvaluationContract),
      foldCoordinateInput: artifactRecord(sources.foldCoordinateInput),
      foldCoordinateResult: artifactRecord(sources.foldCoordinateResult),
    },
    ansatz_rule:
      "A $C^1$ bump template can be reused for the endpoint-functional route only after it is bound to a declared `fc_*` endpoint-functional domain chart, coordinate rule, basis formula, derivative formula, endpoint-motion rule, evaluation map, non-target zero rule, exact $B\\xi=0$ certificate, rank certificate, candidate artifacts, topology recertification, and proof-interval v1-v6 replay.",
    no_promotion_rule:
      "Do not promote shifted-separator $C^1$ bump templates, fold-coordinate screen columns, witness scalars, or tolerance-level $B\\xi$ residuals into same-packet endpoint-functional domain/evaluation maps.",
    c1_template_summary: {
      basis_model: inputs.foldCoordinateInput.packet_identity?.basis_model,
      formula_template: inputs.foldCoordinateInput.basis_definition?.formula ?? null,
      c1_variable_count: c1Variables(inputs.foldCoordinateInput).length,
      fold_coordinate_variable_count: (inputs.foldCoordinateInput.variables ?? []).filter(
        (variable) => variable.collocation_role === "fold_coordinate_boundary_opening"
      ).length,
      fold_coordinate_result_status: inputs.foldCoordinateResult.status,
      screen_tolerance_zero_present: inputs.foldCoordinateResult.B_xi_residual_verified_zero_with_tolerance === true,
      exact_screen_zero_certified: inputs.foldCoordinateResult.B_xi_residual_certified_zero === true,
      rank_certified: inputs.foldCoordinateResult.rank_B_certified === true,
      claims_live_candidate: inputs.foldCoordinateInput.claim_limits?.claims_live_candidate === true,
      claims_branch_chart_authorization: inputs.foldCoordinateInput.claim_limits?.claims_branch_chart_authorization === true,
    },
    ansatz_methods: ANSATZ_METHODS,
    endpoint_c1_endpoint_basis_ansatz_attempts: endpointAttempts,
    row_c1_endpoint_basis_ansatz_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      rows: rowAttempts.length,
      endpoint_contracts_declared: endpointAttempts.filter(
        (attempt) => attempt.required_fields_present.endpoint_locator_resolved && attempt.required_fields_present.functional_target_equation_defined
      ).length,
      c1_endpoint_basis_ansatzes_tested: endpointAttempts.length,
      c1_endpoint_basis_ansatzes_constructed: endpointAttempts.filter(
        (attempt) => attempt.c1_endpoint_basis_ansatz_constructed
      ).length,
      ansatz_formulas_declared: endpointAnsatzCounts.ansatz_basis_formula_declared,
      ansatz_derivative_formulas_declared: endpointAnsatzCounts.ansatz_basis_derivative_formula_declared,
      ansatz_c1_gluing_rules_declared: endpointAnsatzCounts.ansatz_c1_gluing_rule_declared,
      ansatz_promoted_to_same_packet_basis_count: endpointAnsatzCounts.ansatz_promoted_to_same_packet_basis,
      domain_evaluation_maps_constructed: endpointAttempts.filter((attempt) => attempt.domain_evaluation_map_constructed).length,
      endpoint_realizations_supplied: endpointAttempts.filter((attempt) => attempt.realization_supplied).length,
      exact_screen_zero_certified_endpoint_functionals: endpointProofCounts.exact_screen_zero_certified,
      rank_certified_endpoint_functionals: endpointProofCounts.rank_certified,
      endpoint_methods_passed_total: endpointAttempts.reduce(
        (sum, attempt) => sum + attempt.method_results.filter((result) => result.passed).length,
        0
      ),
      row_locators_resolved: rowCounts.row_locator_resolved,
      rows_with_source_c1_endpoint_basis_ansatz_constructed:
        rowCounts.source_c1_endpoint_basis_ansatz_constructed,
      rows_with_receiver_c1_endpoint_basis_ansatz_constructed:
        rowCounts.receiver_c1_endpoint_basis_ansatz_constructed,
      rows_with_combined_domain_evaluation_pair_constructed: rowCounts.combined_domain_evaluation_pair_constructed,
      proof_grade_boundary_opening_rows: rowCounts.proof_grade_boundary_opening_certified,
      screen_positive_rows: rowCounts.screen_positive_candidate_change_row,
      signed_boundary_delta_rows: rowCounts.signed_boundary_delta_contract_defined,
      row_ready_count: rowAttempts.filter((row) => row.row_ready).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      c1_ansatz_failure_code_counts: failureCodeCounts(endpointAttempts),
      endpoint_required_fields_certified_counts: endpointProofCounts,
      endpoint_ansatz_field_counts: endpointAnsatzCounts,
      row_required_fields_certified_counts: rowCounts,
      ansatz_method_pass_counts: methodCounts,
    },
  };
}

function endpointTable(attempts) {
  return attempts
    .map(
      (attempt) =>
        `| \`${attempt.id}\` | \`${attempt.endpoint_functional_id}\` | ${attempt.c1_source_template_available} | ${attempt.c1_endpoint_basis_ansatz_constructed} | ${attempt.domain_evaluation_map_constructed} | ${attempt.passed_methods.length} / ${ANSATZ_METHODS.length} | \`${attempt.target_equation}\` |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | ${row.c1_source_template_pair_available} | ${row.c1_endpoint_basis_ansatz_pair_constructed} | ${row.required_fields_present.screen_positive_candidate_change_row} | ${row.required_fields_present.signed_boundary_delta_contract_defined} | ${row.required_fields_present.combined_domain_evaluation_pair_constructed} | ${row.row_ready} |`
    )
    .join("\n");
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function methodTable(counts, total) {
  return ANSATZ_METHODS.map((method) => `| \`${method.id}\` | ${counts[method.id]} / ${total} |`).join("\n");
}

function buildReport(attempt) {
  return `# Higher-Fold Fold-Coordinate Endpoint-Functional C1 Endpoint-Basis Ansatz Attempt

## Verdict

The existing $C^1$ shifted-separator bump machinery supplies a smooth template
for all four \`fc_*\` endpoint variables, but it does not construct an
endpoint-functional domain/evaluation map. The attempt fail-closes with 4 / 4
$C^1$ ansatz templates available, 0 / 4 endpoint-functional domain/evaluation
maps constructed, and 0 / 3 row-ready domain/evaluation pairs.

| Quantity | Value |
| --- | ---: |
| Endpoint functionals | ${attempt.summary.endpoint_functionals} |
| $C^1$ endpoint-basis ansatzes tested | ${attempt.summary.c1_endpoint_basis_ansatzes_tested} |
| $C^1$ endpoint-basis ansatzes constructed | ${attempt.summary.c1_endpoint_basis_ansatzes_constructed} |
| Endpoint domain/evaluation maps constructed | ${attempt.summary.domain_evaluation_maps_constructed} |
| Endpoint realizations supplied | ${attempt.summary.endpoint_realizations_supplied} |
| Passed endpoint ansatz methods | ${attempt.summary.endpoint_methods_passed_total} |
| Row source ansatzes constructed | ${attempt.summary.rows_with_source_c1_endpoint_basis_ansatz_constructed} |
| Row receiver ansatzes constructed | ${attempt.summary.rows_with_receiver_c1_endpoint_basis_ansatz_constructed} |
| Row domain/evaluation pairs constructed | ${attempt.summary.rows_with_combined_domain_evaluation_pair_constructed} |
| Row-ready count | ${attempt.summary.row_ready_count} |
| Row consumption count | ${attempt.summary.row_consumption_count} |

## Ansatz Rule

${attempt.ansatz_rule}

${attempt.no_promotion_rule}

## Endpoint Attempts

| Variable | Functional | $C^1$ source template | Endpoint-basis ansatz constructed | Domain/evaluation map constructed | Passed methods | Target equation |
| --- | --- | --- | --- | --- | ---: | --- |
${endpointTable(attempt.endpoint_c1_endpoint_basis_ansatz_attempts)}

## Method Audit

| Method | Endpoint passes |
| --- | ---: |
${methodTable(attempt.summary.ansatz_method_pass_counts, attempt.summary.endpoint_functionals)}

## Ansatz-Field Audit

| Field | Endpoint ansatz fields |
| --- | ---: |
${fieldTable(attempt.summary.endpoint_ansatz_field_counts, ENDPOINT_ANSATZ_FIELDS, attempt.summary.endpoint_functionals)}

## Proof-Field Audit

| Field | Endpoint proof fields |
| --- | ---: |
${fieldTable(attempt.summary.endpoint_required_fields_certified_counts, ENDPOINT_PROOF_FIELDS, attempt.summary.endpoint_functionals)}

## Row Attempts

| Row | $C^1$ source-template pair | Endpoint-basis pair constructed | Screen positive | Signed delta contract | Domain/evaluation pair constructed | Ready |
| --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_c1_endpoint_basis_ansatz_attempts)}

## Row-Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(attempt.summary.row_required_fields_certified_counts, ROW_ANSATZ_FIELDS, attempt.summary.rows)}

## Closure Burden

The $C^1$ bump machinery is reusable only as a smooth-template source. It does
not by itself define the endpoint-functional domain chart, coordinate rule,
evaluation map, endpoint-motion rule, non-target zero certificate, exact
$B\\xi=0$ certificate, rank certificate, candidate artifacts, topology
recertification, or proof-interval v1-v6 replay. A constructive successor must
write those same-packet endpoint-functional objects explicitly.

## Capture Decision

Priority-only ansatz attempt. This packet is useful because it rules out a
tempting shortcut from diagnostic $C^1$ screen machinery to endpoint-functional
domain/evaluation maps. It is not ready for authored AAA prose because it
records a failed construction route rather than a branch certificate.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputs = {
    domainEvaluationContract: readJson(args.domainEvaluationContract),
    foldCoordinateInput: readJson(args.foldCoordinateInput),
    foldCoordinateResult: readJson(args.foldCoordinateResult),
  };
  const sources = {
    domainEvaluationContract: args.domainEvaluationContract,
    foldCoordinateInput: args.foldCoordinateInput,
    foldCoordinateResult: args.foldCoordinateResult,
  };
  const attempt = buildAttempt(inputs, sources);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, attempt, args.pretty);
  writeText(outReport, buildReport(attempt));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
