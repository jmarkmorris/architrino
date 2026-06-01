#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_EXPLICIT_PSI_FORMULA_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_explicit_psi_formula_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE = `${CERT_DIR}/fold_coordinate_endpoint_functional_component_union_chart_certificate.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BOUNDARY_BINDING_SOURCE_DATA_AUDIT = `${CERT_DIR}/fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BOUNDARY_BINDING_MOTION_EVALUATION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_boundary_binding_motion_evaluation_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_component_union_domain_binding_subcertificate.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_component_union_domain_binding_subcertificate_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_FIELDS = [
  "local_formula_candidate_available",
  "local_derivative_formula_available",
  "component_endpoint_identities_exact",
  "component_union_domain_constructed",
  "component_union_coordinate_rule_constructed",
  "component_union_no_double_counting_rule_constructed",
  "component_formula_bound_to_chart",
  "target_endpoint_evaluation_locator_constructed",
  "target_action_exact_under_component_locator",
  "opposite_endpoint_zero_under_component_locator",
  "endpoint_boundary_binding_source_data_ready",
  "endpoint_boundary_action_declared",
  "boundary_delta_sign_consistent",
  "target_endpoint_ref_declared",
  "target_endpoint_value_present",
  "evaluation_map_symbol_declared",
  "endpoint_evaluation_rule_declared",
  "endpoint_functional_domain_present",
  "domain_chart_declared",
  "domain_coordinate_rule_declared",
  "basis_vector_bound_to_domain",
  "theta_support_present",
  "basis_formula_present",
  "basis_derivative_formula_present",
  "component_domain_binding_subcertificate_constructed",
  "endpoint_boundary_binding_constructed",
  "endpoint_value_bound_to_boundary_binding",
  "binding_contract_satisfied",
  "same_packet_history_update_formula_present",
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
  "non_target_endpoint_zero_certified",
  "full_endpoint_evaluation_map_constructed",
  "global_domain_evaluation_map_constructed",
  "exact_screen_zero_certified",
  "rank_certified",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "component_domain_subcertificate_ready",
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_formula_candidate_declared",
  "receiver_formula_candidate_declared",
  "source_target_action_exact",
  "receiver_target_action_exact",
  "source_component_domain_subcertificate_constructed",
  "receiver_component_domain_subcertificate_constructed",
  "combined_component_domain_pair_constructed",
  "row_boundary_binding_source_data_ready",
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "combined_boundary_binding_pair_constructed",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "source_endpoint_evaluation_map_constructed",
  "receiver_endpoint_evaluation_map_constructed",
  "combined_endpoint_evaluation_map_pair_constructed",
  "same_packet_history_update_formula_present",
  "proof_grade_boundary_opening_certified",
  "residual_data_construction_ready",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
  "component_domain_subcertificate_ready",
];

const REQUIRED_COMPONENT_DOMAIN_FIELDS = [
  "local_formula_candidate_available",
  "local_derivative_formula_available",
  "component_endpoint_identities_exact",
  "component_union_domain_constructed",
  "component_union_coordinate_rule_constructed",
  "component_union_no_double_counting_rule_constructed",
  "component_formula_bound_to_chart",
  "target_endpoint_evaluation_locator_constructed",
  "target_action_exact_under_component_locator",
  "opposite_endpoint_zero_under_component_locator",
  "endpoint_functional_domain_present",
  "domain_chart_declared",
  "domain_coordinate_rule_declared",
  "basis_vector_bound_to_domain",
  "theta_support_present",
  "basis_formula_present",
  "basis_derivative_formula_present",
];

const BLOCKED_ENDPOINT_FIELDS = [
  "endpoint_boundary_binding_constructed",
  "endpoint_value_bound_to_boundary_binding",
  "binding_contract_satisfied",
  "same_packet_history_update_formula_present",
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
  "non_target_endpoint_zero_certified",
  "full_endpoint_evaluation_map_constructed",
  "global_domain_evaluation_map_constructed",
  "exact_screen_zero_certified",
  "rank_certified",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "component_union_chart_as_endpoint_functional_domain",
    description:
      "Promote the certified component-union domain, coordinate rule, and no-double-counting rule into a narrow endpoint-functional domain subcertificate.",
    required_fields: [
      "component_union_domain_constructed",
      "component_union_coordinate_rule_constructed",
      "component_union_no_double_counting_rule_constructed",
      "endpoint_functional_domain_present",
      "domain_chart_declared",
      "domain_coordinate_rule_declared",
    ],
  },
  {
    method_id: "component_formula_as_domain_basis_vector",
    description:
      "Bind the endpoint-local cubic formula candidate and derivative formula to the component-union domain as a component-domain basis vector.",
    required_fields: [
      "local_formula_candidate_available",
      "local_derivative_formula_available",
      "component_formula_bound_to_chart",
      "basis_vector_bound_to_domain",
      "theta_support_present",
      "basis_formula_present",
      "basis_derivative_formula_present",
    ],
  },
  {
    method_id: "component_locator_as_component_domain_target_action",
    description:
      "Carry the exact local target action and opposite-endpoint zero identity through the component-domain locator.",
    required_fields: [
      "target_endpoint_evaluation_locator_constructed",
      "target_action_exact_under_component_locator",
      "opposite_endpoint_zero_under_component_locator",
    ],
  },
  {
    method_id: "component_domain_boundary_source_as_full_boundary_binding",
    description:
      "Test whether the component-domain subcertificate plus boundary source data already constitute a full endpoint boundary binding.",
    required_fields: [
      "component_domain_binding_subcertificate_constructed",
      "endpoint_boundary_binding_source_data_ready",
      "target_endpoint_ref_declared",
      "target_endpoint_value_present",
      "endpoint_boundary_binding_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "binding_contract_satisfied",
    ],
  },
  {
    method_id: "component_domain_as_motion_evaluation_map",
    description:
      "Test whether the component-domain subcertificate already carries same-packet motion and endpoint evaluation-map semantics.",
    required_fields: [
      "component_domain_binding_subcertificate_constructed",
      "same_packet_history_update_formula_present",
      "endpoint_motion_rule_constructed",
      "endpoint_evaluation_rule_constructed",
      "endpoint_evaluation_map_constructed",
      "full_endpoint_evaluation_map_constructed",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    explicitPsiFormulaAttempt: DEFAULT_EXPLICIT_PSI_FORMULA_ATTEMPT,
    componentUnionChartCertificate: DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE,
    boundaryBindingSourceDataAudit: DEFAULT_BOUNDARY_BINDING_SOURCE_DATA_AUDIT,
    boundaryBindingConstructionAttempt: DEFAULT_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT,
    boundaryBindingMotionEvaluationAttempt: DEFAULT_BOUNDARY_BINDING_MOTION_EVALUATION_ATTEMPT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--explicit-psi-formula-attempt") {
      args.explicitPsiFormulaAttempt = argv[++index];
    } else if (arg === "--component-union-chart-certificate") {
      args.componentUnionChartCertificate = argv[++index];
    } else if (arg === "--boundary-binding-source-data-audit") {
      args.boundaryBindingSourceDataAudit = argv[++index];
    } else if (arg === "--boundary-binding-construction-attempt") {
      args.boundaryBindingConstructionAttempt = argv[++index];
    } else if (arg === "--boundary-binding-motion-evaluation-attempt") {
      args.boundaryBindingMotionEvaluationAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-component-union-domain-binding-subcertificate.mjs [options]

Options:
  --explicit-psi-formula-attempt PATH             Explicit Psi formula attempt JSON. Defaults to ${DEFAULT_EXPLICIT_PSI_FORMULA_ATTEMPT}.
  --component-union-chart-certificate PATH        Component-union chart certificate JSON. Defaults to ${DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE}.
  --boundary-binding-source-data-audit PATH       Boundary-binding source-data audit JSON. Defaults to ${DEFAULT_BOUNDARY_BINDING_SOURCE_DATA_AUDIT}.
  --boundary-binding-construction-attempt PATH    Boundary-binding construction attempt JSON. Defaults to ${DEFAULT_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT}.
  --boundary-binding-motion-evaluation-attempt PATH Boundary-binding motion/evaluation attempt JSON. Defaults to ${DEFAULT_BOUNDARY_BINDING_MOTION_EVALUATION_ATTEMPT}.
  --out-dir PATH                                  Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                        Pretty-print JSON artifact.
  --help                                          Show this help.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, (_key, entry) => entry, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function artifactRecord(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing source artifact: ${filePath}`);
  }
  return {
    path: filePath,
    basename: path.basename(filePath),
    present: true,
    sha256: sha256File(filePath),
  };
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function idMap(rows, label) {
  const map = new Map();
  for (const row of rows) {
    if (map.has(row.id)) {
      throw new Error(`Duplicate ${label} id: ${row.id}`);
    }
    map.set(row.id, row);
  }
  return map;
}

function rowMap(rows, label) {
  const map = new Map();
  for (const row of rows) {
    if (map.has(row.row_id)) {
      throw new Error(`Duplicate ${label} row id: ${row.row_id}`);
    }
    map.set(row.row_id, row);
  }
  return map;
}

function requireEndpoint(map, id, label) {
  const value = map.get(id);
  if (!value) {
    throw new Error(`Missing ${label} endpoint: ${id}`);
  }
  return value;
}

function requireRow(map, rowId, label) {
  const value = map.get(rowId);
  if (!value) {
    throw new Error(`Missing ${label} row: ${rowId}`);
  }
  return value;
}

function assertSamePacketSource(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected ${name} fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error(`Refusing component-domain subcertificate from authorized ${name}.`);
  }
}

function assertInputs(inputs) {
  assertSamePacketSource(inputs.explicitPsiFormulaAttempt, "explicit Psi formula attempt");
  assertSamePacketSource(inputs.componentUnionChartCertificate, "component-union chart certificate");
  assertSamePacketSource(inputs.boundaryBindingSourceDataAudit, "boundary-binding source-data audit");
  assertSamePacketSource(inputs.boundaryBindingConstructionAttempt, "boundary-binding construction attempt");
  assertSamePacketSource(inputs.boundaryBindingMotionEvaluationAttempt, "boundary-binding motion/evaluation attempt");
  const expectedStatuses = {
    explicitPsiFormulaAttempt: "fold_coordinate_endpoint_functional_explicit_psi_formula_attempt_fail_closed",
    componentUnionChartCertificate:
      "fold_coordinate_endpoint_functional_component_union_chart_certificate_partial_pass_replay_blocked",
    boundaryBindingSourceDataAudit:
      "fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit_source_data_present_binding_absent",
    boundaryBindingConstructionAttempt:
      "fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt_fail_closed",
    boundaryBindingMotionEvaluationAttempt:
      "fold_coordinate_endpoint_functional_boundary_binding_motion_evaluation_construction_attempt_fail_closed_source_data_only_no_bindings_no_motion_no_evaluation_maps_no_row_consumption",
  };
  for (const [name, expectedStatus] of Object.entries(expectedStatuses)) {
    if (inputs[name].status !== expectedStatus) {
      throw new Error(`Unexpected ${name} status: ${inputs[name].status}`);
    }
  }
  const endpointSources = [
    inputs.explicitPsiFormulaAttempt.endpoint_explicit_psi_formula_attempts,
    inputs.componentUnionChartCertificate.endpoint_component_union_chart_certificates,
    inputs.boundaryBindingSourceDataAudit.endpoint_boundary_binding_source_data_audits,
    inputs.boundaryBindingConstructionAttempt.endpoint_boundary_binding_construction_attempts,
    inputs.boundaryBindingMotionEvaluationAttempt.endpoint_boundary_binding_motion_evaluation_construction_attempts,
  ];
  for (const source of endpointSources) {
    if (!Array.isArray(source) || source.length !== 4) {
      throw new Error("Expected exactly 4 endpoint-functional source rows.");
    }
  }
  const rowSources = [
    inputs.explicitPsiFormulaAttempt.row_explicit_psi_formula_attempts,
    inputs.componentUnionChartCertificate.row_component_union_chart_certificates,
    inputs.boundaryBindingSourceDataAudit.row_boundary_binding_source_data_audits,
    inputs.boundaryBindingConstructionAttempt.row_boundary_binding_construction_attempts,
    inputs.boundaryBindingMotionEvaluationAttempt.row_boundary_binding_motion_evaluation_construction_attempts,
  ];
  for (const source of rowSources) {
    if (!Array.isArray(source) || source.length !== 3) {
      throw new Error("Expected exactly 3 one-leaf row source rows.");
    }
  }
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `missing_component_domain_subcertificate_${field}`),
    passed: missingFields.length === 0,
  };
}

function endpointFields(explicitEndpoint, componentEndpoint, sourceEndpoint, bindingEndpoint, motionEndpoint) {
  const explicitFormula = explicitEndpoint.formula_fields_present;
  const component = componentEndpoint.required_fields_present;
  const source = sourceEndpoint.required_fields_present;
  const binding = bindingEndpoint.required_fields_present;
  const motion = motionEndpoint.required_fields_present;
  const fields = {
    local_formula_candidate_available: component.local_formula_candidate_available === true,
    local_derivative_formula_available: component.local_derivative_formula_available === true,
    component_endpoint_identities_exact: component.component_endpoint_identities_exact === true,
    component_union_domain_constructed: component.component_union_domain_constructed === true,
    component_union_coordinate_rule_constructed:
      component.component_union_coordinate_rule_constructed === true,
    component_union_no_double_counting_rule_constructed:
      component.component_union_no_double_counting_rule_constructed === true,
    component_formula_bound_to_chart: component.component_formula_bound_to_chart === true,
    target_endpoint_evaluation_locator_constructed:
      component.target_endpoint_evaluation_locator_constructed === true,
    target_action_exact_under_component_locator:
      component.target_action_exact_under_component_locator === true,
    opposite_endpoint_zero_under_component_locator:
      component.opposite_endpoint_zero_under_component_locator === true,
    endpoint_boundary_binding_source_data_ready:
      source.endpoint_boundary_binding_source_data_ready === true,
    endpoint_boundary_action_declared: source.endpoint_boundary_action_declared === true,
    boundary_delta_sign_consistent: source.boundary_delta_sign_consistent === true,
    target_endpoint_ref_declared: source.target_endpoint_ref_declared === true,
    target_endpoint_value_present: source.target_endpoint_value_present === true,
    evaluation_map_symbol_declared:
      component.evaluation_map_symbol_declared === true || source.evaluation_map_symbol_declared === true,
    endpoint_evaluation_rule_declared: source.endpoint_evaluation_rule_declared === true,
    endpoint_functional_domain_present:
      component.component_union_domain_constructed === true &&
      component.endpoint_functional_domain_symbol_declared === true,
    domain_chart_declared:
      component.chart_symbol_declared === true &&
      component.component_union_domain_constructed === true,
    domain_coordinate_rule_declared: component.component_union_coordinate_rule_constructed === true,
    basis_vector_bound_to_domain:
      component.component_formula_bound_to_chart === true &&
      explicitFormula.explicit_psi_bound_to_fc_variable === true,
    theta_support_present:
      component.local_support_components_available === true &&
      component.component_theta_intervals_rational === true &&
      component.component_theta_intervals_ordered === true &&
      component.component_theta_intervals_pairwise_disjoint === true,
    basis_formula_present:
      explicitFormula.explicit_psi_formula_declared === true &&
      component.component_formula_bound_to_chart === true,
    basis_derivative_formula_present:
      explicitFormula.explicit_psi_derivative_formula_declared === true &&
      component.component_formula_bound_to_chart === true,
    endpoint_boundary_binding_constructed:
      binding.endpoint_boundary_binding_constructed === true || motion.endpoint_boundary_binding_constructed === true,
    endpoint_value_bound_to_boundary_binding:
      binding.endpoint_value_bound_to_boundary_binding === true,
    binding_contract_satisfied:
      binding.binding_contract_satisfied === true || source.binding_contract_satisfied === true,
    same_packet_history_update_formula_present:
      binding.same_packet_history_update_formula_present === true ||
      motion.same_packet_history_update_formula_present === true,
    x_update_basis_present: binding.x_update_basis_present === true,
    xdot_update_basis_present: binding.xdot_update_basis_present === true,
    mesh_update_rule_present: binding.mesh_update_rule_present === true,
    endpoint_motion_rule_constructed:
      binding.endpoint_motion_rule_constructed === true || motion.endpoint_motion_rule_constructed === true,
    source_monotonicity_rule_present: binding.source_monotonicity_rule_present === true,
    receiver_monotonicity_rule_present: binding.receiver_monotonicity_rule_present === true,
    periodic_extension_rule_present: binding.periodic_extension_rule_present === true,
    c1_gluing_rule_present: binding.c1_gluing_rule_present === true,
    endpoint_evaluation_rule_constructed:
      binding.endpoint_evaluation_rule_constructed === true ||
      motion.endpoint_evaluation_rule_constructed === true,
    endpoint_value_bound_to_evaluation_map:
      binding.endpoint_value_bound_to_evaluation_map === true ||
      motion.endpoint_value_bound_to_evaluation_map === true,
    endpoint_evaluation_map_constructed:
      binding.endpoint_evaluation_map_constructed === true ||
      motion.endpoint_evaluation_map_constructed === true,
    target_action_exact_under_endpoint_evaluation_map:
      binding.target_action_exact_under_endpoint_evaluation_map === true ||
      motion.target_action_exact_under_endpoint_evaluation_map === true,
    non_target_endpoint_actions_enumerated:
      binding.non_target_endpoint_actions_enumerated === true ||
      motion.non_target_endpoint_actions_enumerated === true,
    non_target_endpoint_zero_certified:
      binding.non_target_endpoint_zero_certified === true ||
      motion.non_target_endpoint_zero_certified === true,
    full_endpoint_evaluation_map_constructed:
      binding.full_endpoint_evaluation_map_constructed === true ||
      motion.full_endpoint_evaluation_map_constructed === true,
    global_domain_evaluation_map_constructed:
      binding.global_domain_evaluation_map_constructed === true ||
      motion.global_domain_evaluation_map_constructed === true,
    exact_screen_zero_certified:
      binding.exact_screen_zero_certified === true || motion.exact_screen_zero_certified === true,
    rank_certified: binding.rank_certified === true || motion.rank_certified === true,
    candidate_artifacts_present:
      binding.candidate_artifacts_present === true || motion.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change:
      binding.root_topology_recertified_for_candidate_change === true ||
      motion.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change:
      binding.proof_interval_v1_v6_rerun_for_candidate_change === true ||
      motion.proof_interval_v1_v6_rerun_for_candidate_change === true,
  };
  fields.component_domain_binding_subcertificate_constructed =
    REQUIRED_COMPONENT_DOMAIN_FIELDS.every((field) => fields[field] === true);
  fields.component_domain_subcertificate_ready =
    fields.component_domain_binding_subcertificate_constructed &&
    BLOCKED_ENDPOINT_FIELDS.every((field) => fields[field] !== true);
  return fields;
}

function buildEndpointAttempt(explicitEndpoint, componentEndpoint, sourceEndpoint, bindingEndpoint, motionEndpoint) {
  const fields = endpointFields(
    explicitEndpoint,
    componentEndpoint,
    sourceEndpoint,
    bindingEndpoint,
    motionEndpoint
  );
  const methodResults = CONSTRUCTION_METHODS.map((method) => methodResult(method, fields));
  const blockedFields = BLOCKED_ENDPOINT_FIELDS.filter((field) => fields[field] !== true);
  return {
    id: componentEndpoint.id,
    endpoint_functional_id: componentEndpoint.endpoint_functional_id,
    role: componentEndpoint.role,
    basis_symbol: componentEndpoint.basis_symbol,
    source_symbol: componentEndpoint.source_symbol,
    row_uses: componentEndpoint.row_uses,
    target_equation: componentEndpoint.target_equation,
    target_action: componentEndpoint.target_action,
    target_sign: componentEndpoint.target_sign,
    domain_symbol: componentEndpoint.domain_symbol,
    chart_symbol: componentEndpoint.chart_symbol,
    evaluation_map_symbol: componentEndpoint.evaluation_map_symbol,
    support_interval_ids: componentEndpoint.support_interval_ids,
    support_union_kind: componentEndpoint.support_union_kind,
    component_union_chart: componentEndpoint.component_union_chart,
    support_components: componentEndpoint.support_components,
    target_endpoint_refs: sourceEndpoint.target_endpoint_refs,
    required_fields_present: fields,
    construction_method_results: methodResults,
    component_domain_binding_subcertificate_constructed:
      fields.component_domain_binding_subcertificate_constructed,
    component_domain_subcertificate_ready: fields.component_domain_subcertificate_ready,
    blocked_after_subcertificate_fields: blockedFields,
    failure_codes_after_subcertificate: blockedFields.map(
      (field) => `component_domain_subcertificate_retains_blocker_${field}`
    ),
    endpoint_boundary_binding_constructed: fields.endpoint_boundary_binding_constructed,
    endpoint_motion_rule_constructed: fields.endpoint_motion_rule_constructed,
    endpoint_evaluation_map_constructed: fields.endpoint_evaluation_map_constructed,
    obstruction:
      "The component-union domain, coordinate rule, no-double-counting rule, component formula binding, target locator, and local endpoint identities now form a narrow endpoint-functional domain subcertificate. It is not a full endpoint boundary binding and still has no same-packet history update, endpoint motion rule, endpoint evaluation map, non-target zero certificate, exact $B\\xi=0$, rank certificate, candidate artifacts, topology recertification, or proof-interval replay.",
  };
}

function buildRowAttempt(explicitRow, componentRow, sourceRow, bindingRow, motionRow, endpointAttempts) {
  const endpointById = new Map(endpointAttempts.map((endpoint) => [endpoint.id, endpoint]));
  const sourceEndpoint = endpointById.get(componentRow.source_endpoint_contract_id);
  const receiverEndpoint = endpointById.get(componentRow.receiver_endpoint_contract_id);
  if (!sourceEndpoint || !receiverEndpoint) {
    throw new Error(`Missing endpoint pair for row: ${componentRow.row_id}`);
  }
  const fields = {
    row_locator_resolved:
      explicitRow.required_fields_present.row_locator_resolved === true &&
      componentRow.required_fields_present.row_locator_resolved === true,
    source_formula_candidate_declared:
      explicitRow.required_fields_present.source_formula_candidate_declared === true,
    receiver_formula_candidate_declared:
      explicitRow.required_fields_present.receiver_formula_candidate_declared === true,
    source_target_action_exact:
      explicitRow.required_fields_present.source_target_action_exact === true,
    receiver_target_action_exact:
      explicitRow.required_fields_present.receiver_target_action_exact === true,
    source_component_domain_subcertificate_constructed:
      sourceEndpoint.component_domain_binding_subcertificate_constructed === true,
    receiver_component_domain_subcertificate_constructed:
      receiverEndpoint.component_domain_binding_subcertificate_constructed === true,
    combined_component_domain_pair_constructed:
      sourceEndpoint.component_domain_binding_subcertificate_constructed === true &&
      receiverEndpoint.component_domain_binding_subcertificate_constructed === true &&
      componentRow.required_fields_present.combined_component_union_chart_pair_constructed === true,
    row_boundary_binding_source_data_ready:
      sourceRow.required_fields_present.row_boundary_binding_source_data_ready === true,
    source_endpoint_boundary_binding_constructed:
      bindingRow.required_fields_present.source_endpoint_boundary_binding_constructed === true ||
      motionRow.required_fields_present.source_endpoint_boundary_binding_constructed === true,
    receiver_endpoint_boundary_binding_constructed:
      bindingRow.required_fields_present.receiver_endpoint_boundary_binding_constructed === true ||
      motionRow.required_fields_present.receiver_endpoint_boundary_binding_constructed === true,
    combined_boundary_binding_pair_constructed:
      bindingRow.required_fields_present.combined_boundary_binding_pair_constructed === true,
    source_endpoint_motion_rule_constructed:
      bindingRow.required_fields_present.source_endpoint_motion_rule_constructed === true ||
      motionRow.required_fields_present.source_endpoint_motion_rule_constructed === true,
    receiver_endpoint_motion_rule_constructed:
      bindingRow.required_fields_present.receiver_endpoint_motion_rule_constructed === true ||
      motionRow.required_fields_present.receiver_endpoint_motion_rule_constructed === true,
    source_endpoint_evaluation_map_constructed:
      motionRow.required_fields_present.source_endpoint_evaluation_map_constructed === true,
    receiver_endpoint_evaluation_map_constructed:
      motionRow.required_fields_present.receiver_endpoint_evaluation_map_constructed === true,
    combined_endpoint_evaluation_map_pair_constructed:
      motionRow.required_fields_present.combined_endpoint_evaluation_map_pair_constructed === true,
    same_packet_history_update_formula_present:
      bindingRow.required_fields_present.same_packet_history_update_formula_present === true ||
      motionRow.required_fields_present.same_packet_history_update_formula_present === true,
    proof_grade_boundary_opening_certified:
      bindingRow.required_fields_present.proof_grade_boundary_opening_certified === true ||
      motionRow.required_fields_present.proof_grade_boundary_opening_certified === true,
    residual_data_construction_ready: false,
    candidate_artifacts_present:
      bindingRow.required_fields_present.candidate_artifacts_present === true ||
      motionRow.required_fields_present.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change:
      bindingRow.required_fields_present.root_topology_recertified_for_candidate_change === true ||
      motionRow.required_fields_present.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change:
      bindingRow.required_fields_present.proof_interval_v1_v6_rerun_for_candidate_change === true ||
      motionRow.required_fields_present.proof_interval_v1_v6_rerun_for_candidate_change === true,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.component_domain_subcertificate_ready =
    fields.combined_component_domain_pair_constructed &&
    fields.row_boundary_binding_source_data_ready &&
    !fields.combined_boundary_binding_pair_constructed &&
    !fields.combined_endpoint_evaluation_map_pair_constructed;
  return {
    row_id: componentRow.row_id,
    source_interval: componentRow.source_interval,
    receiver_interval: componentRow.receiver_interval,
    failed_side: componentRow.failed_side,
    boundary_side: sourceRow.boundary_side,
    source_variable: sourceRow.source_variable,
    receiver_variable: sourceRow.receiver_variable,
    source_boundary_ref: sourceRow.source_boundary_ref,
    receiver_boundary_ref: sourceRow.receiver_boundary_ref,
    required_fields_present: fields,
    component_domain_pair_constructed: fields.combined_component_domain_pair_constructed,
    component_domain_subcertificate_ready: fields.component_domain_subcertificate_ready,
    blocked_after_subcertificate_fields: [
      "source_endpoint_boundary_binding_constructed",
      "receiver_endpoint_boundary_binding_constructed",
      "combined_boundary_binding_pair_constructed",
      "source_endpoint_motion_rule_constructed",
      "receiver_endpoint_motion_rule_constructed",
      "combined_endpoint_evaluation_map_pair_constructed",
      "same_packet_history_update_formula_present",
      "proof_grade_boundary_opening_certified",
      "residual_data_construction_ready",
      "candidate_artifacts_present",
      "root_topology_recertified_for_candidate_change",
      "proof_interval_v1_v6_rerun_for_candidate_change",
    ].filter((field) => fields[field] !== true),
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row now has a source/receiver component-domain subcertificate pair plus boundary-source data, but still lacks source/receiver endpoint boundary bindings, endpoint motion rules, endpoint evaluation-map pairs, proof-grade boundary opening, residual data construction, replay, and row consumption.",
  };
}

function buildAttempt(inputs, paths) {
  assertInputs(inputs);
  const explicitEndpoints = idMap(
    inputs.explicitPsiFormulaAttempt.endpoint_explicit_psi_formula_attempts,
    "explicit Psi endpoint"
  );
  const sourceEndpoints = idMap(
    inputs.boundaryBindingSourceDataAudit.endpoint_boundary_binding_source_data_audits,
    "boundary source endpoint"
  );
  const bindingEndpoints = idMap(
    inputs.boundaryBindingConstructionAttempt.endpoint_boundary_binding_construction_attempts,
    "boundary construction endpoint"
  );
  const motionEndpoints = idMap(
    inputs.boundaryBindingMotionEvaluationAttempt.endpoint_boundary_binding_motion_evaluation_construction_attempts,
    "boundary motion/evaluation endpoint"
  );
  const endpointAttempts = inputs.componentUnionChartCertificate.endpoint_component_union_chart_certificates.map(
    (componentEndpoint) =>
      buildEndpointAttempt(
        requireEndpoint(explicitEndpoints, componentEndpoint.id, "explicit Psi"),
        componentEndpoint,
        requireEndpoint(sourceEndpoints, componentEndpoint.id, "boundary source"),
        requireEndpoint(bindingEndpoints, componentEndpoint.id, "boundary construction"),
        requireEndpoint(motionEndpoints, componentEndpoint.id, "boundary motion/evaluation")
      )
  );

  const explicitRows = rowMap(inputs.explicitPsiFormulaAttempt.row_explicit_psi_formula_attempts, "explicit Psi");
  const sourceRows = rowMap(inputs.boundaryBindingSourceDataAudit.row_boundary_binding_source_data_audits, "boundary source");
  const bindingRows = rowMap(
    inputs.boundaryBindingConstructionAttempt.row_boundary_binding_construction_attempts,
    "boundary construction"
  );
  const motionRows = rowMap(
    inputs.boundaryBindingMotionEvaluationAttempt.row_boundary_binding_motion_evaluation_construction_attempts,
    "boundary motion/evaluation"
  );
  const rowAttempts = inputs.componentUnionChartCertificate.row_component_union_chart_certificates.map(
    (componentRow) =>
      buildRowAttempt(
        requireRow(explicitRows, componentRow.row_id, "explicit Psi"),
        componentRow,
        requireRow(sourceRows, componentRow.row_id, "boundary source"),
        requireRow(bindingRows, componentRow.row_id, "boundary construction"),
        requireRow(motionRows, componentRow.row_id, "boundary motion/evaluation"),
        endpointAttempts
      )
  );
  const endpointFieldCounts = Object.fromEntries(
    ENDPOINT_FIELDS.map((field) => [
      field,
      countTrue(endpointAttempts, (endpoint) => endpoint.required_fields_present[field]),
    ])
  );
  const rowFieldCounts = Object.fromEntries(
    ROW_FIELDS.map((field) => [
      field,
      countTrue(rowAttempts, (row) => row.required_fields_present[field]),
    ])
  );
  return {
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-component-union-domain-binding-subcertificate-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status:
      "fold_coordinate_endpoint_functional_component_union_domain_binding_subcertificate_partial_pass_boundary_binding_motion_evaluation_blocked",
    theorem_target: "Endpoint-Functional Component-Union Domain Binding Subcertificate",
    claim_level:
      "priority-only component-domain subcertificate; component-union chart and local formula data construct endpoint-functional domain/basis subcertificates, but full endpoint boundary bindings, motion rules, evaluation maps, certificates, replay, and row consumption remain absent",
    source_artifacts: {
      explicit_psi_formula_attempt: artifactRecord(paths.explicitPsiFormulaAttempt),
      component_union_chart_certificate: artifactRecord(paths.componentUnionChartCertificate),
      boundary_binding_source_data_audit: artifactRecord(paths.boundaryBindingSourceDataAudit),
      boundary_binding_construction_attempt: artifactRecord(paths.boundaryBindingConstructionAttempt),
      boundary_binding_motion_evaluation_attempt: artifactRecord(paths.boundaryBindingMotionEvaluationAttempt),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      component_union_chart_promoted_to_component_domain_subcertificate: true,
      component_domain_subcertificate_promoted_to_full_endpoint_boundary_binding: false,
      component_domain_subcertificate_promoted_to_motion_rule: false,
      component_domain_subcertificate_promoted_to_endpoint_evaluation_map: false,
      component_domain_subcertificate_promoted_to_candidate_replay: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    construction_rule:
      "A component-domain subcertificate may pass when the endpoint has a certified component-union domain, component coordinate rule, no-double-counting rule, formula-to-chart binding, exact local endpoint identities, endpoint-functional domain symbol, chart symbol, rational ordered support, basis formula, and derivative formula. It does not by itself construct an endpoint boundary binding, same-packet history update, endpoint motion rule, endpoint evaluation map, candidate artifact, topology recertification, proof-interval replay, or row consumption.",
    no_promotion_rule:
      "The component-domain subcertificate is a proper subobject of the endpoint-functional proof stack. Its positive fields cannot be promoted to full endpoint boundary binding, endpoint motion/evaluation, residual interval data, or preledger row consumption without the remaining same-packet proof fields.",
    construction_methods: CONSTRUCTION_METHODS,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      rows: rowAttempts.length,
      component_domain_subcertificate_functionals:
        endpointFieldCounts.component_domain_binding_subcertificate_constructed,
      endpoint_functional_domain_functionals:
        endpointFieldCounts.endpoint_functional_domain_present,
      domain_chart_declared_functionals:
        endpointFieldCounts.domain_chart_declared,
      domain_coordinate_rule_declared_functionals:
        endpointFieldCounts.domain_coordinate_rule_declared,
      basis_vector_bound_to_domain_functionals:
        endpointFieldCounts.basis_vector_bound_to_domain,
      theta_support_functionals: endpointFieldCounts.theta_support_present,
      component_domain_basis_formula_functionals:
        endpointFieldCounts.basis_formula_present,
      component_domain_basis_derivative_formula_functionals:
        endpointFieldCounts.basis_derivative_formula_present,
      local_formula_candidate_functionals:
        endpointFieldCounts.local_formula_candidate_available,
      local_derivative_formula_candidate_functionals:
        endpointFieldCounts.local_derivative_formula_available,
      component_endpoint_identity_functionals:
        endpointFieldCounts.component_endpoint_identities_exact,
      component_union_chart_functionals:
        endpointFieldCounts.component_union_domain_constructed,
      component_formula_chart_binding_functionals:
        endpointFieldCounts.component_formula_bound_to_chart,
      target_endpoint_locator_functionals:
        endpointFieldCounts.target_endpoint_evaluation_locator_constructed,
      target_action_locator_exact_functionals:
        endpointFieldCounts.target_action_exact_under_component_locator,
      opposite_endpoint_zero_locator_functionals:
        endpointFieldCounts.opposite_endpoint_zero_under_component_locator,
      endpoint_boundary_source_data_functionals:
        endpointFieldCounts.endpoint_boundary_binding_source_data_ready,
      evaluation_map_symbol_declared_functionals:
        endpointFieldCounts.evaluation_map_symbol_declared,
      endpoint_evaluation_rule_declared_functionals:
        endpointFieldCounts.endpoint_evaluation_rule_declared,
      endpoint_boundary_binding_functionals:
        endpointFieldCounts.endpoint_boundary_binding_constructed,
      endpoint_value_bound_to_boundary_binding_functionals:
        endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      binding_contract_satisfied_functionals:
        endpointFieldCounts.binding_contract_satisfied,
      same_packet_history_update_formula_functionals:
        endpointFieldCounts.same_packet_history_update_formula_present,
      endpoint_motion_rule_functionals:
        endpointFieldCounts.endpoint_motion_rule_constructed,
      endpoint_evaluation_map_functionals:
        endpointFieldCounts.endpoint_evaluation_map_constructed,
      full_endpoint_evaluation_map_functionals:
        endpointFieldCounts.full_endpoint_evaluation_map_constructed,
      global_domain_evaluation_map_functionals:
        endpointFieldCounts.global_domain_evaluation_map_constructed,
      non_target_zero_certificate_functionals:
        endpointFieldCounts.non_target_endpoint_zero_certified,
      exact_screen_zero_certificate_functionals:
        endpointFieldCounts.exact_screen_zero_certified,
      rank_certificate_functionals:
        endpointFieldCounts.rank_certified,
      candidate_artifact_functionals:
        endpointFieldCounts.candidate_artifacts_present,
      topology_recertification_functionals:
        endpointFieldCounts.root_topology_recertified_for_candidate_change,
      proof_interval_replay_functionals:
        endpointFieldCounts.proof_interval_v1_v6_rerun_for_candidate_change,
      row_component_domain_pairs:
        rowFieldCounts.combined_component_domain_pair_constructed,
      row_boundary_source_data_pairs:
        rowFieldCounts.row_boundary_binding_source_data_ready,
      row_boundary_binding_pairs:
        rowFieldCounts.combined_boundary_binding_pair_constructed,
      row_endpoint_evaluation_map_pairs:
        rowFieldCounts.combined_endpoint_evaluation_map_pair_constructed,
      proof_grade_boundary_opening_rows:
        rowFieldCounts.proof_grade_boundary_opening_certified,
      row_residual_data_ready:
        rowFieldCounts.residual_data_construction_ready,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    endpoint_component_union_domain_binding_subcertificates: endpointAttempts,
    row_component_union_domain_binding_subcertificates: rowAttempts,
    capture_decision:
      "Priority-only. The component-union chart is now captured as a genuine endpoint-functional component-domain subcertificate for 4 / 4 endpoint variables and 3 / 3 source/receiver row pairs. This is not row closure: the packet constructs 0 endpoint boundary bindings, 0 endpoint motion rules, 0 endpoint evaluation maps, 0 non-target zero certificates, 0 exact $B\\xi=0$ certificates, 0 rank certificates, 0 candidate artifacts, 0 topology recertifications, 0 proof-interval replays, and 0 consumed rows.",
  };
}

function sourceTable(sourceArtifacts) {
  return Object.entries(sourceArtifacts)
    .map(
      ([label, artifact]) =>
        `| \`${label}\` | \`${artifact.basename}\` | ${artifact.present} | \`${artifact.sha256}\` |`
    )
    .join("\n");
}

function methodTable(methods) {
  return methods
    .map(
      (method) =>
        `| \`${method.method_id}\` | ${method.required_fields.length} | ${method.description} |`
    )
    .join("\n");
}

function endpointTable(endpoints) {
  return endpoints
    .map(
      (endpoint) =>
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.endpoint_functional_domain_present} | ${endpoint.required_fields_present.basis_formula_present} | ${endpoint.required_fields_present.endpoint_boundary_binding_source_data_ready} | ${endpoint.required_fields_present.component_domain_binding_subcertificate_constructed} | ${endpoint.required_fields_present.endpoint_boundary_binding_constructed} | ${endpoint.required_fields_present.endpoint_motion_rule_constructed} | ${endpoint.required_fields_present.endpoint_evaluation_map_constructed} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_component_domain_pair_constructed} | ${row.required_fields_present.row_boundary_binding_source_data_ready} | ${row.required_fields_present.combined_boundary_binding_pair_constructed} | ${row.required_fields_present.combined_endpoint_evaluation_map_pair_constructed} | ${row.row_consumed} |`
    )
    .join("\n");
}

function countTable(counts, total) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count} / ${total} |`)
    .join("\n");
}

function buildReport(attempt) {
  const summary = attempt.summary;
  return `# Higher-Fold Endpoint-Functional Component-Union Domain Binding Subcertificate

## Verdict

Status: \`${attempt.status}\`.

This priority-only subcertificate tests the narrowest positive endpoint object
left by the component-union chart certificate: whether the certified
component-union chart and local formula bindings can be recorded as an
endpoint-functional component-domain subcertificate without promoting that
subcertificate to motion, evaluation, replay, or row consumption.

The packet partially passes. It constructs ${summary.component_domain_subcertificate_functionals}
/ ${summary.endpoint_functionals} component-domain subcertificates,
${summary.endpoint_functional_domain_functionals} / ${summary.endpoint_functionals}
endpoint-functional domains, ${summary.domain_chart_declared_functionals} /
${summary.endpoint_functionals} domain charts,
${summary.domain_coordinate_rule_declared_functionals} / ${summary.endpoint_functionals}
domain coordinate rules, ${summary.basis_vector_bound_to_domain_functionals} /
${summary.endpoint_functionals} basis-domain bindings,
${summary.theta_support_functionals} / ${summary.endpoint_functionals} theta
supports, ${summary.component_domain_basis_formula_functionals} /
${summary.endpoint_functionals} component-domain basis formulas,
${summary.component_domain_basis_derivative_formula_functionals} /
${summary.endpoint_functionals} derivative formulas, and
${summary.row_component_domain_pairs} / ${summary.rows} source/receiver
component-domain pairs. It keeps 0 / ${summary.endpoint_functionals} endpoint
boundary bindings, 0 / ${summary.endpoint_functionals} endpoint value bindings,
0 / ${summary.endpoint_functionals} same-packet history update formulas, 0 /
${summary.endpoint_functionals} endpoint motion rules, 0 /
${summary.endpoint_functionals} endpoint evaluation maps, 0 /
${summary.endpoint_functionals} non-target zero certificates, 0 /
${summary.endpoint_functionals} exact $B\\xi=0$ certificates, 0 /
${summary.endpoint_functionals} rank certificates, 0 /
${summary.endpoint_functionals} candidate artifacts, 0 /
${summary.endpoint_functionals} topology recertifications, 0 /
${summary.endpoint_functionals} proof-interval replays, and 0 consumed rows.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(attempt.source_artifacts)}

## Construction Rule

${attempt.construction_rule}

## No-Promotion Rule

${attempt.no_promotion_rule}

## Construction Methods

| Method | Required fields | Description |
| --- | ---: | --- |
${methodTable(attempt.construction_methods)}

## Endpoint Subcertificates

| Endpoint | Role | Domain | Basis formula | Boundary source | Subcertificate | Boundary binding | Motion rule | Evaluation map |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(attempt.endpoint_component_union_domain_binding_subcertificates)}

## Row Subcertificates

| Row | Failed side | Component-domain pair | Boundary source data | Boundary-binding pair | Evaluation-map pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
${rowTable(attempt.row_component_union_domain_binding_subcertificates)}

## Endpoint Field Counts

| Field | Present count |
| --- | ---: |
${countTable(attempt.endpoint_field_counts, summary.endpoint_functionals)}

## Row Field Counts

| Field | Present count |
| --- | ---: |
${countTable(attempt.row_field_counts, summary.rows)}

## Construction Blocker

The next proof object after this subcertificate is no longer an endpoint-domain
or component-formula object. It is a full endpoint boundary binding with an
endpoint value binding and binding contract, followed by a same-packet history
update formula, endpoint motion rule, endpoint evaluation map, non-target zero
certificate, exact $B\\xi=0$ and rank certificates, candidate artifacts,
topology recertification, and proof-interval replay.

## Capture Decision

${attempt.capture_decision}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputs = {
    explicitPsiFormulaAttempt: readJson(args.explicitPsiFormulaAttempt),
    componentUnionChartCertificate: readJson(args.componentUnionChartCertificate),
    boundaryBindingSourceDataAudit: readJson(args.boundaryBindingSourceDataAudit),
    boundaryBindingConstructionAttempt: readJson(args.boundaryBindingConstructionAttempt),
    boundaryBindingMotionEvaluationAttempt: readJson(args.boundaryBindingMotionEvaluationAttempt),
  };
  const paths = {
    explicitPsiFormulaAttempt: args.explicitPsiFormulaAttempt,
    componentUnionChartCertificate: args.componentUnionChartCertificate,
    boundaryBindingSourceDataAudit: args.boundaryBindingSourceDataAudit,
    boundaryBindingConstructionAttempt: args.boundaryBindingConstructionAttempt,
    boundaryBindingMotionEvaluationAttempt: args.boundaryBindingMotionEvaluationAttempt,
  };
  const attempt = buildAttempt(inputs, paths);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, attempt, args.pretty);
  writeText(outputReportPath, buildReport(attempt));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
  console.log(JSON.stringify(attempt.summary, (_key, entry) => entry, 2));
}

main();
