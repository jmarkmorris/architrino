#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_DOMAIN_EVALUATION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_domain_evaluation_map_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BINDING_CONTRACT = `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_contract_no_go.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_HISTORY_CONTRACT = `${CERT_DIR}/fold_coordinate_history_realization_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_domain_evaluation_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_domain_evaluation_contract_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_AUDIT_FIELDS = [
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

const ENDPOINT_DOMAIN_EVALUATION_REALIZATION_FIELDS = [
  "endpoint_boundary_binding",
  "endpoint_functional_domain",
  "domain_chart",
  "domain_coordinate_rule",
  "basis_vector_bound_to_domain",
  "evaluation_map",
  "endpoint_evaluation_rule",
  "endpoint_value_bound_to_evaluation_map",
  "theta_support",
  "basis_formula",
  "basis_derivative_formula",
  "x_update_basis",
  "xdot_update_basis",
  "mesh_update_rule",
  "endpoint_motion_rule",
  "source_monotonicity_rule",
  "receiver_monotonicity_rule",
  "periodic_extension_rule",
  "c1_gluing_rule",
  "same_packet_history_update_formula",
  "non_target_endpoint_functionals_zero_certificate",
  "exact_B_xi_zero_certificate",
  "rank_certificate",
  "candidate_artifact_writers",
  "root_topology_recertification",
  "proof_interval_v1_v6_replay",
];

const ENDPOINT_CONTRACT_DECLARATION_FIELDS = [
  "endpoint_locator_declared",
  "row_local_endpoint_value_declared",
  "target_equation_declared",
  "target_action_sign_declared",
  "endpoint_functional_domain_symbol_declared",
  "domain_chart_symbol_declared",
  "domain_coordinate_rule_declared",
  "basis_vector_domain_binding_declared",
  "evaluation_map_symbol_declared",
  "endpoint_evaluation_rule_declared",
  "endpoint_motion_rule_declared",
  "non_target_zero_rule_declared",
  "exact_screen_rank_replay_requirements_declared",
];

const ROW_CONTRACT_FIELDS = [
  "row_locator_resolved",
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

const ATTEMPT_FIELD_BY_REALIZATION_FIELD = {
  endpoint_boundary_binding: "endpoint_boundary_binding_present",
  endpoint_functional_domain: "endpoint_functional_domain_present",
  domain_chart: "domain_chart_declared",
  domain_coordinate_rule: "domain_coordinate_rule_declared",
  basis_vector_bound_to_domain: "basis_vector_bound_to_domain",
  evaluation_map: "evaluation_map_declared",
  endpoint_evaluation_rule: "endpoint_evaluation_rule_declared",
  endpoint_value_bound_to_evaluation_map: "endpoint_value_bound_to_evaluation_map",
  theta_support: "theta_support_present",
  basis_formula: "basis_formula_present",
  basis_derivative_formula: "basis_derivative_formula_present",
  x_update_basis: "x_update_basis_present",
  xdot_update_basis: "xdot_update_basis_present",
  mesh_update_rule: "mesh_update_rule_present",
  endpoint_motion_rule: "endpoint_motion_rule_present",
  source_monotonicity_rule: "source_monotonicity_rule_present",
  receiver_monotonicity_rule: "receiver_monotonicity_rule_present",
  periodic_extension_rule: "periodic_extension_rule_present",
  c1_gluing_rule: "c1_gluing_rule_present",
  same_packet_history_update_formula: "same_packet_history_update_formula_present",
  non_target_endpoint_functionals_zero_certificate: "non_target_endpoint_functionals_zero_certified",
  exact_B_xi_zero_certificate: "exact_screen_zero_certified",
  rank_certificate: "rank_certified",
  candidate_artifact_writers: null,
  root_topology_recertification: null,
  proof_interval_v1_v6_replay: null,
};

function parseArgs(argv) {
  const args = {
    domainEvaluationAttempt: DEFAULT_DOMAIN_EVALUATION_ATTEMPT,
    bindingContract: DEFAULT_BINDING_CONTRACT,
    historyContract: DEFAULT_HISTORY_CONTRACT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--domain-evaluation-attempt") {
      args.domainEvaluationAttempt = argv[++index];
    } else if (arg === "--binding-contract") {
      args.bindingContract = argv[++index];
    } else if (arg === "--history-contract") {
      args.historyContract = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-domain-evaluation-contract.mjs [options]

Options:
  --domain-evaluation-attempt PATH  Endpoint-functional domain/evaluation-map attempt JSON. Defaults to ${DEFAULT_DOMAIN_EVALUATION_ATTEMPT}.
  --binding-contract PATH           Endpoint-functional binding no-go JSON. Defaults to ${DEFAULT_BINDING_CONTRACT}.
  --history-contract PATH           History-realization contract JSON. Defaults to ${DEFAULT_HISTORY_CONTRACT}.
  --out-dir PATH                    Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                          Pretty-print JSON artifact.
  --help                            Show this help.`);
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
    throw new Error(`Refusing to build domain/evaluation contract from an authorized or live-updating ${label}.`);
  }
}

function assertInputs(inputs) {
  assertCommonProofInput(inputs.domainEvaluationAttempt, "domain/evaluation attempt");
  assertCommonProofInput(inputs.bindingContract, "binding contract");
  assertCommonProofInput(inputs.historyContract, "history contract");
  if (inputs.domainEvaluationAttempt.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(
      `Unexpected domain/evaluation-attempt fold-coordinate packet id: ${inputs.domainEvaluationAttempt.fold_coordinate_packet_id}`
    );
  }
  if (inputs.bindingContract.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected binding-contract fold-coordinate packet id: ${inputs.bindingContract.fold_coordinate_packet_id}`);
  }
  if (inputs.historyContract.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected history-contract fold-coordinate packet id: ${inputs.historyContract.fold_coordinate_packet_id}`);
  }
  if (inputs.domainEvaluationAttempt.status !== "fold_coordinate_endpoint_functional_domain_evaluation_map_attempt_fail_closed") {
    throw new Error(`Unexpected domain/evaluation-attempt status: ${inputs.domainEvaluationAttempt.status}`);
  }
  if (inputs.bindingContract.status !== "fold_coordinate_endpoint_functional_binding_contract_no_go_fail_closed") {
    throw new Error(`Unexpected binding-contract status: ${inputs.bindingContract.status}`);
  }
  if (inputs.historyContract.status !== "fold_coordinate_history_realization_contract_defined_realization_absent") {
    throw new Error(`Unexpected history-contract status: ${inputs.historyContract.status}`);
  }
  if (
    !Array.isArray(inputs.domainEvaluationAttempt.endpoint_domain_evaluation_attempts) ||
    inputs.domainEvaluationAttempt.endpoint_domain_evaluation_attempts.length !== 4
  ) {
    throw new Error("Expected exactly 4 endpoint domain/evaluation attempts.");
  }
  if (
    !Array.isArray(inputs.domainEvaluationAttempt.row_domain_evaluation_attempts) ||
    inputs.domainEvaluationAttempt.row_domain_evaluation_attempts.length !== 3
  ) {
    throw new Error("Expected exactly 3 row domain/evaluation attempts.");
  }
}

function targetEquation(endpointAttempt) {
  return endpointAttempt.required_endpoint_functionals?.[0]?.target_equation ?? null;
}

function targetSign(endpointAttempt) {
  return endpointAttempt.required_endpoint_functionals?.[0]?.sign ?? null;
}

function targetAction(endpointAttempt) {
  return endpointAttempt.required_endpoint_functionals?.[0]?.action ?? endpointAttempt.endpoint_functional_id?.replace(/^E_/, "");
}

function contractDeclarationFields(endpointAttempt) {
  const attemptFields = endpointAttempt.required_fields_present ?? {};
  return {
    endpoint_locator_declared: attemptFields.endpoint_locator_resolved === true,
    row_local_endpoint_value_declared: attemptFields.row_local_endpoint_value_present === true,
    target_equation_declared: attemptFields.functional_target_equation_defined === true,
    target_action_sign_declared: attemptFields.target_action_sign_consistent === true,
    endpoint_functional_domain_symbol_declared: true,
    domain_chart_symbol_declared: true,
    domain_coordinate_rule_declared: true,
    basis_vector_domain_binding_declared: true,
    evaluation_map_symbol_declared: true,
    endpoint_evaluation_rule_declared: true,
    endpoint_motion_rule_declared: true,
    non_target_zero_rule_declared: true,
    exact_screen_rank_replay_requirements_declared: true,
  };
}

function presentRealizationFields(endpointAttempt) {
  const attemptFields = endpointAttempt.required_fields_present ?? {};
  return ENDPOINT_DOMAIN_EVALUATION_REALIZATION_FIELDS.filter((field) => {
    const attemptField = ATTEMPT_FIELD_BY_REALIZATION_FIELD[field];
    return attemptField !== null && attemptFields[attemptField] === true;
  });
}

function endpointAuditFields(endpointAttempt) {
  const attemptFields = endpointAttempt.required_fields_present ?? {};
  return Object.fromEntries(
    ENDPOINT_AUDIT_FIELDS.map((field) => {
      if (field === "periodic_extension_rule_present" || field === "c1_gluing_rule_present") {
        return [field, false];
      }
      return [field, attemptFields[field] === true];
    })
  );
}

function buildEndpointContract(endpointAttempt, bindingAttempt, historyVariable) {
  const declarations = contractDeclarationFields(endpointAttempt);
  const auditFields = endpointAuditFields(endpointAttempt);
  const presentFields = presentRealizationFields(endpointAttempt);
  const missingFields = ENDPOINT_DOMAIN_EVALUATION_REALIZATION_FIELDS.filter((field) => !presentFields.includes(field));
  const action = targetAction(endpointAttempt);
  const sign = targetSign(endpointAttempt);
  const endpointFunctional = endpointAttempt.endpoint_functional_id;
  const domainSymbol = `D_${endpointAttempt.id}`;
  const chartSymbol = `chi_${endpointAttempt.id}`;
  const evaluationMapSymbol = `ev_${endpointAttempt.id}`;
  return {
    id: endpointAttempt.id,
    endpoint_functional_id: endpointFunctional,
    role: endpointAttempt.role,
    basis_symbol: endpointAttempt.basis_symbol,
    source_symbol: endpointAttempt.source_symbol,
    row_uses: endpointAttempt.target_endpoint_refs?.map((ref) => ref.row_id) ?? [],
    target_endpoint_refs: endpointAttempt.target_endpoint_refs,
    target_endpoint_values: endpointAttempt.target_endpoint_values,
    required_endpoint_functionals: endpointAttempt.required_endpoint_functionals,
    target_action: action,
    target_sign: sign,
    target_equation: targetEquation(endpointAttempt),
    endpoint_functional_domain_contract: {
      domain_symbol: domainSymbol,
      domain_meaning:
        "Finite same-packet perturbation directions for the declared fold-coordinate endpoint functional.",
      chart_symbol: chartSymbol,
      chart_rule:
        `${chartSymbol} maps a candidate perturbation to the coefficient of ${endpointAttempt.basis_symbol} in the endpoint-functional domain.`,
      coordinate_rule:
        "Domain coordinates must be attached to a same-packet basis formula, not to a row-local endpoint q-value.",
      basis_vector_binding:
        `${endpointAttempt.basis_symbol} must be an element of ${domainSymbol} with declared theta support, formula, derivative formula, and mesh/endpoint update rules.`,
    },
    evaluation_map_contract: {
      evaluation_map_symbol: evaluationMapSymbol,
      endpoint_functional: endpointFunctional,
      target_equation: targetEquation(endpointAttempt),
      endpoint_evaluation_rule:
        sign === null
          ? `${endpointFunctional} evaluates same-packet endpoint motion of ${endpointAttempt.basis_symbol}.`
          : `${endpointFunctional}(${endpointAttempt.basis_symbol}) = ${sign > 0 ? "+1" : "-1"} must be realized by the endpoint motion rule, not asserted as a label.`,
      endpoint_motion_rule:
        `The first variation of the ${action} endpoint under ${endpointAttempt.basis_symbol} must equal ${sign ?? "the target sign"} on the same packet.`,
      non_target_zero_rule:
        `All non-target one-leaf endpoint functionals must vanish on ${endpointAttempt.basis_symbol} or be explicitly accounted for by no-double-counting data.`,
    },
    replay_contract: {
      exact_screen_zero_required: true,
      rank_certificate_required: true,
      candidate_artifact_writers_required: true,
      root_topology_recertification_required: true,
      proof_interval_v1_v6_replay_required: true,
    },
    inherited_history_contract_fields: historyVariable?.required_realization_fields ?? [],
    binding_no_go_reference: {
      binding_contract_satisfied: bindingAttempt?.binding_contract_satisfied ?? false,
      missing_binding_fields: bindingAttempt?.missing_binding_fields ?? [],
    },
    required_fields_present: auditFields,
    contract_declaration_fields_present: declarations,
    contract_declared: ENDPOINT_CONTRACT_DECLARATION_FIELDS.every((field) => declarations[field] === true),
    required_realization_fields: ENDPOINT_DOMAIN_EVALUATION_REALIZATION_FIELDS,
    present_realization_fields: presentFields,
    missing_realization_fields: missingFields,
    realization_supplied: missingFields.length === 0,
    no_go_guard:
      "This contract does not promote row-local endpoint values. It only declares the domain/evaluation object that a future same-packet construction must realize.",
  };
}

function buildRowContract(rowAttempt, endpointContractById, historyRow) {
  const source = endpointContractById.get(rowAttempt.source_domain_evaluation_id);
  const receiver = endpointContractById.get(rowAttempt.receiver_domain_evaluation_id);
  const rowFields = rowAttempt.required_fields_present ?? {};
  const historyFields = historyRow?.required_fields_present ?? {};
  const fields = {
    row_locator_resolved: rowFields.row_locator_resolved === true,
    source_domain_evaluation_map_constructed: source?.required_fields_present?.domain_evaluation_map_constructed === true,
    receiver_domain_evaluation_map_constructed: receiver?.required_fields_present?.domain_evaluation_map_constructed === true,
    combined_domain_evaluation_pair_constructed: false,
    screen_positive_candidate_change_row: rowFields.screen_positive_candidate_change_row === true,
    signed_boundary_delta_contract_defined:
      historyFields.source_boundary_delta_contract_defined === true &&
      historyFields.receiver_boundary_delta_contract_defined === true,
    proof_grade_boundary_opening_certified: false,
    same_packet_history_update_formula_present: rowFields.same_packet_history_update_formula_present === true,
    candidate_artifacts_present: rowFields.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change: rowFields.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change: rowFields.proof_interval_v1_v6_rerun_for_candidate_change === true,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_domain_evaluation_pair_constructed =
    fields.source_domain_evaluation_map_constructed && fields.receiver_domain_evaluation_map_constructed;
  fields.proof_grade_boundary_opening_certified =
    fields.combined_domain_evaluation_pair_constructed &&
    fields.signed_boundary_delta_contract_defined &&
    fields.same_packet_history_update_formula_present &&
    fields.root_topology_recertified_for_candidate_change &&
    fields.proof_interval_v1_v6_rerun_for_candidate_change;
  return {
    row_id: rowAttempt.row_id,
    source_interval: rowAttempt.source_interval,
    receiver_interval: rowAttempt.receiver_interval,
    failed_side: rowAttempt.failed_side,
    boundary_side: rowAttempt.boundary_side,
    source_endpoint_contract_id: rowAttempt.source_domain_evaluation_id,
    receiver_endpoint_contract_id: rowAttempt.receiver_domain_evaluation_id,
    source_boundary_value: rowAttempt.source_boundary_value,
    receiver_boundary_value: rowAttempt.receiver_boundary_value,
    endpoint_contract_status: {
      source_endpoint_contract_declared: source?.contract_declared === true,
      receiver_endpoint_contract_declared: receiver?.contract_declared === true,
      source_endpoint_realization_supplied: source?.realization_supplied === true,
      receiver_endpoint_realization_supplied: receiver?.realization_supplied === true,
    },
    inherited_history_contract: {
      source_boundary_delta_contract: historyRow?.source_boundary_delta ?? null,
      receiver_boundary_delta_contract: historyRow?.receiver_boundary_delta ?? null,
      success_inequality: historyRow?.success_inequality ?? null,
    },
    required_fields_present: fields,
    contract_ready: ROW_CONTRACT_FIELDS.every((field) => fields[field] === true),
    row_consumed: false,
    branch_chart_authorized: false,
    contract_blocker:
      "The row has declared source and receiver endpoint-functional contracts, but their domain/evaluation realizations, same-packet replay, and proof-grade boundary-opening data are absent.",
  };
}

function buildDomainEvaluationContract(inputs, sources) {
  assertInputs(inputs);
  const bindingById = byId(inputs.bindingContract.endpoint_binding_attempts);
  const historyById = byId(inputs.historyContract.realization_variables);
  const historyRowsById = byId(inputs.historyContract.rows, "row_id");
  const endpointContracts = inputs.domainEvaluationAttempt.endpoint_domain_evaluation_attempts.map((endpointAttempt) =>
    buildEndpointContract(endpointAttempt, bindingById.get(endpointAttempt.id), historyById.get(endpointAttempt.id))
  );
  const endpointContractById = byId(endpointContracts);
  const rowContracts = inputs.domainEvaluationAttempt.row_domain_evaluation_attempts.map((rowAttempt) =>
    buildRowContract(rowAttempt, endpointContractById, historyRowsById.get(rowAttempt.row_id))
  );
  const endpointDeclarationCounts = countFields(
    endpointContracts,
    ENDPOINT_CONTRACT_DECLARATION_FIELDS,
    "contract_declaration_fields_present"
  );
  const endpointAuditCounts = countFields(endpointContracts, ENDPOINT_AUDIT_FIELDS);
  const rowCounts = countFields(rowContracts, ROW_CONTRACT_FIELDS);
  const realizedFieldCounts = Object.fromEntries(
    ENDPOINT_DOMAIN_EVALUATION_REALIZATION_FIELDS.map((field) => [
      field,
      endpointContracts.filter((contract) => contract.present_realization_fields.includes(field)).length,
    ])
  );
  return {
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-domain-evaluation-map-contract-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "fold_coordinate_endpoint_functional_domain_evaluation_map_contract_defined_domain_evaluation_map_absent",
    theorem_target: "Fold-Coordinate Endpoint-Functional Domain/Evaluation-Map Contract",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only endpoint-functional domain/evaluation-map contract; defines the exact proof burden after the fail-closed domain/evaluation-map attempt, but supplies no same-packet endpoint-functional domain chart or evaluation map and consumes no rows",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_artifacts: {
      domainEvaluationAttempt: artifactRecord(sources.domainEvaluationAttempt),
      bindingContract: artifactRecord(sources.bindingContract),
      historyContract: artifactRecord(sources.historyContract),
    },
    contract_rule:
      "A fold-coordinate endpoint functional is contract-ready only after the row-local endpoint locator is paired with an explicit endpoint-functional domain, domain chart, domain coordinate rule, basis vector binding, evaluation map, endpoint evaluation rule, endpoint motion rule, non-target zero rule, exact $B\\xi=0$ certificate, rank certificate, same-packet candidate artifacts, topology recertification, and proof-interval v1-v6 replay.",
    no_go_lemma:
      "Endpoint locations, row-local endpoint q-values, screen coefficients, and target equations $E_j(\\Psi_j)=\\pm 1$ do not determine endpoint-functional domains or evaluation maps. Without an explicit domain chart, coordinate rule, evaluation map, endpoint-motion rule, and exact same-packet replay certificates, $E_j(\\Psi_j)=\\pm 1$ remains a desired boundary action rather than a constructed functional.",
    no_promotion_rule:
      "Do not promote endpoint refs, scalar endpoint q-values, target equations, or tolerance-level $B\\xi$ residuals into endpoint-functional domain/evaluation-map data.",
    endpoint_audit_fields: ENDPOINT_AUDIT_FIELDS,
    contract_declaration_fields: ENDPOINT_CONTRACT_DECLARATION_FIELDS,
    required_realization_fields: ENDPOINT_DOMAIN_EVALUATION_REALIZATION_FIELDS,
    row_contract_fields: ROW_CONTRACT_FIELDS,
    endpoint_domain_evaluation_contracts: endpointContracts,
    row_domain_evaluation_contracts: rowContracts,
    summary: {
      endpoint_functionals: endpointContracts.length,
      rows: rowContracts.length,
      endpoint_contracts_declared: endpointContracts.filter((contract) => contract.contract_declared).length,
      endpoint_realizations_supplied: endpointContracts.filter((contract) => contract.realization_supplied).length,
      endpoint_realization_field_count: ENDPOINT_DOMAIN_EVALUATION_REALIZATION_FIELDS.length,
      endpoint_contract_declaration_field_count: ENDPOINT_CONTRACT_DECLARATION_FIELDS.length,
      endpoint_audit_field_count: ENDPOINT_AUDIT_FIELDS.length,
      row_contract_field_count: ROW_CONTRACT_FIELDS.length,
      domain_charts_realized: realizedFieldCounts.domain_chart,
      evaluation_maps_realized: realizedFieldCounts.evaluation_map,
      endpoint_motion_rules_realized: realizedFieldCounts.endpoint_motion_rule,
      periodic_extension_rules_realized: realizedFieldCounts.periodic_extension_rule,
      c1_gluing_rules_realized: realizedFieldCounts.c1_gluing_rule,
      exact_screen_zero_certificates_realized: realizedFieldCounts.exact_B_xi_zero_certificate,
      rank_certificates_realized: realizedFieldCounts.rank_certificate,
      candidate_artifact_writers_realized: realizedFieldCounts.candidate_artifact_writers,
      root_topology_recertifications_realized: realizedFieldCounts.root_topology_recertification,
      proof_interval_v1_v6_replays_realized: realizedFieldCounts.proof_interval_v1_v6_replay,
      row_locators_resolved: rowCounts.row_locator_resolved,
      rows_with_source_domain_evaluation_map_constructed: rowCounts.source_domain_evaluation_map_constructed,
      rows_with_receiver_domain_evaluation_map_constructed: rowCounts.receiver_domain_evaluation_map_constructed,
      rows_with_combined_domain_evaluation_pair_constructed:
        rowCounts.combined_domain_evaluation_pair_constructed,
      rows_with_signed_boundary_delta_contract_defined: rowCounts.signed_boundary_delta_contract_defined,
      contract_ready_rows: rowContracts.filter((row) => row.contract_ready).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      endpoint_required_field_counts: endpointAuditCounts,
      endpoint_contract_declaration_counts: endpointDeclarationCounts,
      endpoint_realization_field_counts: realizedFieldCounts,
      row_contract_field_counts: rowCounts,
    },
  };
}

function endpointContractTable(contracts) {
  return contracts
    .map(
      (contract) =>
        `| \`${contract.id}\` | \`${contract.endpoint_functional_id}\` | ${contract.contract_declared} | ${contract.present_realization_fields.length} / ${ENDPOINT_DOMAIN_EVALUATION_REALIZATION_FIELDS.length} | ${contract.realization_supplied} | \`${contract.target_equation}\` |`
    )
    .join("\n");
}

function rowContractTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | ${row.required_fields_present.row_locator_resolved} | ${row.endpoint_contract_status.source_endpoint_contract_declared} | ${row.endpoint_contract_status.receiver_endpoint_contract_declared} | ${row.required_fields_present.combined_domain_evaluation_pair_constructed} | ${row.required_fields_present.signed_boundary_delta_contract_defined} | ${row.contract_ready} |`
    )
    .join("\n");
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function buildReport(contract) {
  return `# Higher-Fold Fold-Coordinate Endpoint-Functional Domain/Evaluation-Map Contract

## Verdict

The endpoint-functional domain/evaluation-map contract is now explicit, but no
realization is supplied. The packet declares the domain chart and evaluation
map objects required for all four \`fc_*\` endpoint functionals, while keeping
all row-consumption and branch-chart locks closed.

| Quantity | Value |
| --- | ---: |
| Endpoint functionals | ${contract.summary.endpoint_functionals} |
| Endpoint contracts declared | ${contract.summary.endpoint_contracts_declared} |
| Endpoint realizations supplied | ${contract.summary.endpoint_realizations_supplied} |
| Domain charts realized | ${contract.summary.domain_charts_realized} |
| Evaluation maps realized | ${contract.summary.evaluation_maps_realized} |
| Endpoint motion rules realized | ${contract.summary.endpoint_motion_rules_realized} |
| Exact $B\\xi=0$ certificates realized | ${contract.summary.exact_screen_zero_certificates_realized} |
| Rank certificates realized | ${contract.summary.rank_certificates_realized} |
| Contract-ready rows | ${contract.summary.contract_ready_rows} |
| Row consumption count | ${contract.summary.row_consumption_count} |

## Contract Rule

${contract.contract_rule}

${contract.no_go_lemma}

${contract.no_promotion_rule}

## Endpoint Contracts

| Variable | Functional | Contract declared | Realization fields present | Realization supplied | Target equation |
| --- | --- | --- | ---: | --- | --- |
${endpointContractTable(contract.endpoint_domain_evaluation_contracts)}

## Contract Declaration Audit

| Field | Endpoint contracts declared |
| --- | ---: |
${fieldTable(
  contract.summary.endpoint_contract_declaration_counts,
  ENDPOINT_CONTRACT_DECLARATION_FIELDS,
  contract.summary.endpoint_functionals
)}

## Endpoint Required-Field Audit

| Field | Endpoint contracts certified |
| --- | ---: |
${fieldTable(
  contract.summary.endpoint_required_field_counts,
  ENDPOINT_AUDIT_FIELDS,
  contract.summary.endpoint_functionals
)}

## Realization-Field Audit

| Field | Endpoint realizations present |
| --- | ---: |
${fieldTable(
  contract.summary.endpoint_realization_field_counts,
  ENDPOINT_DOMAIN_EVALUATION_REALIZATION_FIELDS,
  contract.summary.endpoint_functionals
)}

## Row Contracts

| Row | Locator | Source contract | Receiver contract | Domain/evaluation pair constructed | Signed delta contract | Ready |
| --- | --- | --- | --- | --- | --- | --- |
${rowContractTable(contract.row_domain_evaluation_contracts)}

## Row-Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(contract.summary.row_contract_field_counts, ROW_CONTRACT_FIELDS, contract.summary.rows)}

## Closure Burden

The immediate proof object is no longer a locator, binding-label, or target
equation audit. A constructive successor must provide the same-packet
$\\Psi_j$ formulas and the domain/evaluation-map realization for every
\`fc_*\` endpoint functional, then emit candidate artifacts, recertify root
topology, and rerun proof-interval v1-v6 in the candidate namespace before any
one-leaf row can be consumed.

## Capture Decision

Priority-only theorem/generator contract. This packet is useful because it
fixes the exact mathematical object required next. It is not ready for authored
AAA prose because it defines a burden rather than proving a branch certificate.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputs = {
    domainEvaluationAttempt: readJson(args.domainEvaluationAttempt),
    bindingContract: readJson(args.bindingContract),
    historyContract: readJson(args.historyContract),
  };
  const sources = {
    domainEvaluationAttempt: args.domainEvaluationAttempt,
    bindingContract: args.bindingContract,
    historyContract: args.historyContract,
  };
  const contract = buildDomainEvaluationContract(inputs, sources);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, contract, args.pretty);
  writeText(outReport, buildReport(contract));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
