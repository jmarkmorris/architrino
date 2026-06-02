#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_TARGET_OBJECT = `${CERT_DIR}/fold_coordinate_endpoint_functional_target_endpoint_boundary_binding_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONTRACT_TARGET = `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_FULL_BINDING_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_VALUE_BINDING_SOURCE_LAYER = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_source_layer.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_WITNESS_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_WITNESS_OBJECT_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_RESIDUAL_FUNCTION_SOURCE_LAYER = `${CERT_DIR}/one_leaf_active_endpoint_residual_function_on_box_source_layer_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON = `fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_carrier_field_obligation_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_carrier_field_obligation_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-carrier-field-obligation-attempt-fail-closed-witness-object-inputs-present-carrier-fields-absent-no-row-consumption";

const SOURCE_STATUSES = {
  targetObject:
    "fold_coordinate_endpoint_functional_component_domain_target_endpoint_boundary_binding_object_construction_partial_pass_object_constructed_full_binding_blocked",
  contractTarget:
    "priority-only-full-endpoint-boundary-binding-contract-target-input-ready-object-layer-present-full-binding-motion-evaluation-replay-blocked",
  fullBindingAttempt:
    "priority-only-full-endpoint-boundary-binding-construction-attempt-fail-closed-contract-targets-present-full-binding-motion-evaluation-replay-blocked-no-row-consumption",
  valueBindingSourceLayer:
    "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-source-layer-fail-closed-source-equations-present-proof-grade-boundary-bindings-absent-no-row-consumption",
  witnessAttempt:
    "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-witness-construction-attempt-fail-closed-source-equations-present-witness-binding-value-contract-motion-evaluation-replay-absent-no-row-consumption",
  witnessObjectAttempt:
    "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-construction-attempt-fail-closed-witness-inputs-present-object-binding-value-contract-motion-evaluation-replay-absent-no-row-consumption",
  residualFunctionSourceLayer:
    "one_leaf_active_endpoint_residual_function_on_box_source_layer_attempt_fail_closed_formula_inputs_present_box_residual_functions_absent_no_row_consumption",
};

const CARRIER_TARGET_FIELDS = [
  "endpoint_boundary_binding_witness_object_target_declared",
  "witness_object_domain_chart_target_declared",
  "witness_object_endpoint_boundary_binding_ref_target_declared",
  "witness_object_value_binding_map_target_declared",
  "witness_object_contract_link_target_declared",
  "witness_object_algebraic_certificate_refs_target_declared",
  "witness_object_motion_evaluation_refs_target_declared",
  "witness_object_artifact_topology_replay_refs_target_declared",
  "endpoint_boundary_binding_witness_object_construction_input_ready",
];

const CARRIER_FIELD_PRESENT_FIELDS = [
  "endpoint_boundary_binding_witness_object_constructed",
  "witness_object_has_domain_chart",
  "witness_object_has_endpoint_boundary_binding_ref",
  "witness_object_has_endpoint_value_binding_map",
  "witness_object_has_contract_link",
  "witness_object_has_algebraic_certificate_refs",
  "witness_object_has_motion_evaluation_refs",
  "witness_object_has_artifact_topology_replay_refs",
];

const PROOF_GRADE_ENDPOINT_FIELDS = [
  "endpoint_boundary_binding_witness_constructed",
  "full_endpoint_boundary_binding_constructed",
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

const ENDPOINT_FIELDS = [
  "target_endpoint_boundary_binding_object_constructed",
  "full_endpoint_boundary_binding_contract_target_declared",
  "endpoint_value_binding_source_equation_declared",
  "endpoint_boundary_binding_witness_input_ready",
  ...CARRIER_TARGET_FIELDS,
  "same_packet_witness_object_carrier_field_obligation_declared",
  ...CARRIER_FIELD_PRESENT_FIELDS,
  ...PROOF_GRADE_ENDPOINT_FIELDS,
];

const ROW_SOURCE_FIELDS = [
  "candidate_lambda_interval_declared",
  "candidate_lambda_interval_nonempty",
  "sampled_endpoint_values_present",
  "sampled_lambda_derivative_sample_present",
  "constant_theta_endpoint_box_candidate_present",
  "endpoint_local_formula_candidate_pair_declared",
  "local_target_action_pair_exact",
  "combined_component_union_chart_pair_constructed",
  "row_boundary_binding_source_data_ready",
  "endpoint_value_binding_source_pair_ready",
  "endpoint_boundary_binding_witness_object_input_pair_ready",
  "residual_function_on_box_source_layer_target_declared",
  "source_endpoint_residual_formula_target_declared",
  "receiver_endpoint_residual_formula_target_declared",
  "source_endpoint_evaluation_rule_target_declared",
  "receiver_endpoint_evaluation_rule_target_declared",
  "source_endpoint_motion_rule_target_declared",
  "receiver_endpoint_motion_rule_target_declared",
  "proof_interval_replay_target_declared",
];

const ROW_CARRIER_TARGET_FIELDS = [
  "source_witness_object_carrier_field_obligation_declared",
  "receiver_witness_object_carrier_field_obligation_declared",
  "combined_witness_object_carrier_field_obligation_pair_declared",
  "source_witness_object_carrier_input_ready",
  "receiver_witness_object_carrier_input_ready",
  "combined_witness_object_carrier_input_pair_ready",
];

const ROW_CARRIER_PRESENT_FIELDS = [
  "source_endpoint_boundary_binding_witness_object_constructed",
  "receiver_endpoint_boundary_binding_witness_object_constructed",
  "combined_endpoint_boundary_binding_witness_object_pair_constructed",
  "source_endpoint_boundary_binding_witness_constructed",
  "receiver_endpoint_boundary_binding_witness_constructed",
  "combined_endpoint_boundary_binding_witness_pair_constructed",
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "combined_boundary_binding_pair_constructed",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_binding_contract_pair_satisfied",
  "source_endpoint_evaluation_rule_present",
  "receiver_endpoint_evaluation_rule_present",
  "source_endpoint_motion_rule_present",
  "receiver_endpoint_motion_rule_present",
  "combined_endpoint_evaluation_map_pair_constructed",
  "source_endpoint_residual_formula_present",
  "receiver_endpoint_residual_formula_present",
  "source_endpoint_residual_function_on_box_constructed",
  "receiver_endpoint_residual_function_on_box_constructed",
  "source_endpoint_residual_interval_bound_constructed",
  "receiver_endpoint_residual_interval_bound_constructed",
  "interval_active_endpoint_enclosure_present",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "residual_function_on_box_source_layer_ready",
  "preledger_pass",
  "row_consumed",
  "branch_chart_authorized",
];

const ROW_FIELDS = [
  ...ROW_SOURCE_FIELDS,
  ...ROW_CARRIER_TARGET_FIELDS,
  ...ROW_CARRIER_PRESENT_FIELDS,
];

const CARRIER_METHODS = [
  {
    method_id: "witness_object_inputs_as_carrier_field_obligation_matrix",
    description:
      "Check whether the target object, contract target, value-binding source layer, and witness-object input layer define the carrier-field obligation matrix.",
    required_fields: [
      "target_endpoint_boundary_binding_object_constructed",
      "full_endpoint_boundary_binding_contract_target_declared",
      "endpoint_value_binding_source_equation_declared",
      "endpoint_boundary_binding_witness_input_ready",
      "endpoint_boundary_binding_witness_object_construction_input_ready",
      "same_packet_witness_object_carrier_field_obligation_declared",
    ],
  },
  {
    method_id: "carrier_field_obligation_matrix_as_witness_object_carrier",
    description:
      "Test whether the obligation matrix supplies an explicit witness-object carrier with every required carrier field present.",
    required_fields: [
      "same_packet_witness_object_carrier_field_obligation_declared",
      "endpoint_boundary_binding_witness_object_constructed",
      "witness_object_has_domain_chart",
      "witness_object_has_endpoint_boundary_binding_ref",
      "witness_object_has_endpoint_value_binding_map",
      "witness_object_has_contract_link",
      "witness_object_has_algebraic_certificate_refs",
      "witness_object_has_motion_evaluation_refs",
      "witness_object_has_artifact_topology_replay_refs",
    ],
  },
  {
    method_id: "witness_object_carrier_as_proof_grade_endpoint_binding",
    description:
      "Test whether the carrier proves the endpoint boundary binding, value binding, binding contract, algebraic certificates, motion/evaluation, artifacts, topology, and replay.",
    required_fields: [
      "endpoint_boundary_binding_witness_object_constructed",
      "endpoint_boundary_binding_witness_constructed",
      "endpoint_boundary_binding_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "binding_contract_satisfied",
      "endpoint_motion_rule_constructed",
      "endpoint_evaluation_map_constructed",
      "full_endpoint_evaluation_map_constructed",
      "non_target_endpoint_zero_certified",
      "exact_screen_zero_certified",
      "rank_certified",
      "candidate_artifacts_present",
      "root_topology_recertified_for_candidate_change",
      "proof_interval_v1_v6_rerun_for_candidate_change",
    ],
  },
];

const ROW_CARRIER_METHODS = [
  {
    method_id: "residual_consumer_inputs_as_carrier_obligation_pair",
    description:
      "Check whether each residual-function-on-box consumer row has source and receiver carrier-field obligations available.",
    required_fields: [
      "endpoint_boundary_binding_witness_object_input_pair_ready",
      "residual_function_on_box_source_layer_target_declared",
      "source_witness_object_carrier_field_obligation_declared",
      "receiver_witness_object_carrier_field_obligation_declared",
      "combined_witness_object_carrier_field_obligation_pair_declared",
      "combined_witness_object_carrier_input_pair_ready",
    ],
  },
  {
    method_id: "carrier_obligation_pair_as_residual_formula_inputs",
    description:
      "Test whether the carrier obligations supply boundary bindings, value bindings, motion/evaluation rules, and endpoint residual formulas.",
    required_fields: [
      "combined_witness_object_carrier_input_pair_ready",
      "combined_endpoint_boundary_binding_witness_object_pair_constructed",
      "combined_boundary_binding_pair_constructed",
      "source_endpoint_value_bound_to_boundary_binding",
      "receiver_endpoint_value_bound_to_boundary_binding",
      "combined_binding_contract_pair_satisfied",
      "source_endpoint_evaluation_rule_present",
      "receiver_endpoint_evaluation_rule_present",
      "source_endpoint_motion_rule_present",
      "receiver_endpoint_motion_rule_present",
      "source_endpoint_residual_formula_present",
      "receiver_endpoint_residual_formula_present",
    ],
  },
  {
    method_id: "carrier_obligation_pair_as_box_residual_replay",
    description:
      "Test whether the carrier obligations close residual functions on boxes and proof-interval replay.",
    required_fields: [
      "source_endpoint_residual_function_on_box_constructed",
      "receiver_endpoint_residual_function_on_box_constructed",
      "source_endpoint_residual_interval_bound_constructed",
      "receiver_endpoint_residual_interval_bound_constructed",
      "interval_active_endpoint_enclosure_present",
      "candidate_artifacts_present",
      "root_topology_recertified_for_candidate_change",
      "proof_interval_v1_v6_rerun_for_candidate_change",
      "preledger_pass",
      "row_consumed",
      "branch_chart_authorized",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    targetObject: DEFAULT_TARGET_OBJECT,
    contractTarget: DEFAULT_CONTRACT_TARGET,
    fullBindingAttempt: DEFAULT_FULL_BINDING_ATTEMPT,
    valueBindingSourceLayer: DEFAULT_VALUE_BINDING_SOURCE_LAYER,
    witnessAttempt: DEFAULT_WITNESS_ATTEMPT,
    witnessObjectAttempt: DEFAULT_WITNESS_OBJECT_ATTEMPT,
    residualFunctionSourceLayer: DEFAULT_RESIDUAL_FUNCTION_SOURCE_LAYER,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--target-object") {
      args.targetObject = argv[++index];
    } else if (arg === "--contract-target") {
      args.contractTarget = argv[++index];
    } else if (arg === "--full-binding-attempt") {
      args.fullBindingAttempt = argv[++index];
    } else if (arg === "--value-binding-source-layer") {
      args.valueBindingSourceLayer = argv[++index];
    } else if (arg === "--witness-attempt") {
      args.witnessAttempt = argv[++index];
    } else if (arg === "--witness-object-attempt") {
      args.witnessObjectAttempt = argv[++index];
    } else if (arg === "--residual-function-source-layer") {
      args.residualFunctionSourceLayer = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-same-packet-witness-object-carrier-field-obligation-attempt.mjs [options]

Options:
  --target-object PATH                   Target endpoint boundary-binding object construction attempt JSON.
  --contract-target PATH                 Full endpoint boundary-binding contract target JSON.
  --full-binding-attempt PATH            Full endpoint boundary-binding construction attempt JSON.
  --value-binding-source-layer PATH      Endpoint value-binding source layer JSON.
  --witness-attempt PATH                 Endpoint boundary-binding witness construction attempt JSON.
  --witness-object-attempt PATH          Endpoint boundary-binding witness-object construction attempt JSON.
  --residual-function-source-layer PATH  Active-endpoint residual-function-on-box source-layer attempt JSON.
  --out-dir PATH                         Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                               Pretty-print JSON artifact.
  --help                                 Show this help.`);
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

function idMap(rows, key, label) {
  const map = new Map();
  for (const row of rows) {
    const id = row[key];
    if (!id) {
      throw new Error(`Missing ${label} id field ${key}`);
    }
    if (map.has(id)) {
      throw new Error(`Duplicate ${label} id: ${id}`);
    }
    map.set(id, row);
  }
  return map;
}

function requireMapped(map, id, label) {
  const value = map.get(id);
  if (!value) {
    throw new Error(`Missing ${label}: ${id}`);
  }
  return value;
}

function assertCommonSource(label, source, expectedStatus) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${label} packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected ${label} fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.status !== expectedStatus) {
    throw new Error(`Unexpected ${label} status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error(`Refusing authorized ${label} source.`);
  }
}

function assertInputs(sources) {
  assertCommonSource("target object", sources.targetObject, SOURCE_STATUSES.targetObject);
  assertCommonSource("contract target", sources.contractTarget, SOURCE_STATUSES.contractTarget);
  assertCommonSource("full binding attempt", sources.fullBindingAttempt, SOURCE_STATUSES.fullBindingAttempt);
  assertCommonSource(
    "value-binding source layer",
    sources.valueBindingSourceLayer,
    SOURCE_STATUSES.valueBindingSourceLayer
  );
  assertCommonSource("witness attempt", sources.witnessAttempt, SOURCE_STATUSES.witnessAttempt);
  assertCommonSource("witness-object attempt", sources.witnessObjectAttempt, SOURCE_STATUSES.witnessObjectAttempt);
  assertCommonSource(
    "residual-function source layer",
    sources.residualFunctionSourceLayer,
    SOURCE_STATUSES.residualFunctionSourceLayer
  );
}

function methodResult(prefix, method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `missing_${prefix}_${field}`),
    passed: missingFields.length === 0,
  };
}

function endpointFields(endpoint) {
  const sourceFields = endpoint.required_fields_present;
  const fields = {};
  for (const field of ENDPOINT_FIELDS) {
    fields[field] = sourceFields[field] === true;
  }
  fields.same_packet_witness_object_carrier_field_obligation_declared =
    sourceFields.endpoint_boundary_binding_witness_object_construction_input_ready === true;
  for (const field of CARRIER_FIELD_PRESENT_FIELDS) {
    fields[field] = false;
  }
  for (const field of PROOF_GRADE_ENDPOINT_FIELDS) {
    fields[field] = false;
  }
  return fields;
}

function carrierMatrix(endpoint) {
  return [
    {
      carrier_field: "domain_chart",
      target_field: "witness_object_domain_chart_target_declared",
      source_ref: endpoint.domain_symbol,
      present_field: "witness_object_has_domain_chart",
      carrier_field_present: false,
    },
    {
      carrier_field: "endpoint_boundary_binding_ref",
      target_field: "witness_object_endpoint_boundary_binding_ref_target_declared",
      source_ref: endpoint.binding_symbol,
      present_field: "witness_object_has_endpoint_boundary_binding_ref",
      carrier_field_present: false,
    },
    {
      carrier_field: "endpoint_value_binding_map",
      target_field: "witness_object_value_binding_map_target_declared",
      source_ref: endpoint.value_binding_source_id,
      present_field: "witness_object_has_endpoint_value_binding_map",
      carrier_field_present: false,
    },
    {
      carrier_field: "contract_link",
      target_field: "witness_object_contract_link_target_declared",
      source_ref: endpoint.source_contract_target_id,
      present_field: "witness_object_has_contract_link",
      carrier_field_present: false,
    },
    {
      carrier_field: "algebraic_certificate_refs",
      target_field: "witness_object_algebraic_certificate_refs_target_declared",
      source_ref: "non-target zero, exact $B\\xi=0$, and rank certificate targets",
      present_field: "witness_object_has_algebraic_certificate_refs",
      carrier_field_present: false,
    },
    {
      carrier_field: "motion_evaluation_refs",
      target_field: "witness_object_motion_evaluation_refs_target_declared",
      source_ref: "same-packet history update, endpoint motion, and endpoint evaluation targets",
      present_field: "witness_object_has_motion_evaluation_refs",
      carrier_field_present: false,
    },
    {
      carrier_field: "artifact_topology_replay_refs",
      target_field: "witness_object_artifact_topology_replay_refs_target_declared",
      source_ref: "candidate artifact, topology recertification, and proof-interval replay targets",
      present_field: "witness_object_has_artifact_topology_replay_refs",
      carrier_field_present: false,
    },
  ];
}

function buildEndpointObligation(endpoint) {
  const fields = endpointFields(endpoint);
  const methodResults = CARRIER_METHODS.map((method) =>
    methodResult("witness_object_carrier_field_obligation", method, fields)
  );
  return {
    id: endpoint.id,
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    carrier_field_obligation_id: `witness_object_carrier_field_obligation:${endpoint.id}`,
    witness_object_attempt_id: endpoint.witness_object_attempt_id,
    source_witness_attempt_id: endpoint.source_witness_attempt_id,
    value_binding_source_id: endpoint.value_binding_source_id,
    source_target_object_id: endpoint.source_target_object_id,
    source_contract_target_id: endpoint.source_contract_target_id,
    witness_object_symbol: endpoint.witness_object_symbol,
    binding_symbol: endpoint.binding_symbol,
    domain_symbol: endpoint.domain_symbol,
    chart_symbol: endpoint.chart_symbol,
    basis_symbol: endpoint.basis_symbol,
    target_equation: endpoint.target_equation,
    target_action: endpoint.target_action,
    target_sign: endpoint.target_sign,
    target_endpoint_ref_value_count: endpoint.target_endpoint_ref_value_count,
    target_endpoint_value_binding_source_equations: endpoint.target_endpoint_value_binding_source_equations,
    carrier_field_obligation_matrix: carrierMatrix(endpoint),
    required_fields_present: fields,
    carrier_method_results: methodResults,
    carrier_methods_passed: methodResults.filter((method) => method.passed).map((method) => method.method_id),
    same_packet_witness_object_carrier_field_obligation_declared:
      fields.same_packet_witness_object_carrier_field_obligation_declared,
    endpoint_boundary_binding_witness_object_constructed: false,
    endpoint_boundary_binding_witness_constructed: false,
    missing_carrier_fields: CARRIER_FIELD_PRESENT_FIELDS,
    missing_proof_grade_fields: PROOF_GRADE_ENDPOINT_FIELDS,
    failure_codes: [...CARRIER_FIELD_PRESENT_FIELDS, ...PROOF_GRADE_ENDPOINT_FIELDS].map(
      (field) => `witness_object_carrier_field_obligation_retains_blocker_${field}`
    ),
    obstruction:
      "The endpoint has target object, contract target, value-binding source equations, and witness-object inputs, but no same-packet witness-object carrier fields are supplied.",
  };
}

function rowFields(row, sourceObligation, receiverObligation) {
  const sourceFields = row.required_fields_present;
  const fields = {};
  for (const field of ROW_SOURCE_FIELDS) {
    fields[field] = sourceFields[field] === true;
  }
  fields.source_witness_object_carrier_field_obligation_declared =
    sourceObligation.same_packet_witness_object_carrier_field_obligation_declared === true;
  fields.receiver_witness_object_carrier_field_obligation_declared =
    receiverObligation.same_packet_witness_object_carrier_field_obligation_declared === true;
  fields.combined_witness_object_carrier_field_obligation_pair_declared =
    fields.source_witness_object_carrier_field_obligation_declared &&
    fields.receiver_witness_object_carrier_field_obligation_declared;
  fields.source_witness_object_carrier_input_ready =
    sourceObligation.required_fields_present.endpoint_boundary_binding_witness_object_construction_input_ready ===
    true;
  fields.receiver_witness_object_carrier_input_ready =
    receiverObligation.required_fields_present.endpoint_boundary_binding_witness_object_construction_input_ready ===
    true;
  fields.combined_witness_object_carrier_input_pair_ready =
    sourceFields.endpoint_boundary_binding_witness_object_input_pair_ready === true &&
    fields.source_witness_object_carrier_input_ready &&
    fields.receiver_witness_object_carrier_input_ready;
  for (const field of ROW_CARRIER_PRESENT_FIELDS) {
    fields[field] = false;
  }
  return fields;
}

function buildRowObligation(row, endpointObligationById) {
  const sourceObligation = requireMapped(
    endpointObligationById,
    row.source_variable,
    `source carrier obligation for ${row.row_id}`
  );
  const receiverObligation = requireMapped(
    endpointObligationById,
    row.receiver_variable,
    `receiver carrier obligation for ${row.row_id}`
  );
  const fields = rowFields(row, sourceObligation, receiverObligation);
  const methodResults = ROW_CARRIER_METHODS.map((method) =>
    methodResult("row_witness_object_carrier_field_obligation", method, fields)
  );
  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    source_variable: row.source_variable,
    receiver_variable: row.receiver_variable,
    source_carrier_field_obligation_id: sourceObligation.carrier_field_obligation_id,
    receiver_carrier_field_obligation_id: receiverObligation.carrier_field_obligation_id,
    source_witness_object_attempt_id: sourceObligation.witness_object_attempt_id,
    receiver_witness_object_attempt_id: receiverObligation.witness_object_attempt_id,
    source_boundary_ref: row.source_boundary_ref,
    receiver_boundary_ref: row.receiver_boundary_ref,
    candidate_lambda_interval: row.candidate_lambda_interval,
    sampled_endpoint_data: row.sampled_endpoint_data,
    sampled_boundary_values: row.sampled_boundary_values,
    residual_consumer_targets: {
      residual_function_on_box_source_layer_target_declared:
        fields.residual_function_on_box_source_layer_target_declared,
      source_endpoint_residual_formula_target_declared: fields.source_endpoint_residual_formula_target_declared,
      receiver_endpoint_residual_formula_target_declared:
        fields.receiver_endpoint_residual_formula_target_declared,
      source_endpoint_motion_rule_target_declared: fields.source_endpoint_motion_rule_target_declared,
      receiver_endpoint_motion_rule_target_declared: fields.receiver_endpoint_motion_rule_target_declared,
      proof_interval_replay_target_declared: fields.proof_interval_replay_target_declared,
    },
    required_fields_present: fields,
    carrier_method_results: methodResults,
    carrier_methods_passed: methodResults.filter((method) => method.passed).map((method) => method.method_id),
    combined_witness_object_carrier_field_obligation_pair_declared:
      fields.combined_witness_object_carrier_field_obligation_pair_declared,
    combined_witness_object_carrier_input_pair_ready: fields.combined_witness_object_carrier_input_pair_ready,
    row_consumed: false,
    branch_chart_authorized: false,
    missing_row_carrier_fields: ROW_CARRIER_PRESENT_FIELDS,
    obstruction:
      "The residual-function consumer row has source and receiver carrier-field obligations, but no source/receiver witness-object carriers, boundary bindings, value bindings, contract pair, motion/evaluation rules, residual functions on boxes, replay, or row consumption.",
  };
}

function buildPacket(sources, sourcePaths) {
  assertInputs(sources);
  const witnessObjectEndpoints =
    sources.witnessObjectAttempt.endpoint_boundary_binding_witness_object_attempts;
  const residualRows =
    sources.residualFunctionSourceLayer.row_active_endpoint_residual_function_on_box_source_layer_attempts;
  const endpointObligations = witnessObjectEndpoints.map(buildEndpointObligation);
  const endpointObligationById = idMap(endpointObligations, "id", "endpoint carrier-field obligation");
  const rowObligations = residualRows.map((row) => buildRowObligation(row, endpointObligationById));

  const endpointFieldCounts = Object.fromEntries(
    ENDPOINT_FIELDS.map((field) => [
      field,
      countTrue(endpointObligations, (endpoint) => endpoint.required_fields_present[field]),
    ])
  );
  const rowFieldCounts = Object.fromEntries(
    ROW_FIELDS.map((field) => [field, countTrue(rowObligations, (row) => row.required_fields_present[field])])
  );
  const artifactRecords = Object.fromEntries(
    Object.entries(sourcePaths).map(([label, filePath]) => [label, artifactRecord(filePath)])
  );

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-carrier-field-obligation-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Same-Packet Endpoint Boundary-Binding Witness-Object Carrier-Field Obligation Attempt",
    claim_level:
      "priority-only same-packet endpoint boundary-binding witness-object carrier-field obligation attempt; witness-object inputs are present, but explicit carrier fields and proof-grade row consumers remain absent",
    source_artifacts: artifactRecords,
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      same_packet_witness_object_carrier_field_obligation_declared: true,
      endpoint_boundary_binding_witness_object_constructed: false,
      witness_object_has_domain_chart: false,
      witness_object_has_endpoint_boundary_binding_ref: false,
      witness_object_has_endpoint_value_binding_map: false,
      witness_object_has_contract_link: false,
      witness_object_has_algebraic_certificate_refs: false,
      witness_object_has_motion_evaluation_refs: false,
      witness_object_has_artifact_topology_replay_refs: false,
      endpoint_boundary_binding_witness_constructed: false,
      endpoint_boundary_binding_constructed: false,
      endpoint_value_bound_to_boundary_binding: false,
      binding_contract_satisfied: false,
      endpoint_motion_rule_constructed: false,
      endpoint_evaluation_map_constructed: false,
      residual_function_on_box_source_layer_ready: false,
      preledger_pass: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    carrier_field_obligation_rule:
      "A same-packet endpoint boundary-binding witness-object carrier must explicitly carry the domain chart, endpoint boundary-binding reference, endpoint value-binding map, binding-contract link, algebraic certificate references, motion/evaluation references, candidate artifact reference, topology reference, and proof-interval replay reference before any residual-function-on-box row can consume it.",
    no_promotion_rule:
      "Carrier-field obligations are not carrier fields. They record exact missing same-packet fields and preserve source/value/witness inputs without authorizing a candidate artifact, topology recertification, proof-interval replay, preledger pass, live-ledger update, branch-chart authorization, or row consumption.",
    carrier_methods: CARRIER_METHODS,
    row_carrier_methods: ROW_CARRIER_METHODS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    carrier_target_fields: CARRIER_TARGET_FIELDS,
    carrier_field_present_fields: CARRIER_FIELD_PRESENT_FIELDS,
    proof_grade_endpoint_fields: PROOF_GRADE_ENDPOINT_FIELDS,
    endpoint_witness_object_carrier_field_obligation_attempts: endpointObligations,
    row_witness_object_carrier_field_obligation_attempts: rowObligations,
    summary: {
      endpoint_functionals: endpointObligations.length,
      residual_consumer_rows: rowObligations.length,
      endpoint_target_objects: endpointFieldCounts.target_endpoint_boundary_binding_object_constructed,
      full_endpoint_boundary_binding_contract_targets:
        endpointFieldCounts.full_endpoint_boundary_binding_contract_target_declared,
      endpoint_value_binding_source_layers: endpointFieldCounts.endpoint_value_binding_source_equation_declared,
      endpoint_witness_inputs: endpointFieldCounts.endpoint_boundary_binding_witness_input_ready,
      endpoint_witness_object_inputs:
        endpointFieldCounts.endpoint_boundary_binding_witness_object_construction_input_ready,
      endpoint_carrier_field_obligations:
        endpointFieldCounts.same_packet_witness_object_carrier_field_obligation_declared,
      endpoint_witness_object_carriers:
        endpointFieldCounts.endpoint_boundary_binding_witness_object_constructed,
      endpoint_boundary_binding_witnesses: endpointFieldCounts.endpoint_boundary_binding_witness_constructed,
      proof_grade_endpoint_boundary_bindings: endpointFieldCounts.endpoint_boundary_binding_constructed,
      endpoint_value_bindings: endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      binding_contracts_satisfied: endpointFieldCounts.binding_contract_satisfied,
      endpoint_motion_rules: endpointFieldCounts.endpoint_motion_rule_constructed,
      endpoint_evaluation_maps: endpointFieldCounts.endpoint_evaluation_map_constructed,
      residual_consumer_targets:
        rowFieldCounts.residual_function_on_box_source_layer_target_declared,
      row_carrier_obligation_pairs:
        rowFieldCounts.combined_witness_object_carrier_field_obligation_pair_declared,
      row_carrier_input_pairs: rowFieldCounts.combined_witness_object_carrier_input_pair_ready,
      row_witness_object_carrier_pairs:
        rowFieldCounts.combined_endpoint_boundary_binding_witness_object_pair_constructed,
      row_boundary_binding_pairs: rowFieldCounts.combined_boundary_binding_pair_constructed,
      row_residual_functions_on_boxes:
        rowFieldCounts.source_endpoint_residual_function_on_box_constructed +
        rowFieldCounts.receiver_endpoint_residual_function_on_box_constructed,
      row_residual_function_source_layer_ready:
        rowFieldCounts.residual_function_on_box_source_layer_ready,
      preledger_pass_rows: rowFieldCounts.preledger_pass,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    capture_decision:
      "Priority-only. This packet composes the target-object, contract-target, value-binding source, witness-input, witness-object input, and residual-function consumer rows into explicit carrier-field obligations, but constructs no same-packet witness-object carrier fields and consumes no rows.",
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
    .map((method) => `| \`${method.method_id}\` | ${method.required_fields.length} | ${method.description} |`)
    .join("\n");
}

function endpointTable(endpoints) {
  return endpoints
    .map(
      (endpoint) =>
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.same_packet_witness_object_carrier_field_obligation_declared} | ${endpoint.required_fields_present.endpoint_boundary_binding_witness_object_constructed} | ${endpoint.required_fields_present.witness_object_has_endpoint_boundary_binding_ref} | ${endpoint.required_fields_present.witness_object_has_motion_evaluation_refs} | ${endpoint.required_fields_present.endpoint_boundary_binding_constructed} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.combined_witness_object_carrier_field_obligation_pair_declared} | ${row.combined_witness_object_carrier_input_pair_ready} | ${row.required_fields_present.combined_endpoint_boundary_binding_witness_object_pair_constructed} | ${row.required_fields_present.combined_boundary_binding_pair_constructed} | ${row.required_fields_present.residual_function_on_box_source_layer_ready} | ${row.row_consumed} |`
    )
    .join("\n");
}

function countTable(counts, total) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count} / ${total} |`)
    .join("\n");
}

function buildReport(packet) {
  const summary = packet.summary;
  return `# Higher-Fold Endpoint-Functional Same-Packet Endpoint Boundary-Binding Witness-Object Carrier-Field Obligation Attempt

## Verdict

Status: \`${packet.status}\`.

This priority-only packet composes the already available endpoint target object,
full endpoint boundary-binding contract target, endpoint value-binding source
layer, endpoint boundary-binding witness input, same-packet witness-object
input, and active-endpoint residual-function-on-box consumer rows into one
carrier-field obligation matrix. It does not construct the carrier fields.

The packet records ${summary.endpoint_carrier_field_obligations} /
${summary.endpoint_functionals} endpoint witness-object carrier-field
obligations and ${summary.row_carrier_obligation_pairs} /
${summary.residual_consumer_rows} residual consumer row source/receiver
carrier-obligation pairs. It keeps 0 / ${summary.endpoint_functionals}
witness-object carriers, 0 / ${summary.endpoint_functionals} endpoint
boundary-binding witnesses, 0 / ${summary.endpoint_functionals} proof-grade
endpoint boundary bindings, 0 / ${summary.endpoint_functionals} endpoint
value bindings, 0 / ${summary.endpoint_functionals} satisfied binding
contracts, 0 / ${summary.endpoint_functionals} endpoint motion rules,
0 / ${summary.endpoint_functionals} endpoint evaluation maps,
0 / ${summary.residual_consumer_rows} row boundary-binding pairs,
0 / ${summary.residual_consumer_rows} residual-function source-layer ready
rows, and 0 consumed rows.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(packet.source_artifacts)}

## Carrier-Field Obligation Rule

${packet.carrier_field_obligation_rule}

${packet.no_promotion_rule}

## Endpoint Carrier Methods

| Method | Required fields | Description |
| --- | ---: | --- |
${methodTable(packet.carrier_methods)}

## Row Carrier Methods

| Method | Required fields | Description |
| --- | ---: | --- |
${methodTable(packet.row_carrier_methods)}

## Endpoint Carrier Obligations

| Endpoint | Role | Obligation | Carrier object | Boundary-binding ref | Motion/evaluation refs | Boundary binding |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_witness_object_carrier_field_obligation_attempts)}

## Row Consumer Obligations

| Row | Failed side | Obligation pair | Input pair | Carrier pair | Boundary-binding pair | Residual source ready | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_witness_object_carrier_field_obligation_attempts)}

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
${countTable(packet.endpoint_field_counts, summary.endpoint_functionals)}

## Row Field Counts

| Field | Count |
| --- | ---: |
${countTable(packet.row_field_counts, summary.residual_consumer_rows)}

## Capture Decision

${packet.capture_decision}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const sourcePaths = {
    target_endpoint_boundary_binding_object_construction_attempt: args.targetObject,
    full_endpoint_boundary_binding_contract_target: args.contractTarget,
    full_endpoint_boundary_binding_construction_attempt: args.fullBindingAttempt,
    endpoint_value_binding_source_layer: args.valueBindingSourceLayer,
    endpoint_boundary_binding_witness_construction_attempt: args.witnessAttempt,
    endpoint_boundary_binding_witness_object_construction_attempt: args.witnessObjectAttempt,
    active_endpoint_residual_function_on_box_source_layer_attempt: args.residualFunctionSourceLayer,
  };
  const sources = {
    targetObject: readJson(args.targetObject),
    contractTarget: readJson(args.contractTarget),
    fullBindingAttempt: readJson(args.fullBindingAttempt),
    valueBindingSourceLayer: readJson(args.valueBindingSourceLayer),
    witnessAttempt: readJson(args.witnessAttempt),
    witnessObjectAttempt: readJson(args.witnessObjectAttempt),
    residualFunctionSourceLayer: readJson(args.residualFunctionSourceLayer),
  };
  const packet = buildPacket(sources, sourcePaths);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();
