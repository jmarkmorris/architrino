#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_EXPLICIT_PSI_FORMULA_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_explicit_psi_formula_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE = `${CERT_DIR}/fold_coordinate_endpoint_functional_component_union_chart_certificate.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_POST_COMPONENT_UNION_MOTION_LAYER = `${CERT_DIR}/fold_coordinate_endpoint_functional_post_component_union_endpoint_motion_full_evaluation_map_layer_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BOUNDARY_BINDING_SOURCE_DATA_AUDIT = `${CERT_DIR}/fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_RESIDUAL_DATA_CONSTRUCTION_ATTEMPT = `${CERT_DIR}/one_leaf_active_endpoint_residual_data_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_boundary_binding_motion_evaluation_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_boundary_binding_motion_evaluation_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_FIELDS = [
  "local_formula_candidate_available",
  "local_derivative_formula_available",
  "component_endpoint_identities_exact",
  "component_union_domain_constructed",
  "component_union_coordinate_rule_constructed",
  "component_union_no_double_counting_rule_constructed",
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
  "non_target_endpoint_zero_certified",
  "full_endpoint_evaluation_map_constructed",
  "global_domain_evaluation_map_constructed",
  "exact_screen_zero_certified",
  "rank_certified",
  "binding_contract_satisfied",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "unified_boundary_motion_evaluation_ready",
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_formula_candidate_declared",
  "receiver_formula_candidate_declared",
  "source_target_action_exact",
  "receiver_target_action_exact",
  "combined_component_union_chart_pair_constructed",
  "row_boundary_binding_source_data_ready",
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "combined_boundary_binding_pair_constructed",
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
  "unified_boundary_motion_evaluation_ready",
];

const REQUIRED_ENDPOINT_FIELDS = [
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
  "non_target_endpoint_zero_certified",
  "full_endpoint_evaluation_map_constructed",
  "global_domain_evaluation_map_constructed",
  "exact_screen_zero_certified",
  "rank_certified",
  "binding_contract_satisfied",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
];

const REQUIRED_ROW_FIELDS = [
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "combined_boundary_binding_pair_constructed",
  "source_endpoint_evaluation_map_constructed",
  "receiver_endpoint_evaluation_map_constructed",
  "combined_endpoint_evaluation_map_pair_constructed",
  "same_packet_history_update_formula_present",
  "proof_grade_boundary_opening_certified",
  "residual_data_construction_ready",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "source_data_as_endpoint_boundary_binding",
    description:
      "Try to promote the endpoint-local Psi formula, component-union chart, and boundary source data into an endpoint boundary binding.",
    required_fields: [
      "local_formula_candidate_available",
      "component_union_domain_constructed",
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
    method_id: "signed_boundary_delta_as_endpoint_motion_rule",
    description:
      "Try to promote the endpoint boundary binding and signed boundary action into a same-packet endpoint motion rule.",
    required_fields: [
      "endpoint_boundary_binding_constructed",
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
    ],
  },
  {
    method_id: "declared_evaluation_rule_as_endpoint_evaluation_map",
    description:
      "Try to promote the endpoint motion rule and declared evaluation-map symbol into a constructed endpoint evaluation map.",
    required_fields: [
      "endpoint_motion_rule_constructed",
      "endpoint_evaluation_rule_constructed",
      "endpoint_value_bound_to_evaluation_map",
      "endpoint_evaluation_map_constructed",
      "target_action_exact_under_endpoint_evaluation_map",
      "non_target_endpoint_actions_enumerated",
      "non_target_endpoint_zero_certified",
      "full_endpoint_evaluation_map_constructed",
    ],
  },
  {
    method_id: "motion_and_evaluation_as_full_endpoint_map",
    description:
      "Try to promote a full endpoint evaluation map into same-packet candidate artifacts and proof-interval replay.",
    required_fields: [
      "full_endpoint_evaluation_map_constructed",
      "exact_screen_zero_certified",
      "rank_certified",
      "candidate_artifacts_present",
      "root_topology_recertified_for_candidate_change",
      "proof_interval_v1_v6_rerun_for_candidate_change",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    explicitPsiFormulaAttempt: DEFAULT_EXPLICIT_PSI_FORMULA_ATTEMPT,
    componentUnionChartCertificate: DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE,
    postComponentUnionMotionLayer: DEFAULT_POST_COMPONENT_UNION_MOTION_LAYER,
    boundaryBindingSourceDataAudit: DEFAULT_BOUNDARY_BINDING_SOURCE_DATA_AUDIT,
    boundaryBindingConstructionAttempt: DEFAULT_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT,
    residualDataConstructionAttempt: DEFAULT_RESIDUAL_DATA_CONSTRUCTION_ATTEMPT,
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
    } else if (arg === "--post-component-union-motion-layer") {
      args.postComponentUnionMotionLayer = argv[++index];
    } else if (arg === "--boundary-binding-source-data-audit") {
      args.boundaryBindingSourceDataAudit = argv[++index];
    } else if (arg === "--boundary-binding-construction-attempt") {
      args.boundaryBindingConstructionAttempt = argv[++index];
    } else if (arg === "--residual-data-construction-attempt") {
      args.residualDataConstructionAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-boundary-binding-motion-evaluation-construction-attempt.mjs [options]

Options:
  --explicit-psi-formula-attempt PATH          Explicit Psi formula attempt JSON. Defaults to ${DEFAULT_EXPLICIT_PSI_FORMULA_ATTEMPT}.
  --component-union-chart-certificate PATH     Component-union chart certificate JSON. Defaults to ${DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE}.
  --post-component-union-motion-layer PATH     Endpoint motion full evaluation-map layer JSON. Defaults to ${DEFAULT_POST_COMPONENT_UNION_MOTION_LAYER}.
  --boundary-binding-source-data-audit PATH    Boundary-binding source-data audit JSON. Defaults to ${DEFAULT_BOUNDARY_BINDING_SOURCE_DATA_AUDIT}.
  --boundary-binding-construction-attempt PATH Boundary-binding construction attempt JSON. Defaults to ${DEFAULT_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT}.
  --residual-data-construction-attempt PATH    One-leaf residual-data construction attempt JSON. Defaults to ${DEFAULT_RESIDUAL_DATA_CONSTRUCTION_ATTEMPT}.
  --out-dir PATH                               Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                     Pretty-print JSON artifact.
  --help                                       Show this help.`);
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

function requireMatchingRow(map, rowId, label) {
  const row = map.get(rowId);
  if (!row) {
    throw new Error(`Missing ${label} row: ${rowId}`);
  }
  return row;
}

function requireMatchingEndpoint(map, endpointId, label) {
  const endpoint = map.get(endpointId);
  if (!endpoint) {
    throw new Error(`Missing ${label} endpoint: ${endpointId}`);
  }
  return endpoint;
}

function assertSamePacketSource(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected ${name} fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error(`Refusing unified construction from authorized ${name}.`);
  }
}

function assertInputs(inputs) {
  assertSamePacketSource(inputs.explicitPsiFormulaAttempt, "explicit Psi formula attempt");
  assertSamePacketSource(inputs.componentUnionChartCertificate, "component-union chart certificate");
  assertSamePacketSource(inputs.postComponentUnionMotionLayer, "post-component-union motion layer");
  assertSamePacketSource(inputs.boundaryBindingSourceDataAudit, "boundary-binding source-data audit");
  assertSamePacketSource(inputs.boundaryBindingConstructionAttempt, "boundary-binding construction attempt");
  assertSamePacketSource(inputs.residualDataConstructionAttempt, "residual-data construction attempt");
  const expectedStatuses = {
    explicitPsiFormulaAttempt: "fold_coordinate_endpoint_functional_explicit_psi_formula_attempt_fail_closed",
    componentUnionChartCertificate:
      "fold_coordinate_endpoint_functional_component_union_chart_certificate_partial_pass_replay_blocked",
    postComponentUnionMotionLayer:
      "fold_coordinate_endpoint_functional_post_component_union_endpoint_motion_full_evaluation_map_layer_attempt_fail_closed",
    boundaryBindingSourceDataAudit:
      "fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit_source_data_present_binding_absent",
    boundaryBindingConstructionAttempt:
      "fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt_fail_closed",
    residualDataConstructionAttempt:
      "one_leaf_active_endpoint_residual_data_construction_attempt_fail_closed_endpoint_functional_sources_only_no_row_residual_functions_no_row_consumption",
  };
  for (const [name, expectedStatus] of Object.entries(expectedStatuses)) {
    if (inputs[name].status !== expectedStatus) {
      throw new Error(`Unexpected ${name} status: ${inputs[name].status}`);
    }
  }
  const endpointSources = [
    inputs.explicitPsiFormulaAttempt.endpoint_explicit_psi_formula_attempts,
    inputs.componentUnionChartCertificate.endpoint_component_union_chart_certificates,
    inputs.postComponentUnionMotionLayer.endpoint_motion_evaluation_layer_attempts,
    inputs.boundaryBindingSourceDataAudit.endpoint_boundary_binding_source_data_audits,
    inputs.boundaryBindingConstructionAttempt.endpoint_boundary_binding_construction_attempts,
  ];
  for (const source of endpointSources) {
    if (!Array.isArray(source) || source.length !== 4) {
      throw new Error("Expected exactly 4 endpoint-functional source rows.");
    }
  }
  const rowSources = [
    inputs.explicitPsiFormulaAttempt.row_explicit_psi_formula_attempts,
    inputs.componentUnionChartCertificate.row_component_union_chart_certificates,
    inputs.postComponentUnionMotionLayer.row_motion_evaluation_layer_attempts,
    inputs.boundaryBindingSourceDataAudit.row_boundary_binding_source_data_audits,
    inputs.boundaryBindingConstructionAttempt.row_boundary_binding_construction_attempts,
    inputs.residualDataConstructionAttempt.row_active_endpoint_residual_data_construction_attempts,
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
    failure_codes: missingFields.map(
      (field) => `missing_unified_endpoint_boundary_motion_evaluation_${field}`
    ),
    passed: missingFields.length === 0,
  };
}

function endpointFields(explicitEndpoint, componentEndpoint, motionEndpoint, boundarySourceEndpoint, bindingEndpoint) {
  const explicit = explicitEndpoint.required_fields_present;
  const component = componentEndpoint.required_fields_present;
  const motion = motionEndpoint.required_fields_present;
  const boundarySource = boundarySourceEndpoint.required_fields_present;
  const binding = bindingEndpoint.required_fields_present;
  const fields = {
    local_formula_candidate_available: component.local_formula_candidate_available === true,
    local_derivative_formula_available: component.local_derivative_formula_available === true,
    component_endpoint_identities_exact: component.component_endpoint_identities_exact === true,
    component_union_domain_constructed: component.component_union_domain_constructed === true,
    component_union_coordinate_rule_constructed:
      component.component_union_coordinate_rule_constructed === true,
    component_union_no_double_counting_rule_constructed:
      component.component_union_no_double_counting_rule_constructed === true,
    target_endpoint_evaluation_locator_constructed:
      component.target_endpoint_evaluation_locator_constructed === true,
    target_action_exact_under_component_locator:
      component.target_action_exact_under_component_locator === true,
    opposite_endpoint_zero_under_component_locator:
      component.opposite_endpoint_zero_under_component_locator === true,
    endpoint_boundary_binding_source_data_ready:
      boundarySource.endpoint_boundary_binding_source_data_ready === true,
    endpoint_boundary_action_declared:
      boundarySource.endpoint_boundary_action_declared === true,
    boundary_delta_sign_consistent:
      boundarySource.boundary_delta_sign_consistent === true,
    target_endpoint_ref_declared:
      boundarySource.target_endpoint_ref_declared === true,
    target_endpoint_value_present:
      boundarySource.target_endpoint_value_present === true,
    evaluation_map_symbol_declared:
      motion.evaluation_map_symbol_declared === true ||
      boundarySource.evaluation_map_symbol_declared === true,
    endpoint_evaluation_rule_declared:
      motion.endpoint_evaluation_rule_declared === true ||
      boundarySource.endpoint_evaluation_rule_declared === true,
    endpoint_functional_domain_present:
      binding.endpoint_functional_domain_present === true,
    domain_chart_declared: binding.domain_chart_declared === true,
    domain_coordinate_rule_declared:
      binding.domain_coordinate_rule_declared === true,
    basis_vector_bound_to_domain:
      binding.basis_vector_bound_to_domain === true,
    endpoint_boundary_binding_constructed:
      binding.endpoint_boundary_binding_constructed === true,
    endpoint_value_bound_to_boundary_binding:
      binding.endpoint_value_bound_to_boundary_binding === true,
    same_packet_history_update_formula_present:
      binding.same_packet_history_update_formula_present === true,
    theta_support_present: binding.theta_support_present === true,
    basis_formula_present:
      binding.basis_formula_present === true &&
      explicit.basis_formula_present === true,
    basis_derivative_formula_present:
      binding.basis_derivative_formula_present === true &&
      explicit.basis_derivative_formula_present === true,
    x_update_basis_present: binding.x_update_basis_present === true,
    xdot_update_basis_present: binding.xdot_update_basis_present === true,
    mesh_update_rule_present: binding.mesh_update_rule_present === true,
    endpoint_motion_rule_constructed:
      binding.endpoint_motion_rule_constructed === true &&
      motion.endpoint_motion_rule_constructed === true,
    source_monotonicity_rule_present:
      binding.source_monotonicity_rule_present === true,
    receiver_monotonicity_rule_present:
      binding.receiver_monotonicity_rule_present === true,
    periodic_extension_rule_present:
      binding.periodic_extension_rule_present === true,
    c1_gluing_rule_present: binding.c1_gluing_rule_present === true,
    endpoint_evaluation_rule_constructed:
      binding.endpoint_evaluation_rule_constructed === true &&
      motion.endpoint_evaluation_rule_constructed === true,
    endpoint_value_bound_to_evaluation_map:
      binding.endpoint_value_bound_to_evaluation_map === true &&
      motion.endpoint_value_bound_to_evaluation_map === true,
    endpoint_evaluation_map_constructed:
      binding.endpoint_evaluation_map_constructed === true &&
      motion.endpoint_evaluation_map_constructed === true,
    target_action_exact_under_endpoint_evaluation_map:
      binding.target_action_exact_under_endpoint_evaluation_map === true &&
      motion.target_action_exact_under_endpoint_evaluation_map === true,
    non_target_endpoint_actions_enumerated:
      binding.non_target_endpoint_actions_enumerated === true &&
      motion.non_target_endpoint_actions_enumerated === true,
    non_target_endpoint_zero_certified:
      binding.non_target_endpoint_zero_certified === true &&
      motion.non_target_endpoint_zero_certified === true,
    full_endpoint_evaluation_map_constructed:
      binding.full_endpoint_evaluation_map_constructed === true &&
      motion.full_endpoint_evaluation_map_constructed === true,
    global_domain_evaluation_map_constructed:
      binding.global_domain_evaluation_map_constructed === true &&
      motion.global_domain_evaluation_map_constructed === true,
    exact_screen_zero_certified:
      binding.exact_screen_zero_certified === true &&
      motion.exact_screen_zero_certified === true,
    rank_certified:
      binding.rank_certified === true &&
      motion.rank_certified === true,
    binding_contract_satisfied: binding.binding_contract_satisfied === true,
    candidate_artifacts_present:
      binding.candidate_artifacts_present === true &&
      motion.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change:
      binding.root_topology_recertified_for_candidate_change === true &&
      motion.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change:
      binding.proof_interval_v1_v6_rerun_for_candidate_change === true &&
      motion.proof_interval_v1_v6_rerun_for_candidate_change === true,
  };
  fields.unified_boundary_motion_evaluation_ready = REQUIRED_ENDPOINT_FIELDS.every(
    (field) => fields[field] === true
  );
  return fields;
}

function buildEndpointAttempt(explicitEndpoint, componentEndpoint, motionEndpoint, boundarySourceEndpoint, bindingEndpoint) {
  const fields = endpointFields(
    explicitEndpoint,
    componentEndpoint,
    motionEndpoint,
    boundarySourceEndpoint,
    bindingEndpoint
  );
  const missingFields = REQUIRED_ENDPOINT_FIELDS.filter((field) => fields[field] !== true);
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
    required_fields_present: fields,
    construction_method_results: CONSTRUCTION_METHODS.map((method) => methodResult(method, fields)),
    missing_unified_construction_fields: missingFields,
    failure_codes: missingFields.map(
      (field) => `missing_unified_endpoint_boundary_motion_evaluation_${field}`
    ),
    unified_boundary_motion_evaluation_ready: fields.unified_boundary_motion_evaluation_ready,
    endpoint_boundary_binding_constructed: fields.endpoint_boundary_binding_constructed,
    endpoint_motion_rule_constructed: fields.endpoint_motion_rule_constructed,
    endpoint_evaluation_map_constructed: fields.endpoint_evaluation_map_constructed,
    full_endpoint_evaluation_map_constructed: fields.full_endpoint_evaluation_map_constructed,
    obstruction:
      "The endpoint has local Psi formula candidates, component-union chart data, target locators, boundary refs and values, and declared evaluation symbols, but it still lacks a same-packet endpoint boundary binding, history update formula, endpoint motion rule, endpoint evaluation map, non-target zero certificate, exact $B\\xi=0$, rank certificate, candidate artifacts, topology recertification, and proof-interval replay.",
  };
}

function buildRowAttempt(explicitRow, componentRow, motionRow, boundarySourceRow, bindingRow, residualRow) {
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
    combined_component_union_chart_pair_constructed:
      componentRow.required_fields_present.combined_component_union_chart_pair_constructed === true,
    row_boundary_binding_source_data_ready:
      boundarySourceRow.required_fields_present.row_boundary_binding_source_data_ready === true,
    source_endpoint_boundary_binding_constructed:
      bindingRow.required_fields_present.source_endpoint_boundary_binding_constructed === true,
    receiver_endpoint_boundary_binding_constructed:
      bindingRow.required_fields_present.receiver_endpoint_boundary_binding_constructed === true,
    source_endpoint_motion_rule_constructed:
      bindingRow.required_fields_present.source_endpoint_motion_rule_constructed === true &&
      motionRow.required_fields_present.source_endpoint_motion_rule_constructed === true,
    receiver_endpoint_motion_rule_constructed:
      bindingRow.required_fields_present.receiver_endpoint_motion_rule_constructed === true &&
      motionRow.required_fields_present.receiver_endpoint_motion_rule_constructed === true,
    combined_boundary_binding_pair_constructed:
      bindingRow.required_fields_present.combined_boundary_binding_pair_constructed === true,
    source_endpoint_evaluation_map_constructed:
      motionRow.required_fields_present.source_endpoint_evaluation_map_constructed === true,
    receiver_endpoint_evaluation_map_constructed:
      motionRow.required_fields_present.receiver_endpoint_evaluation_map_constructed === true,
    combined_endpoint_evaluation_map_pair_constructed:
      motionRow.required_fields_present.combined_endpoint_evaluation_map_pair_constructed === true,
    same_packet_history_update_formula_present:
      bindingRow.required_fields_present.same_packet_history_update_formula_present === true &&
      motionRow.required_fields_present.same_packet_history_update_formula_present === true,
    proof_grade_boundary_opening_certified:
      bindingRow.required_fields_present.proof_grade_boundary_opening_certified === true &&
      motionRow.required_fields_present.proof_grade_boundary_opening_certified === true,
    residual_data_construction_ready:
      residualRow.required_fields_present.residual_data_construction_ready === true,
    candidate_artifacts_present:
      bindingRow.required_fields_present.candidate_artifacts_present === true &&
      motionRow.required_fields_present.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change:
      bindingRow.required_fields_present.root_topology_recertified_for_candidate_change === true &&
      motionRow.required_fields_present.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change:
      bindingRow.required_fields_present.proof_interval_v1_v6_rerun_for_candidate_change === true &&
      motionRow.required_fields_present.proof_interval_v1_v6_rerun_for_candidate_change === true,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.unified_boundary_motion_evaluation_ready = REQUIRED_ROW_FIELDS.every(
    (field) => fields[field] === true
  );
  const missingFields = REQUIRED_ROW_FIELDS.filter((field) => fields[field] !== true);
  return {
    row_id: componentRow.row_id,
    source_interval: componentRow.source_interval,
    receiver_interval: componentRow.receiver_interval,
    failed_side: componentRow.failed_side,
    boundary_side: boundarySourceRow.boundary_side,
    source_variable: boundarySourceRow.source_variable,
    receiver_variable: boundarySourceRow.receiver_variable,
    source_boundary_ref: boundarySourceRow.source_boundary_ref,
    receiver_boundary_ref: boundarySourceRow.receiver_boundary_ref,
    required_fields_present: fields,
    missing_unified_construction_fields: missingFields,
    failure_codes: missingFields.map(
      (field) => `missing_unified_endpoint_boundary_motion_evaluation_${field}`
    ),
    unified_boundary_motion_evaluation_ready: fields.unified_boundary_motion_evaluation_ready,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source and receiver local formula candidates, component-union charts, boundary source data, and sampled residual-data sources, but it has no source/receiver boundary-binding pair, endpoint motion rules, endpoint evaluation-map pair, same-packet replay, or row consumption.",
  };
}

function buildAttempt(inputs, paths) {
  assertInputs(inputs);
  const explicitEndpoints = idMap(
    inputs.explicitPsiFormulaAttempt.endpoint_explicit_psi_formula_attempts,
    "explicit Psi formula endpoint"
  );
  const componentEndpoints = idMap(
    inputs.componentUnionChartCertificate.endpoint_component_union_chart_certificates,
    "component-union endpoint"
  );
  const motionEndpoints = idMap(
    inputs.postComponentUnionMotionLayer.endpoint_motion_evaluation_layer_attempts,
    "motion/evaluation endpoint"
  );
  const boundarySourceEndpoints = idMap(
    inputs.boundaryBindingSourceDataAudit.endpoint_boundary_binding_source_data_audits,
    "boundary source endpoint"
  );
  const bindingEndpoints = idMap(
    inputs.boundaryBindingConstructionAttempt.endpoint_boundary_binding_construction_attempts,
    "boundary construction endpoint"
  );
  const endpointAttempts = inputs.componentUnionChartCertificate.endpoint_component_union_chart_certificates.map(
    (componentEndpoint) =>
      buildEndpointAttempt(
        requireMatchingEndpoint(explicitEndpoints, componentEndpoint.id, "explicit Psi formula endpoint"),
        componentEndpoint,
        requireMatchingEndpoint(motionEndpoints, componentEndpoint.id, "motion/evaluation endpoint"),
        requireMatchingEndpoint(boundarySourceEndpoints, componentEndpoint.id, "boundary source endpoint"),
        requireMatchingEndpoint(bindingEndpoints, componentEndpoint.id, "boundary construction endpoint")
      )
  );

  const explicitRows = rowMap(
    inputs.explicitPsiFormulaAttempt.row_explicit_psi_formula_attempts,
    "explicit Psi formula row"
  );
  const componentRows = rowMap(
    inputs.componentUnionChartCertificate.row_component_union_chart_certificates,
    "component-union row"
  );
  const motionRows = rowMap(
    inputs.postComponentUnionMotionLayer.row_motion_evaluation_layer_attempts,
    "motion/evaluation row"
  );
  const boundarySourceRows = rowMap(
    inputs.boundaryBindingSourceDataAudit.row_boundary_binding_source_data_audits,
    "boundary source row"
  );
  const bindingRows = rowMap(
    inputs.boundaryBindingConstructionAttempt.row_boundary_binding_construction_attempts,
    "boundary construction row"
  );
  const residualRows = rowMap(
    inputs.residualDataConstructionAttempt.row_active_endpoint_residual_data_construction_attempts,
    "residual data row"
  );
  const rowAttempts = inputs.componentUnionChartCertificate.row_component_union_chart_certificates.map(
    (componentRow) =>
      buildRowAttempt(
        requireMatchingRow(explicitRows, componentRow.row_id, "explicit Psi formula row"),
        componentRow,
        requireMatchingRow(motionRows, componentRow.row_id, "motion/evaluation row"),
        requireMatchingRow(boundarySourceRows, componentRow.row_id, "boundary source row"),
        requireMatchingRow(bindingRows, componentRow.row_id, "boundary construction row"),
        requireMatchingRow(residualRows, componentRow.row_id, "residual data row")
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
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-boundary-binding-motion-evaluation-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status:
      "fold_coordinate_endpoint_functional_boundary_binding_motion_evaluation_construction_attempt_fail_closed_source_data_only_no_bindings_no_motion_no_evaluation_maps_no_row_consumption",
    theorem_target: "Endpoint Boundary-Binding Motion/Evaluation Construction Attempt",
    claim_level:
      "priority-only unified endpoint-functional construction attempt; local formula candidates, component-union charts, target locators, and boundary source data exist, but same-packet endpoint boundary bindings, motion rules, endpoint evaluation maps, replay, and row consumption are absent",
    source_artifacts: {
      explicit_psi_formula_attempt: artifactRecord(paths.explicitPsiFormulaAttempt),
      component_union_chart_certificate: artifactRecord(paths.componentUnionChartCertificate),
      post_component_union_motion_layer: artifactRecord(paths.postComponentUnionMotionLayer),
      boundary_binding_source_data_audit: artifactRecord(paths.boundaryBindingSourceDataAudit),
      boundary_binding_construction_attempt: artifactRecord(paths.boundaryBindingConstructionAttempt),
      residual_data_construction_attempt: artifactRecord(paths.residualDataConstructionAttempt),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      endpoint_local_formula_promoted_to_binding: false,
      component_union_chart_promoted_to_motion_rule: false,
      boundary_source_data_promoted_to_endpoint_binding: false,
      evaluation_symbol_promoted_to_endpoint_map: false,
      endpoint_map_promoted_to_candidate_replay: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    construction_rule:
      "A unified endpoint boundary-binding motion/evaluation packet passes only when each endpoint functional has a same-packet endpoint-functional domain, domain chart, coordinate rule, basis-domain binding, endpoint boundary binding, endpoint value binding, history update formula, endpoint motion rule, endpoint evaluation map, non-target zero certificate, exact $B\\xi=0$ certificate, rank certificate, candidate artifacts, topology recertification, and proof-interval v1-v6 replay.",
    no_promotion_rule:
      "Local Psi formulas, component-union charts, endpoint refs and values, target locators, and declared evaluation-map symbols are source data only. They do not define a same-packet endpoint boundary binding, endpoint motion rule, endpoint evaluation map, row residual function, row consumption, or branch-chart authorization.",
    construction_methods: CONSTRUCTION_METHODS,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      rows: rowAttempts.length,
      local_formula_candidate_functionals:
        endpointFieldCounts.local_formula_candidate_available,
      local_derivative_formula_candidate_functionals:
        endpointFieldCounts.local_derivative_formula_available,
      component_endpoint_identity_functionals:
        endpointFieldCounts.component_endpoint_identities_exact,
      component_union_chart_functionals:
        endpointFieldCounts.component_union_domain_constructed,
      target_endpoint_locator_functionals:
        endpointFieldCounts.target_endpoint_evaluation_locator_constructed,
      opposite_endpoint_zero_locator_functionals:
        endpointFieldCounts.opposite_endpoint_zero_under_component_locator,
      endpoint_boundary_source_data_functionals:
        endpointFieldCounts.endpoint_boundary_binding_source_data_ready,
      evaluation_map_symbol_declared_functionals:
        endpointFieldCounts.evaluation_map_symbol_declared,
      endpoint_evaluation_rule_declared_functionals:
        endpointFieldCounts.endpoint_evaluation_rule_declared,
      endpoint_functional_domain_functionals:
        endpointFieldCounts.endpoint_functional_domain_present,
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
      endpoint_evaluation_rule_constructed_functionals:
        endpointFieldCounts.endpoint_evaluation_rule_constructed,
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
      unified_endpoint_ready_functionals:
        endpointFieldCounts.unified_boundary_motion_evaluation_ready,
      row_component_union_chart_pairs:
        rowFieldCounts.combined_component_union_chart_pair_constructed,
      row_boundary_source_data_pairs:
        rowFieldCounts.row_boundary_binding_source_data_ready,
      row_boundary_binding_pairs:
        rowFieldCounts.combined_boundary_binding_pair_constructed,
      row_endpoint_motion_rule_pairs:
        Math.min(
          rowFieldCounts.source_endpoint_motion_rule_constructed,
          rowFieldCounts.receiver_endpoint_motion_rule_constructed
        ),
      row_endpoint_evaluation_map_pairs:
        rowFieldCounts.combined_endpoint_evaluation_map_pair_constructed,
      row_same_packet_history_update_formulas:
        rowFieldCounts.same_packet_history_update_formula_present,
      proof_grade_boundary_opening_rows:
        rowFieldCounts.proof_grade_boundary_opening_certified,
      row_residual_data_ready:
        rowFieldCounts.residual_data_construction_ready,
      unified_row_ready_count:
        rowFieldCounts.unified_boundary_motion_evaluation_ready,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    endpoint_boundary_binding_motion_evaluation_construction_attempts: endpointAttempts,
    row_boundary_binding_motion_evaluation_construction_attempts: rowAttempts,
    capture_decision:
      "Priority-only. The attempt preserves formula, chart, locator, and boundary-source data, but fail-closes because it constructs 0 same-packet endpoint boundary bindings, 0 same-packet history update formulas, 0 endpoint motion rules, 0 endpoint evaluation maps, 0 non-target zero certificates, 0 exact $B\\xi=0$ certificates, 0 rank certificates, 0 candidate artifacts, 0 topology recertifications, 0 proof-interval replays, 0 row-ready pairs, and 0 consumed rows.",
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
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.local_formula_candidate_available} | ${endpoint.required_fields_present.component_union_domain_constructed} | ${endpoint.required_fields_present.endpoint_boundary_binding_source_data_ready} | ${endpoint.required_fields_present.endpoint_boundary_binding_constructed} | ${endpoint.required_fields_present.endpoint_motion_rule_constructed} | ${endpoint.required_fields_present.endpoint_evaluation_map_constructed} | ${endpoint.unified_boundary_motion_evaluation_ready} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_component_union_chart_pair_constructed} | ${row.required_fields_present.row_boundary_binding_source_data_ready} | ${row.required_fields_present.combined_boundary_binding_pair_constructed} | ${row.required_fields_present.combined_endpoint_evaluation_map_pair_constructed} | ${row.required_fields_present.residual_data_construction_ready} | ${row.unified_boundary_motion_evaluation_ready} |`
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
  return `# Higher-Fold Endpoint Boundary-Binding Motion/Evaluation Construction Attempt

## Verdict

Status: \`${attempt.status}\`.

This priority-only construction attempt tests the missing same-packet object
identified by the one-leaf active-endpoint residual-data construction attempt:
whether the current endpoint-functional source stack can construct endpoint
boundary bindings, endpoint motion rules, endpoint evaluation maps, and replay
authority in one packet.

The packet fail-closes. It preserves ${summary.local_formula_candidate_functionals}
/ ${summary.endpoint_functionals} local formula candidates,
${summary.local_derivative_formula_candidate_functionals} / ${summary.endpoint_functionals}
local derivative candidates, ${summary.component_union_chart_functionals} /
${summary.endpoint_functionals} component-union chart functionals,
${summary.target_endpoint_locator_functionals} / ${summary.endpoint_functionals}
target endpoint locators, ${summary.endpoint_boundary_source_data_functionals} /
${summary.endpoint_functionals} boundary source-data functionals,
${summary.evaluation_map_symbol_declared_functionals} / ${summary.endpoint_functionals}
evaluation-map symbols, and ${summary.row_boundary_source_data_pairs} /
${summary.rows} row boundary-source pairs. It constructs 0 /
${summary.endpoint_functionals} endpoint-functional domains, 0 /
${summary.endpoint_functionals} endpoint boundary bindings, 0 /
${summary.endpoint_functionals} same-packet history update formulas, 0 /
${summary.endpoint_functionals} endpoint motion rules, 0 /
${summary.endpoint_functionals} endpoint evaluation maps, 0 /
${summary.endpoint_functionals} full endpoint evaluation maps, 0 /
${summary.endpoint_functionals} non-target zero certificates, 0 /
${summary.endpoint_functionals} exact $B\\xi=0$ certificates, 0 /
${summary.endpoint_functionals} rank certificates, 0 /
${summary.endpoint_functionals} candidate artifacts, 0 /
${summary.endpoint_functionals} topology recertifications, 0 /
${summary.endpoint_functionals} proof-interval replays, 0 /
${summary.rows} row endpoint-evaluation pairs, 0 / ${summary.rows} residual-data
ready rows, and 0 consumed rows.

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

## Endpoint Attempts

| Endpoint | Role | Formula candidate | Component union | Boundary source data | Boundary binding | Motion rule | Evaluation map | Unified ready |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(attempt.endpoint_boundary_binding_motion_evaluation_construction_attempts)}

## Row Attempts

| Row | Failed side | Component-union pair | Boundary source data | Boundary-binding pair | Evaluation-map pair | Residual data ready | Unified ready |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(attempt.row_boundary_binding_motion_evaluation_construction_attempts)}

## Endpoint Field Counts

| Field | Present count |
| --- | ---: |
${countTable(attempt.endpoint_field_counts, summary.endpoint_functionals)}

## Row Field Counts

| Field | Present count |
| --- | ---: |
${countTable(attempt.row_field_counts, summary.rows)}

## Construction Blocker

The next constructive proof object is an actual same-packet endpoint
history-realization layer: endpoint boundary bindings, history update formulas,
endpoint motion rules, endpoint evaluation maps, non-target zero certificates,
exact $B\\xi=0$ and rank certificates, candidate artifacts, topology
recertification, and proof-interval replay. The present local formula and
component-union chart data are not enough to define row residual functions or
consume one-leaf rows.

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
    postComponentUnionMotionLayer: readJson(args.postComponentUnionMotionLayer),
    boundaryBindingSourceDataAudit: readJson(args.boundaryBindingSourceDataAudit),
    boundaryBindingConstructionAttempt: readJson(args.boundaryBindingConstructionAttempt),
    residualDataConstructionAttempt: readJson(args.residualDataConstructionAttempt),
  };
  const paths = {
    explicitPsiFormulaAttempt: args.explicitPsiFormulaAttempt,
    componentUnionChartCertificate: args.componentUnionChartCertificate,
    postComponentUnionMotionLayer: args.postComponentUnionMotionLayer,
    boundaryBindingSourceDataAudit: args.boundaryBindingSourceDataAudit,
    boundaryBindingConstructionAttempt: args.boundaryBindingConstructionAttempt,
    residualDataConstructionAttempt: args.residualDataConstructionAttempt,
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
