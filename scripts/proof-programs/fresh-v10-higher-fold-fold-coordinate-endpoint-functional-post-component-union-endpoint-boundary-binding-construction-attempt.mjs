#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ENDPOINT_SOURCE_AUDIT = `${CERT_DIR}/fold_coordinate_endpoint_functional_source_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BINDING_NO_GO = `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_contract_no_go.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_HISTORY_CONTRACT = `${CERT_DIR}/fold_coordinate_history_realization_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_HISTORY_THEOREM_ATTEMPT = `${CERT_DIR}/fold_coordinate_history_realization_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_DOMAIN_EVALUATION_CONTRACT = `${CERT_DIR}/fold_coordinate_endpoint_functional_domain_evaluation_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE = `${CERT_DIR}/fold_coordinate_endpoint_functional_component_union_chart_certificate.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_POST_COMPONENT_UNION_LAYER = `${CERT_DIR}/fold_coordinate_endpoint_functional_post_component_union_endpoint_motion_full_evaluation_map_layer_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BOUNDARY_BINDING_SOURCE_DATA_AUDIT = `${CERT_DIR}/fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_CONSTRUCTION_FIELDS = [
  "source_audit_imported",
  "binding_no_go_imported",
  "history_realization_contract_imported",
  "history_realization_theorem_attempt_imported",
  "domain_evaluation_contract_imported",
  "component_union_chart_certificate_imported",
  "post_component_union_layer_imported",
  "boundary_binding_source_data_audit_imported",
  "endpoint_boundary_binding_source_data_ready",
  "endpoint_boundary_action_declared",
  "boundary_delta_sign_consistent",
  "target_endpoint_ref_declared",
  "target_endpoint_value_present",
  "component_union_domain_constructed",
  "target_endpoint_evaluation_locator_constructed",
  "evaluation_map_symbol_declared",
  "endpoint_evaluation_rule_declared",
  "endpoint_functional_domain_present",
  "domain_chart_declared",
  "domain_coordinate_rule_declared",
  "basis_vector_bound_to_domain",
  "endpoint_boundary_binding_constructed",
  "endpoint_value_bound_to_boundary_binding",
  "same_packet_history_update_formula_present",
  "theta_support_present",
  "basis_formula_present",
  "basis_derivative_formula_present",
  "x_update_basis_present",
  "xdot_update_basis_present",
  "mesh_update_rule_present",
  "endpoint_motion_rule_constructed",
  "source_monotonicity_rule_present",
  "receiver_monotonicity_rule_present",
  "periodic_extension_rule_present",
  "c1_gluing_rule_present",
  "endpoint_evaluation_rule_constructed",
  "endpoint_value_bound_to_evaluation_map",
  "endpoint_evaluation_map_constructed",
  "target_action_exact_under_endpoint_evaluation_map",
  "non_target_endpoint_actions_enumerated",
  "full_endpoint_evaluation_map_constructed",
  "global_domain_evaluation_map_constructed",
  "non_target_endpoint_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "binding_contract_satisfied",
  "boundary_binding_construction_passed",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
];

const ROW_CONSTRUCTION_FIELDS = [
  "row_locator_resolved",
  "row_boundary_binding_source_data_ready",
  "source_boundary_ref_declared",
  "receiver_boundary_ref_declared",
  "source_boundary_value_present",
  "receiver_boundary_value_present",
  "source_boundary_delta_contract_defined",
  "receiver_boundary_delta_contract_defined",
  "combined_component_union_chart_pair_constructed",
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "combined_boundary_binding_pair_constructed",
  "same_packet_history_update_formula_present",
  "proof_grade_boundary_opening_certified",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "source_data_as_endpoint_boundary_binding",
    description: "Try to promote verified endpoint source data into a constructed endpoint boundary binding.",
    required_fields: [
      "endpoint_boundary_binding_source_data_ready",
      "endpoint_functional_domain_present",
      "domain_chart_declared",
      "domain_coordinate_rule_declared",
      "basis_vector_bound_to_domain",
      "endpoint_boundary_binding_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "binding_contract_satisfied",
    ],
  },
  {
    method_id: "declared_domain_contract_as_boundary_binding",
    description: "Try to promote the declared endpoint-functional domain contract into an actual boundary binding.",
    required_fields: [
      "endpoint_functional_domain_present",
      "domain_chart_declared",
      "domain_coordinate_rule_declared",
      "basis_vector_bound_to_domain",
      "endpoint_boundary_binding_constructed",
    ],
  },
  {
    method_id: "component_locator_as_boundary_binding",
    description: "Try to promote the component-union target locator into a boundary binding.",
    required_fields: [
      "component_union_domain_constructed",
      "target_endpoint_evaluation_locator_constructed",
      "endpoint_boundary_binding_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "same_packet_history_update_formula_present",
      "endpoint_motion_rule_constructed",
    ],
  },
  {
    method_id: "signed_boundary_delta_as_endpoint_motion",
    description: "Try to promote the signed boundary-delta contract into a same-packet endpoint motion rule.",
    required_fields: [
      "endpoint_boundary_action_declared",
      "boundary_delta_sign_consistent",
      "same_packet_history_update_formula_present",
      "theta_support_present",
      "basis_formula_present",
      "basis_derivative_formula_present",
      "x_update_basis_present",
      "xdot_update_basis_present",
      "mesh_update_rule_present",
      "source_monotonicity_rule_present",
      "receiver_monotonicity_rule_present",
      "periodic_extension_rule_present",
      "c1_gluing_rule_present",
      "endpoint_motion_rule_constructed",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    endpointSourceAudit: DEFAULT_ENDPOINT_SOURCE_AUDIT,
    bindingNoGo: DEFAULT_BINDING_NO_GO,
    historyContract: DEFAULT_HISTORY_CONTRACT,
    historyTheoremAttempt: DEFAULT_HISTORY_THEOREM_ATTEMPT,
    domainEvaluationContract: DEFAULT_DOMAIN_EVALUATION_CONTRACT,
    componentUnionChartCertificate: DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE,
    postComponentUnionLayer: DEFAULT_POST_COMPONENT_UNION_LAYER,
    boundaryBindingSourceDataAudit: DEFAULT_BOUNDARY_BINDING_SOURCE_DATA_AUDIT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--endpoint-source-audit") {
      args.endpointSourceAudit = argv[++index];
    } else if (arg === "--binding-no-go") {
      args.bindingNoGo = argv[++index];
    } else if (arg === "--history-contract") {
      args.historyContract = argv[++index];
    } else if (arg === "--history-theorem-attempt") {
      args.historyTheoremAttempt = argv[++index];
    } else if (arg === "--domain-evaluation-contract") {
      args.domainEvaluationContract = argv[++index];
    } else if (arg === "--component-union-chart-certificate") {
      args.componentUnionChartCertificate = argv[++index];
    } else if (arg === "--post-component-union-layer") {
      args.postComponentUnionLayer = argv[++index];
    } else if (arg === "--boundary-binding-source-data-audit") {
      args.boundaryBindingSourceDataAudit = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-post-component-union-endpoint-boundary-binding-construction-attempt.mjs [options]

Options:
  --endpoint-source-audit PATH              Endpoint-functional source audit JSON. Defaults to ${DEFAULT_ENDPOINT_SOURCE_AUDIT}.
  --binding-no-go PATH                      Endpoint-functional binding no-go JSON. Defaults to ${DEFAULT_BINDING_NO_GO}.
  --history-contract PATH                   Fold-coordinate history-realization contract JSON. Defaults to ${DEFAULT_HISTORY_CONTRACT}.
  --history-theorem-attempt PATH            Fold-coordinate history-realization theorem attempt JSON. Defaults to ${DEFAULT_HISTORY_THEOREM_ATTEMPT}.
  --domain-evaluation-contract PATH         Endpoint-functional domain/evaluation contract JSON. Defaults to ${DEFAULT_DOMAIN_EVALUATION_CONTRACT}.
  --component-union-chart-certificate PATH  Component-union chart certificate JSON. Defaults to ${DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE}.
  --post-component-union-layer PATH         Post-component-union endpoint-motion full evaluation-map layer JSON. Defaults to ${DEFAULT_POST_COMPONENT_UNION_LAYER}.
  --boundary-binding-source-data-audit PATH Boundary-binding source-data audit JSON. Defaults to ${DEFAULT_BOUNDARY_BINDING_SOURCE_DATA_AUDIT}.
  --out-dir PATH                            Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                  Pretty-print JSON artifact.
  --help                                    Show this help.`);
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

function byId(rows, key = "id") {
  return new Map((rows ?? []).map((row) => [row[key], row]));
}

function byRowId(rows) {
  return new Map((rows ?? []).map((row) => [row.row_id, row]));
}

function countFields(rows, fields, key = "required_fields_present") {
  return Object.fromEntries(
    fields.map((field) => [field, rows.filter((row) => row[key]?.[field] === true).length])
  );
}

function countBy(values) {
  return values.reduce((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});
}

function assertSamePacketSource(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id && source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected ${name} fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error(`Refusing to build boundary-binding construction attempt from authorized ${name}.`);
  }
}

function assertInputs(inputs) {
  assertSamePacketSource(inputs.endpointSourceAudit, "endpoint source audit");
  assertSamePacketSource(inputs.bindingNoGo, "binding no-go");
  assertSamePacketSource(inputs.historyContract, "history contract");
  assertSamePacketSource(inputs.historyTheoremAttempt, "history theorem attempt");
  assertSamePacketSource(inputs.domainEvaluationContract, "domain/evaluation contract");
  assertSamePacketSource(inputs.componentUnionChartCertificate, "component-union chart certificate");
  assertSamePacketSource(inputs.postComponentUnionLayer, "post-component-union layer attempt");
  assertSamePacketSource(inputs.boundaryBindingSourceDataAudit, "boundary-binding source-data audit");
  const expectedStatuses = {
    endpointSourceAudit: "fold_coordinate_endpoint_functional_source_audit_fail_closed",
    bindingNoGo: "fold_coordinate_endpoint_functional_binding_contract_no_go_fail_closed",
    historyContract: "fold_coordinate_history_realization_contract_defined_realization_absent",
    historyTheoremAttempt: "fold_coordinate_history_realization_theorem_attempt_fail_closed",
    domainEvaluationContract:
      "fold_coordinate_endpoint_functional_domain_evaluation_map_contract_defined_domain_evaluation_map_absent",
    componentUnionChartCertificate:
      "fold_coordinate_endpoint_functional_component_union_chart_certificate_partial_pass_replay_blocked",
    postComponentUnionLayer:
      "fold_coordinate_endpoint_functional_post_component_union_endpoint_motion_full_evaluation_map_layer_attempt_fail_closed",
    boundaryBindingSourceDataAudit:
      "fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit_source_data_present_binding_absent",
  };
  for (const [name, expectedStatus] of Object.entries(expectedStatuses)) {
    if (inputs[name].status !== expectedStatus) {
      throw new Error(`Unexpected ${name} status: ${inputs[name].status}`);
    }
  }
  if (
    !Array.isArray(inputs.boundaryBindingSourceDataAudit.endpoint_boundary_binding_source_data_audits) ||
    inputs.boundaryBindingSourceDataAudit.endpoint_boundary_binding_source_data_audits.length !== 4
  ) {
    throw new Error("Expected exactly 4 endpoint boundary-binding source-data audits.");
  }
  if (
    !Array.isArray(inputs.boundaryBindingSourceDataAudit.row_boundary_binding_source_data_audits) ||
    inputs.boundaryBindingSourceDataAudit.row_boundary_binding_source_data_audits.length !== 3
  ) {
    throw new Error("Expected exactly 3 row boundary-binding source-data audits.");
  }
}

function anyTrue(...values) {
  return values.some((value) => value === true);
}

function methodResults(fields) {
  return CONSTRUCTION_METHODS.map((method) => {
    const missingFields = method.required_fields.filter((field) => fields[field] !== true);
    return {
      method_id: method.method_id,
      description: method.description,
      required_fields: method.required_fields,
      missing_fields: missingFields,
      failure_codes: missingFields.map((field) => `missing_endpoint_boundary_binding_${field}`),
      passed: missingFields.length === 0,
    };
  });
}

function buildEndpointConstructionAttempt(sourceDataAudit, context) {
  const endpointSource = context.endpointSourceById.get(sourceDataAudit.id);
  const bindingNoGo = context.bindingNoGoById.get(sourceDataAudit.id);
  const historyVariable = context.historyVariableById.get(sourceDataAudit.id);
  const theoremVariable = context.theoremVariableById.get(sourceDataAudit.id);
  const domainContract = context.domainContractById.get(sourceDataAudit.id);
  const componentUnion = context.componentUnionById.get(sourceDataAudit.id);
  const postLayer = context.postLayerById.get(sourceDataAudit.id);
  const sourceFields = endpointSource?.required_fields_present ?? {};
  const sourceDataFields = sourceDataAudit.required_fields_present ?? {};
  const bindingFields = bindingNoGo?.required_fields_present ?? {};
  const theoremFields = theoremVariable?.required_fields_present ?? {};
  const domainFields = domainContract?.required_fields_present ?? {};
  const domainDeclarationFields = domainContract?.contract_declaration_fields_present ?? {};
  const componentFields = componentUnion?.required_fields_present ?? {};
  const postFields = postLayer?.required_fields_present ?? {};
  const fields = {
    source_audit_imported: Boolean(endpointSource),
    binding_no_go_imported: Boolean(bindingNoGo),
    history_realization_contract_imported: Boolean(historyVariable),
    history_realization_theorem_attempt_imported: Boolean(theoremVariable),
    domain_evaluation_contract_imported: Boolean(domainContract),
    component_union_chart_certificate_imported: Boolean(componentUnion),
    post_component_union_layer_imported: Boolean(postLayer),
    boundary_binding_source_data_audit_imported: true,
    endpoint_boundary_binding_source_data_ready:
      sourceDataFields.endpoint_boundary_binding_source_data_ready === true,
    endpoint_boundary_action_declared: anyTrue(
      sourceFields.endpoint_boundary_action_declared,
      sourceDataFields.endpoint_boundary_action_declared
    ),
    boundary_delta_sign_consistent: anyTrue(
      sourceFields.boundary_delta_sign_consistent,
      sourceDataFields.boundary_delta_sign_consistent
    ),
    target_endpoint_ref_declared: anyTrue(
      sourceFields.target_endpoint_ref_declared,
      sourceDataFields.target_endpoint_ref_declared
    ),
    target_endpoint_value_present: anyTrue(
      sourceFields.target_endpoint_value_present,
      sourceDataFields.target_endpoint_value_present
    ),
    component_union_domain_constructed: anyTrue(
      sourceDataFields.component_union_domain_constructed,
      componentFields.component_union_domain_constructed,
      postFields.component_union_domain_constructed
    ),
    target_endpoint_evaluation_locator_constructed: anyTrue(
      sourceDataFields.target_endpoint_evaluation_locator_constructed,
      componentFields.target_endpoint_evaluation_locator_constructed,
      postFields.target_endpoint_evaluation_locator_constructed
    ),
    evaluation_map_symbol_declared: anyTrue(
      sourceDataFields.evaluation_map_symbol_declared,
      componentFields.evaluation_map_symbol_declared,
      postFields.evaluation_map_symbol_declared,
      domainDeclarationFields.evaluation_map_symbol_declared
    ),
    endpoint_evaluation_rule_declared: anyTrue(
      sourceDataFields.endpoint_evaluation_rule_declared,
      postFields.endpoint_evaluation_rule_declared,
      domainDeclarationFields.endpoint_evaluation_rule_declared
    ),
    endpoint_functional_domain_present: anyTrue(
      sourceFields.endpoint_functional_domain_present,
      bindingFields.endpoint_functional_domain_present,
      domainFields.endpoint_functional_domain_present
    ),
    domain_chart_declared: anyTrue(bindingFields.domain_chart_declared, domainFields.domain_chart_declared),
    domain_coordinate_rule_declared: domainFields.domain_coordinate_rule_declared === true,
    basis_vector_bound_to_domain: domainFields.basis_vector_bound_to_domain === true,
    endpoint_boundary_binding_constructed: anyTrue(
      sourceDataFields.endpoint_boundary_binding_constructed,
      sourceFields.endpoint_boundary_binding_present,
      bindingFields.endpoint_boundary_binding_present,
      domainFields.endpoint_boundary_binding_present,
      postFields.endpoint_boundary_binding_constructed
    ),
    endpoint_value_bound_to_boundary_binding: anyTrue(
      bindingFields.endpoint_value_bound_to_domain,
      domainFields.endpoint_value_bound_to_evaluation_map,
      postFields.endpoint_value_bound_to_evaluation_map
    ),
    same_packet_history_update_formula_present: anyTrue(
      sourceDataFields.same_packet_history_update_formula_present,
      sourceFields.same_packet_history_update_formula_present,
      theoremFields.same_packet_history_update_formula_present,
      domainFields.same_packet_history_update_formula_present,
      postFields.same_packet_history_update_formula_present
    ),
    theta_support_present: anyTrue(
      sourceFields.theta_support_present,
      bindingFields.theta_support_present,
      theoremFields.theta_support_present,
      domainFields.theta_support_present
    ),
    basis_formula_present: anyTrue(
      sourceFields.basis_formula_present,
      bindingFields.basis_formula_present,
      domainFields.basis_formula_present
    ),
    basis_derivative_formula_present: anyTrue(
      sourceFields.basis_derivative_formula_present,
      bindingFields.basis_derivative_formula_present,
      domainFields.basis_derivative_formula_present
    ),
    x_update_basis_present: anyTrue(
      sourceFields.x_update_basis_present,
      bindingFields.x_update_basis_present,
      theoremFields.x_update_basis_present,
      domainFields.x_update_basis_present
    ),
    xdot_update_basis_present: anyTrue(
      sourceFields.xdot_update_basis_present,
      bindingFields.xdot_update_basis_present,
      theoremFields.xdot_update_basis_present,
      domainFields.xdot_update_basis_present
    ),
    mesh_update_rule_present: anyTrue(
      sourceFields.mesh_update_rule_present,
      bindingFields.mesh_update_rule_present,
      theoremFields.mesh_update_rule_present,
      domainFields.mesh_update_rule_present
    ),
    endpoint_motion_rule_constructed: anyTrue(
      sourceDataFields.endpoint_motion_rule_constructed,
      sourceFields.endpoint_motion_rule_present,
      bindingFields.endpoint_motion_rule_present,
      theoremFields.endpoint_motion_rule_present,
      domainFields.endpoint_motion_rule_present,
      postFields.endpoint_motion_rule_constructed
    ),
    source_monotonicity_rule_present: anyTrue(
      sourceFields.source_monotonicity_rule_present,
      bindingFields.source_monotonicity_rule_present,
      theoremFields.source_monotonicity_rule_present,
      domainFields.source_monotonicity_rule_present
    ),
    receiver_monotonicity_rule_present: anyTrue(
      sourceFields.receiver_monotonicity_rule_present,
      bindingFields.receiver_monotonicity_rule_present,
      theoremFields.receiver_monotonicity_rule_present,
      domainFields.receiver_monotonicity_rule_present
    ),
    periodic_extension_rule_present: anyTrue(
      sourceFields.periodic_extension_rule_present,
      bindingFields.periodic_extension_rule_present,
      domainFields.periodic_extension_rule_present
    ),
    c1_gluing_rule_present: anyTrue(
      sourceFields.c1_gluing_rule_present,
      bindingFields.c1_gluing_rule_present,
      domainFields.c1_gluing_rule_present
    ),
    endpoint_evaluation_rule_constructed: postFields.endpoint_evaluation_rule_constructed === true,
    endpoint_value_bound_to_evaluation_map: anyTrue(
      domainFields.endpoint_value_bound_to_evaluation_map,
      postFields.endpoint_value_bound_to_evaluation_map
    ),
    endpoint_evaluation_map_constructed: anyTrue(
      sourceDataFields.endpoint_evaluation_map_constructed,
      domainFields.domain_evaluation_map_constructed,
      postFields.endpoint_evaluation_map_constructed
    ),
    target_action_exact_under_endpoint_evaluation_map:
      postFields.target_action_exact_under_endpoint_evaluation_map === true,
    non_target_endpoint_actions_enumerated:
      postFields.non_target_endpoint_actions_enumerated === true,
    full_endpoint_evaluation_map_constructed: anyTrue(
      sourceDataFields.full_endpoint_evaluation_map_constructed,
      postFields.full_endpoint_evaluation_map_constructed
    ),
    global_domain_evaluation_map_constructed:
      sourceDataFields.global_domain_evaluation_map_constructed === true ||
      componentFields.full_global_domain_evaluation_map_constructed === true ||
      postLayer?.inherited_global_attempt_fields?.global_domain_evaluation_map_constructed === true,
    non_target_endpoint_zero_certified: anyTrue(
      sourceDataFields.non_target_endpoint_zero_certified,
      sourceFields.non_target_endpoint_functionals_zero_certified,
      bindingFields.non_target_endpoint_functionals_zero_certified,
      domainFields.non_target_endpoint_functionals_zero_certified,
      postFields.non_target_endpoint_zero_certified
    ),
    exact_screen_zero_certified: anyTrue(
      sourceDataFields.exact_screen_zero_certified,
      sourceFields.exact_screen_zero_certified,
      bindingFields.exact_screen_zero_certified,
      theoremFields.exact_screen_zero_certified,
      domainFields.exact_screen_zero_certified,
      postFields.exact_screen_zero_certified
    ),
    rank_certified: anyTrue(
      sourceDataFields.rank_certified,
      sourceFields.rank_certified,
      bindingFields.rank_certified,
      theoremFields.rank_certified,
      domainFields.rank_certified,
      postFields.rank_certified
    ),
    binding_contract_satisfied: anyTrue(
      sourceDataFields.binding_contract_satisfied,
      bindingNoGo?.binding_contract_satisfied,
      domainContract?.realization_supplied
    ),
    boundary_binding_construction_passed: false,
    candidate_artifacts_present: anyTrue(sourceDataFields.candidate_artifacts_present, postFields.candidate_artifacts_present),
    root_topology_recertified_for_candidate_change: anyTrue(
      sourceDataFields.root_topology_recertified_for_candidate_change,
      postFields.root_topology_recertified_for_candidate_change
    ),
    proof_interval_v1_v6_rerun_for_candidate_change: anyTrue(
      sourceDataFields.proof_interval_v1_v6_rerun_for_candidate_change,
      postFields.proof_interval_v1_v6_rerun_for_candidate_change
    ),
  };
  const methods = methodResults(fields);
  fields.boundary_binding_construction_passed =
    methods.some((method) => method.passed) &&
    fields.endpoint_boundary_binding_constructed &&
    fields.endpoint_motion_rule_constructed;
  return {
    id: sourceDataAudit.id,
    role: sourceDataAudit.role,
    source_symbol: sourceDataAudit.source_symbol,
    basis_symbol: sourceDataAudit.basis_symbol,
    endpoint_functional_id: sourceDataAudit.endpoint_functional_id,
    target_equation: sourceDataAudit.target_equation,
    target_action: sourceDataAudit.target_action,
    target_sign: sourceDataAudit.target_sign,
    domain_symbol: sourceDataAudit.domain_symbol,
    chart_symbol: sourceDataAudit.chart_symbol,
    evaluation_map_symbol: sourceDataAudit.evaluation_map_symbol,
    support_interval_ids: sourceDataAudit.support_interval_ids,
    target_endpoint_refs: sourceDataAudit.target_endpoint_refs,
    required_fields_present: fields,
    method_results: methods,
    promotion_methods_passed: methods.filter((method) => method.passed).map((method) => method.method_id),
    boundary_binding_construction_passed: fields.boundary_binding_construction_passed,
    endpoint_boundary_binding_constructed: fields.endpoint_boundary_binding_constructed,
    endpoint_motion_rule_constructed: fields.endpoint_motion_rule_constructed,
    obstruction_codes: [
      !fields.endpoint_boundary_binding_constructed ? "endpoint_boundary_binding_absent" : null,
      !fields.same_packet_history_update_formula_present ? "same_packet_history_update_formula_absent" : null,
      !fields.endpoint_motion_rule_constructed ? "endpoint_motion_rule_absent" : null,
      !fields.endpoint_value_bound_to_boundary_binding ? "endpoint_value_bound_to_boundary_binding_absent" : null,
      !fields.exact_screen_zero_certified ? "exact_screen_zero_certificate_absent" : null,
      !fields.rank_certified ? "rank_certificate_absent" : null,
    ].filter(Boolean),
    obstruction:
      "The endpoint has verified source data, component-union locator data, and a declared evaluation rule, but no method constructs an endpoint boundary binding. The packet still lacks a same-packet history update formula, endpoint value binding, endpoint motion rule, exact $B\\xi=0$, rank certificate, candidate artifacts, topology recertification, and proof-interval replay.",
  };
}

function buildRowConstructionAttempt(rowSourceDataAudit, context, endpointById) {
  const rowSource = context.rowSourceById.get(rowSourceDataAudit.row_id);
  const historyRow = context.historyRowById.get(rowSourceDataAudit.row_id);
  const theoremRow = context.theoremRowById.get(rowSourceDataAudit.row_id);
  const domainRow = context.domainRowById.get(rowSourceDataAudit.row_id);
  const componentUnionRow = context.componentUnionRowById.get(rowSourceDataAudit.row_id);
  const postRow = context.postRowById.get(rowSourceDataAudit.row_id);
  const sourceDataFields = rowSourceDataAudit.required_fields_present ?? {};
  const rowFields = rowSource?.required_fields_present ?? {};
  const theoremFields = theoremRow?.required_fields_present ?? {};
  const domainFields = domainRow?.required_fields_present ?? {};
  const componentUnionFields = componentUnionRow?.required_fields_present ?? {};
  const postFields = postRow?.required_fields_present ?? {};
  const sourceEndpoint = endpointById.get(rowSourceDataAudit.source_variable);
  const receiverEndpoint = endpointById.get(rowSourceDataAudit.receiver_variable);
  const fields = {
    row_locator_resolved: anyTrue(
      sourceDataFields.row_locator_resolved,
      rowFields.one_leaf_row_present,
      domainFields.row_locator_resolved,
      componentUnionFields.row_locator_resolved,
      postFields.row_locator_resolved
    ),
    row_boundary_binding_source_data_ready: sourceDataFields.row_boundary_binding_source_data_ready === true,
    source_boundary_ref_declared: anyTrue(sourceDataFields.source_boundary_ref_declared, rowFields.source_boundary_ref_declared),
    receiver_boundary_ref_declared: anyTrue(
      sourceDataFields.receiver_boundary_ref_declared,
      rowFields.receiver_boundary_ref_declared
    ),
    source_boundary_value_present: anyTrue(
      sourceDataFields.source_boundary_value_present,
      rowFields.source_boundary_value_present
    ),
    receiver_boundary_value_present: anyTrue(
      sourceDataFields.receiver_boundary_value_present,
      rowFields.receiver_boundary_value_present
    ),
    source_boundary_delta_contract_defined: anyTrue(
      sourceDataFields.source_boundary_delta_contract_defined,
      Boolean(historyRow?.source_boundary_delta?.contract)
    ),
    receiver_boundary_delta_contract_defined: anyTrue(
      sourceDataFields.receiver_boundary_delta_contract_defined,
      Boolean(historyRow?.receiver_boundary_delta?.contract)
    ),
    combined_component_union_chart_pair_constructed: anyTrue(
      sourceDataFields.combined_component_union_chart_pair_constructed,
      componentUnionFields.combined_component_union_chart_pair_constructed,
      postFields.combined_component_union_chart_pair_constructed
    ),
    source_endpoint_boundary_binding_constructed:
      sourceEndpoint?.required_fields_present.endpoint_boundary_binding_constructed === true,
    receiver_endpoint_boundary_binding_constructed:
      receiverEndpoint?.required_fields_present.endpoint_boundary_binding_constructed === true,
    source_endpoint_motion_rule_constructed:
      sourceEndpoint?.required_fields_present.endpoint_motion_rule_constructed === true ||
      postFields.source_endpoint_motion_rule_constructed === true,
    receiver_endpoint_motion_rule_constructed:
      receiverEndpoint?.required_fields_present.endpoint_motion_rule_constructed === true ||
      postFields.receiver_endpoint_motion_rule_constructed === true,
    combined_boundary_binding_pair_constructed: false,
    same_packet_history_update_formula_present: anyTrue(
      sourceDataFields.same_packet_history_update_formula_present,
      theoremFields.same_packet_candidate_change_data_present,
      domainFields.same_packet_history_update_formula_present,
      postFields.same_packet_history_update_formula_present
    ),
    proof_grade_boundary_opening_certified: anyTrue(
      sourceDataFields.proof_grade_boundary_opening_certified,
      theoremFields.strict_combined_boundary_opening_proof_grade,
      domainFields.proof_grade_boundary_opening_certified,
      postFields.proof_grade_boundary_opening_certified
    ),
    candidate_artifacts_present: anyTrue(sourceDataFields.candidate_artifacts_present, postFields.candidate_artifacts_present),
    root_topology_recertified_for_candidate_change: anyTrue(
      sourceDataFields.root_topology_recertified_for_candidate_change,
      postFields.root_topology_recertified_for_candidate_change
    ),
    proof_interval_v1_v6_rerun_for_candidate_change: anyTrue(
      sourceDataFields.proof_interval_v1_v6_rerun_for_candidate_change,
      postFields.proof_interval_v1_v6_rerun_for_candidate_change
    ),
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_boundary_binding_pair_constructed =
    fields.source_endpoint_boundary_binding_constructed &&
    fields.receiver_endpoint_boundary_binding_constructed &&
    fields.source_endpoint_motion_rule_constructed &&
    fields.receiver_endpoint_motion_rule_constructed;
  return {
    row_id: rowSourceDataAudit.row_id,
    source_interval: rowSourceDataAudit.source_interval,
    receiver_interval: rowSourceDataAudit.receiver_interval,
    failed_side: rowSourceDataAudit.failed_side,
    boundary_side: rowSourceDataAudit.boundary_side,
    source_variable: rowSourceDataAudit.source_variable,
    receiver_variable: rowSourceDataAudit.receiver_variable,
    source_boundary_ref: rowSourceDataAudit.source_boundary_ref,
    receiver_boundary_ref: rowSourceDataAudit.receiver_boundary_ref,
    source_boundary_value: rowSourceDataAudit.source_boundary_value,
    receiver_boundary_value: rowSourceDataAudit.receiver_boundary_value,
    required_fields_present: fields,
    row_ready: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has verified boundary refs, boundary values, signed boundary-delta contracts, and chart pairs, but its source and receiver endpoints do not have boundary bindings or endpoint motion rules. No proof-grade boundary opening, candidate artifacts, topology recertification, replay, row consumption, or branch authorization follows.",
  };
}

function buildAttempt(inputs, sources) {
  assertInputs(inputs);
  const context = {
    endpointSourceById: byId(inputs.endpointSourceAudit.variable_sources),
    bindingNoGoById: byId(inputs.bindingNoGo.endpoint_binding_attempts),
    historyVariableById: byId(inputs.historyContract.realization_variables),
    theoremVariableById: byId(inputs.historyTheoremAttempt.variable_attempts),
    domainContractById: byId(inputs.domainEvaluationContract.endpoint_domain_evaluation_contracts),
    componentUnionById: byId(inputs.componentUnionChartCertificate.endpoint_component_union_chart_certificates),
    postLayerById: byId(inputs.postComponentUnionLayer.endpoint_motion_evaluation_layer_attempts),
    rowSourceById: byRowId(inputs.endpointSourceAudit.row_sources),
    historyRowById: byRowId(inputs.historyContract.rows),
    theoremRowById: byRowId(inputs.historyTheoremAttempt.row_attempts),
    domainRowById: byRowId(inputs.domainEvaluationContract.row_domain_evaluation_contracts),
    componentUnionRowById: byRowId(inputs.componentUnionChartCertificate.row_component_union_chart_certificates),
    postRowById: byRowId(inputs.postComponentUnionLayer.row_motion_evaluation_layer_attempts),
  };
  const endpointAttempts =
    inputs.boundaryBindingSourceDataAudit.endpoint_boundary_binding_source_data_audits.map((sourceDataAudit) =>
      buildEndpointConstructionAttempt(sourceDataAudit, context)
    );
  const endpointById = byId(endpointAttempts);
  const rowAttempts =
    inputs.boundaryBindingSourceDataAudit.row_boundary_binding_source_data_audits.map((rowSourceDataAudit) =>
      buildRowConstructionAttempt(rowSourceDataAudit, context, endpointById)
    );
  const endpointCounts = countFields(endpointAttempts, ENDPOINT_CONSTRUCTION_FIELDS);
  const rowCounts = countFields(rowAttempts, ROW_CONSTRUCTION_FIELDS);
  const failureCodeCounts = countBy(endpointAttempts.flatMap((attempt) => attempt.method_results.flatMap((method) => method.failure_codes)));
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-post-component-union-endpoint-boundary-binding-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt_fail_closed",
    theorem_target:
      "Fold-Coordinate Endpoint-Functional Post-Component-Union Endpoint Boundary Binding Construction Attempt",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only endpoint boundary binding construction attempt; source data are ready, but endpoint boundary bindings and endpoint motion rules are absent",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_artifacts: {
      endpointSourceAudit: artifactRecord(sources.endpointSourceAudit),
      bindingNoGo: artifactRecord(sources.bindingNoGo),
      historyContract: artifactRecord(sources.historyContract),
      historyTheoremAttempt: artifactRecord(sources.historyTheoremAttempt),
      domainEvaluationContract: artifactRecord(sources.domainEvaluationContract),
      componentUnionChartCertificate: artifactRecord(sources.componentUnionChartCertificate),
      postComponentUnionLayer: artifactRecord(sources.postComponentUnionLayer),
      boundaryBindingSourceDataAudit: artifactRecord(sources.boundaryBindingSourceDataAudit),
    },
    construction_rule:
      "A constructed endpoint boundary binding must supply an endpoint-functional domain and chart, a value binding for the target endpoint, a same-packet history update formula, and an endpoint motion rule. Verified source data, signed boundary-delta contracts, component-union locators, and declared evaluation rules are necessary inputs but not sufficient construction data.",
    no_promotion_rule:
      "Do not promote source-data readiness, row-local endpoint values, signed boundary-delta contracts, component-union target locators, or declared endpoint evaluation rules into endpoint boundary bindings or endpoint motion rules.",
    construction_methods: CONSTRUCTION_METHODS,
    endpoint_boundary_binding_construction_attempts: endpointAttempts,
    row_boundary_binding_construction_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      rows: rowAttempts.length,
      endpoint_boundary_binding_source_data_ready:
        endpointCounts.endpoint_boundary_binding_source_data_ready,
      rows_with_boundary_binding_source_data_ready:
        rowCounts.row_boundary_binding_source_data_ready,
      endpoint_boundary_bindings_constructed:
        endpointCounts.endpoint_boundary_binding_constructed,
      endpoint_values_bound_to_boundary_binding:
        endpointCounts.endpoint_value_bound_to_boundary_binding,
      same_packet_history_update_formulas_present:
        endpointCounts.same_packet_history_update_formula_present,
      theta_supports_present: endpointCounts.theta_support_present,
      basis_formulas_present: endpointCounts.basis_formula_present,
      basis_derivative_formulas_present:
        endpointCounts.basis_derivative_formula_present,
      x_update_bases_present: endpointCounts.x_update_basis_present,
      xdot_update_bases_present: endpointCounts.xdot_update_basis_present,
      mesh_update_rules_present: endpointCounts.mesh_update_rule_present,
      endpoint_motion_rules_constructed: endpointCounts.endpoint_motion_rule_constructed,
      endpoint_evaluation_rules_constructed:
        endpointCounts.endpoint_evaluation_rule_constructed,
      endpoint_values_bound_to_evaluation_map:
        endpointCounts.endpoint_value_bound_to_evaluation_map,
      endpoint_evaluation_maps_constructed:
        endpointCounts.endpoint_evaluation_map_constructed,
      target_actions_exact_under_endpoint_evaluation_map:
        endpointCounts.target_action_exact_under_endpoint_evaluation_map,
      non_target_endpoint_actions_enumerated:
        endpointCounts.non_target_endpoint_actions_enumerated,
      full_endpoint_evaluation_maps_constructed:
        endpointCounts.full_endpoint_evaluation_map_constructed,
      global_domain_evaluation_maps_constructed:
        endpointCounts.global_domain_evaluation_map_constructed,
      non_target_zero_certificates:
        endpointCounts.non_target_endpoint_zero_certified,
      exact_screen_zero_certificates: endpointCounts.exact_screen_zero_certified,
      rank_certificates: endpointCounts.rank_certified,
      binding_contracts_satisfied: endpointCounts.binding_contract_satisfied,
      boundary_binding_construction_passed:
        endpointCounts.boundary_binding_construction_passed,
      candidate_artifacts_present: endpointCounts.candidate_artifacts_present,
      topology_recertifications:
        endpointCounts.root_topology_recertified_for_candidate_change,
      proof_interval_v1_v6_replays:
        endpointCounts.proof_interval_v1_v6_rerun_for_candidate_change,
      rows_with_boundary_refs_and_values:
        rowAttempts.filter(
          (row) =>
            row.required_fields_present.source_boundary_ref_declared &&
            row.required_fields_present.receiver_boundary_ref_declared &&
            row.required_fields_present.source_boundary_value_present &&
            row.required_fields_present.receiver_boundary_value_present
        ).length,
      rows_with_boundary_binding_pairs:
        rowCounts.combined_boundary_binding_pair_constructed,
      proof_grade_boundary_opening_rows:
        rowCounts.proof_grade_boundary_opening_certified,
      row_ready_count: rowAttempts.filter((row) => row.row_ready).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      construction_method_pass_counts: Object.fromEntries(
        CONSTRUCTION_METHODS.map((method) => [
          method.method_id,
          endpointAttempts.filter((attempt) =>
            attempt.method_results.some((result) => result.method_id === method.method_id && result.passed)
          ).length,
        ])
      ),
      construction_failure_code_counts: failureCodeCounts,
      endpoint_required_fields_certified_counts: endpointCounts,
      row_required_fields_certified_counts: rowCounts,
    },
  };
}

function artifactTable(artifacts) {
  return Object.entries(artifacts)
    .map(
      ([name, artifact]) =>
        `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present} | \`${artifact.sha256}\` |`
    )
    .join("\n");
}

function methodTable(methods, passCounts) {
  return methods
    .map((method) => `| \`${method.method_id}\` | ${passCounts[method.method_id]} / 4 | ${method.description} |`)
    .join("\n");
}

function endpointTable(attempts) {
  return attempts
    .map(
      (attempt) =>
        `| \`${attempt.id}\` | ${attempt.required_fields_present.endpoint_boundary_binding_source_data_ready} | ${attempt.required_fields_present.endpoint_boundary_binding_constructed} | ${attempt.required_fields_present.same_packet_history_update_formula_present} | ${attempt.required_fields_present.endpoint_motion_rule_constructed} | ${attempt.required_fields_present.exact_screen_zero_certified} | ${attempt.required_fields_present.rank_certified} | ${attempt.boundary_binding_construction_passed} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | ${row.required_fields_present.row_boundary_binding_source_data_ready} | ${row.required_fields_present.source_endpoint_boundary_binding_constructed} | ${row.required_fields_present.receiver_endpoint_boundary_binding_constructed} | ${row.required_fields_present.source_endpoint_motion_rule_constructed} | ${row.required_fields_present.receiver_endpoint_motion_rule_constructed} | ${row.required_fields_present.combined_boundary_binding_pair_constructed} | ${row.row_consumed} |`
    )
    .join("\n");
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function failureCodeTable(counts) {
  return Object.entries(counts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([code, count]) => `| \`${code}\` | ${count} |`)
    .join("\n");
}

function buildReport(attempt) {
  const endpointTotal = attempt.endpoint_boundary_binding_construction_attempts.length;
  const rowTotal = attempt.row_boundary_binding_construction_attempts.length;
  return `# Higher-Fold Fold-Coordinate Endpoint-Functional Post-Component-Union Endpoint Boundary Binding Construction Attempt

## Verdict

Status: \`${attempt.status}\`.

This priority-only packet attempts the next proof object after the
endpoint-boundary-binding source-data audit: construct endpoint boundary
bindings over the verified source data. It preserves
${attempt.summary.endpoint_boundary_binding_source_data_ready} / ${endpointTotal}
endpoint source-data rows and ${attempt.summary.rows_with_boundary_binding_source_data_ready} / ${rowTotal}
row source-data rows, then tests ${attempt.construction_methods.length}
promotion methods for each endpoint.

The construction attempt fail-closes. It constructs
${attempt.summary.endpoint_boundary_bindings_constructed} / ${endpointTotal}
endpoint boundary bindings, ${attempt.summary.endpoint_values_bound_to_boundary_binding} / ${endpointTotal}
endpoint value bindings, ${attempt.summary.same_packet_history_update_formulas_present} / ${endpointTotal}
same-packet history update formulas, ${attempt.summary.endpoint_motion_rules_constructed} / ${endpointTotal}
endpoint motion rules, ${attempt.summary.endpoint_evaluation_maps_constructed} / ${endpointTotal}
endpoint evaluation maps, ${attempt.summary.full_endpoint_evaluation_maps_constructed} / ${endpointTotal}
full endpoint evaluation maps, ${attempt.summary.global_domain_evaluation_maps_constructed} / ${endpointTotal}
global domain/evaluation maps, ${attempt.summary.non_target_zero_certificates} / ${endpointTotal}
non-target zero certificates, ${attempt.summary.exact_screen_zero_certificates} / ${endpointTotal}
exact $B\\xi=0$ certificates, and ${attempt.summary.rank_certificates} / ${endpointTotal}
rank certificates. It consumes ${attempt.summary.row_consumption_count} rows,
keeps \`preledger_pass=false\`, keeps \`updates_live_ledger=false\`, and leaves
\`branch_chart_authorized=false\`.

## Source Artifacts And Authorization Locks

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${artifactTable(attempt.source_artifacts)}

| Lock | Value |
| --- | ---: |
| \`branch_chart_authorized\` | ${attempt.authorization_lock.branch_chart_authorized} |
| \`preledger_pass\` | ${attempt.authorization_lock.preledger_pass} |
| \`updates_live_ledger\` | ${attempt.authorization_lock.updates_live_ledger} |
| \`row_consumption_count\` | ${attempt.authorization_lock.row_consumption_count} |

## Construction Rule

${attempt.construction_rule}

## No-Promotion Rule

${attempt.no_promotion_rule}

## Construction Methods

| Method | Passed endpoints | Description |
| --- | ---: | --- |
${methodTable(attempt.construction_methods, attempt.summary.construction_method_pass_counts)}

## Endpoint Attempts

| Endpoint variable | Source data ready | Binding | History formula | Motion rule | Exact $B\\xi=0$ | Rank | Construction passed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(attempt.endpoint_boundary_binding_construction_attempts)}

## Row Attempts

| Row | Source data ready | Source binding | Receiver binding | Source motion | Receiver motion | Binding pair | Row consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(attempt.row_boundary_binding_construction_attempts)}

## Endpoint Field Audit

| Field | Certified count |
| --- | ---: |
${fieldTable(attempt.summary.endpoint_required_fields_certified_counts, ENDPOINT_CONSTRUCTION_FIELDS, endpointTotal)}

## Row Field Audit

| Field | Certified count |
| --- | ---: |
${fieldTable(attempt.summary.row_required_fields_certified_counts, ROW_CONSTRUCTION_FIELDS, rowTotal)}

## Failure-Code Audit

| Failure code | Count |
| --- | ---: |
${failureCodeTable(attempt.summary.construction_failure_code_counts)}

## Closure Burden

The next proof object must introduce new same-packet construction data, not
another locator promotion. A passing boundary-binding packet must set, for all
four endpoints, \`endpoint_boundary_binding_constructed=true\`,
\`endpoint_value_bound_to_boundary_binding=true\`,
\`same_packet_history_update_formula_present=true\`, and
\`endpoint_motion_rule_constructed=true\`. Endpoint motion additionally requires
theta support, basis and derivative formulas, $x$ and $\\dot{x}$ update bases,
mesh update rules, source/receiver monotonicity rules, periodic extension, and
$C^1$ gluing where the local formula crosses packet boundaries. A row can become
proof-grade only after both source and receiver endpoints have constructed
boundary bindings and endpoint motion rules, followed by candidate artifacts,
topology recertification, and proof-interval v1-v6 replay.

## Capture Decision

Priority-only. The audit records a mathematical failure of promotion: source
data readiness, signed boundary-delta contracts, component-union locators, and
declared endpoint evaluation rules do not construct endpoint boundary bindings.
The endpoint-functional route can advance only by supplying new same-packet
history-update, endpoint-value binding, endpoint-motion, exact $B\\xi=0$, rank,
candidate, topology, and replay proof data, or by changing the row-closure
geometry. No candidate artifacts, topology recertification, replay, row
consumption, or branch-chart construction is authorized by this attempt.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const sources = {
    endpointSourceAudit: args.endpointSourceAudit,
    bindingNoGo: args.bindingNoGo,
    historyContract: args.historyContract,
    historyTheoremAttempt: args.historyTheoremAttempt,
    domainEvaluationContract: args.domainEvaluationContract,
    componentUnionChartCertificate: args.componentUnionChartCertificate,
    postComponentUnionLayer: args.postComponentUnionLayer,
    boundaryBindingSourceDataAudit: args.boundaryBindingSourceDataAudit,
  };
  const inputs = {
    endpointSourceAudit: readJson(args.endpointSourceAudit),
    bindingNoGo: readJson(args.bindingNoGo),
    historyContract: readJson(args.historyContract),
    historyTheoremAttempt: readJson(args.historyTheoremAttempt),
    domainEvaluationContract: readJson(args.domainEvaluationContract),
    componentUnionChartCertificate: readJson(args.componentUnionChartCertificate),
    postComponentUnionLayer: readJson(args.postComponentUnionLayer),
    boundaryBindingSourceDataAudit: readJson(args.boundaryBindingSourceDataAudit),
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
