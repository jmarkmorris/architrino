#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_COMPONENT_DOMAIN_BOUNDARY_BINDING_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_component_domain_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_target_endpoint_boundary_binding_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_target_endpoint_boundary_binding_object_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_FIELDS = [
  "component_domain_boundary_source_ready",
  "component_domain_binding_subcertificate_constructed",
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
  "target_endpoint_boundary_binding_object_constructed",
  "target_boundary_binding_object_has_domain_chart",
  "target_boundary_binding_object_has_basis_formula",
  "target_boundary_binding_object_has_boundary_action",
  "target_boundary_binding_object_has_signed_delta",
  "target_boundary_binding_object_has_endpoint_refs",
  "target_boundary_binding_object_has_endpoint_values",
  "target_action_exact_under_target_boundary_binding_object",
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
  "combined_component_domain_pair_constructed",
  "row_boundary_binding_source_data_ready",
  "source_target_endpoint_boundary_binding_object_constructed",
  "receiver_target_endpoint_boundary_binding_object_constructed",
  "combined_target_boundary_binding_object_pair_constructed",
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
    method_id: "component_domain_boundary_source_as_target_binding_object",
    description:
      "Construct the narrow target endpoint boundary-binding object from a component-domain subcertificate, boundary action, signed delta, and target endpoint refs/values.",
    required_fields: [
      "component_domain_boundary_source_ready",
      "target_endpoint_boundary_binding_object_constructed",
      "target_boundary_binding_object_has_domain_chart",
      "target_boundary_binding_object_has_basis_formula",
      "target_boundary_binding_object_has_boundary_action",
      "target_boundary_binding_object_has_signed_delta",
      "target_boundary_binding_object_has_endpoint_refs",
      "target_boundary_binding_object_has_endpoint_values",
      "target_action_exact_under_target_boundary_binding_object",
    ],
  },
  {
    method_id: "target_binding_object_as_full_endpoint_boundary_binding",
    description:
      "Test whether the narrow target object already constitutes the full endpoint boundary binding and binding contract.",
    required_fields: [
      "target_endpoint_boundary_binding_object_constructed",
      "endpoint_boundary_binding_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "binding_contract_satisfied",
      "non_target_endpoint_zero_certified",
      "exact_screen_zero_certified",
      "rank_certified",
    ],
  },
  {
    method_id: "target_binding_object_as_motion_evaluation_entrypoint",
    description:
      "Test whether the narrow target object already supplies same-packet history update, endpoint motion, and endpoint evaluation-map semantics.",
    required_fields: [
      "target_endpoint_boundary_binding_object_constructed",
      "same_packet_history_update_formula_present",
      "endpoint_motion_rule_constructed",
      "endpoint_evaluation_map_constructed",
      "full_endpoint_evaluation_map_constructed",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    componentDomainBoundaryBindingAttempt: DEFAULT_COMPONENT_DOMAIN_BOUNDARY_BINDING_ATTEMPT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--component-domain-boundary-binding-attempt") {
      args.componentDomainBoundaryBindingAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-target-endpoint-boundary-binding-object-construction-attempt.mjs [options]

Options:
  --component-domain-boundary-binding-attempt PATH Component-domain endpoint-boundary-binding construction attempt JSON. Defaults to ${DEFAULT_COMPONENT_DOMAIN_BOUNDARY_BINDING_ATTEMPT}.
  --out-dir PATH                                   Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                         Pretty-print JSON artifact.
  --help                                           Show this help.`);
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

function requireEndpoint(map, id, label) {
  const value = map.get(id);
  if (!value) {
    throw new Error(`Missing ${label} endpoint: ${id}`);
  }
  return value;
}

function assertInput(source) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected component-domain boundary-binding packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(
      `Unexpected component-domain boundary-binding fold-coordinate packet id: ${source.fold_coordinate_packet_id}`
    );
  }
  if (
    source.status !==
    "fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt_fail_closed_component_domain_basis_source_data_only_no_boundary_binding_no_value_binding_no_contract"
  ) {
    throw new Error(`Unexpected component-domain boundary-binding status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error("Refusing target binding construction from authorized source packet.");
  }
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `missing_target_endpoint_boundary_binding_object_${field}`),
    passed: missingFields.length === 0,
  };
}

function targetBindingObject(endpoint) {
  return {
    object_id: `target_endpoint_boundary_binding_object:${endpoint.id}`,
    object_kind: "target_endpoint_boundary_binding_subobject",
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    domain_symbol: endpoint.domain_symbol,
    chart_symbol: endpoint.chart_symbol,
    basis_symbol: endpoint.basis_symbol,
    support_union_kind: endpoint.support_union_kind,
    support_interval_ids: endpoint.support_interval_ids,
    target_action: endpoint.target_action,
    target_sign: endpoint.target_sign,
    target_equation: endpoint.target_equation,
    boundary_actions: endpoint.boundary_actions,
    boundary_delta_signs: endpoint.boundary_delta_signs,
    target_endpoint_refs: endpoint.target_endpoint_refs,
    component_union_chart: endpoint.component_union_chart,
    binding_scope:
      "target-action-only subobject; full endpoint boundary binding requires value binding, contract satisfaction, non-target zero, exact screen zero, rank, motion/evaluation, artifacts, and replay",
  };
}

function endpointFields(endpoint, objectConstructed) {
  const fields = endpoint.required_fields_present;
  const targetRefs = Array.isArray(endpoint.target_endpoint_refs) && endpoint.target_endpoint_refs.length > 0;
  const targetValues =
    targetRefs && endpoint.target_endpoint_refs.every((ref) => ref.endpoint_value_present === true);
  const boundaryActions = Array.isArray(endpoint.boundary_actions) && endpoint.boundary_actions.length > 0;
  const signedDeltas =
    Array.isArray(endpoint.boundary_delta_signs) &&
    endpoint.boundary_delta_signs.length === endpoint.boundary_actions.length;
  return {
    component_domain_boundary_source_ready:
      fields.component_domain_and_boundary_source_ready === true,
    component_domain_binding_subcertificate_constructed:
      fields.component_domain_binding_subcertificate_constructed === true,
    endpoint_functional_domain_present: fields.endpoint_functional_domain_present === true,
    domain_chart_declared: fields.domain_chart_declared === true,
    domain_coordinate_rule_declared: fields.domain_coordinate_rule_declared === true,
    basis_vector_bound_to_domain: fields.basis_vector_bound_to_domain === true,
    theta_support_present: fields.theta_support_present === true,
    basis_formula_present: fields.basis_formula_present === true,
    basis_derivative_formula_present: fields.basis_derivative_formula_present === true,
    target_action_exact_under_component_locator:
      fields.target_action_exact_under_component_locator === true,
    opposite_endpoint_zero_under_component_locator:
      fields.opposite_endpoint_zero_under_component_locator === true,
    endpoint_boundary_binding_source_data_ready:
      fields.endpoint_boundary_binding_source_data_ready === true,
    endpoint_boundary_action_declared: fields.endpoint_boundary_action_declared === true,
    boundary_delta_sign_consistent: fields.boundary_delta_sign_consistent === true,
    target_endpoint_ref_declared: fields.target_endpoint_ref_declared === true,
    target_endpoint_value_present: fields.target_endpoint_value_present === true,
    target_endpoint_boundary_binding_object_constructed: objectConstructed,
    target_boundary_binding_object_has_domain_chart:
      objectConstructed && fields.domain_chart_declared === true,
    target_boundary_binding_object_has_basis_formula:
      objectConstructed && fields.basis_formula_present === true,
    target_boundary_binding_object_has_boundary_action: objectConstructed && boundaryActions,
    target_boundary_binding_object_has_signed_delta: objectConstructed && signedDeltas,
    target_boundary_binding_object_has_endpoint_refs: objectConstructed && targetRefs,
    target_boundary_binding_object_has_endpoint_values: objectConstructed && targetValues,
    target_action_exact_under_target_boundary_binding_object:
      objectConstructed && fields.target_action_exact_under_component_locator === true,
    endpoint_boundary_binding_constructed: false,
    endpoint_value_bound_to_boundary_binding: false,
    binding_contract_satisfied: false,
    same_packet_history_update_formula_present: false,
    endpoint_motion_rule_constructed: false,
    endpoint_evaluation_map_constructed: false,
    full_endpoint_evaluation_map_constructed: false,
    global_domain_evaluation_map_constructed: false,
    non_target_endpoint_zero_certified: false,
    exact_screen_zero_certified: false,
    rank_certified: false,
    candidate_artifacts_present: false,
    root_topology_recertified_for_candidate_change: false,
    proof_interval_v1_v6_rerun_for_candidate_change: false,
  };
}

function buildEndpointAttempt(endpoint) {
  const objectConstructed =
    endpoint.required_fields_present.component_domain_and_boundary_source_ready === true &&
    endpoint.required_fields_present.endpoint_boundary_binding_constructed !== true;
  const fields = endpointFields(endpoint, objectConstructed);
  const methodResults = CONSTRUCTION_METHODS.map((method) => methodResult(method, fields));
  const blockedFields = BLOCKED_ENDPOINT_FIELDS.filter((field) => fields[field] !== true);
  return {
    id: endpoint.id,
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    basis_symbol: endpoint.basis_symbol,
    source_symbol: endpoint.source_symbol,
    row_uses: endpoint.row_uses,
    target_equation: endpoint.target_equation,
    target_action: endpoint.target_action,
    target_sign: endpoint.target_sign,
    domain_symbol: endpoint.domain_symbol,
    chart_symbol: endpoint.chart_symbol,
    evaluation_map_symbol: endpoint.evaluation_map_symbol,
    support_interval_ids: endpoint.support_interval_ids,
    support_union_kind: endpoint.support_union_kind,
    target_boundary_binding_object: targetBindingObject(endpoint),
    required_fields_present: fields,
    construction_method_results: methodResults,
    target_endpoint_boundary_binding_object_constructed:
      fields.target_endpoint_boundary_binding_object_constructed,
    promotion_methods_passed: methodResults.filter((method) => method.passed).map((method) => method.method_id),
    missing_full_binding_fields: blockedFields,
    failure_codes: blockedFields.map((field) => `target_endpoint_boundary_binding_object_retains_blocker_${field}`),
    obstruction:
      "The target endpoint boundary-binding object packages the component-domain chart, basis formula, signed boundary action, target endpoint refs, and endpoint values. It remains a target-only subobject: no full endpoint boundary binding, endpoint value binding, binding contract, non-target zero certificate, exact $B\\xi=0$, rank certificate, motion/evaluation map, candidate artifact, topology recertification, or proof-interval replay is constructed.",
  };
}

function buildRowAttempt(row, endpointAttempts) {
  const endpointById = idMap(endpointAttempts, "target endpoint binding attempt");
  const sourceEndpoint = requireEndpoint(endpointById, row.source_variable, "source target binding");
  const receiverEndpoint = requireEndpoint(endpointById, row.receiver_variable, "receiver target binding");
  const sourceObject = sourceEndpoint.required_fields_present.target_endpoint_boundary_binding_object_constructed;
  const receiverObject = receiverEndpoint.required_fields_present.target_endpoint_boundary_binding_object_constructed;
  const fields = {
    row_locator_resolved: row.required_fields_present.row_locator_resolved === true,
    combined_component_domain_pair_constructed:
      row.required_fields_present.combined_component_domain_pair_constructed === true,
    row_boundary_binding_source_data_ready:
      row.required_fields_present.row_boundary_binding_source_data_ready === true,
    source_target_endpoint_boundary_binding_object_constructed: sourceObject,
    receiver_target_endpoint_boundary_binding_object_constructed: receiverObject,
    combined_target_boundary_binding_object_pair_constructed: sourceObject && receiverObject,
    source_endpoint_boundary_binding_constructed: false,
    receiver_endpoint_boundary_binding_constructed: false,
    combined_boundary_binding_pair_constructed: false,
    source_endpoint_motion_rule_constructed: false,
    receiver_endpoint_motion_rule_constructed: false,
    combined_endpoint_evaluation_map_pair_constructed: false,
    same_packet_history_update_formula_present: false,
    proof_grade_boundary_opening_certified: false,
    residual_data_construction_ready: false,
    candidate_artifacts_present: false,
    root_topology_recertified_for_candidate_change: false,
    proof_interval_v1_v6_rerun_for_candidate_change: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  return {
    row_id: row.row_id,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    source_variable: row.source_variable,
    receiver_variable: row.receiver_variable,
    source_target_boundary_binding_object_id:
      sourceEndpoint.target_boundary_binding_object.object_id,
    receiver_target_boundary_binding_object_id:
      receiverEndpoint.target_boundary_binding_object.object_id,
    source_boundary_ref: row.source_boundary_ref,
    receiver_boundary_ref: row.receiver_boundary_ref,
    source_boundary_value: row.source_boundary_value,
    receiver_boundary_value: row.receiver_boundary_value,
    required_fields_present: fields,
    combined_target_boundary_binding_object_pair_constructed:
      fields.combined_target_boundary_binding_object_pair_constructed,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row now has source/receiver target boundary-binding subobjects, but those target objects are not full source/receiver endpoint boundary bindings and do not supply motion/evaluation, boundary-opening proof, residual data, replay, or row consumption.",
  };
}

function buildAttempt(source, sourcePath) {
  assertInput(source);
  const endpointAttempts = source.endpoint_component_domain_boundary_binding_attempts.map(buildEndpointAttempt);
  const rowAttempts = source.row_component_domain_boundary_binding_attempts.map((row) =>
    buildRowAttempt(row, endpointAttempts)
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
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-component-domain-target-endpoint-boundary-binding-object-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status:
      "fold_coordinate_endpoint_functional_component_domain_target_endpoint_boundary_binding_object_construction_partial_pass_object_constructed_full_binding_blocked",
    theorem_target: "Target Endpoint Boundary-Binding Object Construction Attempt",
    claim_level:
      "priority-only narrow target_endpoint_boundary_binding_object construction; target tuple complete, but no full endpoint boundary binding, endpoint value binding, binding contract, motion/evaluation map, replay, row consumption, or branch-chart authorization is certified",
    source_artifacts: {
      component_domain_endpoint_boundary_binding_construction_attempt: artifactRecord(sourcePath),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      target_endpoint_boundary_binding_object_constructed: true,
      full_endpoint_boundary_binding_constructed: false,
      endpoint_value_bound_to_boundary_binding: false,
      binding_contract_satisfied: false,
      endpoint_motion_rule_constructed: false,
      endpoint_evaluation_map_constructed: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    construction_rule:
      "A target endpoint boundary-binding object is the tuple consisting of the component-domain chart, basis symbol and formula, target endpoint functional id, signed boundary action, target endpoint refs, and endpoint values. This tuple may be constructed from the component-domain plus boundary-source packet. It is a target-only subobject, not the full endpoint boundary binding contract.",
    no_promotion_rule:
      "The target boundary-binding object cannot be promoted to full endpoint boundary binding, endpoint value binding, binding contract, endpoint motion, endpoint evaluation map, candidate artifact, replay, preledger pass, row consumption, or branch-chart authorization without same-packet proofs of value binding, non-target zero, exact $B\\xi=0$, rank, history update, motion/evaluation semantics, topology recertification, and proof-interval replay.",
    construction_methods: CONSTRUCTION_METHODS,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      rows: rowAttempts.length,
      component_domain_boundary_source_ready_functionals:
        endpointFieldCounts.component_domain_boundary_source_ready,
      target_endpoint_boundary_binding_object_functionals:
        endpointFieldCounts.target_endpoint_boundary_binding_object_constructed,
      target_boundary_binding_object_domain_chart_functionals:
        endpointFieldCounts.target_boundary_binding_object_has_domain_chart,
      target_boundary_binding_object_basis_formula_functionals:
        endpointFieldCounts.target_boundary_binding_object_has_basis_formula,
      target_boundary_binding_object_boundary_action_functionals:
        endpointFieldCounts.target_boundary_binding_object_has_boundary_action,
      target_boundary_binding_object_signed_delta_functionals:
        endpointFieldCounts.target_boundary_binding_object_has_signed_delta,
      target_boundary_binding_object_endpoint_ref_functionals:
        endpointFieldCounts.target_boundary_binding_object_has_endpoint_refs,
      target_boundary_binding_object_endpoint_value_functionals:
        endpointFieldCounts.target_boundary_binding_object_has_endpoint_values,
      target_action_exact_under_target_binding_object_functionals:
        endpointFieldCounts.target_action_exact_under_target_boundary_binding_object,
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
      non_target_zero_certificate_functionals:
        endpointFieldCounts.non_target_endpoint_zero_certified,
      exact_screen_zero_certificate_functionals:
        endpointFieldCounts.exact_screen_zero_certified,
      rank_certificate_functionals: endpointFieldCounts.rank_certified,
      candidate_artifact_functionals:
        endpointFieldCounts.candidate_artifacts_present,
      topology_recertification_functionals:
        endpointFieldCounts.root_topology_recertified_for_candidate_change,
      proof_interval_replay_functionals:
        endpointFieldCounts.proof_interval_v1_v6_rerun_for_candidate_change,
      row_target_boundary_binding_object_pairs:
        rowFieldCounts.combined_target_boundary_binding_object_pair_constructed,
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
    endpoint_target_boundary_binding_object_attempts: endpointAttempts,
    row_target_boundary_binding_object_attempts: rowAttempts,
    capture_decision:
      "Priority-only. This packet constructs 4 / 4 narrow target_endpoint_boundary_binding_object tuples from component-domain chart/basis data and boundary-source target refs, target values, boundary actions, and signs, plus 3 / 3 source/receiver tuple pairs. These tuples are source objects for the endpoint-functional boundary-binding proof. They are not the historical endpoint boundary binding, do not bind endpoint values to a proof-grade boundary binding, do not satisfy the binding contract, and do not supply same-packet history update, endpoint motion/evaluation maps, non-target zero certificates, exact $B\\xi=0$, rank, candidate artifacts, topology recertification, proof-interval replay, row consumption, preledger pass, live-ledger update, or branch-chart authorization.",
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
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.component_domain_boundary_source_ready} | ${endpoint.required_fields_present.target_endpoint_boundary_binding_object_constructed} | ${endpoint.required_fields_present.endpoint_boundary_binding_constructed} | ${endpoint.required_fields_present.endpoint_value_bound_to_boundary_binding} | ${endpoint.required_fields_present.binding_contract_satisfied} | ${endpoint.required_fields_present.endpoint_motion_rule_constructed} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_target_boundary_binding_object_pair_constructed} | ${row.required_fields_present.combined_boundary_binding_pair_constructed} | ${row.required_fields_present.combined_endpoint_evaluation_map_pair_constructed} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Target Endpoint Boundary-Binding Object Construction Attempt

## Verdict

Status: \`${attempt.status}\`.

This priority-only construction attempt builds the narrow target boundary
subobject that the component-domain endpoint-boundary-binding construction
attempt left available. The object is the finite tuple of component-domain
chart, basis formula, target endpoint functional, signed boundary action, target
endpoint refs, and endpoint values. It is not the full endpoint boundary
binding contract.

The packet partially passes. It constructs
${summary.target_endpoint_boundary_binding_object_functionals} /
${summary.endpoint_functionals} target endpoint boundary-binding objects and
${summary.row_target_boundary_binding_object_pairs} / ${summary.rows}
source/receiver target-object pairs. It keeps
0 / ${summary.endpoint_functionals} full endpoint boundary bindings,
0 / ${summary.endpoint_functionals} endpoint value bindings,
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

| Endpoint | Role | Domain/source ready | Target object | Full binding | Value binding | Contract | Motion rule |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(attempt.endpoint_target_boundary_binding_object_attempts)}

## Row Attempts

| Row | Failed side | Target-object pair | Boundary-binding pair | Evaluation-map pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: |
${rowTable(attempt.row_target_boundary_binding_object_attempts)}

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
  const source = readJson(args.componentDomainBoundaryBindingAttempt);
  const attempt = buildAttempt(source, args.componentDomainBoundaryBindingAttempt);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, attempt, args.pretty);
  writeText(outputReportPath, buildReport(attempt));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();
