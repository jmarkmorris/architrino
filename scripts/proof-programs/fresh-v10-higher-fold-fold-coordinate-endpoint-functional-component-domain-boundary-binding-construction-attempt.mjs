#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_COMPONENT_DOMAIN_SUBCERTIFICATE = `${CERT_DIR}/fold_coordinate_endpoint_functional_component_union_domain_binding_subcertificate.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BOUNDARY_BINDING_SOURCE_DATA_AUDIT = `${CERT_DIR}/fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BOUNDARY_BINDING_MOTION_EVALUATION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_boundary_binding_motion_evaluation_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_component_domain_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_component_domain_endpoint_boundary_binding_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_FIELDS = [
  "component_domain_binding_subcertificate_constructed",
  "component_domain_subcertificate_ready",
  "endpoint_functional_domain_present",
  "domain_chart_declared",
  "domain_coordinate_rule_declared",
  "basis_vector_bound_to_domain",
  "theta_support_present",
  "basis_formula_present",
  "basis_derivative_formula_present",
  "target_action_exact_under_component_locator",
  "opposite_endpoint_zero_under_component_locator",
  "endpoint_boundary_binding_source_data_ready",
  "endpoint_boundary_action_declared",
  "boundary_delta_sign_consistent",
  "target_endpoint_ref_declared",
  "target_endpoint_value_present",
  "evaluation_map_symbol_declared",
  "endpoint_evaluation_rule_declared",
  "component_domain_and_boundary_source_ready",
  "endpoint_boundary_binding_constructed",
  "endpoint_value_bound_to_boundary_binding",
  "binding_contract_satisfied",
  "same_packet_history_update_formula_present",
  "endpoint_motion_rule_constructed",
  "endpoint_evaluation_map_constructed",
  "full_endpoint_evaluation_map_constructed",
  "global_domain_evaluation_map_constructed",
  "non_target_endpoint_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_component_domain_subcertificate_constructed",
  "receiver_component_domain_subcertificate_constructed",
  "combined_component_domain_pair_constructed",
  "row_boundary_binding_source_data_ready",
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
  "row_consumed",
  "branch_chart_authorized",
  "component_domain_boundary_source_pair_ready",
];

const BLOCKED_ENDPOINT_FIELDS = [
  "endpoint_boundary_binding_constructed",
  "endpoint_value_bound_to_boundary_binding",
  "binding_contract_satisfied",
  "same_packet_history_update_formula_present",
  "endpoint_motion_rule_constructed",
  "endpoint_evaluation_map_constructed",
  "full_endpoint_evaluation_map_constructed",
  "global_domain_evaluation_map_constructed",
  "non_target_endpoint_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "component_domain_plus_boundary_source_as_endpoint_boundary_binding",
    description:
      "Test whether the component-domain subcertificate and endpoint boundary source data already constitute a full endpoint boundary binding.",
    required_fields: [
      "component_domain_binding_subcertificate_constructed",
      "endpoint_boundary_binding_source_data_ready",
      "target_endpoint_ref_declared",
      "target_endpoint_value_present",
      "endpoint_boundary_action_declared",
      "boundary_delta_sign_consistent",
      "endpoint_boundary_binding_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "binding_contract_satisfied",
    ],
  },
  {
    method_id: "component_domain_value_ref_as_endpoint_value_binding",
    description:
      "Test whether the declared target endpoint refs and values are already bound to a constructed endpoint boundary binding.",
    required_fields: [
      "component_domain_binding_subcertificate_constructed",
      "target_endpoint_ref_declared",
      "target_endpoint_value_present",
      "endpoint_boundary_binding_constructed",
      "endpoint_value_bound_to_boundary_binding",
    ],
  },
  {
    method_id: "signed_boundary_action_as_binding_contract",
    description:
      "Test whether the signed boundary action and component locator already satisfy the endpoint boundary-binding contract.",
    required_fields: [
      "target_action_exact_under_component_locator",
      "boundary_delta_sign_consistent",
      "endpoint_boundary_binding_constructed",
      "binding_contract_satisfied",
    ],
  },
  {
    method_id: "boundary_binding_as_motion_entrypoint",
    description:
      "Test whether any constructed endpoint boundary binding also supplies same-packet history update and endpoint motion semantics.",
    required_fields: [
      "endpoint_boundary_binding_constructed",
      "same_packet_history_update_formula_present",
      "endpoint_motion_rule_constructed",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    componentDomainSubcertificate: DEFAULT_COMPONENT_DOMAIN_SUBCERTIFICATE,
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
    } else if (arg === "--component-domain-subcertificate") {
      args.componentDomainSubcertificate = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-component-domain-boundary-binding-construction-attempt.mjs [options]

Options:
  --component-domain-subcertificate PATH          Component-domain subcertificate JSON. Defaults to ${DEFAULT_COMPONENT_DOMAIN_SUBCERTIFICATE}.
  --boundary-binding-source-data-audit PATH       Boundary-binding source-data audit JSON. Defaults to ${DEFAULT_BOUNDARY_BINDING_SOURCE_DATA_AUDIT}.
  --boundary-binding-construction-attempt PATH    Earlier boundary-binding construction attempt JSON. Defaults to ${DEFAULT_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT}.
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
    throw new Error(`Refusing boundary-binding construction from authorized ${name}.`);
  }
}

function assertInputs(inputs) {
  assertSamePacketSource(inputs.componentDomainSubcertificate, "component-domain subcertificate");
  assertSamePacketSource(inputs.boundaryBindingSourceDataAudit, "boundary-binding source-data audit");
  assertSamePacketSource(inputs.boundaryBindingConstructionAttempt, "boundary-binding construction attempt");
  assertSamePacketSource(inputs.boundaryBindingMotionEvaluationAttempt, "boundary-binding motion/evaluation attempt");
  const expectedStatuses = {
    componentDomainSubcertificate:
      "fold_coordinate_endpoint_functional_component_union_domain_binding_subcertificate_partial_pass_boundary_binding_motion_evaluation_blocked",
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
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `missing_component_domain_boundary_binding_${field}`),
    passed: missingFields.length === 0,
  };
}

function endpointFields(domainEndpoint, sourceEndpoint, bindingEndpoint, motionEndpoint) {
  const domain = domainEndpoint.required_fields_present;
  const source = sourceEndpoint.required_fields_present;
  const binding = bindingEndpoint.required_fields_present;
  const motion = motionEndpoint.required_fields_present;
  const fields = {
    component_domain_binding_subcertificate_constructed:
      domain.component_domain_binding_subcertificate_constructed === true,
    component_domain_subcertificate_ready: domain.component_domain_subcertificate_ready === true,
    endpoint_functional_domain_present: domain.endpoint_functional_domain_present === true,
    domain_chart_declared: domain.domain_chart_declared === true,
    domain_coordinate_rule_declared: domain.domain_coordinate_rule_declared === true,
    basis_vector_bound_to_domain: domain.basis_vector_bound_to_domain === true,
    theta_support_present: domain.theta_support_present === true,
    basis_formula_present: domain.basis_formula_present === true,
    basis_derivative_formula_present: domain.basis_derivative_formula_present === true,
    target_action_exact_under_component_locator:
      domain.target_action_exact_under_component_locator === true,
    opposite_endpoint_zero_under_component_locator:
      domain.opposite_endpoint_zero_under_component_locator === true,
    endpoint_boundary_binding_source_data_ready:
      source.endpoint_boundary_binding_source_data_ready === true,
    endpoint_boundary_action_declared: source.endpoint_boundary_action_declared === true,
    boundary_delta_sign_consistent: source.boundary_delta_sign_consistent === true,
    target_endpoint_ref_declared: source.target_endpoint_ref_declared === true,
    target_endpoint_value_present: source.target_endpoint_value_present === true,
    evaluation_map_symbol_declared:
      domain.evaluation_map_symbol_declared === true || source.evaluation_map_symbol_declared === true,
    endpoint_evaluation_rule_declared: source.endpoint_evaluation_rule_declared === true,
    endpoint_boundary_binding_constructed:
      binding.endpoint_boundary_binding_constructed === true || motion.endpoint_boundary_binding_constructed === true,
    endpoint_value_bound_to_boundary_binding:
      binding.endpoint_value_bound_to_boundary_binding === true,
    binding_contract_satisfied:
      binding.binding_contract_satisfied === true || source.binding_contract_satisfied === true,
    same_packet_history_update_formula_present:
      binding.same_packet_history_update_formula_present === true ||
      motion.same_packet_history_update_formula_present === true,
    endpoint_motion_rule_constructed:
      binding.endpoint_motion_rule_constructed === true || motion.endpoint_motion_rule_constructed === true,
    endpoint_evaluation_map_constructed:
      binding.endpoint_evaluation_map_constructed === true ||
      motion.endpoint_evaluation_map_constructed === true,
    full_endpoint_evaluation_map_constructed:
      binding.full_endpoint_evaluation_map_constructed === true ||
      motion.full_endpoint_evaluation_map_constructed === true,
    global_domain_evaluation_map_constructed:
      binding.global_domain_evaluation_map_constructed === true ||
      motion.global_domain_evaluation_map_constructed === true,
    non_target_endpoint_zero_certified:
      binding.non_target_endpoint_zero_certified === true ||
      motion.non_target_endpoint_zero_certified === true,
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
  fields.component_domain_and_boundary_source_ready =
    fields.component_domain_binding_subcertificate_constructed &&
    fields.endpoint_boundary_binding_source_data_ready &&
    fields.target_endpoint_ref_declared &&
    fields.target_endpoint_value_present &&
    fields.endpoint_boundary_action_declared &&
    fields.boundary_delta_sign_consistent &&
    BLOCKED_ENDPOINT_FIELDS.every((field) => fields[field] !== true);
  return fields;
}

function buildEndpointAttempt(domainEndpoint, sourceEndpoint, bindingEndpoint, motionEndpoint) {
  const fields = endpointFields(domainEndpoint, sourceEndpoint, bindingEndpoint, motionEndpoint);
  const methodResults = CONSTRUCTION_METHODS.map((method) => methodResult(method, fields));
  const blockedFields = BLOCKED_ENDPOINT_FIELDS.filter((field) => fields[field] !== true);
  return {
    id: domainEndpoint.id,
    endpoint_functional_id: domainEndpoint.endpoint_functional_id,
    role: domainEndpoint.role,
    basis_symbol: domainEndpoint.basis_symbol,
    source_symbol: domainEndpoint.source_symbol,
    row_uses: domainEndpoint.row_uses,
    target_equation: domainEndpoint.target_equation,
    target_action: domainEndpoint.target_action,
    target_sign: domainEndpoint.target_sign,
    domain_symbol: domainEndpoint.domain_symbol,
    chart_symbol: domainEndpoint.chart_symbol,
    evaluation_map_symbol: domainEndpoint.evaluation_map_symbol,
    support_interval_ids: domainEndpoint.support_interval_ids,
    support_union_kind: domainEndpoint.support_union_kind,
    component_union_chart: domainEndpoint.component_union_chart,
    support_components: domainEndpoint.support_components,
    target_endpoint_refs: sourceEndpoint.target_endpoint_refs,
    boundary_actions: sourceEndpoint.boundary_actions,
    boundary_delta_signs: sourceEndpoint.boundary_delta_signs,
    required_fields_present: fields,
    construction_method_results: methodResults,
    promotion_methods_passed: methodResults.filter((method) => method.passed).map((method) => method.method_id),
    component_domain_and_boundary_source_ready: fields.component_domain_and_boundary_source_ready,
    missing_boundary_binding_fields: blockedFields,
    failure_codes: blockedFields.map((field) => `component_domain_boundary_binding_retains_blocker_${field}`),
    endpoint_boundary_binding_constructed: fields.endpoint_boundary_binding_constructed,
    endpoint_value_bound_to_boundary_binding: fields.endpoint_value_bound_to_boundary_binding,
    binding_contract_satisfied: fields.binding_contract_satisfied,
    endpoint_motion_rule_constructed: fields.endpoint_motion_rule_constructed,
    obstruction:
      "The endpoint now has a component-domain subcertificate, target endpoint refs and values, signed boundary action data, declared evaluation symbol, and declared endpoint evaluation rule. Those facts are necessary source data for a boundary binding, but no same-packet object constructs an endpoint boundary binding, binds endpoint values to that boundary binding, or satisfies the boundary-binding contract.",
  };
}

function buildRowAttempt(domainRow, sourceRow, bindingRow, motionRow, endpointAttempts) {
  const endpointById = new Map(endpointAttempts.map((endpoint) => [endpoint.id, endpoint]));
  const sourceEndpoint = endpointById.get(domainRow.source_variable);
  const receiverEndpoint = endpointById.get(domainRow.receiver_variable);
  if (!sourceEndpoint || !receiverEndpoint) {
    throw new Error(`Missing endpoint pair for row: ${domainRow.row_id}`);
  }
  const fields = {
    row_locator_resolved: sourceRow.required_fields_present.row_locator_resolved === true,
    source_component_domain_subcertificate_constructed:
      sourceEndpoint.required_fields_present.component_domain_binding_subcertificate_constructed === true,
    receiver_component_domain_subcertificate_constructed:
      receiverEndpoint.required_fields_present.component_domain_binding_subcertificate_constructed === true,
    combined_component_domain_pair_constructed:
      domainRow.required_fields_present.combined_component_domain_pair_constructed === true,
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
  fields.component_domain_boundary_source_pair_ready =
    fields.combined_component_domain_pair_constructed &&
    fields.row_boundary_binding_source_data_ready &&
    !fields.combined_boundary_binding_pair_constructed &&
    !fields.combined_endpoint_evaluation_map_pair_constructed;
  return {
    row_id: domainRow.row_id,
    source_interval: domainRow.source_interval,
    receiver_interval: domainRow.receiver_interval,
    failed_side: domainRow.failed_side,
    boundary_side: sourceRow.boundary_side,
    source_variable: domainRow.source_variable,
    receiver_variable: domainRow.receiver_variable,
    source_boundary_ref: sourceRow.source_boundary_ref,
    receiver_boundary_ref: sourceRow.receiver_boundary_ref,
    source_boundary_value: sourceRow.source_boundary_value,
    receiver_boundary_value: sourceRow.receiver_boundary_value,
    required_fields_present: fields,
    component_domain_boundary_source_pair_ready: fields.component_domain_boundary_source_pair_ready,
    missing_boundary_binding_fields: [
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
      "The row has source/receiver component-domain subcertificates and boundary-source data, but its source and receiver endpoints still lack boundary bindings. No endpoint motion pair, endpoint evaluation-map pair, proof-grade boundary opening, residual data construction, replay, or row consumption follows.",
  };
}

function buildAttempt(inputs, paths) {
  assertInputs(inputs);
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
  const endpointAttempts = inputs.componentDomainSubcertificate.endpoint_component_union_domain_binding_subcertificates.map(
    (domainEndpoint) =>
      buildEndpointAttempt(
        domainEndpoint,
        requireEndpoint(sourceEndpoints, domainEndpoint.id, "boundary source"),
        requireEndpoint(bindingEndpoints, domainEndpoint.id, "boundary construction"),
        requireEndpoint(motionEndpoints, domainEndpoint.id, "boundary motion/evaluation")
      )
  );

  const sourceRows = rowMap(inputs.boundaryBindingSourceDataAudit.row_boundary_binding_source_data_audits, "boundary source");
  const bindingRows = rowMap(
    inputs.boundaryBindingConstructionAttempt.row_boundary_binding_construction_attempts,
    "boundary construction"
  );
  const motionRows = rowMap(
    inputs.boundaryBindingMotionEvaluationAttempt.row_boundary_binding_motion_evaluation_construction_attempts,
    "boundary motion/evaluation"
  );
  const rowAttempts = inputs.componentDomainSubcertificate.row_component_union_domain_binding_subcertificates.map(
    (domainRow) =>
      buildRowAttempt(
        domainRow,
        requireRow(sourceRows, domainRow.row_id, "boundary source"),
        requireRow(bindingRows, domainRow.row_id, "boundary construction"),
        requireRow(motionRows, domainRow.row_id, "boundary motion/evaluation"),
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
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-post-component-union-endpoint-boundary-binding-construction-attempt-v2",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status:
      "fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt_fail_closed_component_domain_basis_source_data_only_no_boundary_binding_no_value_binding_no_contract",
    theorem_target: "Endpoint-Functional Component-Domain Boundary-Binding Construction Attempt",
    claim_level:
      "priority-only construction attempt; component-domain and boundary-source data are jointly ready, but no endpoint boundary binding, endpoint value binding, binding contract, motion rule, evaluation map, certificate, replay, or row consumption is constructed",
    source_artifacts: {
      component_domain_subcertificate: artifactRecord(paths.componentDomainSubcertificate),
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
      component_domain_subcertificate_imported: true,
      boundary_source_data_imported: true,
      endpoint_boundary_binding_constructed: false,
      endpoint_value_bound_to_boundary_binding: false,
      binding_contract_satisfied: false,
      endpoint_motion_rule_constructed: false,
      endpoint_evaluation_map_constructed: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    construction_rule:
      "A component-domain plus boundary-source construction attempt may pass its ready layer when each endpoint has the component-domain subcertificate, target endpoint refs and values, declared boundary action, and consistent signed boundary data. It may not pass endpoint boundary binding unless the same packet constructs a boundary-binding object, binds the endpoint values to that object, and satisfies the binding contract.",
    no_promotion_rule:
      "The component-domain subcertificate imports a genuine endpoint-functional domain/basis layer and verified boundary source data. It does not construct an endpoint boundary binding, does not bind the endpoint value to such a binding, and does not satisfy the binding contract. Row-local endpoint values, component locators, declared evaluation rules, and component-domain basis data remain inputs only; they cannot be promoted to boundary binding, endpoint motion, evaluation maps, candidate artifacts, replay, row consumption, preledger pass, or branch-chart authorization without new same-packet proof data.",
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
      basis_formula_functionals: endpointFieldCounts.basis_formula_present,
      basis_derivative_formula_functionals:
        endpointFieldCounts.basis_derivative_formula_present,
      target_action_locator_exact_functionals:
        endpointFieldCounts.target_action_exact_under_component_locator,
      opposite_endpoint_zero_locator_functionals:
        endpointFieldCounts.opposite_endpoint_zero_under_component_locator,
      endpoint_boundary_source_data_functionals:
        endpointFieldCounts.endpoint_boundary_binding_source_data_ready,
      endpoint_boundary_action_declared_functionals:
        endpointFieldCounts.endpoint_boundary_action_declared,
      boundary_delta_sign_consistent_functionals:
        endpointFieldCounts.boundary_delta_sign_consistent,
      target_endpoint_ref_declared_functionals:
        endpointFieldCounts.target_endpoint_ref_declared,
      target_endpoint_value_present_functionals:
        endpointFieldCounts.target_endpoint_value_present,
      component_domain_and_boundary_source_ready_functionals:
        endpointFieldCounts.component_domain_and_boundary_source_ready,
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
      row_component_domain_boundary_source_pairs_ready:
        rowFieldCounts.component_domain_boundary_source_pair_ready,
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
    endpoint_component_domain_boundary_binding_attempts: endpointAttempts,
    row_component_domain_boundary_binding_attempts: rowAttempts,
    capture_decision:
      "Priority-only. The packet confirms that the component-domain subcertificate and boundary source data are jointly ready for 4 / 4 endpoint variables and 3 / 3 one-leaf row pairs, but it constructs 0 endpoint boundary bindings, 0 endpoint value bindings, 0 binding contracts, 0 endpoint motion rules, 0 endpoint evaluation maps, 0 non-target zero certificates, 0 exact $B\\xi=0$ certificates, 0 rank certificates, 0 candidate artifacts, 0 topology recertifications, 0 proof-interval replays, and 0 consumed rows.",
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
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.component_domain_binding_subcertificate_constructed} | ${endpoint.required_fields_present.endpoint_boundary_binding_source_data_ready} | ${endpoint.required_fields_present.component_domain_and_boundary_source_ready} | ${endpoint.required_fields_present.endpoint_boundary_binding_constructed} | ${endpoint.required_fields_present.endpoint_value_bound_to_boundary_binding} | ${endpoint.required_fields_present.binding_contract_satisfied} | ${endpoint.required_fields_present.endpoint_motion_rule_constructed} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_component_domain_pair_constructed} | ${row.required_fields_present.row_boundary_binding_source_data_ready} | ${row.required_fields_present.component_domain_boundary_source_pair_ready} | ${row.required_fields_present.combined_boundary_binding_pair_constructed} | ${row.required_fields_present.combined_endpoint_evaluation_map_pair_constructed} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Component-Domain Boundary-Binding Construction Attempt

## Verdict

Status: \`${attempt.status}\`.

This priority-only construction attempt imports the component-domain
subcertificate after the earlier boundary-binding construction failed without a
domain/basis layer. It tests the next narrower question: whether
component-domain data plus endpoint boundary source data already construct
endpoint boundary bindings, endpoint value bindings, and binding contracts.

The attempt fail-closes. It verifies
${summary.component_domain_subcertificate_functionals} / ${summary.endpoint_functionals}
component-domain subcertificates,
${summary.endpoint_functional_domain_functionals} / ${summary.endpoint_functionals}
endpoint-functional domains,
${summary.domain_chart_declared_functionals} / ${summary.endpoint_functionals}
domain charts,
${summary.domain_coordinate_rule_declared_functionals} / ${summary.endpoint_functionals}
domain coordinate rules,
${summary.basis_vector_bound_to_domain_functionals} / ${summary.endpoint_functionals}
basis-domain bindings,
${summary.theta_support_functionals} / ${summary.endpoint_functionals} theta
supports,
${summary.basis_formula_functionals} / ${summary.endpoint_functionals} basis
formulas,
${summary.basis_derivative_formula_functionals} / ${summary.endpoint_functionals}
derivative formulas,
${summary.endpoint_boundary_source_data_functionals} / ${summary.endpoint_functionals}
boundary-source records,
${summary.target_endpoint_ref_declared_functionals} / ${summary.endpoint_functionals}
target endpoint refs,
${summary.target_endpoint_value_present_functionals} / ${summary.endpoint_functionals}
target endpoint values, and
${summary.component_domain_and_boundary_source_ready_functionals} /
${summary.endpoint_functionals} component-domain plus boundary-source ready
endpoints. It still constructs 0 / ${summary.endpoint_functionals} endpoint
boundary bindings, 0 / ${summary.endpoint_functionals} endpoint value bindings,
0 / ${summary.endpoint_functionals} binding contracts,
0 / ${summary.endpoint_functionals} endpoint motion rules,
0 / ${summary.endpoint_functionals} endpoint evaluation maps,
0 / ${summary.endpoint_functionals} non-target zero certificates,
0 / ${summary.endpoint_functionals} exact $B\\xi=0$ certificates,
0 / ${summary.endpoint_functionals} rank certificates,
0 / ${summary.endpoint_functionals} candidate artifacts,
0 / ${summary.endpoint_functionals} topology recertifications,
0 / ${summary.endpoint_functionals} proof-interval replays, and 0 consumed rows.

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

| Endpoint | Role | Component domain | Boundary source | Ready pair | Boundary binding | Value binding | Binding contract | Motion rule |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(attempt.endpoint_component_domain_boundary_binding_attempts)}

## Row Attempts

| Row | Failed side | Component-domain pair | Boundary source data | Ready pair | Boundary-binding pair | Evaluation-map pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(attempt.row_component_domain_boundary_binding_attempts)}

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
${countTable(attempt.endpoint_field_counts, summary.endpoint_functionals)}

## Row Field Counts

| Field | Count |
| --- | ---: |
${countTable(attempt.row_field_counts, summary.rows)}

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
    componentDomainSubcertificate: readJson(args.componentDomainSubcertificate),
    boundaryBindingSourceDataAudit: readJson(args.boundaryBindingSourceDataAudit),
    boundaryBindingConstructionAttempt: readJson(args.boundaryBindingConstructionAttempt),
    boundaryBindingMotionEvaluationAttempt: readJson(args.boundaryBindingMotionEvaluationAttempt),
  };
  const attempt = buildAttempt(inputs, args);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, attempt, args.pretty);
  writeText(outputReportPath, buildReport(attempt));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();
